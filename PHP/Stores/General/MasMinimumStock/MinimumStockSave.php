<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();


$griddet  = json_decode($_REQUEST['griddet'],true);
$rowcnt   = $_POST['cnt'];
$finid    = $_POST['finid'];
$dept     = $_POST['dept'];
$itemgrp  = $_POST['itemgrp'];



 mysql_query("BEGIN");



 $query1 = "delete from maspur_item_minimum_stock where minstk_dept = $dept  and minstk_grpcode = $itemgrp";
 $result1 = mysql_query($query1);

$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++){

	$sno = $i + 1;
	$itemcode  = $griddet[$i]['item_code'];
	$minstock  = (float)$griddet[$i]['minstk_qty'];
        if ($minstock >0 )
        {     
           $query2 = "insert into maspur_item_minimum_stock values ($dept ,$itemgrp,$itemcode,$minstock)";
           $result2 = mysql_query($query2);
           $inscnt = $inscnt + 1;
        }       
  ///     echo $query1;

}  


   if ( $result1 && $result2 && $inscnt > 0)
   {
            mysql_query("COMMIT");                        
            echo '({"success":"true"})';
   }
   else
   {
            mysql_query("ROLLBACK");            
            echo '({"success":"false"})';
   }   

       
 
?>
