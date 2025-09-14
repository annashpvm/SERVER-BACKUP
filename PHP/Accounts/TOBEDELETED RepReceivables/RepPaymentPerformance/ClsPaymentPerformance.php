<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadSearchPartylist';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysql_query("SET NAMES utf8");

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
        if (version_compare(PHP_VERSION,"5.2","<"))
        {    
            require_once("./JSON.php");   //if php<5.2 need JSON class
            $json = new Services_JSON();  //instantiate new json object
            $data=$json->encode($arr);    //encode the data in json format
        } else
        {
            $data = json_encode($arr);    //encode the data in json format
        }
        return $data;
    }
    



 

 function getSearchPartylist()
    {
        mysql_query("SET NAMES utf8");

        $party  = $_POST['party'];
        $qry = "select * from acc_ledger_master where led_type = 'C' and led_name like '%$party%' order by led_name";
        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getCollectionDocumentList()
    {
        mysql_query("SET NAMES utf8");


	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$ledcode = $_POST['ledcode'];
        $r = mysql_query("call accsp_rep_ar_paymentpeformance($compcode,'$startdate','$enddate',$ledcode)");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getBalanceDue()
    {
        mysql_query("SET NAMES utf8");

	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$ledcode = $_POST['ledcode'];

        $r = mysql_query("call acc_sp_rep_ledger_closing_balance($ledcode,$compcode,$fincode,'$startdate','$enddate')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


?>
