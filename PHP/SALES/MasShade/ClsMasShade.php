<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task='loadShadeDetails';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");

    switch($task){
		case "loadShadeDetails":
		getShadeDetails();
		break;


	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getShadeDetails()
    {
    global $conn;  

   $sql = "select shade_code, shade_fullname, shade_shortname, shade_shortcode from massal_shade order by shade_fullname";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
	

?>
