<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
    $task="loadTDSDatewiseList";
    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    global $conn;
    switch($task){
		case "loadTDSDatewiseList":
		getTDSDatewiseList();
		break;

		case "loadTDSGroupList":
		getTDSGroupList();
		break;


		default:
               	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    


function getTDSDatewiseList()
{
 global $conn;

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$ledcode   = $_POST['ledcode'];

        $sql = "call spacc_rep_tds($compcode,'$finid','$startdate','$enddate',$ledcode )";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
}


function getTDSGroupList()
{
 global $conn;

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	
        $sql = "call spacc_rep_tds_groupwise($compcode,'$finid','$startdate','$enddate')";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
}

?>




