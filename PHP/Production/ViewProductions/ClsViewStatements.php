<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task="loadMCProductions";

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadMCProductions":
		getMCProductions();
		break;
		case "loadPerformance":
		getPerformance();
		break;
		case "loadDownTime":
		getDownTime();
		break;
		case "loadRollLossDetails":
		getRollLossDetails();
		break;
		case "loadMCProductions_Monthwise":
		getMCProductions_Monthwise();
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
    
   

 function getMCProductions()
    {
        mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];


$r=mysql_query(" call spprd_rep_gsmwise_prodn($compcode,$finid ,'$startdate', '$enddate')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getPerformance()
    {
        mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];


$r=mysql_query(" call sprep_prod_machine_efficiency($compcode,$finid ,'$startdate', '$enddate')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }




 function getDownTime()
    {
	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];

	mysql_query("SET NAMES utf8");
$r=mysql_query("select * , DATE_FORMAT(prds_starttime, '%d-%m-%Y %H:%i:00') as starttime  , DATE_FORMAT(prds_endtime, '%d-%m-%Y %H:%i:00') as endtime  from  trn_dayprod_header,trn_dayprod_downtime , masprd_variety,mas_department, mas_section  where prdh_id = prds_id and prdh_compcode = prds_compcode and prdh_fincode = prds_fincode and prdh_compcode = $compcode and prdh_fincode = $finid  and prdh_date between '$startdate' and  '$enddate' and prds_qlycode = var_groupcode and prds_section = section_code and prds_dept =  department_code");

  
	mysql_query("SET NAMES utf8");
$r=mysql_query("select DATE_FORMAT(prdh_date, '%d-%m-%Y') as prdh_date, prdh_shift,var_desc, department_name ,section_name,  DATE_FORMAT(prds_starttime, '%d-%m-%Y %H:%i:00') as  prds_starttime, DATE_FORMAT(prds_endtime, '%d-%m-%Y %H:%i:00') as prds_endtime,prds_mins,  prds_nature_of_breakdown,prds_rootcause, prds_actiontaken, prds_correctiveaction   from  trn_dayprod_header,trn_dayprod_downtime , masprd_variety,mas_department, mas_section  where prdh_id = prds_id and prdh_compcode = prds_compcode and prdh_fincode = prds_fincode and prdh_compcode = $compcode and prdh_fincode = $finid  and prdh_date between '$startdate' and  '$enddate' and prds_qlycode = var_groupcode and prds_section = section_code and prds_dept =  department_code");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
	}
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }





 function getRollLossDetails()
    {
	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];


  
	mysql_query("SET NAMES utf8");
        $r=mysql_query(" call sprep_prod_rollwise_deckle_loss($compcode,$finid ,'$startdate', '$enddate')");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
	}
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getMCProductions_Monthwise()
    {
        mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
        $r=mysql_query(" call spprd_rep_monthwise_prodn($compcode,$finid ,'$startdate', '$enddate')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

?>




