<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadissno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadvariety":
		getvariety();
		break;
		case "loadbatch":
		getbatch();
		break;
		case "LoadItem":
		getitem();
		break;
		case "loadlot":
		getlotdet();
		break;
		case "loadItemStock":
		getitemStock();
		break;
		case "loadissno":
		getissno();
		break;
		case "loadissdetail":
		getissdetail();
		break;
             	case "loadSearchItemlist":
		getSearchItemlist();
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
    
   
 function getvariety()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];

	$r=mysql_query("select vargrp_type_code, vargrp_type_name, vargrp_type_short_code, vargrp_type_hsncode  from masprd_type");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
function getbatch()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$issdate = $_POST['issdate'];
	$machine = $_POST['machine'];
	$mcode = $_POST['mcode'];
	$qrytype = $_POST['qrytype'];
	
	if ($qrytype="frmload")
	{
		if($compcode="1")
		{
		$r=mysql_query("select mis_batchcode,mis_batchvariety from mas_mis_variety_batch_group where mis_dpm1='Y' order by mis_batchvariety");
		}
		else if($compcode="2")
		{
		$r=mysql_query("select mis_batchcode,mis_batchvariety from mas_mis_variety_batch_group where mis_slpb='Y' order by mis_batchvariety");;
		}
		else if($compcode="3")
		{
		$r=mysql_query("select mis_batchcode,mis_batchvariety from mas_mis_variety_batch_group where mis_dpm2='Y' order by mis_batchvariety");
		}
		else if($compcode="4")
		{
		$r=mysql_query("select mis_batchcode,mis_batchvariety from mas_mis_variety_batch_group  where mis_vjpm='Y' order by mis_batchvariety");
		}
		else
		{
		$r=mysql_query("select mis_batchcode,mis_batchvariety from mas_mis_variety_batch_group order by mis_batchvariety");
		}
	}
	else if ($qrytype="afmc")
	{
		if($machine=1)
		{
		$r=mysql_query("select * from trn_mis_dip_daily_prod where d_compcode= '$mcode' and d_date='$issdate' and d_fincode='$finid'");
		}
		else 
		{
		$r=mysql_query("select * from trn_mis_mc_dailyprodn where t_compcode= '$mcode' and t_date='$issdate' and t_fincode='$finid'");
		}
	}

	/*if($machine="DIP")
	{
	$r=mysql_query("select d_variety as batch from trn_mis_dip_daily_prod where d_compcode=$compcode and d_fincode=$finid and d_date='$date' union select 'test' as batch");
	}
	else
	{
	$r=mysql_query("select t_variety as batch from trn_mis_mc_dailyprodn where t_compcode=$compcode and t_fincode=$finid and t_date='$date'  union select 'test1' as batch");
	}*/



	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

	
 function getitem()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$fincode = $_POST['fincode'];
        $r=mysql_query("call sprm_sel_item_details_new ('$compcode','$fincode') ");
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


//        $r=mysql_query("call sprm_sel_itemlotdetails($compcode,$finid,$itemcode,$lotcode)");
	$r=mysql_query("select * from masrm_item_trailer where itmt_compcode = $compcode and itmt_fincode = $finid  and itmt_hdcode = $itemcode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getlotdet()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$itemcode = $_POST['itemcode'];
	$finid = $_POST['finid'];
        $r=mysql_query("call spfu_sel_itemlotdetails1($compcode,$itemcode)");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getissno()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['fincode'];
	$AEDFlag = $_POST['AEDFlag'];
	
	if ($AEDFlag === "Add")
	{

		$r=mysql_query("select ifnull(max(issh_no),0) + 1 as issno from trnrm_issue_header where issh_compcode='$compcode' and issh_fincode='$finid'");
	}
	else if ($AEDFlag === "Edit")
	{
		$r=mysql_query("select issh_no,issh_seqno from trnrm_issue_header where issh_compcode=$compcode and issh_fincode=$finid");
	}
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
function getissdetail()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$issno = $_POST['issno'];
	$AEDFlag = $_POST['AEDFlag'];
	

		$r=mysql_query("call sprm_sel_issue ('$compcode','$finid','$issno')");

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

        $itemname = trim(str_replace(" ", "", $itemname)); 
        $itemname = trim(str_replace(".", "", $itemname));

        if ($itemname == '') 
            $qry = "select * from masrm_item_header  order by itmh_name";
        else
            $qry = "select * from masrm_item_header where left(itmh_name,2) != 'ZZ'  and  replace(replace(itmh_name,' ','')  ,'.','')  like '%$itemname%' order by itmh_name";



        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


?>
