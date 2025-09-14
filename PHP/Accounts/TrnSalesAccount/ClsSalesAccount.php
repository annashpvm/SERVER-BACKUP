<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadInvDetails';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysql_query("SET NAMES utf8");

    switch($task){
		case "loadCGSTledgers":
		getCGSTledgers();
		break;
		case "loadSGSTledgers":
		getSGSTledgers();
		break;
		case "loadIGSTledgers":
		getIGSTledgers();
		break;
		case "loadSearchPartylist":
		getSearchPartylist();
		break;
		case "findPartyType":
		getPartyType();
		break;
		case "LoadSalVouNoDetails":
		getSalVouNoDetails();
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
    



 function getCGSTledgers()
 {
        $ledtype = $_POST['ledtype'];
        $gsttype = $_POST['gsttype'];
        $gstper  = $_POST['gstper'];

        mysql_query("SET NAMES utf8");
        if ($ledtype == "I")
		{
		    $r=mysql_query("select * from massal_customer where cust_name like '%INPUT%CGST%$gstper%'");

		}
		else
		{
		    $r=mysql_query("select * from massal_customer where cust_name like 'CGST'");
		}  
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getSGSTledgers()

    {
        $ledtype = $_POST['ledtype'];
        $gsttype = $_POST['gsttype'];
        $gstper  = $_POST['gstper'];

        mysql_query("SET NAMES utf8");
        if ($ledtype == "I")
		{
		    $r=mysql_query("select * from massal_customer where cust_name like '%INPUT%SGST%$gstper%'");

		}
		else
		{
		    $r=mysql_query("select * from massal_customer where cust_name like 'SGST'");
		}  
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getIGSTledgers()

    {
        $ledtype = $_POST['ledtype'];
        $gsttype = $_POST['gsttype'];
        $gstper  = $_POST['gstper'];

        mysql_query("SET NAMES utf8");
        if ($ledtype == "I")
		{
		    $r=mysql_query("select * from massal_customer where cust_name like '%INPUT%IGST%$gstper%'");

		}
		else
		{
		    $r=mysql_query("select * from massal_customer where cust_name like 'IGST%$gstper%'");
		}  
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


        $party  = $_POST['party'];
        $party = trim(str_replace(" ", "", $party)); 
        $party = trim(str_replace(".", "", $party)); 
        $qry = "select * from massal_customer where cust_type <> 'G' and  replace(replace(cust_name,' ','')  ,'.','')  like '%$party%' order by cust_name";


        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getPartyType()
    {
        mysql_query("SET NAMES utf8");

        $partydrcr = $_POST['partydrcr'];
        $partycode = $_POST['partycode'];

        $qry = "select cust_state statecode from massal_customer where cust_code = $partycode" ;

        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getSalVouNoDetails()
    {
        mysql_query("SET NAMES utf8");

        $compcode = $_POST['compcode'];
        $finid    = $_POST['fincode'];
        $vouno    = $_POST['vouno'];
        $qry = "select * from  acc_direct_sales , massal_customer where cust_code = sal_partycode and  sal_compcode = '$compcode' and sal_finid = '$finid' and sal_vouno = '$vouno'" ;
           
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
