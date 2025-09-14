<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$savetype = $_POST['savetype'];
$departmentcode  = $_POST['departmentcode'];
$departmentname  = strtoupper($_POST['departmentname']);
$departmentcode  = strtoupper($_POST['departmentcode']);
$hodname  = strtoupper($_POST['hodname']);
if ($savetype === "Add")
{

	$query   = "select ifnull(max(dept_code),0)+1 as deptcode from mas_dept";
	$result  = mysql_query($query);
	$rec     = mysql_fetch_array($result);
	$departmentcode = $rec['deptcode'];

	$qry = "select count(*) as cnt from mas_dept where dept_name = '$departmentname'";
	$resag = mysql_query($qry);
	$recvar = mysql_fetch_array($resag);
	$cnt=$recvar['cnt'];

	if($cnt==0)
	{
	  $query1="insert into mas_dept values('$departmentcode','$departmentname','$hodname')";
	  $result1 = mysql_query($query1);
	}

	  if ($result1 && $cnt==0) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $departmentname . '"})';
	} 
	  else if ($cnt>0) {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
	}else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $departmentname . '"})';
	}
     }
     else
     {

	  $query1="update mas_dept set dept_name ='$departmentname' , dept_headname = '$hodname' where dept_code =$departmentcode";
	  $result1 = mysql_query($query1);
	  if ($result1 ) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $departmentname . '"})';
	  } 
	
	  else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $departmentname . '"})';
	   }
     } 
   
?>
