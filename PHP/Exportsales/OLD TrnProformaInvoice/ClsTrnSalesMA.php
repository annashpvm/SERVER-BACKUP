<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConndpm.php");

    $task='loadOrderEntryNo';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysqli_set_charset($conn, "utf8");

    switch($task){
		case "loadOrderEntryNo":
		getOrderEntryNo();
		break;

		default:
        	echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
    }

    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    

 function getOrderEntryNo()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $sql = "select ifnull(max(ordh_ackno),0)+1 as ordno from trnsal_order_header where ordh_fincode	= 20 and ordh_comp_code=1");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


?>
