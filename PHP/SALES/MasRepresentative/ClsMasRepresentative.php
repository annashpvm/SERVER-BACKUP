<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task='loadRepresentative';



    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadRepresentative":
		getRepresentative();
		break;

		case "loadRepGroup":
		getRepGroup();
		break;
	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getRepresentative()
    {

global $conn;  
        $sql = "select * from massal_repr , acc_group_master where repr_accgrp = grp_code";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
 function getRepGroup()
    {
        global $conn;  

        $sql = " select * from acc_group_master where grp_parent_code = 24 order by grp_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
?>
