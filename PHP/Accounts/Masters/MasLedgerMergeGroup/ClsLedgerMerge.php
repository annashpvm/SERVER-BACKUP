<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadSearchLedgerlist';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
             	case "loadSearchLedgerlist":
		getSearchLedgerlist();
		break;

             	case "loadGroupList":
		getGroupList();
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
    
 function getSearchLedgerlist()
    {
        mysql_query("SET NAMES utf8");


        $ledname = strtoupper($_POST['ledger']);
        if ($ledname == '')
            $qry = "select * from acc_ledger_master where led_type in ('S','C') order by led_name ";
        else
            $qry = "select * from acc_ledger_master where led_type in ('S','C') and led_name like '%$ledname%' order by led_name";

        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    } 

 function getGroupList()
    {
        mysql_query("SET NAMES utf8");

        $qry = "select rep_merge_name, rep_merge_code, rep_ledcode,led_name from acc_rep_ledger_merge,acc_ledger_master where rep_ledcode = led_code order by rep_merge_name";

        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    } 
?>
