<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadDeliveryAddress';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysql_query("SET NAMES utf8");

    switch($task){

		case "loadDeliveryAddress":
		getDeliveryAddress();
		break;

		case "loadstates":
		getstatelist();
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
    

 function getDeliveryAddress()
    {
        mysql_query("SET NAMES utf8");
	$custcode = $_POST['custcode'];



        $r=mysql_query("select * from trnsal_delivery_address, mas_state  where delivery_state = state_code and  d_custcode = '$custcode'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


   function getstatelist()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select state_code,state_name from mas_state order by state_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


?>
