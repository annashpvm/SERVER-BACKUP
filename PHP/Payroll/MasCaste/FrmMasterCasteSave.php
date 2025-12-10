<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php";
session_start();
$savetype = $_POST['savetype'];
$castecode  = $_POST['castecode'];
$castename  = strtoupper($_POST['castename']);
$castecode  = strtoupper($_POST['castecode']);
if ($savetype === "Add")
{

	$query   = "select ifnull(max(caste_code),0)+1 as cascode from mas_caste";
	$result  = mysqli_query($conn, $query);
	$rec     = mysqli_fetch_array($result);
	$castecode = $rec['cascode'];

	$sql = "select count(*) as cnt from mas_caste where caste_name = '$castename'";
	$resag = mysqli_query($conn, $sql);
	$recvar = mysqli_fetch_array($resag);
	$cnt=$recvar['cnt'];

	if($cnt==0)
	{
	  $query1="insert into mas_caste values('$castecode','$castename')";
	  $result1 = mysqli_query($conn, $query1);
	}

	  if ($result1 && $cnt==0) {
	    mysqli_begin_transaction($conn);
	    echo '({"success":"true","msg":"' . $castename . '"})';
	} 
	  else if ($cnt>0) {
	    mysqli_rollback($conn);


	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
	}else {
	    mysqli_rollback($conn);


	    echo '({"success":"false","msg":"' . $castename . '"})';
	}
     }
     else
     {

	  $query1="update mas_caste set caste_name ='$castename'  where caste_code =$castecode";
	  $result1 = mysqli_query($conn, $query1);
	  if ($result1 ) {
	    mysqli_begin_transaction($conn);
	    echo '({"success":"true","msg":"' . $castename . '"})';
	  } 
	
	  else {
	    mysqli_rollback($conn);


	    echo '({"success":"false","msg":"' . $castename . '"})';
	   }
     } 
   
?>
