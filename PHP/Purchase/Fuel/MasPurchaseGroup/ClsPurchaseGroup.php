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
		case "loadPurGroup":
		getPurGroup();
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

        $r=mysql_query("select * from acc_ledger_master where led_type = 'G' and led_name like '%SALES%'");

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



        $r=mysql_query("select * from acc_ledger_master where led_type = 'G' and led_name like '$gsttype%$gst%'");

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
        $r=mysql_query("select * from mas_RMFU_purchasetax  order by tax_purname");

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
		

function getPurGroup()
    {
	$pono     = $_POST['pono'];
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        mysql_query("SET NAMES utf8");
         $r=mysql_query("select * from acc_ledger_master  where led_type = 'G' and  led_grp_code in (74,75,102) and (led_name like '%FUEL%'  or led_name like '%COAL%' or led_name like '%WASTE%')  order by led_name ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
?>
