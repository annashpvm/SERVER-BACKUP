<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$compcode  = $_POST['compcode'];
$finid     = $_POST['finid'];
$itemcode  = $_POST['itemcode'];
$itemname  = $_POST['itemname'];
$yropqty   = (float) $_POST['yropqty'];
$yropvalue = (float) $_POST['yropvalue'];
$cloqty    = (float) $_POST['cloqty'];
$clovalue  = (float) $_POST['clovalue'];
$avgrate   = (float) $_POST['avgrate'];

$itemname2=str_replace('"','',$itemname);

 mysqli_query($conn, "BEGIN");



if ($clovalue > 0 &&  $cloqty > 0)
   $avgrate  = $clovalue / $cloqty;
else
   $avgrate  = 0;

$query1 = "update maspur_item_trailer set  item_stockvalue = $clovalue , item_stock = $cloqty , item_yr_opqty = $yropqty ,  item_yr_opval = $yropvalue where item_comp_code ='$compcode'  and item_fin_code = '$finid' and item_code = '$itemcode'";
$result1 = mysqli_query($conn, $query1);


$query12= "update   maspur_item_trailer  set  item_avg_rate =  CASE  WHEN item_stock > 0 and item_stockvalue > 0 THEN ROUND(item_stockvalue / item_stock, 5)  ELSE 0  END  where  item_code = $itemcode and  item_comp_code = $compcode and item_fin_code = $finid";	
$result12=mysqli_query($conn, $query12);      

//echo $query1;

   if ( $result1 && $result12 )
   {
           mysqli_query($conn, "COMMIT");                       
            echo '({"success":"true","itemname":"'.$itemname2.'"})';
   }
   else
   {
            mysqli_rollback($conn);

            
            echo '({"success":"false","itemname":"'.$itemname2.'"})';
   }   
     
     
 
?>
