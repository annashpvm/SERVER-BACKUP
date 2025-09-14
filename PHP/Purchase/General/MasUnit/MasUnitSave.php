<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();


 $savetype = $_POST['savetype'];
 $unitname=strtoupper($_POST['unitname']);
 $unitshortname=strtoupper($_POST['unitshortname']);
 $uom_code = $_POST['unitcode'];




if ($savetype === "Add")
{
	$query = "select ifnull(max(uom_code),0)+1 as uom_code from mas_uom";
	$result = mysql_query($query);
	$rec = mysql_fetch_array($result);
	$uom_code = $rec['uom_code'];

	$qry = "select count(*) as cnt from mas_uom where uom_name = '$unitname'";
	$resgrp = mysql_query($qry);
	$recgrp = mysql_fetch_array($resgrp);
	$cnt=$recgrp['cnt'];

	if($cnt==0)
	{
	  $query1="insert into mas_uom values('$uom_code',upper('$unitname'),upper('$unitshortname'))";
	  $result1 = mysql_query($query1);
	}
	if ($result1 && $cnt==0) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $unitname . '"})';
	} 
	else if($cnt>0) {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	} else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $unitname . '"})';
	}
}
else
{
	  $query1="update mas_uom  set uom_name = upper('$unitname') , uom_short_name = upper('$unitshortname')  where  uom_code = '$uom_code'";
	  $result1 = mysql_query($query1);
	if ($result1) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $unitname . '"})';
	} 
        else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $unitname . '"})';
	}

}
      


  
   
?>
