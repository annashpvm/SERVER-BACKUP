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

		case "loadSubjectList":
		getSubjectList();
		break;

		case "loadSubjectPassword":
		getSubjectPassword();
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
	
   
 function getSubjectList()
    {
        mysql_query("SET NAMES utf8");
        $dept =  $_POST['dept'];  
        $r=mysql_query("select * from mas_password where pw_dept = '$dept'  order by pw_subject" );
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

   function getSubjectPassword()
    {
        mysql_query("SET NAMES utf8");
        $dept    =  $_POST['dept'];
        $subject =  $_POST['subject'];
  
        $r=mysql_query("select * from mas_password where pw_dept = '$dept' and pw_subject = '$subject' order by pw_subject" );
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 



?>
