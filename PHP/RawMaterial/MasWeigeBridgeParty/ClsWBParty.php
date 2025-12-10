<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadledger';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){


             	case "loadWBPartyList":
		getWBPartyList();
		break;

             	case "loadGroupList":
		getGroupList();
		break;

             	case "loadSearchPartyList":
		getSearchPartyList();
		break;


	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }


 function getWBPartyList()
    {
        global $conn;  
       	$grpcode = $_POST['grpcode'];
	$sql = "select * from mas_wb_party where party_code >0 order BY party_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	


 function getGroupList()
    {
        global $conn;  
       	$grpcode = $_POST['grpcode'];
	$sql = "select * from  mas_wb_itemgroup";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	

 function getSearchPartyList()
    {
        global $conn;  
       	$iname = $_POST['iname'];
	$sql = "select * from  mas_wb_party  where party_name like '%$iname%'";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
?>
