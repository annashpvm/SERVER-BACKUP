<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loaditemgrp';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadsupplier":
		getsupplier();
		break;
		case "loaddept":
		getdept();
		break;
		case "loadwo":
		getworkorder();
		break;
		case "loaditem":
		getitem();
		break;
		case "loadpayterm":
		getpayterms();
		break;
		case "loadwono":
		getwono();
		break;
		case "loadwonolist":
		getwonolist();
		break;
		case "loadwonodetails":
		getwonodetails();
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
	$sql = "call sp_pur_sup()";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
	
 function getdept()
    {
        global $conn;  
	$vendor = $_POST['Vendorcode'];
        $sql = "call sp_sel_dept()";
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
        $sql = "select * from  mas_item_master order by item_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getworkorder()
    {
        global $conn;  
        $sql = "select * from mas_workorder  order by wo_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getpayterms()
    {
        global $conn;  
        $sql = "select term_code,term_name from mas_terms";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getwono()
    {
        global $conn;  
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
        $sql = "select ifnull(max(woh_no),0)+1 as wono from trnpur_workorder_header where woh_comp_code=$compcode and woh_fin_code=$finid";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getwonolist()
    {
        global $conn;  
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
        $sql = "select woh_no from trnpur_workorder_header where woh_comp_code=$compcode and woh_fin_code=$finid order by woh_no desc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getwonodetails()
    {
        global $conn;  
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$wono  = $_POST['wono'];
        $sql = "select * from trnpur_workorder_header a,  trnpur_workorder_trailer b,maspur_supplier_master c ,mas_item_master d ,mas_workorder e where woh_seqno = wot_hdseqno and woh_sup_code = sup_code and woh_wocode =wo_no and wot_itemcode = item_code and woh_comp_code = $compcode  and  woh_fin_code = $finid and woh_no =$wono  order by wot_slno";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

?>
