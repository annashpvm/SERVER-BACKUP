<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadgrnno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadsupplier":
		getsupplier();
		break;
		case "loadthird":
		getthird();
		break;
		case "loadgrnno":
		getgrnno();
		break;
		case "loadpono":
		getpono();
		break;
		case "loadpoitem":
		getpoitem();
		break;
		case "loaddegritem":
		getdegritem();
		break;
		case "loadpoheader":
		getpoheader();
		break;
		case "loadvewhand":
		getvewhand();
		break;
		case "loadinvsdt":
		getinvsdt();
		break;
		case "loadlotno":
		getlotno();
		break;
		case "loadwtcard":
		getwtcard();
		break;
		case "loadwtcarddt":
		getwtcarddt();
		break;
		case "loadfreight":
		getfreight();
		break;
		/*case "loadfilldt":
		getfilldt();
		break;*/
		case "loadordqty":
		getordqty();
		break;
		case "loaditemqty":
		getitemqty();
		break;		
		case "loadamnd":
		getamnd();
		break;
		case "loaddispdegritem":
		getdispdegritem();
		break;
		case "loaddegritemqty":
		getdegritemqty();
		break;
		case "loadgrndetail":
		getgrndetail();
		break;
		case "loadgrnitemdetail":
		getgrnitemdetail();
		break;
		case "loadagent":
		getagent();
		break;
		case "userdet":
		getuserdet();
		break;
		case "loadfreightton":
		getfreightton();
		break;
		case "loadfreightlod":
		getfreightlod();
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

 function getdispdegritem()
    {
        mysql_query("SET NAMES utf8");
	$sltdegritemcode = $_POST['sltdegritemcode'];
	$r=mysql_query("select itmh_name,itmh_code from masrm_item_header where itmh_code in ($sltdegritemcode) order by itmh_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }    
   
 function getsupplier()
    {
        mysql_query("SET NAMES utf8");
	//$supplier_id = $_POST['supplierid'];
	$r=mysql_query("select sup_code,sup_refname from maspur_supplier_master where sup_acc_group = 52 order by sup_refname");
	//$r=mysql_query("call sp_pur_supplier_actgrp($supplier_id)");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getthird()
    {
        mysql_query("SET NAMES utf8");
	//$supplier_id = $_POST['supplierid'];
	$r=mysql_query("select sup_code,sup_refname from maspur_supplier_master where sup_acc_group = 54 order by sup_refname");
	//$r=mysql_query("call sp_pur_supplier_actgrp($supplier_id)");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getagent()
    {
        mysql_query("SET NAMES utf8");
	$sup_code   = $_POST['supcode'];
	$r=mysql_query("call sp_sel_partyagent ('$sup_code')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})'; 
    }
	
 function getlotno()
    {
        mysql_query("SET NAMES utf8");

	$r=mysql_query("call sp_sel_lot ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	
 function getgrndetail()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$grnno   = $_POST['grnno'];
	$r=mysql_query("call sprm_sel_recheddet ('$grnno') ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	

 function getgrnitemdetail()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$grnno   = $_POST['grnno'];
	$ordno   = $_POST['ordno'];

	$r=mysql_query("call sprm_sel_recitems ('$compcode','$grnno','$ordno','0')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 function getinvsdt()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$ordcode   = $_POST['ordcode'];
	$r=mysql_query("call spirm_sel_invheddet ('$ordcode') ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }    
 function getvewhand()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$ordcode   = $_POST['ordcode'];
	$r=mysql_query("call spirm_vew_handling ('$ordcode') ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }  
 function getpoheader()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$invspono   = $_POST['invspono'];
	$r=mysql_query("call spirm_sel_orderheader ('$invspono') ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	
 function getwtcard()
    {
        mysql_query("SET NAMES utf8");
	$wc_fincode    = $_POST['finid'];
	$wc_compcode = $_POST['compcode'];
	$wc_sup_code   = $_POST['supcode'];
	$wc_itemgrp   = $_POST['finmodtype'];
	$rech_type   = $_POST['finrecpttype'];
	$grnno   = $_POST['grnno'];

	$r=mysql_query("call sp_sel_wtcards('$wc_compcode','$wc_fincode','$wc_sup_code','0','0','$grnno')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	
 function getwtcarddt()
    {
        mysql_query("SET NAMES utf8");
	$wc_fincode    = $_POST['finid'];
	$wc_compcode = $_POST['compcode'];
	$wc_seqno   = $_POST['wtcode'];


	$r=mysql_query("call sp_sel_wtcarddet('$wc_seqno')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	
 function getfreight()
    {
        //mysql_query("SET NAMES utf8");
	$wc_fincode    = $_POST['finid'];
	$wc_compcode = $_POST['compcode'];
	$freightJ   = $_POST['freightJ'];
	$supcode   = $_POST['supcode'];
	$fareacode   = $_POST['fareacode'];
	$itemcode   = $_POST['itemcode'];
	mysql_query("SET NAMES utf8");

	if ( $freightJ = "Tonn")
	{
		$r=mysql_query("call sp_sel_tonfreight('$supcode','$fareacode','$itemcode','4')");
		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
			$arr[]= $re ;
		}
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
		
	}
	else if ($freightJ = "LoadJ")
	{
		$r=mysql_query("call sp_sel_loadfreight('$wc_seqno')");
		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
			$arr[]= $re ;
		}
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
		
	}
		
    }
 function getgrnno()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$gstFlag = $_POST['gstFlag'];
	if($gstFlag === "Add")
	{
        	$r=mysql_query("select ifnull(max(rech_no),0)+1 as grnno from trnirm_receipt_header where rech_fincode=$finid and rech_compcode=$compcode");
	}
	else if($gstFlag === "Edit")
	{
		$r=mysql_query("call spirm_sel_receiptnos ('$compcode','$finid')");
	}

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

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$supcode   = $_POST['supcode'];
	$r=mysql_query("call spirm_sel_partyinvs('$compcode','$finid','$supcode')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
function getpoitem()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$ordcode   = $_POST['ordcode'];
	$r=mysql_query("call spirm_sel_invitems ('$ordcode')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getdegritem()
    {
//        mysql_query("SET NAMES utf8");

	$r=mysql_query("call sprm_sel_itemdetails ('3')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


function getamnd()
{
        mysql_query("SET NAMES utf8");
	$item = $_POST['item'];
	$pono = $_POST['pono'];
	$billdate = $_POST['billdate'];
	$qrycode = $_POST['qrycode'];
	
	if ($qrycode = "GRN") {
		$r = mysql_query("call sprm_sel_grnqty('$pono','$item')");
		
	}
	else if ($qrycode = "RATE") {
		$r = mysql_query("call sprm_sel_amndorddets('$pono','$item','$billdate')");
	}

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
		$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
function getordqty()
{
        mysql_query("SET NAMES utf8");
	$item = $_POST['item'];
	$pono = $_POST['pono'];
	$status = $_POST['status'];	
	$r = mysql_query("call spirm_sel_orditem_dets('$pono','$item')");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
function getitemqty()
{
        mysql_query("SET NAMES utf8");
	$item = $_POST['item'];
	$pono = $_POST['pono'];
	$status = $_POST['status'];	
	$r = mysql_query("call spirm_sel_invitem_dets('$pono','$item')");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }    
function getdegritemqty()
{
        mysql_query("SET NAMES utf8");
	$item = $_POST['item'];
	$supno = $_POST['supno'];
	
	$r = mysql_query("call sprm_sel_supitemrate('$supno','$item')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
function getuserdet()
{
        mysql_query("SET NAMES utf8");
	
	$userid = $_POST['userid'];
	
	$r = mysql_query("select * from mas_users where usr_code = '$userid'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 function getfreightton()
    {

	$suplrcode = $_POST['suplrcode'];
	mysql_query("SET NAMES utf8");

	$r=mysql_query("select * from mas_areaitemfreight where aif_type=1 and aif_party_code='$suplrcode'");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
		$arr[]= $re ;
	}
	$jsonresult = JEncode($arr);
	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
		
    }
 function getfreightlod()
    {

	$suplrcode = $_POST['suplrcode'];
	mysql_query("SET NAMES utf8");

	$r=mysql_query("select * from mas_areafreight where arf_type=1 and arf_party_code='$suplrcode'");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
		$arr[]= $re ;
	}
	$jsonresult = JEncode($arr);
	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
		
    }
?>
