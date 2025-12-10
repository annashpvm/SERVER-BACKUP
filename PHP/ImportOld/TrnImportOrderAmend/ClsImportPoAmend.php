<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConndpm.php");

    $task='loadsupplier';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadsupplier":
		getsupplier();
		break;
		case "loadamendno":
		getamendno();
		break;
		case "loadgetPONo":
		getponolist();
		break;
		case "loadgetPODetails":
		getponodetails();
		break;
		case "loadPODelvy":
		getPODelvy();
		break;
		case "taxdetails":
		gettax();
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
		case "loadcountry":
		getcountry();
		break;
		case "loadport":
		getportname();
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
	$supplierid = $_POST['supplierid'];
	$sql = "select sup_code,sup_refname from maspur_supplier_master  where sup_acc_group = '$supplierid' order by sup_refname");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


   
 function getamendno()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];

	
	$sql = "select IFNULL(max(amnh_seqno),0)+1 as amendno from trnirm_orderamnd_header");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getponolist()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$sql = "select ordh_no,ordh_seqno from trnirm_order_header where ordh_fincode = '$finid' and ordh_compcode='$compcode'");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getponodetails()
    {
        mysqli_set_charset($conn, "utf8");
	$ordno = $_POST['ordno'];
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];

	$sql = "call spirm_sel_ordno('$ordno','$compcode','$finid')");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



 function gettax()
    {
        mysqli_set_charset($conn, "utf8");
	$vendor = $_POST['Vendorcode'];
	$sql = "call sprm_sel_tax('$vendor')");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
 function getvendoradd()
    {
        mysqli_set_charset($conn, "utf8");
	$vendor = $_POST['Vendorcode'];
        $sql = "select sup_addr1,sup_addr2,sup_addr3 from maspur_supplier_master where sup_code = $vendor");
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

        $sql = "select itmh_code,itmh_name from masrm_item_header where itmh_type =3 order by itmh_name");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getcountry()
    {
        mysqli_set_charset($conn, "utf8");
        $sql = "select  country_name,country_code  from mas_country  order by country_name");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getportname()
    {
        mysqli_set_charset($conn, "utf8");
        $sql = "select port_name,port_code,port_country,port_description,port_type from mas_port  order by port_name");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getitemdet()
    {
        mysqli_set_charset($conn, "utf8");
        $itemcode = $_POST['itemcode'];
        $sql = "select itmh_moisture_per,itmh_tare_per,itmh_convlossper,itmh_outthrough,itmh_prohiper from masrm_item_header where itmh_code = $itemcode ");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getpaymode()
    {
        mysqli_set_charset($conn, "utf8");
        $sql = "select term_code,term_name from mas_terms");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getPODelvy()
    {
        mysqli_set_charset($conn, "utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$ordno = $_POST['ordno'];

	$sql = "call spirm_sel_delsch('$ordno')");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getcarriagetype()
    {
        mysqli_set_charset($conn, "utf8");
        $sql = "select carr_code,carr_name from mas_transport");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
?>
