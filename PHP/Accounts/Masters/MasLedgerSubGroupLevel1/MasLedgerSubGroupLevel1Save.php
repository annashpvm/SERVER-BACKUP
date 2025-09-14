<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

 $savetype    = $_POST['savetype'];
 $subgrpname  = strtoupper($_POST['subgrpname']);
 $subledgrpcode  = $_POST['subledgrpcode'];
 $maingrpcode = $_POST['parentgrpcode'];
 $grptype     = $_POST['grptype'];
 $grppltype   = $_POST['grppltype'];

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
	  $query1="insert into acc_group_master values('$grp_code',1,upper('$subgrpname'),'$maingrpcode','Y','$grptype','$grppltype')";
	  $result1 = mysql_query($query1);
	}
	if ($result1 && $cnt==0) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $subgrpname . '"})';
	} 
	else if($cnt>0) {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	} else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $subgrpname . '"})';
	}
}
else
{
	  $query1="update acc_group_master  set grp_name = upper('$subgrpname')  , grp_parent_code = '$maingrpcode' where  grp_code = '$subledgrpcode'";
	  $result1 = mysql_query($query1);
	if ($result1) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $subgrpname . '"})';
	} 
        else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $subgrpname . '"})';
	}

}
    
      


  
   
?>
