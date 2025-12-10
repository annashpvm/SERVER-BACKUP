<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadgrnno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadCustomer":
		getCustomer();
		break;
		case "loadSeqNo":
		getSeqNo();
		break;

		case "loadOSheader":
		getOSheader();
		break;
		case "loadothsaleno":
		getothersaleno();
		break;
         	case "loadothsalenolist":
		getothersalenolist();
		break;
         	case "loadothsalenodetail":
		getothersalenodetail();
		break;
		case "loadcarrier":
		getcarrier();
		break;
		case "loadpayterms":
		getpayterms();
		break;
		case  "loaditem":
		getitem();
		break;
		case  "loaditemdet":
		getitemdet();
		break;
		case  "loadgstno":
		getgstno();
          	break;
		case  "loadStoresSales":
		getStoresSales();
          	break;

		case  "loadInvNo":
		getInvNo();
          	break;
		case "loadEInvStatus":
		getEInvStatus();
		break;
		case "loadEWayStatus":
		getEWayStatus();
		break;

		case "loadInvoicenoList":
		getInvoicenoList();
		break;

		case  "loadEndInvNo":
		getEndInvNo();
          	break;

		default:
        	echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 
	

function getCustomer(){
    $query = "select cust_code ,cust_ref from massal_customer where cust_taxtag in (3,4) ";
    $query = "select  cust_code , cust_ref from massal_customer";
    $result = mysqli_query($conn, $query);
    $nbrows = mysqli_num_rows($result);
    if ($nbrows > 0) {
        while ($rec = mysqli_fetch_array($result)) {
            $arr[] = $rec;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nbrows . '","results":' . $jsonresult . '})';
    } else {
        echo '({"total":"0", "results":""})';
    }
   }


 function getSeqNo()
    {
        global $conn; 
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$gsttype = $_POST['gsttype'];

        $sql = "select ifnull(max(os_seqno),0)+1 as os_seqno from trn_other_sales where os_fincode=$finid and os_compcode=$compcode";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

	
 function getothersaleno()
    {
        global $conn; 
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$gsttype = $_POST['gsttype'];

        $sql = "select ifnull(max(os_docno),0)+1 as ss_invno from trn_other_sales where os_state_type = '$gsttype' and  os_fincode=$finid and os_compcode=$compcode";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

	
 function getothersalenolist()
    {
        global $conn; 
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$gsttype = $_POST['gsttype'];
        $sql = "select os_invno  from trn_other_sales where os_state_type = '$gsttype' and os_fincode=$finid and os_compcode=$compcode and os_cancel ='N' order by os_invno desc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 function getothersalenodetail()
    {
        global $conn; 
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$invno = $_POST['invno'];
	$gsttype = $_POST['gsttype'];

        $sql = "select * from trn_other_sales,  mas_othersales_item_master , mas_uom  where os_state_type = '$gsttype' and os_item = salitem_code and salitem_uom = uom_code and os_compcode = $compcode and os_fincode = $finid  and os_invno = '$invno'";

        $sql = "select a1.*, a2.*, a3.*,b.cust_name as tn_sal_ledger, c.cust_name as os_sal_ledger,d.cust_name as cgst_ledger,e.cust_name as sgst_ledger,f.cust_name as igst_ledger ,mas.cust_name  from trn_other_sales a1,  mas_othersales_item_master a2 , mas_uom  a3 , massal_customer b , massal_customer c , massal_customer d , massal_customer e , massal_customer f ,massal_customer mas where mas.cust_code = os_custcode and  salitem_salesledcode_tn = b.cust_code and  salitem_salesledcode_os = c.cust_code and  salitem_cgstledcode = d.cust_code and salitem_sgstledcode = e.cust_code and salitem_igstledcode = f.cust_code and os_state_type = '$gsttype'  and os_item = salitem_code and salitem_uom = uom_code and os_compcode = $compcode  and os_fincode =  $finid   and os_invno = '$invno'";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
function getcarrier()
    {
        global $conn; 
	$sql = "select * from mas_transport";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


function getpayterms()
    {
        global $conn; 
	$sql = "select * from mas_terms";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getitem()
    {
        global $conn; 
	$sql = "select salitem_code,salitem_name from mas_othersales_item_master order by salitem_code,salitem_name";
	//$sql = "select * from mas_terms";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getitemdet()
    {
        global $conn; 
        $itemcode = $_POST['item'];
	$sql = "select * from mas_othersales_item_master a , mas_uom b where salitem_uom = uom_code and salitem_code = $itemcode";

        $sql = "select uom_short_name,salitem_hsn,salitem_cgstper, salitem_sgstper,salitem_igstper,salitem_salesledcode_tn, salitem_salesledcode_os, salitem_cgstledcode, salitem_sgstledcode, salitem_igstledcode ,b.cust_name as tn_sal_ledger, c.cust_name as os_sal_ledger,d.cust_name as cgst_ledger,e.cust_name as sgst_ledger,f.cust_name as igst_ledger from mas_othersales_item_master a , massal_customer b , massal_customer c , massal_customer d, massal_customer e, massal_customer f, mas_uom h  where salitem_salesledcode_tn = b.cust_code and salitem_salesledcode_os = c.cust_code and salitem_cgstledcode = d.cust_code and salitem_sgstledcode = e.cust_code and salitem_igstledcode = f.cust_code and salitem_uom = uom_code and salitem_code = $itemcode";


	//$sql = "select * from mas_terms";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


function getgstno()
    {
        global $conn; 
	$custcode = $_POST['custcode'];
	$sql = "select * from massal_customer  where cust_code=$custcode";
	//$sql = "select * from mas_terms";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getOSheader()
    {
        global $conn; 
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$invno = $_POST['invno'];
	$gsttype = $_POST['gsttype'];

        $sql = "select * from trn_other_sales, massal_customer  where os_custcode = cust_code and  os_state_type = '$gsttype' and  os_compcode = $compcode and os_fincode = $finid  and os_invno = '$invno'";



    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getStoresSales()
    {
        global $conn; 
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$fromdate = $_POST['fromdate'];
	$todate   = $_POST['todate'];

        $sql = " select DATE_FORMAT(os_date, '%d-%m-%Y') as os_date, os_invno, cust_ref, cust_gstin, salitem_name, uom_short_name, os_rate, os_qty, os_others, os_taxable, os_cgstper, os_cgst, os_sgstper, os_sgst, os_igstper, os_igst, os_rounding, os_netamt from trn_other_sales , massal_customer , mas_othersales_item_master ,    mas_uom where  os_custcode = cust_code and os_item = salitem_code and salitem_uom = uom_code and os_compcode = $compcode and os_fincode = $finid and os_date between '$fromdate' and '$todate' ";



    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getInvNo()
    {
        global $conn; 
	$finid    = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$repdate  = $_POST['repdate'];

        $sql = " select * from trn_other_sales where os_compcode = $compcode and os_fincode =  $finid  and os_date = '$repdate'  and os_cancel ='N'";



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



        $sql = "select * from AIS_OEIV where invEntry = '$invno' order by CreateDate desc";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getEWayStatus()
    {
        global $conn; 
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$invno = $_POST['invno'];



        $sql = "select * from AIS_OEWB where invEntry = '$invno' order by CreateDate desc";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }




 function getInvoicenoList()
    {
        global $conn; 
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$invtype = $_POST['invstate'];



       $sql = " select os_invno,os_seqno from trn_other_sales where os_compcode = $compcode and os_fincode =  $finid  and os_state_type ='$invtype' order by os_invno desc";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



 function getEndInvNo()
    {
        global $conn; 
	$finid = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$invtype = $_POST['gsttype'];



       $sql = " select ifnull(max(os_invno),0) as os_invno  from trn_other_sales where os_compcode = $compcode and os_fincode =  $finid  and os_state_type ='$invtype' order by os_invno desc";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
?>
