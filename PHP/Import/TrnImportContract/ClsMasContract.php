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

		case "loadPortList":
		getPortList();
		break;


		case "LoadPONo":
		getPONo();
		break;

		case "loadsupplier":
		getsupplier();
		break;

		case "LoadItem":
		getitem();
		break;

		case "LoadPONoList":
		getPONoList();
		break;
		case "loadPODetail":
		getPODetail();
		break;



	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
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


 function getPONo()
    {
        global $conn;
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
	$sql = "select IFNULL(max(ordh_no),0)+1 as ordh_no from trnirm_order_header where ordh_compcode ='$compcode' and ordh_fincode ='$finid'";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


   
 function getsupplier()
    {
        global $conn;
	$supplierid = $_POST['supplierid'];
	$sql = "select sup_code,cust_ref from massal_customer  where cust_acc_group = '$supplierid' order by cust_ref";
	$sql = "select cust_code,cust_ref from massal_customer order by cust_ref";

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
        $sql = "select itmh_code,itmh_name from masrm_item_header";
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
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$sql = "select ordh_no,ordh_seqno from trnirm_order_header where ordh_fincode = '$finid' and ordh_compcode='$compcode' order by ordh_no desc";
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


?>
