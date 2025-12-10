<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadissno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysqli_set_charset($conn, "utf8");
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
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    

 function getSearchItemlist()
    {
         global $conn;
        $itemname = trim(strtoupper($_POST['itemname']));

        if ($itemname == '') 
            $sql = "select * from masrm_item_header  order by itmh_name";
        else
            $sql = "select * from masrm_item_header where itmh_name like '%$itemname%' order by itmh_name";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
  

 function getSearchLedgerlist()
    {
         global $conn;
        $ledname = strtoupper($_POST['ledger']);
        $ledname = trim(str_replace(" ", "", $ledname)); 
        $ledname = trim(str_replace(".", "", $ledname)); 


        if ($ledname == '')
	        $sql = "select * from (select  cust_code,cust_name,qc_rm_supcode,cust_state,sup_wp_gstinv_supplier_yn,
cust_cr_days,cust_grace_days from trn_qc_rm_inspection,massal_customer  where    cust_code = qc_rm_supcode group by cust_code,cust_name,qc_rm_supcode,cust_state,sup_wp_gstinv_supplier_yn ,cust_cr_days,cust_grace_days ) a1 order by cust_name";
        else

	        $sql = "select * from ( select  cust_code,cust_name,qc_rm_supcode,cust_state,cust_cr_days,cust_grace_days from trn_qc_rm_inspection,massal_customer  where   cust_code = qc_rm_supcode group by cust_code,cust_name, qc_rm_supcode, cust_state,cust_cr_days,cust_grace_days  ) a1 where replace(replace(cust_name,' ','')  ,'.','')  like '%$ledname%'  order by cust_name";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 

 function getSeqno()
    {
         global $conn;
	$compcode = $_POST['compcode'];
	$finid = $_POST['fincode'];

	$sql = "select ifnull(max(rm_rate_seqno),0) + 1 as seqno from masrm_supplier_rate where rm_rate_compcode='$compcode' and rm_rate_fincode='$finid'";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getSeqnoList()
    {
         global $conn;
	$compcode = $_POST['compcode'];
	$finid = $_POST['fincode'];

	$sql = "select rm_rate_seqno from masrm_supplier_rate where rm_rate_compcode='$compcode' and rm_rate_fincode='$finid' group by rm_rate_seqno order by rm_rate_seqno desc";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getEntryNoDetails()
    {
         global $conn;
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];
	$entno    = $_POST['entno'];

	$sql = "select * from masrm_supplier_rate , massal_customer , masrm_item_header ,mas_area where rm_rate_areacode = area_code and  rm_rate_itemcode = itmh_code and rm_rate_supcode = cust_code and rm_rate_compcode = '$compcode' and rm_rate_fincode= '$finid' and rm_rate_seqno = $entno order by area_name,itmh_name";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getSearchArealist()
    {
         global $conn;
        $areaname = strtoupper($_POST['areaname']);
        $areaname = trim(str_replace(" ", "", $areaname)); 
        $areaname = trim(str_replace(".", "", $areaname)); 
 

	        $sql = "select * from mas_area  where replace(replace(area_name,' ','')  ,'.','')  like '%$areaname%'  order by area_name";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 


 function getSupplierEntryNoDetails()
    {
         global $conn;
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];
	$supcode  = $_POST['supcode'];

	$sql = "select rm_rate_seqno, DATE_FORMAT(rm_rate_date, '%d-%m-%Y') as  rm_rate_date from masrm_supplier_rate where rm_rate_compcode = $compcode and  rm_rate_fincode <= $finid and rm_rate_supcode = $supcode group by rm_rate_seqno,rm_rate_date order by rm_rate_seqno desc";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

?>
