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
    mysqli_set_charset($conn, "utf8");

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

//        $r = "select * from massal_rate a , massal_customer b ,masprd_type c where  rate_cust = cust_code and rate_vartype = vargrp_type_code and rate_comp_code = $compcode  and rate_fincode=$finid and  rate_code = $apprno";

  //      $sql = "select * from massal_rate a , massal_customer b ,masprd_type c where  rate_cust = cust_code and rate_vartype = vargrp_type_code and rate_comp_code = $compcode  and rate_fincode=$finid and  rate_code = $apprno");

        $sql = "select * from massal_rate a , massal_customer b ,masprd_type c , masprd_variety d where 
var_groupcode = rate_pb_variety and rate_cust = cust_code and rate_vartype = vargrp_type_code and rate_comp_code = $compcode and rate_fincode= $finid and rate_code = $apprno";

//echo $qry;



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

    $sql = "select *, DATE_FORMAT(rate_appr_date, '%d-%m-%Y') as rateapprdate   from massal_rate, masprd_type where rate_vartype  = vargrp_type_code and  rate_comp_code = '$compcode' and rate_fincode <= '$finid'    and rate_approved = 'Y'  and rate_cust = '$custcode' order by rate_appr_date desc,rate_code desc ";
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

//        $sql = "select * from massal_rate where rate_comp_code = '$compcode' and rate_fincode <= '$finid'  and rate_fincode >= '$finid'  and rate_approved = 'Y'  and rate_close = 'N' and rate_cust = '$custcode' and rate_code in ( select max(rate_code) from massal_rate where rate_comp_code = '$compcode' and rate_fincode <= '$finid'  and rate_fincode >= '$finid'  and rate_approved = 'Y'  and rate_close = 'N' and rate_cust = '$custcode')");

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

        $r="select * from massal_areawise_rate a , massal_area b ,masprd_type c where  arearate_area = area_code and arearate_vartype = vargrp_type_code and arearate_comp_code = $compcode  and arearate_fincode=$finid  and  arearate_area = $areacode and arearate_sno = (select max(arearate_sno) from massal_areawise_rate where  arearate_comp_code = $compcode   and arearate_fincode= $finid and  arearate_area = $areacode ";


        $sql = "select * from massal_areawise_rate a , massal_areaRate_group b ,masprd_type c where  arearate_area = rate_areacode and arearate_vartype = vargrp_type_code and arearate_comp_code = $compcode  and arearate_fincode=$finid  and  arearate_area = $areacode and arearate_sno = (select max(arearate_sno) from massal_areawise_rate where  arearate_comp_code = $compcode   and arearate_fincode= $finid and  arearate_area = $areacode ";
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
//        $sql = "select hsn_code,hsn_sno from mas_hsncode order by hsn_code");


        $party     = $_POST['party'];
        $party = trim(str_replace(".", "", $party)); 
        $party = trim(str_replace("-", "", $party)); 
        $party = trim(str_replace(" ", "", $party)); 

        $sql = "select * from massal_customer c  left join massal_area ma on c.cust_area = ma.area_code  where cust_type = 'C' and  cust_ref like '%$party%' order by cust_ref";

        $sql = "select * from massal_customer c  left join massal_area ma on c.cust_area = ma.area_code  where cust_type = 'C' and  replace(replace(replace(cust_ref,' ','')  ,'.',''),'-','')  like '%$party%' order by cust_ref";

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

 function getVarietydetails()
    {
        global $conn;  

	$sql = "select * from masprd_variety  where var_typecode in (14,19) order by var_desc";
    $r = mysqli_query($conn, $sql);

	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;


        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

   
?>
