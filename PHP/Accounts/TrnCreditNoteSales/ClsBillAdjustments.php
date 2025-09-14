<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadInvDetails';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysql_query("SET NAMES utf8");

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
    



 function getJournalVoucherList()

    {
  	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];      
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select dbcr_vouno from acc_dbcrnote_header where dbcr_type = 'DNG' and dbcr_finid = '$fincode' and dbcr_comp_code = '$compcode' order by dbcr_no  desc");
       $r=mysql_query("select * from acc_ref where accref_comp_code = '$compcode' and accref_finid = '$fincode' and accref_vou_type = 'GJV' order by substring(ltrim(accref_vouno),4,4) desc");
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

      $qry = "select * from massal_customer where  left(cust_name,2) != 'zz' and  replace(replace(cust_name,' ','')  ,'.','')  like '%$ledname%' order by cust_name";

        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    } 

/*
 function getJournalVoucherDetail()

    {
  	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
       	$vouno    = $_POST['vouno'];

        mysql_query("SET NAMES utf8");
//        $r=mysql_query("select dbcr_vouno from acc_dbcrnote_header where dbcr_type = 'DNG' and dbcr_finid = '$fincode' and dbcr_comp_code = '$compcode' order by dbcr_vouno  desc");

$r=mysql_query("select * from acc_ref ref  join acc_tran tran on  tran.acctran_accref_seqno = ref.accref_seqno   join massal_customer mas on  tran.acctran_led_code = mas.cust_code  where accref_vouno = '$vouno' and  accref_comp_code = $compcode and accref_finid = $fincode");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
*/

 function getVouNoList()
    {
        mysql_query("SET NAMES utf8");

  	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$ledcode  = $_POST['ledcode'];
       	$voutype  = $_POST['voutype'];

        $voutype  =  "'".$voutype. "', 'GJV', 'CNG', 'DNG'";


        $qry = " select accref_seqno, DATE_FORMAT(accref_voudate, '%d-%m-%Y') voudate, accref_voudate ,accref_vouno, acctran_cramt   from acc_ref ref left join acc_tran trn  on ref.accref_seqno = trn.acctran_accref_seqno and accref_vou_type = '$voutype' where accref_comp_code = $compcode  and accref_finid = $fincode and trn.acctran_led_code = $ledcode  order by accref_voudate desc ,accref_vouno desc";

        $qry = "select   accref_seqno, DATE_FORMAT(accref_voudate, '%d-%m-%Y') voudate, accref_voudate ,accref_vouno, acctran_totamt,ref_invno, DATE_FORMAT(ref_invdate, '%d-%m-%Y') ref_invdate, ref_adjamount from  acc_ref ref left join acc_tran trn  on ref.accref_seqno = trn.acctran_accref_seqno and accref_vou_type in ($voutype)  left  join acc_adjustments on accref_comp_code = ref_compcode  and accref_finid = ref_finid and  accref_seqno = ref_docseqno  where accref_comp_code = $compcode and accref_finid =  $fincode and trn.acctran_led_code = $ledcode  and ref_adjamount > 0  order by accref_voudate desc ,ref_invno desc";




        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    } 

 function getVouNoDetail()
    {
        mysql_query("SET NAMES utf8");

  	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$ledcode  = $_POST['ledcode'];
       	$seqno    = $_POST['seqno'];

        $qry = " select accref_seqno, ref_adjseqno, acctrail_inv_no , DATE_FORMAT(acctrail_inv_date, '%d-%m-%Y')  acctrail_inv_date ,acctrail_inv_value , acctrail_inv_value - acctrail_adj_value pendingamt,ref_adjamount from acc_ref ref left join acc_adjustments adj on ref_compcode = accref_comp_code  and accref_finid = ref_finid and  accref_seqno = ref_docseqno join acc_trail on acctrail_accref_seqno = ref_adjseqno   where accref_comp_code = $compcode and accref_finid = $fincode  and accref_seqno = $seqno  ";


        $qry = "select a1.*, b1.accref_vouno ,  b1.accref_vou_type from
(select accref_seqno, ref_adjseqno, acctrail_inv_no , acctrail_inv_date ,DATE_FORMAT(acctrail_inv_date, '%d-%m-%Y') invdate ,ref_paymt_terms,acctrail_inv_value , acctrail_inv_value - acctrail_adj_value pendingamt,ref_adjamount from acc_ref ref left join acc_adjustments adj on ref_compcode = accref_comp_code  and accref_finid = ref_finid and  accref_seqno = ref_docseqno join acc_trail on acctrail_accref_seqno = ref_adjseqno   where accref_comp_code = $compcode and accref_finid = $fincode and accref_seqno = $seqno) a1 join  acc_ref b1 on b1.accref_seqno = a1.ref_adjseqno";


        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    } 


 function getUnAdjustedBills()
    {
        mysql_query("SET NAMES utf8");

  	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$ledcode  = $_POST['ledcode'];
	$rdate     = $_POST['asondate'];

        $qry = "select  accref_seqno,cust_name,acctrail_led_code,accref_vouno, acctrail_inv_no,  acctrail_inv_date,
   DATE_FORMAT(acctrail_inv_date ,'%d-%m-%Y') as  invdate,   acctrail_inv_value, acctrail_adj_value,
  acctrail_inv_value - acctrail_adj_value balance,  acctrail_amtmode, acctrail_crdays , accref_voudate ,   DATE_FORMAT(accref_voudate ,'%d-%m-%Y') as voudate   from acc_ref ref  left join acc_trail trail  on ref.accref_seqno = trail.acctrail_accref_seqno join massal_customer mas   on trail.acctrail_led_code = mas.cust_code  and acctrail_inv_value > acctrail_adj_value and acctrail_led_code = $ledcode  and accref_voudate <= '$rdate' where accref_comp_code= $compcode ";

        $qry = "select accref_seqno,accref_vou_type, cust_name, acctrail_led_code, accref_vouno, acctrail_inv_no, acctrail_inv_date, invdate, acctrail_inv_value, acctrail_adj_value, balance, acctrail_amtmode, acctrail_crdays, accref_voudate, voudate, case when invwt is null then 0 else invwt end as invqty  from (select  accref_seqno,accref_vou_type, cust_name,acctrail_led_code,accref_vouno, acctrail_inv_no,  acctrail_inv_date,   DATE_FORMAT(acctrail_inv_date ,'%d-%m-%Y') as  invdate,   acctrail_inv_value, acctrail_adj_value,  acctrail_inv_value - acctrail_adj_value balance,  acctrail_amtmode, acctrail_crdays , accref_voudate ,     DATE_FORMAT(accref_voudate ,'%d-%m-%Y') as voudate ,    Cast(invh_totwt/1000 as decimal(18,3)) as invwt   from acc_ref ref  left join acc_trail trail  on   ref.accref_seqno = trail.acctrail_accref_seqno join massal_customer mas   on trail.acctrail_led_code = mas.cust_code    and acctrail_inv_value > acctrail_adj_value and acctrail_led_code = $ledcode  and accref_voudate <= '$rdate'  left join trnsal_invoice_header on accref_vouno = invh_invrefno and accref_comp_code = invh_comp_code  where   accref_comp_code= $compcode   )a1 where accref_vou_type in ('GSI','PWP') order by acctrail_inv_date,acctrail_inv_no";

        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    } 

 function getVouTypeList()
 {
        $qry = "select accref_vou_type from acc_ref  where length(accref_vou_type) = 3  group by accref_vou_type  order by accref_vou_type  asc";


        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';

 }


 function getCreditNotelist()
    {
        mysql_query("SET NAMES utf8");

  	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$ledcode  = $_POST['ledcode'];
	$fromdate = $_POST['fromdate'];
	$todate   = $_POST['todate'];


        $qry = "call spacc_rep_WPAdjust_CreditNote_List($compcode ,$fincode , '$fromdate' ,'$todate',$ledcode)";


        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    } 



 function getCreditNote_Adjusted()
    {
        mysql_query("SET NAMES utf8");

  	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$ledcode  = $_POST['ledcode'];
	$vouno    = $_POST['vouno'];



        $qry = "
select ref_docno , ref_docdate , DATE_FORMAT(ref_docdate, '%d-%m-%Y') as invdate , ref_adjvouno ,accref_voudate,
DATE_FORMAT(accref_voudate, '%d-%m-%Y') as voudate ,
 ref_invno , ref_invdate ,  DATE_FORMAT(ref_invdate, '%d-%m-%Y') as refinvdate ,
 ref_adjamount from acc_dbcrnote_header join massal_customer on dbcr_partycode = cust_code 
left join  acc_dbcrnote_trailer_Credit_Note_Adjustments on  dbcr_seqno =  dbcn_seqno
left join  acc_adjustments on dbcn_adj_seqno = ref_slno left join  acc_ref on accref_seqno = ref_adjseqno where   dbcr_type = 'CNG' and dbcr_finid = $fincode and dbcr_comp_code = $compcode and dbcr_partycode = $ledcode and dbcr_vouno = '$vouno'";


        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    } 





 function getCreditNote_InvDetails()
    {
        mysql_query("SET NAMES utf8");

  	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$ledcode  = $_POST['ledcode'];
	$vouno    = $_POST['vouno'];



        $qry = "select cn_invno , cn_invdate ,  DATE_FORMAT(cn_invdate, '%d-%m-%Y') as invdate , cn_qty ,cn_invamt,cn_pendingamt,cn_adjusted,cn_balance,cd_value,cd_cgst,cd_sgst,cd_round,cd_amount from  acc_dbcrnote_sales_purchase where cn_compcode = $compcode and cn_fincode = $fincode and cn_vouno = '$vouno'";


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
