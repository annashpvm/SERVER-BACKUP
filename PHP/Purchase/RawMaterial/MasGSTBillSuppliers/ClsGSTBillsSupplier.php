<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadGSTBillSupplierList';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){

             	case "loadSearchLedgerlist":
		getSearchLedgerlist();
		break;
             	case "loadGST_DNote_Exemption_List":
		getGST_DNote_Exemption_List();
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
        $qry = "select * from massal_customer  where cust_name like '%$ledname%'";
        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    } 

 function getGST_DNote_Exemption_List()
    {
        mysql_query("SET NAMES utf8");


        $ledname = strtoupper($_POST['ledger']);
        $qry = "select * from massal_customer where cust_wp_gst_dnote_yn = 'Y' order by cust_name";
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
