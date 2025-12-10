<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadledger';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadLedgerDetails":
		getLedgerDetails();
		break;
		case "loadreportgrp":
		getreportgroup();
		break;
		case "loadParentGroup":
		getParentGroup();
		break;
		case "loadSubGroup":
		getSubGroup();
		break;
		case "loadLedgerBills":
		getLedgerBills();
		break;
	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getLedgerDetails()
    {
        global $conn;
       	$grpcode = $_POST['grpcode'];
	$sql = "select cust_code,cust_name from massal_customer where cust_type != 'G' order by cust_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
 function getreportgroup()
    {
        global $conn;
	$sql = "select rep_grp_code,rep_grp_name from maspur_report_group";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }	
  function getParentGroup()
    {
        global $conn;
	$sql = "select child1.grp_code subgrpcode, concat(child1.grp_name, ' - ' ,parent.grp_name) subgrpname , parent.grp_code parentgrpcode,parent.grp_name parentgrpname  from acc_group_master parent, acc_group_master child1 where child1.grp_parent_code = parent.grp_code and child1.grp_parent_code <> 1  order by child1.grp_name,parent.grp_name ";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }	

  function getSubGroup()
    {
        global $conn;

	$sql = "select child1.grp_code subgrpcode,child1.grp_name subgrpname , child2.grp_code sub2grpcode,child2.grp_name sub2grpname , parent.grp_code parentgrpcode,parent.grp_name parentgrpname from acc_group_master parent, acc_group_master child1 , acc_group_master child2  where child1.grp_parent_code = child2.grp_code and child2.grp_parent_code = parent.grp_code and child2.grp_parent_code <> 1  order by child1.grp_name,child2.grp_name,parent.grp_name";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }	

 function getLedgerBills()
    {
        global $conn;
       	$compcode = $_POST['compcode'];
       	$fincode = $_POST['fincode'];
       	$ledcode = $_POST['ledcode'];
	$sql = "select a.* ,acctrail_inv_value - acctrail_adj_value as balamt,'N' as modify_yn   from acc_trail a , acc_ref b  where  accref_seqno =  acctrail_accref_seqno and  accref_finid = $fincode and acctrail_led_code = $ledcode";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
?>
