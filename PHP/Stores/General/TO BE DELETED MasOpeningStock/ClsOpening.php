<?php
   require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadOpeningitems';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){

		case "loadOpeningitems":
		getOpeningitems();
		break;


		case "loadSubGroup":
		getSubGroup();
		break;



		default:
        	echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
function getOpeningitems()
    {
        mysqli_set_charset($conn, "utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$grpcode  = $_POST['grpcode'];

	$sql = "select item_name,uom_short_name, head.item_code, item_stock,  round(item_stock*item_avg_rate,2) opvalue, item_avg_rate  from maspur_item_header head,maspur_item_trailer trail ,mas_uom uom  where  uom.uom_code = head.item_uom and head.item_code = trail.item_code and trail.item_comp_code = $compcode  and trail.item_fin_code = $finid and  head.item_group_code = $grpcode and item_stock > 0");


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


function getSubGroup()
    {
        mysqli_set_charset($conn, "utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$grpcode  = $_POST['grpcode'];

	$sql = "select * from maspur_subgroup order by subgrp_name");


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
?>
