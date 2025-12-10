<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task="loadArrivals";

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
		

		case "loadMainGroupStockAbstract":
                getMainGroupStockAbstract();
		break;


		case "loadSubGroupStockAbstract":
                getSubGroupStockAbstract();
		break;

		case "loadSubGroupStockItemList":
                getSubGroupStockItemList();
		break;

		case "loadItemwiseStockSummary":
                getItemwiseStockSummary();
		break;

		case "loadItem_ledger_trans":
                getItem_ledger_trans();
		break;


	        default:
		break;
               	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    


function getMainGroupStockAbstract()
    {
        global $conn;

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];



        $sql = "call spst_rep_stock_groupsummary($compcode ,'$finid', '$startdate','$enddate')";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



function getSubGroupStockAbstract()
    {
        global $conn;

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$grpcode    = $_POST['grpcode'];
	$allitems    = $_POST['allitems'];


        $sql = "call spst_rep_stores_stock_SUBgroupsummary($compcode ,'$finid', '$grpcode', $allitems )";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



function getSubGroupStockItemList()
    {
        global $conn;

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$grpcode    = $_POST['grpcode'];
	$rtype       = $_POST['rtype'];
        if ($rtype  == 'GS')
            $sql = "call spst_rep_stores_stock_subgrp_Itemwise($compcode ,'$finid', '$grpcode' )";
        else
            $sql = "call sprm_stock_abstract($compcode ,$finid,'$startdate' ,'$enddate',1) ";



    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getItemwiseStock()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];

	$startdate = $_POST['startdate'];
        $enddate  = $_POST['enddate'];

  
        $sql = "call sprm_stock_abstract_New($compcode ,$finid,'$startdate' ,'$enddate',1) ";
	


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getItemwiseStockSummary()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$finstartdate = $_POST['finstartdate'];
	$startdate = $_POST['startdate'];
        $enddate  = $_POST['enddate'];
        $reptype  = $_POST['reptype'];
  
        if ($reptype  == 'WP')
           $sql = "call sprm_stock_abstract($compcode ,$finid,'$startdate' ,'$enddate',1) ";
        else
        $sql = "call spfu_op_trans($compcode ,$finid,'$finstartdate','$startdate', '$startdate' ,'$enddate',1) ";
	
	


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getItem_ledger_trans()
    {
        global $conn;

	$itemcode  = $_POST['itemcode'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
        $enddate   = $_POST['enddate'];
        $reptype  = $_POST['reptype'];
  
        if ($reptype  == 'WP')
            $sql = "call sprm_rep_item_ledger($compcode,'$startdate' ,'$enddate','$itemcode') ";
        else
            $sql = "call spfu_rep_item_ledger($compcode,'$startdate' ,'$enddate','$itemcode') ";   
	


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
?>




