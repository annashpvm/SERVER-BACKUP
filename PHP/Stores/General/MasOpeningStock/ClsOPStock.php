<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loaditem';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loaditem":
		getitem();
		break;
		case "loadparty":
		getparty();
		break;
		case "loadchkrate":
		getchkrate();
		break;

		case "loadStockList":
		getStockList();
		break;

		case "loadSearchitemlist":
		getSearchitemlist();
		break;

		case "loadunit":
		getunit();
		break;


		case "loadLocation":
		getLocation();
		break;

	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }

function getlot()
{
        global $conn; 
	$sql = "call sp_sel_lot";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getitem()
    {
        global $conn; 
	$p_itemtype = $_POST['itemtype'];
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$sql = "call spfu_sel_itemdetails";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
	
 function getparty()
    {
        global $conn; 
        $sql = "call sp_pur_supplier_actgrp (53)";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getchkrate()
    {
        global $conn; 
	$itemcode = $_POST['itemcode'];
	$lotcode = $_POST['lotcode'];
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];

        $sql = "call spfu_sel_lotitem_stock('$compcode','$finid','$lotcode','$itemcode')";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getStockList()
    {
        global $conn; 

	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];


        $sql = "select * from maspur_item_header h, maspur_item_trailer t ,mas_uom u  where item_uom = uom_code and h.item_code = t.item_code and  item_comp_code = $compcode and item_fin_code = $finid and (item_yr_opval > 0 or item_yr_opqty > 0) order by item_name;";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getSearchitemlist()
    {
        global $conn; 
//        $sql = "select hsn_code,hsn_sno from mas_hsncode order by hsn_code";

	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $item     = $_POST['item'];


//        $qry = "select * from maspur_item_header where item_name like '%$item%'";
        $item = trim(str_replace(" ", "", $item)); 
        $item = trim(str_replace(".", "", $item));


        if ($item == '')   
           $qry = "select * from maspur_item_header  order by item_name";
        else
           $qry = "select * from maspur_item_header where replace(replace(item_name,' ','')  ,'.','') like '%$item%' order by item_name";         

        $r=mysqli_query($conn, $qry);
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getunit()
    {
        global $conn; 
        $sql = "select uom_name,uom_code  from mas_uom where uom_name not like 'ZZ%' and (uom_code <=103 or uom_code >136)order by uom_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getLocation()
    {
        global $conn; 
        $sql = "select * from maspur_location";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


?>
