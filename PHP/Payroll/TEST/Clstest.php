<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task='loadReligion';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
                case "loadProdGroup":
		getVarMainGroup();
		break;
		case "loadReligion":
		getReligion();
		break;
		case "loadCommunity":
		getCommunity();
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
    
   
 function getReligion()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select religion_code,religion_name from mas_religion order by religion_code");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	
function getCommunity()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select comm_code,comm_name from mas_community order by comm_code");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
function getVarMainGroup()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select vargrp_type_code,vargrp_type_name, vargrp_type_short_code, vargrp_type_hsncode from masprd_type order by vargrp_type_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
?>
