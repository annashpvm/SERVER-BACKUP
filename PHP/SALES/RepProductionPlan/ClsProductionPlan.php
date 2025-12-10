<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task="loadPPno";

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadPPNo":
		getPPNoList();
		break;
	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   

 function getPPNoList()
    {
        global $conn; 

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];

        $sql = "select pp_advno from trn_prodplan_header where pp_comp_code = $compcode and pp_fincode = $finid  group by pp_advno order by pp_advno desc");

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	


?>
