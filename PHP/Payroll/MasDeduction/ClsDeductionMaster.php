<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task='loadDeduction';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        global $conn;
    switch($task){
		case "loadDeduction":
		getDeduction();
		break;



	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getDeduction()
    {
        global $conn;

        $sql = "select pdedu_code,pdedu_name from pdedu_mas order by pdedu_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
	
 

?>
