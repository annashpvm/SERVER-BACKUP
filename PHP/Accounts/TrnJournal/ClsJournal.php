<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadInvDetails';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    global $conn;

    switch($task){

		case "LoadJournalVoucherList":
		getJournalVoucherList();
		break;
		//case "LoadJournalVoucherDetails":
//		getJournalVoucherDetail();
		break;
             	case "loadSearchLedgerlist":
		getSearchLedgerlist();
		break;

        	case "LoadBillAdjustmentDetails":
		  getBillAdjustmentDetails();
                break;

		default:
        	echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
    }

    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    



 function getJournalVoucherList()

    {
  	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];      
        global $conn;
       $sql = "select * from acc_ref where accref_comp_code = '$compcode' and accref_finid = '$fincode' and accref_vou_type = 'GJV' order by substring(ltrim(accref_vouno),4,4) desc";
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

      $sql = "select * from massal_customer where  left(cust_name,2) != 'zz' and  replace(replace(cust_name,' ','')  ,'.','')  like '%$ledname%' order by cust_name";

  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 

/*
 function getJournalVoucherDetail()

    {
  	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
       	$vouno    = $_POST['vouno'];

        global $conn;
//        $sql = "select dbcr_vouno from acc_dbcrnote_header where dbcr_type = 'DNG' and dbcr_finid = '$fincode' and dbcr_comp_code = '$compcode' order by dbcr_vouno  desc";

$sql = "select * from acc_ref ref  join acc_tran tran on  tran.acctran_accref_seqno = ref.accref_seqno   join massal_customer mas on  tran.acctran_led_code = mas.led_code  where accref_vouno = '$vouno' and  accref_comp_code = $compcode and accref_finid = $fincode";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
*/



 function getBillAdjustmentDetails()
    {
        global $conn;
        $seqno = $_POST['seqno'];
        $compcode = $_POST['compcode'];
        $ledcode = $_POST['ledcode'];
        $dbcr = $_POST['dbcr']; 
        if ($dbcr == "P") 
        $sql = "select * from acc_adjustments , acc_trail  where acctrail_led_code =  $ledcode  and ref_compcode = $compcode and ref_adjseqno = acctrail_accref_seqno and acctrail_amtmode = 'D' and  ref_docseqno = $seqno";
        else
        $sql = "select * from acc_adjustments , acc_trail  where  acctrail_led_code =  $ledcode  and ref_compcode = $compcode and ref_adjseqno = acctrail_accref_seqno and acctrail_amtmode = 'C' and  ref_docseqno = $seqno";
  

//echo $sql;

  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 



?>
