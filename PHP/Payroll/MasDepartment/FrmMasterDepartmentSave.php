<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php";
session_start();
$savetype = $_POST['savetype'];
$departmentcode  = $_POST['departmentcode'];
$departmentname  = strtoupper($_POST['departmentname']);
$departmentcode  = strtoupper($_POST['departmentcode']);
if ($savetype === "Add")
{

	$query   = "select ifnull(max(department_code),0)+1 as deptcode from mas_department";
	$result  = mysqli_query($conn, $query);
	$rec     = mysqli_fetch_array($result);
	$departmentcode = $rec['deptcode'];

	$sql = "select count(*) as cnt from mas_department where department_name = '$departmentname'";
	$resag = mysqli_query($conn, $sql);
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

	  $query1="update mas_department set department_name ='$departmentname'  where department_code =$departmentcode";
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
