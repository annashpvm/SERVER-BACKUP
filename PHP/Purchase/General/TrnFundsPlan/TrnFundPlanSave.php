<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_POST['cnt'];

$savetype   = $_POST['savetype'];
$stdate    = $_POST['stdate'];
$eddate    = $_POST['eddate'];

mysql_query("BEGIN");

$query1   = "select count(*) as nos from  trn_funds_plan where fp_date between '$stdate' and '$eddate'";
$result1  = mysql_query($query1);
$rec1     = mysql_fetch_array($result1);
$datafind = $rec1['nos'];

//echo $datafind;
//echo "<br>";


for ($i=0;$i<$rowcnt;$i++)
{



$fp_date	= $griddet[$i]['fp_date'];
$fp_ilc  	= (float)$griddet[$i]['fp_ilc'];
$fp_dpda	= (float)$griddet[$i]['fp_dpda'];
$fp_gst		= (float)$griddet[$i]['fp_gst'];
$fp_salary	= (float)$griddet[$i]['fp_salary'];
$fp_eb          = (float)$griddet[$i]['fp_eb'];
$fp_wp          = (float)$griddet[$i]['fp_wp'];
$fp_biomass     = (float)$griddet[$i]['fp_biomass'];
$fp_duty        = (float)$griddet[$i]['fp_duty'];
$fp_chemicals   = (float)$griddet[$i]['fp_chemicals']; 
$fp_coal        = (float)$griddet[$i]['fp_coal']; 
$fp_emi         = (float)$griddet[$i]['fp_emi']; 
$fp_spares      = (float)$griddet[$i]['fp_spares'];
$fp_total       = (float)$griddet[$i]['fp_total'];


if ($datafind == 0)
{
$query1= "insert into trn_funds_plan 
(fp_date, fp_ilc, fp_dpda, fp_gst, fp_salary, fp_eb, fp_wp, fp_biomass, fp_duty, fp_chemicals, fp_coal, fp_emi, fp_spares, fp_total)values('$fp_date','$fp_ilc','$fp_dpda','$fp_gst','$fp_salary','$fp_eb','$fp_wp','$fp_biomass','$fp_duty','$fp_chemicals','$fp_coal','$fp_emi','$fp_spares','$fp_total')";
}
else
{
$query1= "update trn_funds_plan set fp_ilc = '$fp_ilc', fp_dpda = '$fp_dpda', fp_gst = '$fp_gst', fp_salary = '$fp_salary', fp_eb ='$fp_eb', fp_wp = '$fp_wp', fp_biomass='$fp_biomass', fp_duty = '$fp_duty' , fp_chemicals = '$fp_chemicals', fp_coal = '$fp_coal', fp_emi = '$fp_emi', fp_spares = '$fp_spares' , fp_total = '$fp_total' where fp_date = '$fp_date'";
}

$result1 = mysql_query($query1);

//echo $query1;
//echo "<br>";

}

$fp ='';

if($result1) 
{
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $fp. '"})';
} 
else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $fp. '"})';
}
  
   
?>
