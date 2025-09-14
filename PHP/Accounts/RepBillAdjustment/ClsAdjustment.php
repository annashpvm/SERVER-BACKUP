<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

//session_start();	

//query = "select ifnull(max(rate_code),0)+1 as ratecode from massal_rate where rate_comp_code = 1 and rate_fincode=20";
//$result = mysql_query($query);
//$rec = mysql_fetch_array($result);
//$rateseq=$rec['ratecode'];


    $task='findVouNo';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysql_query("SET NAMES utf8");

    switch($task){
		case "findVouNo":
		getVouNo();
		break;

             	case "AdjNoClick" :
		getAdjustmentDetails();
		break;

             	case "loadSearchLedgerlist" :
		getSearchLedgerlist();
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
    

 function getVouNo()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$vouno    = strtoupper($_POST['vouno']);

        $r=mysql_query(" select * from acc_ref ref left join acc_tran trn
 on ref.accref_seqno = trn.acctran_accref_seqno
 left join acc_trail trail 
 on ref.accref_seqno = trail.acctrail_accref_seqno
 join massal_customer mas
 on trn.acctran_led_code = mas.cust_code  
 where accref_comp_code = $compcode and accref_finid = '$finid' and  accref_vouno =  '$vouno'  and cust_type in ('C','D')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
          

 function getAdjustmentDetails()
    {
        mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$vouno     = $_POST['vouno'];
	$db_cr     = $_POST['db_cr'];
	$ledcode   = $_POST['ledcode'];

        if ($db_cr == 'cr')
        $qry = " select * from (
 select  ref_invno,DATE_FORMAT(ref_invdate, '%d-%m-%Y') voudate,ref_paymt_terms,ref_adjamount,ref_adj_days   from acc_adjustments  , acc_trail where  ref_adjseqno = acctrail_accref_seqno and ref_compcode = $compcode and ref_finid = $finid and  ref_docno = '$vouno'  and acctrail_amtmode = 'D' and acctrail_led_code = ref_ledcode and ref_ledcode = $ledcode
 union all
 select ref_docno ref_invno,DATE_FORMAT(ref_docdate, '%d-%m-%Y') voudate,ref_paymt_terms,ref_adjamount,ref_adj_days  from acc_adjustments  , acc_trail where  ref_docseqno = acctrail_accref_seqno and ref_compcode = $compcode and ref_finid = $finid and  ref_adjvouno = '$vouno'  and acctrail_amtmode = 'D' and acctrail_led_code = ref_ledcode and ref_ledcode = $ledcode ) a1 order by voudate";      
        else
         $qry = " select * from (
 select  ref_invno,DATE_FORMAT(ref_invdate, '%d-%m-%Y') voudate,ref_paymt_terms,ref_adjamount,ref_adj_days   from acc_adjustments  , acc_trail where  ref_adjseqno = acctrail_accref_seqno and ref_compcode = $compcode and ref_finid = $finid and  ref_docno = '$vouno'  and acctrail_amtmode = 'C' and acctrail_led_code = ref_ledcode and ref_ledcode = $ledcode
 union all
 select ref_docno ref_invno,DATE_FORMAT(ref_docdate, '%d-%m-%Y') voudate,ref_paymt_terms,ref_adjamount,ref_adj_days  from acc_adjustments  , acc_trail where  ref_docseqno = acctrail_accref_seqno and ref_compcode = $compcode and ref_finid = $finid and  ref_adjvouno = '$vouno'  and acctrail_amtmode = 'C' and acctrail_led_code = ref_ledcode  and ref_ledcode = $ledcode) a1 order by voudate";         


//echo $qry;
//echo "<br>";

        $r = mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getSearchLedgerlist()
    {
        mysql_query("SET NAMES utf8");


//        $ledname = strtoupper($_POST['ledger']);
//        $qry = "select * from massal_customer where cust_name like '%$ledname%' order by cust_name";

        $ledname = strtoupper($_POST['ledger']);
        $ledname = trim(str_replace(" ", "", $ledname)); 
        $ledname = trim(str_replace(".", "", $ledname)); 
        $ledname = trim(str_replace("-", "", $ledname));
//        $qry = "select * from massal_customer where cust_name like '%$ledname%'";
      $qry = "select * from massal_customer where left(cust_name,2) != 'zz' and replace(replace(replace(cust_name,' ','')  ,'.',''),'-','')   like '%$ledname%' order by cust_name";

//echo $qry;

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
