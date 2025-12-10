<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$savetype = $_POST['savetype'];
$supermascode  = $_POST['supermascode'];
$supermasname  = strtoupper($_POST['supermasname']);
$supermastype  = strtoupper($_POST['supermastype']);
if ($savetype === "Add")
{

	$query   = "select ifnull(max(spvr_code),0)+1 as spvrcode from mas_supervisor";
	$result  = mysqli_query($conn, $query);
	$rec     = mysqli_fetch_array($result);
	$supermascode = $rec['spvrcode'];

	$qry = "select count(*) as cnt from mas_supervisor where spvr_name = '$supermasname'";
	$resag = mysqli_query($conn, $qry);
	$recvar = mysqli_fetch_array($resag);
	$cnt=$recvar['cnt'];

	if($cnt==0)
	{
	  $query1="insert into mas_supervisor values('$supermascode','$supermasname','$supermastype')";
	  $result1 = mysqli_query($conn, $query1);
	}

	  if ($result1 && $cnt==0) {
	    mysqli_begin_transaction($conn);
	    echo '({"success":"true","msg":"' . $supermasname . '"})';
	} 
	  else if ($cnt>0) {
	    mysqli_rollback($conn);


	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
	}else {
	    mysqli_rollback($conn);


	    echo '({"success":"false","msg":"' . $supermasname . '"})';
	}
     }
     else
     {

	  $query1="update mas_supervisor set spvr_name ='$supermasname',spvr_type ='$supermastype' where spvr_code =$supermascode";
	  $result1 = mysqli_query($conn, $query1);
	  if ($result1 ) {
	    mysqli_begin_transaction($conn);
	    echo '({"success":"true","msg":"' . $supermasname . '"})';
	  } 
	
	  else {
	    mysqli_rollback($conn);


	    echo '({"success":"false","msg":"' . $supermasname . '"})';
	   }
     } 
   
?>
