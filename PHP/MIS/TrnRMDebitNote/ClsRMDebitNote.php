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
		case "loadQCRMEntryNoDetail":
		getQCRMEntryNoDetail();
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


        if ($ledname == '')
	        $qry = "select * from (select  led_code,led_name,qc_rm_supcode,sup_type from trn_qc_rm_inspection,maspur_supplier_master, acc_ledger_master  where  sup_code = qc_rm_supcode and  sup_led_code = led_code group by led_code,led_name,qc_rm_supcode,sup_type) a1 order by led_name";
        else
	        $qry = "select * from (select  led_code,led_name,qc_rm_supcode,sup_type from trn_qc_rm_inspection,maspur_supplier_master, acc_ledger_master  where  sup_code = qc_rm_supcode and  sup_led_code = led_code group by led_code,led_name,qc_rm_supcode,sup_type) a1 where replace(replace(led_name,' ','')  ,'.','') like '%$ledname%' order by led_name";

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
           $r=mysql_query("select * from mas_RMFU_purchasetax  where tax_state = $supptype and tax_gst > 0 and tax_purtype = 'RM'order by tax_purname");
        else
           $r=mysql_query("select * from mas_RMFU_purchasetax  where tax_state = $supptype and tax_gst = 0 and tax_purtype = 'RM'order by tax_purname");


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
	$ticket = $_POST['ticket'];

        mysql_query("SET NAMES utf8");
//        $r=mysql_query("select * from acc_ledger_master  where led_type = 'G' and  led_code in (1756,1745,1746,2258)");

if ($ticket == 1)
        $r=mysql_query("select qc_rm_entryno from trn_qc_rm_inspection where qc_rm_compcode = $compcode and qc_rm_dn_raised ='N' and qc_rm_supcode = $suppcode group by  qc_rm_entryno   order by  qc_rm_entryno desc");
else
        $r=mysql_query("select qc_rm_entryno from trn_qc_rm_inspection where qc_rm_compcode = $compcode and qc_rm_dn_raised ='N' and qc_rm_ticketno = $ticket group by  qc_rm_entryno   order by  qc_rm_entryno desc");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getQCRMEntryNoDetail()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];
	$entryno  = $_POST['entryno'];

        $r=mysql_query("select * from trn_qc_rm_inspection , masrm_item_header,maspur_supplier_master ,trn_weight_card  where qc_rm_supcode = sup_code and qc_rm_itemcode = itmh_code and wc_compcode = qc_rm_compcode and qc_rm_fincode = wc_fincode and wc_ticketno = qc_rm_ticketno and  qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' and qc_rm_entryno = $entryno  ");


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
        $r=mysql_query("select max(dbcr_vouno) as vouno from acc_dbcrnote_header where dbcr_comp_code = '$compcode' and dbcr_finid = '$finid' and dbcr_type = 'DNG' and  dbcr_vouno in (select qc_rm_debitnote_no  from trn_qc_rm_inspection where qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' )");
        else
        $r=mysql_query("select max(dbcr_vouno) as vouno from acc_dbcrnote_header where dbcr_comp_code = '$compcode' and dbcr_finid = '$finid' and dbcr_type = 'DNN' and  dbcr_vouno in (select qc_rm_debitnote_no  from trn_qc_rm_inspection where qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' )");


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

        $r=mysql_query("select * from trn_qc_rm_inspection , masrm_item_header,maspur_supplier_master ,trn_weight_card ,mas_RMFU_purchasetax  where tax_purcode = qc_rm_pur_ledger and  qc_rm_supcode = sup_code and qc_rm_itemcode = itmh_code and wc_compcode = qc_rm_compcode and qc_rm_fincode = wc_fincode and wc_ticketno = qc_rm_ticketno and  qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' and qc_rm_dn_raised = 'Y' and  qc_rm_debitnote_no = '$vouno'");


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


        $r=mysql_query("select dbcr_vouno from  acc_dbcrnote_header,trn_qc_rm_inspection where qc_rm_compcode = dbcr_comp_code and qc_rm_fincode = dbcr_finid and qc_rm_debitnote_no = dbcr_vouno and dbcr_comp_code = '$compcode' and dbcr_finid = '$finid' and dbcr_accseqno = 0 group by dbcr_vouno   order by dbcr_vouno asc");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

?>
