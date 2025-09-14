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
		case "LoadItem":
		getitem();
		break;
		case "loadlot":
		getlot();
		break;
		case "loadlotdet":
		getlotdetails();
		break;
		case "loadsalenoteno":
		getsalesnoteno();
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
	$r=mysql_query("select sup_code,sup_refname from maspur_supplier_master");
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

function getlot()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select lot_code,lot_refno from mas_lot");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getlotdetails()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$fincode = $_POST['fincode'];
	$lotno = $_POST['lotno'];
        $r=mysql_query("call sprm_sel_stkitemdetails($compcode,$fincode,$lotno)");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getsalesnoteno()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$fincode = $_POST['fincode'];
        $r=mysql_query("select ifnull(max(salh_no),0)+1 as salenote_no from trnrm_salenote_header where salh_compcode=$compcode and salh_fincode=$fincode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
?>
