<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$savetype = $_POST['savetype'];
$portcode     = $_POST['portcode'];
$countrycode  = strtoupper($_POST['countrycode']);
$portname     = strtoupper($_POST['portname']);


if ($savetype === "Add")
{

	$query   = "select ifnull(max(port_code),0)+1 as portcode from mas_port";
	$result  = mysql_query($query);
	$rec     = mysql_fetch_array($result);
	$portcode = $rec['portcode'];

	$qry = "select count(*) as cnt from mas_port where port_name = '$portname'";
	$resag = mysql_query($qry);
	$recvar = mysql_fetch_array($resag);
	$cnt=$recvar['cnt'];

	if($cnt==0)
	{
	  $query1="insert into mas_port values( '$portcode','$portname', '$countrycode','',1)";
	  $result1 = mysql_query($query1);
//echo $query1;
	}

	  if ($result1 && $cnt==0) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $portname . '"})';
	} 
	  else if ($cnt>0) {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
	}else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $portname . '"})';
	}
     }
     else
     {

	  $query1="update mas_port set port_name ='$portname' , port_country = '$countrycode'   where port_code =$portcode";
	  $result1 = mysql_query($query1);
	  if ($result1 ) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $portname . '"})';
	  } 
	
	  else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $portname . '"})';
	   }
     } 
   
?>
