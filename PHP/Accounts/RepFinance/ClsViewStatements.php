<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task="loadPurchaseDetails";

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadPurchaseDetails":
		getPurchaseDetails();
		break;
		case "loadSalesDetails":
		getSalesDetails();
		break;
		case "loadCashBookDetails":
		getCashBookDetails();
		break;

		case "loadVouTypeList":
                getVouTypeList();
		break;

		case "loadVouNoList":
                getVouNoList();
		break;

		case "loadDocumentList":
                getDocumentList();
		break;

		case "loadSalesDocumentList":
                getSalesDocumentList();
		break;

		case "loadPurchaseDocumentList":
                getPurchaseDocumentList();
		break;

		case "loadTBMaingroup":
                getTB_Maingroup();
		break;
		case "loadTB2NDgroup":
                getTB_2NDgroup();
		break;
		case "loadTB2NDgroup_alllist":
                getTB_2NDgroup_alllist();
		break;
		case "loadTBIIIgroup":
                getTB_IIIgroup();
		break;
		case "loadTB_Ledgers":
                getTB_Ledgers();
		break;

		case "load_Ledger_Details":
                get_Ledger_Details();
		break;

		case "load_Bills_Details":
                get_AR_Bills_Details();
		break;

		case "load_RepCollection_Abstract":
                get_RepCollection_Abstract();
		break;
        
		case "load_RepParty_Collection_Abstract":
                get_RepParty_Collection_Abstract();
		break;
		case "load_RepParty_Bills_Collection":
                get_RepParty_Bills_Collection();
		break;

		case "load_Payable_Bills_Details":
                get_Payable_Bills_Details();
		break;

		case "load_Groupwise_Payment":
                get_Groupwise_Payment();
		break;

		case "load_Group_Party_Payments":
                get_Group_Party_Payments();
		break;        

		case "load_GroupParty_Bills_Payments":
                get_GroupParty_Bills_Payments();
		break;
		case "loadSearchPartylist":
		getSearchPartylist();
		break;
		case "loadSearchSupplierlist":
		getSearchSupplierlist();
		break;
		case "loadParty_Outstanding":
		getParty_Outstanding();
		break;

		case "loadRep_Overdue_Outstanding":
		getRep_Overdue_Outstanding();
		break;

		case "loadParty_Overdue_Outstanding":
		getParty_Overdue_Outstanding();
		break;

		case "loadDayBookDetails":
		getDayBookDetails();
		break;



		case "loadGroupDetails":
		getGroupDetails();
		break;

		case "loadSearchGrouplist":
		getSearchGrouplist();
		break;

		case "loadGroupLedgerDetails":
		getGroupLedgerDetails();
		break;

		case "loadGroupOpeningDetails":
		getGroupOpeningDetails();
		break;

             	case "loadSearchLedgerlist":
		getSearchLedgerlist();
		break;
	        case "loadUsersList":
		getUsersList();
		break;

		case "loadVouNoHistory":
                getVouNoHistory();
		break;

		case "loadVouNoHistoryDept":
                getVouNoHistoryDept();
		break;

		case "loadVouNoHistoryDetail":
                getVouNoHistoryDetail();
		break;

		case "loadCashBookOpening":
                getCashBookOpening();
		break;

		case "loadCashBookPeriod":
                getCashBookPeriod();
		break;

		case "loadPandLMainGroup":
                getPandLMainGroup();
		break;

		case "loadBSMainGroup":
                getBSMainGroup();
		break;

		case "loadOpeningStock":
                getOpeningStock();
		break;

		case "loadProfit_LossAmt":
                getProfit_LossAmt();
		break;

		case "find_column_Ledger":
	        get_column_Ledger();
		break;

		case "loadClosingStock":
                getClosingStock();
		break;


		case "loadLedgerMonthwise":
                getLedgerMonthwise();
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
    
   


 function getVouTypeList()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];

        $r=mysql_query("select accref_vou_type , vou_name,count(*) as nos  from acc_ref  a1 left join acc_voutype  b1 on  a1.accref_vou_type = b1.vou_type  where accref_comp_code = $compcode and accref_voudate between '$startdate' and '$enddate' group by  accref_vou_type  order by   vou_name");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getVouNoList()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$voutype = $_POST['voutype'];
	$ledtype = $_POST['ledtype'];

        if ($ledtype == 'A')
             $r=mysql_query("select  accref_vou_type,accref_vouno,accref_payref_no , DATE_FORMAT(accref_voudate,'%d-%m-%Y') as accref_voudate,cust_name,acctran_dbamt,acctran_cramt ,acctran_led_code from acc_ref ref  join acc_tran tran on  tran.acctran_accref_seqno = ref.accref_seqno   join massal_customer mas on  tran.acctran_led_code = mas.cust_code  where  accref_voudate between '$startdate' and '$enddate' and  accref_comp_code = $compcode and  accref_vou_type  = '$voutype' ");
        else
             $r=mysql_query("select accref_vou_type, accref_vouno,accref_payref_no , DATE_FORMAT(accref_voudate,'%d-%m-%Y') as accref_voudate,cust_name,acctran_dbamt,acctran_cramt ,acctran_led_code from acc_ref ref  join acc_tran tran on  tran.acctran_accref_seqno = ref.accref_seqno   join massal_customer mas on  tran.acctran_led_code = mas.cust_code  where  accref_voudate between '$startdate' and '$enddate' and  accref_comp_code = $compcode and  accref_vou_type  = '$voutype'  != 'G'");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getDocumentList()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$ledcode = $_POST['ledcode'];


         $r = mysql_query("select a.*,c.cust_name partyledger  from
(select
    accref_seqno,
    accref_vouno,
    accref_comp_code,
    accref_finid,
    DATE_FORMAT(accref_voudate,'%Y-%m-%d') as accref_voudate,
    accref_vou_type,
    accref_bank_name,
    accref_paymode,
    accref_payref_no,
    accref_payref_date,
    accref_narration,
    accref_chq_status,
    accref_reverse_status,
    acctran_accref_seqno,
    acctran_serialno,
    acctran_led_code,
    acctran_dbamt,
    acctran_cramt,
    acctran_totamt,
    acctran_paytype,cust_name
from acc_ref arf inner join acc_tran atn on arf.accref_seqno = atn.acctran_accref_seqno

inner join massal_customer led on atn.acctran_led_code=led.cust_code 
where
    arf.accref_comp_code = '$compcode' and arf.accref_finid = '$finid' and
accref_voudate between '$startdate' and '$enddate' and

    atn.acctran_led_code = '$ledcode' 
 ) a , acc_tran b , massal_customer c where a.accref_seqno = b.acctran_accref_seqno and b.acctran_serialno = 1 and b.acctran_led_code = c.cust_code  order by accref_voudate,accref_seqno ");



	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



   

 function getPurchaseDetails()
    {
        mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
        $opt   = 2;

//$r=mysql_query("select UPPER(monthname(accref_voudate)) as rmonth  , sum(acctran_dbamt) dramt ,  sum(acctran_cramt) cramt  from acc_ref ref  join acc_tran tran on  tran.acctran_accref_seqno = ref.accref_seqno   join massal_customer mas on  tran.acctran_led_code = mas.led_code 	 where  accref_vou_type  in ('PSP','PSC','PLW','PIW','PPF','PDE') and  accref_comp_code = '$compcode ' and accref_finid = '$finid'  and accref_voudate between '$startdate' and  '$enddate'  and cust_type <> 'G'  group by upper(monthname(accref_voudate))");


$r=mysql_query("call spsal_rep_MonthwiseSales_Abstract($compcode,$finid , '$startdate','$enddate',$opt)");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getSalesDetails()
    {
        mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
        $opt       = 1; 

//$r=mysql_query("select UPPER(monthname(accref_voudate)) as rmonth  , sum(acctran_dbamt) dramt ,  sum(acctran_cramt) cramt  from acc_ref ref  join acc_tran tran on  tran.acctran_accref_seqno = ref.accref_seqno   join massal_customer mas on  tran.acctran_led_code = mas.led_code 	 where  accref_vou_type  in ('GSI','OSI') and  accref_comp_code = '$compcode ' and accref_finid = '$finid'  and accref_voudate between '$startdate' and  '$enddate'  and cust_type <> 'G'  group by upper(monthname(accref_voudate))");

$r=mysql_query("call spsal_rep_MonthwiseSales_Abstract($compcode,$finid , '$startdate','$enddate',$opt)");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getCashBookDetails()
    {
        mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
        $ledcode   = $_POST['ledcode']; 

$r=mysql_query("call spacc_rep_Monthwise_CashBank($compcode,$finid , '$startdate','$enddate',$ledcode)");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getSalesDocumentList()
    {
        mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
 

//         $r = mysql_query("select   DATE_FORMAT(accref_voudate, '%d-%m-%Y') as voudate, cust_name,
//--     case when accref_vou_type = 'GSI' then  'TN GST Sales' else 'OS IGST Sales' end as voutype ,
//   case when accref_vou_type = 'GSI' then case when left(accref_payref_no,2) = 'TN' THEN  'TN GST Sales' else 'OS IGST //Sales' end else case when left(accref_payref_no,2) = 'TN' THEN  'Other GST Sales' else 'Other IGST Sales' end end  as voutype, accref_payref_no, acctran_dbamt ,  acctran_cramt  , accref_vou_type   , led_code ,accref_vouno ,accref_seqno  from acc_ref ref  join acc_tran tran on  tran.acctran_accref_seqno = ref.accref_seqno   join massal_customer mas on  tran.acctran_led_code = mas.cust_code where  accref_vou_type  in ('GSI','OSI') and  accref_comp_code = '$compcode' and accref_finid = '$finid'  and accref_voudate between '$startdate' and  '$enddate'  and cust_type <> 'G' order by accref_voudate,accref_seqno ");


         $r = mysql_query("call spsal_rep_Month_Sales_Details($compcode,$finid , '$startdate','$enddate')");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getPurchaseDocumentList()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];


/*
         $r = mysql_query("select   DATE_FORMAT(accref_voudate, '%d-%m-%Y') as voudate, cust_name,
  accref_vou_type voutype,accref_vouno , accref_payref_no, acctran_dbamt ,  acctran_cramt  , accref_vou_type   , led_code ,accref_seqno  from acc_ref ref  join acc_tran tran on  tran.acctran_accref_seqno = ref.accref_seqno   join massal_customer mas on  tran.acctran_led_code = mas.cust_code where  accref_vou_type  in  ('PSP','PSC','PLW','PIW','PPF','PDE') and  accref_comp_code = '$compcode' and accref_finid = '$finid'  and accref_voudate between '$startdate' and  '$enddate'  and cust_type <> 'G' order by accref_voudate,accref_seqno ");
*/

   $r = mysql_query("call spsal_rep_Month_Purchase_Details($compcode,$finid , '$startdate','$enddate')");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getTB_Maingroup()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$finfirstdate = $_POST['finfirstdate'];



         $r = mysql_query("call accspreptrialbalanceclosing_View_Maingroup($finid ,$compcode, '$startdate', '$enddate','$finfirstdate')");




	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getTB_2NDgroup()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$mgrpcode = $_POST['mgrpcode'];
	$finfirstdate = $_POST['finfirstdate'];
         $r = mysql_query("call accspreptrialbalanceclosing_View_SubMaingroup($finid ,$compcode, '$startdate', '$enddate','$mgrpcode','$finfirstdate' )");




	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getTB_2NDgroup_alllist()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$mgrpcode = $_POST['mgrpcode'];
	$finfirstdate = $_POST['finfirstdate'];
         $r = mysql_query("call accspreptrialbalanceclosing_View_SubMaingroup_alllist($finid ,$compcode, '$startdate', '$enddate','$mgrpcode','$finfirstdate')");




	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getTB_IIIgroup()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$mgrpcode = $_POST['mgrpcode'];
	$finfirstdate = $_POST['finfirstdate'];
         $r = mysql_query("call accspreptrialbalanceclosing_View_Subgroup($finid ,$compcode, '$startdate', '$enddate','$mgrpcode','$finfirstdate' )");




	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getTB_Ledgers()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$mgrpcode = $_POST['mgrpcode'];
	$finfirstdate = $_POST['finfirstdate'];
	$ledmaingrp = $_POST['ledmaingrp'];

         $r = mysql_query("call accspreptrialbalanceclosing_View_Subgroup_levelend($finid ,$compcode, '$startdate', '$enddate','$mgrpcode','$finfirstdate',$ledmaingrp )");




	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }




 function get_Ledger_Details()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$ledcode = $_POST['ledcode'];
	$ledtype = $_POST['ledgertype']; 
 //        $r = mysql_query("call acc_sp_rep_ledger($ledcode,$compcode,$finid ,'$startdate', '$enddate','')");

        $r = "call acc_sp_rep_ledger('$ledcode',$compcode,$finid ,'$startdate', '$enddate','','$ledtype')";

//echo $r;

        $r = mysql_query("call acc_sp_rep_ledger('$ledcode',$compcode,$finid ,'$startdate', '$enddate','','$ledtype')");





	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function get_AR_Bills_Details()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$ledcode = $_POST['ledcode'];
	$alldueopt = $_POST['alldueopt'];
        if ($alldueopt == 0) 
        $r = mysql_query("call spacc_rep_receivables_Party_overdue_outstanding($compcode,'$startdate', '$enddate',$ledcode)");
        else
        $r = mysql_query("call accsp_rep_ar_billwisedue($compcode,'$startdate', '$enddate',$ledcode,'$alldueopt' )");
   




	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function get_RepCollection_Abstract()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$ledcode = $_POST['ledcode'];

         $r = mysql_query("call accsp_rep_Rep_collection_Summary($compcode,'$startdate', '$enddate')");




	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function get_RepParty_Collection_Abstract()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$repcode = $_POST['repcode'];

         $r = mysql_query("call accsp_rep_Rep_Party_collections($compcode,'$startdate', '$enddate',$repcode)");




	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function get_RepParty_Bills_Collection()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$ledcode = $_POST['custcode'];

         $r = mysql_query("call accsp_rep_Party_Bills_collections($compcode,'$startdate', '$enddate',$ledcode)");




	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function get_Payable_Bills_Details()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$ledcode = $_POST['ledcode'];

//        $r = mysql_query("call accsp_rep_payable_billwisedue($compcode,'$startdate', '$enddate',$ledcode)");
        $r = mysql_query("call accsp_rep_ap_billwisedue($compcode,'$startdate', '$enddate',$ledcode,'1')");




	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function get_Groupwise_Payment()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$ledcode = $_POST['ledcode'];

         $r = mysql_query("call accsp_rep_group_payment_Summary($compcode,'$startdate', '$enddate')");




	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function get_Group_Party_Payments()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$grpcode = $_POST['grpcode'];

         $r = mysql_query("call accsp_rep_group_payment_partywise($compcode,'$startdate', '$enddate',$grpcode)");




	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function get_GroupParty_Bills_Payments()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$suppliercode = $_POST['suppliercode'];

         $r = mysql_query("call accsp_rep_party_datewise_payments($compcode,'$startdate', '$enddate',$suppliercode)");




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

        $party  = $_POST['party'];
        $qry = "select * from massal_customer where cust_type = 'C' and cust_name like '%$party%' order by cust_name";
        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getSearchSupplierlist()
    {
        mysql_query("SET NAMES utf8");

        $party  = $_POST['party'];
        $qry = "select * from massal_customer where cust_type = 'S' and cust_name like '%$party%' order by cust_name";
        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getParty_Outstanding()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$mgrpcode = $_POST['mgrpcode'];

         $r = mysql_query("call accsp_trial_balance_creditors_debitors_partywise($finid ,$compcode, '$startdate', '$enddate','$mgrpcode' )");




	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getRep_Overdue_Outstanding()
    {
        mysql_query("SET NAMES utf8");

	$compcode = $_POST['compcode'];
	$asondate = $_POST['asondate'];

        $r = mysql_query("call spacc_rep_receivables_Rep_overdue_Abstract($compcode, '$asondate')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getParty_Overdue_Outstanding()
    {
        mysql_query("SET NAMES utf8");

	$compcode = $_POST['compcode'];
	$asondate = $_POST['asondate'];
	$repcode  = $_POST['repcode'];

        $r = mysql_query("call spacc_rep_receivables_Partywise_overdue_outstanding($compcode, '$asondate', $repcode )");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getDayBookDetails()
    {
        mysql_query("SET NAMES utf8");

	$compcode = $_POST['compcode'];
	$fibcode  = $_POST['finid'];
	$asondate = $_POST['rdate'];
        $count    =0;
        $r = mysql_query(" select @a:=@a+1 as sno,  DATE_FORMAT(accref_voudate, '%d-%m-%Y') as accref_voudate, cust_name,  case when accref_vou_type = 'GSI' then  'Regular Sales' else 
case when accref_vou_type = 'OSI' then  'Other Sales'  else  case when accref_vou_type = 'CIP' then  'Cash Payment' 
else  case when accref_vou_type = 'CIR' then  'Cash Receipt' 
else  case when accref_vou_type = 'BKP' then  'Bank Payment' 
else  case when accref_vou_type = 'EXP' then  'Expenses' 
else  case when accref_vou_type = 'BKR' then  'Bank Receipt' 
else  case when accref_vou_type = 'GSR' then  'Sales Return' 
else  case when accref_vou_type = 'GJV' then  'Journal' 
else  case when left(accref_vou_type,2) = 'CN' then  'Credit Note' 
else  case when left(accref_vou_type,2) = 'DN' then  'Debit Note' 
else  case when left(accref_vou_type,1) = 'P' then  'Purchase' 
end end end end end end end end end end end end voutype ,  accref_payref_no,  accref_vouno,acctran_dbamt,acctran_cramt,acctran_led_code , accref_seqno from (
 select * from acc_ref ref left join acc_tran trn
 on ref.accref_seqno = trn.acctran_accref_seqno
 join massal_customer mas
 on trn.acctran_led_code = mas.cust_code and (cust_type in ('C','S')  or acctran_serialno =1)
 where accref_comp_code = $compcode and accref_voudate =  '$asondate' order by accref_seqno
) a1   join (SELECT @a:= 0) a ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getGroupDetails()
    {
        mysql_query("SET NAMES utf8");

        $count    =0;
        $r = mysql_query("select * from acc_group_master where grp_parent_code  in (24,51) order by grp_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getSearchGrouplist()
    {
        mysql_query("SET NAMES utf8");
        $gname = strtoupper($_POST['group']);

        $r = mysql_query("select * from acc_group_master where grp_parent_code  in (24,51) and grp_name like '%$gname%'  order by grp_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getGroupLedgerDetails()
    {
        mysql_query("SET NAMES utf8");

	$compcode = $_POST['compcode'];
	$fincode  = $_POST['finid'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
        $groupcode = $_POST['groupcode'];
        $r = mysql_query(" select @a:=@a+1 as sno,  DATE_FORMAT(accref_voudate, '%d-%m-%Y') as accref_voudate, cust_name,  case when accref_vou_type = 'GSI' then  'Regular Sales' else 
case when accref_vou_type = 'OSI' then  'Other Sales'  else  case when accref_vou_type = 'CIP' then  'Cash Payment' 
else  case when accref_vou_type = 'CIR' then  'Cash Receipt' 
else  case when accref_vou_type = 'BKP' then  'Bank Payment' 
else  case when accref_vou_type = 'EXP' then  'Expenses' 
else  case when accref_vou_type = 'BKR' then  'Bank Receipt' 
else  case when accref_vou_type = 'GSR' then  'Sales Return' 
else  case when accref_vou_type = 'GJV' then  'Journal' 
else  case when left(accref_vou_type,2) = 'CN' then  'Credit Note' 
else  case when left(accref_vou_type,2) = 'DN' then  'Debit Note' 
else  case when left(accref_vou_type,1) = 'P' then  'Purchase' 
end end end end end end end end end end end end voutype ,  accref_payref_no,  accref_vouno,acctran_dbamt,acctran_cramt,acctran_led_code , accref_seqno from (
 select * from acc_ref ref left join acc_tran trn
 on ref.accref_seqno = trn.acctran_accref_seqno
 join massal_customer mas
 on trn.acctran_led_code = mas.cust_code and (cust_type in ('C','S')  and cust_acc_group = $groupcode  )
 where accref_comp_code = $compcode and accref_voudate between '$startdate' and '$enddate' order by accref_seqno
) a1   join (SELECT @a:= 0) a order by accref_voudate");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getGroupOpeningDetails()
    {
        mysql_query("SET NAMES utf8");

	$compcode = $_POST['compcode'];
	$fincode  = $_POST['finid'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
        $groupcode = $_POST['groupcode'];

        $r = mysql_query("select sum(opdbamt) - sum(opcramt) balamt from 
(
select curbal_led_code  ledgercode , curbal_obdbamt  opdbamt  , curbal_obcramt  opcramt from acc_current_balance , massal_customer where  curbal_led_code = cust_code and  curbal_comp_code = $compcode and curbal_finid  = $fincode and  cust_acc_group = $groupcode
union all
select   acctran_led_code ledgercode , sum(acctran_dbamt)  opdbamt  , sum(acctran_cramt)  opcramt  from acc_ref a ,acc_tran b , massal_customer c where acctran_led_code  = cust_code and  accref_comp_code = $compcode and accref_finid = $fincode  and accref_seqno  = acctran_accref_seqno  and  accref_voudate  > '2022-08-31' and   accref_voudate  <  '$startdate'  and  cust_acc_group = $groupcode  group by accref_comp_code,accref_finid,acctran_led_code
) a1  ");
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
        $qry = "select * from massal_customer where cust_name like '%$ledname%'";
        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    } 

 function getUsersList()
    {
        mysql_query("SET NAMES utf8");
        $dept =  $_POST['deptcode'];  
        $r=mysql_query("select  concat(usr_name, ' - ' , department_name) usr_name , usr_code  from   userMaster , mas_department  where usr_dept = department_code  order by usr_name" );
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getVouNoHistory()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$usrcode = $_POST['usrcode'];


        if ($usrcode == 0)
             $r=mysql_query("select accref_seqno,accref_vou_type,accref_vouno,  DATE_FORMAT(accref_voudate, '%d-%m-%Y') as accref_voudate , accref_payref_no , DATE_FORMAT(accref_payref_date, '%d-%m-%Y') as accref_payref_date, case when accvou_slno is null then 1 else accvou_slno end  accvou_slno,case when  accvou_date is null then 0 else  DATE_FORMAT(accvou_date, '%d-%m-%Y')   end accvou_date,case when accvou_narration is null then '' else accvou_narration end  accvou_narration,case when usr_name is null then '' else usr_name end  usr_name,case when usr_login is null then '' else usr_login end  usr_login from acc_ref  left join acc_voucher_logs on accref_seqno = accvou_seqno left join userMaster on accvou_userid  = usr_code   where  accref_comp_code  = $compcode and accref_finid = $finid and accref_voudate between '$startdate' and  '$enddate'");
        else
             $r=mysql_query("select accref_seqno,accref_vou_type,accref_vouno,  DATE_FORMAT(accref_voudate, '%d-%m-%Y') as accref_voudate , accref_payref_no , DATE_FORMAT(accref_payref_date, '%d-%m-%Y') as accref_payref_date, case when accvou_slno is null then 1 else accvou_slno end  accvou_slno,case when  accvou_date is null then 0 else  DATE_FORMAT(accvou_date, '%d-%m-%Y')   end accvou_date,case when accvou_narration is null then '' else accvou_narration end  accvou_narration,case when usr_name is null then '' else usr_name end  usr_name,case when usr_login is null then '' else usr_login end  usr_login from acc_ref  left join acc_voucher_logs on accref_seqno = accvou_seqno left join userMaster on accvou_userid  = usr_code   where  accref_comp_code  = $compcode and accref_finid = $finid and accref_voudate between '$startdate' and  '$enddate' and accvou_userid  = $usrcode");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getVouNoHistoryDept()
    {
        mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$dept      = $_POST['deptcode'];


        $r=mysql_query("select usr_name ,usr_code,count(*) as totrecords from acc_ref  left join acc_voucher_logs on accref_seqno = accvou_seqno left join userMaster on accvou_userid  = usr_code  where  accref_comp_code  = $compcode and usr_dept = $dept  and accref_finid = $finid and accref_voudate between '$startdate' and  '$enddate' and accvou_slno = 1 group by usr_name ,usr_code order by usr_name");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getCashBookOpening()
    {
        mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$ledcode   = $_POST['ledcode'];

        $r=mysql_query(" select * from acc_current_balance where curbal_finid = $finid  and curbal_comp_code = $compcode  and curbal_led_code = $ledcode");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getCashBookPeriod()
    {
        mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$finfirstdate = $_POST['finfirstdate'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
        $ledcode   = $_POST['ledcode']; 

$r=mysql_query("call acc_sp_rep_cashbank_book($ledcode,$compcode,$finid ,'$finfirstdate' , '$startdate','$enddate')");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getPandLMainGroup()
    {
        mysql_query("SET NAMES utf8");

	$finid         = $_POST['finid'];
	$compcode     = $_POST['compcode'];
	$finfirstdate = $_POST['finfirstdate'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$reptype   = $_POST['reptype'];

$r=mysql_query("select  grpcode1,grp_name ,
sum(Obdebit) Obdebit, sum(Obcredit) Obcredit, sum(debit) debit, sum(credit) credit, abs(sum(Obdebit) - sum(Obcredit) + sum(debit) - sum(credit)) closing
 from (

select grp_parent_code grpcode1,grpcode2,grpcode3,grp_name grpname2,grpname3,cust_name, cust_type,
sum(Obdebit) Obdebit, sum(Obcredit) Obcredit, sum(debit) debit, sum(credit) credit
 from (
select grp_parent_code grpcode2,grpcode3,grp_name grpname3,cust_name,
sum(Obdebit) Obdebit, sum(Obcredit) Obcredit, sum(debit) debit, sum(credit) credit, cust_type
 from (
select 
cust_name,cust_acc_group as grpcode3,cust_code ledcode, curbal_obdbamt as Obdebit, curbal_obcramt as Obcredit,
0 as debit,0 as credit ,cust_type
from acc_current_balance cb ,massal_customer a ,acc_group_master  b  where 
a.cust_acc_group = b.grp_code 
and curbal_finid= $finid  and (curbal_obdbamt+curbal_obcramt)>0 and curbal_led_code = cust_code
and curbal_comp_code = $compcode and b.grp_type = '$reptype'
union all 
select cust_name,cust_acc_group as grpcode,acctran_led_code ledcode,
acctran_dbamt as Obdebit, acctran_cramt as Obcredit,
0 as debit,0 as credit ,cust_type
from acc_ref ar ,acc_tran at ,massal_customer a 
,acc_group_master  b   where 
a.cust_acc_group = b.grp_code 
and accref_comp_code =  $compcode and accref_seqno = acctran_accref_seqno and
accref_finid=  $finid   and
accref_voudate < '$startdate'  and
acctran_led_code = cust_code and b.grp_type = '$reptype' 
union all 
select cust_name,cust_acc_group as grpcode3,acctran_led_code ledcode,
0 as Obdebit, 0 as Obcredit,
acctran_dbamt as debit,acctran_cramt as credit ,cust_type
from acc_ref ar ,acc_tran at ,massal_customer a 
,acc_group_master  b   where 
a.cust_acc_group = b.grp_code 
and accref_comp_code =  $compcode and accref_seqno = acctran_accref_seqno and
accref_finid=  $finid  and
accref_voudate > '2022-08-31'  and
accref_voudate>= '$startdate'  and accref_voudate<= '$enddate' and 
acctran_led_code = cust_code and b.grp_type = '$reptype' 
) a1 , acc_group_master b1 where a1.grpcode3 = b1.grp_code group by grp_parent_code,grpcode3,grp_name,cust_name, cust_type
) a2 , acc_group_master b2 where a2.grpcode2 = b2.grp_code group by grp_parent_code,grpcode2,grpcode3,grp_name,grpname3,cust_name, cust_type
) a3 , acc_group_master b3 where a3.grpcode1 = b3.grp_code group by  grpcode1,grp_name
");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getBSMainGroup()
    {
        mysql_query("SET NAMES utf8");

	$finid         = $_POST['finid'];
	$compcode     = $_POST['compcode'];
	$finfirstdate = $_POST['finfirstdate'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$reptype   = $_POST['reptype'];

$r=mysql_query("select  grpcode1,grp_name ,
sum(Obdebit) Obdebit, sum(Obcredit) Obcredit, sum(debit) debit, sum(credit) credit, abs(sum(Obdebit) - sum(Obcredit) + sum(debit) - sum(credit)) closing
 from (

select grp_parent_code grpcode1,grpcode2,grpcode3,grp_name grpname2,grpname3,cust_name, cust_type,
sum(Obdebit) Obdebit, sum(Obcredit) Obcredit, sum(debit) debit, sum(credit) credit
 from (
select grp_parent_code grpcode2,grpcode3,grp_name grpname3,cust_name,
sum(Obdebit) Obdebit, sum(Obcredit) Obcredit, sum(debit) debit, sum(credit) credit, cust_type
 from (
select 
cust_name,cust_acc_group as grpcode3,cust_code ledcode, curbal_obdbamt as Obdebit, curbal_obcramt as Obcredit,
0 as debit,0 as credit ,cust_type
from acc_current_balance cb ,massal_customer a ,acc_group_master  b  where 
a.cust_acc_group = b.grp_code 
and curbal_finid= $finid  and (curbal_obdbamt+curbal_obcramt)>0 and curbal_led_code = cust_code
and curbal_comp_code = $compcode and b.grp_type = '$reptype' -- AND curbal_led_code != 1717
union all 
select cust_name,cust_acc_group as grpcode,acctran_led_code ledcode,
acctran_dbamt as Obdebit, acctran_cramt as Obcredit,
0 as debit,0 as credit ,cust_type
from acc_ref ar ,acc_tran at ,massal_customer a 
,acc_group_master  b   where 
a.cust_acc_group = b.grp_code 
and accref_comp_code =  $compcode and accref_seqno = acctran_accref_seqno and
accref_finid=  $finid   and
accref_voudate < '$startdate'  and
acctran_led_code = cust_code and b.grp_type = '$reptype' 
union all 
select cust_name,cust_acc_group as grpcode3,acctran_led_code ledcode,
0 as Obdebit, 0 as Obcredit,
acctran_dbamt as debit,acctran_cramt as credit ,cust_type
from acc_ref ar ,acc_tran at ,massal_customer a 
,acc_group_master  b   where 
a.cust_acc_group = b.grp_code 
and accref_comp_code =  $compcode and accref_seqno = acctran_accref_seqno and
accref_finid=  $finid  and
accref_voudate > '2022-08-31'  and
accref_voudate>= '$startdate'  and accref_voudate<= '$enddate' and 
acctran_led_code = cust_code and b.grp_type = '$reptype' 
) a1 , acc_group_master b1 where a1.grpcode3 = b1.grp_code group by grp_parent_code,grpcode3,grp_name,cust_name, cust_type
) a2 , acc_group_master b2 where a2.grpcode2 = b2.grp_code group by grp_parent_code,grpcode2,grpcode3,grp_name,grpname3,cust_name, cust_type
) a3 , acc_group_master b3 where a3.grpcode1 = b3.grp_code group by  grpcode1,grp_name
");

//echo $r;

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getOpeningStock()
    {
        mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$finfirstdate = $_POST['finfirstdate'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];

$r=mysql_query("
select grp_parent_code grpcode1,grpcode2,grpcode3,grp_name grpname2,grpname3,cust_name, cust_type,
sum(Obdebit) Obdebit, sum(Obcredit) Obcredit, sum(debit) debit, sum(credit) credit, abs(sum(Obdebit) - sum(Obcredit) + sum(debit) - sum(credit)) closing
 from (
select grp_parent_code grpcode2,grpcode3,grp_name grpname3,cust_name,
sum(Obdebit) Obdebit, sum(Obcredit) Obcredit, sum(debit) debit, sum(credit) credit, cust_type
 from (
select 
cust_name,cust_acc_group as grpcode3,cust_code ledcode, curbal_obdbamt as Obdebit, curbal_obcramt as Obcredit,
0 as debit,0 as credit ,cust_type
from acc_current_balance cb ,massal_customer a ,acc_group_master  b  where 
a.cust_acc_group = b.grp_code 
and curbal_finid= $finid  and (curbal_obdbamt+curbal_obcramt)>0 and curbal_led_code = cust_code
and curbal_comp_code = $compcode and cust_code = 1717
union all 
select cust_name,cust_acc_group as grpcode,acctran_led_code ledcode,
acctran_dbamt as Obdebit, acctran_cramt as Obcredit,
0 as debit,0 as credit ,cust_type
from acc_ref ar ,acc_tran at ,massal_customer a 
,acc_group_master  b   where 
a.cust_acc_group = b.grp_code 
and accref_comp_code =  $compcode and accref_seqno = acctran_accref_seqno and
accref_finid=  $finid   and
accref_voudate < '$startdate'  and
acctran_led_code = cust_code and  cust_code = 1717 
union all 
select cust_name,cust_acc_group as grpcode3,acctran_led_code ledcode,
0 as Obdebit, 0 as Obcredit,
acctran_dbamt as debit,acctran_cramt as credit ,cust_type
from acc_ref ar ,acc_tran at ,massal_customer a 
,acc_group_master  b   where 
a.cust_acc_group = b.grp_code 
and accref_comp_code =  $compcode and accref_seqno = acctran_accref_seqno and
accref_finid=  $finid  and
accref_voudate > '2022-08-31'  and
accref_voudate>= '$startdate'  and accref_voudate<= '$enddate' and 
acctran_led_code = cust_code and cust_code = 1717
) a1 , acc_group_master b1 where a1.grpcode3 = b1.grp_code group by grp_parent_code,grpcode3,grp_name,cust_name, cust_type
) a2 , acc_group_master b2 where a2.grpcode2 = b2.grp_code group by grp_parent_code,grpcode2,grpcode3,grp_name,grpname3,cust_name, cust_type");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getProfit_LossAmt()
    {
        mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];


$r=mysql_query("select curbal_obdbamt, curbal_obcramt from acc_current_balance where curbal_led_code = 2000 and curbal_comp_code = $compcode and curbal_finid = $finid");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }




 function get_column_Ledger()
    {
        mysql_query("SET NAMES utf8");

	$compcode  = $_POST['fcompcode'];
	$finid     = $_POST['finid'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$ledcode   = $_POST['ledcode'];
	$tablename = $_POST['tablename'];
	$sp        = $_POST['sp'];

        $qry = "call spacc_rep_ledger_column_report($compcode ,$finid,'$startdate','$enddate','$ledcode','$tablename','$sp')";     

//echo $qry;
//echo "<br>";
        $r1 = mysql_query("call spacc_rep_ledger_column_report($compcode ,$finid,'$startdate','$enddate','$ledcode','$tablename','$sp')");     



        $r = mysql_query("select *  from $tablename order by accref_voudate,accref_seqno");      



	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getClosingStock()
    {
        mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$finfirstdate = $_POST['finfirstdate'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];

$r=mysql_query("
select stock , case when  sum(cloamt) > 0 then sum(opamt) - sum(cloamt)  else 0 end as closingstkvalue from 
(
select 'stock' stock , curbal_obdbamt opamt, 0 cloamt   from acc_current_balance where curbal_led_code=1717 and curbal_finid = $finid  and curbal_comp_code = $compcode
union all
select 'stock' stock , 0 opamt, clostk_value cloamt    from acc_closing_stock  where clostk_date <= '$enddate' and clostk_fincode = $finid  and clostk_compcode = $compcode) a group by stock");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }




 function getLedgerMonthwise()
    {
        mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$finfirstdate = $_POST['finfirstdate'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$ledcode   = $_POST['ledcode'];

         $r = mysql_query("call accspreptrialbalanceclosing_Ledger_Monthwise($finid ,$compcode, '$startdate', '$enddate',$ledcode, '$finfirstdate')");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

?>




