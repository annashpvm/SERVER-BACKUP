<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadSearchLedgerlist';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){

             	case "loadSearchLedgerlist":
		getSearchLedgerlist();
		break;			
		case "loadPurGroup":
		getPurGroup();
		break;
		case "loadPurGroupDetail":
		getPurGroupDetail();
		break;
		case "loadQCNoList":
		getQCNoList();
		break;
		case "loadQCFuelEntryNoDetail":
		getQCFuelEntryNoDetail();
		break;
		case "loadItemList":
	        getItemList();
		break;
		case "LoadDNNumber":
	        getDNNumber();
		break;
		case "LoadDebitNoteVoucherList":
	        getDebitNoteVoucherList();
		break;
		case "LoadDebitNoteVoucherDetail":
	        getDebitNoteVoucherDetail();
		break;

		case "LoadDebitNoteVoucherListAccounts":
	        getDebitNoteVoucherListAccounts();
		break;
		case "LoadDebitNoteUpdateCheck":
	        getDebitNoteUpdateCheck();
		break;
		case "LoadDebitNoteAccSeqno":
	        getDebitNoteAccSeqno();
		break;

		case "LoadDNDate":
	        getDNDate();
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
            $data= $json->encode($arr);    //encode the data in json format
        } else
        {
            $data = json_encode($arr);    //encode the data in json format
        }
        return $data;
    }
    



 function getSearchLedgerlist()
    {
        mysql_query("SET NAMES utf8");
        $ledname = strtoupper($_POST['ledger']);

        $ledname = trim(str_replace(" ", "", $ledname)); 
        $ledname = trim(str_replace(".", "", $ledname)); 


/*
        if ($ledname == '')
	        $qry = "select * from (select  cust_code,cust_nameqc_fuel_supcode,cust_type from trn_qc_fuel_inspection,massal_customer, acc_ledger_master  where  cust_code = qc_fuel_supcode and  sup_led_code = led_code group by cust_code,cust_nameqc_fuel_supcode,cust_type) a1 order by led_name";
        else
	        $qry = "select * from (select  cust_code,cust_nameqc_fuel_supcode,cust_type from trn_qc_fuel_inspection,massal_customer, acc_ledger_master  where  cust_code = qc_fuel_supcode and  sup_led_code = led_code group by cust_code,cust_nameqc_fuel_supcode,cust_type) a1 where replace(replace(led_name,' ','')  ,'.','')  like '%$ledname%'  order by led_name";
*/


        if ($ledname == '')
	        $qry = "select * from (select  cust_code,cust_name,qc_fuel_supcode,cust_taxtag from trn_qc_fuel_inspection,massal_customer  where  cust_code = qc_fuel_supcode group by cust_code,cust_name,qc_fuel_supcode,cust_taxtag) a1 order by cust_name";
        else
	        $qry = "select * from (select  cust_code,cust_name,qc_fuel_supcode,cust_taxtag from trn_qc_fuel_inspection,massal_customer where  cust_code = qc_fuel_supcode  group by cust_code,cust_name,qc_fuel_supcode,cust_taxtag) a1 where replace(replace(cust_name,' ','')  ,'.','')  like '%$ledname%'  order by cust_name";




        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    } 


function getPurGroup()
    {
	$supptype     = $_POST['supptype'];
        $gsttype =$_POST['gsttype'];

        if ($gsttype == 'G')
           $r=mysql_query("select * from mas_RMFU_purchasetax  where tax_state = $supptype and tax_gst > 0 and tax_purtype = 'FU' order by tax_purname");
        else
  //         $r=mysql_query("select * from mas_RMFU_purchasetax  where tax_gst = 0 and tax_purtype = 'FU' order by tax_purname");
           $r=mysql_query("select cust_code tax_purcode,cust_name tax_purname from massal_customer WHERE cust_code = 2652");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getPurGroupDetail()
    {
	$purcode     = $_POST['purcode'];

        $r=mysql_query("select * from mas_RMFU_purchasetax  where tax_purcode = $purcode order by tax_purname");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


function getQCNoList()
    {
	$suppcode = $_POST['suppcode'];
	$compcode = $_POST['compcode'];
        mysql_query("SET NAMES utf8");
//        $r=mysql_query("select * from acc_ledger_master  where led_type = 'G' and  led_code in (1756,1745,1746,2258)");


        $r=mysql_query("select qc_fuel_entryno from trn_qc_fuel_inspection where qc_fuel_compcode = $compcode and qc_fuel_dn_raised ='N' and qc_fuel_supcode = $suppcode and qc_fuel_tot_ded_qty >= 0 and qc_fuel_fincode > 23 order by  qc_fuel_entryno desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getQCFuelEntryNoDetail()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];
	$entryno  = $_POST['entryno'];

        $r=mysql_query("select * from trn_qc_fuel_inspection , masfu_item_header,massal_customer ,trn_weight_card  where qc_fuel_supcode = cust_code and qc_fuel_itemcode = itmh_code and wc_compcode = qc_fuel_compcode and qc_fuel_fincode = wc_fincode and wc_ticketno = qc_fuel_ticketno and  qc_fuel_compcode = '$compcode' and qc_fuel_fincode = '$finid' and qc_fuel_entryno = $entryno");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getItemList()
    {
        mysql_query("SET NAMES utf8");


        $r=mysql_query("select * from masfu_item_header order by itmh_name");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getDNNumber()
    {
        mysql_query("SET NAMES utf8");
        $ginfinid= $_POST['finid'];
        $gincompcode=$_POST['compcode'];
        $gsttype =$_POST['gsttype'];
/*
        if ($gsttype == 'G')
	   $r = mysql_query("select concat('DNG',ifnull(max(dbcr_no),0) + 1) as vouno from acc_dbcrnote_header where dbcr_type = 'DNG' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");
        else
	   $r = mysql_query("select concat('DNN',ifnull(max(dbcr_no),0) + 1) as vouno from acc_dbcrnote_header where dbcr_type = 'DNN' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");
*/
        if ($gsttype == 'G')
	   $r = mysql_query("select ifnull(max(dbcr_no),0) + 1 as vouno from acc_dbcrnote_header where dbcr_type = 'DNG' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");
        else
	   $r = mysql_query("select ifnull(max(dbcr_no),0) + 1 as vouno from acc_dbcrnote_header where dbcr_type = 'DNN' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");


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
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid    = $_POST['fincode'];
        $gsttype =$_POST['gsttype'];
        if ($gsttype == 'G')
        $r=mysql_query("select * from trn_qc_fuel_inspection , masfu_item_header,massal_customer ,trn_weight_card  where qc_fuel_supcode = cust_code and qc_fuel_itemcode = itmh_code and wc_compcode = qc_fuel_compcode and qc_fuel_fincode = wc_fincode and wc_ticketno = qc_fuel_ticketno and  qc_fuel_compcode = '$compcode' and qc_fuel_fincode = '$finid' and qc_fuel_dn_raised = 'Y' and left(qc_fuel_debitnote_no,3) = 'DNG' order by qc_fuel_debitnote_no desc ");
        else
        $r=mysql_query("select * from trn_qc_fuel_inspection , masfu_item_header,massal_customer ,trn_weight_card  where qc_fuel_supcode = cust_code and qc_fuel_itemcode = itmh_code and wc_compcode = qc_fuel_compcode and qc_fuel_fincode = wc_fincode and wc_ticketno = qc_fuel_ticketno and  qc_fuel_compcode = '$compcode' and qc_fuel_fincode = '$finid' and qc_fuel_dn_raised = 'Y' and left(qc_fuel_debitnote_no,3) = 'DNN' order by qc_fuel_debitnote_no desc");



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
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid    = $_POST['fincode'];
	$vouno    = $_POST['vouno'];
/*
        $r=mysql_query("select * from trn_qc_fuel_inspection , masfu_item_header,massal_customer ,trn_weight_card ,mas_RMFU_purchasetax  where tax_purcode = qc_fuel_pur_ledger and  qc_fuel_supcode = cust_code and qc_fuel_itemcode = itmh_code and wc_compcode = qc_fuel_compcode and qc_fuel_fincode = wc_fincode and wc_ticketno = qc_fuel_ticketno and  qc_fuel_compcode = '$compcode' and qc_fuel_fincode = '$finid' and qc_fuel_dn_raised = 'Y' and  qc_fuel_debitnote_no = '$vouno'");
*/
if ($finid >= 24)

        $r=mysql_query("select * from trn_qc_fuel_inspection , masfu_item_header,massal_customer ,trn_weight_card ,mas_RMFU_purchasetax ,acc_dbcrnote_header  where qc_fuel_debitnote_no = dbcr_vouno and qc_fuel_debitnote_date = dbcr_date and qc_fuel_compcode = dbcr_comp_code and qc_fuel_fincode = dbcr_finid and  tax_purcode = qc_fuel_pur_ledger and  qc_fuel_supcode = cust_code and qc_fuel_itemcode = itmh_code and wc_compcode = qc_fuel_compcode and qc_fuel_fincode = wc_fincode and wc_ticketno = qc_fuel_ticketno and  qc_fuel_compcode = '$compcode' and qc_fuel_fincode = '$finid' and qc_fuel_dn_raised = 'Y' and  qc_fuel_debitnote_no = '$vouno'");
else
        $r=mysql_query("select * from trn_qc_fuel_inspection , masfu_item_header,massal_customer ,trn_weight_card ,mas_RMFU_purchasetax ,tmpacc_dbcrnote_header  where qc_fuel_debitnote_no = dbcr_vouno and qc_fuel_debitnote_date = dbcr_date and qc_fuel_compcode = dbcr_comp_code and qc_fuel_fincode = dbcr_finid and  tax_purcode = qc_fuel_pur_ledger and  qc_fuel_supcode = cust_code and qc_fuel_itemcode = itmh_code and wc_compcode = qc_fuel_compcode and qc_fuel_fincode = wc_fincode and wc_ticketno = qc_fuel_ticketno and  qc_fuel_compcode = '$compcode' and qc_fuel_fincode <= '$finid' and qc_fuel_dn_raised = 'Y' and  qc_fuel_debitnote_no = '$vouno'");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getDebitNoteVoucherListAccounts()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid    = $_POST['fincode'];
        $gsttype =$_POST['gsttype'];
        $r=mysql_query("select dbcr_vouno from  acc_dbcrnote_header where dbcr_comp_code = '$compcode' and dbcr_finid ='$finid'  and dbcr_accseqno = 0  order by dbcr_vouno asc ");

if ($finid >= 24)
        $r=mysql_query("select * from  acc_dbcrnote_header,trn_qc_fuel_inspection where qc_fuel_compcode = dbcr_comp_code and qc_fuel_fincode = dbcr_finid and 
qc_fuel_debitnote_no = dbcr_vouno and dbcr_comp_code = '$compcode' and dbcr_finid = '$finid' and dbcr_accseqno = 0  order by dbcr_vouno asc");

else
        $r=mysql_query("select * from  tmpacc_dbcrnote_header,trn_qc_fuel_inspection where qc_fuel_compcode = dbcr_comp_code and qc_fuel_fincode = dbcr_finid and 
qc_fuel_debitnote_no = dbcr_vouno and dbcr_comp_code = '$compcode' and dbcr_finid = '$finid' and dbcr_accseqno = 0  order by dbcr_vouno asc");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getDebitNoteUpdateCheck()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid    = $_POST['fincode'];
	$vouno    = $_POST['vouno'];


        $r=mysql_query("select * from  acc_dbcrnote_header where dbcr_comp_code = '$compcode' and dbcr_finid ='$finid'  and dbcr_vouno = '$vouno'");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getDebitNoteAccSeqno()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid    = $_POST['fincode'];
	$vouno    = $_POST['vouno'];

        $r=mysql_query("select * from acc_dbcrnote_header where dbcr_vouno = '$vouno'  and dbcr_comp_code = '$compcode' and dbcr_finid = '$finid' ");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getDNDate()
    {
        mysql_query("SET NAMES utf8");
        $ginfinid= $_POST['finid'];
        $gincompcode=$_POST['compcode'];
        $gsttype =$_POST['gsttype'];
 
        if ($gsttype == 'G')
	   $r = mysql_query("select max(dbcr_date) dnmaxdate from acc_dbcrnote_header where dbcr_type = 'DNG' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");
        else
	   $r = mysql_query("select max(dbcr_date) dnmaxdate from acc_dbcrnote_header where dbcr_type = 'DNN' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

?>
