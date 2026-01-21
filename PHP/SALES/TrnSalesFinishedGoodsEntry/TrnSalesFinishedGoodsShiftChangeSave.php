<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

               
$finid = $_POST['finid'];
$compcode = $_POST['compcode'];                     
$rdate = $_POST['rdate'];
$rollno = $_POST['rollno'];
$newshift = $_POST['newshift'];



mysqli_query($conn, "BEGIN");

  $query1 = "update trnsal_finish_stock set stk_shift = '$newshift' where  stk_comp_code = $compcode and stk_finyear = $finid  and stk_ent_date = '$rdate' and  stk_rollno = $rollno";
   $result1= mysqli_query($conn, $query1);

//echo $query1;

if ($result1 ) {
    mysqli_begin_transaction($conn);
    echo '({"success":"true","msg":"' . $rollno . '"})';
} 
	
else {
    mysqli_rollback($conn);


    echo '({"success":"false","msg":"' . $rollno . '"})';
}
  
   
?>
