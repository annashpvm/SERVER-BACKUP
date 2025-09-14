<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();


 $savetype    = $_POST['savetype'];
 $subgrpname  = strtoupper($_POST['subgrpname']);
 $purgrpcode  = $_POST['purgrpcode'];
 $maingrpcode = $_POST['grpcode'];
if ($savetype === "Add")
{
	$query = "select ifnull(max(subgrp_code),0)+1 as subgrp_code from maspur_subgroup";
	$result = mysql_query($query);
	$rec = mysql_fetch_array($result);
	$subgrp_code = $rec['subgrp_code'];

	$qry = "select count(*) as cnt from maspur_subgroup where subgrp_name = '$subgrpname'";
	$resgrp = mysql_query($qry);
	$recgrp = mysql_fetch_array($resgrp);
	$cnt=$recgrp['cnt'];

	if($cnt==0)
	{
	  $query1="insert into maspur_subgroup values('$subgrp_code',upper('$subgrpname'), $maingrpcode)";
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
	  $query1="update maspur_subgroup set subgrp_name = upper('$subgrpname'),subgrp_grpcode = '$maingrpcode' where subgrp_code = '$purgrpcode'";
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
