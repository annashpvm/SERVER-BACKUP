<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='LoadBPVoucherDetails';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){


	case "LoadBPVoucherDetails":
		getBPVoucherDetail();
            break;
	case "loadSearchLedgerlist":
		getSearchLedgerlist();
		break;
	case "LoadBillAdjustmentDetails":
		getBillAdjustmentDetails();
            break;
	case "LoadBPNameDetail":
		getBPNameDetail();
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

 function getBPVoucherDetail()

    {
  	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
       	$vouno    = $_POST['vouno'];
       	$headled    = $_POST['headled'];

        mysql_query("SET NAMES utf8");

$r=mysql_query("select * from acc_ref ref  join acc_tran tran on  tran.acctran_accref_seqno = ref.accref_seqno   join massal_customer mas on  tran.acctran_led_code = mas.cust_code   where tran.acctran_led_code <> $headled and  accref_vouno = '$vouno' and  accref_comp_code = $compcode and accref_finid = $fincode");

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



        $ledname = strtoupper($_POST['ledger']);
        $ledname = trim(str_replace(" ", "", $ledname)); 
        $ledname = trim(str_replace(".", "", $ledname)); 
//        $qry = "select * from massal_customer where cust_name like '%$ledname%'";
      $qry = "select * from massal_customer where left(cust_name,2) != 'zz' and replace(replace(cust_name,' ','')  ,'.','')  like '%$ledname%' order by cust_name";

        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    } 


 function getBillAdjustmentDetails()
    {
        mysql_query("SET NAMES utf8");
        $seqno = $_POST['seqno'];
        $qry = "select * from acc_adjustments where ref_docseqno = $seqno";

        $qry = " select * from acc_adjustments , acc_trail, acc_ref ,massal_customer  where  accref_seqno = ref_adjseqno and   acctrail_accref_seqno =  ref_adjseqno and ref_ledcode = acctrail_led_code and ref_ledcode =  cust_code and ref_docseqno = $seqno";

        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    } 


  
 function getBPNameDetail()

    {
  	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
       	$vouno    = $_POST['vouno'];

        mysql_query("SET NAMES utf8");

$r=mysql_query("select * from acc_ref ref  join acc_tran tran on  tran.acctran_accref_seqno = ref.accref_seqno   join massal_customer mas on  tran.acctran_led_code = mas.cust_code   where acctran_cramt > 0 and  accref_vouno = '$vouno' and  accref_comp_code = $compcode and accref_finid = $fincode");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

?>
