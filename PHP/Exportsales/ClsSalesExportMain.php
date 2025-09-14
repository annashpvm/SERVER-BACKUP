
<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConndpm.php");

$grpcode = $_POST['grpcode'];

echo $task;

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
        switch($task){
		case "loadmillname":
		loadMillList();
		break;
		case "findmillname":
		getmillname();
		break;
		case "loadFinYear":
		loadFinYear();
		break;
		case "loadVariety":
		getVarietyList();
		break;
		case "loadSizeDetails":
		getSizeList();
		break;
		case "loadSizeDetailsOfVariety":
		getSizeListOfVariety();
		break;
		case "loadAllCustomerDetails":
		getAllCustomerList();
		break;
		case "findSizeDetails":
		getSizecodeDetails();
		break;
		case "loadGSTDetails":
		getAllGSTDetails();
		break;
		case "findGSTDetails":
		getGSTDetails();
		break;
		case "loadLedgers":
		getLedgerList();
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
    
  	
 function loadMillList()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select comp_code,comp_name from mas_company");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
    function getmillname()
    {
        mysql_query("SET NAMES utf8");
     	$mname = $_POST['millcode'];
        $r=mysql_query("select comp_pass from mas_company where comp_code = $mname");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

    function loadFinYear()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select * from mas_finyear order by fin_code");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

   
 function getVarietyList()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select var_code,var_desc from masprd_variety");
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

        $r=mysql_query("select var_code,var_name from massal_variety");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	
 function getSizeListOfVariety()
    {
        mysql_query("SET NAMES utf8");
     	$grpcode = $_POST['grpcode'];
        $r=mysql_query("select b.var_code,b.var_name,b.var_grpcode from masprd_variety a,massal_variety b where b.var_grpcode = a.var_code and var_grpcode =$grpcode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
 function getAllCustomerList()
    {
        mysql_query("SET NAMES utf8");
       $r=mysql_query("select cust_code,cust_ref from massal_customer");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getAllGSTDetails()
    {
        mysql_query("SET NAMES utf8");
       $r=mysql_query("select tax_code,tax_name from mas_tax");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getGSTDetails()
    {
        mysql_query("SET NAMES utf8");
   	$taxcode = $_POST['taxcode'];
       $r=mysql_query("select * from mas_tax where tax_code = $taxcode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getSizecodeDetails()
    {
        mysql_query("SET NAMES utf8");

   	$sizecode = $_POST['sizecode'];
        $r=mysql_query("select var_size1,var_size2,var_desc,var_gsm,var_unit,var_sheets,var_reams,var_tariffno from massal_variety a,masprd_variety b where a.var_grpcode = b.var_code and a.var_code = $sizecode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getLedgerList()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select led_code,led_name from mas_ledger");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

?>



