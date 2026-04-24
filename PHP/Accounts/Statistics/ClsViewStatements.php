<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");


    $arr = [];
    $task="loadPurchaseDetails";
    mysqli_set_charset($conn, "utf8");

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }

    switch($task){

		case "loadVouTypeList":
                getVouTypeList();
		break;

		case "loadVouTypeMonthwise":
                getVouTypeMonthwise();
		break;



		case "loadPurchaseDetails":
		getPurchaseDetails();
		break;
		case "loadSalesDetails":
		getSalesDetails();
		break;
		case "loadCashBookDetails":
		getCashBookDetails();
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
/*
    $sql = "select voutype , 
case when voutype = 'BKP' then 'BANK PAYMENT' else
case when voutype = 'BKR' then 'BANK RECEIPT' else 
case when voutype = 'CHR' then 'CASH RECEIPT' else 
case when voutype = 'CHP' then 'CASH PAYMENT' else
case when voutype = 'CNG' then 'CREDIT NOTE (GST)' else
case when voutype = 'CNN' then 'CREDIT NOTE (NOT GST)' else
case when voutype = 'DNG' then 'DEBIT NOTE (GST)' else
case when voutype = 'DNN' then 'DEBIT NOTE (NOT GST)' else
case when voutype = 'GSI' then 'SALES INVOICE(REGULAR)' else
case when voutype = 'OSI' then 'SALES INVOICE(FLY ASH/OTHERS)' else
case when voutype = 'GJV' then 'JOURNALS' else
case when voutype = 'PFU' then 'GRN - FUEL' else
case when voutype = 'PGS' then 'GRN - STORES' else
case when voutype = 'PIW' then 'GRN - IMPORT WASTE PAPER' else
case when voutype = 'PWP' then 'GRN - LOCAL WASTE PAPER' else
case when voutype = 'SDN' then 'DEBIT NOTE (GST SALES)' else
'' end end end end  end end end end end end end end end  end end end  as VouName,
sum(nos) as totrec,sum(cancelnos) as cancelrec  from (
select accref_vou_type voutype, count(*) as nos , 0 cancelnos   from acc_ref  where accref_comp_code = $compcode and accref_voudate between '$startdate' and '$enddate'  and accref_vou_type != 'OPB' group by accref_vou_type
union all
select dbcr_type voutype , 0 as nos, count(*) as cancelnos from acc_dbcrnote_header where dbcr_comp_code = $compcode and  dbcr_finid = $finid and dbcr_date between '$startdate' and '$enddate' and dbcr_value = 0  group by dbcr_type
union all
select 'GSI' voutype ,0 as nos, count(*) as cancelnos  from trnsal_invoice_header where invh_comp_code = $compcode and  invh_fincode = $finid and invh_date between '$startdate' and '$enddate' and invh_netamt = 0  
union all
select 'OSI' voutype ,0 as nos, count(*) as cancelnos  from trn_other_sales where os_compcode = $compcode and  os_fincode = $finid and os_date between '$startdate' and '$enddate' and os_netamt = 0  
) a1 group by voutype order by VouName ";
*/


$sql = "
WITH main AS (
    SELECT voutype , 
    CASE 
        WHEN voutype = 'BKP' THEN 'BANK PAYMENT'
        WHEN voutype = 'BKR' THEN 'BANK RECEIPT'
        WHEN voutype = 'CHR' THEN 'CASH RECEIPT'
        WHEN voutype = 'CHP' THEN 'CASH PAYMENT'
        WHEN voutype = 'CNG' THEN 'CREDIT NOTE (GST)'
        WHEN voutype = 'CNN' THEN 'CREDIT NOTE (NOT GST)'
        WHEN voutype = 'DNG' THEN 'DEBIT NOTE (GST)'
        WHEN voutype = 'DNN' THEN 'DEBIT NOTE (NOT GST)'
        WHEN voutype = 'GSI' THEN 'SALES INVOICE(REGULAR)'
        WHEN voutype = 'OSI' THEN 'SALES INVOICE(FLY ASH/OTHERS)'
        WHEN voutype = 'GJV' THEN 'JOURNALS'
        WHEN voutype = 'PFU' THEN 'GRN - FUEL'
        WHEN voutype = 'PGS' THEN 'GRN - STORES'
        WHEN voutype = 'PIW' THEN 'GRN - IMPORT WASTE PAPER'
        WHEN voutype = 'PWP' THEN 'GRN - LOCAL WASTE PAPER'
        WHEN voutype = 'SDN' THEN 'DEBIT NOTE (GST SALES)'
        ELSE ''
    END AS VouName,
    SUM(nos) AS totrec,
    SUM(cancelnos) AS cancelrec
    FROM (
SELECT accref_vou_type AS voutype,COUNT(*) AS nos, 0 AS cancelnos
FROM (
    SELECT DISTINCT r.accref_seqno, r.accref_vou_type
    FROM acc_ref r
    JOIN acc_tran t 
        ON r.accref_seqno = t.acctran_accref_seqno
    WHERE r.accref_comp_code = $compcode 
      AND r.accref_voudate BETWEEN  '$startdate' AND '$enddate'
      AND r.accref_vou_type != 'OPB'
      AND t.acctran_totamt > 0
) x
GROUP BY accref_vou_type

        UNION ALL

        SELECT dbcr_type, 0, COUNT(*)
        FROM acc_dbcrnote_header 
        WHERE dbcr_comp_code = $compcode 
        AND dbcr_finid = $finid 
        AND dbcr_date BETWEEN '$startdate' AND '$enddate' 
        AND dbcr_value = 0  
        GROUP BY dbcr_type

        UNION ALL

        SELECT 'GSI', 0, COUNT(*)
        FROM trnsal_invoice_header 
        WHERE invh_comp_code = $compcode 
        AND invh_fincode = $finid 
        AND invh_date BETWEEN '$startdate' AND '$enddate' 
        AND invh_netamt = 0  

        UNION ALL

        SELECT 'OSI', 0, COUNT(*)
        FROM trn_other_sales 
        WHERE os_compcode = $compcode 
        AND os_fincode = $finid 
        AND os_date BETWEEN '$startdate' AND '$enddate' 
        AND os_netamt = 0  
    ) a1
    GROUP BY voutype
)

SELECT * FROM (

    -- PAYMENT (TOP)
    SELECT 
        'PAY' AS voutype,
        'PAYMENT' AS VouName,
        SUM(totrec) AS totrec,
        SUM(cancelrec) AS cancelrec,
        1 AS sort_order
    FROM main
    WHERE voutype IN ('BKP','CHP')

    UNION ALL

    -- RECEIPT (TOP)
    SELECT 
        'REC',
        'RECEIPT',
        SUM(totrec),
        SUM(cancelrec),
        2
    FROM main
    WHERE voutype IN ('BKR','CHR')

    UNION ALL
    SELECT 
        'DNOTE',
        'DEBIT NOTE',
        SUM(totrec),
        SUM(cancelrec),
        3
    FROM main
    WHERE voutype IN ('DNG','DNN','SDN')

    UNION ALL
    SELECT 
        'CNOTE',
        'CREDIT NOTE',
        SUM(totrec),
        SUM(cancelrec),
        4
    FROM main
    WHERE voutype IN ('CNG','CNN')	

    UNION ALL
    -- DETAILS
    SELECT 
        voutype,
        VouName,
        totrec,
        cancelrec,
        5
    FROM main

) final
ORDER BY sort_order, VouName";
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


	$voutype = str_replace('"', '', $voutype);

	$voutypeArr = explode(",", $voutype);
	$voutypeList = "'" . implode("','", $voutypeArr) . "'";

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
             $sql = "select  accref_vou_type,accref_seqno,accref_vouno,accref_payref_no , DATE_FORMAT(accref_voudate,'%d-%m-%Y') as accref_voudate,cust_name,acctran_dbamt,acctran_cramt ,acctran_led_code, accref_narration from acc_ref ref  join acc_tran tran on  tran.acctran_accref_seqno = ref.accref_seqno   join massal_customer mas on  tran.acctran_led_code = mas.cust_code  where  accref_voudate between '$startdate' and '$enddate' and  accref_comp_code = $compcode and  accref_vou_type  in ($voutypeList) ";
        else
             $sql = "select accref_vou_type,accref_seqno, accref_vouno,accref_payref_no , DATE_FORMAT(accref_voudate,'%d-%m-%Y') as accref_voudate,cust_name,acctran_dbamt,acctran_cramt ,acctran_led_code from acc_ref ref  join acc_tran tran on  tran.acctran_accref_seqno = ref.accref_seqno   join massal_customer mas on  tran.acctran_led_code = mas.cust_code  where  accref_voudate between '$startdate' and '$enddate' and  accref_comp_code = $compcode and  accref_vou_type in ($voutypeList) and  cust_type != 'G'";
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


	

	function getVouTypeMonthwise()
    {
        global $conn;

	$compcode  = $_POST['compcode'];
	$finid     = $_POST['finid'];
	$voutype   = $_POST['voutype'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];

	$voutype = str_replace('"', '', $voutype);

	$voutypeArr = explode(",", $voutype);
	$voutypeList = "'" . implode("','", $voutypeArr) . "'";
/*
    $sql ="select year(accref_voudate) vouyear, month(accref_voudate) voumonth,monthname(accref_voudate) voumonthname, count(*) as totnos , 0 cancelnos   from acc_ref  where accref_comp_code = $compcode and accref_voudate between '$startdate' and '$enddate'  and accref_vou_type in ($voutypeList) group by
year(accref_voudate) , month(accref_voudate) ,monthname(accref_voudate) 
order by vouyear, voumonth, voumonthname";     
*/
$sql = "
SELECT 
    YEAR(accref_voudate) AS vouyear,
    MONTH(accref_voudate) AS voumonth,
    MONTHNAME(accref_voudate) AS voumonthname,
    COUNT(*) AS totnos,
    0 AS cancelnos
FROM (
    SELECT DISTINCT 
        r.accref_seqno,
        r.accref_voudate
    FROM acc_ref r
    JOIN acc_tran t 
        ON r.accref_seqno = t.acctran_accref_seqno
    WHERE r.accref_comp_code = $compcode
      AND r.accref_voudate BETWEEN '$startdate' AND '$enddate'
      AND r.accref_vou_type IN ($voutypeList)
      AND t.acctran_totamt > 0
) x
GROUP BY 
    YEAR(accref_voudate),
    MONTH(accref_voudate),
    MONTHNAME(accref_voudate)
ORDER BY 
    vouyear, voumonth;
";


        if ($voutype == 'CNG' || $voutype == 'CNN' || $voutype == 'DNG' || $voutype == 'DNN')
        {
	$sql  = "select vouyear, voumonth, upper(voumonthname) voumonthname, sum(totnos) totnos, sum(cancelnos) cancelnos from (
	select year(accref_voudate) vouyear, month(accref_voudate) voumonth,monthname(accref_voudate) voumonthname, count(*) as totnos , 0 cancelnos   from acc_ref where accref_comp_code = $compcode and accref_voudate between '$startdate' and '$enddate'  and accref_vou_type = '$voutype' group by 	year(accref_voudate) , month(accref_voudate) ,monthname(accref_voudate) 
	union all
	select  year(dbcr_date) vouyear, month(dbcr_date) voumonth,monthname(dbcr_date) voumonthname, 0 totnos , count(*) as cancelnos  from acc_dbcrnote_header where dbcr_comp_code = $compcode and  dbcr_finid = $finid and dbcr_date between '$startdate' and '$enddate' and dbcr_value = 0  and dbcr_type = '$voutype' group by year(dbcr_date) , month(dbcr_date) ,monthname(dbcr_date)) a1	group by vouyear, voumonth, voumonthname order by vouyear, voumonth";
        }      

        else if ($voutype == 'GSI')
        {
	$sql = "select vouyear, voumonth, upper(voumonthname)  voumonthname, sum(totnos) totnos, sum(cancelnos) cancelnos from (
	select year(accref_voudate) vouyear, month(accref_voudate) voumonth,monthname(accref_voudate) voumonthname, count(*) as totnos , 0 cancelnos   from acc_ref where accref_comp_code = $compcode and accref_voudate between '$startdate' and '$enddate'  and accref_vou_type = '$voutype' group by 	year(accref_voudate) , month(accref_voudate) ,monthname(accref_voudate) 
	union all
        select year(invh_date) vouyear, month(invh_date) voumonth,monthname(invh_date) voumonthname, 0 totnos , count(*) as cancelnos from trnsal_invoice_header where invh_comp_code = $compcode and  invh_fincode = $finid  and invh_date between '$startdate' and '$enddate' and invh_netamt = 0 group by year(invh_date) , month(invh_date) ,monthname(invh_date) ) a1	group by vouyear, voumonth, voumonthname order by vouyear, voumonth";
        }      
        else if ($voutype == 'OSI')
        {
	$sql = "select vouyear, voumonth,  upper(voumonthname) voumonthname, sum(totnos) totnos, sum(cancelnos) cancelnos from (
	select year(accref_voudate) vouyear, month(accref_voudate) voumonth,monthname(accref_voudate) voumonthname, count(*) as totnos , 0 cancelnos   from acc_ref where accref_comp_code = $compcode and accref_voudate between '$startdate' and '$enddate'  and accref_vou_type = '$voutype' group by 	year(accref_voudate) , month(accref_voudate) ,monthname(accref_voudate) 
	union all
        select year(os_date) vouyear, month(os_date) voumonth,monthname(os_date) voumonthname, 0 totnos , count(*) as cancelnos  from trn_other_sales where os_compcode = $compcode and  os_fincode = $finid and os_date between '$startdate' and '$enddate' and os_netamt = 0 group by year(os_date) , month(os_date) ,monthname(os_date)   ) a1	group by vouyear, voumonth, voumonthname order by vouyear, voumonth";
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


?>



