<?php

require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");

$flagtype = $_REQUEST['flagtype'];
$griddet = json_decode($_REQUEST['griddet'], true);
$gridadjdet = json_decode($_REQUEST['gridadjdet'], true);
$rowcnt = $_REQUEST['cnt'];
$arowcnt = $_REQUEST['adjcnt'];
$ginaccrefseq = $_REQUEST['accrefseq'];
$vouno = $_REQUEST['vouno'];
$voudate = $_REQUEST['voudate'];
$bankname = $_REQUEST['bankname'];
$refno = $_REQUEST['refno'];
$refdate = $_REQUEST['refdate'];
$narration = strtoupper($_REQUEST['narration']);
$paytype = $_REQUEST['paytype'];
$paymode = $_REQUEST['paymode'];
$payno = $_REQUEST['payno'];
$paydate = $_REQUEST['paydate'];
$headacct = $_REQUEST['headacct'];
$rcptamt = $_REQUEST['rcptamt'];
$totadjamt = $_REQUEST['totadjamt'];
$finid = $_REQUEST['finid'];
$finyear = $_REQUEST['finyear'];
$compcode = $_REQUEST['compcode'];
$usercode = $_POST['usercode'];
$reason   = strtoupper($_POST['reason']);

$reccount = 1;
$today = date("Y-m-d H:i:s");  

$finsuffix   = $_POST['finsuffix'];


$vtype = "CHR";
mysql_query("BEGIN");
if ($flagtype == "Add")
{
	$cquery1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
	$cresult1 = mysql_query($cquery1);
	$crec1 = mysql_fetch_array($cresult1);
	$ginaccrefseq = $crec1['con_value'];


        $query2 = "select ifnull(max(convert(substring(accref_vouno,5),signed)),0) +1 as vou_no from acc_ref where accref_vou_type = 'CHR' and accref_finid = '$finid' and accref_comp_code = '$compcode';";

        $result2 = mysql_query($query2);
        $rec2 = mysql_fetch_array($result2);
        $conval=$rec2['vou_no'];
//        $vouno="CHR".$conval;
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

        $vouno='CHR/'.$vno.'/'.$finsuffix;

} else
     {

	 $query11 = "select * from acc_adjustments where ref_compcode =  $compcode and ref_docseqno = '$ginaccrefseq'";
	 $result11 = mysql_query($query11);

//echo $query11;

	 while ($row = mysql_fetch_assoc($result11)) {

	    $iadjseqno = $row['ref_adjseqno'];
	    $iadjamt   = $row['ref_adjamount'];

	    if ( $iadjamt > 0)
	    { 
	    $query12 = "update acc_trail  set acctrail_adj_value = acctrail_adj_value - $iadjamt where acctrail_accref_seqno = '$iadjseqno'";
	    $result12 = mysql_query($query12);
//        echo $query12;
            }
          } 
          mysql_free_result($result11);


	$cquery1 = "select ifnull(max(accvou_slno),0) + 1 as reccount  from acc_voucher_logs where accvou_seqno = '$ginaccrefseq';";
	$cresult1 = mysql_query($cquery1);
	$crec1 = mysql_fetch_array($cresult1);
	$reccount = $crec1['reccount'];



//	$query13 = "update acc_trail , acc_adjustments  set acctrail_adj_value = acctrail_adj_value - ref_adjamount where acctrail_accref_seqno = ref_adjseqno and ref_docseqno =  '$ginaccrefseq'";
 //       $result13 = mysql_query($query13);




	$query1 = "delete from acc_trail  where acctrail_accref_seqno = '$ginaccrefseq'";
        $result1 = mysql_query($query1);
//echo $query1;
//echo "<br>";

	$query2 = "delete from acc_tran  where acctran_accref_seqno = '$ginaccrefseq'";
        $result2 = mysql_query($query2);


//echo $query2;
//echo "<br>";

	
        $query3 = "delete from acc_ref  where accref_seqno ='$ginaccrefseq' and accref_comp_code='$compcode' and accref_finid ='$finid'";
        $result3 = mysql_query($query3);

//echo $query3;
//echo "<br>";


        $query4 = "delete from acc_adjustments  where ref_docseqno ='$ginaccrefseq' and ref_compcode='$compcode' and ref_finid ='$finid'";
        $result4 = mysql_query($query4);

//echo $query4;
//echo "<br>";



     } 


$cquerya2 = "call acc_sp_trn_insacc_ref(" . $ginaccrefseq . ",'" . $vouno . "'," . $compcode . "," . $finid . ",'" . $voudate . "','$vtype','" . $bankname . "','". $paymode . "','" . $refno . "','" . $refdate . "',
'" . $narration ."');";
$cresulta2 = mysql_query($cquerya2);


//echo $cresulta2;
//echo "<br>";



$cquerya3 = "insert into acc_voucher_logs values ($ginaccrefseq,$reccount,'$today',$usercode,'$reason')";
$cresulta3 = mysql_query($cquerya3);




$inscnt = 0;
for ($i = 0; $i < $rowcnt; $i++) {
    $slno = $i + 1;

    $ledseq = $griddet[$i]['ledseq'];
    $dbamt = $griddet[$i]['dbamt'];
    $cramt = $griddet[$i]['cramt'];
    $totamt = $griddet[$i]['totamt'];
    $ledtype = $griddet[$i]['ledtype'];

    if ($slno == 1 && $paytype == 'BB') {
        $adjamt = $totadjamt;
    } else {
        $adjamt = 0;
    }
/*
    if ($dbamt>0)
       {
          $amtmode = "D";
       }
       else
       {
        $amtmode = "C";
   }
*/
        $amtmode = "C";



     $querya4 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$ledseq','0','$cramt','$cramt','CHR','');";
     $resulta4 = mysql_query($querya4);
//echo $querya4;
//echo "<br>";	

   if ($ledtype != 'G')
   {

      $querya3 = "call acc_sp_trn_insacc_trail('$ginaccrefseq','$slno','$vouno','$voudate','$cramt','$adjamt','$ledseq','$amtmode','0','0');";   
      $resulta3 = mysql_query($querya3);
   } 
//echo $querya3;
//echo "<br>";



    if ($resulta4) {
        $inscnt = $inscnt + 1;
    }

}
$slno = $slno + 1;


$querya9 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$headacct','$rcptamt','0','$rcptamt','CHR','');";
//echo $querya9;
//echo "<br>";	
$resulta9 = mysql_query($querya9);
$crcptno += 1;

//$querya10 = "call acc_sp_trn_updcurbal_recpay_seqno('REC','$crcptno','$headacct','$finid','$compcode');";
//$resulta10 = mysql_query($querya10);

for ($i = 0; $i < $arowcnt; $i++) {

    $accadjseqno = $gridadjdet[$i]['accrefseqno'];
    $invno       = $gridadjdet[$i]['invno'];
    $invdate     = $gridadjdet[$i]['invdate'];
    $adjamt      = (float) $gridadjdet[$i]['adjamt'];
    $adjvouno    = $gridadjdet[$i]['accrefvouno'];
    $payterms    = (int)$gridadjdet[$i]['payterms'];
    $voutype     = $gridadjdet[$i]['voutype'];




    if ($adjamt > 0 && $paytype !== 'AD') {

 
       $query = "select ifnull(max(ref_slno),0) as refslno from acc_adjustments";
       $result = mysql_query($query);
       $rec = mysql_fetch_array($result);
       $ginrefslno = $rec['refslno'];
       $ginrefslno = $ginrefslno + 1;


	$querydate = "select datediff('$voudate','$invdate') as daysin";
	$resultdate = mysql_query($querydate);
	$recdatenew = mysql_fetch_array($resultdate);
	$adjdays=$recdatenew['daysin'];


$query10 = "insert into acc_adjustments (ref_slno, ref_compcode, ref_finid, ref_docseqno, ref_docno, ref_docdate, ref_adjseqno, ref_adjvouno, ref_invno, ref_invdate, ref_adjamount, ref_adj_days, ref_adj_by, ref_adjusted_on,ref_paymt_terms,ref_ledcode,ref_adjvoutype) values ('$ginrefslno','$compcode','$finid','$ginaccrefseq','$vouno', '$voudate', '$accadjseqno','$adjvouno','$invno','$invdate','$adjamt',$adjdays,'CR',curdate(),$payterms,$ledseq,'$voutype' );";

$result10 = mysql_query($query10);

//echo $query10;
//echo "<br>";
/*
		$queryrefchk = "select accref_vou_type,accref_vouno from acc_ref where accref_seqno='$oaccrefseq'";
		$resultrefchk = mysql_query($queryrefchk);
		$recrefchk = mysql_fetch_array($resultrefchk);
		$accvoutype=$recrefchk['accref_vou_type'];
		$refvounumber=$recrefchk['accref_vouno'];
*/


                $ledseqno = $griddet[0]['ledseq'];
                $querya6 = "call acc_sp_trn_updacc_trail_seq_no('$accadjseqno','$invno','$adjamt','$ledseqno')";
                $resulta6 = mysql_query($querya6);
        }
    }

//if ($cresulta2 && ($inscnt == $rowcnt) && $resulta8 && $resulta9 && $resulta10) {
if ($flagtype == "Add")
{
	if ($cresulta2 && ($inscnt == $rowcnt) && $resulta9 ) {

	    mysql_query("COMMIT");
	    echo '({"success":"true","vouno":"' . $vouno . '"})';
	} else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","vouno":"' . $vouno . '"})';
	}
}
else
{
	if ( $result1 &&  $result2 &&  $result3 &&  $cresulta2 && ($inscnt == $rowcnt) && $resulta9) {

	    mysql_query("COMMIT");
	    echo '({"success":"true","vouno":"' . $vouno . '"})';
	} else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","vouno":"' . $vouno . '"})';
	}
}

?>
