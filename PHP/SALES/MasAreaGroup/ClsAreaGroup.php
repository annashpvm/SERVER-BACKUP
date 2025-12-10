<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadAreaList';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){

		case "loadAreaList":
		getAreaList();
		break;

		case "loadAreaRateList":
		getAreaRateList();
		break;
		case "loadAreaList2":
		getAreaRateList2();
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
	$sql = "select area_code,area_name from massal_area where area_code > 0 order by area_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
 function getAreaRateList()
    {
        global $conn;  
	$sql = "select  rate_areacode, rate_areaname from massal_areaRate_group where  rate_areacode > 0 order by rate_areaname";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getAreaRateList2()
    {
        global $conn;  
	$sql = "select area_code,area_name,rate_areacode, rate_areaname from massal_area , massal_areaRate_group where  rate_areacode =  area_rategrp and area_code > 0 order by area_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


?>
