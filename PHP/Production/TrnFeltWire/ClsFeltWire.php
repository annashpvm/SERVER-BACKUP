<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task='loadFeltWireEntryNo';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadFeltWireEntryNo":
		getFeltWireEntryNo();
		break;


		case "loadFeltWireEntryList":
		getFeltWireEntryList();
		break;

		case "loadFeltWireEntryDetail":
		getFeltWireEntryDetail();
		break;



	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getFeltWireEntryNo()
    {
        
global $conn;
	$finid = $_POST['fincode'];
	$compcode = $_POST['compcode'];
        $sql = "select ifnull(max(fw_seqno),0)+1 as fw_seqno from trn_dayprod_feltwire where fw_compcode= $compcode";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
 function getFeltWireEntryList()
    {
   
global $conn;
	$finid = $_POST['fincode'];
	$compcode = $_POST['compcode'];
        $sql = "select fw_seqno from trn_dayprod_feltwire where fw_compcode= $compcode order by fw_seqno desc" ;
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	 



 function getFeltWireEntryDetail()
    {
    
    global $conn;
	$finid    = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$entryno  = $_POST['entryno'];
        $sql = "select * from trn_dayprod_feltwire where fw_compcode= $compcode and  fw_seqno = $entryno" ;
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	 


?>

