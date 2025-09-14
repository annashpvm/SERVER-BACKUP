<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$savetype = $_POST['savetype'];


$MeasurementCode  = $_POST['MeasurementCode'];
$MeasurementName  = trim(strtoupper($_POST['MeasurementName']));

if ($savetype === "Add")
{
	$query   = "select ifnull(max(qc_measuring_code),0)+1 as seccode from masqc_measuring_methods";
	$result  = mysql_query($query);
	$rec     = mysql_fetch_array($result);
	$MeasurementCode = $rec['seccode'];

	$qry = "select count(*) as cnt from masqc_measuring_methods where qc_measuring_name = '$MeasurementName'";
	$resag = mysql_query($qry);
	$recvar = mysql_fetch_array($resag);
	$cnt=$recvar['cnt'];

	if($cnt==0)
	{
	  $query1="insert into masqc_measuring_methods values('$MeasurementCode','$MeasurementName')";
	  $result1 = mysql_query($query1);
	}

	  if ($result1 && $cnt==0) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $MeasurementName . '"})';
	} 
	  else if ($cnt>0) {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
	}else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $MeasurementName . '"})';
	}
     }
     else
     {

	  $query1="update masqc_measuring_methods set qc_measuring_name ='$MeasurementName'  where qc_measuring_code =$MeasurementCode";
	  $result1 = mysql_query($query1);
	  if ($result1 ) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $MeasurementName . '"})';
	  } 
	
	  else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $MeasurementName . '"})';
	   }
     } 
   
?>
