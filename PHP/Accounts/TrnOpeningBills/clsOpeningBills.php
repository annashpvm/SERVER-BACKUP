<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadledger';

    mysqli_set_charset($conn, "utf8");
    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }


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

                case "loadVoucherNo":             // Give the entire list
                getVoucherNumber();
                break;


                case "LoadLastVouNo":             // Give the entire list
                getLastVouNo();
                break;
		case "LoadVoucherDetails":
		getVoucherDetail();
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
	$sql = "select * from acc_current_balance where  curbal_finid = '$fincode' and curbal_comp_code = '$compcode' and curbal_led_code = '$ledcode'";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

    function getLastVouNo()
    {
        global $conn;
	    $finyear  =$_POST['finyear'];	
        $compcode =$_POST['compcode'];
        $voutype  =$_POST['voutype'];
        $sql = "select ifnull(max(convert(substring(accref_vouno,4),signed)),0) +1 as con_value from acc_ref where accref_vou_type = '$voutype' and accref_finid = '$finyear' and accref_comp_code = '$compcode';";

//echo $sql;

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

    function getVoucherNumber()
    {
        global $conn;
        $compcode = $_POST['compcode'];
        $finid =$_POST['finid'];
        $voutype=$_POST['voutype'];
	$sql = "select * from acc_ref where accref_comp_code =  $compcode and accref_finid = $finid and accref_vou_type = 'OPB' order by convert(substring(accref_vouno,4),signed) desc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getVoucherDetail()

    {

        global $conn;
        $fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
       	$vouno    = $_POST['vouno'];


      $sql = "select * from acc_ref ref  join acc_trail tran on  tran.acctrail_accref_seqno = ref.accref_seqno   join massal_customer mas on  tran.acctrail_led_code = mas.cust_code  where accref_vouno = '$vouno' and  accref_comp_code = $compcode and accref_finid = $fincode";

      //echo $sql;

    $r = mysqli_query($conn, $sql);


    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
?>
