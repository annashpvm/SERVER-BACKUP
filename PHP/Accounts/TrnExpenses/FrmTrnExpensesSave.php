<?php

require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");
session_start();

$savetype = ($_REQUEST['flagtype']);
$griddet = json_decode($_REQUEST['griddet'], true);
$rowcnt = $_REQUEST['cnt'];

$griddet2 = json_decode($_REQUEST['griddet2'], true);
$rowcnt2 = $_REQUEST['cnt2'];


$finid = $_REQUEST['finid'];
$finyear = $_REQUEST['finyear'];
$compcode = $_REQUEST['compcode'];

$ginaccrefseq = $_REQUEST['accrefseq'];
$conval = $_REQUEST['conval'];

$vouno = $_REQUEST['vouno'];
$voudate = $_REQUEST['voudate'];
$voutype = $_REQUEST['voutype'];

$party = $_REQUEST['party'];
$partyledcode = $_REQUEST['partyledcode'];


$refno = $_REQUEST['refno'];
$refdate = $_REQUEST['refdate'];


$taxable = (float) $_REQUEST['taxable'];
$cgstval = (float)$_REQUEST['cgstval'];
$sgstval = (float)$_REQUEST['sgstval'];
$igstval = (float)$_REQUEST['igstval'];

$tdsval = (float)$_REQUEST['tdsval'];

$rounding = (float)$_REQUEST['rounding'];


$totalamount  = $_REQUEST['totalamount'];


$usercode = $_POST['usercode'];
$reason   = strtoupper($_POST['reason']);


$narration   = substr(trim(strtoupper($_POST['narration'])),0,298);

$reccount = 1;
$today = date("Y-m-d H:i:s");  

$finsuffix   = $_POST['finsuffix'];


$servicetype = (int)$_REQUEST['servicetype'];
$payterms = (int)$_REQUEST['payterms'];

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
	$query2 = "select ifnull(max(eh_expno),0) + 1 as eh_expno from acc_expenses_header where eh_fincode = '$finid' and eh_compcode = '$compcode';";
	$result2 = mysql_query($query2);
	$rec2 = mysql_fetch_array($result2);
	$conval = $rec2['eh_expno'];
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

        $vouno='EXP/'.$vno.'/'.$finsuffix;



}

else
{

	$cquery1 = "select ifnull(max(accvou_slno),0) + 1 as reccount  from acc_voucher_logs where accvou_seqno = '$ginaccrefseq';";
	$cresult1 = mysql_query($cquery1);
	$crec1 = mysql_fetch_array($cresult1);
	$reccount = $crec1['reccount'];



	$query1 = "delete from acc_trail  where acctrail_accref_seqno = '$ginaccrefseq'";
        $result1 = mysql_query($query1);

//echo $query1;
//echo "</br>";
	$query2 = "delete from acc_tran  where acctran_accref_seqno = '$ginaccrefseq'";
        $result2 = mysql_query($query2);


	$query3 = "delete from acc_ref  where accref_seqno ='$ginaccrefseq' and accref_comp_code='$compcode' and accref_finid ='$finid'";
        $result3 = mysql_query($query3);



        $query4 = "delete from acc_expenses_trailer where et_compcode ='$compcode' and et_fincode='$finid' and et_expno ='$conval'";
        $result4 = mysql_query($query4);


        $query5 = "delete from acc_expenses_header where eh_compcode ='$compcode' and eh_fincode='$finid' and eh_expno ='$conval'";
        $result5 = mysql_query($query5);



}



#Insert Expenses Header
    $query1 = "call acc_sp_ins_expenses_header($compcode,'$finid','$conval','$vouno','$voudate','$party',
'$refno','$refdate',$taxable,$cgstval,$sgstval,$igstval,$tdsval,$rounding,$totalamount,'$ginaccrefseq','$narration','$servicetype')";

    $result1 = mysql_query($query1);


//echo $query1;
//echo "<br>";

#Insert AccRef


 
if ($conval > 0) {


#Insert  Expenses Trailer

        $inscnt = 0;
        for($i=0;$i<$rowcnt2;$i++){
            $slno = $i+1;
            $t_hsn          = $griddet2[$i]['hsncode'];
            $t_taxable      = (float) $griddet2[$i]['taxable'];
            $t_taxable_code = (int)$griddet2[$i]['taxablecode'];

            $t_cgstper      = (float) $griddet2[$i]['cgstper'];
            $t_cgstamt      = (float) $griddet2[$i]['cgstamt'];
            $t_cgst_ledcode = (int)$griddet2[$i]['cgstledcode'];
            $t_sgstper      = (float) $griddet2[$i]['sgstper'];
            $t_sgstamt      = (float) $griddet2[$i]['sgstamt'];
            $t_sgst_ledcode = (int)$griddet2[$i]['sgstledcode'];
            $t_igstper      = (float) $griddet2[$i]['igstper'];
            $t_igstamt      = (float) $griddet2[$i]['igstamt'];
            $t_igst_ledcode = (int)$griddet2[$i]['igstledcode'];
            $t_other_reason = $griddet2[$i]['other_reason'];
            $t_others     = (float) $griddet2[$i]['other_amount'];
            $t_tdsfor     = (float) $griddet2[$i]['tdsfor'];
            $t_tdsper     = (float) $griddet2[$i]['tdsper'];

            $t_tdscode    = (int) $griddet2[$i]['tdscode'];
            $t_tdsledcode = (int) $griddet2[$i]['tdsledcode'];
            $t_tdsamount  = (float) $griddet2[$i]['tdsvalue']; 
            $t_amount     = (float) $griddet2[$i]['totval'];


	$query2 = "call acc_sp_ins_expenses_trailer('$compcode','$finid','$conval','$slno','$t_hsn','$t_taxable', '$t_taxable_code','$t_cgstper','$t_cgstamt','$t_cgst_ledcode','$t_sgstper','$t_sgstamt','$t_sgst_ledcode','$t_igstper',	
'$t_igstamt','$t_igst_ledcode','$t_other_reason','$t_others','$t_tdscode','$t_tdsledcode','$t_tdsfor','$t_tdsper','$t_tdsamount','$t_amount')";

	$result2 = mysql_query($query2);

//echo $query2;
//echo "<br>";

       }



    $querya2 = "call acc_sp_trn_insacc_ref('$ginaccrefseq','$vouno','$compcode','$finid','$voudate','$voutype', '','','$conval', '$voudate','$narration');";
    $resulta2 = mysql_query($querya2);

//echo $querya2;
//echo "<br>";

$cquerya3 = "insert into acc_voucher_logs values ($ginaccrefseq,$reccount,'$today',$usercode,'$reason')";
$cresulta3 = mysql_query($cquerya3);


//echo $querya2;
//echo "</br>";
        $inscnt = 0;
        for($i=0;$i<$rowcnt;$i++){
            $slno = $i+1;
            $ledseq = $griddet[$i]['ledcode'];
            $dbamt = (float) $griddet[$i]['debit'];
            $cramt = (float) $griddet[$i]['credit'];
            $totamt =   $dbamt +  $cramt; 
            $ledtype = $griddet[$i]['ledtype'];
            $remarks = $griddet[$i]['remarks'];

            $remarks  = substr(trim($remarks),0,59);

            if ($dbamt>0)
            {
              $amtmode = "D";
            }
            else
            {
              $amtmode = "C";
            }

            if($ledseq>0){
            #Insert AccTrail
               if ($ledtype != 'G' && $i == 0)
               {
               $querya3 = "call acc_sp_trn_insacc_trail ('$ginaccrefseq','$slno','$refno', '$refdate', '$totamt' ,'$tdsval' ,'$ledseq' ,'$amtmode','$payterms','0')";
               $resulta3 = mysql_query($querya3);
//echo $querya3;
//echo "<br>";


               }  


            #Insert AccTran

               $querya4 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$ledseq','$dbamt','$cramt','$totamt','$voutype','$remarks');";
                $resulta4 = mysql_query($querya4);

//echo $querya4;
//echo "<br>";

            }
        }



}










if ($savetype == 'Add')
{
	if ($result1 &&  $result2 && $resulta2  && $resulta4 ) 
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
	if ($result1  &&  $result2 &&  $result3 &&  $result4 &&  $result5  && $resulta2  && $resulta4 )  
	{
	  mysql_query("COMMIT");
	    echo '({"success":"true","vouno":"' . $vouno . '"})';
	} else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","vouno":"' . $vouno . '"})';
	}
}


?>
