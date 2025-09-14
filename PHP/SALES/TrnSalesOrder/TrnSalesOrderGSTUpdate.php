<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$compcode = $_POST['compcode'];
$fincode  = $_POST['fincode'];
$party    = $_POST['party'];
$sono     = $_POST['sono'];



$query1= "update trnsal_order_header , massal_customer set ordh_tax = cust_taxtag  where ordh_party = cust_code  and ordh_comp_code = $compcode and ordh_fincode = $fincode and ordh_sono = $sono";

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
