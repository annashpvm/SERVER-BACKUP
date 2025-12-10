<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadissno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
    		case "loadprodvargrp":
		getloadprodvargrp();
		break;
    		case "loaddownvargrp":
		getloadprodvargrp();
		break;		
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
		case "loadissdetail":
		getissdetail();
		break;
		default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
 function getloadprodvargrp()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['finid'];
	$tdate = $_POST['tdate'];
	
	
	$sql = "select mis_batchvariety from trn_mis_mc_dailyprodn a , mas_mis_variety_batch_group b where t_compcode in (1,2,3,4) and t_fincode = '$finid'  and t_date = '$tdate' and mis_batchcode = t_dip_batch group by mis_batchvariety");
	
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }  

 function getloaddownvargrp()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['finid'];
	$tdate = $_POST['tdate'];
	
	
	$sql = "select * from mas_mis_downtime  order by mis_downtimename");
	
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 
     
 function getvariety()
    {
        mysqli_set_charset($conn, "utf8");
	$compcode = $_POST['compcode'];
	if($compcode="1")
	{
	$sql = "select mis_var_grpcode,mis_var_grp_sname from mas_mis_prodvariety_group where mis_dpm1='Y'order by mis_var_grp_sname");
	}
	else if($compcode="2")
	{
	$sql = "select mis_var_grpcode,mis_var_grp_sname from mas_mis_prodvariety_group where mis_slpb='Y'order by mis_var_grp_sname");
	}
	else if($compcode="3")
	{
	$sql = "select mis_var_grpcode,mis_var_grp_sname from mas_mis_prodvariety_group where mis_dpm2='Y'order by mis_var_grp_sname");
	}
	else if($compcode="4")
	{
	$sql = "select mis_var_grpcode,mis_var_grp_sname from mas_mis_prodvariety_group where mis_vjpm='Y'order by mis_var_grp_sname");
	}
	else
	{
	$sql = "select mis_var_grpcode,mis_var_grp_sname from mas_mis_prodvariety_group order by mis_var_grp_sname");
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
	$issdate = $_POST['issdate'];
	$machine = $_POST['machine'];
	$mcode = $_POST['mcode'];
	$qrytype = $_POST['qrytype'];
	
	if ($qrytype="frmload")
	{
		if($compcode="1")
		{
		$sql = "select mis_batchcode,mis_batchvariety from mas_mis_variety_batch_group where mis_dpm1='Y' order by mis_batchvariety");
		}
		else if($compcode="2")
		{
		$sql = "select mis_batchcode,mis_batchvariety from mas_mis_variety_batch_group where mis_slpb='Y' order by mis_batchvariety");;
		}
		else if($compcode="3")
		{
		$sql = "select mis_batchcode,mis_batchvariety from mas_mis_variety_batch_group where mis_dpm2='Y' order by mis_batchvariety");
		}
		else if($compcode="4")
		{
		$sql = "select mis_batchcode,mis_batchvariety from mas_mis_variety_batch_group  where mis_vjpm='Y' order by mis_batchvariety");
		}
		else
		{
		$sql = "select mis_batchcode,mis_batchvariety from mas_mis_variety_batch_group order by mis_batchvariety");
		}
	}
	else if ($qrytype="afmc")
	{
		if($machine=1)
		{
		$sql = "select * from trn_mis_dip_daily_prod where d_compcode= '$mcode' and d_date='$issdate' and d_fincode='$finid'");
		}
		else 
		{
		$sql = "select * from trn_mis_mc_dailyprodn where t_compcode= '$mcode' and t_date='$issdate' and t_fincode='$finid'");
		}
	}

	/*if($machine="DIP")
	{
	$sql = "select d_variety as batch from trn_mis_dip_daily_prod where d_compcode=$compcode and d_fincode=$finid and d_date='$date' union select 'test' as batch");
	}
	else
	{
	$sql = "select t_variety as batch from trn_mis_mc_dailyprodn where t_compcode=$compcode and t_fincode=$finid and t_date='$date'  union select 'test1' as batch");
	}*/



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
	$compcode = $_POST['compcode'];
	$fincode = $_POST['fincode'];
        $sql = "call sprm_sel_item_details_new ('$compcode','$fincode') ");
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
	$finid = $_POST['finid'];
	$lotcode = $_POST['lotcode'];
        $sql = "call sprm_sel_itemlotdetails($compcode,$finid,$itemcode,$lotcode)");
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
	$finid = $_POST['finid'];
        $sql = "call sprm_sel_itemlotdetails1($compcode,$itemcode)");
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
	$AEDFlag = $_POST['AEDFlag'];
	
	if ($AEDFlag === "Add")
	{

		$sql = "select ifnull(max(issh_no),0) + 1 as issno from trnrm_issue_header where issh_compcode='$compcode' and issh_fincode='$finid'");
	}
	else if ($AEDFlag === "Edit")
	{
		$sql = "select issh_no,issh_seqno from trnrm_issue_header where issh_compcode=$compcode and issh_fincode=$finid");
	}
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
function getissdetail()
    {
        mysqli_set_charset($conn, "utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$issno = $_POST['issno'];
	$AEDFlag = $_POST['AEDFlag'];
	

		$sql = "call sprm_sel_issue ('$compcode','$finid','$issno')");

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
?>
