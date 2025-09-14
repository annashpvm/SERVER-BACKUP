<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$savetype = $_POST['savetype'];
$fwcode  = $_POST['fwcode'];
$fwname  = trim(strtoupper($_POST['fwname']));
$fwtype  = $_POST['fwtyoe'];

if ($savetype === "Add")
{

	$query   = "select ifnull(max(fw_code),0)+1 as seccode from masprd_feltwire";
	$result  = mysql_query($query);
	$rec     = mysql_fetch_array($result);
	$fwcode = $rec['seccode'];

	$qry = "select count(*) as cnt from masprd_feltwire where fw_name = '$fwname'";
	$resag = mysql_query($qry);
	$recvar = mysql_fetch_array($resag);
	$cnt=$recvar['cnt'];

	if($cnt==0)
	{
	  $query1="insert into masprd_feltwire values('$fwcode','$fwname','$fwtype')";
	  $result1 = mysql_query($query1);
	}

	  if ($result1 && $cnt==0) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $fw_name . '"})';
	} 
	  else if ($cnt>0) {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
	}else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $fw_name . '"})';
	}
     }
     else
     {

	  $query1="update masprd_feltwire set fw_name ='$fwname' , fw_type ='$fwtype' where fw_code =$fwcode";
	  $result1 = mysql_query($query1);
	  if ($result1 ) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $fw_name . '"})';
	  } 
	
	  else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $fw_name . '"})';
	   }
     } 
   
?>
