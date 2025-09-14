<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadgrnno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadsupplier":
		getsupplier();
		break;
		case "loadothsaleno":
		getothersaleno();
		break;
		case "loadcarrier":
		getcarrier();
		break;
		case "loadpayterms":
		getpayterms();
		break;
		case  "loaditem":
		getitem();
		break;
		case  "loadgstno":
		getgstno();
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
    
   
 
	

function getsupplier(){
    $query = "select sup_code,sup_refname from maspur_supplier_master union select cust_code as sup_code,cust_ref as sup_refname from massal_customer where cust_taxtag=9";
    $result = mysql_query($query);
    $nbrows = mysql_num_rows($result);
    if ($nbrows > 0) {
        while ($rec = mysql_fetch_array($result)) {
            $arr[] = $rec;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nbrows . '","results":' . $jsonresult . '})';
    } else {
        echo '({"total":"0", "results":""})';
    }
   }
	
 function getothersaleno()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $r=mysql_query("select ifnull(max(os_docno),0)+1 as salenoteno from trnpur_other_sales where os_fincode=27 and os_compcode=1");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getcarrier()
    {
        mysql_query("SET NAMES utf8");
	$r=mysql_query("select * from mas_transport");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


function getpayterms()
    {
        mysql_query("SET NAMES utf8");
	$r=mysql_query("select * from mas_terms");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getitem()
    {
        mysql_query("SET NAMES utf8");
	$r=mysql_query("select salitem_code,salitem_name from mas_othersales_item_master order by salitem_code,salitem_name");
	//$r=mysql_query("select * from mas_terms");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getgstno()
    {
        mysql_query("SET NAMES utf8");
	$supplier = $_POST['supplier'];
	$r=mysql_query("select * from maspur_supplier_master where sup_code=$supplier");
	//$r=mysql_query("select * from mas_terms");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

?>
