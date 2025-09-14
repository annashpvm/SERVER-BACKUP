<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task='loadReelWeight';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadReelWeight":
		getReelWeight();
		break;
		case "loadSONoList":
		getSONoList();
		break;
		case "loadSOCustomer":
		getSOCustomer();
		break;
		case "loadReelNumberDetail":
		getReelNumberDetail();
		break;
		case "loadAllCustomer":
		getAllCustomer();
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
    
   
 function getReelWeight()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select r_reelno from trn_dayprod_rewinder order by r_reelno");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
 function getSONoList()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];


        $r=mysql_query("select ordh_sono from trnsal_order_header where ordh_fincode = $finid  and ordh_comp_code= $compcode group by ordh_sono  order by ordh_sono desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 function getSOCustomer()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $sono     = $_POST['sono'];
        $r=mysql_query("select cust_ref,cust_code from trnsal_order_header , massal_customer where ordh_party = cust_code and ordh_fincode = $finid   and ordh_comp_code= $compcode  and ordh_sono =  $sono ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

    function getAllCustomer()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select cust_ref,cust_code from massal_customer order by cust_ref ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 function getReelNumberDetail()
    {

	$reelno    = $_POST['reelno'];
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select * from trn_dayprod_rewinder a , massal_customer b , masprd_variety where r_custcode = cust_code 
and  r_varietycode = var_groupcode and r_reelno = '$reelno'");

        $r=mysql_query("select * from trn_dayprod_rewinder , masprd_variety where r_varietycode = var_groupcode and r_reelno = '$reelno'");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	
 

?>
