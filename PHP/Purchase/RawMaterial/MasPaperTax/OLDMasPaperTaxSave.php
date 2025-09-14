<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
  $taxname=strtoupper($_POST['taxname']);
 $cgst=$_POST['cgst'];
 $sgst=$_POST['sgst'];
 $igst=$_POST['igst'];
 $cgstled=$_POST['cgstled'];
 $sgstled=$_POST['sgstled'];
 $igstled=$_POST['igstled'];

 //echo"$GroupName";
$query = "select ifnull(max(tax_code),0)+1 as taxcode from mas_tax";
$result = mysql_query($query);
$rec = mysql_fetch_array($result);
$taxcode=$rec['taxcode'];

$qry = "select count(*) as cnt from mas_tax where tax_name = '$taxname'";
$resgrp = mysql_query($qry);
$recgrp = mysql_fetch_array($resgrp);
$cnt=$rec['cnt'];

if($cnt==0)
{
  $query1="insert into mas_tax values($taxcode,'$taxname',0,0,0,0,0,$cgst,$sgst,$igst,$cgstled,$sgstled,$igstled)";
  $result1 = mysql_query($query1);
}

  if ($result1 && $cnt==0) {
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $taxname . '"})';
} 
else if ($cnt>0) {
 mysql_query("ROLLBACK");
    echo '({"success":"false","cnt":"' . $cnt . '"})';
}
 else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $taxname . '"})';
}
  
   
?>
