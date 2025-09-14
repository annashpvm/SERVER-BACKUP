<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='LoadBRVoucherDetails';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){


	case "LoadBRVoucherDetails":
		getBRVoucherDetail();
            break;
	case "LoadBillAdjustmentDetails":
		getBillAdjustmentDetails();
            break;
	case "loadSearchLedgerlist":
		getSearchLedgerlist();
		break;
	case "loadLedgerlist":
		getLedgerlist();
		break;
	case "LoadInvGSTDetails":
		getInvGSTDetails();
		break;

        case "ControlCreditNo":
              getControlCreditNo();
              break;

		case "LoadCreditNoteVoucherDetails":
		getCreditNoteVoucherDetail();
		break;


		case "LoadCreditNoteAmountDetails":
		getCreditNoteAmountDetail();
		break;


		case "LoadCreditNoteAmountDetails":
		getCreditNoteAmountDetail();
		break;

		case "load_Addnl_CD_Days":
		get_Addnl_CD_Days();
		break;


		case "loadInvoiceCashDiscountDetails":
		getInvoiceCashDiscountDetails();
		break;

		case "loadInvoiceVarity":
		getInvoiceVarity();
		break;

		case "check_e_credit_note_status":
		get_e_credit_note_status();
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

 function getBRVoucherDetail()

    {
  	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
       	$vouno    = $_POST['vouno'];

        mysql_query("SET NAMES utf8");

$r=mysql_query("select * from acc_ref ref  join acc_tran tran on  tran.acctran_accref_seqno = ref.accref_seqno   join massal_customer mas on  tran.acctran_led_code = mas.cust_code  where  accref_vouno = '$vouno' and  accref_comp_code = $compcode and accref_finid = $fincode");

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

        $ledgertype = strtoupper($_POST['ledgertype']);

        $ledname = strtoupper($_POST['ledger']);
        $ledname = trim(str_replace(" ", "", $ledname)); 
        $ledname = trim(str_replace(".", "", $ledname)); 

      if ($ledgertype == 'C')

      $qry = "select * from massal_customer where left(cust_name,2) != 'zz' and  cust_type = 'C' and replace(replace(cust_name,' ','')  ,'.','')  like '%$ledname%' order by cust_name";
      else
      $qry = "select * from massal_customer where left(cust_name,2) != 'zz' and replace(replace(cust_name,' ','')  ,'.','')  like '%$ledname%' order by cust_name";


        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    } 


 function getBillAdjustmentDetails()
    {
        mysql_query("SET NAMES utf8");
        $seqno = $_POST['seqno'];
        $crnoteseqno = $_POST['crnoteseqno'];
        $compcode = $_POST['compcode'];


/*
        $qry = "select * from 
(select * from acc_adjustments , acc_trail  where ref_adjseqno = acctrail_accref_seqno and  ref_docseqno = $seqno) a
left outer join          
(
select invh_acc_refno,cast(invh_totwt/1000 as decimal(8,3)) invwt,invh_crd_days,invh_grace_days,
ordh_payterm_30days_cdamt rate_payterm_30days_cdamt , ordh_payterm_60days_cdamt1 rate_payterm_60days_cdamt1 , ordh_payterm_60days_cdamt2 rate_payterm_60days_cdamt2 , 0 rate_cashdisc_per ,
invh_taxableamt ,invh_cgst_per,invh_sgst_per,invh_igst_per,invh_frt_amt , ordh_ratediff from trnsal_invoice_header , trnsal_order_header  
where left(invh_our_ordno,6) = ordh_sono and invh_comp_code = $compcode and invh_comp_code =ordh_comp_code 
) b on b.invh_acc_refno  = a.ref_adjseqno 
left outer join  
(
select dbcr_comp_code,dbcrt_inv_no,sum(dbcrt_taxable) dbcrt_taxable,
sum(dbcrt_igstvalue) dbcrt_igstvalue,
sum(dbcrt_cgstvalue) dbcrt_cgstvalue,
sum(dbcrt_sgstvalue) dbcrt_sgstvalue,
sum(dbcrt_value) dbcrt_value,
max(dbcrt_igstper) dbcrt_igstper,
max(dbcrt_cgstper) dbcrt_cgstper,
max(dbcrt_sgstper) dbcrt_sgstper,
max(dbcrt_igstledcode) dbcrt_igstledcode,
max(dbcrt_cgstledcode) dbcrt_cgstledcode,
max(dbcrt_sgstledcode) dbcrt_sgstledcode
from acc_dbcrnote_header , acc_dbcrnote_trailer_invoice   where  dbcr_seqno = dbcrt_seqno and dbcr_comp_code =  $compcode  AND dbcr_accseqno = $crnoteseqno group by dbcr_comp_code,dbcrt_inv_no) c on  dbcrt_inv_no = ref_invno;";

*/

        $qry = "select * from 
(select * from acc_adjustments , acc_trail  where ref_adjseqno = acctrail_accref_seqno and  ref_docseqno = $seqno) a
left outer join          
(
select invh_acc_refno,cast(invh_totwt/1000 as decimal(8,3)) invwt,invh_crd_days,invh_grace_days,
ordh_payterm_30days_7days_receipt, ordh_payterm_45days_7days_receipt, ordh_payterm_45days_30days_receipt, ordh_payterm_60days_7days_receipt, ordh_payterm_60days_30days_receipt, ordh_payterm_60days_45days_receipt, ordh_payterm_90days_7days_receipt, ordh_payterm_90days_30days_receipt, ordh_payterm_90days_45days_receipt, ordh_payterm_90days_60days_receipt, ordh_payterm_90days_75days_receipt, 0 rate_cashdisc_per ,
invh_taxableamt ,invh_cgst_per,invh_sgst_per,invh_igst_per,invh_frt_amt , ordh_ratediff from trnsal_invoice_header , trnsal_order_header  
where left(invh_our_ordno,6) = ordh_sono and invh_comp_code = $compcode and invh_comp_code =ordh_comp_code 
) b on b.invh_acc_refno  = a.ref_adjseqno 
left outer join  
(
select dbcr_comp_code,dbcrt_inv_no,sum(dbcrt_taxable) dbcrt_taxable,
sum(dbcrt_igstvalue) dbcrt_igstvalue,
sum(dbcrt_cgstvalue) dbcrt_cgstvalue,
sum(dbcrt_sgstvalue) dbcrt_sgstvalue,
sum(dbcrt_value) dbcrt_value,
max(dbcrt_igstper) dbcrt_igstper,
max(dbcrt_cgstper) dbcrt_cgstper,
max(dbcrt_sgstper) dbcrt_sgstper,
max(dbcrt_igstledcode) dbcrt_igstledcode,
max(dbcrt_cgstledcode) dbcrt_cgstledcode,
max(dbcrt_sgstledcode) dbcrt_sgstledcode
from acc_dbcrnote_header , acc_dbcrnote_trailer_invoice   where  dbcr_seqno = dbcrt_seqno and dbcr_comp_code =  $compcode  AND dbcr_accseqno = $crnoteseqno group by dbcr_comp_code,dbcrt_inv_no) c on  dbcrt_inv_no = ref_invno;";

//echo $qry;

        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    } 





 function getInvGSTDetails()
    {
        mysql_query("SET NAMES utf8");
        $seqno = $_POST['seqno'];

        $qry = "select * from (
select * from (select acctran_accref_seqno,cust_acc_group,acctran_led_code,cust_name from acc_tran , massal_customer where acctran_led_code = cust_code and cust_acc_group in (44,72) and  acctran_accref_seqno = $seqno)  a1
left  outer join  
(select invh_acc_refno,max(invt_hsncode) hsncode   from trnsal_invoice_header , trnsal_invoice_trailer where invh_seqno = invt_seqno and   invh_acc_refno = $seqno group by invh_acc_refno) b1
 on b1.invh_acc_refno  = a1.acctran_accref_seqno ) a    ";


        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    } 

  

 function getLedgerlist()
    {
        mysql_query("SET NAMES utf8");


        $qry = "select * from massal_customer order by  cust_name";
        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


function getControlCreditNo() {
    $ginfinid= $_POST['finyear'];
    $gincompcode=$_POST['compcode'];

if ($ginfinid < 24)
$r = mysql_query("select concat('CNG',ifnull(max(dbcr_no),0) + 1) as accref_vouno from acc_dbcrnote_header where dbcr_type = 'CNG' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");
else
$r = mysql_query("select ifnull(max(dbcr_no),0) + 1 as accref_vouno from acc_dbcrnote_header where dbcr_type = 'CNG' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");

    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}


 function getCreditNoteVoucherDetail()

    {
  	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
       	$cnseqno  = $_POST['cnseqno'];

        mysql_query("SET NAMES utf8");
//        $r=mysql_query("select dbcr_vouno from acc_dbcrnote_header where dbcr_type = 'DNG' and dbcr_finid = '$fincode' and dbcr_comp_code = '$compcode' order by dbcr_vouno  desc");

$r=mysql_query("select * from acc_ref ref  join acc_tran tran on  tran.acctran_accref_seqno = ref.accref_seqno   join massal_customer mas on  tran.acctran_led_code = mas.cust_code  where  accref_seqno = '$cnseqno' and  accref_comp_code = $compcode and accref_finid = $fincode order by acctran_serialno");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 
 function getCreditNoteAmountDetail()

    {
  	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
       	$cnseqno  = $_POST['cnseqno'];

        mysql_query("SET NAMES utf8");
//        $r=mysql_query("select dbcr_vouno from acc_dbcrnote_header where dbcr_type = 'DNG' and dbcr_finid = '$fincode' and dbcr_comp_code = '$compcode' order by dbcr_vouno  desc");

$r=mysql_query("select * from acc_dbcrnote_header , acc_dbcrnote_trailer   where  dbcr_seqno = dbcrt_seqno and dbcr_comp_code = $compcode and dbcr_finid = $fincode and dbcr_accseqno = $cnseqno");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function get_Addnl_CD_Days()

    {
  	$custcode  = $_POST['custcode'];

        mysql_query("SET NAMES utf8");


        $r=mysql_query("select * from massal_customer where cust_code = $custcode");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getInvoiceCashDiscountDetails()
    {
        mysql_query("SET NAMES utf8");
        $seqno = $_POST['seqno'];
        $crnoteseqno = $_POST['crnoteseqno'];
        $compcode = $_POST['compcode'];



        $qry = "select dbcr_comp_code,dbcrt_inv_no,sum(dbcrt_taxable) dbcrt_taxable,
sum(dbcrt_igstvalue) dbcrt_igstvalue,
sum(dbcrt_cgstvalue) dbcrt_cgstvalue,
sum(dbcrt_sgstvalue) dbcrt_sgstvalue,
sum(dbcrt_value) dbcrt_value,
max(dbcrt_igstper) dbcrt_igstper,
max(dbcrt_cgstper) dbcrt_cgstper,
max(dbcrt_sgstper) dbcrt_sgstper,
max(dbcrt_igstledcode) dbcrt_igstledcode,
max(dbcrt_cgstledcode) dbcrt_cgstledcode,
max(dbcrt_sgstledcode) dbcrt_sgstledcode
from acc_dbcrnote_header , acc_dbcrnote_trailer_invoice   where  dbcr_seqno = dbcrt_seqno and dbcr_comp_code =  $compcode  AND dbcr_accseqno = $crnoteseqno group by dbcr_comp_code,dbcrt_inv_no;";


        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    } 


 function getInvoiceVarity()
    {
        mysql_query("SET NAMES utf8");
        $invno = $_POST['invno'];
        $compcode = $_POST['compcode'];



        $qry = "select * from trnsal_invoice_header , trnsal_invoice_trailer ,
masprd_variety , masprd_type  where invt_item = var_groupcode and  var_typecode = vargrp_type_code  and
invh_comp_code = invt_compcode and invh_fincode  = invt_fincode and invh_seqno =  invt_seqno and invh_comp_code = $compcode  and invh_invrefno = '$invno' LIMIT 1;";


        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function get_e_credit_note_status()
    {
        mysql_query("SET NAMES utf8");
        $cnseqno = $_POST['cnseqno'];
        $compcode    = $_POST['compcode'];
        $fincode     = $_POST['fincode'];


        $qry = "select * from acc_dbcrnote_header where dbcr_comp_code = $compcode and  dbcr_finid = $fincode  and dbcr_accseqno = $cnseqno";


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
