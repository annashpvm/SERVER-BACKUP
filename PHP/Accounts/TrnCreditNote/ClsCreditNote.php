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
                case "ControlCreditNo2":
                getControlCreditNo2();
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
		case "findGSTType":
		getGSTType();
		break;

		case "loadAllledgers":
		getAllledgers();
		break;

		case "loadHSNList":
		getHSNList();
		break;
             	case "loadSearchLedgerlist":
		getSearchLedgerlist();
		break;
             	case "loadPartyList":
		getPartyList();
		break;

		case "loadEInvStatus":
		getEInvStatus();
		break;
		case "loadVarMainGroup":
		getVarMainGroup();
		break;

		case "LoadCreditNoteVoucherSLNO":
		getCreditNoteVoucherSLNO();
		break;
		case "loadTCSledgers":
		getTCSledgers();
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

	$r=mysql_query("select var_name,var_size2 as size,Cast(sum(invt_wt)/1000  as Decimal(10,3)) as weight,invt_urate as rate,invt_taxable as taxval,  invh_cgst_per,invh_sgst_per,invh_igst_per,tax_sal_led_code,tax_cgst_ledcode,tax_sgst_ledcode,tax_igst_ledcode from trnsal_invoice_header, trnsal_invoice_trailer , massal_variety  , massal_tax where invh_taxtag = tax_code and invh_comp_code =  invt_compcode and invh_fincode = invt_fincode and invh_seqno = invt_seqno and     invt_var = var_code and  invh_comp_code= $compcode and invh_fincode = $fincode  and invh_invrefno ='$invno'group by var_name,var_size2,invt_wt,invt_urate,invt_taxable, invh_cgst_per,invh_sgst_per, invh_igst_per,tax_sal_led_code,tax_cgst_ledcode,tax_sgst_ledcode,tax_igst_ledcode");


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
        $ledtype = $_POST['ledtype'];
        $gsttype = $_POST['gsttype'];
        $gstper  = $_POST['gstper'];

        mysql_query("SET NAMES utf8");
        if ($gsttype == "I")
		{
		    $r=mysql_query("select * from massal_customer where cust_name like '%INPUT%CGST%$gstper%'");

		}
		else
		{
		    $r=mysql_query("select * from massal_customer where cust_name like 'CGST'");
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
        $ledtype = $_POST['ledtype'];
        $gsttype = $_POST['gsttype'];
        $gstper  = $_POST['gstper'];

        mysql_query("SET NAMES utf8");
        if ($gsttype == "I")
		{
		    $r=mysql_query("select * from massal_customer where cust_name like '%INPUT%SGST%$gstper%'");

		}
		else
		{
		    $r=mysql_query("select * from massal_customer where cust_name like 'SGST'");
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
        $ledtype = $_POST['ledtype'];
        $gsttype = $_POST['gsttype'];
        $gstper  = $_POST['gstper'];

        mysql_query("SET NAMES utf8");
        if ($gsttype == "I")
		{
		    $r=mysql_query("select * from massal_customer where cust_name like '%INPUT%IGST%$gstper%'");

		}
		else
		{
		    $r=mysql_query("select * from massal_customer where cust_name like 'IGST%$gstper%'");
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
  	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode']; 
	$voutype  = $_POST['voutype']; 

     
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select dbcr_vouno from acc_dbcrnote_header where dbcr_type = '$voutype' and dbcr_finid = '$fincode' and dbcr_comp_code = '$compcode' order by dbcr_date desc,dbcr_no desc");
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


$r=mysql_query("select * from acc_dbcrnote_header a , acc_dbcrnote_trailer b , massal_customer c, acc_ref d where dbcr_accseqno = accref_seqno and dbcr_seqno = dbcrt_seqno and dbcr_partyledcode = cust_code and dbcr_comp_code = '$compcode'  and dbcr_finid = '$fincode' and dbcr_vouno = '$vouno'");




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
$r = mysql_query("select concat('CNG',ifnull(max(dbcr_no),0) + 1) as accref_vouno from acc_dbcrnote_header where dbcr_type = 'CNG' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");

$r = mysql_query("select concat('G-',ifnull(max(dbcr_no),0) + 1) as accref_vouno from acc_dbcrnote_header where dbcr_type = 'CNG' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");


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


function getControlCreditNo2() {
    $ginfinid= $_POST['ginfinid'];
    $gincompcode=$_POST['gincompcode'];
$r = mysql_query("select concat('CNN',ifnull(max(dbcr_no),0) + 1) as accref_vouno from acc_dbcrnote_header where dbcr_type = 'CNN' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");
$r = mysql_query("select concat('CNN',ifnull(max(dbcr_no),0) + 1) as accref_vouno from acc_dbcrnote_header where dbcr_type = 'CNN' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");

if ($ginfinid < 24)
$r = mysql_query("select concat('CNN',ifnull(max(dbcr_no),0) + 1) as accref_vouno from acc_dbcrnote_header where dbcr_type = 'CNN' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");
else
$r = mysql_query("select ifnull(max(dbcr_no),0) + 1 as accref_vouno from acc_dbcrnote_header where dbcr_type = 'CNN' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}


 function getGSTType()

    {
  	$ledtype = $_POST['ledtype'];
	$ledcode = $_POST['ledcode'];


        mysql_query("SET NAMES utf8");

/*
$r=mysql_query("select * from (
select cust_type,led_code,led_custcode ,cust_state as statecode from massal_customer , massal_customer where cust_type = 'C' and led_custcode = cust_code
union all
select cust_type,led_code,led_custcode ,sup_state as statecode from massal_customer , maspur_supplier_master where cust_type = 'S' and led_custcode = sup_code
) a1 where a1.cust_type = '$ledtype' and led_custcode = '$ledcode'");
*/

$r=mysql_query("select cust_type,cust_code,cust_state as statecode from  massal_customer where cust_type != 'G'"); 
$r=mysql_query("select cust_type,cust_code,cust_state as statecode from  massal_customer where cust_code =  $ledcode"); 

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getAllledgers()

    {

        mysql_query("SET NAMES utf8");
        $r=mysql_query("select * from massal_customer where cust_type = 'G'");
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getHSNList()

    {

        mysql_query("SET NAMES utf8");
        $r=mysql_query("select vargrp_type_hsncode from masprd_type group by vargrp_type_hsncode");
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
//        $qry = "select * from massal_customer where cust_name like '%$ledname%'";
 //       $qry = "select * from massal_customer where  replace(cust_name,' ','') like '%$ledname%' or replace(cust_name,'.','') like '%$ledname%' ";
      $qry = "select * from massal_customer where left(cust_name,2) != 'zz' and  replace(replace(cust_name,' ','')  ,'.','')  like '%$ledname%' order by cust_name";

        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getPartyList()
    {
        mysql_query("SET NAMES utf8");


        $ledname = strtoupper($_POST['ledger']);
        $ledname = trim(str_replace(" ", "", $ledname)); 
        $ledname = trim(str_replace(".", "", $ledname)); 
//        $qry = "select * from massal_customer where cust_name like '%$ledname%'";
  //      $qry = "select * from massal_customer where cust_type != 'G' and replace(cust_name,' ','') like '%$ledname%' or replace(cust_name,'.','') like '%$ledname%' ";
      $qry = "select * from massal_customer where cust_type  != 'G' and replace(replace(cust_name,' ','')  ,'.','')  like '%$ledname%' order by cust_name";

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

 function getVarMainGroup()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select vargrp_type_code,vargrp_type_name from masprd_type");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	

 function getCreditNoteVoucherSLNO()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$cnslno   = $_POST['cnslno'];
        $r=mysql_query("select count(*) as nos from acc_dbcrnote_header where dbcr_type = 'CNG' and dbcr_comp_code = $compcode and dbcr_finid = $finid and dbcr_no > $cnslno ");
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
