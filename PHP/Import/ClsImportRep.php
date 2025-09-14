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

		case "loadMonthInvoices":
		getMonthInvoices();
		break;
		case "loadMonthInvoiceList":
		getMonthInvoiceList();
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
		$r=mysql_query("select rech_seqno as seqno,rech_no as repno from trnirm_receipt_header  where rech_fincode= '$finid' and rech_compcode = '$compcode' order by rech_no");

	}
	else if ($repname === "PO") {
		$r=mysql_query("select ordh_seqno as seqno,ordh_no as repno from trnirm_order_header  where ordh_fincode= '$finid' and ordh_compcode = '$compcode' order by ordh_no");
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

	$r=mysql_query("select UPPER(monthname(ordh_date))  as rmonth , count(*) as nos, sum(totalvalue) as purvalue  from (select ordh_date, ordh_no,sum(ordt_usdvalue) as totalvalue from trnirm_order_header , trnirm_order_trailer  where ordh_fincode = '$finid' and ordh_compcode = '$compcode' and  ordh_seqno = ordt_hdseqno  and ordh_date >= '$startdate' and ordh_date <= curdate() group by ordh_date, ordh_no ) a1  group by UPPER(monthname(ordh_date))");
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


        $r=mysql_query(" select ordh_no , DATE_FORMAT(ordh_date, '%d-%m-%Y') as  ordh_date,sup_refname,itmh_name,ordt_qty,ordt_usdrate,ordt_usdvalue  from trnirm_order_header a, trnirm_order_trailer b , masrm_item_header c , maspur_supplier_master d  where  ordh_sup_code = sup_code and  ordh_compcode = $compcode and ordh_fincode = $finid and ordh_seqno =ordt_hdseqno and  ordt_item_code = itmh_code and ordh_date between '$startdate' and '$enddate' order by ordh_seqno desc");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getMonthInvoices()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];

	$r=mysql_query("select UPPER(monthname(invh_date))  as rmonth , count(*) as nos, sum(totalvalue) as purvalue  from (select invh_date, invh_seqno,sum(invt_itemvalue)   as totalvalue from trnirm_invoice_header , trnirm_invoice_trailer  where invh_fincode = '$finid' and invh_compcode = '$compcode' and  invh_seqno = invt_hdseqno  and invh_date >= '$startdate' and invh_date <= curdate() group by invh_date, invh_seqno ) a1  group by UPPER(monthname(invh_date))");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getMonthInvoiceList()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];

	$r=mysql_query("select  invh_invoicerefno , DATE_FORMAT(invh_date, '%d-%m-%Y') invh_date , sup_refname, itmh_name,invt_qty,invt_recqty,invt_itemUSDrate,invt_exrate,invt_itemvalue from trnirm_invoice_header , trnirm_invoice_trailer ,trnirm_order_header ,masrm_item_header , maspur_supplier_master  where   
invh_sup_code = sup_code and invt_item_code = itmh_code and invh_poseqno = ordh_seqno and invh_seqno = invt_hdseqno and 
invh_compcode = '$compcode' and  invh_fincode = '$finid'  and invh_date >= '$startdate' and invh_date <= '$enddate'  order by invh_date");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

?>
