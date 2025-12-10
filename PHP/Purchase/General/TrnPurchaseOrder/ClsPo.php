<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loaditemgrp';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loaddept":
		getdept();
		break;

		case "IndnoDetail":
		getIndnoDetail();
		break;
		case "Indnoqty":
		getIndnoqty();
		break;
		case "PonoDetail":
		getPonoDetail();
		break;
		case "loadsupplier":
		getsupplier();
		break;
		case "vendoradd":
		getvendoradd();
		break;
		case "LoadItem":
		getitem();
		break;

		case "itemdet":
		getitemdet();
		break;
		case "loadpaymode":
		getpaymode();
		break;
		case "loadcarrtype":
		getcarriagetype();
		break;
		case "Loadpoitemdetails":
		getpoitemdetails();
		break;
		case "loadPurGroup":
		getPurGroup();
		break;
		case "loadPONOList":
		getPONOList();
		break;


		case "LoadGSTDetails":
		findGSTDetails();
		break;

		case "loadPurchaseHead":
		getPurchaseHead();
		break;

		case "loadIndentSpec":
		getIndentSpec();
		break;

		case "loadUOM":
		getUOM();
		break;


		case "LoadStategstlist":
		getStategstlist();
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
	$sql = "select cust_code,cust_ref from massal_customer where cust_type != 'G'";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	function getdept()
    {
        global $conn;  
        $sql = "call sp_sel_dept_new()";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
 function getIndnoDetail()
    {
        global $conn;  
	$cmpcode = $_POST['cmpcode'];
	$finid = $_POST['finid'];
	$dept     = $_POST['dept'];
        $sql = "select ind_no,ind_fin_code from trnpur_indent where ind_hod_auth = 'Y' and ind_comp_code = '$cmpcode' and ind_fin_code = '$finid' and ind_qty > ind_rec_qty and  ind_cancel_status <> 'C' and ind_dept_code = '$dept' group by ind_no,ind_fin_code order by ind_no desc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 function getPonoDetail()
    {
        global $conn;  
	$cmpcode = $_POST['cmpcode'];
        $finid= $_POST['finid'];
//        $sql = "select ifnull(max(phd_pono),0)+1 as pono from   trnpur_purchase_header where phd_comp_code = '$cmpcode' and phd_fin_code = '$finid' ";
        $sql = "select ifnull(max(convert(phd_pono,signed)),0) +1 as pono from   trnpur_purchase_header where phd_comp_code = '$cmpcode' and phd_fin_code = '$finid' ";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getvendoradd()
    {
        global $conn;  
	$vendor = $_POST['vendor'];
        $sql = "select cust_add1,cust_add2,cust_add3,cust_city,cust_taxtag , cust_state from massal_customer where cust_code = $vendor";
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

	$indno = $_POST['indno'];
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];

        if ($indno == 0) 
        $sql = "select item_code,item_name from maspur_item_header order by item_name";
        else
        $sql = "select item_code,item_name,ind_date from trnpur_indent,maspur_item_header 
where ind_item_code = item_code and ind_no = '$indno' and ind_fin_code = '$finid' and ind_comp_code = '$compcode'";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }




 function getIndnoqty()
    {
        global $conn;  
	$indno = $_POST['indno'];
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$itmcode = $_POST['itmcode'];

//        $sql = "select ind_machine, ind_qty-ind_rec_qty from trnpur_indent,masrm_item_header, mas_uom 
//where ind_item_code = itmh_code and ind_no = '$indno' and ind_fin_code = '$finid' and ind_comp_code = '$compcode' and ind_item_code = '$itmcode'";

        $sql = "select ind_remarks,ind_machine, ind_qty-ind_rec_qty as ind_qty ,uom_short_name,uom_code from trnpur_indent,maspur_item_header, mas_uom  
where  uom_code = item_uom and ind_item_code = item_code and ind_no = '$indno' and ind_fin_code = '$finid' and ind_comp_code = '$compcode' and ind_item_code = '$itmcode'";


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
        $sql = "select itmh_moisture_per,itmh_tare_per from masrm_item_header";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getpaymode()
    {
        global $conn;  
        $sql = "select term_code,term_name from mas_terms order by term_name asc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getcarriagetype()
    {
        global $conn;  
        $sql = "select carr_code,carr_name from mas_transport order by carr_name asc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getpoitemdetails()
    {
	$pono     = $_POST['pono'];
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        global $conn;  
         $sql = "call sppur_sel_po_viewdetail($compcode,$finid,'$pono')";
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
         $sql = "select * from massal_customer where cust_type = 'G' and cust_acc_group in (74,75) order by cust_name";
         $sql = " select cust_code,cust_ref,cust_name from
(select cust_code,cust_ref,cust_name from massal_customer where cust_type = 'G' and cust_name regexp'%' and cust_acc_group not in (46,44,85,72)
union all
select cust_code,cust_ref,cust_name from massal_customer where cust_type = 'G' and cust_acc_group in (74,75) order by cust_name ) a where left(cust_name,2) != 'ZZ'  group by cust_code,cust_ref,cust_name order by cust_name";


        $sql = "select * from maspur_gsttax where tax_state = '$statecode' order by tax_pur_ledname";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


function getPONOList()
    {

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        global $conn;  
//         $sql = "select * from acc_ledger_master  where led_type = 'G' and  led_grp_code in (74,75)";
         $sql = "select * from trnpur_purchase_header where phd_fin_code = $finid  AND  phd_comp_code = $compcode order by convert(phd_pono,signed) desc";
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


 function getPurchaseHead()
    {
        global $conn;  
        $ledcode = $_POST['ledcode'];

        $sql = "select * from mas_dept where dept_code = 13";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getIndentSpec()
    {
        global $conn;  
	$indno = $_POST['indno'];
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$itemcode = $_POST['itemcode'];


        $sql = " select * from trnpur_indent where ind_comp_code = $compcode and ind_fin_code = $finid and ind_no = $indno and ind_item_code = $itemcode";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getUOM()
    {
        global $conn;  


        $sql = " select * from mas_uom order by uom_short_name";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



?>
