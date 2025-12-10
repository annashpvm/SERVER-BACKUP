<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loaditemgrp';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){

		case "loadunit":
		getunit();
		break;
		case "loadhsn":
		gethsn();
		break;

		case "loadItemDetails":
		getItemDetails();
		break;
		case "loadsgstled":
		getsgstledger();
		break;
		case "loadigstled":
		getigstledger();
		break;
	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    

	
 function getunit()
    {
        mysqli_set_charset($conn, "utf8");
        $sql = "select uom_name,uom_code  from mas_uom order by uom_name");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function gethsn()
    {
        mysqli_set_charset($conn, "utf8");
        $sql = "select hsn_code,hsn_sno from mas_hsncode order by hsn_code");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getItemDetails()
    {
        mysqli_set_charset($conn, "utf8");
        $sql = "select * from mas_item_master, mas_uom , mas_hsncode  where item_uom =  uom_code  and hsn_sno  = item_hsncode  order by  item_name");

        $sql = "select * from mas_item_master, mas_uom where item_uom =  uom_code order by  item_name");

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

?>
