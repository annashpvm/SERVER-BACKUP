<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$apprno     = $_POST['apprno']; 
$finid      = $_POST['finid'];
$compcode   = $_POST['compcode'];  
$usercode   = (int) $_POST['usercode']; 
$product    = (int) $_POST['product']; 

mysql_query("BEGIN");


$query1="update massal_rate set rate_approved = 'Y' , rate_verified = $usercode  where rate_comp_code= $compcode and rate_fincode = $finid   and rate_code = $apprno and rate_vartype = $product"; 

//echo $query1;

$result1 = mysql_query($query1);



  if ($result1) {
   mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $apprno . '"})';
  }else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $apprno . '"})';
}
  
   
?>
