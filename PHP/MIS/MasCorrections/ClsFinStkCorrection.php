	<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task='loadRollNo';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    
    mysqli_set_charset($conn, "utf8");

    switch($task){
		
	    	case "loadRollNo":
                getRollNo();
		 break;	
	    	case "loadReelNo":
		    getReelNo();
         	break;
                case "loadReelNo_WeightChange":
		    getReelNo_WeightChange();
         	break;
 		case "loadWeight":
		    getReelWeight();
         	break;
	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   


 function getRollNo()
    {
    global $conn;
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
    $rdate    = $_POST['rdate'];
    $stk_rollno      = $_POST['stk_rollno']; 
    $yr       = $_POST['yr']; 


    $sql = "select stk_rollno from trnsal_finish_stock where stk_ent_date='$rdate' and stk_destag='' group by  stk_rollno order by  stk_rollno desc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }   

function getReelNo()
    {
        global $conn;
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $rdate    = $_POST['rdate'];
        $rollno      = $_POST['rollno']; 
        $yr       = $_POST['yr']; 


	$sql = "select stk_sr_no as reelno from trnsal_finish_stock where stk_ent_date= '$rdate' and stk_destag='' and stk_rollno = $rollno order by reelno ";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }   

function getReelNo_WeightChange()
    {
        global $conn;
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $rdate    = $_POST['rdate'];
    // $newwt  =$_POST['newwt'];
        $yr       = $_POST['yr']; 


	//$sql = "select stk_sr_no as reelno from trnsal_reelweight_change where ent_date= '$rdate' and stk_destag=''  order by reelno ";
$sql = "select srno as reelno from trnsal_reelweight_change where ent_date= '$rdate' order by reelno desc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }   

function getReelWeight()
    {
        global $conn;
	    $finid    = $_POST['finid'];
	    $compcode = $_POST['compcode'];
        $rdate    = $_POST['rdate'];       
        $reelno   = $_POST['reelno']; 
       $sql = "select  srno ,newweight from trnsal_reelweight_change where ent_date= '$rdate' and srno = $reelno";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }   
?>

