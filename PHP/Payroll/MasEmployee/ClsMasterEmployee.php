<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task='loadQualification';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadQualification":
		getQualification();
		break;
		case "loadDepartment":
		getDepartment();
		break;
		case "loadDesignation":
		getDesignation();
		break;
		case "loadReligion":
		getReligion();
		break;
		case "loadCommunity":
		getCommunity();
		break;
		case "loadCaste":
		getCaste();
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
    
   
 function getQualification()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select qualification_code,qualification_name from mas_qualification order by qualification_code");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
 function getDepartment()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select department_code,department_name from mas_department order by department_code");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

   function getDesignation()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select design_code,design_name from mas_designation order by design_code");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
		

 function getReligion()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select religion_code,religion_name from mas_religion order by religion_code");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	
 function getCommunity()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select comm_code,comm_name from mas_community order by comm_code");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getCaste()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select caste_code,caste_name from mas_caste order by caste_code");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
?>
