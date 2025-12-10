<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task='loadVarMainGroup';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }

    mysqli_set_charset($conn, "utf8");

    switch($task){
		case "loadVarMainGroup":
		getVarMainGroup();
		break;

		case "loadVarietydetails":
		getVarietydetails();
		break;
		case "viewquality":
		getquality();
		break;

		case "loadhsnlist":
		gethsnlist();
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

        $sql = "select vargrp_type_code,vargrp_type_name from masprd_type order by vargrp_type_name";
        $r = mysqli_query($conn, $sql);
        $arr = [];
        while ($re = mysqli_fetch_assoc($r)) {
           $arr[] = $re;
        }

    echo json_encode(["total" => count($arr), "results" => $arr]);
}
 
	
function getQuality()
    {
        global $conn;  
	$qcode = $_POST['qcode'];

        $sql = "select vargrp_type_code,vargrp_type_name,vargrp_type_short_code from masprd_type  where vargrp_type_code = $qcode";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
function getVarietydetails()
    {
        global $conn;  
	$qcode = $_POST['qcode'];

        $sql = "select var_groupcode, var_desc, var_typecode, var_bf, var_gsm, vargrp_type_code, vargrp_type_name, vargrp_type_short_code, vargrp_type_hsncode from masprd_variety a, masprd_type b where  a.var_typecode = b.vargrp_type_code order by var_desc";
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

?>
