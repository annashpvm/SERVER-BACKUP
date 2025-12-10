<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConndpm.php");

    $task='loadApprovalNo';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysqli_set_charset($conn, "utf8");

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
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    

 function getApprovalNo()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $sql = "select ifnull(max(ei_appr_no),0+1) as apprno from export_invoice_price_approval_header where ei_fincode = $finid and ei_compcode = $compcode");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getExportCustomerList()
    {
        mysqli_set_charset($conn, "utf8");
        $sql = "select cust_code,cust_ref from massal_customer where cust_taxtag in (1,2,3,8,10) ");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 function getExportDealerList()
    {
        mysqli_set_charset($conn, "utf8");
        $sql = "select dealer_name,dealer_code from export_dealer_master order by dealer_name");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getIncoTermsList()
    {
        mysqli_set_charset($conn, "utf8");
        $sql = "select incoterm_code ,incoterm_name  from export_incoterms_master order by incoterm_name");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getPayTermsList()
    {
        mysqli_set_charset($conn, "utf8");
        $sql = "Select payterm_name,payterm_code from export_payterms_master order by payterm_name");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getfinalDestinationportList()
    {
        mysqli_set_charset($conn, "utf8");
        $sql = "Select desti_port_name,desti_port_code from excise_export_destination_mas order by desti_port_name");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getDischargeportList()
    {
        mysqli_set_charset($conn, "utf8");
        $sql = "Select discharge_port_name,discharge_port_code from excise_export_dischargeport_mas order by discharge_port_name");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

?>
