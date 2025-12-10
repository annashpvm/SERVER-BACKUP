<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task='loadProdGroup';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadProdGroup":
		getVarMainGroup();
		break;

		case "loadhsnlist":
		gethsnlist();
		break;

		case "loadTNLedgers":
		getTNLedgers();
		break;

		case "loadOSLedgers":
		getOSLedgers();
		break;
		case "loadSEZLedgers":
		getSEZLedgers();
		break;

	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getVarMainGroup()
    {
        global $conn;  

//        $sql = "select a.*,b.cust_name tnledname,c.cust_name osledname  from masprd_type a, massal_customer b , massal_customer c  where a.tn_sales_ledcode = b.cust_code and a.os_sales_ledcode = c.cust_code order by vargrp_type_name");

        $sql = "select a.*,b.cust_name tnledname,c.cust_name osledname ,d.cust_name sezledname from masprd_type a, massal_customer b , massal_customer c, massal_customer d  where a.tn_sales_ledcode = b.cust_code and a.os_sales_ledcode = c.cust_code   and a.sez_sales_ledcode = d.cust_code order by vargrp_type_name";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
	
 function gethsnlist()
    {
        global $conn;  

        $sql = "select tariff_code,tariff_name from massal_tariff ";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


	
 function getTNLedgers()
    {
        global $conn;  

        $sql = "select * from massal_customer where cust_name like 'GST SAL%' order by cust_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getOSLedgers()
    {
        global $conn;  

        $sql = "select * from massal_customer where cust_name like 'IGST SAL%' order by cust_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getSEZLedgers()
    {
        global $conn;  

        $sql = "select * from massal_customer where cust_name like 'EXPORT SALES TO%' order by cust_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

?>
