<?php
   require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
      session_start();
    $task='loadreport';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadreport":
		getreport();
		break;


		default:
        	echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
function getreport()
    {
        mysqli_set_charset($conn, "utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $fromdate = $_POST['fromdate'];
	$todate   = $_POST['todate'];


	$r="call sp_pur_store_ledger('$compcode','$fromdate','$todate')";
        $result1=mysqli_query($conn, $r);  
echo $r;  

	$r="call sp_pur_op_value('$compcode','$finid','$fromdate','$todate')";
        $result2=mysqli_query($conn, $r);  
echo $r;  
/*
        $r= "insert into tmp_pur_op_value select item_code,0,0,0,0,0,0,0,0,0,0,0,0,0 from tmp_pur_store_ledger where item_code
 not in (select item_code from tmp_pur_op_value) group by item_code";
        $result3=mysqli_query($conn, $r);  

echo $r;  
        $r= "insert into tmp_pur_op_value select item_code,0,0,0,0,0,0,0,0,0,0,0,0,0 from maspur_item_trailer where item_code not in (select item_code from tmp_pur_op_value  group by item_code) and item_comp_code = '$compcode' and item_fin_code = '$finid'  group by item_code";
        $result4=mysqli_query($conn, $r);  
echo $r;      
        $r = "insert into tmp_pur_store_ledger select 0,' ',0,NULL,0,item_code,0,0,0,0,1,0,'' from maspur_item_trailer where item_code not in (select item_code from tmp_pur_store_ledger  group by item_code) and item_comp_code = '$compcode' and item_fin_code = '$finid'  group by item_code";
         $result5=mysqli_query($conn, $r);  
echo $r;  
*/
    }



?>
