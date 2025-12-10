<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task="LoadBankSupplierList";

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysqli_set_charset($conn, "utf8");
    switch($task){
		case "LoadBankSupplierList":
		getBankSupplierList();
		break;
		case "LoadPartyBank":
		getPartyBank();
		break;
		case "LoadEntryNo":
		getEntryNo();
		break;
		case "loadEntNoList":
		getEntNoList();
		break;
		case "loadEntNoDetail":
		getEntNoDetail();
		break;
		case "loadSearchPartylist":
		getSearchPartylist();
		break;
	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   

 function getBankSupplierList()
    {
        global $conn; 

        $sql = "select suppliercode, sup_refname, sup_bank_bankname, sup_bank_branch, sup_bank_ifsc, sup_bank_bank_acno from  maspur_supplier_bank , maspur_supplier_master where sup_code = suppliercode";


        $sql = "select * from  maspur_supplier_bank order by sup_name";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getPartyBank()
    {
        global $conn; 
   	$suppcode = $_POST['suppcode'];
        $sql = "select * from  maspur_supplier_bank where suppliercode = $suppcode";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getEntryNo()
    {
        global $conn; 
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
        $sql = "select ifnull(max(f_frm_no),0)+1 as f_frm_no from trn_frm where f_compcode= '$compcode' and f_fincode= '$finid'";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 
function getEntNoList()
    {
        global $conn; 
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
        $sql = "select f_frm_no from trn_frm where f_compcode= '$compcode' and f_fincode= '$finid' group by f_frm_no  order by f_frm_no desc ";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


function getEntNoDetail()
    {
        global $conn; 
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$entno = $_POST['entno'];

//        $sql = "select  * from trn_frm , maspur_supplier_master where f_partycode = sup_code and  f_compcode= '$compcode' and f_fincode= '$finid ' and f_frm_no = $entno  order by f_sno ";
        $sql = "select  * from trn_frm where f_compcode= '$compcode' and f_fincode= '$finid ' and f_frm_no = $entno  order by f_sno";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getSearchPartylist()
    {
        global $conn; 
        $party     = $_POST['party'];
      
        if ($party == '')
        $qry = "select * from maspur_supplier_bank order by sup_name";
        else
        $qry = "select * from maspur_supplier_bank where sup_name like '%$party%' order by sup_name";
   

        $r=mysqli_query($conn, $qry);
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


?>
