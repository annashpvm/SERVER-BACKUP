<?php

require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");
session_start();

$savetype = ($_REQUEST['savetype']);
$griddet = json_decode($_REQUEST['griddet'], true);
$rowcnt = $_REQUEST['cnt'];




$invseqno = $_REQUEST['accrefseq'];
$vouno = $_REQUEST['vouno'];
$voudate = $_REQUEST['voudate'];
$invno = $_REQUEST['invno'];
$invdate = $_REQUEST['invdate'];
$narration = strtoupper($_REQUEST['narration']);
$voutype = $_REQUEST['paytype'];
$bankname = $_REQUEST['bankname'];
$paymode = $_REQUEST['paymode'];
$payno = $_REQUEST['payno'];
$paydate = $_REQUEST['paydate'];
$party = $_REQUEST['party'];
$partyledcode = $_REQUEST['partyledcode'];
$drcrledger = $_REQUEST['drcrledger'];
$taxable = $_REQUEST['taxable'];
$CreditValue = (float)$_REQUEST['CreditValue'];

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
$tdsvaluenew = 0; // ($tdsvalue * $tdsper) / 100;

$cgstledcode = (int)$_REQUEST['cgst'];
$sgstledcode = (int)$_REQUEST['sgst'];
$igstledcode = (int)$_REQUEST['igst'];
$gstper = $_REQUEST['gstper'];
$gltype = $_REQUEST['gltype'];
$invno = $_REQUEST['invno'];
$gindbcrseq = $_REQUEST['dncrseqno'];
$conval = $_REQUEST['conval'];
$rounding = (float) $_REQUEST['rounding'];

$hsncode = $_POST['hsncode'];


$usercode = $_POST['usercode'];
$reason   = strtoupper($_POST['reason']);

$invvouno = $_POST['invvouno'];
$payterms = $_POST['payterms'];

$reccount = 1;
$today = date("Y-m-d H:i:s");  


$invbalance = 0;
$qty        = (float) $_POST['qty'];
$cdreason   = $_POST['cdreason'];

$itemname  = substr(trim($_POST['itemname']),0,38);

$tcsledger = (int) $_REQUEST['tcsledger'];
$tcsvalue  = (float) $_REQUEST['tcsvalue'];
$tcsper    = (float) $_REQUEST['tcsper'];

$frtledger = (int) $_REQUEST['frtledger'];
$frtvalue  = (float) $_REQUEST['frtvalue'];


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
	$query2 = "select ifnull(max(dbcr_no),0) + 1 as dbcr_no from acc_dbcrnote_header where dbcr_type = 'CNG' and dbcr_finid = '$finid' and dbcr_comp_code = '$compcode';";
	$result2 = mysql_query($query2);
	$rec2 = mysql_fetch_array($result2);
	$conval = $rec2['dbcr_no'];

//	$vouno = $voutype . $conval;

	//$vouno = 'G-' . $conval;

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
        $vouno="CNG-".$vno ;

#echo $conval;
//echo "<br>";

//echo $vouno;

	#Get Max DBCR Seqno from acc_dbcrnote_header

	$query3 = "select ifnull(max(dbcr_seqno),0) + 1 as con_value from acc_dbcrnote_header;";
	$result3 = mysql_query($query3);
	$rec3 = mysql_fetch_array($result3);
	$gindbcrseq = $rec3['con_value'];


	#Get INVOICE BALANCE

	$query3 = "select acctrail_inv_value - acctrail_adj_value - $CreditValue as balamt from  acc_trail  where acctrail_accref_seqno = $invseqno;";
	$result3 = mysql_query($query3);
	$rec3 = mysql_fetch_array($result3);
	$invbalance = $rec3['balamt'];


// echo $query3;
// echo "<br>";
// echo $invbalance;

//	$roundoff = round($totalval) - $totalval;
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

        $query4 = "delete from acc_adjustments  where ref_docseqno ='$ginaccrefseq' and ref_compcode='$compcode' and ref_finid ='$finid'";
        $result4 = mysql_query($query4);


        $query4 = "update acc_dbcrnote_header set dbcr_date =  '$voudate', dbcr_partycode = '$party' , dbcr_ledcode = '$drcrledger', dbcr_value = '$CreditValue', dbcr_narration =  '$narration' , dbcr_party_type = '$gltype' ,dbcr_modifydate = '$today'  where dbcr_vouno = '$vouno' and dbcr_comp_code = '$compcode' and dbcr_finid = '$finid'";
        $result4 = mysql_query($query4);


// echo $query4;
// echo "<br>";

        $query5 = "update acc_dbcrnote_trailer set dbcrt_inv_no = '$invno' , dbcrt_inv_date = '$invdate'  , dbcrt_grossvalue = '$taxable',dbcrt_value ='$CreditValue',dbcrt_igstvalue = '$igstval' ,dbcrt_cgstvalue = '$cgstval' ,dbcrt_sgstvalue = '$sgstval', dbcrt_igstper = '$igstper', dbcrt_cgstper = '$cgstper', dbcrt_sgstper = '$sgstper', dbcrt_igstledcode ='$igstledcode' , dbcrt_cgstledcode =  '$cgstledcode' , dbcrt_sgstledcode =  '$sgstledcode' ,dbcrt_rounding = '$rounding' , dbcrt_tcsper = '$tcsper', dbcrt_tcsledcode =  '$tcsledger' , dbcrt_tcsvalue = $tcsvalue , dbcrt_frtledcode =  '$frtledger' , dbcrt_frtamt = $frtvalue where dbcrt_seqno = '$gindbcrseq'";

       $result5 = mysql_query($query5);


// echo $query5;
// echo "<br>";


}


#Insert AccRef


 
if ($conval > 0) {




    $querya2 = "call acc_sp_trn_insacc_ref('$ginaccrefseq','$vouno','$compcode','$finid','$voudate','$voutype', '$bankname','$paymode','$invno', '$invdate','$narration');";
    $resulta2 = mysql_query($querya2);

// echo $querya2;
// echo "<br>";

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
               if ($invbalance >= 0)
               { 
	               $querya3 = "call acc_sp_trn_insacc_trail ('$ginaccrefseq','$slno','$vouno', '$voudate', '$totamt' ,'$totamt' ,'$ledseq' ,'$amtmode','0','0')";
               }
               else
               { 
	               $querya3 = "call acc_sp_trn_insacc_trail ('$ginaccrefseq','$slno','$vouno', '$voudate', '$totamt' ,'$CreditValue' ,'$ledseq' ,'$amtmode','0','0')";
               }
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

    $querya6 = "call acc_sp_insdbcrnoteheader('$gindbcrseq','$compcode','$finid','CNG','$conval','$vouno','$voudate','$party','$partyledcode','$drcrledger', '$CreditValue','$narration','C','N', '$ginaccrefseq','$hsncode','$usercode','$qty','$cdreason','0','$itemname','$today','$today');";
    $resulta6 = mysql_query($querya6);

// echo $querya6;
// echo "<br>";


#Insert AccDbcrNoteTrailer


	
$querya7 = "call acc_sp_insdbcrnotetrailer('$gindbcrseq','$invno','$invdate','$taxable' ,'$CreditValue','$igstval', '$cgstval','$sgstval','$igstper','$cgstper','$sgstper','$igstledcode','$cgstledcode','$sgstledcode',$tcsvalue,$tcsper,$tcsledger,$frtvalue,$frtledger,'$rounding',0,0,$taxable)";
    $resulta7 = mysql_query($querya7);

//echo $querya7;
// echo "<br>";

$querya8 = "update trnsal_salret_header set reth_vouno = '$vouno', reth_accrefno = '$ginaccrefseq' , reth_accupd ='Y'  where reth_fincode = '$finid' and reth_comp_code= $compcode and reth_invno = '$invno'";
    $resulta8 = mysql_query($querya8);




//	if ($invbalance >= 0)
//	{ 

		$querya9 = "update acc_trail  set acctrail_adj_value = acctrail_adj_value + $CreditValue where acctrail_accref_seqno = '$invseqno'";
		$resulta9 = mysql_query($querya9);

//echo $querya9;
// echo "<br>";



	       $query = "select ifnull(max(ref_slno),0)+1 as refslno from acc_adjustments";
	       $result = mysql_query($query);
	       $rec = mysql_fetch_array($result);
	       $ginrefslno = $rec['refslno'];

	

//echo $ginrefslno;
// echo "<br>";

		$querydate = "select datediff('$voudate','$invdate') as daysin";
		$resultdate = mysql_query($querydate);
		$recdatenew = mysql_fetch_array($resultdate);
		$adjdays=$recdatenew['daysin'];


		$querya10 = "insert into acc_adjustments (ref_slno, ref_compcode, ref_finid, ref_docseqno, ref_docno, ref_docdate, ref_adjseqno, ref_adjvouno, ref_invno, ref_invdate, ref_adjamount, ref_adj_days, ref_adj_by, ref_adjusted_on,ref_paymt_terms,ref_ledcode,ref_adjvoutype) values ('$ginrefslno','$compcode','$finid','$ginaccrefseq', '$vouno', '$voudate', '$invseqno','$invno','$invno', '$invdate','$CreditValue ',$adjdays,'CN',curdate(),$payterms,$partyledcode,'$voutype' );";

		$resulta10 = mysql_query($querya10);


//echo $querya10;
// echo "<br>";

//	}
}



if ($savetype == 'Add')
{
	if ($resulta2 && $resulta3 && $resulta4 && $resulta6 && $resulta7 && $querya8) 
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
