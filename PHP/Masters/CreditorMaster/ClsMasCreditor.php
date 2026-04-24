<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadcrpartygrp';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    global $conn;
    switch($task){
		case "loadcrdrlist":
		getcrdrlist();
		break;    
//		case "loadcrdrledgerlist":
		//getcrdrledger();
//		break;
		case "loadcrdrstate":
		getcrdrstate();
		break;
		case "loadcrdrcountry":
		getcrdrcountry();
		break;	
		case "loadcrdrtax":
		getcrdrtax();
		break;	
		case "loadcrdragent":
		getcrdragent();
		break;	
		case "loadcrtds":
		getcrtds();
		break;		
		case "loadcrpartygrp":
		getcrdrpartygrp();
		break;	
					
		case "loadarea":
		getarea();
		break;
		case "Loadaccountsgroup":
		getaccountsgroup();
		break;
		case "loadlot":
		getlotdet();
		break;
		case "loadlotitem":
		getlotitemdet();
		break;
		case "loadissno":
		getissno();
		break;
		case "loadissdetail":
		getissdetail();
		break;

		case "loadSearchLedgerlist":
		getSearchLedgerlist();
		break;


		default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
  function getcrdrlist()
    {
        global $conn; 

        $sql = "select * from massal_customer where cust_type = 'S'";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

/*
  function getcrdrledger()
    {
        global $conn; 
	$ledcode = $_POST['ledcode'];
	$cusled = $_POST['cusled'];
	if ($cusled == 'Y') {
		$sql = "select * from acc_ledger_master where led_code = '$ledcode'";
	}
	else {
	        $sql = "select * from acc_ledger_master";// where led_code = '$ledcode'";
	}	       
       

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 */
   
  function getcrdrstate()
    {
        global $conn; 

        $sql = "select * from mas_state";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 
   
   
  function getcrdrcountry()
    {
        global $conn; 

        $sql = "select * from mas_country";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 

   
  function getcrdrtax()
    {
        global $conn; 

        $sql = "select * from mas_tax  order by tax_name";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 

  function getcrdragent()
    {
        global $conn; 

        $sql = "select sagt_code,sagt_name from mas_supagent order by sagt_name";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 
  function getcrtds()
    {
        global $conn; 

        $sql = "select tds_code,tds_name from mas_acc_tds  order by tds_code";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 
  function getcrdrpartygrp()
    {
        global $conn; 

        $sql = "select * from maspur_supplier_group  order by sup_grp_name";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
  
 
   	
function getarea()
    {
        global $conn; 

        $sql = "select area_code,area_name from mas_area order by area_name";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

	
 function getaccountsgroup()
    {
        global $conn; 
        $sql = "select grp_code,grp_name from acc_group_master where grp_parent_code = 51 order by grp_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getlotitemdet()
    {
        global $conn; 
	$compcode = $_POST['compcode'];
	$itemcode = $_POST['itemcode'];
	$finid = $_POST['finid'];
	$lotcode = $_POST['lotcode'];
        $sql = "call sprm_sel_itemlotdetails($compcode,$finid,$itemcode,$lotcode)";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getlotdet()
    {
        global $conn; 
	$compcode = $_POST['compcode'];
	$itemcode = $_POST['itemcode'];
	$finid = $_POST['finid'];
        $sql = "call sprm_sel_itemlotdetails1($compcode,$itemcode)";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getissno()
    {
        global $conn; 
	$compcode = $_POST['compcode'];
	$finid = $_POST['fincode'];
	$AEDFlag = $_POST['AEDFlag'];
	
	if ($AEDFlag === "Add")
	{

		$sql = "select ifnull(max(issh_no),0) + 1 as issno from trnrm_issue_header where issh_compcode='$compcode' and issh_fincode='$finid'";
	}
	else if ($AEDFlag === "Edit")
	{
		$sql = "select issh_no,issh_seqno from trnrm_issue_header where issh_compcode=$compcode and issh_fincode=$finid";
	}
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
function getissdetail()
    {
        global $conn; 
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$issno = $_POST['issno'];
	$AEDFlag = $_POST['AEDFlag'];
	

		$sql = "call sprm_sel_issue ('$compcode','$finid','$issno')";

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


//        $party     = $_POST['ledger'];
//		$sql = "select * from massal_customer where left(cust_name,2) != 'zz' and  cust_type = 'S' and replace(replace(cust_name,' ','')  ,'.','')  like '%$party%' order by cust_name";


        $ledname = strtoupper($_POST['ledger']);
        $ledname = trim(str_replace(" ", "", $ledname)); 
        $ledname = trim(str_replace(".", "", $ledname)); 
        $ledname = trim(str_replace("-", "", $ledname));

//       $sql = "select * from massal_customer where left(cust_name,2) != 'zz' and replace(replace(replace(cust_name,' ','')  ,'.',''),'-','')   like '%$ledname%' order by cust_name";
      $sql = "SELECT * FROM massal_customer WHERE cust_name NOT LIKE 'zz%'  and cust_type = 'S' and  REGEXP_REPLACE(cust_ref, '[ .-]', '')  LIKE '%$ledname%' ORDER BY cust_name;";
 //echo $sql;

        $r=mysqli_query($conn, $sql);
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
?>
