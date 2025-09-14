<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$savetype = $_POST['savetype'];
$shadecode  = $_POST['shadecode'];
$shadefullname  = strtoupper($_POST['shadefullname']);
$shadeshortname  = strtoupper($_POST['shadeshortname']);
$scode      = strtoupper($_POST['scode']);



if ($savetype === "Add")
{

	$query   = "select ifnull(max(shade_code),0)+1 as shade_code from massal_shade";
	$result  = mysql_query($query);
	$rec     = mysql_fetch_array($result);
	$codeseq  = $rec['shade_code'];

	$qry = "select count(*) as cnt from massal_shade where shade_fullname = '$shadefullname'";
	$resag = mysql_query($qry);
	$recvar = mysql_fetch_array($resag);
	$cnt=$recvar['cnt'];

	if($cnt==0)
	{
	  $query1="insert into massal_shade values('$codeseq','$shadefullname','$shadeshortname','$scode')";
	  $result1 = mysql_query($query1);
	}

	  if ($result1 && $cnt==0) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $shadefullname . '"})';
	} 
	  else if ($cnt>0) {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
	}else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $shadefullname . '"})';
	}
     }
     else
     {

	  $query1="update massal_shade set shade_fullname ='$shadefullname',shade_shortname ='$shadeshortname',shade_shortcode = left('$scode',2)  where shade_code =$shadecode";
	  $result1 = mysql_query($query1);
	  if ($result1 ) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $shadefullname . '"})';
	  } 
	
	  else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $shadefullname . '"})';
	   }
     } 
   
?>
