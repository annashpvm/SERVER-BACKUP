<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task="loadFundPlanDetails";

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadFundPlanDetails":
		getFundsPlan();
		break;

		case "loadFundPaidDetails":
		getFundsPaid();
		break;

	        default:
		break;
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
    
   
 function getFundsPlan()
    {
        mysql_query("SET NAMES utf8");


        $startdate = $_POST['startdate'];
        $enddate   = $_POST['enddate'];

$r=mysql_query("select fp_date,DATE_FORMAT(fp_date, '%d-%m-%Y') fp_date2,fp_ilc,fp_dpda,fp_gst,fp_salary,fp_eb, fp_wp,fp_biomass,fp_duty,fp_chemicals,fp_coal,fp_emi, fp_spares,fp_total from trn_funds_plan where fp_date between '$startdate' and '$enddate' order by fp_date");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	


 function getFundsPaid()
    {
        mysql_query("SET NAMES utf8");


        $repdate = $_POST['repdate'];


        $r=mysql_query("select * from trn_funds_plan where fp_date =  '$repdate'");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	
?>




