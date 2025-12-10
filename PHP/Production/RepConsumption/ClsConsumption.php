<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadDatewiseIssue';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){


  	case "loadDatewiseIssue":
             getDatewiseIssue();
            break;



		break;
		default:
        	echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
  function getDatewiseIssue()
    {
        global $conn;

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$fromdate = $_POST['fromdate'];	
	$todate   = $_POST['todate'];	
    $sql = "call spprod_chemical_consumption($compcode,$finid,'$fromdate','$todate')";
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
?>
