<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task='loadCountryList';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadCountryList":
		getCountryList();
		break;

		case "loadPortList":
		getPortList();
		break;


		case "LoadPONo":
		getPONo();
		break;

		case "loadsupplier":
		getsupplier();
		break;

		case "LoadItem":
		getitem();
		break;

		case "LoadPONoList":
		getPONoList();
		break;
		case "loadPODetail":
		getPODetail();
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


 function getPONo()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
	$r=mysql_query("select IFNULL(max(ordh_no),0)+1 as ordh_no from trnirm_order_header where ordh_compcode ='$compcode' and ordh_fincode ='$finid'");
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


 function getitem()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select itmh_code,itmh_name from masrm_item_header");
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
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$r=mysql_query("select ordh_no,ordh_seqno from trnirm_order_header where ordh_fincode = '$finid' and ordh_compcode='$compcode' order by ordh_no desc");
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


?>
