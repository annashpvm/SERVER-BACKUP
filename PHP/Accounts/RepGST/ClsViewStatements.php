<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
    $task="loadHSNwiseSales";
    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysql_query("SET NAMES utf8");
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
        if (version_compare(PHP_VERSION,"5.2","<"))
        {    
            require_once("./JSON.php");   //if php<5.2 need JSON class
            $json = new Services_JSON();  //instantiate new json object
            $data=$json->encode($arr);    //encode the data in json format
        } else
        {
            $data = json_encode($arr);    //encode the data in json format
        }
        return $data;
    }
    


function getHSNwiseSales()
{
 mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	
        $r=mysql_query("call spacc_rep_hsnwise_sales($compcode,'$finid','$startdate','$enddate')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}



function getHSNwiseSalesAbstract()
{
 mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$gst_type   = $_POST['gst_type'];
	
        $r=mysql_query("call spacc_rep_hsnwise_sales_Abstract($compcode,'$finid','$startdate','$enddate')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}


function getInvoiceDetails()
{
 mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$voutype   = $_POST['voutype'];	
	$hsnno     = $_POST['hsnno'];	
        $r=mysql_query("call spacc_rep_hsnwise_sales_Detailed($compcode,'$finid','$startdate','$enddate','$hsnno', '$voutype')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}



function getDocumentSummary()
{
 mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$voutype   = $_POST['voutype'];	
        $r=mysql_query("call spacc_rep_gst_document_summary($compcode,'$finid','$startdate','$enddate')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}



function getDocSummaryInvoiceDetails()
{
 mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$voutype   = $_POST['voutype'];	
        $r=mysql_query("call spacc_rep_gst_document_summary_detailed($compcode,'$finid','$startdate','$enddate','$voutype')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}



function getGSTR1Abstract()
{
 mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	
        $r=mysql_query("call spsal_rep_GSTR1_Abstract_Main($compcode,'$finid','$startdate','$enddate')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}


function getGSTR1Detail()
{
 mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$gsttype   = $_POST['gsttype'];


        $r=mysql_query("call spsal_rep_GSTR1_Details($compcode,'$finid','$startdate','$enddate','$gsttype')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}


function getGSTR1DocumentWise()
{
 mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$gsttype   = $_POST['gsttype'];


        $r=mysql_query("call spsal_rep_GSTR1_Details_DocumentWise($compcode,'$finid','$startdate','$enddate','$gsttype')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}



function getGSTR1PartyDetail()
{
 mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$party     = $_POST['party'];	
	$gsttype   = $_POST['gsttype'];
        $r=mysql_query("call spsal_rep_GSTR1_Details_party($compcode,'$finid','$startdate','$enddate','$party','$gsttype ')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}


function getGSTR1LedgerAbstract()
{
 mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
        $r=mysql_query("call spsal_rep_GSTR1_Ledgwise_Details($compcode,'$finid','$startdate','$enddate')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}


function getGSTR1LedgerDetail()
{
 mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$ledname   = $_POST['ledname'];
	$grpcode   = $_POST['grpcode'];
        if ($grpcode == 1)
        $r=mysql_query("call spsal_rep_GSTR1_Ledgerwise_Sales_Details($compcode,'$finid','$startdate','$enddate','$ledname')");
        else if ($grpcode == 2)
        $r=mysql_query("call spsal_rep_GSTR1_Ledgerwise_OtherSales_Details($compcode,'$finid','$startdate','$enddate','$ledname')");

        if ($grpcode == 3)
        $r=mysql_query("call spsal_rep_GSTR1_Ledgerwise_Debit_Note($compcode,'$finid','$startdate','$enddate','$ledname')");
        if ($grpcode == 4)
        $r=mysql_query("call spsal_rep_GSTR1_Ledgerwise_Credit_Note($compcode,'$finid','$startdate','$enddate','$ledname')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}



function getGSTR2B_Details()
{
 mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$rmonth    = (int)$_POST['rmonth'];
	$ryear     = (int)$_POST['ryear'];
	$gst2b     = $_POST['gst2b'];
//        if ($gst2b == "ADD")
//           $r=mysql_query("call spacc_GSTR_2B($rmonth,$ryear,$compcode,'$startdate','$enddate')");
//        else


          $r=mysql_query("select * from GSTR_2B where gst_2b_month = $rmonth and  gst_2b_year = $ryear and  accrefno >0 order by cust_gstin,voudate;");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}




function getGSTR2B_Excess_Details()
{
 mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$rmonth    = (int)$_POST['rmonth'];
	$ryear     = (int)$_POST['ryear'];

//        $r="call spacc_GST_2B_Excess($rmonth,$ryear,$compcode)";
 //       echo $r;     

        $r=mysql_query("call spacc_GSTR_2B_Excess($rmonth,$ryear)");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}


function getGSTR2B_NotTally_Details()
{
 mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$rmonth    = (int)$_POST['rmonth'];
	$ryear     = (int)$_POST['ryear'];

        $r=mysql_query("call spacc_GSTR_2B_NotTallied_List($rmonth,$ryear)");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}


?>




