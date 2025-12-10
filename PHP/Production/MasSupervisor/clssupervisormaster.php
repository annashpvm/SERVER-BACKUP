<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task='loadsupervisor';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadsupervisor":
		spvrmain();
		break;



	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function spvrmain()
    {
        global $conn;

        $sql = "select spvr_code, spvr_name,spvr_type,case when spvr_type='M' then 'MACHINE OPERATOR'
 when spvr_type='S' then 'SHIFT INCHARGE'  when spvr_type='R' then 'REWINDER OPERATOR'end as stype
 from mas_supervisor order by spvr_code";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
	
 

?>
