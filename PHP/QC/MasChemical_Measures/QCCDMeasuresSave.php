<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$savetype = $_POST['savetype'];


$MeasurementCode  = $_POST['MeasurementCode'];
$MeasurementName  = trim(strtoupper($_POST['MeasurementName']));

if ($savetype === "Add")
{
	$query   = "select ifnull(max(qc_measuring_code),0)+1 as seccode from masqc_measuring_methods";
	$result  = mysqli_query($conn, $query);
	$rec     = mysqli_fetch_array($result);
	$MeasurementCode = $rec['seccode'];

	$qry = "select count(*) as cnt from masqc_measuring_methods where qc_measuring_name = '$MeasurementName'";
	$resag = mysqli_query($conn, $qry);
	$recvar = mysqli_fetch_array($resag);
	$cnt=$recvar['cnt'];

	if($cnt==0)
	{
	  $query1="insert into masqc_measuring_methods values('$MeasurementCode','$MeasurementName')";
	  $result1 = mysqli_query($conn, $query1);
	}

	  if ($result1 && $cnt==0) {
	    mysqli_begin_transaction($conn);
	    echo '({"success":"true","msg":"' . $MeasurementName . '"})';
	} 
	  else if ($cnt>0) {
	    mysqli_rollback($conn);


	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
	}else {
	    mysqli_rollback($conn);


	    echo '({"success":"false","msg":"' . $MeasurementName . '"})';
	}
     }
     else
     {

	  $query1="update masqc_measuring_methods set qc_measuring_name ='$MeasurementName'  where qc_measuring_code =$MeasurementCode";
	  $result1 = mysqli_query($conn, $query1);
	  if ($result1 ) {
	    mysqli_begin_transaction($conn);
	    echo '({"success":"true","msg":"' . $MeasurementName . '"})';
	  } 
	
	  else {
	    mysqli_rollback($conn);


	    echo '({"success":"false","msg":"' . $MeasurementName . '"})';
	   }
     } 
   
?>
