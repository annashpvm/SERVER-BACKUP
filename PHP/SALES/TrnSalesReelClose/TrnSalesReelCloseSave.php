<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();





$sono = $_POST['sono'];
$reelno = $_POST['reelno'];




mysql_query("BEGIN");


 $query1 = "update trnsal_finish_stock set stk_destag = 'C' where stk_comp_code =  1  and stk_destag = '' and stk_sono = '$sono' and stk_sr_no = '$reelno'";
   $result1=mysql_query($query1);            




if ($result1) {
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $reelno . '"})';
} 
	
else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $reelno . '"})';
}
  
   
?>
