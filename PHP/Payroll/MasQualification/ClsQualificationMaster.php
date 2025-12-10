<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task='loadQualification';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        global $conn;
    switch($task){
		case "loadQualification":
		getQualification();
		break;



	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getQualification()
    {
        global $conn;

        $sql = "select qualification_code,qualification_name from mas_qualification order by qualification_code";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
	
 

?>
