<?php

require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");

$flagtype = strtoupper($_REQUEST['flagtype']);
$griddet = json_decode($_REQUEST['griddet'], true);
$gridadjdet = json_decode($_REQUEST['gridadjdet'], true);
$rowcnt = $_REQUEST['cnt'];
$arowcnt = $_REQUEST['adjcnt'];
$accrefseq = $_REQUEST['accrefseq'];
$vouno = $_REQUEST['vouno'];
$voudate = $_REQUEST['voudate'];
$bankname = $_REQUEST['bankname'];
$refno = $_REQUEST['refno'];
$refdate = $_REQUEST['refdate'];
$narration = $_REQUEST['narration'];
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
$entrypoint = $_REQUEST['entrypoint'];

$vtype = "CP";
if ($entrypoint == "H") 
{
   $vtype = "MP";
}



$cquery1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
$cresult1 = mysql_query($cquery1);
$crec1 = mysql_fetch_array($cresult1);
$caccrefseq = $crec1['con_value'];

$cquery2 = "select led_prefix from acc_ledger_master where led_code = '$headacct' and led_comp_code = '$compcode';";
$cquery2 = "select led_prefix from acc_ledger_master where led_code = '$headacct'";
$cresult2 = mysql_query($cquery2);
$crec2 = mysql_fetch_array($cresult2);
$cledprefix = $crec2['led_prefix'];

$cquery3 = "select curbal_pay_seqno from acc_current_balance where curbal_led_code = '$headacct' and curbal_finid = '$finid' and curbal_comp_code = $compcode";
$cresult3 = mysql_query($cquery3);
$crec3 = mysql_fetch_array($cresult3);
$crcptno = $crec3['curbal_pay_seqno'];

$cvouno = $cledprefix . "P" . $crcptno;

$query4 = "select ifnull(max(recpay_seqno),0) + 1 as con_value from acc_recpay_tran;";
$result4 = mysql_query($query4);
$rec4 = mysql_fetch_array($result4);
$ginrecpayseq = $rec4['con_value'];

mysql_query("BEGIN");


$cquerya2 = "call acc_sp_trn_insacc_ref(" . $caccrefseq . ",'" . $cvouno . "'," . $compcode . "," . $finid . ",'" . $voudate . "','$vtype','" . $bankname . "','"
        . $paymode . "','" . $payno . "','" . $paydate . "','" . $narration . "',0,0,'$entrypoint');";

$cresulta2 = mysql_query($cquerya2);

$inscnt = 0;
for ($i = 0; $i < $rowcnt; $i++) {
    $slno = $i + 1;
    $ledseq = $griddet[$i]['ledseq'];
    $dbamt = $griddet[$i]['dbamt'];
    $cramt = $griddet[$i]['cramt'];
    $totamt = $griddet[$i]['totamt'];
    $curseq = $griddet[$i]['curseq'];
    $amount = $griddet[$i]['amount'];
    $exgrate = $griddet[$i]['exgrate'];
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
 //  if ($ledtype <> "G") { // Updated 21-Oct-2021
//    $querya3 = "call acc_sp_trn_insacc_trail('$caccrefseq','$slno','$refno','$refdate','$totamt','$adjamt','$ledseq','$amtmode');";
       $querya3 = "call acc_sp_trn_insacc_trail('$caccrefseq','$slno','$cvouno ','$voudate','$totamt','$adjamt','$ledseq','$amtmode');";
       $resulta3 = mysql_query($querya3);
 //   } // Updated 21-Oct-2021

    $querya4 = "call acc_sp_trn_insacc_tran('$caccrefseq','$slno','$ledseq','$dbamt','$cramt','$totamt','$curseq','$amount','$exgrate','','$paytype');";
    $resulta4 = mysql_query($querya4);
    if ($resulta3 & $resulta4) {
        $inscnt = $inscnt + 1;
    }
}
$slno = $slno + 1;

/*
$querya8 = "call acc_sp_trn_insacc_trail('$caccrefseq','$slno','$refno','$refdate','$rcptamt','$totadjamt','$headacct');";
$resulta8 = mysql_query($querya8);
*/

$querya9 = "call acc_sp_trn_insacc_tran('$caccrefseq','$slno','$headacct','0','$rcptamt','$rcptamt','$curseq','$amount','$exgrate','','$paytype');";
$resulta9 = mysql_query($querya9);
$crcptno += 1;

$querya10 = "call acc_sp_trn_updcurbal_recpay_seqno('PAY','$crcptno','$headacct','$finid','$compcode')";
$resulta10 = mysql_query($querya10);

for ($i = 0; $i < $arowcnt; $i++) {
    $oaccrefseq = $gridadjdet[$i]['accrefseqno'];
    $oaccvouno = $gridadjdet[$i]['invno'];
    $oaccvoudt = $gridadjdet[$i]['invdate'];
    $recpayamt = $gridadjdet[$i]['adjamt'];
    $dbcramt = $gridadjdet[$i]['dbcramt'];
    $ovoutype = $gridadjdet[$i]['voutype'];

    if ($recpayamt > 0 && $ovoutype !== 'AD') {
        $querya5 = "call acc_sp_trn_insrecpay_tran('$ginrecpayseq','$oaccrefseq','$oaccvouno','$oaccvoudt','$caccrefseq','$recpayamt','$dbcramt');";
        $resulta5 = mysql_query($querya5);
        $ginrecpayseq = $ginrecpayseq + 1;

        if ($ovoutype == 'OB') {
            $querya7 = "call acc_sp_trn_updob_billdetails_adjvalue('$oaccrefseq','$recpayamt');";
            $resulta7 = mysql_query($querya7);
        } else {
            $ledseqno = $griddet[0]['ledseq'];
            $querya6 = "call acc_sp_trn_updacc_trail_seq_no('$oaccrefseq','$oaccvouno','$recpayamt','$ledseqno');";
            $resulta6 = mysql_query($querya6);
        }
    }
}

//if ($cresulta2 && ($inscnt == $rowcnt) && $resulta8 && $resulta9 && $resulta10) {
//if ($cresulta2 && ($inscnt == $rowcnt) && $resulta9 && $resulta10)
if ($cresulta2 &&  $resulta9 && $resulta10)  
{
    mysql_query("COMMIT");
    echo '({"success":"true","vouno":"' . $cvouno . '"})';
} else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","vouno":"' . $crcptno . '"})';
}
?>

