<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$invhcompcode = $_POST['invhcompcode'];
$invhfincode  = $_POST['invhfincode'];
$invhrefno    = $_POST['invhrefno'];

$invhparty    = $_POST['invhparty'];
$ewaybillno   = $_POST['ewaybillno'];
$accseqno     = $_POST['accseqno'];

$invhvehino   = $_POST['invhvehino'];

$invhslipno   = $_POST['invhslipno'];
$invhslipdt   = $_POST['invhslipdt'];




$query1= "update trnsal_invoice_header set invh_vehi_no = '$invhvehino' where invh_invrefno = '$invhrefno'  and invh_fincode = '$invhfincode'  and invh_comp_code = '$invhcompcode'";

$result1=mysql_query($query1);   
 

$query2= "update trnsal_packslip_header set pckh_truck = '$invhvehino' where pckh_no = $invhslipno  and pckh_fincode = '$invhfincode'  and pckh_comp_code = '$invhcompcode'";
	      
$result2=mysql_query($query2);    



if ($result1 && $result2)
{
   mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $invhrefno . '"})';
} 
	
else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $invhrefno . '"})';
}
  
   
?>
