<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();


 $savetype = $_POST['savetype'];
 $groupname=strtoupper($_POST['groupname']);
 $purgrpcode = $_POST['purgrpcode'];


if ($savetype === "Add")
{
	$query = "select ifnull(max(grp_code),0)+1 as grp_code from maspur_group";
	$result = mysql_query($query);
	$rec = mysql_fetch_array($result);
	$grp_code = $rec['grp_code'];

	$qry = "select count(*) as cnt from maspur_group where grp_name = '$groupname'";
	$resgrp = mysql_query($qry);
	$recgrp = mysql_fetch_array($resgrp);
	$cnt=$recgrp['cnt'];

	if($cnt==0)
	{
	  $query1="insert into maspur_group values('$grp_code',upper('$groupname'))";
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
	  $query1="update maspur_group  set grp_name = upper('$groupname') where  grp_code = '$purgrpcode'";
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
