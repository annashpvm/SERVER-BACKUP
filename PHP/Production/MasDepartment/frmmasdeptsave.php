<?php
require($_SERVER["DOCUMENT_ROOT"]."/conn.php");
session_start();
$savetype = $_POST['savetype'];
$departmentcode  = $_POST['departmentcode'];
$departmentname  = strtoupper($_POST['departmentname']);
$departmentcode  = strtoupper($_POST['departmentcode']);
if ($savetype === "Add")
{

	$query   = "select ifnull(max(dept_code),0)+1 as deptcode from mas_department";
	$result  = mysqli_query($conn, $query);
	$rec     = mysqli_fetch_array($result);
	$departmentcode = $rec['deptcode'];

	$qry = "select count(*) as cnt from mas_department where dept_name = '$departmentname'";
	$resag = mysqli_query($conn, $qry);
	$recvar = mysqli_fetch_array($resag);
	$cnt=$recvar['cnt'];

	if($cnt==0)
	{
	  $query1="insert into mas_department values('$departmentcode','$departmentname')";
	  $result1 = mysqli_query($conn, $query1);
	}

	  if ($result1 && $cnt==0) {
	    mysqli_begin_transaction($conn);
	    echo '({"success":"true","msg":"' . $departmentname . '"})';
	} 
	  else if ($cnt>0) {
	    mysqli_rollback($conn);


	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
	}else {
	    mysqli_rollback($conn);


	    echo '({"success":"false","msg":"' . $departmentname . '"})';
	}
     }
     else
     {

	  $query1="update mas_department set dept_name ='$departmentname'  where dept_code =$departmentcode";
	  $result1 = mysqli_query($conn, $query1);
	  if ($result1 ) {
	    mysqli_begin_transaction($conn);
	    echo '({"success":"true","msg":"' . $departmentname . '"})';
	  } 
	
	  else {
	    mysqli_rollback($conn);


	    echo '({"success":"false","msg":"' . $departmentname . '"})';
	   }
     } 
   
?>
