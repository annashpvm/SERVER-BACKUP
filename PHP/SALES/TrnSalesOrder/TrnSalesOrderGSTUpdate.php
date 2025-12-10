<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$compcode = $_POST['compcode'];
$fincode  = $_POST['fincode'];
$party    = $_POST['party'];
$sono     = $_POST['sono'];



$query1= "update trnsal_order_header , massal_customer set ordh_tax = cust_taxtag  where ordh_party = cust_code  and ordh_comp_code = $compcode and ordh_fincode = $fincode and ordh_sono = $sono";

$result1=mysqli_query($conn, $query1);            

         






if ($result1)
{
   mysqli_begin_transaction($conn);
    echo '({"success":"true","msg":"' . $sono . '"})';
} 
	
else {
    mysqli_rollback($conn);


    echo '({"success":"false","msg":"' . $sono . '"})';
}
  
   
?>
