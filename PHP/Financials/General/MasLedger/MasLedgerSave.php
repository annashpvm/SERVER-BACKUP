<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

 $compcode=$_POST['compcode'];
 $ledgername=strtoupper($_POST['ledgername']);
 $ledger_addr1=strtoupper($_POST['ledger_addr1']);
 $ledger_addr2=strtoupper($_POST['ledger_addr2']);
 $ledger_city=strtoupper($_POST['ledger_city']);
 $led_grpcode=$_POST['led_grpcode'];
 $led_prefix=strtoupper($_POST['led_prefix']);
 $led_department=$_POST['led_department'];
 $led_status=$_POST['led_status'];
 $led_duplicate=$_POST['led_duplicate'];
 $finyear=$_POST['finyear'];
 $led_panno=$_POST['ledger_panno'];
 $led_gstno=$_POST['ledger_gstno'];
 $ledger_tinno=$_POST['ledger_tinno'];

$query="select ifnull(max(led_code),0)+1 as led_code from acc_ledger_master";
$result=mysqli_query($conn, $query);
$rec=mysqli_fetch_array($result);
$ledgercode= $rec['led_code'];
#Begin Transaction
mysqli_query($conn, "BEGIN");
 $query = "call acc_sp_insledgermaster('$compcode','$ledgercode','$ledgername','$ledger_addr1','$ledger_addr2',
           '$ledger_city','$led_grpcode','$led_prefix','A','Y','N','','$led_panno','$led_gstno','G',0)";

 $result = mysqli_query($conn, $query);

$query1="select ifnull(max(curbal_seqno),0)+1 as curbal_seqno from acc_current_balance";
$result1=mysqli_query($conn, $query1);
$rec1=mysqli_fetch_array($result1);
$curbalseqno= $rec1['curbal_seqno'];

 $query1 = "CALL acc_sp_inscurrent_balance('$curbalseqno','$ledgercode','$finyear','$compcode' );";

 $result1 = mysqli_query($conn, $query1);

      if (($result && $result1))
      {
          mysqli_begin_transaction($conn);
          echo '{success:true,results:1,
             rows:[{"ledger":"$ledgercode"}]}';
      }
     else
     {
         mysqli_rollback($conn);


          echo '{success:false,results:1,
             rows:[{"ledger":"$ledgercode"}]}';
     }
?>
