<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadOrderEntryNo';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysql_query("SET NAMES utf8");

    switch($task){

		case "loadMissingCustomer":
		getMissingCustomer();
		break;

		case "loadRepresentative":
		getRepresentative();
		break;

		case "loadCustomerList":
		getCustomerList();
		break;

		case "loadCustomerList2":
		getCustomerList2();
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
    

 function getRepresentative()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select * from massal_repr");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getCustomerList()
    {
        mysql_query("SET NAMES utf8");

        $Repcode = $_POST['repcode'];
        
//$r=mysql_query("select (@count:=@count+1)  as sno,cust_code, cust_ref,cust_cr_days,cust_desp_target from massal_customer, massal_repr where cust_repr = repr_code and repr_code = '$Repcode'");

        $r = mysql_query("call sp_sal_repcustomer('$Repcode');");
	$nrow = mysql_num_rows($r);

	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getMissingCustomer()
    {
        mysql_query("SET NAMES utf8");

        $r = mysql_query("select * from massal_customer  where cust_code not in (select customer_code from massal_target)");
	$nrow = mysql_num_rows($r);

	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


    function getCustomerList2()
    {
        mysql_query("SET NAMES utf8");

        $Repcode = $_POST['repcode'];
        $repmonth = $_POST['repmonth'];
        $repyear = $_POST['repyear'];

        $r = mysql_query("call sp_sal_repcustomer2('$Repcode','$repmonth','$repyear');");
	$nrow = mysql_num_rows($r);

	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


?>
