<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php";



    $task='loadReligion';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        global $conn;
    switch($task){
                case "loadProdGroup":
		getVarMainGroup();
		break;
		case "loadReligion":
		getReligion();
		break;
		case "loadCommunity":
		getCommunity();
		break;
	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getReligion()
    {
        global $conn;

        $sql = "select religion_code,religion_name from mas_religion order by religion_code";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }	
function getCommunity()
    {
        global $conn;

        $sql = "select comm_code,comm_name from mas_community order by comm_code";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
function getVarMainGroup()
    {
        global $conn;

        $sql = "select vargrp_type_code,vargrp_type_name, vargrp_type_short_code, vargrp_type_hsncode from masprd_type order by vargrp_type_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
?>
