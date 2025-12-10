<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();



$invcompcode = $_POST['invcompcode'];
$invfincode  = $_POST['invfincode'];
$invno       = $_POST['invno'];


$query1= "update trn_other_sales set U_ReUpload = 'Y' where ((U_TCSStatus = 'E'  or U_EWBStatus = 'E') or (U_TCSStatus = 'S' and E_inv_confirm = 'Y' and  U_EWBStatus = ''))  and os_invno = '$invno'  and os_fincode = '$invfincode'  and os_compcode = '$invcompcode'";


$result1=mysql_query($query1); 

   
?>


