<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConndpm.php");
session_start();



$variety=strtoupper($_POST['variety']);
$gsm=$_POST['gsm'];
$vargrpcode=$_POST['vargrpcode'];

$query = "select ifnull(max(var_code),0)+1 as itemseq from masprd_variety";
$result = mysqli_query($conn, $query);
$rec = mysqli_fetch_array($result);
$itemseq=$rec['itemseq'];

$qry = "select count(*) as cnt from masprd_variety where var_desc = '$varsubgrp'";
$resag = mysqli_query($conn, $qry);
$recvar = mysqli_fetch_array($resag);
$cnt=$recvar['cnt'];

if($cnt==0)
{
  $query1="insert into masprd_variety values('$itemseq','$variety',$vargrpcode,'$gsm')";
  $result1 = mysqli_query($conn, $query1);
}

  if ($result1 && $cnt==0) {
    mysqli_begin_transaction($conn);
    echo '({"success":"true","msg":"' . $varsubgrp . '"})';
} 
  else if ($cnt>0) {
    mysqli_rollback($conn);


    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
}else {
    mysqli_rollback($conn);


    echo '({"success":"false","msg":"' . $varsubgrp . '"})';
}
  
   
?>
