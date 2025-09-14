<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$invcompcode = $_POST['invcompcode'];
$invfincode  = $_POST['invfincode'];
$invno       = $_POST['invno'];

$query1= "update trn_other_sales set E_inv_confirm = 'Y' where os_invno = '$invno'  and os_fincode = '$invfincode'  and os_compcode = '$invcompcode'";
$result1=mysql_query($query1); 

if ($result1)
{
   mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $invno . '"})';
} 
	
else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $invno . '"})';
}
   
?>


