<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task='loadCountryList';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
mysqli_set_charset($conn, "utf8");
    switch($task){


		case "loadCountryList":
		getCountryList();
		break;

		case "LoadInvNoList":
		getInvNoList();
		break;
		case "loadPODetail":
		getPODetail();
		break;
		case "LoadPOItemList":
		getPOItemList();
		break;
		case "LoadPOItemDetail":
		getPOItemDetail();
		break;
		case "loadPortList":
		getPortList();
		break;
		case "loadsupplier":
		getsupplier();
		break;
		case "loadAllsupplier":
		getAllsupplier();
		break;
		case "loadINVNoDetail":
		getINVNoDetail();
		break;
		case "loadINVExpensesDetail":
		getINVExpensesDetail();
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
        global $conn;
	$supplierid = $_POST['supplierid'];
	$sql = " select cust_ref, cust_code from trnirm_invoice_header , massal_customer where invh_cust_code = cust_code  group by cust_ref, cust_code order by cust_ref";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getInvNoList()
    {
        global $conn;
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
 	$supcode  = $_POST['supcode'];
	$sql = "select invh_invoicerefno,invh_invoiceno from trnirm_invoice_header where invh_cust_code = '$supcode'  and  invh_fincode = '$finid' and invh_compcode='$compcode'";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


   
 function getCountryList()
    {
        global $conn;

        $sql = "select  country_name,country_code  from mas_country  order by country_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
	
 function getPortList()
    {
        global $conn;

        $sql = "select * from mas_port , mas_country where port_country = country_code order by port_name";
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
	$ordno = $_POST['ordno'];
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];



	$sql = "call spirm_sel_ordno('$ordno','$compcode','$finid')";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


   
 function getAllsupplier()
    {
        global $conn;
	$supplierid = $_POST['supplierid'];
	$sql = "select cust_code,cust_ref from massal_customer  where custacc_group = '$supplierid' order by cust_ref";
	$sql = "select cust_code,cust_ref from massal_customer order by cust_ref";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getPOItemList()
    {
        global $conn;
	$seqno = $_POST['seqno'];

	$sql = "select itmh_name,itmh_code from trnirm_order_trailer , masrm_item_header where ordt_hdseqno = '$seqno' and ordt_item_code =  itmh_code";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getPOItemDetail()
    {
        global $conn;
	$seqno = $_POST['seqno'];
	$item = $_POST['itemcode'];
	$sql = "select * from trnirm_order_trailer where ordt_hdseqno = '$seqno'  and ordt_item_code = '$item'";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }




 function getINVNoDetail()
    {
        global $conn;
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
 	$supcode  = $_POST['supcode'];
 	$invno    = $_POST['invno'];
	$sql = "select * from trnirm_invoice_header where  invh_invoicerefno  = '$invno' and invh_cust_code = '$supcode'  and  invh_fincode = '$finid' and invh_compcode='$compcode'";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getINVExpensesDetail()
    {
        global $conn;
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
 	$supcode  = $_POST['supcode'];
 	$invno    = $_POST['invno'];
	$sql = "select * from  trnirm_invoice_header, trnirm_invoice_expenses , massal_customer where invh_seqno = invc_hdcode and  invc_party = cust_code and  invh_invoicerefno  = '$invno' and  invh_fincode = '$finid' and invh_compcode= '$compcode'";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


?>
