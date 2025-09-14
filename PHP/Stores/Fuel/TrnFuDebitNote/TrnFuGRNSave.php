<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_REQUEST['cnt'];

$compcode = $_REQUEST['compcode'];
$finid = $_REQUEST['finid'];
$gstFlaggrn = $_REQUEST['gstFlaggrn'];
$rech_no = $_REQUEST['edgrnno'];

$rech_seqno= $_REQUEST['seqno'];

$edpono = $_REQUEST['edpono'];
$supcode = $_REQUEST['supcode'];
$ordseqno = $_REQUEST['ordseqno'];
$agentcode = $_REQUEST['agentcode'];
$grndate = $_REQUEST['grndate'];

$areacode = $_REQUEST['areacode'];
$frtype = $_REQUEST['freighttype'];

$itemvalue = $_REQUEST['itemvalue'];

$sgstper = (float)$_REQUEST['sgstper'];
$sgstamt = (float)$_REQUEST['sgstamt'];
$cgstper = (float)$_REQUEST['cgstper'];
$cgstamt = (float)$_REQUEST['cgstamt'];
$igstper = (float)$_REQUEST['igstper'];
$igstamt =(float) $_REQUEST['igstamt'];
$handlingmt= (float)$_REQUEST['handlingmt'];
$handlingcgst= (float)$_REQUEST['handlingcgst'];
$handlingsgst= (float)$_REQUEST['handlingsgst'];

$handlingcgstamt= (float)$_REQUEST['handlingcgstamt'];
$handlingsgstamt= (float)$_REQUEST['handlingsgstamt'];


$cessmt= (float)$_REQUEST['cessmt'];
$cessamt= (float)$_REQUEST['cessamt'];

$tcsper = (float)$_REQUEST['tcsper'];
$tcsamt= (float)$_REQUEST['tcsamt'];

$othrchrg= (float)$_REQUEST['othrchrg'];
$freight= (float)$_REQUEST['freight'];
$roundoff= (float)$_REQUEST['roundoff'];
$totamt= $_REQUEST['totamt'];
$billno= $_REQUEST['billno'];
$billdate= $_REQUEST['billdate'];
$billval= $_REQUEST['billval'];

$partybillval= (float)$_REQUEST['billval'];
$vouno= $_REQUEST['vouno'];
$acctflag= $_REQUEST['acctflag'];
$accdate= $_REQUEST['accdate'];
$status= $_REQUEST['status'];
$usrcode= (int) $_REQUEST['usrcode'];
$entrydate= $_REQUEST['entrydate'];


$receiptdt = $_POST['receiptdt'];
$supledcode = $_POST['supledcode'];
$billnoh = $_POST['billnoh'];
$billdt = $_POST['billdt'];
$billvalue =  (float)$_POST['billvalue'];

$chklotno = $_POST['chklotno'];
$itemval2 = $_POST['itemval2'];
$billqty = (float) $_POST['billqty'];
$lorrynot = $_POST['lorrynot'];
$grnqtyt = $_POST['grnqtyt'];
$frtval = $_POST['frtval'];
$chkdel = $_POST['chkdel'];


$geno = (int)$_POST['geno'];
$gedate =$_POST['gedate'];
$lorryno = $_POST['lorryno'];
$wtslipno = (int)$_POST['wtslipno'];

$crdays = (int)$_POST['crdays'];

$roundneed = $_POST['roundneed'];
$itemcode = $_POST['itemcode'];
$millqty= (float)$_REQUEST['millqty'];
$moisper= (float)$_REQUEST['moisper'];
$moisqty = (float)$_REQUEST['moisqty'];
$sandper= (float)$_REQUEST['sandper'];
$sandqty= (float)$_REQUEST['sandqty'];
$finesper= (float)$_REQUEST['finesper'];
$finesqty= (float)$_REQUEST['finesqty'];
$totdedqty= (float)$_REQUEST['totdedqty'];
$grnqty= (float)$_REQUEST['grnqty'];
$itemrate= (float)$_REQUEST['rate'];


$gcv = (int)$_POST['gcv'];
$lotcode = (int)$_POST['lotcode'];
$qcentno = (int)$_POST['qcentno'];
$purcode = (int)$_POST['purcode'];
$costrate = 0;
$costval = 0;

$othdedqty = 0;
$rech_seqnonew;



 mysql_query("BEGIN");


 $query1  = "call spfu_upd_receipt_header_second('$rech_seqno','$grndate','$crdays','$itemvalue','$cgstper','$cgstamt','$sgstper','$sgstamt','$igstper','$igstamt', '$handlingmt','$handlingcgst','$handlingsgst','$handlingcgstamt','$handlingsgstamt','$tcsper','$tcsamt','$cessmt','$cessamt','$freight','$othrchrg','$roundoff', '$totamt','$billno','$billdate','$partybillval','$roundneed')";
echo $query1;
echo "<br>";
$result1=mysql_query($query1);


for ($i=0;$i<$rowcnt;$i++)
{

	$sno = $i + 1;
	$itemcode    = $griddet[$i]['itemcode'];
	$itemname    = $griddet[$i]['itemname'];
	$billqty     = (float) $griddet[$i]['billqty'];
	$millqty     = (float)$griddet[$i]['millqty'];
	$fixedMois   = (float)$griddet[$i]['fixedMois'];
	$actualMois  = (float)$griddet[$i]['actualMois'];
	$ExMoisper   = (float)$griddet[$i]['ExMoisper'];
	$moisqty     = (float)$griddet[$i]['moisqty'];
	$fixedfines  = (float)$griddet[$i]['fixedfines'];
	$actualfines = (float)$griddet[$i]['actualfines'];
	$Exfines     = (float)$griddet[$i]['Exfines'];
	$finesqty    = (float)$griddet[$i]['finesqty'];
	$fixedsand   = (float)$griddet[$i]['fixedsand'];
	$actualsand  = (float)$griddet[$i]['actualsand'];
	$Exsand      = (float)$griddet[$i]['Exsand'];
	$sandqty     = (float)$griddet[$i]['sandqty'];
	$totothdedqty = (float)$griddet[$i]['totothdedqty'];
	$totdedqty    = (float)$griddet[$i]['totdedqty'];
	$grnqty       = (float)$griddet[$i]['grnqty'];
	$itemrate     = (float)$griddet[$i]['itemrate'];
	$itemvalue    = (float)$griddet[$i]['itemvalue'];
	$remarks      = $griddet[$i]['remarks'];
	$costval      = (float)$griddet[$i]['costval'];
	$costrate     = (float)$griddet[$i]['costrate'];

	//$tonfreight=$gridfre[$i]['tonfreight'];


	$query2= "update trnfu_receipt_trailer set   rect_billqty = $billqty , rect_millqty = $millqty, rect_mois_fixed = $fixedMois , rect_mois_actual =$actualMois, rect_moisper=$ExMoisper, rect_moisqty = $moisqty, rect_sand_fixed = $fixedsand , rect_sand_actual = $actualsand , rect_sandper = $Exsand, rect_sandqty = $sandqty , rect_fines_fixed = $fixedfines, rect_fines_actual = $actualfines, rect_finesper =$Exfines , rect_finesqty = $finesqty, rect_othdedqty = $totothdedqty, rect_totdedqty = $totdedqty, rect_itemrate =$itemrate, rect_grnqty = $grnqty , rect_itemvalue = $itemvalue, rect_costrate = $costrate , rect_costvalue = $costval, rect_remarks = '$remarks'where rect_hdseqno = '$rech_seqno' and rect_seqno = $sno";
        $result2=mysql_query($query2);
	     
echo $query2;
echo "<br>";
	 $query3= "call spfu_insupd_stockdetails ('$compcode','$lotcode','$itemcode','$grnqty')";
	$result3=mysql_query($query3);
echo $query3;
echo "<br>";
	 $query4= "call spfu_upd_itemtrailer_avgrate ('$compcode','$finid','$itemcode','$grnqty','$costrate',1)";
	$result4=mysql_query($query4);
echo $query4;

}    

if( $result1 && $result2  && $result3 && $result4)
{
	mysql_query("COMMIT");                        
	echo '({"success":"true","GRNNo":"'. $rech_no . '"})';
    
}
else
{
    mysql_query("ROLLBACK");            
    echo '({"success":"false","GRNNo":"' . $rech_no . '"})';
} 

    
 
?>
