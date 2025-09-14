<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loaditem';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loaditem":
		getitem();
		break;
		case "loadparty":
		getparty();
		break;
		case "loadchkrate":
		getchkrate();
		break;
		case "loadarea":
		getarea();
		break;
	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }

function getarea()
{
        mysql_query("SET NAMES utf8");
	$r=mysql_query("select area_name,area_code from mas_area order by area_name asc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
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
    
   
 function getitem()
    {
        mysql_query("SET NAMES utf8");
	$p_itemtype = $_POST['itemtype'];
        //$r=mysql_query("call spfu_sel_itemdetails ('$p_itemtype')");
	$r=mysql_query("call sprm_sel_itemdetails ('-1')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
	
 function getparty()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("call sp_pur_sup");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getchkrate()
    {
        mysql_query("SET NAMES utf8");
	$itemcode = $_POST['itemcode'];
	$partycode = $_POST['partycode'];
	$areacode = $_POST['areacode'];

        $r=mysql_query("call sp_sel_loadfreight ('$partycode','$areacode',0)");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

?>
