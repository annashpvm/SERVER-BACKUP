<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadrepno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadrepno":
		getrepno();
		break;
		case "loadMonthPOs":
		getMonthPOs();
		break;
		case "loadMonthPODetails":
		getMonthPODetails();
		break;
		case "loadMonthGRNs":
		getMonthGRNs();
		break;
		case "loadMonthGRNDetails":
		getMonthGRNDetails();
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
    
   
 function getrepno()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$repname = $_POST['repname'];
	
	if($repname === "GRN") {
		$r=mysql_query("select rech_seqno as seqno,rech_no as repno from trnrm_receipt_header  where rech_fincode= '$finid' and rech_compcode = '$compcode' order by rech_no");

	}
	else if ($repname === "PO") {
		$r=mysql_query("select ordh_seqno as seqno,ordh_no as repno from trnrm_order_header  where ordh_fincode= '$finid' and ordh_compcode = '$compcode' order by ordh_no");
	}

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getMonthPOs()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];

	$r=mysql_query("select UPPER(monthname(ordh_date))  as rmonth , count(*) as nos, sum(ordh_totalvalue) as purvalue  from trnrm_order_header  where ordh_fincode = '$finid' and ordh_compcode = '$compcode' and ordh_date >= '$startdate' and ordh_date <= curdate()  group by UPPER(monthname(ordh_date)) ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getMonthPODetails()
    {
        mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];


        $r=mysql_query(" select ordh_no , ordh_date,sup_refname,itmh_name,ordt_qty,ordt_item_value  from trnrm_order_header a, trnrm_order_trailer b , masrm_item_header c , massal_customer d  where  ordh_sup_code = cust_code and  ordh_compcode = $compcode and ordh_fincode = $finid and ordh_seqno =ordt_hdseqno and  ordt_item_code = itmh_code and ordh_date between '$startdate' and '$enddate' order by ordh_seqno desc");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getMonthGRNs()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];

	$r=mysql_query("select UPPER(monthname(rech_date))  as rmonth , count(*) as nos, sum(rech_totalamount) as purvalue  from trnrm_receipt_header  where rech_fincode = '$finid' and rech_compcode = '$compcode' and rech_date >= '$startdate' and rech_date <= curdate()  group by UPPER(monthname(rech_date)) ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getMonthGRNDetails()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];

	$r=mysql_query("select * from trnrm_receipt_header a, trnrm_receipt_trailer b , masrm_item_header c , massal_customer where  rech_sup_code = cust_code and rech_fincode = '$finid' and rech_compcode = '$compcode' and rech_seqno = rect_hdseqno and  rect_item_code = itmh_code and rech_date between '$startdate' and '$enddate' order by rech_seqno");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

?>
