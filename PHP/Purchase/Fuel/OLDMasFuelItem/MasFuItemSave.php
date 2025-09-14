<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$savetype = $_POST['savetype'];

$itemseq = $_POST['itemseq'];
$itemname=strtoupper($_POST['itemname']);

$moisARB=$_POST['moisARB'];
$moisADB=$_POST['moisADB'];
$ash    =$_POST['ash'];
$volatile=$_POST['volatile'];
$fixedcarbon=$_POST['fixedcarbon'];
$fines=$_POST['fines'];
$sand=$_POST['sand'];
$iron=$_POST['iron'];
$gcvADB=$_POST['gcvADB'];
$gcvARB=$_POST['gcvARB'];

$hsncode=$_POST['hsncode'];


$qcchk_TM     =$_POST['qcchk_TM'];
$qcchk_IM     =$_POST['qcchk_IM'];
$qcchk_Ash    =$_POST['qcchk_Ash'];
$qcchk_VM     =$_POST['qcchk_VM'];
$qcchk_FC     =$_POST['qcchk_FC'];
$qcchk_FI     =$_POST['qcchk_FI'];
$qcchk_SA     =$_POST['qcchk_SA'];
$qcchk_IR     =$_POST['qcchk_IR'];
$qcchk_GCV_ADB=$_POST['qcchk_GCV_ADB'];
$qcchk_GCV_ARB=$_POST['qcchk_GCV_ARB'];





if ($savetype === "Add")
{
	 //echo"$GroupName";
	$query = "select ifnull(max(itmh_code),0)+1 as itemseq from masfu_item_header";
	$result = mysql_query($query);
	$rec = mysql_fetch_array($result);
	$itemseq=$rec['itemseq'];

	$qry = "select count(*) as cnt from masfu_item_header where itmh_name = '$itemname'";
	$resitem = mysql_query($qry);
	$recitem = mysql_fetch_array($resitem);
	$cnt=$recitem['cnt'];

	if($cnt==0)

	{

	$query1="insert into masfu_item_header values($itemseq,'$itemname','$moisARB','$moisADB','$ash','$volatile',
	'$fixedcarbon','$fines','$sand','$iron','$gcvADB','$gcvARB','$hsncode','$qcchk_TM','$qcchk_IM','$qcchk_Ash','$qcchk_VM','$qcchk_FC','$qcchk_FI','$qcchk_SA','$qcchk_IR','$qcchk_GCV_ADB','$qcchk_GCV_ARB')";
	  $result1 = mysql_query($query1);
//	echo $query1;
	}

	  if ($result1 && $cnt==0) 
	{
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $itemname . '"})';
	} 
	else if ($cnt>0)
	{
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt":"' . $cnt . '"})';

	}
	else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $itemname . '"})';
	}
} 
else
{

    $query1 = "update masfu_item_header  set itmh_name = '$itemname' , itmh_moisture_ADB = '$moisADB' , itmh_moisture_ARB = '$moisARB' ,itmh_ash = '$ash' , itmh_volatile = '$volatile',   itmh_fixedcarbon = '$fixedcarbon', itmh_fines = '$fines', itmh_sand = '$sand' , itmh_iron = '$iron' ,itmh_gcv_ADB = '$gcvADB', itmh_gcv_ARB = '$gcvARB',itmh_hsncode = '$hsncode', itmh_moisture_ARB_qc = '$qcchk_TM', itmh_moisture_ADB_qc = '$qcchk_IM' ,  itmh_ash_qc = '$qcchk_Ash', itmh_volatile_qc = '$qcchk_VM', itmh_fixedcarbon_qc = '$qcchk_FC' , itmh_fines_qc = '$qcchk_FI', itmh_sand_qc = '$qcchk_SA', itmh_iron_qc = '$qcchk_IR', itmh_gcv_ADB_qc = '$qcchk_GCV_ADB' , itmh_gcv_ARB_qc = '$qcchk_GCV_ARB'  where  itmh_code = $itemseq ";
	  $result1 = mysql_query($query1);
//	echo $query1;

	  if ($result1) 
	{
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $itemname . '"})';
	} 
	else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $itemname . '"})';
	}

}
 
   
?>
