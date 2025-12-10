<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php";
session_start();
$savetype = $_POST['savetype'];
$Deductioncode  = $_POST['Deductioncode'];
$Deductionname  = strtoupper($_POST['Deductionname']);
$Deductioncode  = strtoupper($_POST['Deductioncode']);
if ($savetype === "Add")
{

	$query   = "select ifnull(max(pdedu_code),0)+1 as dedcode from pdedu_mas";
	$result  = mysqli_query($conn, $query);
	$rec     = mysqli_fetch_array($result);
	$Deductioncode = $rec['dedcode'];

	$sql = "select count(*) as cnt from pdedu_mas where pdedu_name = '$Deductionname'";
	$resag = mysqli_query($conn, $sql);
	$recvar = mysqli_fetch_array($resag);
	$cnt=$recvar['cnt'];

	if($cnt==0)
	{
	  $query1="insert into pdedu_mas values('$Deductioncode','$Deductionname',1)";


	  
	  $result1 = mysqli_query($conn, $query1);
	}

	  if ($result1 && $cnt==0) {
	    mysqli_begin_transaction($conn);
	    echo '({"success":"true","msg":"' . $Deductionname . '"})';
	} 
	  else if ($cnt>0) {
	    mysqli_rollback($conn);


	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
	}else {
	    mysqli_rollback($conn);


	    echo '({"success":"false","msg":"' . $Deductionname . '"})';
	}
     }
     else
     {

	  $query1="update pdedu_mas set pdedu_name ='$Deductionname'  where pdedu_code =$Deductioncode";
	  $result1 = mysqli_query($conn, $query1);
	  if ($result1 ) {
	    mysqli_begin_transaction($conn);
	    echo '({"success":"true","msg":"' . $Deductionname . '"})';
	  } 
	
	  else {
	    mysqli_rollback($conn);


	    echo '({"success":"false","msg":"' . $Deductionname . '"})';
	   }
     } 
   
?>
