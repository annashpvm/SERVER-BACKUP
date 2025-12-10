<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$savetype   = $_POST['savetype'];
$reprcode   = $_POST['reprcode'];
$reprname   = strtoupper($_POST['reprname']);
$repradd1   = strtoupper($_POST['repradd1']);
$repradd2   = strtoupper($_POST['repradd2']);
$repradd3   = strtoupper($_POST['repradd3']);
$reprpin    = $_POST['reprpin'];
$reprmobile = $_POST['reprmobile'];
$reprgroup  = $_POST['reprgroup'];
$repractive = $_POST['repractive'];




if ($savetype === "Add")
{

	$query   = "select ifnull(max(repr_code),0)+1 as reprcode from massal_repr";
	$result  = mysqli_query($conn, $query);
	$rec     = mysqli_fetch_array($result);
	$reprcode = $rec['reprcode'];

	$qry = "select count(*) as cnt from massal_repr where repr_name = '$reprname'";
	$resag = mysqli_query($conn, $qry);
	$recvar = mysqli_fetch_array($resag);
	$cnt=$recvar['cnt'];

	if($cnt==0)
	{
	  $query1="insert into massal_repr values('$reprcode','$reprname','$reprmobile','$repradd1','$repradd2','$repradd3','$reprpin','$reprgroup','Y')";
	  $result1 = mysqli_query($conn, $query1);
	}

	  if ($result1 && $cnt==0) {
	    mysqli_begin_transaction($conn);
	    echo '({"success":"true","msg":"' . $reprname . '"})';
	} 
	  else if ($cnt>0) {
	    mysqli_rollback($conn);


	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
	}else {
	    mysqli_rollback($conn);


	    echo '({"success":"false","msg":"' . $reprname . '"})';
	}
     }
     else
     {

	  $query1="update massal_repr set repr_name = '$reprname', repr_addr1 = '$repradd1' , repr_addr2  = '$repradd2', repr_addr3 = '$repradd3',  repr_pincode  = '$reprpin' ,  repr_mobile   = '$reprmobile' ,  repr_accgrp   = '$reprgroup', repr_active = '$repractive'  where repr_code =$reprcode";

//echo $query1;

	  $result1 = mysqli_query($conn, $query1);
	  if ($result1 ) {
	    mysqli_begin_transaction($conn);
	    echo '({"success":"true","msg":"' . $reprname . '"})';
	  } 
	
	  else {
	    mysqli_rollback($conn);


	    echo '({"success":"false","msg":"' . $reprname . '"})';
	   }
     } 
   
?>
