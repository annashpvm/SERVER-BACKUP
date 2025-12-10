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
             	case "findGSTDetails":
		getGSTDetails();
		break;	

		case "loadSearchitemlist":
		getSearchitemlist();
		break;


		case "LoadGSTDetails":
		findGSTDetails();
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
        global $conn;
	$sql = "select cust_ref,cust_code from massal_customer where cust_type != 'G' order by cust_ref;";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
	
 function getgrnno()
    {
        global $conn;
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $purtype  = $_POST['purtype'];
        if ($finid < 24)
        $sql = "select ifnull(max(minh_minno),0)+1 as grnno from trnpur_min_header where   minh_fin_code=$finid  and minh_comp_code= $compcode";
        else
   
        $sql = "select ifnull(max(convert(substring(minh_minno,3),signed)),0) +1 as grnno from trnpur_min_header where minh_fin_code = $finid and minh_comp_code = $compcode";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function gettransno()
    {
        global $conn;
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$supcode = $_POST['supcode'];
	$sql = "select t_clr_no from trnpur_trans_clearance where t_clr_company = $compcode and t_clr_finyear = $finid and t_clr_minno = 0 and t_clr_paymode = 'Y' and t_clr_grn_party = $supcode group by t_clr_no order by t_clr_no";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


function gettransdetail()
    {
        global $conn;
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$supcode = $_POST['supcode'];
	$docno = $_POST['docno'];


$sql = "select sup_refname,t_clr_frt_party, t_clr_lrno,t_clr_lrdt,sum(t_clr_freight) as frt , sum(t_clr_demurrage) + sum(t_clr_coolie) + sum(t_clr_others) as othexp , sum(t_clr_cgst_per) as ccgstper , sum(t_clr_sgst_per) as csgstper , sum(t_clr_igst_per) as cigstper from trnpur_trans_clearance , massal_customer where cust_code = t_clr_frt_party and  t_clr_company = $compcode and t_clr_finyear = $finid and t_clr_minno = 0 and t_clr_paymode = 'Y' and t_clr_grn_party = $supcode and t_clr_no = $docno";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getpono()
    {
        global $conn;
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$flag = $_POST['flag'];
	$supcode = $_POST['supcode'];
	$searchedby = $_POST['searchedby'];
	$itemcode = $_POST['itemcode'];

	if($flag=="I")
	{
	$sql = "call sppur_pending_indent($compcode,$finid)";


	}
	else
	{
         if ($searchedby == 'supplier')
             $sql = "call sppur_pending_po('$compcode','$finid','$supcode')";
         else
             $sql = "call sppur_pending_po_supplier_withitem('$compcode','$finid','$supcode','$itemcode')";

             

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
        global $conn;
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
//	$flag     = $_POST['flag'];
	$grnno    = $_POST['grnno'];
        $purtype  = $_POST['purtype'];


	$query1 = "select minh_grn_status from trnpur_min_header where minh_comp_code = $compcode and minh_fin_code = $finid and minh_minno = '$grnno';";
	$result1 = mysqli_query($conn, $query1);
	$rec1 = mysqli_fetch_array($result1);
	$grnStatus =$rec1['minh_grn_status'];
           
        if ($grnStatus == "C")
	{
//	$sql = "call sppur_sel_mindetails('$compcode','$finid','$grnno','$purtype')";

	$sql = "call sppur_sel_mindetails('$compcode','$finid','$grnno')";
	}
      
        else
        {
	$sql = "call sppur_sel_mindetails2('$compcode','$finid','$grnno')";
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
        global $conn;
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$pono    = $_POST['pono'];

	$sql = "select   ptr_podate  podate ,ptr_ind_no  indno, ptr_ind_fin_code  indfincode,phd_credit_days,phd_tol from trnpur_purchase_trailer a,   trnpur_purchase_header b where 
phd_comp_code = ptr_comp_code and phd_fin_code  = ptr_fin_code  and phd_pono = ptr_pono  and
phd_comp_code = $compcode and phd_fin_code  = $finid and  phd_pono = '$pono' and (ptr_ord_qty-ptr_rec_qty)> 0  group by  ptr_podate,ptr_ind_no , ptr_ind_fin_code";
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
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$flag     = $_POST['flag'];
	$pono    = $_POST['pono'];
	$indno    = $_POST['indno'];
	$supcode  = $_POST['supcode'];
	if($flag=="N") 
	{
	$sql = "select item_code ptr_item_code, item_name from maspur_item_header order by item_name";
	}
	elseif($flag=="I") 
	{
	$sql = "call sppur_ind_details_items('$compcode','$finid','$indno')";
	}
	else
	{
//	$sql = "call sppur_po_details_new('$compcode','$finid','$supcode','$indno')";

	$sql = "select * from trnpur_purchase_header a,  trnpur_purchase_trailer b , maspur_item_header c , mas_uom d where phd_sup_code = $supcode and phd_comp_code = ptr_comp_code and phd_fin_code = ptr_fin_code  and phd_pono = ptr_pono and phd_comp_code = $compcode and phd_fin_code = $finid and phd_pono = '$pono'  and ptr_pono = '$pono' and ptr_ind_no = $indno and ptr_item_code = item_code and item_uom = uom_code and (ptr_ord_qty-ptr_rec_qty)> 0 ";


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
        global $conn;
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$flag     = $_POST['flag'];
	$pono    = $_POST['pono'];
	$indno    = $_POST['indno'];
	$supcode  = $_POST['supcode'];
	$item     = $_POST['itemcode'];

	if($flag=="I") 
	{
$sql = "select * from trnpur_indent a, maspur_item_header b , mas_uom c  where ind_comp_code ='$compcode' and ind_fin_code = '$finid'  and ind_item_code = item_code and item_uom = uom_code and ind_qty > ind_rec_qty  and ind_no = '$indno'  and ind_item_code ='$item'";

	}
	else
	{
	$sql = "select * from trnpur_purchase_header a,  trnpur_purchase_trailer b , maspur_item_header c , mas_uom d where phd_sup_code = $supcode and phd_comp_code = ptr_comp_code and phd_fin_code = ptr_fin_code  and phd_pono = ptr_pono and phd_comp_code = $compcode and phd_fin_code = $finid and phd_pono = '$pono'  and ptr_ind_no = $indno  and ptr_item_code = $item and ptr_item_code = item_code and ptr_uom = uom_code ";

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
        global $conn;
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$indno = $_POST['indno'];
	
	$sql = "call sppur_ind_details_items('$compcode','$finid','$indno')";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }*/

function getitemtax()
{
        global $conn;
	$cgstper = $_POST['cgstper'];
	$sgstper = $_POST['sgstper'];
	$igstper = $_POST['igstper'];
	
	$sql = "select * from maspur_gsttax where tax_gst_per = $cgstper";
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

	$statecode = $_POST['statecode'];


        global $conn;
//         $sql = "select * from massal_customer  where cust_type = 'G' and  cust_acc_group in (74,75) order by cust_name";

         $sql = "select  * from maspur_gsttax order by tax_pur_ledname";
         $sql = "select * from maspur_gsttax where tax_state = '$statecode' order by tax_pur_ledname";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getgrnnolist()
    {
        global $conn;
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $purtype  = $_POST['purtype'];

        $sql = "select minh_minno from trnpur_min_header where minh_purtype = '$purtype' and  minh_fin_code=$finid  and minh_comp_code= $compcode order by minh_minno desc";

        $sql = "select minh_minno from trnpur_min_header where  minh_fin_code=$finid  and minh_comp_code= $compcode order by minh_minno desc";
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
        $party = trim(str_replace(" ", "", $party)); 
        $party = trim(str_replace(".", "", $party)); 
        global $conn;
//        if ($party == '')
//        $sql = "select * from massal_customer where left(cust_name,2) != 'ZZ' order by cust_name";
//        else


        $sql = "select * from massal_customer where left(cust_name,2) != 'ZZ'  and cust_type != 'G' and replace(replace(cust_name,' ','')  ,'.','') like '%$party%' order by cust_name";
   
   //  $sql = "select * from massal_customer where cust_name like '%$party%' order by cust_name";
   
  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 

 function getGSTDetails()
    {
        $tax  = (float) $_POST['gst'];

        $sql = "select * from  mas_purchasetax  where tax_gst = $tax";
  
  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 


 function getSearchitemlist()
    {
        global $conn;
//        $sql = "select hsn_code,hsn_sno from mas_hsncode order by hsn_code";

	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $item     = $_POST['item'];

        $item = trim(str_replace(" ", "", $item)); 
        $item = trim(str_replace(".", "", $item));


        if ($item == '')   
           $sql = "select * from maspur_item_header  order by item_name";
        else
           $sql = "select * from maspur_item_header where replace(replace(item_name,' ','')  ,'.','') like '%$item%' order by item_name";         




//$sql = "select * from maspur_item_header where item_name like '%$item%' order by item_name";


  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function findGSTDetails()
    {
        global $conn;
        $ledcode = $_POST['ledcode'];

        $sql = "select * from maspur_gsttax where tax_pur_ledcode = $ledcode";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
?>
