<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

 $purpose=strtoupper($_POST['purpose']);
 $woname=strtoupper($_POST['woname']);

$query = "select ifnull(max(wo_no),0)+1 as wo_no from mas_workorder";
$result = mysql_query($query);
$rec = mysql_fetch_array($result);
$wo_no=$rec['wo_no'];

$qry = "select count(*) as cnt from mas_workorder where wo_name = '$woname'";
$res = mysql_query($qry);
$recwo = mysql_fetch_array($res);
$cnt=$recwo['cnt'];


$qry = "select count(*) as cnt from maspur_item_header where item_name = '$itemname'";
$resgrp = mysql_query($qry);
$recgrp = mysql_fetch_array($resgrp);
$cnt=$rec['cnt'];
if($cnt==0)
{
  $query1="insert into mas_workorder values('$wo_no','$woname','$purpose',0)";
  $result1 = mysql_query($query1);
}

  if ($result1 && $cnt==0) {
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $wo_no . '"})';
} 
  else if ($cnt>0) {
    mysql_query("ROLLBACK");
    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
}else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $wo_no . '"})';
}
  
   
?>
