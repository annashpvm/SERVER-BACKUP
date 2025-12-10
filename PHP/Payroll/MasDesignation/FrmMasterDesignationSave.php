<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php";
session_start();
$savetype = $_POST['savetype'];
$designationcode  = $_POST['designationcode'];
$designationname  = strtoupper($_POST['designationname']);
$designationcode  = strtoupper($_POST['designationcode']);
if ($savetype === "Add")
{

	$query   = "select ifnull(max(design_code),0)+1 as designcode from mas_designation";
	$result  = mysqli_query($conn, $query);
	$rec     = mysqli_fetch_array($result);
	$designationcode = $rec['designcode'];

	$sql = "select count(*) as cnt from mas_designation where design_name = '$designationname'";
	$resag = mysqli_query($conn, $sql);
	$recvar = mysqli_fetch_array($resag);
	$cnt=$recvar['cnt'];

	if($cnt==0)
	{
	  $query1="insert into mas_designation values('$designationcode','$designationname')";
	  $result1 = mysqli_query($conn, $query1);
	}

	  if ($result1 && $cnt==0) {
	    mysqli_begin_transaction($conn);
	    echo '({"success":"true","msg":"' . $designationname . '"})';
	} 
	  else if ($cnt>0) {
	    mysqli_rollback($conn);


	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
	}else {
	    mysqli_rollback($conn);


	    echo '({"success":"false","msg":"' . $designationname . '"})';
	}
     }
     else
     {

	  $query1="update mas_designation set design_name ='$designationname'  where design_code =$designationcode";
	  $result1 = mysqli_query($conn, $query1);
	  if ($result1 ) {
	    mysqli_begin_transaction($conn);
	    echo '({"success":"true","msg":"' . $designationname . '"})';
	  } 
	
	  else {
	    mysqli_rollback($conn);


	    echo '({"success":"false","msg":"' . $designationname . '"})';
	   }
     } 
   
?>
