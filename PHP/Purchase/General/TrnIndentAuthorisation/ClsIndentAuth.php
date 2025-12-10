<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadindentdet';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadDept":
		getDept();
		break;
		case "loadindentdet":
		getindentdetail();
		break;
	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getindentdetail()
    {
        global $conn;  

	$compcode = $_POST['compcode'];
	$fincode  = $_POST['fincode'];
	$deptcode = $_POST['dept'];

        $sql = "call sppur_dept_indent('$compcode','$fincode','$deptcode')";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
 function getDept()
    {
        global $conn;  
        $sql = "call sp_sel_dept_new()";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }	
 
?>
