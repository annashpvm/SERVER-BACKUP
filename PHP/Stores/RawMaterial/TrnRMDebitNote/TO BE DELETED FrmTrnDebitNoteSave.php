<?php

require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");
session_start();

$savetype = ($_REQUEST['savetype']);

$griddet = json_decode($_REQUEST['griddet'], true);
$rowcnt = $_REQUEST['cnt'];

$dngriddet = json_decode($_REQUEST['dngriddet'], true);
$rowcntdn  = $_REQUEST['dncnt'];


$ginaccrefseq = $_REQUEST['accrefseq'];
$vouno = $_REQUEST['vouno'];
$voudate = $_REQUEST['voudate'];
$refno = $_REQUEST['refno'];
$refdate = $_REQUEST['refdate'];
$narration = ($_REQUEST['narration']);
$voutype = $_REQUEST['voutype'];
$bankname = $_REQUEST['bankname'];
$paymode = $_REQUEST['paymode'];
$payno = $_REQUEST['payno'];
$paydate = $_REQUEST['paydate'];
$party = $_REQUEST['party'];
$partyledcode = $_REQUEST['partyledcode'];

$drcrledger = (int) $_REQUEST['drcrledger'];
$taxable = (float) $_REQUEST['taxable'];
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

$TCSVAL = $_REQUEST['TCSVAL'];
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

$usercode = $_POST['usercode'];
$reason   = strtoupper($_POST['reason']);

$reccount = 1;
$today = date("Y-m-d H:i:s");  

$hsncode = $_POST['hsncode'];  

$qtycorrection = $_POST['qtycorrection'];  

if ($cgstval ==0)
   $cgstledcode = 0;

if ($sgstval ==0)
   $sgstledcode = 0;

if ($igstval ==0)
   $igstledcode = 0;



$gstper = $_REQUEST['gstper'];
$gltype = $_REQUEST['gltype'];

$invno   = strtoupper($_REQUEST['invno']);
$invdate = $_REQUEST['invdate'];
$invqty  = (float)$_REQUEST['invqty'];
$invamt  = (float)$_REQUEST['invamt'];



$gindbcrseq = $_REQUEST['dncrseqno'];
$conval = $_REQUEST['conval'];
$rounding = (float) $_REQUEST['rounding'];


$totaldedqty    = (float)$_REQUEST['totaldedqty'];

if ($totaldedqty >0)
   $dnqty          = (float)$_REQUEST['totaldedqty']/1000;
else
   $dnqty          = 0;


$roundneed      = $_REQUEST['roundneed'];
$qcentryno      = (int)$_REQUEST['qcentryno'];





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
	$query2 = "select ifnull(max(dbcr_no),0) + 1 as dbcr_no from tmpacc_dbcrnote_header where dbcr_type = '$voutype' and dbcr_finid = '$finid' and dbcr_comp_code = '$compcode';";
	$result2 = mysql_query($query2);
	$rec2 = mysql_fetch_array($result2);
	$conval = $rec2['dbcr_no'];
        $lastno = substr('000'. $conval,-4);
    	$vouno = $voutype .' '. $lastno;

	#Get Max DBCR Seqno from tmpacc_dbcrnote_header

	$query3 = "select ifnull(max(dbcr_seqno),0) + 1 as con_value from tmpacc_dbcrnote_header;";
	$result3 = mysql_query($query3);
	$rec3 = mysql_fetch_array($result3);
	$gindbcrseq = $rec3['con_value'];


//	$roundoff = round($totalval) - $totalval;
}
else
{


	$cquery1 = "select ifnull(max(accvou_slno),0) + 1 as reccount  from acc_voucher_logs where accvou_seqno = '$ginaccrefseq';";
	$cresult1 = mysql_query($cquery1);
	$crec1 = mysql_fetch_array($cresult1);
	$reccount = $crec1['reccount'];


/*

	$query1 = "delete from acc_trail  where acctrail_accref_seqno = '$ginaccrefseq'";
        $result1 = mysql_query($query1);

	$query2 = "delete from acc_tran  where acctran_accref_seqno = '$ginaccrefseq'";
        $result2 = mysql_query($query2);
	
        $query3 = "delete from acc_ref  where accref_seqno ='$ginaccrefseq' and accref_comp_code='$compcode' and accref_finid ='$finid'";
        $result3 = mysql_query($query3);

*/

        $query4 = "update tmpacc_dbcrnote_header set dbcr_date = '$voudate' , dbcr_partycode = '$party',dbcr_partyledcode = '$partyledcode',dbcr_ledcode = '$drcrledger', dbcr_value = '$debitvalue', dbcr_narration =  '$narration' , dbcr_party_type = '$gltype'  , dbcr_output = '$output' where dbcr_vouno = '$vouno'  and dbcr_comp_code = '$compcode' and dbcr_finid = '$finid'";
        $result4 = mysql_query($query4);

//echo $query4;

        $query5 = "update tmpacc_dbcrnote_trailer set dbcrt_inv_no = '$invno' , dbcrt_inv_date = '$invdate'  , dbcrt_grossvalue = '$taxable',dbcrt_value ='$debitvalue',dbcrt_igstvalue = '$igstval' ,dbcrt_cgstvalue = '$cgstval' ,dbcrt_sgstvalue = '$sgstval', dbcrt_igstper = '$igstper', dbcrt_cgstper = '$cgstper', dbcrt_sgstper = '$sgstper', dbcrt_igstledcode ='$igstledcode' , dbcrt_cgstledcode =  '$cgstledcode' , dbcrt_sgstledcode =  '$sgstledcode' ,dbcrt_rounding = '$rounding'  where dbcrt_seqno = '$gindbcrseq'";

       $result5 = mysql_query($query5);
//echo $query5;

}

#Insert AccRef

/*
 
if ($conval > 0) {


    $querya2 = "call acc_sp_trn_insacc_ref('$ginaccrefseq','$vouno','$compcode','$finid','$voudate','$voutype', '$bankname','$paymode','$payno', '$paydate','$narration',0,0);";
    $resulta2 = mysql_query($querya2);

//echo $querya2;

$cquerya3 = "insert into acc_voucher_logs values ($ginaccrefseq,$reccount,'$today',$usercode,'$reason')";
$cresulta3 = mysql_query($cquerya3);


//echo $cquerya3;

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
               $querya3 = "call acc_sp_trn_insacc_trail ('$ginaccrefseq','$slno','$vouno', '$voudate', '$totamt' ,'$adjamt' ,'$ledseq' ,'$amtmode','0')";
               $resulta3 = mysql_query($querya3);
//echo  $querya3;

               }  


            #Insert AccTran

            $querya4 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$ledseq','$dbamt','$cramt','$totamt','$voutype');";
            $resulta4 = mysql_query($querya4);

//echo  $querya4;	   
            if(resulta4){
                $inscnt = $inscnt + 1;
            }

	  }
        }
}
*/

if ($savetype == 'Add')
{

#Insert AccDbcrNoteHeader
    $querya6 = "call tmpacc_sp_insdbcrnoteheader('$gindbcrseq','$compcode','$finid','$voutype','$conval','$vouno','$voudate','$party','$partyledcode','$drcrledger', '$debitvalue','$narration','S' , '$output', '$ginaccrefseq','$hsncode','$usercode','$dnqty','W.P');";
    $resulta6 = mysql_query($querya6);
   

//echo $querya6;
//echo "<br>";

#Insert AccDbcrNoteTrailer


$querya7 = "call tmpacc_sp_insdbcrnotetrailer('$gindbcrseq','$invno','$invdate','$taxable' ,'$debitvalue','$igstval', '$cgstval','$sgstval','$igstper','$cgstper','$sgstper','$igstledcode','$cgstledcode','$sgstledcode',0,0,0,0,0,'$rounding',0,0,'$taxable')";
    $resulta7 = mysql_query($querya7);

//echo $querya7;
//echo "<br>";


}

$inscnt = 0;
for($i=0;$i<$rowcntdn;$i++){
    $slno = $i+1;
    $ticketno = $dngriddet[$i]['ticketno'];
    $itemcode = $dngriddet[$i]['itemcode'];
    $itemtype = $dngriddet[$i]['itemtype'];
    $remarks  = $dngriddet[$i]['remarks'];
    $totdedqty = (float) $dngriddet[$i]['totDNqty'];
    $rate      = (float) $dngriddet[$i]['rate'];
    $taxable   = (float) $dngriddet[$i]['value'];
    $shortage  = (float) $dngriddet[$i]['shortage'];
    $ratediff  = (float) $dngriddet[$i]['ratediff'];
    $valuediff = (float) $dngriddet[$i]['valuediff'];

//    $taxable = $taxable + $valuediff;


 $query2 = "update trn_qc_rm_inspection set 
  qc_rm_ded_rate =  $rate ,  qc_rm_ded_qty =  $totdedqty,qc_rm_taxable = $taxable, qc_rm_cgst_per =$cgstper, qc_rm_sgst_per = $sgstper, qc_rm_igst_per = $igstper, qc_rm_cgst_value = $cgstval, qc_rm_sgst_value = $sgstval,   qc_rm_igst_value = $igstval, qc_rm_round_need = '$roundneed', qc_rm_rounding = $rounding, qc_rm_debitamount =$debitvalue, qc_rm_pur_ledger = $drcrledger , qc_rm_debitnote_no = '$vouno',qc_rm_debitnote_date = '$voudate' ,qc_rm_dn_raised  = 'Y' , qc_rm_billno = '$invno' , qc_rm_billdate = '$invdate' , qc_rm_billvalue = $invamt , qc_rm_dn_raised ='Y' , qc_rm_shortage = $shortage  , qc_rm_ratediff = '$ratediff' , qc_rm_valuediff = $valuediff , qc_rm_qtycorrection = '$qtycorrection' , qc_rm_remarks = '$remarks' where qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' and  qc_rm_entryno = $qcentryno and qc_rm_ticketno = $ticketno and  qc_rm_itemcode =  $itemcode and qc_rm_itemtype = '$itemtype'";

 
//echo $query2;
//echo "<br>";

$result2=mysql_query($query2);



}




if ($savetype == 'Add')
{
	if ( $resulta6 && $resulta7  && $result2) 
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
	if ($result2 && $result4 && $result5) 
	{
	  mysql_query("COMMIT");
	    echo '({"success":"true","vouno":"' . $vouno . '"})';
	} else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","vouno":"' . $vouno . '"})';
	}
}


?>
