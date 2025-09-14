<?php
   require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadOpeningitems';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){

		case "loadOpeningitems":
		getOpeningitems();
		break;


		case "loadSubGroup":
		getSubGroup();
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
    
function getOpeningitems()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$grpcode  = $_POST['grpcode'];

	$r=mysql_query("select item_name,uom_short_name, head.item_code, item_stock,  round(item_stock*item_avg_rate,2) opvalue, item_avg_rate  from maspur_item_header head,maspur_item_trailer trail ,mas_uom uom  where  uom.uom_code = head.item_uom and head.item_code = trail.item_code and trail.item_comp_code = $compcode  and trail.item_fin_code = $finid and  head.item_group_code = $grpcode and item_stock > 0");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


function getSubGroup()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$grpcode  = $_POST['grpcode'];

	$r=mysql_query("select * from maspur_subgroup order by subgrp_name");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
?>
