<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task='loadReelWeight';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadReelWeight":
		getReelWeight();
		break;
		case "loadSONoList":
		getSONoList();
		break;
		case "loadSOCustomer":
		getSOCustomer();
		break;
		case "loadReelNumberDetail":
		getReelNumberDetail();
		break;
		case "loadAllCustomer":
		getAllCustomer();
		break;
		
	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getReelWeight()
    {
        mysqli_set_charset($conn, "utf8");

        $sql = "select r_reelno from trn_dayprod_rewinder order by r_reelno");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
 function getSONoList()
    {
        mysqli_set_charset($conn, "utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];


        $sql = "select ordh_sono from trnsal_order_header where ordh_fincode = $finid  and ordh_comp_code= $compcode group by ordh_sono  order by ordh_sono desc");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 function getSOCustomer()
    {
        mysqli_set_charset($conn, "utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $sono     = $_POST['sono'];
        $sql = "select cust_ref,cust_code from trnsal_order_header , massal_customer where ordh_party = cust_code and ordh_fincode = $finid   and ordh_comp_code= $compcode  and ordh_sono =  $sono ");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

    function getAllCustomer()
    {
        mysqli_set_charset($conn, "utf8");

        $sql = "select cust_ref,cust_code from massal_customer order by cust_ref ");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 function getReelNumberDetail()
    {

	$reelno    = $_POST['reelno'];
        mysqli_set_charset($conn, "utf8");

        $sql = "select * from trn_dayprod_rewinder a , massal_customer b , masprd_variety where r_custcode = cust_code 
and  r_varietycode = var_groupcode and r_reelno = '$reelno'");

        $sql = "select * from trn_dayprod_rewinder , masprd_variety where r_varietycode = var_groupcode and r_reelno = '$reelno'");


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }	
 

?>
