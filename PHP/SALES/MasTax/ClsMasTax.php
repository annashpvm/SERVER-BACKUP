<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task="LoadSalesLedger";

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "LoadSalesLedger":
		getLedgerList();
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
    
   

 function getLedgerList()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select * from massal_customer where cust_type = 'G' and cust_name like '%SALES%'");

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

//        $gsttype = '%CGST%LIA%';
//        $gst = '2.5';



        $r=mysql_query("select * from massal_customer where cust_type = 'G' and cust_name like '$gsttype%$gst%'");
        $r=mysql_query("select * from massal_customer where cust_type = 'G' and  (cust_name like '%GST%COLLEC%' or (cust_name like '%GST' and length(cust_name) < 10 ))
");

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
        $r=mysql_query("select  tax_code,tax_name,tax_shortname , b.cust_name sales_ledger, c.cust_name cgst_ledger,d.cust_name sgst_ledger,e.cust_name igst_ledger ,tax_sgst,tax_cgst,tax_igst ,tax_sal_led_code, tax_sgst_ledcode, tax_cgst_ledcode, tax_igst_ledcode ,tax_type from massal_tax a, massal_customer b , massal_customer c  ,  massal_customer d , massal_customer e  where a.tax_sal_led_code = b.cust_code and a.tax_cgst_ledcode = c.cust_code  and a.tax_sgst_ledcode = d.cust_code  and a.tax_igst_ledcode = e.cust_code  order by tax_code");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
 function getInvtype()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select * from massal_invtype where type_code <6");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
		


?>
