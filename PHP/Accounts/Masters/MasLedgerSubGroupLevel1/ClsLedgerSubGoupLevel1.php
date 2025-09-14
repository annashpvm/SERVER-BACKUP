<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadledger';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadParentDetails":
		getParentDetails();
		break;
		case "loadreportgrp":
		getreportgroup();
		break;
		case "loadParentGroup":
		getParentGroup();
		break;
		case "loadSubGroup":
		getSubGroup();
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
    
   
 function getParentDetails()
    {
        mysql_query("SET NAMES utf8");
       	$grpcode = $_POST['grpcode'];
	$r=mysql_query("select * from acc_group_master where grp_code = '$grpcode'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
 function getreportgroup()
    {
        mysql_query("SET NAMES utf8");
	$r=mysql_query("select rep_grp_code,rep_grp_name from maspur_report_group");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	
  function getParentGroup()
    {
        mysql_query("SET NAMES utf8");
	$r=mysql_query("select * from acc_group_master where grp_parent_code = 1 order by grp_name");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	

  function getSubGroup()
    {
        mysql_query("SET NAMES utf8");

	$r=mysql_query("select child1.grp_code subgrpcode,child1.grp_name subgrpname , parent.grp_code parentgrpcode,parent.grp_name parentgrpname  from acc_group_master parent, acc_group_master child1 where child1.grp_parent_code = parent.grp_code and parent.grp_parent_code = 1  order by child1.grp_name,parent.grp_name 
");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	
?>
