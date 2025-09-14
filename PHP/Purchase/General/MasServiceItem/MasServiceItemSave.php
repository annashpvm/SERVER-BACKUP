<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
 $itemname=strtoupper($_POST['itemname']);
 $itemdesc=strtoupper($_POST['itemdesc']);
 $unit=$_POST['unit'];
 $rate=$_POST['rate'];
 $hsncode=$_POST['hsncode'];

 //echo"$GroupName";
$query = "select ifnull(max(item_code),0)+1 as item_code from mas_item_master";
$result = mysql_query($query);
$rec = mysql_fetch_array($result);
$item_code=$rec['item_code'];

$qry = "select count(*) as cnt from mas_item_master where item_name = '$itemname'";
$resgrp = mysql_query($qry);
$recgrp = mysql_fetch_array($resgrp);
$cnt=$recgrp['cnt'];

if($cnt==0)
{
  $query1="insert into mas_item_master values('$item_code','$itemname','$itemdesc','$unit','$rate','$hsncode',0)";
  $result1 = mysql_query($query1);
}

  if ($result1 && $cnt==0) {
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $itemname . '"})';
} 
else if ($cnt>0) {
 mysql_query("ROLLBACK");
    echo '({"success":"false","cnt":"' . $cnt . '"})';
}
 else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $itemname . '"})';
}
  
   
?>
