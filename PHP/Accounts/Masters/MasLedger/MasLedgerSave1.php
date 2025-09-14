<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$led_code  = $_POST['ledger_code'];
$led_grpcode=$_POST['ledger_grpcode'];
$led_prefix=$_POST['ledger_prefix'];
#Begin Transaction
mysql_query("BEGIN");

// $query = "update acc_ledger_master set led_grp_code = '$led_grpcode' , led_prefix = '$led_prefix' where led_type = 'G' and led_code = '$led_code'";

 $query = "update acc_ledger_master set led_grp_code = '$led_grpcode'  where led_code = '$led_code'";

 echo $query;

 $result = mysql_query($query);


      if (($result ))
      {
          mysql_query("COMMIT");
          Echo '{success:true,results:1,
             rows:[{"ledger":"$ledgercode"}]}';
      }
     else
     {
         mysql_query("ROLLBACK");
           Echo '{success:false,results:1,
             rows:[{"ledger":"$ledgercode"}]}';
     }
?>
