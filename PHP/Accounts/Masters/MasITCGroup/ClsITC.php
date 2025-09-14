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


             	case "loadGSTGroupLedgerList":
		getGSTGroupLedgerList();
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
        $grp     = strtoupper($_POST['grp']);

        if ($grp == 'INPUT CGST')
            $qry = "select * from acc_ledger_master where led_name like 'INPUT%CGST%@%' and led_name like '%$ledname%' order by led_name";
        else if ($grp == 'INPUT SGST')
            $qry = "select * from acc_ledger_master where led_name like 'INPUT%SGST%@%' and led_name like '%$ledname%' order by led_name";
else if ($grp == 'INPUT IGST')
            $qry = "select * from acc_ledger_master where led_name like 'INPUT%IGST%@%' and led_name like '%$ledname%' order by led_name";

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

        $qry = "SELECT hd.* , grp.led_name grpname,led.led_name ledname from acc_gstitc_group hd , acc_ledger_master grp , acc_ledger_master led  where hd.itc_grpcode  = grp.led_code and  hd.itc_ledcode = led.led_code";

        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    } 


 function getGSTGroupLedgerList()
    {
        mysql_query("SET NAMES utf8");

        $qry = "select * from acc_ledger_master where led_code in (2239,2240,2241) order by led_name";

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
