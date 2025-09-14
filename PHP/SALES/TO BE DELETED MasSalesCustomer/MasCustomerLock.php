<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();


$custcode    = $_POST['party'];

 $query1 = "update massal_customer set cust_lock = 'Y' where cust_code = '$custcode'"; 

$result1=mysql_query($query1);            

         






if ($result1)
{
   mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $custcode . '"})';
} 
	
else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $custcode . '"})';
}
  
   
?>
