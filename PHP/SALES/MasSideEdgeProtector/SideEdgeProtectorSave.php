<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_POST['cnt'];

$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++)
{

	$sno = $i + 1;
	$custcode = $griddet[$i]['cust_code'];
	$custname = $griddet[$i]['cust_ref'];
	$addnwt   = $griddet[$i]['cust_addnlwt'];


	$query1 = "update massal_customer set cust_addnlwt = '$addnwt' where  cust_code = $custcode";
	$result1=mysql_query($query1);            
  
//echo $query1;

}

if ($result1 ) 
{
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $custname . '"})';
} 
else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $custname . '"})';
}


  
   
?>
