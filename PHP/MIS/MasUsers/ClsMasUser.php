<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task='loadDepartment';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadDepartmentList":
		getDepartments();
		break;

		case "loadUsersList":
		getUsersList();
		break;

		case "loadUserDetails":
		getUserDetails();
		break;

		case "loadModuleList":
		getModuleList();
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
    
   
 function getDepartments()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select department_code,department_name from mas_department order by department_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
   
 function getUsersList()
    {
        mysql_query("SET NAMES utf8");
        $dept =  $_POST['deptcode'];  
        $r=mysql_query("select usr_name, usr_code from   userMaster where usr_dept = $dept order by usr_name " );
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

   
 function getUserDetails()
    {
        mysql_query("SET NAMES utf8");
        $user =  $_POST['usrcode'];  
        $r=mysql_query("select *  from   userMaster where usr_code = $user");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

  function getModuleList()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select * ,'NO' rights from modulelist where modactive = 'Y'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


?>
