<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadAreaList';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){

		case "loadAreaList":
		getAreaList();
		break;

		case "loadAreaRateList":
		getAreaRateList();
		break;
		case "loadAreaList2":
		getAreaRateList2();
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
    
   
 function getAreaList()
    {
        mysql_query("SET NAMES utf8");
	$r=mysql_query("select area_code,area_name from massal_area where area_code > 0 order by area_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
 function getAreaRateList()
    {
        mysql_query("SET NAMES utf8");
	$r=mysql_query("select  rate_areacode, rate_areaname from massal_areaRate_group where  rate_areacode > 0 order by rate_areaname");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getAreaRateList2()
    {
        mysql_query("SET NAMES utf8");
	$r=mysql_query("select area_code,area_name,rate_areacode, rate_areaname from massal_area , massal_areaRate_group where  rate_areacode =  area_rategrp and area_code > 0 order by area_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


?>
