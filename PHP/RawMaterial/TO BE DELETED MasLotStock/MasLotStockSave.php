<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$compcode=$_POST['compcode'];
$finid=$_POST['finid'];
$lotcode=$_POST['lotcode'];
$itemcode = $_POST['itemcode'];
$opstk=$_POST['opstk'];
$opval=$_POST['opval'];
$usercode=$_POST['usercode'];
$stkdt=$_POST['stkdt'];
mysql_query("BEGIN");

$query1="call sprm_insupd_lotitemstock('$compcode','$finid','$lotcode','$itemcode','$opstk','$opval','$usercode')";
//echo $query1;
$result1 = mysql_query($query1);


if ($result1){
	mysql_query("COMMIT");
	echo '({"success":"true"})';
}
else{
	mysql_query("ROLLBACK");
	echo '({"success":"false"})';
}
 
   
?>
