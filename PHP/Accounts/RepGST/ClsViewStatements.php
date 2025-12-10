<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
    $task="loadHSNwiseSales";
    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    global $conn;
    switch($task){
		case "loadHSNwiseSales":
		getHSNwiseSales();
		break;

		case "loadHSNwiseSalesAbstract":
		getHSNwiseSalesAbstract();
		break;

		case "loadInvoiceDetails":
		getInvoiceDetails();
		break;

		case "loadDocumentSummary":
		getDocumentSummary();
		break;

		case "loadDocSummaryInvoiceDetails":
		getDocSummaryInvoiceDetails();
		break;

		case "loadGSTR1Abstract":
		getGSTR1Abstract();
		break;


		case "loadGSTR1Detail":
		getGSTR1Detail();
		break;

		case "loadGSTR1PartyDetail":
		getGSTR1PartyDetail();
		break;

		case "loadGSTR1LedgerAbstract":
		getGSTR1LedgerAbstract();
		break;

		case "loadGSTR1LedgerDetail":
		getGSTR1LedgerDetail();
		break;

		case "loadGSTR2B_Details":
		getGSTR2B_Details();
		break;


		case "loadGSTR2B_Excess_Details":
		getGSTR2B_Excess_Details();
		break;


		case "loadGSTR2B_NotTally_Details":
	        getGSTR2B_NotTally_Details();
		break;

		case "loadGSTR1DocumentWise":
		getGSTR1DocumentWise();
		break;

		default:
               	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    


function getHSNwiseSales()
{
 global $conn;

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	
        $sql = "call spacc_rep_hsnwise_sales($compcode,'$finid','$startdate','$enddate')";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
}



function getHSNwiseSalesAbstract()
{
 global $conn;

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$gst_type   = $_POST['gst_type'];
	
        $sql = "call spacc_rep_hsnwise_sales_Abstract($compcode,'$finid','$startdate','$enddate')";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
}


function getInvoiceDetails()
{
 global $conn;

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$voutype   = $_POST['voutype'];	
	$hsnno     = $_POST['hsnno'];	
        $sql = "call spacc_rep_hsnwise_sales_Detailed($compcode,'$finid','$startdate','$enddate','$hsnno', '$voutype')";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
}



function getDocumentSummary()
{
 global $conn;

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$voutype   = $_POST['voutype'];	
        $sql = "call spacc_rep_gst_document_summary($compcode,'$finid','$startdate','$enddate')";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
}



function getDocSummaryInvoiceDetails()
{
 global $conn;

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$voutype   = $_POST['voutype'];	
        $sql = "call spacc_rep_gst_document_summary_detailed($compcode,'$finid','$startdate','$enddate','$voutype')";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
}



function getGSTR1Abstract()
{
 global $conn;

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	
        $sql = "call spsal_rep_GSTR1_Abstract_Main($compcode,'$finid','$startdate','$enddate')";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
}


function getGSTR1Detail()
{
 global $conn;

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$gsttype   = $_POST['gsttype'];


        $sql = "call spsal_rep_GSTR1_Details($compcode,'$finid','$startdate','$enddate','$gsttype')";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
}


function getGSTR1DocumentWise()
{
 global $conn;

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$gsttype   = $_POST['gsttype'];


        $sql = "call spsal_rep_GSTR1_Details_DocumentWise($compcode,'$finid','$startdate','$enddate','$gsttype')";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
}



function getGSTR1PartyDetail()
{
 global $conn;

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$party     = $_POST['party'];	
	$gsttype   = $_POST['gsttype'];
        $sql = "call spsal_rep_GSTR1_Details_party($compcode,'$finid','$startdate','$enddate','$party','$gsttype ')";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
}


function getGSTR1LedgerAbstract()
{
 global $conn;

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
        $sql = "call spsal_rep_GSTR1_Ledgwise_Details($compcode,'$finid','$startdate','$enddate')";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
}


function getGSTR1LedgerDetail()
{
 global $conn;

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$ledname   = $_POST['ledname'];
	$grpcode   = $_POST['grpcode'];
        if ($grpcode == 1)
        $sql = "call spsal_rep_GSTR1_Ledgerwise_Sales_Details($compcode,'$finid','$startdate','$enddate','$ledname')";
        else if ($grpcode == 2)
        $sql = "call spsal_rep_GSTR1_Ledgerwise_OtherSales_Details($compcode,'$finid','$startdate','$enddate','$ledname')";

        if ($grpcode == 3)
        $sql = "call spsal_rep_GSTR1_Ledgerwise_Debit_Note($compcode,'$finid','$startdate','$enddate','$ledname')";
        if ($grpcode == 4)
        $sql = "call spsal_rep_GSTR1_Ledgerwise_Credit_Note($compcode,'$finid','$startdate','$enddate','$ledname')";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
}



function getGSTR2B_Details()
{
 global $conn;

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$rmonth    = (int)$_POST['rmonth'];
	$ryear     = (int)$_POST['ryear'];
	$gst2b     = $_POST['gst2b'];
//        if ($gst2b == "ADD")
//           $sql = "call spacc_GSTR_2B($rmonth,$ryear,$compcode,'$startdate','$enddate')";
//        else


          $sql = "select * from GSTR_2B where gst_2b_month = $rmonth and  gst_2b_year = $ryear and  accrefno >0 order by cust_gstin,voudate;";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
}




function getGSTR2B_Excess_Details()
{
 global $conn;

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$rmonth    = (int)$_POST['rmonth'];
	$ryear     = (int)$_POST['ryear'];

//        $r="call spacc_GST_2B_Excess($rmonth,$ryear,$compcode)";
 //       echo $r;     

        $sql = "call spacc_GSTR_2B_Excess($rmonth,$ryear)";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
}


function getGSTR2B_NotTally_Details()
{
 global $conn;

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$rmonth    = (int)$_POST['rmonth'];
	$ryear     = (int)$_POST['ryear'];

        $sql = "call spacc_GSTR_2B_NotTallied_List($rmonth,$ryear)";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
}


?>




