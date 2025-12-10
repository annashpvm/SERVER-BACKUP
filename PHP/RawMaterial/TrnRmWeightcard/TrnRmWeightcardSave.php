<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();



 $compcode = $_POST['compcode'];									
 $finid = $_POST['finid'];
 $ticketno=$_POST['ticketno'];
 $supplier=$_POST['supplier'];
 $area=$_POST['area'];
 $vehicleno = str_replace(" ","",$_POST['vehicleno']);
 $vehicleno = str_replace("  ","",$vehicleno );
 $vehicleno = str_replace("   ","",$vehicleno);
 $vehicleno = str_replace("-","",$vehicleno);

 $partyloadwt  = $_POST['partyloadwt'];									
 $partyemptywt = $_POST['partyemptywt'];
 $partynetwt   = $_POST['partynetwt'];
 $Acceptedwt   = $_POST['Acceptedwt'];
 $wttype       = $_POST['wttype'];
 $itemcode     = (int)$_POST['itemcode'];
 $itemname     = strtoupper($_POST['itemname']);





$query2="call sp_upd_weightcard ('$compcode','$finid','$ticketno','$supplier','$area',UPPER('$vehicleno'), $partyloadwt, $partyemptywt, $partynetwt, $Acceptedwt, '$wttype', $itemcode,'$itemname')";

// echo $query2;

$result2 = mysqli_query($conn, $query2);



if ($result2) {
    mysqli_begin_transaction($conn);
    echo '({"success":"true","wtno":"' . $ticketno . '"})';
} else {
    mysqli_rollback($conn);


    echo '({"success":"false","wtno":"' . $ticketno . '"})';
}
  

?>
