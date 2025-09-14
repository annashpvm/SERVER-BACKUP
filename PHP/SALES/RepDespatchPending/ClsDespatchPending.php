<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadSONo';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysql_query("SET NAMES utf8");

    switch($task){
		case "loadcustomer":
		getcustomer();
		break;
		case "loadSONo":
		getSONo();
		break;
		case "loadsizedetails":
                getsizedetails();
		break;
		case "loadSearchPartylist":
		getSearchPartylist();
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
    


function getSONo()
{
 mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$party = $_POST['party'];
//        $r=mysql_query("select ordh_sono,ordh_sodate from trnsal_order_header  where ordh_comp_code = $compcode and  ordh_fincode = $finid  and ordh_party = '$party' group by ordh_sono,ordh_sodate order by ordh_sono desc");

        $r=mysql_query("select ordh_sono,ordh_sodate from trnsal_finish_stock , trnsal_order_header  where stk_comp_code = ordh_comp_code and   stk_comp_code = $compcode and  stk_destag = ''  and stk_sono = ordh_sono and ordh_party = '$party' group by ordh_sono,ordh_sodate  order by ordh_sono desc");


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
//       $r = mysql_query("select cust_code,cust_ref from massal_customer");
        $r = mysql_query("select cust_code,cust_ref from massal_customer a, trnsal_order_header b, trnsal_order_trailer c where a.cust_code = b.ordh_party and b.ordh_sono = c.ordt_sono  and b.ordh_fincode = c.ordt_fincode and b.ordh_comp_code = c.ordt_comp_code  and (c.ordt_qty - c.ordt_adv_qty) > 0.01 and c.ordt_clo_stat <> 'T' and b.ordh_can_stat <> 'T'  and b.ordh_comp_code = $compcode group by cust_code,cust_ref order by cust_ref ");
	
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}
function getsizedetails()
{
	mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$sono  = $_POST['sono'];
	$party = $_POST['party'];
        $finid = $_POST['finid'];
        $r=mysql_query("select var_desc as quality, var_bf as bf,var_gsm as gsm,var_name as size,stk_sr_no as reelno,stk_wt as weight from trnsal_finish_stock , massal_variety , masprd_variety where stk_var_code = var_code and var_grpcode  = var_groupcode and stk_destag = ''  
and stk_comp_code = '$compcode' and stk_finyear <= '$finid'  and stk_sono in ($sono) order by var_name, stk_sr_no");
$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}


 function getSearchPartylist()
    {
        mysql_query("SET NAMES utf8");
//        $r=mysql_query("select hsn_code,hsn_sno from mas_hsncode order by hsn_code");


        $party     = $_POST['party'];
        $qry = "select * from massal_customer where  left(cust_ref,2) != 'ZZ' and cust_ref like '%$party%' order by cust_ref";


        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

?>
