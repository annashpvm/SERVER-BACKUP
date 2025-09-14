<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();


 $savetype = $_POST['savetype'];
 $servicename=strtoupper($_POST['servicename']);
 $servicecode = $_POST['servicecode'];


if ($savetype === "Add")
{
	$query = "select ifnull(max(tds_service_type_code),0)+1 as tds_service_type_code from mas_tds_servicetype";
	$result = mysql_query($query);
	$rec = mysql_fetch_array($result);
	$tds_service_type_code = $rec['tds_service_type_code'];

	$qry = "select count(*) as cnt from mas_tds_servicetype where tds_service_type_name = '$servicename'";
	$resgrp = mysql_query($qry);
	$recgrp = mysql_fetch_array($resgrp);
	$cnt=$recgrp['cnt'];

	if($cnt==0)
	{
	  $query1="insert into mas_tds_servicetype values('$tds_service_type_code',upper('$servicename'))";
	  $result1 = mysql_query($query1);
	}
	if ($result1 && $cnt==0) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $servicename . '"})';
	} 
	else if($cnt>0) {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	} else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $servicename . '"})';
	}
}
else
{
	  $query1="update mas_tds_servicetype  set tds_service_type_name = upper('$servicename') where  tds_service_type_code = '$servicecode'";
	  $result1 = mysql_query($query1);
	if ($result1) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $servicename . '"})';
	} 
        else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $servicename . '"})';
	}

}
      


  
   
?>
