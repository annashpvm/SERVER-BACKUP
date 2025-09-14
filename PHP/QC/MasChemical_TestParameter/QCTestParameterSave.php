<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$savetype = $_POST['savetype'];


$ParameterCode  = $_POST['ParameterCode'];
$ParameterName  = trim(strtoupper($_POST['ParameterName']));

if ($savetype === "Add")
{
	$query   = "select ifnull(max(qc_cd_param_code),0)+1 as seccode from masqc_cd_parameters";
	$result  = mysql_query($query);
	$rec     = mysql_fetch_array($result);
	$ParameterCode = $rec['seccode'];

	$qry = "select count(*) as cnt from masqc_cd_parameters where qc_cd_param_name = '$ParameterName'";
	$resag = mysql_query($qry);
	$recvar = mysql_fetch_array($resag);
	$cnt=$recvar['cnt'];

	if($cnt==0)
	{
	  $query1="insert into masqc_cd_parameters values('$ParameterCode','$ParameterName')";
	  $result1 = mysql_query($query1);
	}

	  if ($result1 && $cnt==0) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $ParameterName . '"})';
	} 
	  else if ($cnt>0) {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
	}else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $ParameterName . '"})';
	}
     }
     else
     {

	  $query1="update masqc_cd_parameters set qc_cd_param_name ='$ParameterName'  where qc_cd_param_code =$ParameterCode";
	  $result1 = mysql_query($query1);
	  if ($result1 ) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $ParameterName . '"})';
	  } 
	
	  else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $ParameterName . '"})';
	   }
     } 
   
?>
