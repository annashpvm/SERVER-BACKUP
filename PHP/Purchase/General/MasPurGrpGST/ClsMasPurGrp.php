<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task="LoadSalesLedger";

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){


             	case "loadSearchLedgerlist":
		getSearchLedgerlist();
		break;

		case "LoadInvtype":
		getInvtype();
		break;
		case "LoadgstLedger":
		getgstledger();
		break;
		case "LoadTaxList":
		getgstlist();
		break;
		case "loadSearchGSTLedgerlist":
		getsearchgstlist();
		break;

		case "LoadGSTDetails":
		findGSTDetails();
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
    
   
 function getSearchLedgerlist()
    {
        mysql_query("SET NAMES utf8");


        $ledname = strtoupper($_POST['ledger']);
        $ledname = trim(str_replace(" ", "", $ledname)); 
        $ledname = trim(str_replace(".", "", $ledname)); 

         $r=mysql_query(" select cust_code,cust_ref,cust_name from
(select cust_code,cust_ref,cust_name from massal_customer where cust_type = 'G' and cust_name regexp'%' and cust_acc_group not in (46,44,85,72)
union all
select cust_code,cust_ref,cust_name from massal_customer where cust_type = 'G' and cust_acc_group in (74,75) order by cust_name ) a where left(cust_name,2) != 'ZZ'  group by cust_code,cust_ref,cust_name order by cust_name");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    } 


 function getgstledger()
    {
        mysql_query("SET NAMES utf8");
        $gsttype = $_POST['gsttype'];
        $gst = $_POST['gst'];


        $r=mysql_query("select * from acc_ledger_master where led_type = 'G' and led_name like '%INPUT%$gsttype%$gst%'");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getgstlist()
    {
        mysql_query("SET NAMES utf8");


        $r=mysql_query("select * from maspur_gsttax order by tax_pur_ledname");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getsearchgstlist()
    {
        mysql_query("SET NAMES utf8");
        $ledname = strtoupper($_POST['ledger']);
        $ledname = trim(str_replace(" ", "", $ledname)); 
        $ledname = trim(str_replace(".", "", $ledname)); 

        $r=mysql_query("select * from maspur_gsttax where replace(replace(tax_pur_ledname,' ','')  ,'.','')  like '%$ledname%'  order by tax_pur_ledname");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function findGSTDetails()
    {
        mysql_query("SET NAMES utf8");
        $ledcode = $_POST['ledcode'];

        $r=mysql_query("select * from maspur_gsttax where tax_pur_ledcode = $ledcode");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }





?>
