<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadClosingValue';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadLedgerDetails":
		getLedgerDetails();
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
		case "loadLedgerOpening":
		getLedgerOpening();
		break;
		case "loadLedgerOpeningList":
		getLedgerOpeningList();
		break;
		case "loadClosingValue":
		getClosingValue();
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
    
   
 function getLedgerDetails()
    {
        mysql_query("SET NAMES utf8");
       	$grpcode = $_POST['grpcode'];
	$r=mysql_query("select cust_code,cust_name from massal_customer order by cust_name");
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
	$r=mysql_query("select child1.grp_code subgrpcode, concat(child1.grp_name, ' - ' ,parent.grp_name) subgrpname , parent.grp_code parentgrpcode,parent.grp_name parentgrpname  from acc_group_master parent, acc_group_master child1 where child1.grp_parent_code = parent.grp_code and child1.grp_parent_code <> 1  order by child1.grp_name,parent.grp_name ");

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

	$r=mysql_query("select child1.grp_code subgrpcode,child1.grp_name subgrpname , child2.grp_code sub2grpcode,child2.grp_name sub2grpname , parent.grp_code parentgrpcode,parent.grp_name parentgrpname from acc_group_master parent, acc_group_master child1 , acc_group_master child2  where child1.grp_parent_code = child2.grp_code and child2.grp_parent_code = parent.grp_code and child2.grp_parent_code <> 1  order by child1.grp_name,child2.grp_name,parent.grp_name");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	

 function getLedgerOpening()
    {
        mysql_query("SET NAMES utf8");
       	$compcode = $_POST['compcode'];
       	$fincode = $_POST['fincode'];
       	$ledcode = $_POST['ledcode'];
	$r=mysql_query("select * from acc_current_balance where  curbal_finid = '$fincode' and curbal_comp_code = '$compcode' and curbal_cust_code = '$ledcode'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getLedgerOpeningList()
    {
        mysql_query("SET NAMES utf8");
       	$compcode = $_POST['compcode'];
       	$fincode = $_POST['fincode'];
	$r=mysql_query("select  cust_code,cust_name , curbal_obdbamt , curbal_obcramt  from acc_current_balance , massal_customer where curbal_comp_code = $compcode and curbal_finid = $fincode  and curbal_led_code = cust_code  and curbal_obdbamt + curbal_obcramt > 0  order by cust_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getClosingValue()
    {
        mysql_query("SET NAMES utf8");
       	$compcode = $_POST['compcode'];
       	$fincode = $_POST['fincode'];
/*
	$r=mysql_query("select * from acc_current_balance where curbal_led_code=1717 and curbal_finid = '$fincode' and curbal_comp_code = '$compcode' ");


	$qry="select concat('01-04-20',curbal_finid) as clodate, curbal_obdbamt closing from acc_current_balance where curbal_led_code=1717 and curbal_finid = '$fincode' and curbal_comp_code =  '$compcode'
union all
select  DATE_FORMAT(clostk_date, '%d-%m-%Y') as clodate,
clostk_value closing from acc_closing_stock where clostk_fincode = '$fincode' and clostk_compcode = '$compcode'";

//echo $qry;

	$r=mysql_query("select concat('01-04-20',curbal_finid) as clodate, curbal_obdbamt closing from acc_current_balance where curbal_led_code=1717 and curbal_finid = '$fincode' and curbal_comp_code =  '$compcode'
union all
select  DATE_FORMAT(clostk_date, '%d-%m-%Y') as clodate,
clostk_value closing from acc_closing_stock where clostk_fincode = '$fincode' and clostk_compcode = '$compcode'");
*/

	$r=mysql_query("select  DATE_FORMAT(clostk_date, '%d-%m-%Y') as clodate,
clostk_value closing from acc_closing_stock where clostk_fincode = '$fincode' and clostk_compcode = '$compcode'");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
?>
