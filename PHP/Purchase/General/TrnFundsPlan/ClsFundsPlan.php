<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task="loadFundPlanDetails";

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadFundPlanDetails":
		getFundsPlan();
		break;

		case "loadFundPaidDetails":
		getFundsPaid();
		break;

	        default:
		break;
               	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getFundsPlan()
    {
        global $conn;


        $startdate = $_POST['startdate'];
        $enddate   = $_POST['enddate'];

$sql = "select fp_date,DATE_FORMAT(fp_date, '%d-%m-%Y') fp_date2,fp_ilc,fp_dpda,fp_gst,fp_salary,fp_eb, fp_wp,fp_biomass,fp_duty,fp_chemicals,fp_coal,fp_emi, fp_spares,fp_total from trn_funds_plan where fp_date between '$startdate' and '$enddate' order by fp_date";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }	


 function getFundsPaid()
    {
        global $conn;


        $repdate = $_POST['repdate'];


        $sql = "select * from trn_funds_plan where fp_date =  '$repdate'";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }	
?>




