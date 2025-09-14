<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadissno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadscrapitemcode":
		getscrapitemcode();
		break;  

		case "loadscrapitem":
		getscrapitem();
		break;    
		case "loaduom":
		getuom();
		break;
		case "loadhsncode":
		gethsncode();
		break;
		case "loadscrapitemledger":
		getscrapitemledger();
		break;	
		case "loadsalestax":
		getsalestax();
		case "loadSalesledgers":
		getSalesledgers();
		break;
		case "loadCGSTledgers":
		getCGSTledgers();
		break;
		case "loadSGSTledgers":
		getSGSTledgers();
		break;
		case "loadIGSTledgers":
		getIGSTledgers();
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
    
  function getscrapitem()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select mas_othersales_item_master.salitem_code, salitem_name, salitem_uom, uom.uom_short_name,salitem_hsn,hsn_type  from mas_othersales_item_master INNER JOIN mas_uom as uom ON salitem_uom = uom_code LEFT OUTER JOIN mas_hsncode ON hsn_code = salitem_hsn");

        $r=mysql_query("select a.* ,f.uom_short_name ,b.cust_code as salesledcodetn,b.cust_name as saleslednametn ,c.cust_code as cgstledcode,c.cust_name as cgstledname   ,d.cust_code as sgstledcode,d.cust_name as sgstledname  ,e.cust_code as igstledcode,e.cust_name as igstledname ,g.cust_code as salesledcodeos,g.cust_name as saleslednameos   from mas_othersales_item_master a, massal_customer b , massal_customer c , massal_customer d , massal_customer e ,mas_uom f  , massal_customer g  where a.salitem_salesledcode_tn = b.cust_code and a.salitem_cgstledcode = c.cust_code and a.salitem_sgstledcode = d.cust_code and a.salitem_igstledcode = e.cust_code and a.salitem_uom = f.uom_code and a.salitem_salesledcode_os = g.cust_code  order by salitem_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


  function getscrapitemcode()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select max(salitem_code) +1 as itemcode from mas_othersales_item_master");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


  function getuom()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select * from mas_uom");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

  function gethsncode()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select * from mas_hsncode");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


   
  function getscrapitemledger()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select * from massal_customer");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 
   
   
  function getsalescountry()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select * from mas_country");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 

   
  function getsalestax()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select * from mas_tax");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 


 function getSalesledgers()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select * from massal_customer where cust_type = 'G' and cust_name like '%SALES%' order by cust_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getCGSTledgers()

    {

        mysql_query("SET NAMES utf8");
        $r=mysql_query("select * from massal_customer where cust_name like 'CGST'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getSGSTledgers()

    {

        mysql_query("SET NAMES utf8");
        $r=mysql_query("select * from massal_customer where cust_name like 'SGST'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getIGSTledgers()

    {

        mysql_query("SET NAMES utf8");
        $r=mysql_query("select * from massal_customer where cust_name like 'IGST%@%'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



?>
