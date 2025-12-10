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
mysqli_query($conn, "BEGIN");

	$query1="call spfu_insupd_lotitemstock ('$compcode','$finid','$lotcode','$itemcode','$opstk','$opval','$usercode')";
  	$result1 = mysqli_query($conn, $query1);
//echo $query1;

	if ($result1){
    		mysqli_begin_transaction($conn);
    		echo '({"success":"true"})';
	}
	else{
		mysqli_rollback($conn);


		echo '({"success":"false"})';
	}


  
   
?>
