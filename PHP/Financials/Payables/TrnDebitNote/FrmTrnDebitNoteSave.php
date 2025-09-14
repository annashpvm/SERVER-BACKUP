<?php

require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");
session_start();

$flagtype = ($_REQUEST['flagtype']);
$griddet = json_decode($_REQUEST['griddet'], true);
$rowcnt = $_REQUEST['cnt'];

$accrefseq = $_REQUEST['accrefseq'];
$vouno = $_REQUEST['vouno'];
$voudate = $_REQUEST['voudate'];
$refno = $_REQUEST['refno'];
$refdate = $_REQUEST['refdate'];
$narration = ($_REQUEST['narration']);
$paytype = $_REQUEST['paytype'];
$bankname = $_REQUEST['bankname'];
$paymode = $_REQUEST['paymode'];
$payno = $_REQUEST['payno'];
$paydate = $_REQUEST['paydate'];
$party = $_REQUEST['party'];
$creditor = $_REQUEST['creditor'];
$totalval = $_REQUEST['totalval'];
$billmode = $_REQUEST['billmode'];
$reason = $_REQUEST['reason'];
$taxtype = $_REQUEST['taxtype'];
$TAXVAL = $_REQUEST['TAXVAL'];
$TCSVAL = $_REQUEST['TCSVAL'];
$finid = $_REQUEST['finid'];
$finyear = $_REQUEST['finyear'];
$compcode = $_REQUEST['compcode'];
$output = $_REQUEST['output'];
$tdsper = $_REQUEST['tdsper'];
$tdsvalue = $_REQUEST['tdsvalue'];
$tdsvaluenew = ($tdsvalue * $tdsper) / 100;
$Qty = $_REQUEST['Qty'];
$cgstledcode = $_REQUEST['cgst'];
$sgstledcode = $_REQUEST['sgst'];
$igstledcode = $_REQUEST['igst'];
$gstper = $_REQUEST['gstper'];
$entrypoint = $_REQUEST['entrypoint'];
$gltype = $_REQUEST['gltype'];




#Get Max AccRef Seqno from acc_ref
$query1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
$result1 = mysql_query($query1);
$rec1 = mysql_fetch_array($result1);
$ginaccrefseq = $rec1['con_value'];

#Get Voucher Number
$query2 = "select ifnull(max(dbcr_no),0) + 1 as dbcr_no from acc_dbcrnote_header where dbcr_type = 'DN' and dbcr_finid = '$finid' and dbcr_comp_code = '$compcode';";
$result2 = mysql_query($query2);
$rec2 = mysql_fetch_array($result2);
$conval = $rec2['dbcr_no'];
$vouno = $paytype . $conval;

#Get Max DBCR Seqno from acc_dbcrnote_header

$query3 = "select ifnull(max(dbcr_seqno),0) + 1 as con_value from acc_dbcrnote_header;";
$result3 = mysql_query($query3);
$rec3 = mysql_fetch_array($result3);
$gindbcrseq = $rec3['con_value'];


#Get DebitNote Number
$query4 = "select ifnull(max(dbcr_no),0) + 1 as dbcr_no from acc_dbcrnote_header where dbcr_type = 'DN' and dbcr_finid = '$finid' and dbcr_comp_code = '$compcode';";
$result4 = mysql_query($query4);
$rec4 = mysql_fetch_array($result4);
$dbcrno = $rec4['dbcr_no'];


$roundoff = round($totalval) - $totalval;

#Begin Transaction
mysql_query("BEGIN");
#Insert AccRef
if ($conval > 0) {
    $querya2 = "call acc_sp_trn_insacc_ref('$ginaccrefseq','$vouno','$compcode','$finid','$voudate',                'DN','$bankname','$paymode','$payno','$paydate','$narration',0,0,'$entrypoint');";
    $resulta2 = mysql_query($querya2);

#Insert AccTran for Party Ledger
    $querya3 = "call acc_sp_trn_insacc_tran('$ginaccrefseq',1,'$party','$totalval',0,'$totalval',1,0,0,'','$paytype');";
    $resulta3 = mysql_query($querya3);

    $dnnew = $totalval - $TAXVAL;

#Insert AccTran for Credit Ledger
    $querya4 = "call acc_sp_trn_insacc_tran('$ginaccrefseq',2,'$creditor',0,'$dnnew','$dnnew',1,0,0,'','$paytype');";
   $resulta4 = mysql_query($querya4);

    $cgstper = 0;
    $sgstper = 0;
    $igstper = 0;
    if ($taxtype == "CS") {
        $TAXVALnew = $TAXVAL / 2;
        $newdtvalue = $dnnew + $TAXVALnew;
        $cgstper = round($gstper/2,1);
        $sgstper = round($gstper/2,1);
    } else {
        $TAXVALnew = $TAXVAL;
        $newdtvalue = $dnnew + $TAXVALnew;
        $igstper = round($igstper);

    }

     if ($TAXVAL > 0) {
                if ($taxtype == "CS") {
                    $TAXVAL = $TAXVAL / 2;
                    $queryatax = "call acc_sp_trn_insacc_tran('$ginaccrefseq',3,'$cgstledcode',0,'$TAXVAL','$TAXVAL',1,0,0,'','$paytype');";
                    $resultatax = mysql_query($queryatax);
                    $queryatax2 = "call acc_sp_trn_insacc_tran('$ginaccrefseq',4,'$sgstledcode',0,'$TAXVAL','$TAXVAL',1,0,0,'','$paytype');";
                    $resultatax2 = mysql_query($queryatax2);
                } else if ($taxtype == "I") {
                    $queryatax3 = "call acc_sp_trn_insacc_tran('$ginaccrefseq',3,'$igstledcode',0,'$TAXVAL','$TAXVAL',1,0,0,'','$paytype');";
                    $resultatax3 = mysql_query($queryatax3);
                }
        }
    }
#Insert AccDbcrNoteHeader
    $querya6 = "call acc_sp_insdbcrnoteheader('$gindbcrseq','$conval','DN','$compcode','$finid','$voudate',
                '$party','$roundoff','$reason','$narration','AC','$billmode','N');";
    $resulta6 = mysql_query($querya6);



    $inscnt = 0;
    if ($billmode == 'D') {
        for ($i = 0; $i < $rowcnt; $i++) {
            $slno = $i + 1;
            $invno = $griddet[$i]['Inv_no'];
            $invdate = $griddet[$i]['Invoice_date'];
            $dbamt = $griddet[$i]['Debit_val'];
            $acctrailseq = $griddet[$i]['value'];
            $adjamt = 0;

            #Insert AccTrail
            $querya5 = "call acc_sp_trn_insacc_trail('$ginaccrefseq','$slno','$invno','$invdate','$totalval','$adjamt','$party');";
            $resulta5 = mysql_query($querya5);


            #Insert AccDbcrNoteTrailer

            if ($taxtype == "CS") {
                $querya7 = "call acc_sp_insdbcrnotetrailernew('$gindbcrseq','$slno','$invno','$invdate','$totalval','$compcode','$dnnew','0','0', '$TAXVALnew','$TAXVALnew','$cgstper','$sgstper','$igstper','$cgstledcode','$sgstledcode','$igstledcode','0','0','0');";
                $resulta7 = mysql_query($querya7);
            } else if ($taxtype == "I") {
                $querya7 = "call acc_sp_insdbcrnotetrailernew('$gindbcrseq','$slno','$invno','$invdate','$totalval','$compcode','$dnnew','0','$TAXVALnew','0','0'
,'$cgstper','$sgstper','$igstper','$cgstledcode','$sgstledcode','$igstledcode','0','0','0');";
                $resulta7 = mysql_query($querya7);
            }

            #Update acctrail for bills voucher
            $querya9 = "call acc_sp_trn_updacc_trail_seq_no('$acctrailseq','$invno','$totalval','$party');";
            $resulta9 = mysql_query($querya9);

            #Update acctrail for Debit Note Voucher                
            $querya10 = "call acc_sp_trn_updacc_trail_seq_new('$ginaccrefseq','$invno','$totalval','$party');";
            $resulta10 = mysql_query($querya10);

            $queryref = "select ifnull(max(refseqno),0) + 1 as refseqno from acc_recpay_ref;";
            $resultref = mysql_query($queryref);
            $recref = mysql_fetch_array($resultref);
            $recrefseq = $recref['refseqno'];

            $queryrefchk = "select accref_vou_type,accref_vouno from acc_ref where accref_seqno='$acctrailseq'";
            $resultrefchk = mysql_query($queryrefchk);
            $recrefchk = mysql_fetch_array($resultrefchk);
            $accvoutype = $recrefchk['accref_vou_type'];
            $refvounumber = $recrefchk['accref_vouno'];

            $queryrefchkbal = "select sum(acctrail_adj_value) as adjvalueref from acc_trail where acctrail_accref_seqno='$acctrailseq' and acctrail_led_code='$party'";
            $resultrefchkbal = mysql_query($queryrefchkbal);
            $recrefchkbal = mysql_fetch_array($resultrefchkbal);
            $balamtref = $recrefchkbal['adjvalueref'];

            $querydate = "select datediff(curdate(),'$invdate') as daysin";
            $resultdate = mysql_query($querydate);
            $recdatenew = mysql_fetch_array($resultdate);
            $refdays = $recdatenew['daysin'];

            $queryrefins = "insert into acc_recpay_ref values ('$recrefseq','$acctrailseq','$ginaccrefseq','$totalval',curdate(),'$balamtref','$accvoutype','$refvounumber','$vouno','$finid','$compcode','$invno','$invdate','$totalval','$refdays','DEBITNOTE')";
            $resultrefins = mysql_query($queryrefins);

            if ($resulta5 && $resultrefins) {
                $inscnt = $inscnt + 1;
            }
        }
        }
 else {
        $slno = 1;
        $refno = $paytype . $dbcrno;
        #Insert AccTrail
        $querya5 = "call acc_sp_trn_insacc_trail('$ginaccrefseq','$slno','$vouno','$voudate','$totalval',0,'$party','D');";
        $resulta5 = mysql_query($querya5);

        #Insert AccDbcrNoteTrailer	
        if ($taxtype == "CS") {
            $querya7 = "call acc_sp_insdbcrnotetrailernew('$gindbcrseq','$slno','',curdate(),'$totalval','$compcode','$dnnew','0','$TAXVALnew','$TAXVALnew', '$cgstper','$sgstper','$igstper','$cgstledcode','$sgstledcode','$igstledcode')";
            $resulta7 = mysql_query($querya7);
        } else if ($taxtype == "I") {
            $querya7 = "call acc_sp_insdbcrnotetrailernew('$gindbcrseq','$slno','',curdate(),'$totalval', '$compcode','$dnnew', '$TAXVALnew','0','0', '$cgstper','$sgstper','$igstper', '$cgstledcode','$sgstledcode','$igstledcode')";
            $resulta7 = mysql_query($querya7);
        }
    }


    $slno = $slno + 1;
    $refno = $paytype . $dbcrno;
#Insert AccTrail for Debit Ledger

//    $querya8 = "call acc_sp_trn_insacc_trail('$ginaccrefseq','$slno','$vouno','$voudate','$totalval',0,'$creditor');";
//    $resulta8 = mysql_query($querya8);

    $querytds = "select led_grp_code from acc_ledger_master where led_code='$creditor'";
    $resulttds = mysql_query($querytds);
    $rectds = mysql_fetch_array($resulttds);
    $tedled = $rectds['led_grp_code'];

    $querytdsmax = "select ifnull(max(id),0) + 1 as id from acc_tds";
    $resulttdsmax = mysql_query($querytdsmax);
    $rectdsmax = mysql_fetch_array($resulttdsmax);
    $tedledmax = $rectdsmax['id'];

    if ($tedled == 65 && $creditor > 0) {
        $querytdsins = "insert into acc_tds values('$tedledmax','$ginaccrefseq','$tdsper','$tdsvalue','$creditor',curdate(),'$tdsvaluenew','$finid','$compcode','$vouno')";
        $resulttdsins = mysql_query($querytdsins);
    }

    if ($Qty > 0) {
        $querytupd = "update acc_dbcrnote_trailer set dbcr_qty='$Qty' where dbcr_seqno='$gindbcrseq'";
        $resultupd = mysql_query($querytupd);
    }


if ($resulta2 && $resulta3 && $resulta4 && $resulta6 && $querya7 && $querya5) {
  mysql_query("COMMIT");
    echo '({"success":"true","vouno":"' . $vouno . '"})';
} else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","vouno":"' . $vouno . '"})';
}
?>
