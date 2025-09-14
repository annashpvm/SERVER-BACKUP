<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$apprno      = $_POST['apprno']; 
$finid       = $_POST['finid'];
$compcode    = $_POST['compcode'];  
$usercode    = (int) $_POST['usercode']; 


mysql_query("BEGIN");


$query1="update massal_areawise_rate set arearate_approved = 'Y' , arearate_verified = $usercode  where arearate_comp_code= $compcode and arearate_fincode = $finid   and arearate_sno = $apprno"; 

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
