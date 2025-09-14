<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();



 $compcode = $_POST['compcode'];									
 $finid = $_POST['finid'];
 $ticketno=$_POST['ticketno'];
 $supplier  =$_POST['supplier'];

 $vehicleno = str_replace(" ","",$_POST['vehicleno']);
 $vehicleno = str_replace("  ","",$vehicleno );
 $vehicleno = str_replace("   ","",$vehicleno);
 $vehicleno = str_replace("-","",$vehicleno);

 $loadwt    = (float) $_POST['loadwt'];									
 $emptywt   = (float) $_POST['emptywt'];
 $netwt     = (float) $_POST['netwt'];
 $itemname  = strtoupper($_POST['itemname']);

 $vehicleno  = strtoupper($vehicleno);

 $first_sec_wt  = $_POST['first_sec_wt'];


 $first_sec_wt  = $_POST['first_sec_wt'];

 $loadwttype   = $_POST['loadwttype'];
 $emptywttype  = $_POST['emptywttype'];

 if ( $first_sec_wt == 'L')
 {
     $Iwt  = $loadwt;
     $IIwt = $emptywt;
 }
 else
 {
     $Iwt  = $emptywt;
     $IIwt = $loadwt;
 }

$Ist_loadType  = "";
$IInd_loadType = "";


if ($loadwttype == 1 )
    {      
     $Ist_loadType  = "L";
    }
 
if ($loadwttype == 2)
    {      
    $Ist_loadType  = "E";
    } 

if ($emptywttype == 1 && $emptywt >0)
    {      
     $Iwt    = $emptywt;
     $IIwt   = $loadwt;
    } 
if ($emptywttype == 2 && $emptywt >0)
    {      
     $Iwt    = $loadwt;
     $IIwt   = $emptywt;
    } 

if ($loadwttype == 1 && $loadwt >0)
    {      

     $Iwt  = $loadwt;
     $IIwt = $emptywt;
    }
 
if ($loadwttype == 2 && $loadwt >0)
    {      
     $IWt   = $emptywt;
     $IIwt  = $loadwt;
    } 


//$query2="update trn_weighbridge_entry set t_wb_vehicle =  '$vehicleno',  t_wb_party =  '$supplier' , t_wb_item = '$itemname', t_wb_1st_weight = '$Iwt', t_wb_2nd_weight = '$IIwt' , t_wb_net_weight = $netwt where t_wb_year = $finid  and t_wb_compcode = $compcode  and t_wb_ticketno = '$ticketno' and t_wb_upd ='N'";



$query2="update trn_weight_card set wc_vehicleno =  '$vehicleno' where wc_compcode = $compcode and wc_fincode = $finid and wc_ticketno = '$ticketno'";
// echo $query2;
$result2 = mysql_query($query2);



$query2="update trn_weighbridge_entry set t_wb_vehicle =  '$vehicleno',  t_wb_party =  '$supplier' , t_wb_item = '$itemname', t_wb_1st_weight = '$Iwt', t_wb_2nd_weight = '$IIwt' , t_wb_net_weight = $netwt where t_wb_year = $finid  and t_wb_compcode = $compcode  and t_wb_ticketno = '$ticketno'";


$query2="update trn_weighbridge_entry set t_wb_vehicle =  '$vehicleno',  t_wb_party =  '$supplier' , t_wb_item = '$itemname', t_wb_1st_weight = '$Iwt', t_wb_2nd_weight = '$IIwt' , t_wb_net_weight = $netwt  , t_wb_1st_loadtype = '$Ist_loadType' , t_wb_2nd_loadtype = '$IInd_loadType' where t_wb_year = $finid  and t_wb_compcode = $compcode  and t_wb_ticketno = '$ticketno'";



// echo $query2;
$result2 = mysql_query($query2);


if ($IWt  == 0 || $IIwt == 0)
{
$query3="update trn_weighbridge_entry set t_wb_upd = 'N' where t_wb_year = $finid  and t_wb_compcode = $compcode  and t_wb_ticketno = '$ticketno'";

// echo $query2;
$result3 = mysql_query($query3);
}

if ($result2) {
    mysql_query("COMMIT");
    echo '({"success":"true","wtno":"' . $ticketno . '"})';
} else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","wtno":"' . $ticketno . '"})';
}
  

?>
