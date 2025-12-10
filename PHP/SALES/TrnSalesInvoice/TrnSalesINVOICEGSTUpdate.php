<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$compcode = $_POST['compcode'];
$fincode  = $_POST['fincode'];
$party    = $_POST['party'];
$invno    = $_POST['invno'];



$query1= "update trnsal_invoice_header , massal_customer set invh_taxtag = cust_taxtag  where invh_party = cust_code  and invh_party = $party and invh_fincode = $fincode and invh_invrefno = '$invno'";


echo $query1;
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
