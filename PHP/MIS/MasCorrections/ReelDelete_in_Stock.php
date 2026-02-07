<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$compcode = $_POST['compcode'];
$fincode  = $_POST['fincode'];
$rollno   = (int) $_POST['rollno'];
$reelno   = (int)$_POST['reelno'];
$proddate = $_POST['proddate'];


mysqli_begin_transaction($conn);

$query1= "delete from trnsal_finish_stock where stk_ent_date= '$proddate' and stk_destag='' and stk_rollno = $rollno and stk_sr_no = $reelno";
//echo $query1;
$result1=mysqli_query($conn, $query1);            




if ($result1)
{
    mysqli_commit($conn); 
    echo '({"success":"true","msg":"' . $reelno . '"})';
} 
	
else {
    mysqli_rollback($conn);


    echo '({"success":"false","msg":"' . $reelno . '"})';
}
  
   
?>
