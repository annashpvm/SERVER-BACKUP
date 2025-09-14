<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$compcode  = $_POST['compcode'];
$finid     = $_POST['finid'];
$itemcode  = $_POST['itemcode'];
$itemname  = $_POST['itemname'];
$yropqty   = $_POST['yropqty'];
$yropvalue = $_POST['yropvalue'];
$cloqty    = $_POST['cloqty'];
$clovalue  = $_POST['clovalue'];
$avgrate   = $_POST['avgrate'];

$itemname2=str_replace('"','',$itemname);

 mysql_query("BEGIN");



if ($clovalue > 0 &&  $cloqty > 0)
   $avgrate  = $clovalue / $cloqty;
else
   $avgrate  = 0;

$query1 = "update maspur_item_trailer set  item_avg_rate = $avgrate , item_stock = $cloqty , item_yr_opqty = $yropqty ,  item_yr_opval = $yropvalue where item_comp_code ='$compcode'  and item_fin_code = '$finid' and item_code = '$itemcode'";

$result1 = mysql_query($query1);

//echo $query1;

   if ( $result1 )
   {
            mysql_query("COMMIT");                        
            echo '({"success":"true","itemname":"'.$itemname2.'"})';
   }
   else
   {
            mysql_query("ROLLBACK");            
            echo '({"success":"false","itemname":"'.$itemname2.'"})';
   }   
     
     
 
?>
