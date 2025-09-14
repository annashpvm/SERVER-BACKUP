<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();

$invhcompcode = $_POST['invhcompcode'];
$invhfincode  = $_POST['invhfincode'];
$invhparty  = substr($_POST['invhparty'],0,28);
$invhparty2  = substr($_POST['invhparty'],28,58);
$invhrefno  = $_POST['invhrefno'];
$invhdate   = $_POST['invhdate'];
$invhtotwt  = $_POST['invhtotwt']/1000;
$invhnetamt = $_POST['invhnetamt'];
$smsnumber  = $_POST['smsnumber'];

//$smsnumber  = '9486927561';

$TEMPVAR = '';

$query1= "update trnsal_invoice_header set SMSsent = 'Y' where invh_invrefno = '$invhrefno'  and invh_fincode = '$invhfincode'  and invh_comp_code = '$invhcompcode'";
$result1=mysql_query($query1); 


$msg = "Dear $invhparty$invhparty2  your bill details, Inv.No: $invhrefno Dt: $invhdate  Qty: $invhtotwt Amt:  $invhnetamt Thanking you, Sri Hari Venkateswara Paper Mills (P) Ltd"; 

//old
//$url = "http://smsserver9.creativepoint.in/api.php?username=shvpmills&password=652971&to=$smsnumber&from=SHVPML&message=".urlencode($msg)."&PEID=1701159973422121680&templateid=1507165174687014183";  
  //Store data into URL variable

//$url = "http://sms.creativepoint.in/api/push.json?apikey=650c29e8c87f0&route=transsms&sender=SHVPML&mobileno=$smsnumber&text=".urlencode($msg)."&PEID=1701159973422121680&templateid=1707169536539173064";  



//$msg = "Dear $invhparty$invhparty2 , your bill details, Inv.No: $invhrefno Dt: $invhdate  Qty: $invhtotwt Amt:$invhnetamt Thanking you, $TEMPVAR - SRI HARI VENKATESHWARA PAPER MILLS"; 

$msg = "Dear $invhparty, your bill details, Inv.No: $invhrefno Dt: $invhdate Qty: $invhtotwt Amt:$invhnetamt Thanking you, Sri Hari Venkateswara Paper Mills Pvt Ltd"; 



$url = "http://sms.creativepoint.in/api/push.json?apikey=650c29e8c87f0&route=transsms&sender=SHVPML&mobileno=$smsnumber&text=".urlencode($msg);  

$ret = file($url);

print_r($ret);    //$ret stores the msg-id

  
?>


