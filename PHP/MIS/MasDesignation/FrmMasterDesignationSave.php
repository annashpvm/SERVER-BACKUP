<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$savetype = $_POST['savetype'];
$designationcode  = $_POST['designationcode'];
$designationname  = strtoupper($_POST['designationname']);
$designationcode  = strtoupper($_POST['designationcode']);
if ($savetype === "Add")
{

	$query   = "select ifnull(max(design_code),0)+1 as designcode from mas_designation";
	$result  = mysql_query($query);
	$rec     = mysql_fetch_array($result);
	$designationcode = $rec['designcode'];

	$qry = "select count(*) as cnt from mas_designation where design_name = '$designationname'";
	$resag = mysql_query($qry);
	$recvar = mysql_fetch_array($resag);
	$cnt=$recvar['cnt'];

	if($cnt==0)
	{
	  $query1="insert into mas_designation values('$designationcode','$designationname')";
	  $result1 = mysql_query($query1);
	}

	  if ($result1 && $cnt==0) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $designationname . '"})';
	} 
	  else if ($cnt>0) {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
	}else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $designationname . '"})';
	}
     }
     else
     {

	  $query1="update mas_designation set design_name ='$designationname'  where design_code =$designationcode";
	  $result1 = mysql_query($query1);
	  if ($result1 ) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $designationname . '"})';
	  } 
	
	  else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $designationname . '"})';
	   }
     } 
   
?>
