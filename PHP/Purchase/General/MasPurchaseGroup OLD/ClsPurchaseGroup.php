<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadledger';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadledger":
		getledger();
		break;
		case "loadreportgrp":
		getreportgroup();
		break;
		case "loadPurGroup":
		getPurGroup();
		break;

	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getledger()
    {
        mysqli_set_charset($conn, "utf8");
	$sql = "select led_code,led_name from acc_ledger_master");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
 function getreportgroup()
    {
        mysqli_set_charset($conn, "utf8");
	$sql = "select rep_grp_code,rep_grp_name from maspur_report_group");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }	
  function getPurGroup()
    {
        mysqli_set_charset($conn, "utf8");
	$sql = "select a.*, tn.led_name grp_tn_ledname,os.led_name grp_os_ledname,imp.led_name grp_imp_ledname  from maspur_group a , acc_ledger_master tn, acc_ledger_master os , acc_ledger_master imp where  grp_tn_ledcode = tn.led_code and  grp_os_ledcode = os.led_code and grp_imp_ledcode = imp.led_code order by grp_name

");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }	

?>
