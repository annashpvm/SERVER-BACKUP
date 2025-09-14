<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$savetype = $_POST['savetype'];
$qlycode  = $_POST['qlycode'];
$quality  = strtoupper($_POST['quality']);
$qcode    = strtoupper($_POST['qcode']);
$qhsn     = $_POST['qhsn'];
$tnledcode = (int) $_POST['tnledcode'];
$osledcode = (int) $_POST['osledcode'];
$sezledcode = (int) $_POST['sezledcode'];
if ($savetype === "Add")
{

	$query   = "select ifnull(max(vargrp_type_code),0)+1 as varcode from masprd_type";
	$result  = mysql_query($query);
	$rec     = mysql_fetch_array($result);
	$varseq  = $rec['varcode'];

	$qry = "select count(*) as cnt from masprd_type where vargrp_type_name = '$quality'";
	$resag = mysql_query($qry);
	$recvar = mysql_fetch_array($resag);
	$cnt=$recvar['cnt'];

	if($cnt==0)
	{
	  $query1="insert into masprd_type values('$varseq','$quality','$qcode','$qhsn', $tnledcode ,$osledcode ,$sezledcode )";
	  $result1 = mysql_query($query1);
	}

	  if ($result1 && $cnt==0) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $quality . '"})';
	} 
	  else if ($cnt>0) {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
	}else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $quality . '"})';
	}
     }
     else
     {

	  $query1="update masprd_type set vargrp_type_name ='$quality',vargrp_type_short_code = left('$qcode',4), vargrp_type_hsncode ='$qhsn' ,tn_sales_ledcode = $tnledcode , os_sales_ledcode = $osledcode where vargrp_type_code =$qlycode";
	  $result1 = mysql_query($query1);
	  if ($result1 ) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $quality . '"})';
	  } 
	
	  else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $quality . '"})';
	   }
     } 
   
?>
