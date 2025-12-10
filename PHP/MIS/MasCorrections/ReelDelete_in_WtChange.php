<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$compcode = $_POST['compcode'];
$fincode  = $_POST['fincode'];
$reelno   = (int)$_POST['reelno'];
$proddate = $_POST['proddate'];

$query1= "delete from trnsal_reelweight_change  where comp_code = $compcode and ent_date= '$proddate' and srno = $reelno";
//echo $query1;
$result1=mysqli_query($conn, $query1);            




if ($result1)
{
   mysqli_begin_transaction($conn);
    echo '({"success":"true","msg":"' . $reelno . '"})';
} 
	
else {
    mysqli_rollback($conn);


    echo '({"success":"false","msg":"' . $reelno . '"})';
}
  
   
?>
