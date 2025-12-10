<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$invhcompcode = $_POST['invhcompcode'];
$invhfincode  = $_POST['invhfincode'];
$invhparty  = $_POST['invhparty'];
$invhrefno  = $_POST['invhrefno'];
$invhdate   = $_POST['invhdate'];
$invhtotwt  = $_POST['invhtotwt']/1000;
$invhnetamt = $_POST['invhnetamt'];
$smsnumber  = $_POST['smsnumber'];

$query1= "update trnsal_invoice_header set SMSsent = 'Y' where invh_invrefno = '$invhrefno'  and invh_fincode = '$invhfincode'  and invh_comp_code = '$invhcompcode'";
$result1=mysql_query($query1); 


$msg = "Dear $invhparty, your bill details, Inv.No: $invhrefno Dt: $invhdate  Qty: $invhtotwt Amt:  $invhnetamt Thanking you, Sri Hari Venkateswara Paper Mills (P) Ltd"; 


$url = "http://smsserver9.creativepoint.in/api.php?username=shvpmills&password=652971&to=$smsnumber&from=SHVPML&message=".urlencode($msg)."&PEID=1701159973422121680&templateid=1507165174687014183";    //Store data into URL variable

$ret = file($url);

print_r($ret);    //$ret stores the msg-id

   
?>


