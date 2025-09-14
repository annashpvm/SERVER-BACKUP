<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loaditemgrp';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadsupplier":
		getsupplier();
		break;
		case "loadretno":
		getretno();
		break;
		case "loadgrnno":
		getgrnno();
		break;
		case "loadgrndet":
		getgrndetails();
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
	$r=mysql_query("select sup_code,sup_refname from maspur_supplier_master");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
	
 function getretno()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
        $r=mysql_query("select ifnull(max(rerh_no),0)+1 as retno from trnrm_receiptret_header where rerh_fincode = $finid");
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
	$supplier = $_POST['supcode'];
	$finid = $_POST['finid'];
	$comp = $_POST['compcode'];
        $r=mysql_query("select rech_seqno,rech_no from trnrm_receipt_header where rech_sup_code = $supplier and rech_acctflag='Y' and rech_compcode = $comp and rech_fincode = $finid and rech_seqno not in (select rerh_grnseqno from trnrm_receiptret_header)");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getgrndetails()
    {
        mysql_query("SET NAMES utf8");
	$grnseq = $_POST['grnseq'];
        $r=mysql_query("select itmh_name,rect_lotno,0 as stkqty,rect_grnbags,rect_itemvalue,
rech_freight,rect_costvalue,0 as trseqno,itmh_code,rech_sup_code,0 as lotcode,rect_itemrate as grnrate,0 as grnfreight,0 as actgrn,rect_billqty as billqty,
0 as retbags,rech_cgst_per,rech_sgst_per,rech_igst_per,rech_freight from trnrm_receipt_header rh,trnrm_receipt_trailer rt,masrm_item_header where rh.rech_seqno = $grnseq and rh.rech_seqno = rt.rect_hdseqno and  itmh_code = rect_item_code");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

?>
