<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$compcode = $_POST['compcode'];
$fincode  = $_POST['fincode'];
$party    = $_POST['party'];
$invno    = $_POST['invno'];



$query1= "update trnsal_invoice_header , massal_customer set invh_taxtag = cust_taxtag  where invh_party = cust_code  and invh_party = $party and invh_fincode = $fincode and invh_invrefno = '$invno'";


echo $query1;
$result1=mysql_query($query1);            

         






if ($result1)
{
   mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $sono . '"})';
} 
	
else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $sono . '"})';
}
  
   
?>
