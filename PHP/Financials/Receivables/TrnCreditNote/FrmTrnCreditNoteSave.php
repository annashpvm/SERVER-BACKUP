<?php

require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");
session_start();

$flagtype = strtoupper($_REQUEST['flagtype']);
$griddet = json_decode($_REQUEST['griddet'], true);
$rowcnt = $_REQUEST['cnt'];

$accrefseq = $_REQUEST['accrefseq'];
$vouno = $_REQUEST['vouno'];
$voudate = $_REQUEST['voudate'];
$refno = $_REQUEST['refno'];
$refdate = $_REQUEST['refdate'];
$narration = $_REQUEST['narration'];
$paytype = $_REQUEST['paytype'];
$bankname = $_REQUEST['bankname'];
$paymode = $_REQUEST['paymode'];
$payno = $_REQUEST['payno'];
$paydate = $_REQUEST['paydate'];
$party = $_REQUEST['party'];
$debtor = $_REQUEST['debtor'];
$totalval = $_REQUEST['totalval'];
$billmode = $_REQUEST['billmode'];
$reason = strtoupper($_REQUEST['reason']);
$finid = $_REQUEST['finid'];
$finyear = $_REQUEST['finyear'];
$compcode = $_REQUEST['compcode'];
$taxtype = $_REQUEST['taxtype'];
$TAXVAL = $_REQUEST['TAXVAL'];
$invdategst = $_REQUEST['invdategst'];
$invnogst = $_REQUEST['invnogst'];
$output = $_REQUEST['output'];
$cgstledcode = $_REQUEST['cgst'];
$sgstledcode = $_REQUEST['sgst'];
$igstledcode = $_REQUEST['igst'];
$gstper      = $_REQUEST['gstper'];
$taxable     = $_REQUEST['taxable'];
$invno     = $_REQUEST['invno'];
$invdate     = $_REQUEST['invdate'];
$entrypoint = $_REQUEST['entrypoint'];
    $cgstper = 0;
    $sgstper = 0;
    $igstper = 0;
    if ($taxtype == "CS") {
        $TAXVALnew = $TAXVAL / 2;
        $cgstper = round($gstper/2,1);
        $sgstper = round($gstper/2,1);
    } else {
        $TAXVALnew = $TAXVAL;
        $igstper = round($igstper);

    }

#Get Max AccRef Seqno from acc_ref
$query1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
$result1 = mysql_query($query1);
$rec1 = mysql_fetch_array($result1);
$ginaccrefseq = $rec1['con_value'];

#Get Voucher Number
$query2 = "select ifnull(max(dbcr_no),0) + 1 as vou_no from acc_dbcrnote_header where dbcr_type = 'CN' and dbcr_finid = '$finid' and dbcr_comp_code = '$compcode'";
$result2 = mysql_query($query2);
$rec2 = mysql_fetch_array($result2);
$conval = $rec2['vou_no'];
$vouno = 'CN' . $conval;

#Get Max DBCR Seqno from acc_dbcrnote_header
$query3 = "select ifnull(max(dbcr_seqno),0) + 1 as con_value from acc_dbcrnote_header;";
$result3 = mysql_query($query3);
$rec3 = mysql_fetch_array($result3);
$gindbcrseq = $rec3['con_value'];

#Get CreditNote Number
$query4 = "select ifnull(max(dbcr_no),0) + 1 as dbcr_no from acc_dbcrnote_header where dbcr_type = 'CN' and dbcr_finid = '$finid' and dbcr_comp_code = '$compcode';";
$result4 = mysql_query($query4);
$rec4 = mysql_fetch_array($result4);
$dbcrno = $rec4['dbcr_no'];

$roundoff = round($totalval) - $totalval;
#Begin Transaction
mysql_query("BEGIN");
#Insert AccRef
$querya2 = "call acc_sp_trn_insacc_ref('$ginaccrefseq','$vouno','$compcode','$finid','$voudate',
                'CN','$bankname','$paymode','$payno','$paydate',upper('$narration'),0,0,'$entrypoint');";
$resulta2 = mysql_query($querya2);
//echo $querya2;

#Insert AccTran for Party Ledger
$querya3 = "call acc_sp_trn_insacc_tran('$ginaccrefseq',1,'$party',0,'$totalval','$totalval',1,0,0,'','$paytype');";
$resulta3 = mysql_query($querya3);
//echo $querya3;
$dnnew = $totalval - $TAXVAL;
#Insert AccTran for Debit Ledger
$querya4 = "call acc_sp_trn_insacc_tran('$ginaccrefseq',2,'$debtor','$dnnew',0,'$dnnew',1,0,0,'','$paytype');";
$resulta4 = mysql_query($querya4);
//echo $querya4;
    if ($TAXVAL > 0) {
        if ($taxtype == "CS") {
            $TAXVAL = $TAXVAL / 2;
            $queryatax = "call acc_sp_trn_insacc_tran('$ginaccrefseq',3,'$cgstledcode','$TAXVAL',0,'$TAXVAL',1,0,0,'','$paytype');";
            $resultatax = mysql_query($queryatax);
//echo $queryatax;
            $queryatax2 = "call acc_sp_trn_insacc_tran('$ginaccrefseq',4,'$sgstledcode','$TAXVAL',0,'$TAXVAL',1,0,0,'','$paytype');";
            $resultatax2 = mysql_query($queryatax2);
//echo $queryatax2;         
        } else if ($taxtype == "I") {
            $queryatax3 = "call acc_sp_trn_insacc_tran('$ginaccrefseq',3,'$igstledcode','$TAXVAL',0,'$TAXVAL',1,0,0,'','$paytype');";
            $resultatax3 = mysql_query($queryatax3);
        }
    }


#Insert AccDbcrNoteHeader
$querya6 = "call acc_sp_insdbcrnoteheader('$gindbcrseq','$dbcrno','CN','$compcode','$finid','$voudate','$party','$roundoff','$reason', '$narration','AC','$billmode','N');";
$resulta6 = mysql_query($querya6);
//echo $querya6;

$inscnt = 0;
/*
if ($billmode == 'D') {
    for ($i = 0; $i < $rowcnt; $i++) {
        $slno = $i + 1;
        $invno = $griddet[$i]['Inv_no'];
        $invdate = $griddet[$i]['Invoice_date'];
        $cramt = $griddet[$i]['Credit_val'];
        $adjamt = 0;

        #Insert AccTrail
        $querya5 = "call acc_sp_trn_insacc_trail('$ginaccrefseq','$slno','$invno','$invdate','$totalval','$adjamt','$party');";
        $resulta5 = mysql_query($querya5);

        $queryarefer = "insert into creditnote_refer values ('$ginaccrefseq',now(),'$adjamt')";
        $resultarefer = mysql_query($queryarefer);

        #Insert AccDbcrNoteTrailer
        $querya7 = "call acc_sp_insdbcrnotetrailer('$gindbcrseq','$slno','$invno','$invdate','$totalval','$compcode');";
        $resulta7 = mysql_query($querya7);

        if ($resulta5) {
            $inscnt = $inscnt + 1;
        }
    }
} else {
*/
    $refno = $paytype . $dbcrno;
     $slno = 1;
    #Insert AccTrail
    $querya5 = "call acc_sp_trn_insacc_trail('$ginaccrefseq',1,'$refno','$voudate','$totalval',0,'$party','C');";
    $resulta5 = mysql_query($querya5);
//echo $querya5;
    $queryarefer = "insert into creditnote_refer values ('$ginaccrefseq',now(),0)";
    $resultarefer = mysql_query($queryarefer);
//echo $queryarefer;
    #Insert AccDbcrNoteTrailer
//    $querya7 = "call acc_sp_insdbcrnotetrailer('$gindbcrseq',1,'',curdate(),'$totalval','$compcode');";
            if ($taxtype == "CS") {
                $querya7 = "call acc_sp_insdbcrnotetrailernew('$gindbcrseq','$slno','$invno','$invdate','$totalval','$compcode','$taxable','0','0', '$TAXVALnew','$TAXVALnew','$cgstper','$sgstper','$igstper','$cgstledcode','$sgstledcode','$igstledcode','0','0','0');";
                $resulta7 = mysql_query($querya7);
              //echo $querya7;
            } else if ($taxtype == "I") {
                $querya7 = "call acc_sp_insdbcrnotetrailernew('$gindbcrseq','$slno','$invno','$invdate','$totalval','$compcode','$taxable','0','$TAXVALnew','0','0'
,'$cgstper','$sgstper','$igstper','$cgstledcode','$sgstledcode','$igstledcode','0','0','0');";
                $resulta7 = mysql_query($querya7);
            }
//    $resulta7 = mysql_query($querya7);
//}

/*
if ($TAXVAL > 0) {
    if ($taxtype == "CS") {
        $queryagst = "insert into cr_gst values('$ginaccrefseq','$totalval','$party',curdate(),'$TAXVAL','$TAXVAL','0','$finid','$invdategst','$invnogst','$compcode','$vouno');";
        $resultagst = mysql_query($queryagst);
    } else {
        $queryagst = "insert into cr_gst values('$ginaccrefseq','$totalval','$party',curdate(),'0','0','$TAXVAL','$finid','$invdategst','$invnogst','$compcode','$vouno');";
        $resultagst = mysql_query($queryagst);
    }
}
*/

if ($resulta2 && $resulta3 && $resulta4 && $resulta6 && $resulta7 && $resulta5) {

    mysql_query("COMMIT");
    echo '({"success":"true","vouno":"' . $vouno . '"})';
} else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","vouno":"' . $vouno . '"})';
}
?>
