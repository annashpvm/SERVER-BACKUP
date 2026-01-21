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

        // $voutype  =  "'".$voutype. "', 'GJV', 'CNG', 'DNG'";


        $sql = " select accref_seqno, DATE_FORMAT(accref_voudate, '%d-%m-%Y') voudate, accref_voudate ,accref_vouno, acctran_cramt   from acc_ref ref left join acc_tran trn  on ref.accref_seqno = trn.acctran_accref_seqno and accref_vou_type = '$voutype' where accref_comp_code = $compcode  and accref_finid = $fincode and trn.acctran_led_code = $ledcode  order by accref_voudate desc ,accref_vouno desc";

        $sql = "select   accref_seqno, DATE_FORMAT(accref_voudate, '%d-%m-%Y') voudate, accref_voudate ,accref_vouno, acctran_totamt,ref_invno, DATE_FORMAT(ref_invdate, '%d-%m-%Y') ref_invdate, ref_adjamount from  acc_ref ref left join acc_tran trn  on ref.accref_seqno = trn.acctran_accref_seqno and accref_vou_type in ('$voutype')  left  join acc_adjustments on accref_comp_code = ref_compcode  and accref_finid = ref_finid and  accref_seqno = ref_docseqno  where accref_comp_code = $compcode and accref_finid =  $fincode and trn.acctran_led_code = $ledcode  and ref_adjamount > 0  order by accref_voudate desc ,ref_invno desc";

		$sql = "select   accref_seqno, DATE_FORMAT(accref_voudate, '%d-%m-%Y') voudate, accref_voudate ,accref_vouno, acctran_totamt,ref_invno, DATE_FORMAT(ref_invdate, '%d-%m-%Y') ref_invdate, ref_adjamount from  acc_ref ref left join acc_tran trn  on ref.accref_seqno = trn.acctran_accref_seqno and accref_vou_type in ('$voutype')  left  join acc_adjustments on accref_comp_code = ref_compcode  and accref_finid = ref_finid and  (accref_seqno = ref_docseqno OR  accref_seqno = ref_adjseqno)   where accref_comp_code = $compcode and accref_finid =  $fincode and trn.acctran_led_code = $ledcode  and ref_adjamount > 0  order by accref_voudate desc ,ref_invno desc";

		$sql = "select   accref_seqno, DATE_FORMAT(accref_voudate, '%d-%m-%Y') voudate, accref_voudate ,accref_vouno,acctrail_inv_no,acctrail_inv_value,acctrail_adj_value,
 acctrail_inv_value-acctrail_adj_value balamt, ref_invno, DATE_FORMAT(ref_invdate, '%d-%m-%Y') ref_invdate, ref_adjamount ,acctrail_amtmode 
from  acc_ref ref left join acc_trail trn  on ref.accref_seqno = trn.acctrail_accref_seqno and accref_vou_type in ('$voutype')  left  join acc_adjustments on accref_comp_code = ref_compcode  
and accref_finid = ref_finid  and  trn.acctrail_led_code = ref_ledcode  and   (accref_seqno = ref_docseqno OR  accref_seqno = ref_adjseqno)  where accref_comp_code = $compcode and accref_finid = $fincode   and trn.acctrail_led_code = $ledcode   and ref_adjamount > 0  order by accref_voudate desc ,accref_vouno desc,ref_invno desc";

//echo $sql;


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
	$voudrcr  = $_POST['voudrcr'];
	$ledcode  = $_POST['ledcode'];


	if ($voudrcr == "D") 
	   $voutype = "C";
	else 
	   $voutype = "D";


/*
        $sql = " select accref_seqno, ref_adjseqno, acctrail_inv_no , DATE_FORMAT(acctrail_inv_date, '%d-%m-%Y')  acctrail_inv_date ,acctrail_inv_value , acctrail_inv_value - acctrail_adj_value pendingamt,ref_adjamount from acc_ref ref left join acc_adjustments adj on ref_compcode = accref_comp_code  and accref_finid = ref_finid and  accref_seqno = ref_docseqno join acc_trail on acctrail_accref_seqno = ref_adjseqno   where accref_comp_code = $compcode and accref_finid = $fincode  and accref_seqno = $seqno  ";

//        $sql = "select a1.*, b1.accref_vouno ,  b1.accref_vou_type from (select ref_slno,ref_docseqno, ref_adjseqno, acctrail_inv_no , acctrail_inv_date ,DATE_FORMAT(acctrail_inv_date, '%d-%m-%Y') invdate ,ref_paymt_terms,acctrail_inv_value , acctrail_inv_value - acctrail_adj_value pendingamt,ref_adjamount ,acctrail_amtmode from acc_ref ref left join acc_adjustments adj on ref_compcode = accref_comp_code  and accref_finid = ref_finid and  (accref_seqno = ref_docseqno or accref_seqno = ref_adjseqno)   join acc_trail on acctrail_accref_seqno = ref_adjseqno   where accref_comp_code = $compcode and accref_finid = $fincode and accref_seqno = $seqno) a1 join  acc_ref b1 on  b1.accref_seqno = a1.ref_adjseqno ";


	if ($voudrcr  == "D")
        $sql = "select a1.*, b1.accref_vouno ,  b1.accref_vou_type from
(select ref_slno,ref_docseqno, ref_adjseqno,ref_adjvouno,ref_adjvoudate, acctrail_inv_no , acctrail_inv_date ,DATE_FORMAT(acctrail_inv_date, '%d-%m-%Y') invdate ,ref_paymt_terms,acctrail_inv_value , acctrail_inv_value - acctrail_adj_value pendingamt,ref_adjamount ,acctrail_amtmode from acc_ref ref left join acc_adjustments adj on ref_compcode = accref_comp_code  and accref_finid = ref_finid  and ref_ledcode = $ledcode   and  (accref_seqno = ref_docseqno or accref_seqno = ref_adjseqno)   join acc_trail on acctrail_accref_seqno = ref_adjseqno and acctrail_led_code = $ledcode  where accref_comp_code = $compcode and accref_finid = $fincode and accref_seqno = $seqno) a1 join  acc_ref b1 on  b1.accref_seqno = a1.ref_adjseqno ";

     else 
//	   $sql = "select ref_slno, ref_docseqno, ref_adjseqno,ref_adjvouno,ref_adjvoudate, acctrail_inv_no, acctrail_inv_date, DATE_FORMAT(acctrail_inv_date, '%d-%m-%Y') invdate, ref_paymt_terms, acctrail_inv_value,  acctrail_inv_value - acctrail_adj_value  pendingamt, ref_adjamount, acctrail_amtmode, accref_vouno, accref_vou_type   from acc_adjustments join acc_ref on ref_docseqno = accref_seqno  join acc_trail  on ref_docseqno = acctrail_accref_seqno where ( ref_adjseqno = $seqno  or  ref_docseqno = $seqno  )";


	   $sql = "select a1.*, b1.accref_vouno ,  b1.accref_vou_type , '$voudrcr'  mdrcr from
	   (select ref_slno,ref_docseqno,ref_docno,ref_docdate, ref_adjseqno,ref_adjvouno,ref_adjvoudate, acctrail_inv_no , acctrail_inv_date ,DATE_FORMAT(acctrail_inv_date, '%d-%m-%Y') invdate ,ref_paymt_terms,acctrail_inv_value , acctrail_inv_value - acctrail_adj_value pendingamt,ref_adjamount ,acctrail_amtmode ,acctrail_amtmode adrcr from acc_ref ref left join acc_adjustments adj on ref_compcode = accref_comp_code  and accref_finid = ref_finid   and ref_ledcode = $ledcode  and  (accref_seqno = ref_docseqno or accref_seqno = ref_adjseqno)   join acc_trail on acctrail_accref_seqno = ref_adjseqno and acctrail_led_code = $ledcode   and acctrail_amtmode = '$voutype'  where accref_comp_code = $compcode and accref_finid = $fincode and accref_seqno = $seqno) a1 join  acc_ref b1 on  b1.accref_seqno = a1.ref_adjseqno ";

//	   $sql = "select a1.*, b1.accref_vouno ,  b1.accref_vou_type , '$voudrcr'  mdrcr from
//	   (select ref_slno,ref_docseqno,ref_docno,ref_docdate, ref_adjseqno,ref_adjvouno,ref_adjvoudate, acctrail_inv_no , acctrail_inv_date ,DATE_FORMAT(acctrail_inv_date, '%d-%m-%Y') invdate ,ref_paymt_terms,acctrail_inv_value , acctrail_inv_value - acctrail_adj_value pendingamt,ref_adjamount ,acctrail_amtmode ,acctrail_amtmode adrcr from acc_ref ref left join acc_adjustments adj on ref_compcode = accref_comp_code  and accref_finid = ref_finid and  (accref_seqno = ref_docseqno or accref_seqno = ref_adjseqno)   join acc_trail on (acctrail_accref_seqno = ref_adjseqno OR acctrail_accref_seqno = ref_docseqno )  and acctrail_amtmode = '$voutype'  where accref_comp_code = $compcode and accref_finid = $fincode and accref_seqno = $seqno) a1 join  acc_ref b1 on  b1.accref_seqno = a1.ref_adjseqno ";
	   
*/
    $sql = "select a1.*, b1.accref_vouno ,  b1.accref_vou_type , '$voudrcr'  mdrcr from
    (select ref_slno,ref_docseqno,ref_docno,ref_docdate, ref_adjseqno,ref_adjvouno,ref_adjvoudate, acctrail_inv_no , acctrail_inv_date ,DATE_FORMAT(acctrail_inv_date, '%d-%m-%Y') invdate ,ref_paymt_terms,acctrail_inv_value , acctrail_inv_value - acctrail_adj_value pendingamt,ref_adjamount ,acctrail_amtmode ,ref_adjvoutype_db_cr adrcr from acc_ref ref left join acc_adjustments adj on ref_compcode = accref_comp_code  and accref_finid = ref_finid   and ref_ledcode = $ledcode   and ref_adjvoutype_db_cr = '$voutype'  and  (accref_seqno = ref_docseqno or accref_seqno = ref_adjseqno)   join acc_trail on acctrail_accref_seqno = ref_adjseqno and acctrail_led_code = $ledcode   and acctrail_amtmode = '$voutype'  where accref_comp_code = $compcode and accref_finid = $fincode and accref_seqno = $seqno) a1 join  acc_ref b1 on  b1.accref_seqno = a1.ref_adjseqno ";



//echo $sql;

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
  acctrail_inv_value - acctrail_adj_value balance,  acctrail_amtmode, acctrail_crdays  from acc_ref ref  left join acc_trail trail  on ref.accref_seqno = trail.acctrail_accref_seqno join massal_customer mas   on trail.acctrail_led_code = mas.cust_code  and acctrail_inv_value > acctrail_adj_value and acctrail_led_code = $ledcode  and accref_voudate <= '$rdate' where accref_comp_code= $compcode ";


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
?>
