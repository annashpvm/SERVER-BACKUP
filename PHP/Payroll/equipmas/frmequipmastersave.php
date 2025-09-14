<?php
require($_SERVER["DOCUMENT_ROOT"]."/conn.php");
session_start();
$savetype = $_POST['savetype'];
$equipmascode  = $_POST['equipmascode'];
$equipmasname  = strtoupper($_POST['equipmasname']);
$equipmascode  = strtoupper($_POST['equipmascode']);
if ($savetype === "Add")
{

	$query   = "select ifnull(max(equip_code),0)+1 as equipcode from mas_equipment";
	$result  = mysql_query($query);
	$rec     = mysql_fetch_array($result);
	$equipmascode = $rec['equipcode'];

	$qry = "select count(*) as cnt from mas_equipment where equip_name = '$equipmasname'";
	$resag = mysql_query($qry);
	$recvar = mysql_fetch_array($resag);
	$cnt=$recvar['cnt'];

	if($cnt==0)
	{
	  $query1="insert into mas_equipment values('$equipmascode','$equipmasname')";
	  $result1 = mysql_query($query1);
	}

	  if ($result1 && $cnt==0) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $equipmasname . '"})';
	} 
	  else if ($cnt>0) {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
	}else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $equipmasname . '"})';
	}
     }
     else
     {

	  $query1="update mas_equipment set equip_name ='$equipmasname'  where equip_code =$equipmascode";
	  $result1 = mysql_query($query1);
	  if ($result1 ) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $equipmasname . '"})';
	  } 
	
	  else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $equipmasname . '"})';
	   }
     } 
   
?>
