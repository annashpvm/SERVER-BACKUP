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

		case "loadAllPartyMonthArrivals":
                getAllPartyMonthArrivals();
		break;

		case "loadItemwiseArrivals":
                getItemwiseArrivals();
		break;
		case "loadDatewiseArrivals":
                getDatewiseArrivals();
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

		case "loadDatewise_PartywiseArrivals":
                getDatewise_PartywiseArrivals();
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
    
   

 function getArrivals()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];

	
$r=mysql_query("select UPPER(monthname(rech_date)) as rmonth ,  sum(rect_grnqty) as grnqty, sum(rech_totalamount) as purvalue from 
(select rech_date ,  rect_grnqty , rech_totalamount from trnfu_receipt_header join trnfu_receipt_trailer on rech_seqno =  rect_hdseqno  where rech_date between  '$startdate'  and curdate() and rech_compcode = $compcode  and rech_fincode =  $finid)a  group by UPPER(monthname(rech_date))");
	


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

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $startdate = $_POST['startdate'];
        $enddate = $_POST['enddate'];

$r=mysql_query("select cust_code, cust_name ,  sum(rect_grnqty) as grnqty, sum(rech_totalamount) as purvalue from 
(select rech_sup_code,  rect_grnqty , rech_totalamount from trnfu_receipt_header join trnfu_receipt_trailer on rech_seqno =  rect_hdseqno  where rech_date between '$startdate' and '$enddate'  and rech_compcode = $compcode and rech_fincode = $finid
) a  , massal_customer where rech_sup_code = cust_code   group by cust_code, cust_name  order by cust_name");
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
      $enddate = $_POST['enddate'];
	$supcode = $_POST['supcode'];

$r=mysql_query("select  DATE_FORMAT(rech_date, '%d-%m-%Y')  as rech_date,rech_no,rech_sup_code, rech_billno, DATE_FORMAT(rech_billdate, '%d-%m-%Y') as rech_billdate,rect_item_code,rect_itemrate, rect_grnqty , rect_itemvalue ,itmh_name, rech_truckno  from (select rech_date,rech_no,rech_sup_code, rech_billno,rech_billdate,rect_item_code,rect_itemrate, rect_grnqty , rect_itemvalue, rech_truckno from trnfu_receipt_header join trnfu_receipt_trailer on rech_seqno =  rect_hdseqno  where rech_date between '$startdate' and '$enddate' and rech_compcode = $compcode and rech_fincode = $finid 
)
a  , massal_customer , masfu_item_header where rect_item_code = itmh_code and  rech_sup_code = cust_code   and  rech_sup_code = $supcode");

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

$r=mysql_query("select  DATE_FORMAT(rech_date, '%d-%m-%Y')  as rech_date,rech_no,rech_sup_code, cust_ref, rech_billno, DATE_FORMAT(rech_billdate, '%d-%m-%Y') as rech_billdate,rect_item_code,rect_itemrate, rect_grnqty , rect_itemvalue ,itmh_name, rech_truckno  from (select rech_date,rech_no,rech_sup_code, rech_billno,rech_billdate,rect_item_code,rect_itemrate, rect_grnqty , rect_itemvalue, rech_truckno from trnfu_receipt_header join trnfu_receipt_trailer on rech_seqno =  rect_hdseqno  where rech_date between '$startdate' and '$enddate' and rech_compcode = $compcode and rech_fincode = $finid 
)
a  , massal_customer , masfu_item_header where rect_item_code = itmh_code and  rech_sup_code = cust_code order by  rech_date,rech_no ");

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
        $r=mysql_query("call spfu_rep_itemwisereceipt_abstract($compcode ,'$startdate' ,'$enddate') ");


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

        $r=mysql_query("call spfu_rep_item_partywise_receipt($compcode ,'$startdate' ,'$enddate',$itemcode) ");


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



        $r=mysql_query("call spfu_rep_item_partywise_receipt($compcode ,'$startdate' ,'$enddate',$itemcode) ");


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

        $r=mysql_query("call spfu_rep_item_party_GRNwise_receipt($compcode ,'$startdate' ,'$enddate',$itemcode,$supcode) ");



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

        $r=mysql_query("select cust_ref,DATE_FORMAT(qc_fuel_debitnote_date, '%d-%m-%Y') as qc_fuel_debitnote_date, qc_fuel_debitnote_no, qc_fuel_debitamount, qc_fuel_entryno,DATE_FORMAT(qc_fuel_entrydate, '%d-%m-%Y') as  qc_fuel_entrydate,qc_fuel_ticketno,qc_fuel_truck  from trn_qc_fuel_inspection , massal_customer where qc_fuel_supcode = cust_code and  qc_fuel_debitnote_no <> '' and qc_fuel_debitnote_date between '$startdate' and '$enddate' and qc_fuel_compcode = $compcode and qc_fuel_fincode = $finid   order by qc_fuel_debitnote_date, qc_fuel_debitnote_no");



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
	$startdate = $_POST['startdate'];
        $enddate  = $_POST['enddate'];

  
$r=mysql_query("select DATE_FORMAT(rech_date, '%d-%m-%Y') as rechdate,rech_date ,  sum(rect_grnqty) as grnqty, sum(rech_totalamount) as grnvalue , sum(rech_totalamount)/sum(rect_grnqty)  as avgrate  from trnfu_receipt_header join trnfu_receipt_trailer on rech_seqno =  rect_hdseqno  where rech_date between  '$startdate'  and '$enddate'  and rech_compcode = $compcode  and rech_fincode =  $finid  group by rech_date");
	


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
	$finstartdate = $_POST['finstartdate'];
	$startdate = $_POST['startdate'];
        $enddate  = $_POST['enddate'];

  
        $r=mysql_query("call spfu_rep_stock_abstract($compcode ,$finid,'$finstartdate','$startdate', '$startdate' ,'$enddate',1) ");
	


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

  
        $r=mysql_query("call spfu_op_trans($compcode ,$finid,'$finstartdate','$startdate', '$startdate' ,'$enddate',1) ");
	


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

  
        $r=mysql_query("call spfu_rep_item_ledger($compcode,'$startdate' ,'$enddate','$itemcode') ");
	


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

  
        $r=mysql_query("call spfu_rep_issue_datewise_abstract($compcode,'$startdate' ,'$enddate') ");
	


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

  
        $r=mysql_query("call spfu_rep_issue_date_Itemwise($compcode,'$startdate' ,'$enddate') ");
	


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


?>




