<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$savetype = $_POST['savetype'];
$religioncode  = $_POST['religioncode'];
$religionname  = strtoupper($_POST['religionname']);
$religioncode  = strtoupper($_POST['religioncode']);
if ($savetype === "Add")
{

	$query   = "select ifnull(max(religion_code),0)+1 as relicode from mas_religion";
	$result  = mysql_query($query);
	$rec     = mysql_fetch_array($result);
	$religioncode = $rec['relicode'];

	$qry = "select count(*) as cnt from mas_religion where religion_name = '$religionname'";
	$resag = mysql_query($qry);
	$recvar = mysql_fetch_array($resag);
	$cnt=$recvar['cnt'];

	if($cnt==0)
	{
	  $query1="insert into mas_religion values('$religioncode','$religionname')";
	  $result1 = mysql_query($query1);
	}

	  if ($result1 && $cnt==0) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $religionname . '"})';
	} 
	  else if ($cnt>0) {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
	}else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $religionname . '"})';
	}
     }
     else
     {

	  $query1="update mas_religion set religion_name ='$religionname'  where religion_code =$religioncode";
	  $result1 = mysql_query($query1);
	  if ($result1 ) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $religionname . '"})';
	  } 
	
	  else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $religionname . '"})';
	   }
     } 
   
?>
