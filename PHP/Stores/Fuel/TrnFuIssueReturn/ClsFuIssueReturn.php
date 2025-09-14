<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loaditemgrp';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){

		case "LoadItem":
		getitem();
		break;
		case "loadlot":
		getlot();
		break;
		case "loadissretno":
		getissretno();
		break;
		case "loaditemdet":
		getitemdet();
		break;
             	case "loadSearchItemlist":
		getSearchItemlist();
		break;
		case "loadItemStock":
		getitemStock();
		break;
		case "loadissRetdetail":
		getissRetdetail();
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
    
   

	
 function getitem()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
        $r=mysql_query("call spfu_sel_item_details ('$compcode','$finid') ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getitemdet()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
        $r=mysql_query("call spfu_sel_item_details1 ('$compcode','$finid') ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
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

function getissretno()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['fincode'];
	$gstflag = $_POST['gstflag'];


	if ($gstflag == "Add") {
		$r=mysql_query("select ifnull(max(isrh_no),0) + 1 as issretno from trnfu_issret_header where isrh_compcode='$compcode' and isrh_fincode='$finid'");
	}
	else if ($gstflag == "Edit") {
		$r=mysql_query("select * from trnfu_issret_header where isrh_compcode='$compcode' and isrh_fincode='$finid'");
		
	}
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }





 function getSearchItemlist()
    {
        mysql_query("SET NAMES utf8");
        $itemname = trim(strtoupper($_POST['itemname']));

        if ($itemname == '') 
            $qry = "select * from masfu_item_header  order by itmh_name";
        else
            $qry = "select * from masfu_item_header where itmh_name like '%$itemname%' order by itmh_name";



        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getitemStock()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$itemcode = $_POST['itemcode'];
	$finid = $_POST['finid'];


//        $r=mysql_query("call spfu_sel_itemlotdetails($compcode,$finid,$itemcode,$lotcode)");
	$r=mysql_query("select * from masfu_item_trailer where itmt_compcode = $compcode and itmt_fincode = $finid  and itmt_hdcode = $itemcode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getissRetdetail()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$issno = $_POST['issno'];
	$AEDFlag = $_POST['AEDFlag'];
	

	$r=mysql_query("select * from trnfu_issret_header , trnfu_issret_trailer , masfu_item_header , masfu_item_trailer where itmt_hdcode = isrt_itemcode and itmt_compcode = isrh_compcode and itmt_fincode = isrh_fincode and  isrt_itemcode = itmh_code and isrh_seqno = isrt_hdseqno and  isrh_compcode = $compcode  and isrh_fincode = $finid and isrh_no = $issno");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

?>
