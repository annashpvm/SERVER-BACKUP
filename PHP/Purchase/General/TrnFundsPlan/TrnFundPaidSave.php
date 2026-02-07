<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$repdate   = $_POST['repdate'];
$ilc       = (float)$_POST['ilc'];
$dpda      = (float)$_POST['dpda'];
$gst       = (float)$_POST['gst'];
$salary    = (float)$_POST['salary'];
$eb        = (float)$_POST['eb'];
$wp        = (float)$_POST['wp'];
$biomass   = (float)$_POST['biomass'];
$duty      = (float)$_POST['duty'];
$chemical  = (float)$_POST['chemical'];
$coal      = (float)$_POST['coal'];
$emi       = (float)$_POST['emi'];
$spares    = (float)$_POST['spares'];
$total1    = (float)$_POST['total1'];




mysqli_begin_transaction($conn);  


$query1= "update trn_funds_plan set fp_ilc_paid = '$ilc', fp_dpda_paid = '$dpda', fp_gst_paid = '$gst', fp_salary_paid = '$salary', fp_eb_paid ='$eb', fp_wp_paid = '$wp', fp_biomass_paid='$biomass', fp_duty_paid = '$duty' , fp_chemicals_paid = '$chemical', fp_coal_paid = '$coal', fp_emi_paid = '$emi', fp_spares_paid = '$spares' , fp_total_paid = '$total1' where fp_date = '$repdate'";


$result1 = mysqli_query($conn, $query1);

//echo $query1;
//echo "<br>";



$fp ='';

if($result1) 
{
    mysqli_commit($conn);
    echo '({"success":"true","msg":"' . $fp. '"})';
} 
else {
    mysqli_rollback($conn);


    echo '({"success":"false","msg":"' . $fp. '"})';
}
  
   
?>
