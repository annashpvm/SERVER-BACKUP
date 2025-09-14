<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

 $groupname=strtoupper($_POST['groupname']);
 $shortname=strtoupper($_POST['shortname']);


$query = "select ifnull(max(itmg_code),0)+1 as grpseq from masrm_item_group";
$result = mysql_query($query);
$rec = mysql_fetch_array($result);
$grpseq = $rec['grpseq'];

$qry = "select count(*) as cnt from masrm_item_group where itmg_name = '$groupname'";
$resgrp = mysql_query($qry);
$recgrp = mysql_fetch_array($resgrp);
$cnt=$recgrp['cnt'];

if($cnt==0)
{
  $query1="insert into masrm_item_group values('$grpseq','$groupname','$shortname')";
  $result1 = mysql_query($query1);
}

  if ($result1 && $cnt==0) {
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $groupname . '"})';
} 
else if($cnt>0) {
    mysql_query("ROLLBACK");
    echo '({"success":"false","cnt":"' . $cnt . '"})';
} else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $groupname . '"})';
}
  
   
?>
