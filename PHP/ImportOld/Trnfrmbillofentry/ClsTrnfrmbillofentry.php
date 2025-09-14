<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConndpm.php");

    $task='loaditemgrp';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
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
        if (version_compare(PHP_VERSION,"5.2","<"))
        {    
            require_once("./JSON.php");   //if php<5.2 need JSON class
            $json = new Services_JSON();  //instantiate new json object
            $data=$json->encode($arr);    //encode the data in json format
        } else
        {
            $data = json_encode($arr);    //encode the data in json format
        }
        return $data;
    }
    
   
 function getvariety()
    {
        mysql_query("SET NAMES utf8");
	$machine = $_POST['machine'];
	
	if($machine="PM1")
	{
	$r=mysql_query("select mis_var_grpcode,mis_var_grp_sname from mas_mis_prodvariety_group where mis_dpm1='Y'");
	}
	else if($machine="PM3")
	{
	$r=mysql_query("select mis_var_grpcode,mis_var_grp_sname from mas_mis_prodvariety_group where mis_slpb='Y'");
	}
	else if($machine="PM2")
	{
	$r=mysql_query("select mis_var_grpcode,mis_var_grp_sname from mas_mis_prodvariety_group where mis_dpm2='Y'");
	}
	else if($machine="VJPM")
	{
	$r=mysql_query("select mis_var_grpcode,mis_var_grp_sname from mas_mis_prodvariety_group where mis_vjpm='Y'");
	}
	else
	{
	$r=mysql_query("select mis_var_grpcode,mis_var_grp_sname from mas_mis_prodvariety_group");
	}
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
function getbatch()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$date = $_POST['date'];
	$machine = $_POST['machine'];
	/*if($machine="DIP")
	{
	$r=mysql_query("select d_variety as batch from trn_mis_dip_daily_prod where d_compcode=$compcode and d_fincode=$finid and d_date='$date' union select 'test' as batch");
	}
	else
	{
	$r=mysql_query("select t_variety as batch from trn_mis_mc_dailyprodn where t_compcode=$compcode and t_fincode=$finid and t_date='$date'  union select 'test1' as batch");
	}*/
	if($machine="PM1")
	{
	$r=mysql_query("select mis_batchcode,mis_batchvariety from mas_mis_variety_batch_group where mis_dpm1='Y'");
	}
	else if($machine="PM3")
	{
	$r=mysql_query("select mis_batchcode,mis_batchvariety from mas_mis_variety_batch_group where mis_slpb='Y'");
	}
	else if($machine="PM2")
	{
	$r=mysql_query("select mis_batchcode,mis_batchvariety from mas_mis_variety_batch_group where mis_dpm2='Y'");
	}
	else if($machine="VJPM")
	{
	$r=mysql_query("select mis_batchcode,mis_batchvariety from mas_mis_variety_batch_group  where mis_vjpm='Y'");
	}
	else
	{
	$r=mysql_query("select mis_batchcode,mis_batchvariety from mas_mis_variety_batch_group ");
	}
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

	
 function getitem()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select itmh_code,itmh_name from masrm_item_header");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getlotdet()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$itemcode = $_POST['itemcode'];
        $r=mysql_query("call sprm_sel_itemlotdetails($compcode,$itemcode)");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getlotitemdet()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$itemcode = $_POST['itemcode'];
	$fincode = $_POST['fincode'];
        $r=mysql_query("call sprm_sel_itemlotstkdetails($compcode,$fincode,$itemcode)");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getissno()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['fincode'];
        $r=mysql_query("select ifnull(max(issh_no),0) + 1 as issno from trnrm_issue_header where issh_compcode=$compcode and issh_fincode=$finid");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
?>
