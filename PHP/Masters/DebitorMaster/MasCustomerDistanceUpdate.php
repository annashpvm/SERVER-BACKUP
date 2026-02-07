<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php";
session_start();


$custcode    = $_POST['party'];
$distance    = $_POST['roaddist'];

mysqli_begin_transaction($conn);
 $query1 = "update massal_customer set cust_distance = $distance where cust_code = '$custcode'"; 

$result1=mysqli_query($conn, $query1);            

         






if ($result1)
{
    mysqli_commit($conn);
    echo '({"success":"true","msg":"' . $custcode . '"})';
} 
	
else {
    mysqli_rollback($conn);


    echo '({"success":"false","msg":"' . $custcode . '"})';
}
  
   
?>
