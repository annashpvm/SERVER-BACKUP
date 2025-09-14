<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadissno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
    		case "loadRollNo":
                    getRollNo();
		    break;
		case "loadVariety":
		    getVariety();
		    break;
		case "loadVarietyDetails":
		    getVarietyDetails();
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
    
 function getRollNo()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	 
	
	$r=mysql_query("select prd_rollno from trn_dayprod_roll_details a, trn_dayprod_roll_variety_details where prd_seqno = prdv_seqno and prd_rollno = prdv_rollno and prd_compcode = '$compcode' and prd_fincode = '$finid'  and prd_date = '2022-03-10' and prd_roll_status = 'A' group by prd_rollno  order by prd_rollno");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }  

   function getVariety()
	    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$rollno   = $_POST['rollno']; 
	
	$r=mysql_query("select var_desc,var_groupcode from trn_dayprod_roll_details a, trn_dayprod_roll_variety_details , masprd_variety where prd_seqno = prdv_seqno and prd_rollno = prdv_rollno and prd_compcode ='$compcode' and prd_fincode =  '$finid' and prd_rollno = $rollno and prd_date = '2022-03-10' and prd_roll_status = 'A' and prdv_varty = var_groupcode group by var_desc,var_groupcode  order by var_desc,var_groupcode ");

		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }

   function getVarietyDetails()
	    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$rollno   = $_POST['rollno']; 
	$varty    = $_POST['varty'];
 	
	$r=mysql_query("select var_bf,var_gsm,prd_deckle,prd_breaks,prd_roll_dia,prdv_qty,prdv_sets  from trn_dayprod_roll_details a, trn_dayprod_roll_variety_details , masprd_variety where prd_seqno = prdv_seqno and prd_rollno = prdv_rollno and prd_compcode ='$compcode' and prd_fincode =  '$finid' and prd_rollno = $rollno and prd_date = '2022-03-10' and prd_roll_status = 'A' and prdv_varty = var_groupcode  and prdv_varty = '$varty' ");

		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }
?>
