<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loaditem';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loaditem":
		getitem();
		break;
		case "loadparty":
		getparty();
		break;
		case "loadchkrate":
		getchkrate();
		break;
		case "loadarea":
		getarea();
		break;
	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }


    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getitem()
    {
        mysqli_set_charset($conn, "utf8");
	$p_itemtype = $_POST['itemtype'];
        //$sql = "call spfu_sel_itemdetails ('$p_itemtype')");
	$sql = "call sprm_sel_itemdetails ('-1')");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
	
 function getparty()
    {
        mysqli_set_charset($conn, "utf8");
        $sql = "call sp_pur_sup");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
function getarea()
{
        mysqli_set_charset($conn, "utf8");
	$sql = "select area_name,area_code from mas_area order by area_name asc");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 function getchkrate()
    {
        mysqli_set_charset($conn, "utf8");
	$itemcode = $_POST['itemcode'];
	$partycode = $_POST['partycode'];
	$areacode = $_POST['areacode'];

        $sql = "call sp_sel_tonfreight ('$partycode','$areacode','$itemcode',1)");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

?>
