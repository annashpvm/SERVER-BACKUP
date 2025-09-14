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

$usercode = $_POST['usercode'];
$reccount = 1;
$today = date("Y-m-d H:i:s");  




$query="select ifnull(max(led_code),0)+1 as led_code from acc_ledger_master";
$result=mysql_query($query);
$rec=mysql_fetch_array($result);
$ledgercode= $rec['led_code'];
#Begin Transaction
mysql_query("BEGIN");
// $query = "call acc_sp_insledgermaster('$compcode','$ledgercode','$ledgername','$ledger_addr1','$ledger_addr2',
           '$ledger_city','$led_grpcode','$led_prefix','A','Y','N','','$led_panno','$led_gstno','G',0,'',0,'')";



	 $query= "insert into acc_ledger_master values('$ledgercode','1',upper('$ledgername'),upper('$ledger_addr1'),upper('$ledger_addr2'), upper('$ledger_addr3'), upper('$ledger_city'),  '$custstate','$custzip',  '$led_grpcode','Y', '$custgstin','$custpanno','G',0,'$usercode','$today',$reccount)";

//echo $query;

 $result = mysql_query($query);

$query1="select ifnull(max(curbal_seqno),0)+1 as curbal_seqno from acc_current_balance";
$result1=mysql_query($query1);
$rec1=mysql_fetch_array($result1);
$curbalseqno= $rec1['curbal_seqno'];

 $query1 = "CALL acc_sp_inscurrent_balance('$curbalseqno','$ledgercode','$finyear','1' );";
 $result1 = mysql_query($query1);

$curbalseqno = $curbalseqno + 1;
//echo $result1;

 $query1 = "CALL acc_sp_inscurrent_balance('$curbalseqno','$ledgercode','$finyear','90' );";
 $result1 = mysql_query($query1);

//echo $result1;

      if (($result && $result1))
      {
          mysql_query("COMMIT");
          echo '{success:true,results:1,
             rows:[{"ledger":"$ledgercode"}]}';
      }
     else
     {
         mysql_query("ROLLBACK");
          echo '{success:false,results:1,
             rows:[{"ledger":"$ledgercode"}]}';
     }
?>
