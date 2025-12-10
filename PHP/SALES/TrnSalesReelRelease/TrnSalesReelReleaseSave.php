<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();





$sono = $_POST['sono'];
$reelno = $_POST['reelno'];
$wt = $_POST['wt'];



mysqli_query($conn, "BEGIN");


 $query1 = "update trnsal_finish_stock set stk_wt = '$wt' , stk_destag = '' where stk_comp_code = 1 and stk_destag = 'C' and stk_sono = '$sono' and stk_sr_no = '$reelno'";
   $result1=mysqli_query($conn, $query1);            




if ($result1) {
    mysqli_begin_transaction($conn);
    echo '({"success":"true","msg":"' . $reelno . '"})';
} 
	
else {
    mysqli_rollback($conn);


    echo '({"success":"false","msg":"' . $reelno . '"})';
}
  
   
?>
