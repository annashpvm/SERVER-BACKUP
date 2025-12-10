<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadSearchPartylist';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    global $conn;

    switch($task){

		case "loadSearchPartylist":
		getSearchPartylist();
		break;
		case "loadCollectionDocumentList":
		getCollectionDocumentList();
		break;
		case "loadBalanceDue":
		getBalanceDue();
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
        global $conn;

        $party  = $_POST['party'];
        $sql = "select * from acc_ledger_master where led_type = 'C' and led_name like '%$party%' order by led_name";
  $r = mysqli_query($conn, $sql);
    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getCollectionDocumentList()
    {
        global $conn;


	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$ledcode = $_POST['ledcode'];
        $r = mysql_query("call accsp_rep_ar_paymentpeformance($compcode,'$startdate','$enddate',$ledcode)";
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getBalanceDue()
    {
        global $conn;

	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$ledcode = $_POST['ledcode'];

        $r = mysql_query("call acc_sp_rep_ledger_closing_balance($ledcode,$compcode,$fincode,'$startdate','$enddate')";
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


?>
