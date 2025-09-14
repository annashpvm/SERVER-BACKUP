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

		case "loadStockList":
		getStockList();
		break;

		case "loadSearchitemlist":
		getSearchitemlist();
		break;

		case "loadunit":
		getunit();
		break;


		case "loadLocation":
		getLocation();
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
	$r=mysql_query("call spfu_sel_itemdetails");
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


        $r=mysql_query("select * from maspur_item_header h, maspur_item_trailer t ,mas_uom u  where item_uom = uom_code and h.item_code = t.item_code and  item_comp_code = $compcode and item_fin_code = $finid and (item_yr_opval > 0 or item_yr_opqty > 0) order by item_name;");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getSearchitemlist()
    {
        mysql_query("SET NAMES utf8");
//        $r=mysql_query("select hsn_code,hsn_sno from mas_hsncode order by hsn_code");

	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $item     = $_POST['item'];


//        $qry = "select * from maspur_item_header where item_name like '%$item%'";
        $item = trim(str_replace(" ", "", $item)); 
        $item = trim(str_replace(".", "", $item));


        if ($item == '')   
           $qry = "select * from maspur_item_header  order by item_name";
        else
           $qry = "select * from maspur_item_header where replace(replace(item_name,' ','')  ,'.','') like '%$item%' order by item_name";         

        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getunit()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select uom_name,uom_code  from mas_uom where uom_name not like 'ZZ%' and (uom_code <=103 or uom_code >136)order by uom_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getLocation()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select * from maspur_location");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


?>
