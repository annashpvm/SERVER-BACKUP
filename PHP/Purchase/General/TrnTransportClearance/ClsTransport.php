<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loaditemgrp';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadsupplier":
		getsupplier();
		break;
		case "loadarea":
		getarea();
		break;
		case "loadtransport":
		gettransport();
		break;
		case "loaddocno":
		getdocno();
		break;

		case "loaddocnolist":
		getdocnolist();
		break;
		case "loaddocnodetail":
		getdocnodetail();
		break;

	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getsupplier()
    {
        mysqli_set_charset($conn, "utf8");
	$sql = "select sup_code,sup_refname from maspur_supplier_master where sup_grp_code<>11 order by sup_refname");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
	
function  getarea()
    {
        mysqli_set_charset($conn, "utf8");
        $sql = "select p_areacode,p_areaname from mas_pur_areamas order by p_areaname");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function gettransport()
    {
        mysqli_set_charset($conn, "utf8");
        $sql = "select sup_code,sup_refname from maspur_supplier_master where sup_grp_code=11 order by sup_refname");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getdocno()
    {
        mysqli_set_charset($conn, "utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
        $sql = "select ifnull(max(t_clr_no),0)+1 as docno from trnpur_trans_clearance where t_clr_company=$compcode and t_clr_finyear=$finid");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getdocnolist()
    {
        mysqli_set_charset($conn, "utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
        $sql = "select t_clr_no as docno from trnpur_trans_clearance where t_clr_company=$compcode and t_clr_finyear=$finid order by t_clr_no desc");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getdocnodetail()
    {
        mysqli_set_charset($conn, "utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
        $docno = $_POST['docno'];
        
        $r=mysql_query( "select * from trnpur_trans_clearance , maspur_supplier_master where sup_code = t_clr_frt_party and  t_clr_no = $docno and t_clr_company = $compcode and t_clr_finyear =$finid   order by t_clr_slno asc");

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


?>
