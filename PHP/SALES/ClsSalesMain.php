
<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

$grpcode = $_POST['grpcode'];



    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
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
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
  	
 function loadMillList()
    {
		global $conn;  
        $sql = "select company_code,company_name from mas_company";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
    function getmillname()
    {
		global $conn;  
     	$mname = $_POST['millcode'];
        $sql = "select company_pass from mas_company where company_code = $mname";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

    function loadFinYear()
    {
        global $conn;  
        $sql = "select * from mas_finyear order by fin_code desc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

   
 function getVarietyList()
    {
        global $conn;  

        $sql = "select var_groupcode,var_desc from masprd_variety order by var_desc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 function getMainVarietyList()
    {
		global $conn;  
 
        $sql = "select vargrp_type_code, vargrp_type_name from masprd_type order by vargrp_type_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getProductType()
    {
		global $conn;  
      	$ptypecode = $_POST['ptypecode'];
        $sql = "select vargrp_type_code, vargrp_type_name from masprd_type where vargrp_type_code = $ptypecode";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 function getSizeList()
    {
        global $conn;  

        $sql = "select var_code,var_name from massal_variety order by var_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }	
 function getSizeListOfVariety()
    {
        global $conn;  
     	$grpcode = $_POST['grpcode'];
        $sql = "select b.var_code as var_code,b.var_name as var_name,b.var_grpcode as var_grpcode ,var_gsm ,var_bf ,var_desc from masprd_variety a,massal_variety b where b.var_grpcode = a.var_groupcode and var_grpcode =$grpcode order by var_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
 function getAllCustomerList()
    {
        global $conn;  
//        $sql = "select cust_code,cust_ref from massal_customer");
        $sql = "call spsal_sel_customer()";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getAgentList()
    {
        global $conn;  
        $sql = "call spsal_sel_agent()";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


    function getAgentName()
    {
        global $conn;  
     	$custcode = $_POST['custcode'];
        $sql = "select b.cust_ref as cust_ref ,b.cust_code as cust_code from massal_customer a , vew_sal_agent b where a.cust_agent = b.cust_code and a.cust_code = '$custcode'";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


    function getRepName()
    {
        global $conn;  
     	$custcode = $_POST['custcode'];
        $sql = "select * from massal_customer a, massal_repr b , massal_tax c  where   a.cust_taxtag = c.tax_code and a.cust_repr = b.repr_code and a.cust_code =  '$custcode'";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


    function getTaxDetails()
    {
        global $conn;  
        $sql = "call spsal_sel_tax()";
        $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



    function getTransportDetails()
    {
        global $conn;  
        $sql = "call spsal_trans_master()";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


    function getBankDetails()
    {
        global $conn;  
        $sql = "call spsal_sel_bank()";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getSizecodeDetails()
    {
        global $conn;  

   	$sizecode = $_POST['sizecode'];
        $sql = "select var_size1,var_size2,var_desc,var_gsm,var_unit,var_tariffno,var_reams,var_sheets,var_inchcm from massal_variety a,masprd_variety b where a.var_grpcode = b.var_groupcode and a.var_code = $sizecode";
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

        $party = trim(str_replace(" ", "", $party)); 
        $party = trim(str_replace(".", "", $party)); 
  

        $sql = "select * from massal_customer where cust_type != 'Z' and   replace(replace(cust_ref,' ','')  ,'.','')  like '%$party%' order by cust_ref";

       $r = mysqli_query($conn, $sql);
 
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getAreaList()
    {
        global $conn;  
        $sql = "select * from massal_areaRate_group order by rate_areaname";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

?>



