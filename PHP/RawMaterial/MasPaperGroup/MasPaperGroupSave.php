<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

 $groupname=strtoupper($_POST['groupname']);
 $shortname=strtoupper($_POST['shortname']);


$query = "select ifnull(max(itmg_code),0)+1 as grpseq from masrm_item_group";
$result = mysqli_query($conn, $query);
$rec = mysqli_fetch_array($result);
$grpseq = $rec['grpseq'];

$qry = "select count(*) as cnt from masrm_item_group where itmg_name = '$groupname'";
$resgrp = mysqli_query($conn, $qry);
$recgrp = mysqli_fetch_array($resgrp);
$cnt=$recgrp['cnt'];

if($cnt==0)
{
  $query1="insert into masrm_item_group values('$grpseq','$groupname','$shortname')";
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
