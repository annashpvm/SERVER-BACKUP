<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loaditemgrp';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){

		case "loadunit":
		getunit();
		break;
		case "loadhsn":
		gethsn();
		break;

		case "loadItemDetails":
		getItemDetails();
		break;
		case "loadsgstled":
		getsgstledger();
		break;
		case "loadigstled":
		getigstledger();
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
    

	
 function getunit()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select uom_name,uom_code  from mas_uom order by uom_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function gethsn()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select hsn_code,hsn_sno from mas_hsncode order by hsn_code");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getItemDetails()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select * from mas_item_master, mas_uom , mas_hsncode  where item_uom =  uom_code  and hsn_sno  = item_hsncode  order by  item_name");

        $r=mysql_query("select * from mas_item_master, mas_uom where item_uom =  uom_code order by  item_name");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

?>
