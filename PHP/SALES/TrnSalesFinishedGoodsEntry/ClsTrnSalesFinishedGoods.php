<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='findFinishedGoodsEntryNo';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysql_query("SET NAMES utf8");

    switch($task){
		case "findFinishedGoodsEntryNo":
		getFinEntryNo();
		break;
		case "loadGodownDetails":
		getGodownDetails();
		break;
		case "CheckNumber":
		getNumber();
		break;
		case "loadFinishedGoodsEntryNo":
		getAllFinEntryNo();
		break;
		case "loadFinEntNoDetails":
		getFinEntryNoDetails();
		break;
		case "loadSONo":
		getSONo();
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
    

 function getFinEntryNo()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $r=mysql_query("select ifnull(max(stk_ent_no),0)+1 as sentno from trnsal_finish_stock where stk_finyear= $finid and stk_comp_code= $compcode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getAllFinEntryNo()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $r=mysql_query("select stk_ent_no from trnsal_finish_stock where stk_ent_no <> 100 and stk_finyear= $finid  and stk_comp_code= $compcode group by stk_ent_no order by stk_ent_no desc");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getFinEntryNoDetails()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $entno = $_POST['entno'];

        $r=mysql_query("select * from trnsal_finish_stock a ,massal_variety b ,masprd_variety c , mas_rg1_location d  where stk_loca = godown_code
and  b.var_grpcode = c.var_groupcode and stk_comp_code =$compcode  and stk_finyear = $finid  and stk_ent_no = $entno  and stk_var_code = b.var_code and  a.stk_deltag <> 'T' order by stk_sr_no");

        $r=mysql_query("select * from trnsal_finish_stock a ,massal_variety b ,masprd_variety c ,massal_customer where  stk_party = cust_code and b.var_grpcode = c.var_groupcode and stk_comp_code = $compcode  and stk_finyear = $finid   and stk_ent_no =$entno    and stk_var_code = b.var_code and  a.stk_deltag <> 'T' order by var_name, stk_sr_no");

        $r=mysql_query("select * from trnsal_finish_stock a ,massal_variety b ,masprd_variety c ,massal_customer d, trnsal_order_header e where  stk_sono = ordh_sono and ordh_party = cust_code and b.var_grpcode = c.var_groupcode and stk_comp_code = $compcode  and stk_finyear = $finid   and stk_ent_no =$entno    and stk_var_code = b.var_code and  a.stk_deltag <> 'T' order by var_name, stk_sr_no");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getNumber()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$rbunit   = $_POST['rbunit'];
	$no       = $_POST['rbno'];

        $r=mysql_query("select count(*) as nos, stk_ent_no,stk_ent_date from trnsal_finish_stock where stk_comp_code =$compcode and stk_finyear = $finid and stk_sr_no = $no");


        $r=mysql_query("select count(*) as nos , stk_ent_no , stk_ent_date  from trnsal_finish_stock where stk_comp_code =$compcode and stk_finyear = $finid and stk_sr_no = $no");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

/*
 function getNumber()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$rbunit   = $_POST['rbunit'];
	$no       = $_POST['rbno'];
        $r=mysql_query("select count(*) as nos from trnsal_finish_stock where stk_comp_code =$compcode and stk_finyear = $finid and stk_units = $rbunit  and stk_sr_no = $no");

        $r=mysql_query("select '10' as nos from trnsal_finish_stock where stk_comp_code = '$compcode' and stk_finyear = '$finid' and stk_units = '$rbunit'");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

*/
 function getGodownDetails()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select godown_code,godown_name from mas_rg1_location order by godown_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getSONo()
{
 mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$party = $_POST['party'];
        $r=mysql_query("select ordh_sono,ordh_sodate from trnsal_order_header where ordh_party = '$party' and ordh_comp_code =  $compcode  group by ordh_sono,ordh_sodate order by ordh_sono desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}


?>
