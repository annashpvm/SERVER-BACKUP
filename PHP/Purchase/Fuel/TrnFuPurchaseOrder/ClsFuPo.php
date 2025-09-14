<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loaditemgrp';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadsupplier":
		getsupplier();
		break;
		case "itemrate":
		getitemrate();
		break;
		case "taxdetails":
		gettax();
		break;
		case "LoadPONo":
		getPONo();
		break;	
		case "loadPONoList":
		getPONoList();
		break;	
		case "loadPODetail":
		getPODetail();
		break;
		case "vendoradd":
		getvendoradd();
		break;
		case "loaditem":
		getitem();
		break;
		case "itemdet":
		getitemdet();
		break;
		case "loadpaymode":
		getpaymode();
		break;
		case "loadcarrtype":
		getcarriagetype();
		break;

		case "loadPurGroup":
		getPurGroup();
		break;
             	case "loadSearchLedgerlist":
		getSearchLedgerlist();
		break;	

		case "loadarea":
		getarea();
		break;

		case "loadPurGroupDetail":
		getPurGroupDetail();
		break;
		case "loadPOAmdNo":
		getPOAmdNo();
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
    
 function gettax()
    {
        mysql_query("SET NAMES utf8");
	$vendor = $_POST['Vendorcode'];
	$r=mysql_query("call sprm_sel_tax ('$vendor')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 function getPONo()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
	$r=mysql_query("select IFNULL(max(ordh_no),0)+1 as ordh_no from trnfu_order_header where ordh_compcode ='$compcode' and ordh_fincode ='$finid'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }   


 function getPONoList()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$r=mysql_query("call spfu_sel_ordhead ('$compcode','$finid','0')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getPODetail()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$ordcode = $_POST['ordcode'];

	$r=mysql_query("call spfu_sel_ordno ('$ordcode','$compcode','$finid')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getsupplier()
    {
	$supplier_id = $_POST['supplierid'];
        mysql_query("SET NAMES utf8");

	$r=mysql_query("select cust_code,cust_ref from massal_customer");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
 function getvendoradd()
    {
        mysql_query("SET NAMES utf8");
	$vendor = $_POST['Vendorcode'];
        $r=mysql_query("select cust_add1,cust_add2,cust_add3,sup_city,cust_taxtag from massal_customer where cust_code = $vendor");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getitem()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
//	$r = mysql_query("call spfu_sel_item_details($compcode,$finid)");
        $r = mysql_query("select * from masfu_item_header order by itmh_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getitemdet()
    {
	$itemcode = $_POST['itemcode'];
        //mysql_query("SET NAMES utf8");
	$r = mysql_query("call spfu_get_itemdetail($itemcode)");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
function getitemrate()
    {
	$itemcode = $_POST['itemcode'];
	$vendor = $_POST['Vendorcode'];
        //mysql_query("SET NAMES utf8");
	$r = mysql_query("call spfu_sel_itemrate($itemcode,$vendor)");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getpaymode()
    {
        mysql_query("SET NAMES utf8");
	$r = mysql_query("call sp_sel_payterms");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getcarriagetype()
    {
        mysql_query("SET NAMES utf8");
	$r = mysql_query("call sp_sel_transport");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getPurGroup()
    {

	$supptype     = $_POST['supptype'];
        $gsttype =$_POST['gsttype'];

        if ($gsttype == 'G')
           $r=mysql_query("select * from mas_RMFU_purchasetax  where tax_state = $supptype and tax_gst > 0 and tax_purtype = 'FU' order by tax_purname");
        else
           $r=mysql_query("select * from mas_RMFU_purchasetax  where tax_state = $supptype and tax_gst = 0 and tax_purtype = 'FU'order by tax_purname");



           $r=mysql_query("select * from mas_RMFU_purchasetax  where tax_state = $supptype and tax_purtype = 'FU' order by tax_purname");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getSearchLedgerlist()
    {
        mysql_query("SET NAMES utf8");
        $ledname = strtoupper($_POST['ledger']);
        if ($ledname == '')
	        $qry = "select * from massal_customer where  cust_acc_group in (52,54)  order by cust_name";
        else
	        $qry = "select * from massal_customer where  cust_acc_group in (52,54) and cust_name like '%$ledname%'  order by cust_name";

        $r=mysql_query($qry);
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

function getPurGroupDetail()
    {
	$purcode     = $_POST['purcode'];

        $r=mysql_query("select * from mas_RMFU_purchasetax  where tax_purcode = $purcode order by tax_purname");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getPOAmdNo()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$ordcode = $_POST['ordcode'];

	$r=mysql_query("select ifnull(max(ordt_amendno),0)+1 as amnh_seqno from trnfu_order_header, trnfu_order_trailer where  ordh_seqno = ordt_hdseqno and ordh_compcode = $compcode and ordh_fincode = $finid  and ordh_no = $ordcode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

?>
