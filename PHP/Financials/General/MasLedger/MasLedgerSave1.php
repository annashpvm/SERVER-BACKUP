<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$led_code  = $_POST['ledger_code'];
$led_grpcode=$_POST['ledger_grpcode'];
$led_prefix=$_POST['ledger_prefix'];
#Begin Transaction
mysqli_query($conn, "BEGIN");

 $query = "update acc_ledger_master set led_grp_code = '$led_grpcode' , led_prefix = '$led_prefix' where led_type = 'G' and led_code = '$led_code'";

 $result = mysqli_query($conn, $query);


      if (($result ))
      {
          mysqli_begin_transaction($conn);
          Echo '{success:true,results:1,
             rows:[{"ledger":"$ledgercode"}]}';
      }
     else
     {
         mysqli_rollback($conn);


           Echo '{success:false,results:1,
             rows:[{"ledger":"$ledgercode"}]}';
     }
?>
