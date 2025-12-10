<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
 
$compcode  = $_POST['compcode'];
$fincode   = $_POST['fincode'];
$reelno    = $_POST['reelno'];
$reelwt    = $_POST['weight'];
$qlycode   = $_POST['qlycode'];
$rollno    = $_POST['rollno'];
$seqno     = $_POST['seqno'];
$oldweight = $_POST['oldweight'];
$sono      = $_POST['sono'];
$custcode  = $_POST['custcode'];


 mysqli_query($conn, "BEGIN");

if ( $reelwt > 0)
{

	$query1   = "update trn_dayprod_rewinder set  r_reelwt = $reelwt , r_sono =  '$sono'  ,r_custcode  =  '$custcode'   where  r_seqno = '$seqno' and r_fincode = '$fincode' and r_rollno = '$rollno' and r_varietycode = $qlycode and r_reelno = '$reelno'";
	$result1 =mysqli_query($conn, $query1);   


	$query3   = "update trn_dayprod_roll_variety_details set  prdv_finwt = prdv_finwt + ($reelwt/1000) -  ($oldweight/1000)  where  prdv_seqno = '$seqno' and prdv_fincode = '$fincode' and prdv_rollno = '$rollno' and prdv_varty = $qlycode";

	$result3 =mysqli_query($conn, $query3);            

	$query2   = "update trn_dayprod_roll_details set prd_roll_status = 'P' , prd_finprod = prd_finprod + ($reelwt/1000) -  ($oldweight/1000)  where  prd_seqno = '$seqno' and prd_fincode = '$fincode' and prd_compcode = '$compcode' and prd_rollno = '$rollno'";
	$result2 =mysqli_query($conn, $query2);            
}  
       

	if ($result1)  {
	   mysqli_begin_transaction($conn);
	    echo '({"success":"true","msg":"' . $reelno . '"})';
		 
	} 
	
	else {
	    mysqli_rollback($conn);


	   echo '({"success":"false","msg":"' . $reelno . '"})';

	}

?>
