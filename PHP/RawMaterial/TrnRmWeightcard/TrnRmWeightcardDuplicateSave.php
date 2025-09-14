<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

 $compcode = $_POST['compcode'];									
 $finid = $_POST['finid'];
 $ticketno=$_POST['ticketno'];
 $ticketno2=$_POST['ticketno2'];
 $ticketdate=$_POST['ticketdate'];
 $wctime    =$_POST['wctime'];
 $area=$_POST['area'];
 $supplier=$_POST['supplier'];
 $itemcode     =  (int)$_POST['itemcode'];
 $itemname  =  $_POST['itemname'];
 $vehicleno = str_replace(" ","",$_POST['vehicleno']);
 $vehicleno = str_replace("  ","",$vehicleno );
 $vehicleno = str_replace("   ","",$vehicleno);
 $vehicleno = str_replace("-","",$vehicleno);

 $loadwt       = $_POST['loadwt'];									
 $emptywt      = $_POST['emptywt'];
 $netwt        = $_POST['netwt'];
 $Acceptedwt   = $_POST['Acceptedwt'];
 $partyloadwt  = $_POST['partyloadwt'];									
 $partyemptywt = $_POST['partyemptywt'];
 $partynetwt   = $_POST['partynetwt'];
 $Acceptedwt   = $_POST['Acceptedwt'];
 $wttype       = $_POST['wttype'];

 $loadwt2       = $_POST['loadwt2'];									
 $emptywt2      = $_POST['emptywt2'];
 $netwt2        = $_POST['netwt2'];
 $Acceptedwt2   = $_POST['Acceptedwt2'];
 $partyloadwt2  = $_POST['partyloadwt2'];									
 $partyemptywt2 = $_POST['partyemptywt2'];
 $partynetwt2   = $_POST['partynetwt2'];
 $Acceptedwt2   = $_POST['Acceptedwt2'];
 $wttype2       = $_POST['wttype2'];

//$query2="call sp_upd_weightcard ('$compcode','$finid','$ticketno','$supplier','$area',UPPER('$vehicleno'), $partyloadwt, $partyemptywt, $partynetwt, $Acceptedwt, '$wttype', $itemcode)";

$query2 = " insert into trn_weight_card (
wc_compcode, wc_fincode, wc_ticketno, wc_date, wc_time, wc_area_code, wc_sup_code, wc_item, wc_vehicleno, wc_emptywt, wc_loadwt, wc_netwt, wc_supplier, wc_partyloadwt, wc_partyemptywt, wc_partynetwt, wc_acceptedwt,wt_type, wc_itemcode) values (
 '$compcode','$finid','$ticketno','$ticketdate','$wctime','$area','$supplier','$itemname',UPPER('$vehicleno'),'$emptywt',
'$loadwt','$netwt','',$partyloadwt, $partyemptywt, $partynetwt, $Acceptedwt,'$wttype', $itemcode)";

//echo $query2;

$result2 = mysql_query($query2);

//$query2 = "update trn_weight_card set wc_partyloadwt =  $loadwt2  , wc_partyemptywt =  $emptywt2 , wc_partynetwt =  $netwt2, wc_acceptedwt =  $Acceptedwt2, wt_type = '$wttype2' where wc_compcode = '$compcode' and wc_fincode = '$finid' and  wc_ticketno=$ticketno2"; 


//$result3 = mysql_query($query3);

if ($result2 ) {
    mysql_query("COMMIT");
    echo '({"success":"true","wtno":"' . $ticketno . '"})';
} else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","wtno":"' . $ticketno . '"})';
}
  

?>
