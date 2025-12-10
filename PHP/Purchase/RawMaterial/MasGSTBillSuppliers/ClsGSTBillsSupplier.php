<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadGSTBillSupplierList';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){

             	case "loadSearchLedgerlist":
		getSearchLedgerlist();
		break;
             	case "loadGST_DNote_Exemption_List":
		getGST_DNote_Exemption_List();
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
        mysqli_set_charset($conn, "utf8");


        $ledname = strtoupper($_POST['ledger']);
        $qry = "select * from massal_customer  where cust_name like '%$ledname%'";
        $r=mysqli_query($conn, $qry);
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 

 function getGST_DNote_Exemption_List()
    {
        mysqli_set_charset($conn, "utf8");


        $ledname = strtoupper($_POST['ledger']);
        $qry = "select * from massal_customer where cust_wp_gst_dnote_yn = 'Y' order by cust_name";
        $r=mysqli_query($conn, $qry);
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 

?>
