<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loaditem';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loaditem":
		getitem();
		break;
		case "loadparty":
		getparty();
		break;
		case "loadchkrate":
		getchkrate();
		break;
		case "loadlot":
		getlot();
		break;
		case "loadStockList":
		getStockList();
		break;
	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
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
    
   
 function getitem()
    {
        mysql_query("SET NAMES utf8");
	$p_itemtype = $_POST['itemtype'];
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        //$r=mysql_query("call spfu_sel_itemdetails ('$p_itemtype')");
	$r=mysql_query("call sprm_sel_itemdetails(-1)");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
	
 function getparty()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("call sp_pur_supplier_actgrp (53)");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getchkrate()
    {
        mysql_query("SET NAMES utf8");
	$itemcode = $_POST['itemcode'];
	$lotcode = $_POST['lotcode'];
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];

        $r=mysql_query("call spfu_sel_lotitem_stock('$compcode','$finid','$lotcode','$itemcode')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getStockList()
    {
        mysql_query("SET NAMES utf8");

	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];

        $r=mysql_query("select itmh_name,itmh_code,itmt_opqty,itmt_opvalue, case when itmt_opvalue > 0 then itmt_opvalue/itmt_opqty else 0 end as avgrate from masrm_item_header , masrm_item_trailer where itmh_code = itmt_hdcode and itmt_compcode= $compcode and itmt_fincode = $finid and (itmt_opqty >0 or  itmt_opvalue > 0) order by itmh_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
?>
