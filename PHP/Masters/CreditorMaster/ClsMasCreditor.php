<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadcrpartygrp';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadcrdrlist":
		getcrdrlist();
		break;    
//		case "loadcrdrledgerlist":
		//getcrdrledger();
//		break;
		case "loadcrdrstate":
		getcrdrstate();
		break;
		case "loadcrdrcountry":
		getcrdrcountry();
		break;	
		case "loadcrdrtax":
		getcrdrtax();
		break;	
		case "loadcrdragent":
		getcrdragent();
		break;	
		case "loadcrtds":
		getcrtds();
		break;		
		case "loadcrpartygrp":
		getcrdrpartygrp();
		break;	
					
		case "loadarea":
		getarea();
		break;
		case "Loadaccountsgroup":
		getaccountsgroup();
		break;
		case "loadlot":
		getlotdet();
		break;
		case "loadlotitem":
		getlotitemdet();
		break;
		case "loadissno":
		getissno();
		break;
		case "loadissdetail":
		getissdetail();
		break;

		case "loadSearchLedgerlist":
		getSearchLedgerlist();
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
    
  function getcrdrlist()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select * from massal_customer where cust_type = 'S'");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

/*
  function getcrdrledger()
    {
        mysql_query("SET NAMES utf8");
	$ledcode = $_POST['ledcode'];
	$cusled = $_POST['cusled'];
	if ($cusled == 'Y') {
		$r=mysql_query("select * from acc_ledger_master where led_code = '$ledcode'");
	}
	else {
	        $r=mysql_query("select * from acc_ledger_master");// where led_code = '$ledcode'");
	}	       
       

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 */
   
  function getcrdrstate()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select * from mas_state");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 
   
   
  function getcrdrcountry()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select * from mas_country");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 

   
  function getcrdrtax()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select * from mas_tax  order by tax_name");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 

  function getcrdragent()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select sagt_code,sagt_name from mas_supagent order by sagt_name");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 
  function getcrtds()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select tds_code,tds_name from mas_acc_tds  order by tds_code");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 
  function getcrdrpartygrp()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select * from maspur_supplier_group  order by sup_grp_name");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
  
 
   	
function getarea()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select area_code,area_name from mas_area order by area_name");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

	
 function getaccountsgroup()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select grp_code,grp_name from acc_group_master where grp_parent_code = 51 order by grp_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getlotitemdet()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$itemcode = $_POST['itemcode'];
	$finid = $_POST['finid'];
	$lotcode = $_POST['lotcode'];
        $r=mysql_query("call sprm_sel_itemlotdetails($compcode,$finid,$itemcode,$lotcode)");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getlotdet()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$itemcode = $_POST['itemcode'];
	$finid = $_POST['finid'];
        $r=mysql_query("call sprm_sel_itemlotdetails1($compcode,$itemcode)");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getissno()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['fincode'];
	$AEDFlag = $_POST['AEDFlag'];
	
	if ($AEDFlag === "Add")
	{

		$r=mysql_query("select ifnull(max(issh_no),0) + 1 as issno from trnrm_issue_header where issh_compcode='$compcode' and issh_fincode='$finid'");
	}
	else if ($AEDFlag === "Edit")
	{
		$r=mysql_query("select issh_no,issh_seqno from trnrm_issue_header where issh_compcode=$compcode and issh_fincode=$finid");
	}
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
function getissdetail()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$issno = $_POST['issno'];
	$AEDFlag = $_POST['AEDFlag'];
	

		$r=mysql_query("call sprm_sel_issue ('$compcode','$finid','$issno')");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getSearchLedgerlist()
    {
        mysql_query("SET NAMES utf8");


        $party     = $_POST['ledger'];
        $qry = "select * from massal_customer where cust_type = 'S' and  cust_ref like '%$party%' order by cust_name";
        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
?>
