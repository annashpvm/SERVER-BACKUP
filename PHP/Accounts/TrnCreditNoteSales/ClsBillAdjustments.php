<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadInvDetails';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    global $conn;

    switch($task){

		case "LoadJournalVoucherList":
		getJournalVoucherList();
		break;
		//case "LoadJournalVoucherDetails":
//		getJournalVoucherDetail();
		break;
             	case "loadSearchLedgerlist":
		getSearchLedgerlist();
		break;
             	case "loadVouNoList":
		getVouNoList();
		break;
             	case "loadVouNoDetail":
		getVouNoDetail();
		break;

             	case "loadUnAdjustedBills":
	        getUnAdjustedBills();
		break;

             	case "loadVouTypeList":
	        getVouTypeList();
		break;

             	case "loadCreditNotelist":
	        getCreditNotelist();
		break;

             	case "loadCreditNote_Adjusted":
	        getCreditNote_Adjusted();
		break;

             	case "loadCreditNote_InvDetails":
	        getCreditNote_InvDetails();
		break;

		default:
        	echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
    }

    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    



 function getJournalVoucherList()

    {
  	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];      
        global $conn;
        $sql = "select dbcr_vouno from acc_dbcrnote_header where dbcr_type = 'DNG' and dbcr_finid = '$fincode' and dbcr_comp_code = '$compcode' order by dbcr_no  desc";
       $sql = "select * from acc_ref where accref_comp_code = '$compcode' and accref_finid = '$fincode' and accref_vou_type = 'GJV' order by substring(ltrim(accref_vouno),4,4) desc";
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

      $sql = "select * from massal_customer where  left(cust_name,2) != 'zz' and  replace(replace(cust_name,' ','')  ,'.','')  like '%$ledname%' order by cust_name";

  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 

/*
 function getJournalVoucherDetail()

    {
  	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
       	$vouno    = $_POST['vouno'];

        global $conn;
//        $sql = "select dbcr_vouno from acc_dbcrnote_header where dbcr_type = 'DNG' and dbcr_finid = '$fincode' and dbcr_comp_code = '$compcode' order by dbcr_vouno  desc";

$sql = "select * from acc_ref ref  join acc_tran tran on  tran.acctran_accref_seqno = ref.accref_seqno   join massal_customer mas on  tran.acctran_led_code = mas.cust_code  where accref_vouno = '$vouno' and  accref_comp_code = $compcode and accref_finid = $fincode";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
*/

 function getVouNoList()
    {
        global $conn;

  	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$ledcode  = $_POST['ledcode'];
       	$voutype  = $_POST['voutype'];

        $voutype  =  "'".$voutype. "', 'GJV', 'CNG', 'DNG'";


        $sql = " select accref_seqno, DATE_FORMAT(accref_voudate, '%d-%m-%Y') voudate, accref_voudate ,accref_vouno, acctran_cramt   from acc_ref ref left join acc_tran trn  on ref.accref_seqno = trn.acctran_accref_seqno and accref_vou_type = '$voutype' where accref_comp_code = $compcode  and accref_finid = $fincode and trn.acctran_led_code = $ledcode  order by accref_voudate desc ,accref_vouno desc";

        $sql = "select   accref_seqno, DATE_FORMAT(accref_voudate, '%d-%m-%Y') voudate, accref_voudate ,accref_vouno, acctran_totamt,ref_invno, DATE_FORMAT(ref_invdate, '%d-%m-%Y') ref_invdate, ref_adjamount from  acc_ref ref left join acc_tran trn  on ref.accref_seqno = trn.acctran_accref_seqno and accref_vou_type in ($voutype)  left  join acc_adjustments on accref_comp_code = ref_compcode  and accref_finid = ref_finid and  accref_seqno = ref_docseqno  where accref_comp_code = $compcode and accref_finid =  $fincode and trn.acctran_led_code = $ledcode  and ref_adjamount > 0  order by accref_voudate desc ,ref_invno desc";




  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 

 function getVouNoDetail()
    {
        global $conn;

  	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$ledcode  = $_POST['ledcode'];
       	$seqno    = $_POST['seqno'];

        $sql = " select accref_seqno, ref_adjseqno, acctrail_inv_no , DATE_FORMAT(acctrail_inv_date, '%d-%m-%Y')  acctrail_inv_date ,acctrail_inv_value , acctrail_inv_value - acctrail_adj_value pendingamt,ref_adjamount from acc_ref ref left join acc_adjustments adj on ref_compcode = accref_comp_code  and accref_finid = ref_finid and  accref_seqno = ref_docseqno join acc_trail on acctrail_accref_seqno = ref_adjseqno   where accref_comp_code = $compcode and accref_finid = $fincode  and accref_seqno = $seqno  ";


        $sql = "select a1.*, b1.accref_vouno ,  b1.accref_vou_type from
(select accref_seqno, ref_adjseqno, acctrail_inv_no , acctrail_inv_date ,DATE_FORMAT(acctrail_inv_date, '%d-%m-%Y') invdate ,ref_paymt_terms,acctrail_inv_value , acctrail_inv_value - acctrail_adj_value pendingamt,ref_adjamount from acc_ref ref left join acc_adjustments adj on ref_compcode = accref_comp_code  and accref_finid = ref_finid and  accref_seqno = ref_docseqno join acc_trail on acctrail_accref_seqno = ref_adjseqno   where accref_comp_code = $compcode and accref_finid = $fincode and accref_seqno = $seqno) a1 join  acc_ref b1 on b1.accref_seqno = a1.ref_adjseqno";


  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 


 function getUnAdjustedBills()
    {
        global $conn;

  	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$ledcode  = $_POST['ledcode'];
	$rdate     = $_POST['asondate'];

        $sql = "select  accref_seqno,cust_name,acctrail_led_code,accref_vouno, acctrail_inv_no,  acctrail_inv_date,
   DATE_FORMAT(acctrail_inv_date ,'%d-%m-%Y') as  invdate,   acctrail_inv_value, acctrail_adj_value,
  acctrail_inv_value - acctrail_adj_value balance,  acctrail_amtmode, acctrail_crdays , accref_voudate ,   DATE_FORMAT(accref_voudate ,'%d-%m-%Y') as voudate   from acc_ref ref  left join acc_trail trail  on ref.accref_seqno = trail.acctrail_accref_seqno join massal_customer mas   on trail.acctrail_led_code = mas.cust_code  and acctrail_inv_value > acctrail_adj_value and acctrail_led_code = $ledcode  and accref_voudate <= '$rdate' where accref_comp_code= $compcode ";

//        $sql = "select accref_seqno,accref_vou_type, cust_name, acctrail_led_code, accref_vouno, acctrail_inv_no, acctrail_inv_date, invdate, acctrail_inv_value, acctrail_adj_value, balance, acctrail_amtmode, acctrail_crdays, accref_voudate, voudate, case when invwt is null then 0 else invwt end as invqty  from (select  accref_seqno,accref_vou_type, cust_name,acctrail_led_code,accref_vouno, acctrail_inv_no,  acctrail_inv_date,   DATE_FORMAT(acctrail_inv_date ,'%d-%m-%Y') as  invdate,   acctrail_inv_value, acctrail_adj_value,  acctrail_inv_value - acctrail_adj_value balance,  acctrail_amtmode, acctrail_crdays , accref_voudate ,     DATE_FORMAT(accref_voudate ,'%d-%m-%Y') as voudate ,    Cast(invh_totwt/1000 as decimal(18,3)) as invwt   from acc_ref ref  left join acc_trail trail  on   ref.accref_seqno = trail.acctrail_accref_seqno join massal_customer mas   on trail.acctrail_led_code = mas.cust_code    and acctrail_inv_value > acctrail_adj_value and acctrail_led_code = $ledcode  and accref_voudate <= '$rdate'  left join trnsal_invoice_header on accref_vouno = invh_invrefno and accref_comp_code = invh_comp_code  where   accref_comp_code= $compcode   )a1 where accref_vou_type in ('GSI','PWP') order by acctrail_inv_date,acctrail_inv_no";

        $sql = "select accref_seqno,accref_vou_type, cust_name, acctrail_led_code, accref_vouno, acctrail_inv_no, acctrail_inv_date, invdate, acctrail_inv_value, acctrail_adj_value, balance, acctrail_amtmode, acctrail_crdays, accref_voudate, voudate, case when invwt is null then 0 else invwt end as invqty  from (select  accref_seqno,accref_vou_type, cust_name,acctrail_led_code,accref_vouno, acctrail_inv_no,  acctrail_inv_date,   DATE_FORMAT(acctrail_inv_date ,'%d-%m-%Y') as  invdate,   acctrail_inv_value, acctrail_adj_value,  acctrail_inv_value - acctrail_adj_value balance,  acctrail_amtmode, acctrail_crdays , accref_voudate ,     DATE_FORMAT(accref_voudate ,'%d-%m-%Y') as voudate ,    Cast(invh_totwt/1000 as decimal(18,3)) as invwt   from acc_ref ref  left join acc_trail trail  on   ref.accref_seqno = trail.acctrail_accref_seqno join massal_customer mas   on trail.acctrail_led_code = mas.cust_code    and acctrail_inv_value > acctrail_adj_value and acctrail_led_code = $ledcode  and accref_voudate <= '$rdate'  left join trnsal_invoice_header on accref_vouno = invh_invrefno and accref_comp_code = invh_comp_code  where   accref_comp_code= $compcode   )a1 where accref_vou_type in ('GSI','PWP') order by acctrail_inv_date,CAST(SUBSTRING_INDEX(acctrail_inv_no, '-', -1) AS UNSIGNED)";
        
//        echo $sql;

  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 

 function getVouTypeList()
 {
        $sql = "select accref_vou_type from acc_ref  where length(accref_vou_type) = 3  group by accref_vou_type  order by accref_vou_type  asc";


  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);

 }


 function getCreditNotelist()
    {
        global $conn;

  	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$ledcode  = $_POST['ledcode'];
	$fromdate = $_POST['fromdate'];
	$todate   = $_POST['todate'];


        $sql = "call spacc_rep_WPAdjust_CreditNote_List($compcode ,$fincode , '$fromdate' ,'$todate',$ledcode)";


  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 



 function getCreditNote_Adjusted()
    {
        global $conn;

  	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$ledcode  = $_POST['ledcode'];
	$vouno    = $_POST['vouno'];



        $sql = "
select ref_docno , ref_docdate , DATE_FORMAT(ref_docdate, '%d-%m-%Y') as invdate , ref_adjvouno ,accref_voudate,
DATE_FORMAT(accref_voudate, '%d-%m-%Y') as voudate ,
 ref_invno , ref_invdate ,  DATE_FORMAT(ref_invdate, '%d-%m-%Y') as refinvdate ,
 ref_adjamount from acc_dbcrnote_header join massal_customer on dbcr_partycode = cust_code 
left join  acc_dbcrnote_trailer_Credit_Note_Adjustments on  dbcr_seqno =  dbcn_seqno
left join  acc_adjustments on dbcn_adj_seqno = ref_slno left join  acc_ref on accref_seqno = ref_adjseqno where   dbcr_type = 'CNG' and dbcr_finid = $fincode and dbcr_comp_code = $compcode and dbcr_partycode = $ledcode and dbcr_vouno = '$vouno'";


  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 





 function getCreditNote_InvDetails()
    {
        global $conn;

  	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$ledcode  = $_POST['ledcode'];
	$vouno    = $_POST['vouno'];



        $sql = "select cn_invno , cn_invdate ,  DATE_FORMAT(cn_invdate, '%d-%m-%Y') as invdate , cn_qty ,cn_invamt,cn_pendingamt,cn_adjusted,cn_balance,cd_value,cd_cgst,cd_sgst,cd_round,cd_amount from  acc_dbcrnote_sales_purchase where cn_compcode = $compcode and cn_fincode = $fincode and cn_vouno = '$vouno'";


  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 

?>
