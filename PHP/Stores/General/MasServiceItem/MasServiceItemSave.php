<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

 $saveflag=$_POST['saveflag'];
 $itemcode=$_POST['itemcode'];
 $itemname=strtoupper($_POST['itemname']);
 $unit=$_POST['unit'];
 $rate= (float) $_POST['rate'];
 $hsncode=$_POST['hsncode'];

$cnt=0;

 //echo"$GroupName";

if ($saveflag == "Add")
{
	$query = "select ifnull(max(item_code),0)+1 as item_code from mas_item_master";
	$result = mysqli_query($conn, $query);
	$rec = mysqli_fetch_array($result);
	$item_code=$rec['item_code'];

	$qry = "select count(*) as cnt from mas_item_master where item_name = '$itemname'";
	$resgrp = mysqli_query($conn, $qry);
	$recgrp = mysqli_fetch_array($resgrp);
	$cnt=$recgrp['cnt'];
	if($cnt==0)
	{
	  $query1="insert into mas_item_master values('$item_code','$itemname','$unit','$rate','$hsncode')";
	  $result1 = mysqli_query($conn, $query1);
	}
}
else
{
	  $query1="update mas_item_master set item_name = '$itemname', item_uom = '$unit', item_rate = '$rate' , item_hsncode = '$hsncode' where item_code =  $itemcode"; 
 	  $result1 = mysqli_query($conn, $query1);
}

  if ($result1 && $cnt==0) {
    mysqli_begin_transaction($conn);
    echo '({"success":"true","msg":"' . $itemname . '"})';
} 
else if ($cnt>0) {
 mysqli_rollback($conn);


    echo '({"success":"false","cnt":"' . $cnt . '"})';
}
 else {
    mysqli_rollback($conn);


    echo '({"success":"false","msg":"' . $itemname . '"})';
}
  
   
?>
