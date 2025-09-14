<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task="loadArrivals";

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
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
	        default:

		case "loadPartyItemArrivals":
                getPartyItemArrivals();
		break;
	        default:

		case "loadItemwiseArrivals":
                getItemwiseArrivals();
		break;

		case "loadItem_PartywiseArrivals":
                getItem_PartywiseArrivals();
		break;
		case "loadParty_Item_GRNwise_Arrivals":
                getParty_Item_GRNwise_Arrivals();
		break;

		case "loadAllParty_Item_GRNwise_Arrivals":
                getAllParty_Item_GRNwise_Arrivals();
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


		case "loadItemwiseStock":
                getItemwiseStock();
		break;

		case "loadItemwiseStockSummary":
                getItemwiseStockSummary();
		break;

		case "loadItem_ledger_trans":
                getItem_ledger_trans();
		break;

		case "loadDatewiseList":
                getDatewiseList();
		break;
		case "loadDayConsumption":
                getDayConsumption();
		break;
		case "loadAllPartyMonthArrivals":
                getAllPartyMonthArrivals();
		break;

		case "loadDailyDNList":
                getDailyDNList();
		break;

		case "loadDatewise_PartywiseArrivals":
                getDatewise_PartywiseArrivals();
		break;

             	case "loadSearchLedgerlist":
		getSearchLedgerlist();
		break;	

	        default:
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
    
   

 function getArrivals()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	
$r=mysql_query("select UPPER(monthname(rech_date)) as rmonth ,  sum(rect_grnqty) as grnqty, sum(rech_totalamount) as purvalue from 
(select rech_date ,  rect_grnqty , rech_totalamount from trnrm_receipt_header join trnrm_receipt_trailer on rech_seqno =  rect_hdseqno  where rech_date between  '$startdate'  and curdate()  and rech_compcode = $compcode  and rech_fincode =  $finid
union all
select rech_date ,  rect_grnqty , rech_totalamount from trnirm_receipt_header join trnirm_receipt_trailer on rech_seqno =  rect_hdseqno  where rech_date between  '$startdate'  and curdate()  and rech_compcode = $compcode  and rech_fincode =  $finid)
a  group by UPPER(monthname(rech_date))
");
	


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getPartywisePurchases()
    {
        mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
        $startdate = $_POST['startdate'];
        $enddate   = $_POST['enddate'];

$r=mysql_query("select cust_code, cust_name ,  sum(rect_grnqty) as grnqty, sum(rech_totalamount) as purvalue from 
(select rech_sup_code,  rect_grnqty , rech_totalamount from trnrm_receipt_header join trnrm_receipt_trailer on rech_seqno =  rect_hdseqno  where rech_date between '$startdate' and '$enddate'  and rech_compcode = $compcode and rech_fincode = $finid
union all
select rech_sup_code , rect_grnqty , rech_totalamount from trnirm_receipt_header join trnirm_receipt_trailer on rech_seqno =  rect_hdseqno  where rech_date between '$startdate' and '$enddate'  and rech_compcode = $compcode and rech_fincode = $finid) a  , massal_customer where rech_sup_code = cust_code   group by cust_code, cust_name  order by cust_name");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	




 function getPartyMonthArrivals()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
        $enddate   = $_POST['enddate'];
	$supcode = $_POST['supcode'];



$r=mysql_query("select  DATE_FORMAT(rech_date, '%d-%m-%Y')  as rech_date,rech_no,rech_sup_code, rech_billno, DATE_FORMAT(rech_billdate, '%d-%m-%Y') as rech_billdate,rect_item_code,rect_itemrate, rect_grnqty , rect_itemvalue ,itmh_name, rech_truckno  from (select rech_date,rech_no,rech_sup_code, rech_billno,rech_billdate,rect_item_code,rect_itemrate, rect_grnqty , rect_itemvalue, rech_truckno from trnrm_receipt_header join trnrm_receipt_trailer on rech_seqno =  rect_hdseqno  where rech_date between '$startdate' and '$enddate' and rech_compcode = $compcode and rech_fincode = $finid 
union all
 select rech_date,rech_no,rech_sup_code, rech_billno,rech_billdate,rect_item_code,rect_itemrate, rect_grnqty , rect_itemvalue, rech_truckno  from trnirm_receipt_header join trnirm_receipt_trailer on rech_seqno =  rect_hdseqno  where rech_date between '$startdate' and '$enddate' and rech_compcode = $compcode and rech_fincode =$finid )
a  , massal_customer , masrm_item_header where rect_item_code = itmh_code and  rech_sup_code = cust_code   and  rech_sup_code = $supcode order by rech_date");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getPartyItemArrivals()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
        $enddate   = $_POST['enddate'];
	$supcode = $_POST['supcode'];



$r=mysql_query("select  itmh_name , rect_item_code ,  sum(rect_grnqty)  rect_grnqty, sum(rect_itemvalue) rect_itemvalue from (select rech_date,rech_no,rech_sup_code, rech_billno,rech_billdate,rect_item_code,rect_itemrate, rect_grnqty , rect_itemvalue, rech_truckno from trnrm_receipt_header join trnrm_receipt_trailer on rech_seqno =  rect_hdseqno  where rech_date between '$startdate' and '$enddate' and rech_compcode = $compcode and rech_fincode = $finid union all
select  rech_date,rech_no,rech_sup_code, rech_billno,rech_billdate,rect_item_code,rect_itemrate, rect_grnqty , rect_itemvalue, rech_truckno from trnirm_receipt_header join trnirm_receipt_trailer on rech_seqno =  rect_hdseqno  where rech_date between '$startdate' and '$enddate' and rech_compcode = $compcode and rech_fincode = $finid )a  , massal_customer , masrm_item_header where rect_item_code = itmh_code and  rech_sup_code = cust_code   and  rech_sup_code = $supcode group by itmh_name , rect_item_code ");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getItemwiseArrivals()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
        $enddate   = $_POST['enddate'];
        $r=mysql_query("call sprm_rep_itemwisereceipt($compcode ,'$startdate' ,'$enddate') ");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getItem_PartywiseArrivals()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
        $enddate   = $_POST['enddate'];

        $itemcode   = $_POST['itemcode'];

        $r=mysql_query("call sprm_rep_item_partywise_receipt($compcode ,'$startdate' ,'$enddate',$itemcode) ");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getParty_Item_GRNwise_Arrivals()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate= $_POST['startdate'];
        $enddate  = $_POST['enddate'];
	$supcode  = $_POST['supcode'];
	$itemcode = $_POST['itemcode'];

        $r=mysql_query("call sprm_rep_item_party_GRNwise_receipt($compcode ,'$startdate' ,'$enddate',$itemcode,$supcode) ");





	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getAllParty_Item_GRNwise_Arrivals()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate= $_POST['startdate'];
        $enddate  = $_POST['enddate'];
	$itemcode = $_POST['itemcode'];


$r=mysql_query("select  DATE_FORMAT(rech_date, '%d-%m-%Y')  as rech_date,rech_no,rech_sup_code, rech_billno, DATE_FORMAT(rech_billdate, '%d-%m-%Y') as rech_billdate,rect_item_code,rect_itemrate, rect_grnqty , rect_itemvalue ,itmh_name, rech_truckno , cust_name from (select rech_date,rech_no,rech_sup_code, rech_billno,rech_billdate,rect_item_code,rect_itemrate, rect_grnqty , rect_itemvalue, rech_truckno from trnrm_receipt_header join trnrm_receipt_trailer on rech_seqno =  rect_hdseqno  where rech_date between '$startdate' and '$enddate' and rech_compcode = $compcode and rech_fincode = $finid 
union all
 select rech_date,rech_no,rech_sup_code, rech_billno,rech_billdate,rect_item_code,rect_itemrate, rect_grnqty , rect_itemvalue, rech_truckno  from trnirm_receipt_header join trnirm_receipt_trailer on rech_seqno =  rect_hdseqno  where rech_date between '$startdate' and '$enddate' and rech_compcode = $compcode and rech_fincode =$finid )
a  , massal_customer , masrm_item_header where rect_item_code = itmh_code and  rech_sup_code = cust_code   and rect_item_code = $itemcode  order by rech_date");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getDatewiseArrivals()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate= $_POST['startdate'];
        $enddate  = $_POST['enddate'];

  
$r=mysql_query("select DATE_FORMAT(rech_date, '%d-%m-%Y') as rechdate,rech_date ,  sum(rect_grnqty) as grnqty, sum(rech_totalamount) as grnvalue , sum(rech_totalamount)/sum(rect_grnqty)  as avgrate  from trnrm_receipt_header join trnrm_receipt_trailer on rech_seqno =  rect_hdseqno  where rech_date between  '$startdate'  and '$enddate'  and rech_compcode = $compcode  and rech_fincode =  $finid  group by rech_date");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
	$jsonresult = JEncode($arr);
	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getRMArrivalsDate()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$repdate= $_POST['repdate'];

        $r=mysql_query("select  cust_ref,sup_gstin,qc_rm_truck,qc_rm_entryno, qc_rm_ticketno, qc_rm_ticketwt,qc_rm_moisper_totalmaterial,qc_rm_moisforqty,qc_rm_moisper, qc_rm_moisqty, qc_rm_llessper, qc_rm_llessqty, qc_rm_rejectper, qc_rm_rejectqty, qc_rm_degradeqty, qc_rm_acceptqty, qc_rm_remarks, area_name from trn_qc_rm_inspection , massal_customer , masrm_item_header , mas_area where qc_rm_area = area_code and qc_rm_itemcode = itmh_code and qc_rm_supcode = cust_code and qc_rm_fincode = '$finid' and qc_rm_compcode ='$compcode' and qc_rm_ticketdate ='$repdate'  order by qc_rm_slno");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
	$jsonresult = JEncode($arr);
	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getDatewiseTruck()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate= $_POST['startdate'];
        $enddate  = $_POST['enddate'];
        $itemname  = $_POST['iname'];

/*
        if ($itemname  == "0")
        $r=mysql_query("select *, DATE_FORMAT(wc_date, '%d-%m-%Y') as ticketdate from trn_weight_card , mas_area where wc_area_code = area_code and  wc_compcode =  $compcode and wc_fincode = $finid and wc_date between '$startdate' and '$enddate' order by wc_ticketno desc");
        else
        $r=mysql_query("select *, DATE_FORMAT(wc_date, '%d-%m-%Y') as ticketdate from trn_weight_card , mas_area where wc_area_code = area_code and  wc_compcode =  $compcode and wc_fincode = $finid and wc_date between '$startdate' and '$enddate' and wc_item = '$itemname' order by wc_ticketno desc");
*/

        if ($itemname  == "0")
        $r=mysql_query("select *, DATE_FORMAT(wc_date, '%d-%m-%Y') as ticketdate from trn_weight_card left join mas_area on wc_area_code = area_code left join mas_wb_item on  wc_item = item_name left join mas_wb_itemgroup on item_grpcode = item_group where wc_compcode =  $compcode and wc_fincode =  $finid and wc_date between '$startdate' and '$enddate'  order by wc_ticketno desc");
        else
        $r=mysql_query("select *, DATE_FORMAT(wc_date, '%d-%m-%Y') as ticketdate from trn_weight_card left join mas_area on wc_area_code = area_code left join mas_wb_item on  wc_item = item_name left join mas_wb_itemgroup on item_grpcode = item_group where wc_compcode =  $compcode and wc_fincode =  $finid and wc_date between '$startdate' and '$enddate'  and item_grpname = '$itemname'   order by wc_ticketno desc");



	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
	$jsonresult = JEncode($arr);
	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getItemList()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate= $_POST['startdate'];
        $enddate  = $_POST['enddate'];


        $r=mysql_query("select wc_item from trn_weight_card , mas_area where wc_area_code = area_code and  wc_compcode =  $compcode and wc_fincode = $finid and wc_date between '$startdate' and '$enddate'  group by wc_item order by wc_item desc");

        $r=mysql_query("select item_grpname,item_grpcode from trn_weight_card left join mas_area on wc_area_code = area_code left join mas_wb_item on  wc_item = item_name left join mas_wb_itemgroup on item_grpcode = item_group where wc_compcode =  $compcode and wc_fincode =  $finid and wc_date between '$startdate' and '$enddate' group by item_grpname,item_grpcode order by item_grpname");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
	$jsonresult = JEncode($arr);
	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getItemwiseStock()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];

	$startdate = $_POST['startdate'];
        $enddate  = $_POST['enddate'];

  
        $r=mysql_query("call sprm_stock_abstract_New($compcode ,$finid,'$startdate' ,'$enddate',1) ");
	


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getItemwiseStockSummary()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$finstartdate = $_POST['finstartdate'];
	$startdate = $_POST['startdate'];
        $enddate  = $_POST['enddate'];
        $QtyType  = $_POST['QtyType'];
        $QtyType  = $_POST['QtyType'];
        $ItemType  = $_POST['ItemType'];



        $r=mysql_query("call sprm_stock_abstract($compcode ,$finid,'$startdate' ,'$enddate', '$QtyType','$ItemType') ");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getItem_ledger_trans()
    {
        mysql_query("SET NAMES utf8");

	$itemcode  = $_POST['itemcode'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
        $enddate   = $_POST['enddate'];
        $qtytype   = $_POST['qtytype'];
  
        $r=mysql_query("call sprm_rep_item_ledger($compcode,'$startdate' ,'$enddate','$itemcode','$qtytype') ");
	


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getDatewiseList()
    {
        mysql_query("SET NAMES utf8");

	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
        $enddate   = $_POST['enddate'];

  
        $r=mysql_query("call sprm_rep_issue_datewise_abstract($compcode,'$startdate' ,'$enddate') ");
	


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getDayConsumption()
    {
        mysql_query("SET NAMES utf8");

	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
        $enddate   = $_POST['enddate'];

  
        $r=mysql_query("call sprm_rep_issue_date_Itemwise($compcode,'$startdate' ,'$enddate',1) ");
	


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getAllPartyMonthArrivals()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$supcode = $_POST['supcode'];
	$grn     = $_POST['grn'];


if ($grn == "All")

$r=mysql_query("select  DATE_FORMAT(rech_date, '%d-%m-%Y')  as rech_date,rech_no,rech_sup_code, cust_ref, rech_billno, DATE_FORMAT(rech_billdate, '%d-%m-%Y') as rech_billdate,rect_item_code,rect_itemrate, rect_grnqty , rect_itemvalue ,itmh_name, rech_truckno  from (select rech_date,rech_no,rech_sup_code, rech_billno,rech_billdate,rect_item_code,rect_itemrate, rect_grnqty , rect_itemvalue, rech_truckno from trnrm_receipt_header join trnrm_receipt_trailer on rech_seqno =  rect_hdseqno  where rech_date between '$startdate' and '$enddate' and rech_compcode = $compcode and rech_fincode = $finid )a  , massal_customer , masrm_item_header where rect_item_code = itmh_code and  rech_sup_code = cust_code order by rech_date,rech_no ");

else if ($grn == "Local")

$r=mysql_query("select  DATE_FORMAT(rech_date, '%d-%m-%Y')  as rech_date,rech_no,rech_sup_code, cust_ref, rech_billno, DATE_FORMAT(rech_billdate, '%d-%m-%Y') as rech_billdate,rect_item_code,rect_itemrate, rect_grnqty , rect_itemvalue ,itmh_name, rech_truckno  from (select rech_date,rech_no,rech_sup_code, rech_billno,rech_billdate,rect_item_code,rect_itemrate, rect_grnqty , rect_itemvalue, rech_truckno from trnrm_receipt_header join trnrm_receipt_trailer on rech_seqno =  rect_hdseqno  where rech_date between '$startdate' and '$enddate' and rech_compcode = $compcode and rech_fincode = $finid and rech_source = 'L' )a  , massal_customer , masrm_item_header where rect_item_code = itmh_code and  rech_sup_code = cust_code order by rech_date,rech_no ");

else

$r=mysql_query("select  DATE_FORMAT(rech_date, '%d-%m-%Y')  as rech_date,rech_no,rech_sup_code, cust_ref, rech_billno, DATE_FORMAT(rech_billdate, '%d-%m-%Y') as rech_billdate,rect_item_code,rect_itemrate, rect_grnqty , rect_itemvalue ,itmh_name, rech_truckno  from (select rech_date,rech_no,rech_sup_code, rech_billno,rech_billdate,rect_item_code,rect_itemrate, rect_grnqty , rect_itemvalue, rech_truckno from trnrm_receipt_header join trnrm_receipt_trailer on rech_seqno =  rect_hdseqno  where rech_date between '$startdate' and '$enddate' and rech_compcode = $compcode and rech_fincode = $finid and rech_source = 'I' )a  , massal_customer , masrm_item_header where rect_item_code = itmh_code and  rech_sup_code = cust_code order by rech_date,rech_no ");



	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getDailyDNList()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate= $_POST['startdate'];
        $enddate  = $_POST['enddate'];

        $r=mysql_query("select cust_ref,DATE_FORMAT(qc_rm_debitnote_date, '%d-%m-%Y') as qc_rm_debitnote_date, qc_rm_debitnote_no, qc_rm_debitamount, qc_rm_entryno,DATE_FORMAT(qc_rm_entrydate, '%d-%m-%Y') as  qc_rm_entrydate,qc_rm_ticketno,qc_rm_truck  from trn_qc_rm_inspection , massal_customer where qc_rm_supcode = cust_code and  qc_rm_debitnote_no <> '' and qc_rm_debitnote_date between '$startdate' and '$enddate' and qc_rm_compcode = $compcode and qc_rm_fincode = $finid   and qc_rm_slno = 1   order by qc_rm_debitnote_date, qc_rm_debitnote_no");



	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getDatewise_PartywiseArrivals()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
        $enddate   = $_POST['enddate'];
        $itemcode   = 0;



        $r=mysql_query("call sprm_rep_item_partywise_receipt($compcode ,'$startdate' ,'$enddate',$itemcode) ");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getSearchLedgerlist()
    {
        mysql_query("SET NAMES utf8");
        $ledname = strtoupper($_POST['ledger']);
        $ledname = trim(str_replace(" ", "", $ledname)); 
        $ledname = trim(str_replace(".", "", $ledname)); 


        if ($ledname == '')
	        $qry = "select * from (select  cust_code,cust_name,qc_rm_supcode,cust_state,sup_wp_gstinv_supplier_yn,
cust_cr_days,cust_grace_days from trn_qc_rm_inspection,massal_customer  where    cust_code = qc_rm_supcode group by cust_code,cust_name,qc_rm_supcode,cust_state,sup_wp_gstinv_supplier_yn ,cust_cr_days,cust_grace_days ) a1 order by cust_name";
        else

	        $qry = "select * from ( select  cust_code,cust_name,qc_rm_supcode,cust_state,cust_wp_gstinv_supplier_yn,cust_cr_days,cust_grace_days from trn_qc_rm_inspection,massal_customer  where   cust_code = qc_rm_supcode group by cust_code,cust_name, qc_rm_supcode, cust_state,cust_wp_gstinv_supplier_yn,cust_cr_days,cust_grace_days  ) a1 where replace(replace(cust_name,' ','')  ,'.','')  like '%$ledname%'  order by cust_name";

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




