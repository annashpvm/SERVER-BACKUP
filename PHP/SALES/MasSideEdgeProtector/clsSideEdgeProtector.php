<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadledger';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadledger":
		getledger();
		break;
		case "loadreportgrp":
		getreportgroup();
		break;
		case "loadSideEdgeList":
		getSideEdgeList();
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
    
   
 function getledger()
    {
        mysql_query("SET NAMES utf8");
	$r=mysql_query("select led_code,led_name from acc_ledger_master");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
 function getreportgroup()
    {
        mysql_query("SET NAMES utf8");
	$r=mysql_query("select rep_grp_code,rep_grp_name from maspur_report_group");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	
  function getSideEdgeList()
    {

	$r=mysql_query("SELECT *  FROM   massal_customer WHERE cust_addnlwt = 'Y'");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	

?>
