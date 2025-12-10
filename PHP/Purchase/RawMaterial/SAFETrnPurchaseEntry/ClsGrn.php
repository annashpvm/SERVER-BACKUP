<?php
   require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadgrnno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadsupplier":
		getsupplier();
		break;
		case "loadgrnno":
		getgrnno();
		break;
		case "loadtransno":
		gettransno();
		break;

		case "loadtransdetail":
		gettransdetail();
		break;
		case "loadpono":
		getpono();
		break;
		/*case "loadpodetails":
		getpodetails();
		break;*/
		case "loaditem":
		getitem();
		break;
		case "loaditemdetails":
		getitemdetails();
		break;
		case "loaditemtax":
		getitemtax();
		break;
		case "loadgrndetails":
		getgrndetails();
		break;

		case "loadindentnos":
		getindentnos();
		break;
		case "loadPurGroup":
		getPurGroup();
		break;
		case "loadGRNList":
		getgrnnolist();
		break;
             	case "loadSearchLedgerlist":
		getSearchLedgerlist();
		break;	

		default:
        	echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getsupplier()
    {
        mysqli_set_charset($conn, "utf8");
	$sql = "CALL sp_pur_sup()");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
	
 function getgrnno()
    {
        mysqli_set_charset($conn, "utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $purtype  = $_POST['purtype'];

        $sql = "select ifnull(max(minh_minno),0)+1 as grnno from trnpur_min_header where minh_purtype = '$purtype' and  minh_fin_code=$finid  and minh_comp_code= $compcode");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function gettransno()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$supcode = $_POST['supcode'];
	$sql = "select t_clr_no from trnpur_trans_clearance where t_clr_company = $compcode and t_clr_finyear = $finid and t_clr_minno = 0 and t_clr_paymode = 'Y' and t_clr_grn_party = $supcode group by t_clr_no order by t_clr_no");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


function gettransdetail()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$supcode = $_POST['supcode'];
	$docno = $_POST['docno'];

//	$sql = "select * from trnpur_trans_clearance where t_clr_company = $compcode and t_clr_finyear = $finid and t_clr_minno = 0 and t_clr_paymode =  ////and t_clr_grn_party = $supcode and t_clr_no =$docno ");

//$sql = "select sup_refname,t_clr_frt_party, t_clr_lrno,t_clr_lrdt,sum(t_clr_lorry_frt) as frt , sum(t_clr_demurrage) + sum(t_clr_coolie) + sum(t_clr_others) as othexp , sum(t_clr_cgst_per) as ccgstper , sum(t_clr_sgst_per) as csgstper , sum(t_clr_igst_per) as cigstper from trnpur_trans_clearance , maspur_supplier_master where sup_code = t_clr_frt_party and  t_clr_company = $compcode and t_clr_finyear = $finid and t_clr_minno = 0 and t_clr_paymode = 'Y' and t_clr_grn_party = $supcode and t_clr_no = $docno");

$sql = "select sup_refname,t_clr_frt_party, t_clr_lrno,t_clr_lrdt,sum(t_clr_freight) as frt , sum(t_clr_demurrage) + sum(t_clr_coolie) + sum(t_clr_others) as othexp , sum(t_clr_cgst_per) as ccgstper , sum(t_clr_sgst_per) as csgstper , sum(t_clr_igst_per) as cigstper from trnpur_trans_clearance , maspur_supplier_master where sup_code = t_clr_frt_party and  t_clr_company = $compcode and t_clr_finyear = $finid and t_clr_minno = 0 and t_clr_paymode = 'Y' and t_clr_grn_party = $supcode and t_clr_no = $docno");

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getpono()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$flag = $_POST['flag'];
	$supcode = $_POST['supcode'];
	if($flag=="I")
	{
	$sql = "call sppur_pending_indent($compcode,$finid)");
//	$sql = "call sppur_pending_indent($compcode)");

	}
	else
	{
	$sql = "call sppur_pending_po('$compcode','$finid','$supcode')");
//	$sql = "call sppur_pending_po('1','20','7')");
	}
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getgrndetails()
    {
        mysqli_set_charset($conn, "utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
//	$flag     = $_POST['flag'];
	$grnno    = $_POST['grnno'];
        $purtype  = $_POST['purtype'];
	{
	$sql = "call sppur_sel_mindetails('$compcode','$finid','$grnno','$purtype')");
	}
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


function getindentnos()
    {
        mysqli_set_charset($conn, "utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$pono    = $_POST['pono'];

	$sql = "select   ptr_podate  podate ,ptr_ind_no  indno, ptr_ind_fin_code  indfincode,phd_credit_days,phd_tol from trnpur_purchase_trailer a,   trnpur_purchase_header b where 
phd_comp_code = ptr_comp_code and phd_fin_code  = ptr_fin_code  and phd_pono = ptr_pono  and
phd_comp_code = $compcode and phd_fin_code  = $finid and  phd_pono = $pono group by  ptr_podate,ptr_ind_no , ptr_ind_fin_code");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


function getitem()
    {
        mysqli_set_charset($conn, "utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$flag     = $_POST['flag'];
	$pono    = $_POST['pono'];
	$indno    = $_POST['indno'];
	$supcode  = $_POST['supcode'];
	if($flag=="I") 
	{
	$sql = "call sppur_ind_details_items('$compcode','$finid','$indno')");
	}
	else
	{
//	$sql = "call sppur_po_details_new('$compcode','$finid','$supcode','$indno')");

	$sql = "select * from trnpur_purchase_header a,  trnpur_purchase_trailer b , maspur_item_header c , mas_uom d where phd_sup_code = $supcode and phd_comp_code = ptr_comp_code and phd_fin_code = ptr_fin_code  and phd_pono = ptr_pono and phd_comp_code = $compcode and phd_fin_code = $finid and phd_pono = $pono  and ptr_pono = $pono and ptr_ind_no = $indno and ptr_item_code = item_code and item_uom = uom_code");


	}
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



function getitemdetails()
    {
        mysqli_set_charset($conn, "utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$flag     = $_POST['flag'];
	$pono    = $_POST['pono'];
	$indno    = $_POST['indno'];
	$supcode  = $_POST['supcode'];
	$item     = $_POST['itemcode'];

	if($flag=="I") 
	{
$sql = "select * from trnpur_indent a, maspur_item_header b , mas_uom c  where ind_comp_code ='$compcode' and ind_fin_code = '$finid'  and ind_item_code = item_code and item_uom = uom_code and ind_qty > ind_rec_qty  and ind_no = '$indno'  and ind_item_code ='$item'");

	}
	else
	{
	$sql = "select * from trnpur_purchase_header a,  trnpur_purchase_trailer b , maspur_item_header c , mas_uom d where phd_sup_code = $supcode and phd_comp_code = ptr_comp_code and phd_fin_code = ptr_fin_code  and phd_pono = ptr_pono and phd_comp_code = $compcode and phd_fin_code = $finid and phd_pono = $pono  and ptr_ind_no = $indno  and ptr_item_code = $item and ptr_item_code = item_code and item_uom = uom_code ");

	}


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

/*function getitem()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$indno = $_POST['indno'];
	
	$sql = "call sppur_ind_details_items('$compcode','$finid','$indno')");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }*/

function getitemtax()
{
        mysqli_set_charset($conn, "utf8");
	$cgstper = $_POST['cgstper'];
	$sgstper = $_POST['sgstper'];
	$igstper = $_POST['igstper'];
	
	$sql = "select * from maspur_gsttax where tax_gst_per = $cgstper");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


function getPurGroup()
    {
	$pono     = $_POST['pono'];
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        mysqli_set_charset($conn, "utf8");
         $sql = "select * from acc_ledger_master  where led_type = 'G' and  led_grp_code in (74,75)");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getgrnnolist()
    {
        mysqli_set_charset($conn, "utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $purtype  = $_POST['purtype'];

        $sql = "select minh_minno from trnpur_min_header where minh_purtype = '$purtype' and  minh_fin_code=$finid  and minh_comp_code= $compcode order by minh_minno desc");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getSearchLedgerlist()
    {
        $party  = $_POST['party'];

        mysqli_set_charset($conn, "utf8");
        if ($party == '')
        $qry = "select * from maspur_supplier_master order by sup_name";
        else
        $qry = "select * from maspur_supplier_master where sup_name like '%$party%' order by sup_name";
   

        $r=mysqli_query($conn, $qry);
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 

?>
