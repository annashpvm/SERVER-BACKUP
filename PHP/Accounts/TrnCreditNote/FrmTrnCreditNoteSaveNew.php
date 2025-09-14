<?php

require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");
session_start();


$savetype = ($_REQUEST['savetype']);
$griddet = json_decode($_REQUEST['griddet'], true);
$rowcnt = $_REQUEST['cnt'];


$adjgriddet = json_decode($_REQUEST['gridadjdet'], true);
$adjrowcnt = $_REQUEST['adjcnt'];



$ginaccrefseq = $_REQUEST['accrefseq'];
$vouno = $_REQUEST['vouno'];
$voudate = $_REQUEST['voudate'];
$refno = $_REQUEST['refno'];
$refdate = $_REQUEST['refdate'];
$narration = strtoupper($_REQUEST['narration']);
$voutype = $_REQUEST['voutype'];
$bankname = $_REQUEST['bankname'];
$paymode = $_REQUEST['paymode'];
$payno = $_REQUEST['payno'];
$paydate = $_REQUEST['paydate'];
$party = $_REQUEST['party'];
$partyledcode = $_REQUEST['partyledcode'];
$drcrledger = $_REQUEST['drcrledger'];
$taxable = $_REQUEST['taxable'];

$partycreditvalue = $_REQUEST['partycreditvalue'];
$debitvalue = $_REQUEST['debitvalue'];


$billmode = $_REQUEST['billmode'];
$reason = $_REQUEST['reason'];
$taxtype = $_REQUEST['taxtype'];

$cgstper = (float)$_REQUEST['cgstper'];
$sgstper = (float)$_REQUEST['sgstper'];
$igstper = (float)$_REQUEST['igstper'];
$cgstval = (float)$_REQUEST['cgstval'];
$sgstval = (float)$_REQUEST['sgstval'];
$igstval = (float)$_REQUEST['igstval'];

$tcsper =  (float)$_REQUEST['tcsper'];
$tcsvalue = (float)$_REQUEST['tcsvalue'];

$finid = $_REQUEST['finid'];
$finyear = $_REQUEST['finyear'];
$compcode = $_REQUEST['compcode'];
$output = $_REQUEST['output'];
$tdsper = $_REQUEST['tdsper'];
$tdsvalue = $_REQUEST['tdsvalue'];
$tdsvaluenew = ($tdsvalue * $tdsper) / 100;

$cgstledcode = (int)$_REQUEST['cgst'];
$sgstledcode = (int)$_REQUEST['sgst'];
$igstledcode = (int)$_REQUEST['igst'];
$tcsledger = (int)$_REQUEST['tcsledger'];

$otheramt = (float)$_REQUEST['otheramt'];
$otherled = (int)$_REQUEST['otherled'];


$frtamt  = (float)$_REQUEST['frtamt'];
$frtled  = (int)$_REQUEST['frtled'];
$hsncode = $_REQUEST['hsncode'];
             

$totaladjusted  = (float)$_REQUEST['totaladjusted'];



if ($cgstval ==0)
   $cgstledcode = 0;

if ($sgstval ==0)
   $sgstledcode = 0;

if ($igstval ==0)
   $igstledcode = 0;





$gstper = $_REQUEST['gstper'];
$gltype = $_REQUEST['gltype'];
$invno = $_REQUEST['invno'];
$invdate = $_REQUEST['invdate'];
$gindbcrseq = $_REQUEST['dncrseqno'];
$conval = $_REQUEST['conval'];
$rounding = (float) $_REQUEST['rounding'];
$usercode = $_POST['usercode'];
$reason   = $_POST['reason'];

$reccount = 1;
$today = date("Y-m-d H:i:s");  


$qty        = (float) $_POST['qty'];
$cdreason   = $_POST['cdreason'];
$cdCRDR     = $_POST['cdCRDR'];

    $itemname  = substr(trim($_POST['itemname']),0,38);


#Begin Transaction
mysql_query("BEGIN");

if ($savetype == 'Add')
{
	#Get Max AccRef Seqno from acc_ref
	$query1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
	$result1 = mysql_query($query1);
	$rec1 = mysql_fetch_array($result1);
	$ginaccrefseq = $rec1['con_value'];

	#Get Voucher Number
	$query2 = "select ifnull(max(dbcr_no),0) + 1 as dbcr_no from acc_dbcrnote_header where dbcr_type = '$voutype' and dbcr_finid = '$finid' and dbcr_comp_code = '$compcode';";
	$result2 = mysql_query($query2);
	$rec2 = mysql_fetch_array($result2);
	$conval = $rec2['dbcr_no'];

// to be modified in the new fin year
//	$vouno = $voutype . $conval;

  //      $vouno = $vouno;


        if ($conval < 10)
        {                                              
          $vno = "00".$conval;
        }                                      
        else
        {  
             if ($conval < 100) 
             {                                              
              $vno = "0".$conval;                   
             }
             else 
             {      
               $vno = $conval;  
             }
        } 
        $vouno =$voutype."-".$vno ;

//echo  $vouno

	#Get Max DBCR Seqno from acc_dbcrnote_header

	$query3 = "select ifnull(max(dbcr_seqno),0) + 1 as con_value from acc_dbcrnote_header;";
	$result3 = mysql_query($query3);
	$rec3 = mysql_fetch_array($result3);
	$gindbcrseq = $rec3['con_value'];


	$roundoff = round($totalval) - $totalval;
}
else
{

	$cquery1 = "select ifnull(max(accvou_slno),0) + 1 as reccount  from acc_voucher_logs where accvou_seqno = '$ginaccrefseq';";
	$cresult1 = mysql_query($cquery1);
	$crec1 = mysql_fetch_array($cresult1);
	$reccount = $crec1['reccount'];



	$query1 = "delete from acc_trail  where acctrail_accref_seqno = '$ginaccrefseq'";
        $result1 = mysql_query($query1);

	$query2 = "delete from acc_tran  where acctran_accref_seqno = '$ginaccrefseq'";
        $result2 = mysql_query($query2);
	
        $query3 = "delete from acc_ref  where accref_seqno ='$ginaccrefseq' and accref_comp_code='$compcode' and accref_finid ='$finid'";
        $result3 = mysql_query($query3);

        $query4 = "update acc_dbcrnote_header set  dbcr_date = '$voudate', dbcr_partycode = '$party' , dbcr_partyledcode = '$partyledcode', dbcr_ledcode = '$drcrledger', dbcr_value = '$partycreditvalue', dbcr_narration =  '$narration' , dbcr_party_type = '$gltype' , dbcr_output = '$output', dbcr_hsncode = '$hsncode',
dbcr_qty = '$qty'  ,dbcr_reason = '$cdreason' ,dbcr_modifydate = '$today'  where dbcr_vouno = '$vouno' and dbcr_comp_code = '$compcode' and dbcr_finid = '$finid'";

//echo $query4;
        $result4 = mysql_query($query4);

  //      $query5 = "update acc_dbcrnote_trailer set dbcrt_inv_no = '$invno' , dbcrt_inv_date = '$invdate' , dbcrt_grossvalue = '$taxable', dbcrt_value ='$partycreditvalue', dbcrt_igstvalue = '$igstval' , dbcrt_cgstvalue = '$cgstval', dbcrt_sgstvalue = '$sgstval', dbcrt_igstper = '$igstper', dbcrt_cgstper = '$cgstper', dbcrt_sgstper = '$sgstper', dbcrt_igstledcode ='$igstledcode', dbcrt_csgstledcode =  '$cgstledcode' , dbcrt_cgstledcode = '$cgstledcode where dbcrt_seqno = '$gindbcrseq'";

        $query5 = "update acc_dbcrnote_trailer set dbcrt_inv_no = '$invno' , dbcrt_inv_date = '$invdate'  , dbcrt_grossvalue = '$debitvalue',dbcrt_value ='$partycreditvalue',dbcrt_igstvalue = '$igstval' ,dbcrt_cgstvalue = '$cgstval' ,dbcrt_sgstvalue = '$sgstval', dbcrt_igstper = '$igstper', dbcrt_cgstper = '$cgstper', dbcrt_sgstper = '$sgstper', dbcrt_igstledcode ='$igstledcode' , dbcrt_cgstledcode =  '$cgstledcode' , dbcrt_sgstledcode =  '$sgstledcode' ,dbcrt_rounding = '$rounding'  , dbcrt_otheramt  = '$otheramt', dbcrt_otherledcode = '$otherled', dbcrt_frtamt = '$frtamt' , dbcrt_frtledcode = '$frtled' , dbcrt_taxable = '$taxable' , dbcrt_tcsper = '$tcsper', dbcrt_tcsledcode =  '$tcsledger' , dbcrt_tcsvalue = $tcsvalue where dbcrt_seqno = '$gindbcrseq'";

       $result5 = mysql_query($query5);

}

#Insert AccRef


 
if ($ginaccrefseq > 0) {


    $querya2 = "call acc_sp_trn_insacc_ref('$ginaccrefseq','$vouno','$compcode','$finid','$voudate','$voutype', '$bankname','$paymode','$payno', '$paydate','$narration');";
    $resulta2 = mysql_query($querya2);

//echo $querya2;
//echo "<br>";


$cquerya3 = "insert into acc_voucher_logs values ($ginaccrefseq,$reccount,'$today',$usercode,'$reason')";
$cresulta3 = mysql_query($cquerya3);



        $inscnt = 0;
        for($i=0;$i<$rowcnt;$i++){
            $slno = $i+1;
            $ledseq = $griddet[$i]['ledcode'];
            $dbamt = (float) $griddet[$i]['debit'];
            $cramt = (float) $griddet[$i]['credit'];
            $totamt =   $dbamt +  $cramt; 
            $ledtype = $griddet[$i]['ledtype'];
            if ($dbamt>0)
            {
              $amtmode = "D";
            }
            else
            {
              $amtmode = "C";
            }
            $adjamt=0;
            if($ledseq>0){
            #Insert AccTrail
               if ($ledtype != 'G')
               {
               $querya3 = "call acc_sp_trn_insacc_trail ('$ginaccrefseq','$slno','$vouno', '$voudate', '$totamt' ,'$adjamt' ,'$ledseq' ,'$amtmode','0','0')";
               $resulta3 = mysql_query($querya3);
//echo  $querya3;
//echo "<br>";
               }  


            #Insert AccTran

            $querya4 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$ledseq','$dbamt','$cramt','$totamt','$voutype','');";
            $resulta4 = mysql_query($querya4);

//echo  $querya4;	   
//echo "<br>";
            if(resulta4){
                $inscnt = $inscnt + 1;
            }

	  }
        }




}

if ($savetype == 'Add')
{

#Insert AccDbcrNoteHeader
    $querya6 = "call acc_sp_insdbcrnoteheader('$gindbcrseq','$compcode','$finid','$voutype','$conval','$vouno','$voudate','$party','$partyledcode','$drcrledger', '$partycreditvalue','$narration','$gltype', '$output','$ginaccrefseq','$hsncode','$usercode', '$qty','$cdreason','0','$itemname','$today','$today')";
    $resulta6 = mysql_query($querya6);

//echo $querya6;
//echo "<br>";

#Insert AccDbcrNoteTrailer


$querya7 = "call acc_sp_insdbcrnotetrailer('$gindbcrseq','$invno','$invdate','$debitvalue' ,'$partycreditvalue','$igstval', '$cgstval','$sgstval','$igstper','$cgstper','$sgstper','$igstledcode','$cgstledcode','$sgstledcode',$tcsvalue,$tcsper,$tcsledger,$otheramt,'$otherled','$rounding','$frtamt','$frtled','$taxable')";
 $resulta7 = mysql_query($querya7);

//echo $querya7;
//echo "<br>";


// Bill adjustments save


$inscnt = 0;
for ($i = 0; $i < $adjrowcnt; $i++) {



    $ginrefslno = $ginrefslno + 1;
    $adjvouno  = $adjgriddet[$i]['accrefvouno'];
    $invno     = $adjgriddet[$i]['invno'];
    $invdate = $adjgriddet[$i]['invdate'];
    $invnonew = $adjgriddet[$i]['invno'];
    $adjamt = $adjgriddet[$i]['adjamt'];
    $accadjseqno = $adjgriddet[$i]['accrefseqno'];
    $recpayamt = $adjgriddet[$i]['recpayamt'];
    $voutype = $adjgriddet[$i]['voutype'];
    $Year = $adjgriddet[$i]['Year'];

    $payterms    = (int)$adjgriddet[$i]['payterms'];

    $dbcramt = $adjgriddet[$i]['invamt'];

    $adjvouno = substr(trim($adjvouno),0,29);
    $invno    = substr(trim($invno),0,29);

/*
    if ($gridadjdet[$i]['dbcramt'] > 0) {
        $dbcramt = $gridadjdet[$i]['dbcramt'];
    } else {
        $dbcramt = 0;
    }
*/


    if ($adjamt > 0) {


    $query = "select ifnull(max(ref_slno),0) as refslno from acc_adjustments";
    $result = mysql_query($query);
    $rec = mysql_fetch_array($result);
    $ginrefslno = $rec['refslno'];
//echo $ginrefslno;
//echo "<br>";

      $ginrefslno = $ginrefslno + 1;

		$querydate = "select datediff('$voudate','$invdate') as daysin";
		$resultdate = mysql_query($querydate);
		$recdatenew = mysql_fetch_array($resultdate);
		$adjdays=$recdatenew['daysin'];



        $query1 = "insert into acc_adjustments (ref_slno, ref_compcode, ref_finid, ref_docseqno, ref_docno, ref_docdate, ref_adjseqno, ref_adjvouno, ref_invno, ref_invdate, ref_adjamount, ref_adj_days, ref_adj_by, ref_adjusted_on,ref_paymt_terms,ref_ledcode,ref_adjvoutype) values ('$ginrefslno','$compcode','$finid','$ginaccrefseq','$vouno', '$voudate', '$accadjseqno','$adjvouno','$invno','$invdate','$adjamt',$adjdays,'BA',curdate(),$payterms,'$party','$voutype' );";

        $result1 = mysql_query($query1);

//echo $query1;
//echo "<br>";


        $query2 = "call acc_sp_trn_updacc_trail_seq_no('$ginaccrefseq','$vouno','$adjamt','$party')";
        $result2 = mysql_query($query2);


//echo $query2;
//echo "<br>";
        $query3 = "call acc_sp_trn_updacc_trail_seq_no('$accadjseqno','$invno','$adjamt','$party')";
        $result3 = mysql_query($query3);
//echo $query3;
//echo "<br>";


    }
}
}




if ($savetype == 'Add')
{
	if ($resulta2 && $resulta4  && $resulta6 && $resulta7) 
	{
	  mysql_query("COMMIT");
	    echo '({"success":"true","vouno":"' . $vouno . '"})';
	} else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","vouno":"' . $vouno . '"})';
	}
}
else
{
	if ($result1  && $result2 && $result3 && $result4 && $result5) 
	{
	  mysql_query("COMMIT");
	    echo '({"success":"true","vouno":"' . $vouno . '"})';
	} else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","vouno":"' . $vouno . '"})';
	}
}


?>
