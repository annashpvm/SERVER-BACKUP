<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConndpm.php");

    $task='loadgrnno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadsupplier":
		getsupplier();
		break;
		case "loadgrnno":
		getgrnno();
		break;
		case "loadpono":
		getpono();
		break;
		case "loaditem":
		getitem();
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
    
   
 function getsupplier()
    {
        mysql_query("SET NAMES utf8");
	$r=mysql_query("call sp_pur_sup()");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
	
 function getgrnno()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $r=mysql_query("select ifnull(max(minh_minno),0)+1 as grnno from trnpur_min_header where minh_fin_code=$finid and minh_comp_code=$compcode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getpono()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$supcode = $_POST['supcode'];
	$flag = $_POST['flag'];
	if($flag=="C")
	{
	$r=mysql_query("call sppur_pending_indent($compcode,$finid)");
	}
	else if($flag=="P")
	{
	$r=mysql_query("call sppur_pending_po($compcode,$finid,$supcode)");
	}
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
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$supcode = $_POST['supcode'];
	$flag = $_POST['flag'];
	$indno = $_POST['indno'];
	$poseq = $_POST['poseqno'];
	if($flag=="C")
	{
	$r=mysql_query("call sppur_sel_indentdetail($compcode,$finid,$indno)");
	}
	else if($flag=="P")
	{
	$r=mysql_query("call sppur_po_details_new($compcode,$poseq,$supcode,$pono)");
	}
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
?>
