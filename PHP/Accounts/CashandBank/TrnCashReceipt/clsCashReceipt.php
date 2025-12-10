<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='LoadCRVoucherDetails';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
mysqli_set_charset($conn, "utf8");
    switch($task){


	case "LoadCRVoucherDetails":
		getCRVoucherDetail();
            break;
	case "LoadBillAdjustmentDetails":
		getBillAdjustmentDetails();
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

 function getCRVoucherDetail()

    {
  	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
       	$vouno    = $_POST['vouno'];

        global $conn;
//        $sql = "select dbcr_vouno from acc_dbcrnote_header where dbcr_type = 'DNG' and dbcr_finid = '$fincode' and dbcr_comp_code = '$compcode' order by dbcr_vouno  desc";

$sql = "select * from acc_ref ref  join acc_tran tran on  tran.acctran_accref_seqno = ref.accref_seqno   join massal_customer mas on  tran.acctran_led_code = mas.cust_code  where  acctran_led_code <> 2139 and accref_vouno = '$vouno' and  accref_comp_code = $compcode and accref_finid = $fincode";



$sql = "select * from acc_ref ref  join acc_tran tran on  tran.acctran_accref_seqno = ref.accref_seqno   join massal_customer mas on  tran.acctran_led_code = mas.cust_code  where  acctran_led_code <> 2139 and accref_vouno = '$vouno' and  accref_comp_code = $compcode and accref_finid = $fincode";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getSearchLedgerlist()
    {
        global $conn;


        $ledname = strtoupper($_POST['ledger']);
        $ledname = trim(str_replace(" ", "", $ledname)); 
        $ledname = trim(str_replace(".", "", $ledname)); 


      $sql = "select * from massal_customer where replace(replace(cust_name,' ','')  ,'.','')  like '%$ledname%' order by cust_name";

  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }  




 function getBillAdjustmentDetails()
    {
        global $conn;
        $seqno = $_POST['seqno'];
        $sql = "select * from acc_adjustments where ref_docseqno = $seqno";
  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


?>
