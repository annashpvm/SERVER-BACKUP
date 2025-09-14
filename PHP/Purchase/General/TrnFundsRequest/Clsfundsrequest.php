<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task="LoadBankSupplierList";

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "LoadBankSupplierList":
		getBankSupplierList();
		break;
		case "LoadPartyBank":
		getPartyBank();
		break;
		case "LoadEntryNo":
		getEntryNo();
		break;
		case "loadEntNoList":
		getEntNoList();
		break;
		case "loadEntNoDetail":
		getEntNoDetail();
		break;
		case "loadSearchPartylist":
		getSearchPartylist();
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
    
   

 function getBankSupplierList()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select suppliercode, sup_refname, sup_bank_bankname, sup_bank_branch, sup_bank_ifsc, sup_bank_bank_acno from  maspur_supplier_bank , maspur_supplier_master where sup_code = suppliercode");


        $r=mysql_query("select * from  maspur_supplier_bank order by sup_name");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getPartyBank()
    {
        mysql_query("SET NAMES utf8");
   	$suppcode = $_POST['suppcode'];
        $r=mysql_query("select * from  maspur_supplier_bank where suppliercode = $suppcode");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getEntryNo()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
        $r=mysql_query("select ifnull(max(f_frm_no),0)+1 as f_frm_no from trn_frm where f_compcode= '$compcode' and f_fincode= '$finid'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 
function getEntNoList()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
        $r=mysql_query("select f_frm_no from trn_frm where f_compcode= '$compcode' and f_fincode= '$finid' group by f_frm_no  order by f_frm_no desc ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


function getEntNoDetail()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$entno = $_POST['entno'];

//        $r=mysql_query("select  * from trn_frm , maspur_supplier_master where f_partycode = sup_code and  f_compcode= '$compcode' and f_fincode= '$finid ' and f_frm_no = $entno  order by f_sno ");
        $r=mysql_query("select  * from trn_frm where f_compcode= '$compcode' and f_fincode= '$finid ' and f_frm_no = $entno  order by f_sno");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getSearchPartylist()
    {
        mysql_query("SET NAMES utf8");
        $party     = $_POST['party'];
      
        if ($party == '')
        $qry = "select * from maspur_supplier_bank order by sup_name";
        else
        $qry = "select * from maspur_supplier_bank where sup_name like '%$party%' order by sup_name";
   

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
