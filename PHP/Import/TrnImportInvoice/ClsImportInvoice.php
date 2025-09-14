<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task='loadCountryList';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadINVNo":
		getINVNo();
		break;

		case "loadCountryList":
		getCountryList();
		break;

		case "LoadPONoList":
		getPONoList();
		break;
		case "loadPODetail":
		getPODetail();
		break;
		case "LoadPOItemList":
		getPOItemList();
		break;
		case "LoadPOItemDetail":
		getPOItemDetail();
		break;
		case "loadPortList":
		getPortList();
		break;
		case "loadsupplier":
		getsupplier();
		break;
		case "loadAllsupplier":
		getAllsupplier();
		break;

		case "loadINVNoList":
		getINVNoList();
		break;
		case "loadINVNoDetail":
		getINVNoDetail();
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
	$supplierid = $_POST['supplierid'];
	$r=mysql_query(" select sup_refname, sup_code from trnirm_order_header , maspur_supplier_master where ordh_sup_code = sup_code  group by sup_refname, sup_code order by sup_refname");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getPONoList()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
 	$supcode  = $_POST['supcode'];
	$r=mysql_query("select ordh_no,ordh_seqno from trnirm_order_header where ordh_sup_code = '$supcode'  and  ordh_fincode = '$finid' and ordh_compcode='$compcode'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


   
 function getCountryList()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select  country_name,country_code  from mas_country  order by country_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
	
 function getPortList()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select * from mas_port , mas_country where port_country = country_code order by port_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getPODetail()
    {
        mysql_query("SET NAMES utf8");
	$ordno = $_POST['ordno'];
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];



	$r=mysql_query("call spirm_sel_ordno('$ordno','$compcode','$finid')");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


   
 function getAllsupplier()
    {
        mysql_query("SET NAMES utf8");
	$supplierid = $_POST['supplierid'];
	$r=mysql_query("select sup_code,sup_refname from maspur_supplier_master  where sup_acc_group = '$supplierid' order by sup_refname");
	$r=mysql_query("select sup_code,sup_refname from maspur_supplier_master order by sup_refname");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getPOItemList()
    {
        mysql_query("SET NAMES utf8");
	$seqno = $_POST['seqno'];

	$r=mysql_query("select itmh_name,itmh_code from trnirm_order_trailer , masrm_item_header where ordt_hdseqno = '$seqno' and ordt_item_code =  itmh_code");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getPOItemDetail()
    {
        mysql_query("SET NAMES utf8");
	$seqno = $_POST['seqno'];
	$item = $_POST['itemcode'];
	$r=mysql_query("select * from trnirm_order_trailer where ordt_hdseqno = '$seqno'  and ordt_item_code = '$item'");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getINVNo()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
	$r=mysql_query("select IFNULL(max(invh_invoiceno),0)+1 as invno from trnirm_invoice_header where invh_compcode ='$compcode' and invh_fincode ='$finid'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getINVNoList()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$r=mysql_query("select invh_invoiceno from trnirm_invoice_header where invh_fincode = '$finid' and invh_compcode='$compcode' order by invh_invoiceno");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getINVNoDetail()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$invno    = $_POST['invno'];
	$r=mysql_query("select * from trnirm_invoice_header , trnirm_invoice_trailer ,trnirm_order_header ,masrm_item_header  where    invt_item_code = itmh_code and invh_poseqno = ordh_seqno and invh_seqno = invt_hdseqno and invh_compcode = '$compcode' and  invh_fincode = '$finid'  and invh_invoiceno = '$invno'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



?>
