<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task='loadFeltWireEntryNo';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadFeltWireEntryNo":
		getFeltWireEntryNo();
		break;


		case "loadFeltWireEntryList":
		getFeltWireEntryList();
		break;

		case "loadFeltWireEntryDetail":
		getFeltWireEntryDetail();
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
    
   
 function getFeltWireEntryNo()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['fincode'];
	$compcode = $_POST['compcode'];
        $r=mysql_query("select ifnull(max(fw_seqno),0)+1 as fw_seqno from trn_dayprod_feltwire where fw_compcode= $compcode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
 function getFeltWireEntryList()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['fincode'];
	$compcode = $_POST['compcode'];
        $r=mysql_query("select fw_seqno from trn_dayprod_feltwire where fw_compcode= $compcode order by fw_seqno desc" );
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	 



 function getFeltWireEntryDetail()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$entryno  = $_POST['entryno'];
        $r=mysql_query("select * from trn_dayprod_feltwire where fw_compcode= $compcode and  fw_seqno = $entryno" );
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	 


?>

