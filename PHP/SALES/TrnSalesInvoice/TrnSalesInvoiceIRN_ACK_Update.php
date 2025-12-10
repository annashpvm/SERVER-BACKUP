<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$invhcompcode   = $_POST['invhcompcode'];
$invhfincode    = $_POST['invhfincode'];
$invhrefno      = $_POST['invhrefno'];
$invhparty      = $_POST['invhparty'];

$invhqrcode     = $_POST['invhqrcode'];
$invhIRN        = $_POST['invhIRN'];
$invhACK        = $_POST['invhACK'];



$query1= "update trnsal_invoice_header set U_AckNo = '$invhACK' , U_irnno = '$invhIRN' , U_QR =  '$invhqrcode'  where invh_invrefno = '$invhrefno'  and invh_fincode = '$invhfincode' and invh_comp_code = '$invhcompcode'";

//echo $query1;


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
