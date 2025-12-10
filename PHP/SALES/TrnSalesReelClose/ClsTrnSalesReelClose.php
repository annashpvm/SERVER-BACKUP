<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadSONo';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysqli_set_charset($conn, "utf8");

    switch($task){

		case "loadSONo":
		getSONo();
		break;
		case "loadReelNo":
		getReelNo();
		break;
		case "loadWeight":
		getWeight();
		break;
		default:
        	echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
    }

    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    

function getSONo()
{
 global $conn;  
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $sql = "select stk_sono from trnsal_finish_stock where stk_comp_code =  1 and stk_destag = '' group by stk_sono order by stk_sono asc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
}

function getReelNo()
{
 global $conn;  
	$sono = $_POST['sono'];
	$compcode = $_POST['compcode'];
        $sql = "select stk_sr_no from trnsal_finish_stock where stk_comp_code =  1  and stk_destag = '' and stk_sono = '$sono' order by stk_sr_no asc";

        $sql = "select stk_sr_no from trnsal_finish_stock where stk_comp_code =  1  and stk_destag = ''  order by stk_sr_no asc";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
}


function getWeight()
{
 global $conn;  
	$sono = $_POST['sono'];
	$reelno = $_POST['reelno'];
        $sql = "select stk_wt from trnsal_finish_stock where stk_comp_code =  1  and stk_destag = '' and stk_sono = '$sono'  and stk_sr_no = '$reelno' ";

        $sql = "select  stk_sono, stk_wt from trnsal_finish_stock where stk_comp_code =  1  and stk_destag = '' and stk_sr_no = '$reelno' ";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
}



?>
