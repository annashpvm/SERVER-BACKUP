<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task='loadVarMainGroup';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadVarMainGroup":
		getVarMainGroup();
		break;

		case "loadVarietydetails":
		getVarietydetails();
		break;
		case "viewquality":
		getquality();
		break;

		case "loadhsnlist":
		gethsnlist();
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
    
   
 function getVarMainGroup()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select vargrp_type_code,vargrp_type_name from masprd_type order by vargrp_type_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
	
function getQuality()
    {
        mysql_query("SET NAMES utf8");
	$qcode = $_POST['qcode'];

        $r=mysql_query("select vargrp_type_code,vargrp_type_name,vargrp_type_short_code from masprd_type  where vargrp_type_code = $qcode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
function getVarietydetails()
    {
        mysql_query("SET NAMES utf8");
	$qcode = $_POST['qcode'];

        $r=mysql_query("select var_groupcode, var_desc, var_typecode, var_bf, var_gsm, vargrp_type_code, vargrp_type_name, vargrp_type_short_code, vargrp_type_hsncode from masprd_variety a, masprd_type b where  a.var_typecode = b.vargrp_type_code order by var_desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 function gethsnlist()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select tariff_code,tariff_name from massal_tariff ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

?>
