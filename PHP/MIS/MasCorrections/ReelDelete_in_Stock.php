<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$compcode = $_POST['compcode'];
$fincode  = $_POST['fincode'];
$rollno   = (int) $_POST['rollno'];
$reelno   = (int)$_POST['reelno'];
$proddate = $_POST['proddate'];

$query1= "delete from trnsal_finish_stock where stk_ent_date= '$proddate' and stk_destag='' and stk_rollno = $rollno and stk_sr_no = $reelno";
//echo $query1;
$result1=mysql_query($query1);            




if ($result1)
{
   mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $reelno . '"})';
} 
	
else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $reelno . '"})';
}
  
   
?>
