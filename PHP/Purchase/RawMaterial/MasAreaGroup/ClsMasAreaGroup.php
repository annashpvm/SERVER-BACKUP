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
        $sql = "select areagrp_code, areagrp_name from mas_areagroup order by areagrp_name asc";
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
