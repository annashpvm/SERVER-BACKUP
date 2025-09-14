<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$savetype = $_POST['savetype'];
$sectionmascode  = $_POST['sectionmascode'];
$sectionmasname  = trim(strtoupper($_POST['sectionmasname']));

if ($savetype === "Add")
{

	$query   = "select ifnull(max(section_code),0)+1 as seccode from mas_section";
	$result  = mysql_query($query);
	$rec     = mysql_fetch_array($result);
	$sectionmascode = $rec['seccode'];

	$qry = "select count(*) as cnt from mas_section where section_name = '$sectionmasname'";
	$resag = mysql_query($qry);
	$recvar = mysql_fetch_array($resag);
	$cnt=$recvar['cnt'];

	if($cnt==0)
	{
	  $query1="insert into mas_section values('$sectionmascode','$sectionmasname')";
	  $result1 = mysql_query($query1);
	}

	  if ($result1 && $cnt==0) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $sectionmasname . '"})';
	} 
	  else if ($cnt>0) {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
	}else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $sectionmasname . '"})';
	}
     }
     else
     {

	  $query1="update mas_section set section_name ='$sectionmasname'  where section_code =$sectionmascode";
	  $result1 = mysql_query($query1);
	  if ($result1 ) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $sectionmasname . '"})';
	  } 
	
	  else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $sectionmasname . '"})';
	   }
     } 
   
?>
