<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$compcode = $_POST['compcode'];
$fincode  = $_POST['fincode'];
$party    = $_POST['party'];
$sono     = $_POST['sono'];
$reason   = $_POST['reason'];


$query1= "update trnsal_order_header  set ordh_can_stat = 'Y' , ordh_can_reason =  '$reason'  where ordh_party = $party  and ordh_comp_code = $compcode and ordh_fincode = $fincode and ordh_sono = $sono";
// echo $query1;
$result1=mysql_query($query1);            

         
$query2= "update trnsal_order_trailer  set ordt_clo_stat = 'Y'  where  ordt_comp_code = $compcode and ordt_fincode = $fincode and ordt_sono = $sono";
//echo $query2;
$result2=mysql_query($query2);            






if ($result1 && $result2)
{
   mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $sono . '"})';
} 
	
else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $sono . '"})';
}
  
   
?>
