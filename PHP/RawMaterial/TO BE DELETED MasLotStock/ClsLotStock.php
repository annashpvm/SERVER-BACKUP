<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loaditem';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loaditem":
		getitem();
		break;
		case "loadparty":
		getparty();
		break;
		case "loadchkrate":
		getchkrate();
		break;
		case "loadlot":
		getlot();
		break;
	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
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
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getitem()
    {
        mysqli_set_charset($conn, "utf8");
	$p_itemtype = $_POST['itemtype'];
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        //$sql = "call spfu_sel_itemdetails ('$p_itemtype')");
	$sql = "call sprm_sel_itemdetails(-1)");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
	
 function getparty()
    {
        mysqli_set_charset($conn, "utf8");
        $sql = "call sp_pur_supplier_actgrp (53)");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getchkrate()
    {
        mysqli_set_charset($conn, "utf8");
	$itemcode = $_POST['itemcode'];
	$lotcode = $_POST['lotcode'];
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];

        $sql = "call spfu_sel_lotitem_stock('$compcode','$finid','$lotcode','$itemcode')");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

?>
