<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

 $purpose=strtoupper($_POST['purpose']);
 $woname=strtoupper($_POST['woname']);
 mysqli_begin_transaction($conn);
$query = "select ifnull(max(wo_no),0)+1 as wo_no from mas_workorder";
$result = mysqli_query($conn, $query);
$rec = mysqli_fetch_array($result);
$wo_no=$rec['wo_no'];

$qry = "select count(*) as cnt from mas_workorder where wo_name = '$woname'";
$res = mysqli_query($conn, $qry);
$recwo = mysqli_fetch_array($res);
$cnt=$recwo['cnt'];


$qry = "select count(*) as cnt from maspur_item_header where item_name = '$itemname'";
$resgrp = mysqli_query($conn, $qry);
$recgrp = mysqli_fetch_array($resgrp);
$cnt=$rec['cnt'];
if($cnt==0)
{
  $query1="insert into mas_workorder values('$wo_no','$woname','$purpose',0)";
  $result1 = mysqli_query($conn, $query1);
}

  if ($result1 && $cnt==0) {
    mysqli_commit($conn); 
    echo '({"success":"true","msg":"' . $wo_no . '"})';
} 
  else if ($cnt>0) {
    mysqli_rollback($conn);


    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
}else {
    mysqli_rollback($conn);


    echo '({"success":"false","msg":"' . $wo_no . '"})';
}
  
   
?>
