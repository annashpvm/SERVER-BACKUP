<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$savetype   = $_POST['savetype'];
$bankcode   = $_POST['bankcode'];
$bankname   = $_POST['bankname'];
$bankbranch = $_POST['bankbranch'];
$bankifsc   = $_POST['bankifsc'];
$bankacno   = $_POST['bankacno'];





if($savetype=="Add")
{
  $query = "select ifnull(max(bank_code),0)+1 as bcode from massal_bank";
  $result = mysql_query($query);
  $rec = mysql_fetch_array($result);
  $bankcode=$rec['bcode'];

  $query1="insert into massal_bank values('$bankcode','$bankname','$bankbranch','$bankifsc','$bankacno')";
  $result1 = mysql_query($query1);
}
else
{
  $query1="update massal_bank set bank_name = '$bankname' , bank_branch =  '$bankbranch' , bank_ifsc = '$bankifsc' , bank_acno = '$bankacno' where bank_code = '$bankcode'";
  $result1 = mysql_query($query1);


}

  if ($result1 ) {
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $bankcode . '"})';
} 
  else  {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $bankcode . '"})';
	
}
 
   
?>
