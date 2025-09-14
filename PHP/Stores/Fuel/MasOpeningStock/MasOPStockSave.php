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


mysql_query("BEGIN");

$query1=" update masfu_item_trailer set itmt_opqty = $opstk ,itmt_opvalue= $opval,  itmt_clqty= itmt_clqty + $opstk - $oldopstk ,itmt_clvalue= itmt_clvalue + $opval - $oldopvalue where  itmt_compcode= $compcode and itmt_fincode= $finid and itmt_hdcode= $itemcode; ";

//echo $query1;

$result1 = mysql_query($query1);


$query2=" update masfu_item_trailer set itmt_avgrate =  case when itmt_clvalue > 0 and itmt_clqty >0 then  Cast( itmt_clvalue / itmt_clqty as decimal(10,5))  else 0 end  where  itmt_compcode= $compcode  and itmt_fincode= $finid and itmt_hdcode= $itemcode;; ";

//echo $query2;

$result2 = mysql_query($query2);

if ($result1 && $result2){
	mysql_query("COMMIT");
	echo '({"success":"true"})';
}
else{
	mysql_query("ROLLBACK");
	echo '({"success":"false"})';
}
 
   
?>
