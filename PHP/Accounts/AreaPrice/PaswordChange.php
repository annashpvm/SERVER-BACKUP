<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$subject = $_POST['subject']; 
$newpw   = $_POST['newpw'];


mysql_query("BEGIN");


$query1="update mas_password set pw_password = '$newpw'  where pw_subject = '$subject'"; 

//echo $query1;

$result1 = mysql_query($query1);



  if ($result1) {
   mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $subject . '"})';
  }else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $subject . '"})';
}
  
   
?>
