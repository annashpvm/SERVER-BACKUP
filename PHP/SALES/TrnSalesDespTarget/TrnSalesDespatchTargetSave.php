<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");


session_start();

$griddet = json_decode($_REQUEST['griddet'],true);
$savetype    = $_POST['savetype'];           
$rowcnt      = $_POST['cnt'];


for ($i=0;$i<$rowcnt;$i++)
{
	$custcode  = $griddet[$i]['cust_code'];
	$crdays    = $griddet[$i]['cust_cr_days'];
	$target    = $griddet[$i]['cust_desp_target'];
	$visits    = $griddet[$i]['cust_noof_visits'];
	$payperf   = $griddet[$i]['cust_payperf'];

	$query1= "update massal_customer set cust_cr_days = $crdays ,cust_desp_target = $target , cust_noof_visits = $visits ,cust_payperf = '$payperf' where cust_code = '$custcode'";
	$result1=mysqli_query($conn, $query1);            
}


if ($result1) {

   mysqli_begin_transaction($conn);
    echo '({"success":"true","msg":"' . $maadvno . '"})';
	
}else {
    mysqli_rollback($conn);


    echo '({"success":"false","msg":"' . $maadvno . '"})';
}
  
   
?>
