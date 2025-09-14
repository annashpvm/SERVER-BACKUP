<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadsalessocno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
    		case "loadfinyear":
		getfinyear();
		break;
		case "loadentryno":
		getentryno();
		break;    
		case "loadsizedetails":
		getsizedetails();
		break;
		case "loadstockdetails":
		getstockdetails();
		break;
		case "loadentrynolist":
		getentrynolist();
		break;
		case "loadeditentryno":
		geteditentryno();
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

 function getfinyear()
    {
    	mysql_query("SET NAMES utf8");
//        $r=mysql_query("select fin_id,fin_year from fin_master where fin_flag='Y'");
        $r=mysql_query("select fin_code,fin_year from mas_finyear");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    




  function getentryno()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
        $r=mysql_query("select IFNULL(max(tr_entno),0)+1 as tr_entno from trnsal_whouse_stock_remove where  tr_compcode ='$compcode' and tr_finyear ='$finid'");	
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



  function getsizedetails()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];

        $r=mysql_query("select * from massal_customer");

    $r=mysql_query("select var_code,var_name from massal_variety a, trnsal_finish_stock b where a.var_code = b.stk_var_code and b.stk_destag <> 'T' and b.stk_deltag <> 'T' and stk_comp_code =   '$compcode' and stk_finyear = $finid group by var_code,var_name order by var_name");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

  function geteditentryno()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $finid    = $_POST['finid'];
        $docno    = $_POST['docno'];

        $r=mysql_query("select * from trnsal_whouse_stock_remove a,massal_variety b where a.tr_varcode=b.var_code and tr_compcode = $compcode 
and tr_finyear =  $finid  and tr_entno = $docno");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 
   
  function getstockdetails()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
        $sizecode = $_POST['sizecode'];
        $r=mysql_query("select * from trnsal_finish_stock a, massal_variety b  where a.stk_var_code = b.var_code And a.stk_comp_code =$compcode and
 a.stk_finyear =   $finid  and a.stk_destag <> 'T' and a.stk_deltag <> 'T'and a.stk_var_code = $sizecode order by stk_sr_no  ");

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
        $finid    = $_POST['finid'];

        $r=mysql_query("select tr_entno from trnsal_whouse_stock_remove where  tr_compcode = $compcode and tr_finyear =  $finid group by tr_entno order by tr_entno desc");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
   

?>
