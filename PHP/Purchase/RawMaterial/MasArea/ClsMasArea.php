<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadLotList';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadAreaList":
		getAreaList();
		break;
		case "loadAreaGroup":
		getAreaGroup();
		break;

		case "loadAreaRepGroupList":
	        getAreaRepGroupList();
		break;


	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getAreaList()
    {
        global $conn;  
    //    $sql = "select area_name,area_code , areagrp_code, areagrp_name from mas_area , mas_areagroup  where area_grpcode  =  areagrp_code order by area_name asc");

        $sql = "select area_name,area_code , areagrp_code, areagrp_name , mas_area_repgrp_code, mas_area_repgrp_name from mas_area , mas_areagroup , mas_area_report_group  where area_report_group = mas_area_repgrp_code and area_grpcode  =  areagrp_code order by area_name asc";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
   
 function getAreaGroup()
    {
        global $conn;  
        $sql = "select * from  mas_areagroup order by areagrp_name asc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	

 function getAreaRepGroupList()
    {
        global $conn;  
        $sql = "select mas_area_repgrp_code, mas_area_repgrp_name from mas_area_report_group order by mas_area_repgrp_name asc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }	
?>
