<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task='loadDepartment';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadDepartment":
		getDepartment();
		break;
		case "loadInwardNo":
		getInwardNo();
		break;
		case "loadEntryNoList":
		getEntryNoList();
		break;
		case "loadEntryNoDetail":
		getEntryNoDetail();
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
    
   
 function getDepartment()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select department_code, department_name from mas_department order by department_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
 function getInwardNo()
    {
        mysql_query("SET NAMES utf8");
	$iotype = $_POST['iotype'];
	

        $r=mysql_query("select ifnull(max(io_entryno),0)+1 as entryno from inward_outward where io_tag = '$iotype'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	

 function getEntryNoList()
    {
        mysql_query("SET NAMES utf8");
	$iotype = $_POST['iotype'];
	

        $r=mysql_query("select * from inward_outward where io_tag = '$iotype' order by io_entryno desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	
 function getEntryNoDetail()
    {
        mysql_query("SET NAMES utf8");
	$iotype = $_POST['iotype'];
	$entryno = $_POST['entryno'];

        $r=mysql_query("select * from inward_outward , mas_department  where io_dept = department_code and   io_tag = '$iotype' and io_entryno = '$entryno' ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	

?>
