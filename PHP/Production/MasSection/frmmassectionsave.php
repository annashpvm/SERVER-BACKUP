<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$savetype = $_POST['savetype'];
$sectionmascode  = $_POST['sectionmascode'];
$sectionmasname  = trim(strtoupper($_POST['sectionmasname']));

if ($savetype === "Add")
{

	$query   = "select ifnull(max(section_code),0)+1 as seccode from mas_section";
	$result  = mysqli_query($conn, $query);
	$rec     = mysqli_fetch_array($result);
	$sectionmascode = $rec['seccode'];

	$qry = "select count(*) as cnt from mas_section where section_name = '$sectionmasname'";
	$resag = mysqli_query($conn, $qry);
	$recvar = mysqli_fetch_array($resag);
	$cnt=$recvar['cnt'];

	if($cnt==0)
	{
	  $query1="insert into mas_section values('$sectionmascode','$sectionmasname')";
	  $result1 = mysqli_query($conn, $query1);
	}

	  if ($result1 && $cnt==0) {
	    mysqli_begin_transaction($conn);
	    echo '({"success":"true","msg":"' . $sectionmasname . '"})';
	} 
	  else if ($cnt>0) {
	    mysqli_rollback($conn);


	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
	}else {
	    mysqli_rollback($conn);


	    echo '({"success":"false","msg":"' . $sectionmasname . '"})';
	}
     }
     else
     {

	  $query1="update mas_section set section_name ='$sectionmasname'  where section_code =$sectionmascode";
	  $result1 = mysqli_query($conn, $query1);
	  if ($result1 ) {
	    mysqli_begin_transaction($conn);
	    echo '({"success":"true","msg":"' . $sectionmasname . '"})';
	  } 
	
	  else {
	    mysqli_rollback($conn);


	    echo '({"success":"false","msg":"' . $sectionmasname . '"})';
	   }
     } 
   
?>
