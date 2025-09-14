<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadentryno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadentryno":
		getentryno();
		break;    
		case "loadSizeDetails":
		getSizeList();
		break;
		case "loadReelNoDetails":
		getReelNoList();
		break;
		case "loadentrynolist":
		getentrynolist();
		break;
		case "loadentrynodetails":
		getentrynodetails();
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
    


  function getentryno()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
	$r=mysql_query("select IFNULL(max(ent_no),0)+1 as no from trn_sal_variety_change where  comp_code ='$compcode' and fin_code ='$finid'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 

  function getentrynolist()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];

$r=mysql_query("select ent_no from trn_sal_variety_change where  comp_code ='$compcode' and fin_code ='$finid' group by ent_no  order by ent_no desc");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


  function getentrynodetails()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
        $docno = $_POST['docno'];
	$r=mysql_query("select b.var_name as old_name,old_itemcode as old_code,srno as number,c.var_name as new_name ,new_itemcode as new_code,weight,ent_date from trn_sal_variety_change a ,massal_variety b,massal_variety c where comp_code= '$compcode' and fin_code= '$finid'  and a.old_itemcode=b.var_code and a.new_itemcode=c.var_code and ent_no = $docno order by number");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
   
 function getSizeList()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];

        $r=mysql_query("select var_name,var_code  from trnsal_finish_stock a, massal_variety b where stk_var_code = var_code and  stk_comp_code = '$compcode'  and stk_finyear ='$finid' and (stk_destag = '' or stk_rettag = 'T') group by var_name,var_code  order by var_name,var_code");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	

 function getReelNoList()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
        $sizecode = $_POST['sizecode'];

        $r=mysql_query("select * from trnsal_finish_stock where stk_var_code = '$sizecode' and stk_comp_code = '$compcode' and stk_finyear = '$finid' and (stk_destag <> 'T' or (stk_destag <> 'T'  and stk_rettag = 'T')) and stk_deltag <> 'T'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	
 


?>
