<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();




$invhcompcode   = $_POST['snhcompcode'];
$invhfincode    = $_POST['snhfincode'];
$invhrefno      = $_POST['snhinvno'];

$invhqrcode     = $_POST['invhqrcode'];
$invhIRN        = $_POST['invhIRN'];
$invhACK        = $_POST['invhACK'];


mysqli_begin_transaction($conn);
$query1= "update trn_other_sales set U_AckNo = '$invhACK' , U_irnno = '$invhIRN' , U_QR =  '$invhqrcode'  where os_invno = '$invhrefno'  and invh_fincode = '$invhfincode' and invh_comp_code = '$invhcompcode'";

//echo $query1;


$result1=mysqli_query($conn, $query1);            

         


if ($result1)
{
    mysqli_rollback($commit);
    echo '({"success":"true","msg":"' . $invhrefno . '"})';
} 
	
else {
    mysqli_rollback($conn);
    echo '({"success":"false","msg":"' . $invhrefno . '"})';
}
  
   
?>
