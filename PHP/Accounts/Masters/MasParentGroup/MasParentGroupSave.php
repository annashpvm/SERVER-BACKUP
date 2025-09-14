<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();


 $savetype = $_POST['savetype'];
 $groupname=strtoupper($_POST['groupname']);
 $accgrpcode = $_POST['accgrpcode'];


if ($savetype === "Add")
{
	$query = "select ifnull(max(grp_code),0)+1 as grp_code from acc_group_master";
	$result = mysql_query($query);
	$rec = mysql_fetch_array($result);
	$grp_code = $rec['grp_code'];

	$qry = "select count(*) as cnt from acc_group_master where grp_name = '$groupname'";
	$resgrp = mysql_query($qry);
	$recgrp = mysql_fetch_array($resgrp);
	$cnt=$recgrp['cnt'];

	if($cnt==0)
	{
	  $query1="insert into acc_group_master values('$grp_code',1,upper('$groupname'),1,'Y','B','L')";
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
}
else
{
	  $query1="update acc_group_master  set grp_name = upper('$groupname') where  grp_code = '$accgrpcode'";
	  $result1 = mysql_query($query1);
	if ($result1) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $groupname . '"})';
	} 
        else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $groupname . '"})';
	}

}
      


  
   
?>
