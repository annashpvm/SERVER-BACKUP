<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='findGSTType';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysql_query("SET NAMES utf8");

    switch($task){


                case "ControlDebitNo":
                getControlDebitNo();
                break;
                case "ControlDebitNo2":
                getControlDebitNo2();
                break;


                case "ControlDebitNoSales":
                getControlDebitNoSales();
                break;

		case "loadInvDetails":
		getInvDetails();
		break;
		case "loadDNNoDetails":
		getDNNoDetails();
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
		case "LoadDebitNoteVoucherList":
		getDebitNoteVoucherList();
		break;
		case "LoadDebitNoteVoucherDetails":
		getDebitNoteVoucherDetail();
		break;
		case "findGSTType":
		getGSTType();
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
        $ledtype = $_POST['ledgertype'];
        $gsttype = $_POST['gsttype'];
        $gstper  = $_POST['gstper'];

        mysql_query("SET NAMES utf8");
        if ($ledtype == "I")
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
        $ledtype = $_POST['ledgertype'];
        $gsttype = $_POST['gsttype'];
        $gstper  = $_POST['gstper'];

        mysql_query("SET NAMES utf8");
        if ($ledtype == "I")
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
        $ledtype = $_POST['ledgertype'];
        $gsttype = $_POST['gsttype'];
        $gstper  = $_POST['gstper'];

        mysql_query("SET NAMES utf8");
        if ($ledtype == "I")
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


 function getDebitNoteVoucherList()

    {
  	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];      
	$voutype = $_POST['voutype'];   

        mysql_query("SET NAMES utf8");
        $r=mysql_query("select dbcr_vouno from acc_dbcrnote_header where dbcr_type in ('$voutype','SDN') and dbcr_finid = '$fincode' and dbcr_comp_code = '$compcode' order by dbcr_date desc,dbcr_no desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getDebitNoteVoucherDetail()

    {
  	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
       	$vouno    = $_POST['vouno'];

        mysql_query("SET NAMES utf8");
//        $r=mysql_query("select dbcr_vouno from acc_dbcrnote_header where dbcr_type = 'DNG' and dbcr_finid = '$fincode' and dbcr_comp_code = '$compcode' order by dbcr_vouno  desc");

$r=mysql_query("select * from acc_dbcrnote_header a , acc_dbcrnote_trailer b , massal_customer where dbcr_seqno = dbcrt_seqno and dbcr_partycode = cust_code and dbcr_comp_code = '$compcode'  and dbcr_finid = '$fincode' and dbcr_vouno = '$vouno'");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getGSTType()

    {
  	$ledtype = $_POST['ledtype'];
	$ledcode = $_POST['ledcode'];


        mysql_query("SET NAMES utf8");

$r=mysql_query("select cust_type,cust_code,cust_state as statecode from  massal_customer  where  cust_type != 'G' and cust_code = '$ledcode'");
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
  //      $qry = "select * from massal_customer where led_type != 'G' and replace(cust_name,' ','') like '%$ledname%' or replace(cust_name,'.','') like '%$ledname%' ";
      $qry = "select * from massal_customer where cust_type  != 'G' and left(cust_name,2) != 'zz' and replace(replace(cust_name,' ','')  ,'.','')  like '%$ledname%' order by cust_name";

        $r=mysql_query($qry);
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

function getControlDebitNo() {
    $ginfinid= $_POST['ginfinid'];
    $gincompcode=$_POST['gincompcode'];

if ($ginfinid < 24)
$r = mysql_query("select concat('DNG',ifnull(max(dbcr_no),0) + 1) as accref_vouno from acc_dbcrnote_header where dbcr_type = 'DNG' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");
else
$r = mysql_query("select ifnull(max(dbcr_no),0) + 1 as con_value from acc_dbcrnote_header where dbcr_type = 'DNG' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");

    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}


function getControlDebitNo2() {
    $ginfinid= $_POST['ginfinid'];
    $gincompcode=$_POST['gincompcode'];

if ($ginfinid < 24)
$r = mysql_query("select concat('DNN',ifnull(max(dbcr_no),0) + 1) as accref_vouno from acc_dbcrnote_header where dbcr_type = 'DNN' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");
else
$r = mysql_query("select ifnull(max(dbcr_no),0) + 1 as con_value from acc_dbcrnote_header where dbcr_type = 'DNN' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");


//$qry ="select ifnull(max(dbcr_no),0) + 1 as con_value from acc_dbcrnote_header where dbcr_type = 'DNN' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode'";

//echo $qry;

    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}


function getControlDebitNoSales() {
    $ginfinid= $_POST['ginfinid'];
    $gincompcode=$_POST['gincompcode'];

$r = mysql_query("select ifnull(max(dbcr_no),0) + 1 as con_value from acc_dbcrnote_header where dbcr_type = 'SDN' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");


//$qry ="select ifnull(max(dbcr_no),0) + 1 as con_value from acc_dbcrnote_header where dbcr_type = 'DNN' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode'";

//echo $qry;

    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
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
	
?>
