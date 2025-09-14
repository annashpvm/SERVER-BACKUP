	<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
    
    


    $task='loadDetails';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadDetails":
		getDetails();
		break;
		case "loadTBDetails":
		getTBDetails();
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
    
   
 function getDetails()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select cust_ref,invh_no,invh_date,invh_totwt,invh_netamt from trnsal_invoice_header,massal_customer where invh_party = cust_code and invh_date between '2023-01-01' and '2023-01-31' order by cust_ref");

        $r=mysql_query("select concat(repr_name,'-',cust_ref) cust_ref ,invh_no,invh_date,invh_totwt,invh_netamt from trnsal_invoice_header,massal_customer , massal_repr where cust_repr = repr_code and invh_party = cust_code and invh_date between '2023-01-01' and '2023-01-31' order by cust_ref");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
 function getTBDetails()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("call accsp_trial_balance(23,1,'2023-04-1','2023-04-20')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	

?>
