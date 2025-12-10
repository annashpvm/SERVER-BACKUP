<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task="loadArrivals";

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadArrivals":
		getArrivals();
		break;
		case "loadPartywisePurchases":
		getPartywisePurchases();
		break;

		case "loadPartyMonthArrivals":
                getPartyMonthArrivals();
		break;

		case "loadItemwiseArrivals":
                getItemwiseArrivals();
		break;
		case "loadItem_PartywiseArrivals":
                getItem_PartywiseArrivals();
		break;
		case "loadParty_Item_GRNwise_Arrivals":
                getParty_Item_GRNwise_Arrivals();
		break;
		case "loadDailyDNList":
                getDailyDNList();
		break;



	        default:
               	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   

 function getArrivals()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];

	
$sql = "select UPPER(monthname(rech_date)) as rmonth ,  sum(rect_grnqty) as grnqty, sum(rech_totalamount) as purvalue from 
(select rech_date ,  rect_grnqty , rech_totalamount from trnfu_receipt_header join trnfu_receipt_trailer on rech_seqno =  rect_hdseqno  where rech_date between  '$startdate'  and curdate() and rech_compcode = $compcode  and rech_fincode =  $finid)a  group by UPPER(monthname(rech_date))";
	


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getPartywisePurchases()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $startdate = $_POST['startdate'];
        $enddate = $_POST['enddate'];

$sql = "select sup_code, sup_name ,  sum(rect_grnqty) as grnqty, sum(rech_totalamount) as purvalue from 
(select rech_sup_code,  rect_grnqty , rech_totalamount from trnfu_receipt_header join trnfu_receipt_trailer on rech_seqno =  rect_hdseqno  where rech_date between '$startdate' and '$enddate'  and rech_compcode = $compcode and rech_fincode = $finid
) a  , massal_customer where rech_sup_code = sup_code   group by sup_code, sup_name  order by sup_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }	




 function getPartyMonthArrivals()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$supcode = $_POST['supcode'];

$sql = "select  DATE_FORMAT(rech_date, '%d-%m-%Y')  as rech_date,rech_no,rech_sup_code, rech_billno, DATE_FORMAT(rech_billdate, '%d-%m-%Y') as rech_billdate,rect_item_code,rect_itemrate, rect_grnqty , rect_itemvalue ,itmh_name, rech_truckno  from (select rech_date,rech_no,rech_sup_code, rech_billno,rech_billdate,rect_item_code,rect_itemrate, rect_grnqty , rect_itemvalue, rech_truckno from trnfu_receipt_header join trnfu_receipt_trailer on rech_seqno =  rect_hdseqno  where rech_date between '$startdate' and curdate() and rech_compcode = $compcode and rech_fincode = $finid 
)
a  , massal_customer , masfu_item_header where rect_item_code = itmh_code and  rech_sup_code = sup_code   and  rech_sup_code = $supcode";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }




 function getItemwiseArrivals()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
        $enddate   = $_POST['enddate'];
        $sql = "call spfu_rep_itemwisereceipt_abstract($compcode ,'$startdate' ,'$enddate') ";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }




 function getItem_PartywiseArrivals()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
        $enddate   = $_POST['enddate'];

        $itemcode   = $_POST['itemcode'];

        $sql = "call spfu_rep_item_partywise_receipt($compcode ,'$startdate' ,'$enddate',$itemcode) ";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }





 function getParty_Item_GRNwise_Arrivals()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate= $_POST['startdate'];
        $enddate  = $_POST['enddate'];
	$supcode  = $_POST['supcode'];
	$itemcode = $_POST['itemcode'];

        $sql = "call spfu_rep_item_party_GRNwise_receipt($compcode ,'$startdate' ,'$enddate',$itemcode,$supcode) ";



    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getDailyDNList()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate= $_POST['startdate'];
        $enddate  = $_POST['enddate'];

        $sql = "select cust_ref,DATE_FORMAT(qc_fuel_debitnote_date, '%d-%m-%Y') as qc_fuel_debitnote_date, qc_fuel_debitnote_no, qc_fuel_debitamount, qc_fuel_entryno,DATE_FORMAT(qc_fuel_entrydate, '%d-%m-%Y') as  qc_fuel_entrydate,qc_fuel_ticketno,qc_fuel_truck  from trn_qc_fuel_inspection , massal_customer where qc_fuel_supcode = cust_code and  qc_fuel_debitnote_no <> '' and qc_fuel_debitnote_date between '$startdate' and '$enddate' and qc_fuel_compcode = $compcode and qc_fuel_fincode = $finid   order by qc_fuel_debitnote_date, qc_fuel_debitnote_no";



    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

?>




