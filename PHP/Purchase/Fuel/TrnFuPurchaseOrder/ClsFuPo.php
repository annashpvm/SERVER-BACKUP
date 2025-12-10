<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loaditemgrp';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
       global $conn;  
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
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
 function gettax()
    {
       global $conn;  
	$vendor = $_POST['Vendorcode'];
	$sql = "call sprm_sel_tax ('$vendor')";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 function getPONo()
    {
       global $conn;  
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
	$sql = "select IFNULL(max(ordh_no),0)+1 as ordh_no from trnfu_order_header where ordh_compcode ='$compcode' and ordh_fincode ='$finid'";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }   


 function getPONoList()
    {
       global $conn;  
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$sql = "call spfu_sel_ordhead ('$compcode','$finid','0')";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getPODetail()
    {
       global $conn;  
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$ordcode = $_POST['ordcode'];

	$sql = "call spfu_sel_ordno ('$ordcode','$compcode','$finid')";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getsupplier()
    {
	$supplier_id = $_POST['supplierid'];
       global $conn;  

	$sql = "select cust_code,cust_ref from massal_customer";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
 function getvendoradd()
    {
       global $conn;  
	$vendor = $_POST['Vendorcode'];
        $sql = "select cust_add1,cust_add2,cust_add3,sup_city,cust_taxtag from massal_customer where cust_code = $vendor";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getitem()
    {
       global $conn;  
	$compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
//	$r = mysql_query("call spfu_sel_item_details($compcode,$finid)";
        $sql = "select * from masfu_item_header order by itmh_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getitemdet()
    {
	$itemcode = $_POST['itemcode'];
    global $conn;  
	$sql = "call spfu_get_itemdetail($itemcode)";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
function getitemrate()
    {
	$itemcode = $_POST['itemcode'];
	$vendor = $_POST['Vendorcode'];
    global $conn;  
	$sql = "call spfu_sel_itemrate($itemcode,$vendor)";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getpaymode()
    {
       global $conn;  
	$sql = "call sp_sel_payterms";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getcarriagetype()
    {
       global $conn;  
	$sql ="call sp_sel_transport";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getPurGroup()
    {
        global $conn;  
	    $supptype     = $_POST['supptype'];
        $gsttype =$_POST['gsttype'];

        if ($gsttype == 'G')
           $sql = "select * from mas_RMFU_purchasetax  where tax_state = $supptype and tax_gst > 0 and tax_purtype = 'FU' order by tax_purname";
        else
           $sql = "select * from mas_RMFU_purchasetax  where tax_state = $supptype and tax_gst = 0 and tax_purtype = 'FU'order by tax_purname";



           $sql = "select * from mas_RMFU_purchasetax  where tax_state = $supptype and tax_purtype = 'FU' order by tax_purname";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getSearchLedgerlist()
    {
       global $conn;  
        $ledname = strtoupper($_POST['ledger']);
        if ($ledname == '')
	        $sql = "select * from massal_customer where  cust_acc_group in (52,54)  order by cust_name";
        else
	        $sql = "select * from massal_customer where  cust_acc_group in (52,54) and cust_name like '%$ledname%'  order by cust_name";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 


 function getarea()
    {
       global $conn;  
        $sql = "select area_code,area_name from mas_area";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getPurGroupDetail()
    {
        global $conn;  
	$purcode     = $_POST['purcode'];

        $sql = "select * from mas_RMFU_purchasetax  where tax_purcode = $purcode order by tax_purname";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



 function getPOAmdNo()
    {
       global $conn;  
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$ordcode = $_POST['ordcode'];

	$sql = "select ifnull(max(ordt_amendno),0)+1 as amnh_seqno from trnfu_order_header, trnfu_order_trailer where  ordh_seqno = ordt_hdseqno and ordh_compcode = $compcode and ordh_fincode = $finid  and ordh_no = $ordcode";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

?>
