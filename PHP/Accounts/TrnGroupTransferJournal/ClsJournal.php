<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadInvDetails';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysql_query("SET NAMES utf8");

    switch($task){

		case "LoadJournalVoucherList":
		getJournalVoucherList();
		break;
		//case "LoadJournalVoucherDetails":
//		getJournalVoucherDetail();
		break;
             	case "loadSearchLedgerlist":
		getSearchLedgerlist();
		break;
             	case "loadReportLedgerGroupList" :
		getReportLedgerGroupList();
		break;
             	case "loadReportGroupLedgerBalance" :
		getReportGroupLedgerBalance();
		break;
           	case "loadReportGroupLedgerList" :
		getReportGroupLedgerList();
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
    



 function getJournalVoucherList()

    {
  	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];      
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select dbcr_vouno from acc_dbcrnote_header where dbcr_type = 'DNG' and dbcr_finid = '$fincode' and dbcr_comp_code = '$compcode' order by dbcr_no  desc");
       $r=mysql_query("select * from acc_ref where accref_comp_code = '$compcode' and accref_finid = '$fincode' and accref_vou_type = 'GJV' order by substring(ltrim(accref_vouno),4,4) desc");
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
        $qry = "select * from acc_ledger_master where led_name like '%$ledname%'";
        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    } 


 function getReportLedgerGroupList()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$seqno    = $_POST['seqno'];

 $r=mysql_query("select rep_merge_code,rep_merge_name from acc_rep_ledger_merge group by rep_merge_code,rep_merge_name order by rep_merge_name");



	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getReportGroupLedgerList()
    {
        mysql_query("SET NAMES utf8");

	$reportgroup    = $_POST['reportgroup'];

 $r=mysql_query("select concat('(',group_concat(rep_ledcode),')') ledcodelist from acc_rep_ledger_merge where  rep_merge_code = $reportgroup");



	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getReportGroupLedgerBalance()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$asondate = $_POST['asondate'];
	$ledcode = $_POST['ledcode'];


         $r = mysql_query("
select curbal_led_code,led_name, curbal_obdbamt-curbal_obcramt+ trn_opdr-trn_opcr as closing,
case when curbal_obdbamt-curbal_obcramt+ trn_opdr-trn_opcr > 0 then curbal_obdbamt-curbal_obcramt+ trn_opdr-trn_opcr else 0 end as debit_balance,case when curbal_obdbamt-curbal_obcramt+ trn_opdr-trn_opcr <= 0 then abs(curbal_obdbamt-curbal_obcramt+ trn_opdr-trn_opcr) else 0 end as credit_balance,led_type, case when led_type = 'C' then 'CUSTOMER' else 'SUPPLIER' end as ledger_type from 
(
select  curbal_led_code , sum(curbal_obdbamt)  curbal_obdbamt, sum(curbal_obcramt) curbal_obcramt from acc_current_balance  where find_in_set(curbal_led_code,'$ledcode') and  curbal_comp_code = $compcode  and curbal_finid  = $finid  group by curbal_led_code
) op

left join
(
select  acctran_led_code ,  sum(acctran_dbamt) as trn_opdr  , sum(acctran_cramt) as trn_opcr  from acc_ref a ,acc_tran b  where accref_comp_code = $compcode and accref_finid = $finid   and accref_seqno  = acctran_accref_seqno  and  accref_voudate  > '2022-08-31' and   accref_voudate  <=  '$asondate' and find_in_set(acctran_led_code,'$ledcode')  group by acctran_led_code) trnop on  op.curbal_led_code = trnop.acctran_led_code , acc_ledger_master where curbal_led_code = led_code");


         $r = mysql_query("select  ledgercode,led_name, curbal_obdbamt-curbal_obcramt+ trn_opdr-trn_opcr as closing,
case when curbal_obdbamt-curbal_obcramt+ trn_opdr-trn_opcr > 0 then curbal_obdbamt-curbal_obcramt+ trn_opdr-trn_opcr else 0 end as debit_balance,case when curbal_obdbamt-curbal_obcramt+ trn_opdr-trn_opcr <= 0 then abs(curbal_obdbamt-curbal_obcramt+ trn_opdr-trn_opcr) else 0 end as credit_balance,led_type, case when led_type = 'C' then 'CUSTOMER' else 'SUPPLIER' end as ledger_type from
(
select ledgercode, sum(curbal_obdbamt) curbal_obdbamt, sum(curbal_obcramt) curbal_obcramt, sum(trn_opdr) trn_opdr, sum(trn_opcr) trn_opcr
 from 
(
select  curbal_led_code  ledgercode , sum(curbal_obdbamt)  curbal_obdbamt, sum(curbal_obcramt) curbal_obcramt, 0 trn_opdr, 0 trn_opcr from acc_current_balance  where find_in_set(curbal_led_code,'$ledcode') and  curbal_comp_code = $compcode  and curbal_finid  = $finid  group by curbal_led_code
union all
select  acctran_led_code ledgercode ,  0 as curbal_obdbamt, 0 as curbal_obcramt, sum(acctran_dbamt) as trn_opdr  , sum(acctran_cramt) as trn_opcr  from acc_ref a ,acc_tran b  where accref_comp_code = $compcode and accref_finid = $finid  and accref_seqno  = acctran_accref_seqno  and  accref_voudate  > '2022-08-31' and   accref_voudate  <=  '$asondate' and find_in_set(acctran_led_code,'$ledcode')  group by acctran_led_code
) z1 group by ledgercode
)a1 , acc_ledger_master where ledgercode = led_code

        ");   
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);

	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }




/*
 function getJournalVoucherDetail()

    {
  	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
       	$vouno    = $_POST['vouno'];

        mysql_query("SET NAMES utf8");
//        $r=mysql_query("select dbcr_vouno from acc_dbcrnote_header where dbcr_type = 'DNG' and dbcr_finid = '$fincode' and dbcr_comp_code = '$compcode' order by dbcr_vouno  desc");

$r=mysql_query("select * from acc_ref ref  join acc_tran tran on  tran.acctran_accref_seqno = ref.accref_seqno   join acc_ledger_master mas on  tran.acctran_led_code = mas.led_code  where accref_vouno = '$vouno' and  accref_comp_code = $compcode and accref_finid = $fincode");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
*/

?>
