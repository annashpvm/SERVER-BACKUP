<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_POST['cnt'];
$savetype = $_POST['savetype'];     
$ordhcompcode = $_POST['ordhcompcode'];
$ordhfincode= $_POST['ordhfincode'];
$ordhackno= $_POST['ordhackno'];
$ordhackdate= $_POST['ordhackdate'];
$ordhref= $_POST['ordhref'];
$ordhrefdt= $_POST['ordhrefdt'];
$ordhparty= $_POST['ordhparty'];
$ordhrep= $_POST['ordhrep'];
$ordhtax=$_POST['ordhtax'];
$ordhcustrem= $_POST['ordhcustrem'];
$ordhinsyn= $_POST['ordhinsyn'];
$ordhinsper= $_POST['ordhinsper'];
$ordhdeliveryadd1= $_POST['ordhdeliveryadd1'];
$ordhdeliveryadd2=$_POST['ordhdeliveryadd2'];
$ordhdeliveryadd3= $_POST['ordhdeliveryadd3'];
$ordhdeliverycity=$_POST['ordhdeliverycity'];
$ordhdeliverypin= $_POST['ordhdeliverypin'];
$ordhdeliverygst= $_POST['ordhdeliverygst'];
$ordhcgst= $_POST['ordhcgst'];
$ordhsgst= $_POST['ordhsgst'];
$ordhigst= $_POST['ordhigst'];
$ordhfrt= $_POST['ordhfrt'];
$ordhcrdays= (int) $_POST['ordhcrdays'];
$ordhgracedays=  (int) $_POST['ordhgracedays'];
$ordhapprno= $_POST['ordhapprno'];
$ordhcanstat= $_POST['ordhcanstat'];
$ordhcanreason= $_POST['ordhcanreason'];
$ordhtype = $_POST['ordhtype'];
$ordhcomm = $_POST['ordhcomm'];
$usercode = $_POST['usercode'];

$cust_area_priceType = $_POST['cust_area_priceType'];


$cd30_7days = (float) $_POST['cd30_7days'];


$cd45_7days  = (float) $_POST['cd45_7days'];
$cd45_30days = (float) $_POST['cd45_30days'];


$cd60_7days  = (float) $_POST['cd60_7days'];
$cd60_30days = (float) $_POST['cd60_30days'];
$cd60_45days = (float) $_POST['cd60_45days'];


$ratediff = (float) $_POST['ratediff'];

$custarea = $_POST['custarea'];
$custdest = $_POST['custdest'];


$ordhapprfincode = $_POST['ordhapprfincode'];




if ($custarea != 24)
    $custdest = '';        

$cd90_7days  = (float) $_POST['cd90_7days'];
$cd90_30days = (float) $_POST['cd90_30days'];
$cd90_45days = (float) $_POST['cd90_45days'];
$cd90_60days = (float) $_POST['cd90_60days'];
$cd90_75days = (float) $_POST['cd90_75days'];


mysqli_begin_transaction($conn);

$query1 = "update trnsal_order_header set ordh_payterm_30days_7days_receipt = '$cd30_7days', ordh_payterm_45days_7days_receipt = '$cd45_7days' ,
    ordh_payterm_45days_30days_receipt = '$cd45_30days' , ordh_payterm_60days_7days_receipt = '$cd60_7days' , ordh_payterm_60days_30days_receipt = '$cd60_30days',
	 ordh_payterm_60days_45days_receipt = '$cd60_45days', ordh_payterm_90days_7days_receipt = '$cd90_7days', ordh_payterm_90days_30days_receipt =  '$cd90_30days',
	  ordh_payterm_90days_45days_receipt = '$cd90_45days' , ordh_payterm_90days_60days_receipt = '$cd90_60days' , ordh_payterm_90days_75days_receipt = '$cd90_75days',
	    ordh_ratediff = '$ratediff' where ordh_sono = $ordhackno  and ordh_fincode = $ordhfincode and ordh_comp_code = $ordhcompcode";


		//echo $query1;
   $result1=mysqli_query($conn, $query1); 


   $query2 = "update massal_rate set rate_rate_difference = '$ratediff'  where rate_comp_code = $ordhcompcode and rate_fincode =  $ordhapprfincode  and rate_code = $ordhapprno";
  	//	echo $query2;
  
   $result2=mysqli_query($conn, $query2); 



   


	if ( $result1 && $result2 )  {
		mysqli_commit($conn); 
	    echo '({"success":"true","msg":"' . $ordhackno . '"})';
		 
	} 
	
	else {
	    mysqli_rollback($conn);


	   echo '({"success":"false","msg":"' . $ordhackno . '"})';

	}
   
?>
