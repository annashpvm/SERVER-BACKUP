<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();

$compcode = $_POST['compcode'];
$finid = $_POST['finid'];
$fromdate = $_POST['fromdate'];
$todate = $_POST['todate'];
$finstartdate = $_POST['finstartdate'];
$chkdt = date('Y-m-d', strtotime($fromdate. ' - 1 days'));


//echo $chkdt;

$RPT = $_POST['RPT'];
 mysqli_query($conn, "BEGIN");
 
 if ($RPT == "STORELEDGER") {
 
	$spquery1 = "call sp_pur_store_ledger('$compcode','$fromdate','$todate')";
	$result1 = mysqli_query($conn, $spquery1);
//	echo $spquery1;

//	$spquery2="call sp_pur_op_value('$compcode','$finid','$finstartdate','$chkdt')";
	$spquery2="call sp_pur_op_value('$compcode','$finid','$fromdate')";

        $result2=mysqli_query($conn, $spquery2);  
        
//	echo $spquery2;

/*
        $insquery3 =" insert into tmp_pur_op_value select item_code,0,0,0,0,0,0,0,0,0,0,0,0 from tmp_pur_store_ledger where item_code not in (select item_code from tmp_pur_op_value) group by item_code;";
        $result3 = mysqli_query($conn, $insquery3);

//	echo $insquery3;

        

	$insquery5 ="insert into tmp_pur_store_ledger select 0,'',0,NULL,0,item_code,0,0,0,0,1,'0','' from maspur_item_trailer where item_code not in (select item_code from tmp_pur_store_ledger  group by item_code) and item_comp_code = '$compcode' and item_fin_code = '$finid'  group by item_code;";
       $result5 = mysqli_query($conn, $insquery5);

//	echo $insquery5;


*/
mysqli_begin_transaction($conn);           

}
       
 
?>
