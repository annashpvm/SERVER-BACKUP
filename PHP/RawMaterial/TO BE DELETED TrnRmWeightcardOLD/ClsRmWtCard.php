<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadwtcardno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadsupplier":
		getsupplier();
		break;
		case "loadarea":
		getarea();
		break;
		case "loadsupervisor":
		getsupervisor();
		break;
		case "loadwtcardno":
		getwtcardno();
		break;
		case "loadSearchitemlist":
		getSearchitemlist();
		break;
		case "loadWBSlNoList":
		getWBSlNoList();
		break;
	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getsupplier()
    {
        mysqli_set_charset($conn, "utf8");
	$sql = "select sup_code,sup_refname from maspur_supplier_master where sup_acc_group = 78 order by sup_refname");
	$sql = "select sup_code,sup_refname from maspur_supplier_master order by sup_refname");
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
        $sql = "select area_code,area_name from mas_area");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getsupervisor()
    {
        mysqli_set_charset($conn, "utf8");
        $sql = "select spvr_code,spvr_name from mas_supervisor");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getwtcardno()
    {
        mysqli_set_charset($conn, "utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$wtno = $_POST['wtno'];
	$gstFlag = $_POST['gstFlag'];
	if ($gstFlag === "Add") {
	        $sql = "select ifnull(max(wc_no),0)+1 as wc_no from trn_weightcard where wc_fincode = '$finid' And wc_compcode ='$compcode' ");
	}
	else {

	        $sql = "call sp_sel_weightcard ('$compcode','$finid','$wtno')");
	}
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getWBSlNoList()
    {
        mysqli_set_charset($conn, "utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
        $sql = "select wc_no,wc_seqno from trn_weightcard where wc_fincode = '$finid' And wc_compcode ='$compcode' order by wc_no ");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getSearchitemlist()
    {
        mysqli_set_charset($conn, "utf8");
//        $sql = "select hsn_code,hsn_sno from mas_hsncode order by hsn_code");

	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $party     = $_POST['party'];
        $qry = "select * from maspur_supplier_master where sup_name like '%$party%' order by sup_name";
        $r=mysqli_query($conn, $qry);
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
?>
