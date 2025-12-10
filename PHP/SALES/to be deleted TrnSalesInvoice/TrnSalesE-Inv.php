<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$invhcompcode = $_POST['invhcompcode'];
$invhfincode  = $_POST['invhfincode'];
$invhseqno    = $_POST['invhseqno'];
$invhrefno    = $_POST['invhrefno'];
$query1= "update trnsal_invoice_header set E_inv_confirm = 'Y' where invh_seqno = '$invhseqno'  and invh_fincode = '$invhfincode'  and invh_comp_code = '$invhcompcode'";
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


