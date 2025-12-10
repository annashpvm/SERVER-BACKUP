<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$invhcompcode = $_POST['invhcompcode'];
$invhfincode  = $_POST['invhfincode'];
$invhparty  = $_POST['invhparty'];
$invhrefno  = $_POST['invhrefno'];
$invhdate   = $_POST['invhdate'];
$invhtotwt  = $_POST['invhtotwt']/1000;
$invhnetamt = $_POST['invhnetamt'];


//$query1= "update trnsal_invoice_header set U_ReUpload = 'Y' where (U_TCSStatus = 'E'  or U_EWBStatus = 'E') and invh_invrefno = '$invhrefno'  and invh_fincode = '$invhfincode'  and invh_comp_code = '$invhcompcode'";

$query1= "update trnsal_invoice_header set U_ReUpload = 'Y' where ((U_TCSStatus = 'E'  or U_EWBStatus = 'E') or (U_TCSStatus = 'S' and E_inv_confirm = 'Y' and  U_EWBStatus = ''))  and invh_invrefno = '$invhrefno'  and invh_fincode = '$invhfincode'  and invh_comp_code = '$invhcompcode'";

$result1=mysql_query($query1); 

   
?>


