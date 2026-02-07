<?php

 require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();

$compcode   = $_POST['compcode'];
$finid      = $_POST['fincode'];
$reelno     = $_POST['reelno'];
$location   = substr(trim($_POST['location']),0,9);


mysqli_begin_transaction($conn);


$query1  = "update trnsal_finish_stock set stk_location = '$location'  where  stk_comp_code =  '$compcode' and  stk_sr_no ='$reelno' and stk_destag = ''"; 
$result1 = mysqli_query($conn, $query1);  
 


	if($result1)
	{
		mysqli_commit($conn);                      
	  echo '({"success":"true","entno":"'.$reelno.'"})';
	}
	else
        {
		echo '({"success":"false","entno":"'.$reelno.'"})';
		mysqli_rollback($conn);

            
		    
	} 

       
 
?>
