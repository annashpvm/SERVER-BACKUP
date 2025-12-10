<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$compcode=$_POST['compcode'];
$finid =$_POST['finid'];
$itemcode = $_POST['itemcode'];
$opstk= (float) $_POST['opstk'];
$opval= (float) $_POST['opval'];

$oldopstk= (float) $_POST['oldopstk'];
$oldopvalue=(float) $_POST['oldopvalue'];


mysqli_query($conn, "BEGIN");

$query1=" update masfu_item_trailer set itmt_opqty = $opstk ,itmt_opvalue= $opval,  itmt_clqty= itmt_clqty + $opstk - $oldopstk ,itmt_clvalue= itmt_clvalue + $opval - $oldopvalue where  itmt_compcode= $compcode and itmt_fincode= $finid and itmt_hdcode= $itemcode; ";

//echo $query1;

$result1 = mysqli_query($conn, $query1);


$query2=" update masfu_item_trailer set itmt_avgrate =  case when itmt_clvalue > 0 and itmt_clqty >0 then  Cast( itmt_clvalue / itmt_clqty as decimal(10,5))  else 0 end  where  itmt_compcode= $compcode  and itmt_fincode= $finid and itmt_hdcode= $itemcode;; ";

//echo $query2;

$result2 = mysqli_query($conn, $query2);

if ($result1 && $result2){
	mysqli_begin_transaction($conn);
	echo '({"success":"true"})';
}
else{
	mysqli_rollback($conn);


	echo '({"success":"false"})';
}
 
   
?>
