<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadSearchPartylist';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){

		case "loadSearchPartylist":
		getSearchPartylist();
		break;

	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }

 function getSearchPartylist()
    {
        mysqli_set_charset($conn, "utf8");
//        $sql = "select hsn_code,hsn_sno from mas_hsncode order by hsn_code");


        $party     = $_POST['party'];
        $qry = "select * from massal_customer where cust_ref like '%$party%' order by cust_ref";


        $r=mysqli_query($conn, $qry);
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
?>
