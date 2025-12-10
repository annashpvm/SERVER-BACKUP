<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$griddet   = json_decode($_POST['griddet'],true);
$rowcnt    = $_POST['cnt'];
$savetype  = $_POST['savetype'];
$entrydate = $_POST['entdate'];
$compcode  = $_POST['compcode'];
$fincode   = $_POST['fincode'];

$rollnofrom  = $_POST['rollnofrom'];
$rollnoto  = $_POST['rollnoto'];
$yymm  = $_POST['yymm'];

$cnt = 0;




 mysqli_query($conn, "BEGIN");


	$query4= "update trnsal_finish_stock set stk_ent_date = '$entrydate'   where stk_comp_code = '$compcode' and stk_finyear = '$fincode' and CHAR_LENGTH(stk_sr_no) = 10 and stk_rollno  >= $rollnofrom  and stk_rollno  <= $rollnoto and stk_yymm = '$yymm' ";

	$result4=mysqli_query($conn, $query4);            

       

	if (result4)  {
	   mysqli_begin_transaction($conn);
	    echo '({"success":"true","msg":"' . $rollnofrom . '"})';
     	} 
	
	else {
	    mysqli_rollback($conn);


	   echo '({"success":"false","msg":"' . $rollnofrom . '"})';

	}

?>
