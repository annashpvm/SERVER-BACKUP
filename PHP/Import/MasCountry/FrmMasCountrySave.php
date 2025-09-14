<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$savetype = $_POST['savetype'];
$qlycode  = $_POST['qlycode'];
$countrycode  = strtoupper($_POST['countrycode']);
$countryname    = strtoupper($_POST['countryname']);


if ($savetype === "Add")
{

	$query   = "select ifnull(max(country_code),0)+1 as contrycode from mas_country";
	$result  = mysql_query($query);
	$rec     = mysql_fetch_array($result);
	$countrycode = $rec['contrycode'];

	$qry = "select count(*) as cnt from mas_country where country_name = '$countryname'";
	$resag = mysql_query($qry);
	$recvar = mysql_fetch_array($resag);
	$cnt=$recvar['cnt'];

	if($cnt==0)
	{
	  $query1="insert into mas_country values('$countrycode','$countryname','0')";
	  $result1 = mysql_query($query1);
	}

	  if ($result1 && $cnt==0) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $countryname . '"})';
	} 
	  else if ($cnt>0) {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
	}else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $countryname . '"})';
	}
     }
     else
     {

	  $query1="update mas_country set country_name ='$countryname'  where country_code =$countrycode";
	  $result1 = mysql_query($query1);
	  if ($result1 ) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $countryname . '"})';
	  } 
	
	  else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $countryname . '"})';
	   }
     } 
   
?>
