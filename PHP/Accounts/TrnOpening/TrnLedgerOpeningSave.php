<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$led_code  = $_POST['ledger_code'];
$drcr      = $_POST['drcr'];
$opening   = $_POST['opening'];
$compcode  = $_POST['compcode'];
$fincode   = $_POST['fincode'];

#Begin Transaction
mysql_query("BEGIN");
$reccount = 0;


	$query="select count(*) as nos from acc_current_balance where curbal_comp_code = $compcode  and curbal_finid = $fincode and curbal_led_code= $led_code ";
	$result=mysql_query($query);
	$rec=mysql_fetch_array($result);
	$reccount= $rec['nos'];

//echo $reccount;

if  ($reccount == 0)
{


$query1="select ifnull(max(curbal_seqno),0)+1 as curbal_seqno from acc_current_balance";
$result1=mysql_query($query1);
$rec1=mysql_fetch_array($result1);
$curbalseqno= $rec1['curbal_seqno'];

// echo $curbalseqno;

 $query1 = "CALL acc_sp_inscurrent_balance('$curbalseqno','$led_code','$fincode','1' );";
 $result1 = mysql_query($query1);
}

if ($drcr == "Dr")
 $query = "update acc_current_balance set curbal_obdbamt = '$opening' , curbal_obcramt = '0' where curbal_finid = '$fincode' and curbal_comp_code = '$compcode'  and curbal_led_code = '$led_code'";
else
 $query = "update acc_current_balance set curbal_obdbamt = '0' , curbal_obcramt = '$opening' where curbal_finid = '$fincode' and curbal_comp_code = '$compcode'  and curbal_led_code = '$led_code'";


 $result = mysql_query($query);


      if (($result))
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
