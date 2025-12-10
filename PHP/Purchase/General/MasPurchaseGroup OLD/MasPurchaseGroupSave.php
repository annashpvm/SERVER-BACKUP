<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

 $groupname=strtoupper($_POST['groupname']);

 $tnledcode=$_POST['tnledcode'];
 $osledcode=$_POST['osledcode'];
 $impledcode=$_POST['impledcode'];


$query = "select ifnull(max(grp_code),0)+1 as grp_code from maspur_group";
$result = mysqli_query($conn, $query);
$rec = mysqli_fetch_array($result);
$grp_code = $rec['grp_code'];

$qry = "select count(*) as cnt from maspur_group where grp_name = '$groupname'";
$resgrp = mysqli_query($conn, $qry);
$recgrp = mysqli_fetch_array($resgrp);
$cnt=$recgrp['cnt'];

if($cnt==0)
{
  $query1="insert into maspur_group values('$grp_code','$groupname',$tnledcode','$osledcode','$impledcode')";
  $result1 = mysqli_query($conn, $query1);
}

	  if ($result1 && $cnt==0) {
    mysqli_begin_transaction($conn);
    echo '({"success":"true","msg":"' . $groupname . '"})';
} 
else if($cnt>0) {
    mysqli_rollback($conn);


    echo '({"success":"false","cnt":"' . $cnt . '"})';
} else {
    mysqli_rollback($conn);


    echo '({"success":"false","msg":"' . $groupname . '"})';
}
  
   
?>
