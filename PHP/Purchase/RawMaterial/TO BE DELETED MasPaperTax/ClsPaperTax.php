<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task="LoadSalesLedger";

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
		case "LoadPurchaseLedger":
		getPurLedgerList();
		break;
		case "LoadInvtype":
		getInvtype();
		break;
		case "LoadgstLedger":
		getgstledger();
		break;
		case "LoadTaxList":
		getgstlist();
		break;
	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   

 function getPurLedgerList()
    {
        mysqli_set_charset($conn, "utf8");

        $sql = "select * from acc_ledger_master where led_type = 'G' and led_name like '%WASTE%' and led_grp_code = 75");
        $sql = "select * from acc_ledger_master where led_type = 'G' and led_name like '%WASTE%'");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getgstledger()
    {
        mysqli_set_charset($conn, "utf8");
        $gsttype = $_POST['gsttype'];
        $gst = $_POST['gst'];

//        $gsttype = '%CGST%LIA%';
//        $gst = '2.5';



        $sql = "select * from acc_ledger_master where led_type = 'G' and led_name like '$gsttype%$gst%'");

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getgstlist()
    {
        mysqli_set_charset($conn, "utf8");
        $sql = "select * from mas_tax order by tax_code");

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
 function getInvtype()
    {
        mysqli_set_charset($conn, "utf8");

        $sql = "select * from massal_invtype where type_code <6");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
		


?>
