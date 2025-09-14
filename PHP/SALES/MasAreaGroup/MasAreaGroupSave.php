<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();


 $savetype = $_POST['savetype'];
 $areaname =strtoupper($_POST['areaname']);
 $areacode = $_POST['areacode'];
 $grpcode = $_POST['grpcode'];



if ($savetype === "Add")
{
	$query = "select ifnull(max(area_code),0)+1 as areacode from massal_area";




	$result = mysql_query($query);
	$rec = mysql_fetch_array($result);
	$areacode = $rec['areacode'];

	$qry = "select count(*) as cnt from massal_area where area_name = '$areaname'";
	$resgrp = mysql_query($qry);
	$recgrp = mysql_fetch_array($resgrp);
	$cnt=$recgrp['cnt'];

	if($cnt==0)
	{
	  $query1="insert into massal_area values('$areacode','$areaname', $grpcode)";
	  $result1 = mysql_query($query1);



	}
	if ($result1 && $cnt==0) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $areaname . '"})';
	} 
	else if($cnt>0) {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	} else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $areaname . '"})';
	}
}
else
{
	  $query1="update massal_area  set area_name = upper('$areaname') ,area_rategrp = $grpcode where  area_code = '$areacode'";
	  $result1 = mysql_query($query1);
	if ($result1) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $areaname . '"})';
	} 
        else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $areaname . '"})';
	}

}
      


  
   
?>
