<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadFinishedGoodsEntryNo';

	$task = $_POST['task'] ?? 'loadFinishedGoodsEntryNo';

    mysqli_set_charset($conn, "utf8");

    switch($task){
	
		case "loadInvoiceNoDetails":
		getInvoiceNoDetails();
		break;

		case "loadInvoiceList": 
		getInvoiceList();
		break;	

		default:
        	echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
    }

    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    


 function getInvoiceNoDetails()
    {
		global $conn;  

		$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$invno = $_POST['invno'];

    $sql = "select * from trnsal_invoice_header  where invh_fincode= $finid  and invh_comp_code= $compcode and invh_seqno = $invno order by invh_seqno";
	$r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    $nrow = mysqli_num_rows($r);
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';

    }

 function getInvoiceList()
    {

		global $conn;  
	$compcode = $_POST['compcode'];

	$sql= "select DATE_FORMAT(invh_date, '%d-%m-%Y') as invhdate, invh_seqno, invh_invrefno , cust_ref from trnsal_invoice_header , massal_customer where invh_party = cust_code and invh_comp_code = $compcode and invh_date >= NOW() - INTERVAL 2 DAY order by invh_seqno desc";
	$r = mysqli_query($conn, $sql);
	$nrow = mysqli_num_rows($r);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    $nrow = mysqli_num_rows($r);
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';


    }

?>
