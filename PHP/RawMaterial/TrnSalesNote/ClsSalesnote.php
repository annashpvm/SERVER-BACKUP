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
		case "LoadItem":
		getitem();
		break;
		case "loadlot":
		getlot();
		break;
		case "loadlotdet":
		getlotdetails();
		break;
		case "loadsalenoteno":
		getsalesnoteno();
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
	$sql = "select sup_code,sup_refname from maspur_supplier_master");
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
        $sql = "select itmh_code,itmh_name from masrm_item_header");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getlot()
    {
        mysqli_set_charset($conn, "utf8");
        $sql = "select lot_code,lot_refno from mas_lot");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getlotdetails()
    {
        mysqli_set_charset($conn, "utf8");
	$compcode = $_POST['compcode'];
	$fincode = $_POST['fincode'];
	$lotno = $_POST['lotno'];
        $sql = "call sprm_sel_stkitemdetails($compcode,$fincode,$lotno)");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getsalesnoteno()
    {
        mysqli_set_charset($conn, "utf8");
	$compcode = $_POST['compcode'];
	$fincode = $_POST['fincode'];
        $sql = "select ifnull(max(salh_no),0)+1 as salenote_no from trnrm_salenote_header where salh_compcode=$compcode and salh_fincode=$fincode");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
?>
