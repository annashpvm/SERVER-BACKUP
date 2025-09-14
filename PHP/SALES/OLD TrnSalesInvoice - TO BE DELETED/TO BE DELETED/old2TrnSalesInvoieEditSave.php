<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConndpm.php");
session_start();

$griddet = json_decode($_REQUEST['griddet'],true);
$savetype = $_POST['savetype'];

$invhcompcode = $_POST['invhcompcode'];
$invhfincode  = $_POST['invhfincode'];
$invhno  = $_POST['invhno'];
$invhvehino = $_POST['invhvehino'];
$invhdesplocation = $_POST['invhdesplocation'];

mysql_query("BEGIN");


$query1 = "update  trnsal_invoice_header set invh_vehi_no = '$invhvehino' , invh_desp_location = '$invhdesplocation' where  invh_fincode= $invhfincode  and invh_comp_code= $invhcompcode and invh_no = $invhno";

$result1=mysql_query($query1);            



if ($result1)
{
   mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $invhno . '"})';
} 
	
else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $invhno . '"})';
}
  
   
?>
