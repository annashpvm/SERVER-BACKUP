<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$savetype = $_POST['savetype'];
$qualificationcode  = $_POST['qualificationcode'];
$qualificationname  = strtoupper($_POST['qualificationname']);
$qualificationcode  = strtoupper($_POST['qualificationcode']);
if ($savetype === "Add")
{

	$query   = "select ifnull(max(qualification_code),0)+1 as qualificode from mas_qualification";
	$result  = mysql_query($query);
	$rec     = mysql_fetch_array($result);
	$departmentcode = $rec['qualificode'];

	$qry = "select count(*) as cnt from mas_qualification where qualification_name = '$qualificationname'";
	$resag = mysql_query($qry);
	$recvar = mysql_fetch_array($resag);
	$cnt=$recvar['cnt'];

	if($cnt==0)
	{
	  $query1="insert into mas_qualification values('$qualificationcode','$qualificationname')";
	  $result1 = mysql_query($query1);
	}

	  if ($result1 && $cnt==0) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $qualificationname . '"})';
	} 
	  else if ($cnt>0) {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
	}else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $qualificationname . '"})';
	}
     }
     else
     {

	  $query1="update mas_qualification set qualification_name ='$qualificationname'  where qualification_code =$qualificationcode";
	  $result1 = mysql_query($query1);
	  if ($result1 ) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $qualificationname . '"})';
	  } 
	
	  else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $qualificationname . '"})';
	   }
     } 
   
?>
