<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

//ini_set('memory_limit', '512M');
//ini_set('max_execution_time', 300); // 5 minutes


    $task="loadPurchaseDetails";

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
mysqli_set_charset($conn, "utf8");
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

		case "load_Ledger_DetailsEmail":
			get_Ledger_DetailsEmail();
	    break;

		case "load_GroupLedger_Opening":
                get_GroupLedger_Opening();
		break;


		case "load_Bills_Details":
                get_AR_Bills_Details();
		break;
		case "load_Bills_DetailsSMS":
                get_AR_Bills_DetailsSMS();
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



		case "loadRep_All_Outstanding":
		getRep_All_Outstanding();
		break;


		case "loadParty_Overdue_Outstanding":
		getParty_Overdue_Outstanding();
		break;

		case "loadParty_Alldue_Outstanding":
		getParty_Alldue_Outstanding();
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


		case "loadCashBookPeriod_Datewise":
                getCashBookPeriod_Datewise();
		break;




		case "loadLedgerOpening_Closing":
                getLedgerOpening_Closing();
		break;


		case "loadVouNoModifyHistory":
                getVouNoModifyHistory();
		break;

		case "loadVouNoModifyHistoryDetail":
                getVouNoModifyHistoryDetail();
		break;

             	case "loadReportLedgerGroupList" :
		getReportLedgerGroupList();
		break;
             	case "loadReportGroupLedgerList" :
		getReportGroupLedgerList();
		break;

             	case "LedgerGroupClick" :
		getLedgerGroupClick();
		break;
             	case "loadLedgerGroupMonthwise" :
		getLedgerGroupMonthwise();
		break;

             	case "loadTruckTypeDetails" :
		getTruckTypeDetails();
		break;


             	case "loadTruckList" :
		getTruckList();
		break;


             	case "loadTruckDetails" :
		getTruckDetails();
		break;

             	case "AdjNoClick" :
		getAdjustmentDetails();
		break;


             	case "loadVouNoDetail" :
		getVouNoDetail();
		break;

		case "load_CustCollection_Abstract":
                get_CustCollection_Abstract();
		break;


		case "loadRep_Overdue_Outstanding_blocklist":
		getRep_Overdue_Outstanding_blocklist();
		break;

		case "loadParty_Overdue_Outstanding_blocklist":
		getParty_Overdue_Outstanding_blocklist();
		break;

		case "loadReceiptList":
	        getReceiptList();
		break;

		case "find_column_Ledger":
	        get_column_Ledger();
		break;


		case "load_BR_Pending":
	        get_BR_Pending();
		break;


		case "loadParty_Target_Outstanding":
		getParty_Target_Outstanding();
		break;


		case "find_Address":
		getAddress();
		break;


		case "find_column_Ledger_JV":
		get_column_Ledger_JV();
		break;


		case "load_Rep_AR_Agewise":
		get_Rep_AR_Agewise();
		break;

		case "loadPayableGroup":
			get_PayableGroup();
	break;

               default:
               	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   


 function getVouTypeList()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];

//        $sql = "  select * from (select accref_vou_type , vou_name,count(*) as nos  from acc_ref  a1 left join acc_voutype  b1 on  a1.accref_vou_type = b1.vou_type  where accref_comp_code = $compcode and accref_voudate between '$startdate' and '$enddate' group by  accref_vou_type  order by   vou_name  ) a 
//union all 
//  select 'PUR' accref_vou_type, 'ALL PURCHASES' vou_name,count(*) as nos   from acc_ref  where accref_comp_code = $compcode and accref_voudate between '$startdate' and '$enddate' and  accref_vou_type in ('PDE','PFU','PGS','PIC','PIW','PWP')";

  $sql = "  select * from (
    select accref_vou_type , vou_name ,count(*) as nos from (
  select accref_vou_type , vou_name , accref_vouno  from acc_ref  ref   join acc_tran trn  on trn.acctran_accref_seqno = ref.accref_seqno   and  acctran_totamt > 0  
  left join acc_voutype  vtype on  ref.accref_vou_type = vtype.vou_type  
  where accref_comp_code = $compcode and accref_voudate between '$startdate' and '$enddate'  and  acctran_totamt > 0 group by accref_vou_type , vou_name , accref_vouno) aa1
  group by accref_vou_type, vou_name  order by accref_vou_type, vou_name
   ) a 
  union all 
  select 'PUR' accref_vou_type, 'ALL PURCHASES' vou_name,count(*) as nos   from acc_ref  where accref_comp_code = $compcode and accref_voudate between '$startdate' and '$enddate' and  accref_vou_type in ('PDE','PFU','PGS','PIC','PIW','PWP')";

  $r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getVouNoList()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$voutype = $_POST['voutype'];
	$ledtype = $_POST['ledtype'];

if ($voutype == "PUR")
{
        if ($ledtype == 'A')
             $sql = "select  accref_vou_type,accref_seqno,accref_vouno,accref_payref_no , DATE_FORMAT(accref_voudate,'%d-%m-%Y') as accref_voudate,cust_name,acctran_dbamt,acctran_cramt ,acctran_led_code, accref_narration from acc_ref ref  join acc_tran tran on  tran.acctran_accref_seqno = ref.accref_seqno   join massal_customer mas on  tran.acctran_led_code = mas.cust_code  where  accref_voudate between '$startdate' and '$enddate' and  accref_comp_code = $compcode and  accref_vou_type  in ('PDE','PFU','PGS','PIC','PIW','PWP') ";
        else
             $sql = "select accref_vou_type,accref_seqno, accref_vouno,accref_payref_no , DATE_FORMAT(accref_voudate,'%d-%m-%Y') as accref_voudate,cust_name,acctran_dbamt,acctran_cramt ,acctran_led_code from acc_ref ref  join acc_tran tran on  tran.acctran_accref_seqno = ref.accref_seqno   join massal_customer mas on  tran.acctran_led_code = mas.cust_code  where  accref_voudate between '$startdate' and '$enddate' and  accref_comp_code = $compcode and  accref_vou_type in ('PDE','PFU','PGS','PIC','PIW','PWP') and  cust_type != 'G'";
}
else
{
        if ($ledtype == 'A')
             $sql = "select  accref_vou_type,accref_seqno,accref_vouno,accref_payref_no , DATE_FORMAT(accref_voudate,'%d-%m-%Y') as accref_voudate,cust_name,acctran_dbamt,acctran_cramt ,acctran_led_code, accref_narration from acc_ref ref  join acc_tran tran on  tran.acctran_accref_seqno = ref.accref_seqno   join massal_customer mas on  tran.acctran_led_code = mas.cust_code  where  accref_voudate between '$startdate' and '$enddate' and  accref_comp_code = $compcode and  accref_vou_type  = '$voutype' ";
        else
             $sql = "select accref_vou_type,accref_seqno, accref_vouno,accref_payref_no , DATE_FORMAT(accref_voudate,'%d-%m-%Y') as accref_voudate,cust_name,acctran_dbamt,acctran_cramt ,acctran_led_code from acc_ref ref  join acc_tran tran on  tran.acctran_accref_seqno = ref.accref_seqno   join massal_customer mas on  tran.acctran_led_code = mas.cust_code  where  accref_voudate between '$startdate' and '$enddate' and  accref_comp_code = $compcode and  accref_vou_type  = '$voutype' ";
}

    $r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getDocumentList()
    {
        global $conn;

	$finid      = $_POST['finid'];
	$compcode   = $_POST['compcode'];
	$startdate  = $_POST['startdate'];
	$enddate    = $_POST['enddate'];
	$ledcode    = $_POST['ledcode'];
	$ledgertype = $_POST['ledgertype'];

    $sql = "select a.*,c.cust_name partyledger  from
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
 ) a , acc_tran b , massal_customer c where a.accref_seqno = b.acctran_accref_seqno and b.acctran_serialno = 1 and b.acctran_led_code = c.cust_code  order by accref_voudate,accref_seqno ";


    $r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



   

 function getPurchaseDetails()
    {
        global $conn;

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
    $opt   = 2;

 
    $sql = "call spsal_rep_MonthwiseSales_Abstract($compcode,$finid , '$startdate','$enddate',$opt)";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getSalesDetails()
    {
        global $conn;

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
    $opt       = 1; 

//$sql = "select UPPER(monthname(accref_voudate)) as rmonth  , sum(acctran_dbamt) dramt ,  sum(acctran_cramt) cramt  from acc_ref ref  join acc_tran tran on  tran.acctran_accref_seqno = ref.accref_seqno   join massal_customer mas on  tran.acctran_led_code = mas.cust_code 	 where  accref_vou_type  in ('GSI','OSI') and  accref_comp_code = '$compcode ' and accref_finid = '$finid'  and accref_voudate between '$startdate' and  '$enddate'  and cust_type <> 'G'  group by upper(monthname(accref_voudate))";

$sql = "call spsal_rep_MonthwiseSales_Abstract($compcode,$finid , '$startdate','$enddate',$opt)";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getCashBookDetails()
    {
        global $conn;

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
        $ledcode   = $_POST['ledcode']; 

    $sql = "call spacc_rep_Monthwise_CashBank($compcode,$finid , '$startdate','$enddate',$ledcode)";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



 function getSalesDocumentList()
    {
        global $conn;

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];

         $sql = "call spsal_rep_Month_Sales_Details($compcode,$finid , '$startdate','$enddate')";
		 $r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getPurchaseDocumentList()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$voucherType = $_POST['voucherType'];


 //  $r = "call spacc_rep_Month_Purchase_Details($compcode,$finid , '$startdate','$enddate','$voucherType')";

//echo $r;


   $sql = "call spacc_rep_Month_Purchase_Details($compcode,$finid , '$startdate','$enddate','$voucherType')";

   $r = mysqli_query($conn, $sql);

	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getTB_Maingroup()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];




         $sql = "call accspreptrialbalanceclosing_View_Maingroup($finid ,$compcode, '$startdate', '$enddate')";



		 $r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getTB_2NDgroup()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$mgrpcode = $_POST['mgrpcode'];

         $sql = "call accspreptrialbalanceclosing_View_SubMaingroup($finid ,$compcode, '$startdate', '$enddate','$mgrpcode' )";



		 $r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getTB_2NDgroup_alllist()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$mgrpcode = $_POST['mgrpcode'];

         $sql = "call accspreptrialbalanceclosing_View_SubMaingroup_alllist($finid ,$compcode, '$startdate', '$enddate','$mgrpcode' )";


		 $r = mysqli_query($conn, $sql);

	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getTB_IIIgroup()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$mgrpcode = $_POST['mgrpcode'];
	$fsdate = $_POST['fsdate'];
    $sql = "call accspreptrialbalanceclosing_View_Subgroup($finid ,$compcode, '$startdate', '$enddate','$mgrpcode','$fsdate')";
	$r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getTB_Ledgers()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$mgrpcode = $_POST['mgrpcode'];
	$fsdate = $_POST['fsdate'];
         $sql = "call accspreptrialbalanceclosing_View_Subgroup_levelend($finid ,$compcode, '$startdate', '$enddate','$mgrpcode','$fsdate',0 )";

		 $r = mysqli_query($conn, $sql);


	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }




 function get_Ledger_Details()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$ledcode = $_POST['ledcode'];
	$ledtype = $_POST['ledgertype'];    


//$sql = "call acc_sp_rep_ledger('$ledcode',$compcode,$finid ,'$startdate', '$enddate','','$ledtype')";  

//echo $sql;

         $sql = "call acc_sp_rep_ledger('$ledcode',$compcode,$finid ,'$startdate', '$enddate','','$ledtype')";

//echo $sql;		
		 $r = mysqli_query($conn, $sql);

	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


	function get_Ledger_DetailsEmail()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$ledcode = $_POST['ledcode'];
	$ledtype = $_POST['ledgertype'];    


//$sql = "call acc_sp_rep_ledger('$ledcode',$compcode,$finid ,'$startdate', '$enddate','','$ledtype')";  

//echo $sql;

         $sql = "call acc_sp_rep_ledgerEmail('$ledcode',$compcode,$finid ,'$startdate', '$enddate','','$ledtype')";

//echo $sql;		
		 $r = mysqli_query($conn, $sql);

	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	

 function get_AR_Bills_Details()
    {
        global $conn;

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$ledcode   = $_POST['ledcode'];
	$alldueopt = $_POST['alldueopt'];
	$dueopt    = $_POST['dueopt'];
	$ledtype   = $_POST['ledtype'];


     if ($ledtype == "S")
	 {

		   $x = "call accsp_rep_ap_billwisedue($compcode, '$startdate','$enddate',$ledcode,'P',0,0,0,0,'A');";
	 }
     else
	 {
       if ($alldueopt == 0) 
//        $x = "call spacc_rep_receivables_Party_overdue_outstanding($compcode,'$startdate', '$enddate',$ledcode,0,'$dueopt')";

        $x = "call spacc_rep_receivables_outstanding($compcode, '$startdate','$enddate',$ledcode,0, '$alldueopt' ,'$dueopt')";
       else
        $x = "call accsp_rep_ar_billwisedue($compcode,'$startdate', '$enddate',$ledcode,'$alldueopt',0,'$dueopt')";
	 }

 //echo $x;


        $r = mysqli_query($conn, $x);

	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function get_AR_Bills_DetailsSMS()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$ledcode = $_POST['ledcode'];
	$alldueopt = 0;
        $sql = "call accsp_rep_ar_billwisedueSMS($compcode,'$startdate', '$enddate',$ledcode)";
		$r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function get_RepCollection_Abstract()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$ledcode = $_POST['ledcode'];

         $sql = "call accsp_rep_Rep_collection_Summary($compcode,'$startdate', '$enddate')";


		 $r = mysqli_query($conn, $sql);

	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function get_RepParty_Collection_Abstract()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$repcode = $_POST['repcode'];

         $sql = "call accsp_rep_Rep_Party_collections($compcode,'$startdate', '$enddate',$repcode)";


		 $r = mysqli_query($conn, $sql);

	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function get_RepParty_Bills_Collection()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$ledcode = $_POST['custcode'];

         $sql = "call accsp_rep_Party_Bills_collections($compcode,'$startdate', '$enddate',$ledcode)";


		 $r = mysqli_query($conn, $sql);

	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function get_Payable_Bills_Details()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$ledcode = $_POST['ledcode'];
	$repopt  = $_POST['repopt'];

//        $r = "call accsp_rep_ap_billwisedue($compcode,'$startdate', '$enddate',$ledcode,'$repopt',0,0,0,0)";
//echo $r;
        $sql = "call accsp_rep_ap_billwisedue($compcode,'$startdate', '$enddate',$ledcode,'$repopt',0,0,0,0,'A')";



		$r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function get_Groupwise_Payment()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$ledcode = $_POST['ledcode'];

         $sql = "call accsp_rep_group_payment_Summary($compcode,'$startdate', '$enddate')";


		 $r = mysqli_query($conn, $sql);

	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function get_Group_Party_Payments()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$grpcode = $_POST['grpcode'];

         $sql = "call accsp_rep_group_payment_partywise($compcode,'$startdate', '$enddate',$grpcode)";


		 $r = mysqli_query($conn, $sql);

	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function get_GroupParty_Bills_Payments()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$suppliercode = $_POST['suppliercode'];

         $sql = "call accsp_rep_party_datewise_payments($compcode,'$startdate', '$enddate',$suppliercode)";


		 $r = mysqli_query($conn, $sql);

	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getSearchPartylist()
    {
        global $conn;

        $party  = $_POST['party'];
        $party = trim(str_replace(" ", "", $party)); 
        $party = trim(str_replace(".", "", $party));

  //      $sql = "select * from massal_customer where cust_type = 'C' and cust_name like '%$party%' order by cust_name";

        $sql = "select * from massal_customer where cust_type = 'C' and  replace(replace(cust_name,' ','')  ,'.','')  like '%$party%' order by cust_name";

  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getSearchSupplierlist()
    {
        global $conn;

        $party  = $_POST['party'];
        $party = trim(str_replace(" ", "", $party)); 
        $party = trim(str_replace(".", "", $party));

        $sql = "select * from massal_customer where replace(replace(cust_name,' ','')  ,'.','')  like '%$party%' order by cust_name";
  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getParty_Outstanding()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$mgrpcode = $_POST['mgrpcode'];

         $sql = "call accsp_trial_balance_creditors_debitors_partywise($finid ,$compcode, '$startdate', '$enddate','$mgrpcode' )";


		 $r = mysqli_query($conn, $sql);

	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getRep_Overdue_Outstanding()
    {
        global $conn;

	$compcode = $_POST['compcode'];
	$asondate = $_POST['asondate'];
	$dueoption = $_POST['dueoption'];

        $sql = "call spacc_rep_receivables_Rep_overdue_Abstract($compcode, '$asondate', '$dueoption')";
		$r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getRep_Overdue_Outstanding_Blocklist()
    {
        global $conn;

	$compcode = $_POST['compcode'];
	$asondate = $_POST['asondate'];

        $sql = "call spacc_rep_rep_party_overdue_days_abstract($compcode, '$asondate',0,100)";
		$r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getParty_Overdue_Outstanding_Blocklist()
    {
        global $conn;

	$compcode = $_POST['compcode'];
	$asondate = $_POST['asondate'];
	$repcode  = $_POST['repcode'];
        $sql = "call spacc_rep_rep_party_overdue_days_abstract($compcode, '$asondate',$repcode,100)";
		$r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getRep_All_Outstanding()
    {
        global $conn;

	$compcode = $_POST['compcode'];
	$asondate = $_POST['asondate'];
	$dueopt   = $_POST['dueopt'];


        $sql = "call spacc_rep_receivables_Rep_AllOutstanding_Abstract($compcode, '$asondate','$dueopt')";
		$r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getParty_Overdue_Outstanding()
    {
        global $conn;

	$compcode   = $_POST['compcode'];
	$asondate   = $_POST['asondate'];
	$repcode    = $_POST['repcode'];
	$overdue    = $_POST['overdue'];
	$dueoption  = $_POST['dueopt'];

        $sql = "call spacc_rep_receivables_Partywise_overdue_outstanding($compcode, '$asondate', $repcode,'$overdue','$dueoption')";
		$r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getParty_Alldue_Outstanding()
    {
        global $conn;

	$compcode   = $_POST['compcode'];
	$asondate   = $_POST['asondate'];
	$repcode    = $_POST['repcode'];
	$overdue    = $_POST['overdue'];
	$dueoption  = $_POST['dueopt'];

        $sql = "call spacc_rep_receivables_Partywise_All_outstanding($compcode, '$asondate', $repcode,'$overdue','$dueoption')";
		$r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getDayBookDetails()
    {
        global $conn;

	$compcode = $_POST['compcode'];
	$fibcode  = $_POST['finid'];
	$asondate = $_POST['rdate'];
        $count    =0;
        $sql = " select @a:=@a+1 as sno,  DATE_FORMAT(accref_voudate, '%d-%m-%Y') as accref_voudate, cust_name,  case when accref_vou_type = 'GSI' then  'Regular Sales' else 
case when accref_vou_type = 'OSI' then  'Other Sales'  else  case when accref_vou_type = 'CHP' then  'Cash Payment' 
else  case when accref_vou_type = 'CHR' then  'Cash Receipt' 
else  case when accref_vou_type = 'BKP' then  'Bank Payment' 
else  case when accref_vou_type = 'EXP' then  'Expenses' 
else  case when accref_vou_type = 'BKR' then  'Bank Receipt' 
else  case when accref_vou_type = 'GSR' then  'Sales Return' 
else  case when accref_vou_type = 'GJV' then  'Journal' 
else  case when left(accref_vou_type,2) = 'CN' then  'Credit Note' 
else  case when left(accref_vou_type,2) = 'DN' then  'Debit Note' 
else  case when left(accref_vou_type,1) = 'P' then  'Purchase' 
end end end end end end end end end end end end voutype ,  accref_payref_no,  accref_vouno,acctran_dbamt,acctran_cramt,acctran_led_code , accref_seqno, accref_vou_type from (
 select * from acc_ref ref left join acc_tran trn
 on ref.accref_seqno = trn.acctran_accref_seqno
 join massal_customer mas
 on trn.acctran_led_code = mas.cust_code and (cust_type in ('C','S')  or acctran_serialno =1)
 where accref_comp_code = $compcode and accref_voudate =  '$asondate' order by accref_seqno
) a1   join (SELECT @a:= 0) a ";

    $r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getGroupDetails()
    {
        global $conn;

        $count    =0;
        $sql = "select * from acc_group_master where grp_parent_code  in (24,51) order by grp_name";
		$r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getSearchGrouplist()
    {
        global $conn;
        $gname = strtoupper($_POST['group']);

        $sql = "select * from acc_group_master where grp_parent_code  in (24,51) and grp_name like '%$gname%'  order by grp_name";
		$r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

	

 function getGroupLedgerDetails()
    {
        global $conn;

	$compcode = $_POST['compcode'];
	$fincode  = $_POST['finid'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
        $groupcode = $_POST['groupcode'];
        $sql = " select @a:=@a+1 as sno,  DATE_FORMAT(accref_voudate, '%d-%m-%Y') as accref_voudate, cust_name,  case when accref_vou_type = 'GSI' then  'Regular Sales' else 
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
) a1   join (SELECT @a:= 0) a order by accref_voudate";
$r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getGroupOpeningDetails()
    {
        global $conn;

	$compcode = $_POST['compcode'];
	$fincode  = $_POST['finid'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
        $groupcode = $_POST['groupcode'];

        $sql = "select sum(opdbamt) - sum(opcramt) balamt from 
(
select curbal_led_code  ledgercode , curbal_obdbamt  opdbamt  , curbal_obcramt  opcramt from acc_current_balance , massal_customer where  curbal_led_code = cust_code and  curbal_comp_code = $compcode and curbal_finid  = $fincode and  cust_acc_group = $groupcode
union all
select   acctran_led_code ledgercode , sum(acctran_dbamt)  opdbamt  , sum(acctran_cramt)  opcramt  from acc_ref a ,acc_tran b , massal_customer c where acctran_led_code  = cust_code and  accref_comp_code = $compcode and accref_finid = $fincode  and accref_seqno  = acctran_accref_seqno  and  accref_voudate  > '2022-08-31' and   accref_voudate  <  '$startdate'  and  cust_acc_group = $groupcode  group by accref_comp_code,accref_finid,acctran_led_code
) a1  ";
    $r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getSearchLedgerlist()
    {
        global $conn;


//        $ledname = strtoupper($_POST['ledger']);
//        $sql = "select * from massal_customer where cust_name like '%$ledname%' order by cust_name";

        $ledname = strtoupper($_POST['ledger']);
        $ledname = trim(str_replace(" ", "", $ledname)); 
        $ledname = trim(str_replace(".", "", $ledname)); 
        $ledname = trim(str_replace("-", "", $ledname));

//       $sql = "select * from massal_customer where left(cust_name,2) != 'zz' and replace(replace(replace(cust_name,' ','')  ,'.',''),'-','')   like '%$ledname%' order by cust_name";
      $sql = "SELECT * FROM massal_customer WHERE cust_name NOT LIKE 'zz%'  AND REGEXP_REPLACE(cust_ref, '[ .-]', '')  LIKE '%$ledname%' ORDER BY cust_name;";
 //echo $sql;

  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 




 function getUsersList()
    {
        global $conn;
        $dept =  $_POST['deptcode'];  
        $sql = "select  concat(usr_name, ' - ' , department_name) usr_name , usr_code  from   userMaster , mas_department  where usr_dept = department_code  order by usr_name";
   
		$r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getVouNoHistory()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$usrcode = $_POST['usrcode'];


        if ($usrcode == 0)
             $sql = "select accref_seqno,accref_vou_type,accref_vouno,  DATE_FORMAT(accref_voudate, '%d-%m-%Y') as accref_voudate , accref_payref_no , DATE_FORMAT(accref_payref_date, '%d-%m-%Y') as accref_payref_date, case when accvou_slno is null then 1 else accvou_slno end  accvou_slno,case when  accvou_date is null then 0 else  DATE_FORMAT(accvou_date, '%d-%m-%Y')   end accvou_date,case when accvou_narration is null then '' else accvou_narration end  accvou_narration,case when usr_name is null then '' else usr_name end  usr_name,case when usr_login is null then '' else usr_login end  usr_login from acc_ref  left join acc_voucher_logs on accref_seqno = accvou_seqno left join userMaster on accvou_userid  = usr_code   where  accref_comp_code  = $compcode and accref_finid = $finid and accref_voudate between '$startdate' and  '$enddate'";
        else
             $sql = "select accref_seqno,accref_vou_type,accref_vouno,  DATE_FORMAT(accref_voudate, '%d-%m-%Y') as accref_voudate , accref_payref_no , DATE_FORMAT(accref_payref_date, '%d-%m-%Y') as accref_payref_date, case when accvou_slno is null then 1 else accvou_slno end  accvou_slno,case when  accvou_date is null then 0 else  DATE_FORMAT(accvou_date, '%d-%m-%Y')   end accvou_date,case when accvou_narration is null then '' else accvou_narration end  accvou_narration,case when usr_name is null then '' else usr_name end  usr_name,case when usr_login is null then '' else usr_login end  usr_login from acc_ref  left join acc_voucher_logs on accref_seqno = accvou_seqno left join userMaster on accvou_userid  = usr_code   where  accref_comp_code  = $compcode and accref_finid = $finid and accref_voudate between '$startdate' and  '$enddate' and accvou_userid  = $usrcode";

			 $r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getVouNoHistoryDept()
    {
        global $conn;

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$dept      = $_POST['deptcode'];


        $sql = "select usr_name ,usr_code,count(*) as totrecords from acc_ref  left join acc_voucher_logs on accref_seqno = accvou_seqno left join userMaster on accvou_userid  = usr_code  where  accref_comp_code  = $compcode and usr_dept = $dept  and accref_finid = $finid and accref_voudate between '$startdate' and  '$enddate' and accvou_slno = 1 group by usr_name ,usr_code order by usr_name";
		$r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getCashBookOpening()
    {
        global $conn;

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$ledcode   = $_POST['ledcode'];

        $sql = " select * from acc_current_balance where curbal_finid = $finid  and curbal_comp_code = $compcode  and curbal_led_code = $ledcode";
		$r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getCashBookPeriod()
    {
        global $conn;

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$finfirstdate = $_POST['finfirstdate'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
        $ledcode   = $_POST['ledcode']; 

$sql = "call acc_sp_rep_cashbank_book($ledcode,$compcode,$finid ,'$finfirstdate' , '$startdate','$enddate')";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getCashBookPeriod_Datewise()
    {
        global $conn;

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$finfirstdate = $_POST['finfirstdate'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
        $ledcode   = $_POST['ledcode']; 

$sql = "call acc_sp_rep_cashbank_book_Datewise($ledcode,$compcode,$finid ,'$finfirstdate' , '$startdate','$enddate')";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getLedgerOpening_Closing()
    {
        global $conn;

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$finfirstdate = $_POST['finfirstdate'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
        $ledcode   = $_POST['ledcode']; 

$sql = "call acc_sp_rep_ledger_opening_closing($ledcode,$compcode,$finid ,'$finfirstdate' , '$startdate','$enddate')";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }




 function getVouNoModifyHistory()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$usrcode = $_POST['usrcode'];

        if ($usrcode == 0)
 $sql = "select accref_seqno,DATE_FORMAT(accref_voudate, '%d-%m-%Y') as accref_voudate , accref_vouno ,accref_payref_no, DATE_FORMAT(accref_payref_date, '%d-%m-%Y') as accref_payref_date, case when accvou_slno is null then 1 else accvou_slno end  accvou_slno, DATE_FORMAT(accvou_date, '%d-%m-%Y %h:%i:%s') as accvou_date,usr_name,accvou_narration  from acc_voucher_logs , acc_ref , userMaster where accvou_userid = usr_code  and accvou_seqno = accref_seqno and accref_comp_code = $compcode  and accref_finid = $finid and accvou_date between '$startdate 00:00:00' and  '$enddate 23:59:59'";
        else
 $sql = "select accref_seqno,DATE_FORMAT(accref_voudate, '%d-%m-%Y') as accref_voudate , accref_vouno ,accref_payref_no, DATE_FORMAT(accref_payref_date, '%d-%m-%Y') as accref_payref_date, case when accvou_slno is null then 1 else accvou_slno end  accvou_slno, DATE_FORMAT(accvou_date, '%d-%m-%Y %h:%i:%s') as accvou_date,usr_name,accvou_narration  from acc_voucher_logs , acc_ref , userMaster where accvou_userid = usr_code  and accvou_seqno = accref_seqno and accref_comp_code = $compcode  and accref_finid = $finid and accvou_date between '$startdate 00:00:00' and  '$enddate 23:59:59' and accvou_userid  = $usrcode";


    $r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }




 function getVouNoModifyHistoryDetail()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$seqno    = $_POST['seqno'];

 $sql = "select * from acc_correction_tran , massal_customer where  acctran_led_code = cust_code and acctran_accref_seqno = $seqno order by modified_date desc";

    $r = mysqli_query($conn, $sql); 

	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getReportLedgerGroupList()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$seqno    = $_POST['seqno'];

 $sql = "select rep_merge_code,rep_merge_name from acc_rep_ledger_merge group by rep_merge_code,rep_merge_name";


    $r = mysqli_query($conn, $sql);   
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getReportGroupLedgerList()
    {
        global $conn;

	$reportgroup    = $_POST['reportgroup'];

 $sql = "select concat('(',group_concat(rep_ledcode),')') ledcodelist from acc_rep_ledger_merge where  rep_merge_code = $reportgroup";


    $r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getLedgerGroupClick()
    {
        global $conn;

	$finid       = $_POST['finid'];
	$compcode    = $_POST['compcode'];
	$ledcodelist = $_POST['ledcodelist'];





 $sql = "select case when  sum(curbal_obdbamt) > sum(curbal_obcramt)  then sum(curbal_obdbamt) - sum(curbal_obcramt) else 0 end as curbal_obdbamt , case when  sum(curbal_obcramt) > sum(curbal_obdbamt)  then sum(curbal_obcramt) - sum(curbal_obdbamt) else 0 end as curbal_obcramt from acc_current_balance where curbal_finid = $finid and curbal_comp_code = $compcode and curbal_led_code in $ledcodelist";


 $r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getLedgerGroupMonthwise()
    {
        global $conn;

	$finid       = $_POST['finid'];
	$compcode    = $_POST['compcode'];
	$ledcodelist = $_POST['ledcodelist'];




 $sql = "select 
  sum(atn.acctran_dbamt)   as debit,   
  sum(atn.acctran_cramt)   as credit,   
  month(arf.accref_voudate)  as month  
 from  acc_ref arf,   
  acc_tran atn  
 where  arf.accref_comp_code  = $compcode and   
  arf.accref_finid =  $finid  and   
  arf.accref_vou_type not in ('OB','UB','BA','PR','PT') and  
  arf.accref_seqno  =  atn.acctran_accref_seqno and   
  atn.acctran_led_code in $ledcodelist  and   accref_voudate  > '2022-08-31'
 group by  year(arf.accref_voudate),  
   month(arf.accref_voudate)   
 order by  year(arf.accref_voudate),  
   month(arf.accref_voudate)";


   $r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function get_GroupLedger_Opening()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$ledcode = $_POST['ledcode'];
	$ledtype = $_POST['ledgertype'];    


       // $sql = "call acc_sp_rep_ledger('$ledcode',$compcode,$finid ,'$startdate', '$enddate','','$ledtype')";
//echo $sql;

         $sql = "select * from (
select  '1' as lcode, sum(curbal_obdbamt)  curbal_obdbamt, sum(curbal_obcramt) curbal_obcramt from acc_current_balance   where find_in_set(curbal_led_code,'$ledcode') and  curbal_comp_code = $compcode and curbal_finid  = $finid  ) op left join (
select  '1' as lcode,  sum(acctran_dbamt) as trn_opdr  , sum(acctran_cramt) as trn_opcr  from acc_ref a ,acc_tran b  where accref_comp_code = $compcode  and accref_finid =  $finid and accref_seqno  = acctran_accref_seqno  and  accref_voudate  > '2022-08-31' and   accref_voudate  <  '$startdate' and find_in_set(acctran_led_code,'$ledcode') 
) trnop on trnop.lcode = op.lcode";



    $r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getTruckTypeDetails()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
  //       $sql = "select invh_vehi_no truck, round((sum(invh_totwt)/1000),3) weight from trnsal_invoice_header where  invh_comp_code = $compcode and invh_date between '$startdate' and '$enddate' and invh_totwt > 0 group by invh_vehi_no";

 $sql = "select 'MILL TRUCK' as truck, round((sum(invh_totwt)/1000),3) weight from trnsal_invoice_header  where  invh_comp_code = $compcode and invh_date between '$startdate' and '$enddate' and invh_totwt > 0 and   invh_vehi_no in (select truck_no from mas_mill_truck)
union all
select 'OTHER TRUCK' as truck, round((sum(invh_totwt)/1000),3) weight from trnsal_invoice_header  where  invh_comp_code = $compcode and invh_date between '$startdate' and '$enddate' and invh_totwt > 0 and   invh_vehi_no not in (select truck_no from mas_mill_truck)
";


    $r = mysqli_query($conn, $sql);   
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getTruckList()
    {
        global $conn;

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$trucktype = $_POST['trucktype'];

        if ($trucktype == 'MILL TRUCK')
	     $sql = "select invh_vehi_no truck, round((sum(invh_totwt)/1000),3) weight from trnsal_invoice_header  where  invh_comp_code = $compcode and invh_date between '$startdate' and '$enddate' and invh_totwt > 0 and   invh_vehi_no in (select truck_no from mas_mill_truck) group by invh_vehi_no";      
        else
	     $sql = "	select invh_vehi_no truck, round((sum(invh_totwt)/1000),3) weight from trnsal_invoice_header  where  invh_comp_code = $compcode and invh_date between '$startdate' and '$enddate' and invh_totwt > 0 and   invh_vehi_no not in (select truck_no from mas_mill_truck) group by invh_vehi_no";      



		 $r = mysqli_query($conn, $sql);

	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getTruckDetails()
    {
        global $conn;

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$truckno   = $_POST['truckno'];




        $sql = "select cust_ref , invh_invrefno, DATE_FORMAT(invh_date, '%d-%m-%Y')  invh_date, round((invh_totwt/1000),3) weight,cust_city, invh_delivery_city,invh_vehi_no  from trnsal_invoice_header , massal_customer where  invh_party = cust_code and invh_comp_code = $compcode and invh_date between '$startdate' and '$enddate' and invh_vehi_no = '$truckno' order by invh_date";      


		$r = mysqli_query($conn, $sql);

	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getAdjustmentDetails()
    {
        global $conn;

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$vouno     = $_POST['vouno'];
	$db_cr     = $_POST['db_cr'];
	$ledcode   = $_POST['ledcode'];

        if ($db_cr == 'cr')
        $sql = " select * from (
 select  ref_invno,DATE_FORMAT(ref_invdate, '%d-%m-%Y') voudate,ref_paymt_terms,ref_adjamount,ref_adj_days   from acc_adjustments  , acc_trail where  ref_adjseqno = acctrail_accref_seqno and ref_compcode = $compcode and ref_finid = $finid and  ref_docno = '$vouno'  and acctrail_amtmode = 'D' and acctrail_led_code = ref_ledcode and ref_ledcode = $ledcode
 union all
 select ref_docno ref_invno,DATE_FORMAT(ref_docdate, '%d-%m-%Y') voudate,ref_paymt_terms,ref_adjamount,ref_adj_days  from acc_adjustments  , acc_trail where  ref_docseqno = acctrail_accref_seqno and ref_compcode = $compcode and ref_finid = $finid and  ref_adjvouno = '$vouno'  and acctrail_amtmode = 'D' and acctrail_led_code = ref_ledcode and ref_ledcode = $ledcode ) a1 order by voudate";      
        else
         $sql = " select * from (
 select  ref_invno,DATE_FORMAT(ref_invdate, '%d-%m-%Y') voudate,ref_paymt_terms,ref_adjamount,ref_adj_days   from acc_adjustments  , acc_trail where  ref_adjseqno = acctrail_accref_seqno and ref_compcode = $compcode and ref_finid = $finid and  ref_docno = '$vouno'  and acctrail_amtmode = 'C' and acctrail_led_code = ref_ledcode and ref_ledcode = $ledcode
 union all
 select ref_docno ref_invno,DATE_FORMAT(ref_docdate, '%d-%m-%Y') voudate,ref_paymt_terms,ref_adjamount,ref_adj_days  from acc_adjustments  , acc_trail where  ref_docseqno = acctrail_accref_seqno and ref_compcode = $compcode and ref_finid = $finid and  ref_adjvouno = '$vouno'  and acctrail_amtmode = 'C' and acctrail_led_code = ref_ledcode  and ref_ledcode = $ledcode) a1 order by voudate";         


//echo $sql;
//echo "<br>";

        $r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }




function getVouNoHistoryDetail() {
    $compcode = $_POST['fcompcode'];
    $finid = $_POST['ffinid'];
    $vouno = $_POST['vouno'];
    $sql = "select
		acctran_dbamt,
		acctran_cramt,
		acctran_led_code,
		accref_vouno,
		DATE_FORMAT(accref_voudate,'%Y-%m-%d') as accref_voudate,
		accref_paymode,
		accref_payref_no,
		DATE_FORMAT(accref_payref_date,'%Y-%m-%d') as accref_payref_date,
               cust_name,modified_date
	 from
		acc_correction_ref arf,
		acc_correction_tran atn,
        massal_customer led
	where
		arf.accref_vouno 		= 	'$vouno' and
		arf.accref_comp_code 	= 	'$compcode' and atn.acctran_led_code=led.cust_code and
		arf.accref_finid 		= 	'$finid' and
		atn.acctran_accref_seqno 	= 	arf.accref_seqno";
		$r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}



function getVouNoDetail() {
    $compcode = $_POST['fcompcode'];
    $finid = $_POST['ffinid'];
    $vouno = $_POST['vouno'];
    $sql = "select
		acctran_dbamt,
		acctran_cramt,
		acctran_led_code,
		accref_vouno,
		DATE_FORMAT(accref_voudate,'%Y-%m-%d') as accref_voudate,
		accref_paymode,
		accref_payref_no,
		DATE_FORMAT(accref_payref_date,'%Y-%m-%d') as accref_payref_date,
               cust_name
	 from
		acc_ref arf,
		acc_tran atn,
        massal_customer led
	where
		arf.accref_vouno 		= 	'$vouno' and
		arf.accref_comp_code 	= 	'$compcode' and atn.acctran_led_code=led.cust_code and
		arf.accref_finid 		= 	'$finid' and
		atn.acctran_accref_seqno 	= 	arf.accref_seqno";

		$r = mysqli_query($conn, $sql);

    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}




 function get_CustCollection_Abstract()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$ledcode = $_POST['custcode'];

         $sql = " select  UPPER(monthname(accref_voudate)) as month,sum(acctran_cramt) as collamt from acc_ref ref left join acc_tran trn  on ref.accref_seqno = trn.acctran_accref_seqno  join massal_customer mas  on trn.acctran_led_code = mas.cust_code and  acctran_cramt > 0 and trn.acctran_led_code = $ledcode  where accref_comp_code = $compcode  and accref_finid = $finid  and accref_vou_type in ('BKR','BRK') group by UPPER(monthname(accref_voudate)) ";


    $r = mysqli_query($conn, $sql);

	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getReceiptList()
    {
        global $conn;


	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];


        $sql = "select accref_seqno,accref_voudate, cust_name,accref_vouno,accref_vou_type,
 concat( DATE_FORMAT(accref_voudate, '%d-%m-%Y') , ' - ' , accref_vouno , ' - ' , cust_name   , ' - ' , acctran_cramt  ) as heading,acctran_dbamt,acctran_cramt,  ref_invno ,  DATE_FORMAT(ref_invdate, '%d-%m-%Y') ref_invdate ,ref_adjamount , ref_paymt_terms, ref_adj_days  from acc_ref ref left join acc_tran trn  on ref.accref_seqno = trn.acctran_accref_seqno left outer join acc_adjustments adj on ref_compcode = accref_comp_code and acctran_accref_seqno = ref_docseqno and acctran_led_code = ref_ledcode  join massal_customer led on led.cust_code = trn.acctran_led_code where acctran_cramt > 0 and   accref_comp_code = $compcode and accref_voudate between '$startdate' and '$enddate' and accref_vou_type in('CHR','BKR')  order by accref_seqno ;";      


      //  $sql = "call acc_sp_rep_collection_payment($compcode,'$startdate','$enddate')";      


	  $r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }








 function get_column_Ledger()
    {
        global $conn;

    header('Content-Type: application/json');
ini_set('memory_limit', '1024M');           // Allow large memory
ini_set('max_execution_time', 300);         // 5-minute timeout
ini_set('display_errors', 1);
error_reporting(E_ALL);

	$compcode  = $_POST['fcompcode'];
	$finid     = $_POST['finid'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$tablename = $_POST['tablename'];
	$voutype   = $_POST['voutype'];

        $sql = "call spacc_rep_ledger_column_report_voucher($compcode ,$finid,'$startdate','$enddate','$tablename','$voutype')";     


       mysqli_query($conn, $sql);      
 

        $sql = "SELECT * FROM `$tablename` ORDER BY accref_voudate, accref_seqno";    




        $r = mysqli_query($conn, $sql);      



	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';

    }


					
 function get_BR_Pending()
    {
        global $conn;

	$compcode  = $_POST['fcompcode'];
	$finid     = $_POST['ffinid'];
	$voutype   = $_POST['voutype'];


        $sql = "select accref_seqno,  accref_voudate , accref_vouno,cust_ref, acctrail_inv_value ,acctrail_adj_value , acctrail_inv_value -acctrail_adj_value balance from acc_ref , acc_trail , massal_customer where  acctrail_led_code = cust_code and acctrail_accref_seqno = accref_seqno and   accref_comp_code = $compcode and accref_finid = $finid  and accref_vou_type = '$voutype' and acctrail_inv_value > acctrail_adj_value";     



		$r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }





 function getParty_Target_Outstanding()
    {
        global $conn;

	$compcode = $_POST['compcode'];
	$asondate = $_POST['asondate'];
	$repcode  = $_POST['repcode'];

        $sql = "call spacc_rep_Target_Outstanding($compcode, '$asondate', '$repcode')";
		$r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getAddress()
    {
        global $conn;

	$ledcode  = $_POST['ledcode'];


        $r = "select * from massal_customer , mas_state where cust_state = state_code and  cust_code = $ledcode";
//echo $r;

        $sql = "select * from massal_customer , mas_state where cust_state = state_code and  cust_code = $ledcode";

		$r = mysqli_query($conn, $sql);

	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function get_column_Ledger_JV()
    {
        global $conn;

	$compcode  = $_POST['fcompcode'];
	$finid     = $_POST['finid'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$tablename = $_POST['tablename'];
	$voutype   = $_POST['voutype'];

//echo $sql;
//echo "<br>";
        $sql= "call spacc_rep_ledger_column_report_voucher_JV($compcode ,$finid,'$startdate','$enddate','$tablename')";     



        $sql = "select *  from $tablename order by accref_voudate,accref_seqno";      

    $r = mysqli_query($conn, $sql);

	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }




 function get_Rep_AR_Agewise()
    {
        global $conn;

	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$ledcode   = $_POST['ledcode'];
	$repcode   = $_POST['repcode'];
	$overdue   = $_POST['overdue'];
	$ptgd      = $_POST['ptgd'];
	$agedays1  = $_POST['agedays1'];
	$agedays2  = $_POST['agedays2'];
	$agedays3  = $_POST['agedays3'];
	$agedays4  = $_POST['agedays4'];


        $sql = "call spacc_rep_receivables_outstanding_Bills_Agewise('$compcode', '$startdate','$enddate', '$ledcode','$repcode' , '$overdue' ,'$ptgd','$agedays1','$agedays2','$agedays3','$agedays4')";     
  

//echo $sql;
//echo "<br>";


        $r = mysqli_query($conn, $sql);     
  



	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


	function get_PayableGroup()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$mgrpcode = $_POST['mgrpcode'];
	$fsdate = $_POST['fsdate'];
    $sql = "call accsprep_PayableGroup($finid ,$compcode, '$startdate', '$enddate','$mgrpcode','$fsdate')";
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



