<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadledger';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){


             	case "loadWBItemList":
		getWBItemList();
		break;

             	case "loadGroupList":
		getGroupList();
		break;

             	case "loadSearchWBItemList":
		getSearchWBItemList();
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


 function getWBItemList()
    {
        mysql_query("SET NAMES utf8");
       	$grpcode = $_POST['grpcode'];
	$r=mysql_query("select * from mas_wb_item left join mas_wb_itemgroup on item_group = item_grpcode");
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
       	$grpcode = $_POST['grpcode'];
	$r=mysql_query("select * from  mas_wb_itemgroup");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	

 function getSearchWBItemList()
    {
        mysql_query("SET NAMES utf8");
       	$iname = $_POST['iname'];
	$r=mysql_query("select * from  mas_wb_item  where item_name like '%$iname%'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
?>
