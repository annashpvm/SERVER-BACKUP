<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$apprno     = $_POST['apprno']; 
$finid      = $_POST['finid'];
$compcode   = $_POST['compcode'];  
$usercode   = (int) $_POST['usercode']; 
$product    = (int) $_POST['product']; 

mysqli_query($conn, "BEGIN");


$query1="update massal_rate set rate_approved = 'N' , rate_verified = $usercode  where rate_comp_code= $compcode and rate_fincode = $finid   and rate_code = $apprno and rate_vartype = $product"; 

//echo $query1;

$result1 = mysqli_query($conn, $query1);



  if ($result1) {
   mysqli_begin_transaction($conn);
    echo '({"success":"true","msg":"' . $apprno . '"})';
  }else {
    mysqli_rollback($conn);


    echo '({"success":"false","msg":"' . $apprno . '"})';
}
  
   
?>
