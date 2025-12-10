<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task="LoadBankSupplierList";

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
		case "LoadBankSupplierList":
		getBankSupplierList();
		break;
		case "LoadPartyBank":
		getPartyBank();
		break;
	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   

 function getBankSupplierList()
    {
        global $conn;  

//        $sql = "select suppliercode, sup_refname, sup_bank_bankname, sup_bank_branch, sup_bank_ifsc, sup_bank_bank_acno from  maspur_supplier_bank , maspur_supplier_master where sup_code = suppliercode";

        $sql = "select * from  maspur_supplier_bank order by sup_name";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

    
 function getPartyBank()
 {
     global $conn;  
    $suppcode = $_POST['suppcode'];
     $sql = "select * from  maspur_supplier_bank where suppliercode = $suppcode)";

 $r = mysqli_query($conn, $sql);

 $arr = [];
 while ($re = mysqli_fetch_assoc($r)) {
     $arr[] = $re;
 }

 echo json_encode(["total" => count($arr), "results" => $arr]);
 }

?>
