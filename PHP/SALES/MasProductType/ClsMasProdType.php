<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task='loadProdGroup';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadProdGroup":
		getVarMainGroup();
		break;

		case "loadhsnlist":
		gethsnlist();
		break;

		case "loadTNLedgers":
		getTNLedgers();
		break;

		case "loadOSLedgers":
		getOSLedgers();
		break;
		case "loadSEZLedgers":
		getSEZLedgers();
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

//        $r=mysql_query("select a.*,b.cust_name tnledname,c.cust_name osledname  from masprd_type a, massal_customer b , massal_customer c  where a.tn_sales_ledcode = b.cust_code and a.os_sales_ledcode = c.cust_code order by vargrp_type_name");

        $r=mysql_query("select a.*,b.cust_name tnledname,c.cust_name osledname ,d.cust_name sezledname from masprd_type a, massal_customer b , massal_customer c, massal_customer d  where a.tn_sales_ledcode = b.cust_code and a.os_sales_ledcode = c.cust_code   and a.sez_sales_ledcode = d.cust_code order by vargrp_type_name");

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


	
 function getTNLedgers()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select * from massal_customer where cust_name like 'GST SAL%' order by cust_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getOSLedgers()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select * from massal_customer where cust_name like 'IGST SAL%' order by cust_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getSEZLedgers()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select * from massal_customer where cust_name like 'EXPORT SALES TO%' order by cust_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

?>
