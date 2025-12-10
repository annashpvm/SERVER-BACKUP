<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadDeliveryAddress';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysqli_set_charset($conn, "utf8");

    switch($task){

		case "loadDeliveryAddress":
		getDeliveryAddress();
		break;

		case "loadstates":
		getstatelist();
		break;

		default:
        	echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
    }

    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    

 function getDeliveryAddress()
    {
        global $conn;  
	    $custcode = $_POST['custcode'];
        $sql = "select * from trnsal_delivery_address, mas_state  where delivery_state = state_code and  d_custcode = '$custcode'";
        $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


   function getstatelist()
    {
        global $conn;  
        $sql = "select state_code,state_name from mas_state order by state_name";
        $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


?>
