<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loaditemgrp';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadvariety":
		getvariety();
		break;
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
		default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getvariety()
    {
        mysqli_set_charset($conn, "utf8");
	$sql = "call sprm_sel_prodvariety");
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
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
        $sql = "call sprm_sel_item_details ('$compcode','$finid') ");
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
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
        $sql = "call sprm_sel_item_details1 ('$compcode','$finid') ");
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
        $sql = "call sp_sel_lot");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getissretno()
    {
        mysqli_set_charset($conn, "utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['fincode'];
	$gstflag = $_POST['gstflag'];
	if ($gstflag == "Add") {
		$sql = "select ifnull(max(isrh_no),0) + 1 as issretno from trnrm_issret_header where isrh_compcode='$compcode' and isrh_fincode='$finid'");
	}
	else if ($gstflag == "Edit") {
		$sql = "select isrh_no as issretno from trnrm_issret_header where isrh_compcode='$compcode' and isrh_fincode='$finid'");
		
	}
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
?>
