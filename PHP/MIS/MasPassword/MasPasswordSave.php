<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_POST['cnt'];

$savetype   = $_POST['savetype'];
$usr_code   = $_POST['usercode'];
$department = $_POST['department'];
$subject    = strtoupper($_POST['subject']);
$pw         = $_POST['pw'];


if ($savetype === "Add")
{
	$qry = "select  count(*) as cnt from mas_password where pw_dept = '$department' and pw_subject = '$subject'";
	$resag = mysql_query($qry);
	$recvar = mysql_fetch_array($resag);
	$cnt=$recvar['cnt'];



	if($cnt==0 )
	{

	  $query1="insert into mas_password values('$department','$subject', '$pw')";
	  $result1 = mysql_query($query1);

//        echo $query1;


	}


	  if ($result1 && $cnt==0) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $subject . '"})';
	} 
	  else if ($cnt>0) {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
	}

       else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $subject . '"})';
	}
 }
# Save After Edit
     else
     {



         $query1 = "update  mas_password set pw_password ='$pw' where pw_dept = '$department' and pw_subject = '$subject'";
         $result1 = mysql_query($query1); 
//echo $query1;


	  if ($result1) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $subject . '"})';
	  } 
	
	  else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $subject . '"})';
	   }
     } 
   
?>
