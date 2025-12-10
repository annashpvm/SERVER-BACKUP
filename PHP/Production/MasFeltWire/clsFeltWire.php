<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task='loadFeltWire';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadFeltWire":
		getFeltWire();
		break;



	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getFeltWire()
    {
        global $conn;

        $sql = "select fw_code,fw_name ,case when fw_type = 'W' then 'WIRE' when fw_type = 'F' then 'FELT' else 'SCREENS' end as fw_type from masprd_feltwire order by fw_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
	
 

?>
