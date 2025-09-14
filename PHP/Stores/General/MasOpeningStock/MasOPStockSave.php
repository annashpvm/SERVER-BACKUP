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

$location = (int) $_POST['location'];

mysql_query("BEGIN");

$query1=" update maspur_item_trailer set item_yr_opqty = $opstk ,item_yr_opval= $opval,  item_stock= item_stock + $opstk - $oldopstk  , item_loc_code = $location where  item_comp_code= $compcode and item_fin_code= $finid and item_code= $itemcode; ";

//echo $query1;

$result1 = mysql_query($query1);


$query2=" update maspur_item_trailer set item_avg_rate =  case when item_yr_opval > 0 and item_yr_opqty >0 then  Cast( item_yr_opval / item_yr_opqty as decimal(10,5))  else 0 end  where  item_comp_code= $compcode  and item_fin_code= $finid and item_code= $itemcode;; ";

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
