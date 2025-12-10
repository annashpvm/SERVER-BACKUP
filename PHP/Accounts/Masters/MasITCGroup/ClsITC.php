<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadSearchLedgerlist';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
mysqli_set_charset($conn, "utf8");
    switch($task){
             	case "loadSearchLedgerlist":
		getSearchLedgerlist();
		break;

             	case "loadGroupList":
		getGroupList();
		break;


             	case "loadGSTGroupLedgerList":
		getGSTGroupLedgerList();
		break;



	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
 function getSearchLedgerlist()
    {
        global $conn;


        $ledname = strtoupper($_POST['ledger']);
        $grp     = strtoupper($_POST['grp']);

        if ($grp == 'INPUT CGST')
            $sql = "select * from massal_customer where cust_name like 'INPUT%CGST%@%' and cust_name like '%$ledname%' order by cust_name";
        else if ($grp == 'INPUT SGST')
            $sql = "select * from massal_customer where cust_name like 'INPUT%SGST%@%' and cust_name like '%$ledname%' order by cust_name";
else if ($grp == 'INPUT IGST')
            $sql = "select * from massal_customer where cust_name like 'INPUT%IGST%@%' and cust_name like '%$ledname%' order by cust_name";

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

        $sql = "SELECT hd.* , grp.cust_name grpname,led.cust_name ledname from acc_gstitc_group hd , massal_customer grp , massal_customer led  where hd.itc_grpcode  = grp.cust_code and  hd.itc_ledcode = led.cust_code";

  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 


 function getGSTGroupLedgerList()
    {
        global $conn;

        $sql = "select * from massal_customer where cust_code in (2239,2240,2241) order by cust_name";

  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 
?>
