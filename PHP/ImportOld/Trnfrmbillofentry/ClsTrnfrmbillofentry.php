<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConndpm.php");

    $task='loaditemgrp';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadvariety":
		getvariety();
		break;
		case "loadbatch":
		getbatch();
		break;
		case "LoadItem":
		getitem();
		break;
		case "loadlot":
		getlotdet();
		break;
		case "loadlotitem":
		getlotitemdet();
		break;
		case "loadissno":
		getissno();
		break;
		default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getvariety()
    {
        mysqli_set_charset($conn, "utf8");
	$machine = $_POST['machine'];
	
	if($machine="PM1")
	{
	$sql = "select mis_var_grpcode,mis_var_grp_sname from mas_mis_prodvariety_group where mis_dpm1='Y'");
	}
	else if($machine="PM3")
	{
	$sql = "select mis_var_grpcode,mis_var_grp_sname from mas_mis_prodvariety_group where mis_slpb='Y'");
	}
	else if($machine="PM2")
	{
	$sql = "select mis_var_grpcode,mis_var_grp_sname from mas_mis_prodvariety_group where mis_dpm2='Y'");
	}
	else if($machine="VJPM")
	{
	$sql = "select mis_var_grpcode,mis_var_grp_sname from mas_mis_prodvariety_group where mis_vjpm='Y'");
	}
	else
	{
	$sql = "select mis_var_grpcode,mis_var_grp_sname from mas_mis_prodvariety_group");
	}
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
function getbatch()
    {
        mysqli_set_charset($conn, "utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$date = $_POST['date'];
	$machine = $_POST['machine'];
	/*if($machine="DIP")
	{
	$sql = "select d_variety as batch from trn_mis_dip_daily_prod where d_compcode=$compcode and d_fincode=$finid and d_date='$date' union select 'test' as batch");
	}
	else
	{
	$sql = "select t_variety as batch from trn_mis_mc_dailyprodn where t_compcode=$compcode and t_fincode=$finid and t_date='$date'  union select 'test1' as batch");
	}*/
	if($machine="PM1")
	{
	$sql = "select mis_batchcode,mis_batchvariety from mas_mis_variety_batch_group where mis_dpm1='Y'");
	}
	else if($machine="PM3")
	{
	$sql = "select mis_batchcode,mis_batchvariety from mas_mis_variety_batch_group where mis_slpb='Y'");
	}
	else if($machine="PM2")
	{
	$sql = "select mis_batchcode,mis_batchvariety from mas_mis_variety_batch_group where mis_dpm2='Y'");
	}
	else if($machine="VJPM")
	{
	$sql = "select mis_batchcode,mis_batchvariety from mas_mis_variety_batch_group  where mis_vjpm='Y'");
	}
	else
	{
	$sql = "select mis_batchcode,mis_batchvariety from mas_mis_variety_batch_group ");
	}
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

	
 function getitem()
    {
        mysqli_set_charset($conn, "utf8");
        $sql = "select itmh_code,itmh_name from masrm_item_header");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getlotdet()
    {
        mysqli_set_charset($conn, "utf8");
	$compcode = $_POST['compcode'];
	$itemcode = $_POST['itemcode'];
        $sql = "call sprm_sel_itemlotdetails($compcode,$itemcode)");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getlotitemdet()
    {
        mysqli_set_charset($conn, "utf8");
	$compcode = $_POST['compcode'];
	$itemcode = $_POST['itemcode'];
	$fincode = $_POST['fincode'];
        $sql = "call sprm_sel_itemlotstkdetails($compcode,$fincode,$itemcode)");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getissno()
    {
        mysqli_set_charset($conn, "utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['fincode'];
        $sql = "select ifnull(max(issh_no),0) + 1 as issno from trnrm_issue_header where issh_compcode=$compcode and issh_fincode=$finid");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
?>
