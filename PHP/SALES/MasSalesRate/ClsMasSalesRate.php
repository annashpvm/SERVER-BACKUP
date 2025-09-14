<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

//session_start();	

//query = "select ifnull(max(rate_code),0)+1 as ratecode from massal_rate where rate_comp_code = 1 and rate_fincode=20";
//$result = mysql_query($query);
//$rec = mysql_fetch_array($result);
//$rateseq=$rec['ratecode'];


    $task='findRateEntryNo';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysql_query("SET NAMES utf8");

    switch($task){
		case "findRateEntryNo":
		getRateEntryNo();
		break;
		case "loadRateEntryNo":
		getRateEntryNolist();
		break;
		case "EditApprovalNo":
		getApprovalNo();
		break;
		case "loadBF":
		getBF();
		break;
		case "loadAllPriceList":
		getAllPriceList();
		break;

		case "loadPriceList":
		getPriceListDetails();
		break;


		case "findAreaRateEntryNo":
		getAreaRateEntryNo();
		break;

		case "loadAreaRateList":
		getAreaRateEntryNolist();
		break;

		case "EditAreaApprovalNo":
		getAreaApprovalNo();
		break;

		case "findAreaRate":
		getAreaRate();
		break;
		case "loadSearchPartylist":
		getSearchPartylist();
		break;
		case "loadShade":
		getShades();
		break;

		case "LoadVarietydetails":
		getVarietydetails();
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
    

 function getRateEntryNo()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];

        $r=mysql_query("select ifnull(max(rate_code),0)+1 as rateno from massal_rate where rate_comp_code = $compcode and rate_fincode= $finid");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
          

 function getRateEntryNolist()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];

        $r=mysql_query("select rate_code from massal_rate where rate_comp_code = $compcode and rate_fincode= $finid group by rate_code order by rate_code desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getApprovalNo()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$apprno = $_POST['apprno'];

//        $r = "select * from massal_rate a , massal_customer b ,masprd_type c where  rate_cust = cust_code and rate_vartype = vargrp_type_code and rate_comp_code = $compcode  and rate_fincode=$finid and  rate_code = $apprno";

  //      $r=mysql_query("select * from massal_rate a , massal_customer b ,masprd_type c where  rate_cust = cust_code and rate_vartype = vargrp_type_code and rate_comp_code = $compcode  and rate_fincode=$finid and  rate_code = $apprno");

        $qry = "select * from massal_rate a , massal_customer b ,masprd_type c , masprd_variety d where 
var_groupcode = rate_pb_variety and rate_cust = cust_code and rate_vartype = vargrp_type_code and rate_comp_code = $compcode and rate_fincode= $finid and rate_code = $apprno";

//echo $qry;

        $r=mysql_query($qry);



	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getBF()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select * from mas_bf ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getAllPriceList()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$custcode = $_POST['party'];

        $r=mysql_query("select *, DATE_FORMAT(rate_appr_date, '%d-%m-%Y') as rateapprdate   from massal_rate, masprd_type where rate_vartype  = vargrp_type_code and  rate_comp_code = '$compcode' and rate_fincode <= '$finid'    and rate_approved = 'Y'  and rate_cust = '$custcode' order by rate_appr_date desc,rate_code desc ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getPriceListDetails()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$custcode = $_POST['party'];
	$apprno  = $_POST['apprno'];

//        $r=mysql_query("select * from massal_rate where rate_comp_code = '$compcode' and rate_fincode <= '$finid'  and rate_fincode >= '$finid'  and rate_approved = 'Y'  and rate_close = 'N' and rate_cust = '$custcode' and rate_code in ( select max(rate_code) from massal_rate where rate_comp_code = '$compcode' and rate_fincode <= '$finid'  and rate_fincode >= '$finid'  and rate_approved = 'Y'  and rate_close = 'N' and rate_cust = '$custcode')");

        $r=mysql_query("select *  from massal_rate where rate_comp_code = '$compcode' and rate_fincode <= '$finid'  and rate_fincode >= '$finid'  and rate_approved = 'Y'  and rate_close = 'N' and rate_cust = '$custcode' and rate_code = $apprno ");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getAreaRateEntryNo()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];

        $r=mysql_query("select ifnull(max(arearate_sno),0)+1 as rateno from massal_areawise_rate where arearate_comp_code = $compcode and arearate_fincode= $finid");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
  

 function getAreaRateEntryNolist()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];


        $r=mysql_query("select arearate_sno from massal_areawise_rate where arearate_comp_code = $compcode and arearate_fincode= $finid   group by arearate_sno order by arearate_sno desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getAreaApprovalNo()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$apprno = $_POST['apprno'];


        $r=mysql_query("select * from massal_areawise_rate a , massal_area b ,masprd_type c where  arearate_area = area_code and arearate_vartype = vargrp_type_code and arearate_comp_code = $compcode  and arearate_fincode=$finid and  arearate_sno = $apprno");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getAreaRate()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$areacode = $_POST['areacode'];

        $r="select * from massal_areawise_rate a , massal_area b ,masprd_type c where  arearate_area = area_code and arearate_vartype = vargrp_type_code and arearate_comp_code = $compcode  and arearate_fincode=$finid  and  arearate_area = $areacode and arearate_sno = (select max(arearate_sno) from massal_areawise_rate where  arearate_comp_code = $compcode   and arearate_fincode= $finid and  arearate_area = $areacode) ";


        $r=mysql_query("select * from massal_areawise_rate a , massal_areaRate_group b ,masprd_type c where  arearate_area = rate_areacode and arearate_vartype = vargrp_type_code and arearate_comp_code = $compcode  and arearate_fincode=$finid  and  arearate_area = $areacode and arearate_sno = (select max(arearate_sno) from massal_areawise_rate where  arearate_comp_code = $compcode   and arearate_fincode= $finid and  arearate_area = $areacode) ");
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
        $party = trim(str_replace(".", "", $party)); 
        $party = trim(str_replace("-", "", $party)); 
        $party = trim(str_replace(" ", "", $party)); 

        $qry = "select * from massal_customer c  left join massal_area ma on c.cust_area = ma.area_code  where cust_type = 'C' and  cust_ref like '%$party%' order by cust_ref";

        $qry = "select * from massal_customer c  left join massal_area ma on c.cust_area = ma.area_code  where cust_type = 'C' and  replace(replace(replace(cust_ref,' ','')  ,'.',''),'-','')  like '%$party%' order by cust_ref";


        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getShades()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select  * from massal_shade order by shade_code");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';

    }

 function getVarietydetails()
    {
        mysql_query("SET NAMES utf8");

	$r=mysql_query("select * from masprd_variety  where var_typecode = 14 order by var_desc");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;


        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

   
?>
