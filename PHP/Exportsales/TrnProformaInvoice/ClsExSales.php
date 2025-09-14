<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConndpm.php");

    $task='loadApprovalNo';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysql_query("SET NAMES utf8");

    switch($task){
		case "loadApprovalNo":
		getApprovalNo();
		break;
		case "loadExportCustomerDetails":
		getExportCustomerList();
		break;
		case "loadExportDealerDetails":
		getExportDealerList();
		break;
		case "loadIncoTermsDetails":
		getIncoTermsList();
		break;
		case "loadPayTermsDetails":
		getPayTermsList();
		break;
		case "loadfinalDestinationportDetails":
		getfinalDestinationportList();
		break;
		case "loaddischargeportDetails":
		getDischargeportList();
		break;
		default:
        	echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
    }

    function JEncode($arr){
        if (version_compare(PHP_VERSION,"5.2","<"))
        {    
            require_once("./JSON.php");   //if php<5.2 need JSON class
            $json = new Services_JSON();  //instantiate new json object
            $data=$json->encode($arr);    //encode the data in json format
        } else
        {
            $data = json_encode($arr);    //encode the data in json format
        }
        return $data;
    }
    

 function getApprovalNo()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $r=mysql_query("select ifnull(max(ei_appr_no),0+1) as apprno from export_invoice_price_approval_header where ei_fincode = $finid and ei_compcode = $compcode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getExportCustomerList()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select cust_code,cust_ref from massal_customer where cust_taxtag in (1,2,3,8,10) ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 function getExportDealerList()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select dealer_name,dealer_code from export_dealer_master order by dealer_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getIncoTermsList()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select incoterm_code ,incoterm_name  from export_incoterms_master order by incoterm_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getPayTermsList()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("Select payterm_name,payterm_code from export_payterms_master order by payterm_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getfinalDestinationportList()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("Select desti_port_name,desti_port_code from excise_export_destination_mas order by desti_port_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getDischargeportList()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("Select discharge_port_name,discharge_port_code from excise_export_dischargeport_mas order by discharge_port_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

?>
