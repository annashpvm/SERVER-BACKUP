<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loaditemgrp';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadvariety":
		getvariety();
		break;
		case "LoadItem":
		getitem();
		break;
		case "loadlot":
		getlot();
		break;
		case "loadissretno":
		getissretno();
		break;
		case "loaditemdet":
		getitemdet();
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
	$r=mysql_query("call sprm_sel_prodvariety");
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
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
        $r=mysql_query("call sprm_sel_item_details ('$compcode','$finid') ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getitemdet()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
        $r=mysql_query("call sprm_sel_item_details1 ('$compcode','$finid') ");
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
        $r=mysql_query("call sp_sel_lot");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getissretno()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['fincode'];
	$gstflag = $_POST['gstflag'];
	if ($gstflag == "Add") {
		$r=mysql_query("select ifnull(max(isrh_no),0) + 1 as issretno from trnrm_issret_header where isrh_compcode='$compcode' and isrh_fincode='$finid'");
	}
	else if ($gstflag == "Edit") {
		$r=mysql_query("select isrh_no as issretno from trnrm_issret_header where isrh_compcode='$compcode' and isrh_fincode='$finid'");
		
	}
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
?>
