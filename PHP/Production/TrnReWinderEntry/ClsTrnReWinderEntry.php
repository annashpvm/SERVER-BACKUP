<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadissno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadRWEntryNo":
			getRWEntryNo();
			break;
		case "loadRWEntryNoList":
			getRWEntryNoList();
			break;
		case "loadRWEntryNoDetail":
			getRWEntryNoDetail();
			break;
    		case "findReelNo":
                    getReellNo();
		    break;
		case "CheckNumber":
		    getNumber();
		break;

    		case "loadRollNo":
                    getRollNo();
		    break;
		case "loadVariety":
		    getVariety();
		    break;
		case "loadVarietyDetails":
		    getVarietyDetails();
		    break;
		case "loadMCShiftDetails":
		    getMCShiftDetails();
		    break;
		case "loadSizeofVariety":
		    getSizeofVariety();
		    break;
		case "loadSupervisor":
			getSupervisor();
			break;
             	case "loadSONoList":
			getSONoList();
			break;
		case "loadSOCustomer":
			getSOCustomer();
			break;
		case "loadAllCustomer":
			getAllCustomer();
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
        $rdate    = $_POST['rdate']; 
	
	$r=mysql_query("select prd_rollno from trn_dayprod_roll_details a, trn_dayprod_roll_variety_details where prd_seqno = prdv_seqno and prd_rollno = prdv_rollno and prd_compcode = '$compcode' and prd_fincode = '$finid'  and prd_date = '$rdate' and prd_roll_status = 'A' group by prd_rollno  order by prd_rollno");


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
        $rdate    = $_POST['rdate'];
	
	$r=mysql_query("select var_desc,var_groupcode from trn_dayprod_roll_details a, trn_dayprod_roll_variety_details , masprd_variety where prd_seqno = prdv_seqno and prd_rollno = prdv_rollno and prd_compcode ='$compcode' and prd_fincode =  '$finid' and prd_rollno = $rollno and prd_date = '$rdate' and prd_roll_status = 'A' and prdv_varty = var_groupcode group by var_desc,var_groupcode  order by var_desc,var_groupcode ");

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
        $rdate    = $_POST['rdate'];
	$r=mysql_query("select var_bf,var_gsm,prd_deckle,prd_breaks,prd_roll_dia,prdv_qty,prdv_sets , prd_seqno from trn_dayprod_roll_details a, trn_dayprod_roll_variety_details , masprd_variety where prd_seqno = prdv_seqno and prd_rollno = prdv_rollno and prd_compcode ='$compcode' and prd_fincode =  '$finid' and prd_rollno = $rollno and prd_date = ' $rdate' and prd_roll_status = 'A' and prdv_varty = var_groupcode  and prdv_varty = '$varty' ");

		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }

   function getMCShiftDetails()
	    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$rollno   = $_POST['rollno']; 
	$varty    = $_POST['varty'];
        $rdate    = $_POST['rdate'];	
	$r=mysql_query("select prd_shift from trn_dayprod_roll_details a, trn_dayprod_roll_variety_details , masprd_variety where prd_seqno = prdv_seqno and prd_rollno = prdv_rollno and prd_compcode ='$compcode' and prd_fincode =  '$finid' and prd_rollno = $rollno and prd_date = ' $rdate' and prd_roll_status = 'A' and prdv_varty = var_groupcode  and prdv_varty = '$varty' group by prd_shift");

		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }

   function getSizeofVariety()
	    {
        mysql_query("SET NAMES utf8");
	$varty    = $_POST['varty'];
 	
	$r=mysql_query("select var_code, concat(cast(var_size2 as CHAR) ,space(2) ,var_inchcm ) as sizecode from massal_variety ,masprd_variety where var_grpcode = var_groupcode and var_grpcode = '$varty'");
	$r=mysql_query("select var_code, concat(cast(var_size2 as CHAR) ,space(2) ,(case when var_inchcm = 'I' then 'Inch' else 'CM' end) ) as sizecode from massal_variety ,masprd_variety where var_grpcode = var_groupcode and var_grpcode = '$varty'");
		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }

 function getReelNo()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$winderno = $_POST['winderno'];

        $r=mysql_query("select  ifnull(max(r_winder_reelno),0)+1 as reelno  from trn_dayprod_rewinder where r_compcode = $compcode and r_fincode = $finid  and r_winder_no = $winderno");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getRWEntryNo()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$rdate    = $_POST['rdate'];
        $r=mysql_query("select ifnull(max(r_entryno),0)+1 as entryno from trn_dayprod_rewinder where r_fincode = '$finid' and r_compcode='$compcode' and  r_w_date = '$rdate'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getRWEntryNoList()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$rdate    = $_POST['rdate'];
        $r=mysql_query("select r_entryno from trn_dayprod_rewinder where r_fincode = '$finid' and r_compcode='$compcode' and  r_w_date = '$rdate'  group by r_entryno order by r_entryno");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getRWEntryNoDetail()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$rdate    = $_POST['rdate'];
	$entryno  = $_POST['entryno'];

        $r=mysql_query("select  * from trn_dayprod_rewinder a , masprd_variety b , mas_supervisor c , massal_customer d where r_w_date = '$rdate' and  r_fincode = '$finid'  and  r_compcode = '$compcode' and r_entryno =  $entryno and r_varietycode = var_groupcode and spvr_code = r_operator and r_custcode = cust_code");

        $r=mysql_query("select  * from trn_dayprod_rewinder a , masprd_variety b , mas_supervisor c  where r_w_date = '$rdate' and  r_fincode = '$finid'  and  r_compcode = '$compcode' and r_entryno =  $entryno and r_varietycode = var_groupcode and spvr_code = r_operator");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


	 function getSupervisor()
	    {
		mysql_query("SET NAMES utf8");
		$r=mysql_query("select * from mas_supervisor  where spvr_type = 'R' order by spvr_name");
		$nrow = mysql_num_rows($r); 
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }    

 function getSONoList()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];


        $r=mysql_query("select ordh_sono from trnsal_order_header where ordh_fincode = $finid  and ordh_comp_code= $compcode group by ordh_sono  order by ordh_sono desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getSOCustomer()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $sono     = $_POST['sono'];
        $r=mysql_query("select cust_ref,cust_code from trnsal_order_header , massal_customer where ordh_party = cust_code and ordh_fincode = $finid   and ordh_comp_code= $compcode  and ordh_sono =  $sono ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getAllCustomer()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select cust_ref,cust_code from massal_customer order by cust_ref ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getNumber()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$reelno   = $_POST['reelno'];
        $r=mysql_query("select count(*) as nos from trn_dayprod_rewinder where r_reelno = $reelno");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
?>
