<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadsupplier';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadsupplier":
		getsupplier();
		break;
		case "taxdetails":
		gettax();
		break;
		case "vendoradd":
		getvendoradd();
		break;
		case "LoadPONo":
		getPONo();
		break;
		case "LoadPONoList":
		getPONoList();
		break;
		case "loadPODetail":
		getPODetail();
		break;
		case "LoadItem":
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
		case "loadarea":
		getarea();
		break;
             	case "loadSearchLedgerlist":
		getSearchLedgerlist();
		break;	
		case "loadPurGroup":
		getPurGroup();
		break;
		case "loadPurGroupDetail":
		getPurGroupDetail();
		break;
             	case "loadPOPartylist":
		getPOPartylist();
		break;
             	case "loadPartyPONOlist":
		getPartyPONOlist();
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
    
   
 function getsupplier()
    {
        mysql_query("SET NAMES utf8");
	$supplierid = $_POST['supplierid'];
	$r=mysql_query("select sup_code,sup_refname from maspur_supplier_master  where sup_acc_group = '$supplierid' order by sup_refname");
	$r=mysql_query("select sup_code,sup_refname from maspur_supplier_master order by sup_refname");

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
	$r=mysql_query("select IFNULL(max(ordh_no),0)+1 as ordh_no from trnrm_order_header where ordh_compcode ='$compcode' and ordh_fincode ='$finid'");
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
	$r=mysql_query("call sprm_sel_ordhead('$compcode','$finid')");
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

	$r=mysql_query("call sprm_sel_ordno ('$ordcode','$compcode','$finid')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
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
	
 function getvendoradd()
    {
        mysql_query("SET NAMES utf8");
	$vendor = $_POST['Vendorcode'];
        $r=mysql_query("select sup_type,sup_addr1,sup_addr2,sup_addr3 from maspur_supplier_master where sup_code = $vendor");
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
        $r=mysql_query("select itmh_code,itmh_name from masrm_item_header  where itmh_type = 1  order by itmh_name");
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
        mysql_query("SET NAMES utf8");
        $itemcode = $_POST['itemcode'];
        $r=mysql_query("select itmh_moisture_per from masrm_item_header where itmh_code ='$itemcode' ");
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
        $r=mysql_query("select term_code,term_name from mas_terms");
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
        $r=mysql_query("select carr_code,carr_name from mas_transport");
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

 function getSearchLedgerlist()
    {
        mysql_query("SET NAMES utf8");
        $ledname = strtoupper($_POST['ledger']);
        if ($ledname == '')
	        $qry = "select * from maspur_supplier_master where  sup_acc_group in (60,58)  order by sup_name";
        else
	        $qry = "select * from maspur_supplier_master where  sup_acc_group in (60,58) and sup_name like '%$ledname%'  order by sup_name";

        $r=mysql_query($qry);
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
           $r=mysql_query("select * from mas_RMFU_purchasetax  where tax_state = $supptype and tax_gst > 0 and tax_purtype = 'RM'order by tax_purname");
        else
           $r=mysql_query("select * from mas_RMFU_purchasetax  where tax_state = $supptype and tax_gst = 0 and tax_purtype = 'RM'order by tax_purname");



           $r=mysql_query("select * from mas_RMFU_purchasetax  where tax_state = $supptype and tax_purtype = 'RM' order by tax_purname");


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



function getPOPartylist()
{

        mysql_query("SET NAMES utf8");
        $ledname = strtoupper($_POST['ledger']);
        if ($ledname == '')
	        $qry = "select sup_code, sup_name,sup_type  from trnrm_order_header , maspur_supplier_master where ordh_sup_code = sup_code group by sup_code, sup_name,sup_type order by sup_name";
        else
	        $qry = "select sup_code, sup_name,sup_type from trnrm_order_header , maspur_supplier_master where ordh_sup_code = sup_code and sup_name like '%$ledname%'  group by sup_code, sup_name,sup_type order by sup_name";


//echo $qry;
        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}


function getPartyPONOlist()
{

        mysql_query("SET NAMES utf8");
        $suppliercode = $_POST['suppliercode'];
        $compcode = $_POST['compcode'];  
        $fincode = $_POST['fincode'];
        $qry = "select ordh_no,ordh_seqno from trnrm_order_header , maspur_supplier_master where ordh_sup_code = sup_code and  ordh_sup_code = $suppliercode and ordh_compcode = $compcode and ordh_fincode = $fincode  order by ordh_no,ordh_seqno";
        $r=mysql_query($qry);
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

	$r=mysql_query("select ifnull(max(ordt_amendno),0)+1 as amnh_seqno from trnrm_order_header, trnrm_order_trailer where  ordh_seqno = ordt_hdseqno and ordh_compcode = $compcode and ordh_fincode = $finid  and ordh_no = $ordcode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

?>
