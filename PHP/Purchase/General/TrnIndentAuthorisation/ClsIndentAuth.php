<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadindentdet';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadDept":
		getDept();
		break;
		case "loadindentdet":
		getindentdetail();
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
    
   
 function getindentdetail()
    {
        mysql_query("SET NAMES utf8");

	$compcode = $_POST['compcode'];
	$fincode  = $_POST['fincode'];
	$deptcode = $_POST['dept'];

        $r=mysql_query("call sppur_dept_indent('$compcode','$fincode','$deptcode')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
 function getDept()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("call sp_sel_dept_new()");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	
 
?>
