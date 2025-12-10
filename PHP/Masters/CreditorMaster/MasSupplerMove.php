<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php";
session_start();


$custcode    = $_POST['party'];



 $query1 = "update massal_customer set cust_type = 'C' , cust_acc_group = 1 , cust_repr = 1 where cust_code = '$custcode'"; 

$result1=mysqli_query($conn, $query1);            

         






if ($result1)
{
   mysqli_begin_transaction($conn);
    echo '({"success":"true","msg":"' . $invhrefno . '"})';
} 
	
else {
    mysqli_rollback($conn);


    echo '({"success":"false","msg":"' . $invhrefno . '"})';
}
  
   
?>
