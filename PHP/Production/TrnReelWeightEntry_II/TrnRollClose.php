<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$griddet   = json_decode($_POST['griddet'],true);
$rowcnt    = $_POST['cnt'];
$savetype  = $_POST['savetype'];
$entrydate = $_POST['entdate'];
$compcode  = $_POST['compcode'];
$fincode   = $_POST['fincode'];
$reelno    = $_POST['reelno'];
$weight    = $_POST['weight'];
$sizecode  = $_POST['sizecode'];
$qlycode   = $_POST['qlycode'];
$rollno    = $_POST['rollno'];
$seqno     = $_POST['seqno'];
$oldweight = $_POST['oldweight'];
$sono      = $_POST['sono'];
$custcode  = $_POST['custcode'];
$joints    = $_POST['joints'];
$open_rel  = $_POST['open_rel'];

$cnt = 0;




 mysql_query("BEGIN");



	for ($i=0;$i<$rowcnt;$i++)
	{
        $seqno    = $griddet[$i]['prd_seqno'];
	$pdate    = $griddet[$i]['prd_date'];
	$shift    = $griddet[$i]['prd_shift'];
        $qlycode  = $griddet[$i]['var_groupcode'];
	$rollno   = $griddet[$i]['prd_rollno'];	
	$finwt    = $griddet[$i]['prd_finprod'];

	$query4= "update trn_dayprod_roll_details set  prd_roll_status = '$open_rel' where prd_rollno = $rollno  and prd_date = '$pdate'  and prd_shift = '$shift' and prd_rollno = '$rollno'  and prd_variety = '$qlycode' and prd_seqno = '$seqno' ";

	$result4=mysql_query($query4);            
	}    


       

	if ( result4)  {
	   mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $rollno . '"})';
     	} 
	
	else {
	    mysql_query("ROLLBACK");
	   echo '({"success":"false","msg":"' . $rollno . '"})';

	}

?>
