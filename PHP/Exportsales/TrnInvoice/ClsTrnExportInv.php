<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConndpm.php");

    $task='loadApprovalNo';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysql_query("SET NAMES utf8");

    switch($task){
		case "loadApprovalNo":
		getApprovalNo();
		break;
		case "loadconsignee":
		getconsignee();
		break;
		case "loadvariety":
		getvariety();
		break;
		case "loadarea1":
		getarea1();
		break;
		case "loadpino":
		getpino();
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
    

 function getApprovalNo()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $r=mysql_query("select ifnull(max(ei_appr_no),0+1) as apprno from export_invoice_price_approval_header where ei_fincode = $finid and ei_compcode = $compcode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getconsignee()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $r=mysql_query("select cust_ref,cust_code from massal_customer where cust_taxtag in (1,2,3,8,10) order by cust_ref");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getvariety()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $r=mysql_query("select distinct var_grpname, var_grpcode  from excise_variety_group");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    
 function getarea1()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$consignee = $_POST['consignee'];
	$dataf = $_POST['dataf'];
	
		if ($dataf == "SLPB"){

	       $jqry = "select pckh_are1no from massal_customer a, trnsal_packslip_header_export b where pckh_party = 5499 and a.cust_ref = '$consignee' and b.pckh_comp_code = '$compcode' and b.pckh_fincode = '$finid'  and pckh_status = 'N' group by pckh_are1no ";
       	}
	    else {
	       $jqry = "select pckh_are1no from massal_customer a, trnsal_packslip_header_export b where a.cust_code = b.pckh_party and a.cust_ref = '$consignee' and b.pckh_comp_code = '$compcode' and b.pckh_fincode = '$finid' and pckh_status = 'N' group by pckh_are1no ";
    		}
	
        $r=mysql_query($jqry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }    
    
 function getpino()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$consignee = $_POST['consignee'];
        $r=mysql_query("select a.ei_our_ref from export_invoice_price_approval_header a, export_invoice_price_approval_trailer b where a.ei_compcode = b.ei_compcode and a.ei_fincode = b.ei_fincode and a.ei_appr_no = b.ei_appr_no and b.ei_close = 'N' and a.ei_compcode = '$compcode'  and a.ei_fincode >= 17 and a.ei_fincode <= '$finid'  and a.ei_custcode = '$consignee' and a.ei_our_ref not in (select ei_other_ref from export_invoice_header where ei_millcode = '$compcode' and ei_fincode <= '$finid' and ei_custcode = '$consignee'  ) group by ei_our_ref order by ei_our_ref ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }    

?>
