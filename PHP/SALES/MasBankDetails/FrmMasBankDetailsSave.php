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
  $result = mysqli_query($conn, $query);
  $rec = mysqli_fetch_array($result);
  $bankcode=$rec['bcode'];

  $query1="insert into massal_bank values('$bankcode','$bankname','$bankbranch','$bankifsc','$bankacno')";
  $result1 = mysqli_query($conn, $query1);
}
else
{
  $query1="update massal_bank set bank_name = '$bankname' , bank_branch =  '$bankbranch' , bank_ifsc = '$bankifsc' , bank_acno = '$bankacno' where bank_code = '$bankcode'";
  $result1 = mysqli_query($conn, $query1);


}

  if ($result1 ) {
    mysqli_begin_transaction($conn);
    echo '({"success":"true","msg":"' . $bankcode . '"})';
} 
  else  {
    mysqli_rollback($conn);


    echo '({"success":"false","msg":"' . $bankcode . '"})';
	
}
 
   
?>
