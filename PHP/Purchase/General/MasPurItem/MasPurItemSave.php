<?php

require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

 $AEDFlag = $_POST['AEDFlag'];
 $itemname=strtoupper($_POST['itemname']);

 $itemname=str_replace("'","",$itemname);

 $itemname2=str_replace('"','',$itemname);
 $itemname2=str_replace(' ','',$itemname);

 $itemusage=strtoupper($_POST['itemusage']);
 $itemusage=str_replace("'","",$itemusage);


 $unit=$_POST['unit'];
 $qualitychk=$_POST['qualitychk'];
 $indent=$_POST['indent'];
 $itemgrp=$_POST['itemgrp'];
 $hsncode=$_POST['hsncode'];



//echo '$itemname';
if ($AEDFlag === "Add") {
$query = "select ifnull(max(item_code),0)+1 as item_code from maspur_item_header";
$result = mysql_query($query);
$rec = mysql_fetch_array($result);
$item_code=$rec['item_code'];

$qry = "select count(*) as cnt from maspur_item_header where item_name = '$itemname'";
$resgrp = mysql_query($qry);
$recgrp = mysql_fetch_array($resgrp);
$cnt=$recgrp['cnt']; 

if($cnt==0)
{
  $query1="insert into maspur_item_header values('$item_code','$itemgrp',UPPER('$itemname'),UPPER('$itemusage'), '$unit','$qualitychk','$hsncode','','','','','','','','','','',0,'N')";
  $result1 = mysql_query($query1);
  
 // $instrailer = mysql_query("call sppur_ins_itemtrailer"); 
}
}
else if ($AEDFlag === "Edit") {
 $item_code =$_POST['item_code'];
 
  $query2="Update maspur_item_header set item_name = UPPER('$itemname'),item_usage = UPPER('$itemusage'),item_group_code = '$itemgrp', item_uom = '$unit', item_hsncode = '$hsncode'  where item_code = '$item_code'"; 
  $result2 = mysql_query($query2);
}

if ($AEDFlag === "Add") {
  if ($result1 && $cnt==0) {
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $itemname2 . '"})';
} 
else if ($cnt>0) {
 mysql_query("ROLLBACK");
    echo '({"success":"false","cnt":"' . $cnt . '"})';
}
 else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $itemname2 . '"})';
}
}
else {
if ($result2) {
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $itemname2 . '"})';
} 
 else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $itemname2 . '"})';
}
}

  
   
?>
