<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();


$custcode    = $_POST['party'];
$distance    = $_POST['roaddist'];


 $query1 = "update massal_customer set cust_distance = $distance where cust_code = '$custcode'"; 

$result1=mysql_query($query1);            

         






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
