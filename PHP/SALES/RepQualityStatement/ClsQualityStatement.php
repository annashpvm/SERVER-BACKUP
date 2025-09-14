<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadSONo';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysql_query("SET NAMES utf8");

    switch($task){

		case "loadVariety":
		getVariety();
		break;
		case "loadcustomer":
		getcustomer();
		break;
		case "loadSalesDetails":
                getSalesDetails();
		break;
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
    


function getVariety()
{
 mysql_query("SET NAMES utf8");

 //       $r=mysql_query("select concat(vargrp_type_short_code, case when var_bf = 0 then vargrp_type_short_code+"00" else  convert(var_bf,char) ) end as quality, vargrp_type_short_code , var_bf from masprd_variety , masprd_type where var_typecode =  vargrp_type_code group by concat(vargrp_type_short_code, convert(var_bf,char)), vargrp_type_short_code , var_bf  order by concat(vargrp_type_short_code, convert(var_bf,char) ) ");

	$r=mysql_query("select case when var_bf = 0 then concat(vargrp_type_short_code,'00')  else concat(vargrp_type_short_code,var_bf)  end as quality , vargrp_type_short_code , var_bf  from masprd_variety , masprd_type where var_typecode =  vargrp_type_code group by vargrp_type_short_code,var_bf order by vargrp_type_short_code,var_bf");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}


function getcustomer()

{
	mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $r = mysql_query("select cust_code,cust_ref from massal_customer a, trnsal_invoice_header b where a.cust_code = b.invh_party and b.invh_comp_code = $compcode group by cust_code,cust_ref order by cust_ref ");
	
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}
function getSalesDetails()
{
	mysql_query("SET NAMES utf8");

	$compcode = $_POST['compcode'];
	$finid    = $_POST['fincode'];
	$fromdate = $_POST['fromdate'];
	$todate   = $_POST['todate'];
        $customer = $_POST['customer'];
	$quality  = $_POST['quality'];
	$qlyopt   = $_POST['qlyopt'];
	$custopt  = $_POST['custopt'];

        if ($qlyopt == 0 &&  $custopt == 0)  
        $r=mysql_query("select  case when left(var_desc,4) =  'KP00' then concat(left(var_desc,2),' ',substr(var_desc,8,6))  else var_desc end as var_desc,cust_ref,Cast(sum(invt_wt)/1000  as Decimal(10,3))  as qty,sum(invt_value) as beforetax from trnsal_invoice_header , massal_customer, trnsal_invoice_trailer , massal_variety , masprd_variety where invh_party = cust_code and invh_seqno = invt_seqno and invh_comp_code = invt_compcode and invh_fincode = invt_fincode and invt_var = var_code and var_grpcode = var_groupcode and invh_comp_code = '$compcode' and invh_fincode = '$finid' and invh_date between '$fromdate' and '$todate' group  by var_desc,cust_ref order  by var_desc");
        else 
             if ($qlyopt == 0 &&  $custopt != 0)  
        $r=mysql_query("select var_desc,cust_ref,Cast(sum(invt_wt)/1000  as Decimal(10,3))  as qty ,sum(invt_value) as beforetax from trnsal_invoice_header , massal_customer, trnsal_invoice_trailer , massal_variety , masprd_variety where invh_party = cust_code and invh_seqno = invt_seqno and invh_comp_code = invt_compcode and invh_fincode = invt_fincode and invt_var = var_code and var_grpcode = var_groupcode and find_in_set(cust_ref,'$customer') and  invh_comp_code = '$compcode' and invh_fincode = '$finid' and invh_date between '$fromdate' and '$todate' group  by var_desc,cust_ref order  by var_desc");
        else 
             if ($qlyopt != 0 &&  $custopt == 0)  
        $r=mysql_query("select   case when left(var_desc,4) =  'KP00' then concat(left(var_desc,2),' ',substr(var_desc,8,6))  else var_desc end as var_desc,cust_ref,Cast(sum(invt_wt)/1000  as Decimal(10,3))  as qty ,sum(invt_value) as beforetax from trnsal_invoice_header , massal_customer, trnsal_invoice_trailer , massal_variety , masprd_variety where invh_party = cust_code and invh_seqno = invt_seqno and invh_comp_code = invt_compcode and invh_fincode = invt_fincode and invt_var = var_code and var_grpcode = var_groupcode and find_in_set(left(var_desc,4),'$quality') and invh_comp_code = '$compcode' and invh_fincode = '$finid' and invh_date between '$fromdate' and '$todate' group  by var_desc,cust_ref order  by var_desc");
        else
        $r=mysql_query("select var_desc,cust_ref,Cast(sum(invt_wt)/1000  as Decimal(10,3))  as qty ,sum(invt_value) as beforetax from trnsal_invoice_header , massal_customer, trnsal_invoice_trailer , massal_variety , masprd_variety where invh_party = cust_code and invh_seqno = invt_seqno and invh_comp_code = invt_compcode and invh_fincode = invt_fincode and invt_var = var_code and var_grpcode = var_groupcode and find_in_set(left(var_desc,4),'$quality') and find_in_set(cust_ref,'$customer') and  invh_comp_code = '$compcode' and invh_fincode = '$finid' and invh_date between '$fromdate' and '$todate' group  by var_desc,cust_ref order  by var_desc");


$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}


?>
