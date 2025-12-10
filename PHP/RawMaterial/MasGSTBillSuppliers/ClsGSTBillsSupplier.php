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
             	case "loadGSTBillSupplierList":
		getGSTBillSupplierList();
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
        $qry = "select * from maspur_supplier_master  where sup_name like '%$ledname%'";
        $r=mysqli_query($conn, $qry);
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 

 function getGSTBillSupplierList()
    {
        global $conn; 


        $ledname = strtoupper($_POST['ledger']);
        $qry = "select * from maspur_supplier_master where sup_wp_gstinv_supplier_yn = 'Y' order by sup_name";
        $r=mysqli_query($conn, $qry);
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    } 

?>
