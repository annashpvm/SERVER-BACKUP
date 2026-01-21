<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadSearchLedgerlist';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
mysqli_set_charset($conn, "utf8");
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

		case "LoadDebitNoteAccSeqNo":
	        getDebitNoteAccSeqNo();
		break;


		default:
        	echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
    }
    
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    



 function getSearchLedgerlist()
    {
        global $conn;
        $ledname = strtoupper($_POST['ledger']);

        $ledname = trim(str_replace(" ", "", $ledname)); 
        $ledname = trim(str_replace(".", "", $ledname)); 


        if ($ledname == '')
	        $qry = "select * from (select  led_code,led_name,qc_rm_supcode,sup_type from trn_qc_rm_inspection,massal_customer, acc_ledger_master  where  cust_code = qc_rm_supcode and  sup_led_code = led_code group by led_code,led_name,qc_rm_supcode,sup_type) a1 order by led_name";
        else
	        $qry = "select * from (select  led_code,led_name,qc_rm_supcode,sup_type from trn_qc_rm_inspection,massal_customer, acc_ledger_master  where  cust_code = qc_rm_supcode and  sup_led_code = led_code group by led_code,led_name,qc_rm_supcode,sup_type) a1 where replace(replace(led_name,' ','')  ,'.','') like '%$ledname%' order by led_name";

        $r=mysqli_query($conn, $qry);
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 


function getPurGroup()
    {
	$supptype     = $_POST['supptype'];
        $gsttype =$_POST['gsttype'];

        if ($gsttype == 'G')
           $sql = "select * from mas_RMFU_purchasetax  where tax_state = $supptype and tax_gst > 0 and tax_purtype = 'RM'order by tax_purname";
        else
           $sql = "select * from mas_RMFU_purchasetax  where tax_state = $supptype and tax_gst = 0 and tax_purtype = 'RM'order by tax_purname";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getPurGroupDetail()
    {
	$purcode     = $_POST['purcode'];

        $sql = "select * from mas_RMFU_purchasetax  where tax_purcode = $purcode order by tax_purname";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


function getQCNoList()
    {
	$suppcode = $_POST['suppcode'];
	$compcode = $_POST['compcode'];
	$ticket = $_POST['ticket'];

        global $conn;
//        $sql = "select * from acc_ledger_master  where led_type = 'G' and  led_code in (1756,1745,1746,2258)";

if ($ticket == 1)
        $sql = "select qc_rm_entryno from trn_qc_rm_inspection where qc_rm_compcode = $compcode and qc_rm_dn_raised ='N' and qc_rm_supcode = $suppcode group by  qc_rm_entryno   order by  qc_rm_entryno desc";
else
        $sql = "select qc_rm_entryno from trn_qc_rm_inspection where qc_rm_compcode = $compcode and qc_rm_dn_raised ='N' and qc_rm_ticketno = $ticket group by  qc_rm_entryno   order by  qc_rm_entryno desc";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getQCRMEntryNoDetail()
    {
        global $conn;
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];
	$entryno  = $_POST['entryno'];

        $sql = "select * from trn_qc_rm_inspection , masrm_item_header,massal_customer ,trn_weight_card  where qc_rm_supcode = cust_code and qc_rm_itemcode = itmh_code and wc_compcode = qc_rm_compcode and qc_rm_fincode = wc_fincode and wc_ticketno = qc_rm_ticketno and  qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' and qc_rm_entryno = $entryno  ";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getItemList()
    {
        global $conn;


        $sql = "select * from masfu_item_header order by itmh_name";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getDNNumber()
    {
        global $conn;
        $ginfinid= $_POST['finid'];
        $gincompcode=$_POST['compcode'];
        $gsttype =$_POST['gsttype'];

        if ($gsttype == 'G')
	   $sql = "select ifnull(max(dbcr_no),0) + 1 as vouno from acc_dbcrnote_header where dbcr_type = 'DNG' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';";
        else
	   $sql = "select ifnull(max(dbcr_no),0) + 1 as vouno from acc_dbcrnote_header where dbcr_type = 'DNN' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getDebitNoteVoucherList()
    {
        global $conn;
	$compcode = $_POST['compcode'];
	$finid    = $_POST['fincode'];
        $gsttype =$_POST['gsttype'];
        if ($gsttype == 'G')
        $sql = "select max(dbcr_vouno) as vouno from acc_dbcrnote_header where dbcr_comp_code = '$compcode' and dbcr_finid = '$finid' and dbcr_type = 'DNG' and  dbcr_vouno in (select qc_rm_debitnote_no  from trn_qc_rm_inspection where qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' )";
        else
        $sql = "select max(dbcr_vouno) as vouno from acc_dbcrnote_header where dbcr_comp_code = '$compcode' and dbcr_finid = '$finid' and dbcr_type = 'DNN' and  dbcr_vouno in (select qc_rm_debitnote_no  from trn_qc_rm_inspection where qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' )";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getDebitNoteVoucherDetail()
    {
        global $conn;
	$compcode = $_POST['compcode'];
	$finid    = $_POST['fincode'];
	$vouno    = $_POST['vouno'];

        $sql = "select * from trn_qc_rm_inspection , masrm_item_header,massal_customer ,trn_weight_card ,mas_RMFU_purchasetax  where tax_purcode = qc_rm_pur_ledger and  qc_rm_supcode = cust_code and qc_rm_itemcode = itmh_code and wc_compcode = qc_rm_compcode and qc_rm_fincode = wc_fincode and wc_ticketno = qc_rm_ticketno and  qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' and qc_rm_dn_raised = 'Y' and  qc_rm_debitnote_no = '$vouno'";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getDebitNoteVoucherListAccounts()
    {
        global $conn;
	$compcode = $_POST['compcode'];
	$finid    = $_POST['fincode'];


        $sql = "select dbcr_vouno from  acc_dbcrnote_header,trn_qc_rm_inspection where qc_rm_compcode = dbcr_comp_code and qc_rm_fincode = dbcr_finid and qc_rm_debitnote_no = dbcr_vouno and dbcr_comp_code = '$compcode' and dbcr_finid = '$finid' and dbcr_accseqno = 0 group by dbcr_vouno   order by dbcr_vouno asc";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



    function getDebitNoteAccSeqNo()
    {
    global $conn;
	$compcode = $_POST['compcode'];
	$finid    = $_POST['fincode'];
	$vouno    = $_POST['vouno'];

    $sql = "select * from acc_ref where accref_comp_code = '$compcode'  and accref_finid = '$finid' and accref_vouno = '$vouno'"; 
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

?>
