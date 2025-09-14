<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$griddet   = json_decode($_POST['griddet'],true);
$rowcnt    = $_POST['cnt'];
$savetype  = $_POST['savetype'];
$entrydate = $_POST['entdate'];
$compcode  = $_POST['compcode'];
$fincode   = $_POST['fincode'];
$pmonth    = $_POST['pmonth'];
$pyear     = $_POST['pyear'];
$rollstatus  = $_POST['rollstatus'];
$rollno  = $_POST['rollno'];
$cnt = 0;




 mysql_query("BEGIN");

/*

	for ($i=0;$i<$rowcnt;$i++)
	{
        $seqno    = $griddet[$i]['prd_seqno'];
	$pdate    = $griddet[$i]['prd_date'];
	$shift    = $griddet[$i]['prd_shift'];
        $qlycode  = $griddet[$i]['var_groupcode'];
	$rollno   = $griddet[$i]['prd_rollno'];	
	$finwt    = $griddet[$i]['prd_finprod'];

	$query4= "update trn_dayprod_roll_details set  prd_roll_status = '$rollstatus' where prd_rollno = $rollno  and prd_date = '$pdate'  and prd_shift = '$shift' and prd_rollno = '$rollno'  and prd_variety = '$qlycode' and prd_seqno = '$seqno' ";

	$result4=mysql_query($query4);            
	}    

*/

	$query4= "update trn_dayprod_roll_details set  prd_roll_status = '$rollstatus' where prd_rollno = $rollno  and month(prd_date) = '$pmonth'  and year(prd_date) = '$pyear' and prd_compcode = '$compcode'  and prd_fincode = '$fincode' ";

	$result4=mysql_query($query4);            

       

	if ( result4)  {
	   mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $rollno . '"})';
     	} 
	
	else {
	    mysql_query("ROLLBACK");
	   echo '({"success":"false","msg":"' . $rollno . '"})';

	}

?>
