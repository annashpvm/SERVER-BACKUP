<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadGroupDetails';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysql_query("SET NAMES utf8");
    switch($task){
  	case "loadGroupDetails":
             get_Group_Details();
             break;
  	case "loadSubGroupDetails":
             get_SubGroup_Details();
             break;
  	case "loadItemDetails":
             get_Item_Details();
             break;

  	case "loadItemLedgerDetails":
             get_Item_Ledger_Details();
             break;

  	case "loadDeliveryChallan":
             getDeliveryChallanList();
             break;

  	case "loadReturnablePendingList":
             getReturnablePendingList();
             break;

  	case "loadDeliveryReceipts":
             getDeliveryReceipts();
            break;

  	case "loadDatewiseIssue":
             getDatewiseIssue();
            break;

  	case "loadDeptDatewiseIssue":
             getDeptDatewiseIssue();
            break;


  	case "loadDeptwiseIssue":
             getDeptwiseIssue();
            break;


	case "loadUOM":
	getunit();
	break;

	case "loadDatewiseDebitNote":
	getDatewiseDebitNote();
	break;

  	case "loadReturnablePendingListDatewise":
             getReturnablePendingListDatewise();
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
    


 function get_Group_Details()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	
        $r = mysql_query("call spst_rep_stock_maingrp($compcode,$finid,'$startdate', '$enddate')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function get_SubGroup_Details()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$grpcode = $_POST['grpcode'];	
        $r = mysql_query("call spst_rep_stock_subgrp($compcode,$finid,'$startdate', '$enddate',$grpcode)");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function get_Item_Details()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$grpcode = $_POST['grpcode'];	
        $r = mysql_query("call spst_rep_stock_itemwise($compcode,$finid,'$startdate', '$enddate',$grpcode)");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function get_Item_Ledger_Details()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$itemcode = $_POST['itemcode'];	
        $r = mysql_query("call sp_pur_rep_item_storeledger($compcode,$finid,$itemcode)");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getDeliveryChallanList()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$asondate = $_POST['asondate'];	
	$fromdate = $_POST['fromdate'];	
	$todate   = $_POST['todate'];	
        $repopt   = $_POST['repopt'];	
        $r = mysql_query("call sprep_stores_return_pendinglist($compcode,$finid,'$asondate','$fromdate','$todate',$repopt )");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getReturnablePendingList()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$asondate = $_POST['asondate'];	
	$fromdate = $_POST['fromdate'];	
	$todate   = $_POST['todate'];	
        $repopt   = $_POST['repopt'];	
        $r = mysql_query("call sprep_stores_return_pendinglist($compcode,$finid,'$asondate','$fromdate','$todate',$repopt )");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getReturnablePendingListDatewise()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$asondate = $_POST['asondate'];	
	$fromdate = $_POST['fromdate'];	
	$todate   = $_POST['todate'];	
        $repopt   = $_POST['repopt'];	
        $r = mysql_query("call sprep_stores_return_pendinglist($compcode,$finid,'$asondate','$fromdate','$todate',$repopt )");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 function getDeliveryReceipts()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$fromdate = $_POST['fromdate'];	
	$todate   = $_POST['todate'];	



        $r = mysql_query("select *, DATE_FORMAT(dcr_date, '%d-%m-%Y') dcr_date2,DATE_FORMAT(dcr_dcdate, '%d-%m-%Y') dcr_dcdate2 from  trnpur_deliverychallan_header, trnpur_deliverychallan_receipt ,trnpur_deliverychallan_trailer ,maspur_item_header , mas_uom , massal_customer   where  dcr_party = cust_code and dct_item_code = item_code and item_uom = uom_code and  dch_comp_code = dct_comp_code and dch_fincode = dct_fincode and dch_no = dct_no and  dcr_comp_code = dct_comp_code and dcr_dcfincode = dct_fincode and dcr_dcno = dct_no and  dcr_itemcode = dct_item_code  and dch_type = 'R' and  dcr_comp_code = $compcode and dcr_fincode = $finid and dcr_date between '$fromdate' and '$todate'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


	
 function getunit()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select uom_name,uom_code  from mas_uom where uom_name not like 'ZZ%' and (uom_code <=103 or uom_code >136)order by uom_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getDatewiseIssue()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$fromdate = $_POST['fromdate'];	
	$todate   = $_POST['todate'];	
        $r = mysql_query("call spst_rep_datewise_issues($compcode,$finid,'$fromdate','$todate')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getDeptDatewiseIssue()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$fromdate = $_POST['fromdate'];	
	$todate   = $_POST['todate'];	
	$dept     = $_POST['deptcode'];	

        $r = mysql_query("call spst_rep_SelectiveDepartment_issues($compcode,'$fromdate','$todate',$dept)");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getDeptwiseIssue()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$fromdate = $_POST['fromdate'];	
	$todate   = $_POST['todate'];	
        $r = mysql_query("call spst_rep_deptwise_issues($compcode,'$fromdate','$todate')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getDatewiseDebitNote()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$fromdate = $_POST['fromdate'];	
	$todate   = $_POST['todate'];	
	$dntype   = $_POST['dntype'];	

      //  $r = "call sppur_debit_notelist($compcode,$finid,'$fromdate','$todate','$dntype')";
//        echo $r;

        $r = mysql_query("call sppur_debit_notelist($compcode,$finid,'$fromdate','$todate','$dntype')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

?>
