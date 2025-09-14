<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$led_code  = $_POST['ledger_code'];
$led_seqno =$_POST['ledger_seqno'];
$led_billamt=$_POST['ledger_amount'];
$led_adjamt=$_POST['ledger_adjust'];
#Begin Transaction
mysql_query("BEGIN");

 $query = "update acc_trail set acctrail_adj_value = '$led_adjamt' where  acctrail_led_code = $led_code and  acctrail_accref_seqno= '$led_seqno'";

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
