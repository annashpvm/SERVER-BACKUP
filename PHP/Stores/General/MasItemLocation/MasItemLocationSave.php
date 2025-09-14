<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();


 $savetype = $_POST['savetype'];

 $locname = strtoupper($_POST['locname']);
 $loccode = $_POST['loccode'];


if ($savetype === "Add")
{
	$query = "select ifnull(max(loc_code),0)+1 as loc_code from maspur_location";
	$result = mysql_query($query);
	$rec = mysql_fetch_array($result);
	$loccode = $rec['loc_code'];

	$qry = "select count(*) as cnt from maspur_location where loc_name = '$locname'";
	$resgrp = mysql_query($qry);
	$recgrp = mysql_fetch_array($resgrp);
	$cnt=$recgrp['cnt'];


//echo $cnt;
//echo "<br>";

	if($cnt==0)
	{
	  $query1="insert into maspur_location values('$loccode',upper('$locname'))";
	  $result1 = mysql_query($query1);
//echo $query1;
//echo "<br>";

	}
	if ($result1 && $cnt==0) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $locname . '"})';
	} 
	else if($cnt>0) {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	} else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $locname . '"})';
	}
}
else
{
	  $query1="update maspur_location  set loc_name = upper('$locname') where  loc_code = '$loccode'";
	  $result1 = mysql_query($query1);
	if ($result1) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $locname . '"})';
	} 
        else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $locname . '"})';
	}

}
      


  
   
?>
