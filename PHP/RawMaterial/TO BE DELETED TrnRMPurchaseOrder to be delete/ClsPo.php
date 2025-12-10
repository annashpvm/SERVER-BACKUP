<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadsupplier';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
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
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getsupplier()
    {
        mysqli_set_charset($conn, "utf8");
	$supplierid = $_POST['supplierid'];
	$sql = "select sup_code,sup_refname from maspur_supplier_master  where sup_acc_group = '$supplierid' order by sup_refname");
	$sql = "select sup_code,sup_refname from maspur_supplier_master order by sup_refname");

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 function getPONo()
    {
        mysqli_set_charset($conn, "utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
	$sql = "select IFNULL(max(ordh_no),0)+1 as ordh_no from trnrm_order_header where ordh_compcode ='$compcode' and ordh_fincode ='$finid'");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getPONoList()
    {
        mysqli_set_charset($conn, "utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$sql = "call sprm_sel_ordhead('$compcode','$finid')");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getPODetail()
    {
        mysqli_set_charset($conn, "utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$ordcode = $_POST['ordcode'];

	$sql = "call sprm_sel_ordno ('$ordcode','$compcode','$finid')");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function gettax()
    {
        mysqli_set_charset($conn, "utf8");
	$vendor = $_POST['Vendorcode'];
	$sql = "call sprm_sel_tax ('$vendor')");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
 function getvendoradd()
    {
        mysqli_set_charset($conn, "utf8");
	$vendor = $_POST['Vendorcode'];
        $sql = "select sup_type,sup_addr1,sup_addr2,sup_addr3 from maspur_supplier_master where sup_code = $vendor");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getitem()
    {
        mysqli_set_charset($conn, "utf8");
        $sql = "select itmh_code,itmh_name from masrm_item_header  where itmh_type = 1  order by itmh_name");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getitemdet()
    {
        mysqli_set_charset($conn, "utf8");
        $itemcode = $_POST['itemcode'];
        $sql = "select itmh_moisture_per from masrm_item_header where itmh_code ='$itemcode' ");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getpaymode()
    {
        mysqli_set_charset($conn, "utf8");
        $sql = "select term_code,term_name from mas_terms");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getcarriagetype()
    {
        mysqli_set_charset($conn, "utf8");
        $sql = "select carr_code,carr_name from mas_transport");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getarea()
    {
        mysqli_set_charset($conn, "utf8");
        $sql = "select area_code,area_name from mas_area");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getSearchLedgerlist()
    {
        mysqli_set_charset($conn, "utf8");
        $ledname = strtoupper($_POST['ledger']);
        if ($ledname == '')
	        $qry = "select * from maspur_supplier_master where  sup_acc_group in (60,58)  order by sup_name";
        else
	        $qry = "select * from maspur_supplier_master where  sup_acc_group in (60,58) and sup_name like '%$ledname%'  order by sup_name";

        $r=mysqli_query($conn, $qry);
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 

	function getPurGroup()
    {
	$supptype     = $_POST['supptype'];
        $gsttype =$_POST['gsttype'];

        if ($gsttype == 'G')
           $sql = "select * from mas_RMFU_purchasetax  where tax_state = $supptype and tax_gst > 0 and tax_purtype = 'RM'order by tax_purname");
        else
           $sql = "select * from mas_RMFU_purchasetax  where tax_state = $supptype and tax_gst = 0 and tax_purtype = 'RM'order by tax_purname");



           $sql = "select * from mas_RMFU_purchasetax  where tax_state = $supptype and tax_purtype = 'RM' order by tax_purname");


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getPurGroupDetail()
    {
	$purcode     = $_POST['purcode'];

        $sql = "select * from mas_RMFU_purchasetax  where tax_purcode = $purcode order by tax_purname");


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



function getPOPartylist()
{

        mysqli_set_charset($conn, "utf8");
        $ledname = strtoupper($_POST['ledger']);
        if ($ledname == '')
	        $qry = "select sup_code, sup_name,sup_type  from trnrm_order_header , maspur_supplier_master where ordh_sup_code = sup_code group by sup_code, sup_name,sup_type order by sup_name";
        else
	        $qry = "select sup_code, sup_name,sup_type from trnrm_order_header , maspur_supplier_master where ordh_sup_code = sup_code and sup_name like '%$ledname%'  group by sup_code, sup_name,sup_type order by sup_name";


//echo $qry;
        $r=mysqli_query($conn, $qry);
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
}


function getPartyPONOlist()
{

        mysqli_set_charset($conn, "utf8");
        $suppliercode = $_POST['suppliercode'];
        $compcode = $_POST['compcode'];  
        $fincode = $_POST['fincode'];
        $qry = "select ordh_no,ordh_seqno from trnrm_order_header , maspur_supplier_master where ordh_sup_code = sup_code and  ordh_sup_code = $suppliercode and ordh_compcode = $compcode and ordh_fincode = $fincode  order by ordh_no,ordh_seqno";
        $r=mysqli_query($conn, $qry);
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
}

 function getPOAmdNo()
    {
        mysqli_set_charset($conn, "utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$ordcode = $_POST['ordcode'];

	$sql = "select ifnull(max(ordt_amendno),0)+1 as amnh_seqno from trnrm_order_header, trnrm_order_trailer where  ordh_seqno = ordt_hdseqno and ordh_compcode = $compcode and ordh_fincode = $finid  and ordh_no = $ordcode");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

?>
