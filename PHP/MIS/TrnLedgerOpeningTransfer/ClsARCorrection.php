<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadinvoiceno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		
		case "loadinvoiceno":
		getinvoiceno();
		break;
		case "loadinvoiceamt":
		getinvoiceamt();
		break;
		
		case "loadAllCustomerDetails":
		getAllCustomerDetails();
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
    
   


 function getinvoiceno()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
         $cust_code   =$_POST['cust_code'];
     
$r=mysql_query("select * from acc_ref ref left join acc_trail trail on ref.accref_seqno = trail.acctrail_accref_seqno join acc_ledger_master mas on trail.acctrail_led_code =mas.led_code and led_type='c' where accref_comp_code = '$compcode' and accref_vou_type in ('GSI') and led_code = $cust_code");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }   
function getinvoiceamt()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $cust_code   =$_POST['cust_code'];
	$acctrail_inv_no   =$_POST['acctrail_inv_no'];
     

$r=mysql_query("select * from acc_trail where acctrail_inv_no ='$acctrail_inv_no' and acctrail_led_code = $cust_code");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }   
function getAllCustomerDetails()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
      
      
        $r =mysql_query("select * from acc_ledger_master where led_type ='c'");
   	

 

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }   

?>
