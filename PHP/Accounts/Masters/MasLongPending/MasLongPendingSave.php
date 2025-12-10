<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

    $savetype  = $_REQUEST['saveflag'];

    $custname  = $_REQUEST['custname'];
    $custcode  = $_REQUEST['custcode'];



$data = '';

#Begin Transaction
mysqli_query($conn, "BEGIN");



if ($savetype == "Add") {



$query1="insert into massal_longpending_customers values  ('$custcode','$custname')"; 

//echo  $query1;

$result1 = mysqli_query($conn, $query1);
 }     

      if ($result1)
      {
          mysqli_begin_transaction($conn);
          echo '({"success":"true","msg":"' . $custname  . '"})';
      }
     else
     {
         mysqli_rollback($conn);


         echo '({"success":"false","msg":"' . $custname  . '"})';

     }
?>
