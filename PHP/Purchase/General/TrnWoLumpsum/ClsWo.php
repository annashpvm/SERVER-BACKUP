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
	$sql = "call sp_pur_sup()");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
	
 function getdept()
    {
        mysqli_set_charset($conn, "utf8");
	$vendor = $_POST['Vendorcode'];
        $sql = "call sp_sel_dept()");
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
        $sql = "select * from  mas_item_master order by item_name");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getworkorder()
    {
        mysqli_set_charset($conn, "utf8");
        $sql = "select * from mas_workorder");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getpayterms()
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

function getwono()
    {
        mysqli_set_charset($conn, "utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
        $sql = "select ifnull(max(woh_no),0)+1 as wono from trnpur_workorder_header where woh_comp_code=1 and woh_fin_code=27");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
?>
