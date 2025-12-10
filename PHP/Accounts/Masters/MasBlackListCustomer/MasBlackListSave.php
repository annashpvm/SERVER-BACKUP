<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_POST['cnt'];

$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++)
{

	$sno = $i + 1;
	$custcode = $griddet[$i]['cust_code'];
	$custname = $griddet[$i]['cust_ref'];
	$custlock  = $griddet[$i]['cust_lock'];


	$query1 = "update massal_customer set cust_lock = '$custlock' where  cust_code = $custcode";
	$result1=mysqli_query($conn, $query1);            
  
//echo $query1;

}

if ($result1 ) 
{
    mysqli_begin_transaction($conn);
    echo '({"success":"true","msg":"' . $custname . '"})';
} 
else {
    mysqli_rollback($conn);


    echo '({"success":"false","msg":"' . $custname . '"})';
}


?>
