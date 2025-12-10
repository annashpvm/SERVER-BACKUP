<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$subject = $_POST['subject']; 
$newpw   = $_POST['newpw'];


mysqli_query($conn, "BEGIN");


$query1="update mas_password set pw_password = '$newpw'  where pw_subject = '$subject'"; 

//echo $query1;

$result1 = mysqli_query($conn, $query1);



  if ($result1) {
   mysqli_begin_transaction($conn);
    echo '({"success":"true","msg":"' . $subject . '"})';
  }else {
    mysqli_rollback($conn);


    echo '({"success":"false","msg":"' . $subject . '"})';
}
  
   
?>
