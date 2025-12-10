	<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
    
    


    $task='loadDetails';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadDetails":
		getDetails();
		break;

	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getDetails()
    {
        global $conn;

        $sql = "select cust_ref,invh_no,invh_date,invh_totwt,invh_netamt from trnsal_invoice_header,massal_customer where invh_party = cust_code and invh_date between '2023-01-01' and '2023-01-31' order by cust_ref";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	


?>
