
<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

$grpcode = $_POST['grpcode'];

echo $task;

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
        switch($task){
		case "loadmillname":
		loadMillList();
		break;
		case "findmillname":
		getmillname();
		break;
		case "loadFinYear":
		loadFinYear();
		break;
		case "loadVariety":
		getVarietyList();
		break;
		case "loadMainVariety":
		getMainVarietyList();
		break;
		case "loadSizeDetails":
		getSizeList();
		break;
		case "loadSizeDetailsOfVariety":
		getSizeListOfVariety();
		break;
		case "loadAllCustomerDetails":
		getAllCustomerList();
		break;
		case "loadAgentDetails":
		getAgentList();
		break;
		case "findSizeDetails":
		getSizecodeDetails();
		break;
		case "findAgentName":
		getAgentName();
		break;
		case "findRepName":
		getRepName();
		break;

		case "loadTaxDetails":
		getTaxDetails();
		break;
		case "loadBankDetails":
		getBankDetails();
		break;
		case "loadTransportDetails":
		getTransportDetails();
		break;
		case "findProductType":
		getProductType();
		break;
		case "loadSearchPartylist":
		getSearchPartylist();
		break;
		case "loadAreaList":
		getAreaList();
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
    
  	
 function loadMillList()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select company_code,company_name from mas_company");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
    function getmillname()
    {
        mysql_query("SET NAMES utf8");
     	$mname = $_POST['millcode'];
        $r=mysql_query("select company_pass from mas_company where company_code = $mname");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

    function loadFinYear()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select * from mas_finyear order by fin_code desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

   
 function getVarietyList()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select var_groupcode,var_desc from masprd_variety order by var_desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 function getMainVarietyList()
    {
        mysql_query("SET NAMES utf8");
 
        $r=mysql_query("select vargrp_type_code, vargrp_type_name from masprd_type order by vargrp_type_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getProductType()
    {
        mysql_query("SET NAMES utf8");
      	$ptypecode = $_POST['ptypecode'];
        $r=mysql_query("select vargrp_type_code, vargrp_type_name from masprd_type where vargrp_type_code = $ptypecode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 function getSizeList()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select var_code,var_name from massal_variety order by var_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	
 function getSizeListOfVariety()
    {
        mysql_query("SET NAMES utf8");
     	$grpcode = $_POST['grpcode'];
        $r=mysql_query("select b.var_code as var_code,b.var_name as var_name,b.var_grpcode as var_grpcode ,var_gsm ,var_bf ,var_desc from masprd_variety a,massal_variety b where b.var_grpcode = a.var_groupcode and var_grpcode =$grpcode order by var_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
 function getAllCustomerList()
    {
        mysql_query("SET NAMES utf8");
//        $r=mysql_query("select cust_code,cust_ref from massal_customer");
        $r=mysql_query("call spsal_sel_customer()");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getAgentList()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("call spsal_sel_agent()");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


    function getAgentName()
    {
        mysql_query("SET NAMES utf8");
     	$custcode = $_POST['custcode'];
        $r=mysql_query("select b.cust_ref as cust_ref ,b.cust_code as cust_code from massal_customer a , vew_sal_agent b where a.cust_agent = b.cust_code and a.cust_code = '$custcode'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


    function getRepName()
    {
        mysql_query("SET NAMES utf8");
     	$custcode = $_POST['custcode'];
        $r=mysql_query("select * from massal_customer a, massal_repr b , massal_tax c  where   a.cust_taxtag = c.tax_code and a.cust_repr = b.repr_code and a.cust_code =  '$custcode'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


    function getTaxDetails()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("call spsal_sel_tax()");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



    function getTransportDetails()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("call spsal_trans_master()");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


    function getBankDetails()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("call spsal_sel_bank()");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getSizecodeDetails()
    {
        mysql_query("SET NAMES utf8");

   	$sizecode = $_POST['sizecode'];
        $r=mysql_query("select var_size1,var_size2,var_desc,var_gsm,var_unit,var_tariffno,var_reams,var_sheets,var_inchcm from massal_variety a,masprd_variety b where a.var_grpcode = b.var_groupcode and a.var_code = $sizecode");
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

        $party = trim(str_replace(" ", "", $party)); 
        $party = trim(str_replace(".", "", $party)); 
  

        $qry = "select * from massal_customer where cust_type != 'Z' and   replace(replace(cust_ref,' ','')  ,'.','')  like '%$party%' order by cust_ref";


        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getAreaList()
    {
        mysql_query("SET NAMES utf8");
        $qry = "select * from massal_areaRate_group order by rate_areaname";


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



