<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loaditemgrp';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysqli_set_charset($conn, "utf8");
    switch($task){

		case "LoadItem":
		getitem();
		break;
		case "loadlot":
		getlot();
		break;
		case "loadissretno":
		getissretno();
		break;
		case "loaditemdet":
		getitemdet();
		break;
             	case "loadSearchItemlist":
		getSearchItemlist();
		break;
		case "loadItemStock":
		getitemStock();
		break;
		case "loadissRetdetail":
		getissRetdetail();
		break;
		default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   

	
 function getitem()
    {
        global $conn;
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
        $sql = "call spfu_sel_item_details ('$compcode','$finid') ";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getitemdet()
    {
        global $conn;
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
        $sql = "call spfu_sel_item_details1 ('$compcode','$finid') ";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getlot()
    {
        global $conn;
        $sql = "call sp_sel_lot";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getissretno()
    {
        global $conn;
	$compcode = $_POST['compcode'];
	$finid = $_POST['fincode'];
	$gstflag = $_POST['gstflag'];


	if ($gstflag == "Add") {
		$sql = "select ifnull(max(isrh_no),0) + 1 as issretno from trnfu_issret_header where isrh_compcode='$compcode' and isrh_fincode='$finid'";
	}
	else if ($gstflag == "Edit") {
		$sql = "select * from trnfu_issret_header where isrh_compcode='$compcode' and isrh_fincode='$finid'";
		
	}
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }





 function getSearchItemlist()
    {
        global $conn;
        $itemname = trim(strtoupper($_POST['itemname']));

        if ($itemname == '') 
            $sql = "select * from masfu_item_header  order by itmh_name";
        else
            $sql = "select * from masfu_item_header where itmh_name like '%$itemname%' order by itmh_name";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getitemStock()
    {
        global $conn;
	$compcode = $_POST['compcode'];
	$itemcode = $_POST['itemcode'];
	$finid = $_POST['finid'];


//        $sql = "call spfu_sel_itemlotdetails($compcode,$finid,$itemcode,$lotcode)";
	$sql = "select * from masfu_item_trailer where itmt_compcode = $compcode and itmt_fincode = $finid  and itmt_hdcode = $itemcode";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getissRetdetail()
    {
        global $conn;
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$issno = $_POST['issno'];
	$AEDFlag = $_POST['AEDFlag'];
	

	$sql = "select * from trnfu_issret_header , trnfu_issret_trailer , masfu_item_header , masfu_item_trailer where itmt_hdcode = isrt_itemcode and itmt_compcode = isrh_compcode and itmt_fincode = isrh_fincode and  isrt_itemcode = itmh_code and isrh_seqno = isrt_hdseqno and  isrh_compcode = $compcode  and isrh_fincode = $finid and isrh_no = $issno";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

?>
