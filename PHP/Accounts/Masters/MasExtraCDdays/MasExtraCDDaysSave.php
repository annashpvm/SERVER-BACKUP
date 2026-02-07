<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_POST['cnt'];

$inscnt = 0;

mysqli_begin_transaction($conn);
for ($i=0;$i<$rowcnt;$i++)
{

	$sno = $i + 1;
	$custcode = $griddet[$i]['cust_code'];
	$custname = $griddet[$i]['cust_ref'];
	$cust_cd_days  = (int)$griddet[$i]['cust_addnl_cd_days'];
	$query1 = "update massal_customer set cust_addnl_cd_days = '$cust_cd_days' where  cust_code = $custcode";
	$result1=mysqli_query($conn, $query1);            
  
//echo $query1;

}

if ($result1 ) 
{
	mysqli_commit($conn);
    echo '({"success":"true","msg":"' . $custname . '"})';
} 
else {
    mysqli_rollback($conn);
    echo '({"success":"false","msg":"' . $custname . '"})';
}


?>
