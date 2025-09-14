<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$savetype = $_POST['savetype'];
$communitycode  = $_POST['communitycode'];
$communityname  = strtoupper($_POST['communityname']);
$communitycode  = strtoupper($_POST['communitycode']);
if ($savetype === "Add")
{

	$query   = "select ifnull(max(comm_code),0)+1 as comcode from mas_community";
	$result  = mysql_query($query);
	$rec     = mysql_fetch_array($result);
	$communitycode = $rec['comcode'];

	$qry = "select count(*) as cnt from mas_community where comm_name = '$communityname'";
	$resag = mysql_query($qry);
	$recvar = mysql_fetch_array($resag);
	$cnt=$recvar['cnt'];

	if($cnt==0)
	{
	  $query1="insert into mas_community values('$communitycode','$communityname')";
	  $result1 = mysql_query($query1);
	}

	  if ($result1 && $cnt==0) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $communityname . '"})';
	} 
	  else if ($cnt>0) {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
	}else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $communityname . '"})';
	}
     }
     else
     {

	  $query1="update mas_community set comm_name ='$communityname'  where comm_code =$communitycode";
	  $result1 = mysql_query($query1);
	  if ($result1 ) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $communityname . '"})';
	  } 
	
	  else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $communityname . '"})';
	   }
     } 
   
?>
