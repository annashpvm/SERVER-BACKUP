<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadlocation';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadmotormake":
		getmotormake();
		break;
		case "loadlocation":
		getlocation();
		break;
		case "loadHSNCodes":
		getHSNCodes();
		break;
	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getmotormake()
    {
        global $conn;  
        $sql = "select * from mas_motor_make";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
	
 function getlocation()
    {
        global $conn;  
        $sql = "select equip_code,equip_name from mas_equipment";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getHSNCodes()
    {
        global $conn;  
        $sql = "select * from mas_hsncode order by hsn_code";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

?>
