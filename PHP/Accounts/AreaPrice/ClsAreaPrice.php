<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

//session_start();	

//query = "select ifnull(max(rate_code),0)+1 as ratecode from massal_rate where rate_comp_code = 1 and rate_fincode=20";
//$result = mysqli_query($conn, $query);
//$rec = mysqli_fetch_array($result);
//$rateseq=$rec['ratecode'];


    $task='findRateEntryNo';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    global $conn;

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

		case "loadVariety":
		getVariety();
		break;

		case "loadVariety_for_Customer":
		getVariety_for_Customer();
		break;

		case "findCustomerRate":
		getCustomerRate();
		break;

		case "loadAllPriceMasterList":
		getAllPriceMasterList();
		break;

		case "loadAllPriceMasterListCustomer":
		getAllPriceMasterListCustomer();
		break;
		case "loadShade":
		getShades();
		break;

		case "findSORaised":
		getSORaised();
		break;


		default:
        	echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
    }

    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    

 function getRateEntryNo()
    {
        global $conn;
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];

        $sql = "select ifnull(max(rate_code),0)+1 as rateno from massal_rate where rate_comp_code = $compcode and rate_fincode= $finid";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
          

 function getRateEntryNolist()
    {
        global $conn;
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];

        $sql = "select rate_code from massal_rate where rate_comp_code = $compcode and rate_fincode= $finid group by rate_code order by rate_code desc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getApprovalNo()
    {
        global $conn;
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$apprno = $_POST['apprno'];

        $r = "select * from massal_rate a , massal_customer b ,masprd_type c where  rate_cust = cust_code and rate_vartype = vargrp_type_code and rate_comp_code = $compcode  and rate_fincode=$finid and  rate_code = $apprno";


//echo $r;


        $sql = "select * from massal_rate a , massal_customer b ,masprd_type c where  rate_cust = cust_code and rate_vartype = vargrp_type_code and rate_comp_code = $compcode  and rate_fincode=$finid and  rate_code = $apprno ";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getBF()
    {
        global $conn;

        $sql = "select * from mas_bf ";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getAllPriceList()
    {
        global $conn;
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$custcode = $_POST['party'];

//        $sql = "select * from massal_rate where rate_comp_code = '$compcode' and rate_fincode <= '$finid'  and rate_fincode >= '$finid'  and rate_approved = 'Y'  and rate_close = 'N' and rate_cust = '$custcode' and rate_code in ( select max(rate_code) from massal_rate where rate_comp_code = '$compcode' and rate_fincode <= '$finid'  and rate_fincode >= '$finid'  and rate_approved = 'Y'  and rate_close = 'N' and rate_cust = '$custcode')";

   //     $sql = "select rate_code, DATE_FORMAT(rate_appr_date, '%d-%m-%Y') as rate_appr_date from massal_rate where rate_comp_code = '$compcode' and rate_fincode <= '$finid'  and rate_fincode >= '$finid'  and rate_approved = 'Y'  and rate_close = 'N' and rate_cust = '$custcode' ";

        $sql = "select *, DATE_FORMAT(rate_appr_date, '%d-%m-%Y') as rateapprdate   from massal_rate, masprd_type where rate_vartype  = vargrp_type_code and  rate_comp_code = '$compcode' and rate_fincode <= '$finid'    and rate_approved = 'Y'  and rate_close = 'N' and rate_cust = '$custcode' order by rate_code desc ";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



 function getPriceListDetails()
    {
        global $conn;
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$custcode = $_POST['party'];
	$apprno  = $_POST['apprno'];

//        $sql = "select * from massal_rate where rate_comp_code = '$compcode' and rate_fincode <= '$finid'  and rate_fincode >= '$finid'  and rate_approved = 'Y'  and rate_close = 'N' and rate_cust = '$custcode' and rate_code in ( select max(rate_code) from massal_rate where rate_comp_code = '$compcode' and rate_fincode <= '$finid'  and rate_fincode >= '$finid'  and rate_approved = 'Y'  and rate_close = 'N' and rate_cust = '$custcode')";

        $sql = "select *  from massal_rate where rate_comp_code = '$compcode' and rate_fincode <= '$finid'  and rate_fincode >= '$finid'  and rate_approved = 'Y'  and rate_close = 'N' and rate_cust = '$custcode' and rate_code = $apprno ";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getAreaRateEntryNo()
    {
        global $conn;
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];

        $sql = "select ifnull(max(arearate_sno),0)+1 as rateno from massal_areawise_rate where arearate_comp_code = $compcode and arearate_fincode= $finid";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
  

 function getAreaRateEntryNolist()
    {
        global $conn;
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];


        $sql = "select arearate_sno from massal_areawise_rate where arearate_comp_code = $compcode and arearate_fincode= $finid   group by arearate_sno order by arearate_sno desc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getAreaApprovalNo()
    {
        global $conn;
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$apprno = $_POST['apprno'];


        $sql = "select * from massal_areawise_rate a , massal_area b ,masprd_type c where  arearate_area = area_code and arearate_vartype = vargrp_type_code and arearate_comp_code = $compcode  and arearate_fincode=$finid and  arearate_sno = $apprno";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getAreaRate()
    {
        global $conn;
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$areacode = $_POST['areacode'];
	$varcode  = $_POST['varcode'];



        $sql = "select * from massal_areawise_rate a , massal_areaRate_group b ,masprd_type c where  arearate_area = rate_areacode and arearate_vartype = vargrp_type_code and arearate_comp_code = $compcode  and arearate_fincode=$finid  and  arearate_area = $areacode   and arearate_vartype = $varcode  and arearate_sno = (select max(arearate_sno) from massal_areawise_rate where  arearate_comp_code = $compcode   and arearate_fincode= $finid and  arearate_area = $areacode and arearate_vartype = $varcode) ";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getSearchPartylist()
    {
        global $conn;
//        $sql = "select hsn_code,hsn_sno from mas_hsncode order by hsn_code";

        $party = strtoupper($_POST['party']);
        $party = trim(str_replace(" ", "", $party)); 
        $party = trim(str_replace(".", "", $party)); 

        $sql = "select * from massal_customer where cust_type = 'C' and  cust_ref like '%$party%' order by cust_ref";

        $sql = "select * from massal_customer c  left join massal_area ma on c.cust_area = ma.area_code  where 
cust_type = 'C' and  left(cust_ref,2) != 'zz' and  replace(replace(cust_ref,' ','')  ,'.','')  like 
'%$party%' order by cust_ref";

  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

  
 function getVariety()
    {
        global $conn;
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$areacode = $_POST['areacode'];

        $sql = "select * from massal_customer where cust_type = 'C' and  cust_ref like '%$party%' order by cust_ref";

        $sql = "      select vargrp_type_name, vargrp_type_code from masprd_type , massal_areawise_rate , massal_areaRate_group where arearate_area = rate_areacode and arearate_area = $areacode and vargrp_type_code =arearate_vartype and arearate_comp_code = $compcode and arearate_fincode = $finid group by  vargrp_type_name, vargrp_type_code order by vargrp_type_code";

  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 


  
 function getVariety_for_Customer()
    {
        global $conn;
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$custcode = $_POST['custcode'];

  //      $sql = "select * from massal_customer where cust_type = 'C' and  cust_ref like '%$party%' order by cust_ref";

        $sql = "select vargrp_type_name, vargrp_type_code from masprd_type , massal_rate where 
   vargrp_type_code = rate_vartype and rate_comp_code = $compcode and rate_fincode = $finid
   and rate_cust = $custcode  group by  vargrp_type_name, vargrp_type_code order by vargrp_type_code";

  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 

 function getCustomerRate()
    {
        global $conn;
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$custcode = $_POST['custcode'];
	$varcode  = $_POST['varcode'];
	$shade  = $_POST['shade'];



        $sql = "select * from masprd_type , massal_rate where    vargrp_type_code = rate_vartype and rate_comp_code = $compcode and rate_fincode = $finid and rate_cust = $custcode and vargrp_type_code = $varcode  and rate_code in (select max(rate_code) from masprd_type , massal_rate where vargrp_type_code = rate_vartype and rate_comp_code = $compcode and rate_fincode = $finid and rate_cust = $custcode and vargrp_type_code = $varcode )";


        $sql = "select * from masprd_type , massal_rate , masprd_variety  where  rate_pb_variety = var_groupcode and  vargrp_type_code = rate_vartype and rate_comp_code = $compcode and rate_fincode = $finid and rate_cust = $custcode and vargrp_type_code = $varcode  and rate_code in (select max(rate_code) from masprd_type , massal_rate where vargrp_type_code = rate_vartype and rate_comp_code = $compcode and rate_fincode = $finid and rate_cust = $custcode and vargrp_type_code = $varcode )";

//echo $r;

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }




 function getAllPriceMasterList()
    {
        global $conn;
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];



        $r="select   a.* , b.* ,c.* , DATE_FORMAT(arearate_appr_date, '%d-%m-%Y') as appr_date , e.usr_name enteredby , v.usr_name verifiedby  from massal_areawise_rate a , massal_area b ,masprd_type c ,
userMaster e , userMaster v where  arearate_area = area_code and arearate_entered = e.usr_code and arearate_verified = v.usr_code and arearate_vartype = vargrp_type_code and arearate_comp_code = $compcode and arearate_fincode = $finid and arearate_appr_date >= '2024-08-08'";

//echo $r;

        $sql = "select   a.* , b.* ,c.* , DATE_FORMAT(arearate_appr_date, '%d-%m-%Y') as appr_date , e.usr_name enteredby , v.usr_name verifiedby  from massal_areawise_rate a , massal_areaRate_group b ,masprd_type c ,
userMaster e , userMaster v where  arearate_area = rate_areacode and arearate_entered = e.usr_code and arearate_verified = v.usr_code and arearate_vartype = vargrp_type_code and arearate_comp_code = $compcode and arearate_fincode = $finid and arearate_appr_date >= '2024-08-01' order by arearate_appr_date desc, arearate_sno desc";



    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getAllPriceMasterListCustomer()
    {
        global $conn;
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];






  //      $sql = "select   a.* , b.* ,c.* , DATE_FORMAT(rate_appr_date, '%d-%m-%Y') as appr_date , e.usr_name enteredby , v.usr_name verifiedby  from massal_rate a , massal_customer b ,masprd_type c ,userMaster e , userMaster v where  rate_cust = cust_code and rate_entered = e.usr_code and rate_verified = v.usr_code and rate_vartype = vargrp_type_code and rate_comp_code = $compcode and rate_fincode = $finid and rate_appr_date >= '2024-08-08' and rate_approved = 'Y' order by rate_appr_date desc, rate_code ";


        $sql = "select   a.* , b.* ,c.* , DATE_FORMAT(rate_appr_date, '%d-%m-%Y') as appr_date , e.usr_name enteredby , v.usr_name verifiedby  from massal_rate a , massal_customer b ,masprd_type c ,userMaster e , userMaster v where  rate_cust = cust_code and rate_entered = e.usr_code and rate_verified = v.usr_code and rate_vartype = vargrp_type_code and rate_comp_code = $compcode and rate_fincode = $finid and rate_appr_date >= NOW() - INTERVAL 30 DAY and rate_approved = 'Y' order by rate_appr_date desc, rate_code desc ";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getShades()
    {
        global $conn;
        $sql = "select  * from massal_shade order by shade_code";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);

    }
  

 function getSORaised()
    {
        global $conn;
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$apprno   = $_POST['apprno'];

        $sql = "select count(*) as noofrec from trnsal_order_header where ordh_comp_code = $compcode and  ordh_appr_fincode = $finid  and ordh_apprno = $apprno";

        $sql = "select ordh_sono from trnsal_order_header where ordh_comp_code = $compcode and  ordh_appr_fincode = $finid  and ordh_apprno = $apprno";

	
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 
?>
