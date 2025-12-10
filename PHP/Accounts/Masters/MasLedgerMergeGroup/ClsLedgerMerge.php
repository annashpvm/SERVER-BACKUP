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
        if ($ledname == '')
            $sql = "select * from massal_customer where cust_type in ('S','C') order by cust_name ";
        else
            $sql = "select * from massal_customer where cust_type in ('S','C') and cust_name like '%$ledname%' order by cust_name";

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

        $sql = "select rep_merge_name, rep_merge_code, rep_ledcode,cust_name from acc_rep_ledger_merge,massal_customer where rep_ledcode = led_code order by rep_merge_name";

  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 
?>
