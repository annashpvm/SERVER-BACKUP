<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$invhcompcode   = $_POST['invhcompcode'];
$invhfincode    = $_POST['invhfincode'];
$invhrefno      = $_POST['invhrefno'];
$frtparty       = $_POST['frtparty'];


mysqli_begin_transaction($conn);


$query1= "update trnsal_invoice_header set invh_frtparty = '$frtparty' where invh_invrefno = '$invhrefno'  and invh_fincode = '$invhfincode'  and invh_comp_code = '$invhcompcode'";

$result1=mysqli_query($conn, $query1);            

//ho $query1;





if ($result1)
{
    mysqli_commit($conn); 
    echo '({"success":"true","msg":"' . $invhrefno . '"})';
} 
	
else {
    mysqli_rollback($conn);


    echo '({"success":"false","msg":"' . $invhrefno . '"})';
}
  
   
?>
