<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadledger';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadParentDetails":
		getParentDetails();
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
		case "loadLedgerList":
		getLedgerList();
		break;
		case "loadGroupList":
		getGroupList();
		break;
		case "loadGroupList2":
		getGroupList2();
		break;
             	case "loadSearchLedgerlist":
		getSearchLedgerlist();
		break;
             	case "loadExtraCDDaysCutomerList":
                getExtraCDDaysCutomerList();
		break;

             	case "findEntryNo":
		getEntryNo();
		break;
	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getParentDetails()
    {
        global $conn;
       	$grpcode = $_POST['grpcode'];
	$sql = "select * from acc_group_master where grp_code = '$grpcode'";
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

  function getLedgerList()
    {
        global $conn;

	$sql = "select * from acc_ledger_master , acc_group_master where  led_grp_code = grp_code  and led_code > 0 order by led_name";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }	

  function getGroupList()
    {
        global $conn;

	$sql = "select grp_name,grp_code from acc_ledger_master , acc_group_master where  led_grp_code = grp_code  and led_code > 0 group by grp_name,grp_code order by  grp_name asc,grp_code";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

  function getGroupList2()
    {
        global $conn;

	$sql = "select child1.grp_code grp_code,child1.grp_name  grp_name  from acc_group_master parent, acc_group_master child1 , acc_group_master child2  where child1.grp_parent_code = child2.grp_code and child2.grp_parent_code = parent.grp_code and child2.grp_parent_code <> 1  order by child1.grp_name";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getSearchLedgerlist()
    {
        global $conn;


        $ledname = strtoupper($_POST['ledger']);
        $sql = "select * from massal_customer  where cust_name like '%$ledname%'";
  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 

 function getExtraCDDaysCutomerList()
    {
        global $conn;

        $sql = "select * from massal_customer ,massal_repr where cust_repr = repr_code and cust_addnl_cd_days > 0 order by repr_name,cust_ref";
  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 


 function getEntryNo()
    {
        global $conn;

        $sql = "select ifnull(max(so_seqno),0)+1 as so_seqno from acc_so_allow";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
          
?>
