<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$savetype = $_POST['savetype'];
$qlycode  = $_POST['qlycode'];
$countrycode  = strtoupper($_POST['countrycode']);
$countryname    = strtoupper($_POST['countryname']);


if ($savetype === "Add")
{

	$query   = "select ifnull(max(country_code),0)+1 as contrycode from mas_country";
	$result  = mysqli_query($conn, $query);
	$rec     = mysqli_fetch_array($result);
	$countrycode = $rec['contrycode'];

	$qry = "select count(*) as cnt from mas_country where country_name = '$countryname'";
	$resag = mysqli_query($conn, $qry);
	$recvar = mysqli_fetch_array($resag);
	$cnt=$recvar['cnt'];

	if($cnt==0)
	{
	  $query1="insert into mas_country values('$countrycode','$countryname','0')";
	  $result1 = mysqli_query($conn, $query1);
	}

	  if ($result1 && $cnt==0) {
	    mysqli_begin_transaction($conn);
	    echo '({"success":"true","msg":"' . $countryname . '"})';
	} 
	  else if ($cnt>0) {
	    mysqli_rollback($conn);


	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
	}else {
	    mysqli_rollback($conn);


	    echo '({"success":"false","msg":"' . $countryname . '"})';
	}
     }
     else
     {

	  $query1="update mas_country set country_name ='$countryname'  where country_code =$countrycode";
	  $result1 = mysqli_query($conn, $query1);
	  if ($result1 ) {
	    mysqli_begin_transaction($conn);
	    echo '({"success":"true","msg":"' . $countryname . '"})';
	  } 
	
	  else {
	    mysqli_rollback($conn);


	    echo '({"success":"false","msg":"' . $countryname . '"})';
	   }
     } 
   
?>
