<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$apprno      = $_POST['apprno']; 
$finid       = $_POST['finid'];
$compcode    = $_POST['compcode'];  
$usercode    = (int) $_POST['usercode']; 


mysqli_query($conn, "BEGIN");


$query1="update massal_areawise_rate set arearate_approved = 'Y' , arearate_verified = $usercode  where arearate_comp_code= $compcode and arearate_fincode = $finid   and arearate_sno = $apprno"; 

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
