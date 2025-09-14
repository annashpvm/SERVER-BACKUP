<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadissno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){

             	case "loadSearchItemlist":
		getSearchItemlist();
		break;

             	case "loadSearchLedgerlist":
		getSearchLedgerlist();
		break;

             	case "loadSeqno":
		getSeqno();
		break;

             	case "loadSeqnoList":
		getSeqnoList();
		break;


             	case "loadEntryNoDetails":
		getEntryNoDetails();
		break;



             	case "loadSearchArealist":
		getSearchArealist();
		break;



             	case "loadSupplierEntryNoDetails":
		getSupplierEntryNoDetails();
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
    

 function getSearchItemlist()
    {
        mysql_query("SET NAMES utf8");
        $itemname = trim(strtoupper($_POST['itemname']));

        if ($itemname == '') 
            $qry = "select * from masrm_item_header  order by itmh_name";
        else
            $qry = "select * from masrm_item_header where itmh_name like '%$itemname%' order by itmh_name";



        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
  

 function getSearchLedgerlist()
    {
        mysql_query("SET NAMES utf8");
        $ledname = strtoupper($_POST['ledger']);
        $ledname = trim(str_replace(" ", "", $ledname)); 
        $ledname = trim(str_replace(".", "", $ledname)); 


        if ($ledname == '')
	        $qry = "select * from (select  cust_code,cust_name,qc_rm_supcode,cust_state,sup_wp_gstinv_supplier_yn,
cust_cr_days,cust_grace_days from trn_qc_rm_inspection,massal_customer  where    cust_code = qc_rm_supcode group by cust_code,cust_name,qc_rm_supcode,cust_state,sup_wp_gstinv_supplier_yn ,cust_cr_days,cust_grace_days ) a1 order by cust_name";
        else

	        $qry = "select * from ( select  cust_code,cust_name,qc_rm_supcode,cust_state,cust_cr_days,cust_grace_days from trn_qc_rm_inspection,massal_customer  where   cust_code = qc_rm_supcode group by cust_code,cust_name, qc_rm_supcode, cust_state,cust_cr_days,cust_grace_days  ) a1 where replace(replace(cust_name,' ','')  ,'.','')  like '%$ledname%'  order by cust_name";

        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    } 

 function getSeqno()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['fincode'];

	$r=mysql_query("select ifnull(max(rm_rate_seqno),0) + 1 as seqno from masrm_supplier_rate where rm_rate_compcode='$compcode' and rm_rate_fincode='$finid'");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getSeqnoList()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['fincode'];

	$r=mysql_query("select rm_rate_seqno from masrm_supplier_rate where rm_rate_compcode='$compcode' and rm_rate_fincode='$finid' group by rm_rate_seqno order by rm_rate_seqno desc");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getEntryNoDetails()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];
	$entno    = $_POST['entno'];

	$r=mysql_query("select * from masrm_supplier_rate , massal_customer , masrm_item_header ,mas_area where rm_rate_areacode = area_code and  rm_rate_itemcode = itmh_code and rm_rate_supcode = cust_code and rm_rate_compcode = '$compcode' and rm_rate_fincode= '$finid' and rm_rate_seqno = $entno order by area_name,itmh_name");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getSearchArealist()
    {
        mysql_query("SET NAMES utf8");
        $areaname = strtoupper($_POST['areaname']);
        $areaname = trim(str_replace(" ", "", $areaname)); 
        $areaname = trim(str_replace(".", "", $areaname)); 
 

	        $qry = "select * from mas_area  where replace(replace(area_name,' ','')  ,'.','')  like '%$areaname%'  order by area_name";

        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    } 


 function getSupplierEntryNoDetails()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];
	$supcode  = $_POST['supcode'];

	$r=mysql_query("select rm_rate_seqno, DATE_FORMAT(rm_rate_date, '%d-%m-%Y') as  rm_rate_date from masrm_supplier_rate where rm_rate_compcode = $compcode and  rm_rate_fincode <= $finid and rm_rate_supcode = $supcode group by rm_rate_seqno,rm_rate_date order by rm_rate_seqno desc");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

?>
