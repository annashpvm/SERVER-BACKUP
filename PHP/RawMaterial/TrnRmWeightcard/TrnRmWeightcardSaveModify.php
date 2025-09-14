<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();



 $compcode = $_POST['compcode'];									
 $finid = $_POST['finid'];
 $ticketno=$_POST['ticketno'];
 $supplier=$_POST['supplier'];
 $area=$_POST['area'];

 $partyloadwt  = $_POST['partyloadwt'];									
 $partyemptywt = $_POST['partyemptywt'];
 $partynetwt   = $_POST['partynetwt'];
 $Acceptedwt   = $_POST['Acceptedwt'];
 $wttype       = $_POST['wttype'];
 $itemcode     =  (int)$_POST['itemcode'];


$query2="update trn_weight_card set wc_sup_code =  $supplier ,  wc_partyloadwt = $partyloadwt  , wc_partyemptywt =  $partyemptywt, wc_partynetwt = $partynetwt, wc_acceptedwt =  $Acceptedwt , wt_type =  '$wttype' where wc_compcode = $compcode and wc_fincode =  $finid and  wc_ticketno=  $ticketno";

//echo $query2;

$result2 = mysql_query($query2);



if ($result2) {
    mysql_query("COMMIT");
    echo '({"success":"true","wtno":"' . $ticketno . '"})';
} else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","wtno":"' . $ticketno . '"})';
}
  

?>
