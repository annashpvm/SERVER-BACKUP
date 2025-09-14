<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadLotList';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadAreaList":
		getAreaList();
		break;
		case "loadAreaGroup":
		getAreaGroup();
		break;

		case "loadAreaRepGroupList":
	        getAreaRepGroupList();
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
    
   
 function getAreaList()
    {
        mysql_query("SET NAMES utf8");
    //    $r=mysql_query("select area_name,area_code , areagrp_code, areagrp_name from mas_area , mas_areagroup  where area_grpcode  =  areagrp_code order by area_name asc");

        $r=mysql_query("select area_name,area_code , areagrp_code, areagrp_name , mas_area_repgrp_code, mas_area_repgrp_name from mas_area , mas_areagroup , mas_area_report_group  where area_report_group = mas_area_repgrp_code and area_grpcode  =  areagrp_code order by area_name asc");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
   
 function getAreaGroup()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select * from  mas_areagroup order by areagrp_name asc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	

 function getAreaRepGroupList()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select mas_area_repgrp_code, mas_area_repgrp_name from mas_area_report_group order by mas_area_repgrp_name asc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	
?>
