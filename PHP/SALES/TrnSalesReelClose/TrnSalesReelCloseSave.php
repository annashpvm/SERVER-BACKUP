<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();





$sono = $_POST['sono'];
$reelno = $_POST['reelno'];




mysqli_begin_transaction($conn);

/// $query1 = "update trnsal_finish_stock set stk_destag = 'C' where stk_comp_code =  1  and stk_destag = '' and stk_sono = '$sono' and stk_sr_no = '$reelno'";
 $query1 = "update trnsal_finish_stock set stk_destag = 'C' where stk_comp_code =  1  and stk_destag = ''  and stk_sr_no = '$reelno'";
$result1=mysqli_query($conn, $query1);            

//echo $query1;


if ($result1) {
    mysqli_commit($conn);

    echo '({"success":"true","msg":"' . $reelno . '"})';
} 
	
else {
    mysqli_rollback($conn);


    echo '({"success":"false","msg":"' . $reelno . '"})';
}
  
   
?>
