<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadInvDetails';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysql_query("SET NAMES utf8");

    switch($task){

    case "ControlCreditNo":
        getControlCreditNo();
        break;

		case "loadInvDetails":
		getInvDetails();
		break;
		case "loadCNNoDetails":
		getCNNoDetails();
		break;
		case "loadCGSTledgers":
		getCGSTledgers();
		break;
		case "loadSGSTledgers":
		getSGSTledgers();
		break;
		case "loadIGSTledgers":
		getIGSTledgers();
		break;
		case "LoadCreditNoteVoucherList":
		getCreditNoteVoucherList();
		break;
		case "LoadCreditNoteVoucherDetails":
		getCreditNoteVoucherDetail();
		break;
		case "LoadCreditNoteVoucherDetailsTrailer":
		getCreditNoteVoucherDetailsTrailer();
		break;
		case "loadCustNameList":
		getCustNameList();
		break;

		case "loadSRCustNameList":
		getSRCustNameList();
		break;

		case "loadSRInvNoList":
		getSRInvNoList();
		break;

		case "loadSRInvNoDetail":
		getSRInvNoDetail();
		break;

		case "loadCreditLeders":
		getCreditLeders();
		break;

		case "loadSRInvNoHSN":
		getSRInvNoHSN();
		break;


		case "loadInvSeqno":
		getInvSeqno();
		break;
             	case "loadPartyList":
		getPartyList();
		break;

		case "loadEInvStatus":
		getEInvStatus();
		break;

		case "loadDebitBills":
		getDebitBills();
		break;

		case "loadInvoiceVarity":
		getInvoiceVarity();
		break;


		case "loadTCSledgers":
		getTCSledgers();
		break;

		case "loadFreightLeders":
		getFreightledgers();
		break;


		case "loadCNVouType":
		getCNVouType();
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
    


function getInvDetails()
    {
     mysql_query("SET NAMES utf8");
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];

	$invno = $_POST['invno'];

	$r=mysql_query("select invt_hsncode,var_name,var_size2 as size,Cast(sum(invt_wt)/1000  as Decimal(10,3)) as weight,invt_urate as rate,invt_taxable as taxval,  invh_cgst_per,invh_sgst_per,invh_igst_per,tax_sal_led_code,tax_cgst_ledcode,tax_sgst_ledcode,tax_igst_ledcode from trnsal_invoice_header, trnsal_invoice_trailer , massal_variety  , massal_tax where invh_taxtag = tax_code and invh_comp_code =  invt_compcode and invh_fincode = invt_fincode and invh_seqno = invt_seqno and     invt_var = var_code and  invh_comp_code= $compcode and invh_fincode <= $fincode  and invh_invrefno ='$invno' group by invt_hsncode,var_name,var_size2,invt_wt,invt_urate,invt_taxable, invh_cgst_per,invh_sgst_per, invh_igst_per,tax_sal_led_code,tax_cgst_ledcode,tax_sgst_ledcode,tax_igst_ledcode");

	$r=mysql_query("select vargrp_type_name, invt_hsncode,var_name,var_size2 as size,Cast(sum(invt_wt)/1000  as Decimal(10,3)) as weight,invt_urate as rate,invt_taxable as taxval,  invh_cgst_per,invh_sgst_per,invh_igst_per,tax_sal_led_code,tax_cgst_ledcode,tax_sgst_ledcode,tax_igst_ledcode 
from trnsal_invoice_header, trnsal_invoice_trailer , massal_variety  , massal_tax ,  masprd_variety , masprd_type  where invt_item = var_groupcode and  var_typecode = vargrp_type_code  and
invh_taxtag = tax_code and invh_comp_code =  invt_compcode and invh_fincode = invt_fincode and invh_seqno = invt_seqno and     invt_var = var_code and   invh_comp_code= $compcode  and invh_fincode <=  $fincode  and invh_invrefno = '$invno'   group by vargrp_type_name, invt_hsncode,var_name,var_size2,invt_wt,invt_urate,invt_taxable, invh_cgst_per,invh_sgst_per, invh_igst_per,tax_sal_led_code,tax_cgst_ledcode,tax_sgst_ledcode,tax_igst_ledcode");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getCGSTledgers()
 {
        $ledtype = "I";
        mysql_query("SET NAMES utf8");
        if ($ledtype == "I")
		{
		    $r=mysql_query("select * from massal_customer where cust_name like 'CGST'");

		}
		else
		{
		    $r=mysql_query("select * from massal_customer where cust_name like '%CGST%LIA%$gstper%'");
		}  
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getSGSTledgers()

    {
        $ledtype = "I";
        mysql_query("SET NAMES utf8");
        if ($ledtype == "I")
		{
		    $r=mysql_query("select * from massal_customer where cust_name like 'SGST'");

		}
		else
		{
		    $r=mysql_query("select * from massal_customer where cust_name like '%CGST%LIA%$gstper%'");
		}  
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getIGSTledgers()

    {
        $ledtype = "I";
        mysql_query("SET NAMES utf8");
        if ($ledtype == "I")
		{
		    $r=mysql_query("select * from massal_customer where cust_name like 'IGST@12% COLLECTED%'");

		}
		else
		{
		    $r=mysql_query("select * from massal_customer where cust_name like '%CGST%LIA%$gstper%'");
		}  
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getCreditNoteVoucherList()

    {
  	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];      
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select dbcr_vouno ,dbcr_seqno from acc_dbcrnote_header where dbcr_type = 'CNG' and dbcr_finid = '$fincode' and dbcr_comp_code = '$compcode' order by dbcr_date desc, convert(substring(dbcr_vouno,5),signed)  desc");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getCreditNoteVoucherDetail()

    {
  	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
       	$vouno    = $_POST['vouno'];

        mysql_query("SET NAMES utf8");

//$r=mysql_query("select * from acc_dbcrnote_header a , acc_dbcrnote_trailer b , massal_customer where dbcr_seqno = dbcrt_seqno and dbcr_partyledcode = led_code and dbcr_comp_code = '$compcode'  and dbcr_finid = '$fincode' and dbcr_vouno = '$vouno'");

$r=mysql_query("select * from acc_dbcrnote_header a , acc_dbcrnote_trailer b , massal_customer c, acc_ref d where dbcr_accseqno = accref_seqno and dbcr_seqno = dbcrt_seqno and dbcr_partycode = cust_code and dbcr_comp_code = '$compcode'  and dbcr_finid = '$fincode' and dbcr_vouno = '$vouno'");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getControlCreditNo() {
    $ginfinid= $_POST['ginfinid'];
    $gincompcode=$_POST['gincompcode'];
/*
$r = mysql_query("select concat('CNG',ifnull(max(dbcr_no),0) + 1) as accref_vouno from acc_dbcrnote_header where dbcr_type = 'CNG' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");

$r = mysql_query("select concat('G-',ifnull(max(dbcr_no),0) + 1) as accref_vouno from acc_dbcrnote_header where dbcr_type = 'CNG' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");
*/
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

function getCreditNoteVoucherDetailsTrailer() {
    $seqno =$_POST['seqno'];

     $r = mysql_query("select * from acc_dbcrnote_trailer2 where dbcrt2_seqno = $seqno;");

    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}



function getCustNameList() {
    mysql_query("SET NAMES utf8"); 
    $compcode=$_POST['gincompany'];
    $finyear=$_POST['ginfinid'];
    $r = mysql_query("select led_code, cust_name from massal_customer where led_type = 'C' order by cust_name");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
    }



function getSRCustNameList() {
    mysql_query("SET NAMES utf8"); 
    $compcode=$_POST['gincompcode'];
    $finyear =$_POST['ginfinid'];
    $r = mysql_query("select cust_ref,cust_code from trnsal_salret_header , massal_customer where reth_cust = cust_code and  reth_fincode = $finyear and reth_comp_code= $compcode and reth_accupd = 'N' group by cust_ref,cust_code order by cust_ref");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
    }



function getSRInvNoList() {
    mysql_query("SET NAMES utf8"); 
    $compcode=$_POST['gincompcode'];
    $finyear =$_POST['ginfinid'];
    $ledcode =$_POST['ledcode'];

    $r = mysql_query("select * from trnsal_salret_header , massal_customer where reth_cust = cust_code and  reth_fincode = $finyear and reth_comp_code= $compcode and reth_accupd = 'N' and reth_cust = $ledcode order by reth_invno");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
    }




function getSRInvNoDetail() {
    mysql_query("SET NAMES utf8"); 
    $compcode=$_POST['gincompcode'];
    $finyear =$_POST['ginfinid'];
    $ledcode =$_POST['ledcode'];
    $invno   =$_POST['invoiceno'];
    $editchk =$_POST['editchk'];

    if ($editchk == 'N')

    $r = mysql_query("select * from trnsal_salret_header , massal_customer , trnsal_invoice_header  where reth_cust = cust_code  and  reth_fincode >= invh_fincode and reth_comp_code= invh_comp_code and reth_cust  = invh_party and  reth_fincode = $finyear and reth_comp_code= $compcode and reth_accupd = 'N' and reth_cust = $ledcode  and reth_invno = invh_invrefno and reth_invno = '$invno'");

    else
    $r = mysql_query("select * from trnsal_salret_header , massal_customer , trnsal_invoice_header  where reth_cust = cust_code  and  reth_fincode >= invh_fincode and reth_comp_code= invh_comp_code and reth_cust  = invh_party and  reth_fincode = $finyear and reth_comp_code= $compcode and reth_cust = $ledcode  and reth_invno = invh_invrefno and reth_invno = '$invno'");



    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
    }



 function getCreditLeders()

    {
        $gsttype = $_POST['gsttype'];


        mysql_query("SET NAMES utf8");
        if ($gsttype == "1")
	    $r=mysql_query("select * from massal_customer where cust_name like 'IGST SALE%RETURN%'");
	else
	    $r=mysql_query("select * from massal_customer where cust_name like 'GST SALE%RETURN%'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


function getSRInvNoHSN() {
    mysql_query("SET NAMES utf8"); 
    $compcode=$_POST['gincompcode'];
    $finyear =$_POST['ginfinid'];
    $ledcode =$_POST['ledcode'];
    $invno   =$_POST['invoiceno'];

    $r = mysql_query("	select max(rett_hsncode) hsncode from trnsal_salret_header , trnsal_salret_trailer where 
     reth_fincode = $finyear and reth_comp_code= $compcode  and  reth_no = rett_no and  reth_fincode =  rett_fincode  and reth_comp_code= rett_comp_code and reth_invno = '$invno'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
    }




function getInvSeqno() {
    mysql_query("SET NAMES utf8"); 
    $compcode=$_POST['compcode'];
    $invno   =$_POST['invoiceno'];

    $r = mysql_query("select * from trnsal_invoice_header where invh_comp_code = $compcode and invh_invrefno = '$invno'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
    }

 function getPartyList()
    {
        mysql_query("SET NAMES utf8");


        $ledname = strtoupper($_POST['ledger']);
        $ledname = trim(str_replace(" ", "", $ledname)); 
        $ledname = trim(str_replace(".", "", $ledname)); 
//        $qry = "select * from massal_customer where cust_name like '%$ledname%'";
  //      $qry = "select * from massal_customer where led_type = 'C' and replace(cust_name,' ','') like '%$ledname%' or replace(cust_name,'.','') like '%$ledname%' order by cust_name";
      $qry = "select * from massal_customer where cust_type = 'C' and replace(replace(cust_name,' ','')  ,'.','')  like '%$ledname%' order by cust_name";


        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getEInvStatus()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$invno = $_POST['invno'];

        $r=mysql_query("select * from AIS_OEIV where invEntry = '$invno' and DocEntry in (select max(DocEntry) from AIS_OEIV where invEntry = '$invno'");

        $r=mysql_query("select * from AIS_OEIV where invEntry = '$invno' order by CreateDate desc");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


    
    function getDebitBills() {
        $finyear=$_POST['ginfinid'];
        $compcode=$_POST['gincompany'];
        $ledgercode=$_POST['ledgercode'];
        $r = mysql_query("CALL acc_sp_load_debit_bills('$compcode','$finyear','$ledgercode');");
        $nrow = mysql_num_rows($r);
        while ($re = mysql_fetch_array($r)) {
            $arr[] = $re;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
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


 function getTCSledgers()

    {
        $ledtype = "I";

   $r=mysql_query("select * from massal_customer where cust_name like 'TCS @0.1% COLLECTED%'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getFreightledgers()

    {
        $custtype = $_POST['gsttype'];




        if ($custtype == 1) 
           $r=mysql_query("select * from massal_customer where cust_name like 'FREIGHT COLLECTED-IGST%'");
        else
           $r=mysql_query("select * from massal_customer where cust_name like 'FREIGHT COLLECTED-GST%'");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';


    }

 function getCNVouType()

    {
  	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
       	$vouno    = $_POST['vouno'];

        mysql_query("SET NAMES utf8");



$r=mysql_query("select count(*) as nos from  acc_dbcrnote_sales_purchase  where cn_compcode = $compcode  and cn_fincode = $fincode  and  cn_vouno = '$vouno'");




	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

?>
