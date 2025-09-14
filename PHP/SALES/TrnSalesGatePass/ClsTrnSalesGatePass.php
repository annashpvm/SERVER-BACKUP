<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadfindgpNo';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadfindgpNo":
		getfindgpno();
		break;    
		case "loadvehicleno":
		getvehiclelist();
		break;
		case "loadvehiclenodetail":
		getvehicledetail();
		break;
		case "loadvehiclenodetailsinvoice":
		getvehicledetailsinvoice();
		break;
		case "loadpartydetailsinvoice":
		getpartydetails();
		break;

		case "checkgatepassno":
		CheckGPentry();
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
    
  function getfindgpno()
    {
        mysql_query("SET NAMES utf8");
        $compcode =  $_POST['compcode'];
        $finid = $_POST['finid'];

        $r=mysql_query("select ifnull(max(gp_no),0)+1 as gp_no from  trnsal_gate_pass where gp_fincode  = $finid  and gp_compcode = $compcode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getgpnolist()
    {
        mysql_query("SET NAMES utf8");
        $compcode =  $_POST['compcode'];
        $finid = $_POST['finid'];

        $r=mysql_query("select gp_no from  trnsal_gate_pass where gp_fincode  = $finid  and gp_compcode = $compcode group by gp_no  order by gp_no desc");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


  function getvehiclelist()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
        $gpdate = $_POST['gpdate'];
	$r=mysql_query("select invh_vehi_no from trnsal_invoice_header a, massal_customer b where a.invh_party = b.cust_code and invh_comp_code = '$compcode'  and invh_fincode = '$finid' and invh_date = '$gpdate' group by invh_vehi_no");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 
   
  function getvehicledetail()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
        $gpdate = $_POST['gpdate'];
        $vechileno = $_POST['vechileno'];
	$r=mysql_query("select * from trnsal_invoice_header a, massal_customer b where a.invh_party = b.cust_code and invh_comp_code = '$compcode'  and invh_fincode = '$finid' and invh_date = '$gpdate' and invh_vehi_no  = '$vechileno' ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 
  function getvehicledetailsinvoice()
    {
        mysql_query("SET NAMES utf8");
        $compcode  = $_POST['compcode'];
        $finid     = $_POST['finid'];
        $gpdate    = $_POST['gpdate'];
        $invfrom   = $_POST['invfrom'];
        $invto     = $_POST['invto'];
	$r=mysql_query("select * from trnsal_invoice_header a, massal_customer b where a.invh_party = b.cust_code and invh_comp_code = '$compcode'  and invh_fincode = '$finid' and invh_date = '$gpdate' and invh_no >= '$invfrom' and invh_no <= '$invto'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



  function getpartydetails()
    {
        mysql_query("SET NAMES utf8");
        $compcode  = $_POST['compcode'];
        $finid     = $_POST['finid'];
        $gpdate    = $_POST['gpdate'];
        $invfrom   = $_POST['invfrom'];
        $invto     = $_POST['invto'];
	$r=mysql_query("select count(*) as nos from (select invh_party from trnsal_invoice_header where invh_comp_code = '$compcode'  and invh_fincode = '$finid' and invh_date = '$gpdate' and invh_no >= '$invfrom' and invh_no <= '$invto' group by invh_party ) aa");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    

  function CheckGPentry()
    {
        mysql_query("SET NAMES utf8");
        $compcode  = $_POST['compcode'];
        $finid     = $_POST['finid'];
        $gpdate    = $_POST['gpdate'];
        $vechileno = $_POST['vechileno'];
        $r=mysql_query("select * from trnsal_gate_pass where gp_date  =  '$gpdate' and gp_truck = '$vechileno'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


?>
