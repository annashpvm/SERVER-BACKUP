<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$griddet   = json_decode($_POST['griddet'],true);
$rowcnt    = $_POST['cnt'];
$savetype  = $_POST['savetype'];
$entrydate = $_POST['entdate'];
$compcode  = $_POST['compcode'];
$fincode   = $_POST['fincode'];

$reelNo  = $_POST['reelNo'];

$yymm  = $_POST['yymm'];

$cnt = 0;




 mysql_query("BEGIN");


	$query4= "update trnsal_finish_stock set stk_ent_date = '$entrydate'   where stk_comp_code = '$compcode' and stk_finyear = '$fincode' and stk_sr_no  = '$reelNo'  and stk_yymm = '$yymm' ";

//echo $query4;

	$result4=mysql_query($query4);            

       

	if (result4)  {
	   mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $rollnofrom . '"})';
     	} 
	
	else {
	    mysql_query("ROLLBACK");
	   echo '({"success":"false","msg":"' . $rollnofrom . '"})';

	}

?>
