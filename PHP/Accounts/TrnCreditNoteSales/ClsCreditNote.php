<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadInvDetails';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    global $conn;

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
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    


function getInvDetails()
    {
     global $conn;
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];

	$invno = $_POST['invno'];

	$sql = "select invt_hsncode,var_name,var_size2 as size,Cast(sum(invt_wt)/1000  as Decimal(10,3)) as weight,invt_urate as rate,invt_taxable as taxval,  invh_cgst_per,invh_sgst_per,invh_igst_per,tax_sal_led_code,tax_cgst_ledcode,tax_sgst_ledcode,tax_igst_ledcode from trnsal_invoice_header, trnsal_invoice_trailer , massal_variety  , massal_tax where invh_taxtag = tax_code and invh_comp_code =  invt_compcode and invh_fincode = invt_fincode and invh_seqno = invt_seqno and     invt_var = var_code and  invh_comp_code= $compcode and invh_fincode <= $fincode  and invh_invrefno ='$invno' group by invt_hsncode,var_name,var_size2,invt_wt,invt_urate,invt_taxable, invh_cgst_per,invh_sgst_per, invh_igst_per,tax_sal_led_code,tax_cgst_ledcode,tax_sgst_ledcode,tax_igst_ledcode";

	$sql = "select vargrp_type_name, invt_hsncode,var_name,var_size2 as size,Cast(sum(invt_wt)/1000  as Decimal(10,3)) as weight,invt_urate as rate,invt_taxable as taxval,  invh_cgst_per,invh_sgst_per,invh_igst_per,tax_sal_led_code,tax_cgst_ledcode,tax_sgst_ledcode,tax_igst_ledcode 
from trnsal_invoice_header, trnsal_invoice_trailer , massal_variety  , massal_tax ,  masprd_variety , masprd_type  where invt_item = var_groupcode and  var_typecode = vargrp_type_code  and
invh_taxtag = tax_code and invh_comp_code =  invt_compcode and invh_fincode = invt_fincode and invh_seqno = invt_seqno and     invt_var = var_code and   invh_comp_code= $compcode  and invh_fincode <=  $fincode  and invh_invrefno = '$invno'   group by vargrp_type_name, invt_hsncode,var_name,var_size2,invt_wt,invt_urate,invt_taxable, invh_cgst_per,invh_sgst_per, invh_igst_per,tax_sal_led_code,tax_cgst_ledcode,tax_sgst_ledcode,tax_igst_ledcode";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getCGSTledgers()
 {
        $ledtype = "I";
        global $conn;
        if ($ledtype == "I")
		{
		    $sql = "select * from massal_customer where cust_name like 'CGST'";

		}
		else
		{
		    $sql = "select * from massal_customer where cust_name like '%CGST%LIA%$gstper%'";
		}  
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getSGSTledgers()

    {
        $ledtype = "I";
        global $conn;
        if ($ledtype == "I")
		{
		    $sql = "select * from massal_customer where cust_name like 'SGST'";

		}
		else
		{
		    $sql = "select * from massal_customer where cust_name like '%CGST%LIA%$gstper%'";
		}  
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getIGSTledgers()

    {
        $ledtype = "I";
        global $conn;
        if ($ledtype == "I")
		{
		    $sql = "select * from massal_customer where cust_name like 'IGST@18% COLLECTED%'";

		}
		else
		{
		    $sql = "select * from massal_customer where cust_name like '%CGST%LIA%$gstper%'";
		}  
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getCreditNoteVoucherList()

    {
  	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];      
        global $conn;
        $sql = "select dbcr_vouno ,dbcr_seqno from acc_dbcrnote_header where dbcr_type = 'CNG' and dbcr_finid = '$fincode' and dbcr_comp_code = '$compcode' order by dbcr_date desc, convert(substring(dbcr_vouno,5),signed)  desc";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



 function getCreditNoteVoucherDetail()

    {
  	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
       	$vouno    = $_POST['vouno'];

        global $conn;

//$sql = "select * from acc_dbcrnote_header a , acc_dbcrnote_trailer b , massal_customer where dbcr_seqno = dbcrt_seqno and dbcr_partyledcode = led_code and dbcr_comp_code = '$compcode'  and dbcr_finid = '$fincode' and dbcr_vouno = '$vouno'";

$sql = "select * from acc_dbcrnote_header a , acc_dbcrnote_trailer b , massal_customer c, acc_ref d where dbcr_accseqno = accref_seqno and dbcr_seqno = dbcrt_seqno and dbcr_partycode = cust_code and dbcr_comp_code = '$compcode'  and dbcr_finid = '$fincode' and dbcr_vouno = '$vouno'";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getControlCreditNo() {
    global $conn;
    $ginfinid= $_POST['ginfinid'];
    $gincompcode=$_POST['gincompcode'];
/*
$sql = "select concat('CNG',ifnull(max(dbcr_no),0) + 1) as accref_vouno from acc_dbcrnote_header where dbcr_type = 'CNG' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';";

$sql = "select concat('G-',ifnull(max(dbcr_no),0) + 1) as accref_vouno from acc_dbcrnote_header where dbcr_type = 'CNG' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';";
*/
if ($ginfinid < 24)
$sql = "select concat('CNG',ifnull(max(dbcr_no),0) + 1) as accref_vouno from acc_dbcrnote_header where dbcr_type = 'CNG' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';";
else
$sql = "select ifnull(max(dbcr_no),0) + 1 as accref_vouno from acc_dbcrnote_header where dbcr_type = 'CNG' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';";


    $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getCreditNoteVoucherDetailsTrailer() {
    global $conn;
    $seqno =$_POST['seqno'];

     $sql = "select * from acc_dbcrnote_trailer2 where dbcrt2_seqno = $seqno;";
     $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}



function getCustNameList() {
    global $conn; 
    $compcode=$_POST['gincompany'];
    $finyear=$_POST['ginfinid'];
    $sql = "select led_code, cust_name from massal_customer where led_type = 'C' order by cust_name";
    $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
    }



function getSRCustNameList() {
    global $conn; 
    $compcode=$_POST['gincompcode'];
    $finyear =$_POST['ginfinid'];
    $sql = "select cust_ref,cust_code from trnsal_salret_header , massal_customer where reth_cust = cust_code and  reth_fincode = $finyear and reth_comp_code= $compcode and reth_accupd = 'N' group by cust_ref,cust_code order by cust_ref";
    $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
    }



function getSRInvNoList() {
    global $conn; 
    $compcode=$_POST['gincompcode'];
    $finyear =$_POST['ginfinid'];
    $ledcode =$_POST['ledcode'];

    $sql = "select * from trnsal_salret_header , massal_customer where reth_cust = cust_code and  reth_fincode = $finyear and reth_comp_code= $compcode and reth_accupd = 'N' and reth_cust = $ledcode order by reth_invno";
    $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
    }




function getSRInvNoDetail() {
    global $conn; 
    $compcode=$_POST['gincompcode'];
    $finyear =$_POST['ginfinid'];
    $ledcode =$_POST['ledcode'];
    $invno   =$_POST['invoiceno'];
    $editchk =$_POST['editchk'];

    if ($editchk == 'N')

    $sql = "select * from trnsal_salret_header , massal_customer , trnsal_invoice_header  where reth_cust = cust_code  and  reth_fincode >= invh_fincode and reth_comp_code= invh_comp_code and reth_cust  = invh_party and  reth_fincode = $finyear and reth_comp_code= $compcode and reth_accupd = 'N' and reth_cust = $ledcode  and reth_invno = invh_invrefno and reth_invno = '$invno'";

    else
    $sql = "select * from trnsal_salret_header , massal_customer , trnsal_invoice_header  where reth_cust = cust_code  and  reth_fincode >= invh_fincode and reth_comp_code= invh_comp_code and reth_cust  = invh_party and  reth_fincode = $finyear and reth_comp_code= $compcode and reth_cust = $ledcode  and reth_invno = invh_invrefno and reth_invno = '$invno'";


    $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
    }



 function getCreditLeders()

    {
        $gsttype = $_POST['gsttype'];


        global $conn;
        if ($gsttype == "1")
	    $sql = "select * from massal_customer where cust_name like 'IGST SALE%RETURN%18%";
	else
	    $sql = "select * from massal_customer where cust_name like 'GST SALE%RETURN%18%'";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


function getSRInvNoHSN() {
    global $conn; 
    $compcode=$_POST['gincompcode'];
    $finyear =$_POST['ginfinid'];
    $ledcode =$_POST['ledcode'];
    $invno   =$_POST['invoiceno'];

    $sql = "	select max(rett_hsncode) hsncode from trnsal_salret_header , trnsal_salret_trailer where 
     reth_fincode = $finyear and reth_comp_code= $compcode  and  reth_no = rett_no and  reth_fincode =  rett_fincode  and reth_comp_code= rett_comp_code and reth_invno = '$invno'";

     $r = mysqli_query($conn, $sql);     
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
    }




function getInvSeqno() {
    global $conn; 
    $compcode=$_POST['compcode'];
    $invno   =$_POST['invoiceno'];

    $sql = "select * from trnsal_invoice_header where invh_comp_code = $compcode and invh_invrefno = '$invno'";
    
    $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
    }

 function getPartyList()
    {
        global $conn;


        $ledname = strtoupper($_POST['ledger']);
        $ledname = trim(str_replace(" ", "", $ledname)); 
        $ledname = trim(str_replace(".", "", $ledname)); 
//        $sql = "select * from massal_customer where cust_name like '%$ledname%'";
  //      $sql = "select * from massal_customer where led_type = 'C' and replace(cust_name,' ','') like '%$ledname%' or replace(cust_name,'.','') like '%$ledname%' order by cust_name";
      $sql = "select * from massal_customer where cust_type = 'C' and replace(replace(cust_name,' ','')  ,'.','')  like '%$ledname%' order by cust_name";

  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getEInvStatus()
    {
        global $conn;
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$invno = $_POST['invno'];

        $sql = "select * from AIS_OEIV where invEntry = '$invno' and DocEntry in (select max(DocEntry) from AIS_OEIV where invEntry = '$invno'";

        $sql = "select * from AIS_OEIV where invEntry = '$invno' order by CreateDate desc";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


    
    function getDebitBills() {
        global $conn;
        $finyear=$_POST['ginfinid'];
        $compcode=$_POST['gincompany'];
        $ledgercode=$_POST['ledgercode'];
        $sql = "CALL acc_sp_load_debit_bills('$compcode','$finyear','$ledgercode');";
        $r = mysqli_query($conn, $sql);
        $nrow = mysqli_num_rows($r);
        while ($re = mysqli_fetch_array($r)) {
            $arr[] = $re;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
    }



 function getInvoiceVarity()
    {
        global $conn;
        $invno = $_POST['invno'];
        $compcode = $_POST['compcode'];



        $sql = "select * from trnsal_invoice_header , trnsal_invoice_trailer ,
masprd_variety , masprd_type  where invt_item = var_groupcode and  var_typecode = vargrp_type_code  and
invh_comp_code = invt_compcode and invh_fincode  = invt_fincode and invh_seqno =  invt_seqno and invh_comp_code = $compcode  and invh_invrefno = '$invno' LIMIT 1;";


  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getTCSledgers()

    {
        global $conn;
        $ledtype = "I";

   $sql = "select * from massal_customer where cust_name like 'TCS @0.1% COLLECTED%'";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getFreightledgers()

    {
        global $conn;
        $custtype = $_POST['gsttype'];
        if ($custtype == 1) 
           $sql = "select * from massal_customer where cust_name like 'FREIGHT COLLECTED-IGST%'";
        else
           $sql = "select * from massal_customer where cust_name like 'FREIGHT COLLECTED-GST%'";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);


    }

 function getCNVouType()

    {
  	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
       	$vouno    = $_POST['vouno'];

        global $conn;



$sql = "select count(*) as nos from  acc_dbcrnote_sales_purchase  where cn_compcode = $compcode  and cn_fincode = $fincode  and  cn_vouno = '$vouno'";




    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

?>
