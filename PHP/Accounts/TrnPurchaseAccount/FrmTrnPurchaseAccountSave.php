<?php

require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");
session_start();

$savetype = ($_REQUEST['flagtype']);

$griddet = json_decode($_REQUEST['griddet'], true);
$rowcnt = $_REQUEST['cnt'];

$griddet2 = json_decode($_REQUEST['griddet2'], true);
$rowcnt2 = $_REQUEST['cnt2'];


$ginaccrefseq = $_REQUEST['accrefseq'];
$vouno = $_REQUEST['vouno'];
$voudate = $_REQUEST['voudate'];
$refno = $_REQUEST['refno'];
$refdate = $_REQUEST['refdate'];




$narration = ($_REQUEST['narration']);
$voutype = $_REQUEST['voutype'];
$bankname = '';
$paymode = '';
$payno ='';
$paydate = $_REQUEST['refdate'];
//$party = $_REQUEST['party'];
//$partyledcode = $_REQUEST['partyledcode'];

$party = $_REQUEST['partyledcode'];

$drcrledger = (int) $_REQUEST['drcrledger'];
$taxable = (float) $_REQUEST['taxable'];
$debitvalue = $_REQUEST['debitvalue'];

$billmode = $_REQUEST['billmode'];
$reason = $_REQUEST['reason'];
$totalamount = $_REQUEST['totalamount'];

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
$roundoff = $_REQUEST['roundoff'];


$usercode = $_POST['usercode'];
$reason   = strtoupper($_POST['reason']);

$reccount = 1;
$today = date("Y-m-d H:i:s");  


#Begin Transaction
mysql_query("BEGIN");

if ($savetype == 'Edit')
{

	$cquery1 = "select ifnull(max(accvou_slno),0) + 1 as reccount  from acc_voucher_logs where accvou_seqno = '$ginaccrefseq';";
	$cresult1 = mysql_query($cquery1);
	$crec1 = mysql_fetch_array($cresult1);
	$reccount = $crec1['reccount'];



	$query1 = "delete from acc_trail  where acctrail_accref_seqno = '$ginaccrefseq'";
        $resulta1 = mysql_query($query1);

	$query2 = "delete from acc_tran  where acctran_accref_seqno = '$ginaccrefseq'";
        $resulta2 = mysql_query($query2);
	
        $query3 = "delete from acc_ref  where accref_seqno ='$ginaccrefseq' and accref_comp_code='$compcode' and accref_finid ='$finid'";
        $resulta3 = mysql_query($query3);

        $query4 = "delete from  acc_direct_purchase where pur_compcode = '$compcode' and pur_finid = '$finid' and pur_vouno = '$vouno'";
        $resulta4 = mysql_query($query4);




}
else
{
	#Get Max AccRef Seqno from acc_ref
	$query1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
	$result1 = mysql_query($query1);
	$rec1 = mysql_fetch_array($result1);
	$ginaccrefseq = $rec1['con_value'];

	#Get Voucher Number
	$query2 = "select ifnull(max(pur_seqno),0) + 1 as seq_no from acc_direct_purchase where pur_finid = '$finid' and pur_compcode = '$compcode';";
	$result2 = mysql_query($query2);
	$rec2 = mysql_fetch_array($result2);
	$conval = $rec2['seq_no'];
	$vouno = $voutype . $conval;

}
        $inscnt = 1;
        for($i=0;$i<$rowcnt2;$i++){
            $slno = $i+1;
            $description = $griddet2[$i]['description'];
            $hsn =   $griddet2[$i]['hsn'];
            $qty = (float) $griddet2[$i]['qty'];
            $rate = (float) $griddet2[$i]['rate'];
            $value = (float) $griddet2[$i]['value'];
            if ($value > 0)
            {
		   $querya1 = "insert into acc_direct_purchase values ('$conval', '$compcode', '$finid','$vouno', '$voudate', '$party', '$refno', '$refdate', '$inscnt' , '$description', '$hsn',  '$rate' , '$qty', '1',  $value, '$taxable', '$drcrledger', '$cgstper', '$cgstval', '$cgstledcode', '$sgstper' , '$sgstval','$sgstledcode', '$igstper', '$igstval', '$igstledcode', '$rounding', '$roundoff', '$totalamount','$ginaccrefseq')";
		   $resulta1 = mysql_query($querya1);
		   $inscnt =    $inscnt  + 1;

//echo $querya1;

            }    

         }  


 
if ($conval > 0) {


    $querya2 = "call acc_sp_trn_insacc_ref('$ginaccrefseq','$vouno','$compcode','$finid','$voudate','$voutype', '$bankname','$paymode','$payno', '$paydate','$narration');";
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
               $querya3 = "call acc_sp_trn_insacc_trail ('$ginaccrefseq','$slno','$refno', '$refdate', '$totamt' ,'$adjamt' ,'$ledseq' ,'$amtmode','0','0')";
               $resulta3 = mysql_query($querya3);
//echo  $querya3;

               }  


            #Insert AccTran

            $querya4 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$ledseq','$dbamt','$cramt','$totamt','$voutype','');";
            $resulta4 = mysql_query($querya4);

//echo  $querya4;	   
            if(resulta4){
                $inscnt = $inscnt + 1;
            }

	  }
        }




}







	if ($resulta1 && $resulta2 && $resulta3 && $resulta4   ) 
	{
	  mysql_query("COMMIT");
	    echo '({"success":"true","vouno":"' . $vouno . '"})';
	} else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","vouno":"' . $vouno . '"})';
	}

?>
