<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task="loadArrivals";

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		

		case "loadMainGroupStockAbstract":
                getMainGroupStockAbstract();
		break;


		case "loadSubGroupStockAbstract":
                getSubGroupStockAbstract();
		break;

		case "loadSubGroupStockItemList":
                getSubGroupStockItemList();
		break;

		case "loadItemwiseStockSummary":
                getItemwiseStockSummary();
		break;

		case "loadItem_ledger_trans":
                getItem_ledger_trans();
		break;


	        default:
		break;
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
    


function getMainGroupStockAbstract()
    {
        mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];



        $r=mysql_query("call spst_rep_stock_groupsummary($compcode ,'$finid', '$startdate','$enddate')");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



function getSubGroupStockAbstract()
    {
        mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$grpcode    = $_POST['grpcode'];
	$allitems    = $_POST['allitems'];


        $r=mysql_query("call spst_rep_stores_stock_SUBgroupsummary($compcode ,'$finid', '$grpcode', $allitems )");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



function getSubGroupStockItemList()
    {
        mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$grpcode    = $_POST['grpcode'];
	$rtype       = $_POST['rtype'];
        if ($rtype  == 'GS')
            $r=mysql_query("call spst_rep_stores_stock_subgrp_Itemwise($compcode ,'$finid', '$grpcode' )");
        else
            $r=mysql_query("call sprm_stock_abstract($compcode ,$finid,'$startdate' ,'$enddate',1) ");



	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getItemwiseStock()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];

	$startdate = $_POST['startdate'];
        $enddate  = $_POST['enddate'];

  
        $r=mysql_query("call sprm_stock_abstract_New($compcode ,$finid,'$startdate' ,'$enddate',1) ");
	


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getItemwiseStockSummary()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$finstartdate = $_POST['finstartdate'];
	$startdate = $_POST['startdate'];
        $enddate  = $_POST['enddate'];
        $reptype  = $_POST['reptype'];
  
        if ($reptype  == 'WP')
           $r=mysql_query("call sprm_stock_abstract($compcode ,$finid,'$startdate' ,'$enddate',1) ");
        else
        $r=mysql_query("call spfu_op_trans($compcode ,$finid,'$finstartdate','$startdate', '$startdate' ,'$enddate',1) ");
	
	


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getItem_ledger_trans()
    {
        mysql_query("SET NAMES utf8");

	$itemcode  = $_POST['itemcode'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
        $enddate   = $_POST['enddate'];
        $reptype  = $_POST['reptype'];
  
        if ($reptype  == 'WP')
            $r=mysql_query("call sprm_rep_item_ledger($compcode,'$startdate' ,'$enddate','$itemcode') ");
        else
            $r=mysql_query("call spfu_rep_item_ledger($compcode,'$startdate' ,'$enddate','$itemcode') ");   
	


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
?>




