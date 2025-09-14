<?php
require($_SERVER["DOCUMENT_ROOT"]."/conn.php");
session_start();
$savetype = $_POST['savetype'];
$supermascode  = $_POST['supermascode'];
$supermasname  = strtoupper($_POST['supermasname']);
$supermastype  = strtoupper($_POST['supermastype']);
if ($savetype === "Add")
{

	$query   = "select ifnull(max(spvr_code),0)+1 as spvrcode from mas_supervisor";
	$result  = mysql_query($query);
	$rec     = mysql_fetch_array($result);
	$supermascode = $rec['spvrcode'];

	$qry = "select count(*) as cnt from mas_supervisor where spvr_name = '$supermasname'";
	$resag = mysql_query($qry);
	$recvar = mysql_fetch_array($resag);
	$cnt=$recvar['cnt'];

	if($cnt==0)
	{
	  $query1="insert into mas_supervisor values('$supermascode','$supermasname','$supermastype')";
	  $result1 = mysql_query($query1);
	}

	  if ($result1 && $cnt==0) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $supermasname . '"})';
	} 
	  else if ($cnt>0) {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
	}else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $supermasname . '"})';
	}
     }
     else
     {

	  $query1="update mas_supervisor set spvr_name ='$supermasname',spvr_type ='$supermastype' where spvr_code =$supermascode";
	  $result1 = mysql_query($query1);
	  if ($result1 ) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $supermasname . '"})';
	  } 
	
	  else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $supermasname . '"})';
	   }
     } 
   
?>
