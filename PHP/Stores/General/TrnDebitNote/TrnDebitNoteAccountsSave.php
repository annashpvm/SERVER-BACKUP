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
//$voutype = $_REQUEST['voutype'];

$voutype = substr($vouno,0,3);



$bankname = '';
$paymode = '';
$payno ='';
$paydate = $_REQUEST['refdate'];
//$party = $_REQUEST['party'];

$partyledcode = $_REQUEST['partyledcode'];

$party = $_REQUEST['party'];

$drcrledger = (int) $_REQUEST['drcrledger'];
$taxable = (float) $_REQUEST['taxable'];
$debitvalue = $_REQUEST['totalamount'];

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
$invno = $_REQUEST['refno'];
$invdate = $_REQUEST['refdate'];
$gindbcrseq = $_REQUEST['dnseqno'];
$docseqno = $_REQUEST['docseqno'];
// $dnseqno = $_REQUEST['dnseqno'];

$rounding = (float) $_REQUEST['rounding'];
$roundoff = $_REQUEST['roundoff'];


$usercode = $_POST['usercode'];
$reason   = strtoupper($_POST['reason']);

$narration   = $_POST['remarks'];


$reccount = 1;
$today = date("Y-m-d H:i:s");  


#Begin Transaction
mysql_query("BEGIN");




	#Get Max AccRef Seqno from acc_ref
	$query1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
	$result1 = mysql_query($query1);
	$rec1 = mysql_fetch_array($result1);
	$ginaccrefseq = $rec1['con_value'];


        $query2 = "update str_debit_note set pur_accseqno = '$ginaccrefseq'  where pur_compcode = '$compcode' and pur_finid = '$finid' and pur_vouno = '$vouno' and pur_seqno = $docseqno";

        $result2 = mysql_query($query2);




#Insert AccRef


 
if ($ginaccrefseq > 0) {


    $query3 = "call acc_sp_trn_insacc_ref('$ginaccrefseq','$vouno','$compcode','$finid','$voudate','$voutype', '$bankname','$paymode','$invno', '$invdate','$narration');";
    $result3 = mysql_query($query3);

//echo $querya2;

   $query4 = "insert into acc_voucher_logs values ($ginaccrefseq,$reccount,'$today',$usercode,'')";
   $result4 = mysql_query($query4);




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
               $query5 = "call acc_sp_trn_insacc_trail ('$ginaccrefseq','$slno','$vouno', '$voudate', '$totamt' ,'$adjamt' ,'$ledseq' ,'$amtmode','0','0')";
               $result5 = mysql_query($query5);
//echo  $querya3;

               }  


            #Insert AccTran

            $query6 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$ledseq','$dbamt','$cramt','$totamt','$voutype');";
            $result6 = mysql_query($query6);


	  }
        }
}



	if ( $result2 && $result3  && $result6) 
	{
	  mysql_query("COMMIT");
	    echo '({"success":"true","vouno":"' . $vouno . '"})';
	} else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","vouno":"' . $vouno . '"})';
	}


?>
