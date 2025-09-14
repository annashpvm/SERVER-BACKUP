<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadsupplier';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadsupplier":
		getsupplier();
		break;
		case "loadamendno":
		getamendno();
		break;
		case "loadgetPONo":
		getponolist();
		break;
		case "loadgetPODetails":
		getponodetails();
		break;
		case "loadPODelvy":
		getPODelvy();
		break;
		case "taxdetails":
		gettax();
		break;
		case "vendoradd":
		getvendoradd();
		break;
		case "LoadItem":
		getitem();
		break;
		case "itemdet":
		getitemdet();
		break;
		case "loadpaymode":
		getpaymode();
		break;
		case "loadcarrtype":
		getcarriagetype();
		break;
		case "loadcountry":
		getcountry();
		break;
		case "loadport":
		getportname();
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
	$r=mysql_query("select sup_code,sup_refname from maspur_supplier_master  where sup_acc_group = '$supplierid' order by sup_refname");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


   
 function getamendno()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];

	
	$r=mysql_query("select IFNULL(max(amnh_seqno),0)+1 as amendno from trnirm_orderamnd_header");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getponolist()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$r=mysql_query("select ordh_no,ordh_seqno from trnirm_order_header where ordh_fincode = '$finid' and ordh_compcode='$compcode'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getponodetails()
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



 function gettax()
    {
        mysql_query("SET NAMES utf8");
	$vendor = $_POST['Vendorcode'];
	$r=mysql_query("call sprm_sel_tax('$vendor')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
 function getvendoradd()
    {
        mysql_query("SET NAMES utf8");
	$vendor = $_POST['Vendorcode'];
        $r=mysql_query("select sup_addr1,sup_addr2,sup_addr3 from maspur_supplier_master where sup_code = $vendor");
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

        $r=mysql_query("select itmh_code,itmh_name from masrm_item_header where itmh_type =3 order by itmh_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getcountry()
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


 function getportname()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select port_name,port_code,port_country,port_description,port_type from mas_port  order by port_name");
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
        $itemcode = $_POST['itemcode'];
        $r=mysql_query("select itmh_moisture_per,itmh_tare_per,itmh_convlossper,itmh_outthrough,itmh_prohiper from masrm_item_header where itmh_code = $itemcode ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getpaymode()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select term_code,term_name from mas_terms");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getPODelvy()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$ordno = $_POST['ordno'];

	$r=mysql_query("call spirm_sel_delsch('$ordno')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getcarriagetype()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select carr_code,carr_name from mas_transport");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
?>
