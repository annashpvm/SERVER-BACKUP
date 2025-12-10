<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task="loadArrivals";

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysqli_set_charset($conn, "utf8");



    switch ($task) {
        case "loadArrivals":
            getArrivals();
            break;
    
        case "loadPartywisePurchases":
            getPartywisePurchases();
            break;
    
        case "loadPartyMonthArrivals":
            getPartyMonthArrivals();
            break;
    
        case "loadPartyItemArrivals":
            getPartyItemArrivals();
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
    
        case "loadDatewiseArrivals":
            getDatewiseArrivals();
            break;
    
        case "loadRMArrivalsDate":
            getRMArrivalsDate();
            break;
    
        case "loadDatewiseTruck":
            getDatewiseTruck();
            break;
    
        case "loadItemList":
            getItemList();
            break;
    
        case "loadSupPOs":
            getSupPOs();
            break;
    
        case "loadDailyDNList":
            getDailyDNList();
            break;
    
        default:
            echo '{"failure":true}';
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
(select rech_date ,  rect_grnqty , rech_totalamount from trnrm_receipt_header join trnrm_receipt_trailer on rech_seqno =  rect_hdseqno  where rech_date between  '$startdate'  and curdate() and rech_compcode = $compcode  and rech_fincode =  $finid
union all
select rech_date ,  rect_grnqty , rech_totalamount from trnirm_receipt_header join trnirm_receipt_trailer on rech_seqno =  rect_hdseqno  where rech_date between  '$startdate'  and curdate() and rech_compcode = $compcode  and rech_fincode =  $finid)
a  group by UPPER(monthname(rech_date))";
	


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

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
        $startdate = $_POST['startdate'];
        $enddate   = $_POST['enddate'];

$sql = "select cust_code, cust_name ,  sum(rect_grnqty) as grnqty, sum(rech_totalamount) as purvalue from 
(select rech_sup_code,  rect_grnqty , rech_totalamount from trnrm_receipt_header join trnrm_receipt_trailer on rech_seqno =  rect_hdseqno  where rech_date between '$startdate' and '$enddate'  and rech_compcode = $compcode and rech_fincode = $finid
union all
select rech_sup_code , rect_grnqty , rech_totalamount from trnirm_receipt_header join trnirm_receipt_trailer on rech_seqno =  rect_hdseqno  where rech_date between '$startdate' and '$enddate'  and rech_compcode = $compcode and rech_fincode = $finid) a  , massal_customer where rech_sup_code = cust_code   group by cust_code, cust_name  order by cust_name";

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
        $enddate   = $_POST['enddate'];
	$supcode = $_POST['supcode'];



$sql = "select  DATE_FORMAT(rech_date, '%d-%m-%Y')  as rech_date,rech_no,rech_sup_code, rech_billno, DATE_FORMAT(rech_billdate, '%d-%m-%Y') as rech_billdate,rect_item_code,rect_itemrate, rect_grnqty , rect_itemvalue ,itmh_name, rech_truckno  from (select rech_date,rech_no,rech_sup_code, rech_billno,rech_billdate,rect_item_code,rect_itemrate, rect_grnqty , rect_itemvalue, rech_truckno from trnrm_receipt_header join trnrm_receipt_trailer on rech_seqno =  rect_hdseqno  where rech_date between '$startdate' and '$enddate' and rech_compcode = $compcode and rech_fincode = $finid 
union all
 select rech_date,rech_no,rech_sup_code, rech_billno,rech_billdate,rect_item_code,rect_itemrate, rect_grnqty , rect_itemvalue, rech_truckno  from trnirm_receipt_header join trnirm_receipt_trailer on rech_seqno =  rect_hdseqno  where rech_date between '$startdate' and '$enddate' and rech_compcode = $compcode and rech_fincode =$finid )
a  , massal_customer , masrm_item_header where rect_item_code = itmh_code and  rech_sup_code = cust_code   and  rech_sup_code = $supcode order by rech_date";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getPartyItemArrivals()
    {
        global $conn; 

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
        $enddate   = $_POST['enddate'];
	$supcode = $_POST['supcode'];



$sql = "select  itmh_name , rect_item_code ,  sum(rect_grnqty)  rect_grnqty, sum(rect_itemvalue) rect_itemvalue from (select rech_date,rech_no,rech_sup_code, rech_billno,rech_billdate,rect_item_code,rect_itemrate, rect_grnqty , rect_itemvalue, rech_truckno from trnrm_receipt_header join trnrm_receipt_trailer on rech_seqno =  rect_hdseqno  where rech_date between '$startdate' and '$enddate' and rech_compcode = $compcode and rech_fincode = $finid union all
select  rech_date,rech_no,rech_sup_code, rech_billno,rech_billdate,rect_item_code,rect_itemrate, rect_grnqty , rect_itemvalue, rech_truckno from trnirm_receipt_header join trnirm_receipt_trailer on rech_seqno =  rect_hdseqno  where rech_date between '$startdate' and '$enddate' and rech_compcode = $compcode and rech_fincode = $finid )a  , massal_customer , masrm_item_header where rect_item_code = itmh_code and  rech_sup_code = cust_code   and  rech_sup_code = $supcode group by itmh_name , rect_item_code ";


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
        $sql = "call sprm_rep_itemwisereceipt($compcode ,'$startdate' ,'$enddate') ";


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

        $sql = "call sprm_rep_item_partywise_receipt($compcode ,'$startdate' ,'$enddate',$itemcode) ";


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


$sql = "select  DATE_FORMAT(rech_date, '%d-%m-%Y')  as rech_date,rech_no,rech_sup_code, rech_billno, DATE_FORMAT(rech_billdate, '%d-%m-%Y') as rech_billdate,rect_item_code,rect_itemrate, rect_grnqty , rect_itemvalue ,itmh_name, rech_truckno  from (select rech_date,rech_no,rech_sup_code, rech_billno,rech_billdate,rect_item_code,rect_itemrate, rect_grnqty , rect_itemvalue, rech_truckno from trnrm_receipt_header join trnrm_receipt_trailer on rech_seqno =  rect_hdseqno  where rech_date between '$startdate' and '$enddate' and rech_compcode = $compcode and rech_fincode = $finid 
union all
 select rech_date,rech_no,rech_sup_code, rech_billno,rech_billdate,rect_item_code,rect_itemrate, rect_grnqty , rect_itemvalue, rech_truckno  from trnirm_receipt_header join trnirm_receipt_trailer on rech_seqno =  rect_hdseqno  where rech_date between '$startdate' and '$enddate' and rech_compcode = $compcode and rech_fincode =$finid )
a  , massal_customer , masrm_item_header where rect_item_code = itmh_code and  rech_sup_code = cust_code   and  rech_sup_code = $supcode and rect_item_code = $itemcode  order by rech_date";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



 function getDatewiseArrivals()
    {
        global $conn; 

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate= $_POST['startdate'];
        $enddate  = $_POST['enddate'];


        $sql = "select DATE_FORMAT(qc_rm_ticketdate, '%d-%m-%Y') as ticketdate ,qc_rm_ticketdate  , sum(qc_rm_ticketwt) ticketwt , sum(qc_rm_acceptqty) acceptedwt from trn_qc_rm_inspection where qc_rm_fincode =  $finid and qc_rm_compcode =  $compcode and qc_rm_ticketdate between '$startdate' and '$enddate' group by qc_rm_ticketdate";

        $r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
	$jsonresult = JEncode($arr);
	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getRMArrivalsDate()
    {
        global $conn; 

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$repdate= $_POST['repdate'];

        $sql = "select  sup_refname,sup_gstin,qc_rm_truck,qc_rm_entryno, qc_rm_ticketno, qc_rm_ticketwt,qc_rm_moisper_totalmaterial,qc_rm_moisforqty,qc_rm_moisper, qc_rm_moisqty, qc_rm_llessper, qc_rm_llessqty, qc_rm_rejectper, qc_rm_rejectqty, qc_rm_degradeqty, qc_rm_acceptqty, qc_rm_remarks, area_name from trn_qc_rm_inspection , massal_customer , masrm_item_header , mas_area where qc_rm_area = area_code and qc_rm_itemcode = itmh_code and qc_rm_supcode = cust_code and qc_rm_fincode = '$finid' and qc_rm_compcode ='$compcode' and qc_rm_ticketdate ='$repdate'  order by qc_rm_slno";
        $r = mysqli_query($conn, $sql);

	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
	$jsonresult = JEncode($arr);
	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getDatewiseTruck()
    {
        global $conn; 

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate= $_POST['startdate'];
        $enddate  = $_POST['enddate'];
        $itemname  = $_POST['iname'];

/*
        if ($itemname  == "0")
        $sql = "select *, DATE_FORMAT(wc_date, '%d-%m-%Y') as ticketdate from trn_weight_card , mas_area where wc_area_code = area_code and  wc_compcode =  $compcode and wc_fincode = $finid and wc_date between '$startdate' and '$enddate' order by wc_ticketno desc";
        else
        $sql = "select *, DATE_FORMAT(wc_date, '%d-%m-%Y') as ticketdate from trn_weight_card , mas_area where wc_area_code = area_code and  wc_compcode =  $compcode and wc_fincode = $finid and wc_date between '$startdate' and '$enddate' and wc_item = '$itemname' order by wc_ticketno desc";
*/

        if ($itemname  == "0")
        $sql = "select *, DATE_FORMAT(wc_date, '%d-%m-%Y') as ticketdate from trn_weight_card left join mas_area on wc_area_code = area_code left join mas_wb_item on  wc_item = item_name left join mas_wb_itemgroup on item_grpcode = item_group where wc_compcode =  $compcode and wc_fincode =  $finid and wc_date between '$startdate' and '$enddate'  order by wc_ticketno desc";
        else
        $sql = "select *, DATE_FORMAT(wc_date, '%d-%m-%Y') as ticketdate from trn_weight_card left join mas_area on wc_area_code = area_code left join mas_wb_item on  wc_item = item_name left join mas_wb_itemgroup on item_grpcode = item_group where wc_compcode =  $compcode and wc_fincode =  $finid and wc_date between '$startdate' and '$enddate'  and item_grpname = '$itemname'   order by wc_ticketno desc";

        $r = mysqli_query($conn, $sql);

	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
	$jsonresult = JEncode($arr);
	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getItemList()
    {
        global $conn; 

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate= $_POST['startdate'];
        $enddate  = $_POST['enddate'];


        $sql = "select wc_item from trn_weight_card , mas_area where wc_area_code = area_code and  wc_compcode =  $compcode and wc_fincode = $finid and wc_date between '$startdate' and '$enddate'  group by wc_item order by wc_item desc";

        $sql = "select item_grpname,item_grpcode from trn_weight_card left join mas_area on wc_area_code = area_code left join mas_wb_item on  wc_item = item_name left join mas_wb_itemgroup on item_grpcode = item_group where wc_compcode =  $compcode and wc_fincode =  $finid and wc_date between '$startdate' and '$enddate' group by item_grpname,item_grpcode order by item_grpname";

        $r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
	$jsonresult = JEncode($arr);
	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getSupPOs()
    {
        global $conn; 

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate= $_POST['startdate'];
        $enddate  = $_POST['enddate'];


        $sql = "select cust_name,cust_code,ordh_no, DATE_FORMAT(ordh_date, '%d-%m-%Y')  ordh_date from trnrm_order_header , massal_customer where ordh_sup_code = cust_code and ordh_compcode = $compcode and ordh_fincode = $finid and ordh_date between  '$startdate' and '$enddate' order by cust_name,ordh_date";

        $r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
	$jsonresult = JEncode($arr);
	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getDailyDNList()
    {
        global $conn; 

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate= $_POST['startdate'];
        $enddate  = $_POST['enddate'];

        $sql = "select cust_ref,DATE_FORMAT(qc_rm_debitnote_date, '%d-%m-%Y') as qc_rm_debitnote_date, qc_rm_debitnote_no, qc_rm_debitamount, qc_rm_entryno,DATE_FORMAT(qc_rm_entrydate, '%d-%m-%Y') as  qc_rm_entrydate,qc_rm_ticketno,qc_rm_truck  from trn_qc_rm_inspection , massal_customer where qc_rm_supcode = cust_code and  qc_rm_debitnote_no <> '' and qc_rm_debitnote_date between '$startdate' and '$enddate' and qc_rm_compcode = $compcode and qc_rm_fincode = $finid   and qc_rm_slno = 1  order by qc_rm_debitnote_date, qc_rm_debitnote_no";



    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


?>




