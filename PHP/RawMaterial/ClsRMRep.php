<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadrepno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadrepno":
		getrepno();
		break;
		case "loadMonthPOs":
		getMonthPOs();
		break;
		case "loadMonthPODetails":
		getMonthPODetails();
		break;
		case "loadMonthGRNs":
		getMonthGRNs();
		break;
		case "loadMonthGRNDetails":
		getMonthGRNDetails();
		break;


	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getrepno()
    {
        mysqli_set_charset($conn, "utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$repname = $_POST['repname'];
	
	if($repname === "GRN") {
		$sql = "select rech_seqno as seqno,rech_no as repno from trnrm_receipt_header  where rech_fincode= '$finid' and rech_compcode = '$compcode' order by rech_no");

	}
	else if ($repname === "PO") {
		$sql = "select ordh_seqno as seqno,ordh_no as repno from trnrm_order_header  where ordh_fincode= '$finid' and ordh_compcode = '$compcode' order by ordh_no");
	}

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getMonthPOs()
    {
        mysqli_set_charset($conn, "utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];

	$sql = "select UPPER(monthname(ordh_date))  as rmonth , count(*) as nos, sum(ordh_totalvalue) as purvalue  from trnrm_order_header  where ordh_fincode = '$finid' and ordh_compcode = '$compcode' and ordh_date >= '$startdate' and ordh_date <= curdate()  group by UPPER(monthname(ordh_date)) ");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getMonthPODetails()
    {
        mysqli_set_charset($conn, "utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];


        $sql = " select ordh_no , ordh_date,sup_refname,itmh_name,ordt_qty,ordt_item_value  from trnrm_order_header a, trnrm_order_trailer b , masrm_item_header c , massal_customer d  where  ordh_sup_code = cust_code and  ordh_compcode = $compcode and ordh_fincode = $finid and ordh_seqno =ordt_hdseqno and  ordt_item_code = itmh_code and ordh_date between '$startdate' and '$enddate' order by ordh_seqno desc");

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getMonthGRNs()
    {
        mysqli_set_charset($conn, "utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];

	$sql = "select UPPER(monthname(rech_date))  as rmonth , count(*) as nos, sum(rech_totalamount) as purvalue  from trnrm_receipt_header  where rech_fincode = '$finid' and rech_compcode = '$compcode' and rech_date >= '$startdate' and rech_date <= curdate()  group by UPPER(monthname(rech_date)) ");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getMonthGRNDetails()
    {
        mysqli_set_charset($conn, "utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];

	$sql = "select * from trnrm_receipt_header a, trnrm_receipt_trailer b , masrm_item_header c , massal_customer where  rech_sup_code = cust_code and rech_fincode = '$finid' and rech_compcode = '$compcode' and rech_seqno = rect_hdseqno and  rect_item_code = itmh_code and rech_date between '$startdate' and '$enddate' order by rech_seqno");

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

?>
