<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task='loadCountryList';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadCountryList":
		getCountryList();
		break;

		case "loadhsnlist":
		gethsnlist();
		break;

	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getCountryList()
    {
        global $conn;

        $sql = "select  country_name,country_code  from mas_country  order by country_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
	
 function gethsnlist()
    {
        global $conn;

        $sql = "select tariff_code,tariff_name from massal_tariff ";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

?>
