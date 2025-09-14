<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$savetype = $_POST['savetype'];
$Deductioncode  = $_POST['Deductioncode'];
$Deductionname  = strtoupper($_POST['Deductionname']);
$Deductioncode  = strtoupper($_POST['Deductioncode']);
if ($savetype === "Add")
{

	$query   = "select ifnull(max(pdedu_code),0)+1 as dedcode from pdedu_mas";
	$result  = mysql_query($query);
	$rec     = mysql_fetch_array($result);
	$Deductioncode = $rec['dedcode'];

	$qry = "select count(*) as cnt from pdedu_mas where pdedu_name = '$Deductionname'";
	$resag = mysql_query($qry);
	$recvar = mysql_fetch_array($resag);
	$cnt=$recvar['cnt'];

	if($cnt==0)
	{
	  $query1="insert into pdedu_mas values('$Deductioncode','$Deductionname',1)";


	  
	  $result1 = mysql_query($query1);
	}

	  if ($result1 && $cnt==0) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $Deductionname . '"})';
	} 
	  else if ($cnt>0) {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
	}else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $Deductionname . '"})';
	}
     }
     else
     {

	  $query1="update pdedu_mas set pdedu_name ='$Deductionname'  where pdedu_code =$Deductioncode";
	  $result1 = mysql_query($query1);
	  if ($result1 ) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $Deductionname . '"})';
	  } 
	
	  else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $Deductionname . '"})';
	   }
     } 
   
?>
