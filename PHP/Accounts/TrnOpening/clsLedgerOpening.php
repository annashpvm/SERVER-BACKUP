<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadClosingValue';

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
		case "loadLedgerOpening":
		getLedgerOpening();
		break;
		case "loadLedgerOpeningList":
		getLedgerOpeningList();
		break;
		case "loadClosingValue":
		getClosingValue();
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
	$sql = "select cust_code,cust_name from massal_customer order by cust_name";
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

 function getLedgerOpening()
    {
        global $conn;
       	$compcode = $_POST['compcode'];
       	$fincode = $_POST['fincode'];
       	$ledcode = $_POST['ledcode'];
	$sql = "select * from acc_current_balance where  curbal_finid = '$fincode' and curbal_comp_code = '$compcode' and curbal_cust_code = '$ledcode'";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getLedgerOpeningList()
    {
        global $conn;
       	$compcode = $_POST['compcode'];
       	$fincode = $_POST['fincode'];
	
        $sql = "select  cust_code,cust_name , curbal_obdbamt , curbal_obcramt  from acc_current_balance , massal_customer where curbal_comp_code = $compcode and curbal_finid = $fincode  and curbal_led_code = cust_code  and curbal_obdbamt + curbal_obcramt > 0  order by cust_name";

//echo $sql;        
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getClosingValue()
    {
        global $conn;
       	$compcode = $_POST['compcode'];
       	$fincode = $_POST['fincode'];
/*
	$sql = "select * from acc_current_balance where curbal_led_code=1717 and curbal_finid = '$fincode' and curbal_comp_code = '$compcode' ";


	$sql="select concat('01-04-20',curbal_finid) as clodate, curbal_obdbamt closing from acc_current_balance where curbal_led_code=1717 and curbal_finid = '$fincode' and curbal_comp_code =  '$compcode'
union all
select  DATE_FORMAT(clostk_date, '%d-%m-%Y') as clodate,
clostk_value closing from acc_closing_stock where clostk_fincode = '$fincode' and clostk_compcode = '$compcode'";

//echo $sql;

	$sql = "select concat('01-04-20',curbal_finid) as clodate, curbal_obdbamt closing from acc_current_balance where curbal_led_code=1717 and curbal_finid = '$fincode' and curbal_comp_code =  '$compcode'
union all
select  DATE_FORMAT(clostk_date, '%d-%m-%Y') as clodate,
clostk_value closing from acc_closing_stock where clostk_fincode = '$fincode' and clostk_compcode = '$compcode'";
*/

	$sql = "select  DATE_FORMAT(clostk_date, '%d-%m-%Y') as clodate,
clostk_value closing from acc_closing_stock where clostk_fincode = '$fincode' and clostk_compcode = '$compcode'";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
?>
