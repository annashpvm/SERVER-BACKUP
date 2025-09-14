<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$invhcompcode   = $_POST['invhcompcode'];
$invhfincode    = $_POST['invhfincode'];
$invhrefno      = $_POST['invhrefno'];
$invhcrddays    =  (int)$_POST['invhcrddays'];
$invhgracedays  = (int)$_POST['invhgracedays'];
$invhparty      = $_POST['invhparty'];
$ewaybillno     = $_POST['ewaybillno'];
$accseqno       = $_POST['accseqno'];





$query1= "update trnsal_invoice_header set invh_ewaybillno = '$ewaybillno',U_EWayBillNo = '$ewaybillno'  where invh_invrefno = '$invhrefno'  and invh_fincode = '$invhfincode'  and invh_comp_code = '$invhcompcode'";

$result1=mysql_query($query1);            

//echo $query1;





if ($result1)
{
   mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $invhrefno . '"})';
} 
	
else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $invhrefno . '"})';
}
  
   
?>
