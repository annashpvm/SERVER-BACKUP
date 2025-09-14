<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadwtcardno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadsupplier":
		getsupplier();
		break;
		case "loadarea":
		getarea();
		break;
		case "loadsupervisor":
		getsupervisor();
		break;
		case "loadTicketNoDetail":
		getTicketNoDetail();
		break;
		case "loadSearchitemlist":
		getSearchitemlist();
		break;
		case "loadWBTicketNoList":
		getWBTicketNoList();
		break;
		case "loadFuelItemList":
		getFuelItemList();
		break;
		case "loadWBTicketNoList2":
		getWBTicketNoList2();
		break;
		case "loadWBTicketNoDuplicateList":
		getWBTicketNoDuplicateList();
		break;

		case "loadWighBridgeTicketNoList":
		getWighBridgeTicketNoList();
		break;

		case "loadWeighBridgeTicketNoDetail":
		getWeighBridgeTicketNoDetail();
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
    
   
 function getsupplier()
    {
        mysql_query("SET NAMES utf8");
	$r=mysql_query("select cust_code,cust_ref from massal_customer where cust_type !='G' and cust_code > 0  and cust_acc_group = 78 order by cust_ref");
	$r=mysql_query("select cust_code,cust_ref from massal_customer where cust_type !='G'  and cust_code >0 and lefT(cust_ref,2) != 'ZZ' order by cust_ref");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
	
 function getarea()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select area_code,area_name from mas_area");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getsupervisor()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select spvr_code,spvr_name from mas_supervisor");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getTicketNoDetail()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$wtno = $_POST['wtno'];
/*
	$gstFlag = $_POST['gstFlag'];

	if ($gstFlag === "Add") {
	        $r=mysql_query("select ifnull(max(wc_no),0)+1 as wc_no from trn_weight_card where wc_fincode = '$finid' And wc_compcode ='$compcode' ");
	}
	else {

	        $r=mysql_query("call sp_sel_weightcard ('$compcode','$finid','$wtno')");
	}
*/

        $r=mysql_query("call sp_sel_weightcard ('$compcode','$finid','$wtno')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getWBTicketNoList()
    {
        mysql_query("SET NAMES utf8");
	$compcode  = $_POST['compcode'];
	$finid     = $_POST['finid'];
	$entrydate = $_POST['entrydate'];
        $r=mysql_query("select wc_ticketno from trn_weight_card where wc_fincode = '$finid' and wc_compcode ='$compcode' and wc_date = '$entrydate' and (wc_process = 'N' or wc_itemcode = 0)  and wc_item  != 'MINERAL WATTER'  order by wc_ticketno desc ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getWBTicketNoList2()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$entrydate = $_POST['entrydate'];
        $r=mysql_query("select wc_ticketno from trn_weight_card where wc_fincode = '$finid' and wc_compcode ='$compcode' and wc_date = '$entrydate' and wc_process = 'Y' order by wc_ticketno desc ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getSearchitemlist()
    {
        mysql_query("SET NAMES utf8");
//        $r=mysql_query("select hsn_code,hsn_sno from mas_hsncode order by hsn_code");

	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];

        $party = strtoupper($_POST['party']);
        $party = trim(str_replace(" ", "", $party)); 
        $party = trim(str_replace(".", "", $party)); 


        $qry = "select * from massal_customer where left(cust_ref,2) != 'ZZ'  and cust_name like '%$party%' order by cust_name";

        $qry = "select * from massal_customer where left(cust_ref,2) != 'ZZ'  and replace(replace(cust_name,' ','')  ,'.','')  like '%$party%' order by cust_name";


        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 function getFuelItemList()
    {
        mysql_query("SET NAMES utf8");
//        $r=mysql_query("select hsn_code,hsn_sno from mas_hsncode order by hsn_code");

	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $party     = $_POST['party'];
        $qry = "select * from masfu_item_header 
union all
select 0 itmh_code, 'WASTE PAPER' itmh_name, 0 itmh_moisture_ARB, 0 itmh_moisture_ADB, 0 itmh_ash, 0 itmh_volatile, 0 itmh_fixedcarbon,
0 itmh_fines,0 itmh_sand, 0 itmh_iron, 0 itmh_gcv_ADB, 0 itmh_gcv_ARB, 0 itmh_hsncode, 0 itmh_moisture_ARB_qc, 0 itmh_moisture_ADB_qc,
0 itmh_ash_qc,0 itmh_volatile_qc,0 itmh_fixedcarbon_qc, 0 itmh_fines_qc, 0 itmh_sand_qc, 0 itmh_iron_qc, 0 itmh_gcv_ADB_qc, 0 itmh_gcv_ARB_qc
order by itmh_name
";
        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getWBTicketNoDuplicateList()
    {
        mysql_query("SET NAMES utf8");
	$compcode  = $_POST['compcode'];
	$finid     = $_POST['finid'];
	$entrydate = $_POST['entrydate'];
        $r=mysql_query("select wc_ticketno from trn_weight_card where wc_fincode = '$finid' and wc_compcode ='$compcode' and wc_date = '$entrydate' and  wc_partynetwt > 0 order by wc_ticketno desc ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getWighBridgeTicketNoList()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$entrydate = $_POST['entrydate'];
        $r=mysql_query("select t_wb_ticketno from trn_weighbridge_entry where t_wb_year = '$finid' and t_wb_compcode ='$compcode' and t_wb_date = '$entrydate'  order by t_wb_ticketno desc ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getWeighBridgeTicketNoDetail()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$entrydate = $_POST['entrydate'];
        $ticketo =  $_POST['ticketno'];
        $r=mysql_query("select *from trn_weighbridge_entry where t_wb_year = '$finid' and t_wb_compcode ='$compcode' and  t_wb_ticketno = '$ticketo'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

?>
