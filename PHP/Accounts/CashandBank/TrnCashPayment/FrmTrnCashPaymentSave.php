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
// $narration = $_REQUEST['narration'];
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
$vtype = "CHP";

$payterms = 0;


    $narration  = substr(trim($_POST['narration']),0,498);
 $narration=str_replace("'","",$narration);

mysqli_query($conn, "BEGIN");

 
if ($flagtype == "Add")
{
	$cquery1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
	$cresult1 = mysqli_query($conn, $cquery1);
	$crec1 = mysqli_fetch_array($cresult1);
	$ginaccrefseq = $crec1['con_value'];


        $query2 = "select ifnull(max(convert(substring(accref_vouno,5),signed)),0) +1 as vou_no from acc_ref where accref_vou_type = 'CHP' and accref_finid = '$finid' and accref_comp_code = '$compcode';";

        $result2 = mysqli_query($conn, $query2);
        $rec2 = mysqli_fetch_array($result2);
        $conval=$rec2['vou_no'];

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

        $vouno='CHP/'.$vno.'/'.$finsuffix;


}
else
     {

	 $query11 = "select * from acc_adjustments where ref_compcode =  $compcode and ref_docseqno = '$ginaccrefseq'";
	 $result11 = mysqli_query($conn, $query11);

//echo $query11;

	 while ($row = mysqli_fetch_assoc($result11)) {

	    $iadjseqno = $row['ref_adjseqno'];
	    $iadjamt   = $row['ref_adjamount'];

	    if ( $iadjamt > 0)
	    { 
	    $query12 = "update acc_trail  set acctrail_adj_value = acctrail_adj_value - $iadjamt where acctrail_accref_seqno = '$iadjseqno'";
	    $result12 = mysqli_query($conn, $query12);
//        echo $query12;
            }
          } 
          mysqli_free_result($result11);




	$cquery1 = "select ifnull(max(accvou_slno),0) + 1 as reccount  from acc_voucher_logs where accvou_seqno = '$ginaccrefseq';";
	$cresult1 = mysqli_query($conn, $cquery1);
	$crec1 = mysqli_fetch_array($cresult1);
	$reccount = $crec1['reccount'];





	$query1 = "delete from acc_trail  where acctrail_accref_seqno = '$ginaccrefseq'";
        $result1 = mysqli_query($conn, $query1);
//echo $query1;

	$query2 = "delete from acc_tran  where acctran_accref_seqno = '$ginaccrefseq'";
        $result2 = mysqli_query($conn, $query2);
//echo $query2;
        $query3 = "delete from acc_ref  where accref_seqno ='$ginaccrefseq' and accref_comp_code='$compcode' and accref_finid ='$finid'";
        $result3 = mysqli_query($conn, $query3);
//echo $query3;


        $query4 = "delete from acc_adjustments  where ref_docseqno ='$ginaccrefseq' and ref_compcode='$compcode' and ref_finid ='$finid'";
        $result4 = mysqli_query($conn, $query4);



     } 


$cquerya2 = "call acc_sp_trn_insacc_ref(" . $ginaccrefseq . ",'" . $vouno . "'," . $compcode . "," . $finid . ",'" . $voudate . "','$vtype','" . $bankname . "','" . $paymode . "','" . $refno . "','" . $refdate . "','" . $narration . "');";

//echo $cquerya2;
$cresulta2 = mysqli_query($conn, $cquerya2);


$cquerya3 = "insert into acc_voucher_logs values ($ginaccrefseq,$reccount,'$today',$usercode,'$reason')";
$cresulta3 = mysqli_query($conn, $cquerya3);


$inscnt = 0;
for ($i = 0; $i < $rowcnt; $i++) {
    $slno = $i + 1;
    $ledseq = $griddet[$i]['ledseq'];
    $dbamt = $griddet[$i]['dbamt'];
    $ledtype = $griddet[$i]['ledtype'];
    $description = strtoupper($griddet[$i]['narration']);

    $totamt = $dbamt ;

     $cramt = 0;

//    $curseq = $griddet[$i]['curseq'];
//    $amount = $griddet[$i]['amount'];
//    $exgrate = $griddet[$i]['exgrate'];
    if ($slno == 1 && $paytype == "BB") {
        $adjamt = $totadjamt;
    } else {
        $adjamt = 0;
    }
    $ledtype = $griddet[$i]['ledtype'];
    if ($dbamt>0)
    {
      $amtmode = "D";
    }
    else
    {
      $amtmode = "C";
    }





   if ($ledtype != 'G')
   {

      $querya3 = "call acc_sp_trn_insacc_trail('$ginaccrefseq','$slno','$vouno','$voudate','$dbamt','$adjamt','$ledseq','$amtmode','0','0');";   
      $resulta3 = mysqli_query($conn, $querya3);
   } 


//echo $querya3;

    $querya4 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$ledseq','$dbamt','$cramt','$totamt','CHP','$description');";
    $resulta4 = mysqli_query($conn, $querya4);
//echo $querya4;
    if ($resulta3 & $resulta4) {
        $inscnt = $inscnt + 1;
    }
}
$slno = $slno + 1;


$querya9 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$headacct','0','$rcptamt','$rcptamt','CHP','');";
$resulta9 = mysqli_query($conn, $querya9);
//echo $querya9;
$crcptno += 1;


//echo $querya10;

for ($i = 0; $i < $arowcnt; $i++) {
    $accadjseqno = $gridadjdet[$i]['accrefseqno'];
    $oaccvouno = $gridadjdet[$i]['invno'];
    $oaccvoudt = $gridadjdet[$i]['invdate'];
    $adjamt    = $gridadjdet[$i]['adjamt'];
    $dbcramt   = $gridadjdet[$i]['invamt'];
    $ovoutype  = $gridadjdet[$i]['voutype'];
    $adjvouno  = $gridadjdet[$i]['accrefvouno'];
    $adjvoudate  = $gridadjdet[$i]['accrefvoudate'];

    if ($adjamt > 0 && $paytype !== 'AD') {



 
       $query = "select ifnull(max(ref_slno),0) as refslno from acc_adjustments";
       $result = mysqli_query($conn, $query);
       $rec = mysqli_fetch_array($result);
       $ginrefslno = $rec['refslno'];
       $ginrefslno = $ginrefslno + 1;



//echo $ginrefslno;
//echo "<br>";


	$querydate = "select datediff('$voudate','$oaccvoudt') as daysin";
	$resultdate = mysqli_query($conn, $querydate);
	$recdatenew = mysqli_fetch_array($resultdate);
	$adjdays=$recdatenew['daysin'];



//echo $adjdays;
//echo "<br>";


$query10 = "insert into acc_adjustments (ref_slno, ref_compcode, ref_finid, ref_docseqno, ref_docno, ref_docdate, ref_adjseqno, ref_adjvouno, ref_invno, ref_invdate, ref_adjamount, ref_adj_days, ref_adj_by, ref_adjusted_on,ref_paymt_terms,ref_ledcode,ref_adjvoutype,ref_adjvoudate,ref_adjvoutype_db_cr) values ('$ginrefslno','$compcode','$finid','$ginaccrefseq','$vouno', '$voudate', '$accadjseqno','$adjvouno','$oaccvouno','$oaccvoudt','$adjamt',$adjdays,'CP',curdate(),$payterms,$ledseq,'CHP' ,'$adjvoudate','C');";


//echo $query10;
//echo "<br>";


$result10 = mysqli_query($conn, $query10);




            $ledseqno = $griddet[0]['ledseq'];
        $querya6 = "call acc_sp_trn_updacc_trail_seq_no('$accadjseqno','$oaccvouno','$adjamt','$ledseqno')";
            $resulta6 = mysqli_query($conn, $querya6);
    }
}
if ($flagtype == "Add")
{
	if ($cresulta2 &&  $resulta9)  
	{
	    mysqli_begin_transaction($conn);
	    echo '({"success":"true","vouno":"' . $vouno . '"})';
	} else {
	    mysqli_rollback($conn);


	    echo '({"success":"false","vouno":"' . $vouno . '"})';
	}
}
else
{
if ( $result1 &&  $result2 &&  $result3 && $cresulta2 &&  $resulta9)  
	{
	    mysqli_begin_transaction($conn);
	    echo '({"success":"true","vouno":"' . $vouno . '"})';
	} else {
	    mysqli_rollback($conn);


	    echo '({"success":"false","vouno":"' . $vouno . '"})';
	}
}
?>

