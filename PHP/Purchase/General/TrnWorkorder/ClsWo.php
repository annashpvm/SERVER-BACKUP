<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loaditemgrp';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadsupplier":
		getsupplier();
		break;
		case "loaddept":
		getdept();
		break;
		case "loadwo":
		getworkorder();
		break;
		case "loaditem":
		getitem();
		break;
		case "loadpayterm":
		getpayterms();
		break;
		case "loadwono":
		getwono();
		break;
		case "loadwonolist":
		getwonolist();
		break;
		case "loadwonodetails":
		getwonodetails();
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
    
   
 function getsupplier()
    {
        mysql_query("SET NAMES utf8");
	$r=mysql_query("call sp_pur_sup()");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
	
 function getdept()
    {
        mysql_query("SET NAMES utf8");
	$vendor = $_POST['Vendorcode'];
        $r=mysql_query("call sp_sel_dept()");
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
        $r=mysql_query("select * from  mas_item_master order by item_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getworkorder()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select * from mas_workorder  order by wo_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getpayterms()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select term_code,term_name from mas_terms");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getwono()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
        $r=mysql_query("select ifnull(max(woh_no),0)+1 as wono from trnpur_workorder_header where woh_comp_code=$compcode and woh_fin_code=$finid");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getwonolist()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
        $r=mysql_query("select woh_no from trnpur_workorder_header where woh_comp_code=$compcode and woh_fin_code=$finid order by woh_no desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getwonodetails()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$wono  = $_POST['wono'];
        $r=mysql_query("select * from trnpur_workorder_header a,  trnpur_workorder_trailer b,maspur_supplier_master c ,mas_item_master d ,mas_workorder e where woh_seqno = wot_hdseqno and woh_sup_code = sup_code and woh_wocode =wo_no and wot_itemcode = item_code and woh_comp_code = $compcode  and  woh_fin_code = $finid and woh_no =$wono  order by wot_slno");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

?>
