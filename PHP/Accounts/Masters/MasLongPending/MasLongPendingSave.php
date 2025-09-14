<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

    $savetype  = $_REQUEST['saveflag'];

    $custname  = $_REQUEST['custname'];
    $custcode  = $_REQUEST['custcode'];



$data = '';

#Begin Transaction
mysql_query("BEGIN");



if ($savetype == "Add") {



$query1="insert into massal_longpending_customers values  ('$custcode','$custname')"; 

//echo  $query1;

$result1 = mysql_query($query1);
 }     

      if ($result1)
      {
          mysql_query("COMMIT");
          echo '({"success":"true","msg":"' . $custname  . '"})';
      }
     else
     {
         mysql_query("ROLLBACK");
         echo '({"success":"false","msg":"' . $custname  . '"})';

     }
?>
