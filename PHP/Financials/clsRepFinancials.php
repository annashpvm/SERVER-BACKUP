<?php
require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");

$task = '';

if (isset($_POST['task'])) {
    $task = $_POST['task'];
}
switch ($task) {

    case "Gridgstcheck":
	getGridgstcheck();
	break;
    case "Gridgstcheck2":
	getGridgstcheck2();
	break;
    case "ledgerNameNEWgst":
	getledgerNameNEWgst();
	break;
    case "grpledger":
	getgrpledger();
	break;
    case "VouNoClickDetailsNew":
	getVouNoClickDetailsNew();
	break;	
    case "VouNoClickDetails":
        getVouNoClickDetails();
        break;
    case "VouNoClickLoad":
        getVouNoClickLoad();
        break;
    case "LedgerSel":
        getLedgerSel();
        break;
    case "Prefixledcode":
        getPrefixledcode();
        break;
    case"cmbVoucherLedDetails":
        getVoucherLedgerDetails();
        break;
    case "Chqvouno":
        getchqvouno();
        break;

    case "ledbookNEWlook":
        getledbookNEWlook();
        break;
    case "ledbook":
        getledbookledger();
        break;
    case "cmbrecled":
        getreceiptledger();
        break;
    case "preprintvouno":
        getprintvouno();
        break;
    case "ChqLedgername":
        getchqledname();
        break;
    case "chqamt":
        getchqamount();
        break;
    case "LedgerCodeCr":
        getLedgerCodeCr();
        break;
    case "LedgerCodeDr":
        getLedgerCodeDr();
        break;
    case "expoagent":
        getexpoagent();
        break;
    case "AccInvNo":
        getAccInvNo();
        break;
    case "LedgerClickLoad2":
        getLedgerClickLoad2();
        break;
    case "LedgerClickLoad":
        getLedgerClickLoad();
        break;
    case "MonthVocNo":
        getMonthVocNo();
        break;
    case "ledgerNameNEWpurchase":              // Give the entire list
        getledgerNameNEWpurchase();
        break;
    case "ledgerNameNEW":              // Give the entire list
        getledgerNameNEW();
        break;

    case "ledgerName":              // Give the entire list
        getledgerName();
        break;
    case "USER":              // Give the entire list
        getUser();
        break;
    case "YEAR":
        getFinyear();
        break;
    case "COMP":
        getComp();
        break;
    case "GROUP":
        getgroup();
        break;
    case "VEND":
        getvendor();
        break;
    case "CASH":
        getaccname();
        break;
    case "chqaccname":
        getchqaccname();
        break;
    case"cmbVoucherNo":
        getVoucherNo();
        break;
    case"cmbRVoucherNo":
        getRVoucherNo();
        break;
    case"cmbPayVouNo":
        getPaymentvouno();
        break;
    case"cmbTypeVouNo":
        gettypevouno();
        break;
    case "BANK":
        getbankaccname();
        break;
    case"cmbBank":
        getBank();
        break;
    case "GRP":
        getgrpname();
        break;
    case "LED":
        getledname();
        break;
    case "CURRENCY":
        getcurrency();
        break;
    case "BANKNAME":
        getbankname();
        break;
    case "COUNTRY":
        getcountry();
        break;
    case "BankDetails":
        getbankmaster();
        break;
    case "leddet":
        getleddet();
        break;
    case "VOUNO":
        getvouno();
        break;
    case "VouDetails":
        getvoudet();
        break;
    case "OUTGRP":
        getoutgrp();
        break;
    case "recagegrp":
        getrecageinggrp();
        break;
    case "CDGRP":
        getcdgroup();
        break;
    case "REGGRP":
        getreggroup();
        break;
    case "REGACC":
        getregaccname();
        break;
    case "REGREFNO":
        getregrefno();
        break;
    case "REGREFDET":
        getregrefdet();
        break;
    case "LEDCODE":
        getledcode();
        break;
    case "ledet":
        getoutled();
        break;
    case "CUST":
        getcustomer();
        break;
    case "cmbaccmonth":
        getMonthname();
        break;
    case "cmbTradeGroup":
        gettradegroup();
        break;
    case "cmbSelGroupCust":              // Give the entire list
        getSelGroupCustomer();
        break;
    case "cmbCustomer":              // Give the entire list
        getsalescustomer();
        break;
    case "cmbsalregledname":              // Give the entire list
        getsalregledger();
        break;
    case "recagedet":              // Give the entire list
        getrecagedetail();
        break;
    case "cmbsalreggroup":              // Give the entire list
        getsalreggroup();
        break;
    case "cmbcommongroup":              // Give the entire list
        getcommongroup();
        break;
    case "cmbcommongroupnew":              // Give the entire list
        getcommongroupnew();
        break;


    case "cmbvoucherpreprint":              // Give the entire list
        getvoucherpreprint();
        break;
    default:
        echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        break;
}

function JEncode($arr) {
    if (version_compare(PHP_VERSION, "5.2", "<")) {
        require_once("./JSON.php");   //if php<5.2 need JSON class
        $json = new Services_JSON();  //instantiate new json object
        $data = $json->encode($arr);    //encode the data in json format
    } else {
        $data = json_encode($arr);    //encode the data in json format
    }
    return $data;
}
function getVouNoClickDetailsNew() {
    $compcode = $_POST['fcompcode'];
    $finid = $_POST['ffinid'];
    $vouno = $_POST['vouno'];
    $r = mysql_query("call acc_sp_rep_selaccountref('$compcode','$finid','$vouno')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getVouNoClickDetails() {
    $compcode = $_POST['fcompcode'];
    $finid = $_POST['ffinid'];
    $vouno = $_POST['vouno'];
    $r = mysql_query("call acc_sp_rep_selaccountref('$compcode','$finid','$vouno')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getVouNoClickLoad() {
    $compcode = $_POST['fcompcode'];
    $finid = $_POST['ffinid'];
    $vouno = $_POST['vouno'];
    $r = mysql_query("select
		acctran_dbamt,
		acctran_cramt,
		acctran_led_code,
		accref_vouno,
		DATE_FORMAT(accref_voudate,'%Y-%m-%d') as accref_voudate,
		accref_paymode,
		accref_payref_no,
		DATE_FORMAT(accref_payref_date,'%Y-%m-%d') as accref_payref_date,
               led_name
	 from
		acc_ref arf,
		acc_tran atn,
        acc_ledger_master led
	where
		arf.accref_vouno 		= 	'$vouno' and
		arf.accref_comp_code 	= 	'$compcode' and atn.acctran_led_code=led.led_code and
		arf.accref_finid 		= 	'$finid' and
		atn.acctran_accref_seqno 	= 	arf.accref_seqno");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getLedgerSel() {
    $compcode = $_POST['fcompcode'];
    $acctranledcode = $_POST['acctranledcode'];
    $r = mysql_query("CALL acc_sp_mas_selledger('$compcode','$acctranledcode')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getLedgerCodeDr() {
    $compcode = $_POST['fcompcode'];
    $finid = $_POST['ffinid'];
    $vouno = $_POST['vouno'];
    $ledcode = $_POST['ledcode'];
    $r = mysql_query("call acc_sp_rep_selledgercodedbamnt('$compcode','$finid','$vouno','$ledcode')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getLedgerCodeCr() {
    $compcode = $_POST['fcompcode'];
    $finid = $_POST['ffinid'];
    $vouno = $_POST['vouno'];
    $ledcode = $_POST['ledcode'];
    $r = mysql_query("call acc_sp_rep_selledgercodecramnt('$compcode','$finid','$vouno','$ledcode')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getAccInvNo() {
    $compcode = $_POST['fcompcode'];
    $finid = $_POST['ffinid'];
    $vouno = $_POST['vouno'];
    $r = mysql_query("call acc_sp_rep_selaccounttrail('$compcode','$finid','$vouno')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getLedgerClickLoad2() {
    $compcode = $_POST['fcompcode'];
    $finid = $_POST['ffinid'];
    $ledcod = $_POST['ledcod'];
    $r = mysql_query("call acc_sp_rep_selaccrefdetails_temp('$compcode','$finid','$ledcod')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getLedgerClickLoad() {
    $compcode = $_POST['fcompcode'];
    $finid = $_POST['ffinid'];
    $ledname = $_POST['ledname'];
   /* $r = mysql_query("select * from acc_current_balance 
	where 	curbal_finid 	= 	'$finid' and 
		curbal_comp_code = '$compcode' and
		curbal_led_code in 
		( 
			select 
				led_code 
			from 	dpm.acc_ledger_master 
			where 	led_comp_code 	= 	'$compcode' and 
				led_code ='$ledname'
		)");*/
		
     $r = mysql_query("select * from acc_current_balance 
	where 	curbal_finid 	= 	'$finid' and 
		curbal_comp_code = '$compcode' and
		curbal_led_code in 
		( 
			select 
				led_code 
			from 	dpm.acc_ledger_master 
			where 	
				led_code ='$ledname'
		)");		
		
		
		
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getGridgstcheck() {
    $compcode = $_POST['fcompcode'];
    $finid = $_POST['finid'];
    $ledcode = $_POST['ledcode'];
    $frmdate = $_POST['frmdate'];
    $todate = $_POST['todate'];
    $r = mysql_query("call salesledgerwiseallmonthgstpur('$frmdate','$todate','$compcode','$ledcode','$finid');");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getGridgstcheck2() {
    $compcode = $_POST['fcompcode'];
    $finid = $_POST['finid'];
    $frmdate = $_POST['frmdate'];
    $todate = $_POST['todate'];
    $r = mysql_query("call acc_sp_rep_seldenimsalesregister_gstnew('$frmdate','$todate','$compcode','G','$finid');");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getMonthVocNo() {
    $compcode = $_POST['fcompcode'];
    $finid = $_POST['ffinid'];
    $ledcode = $_POST['ledcode'];
    $month = $_POST['month'];
    $r = mysql_query("select
    accref_seqno,
    accref_vouno,
    accref_comp_code,
    accref_finid,
    DATE_FORMAT(accref_voudate,'%Y-%m-%d') as accref_voudate,
    accref_vou_type,
    accref_bank_name,
    accref_paymode,
    accref_payref_no,
    accref_payref_date,
    accref_narration,
    accref_chq_status,
    accref_reverse_status,
    acctran_accref_seqno,
    acctran_serialno,
    acctran_led_code,
    acctran_dbamt,
    acctran_cramt,
    acctran_totamt,
    acctran_cur_code,
    acctran_cur_amt,
    acctran_exch_rate,
    acctran_pass_no,
    acctran_paytype,acctrail_inv_no,led_name
from acc_ref arf inner join acc_tran atn on arf.accref_seqno = atn.acctran_accref_seqno
left outer join acc_trail tr on arf.accref_seqno=tr.acctrail_accref_seqno
inner join acc_ledger_master led on atn.acctran_led_code=led.led_code 
where
    arf.accref_comp_code = '$compcode' and arf.accref_finid = '$finid' and
    arf.accref_vou_type not in ('OB' , 'UB', 'BA', 'PP', 'PR', 'PT') and
    MONTH(arf.accref_voudate) = '$month' and
    atn.acctran_led_code = '$ledcode' 
 group by accref_vouno 
 order by accref_voudate,accref_vouno");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getledgerNameNEWpurchase() {
    mysql_query("SET NAMES utf8");
    $compcode=$_POST['fcompcode'];
    $finid=$_POST['finid'];
    $name=$_POST['name'];
    $r = mysql_query("select 
    led_code,led_name
from
    acc_ledger_master
where
    led_grp_code in ('67' , '68',
        '72',
        '73',
        '74',
        '75',
        '76',
        '77',
        '78',
        '79',
        '80',
        '81',
        '82',
        '83',
        '95',
        '139',
        '143',
        '177',
        '179',
        '180',
        '184',
        '187',
        '193',
        '213',
        '214',
        '215',
        '216',
        '217',
        '232')
        and led_status='Y' ORDER BY led_name");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getledgerNameNEWgst() {
    mysql_query("SET NAMES utf8");
    $compcode=$_POST['fcompcode'];
    $r = mysql_query("select led_name,led_code from acc_ledger_master 
	where  led_code in ('33141',
'33142',
'33143',
'33163',
'33164',
'33165',
'34978',
'34976',
'34980',
'36437',
'36439',
'36438') ORDER BY led_name");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getledgerNameNEW() {
    mysql_query("SET NAMES utf8");
    $compcode=$_POST['fcompcode'];
    $finid=$_POST['finid'];
    $name=$_POST['name'];
  /*  $r = mysql_query("select 
   distinct led_name,led_code
from
    acc_ref ref,
    acc_tran tn,
    acc_trail tr,
    acc_ledger_master led
where
    ref.accref_seqno = tn.acctran_accref_seqno and 
    ref.accref_seqno = tr.acctrail_accref_seqno and
    led.led_code = tn.acctran_led_code and 
    accref_finid IN ('$finid') and 
    accref_comp_code IN ('$compcode')");*/
   /* $r = mysql_query("select led_name,led_code from dpm.acc_ledger_master 
	where 	led_comp_code='$compcode' ORDER BY led_name");*/
	
	$r = mysql_query("select distinct led_name,led_code from dpm.acc_ledger_master ,acc_current_balance
	where 	curbal_comp_code='$compcode' and curbal_led_code = led_code ORDER BY led_name");
	
	
	
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getledgerName() {
    mysql_query("SET NAMES utf8");
    $compcode=$_POST['fcompcode'];
    $name=$_POST['name'];
    $r = mysql_query("select led_name,led_code from kgdl.acc_ledger_master 
	where led_status='Y' ORDER BY led_name");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getUser() {
    $IP = "10.0.2.15";
    $LocalAddress = "N";
    $res = mysql_query("CALL generalspseluseripaddress('" . $IP . "','" . $LocalAddress . "')");
    $nbrow = mysql_num_rows($res);
    while ($rec = mysql_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getFinyear() {
    $r = mysql_query("CALL general_sp_mas_finmaster()");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getComp() {
    $res = mysql_query("CALL general_sp_mas_selcompany1()");
    $nbrow = mysql_num_rows($res);
    while ($rec = mysql_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getrecagedetail() {
    $flag = $_POST['flag'];
    $res = mysql_query("CALL acc_sp_rep_selreceiptageingdetails_new1()");
    $nbrow = mysql_num_rows($res);
    while ($rec = mysql_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getgroup() {
    $compcode = $_POST['gincompcode'];
    $res = mysql_query("select distinct grp_code,grp_name from acc_group_master where grp_comp_code in ($compcode) order by grp_name ");
    $nbrow = mysql_num_rows($res);
    while ($rec = mysql_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getvendor() {
    $compcode = $_POST['gincompcode'];
    $type=$_POST['prefix'];
mysql_query("SET NAMES utf8");
	if ($type=="F")
	{
        $res = mysql_query("select fab_sup_code as vendor_code,fab_supname as vendor_name from dfd.fab_supplier_master where fab_sup_compcode = '4'");
	}
	else
	{
         $res = mysql_query("CALL stores_sp_mas_selvendor_master('$compcode')");
	}
    $nbrow = mysql_num_rows($res);
    while ($rec = mysql_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getaccname() {
    $comp = $_POST['compcode'];
    $res = mysql_query("select * from acc_ledger_master where led_grp_code =26");
    $nbrow = mysql_num_rows($res);
    while ($rec = mysql_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getchqaccname() {
    $comp = $_POST['compcode'];
    //$res = mysql_query("select led_code,led_name from acc_ledger_master");
    $res = mysql_query("select led_code, led_name from acc_ledger_master where led_grp_code = 26 and led_name like '%BANK%' order by led_code");
    while ($rec = mysql_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getbankaccname() {
    $comp = $_POST['comp'];
    $res = mysql_query("select * from acc_ledger_master where led_grp_code in (26)");
    $nbrow = mysql_num_rows($res);
    while ($rec = mysql_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getreceiptledger() {
    $comp = $_POST['compcode'];
    $res = mysql_query("select * from acc_ledger_master where led_grp_code in (20,21,22,23,24,25,26,91,92,93,94,95,96,102,182)");
    $nbrow = mysql_num_rows($res);
    while ($rec = mysql_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getgrpname() {
    $res = mysql_query("CALL acc_sp_mas_selgroup_master(1)");
    $nbrow = mysql_num_rows($res);
    while ($rec = mysql_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getledname() {
    mysql_query("SET NAMES utf8");
    $res = mysql_query("CALL acc_sp_mas_selledger_master(1)");
    $nbrow = mysql_num_rows($res);
    while ($rec = mysql_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getcurrency() {
    $res = mysql_query("CALL general_sp_mas_selcurrencymaster");
    $nbrow = mysql_num_rows($res);
    while ($rec = mysql_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getbankname() {
    $res = mysql_query("CALL acc_sp_mas_selbank_master");
    $nbrow = mysql_num_rows($res);
    while ($rec = mysql_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getcountry() {
    $res = mysql_query("CALL expo_sp_mas_selcountry_master");
    $nbrow = mysql_num_rows($res);
    while ($rec = mysql_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getexpoagent() {

    mysql_query("SET NAMES utf8");
    $r = mysql_query("CALL expo_sp_mas_selcustomer_master('CU%');");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getbankmaster() {
    $bankseq = $_POST['ginbank'];
    $res = mysql_query("CALL acc_sp_selbank_master(" . $bankseq . ")");
    $nbrow = mysql_num_rows($res);
    while ($rec = mysql_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getleddet() {
    $comp = "1";
    $ledname = $_POST['gstled'];
    $res = mysql_query("CALL acc_sp_mas_selledgername_match(" . $comp . "," . $ledname . ")");
    $nbrow = mysql_num_rows($res);
    while ($rec = mysql_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getvouno() {
    $res = mysql_query("CALL general_sp_mas_selcontrolmaster('AC','2013-2014','EXV','EXPENCE VOUCHER NO',1)");
    $nbrow = mysql_num_rows($res);
    while ($rec = mysql_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getvoudet() {
    $vouseq = $_POST['ginvou'];
    $res = mysql_query("CALL acc_sp_trn_selacc_ref(" . $vouseq . ")");
    $nbrow = mysql_num_rows($res);
    while ($rec = mysql_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getoutgrp() {
    $res = mysql_query("select grp_code,grp_name from acc_group_master where grp_comp_code in (1) and grp_code in (134,136,137,138,140)");
    $nbrow = mysql_num_rows($res);
    while ($rec = mysql_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getrecageinggrp() {
    $compcode = $_POST['gincompcode'];
    $res = mysql_query("select grp_code,grp_name from acc_group_master where grp_comp_code in ($compcode) and grp_code in (44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,133,134,135,136,137,138,140,141,148,150,151,152,153,181,183,185,191,210,211,212,220)");
    $nbrow = mysql_num_rows($res);
    while ($rec = mysql_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getcdgroup() {
    $res = mysql_query("select grp_code,grp_name from acc_group_master where grp_comp_code=1 and grp_name like 'trade%'");
    $nbrow = mysql_num_rows($res);
    while ($rec = mysql_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function gettradegroup() {
    $res = mysql_query("select grp_code,grp_name from acc_group_master where grp_comp_code=1 and grp_name like 'trade%' or (grp_code=4 or grp_parent_code=4)  ");
    $nbrow = mysql_num_rows($res);
    while ($rec = mysql_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getreggroup() {
    $comp = 1;
    $res = mysql_query("CALL acc_sp_selregiongroup(" . $comp . ")");
    $nbrow = mysql_num_rows($res);
    while ($rec = mysql_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getregaccname() {
    $res = mysql_query("select led_code,led_name from acc_ledger_master  ");
    $nbrow = mysql_num_rows($res);
    while ($rec = mysql_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getregrefno() {
    $comp = 1;
    $fin = 23;
    $grp = $_POST['gingrp'];
//	$grp=134;
    $res = mysql_query("CALL acc_sp_selregionalreceiptno(" . $grp . "," . $fin . "," . $comp . ")");
    $nbrow = mysql_num_rows($res);
    while ($rec = mysql_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getregrefdet() {
    $refno = $_POST['ginrefno'];
    $res = mysql_query("CALL acc_sp_selregionalreceiptdetail(" . $refno . ")");
    $nbrow = mysql_num_rows($res);
    while ($rec = mysql_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getledcode() {
    $res = mysql_query("CALL general_sp_mas_selcontrolmaster('AC','GENERAL','LMS','ACC_LEDGER_MASTER',1)");
    $nbrow = mysql_num_rows($res);
    while ($rec = mysql_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getoutled() {
//	$comp=1;
    $comp = $_POST['comp'];
    $grp = $_POST['grpcode'];
    $dt = $_POST['dt'];
    $ds = $_POST['ds'];
    mysql_query("SET NAMES utf8");
    $res = mysql_query("CALL acc_sp_rep_selreceiptledgerabovegivendays('$comp','$grp','$dt','$ds')");
//    $res = mysql_query("select led_code,led_name from acc_ledger_master where led_grp_code = $grp and led_comp_code = $comp");
    $nbrow = mysql_num_rows($res);
    while ($rec = mysql_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getcustomer() {
    mysql_query("SET NAMES utf8");
    $result = mysql_query("CALL sales_sp_mas_selcustomermaster();");
    $nbrows = mysql_num_rows($result);
    if ($nbrows > 0) {
        while ($rec = mysql_fetch_array($result)) {
            $arr[] = $rec;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nbrows . '","results":' . $jsonresult . '})';
    } else {
        echo '({"total":"0", "results":""})';
    }

    //$res=mysql_query("CALL sales_sp_mas_selcustomermaster();");
    // $nbrow = mysql_num_rows($res);
    //while($rec = mysql_fetch_array($res))
    //{
    // $arr[]= $rec ;
    //}
    //	$jsonresult = JEncode($arr);
    //	echo '({"total":"'.$nbrow.'","results":'.$jsonresult.'})';
}

function getMonthname() {
    $query = "select month_code, month_name from month_master order by month_order_code;";
    $result = mysql_query($query);
    $nbrows = mysql_num_rows($result);
    if ($nbrows > 0) {
        while ($rec = mysql_fetch_array($result)) {
            $arr[] = $rec;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nbrows . '","results":' . $jsonresult . '})';
    } else {
        echo '({"total":"0", "results":""})';
    }
}

function getPrefixledcode() {
    $compcode = $_POST['gincompany'];
    $Accname = $_POST['Accname'];
    $r = mysql_query("CALL acc_sp_mas_selledger_master_prefix('$Accname','$compcode')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getchqvouno() {
    $ledcode = $_POST['ledcode'];
    $prefix = $_POST['ledprefix'];
    $comp = $_POST['compcode'];
    $fin = $_POST['finid'];
    $r = mysql_query("CALL acc_sp_rep_selvoucher_chequeprint('$ledcode','$prefix','$fin','$comp')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getchqledname() {
    $ledcode = $_POST['ledname'];
    $vouno = $_POST['vouno'];
    $comp = $_POST['compcode'];
//    $r = mysql_query("select led_code,led_name from acc_tran,acc_ledger_master where acctran_accref_seqno = $vouno and acctran_led_code <> $ledcode and led_code = acctran_led_code and led_comp_code = $comp");
    $r = mysql_query("select led_code,led_name from acc_tran,acc_ledger_master where
acctran_accref_seqno = $vouno and acctran_led_code <> $ledcode and led_code = acctran_led_code");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getchqamount() {
    $ledcode = $_POST['ledname'];
    $vouno = $_POST['vouno'];
    $r = mysql_query("select acctran_totamt from acc_tran where
acctran_accref_seqno = $vouno and acctran_led_code = $ledcode");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getBank() {
    mysql_query("SET NAMES utf8");
    $compcode = $_POST['compcode'];
    $gstopt = $_POST['gstopt'];

/*
    if ($gstopt == "R") {
        $query = "select led_code,led_name from acc_ledger_master where led_grp_code in (20,21,22,23,24,25,26,90,91,92,93,94,95,96,102,182) and led_comp_code=$compcode";
    } else if ($gstopt == "P") {
        $query = "select led_code,led_name from acc_ledger_master where led_grp_code in (20,21,22,23,24,25,26,90,91,92,93,94,95,96,102,182) and led_comp_code=$compcode";
    } else {
        $query = "select led_code,led_name from acc_ledger_master where led_comp_code =$compcode";
    }
*/
    if ($gstopt == "R") {
        $query = "select led_code,led_name,led_prefix from acc_ledger_master where led_grp_code in (26)";
    } else if ($gstopt == "P") {
        $query = "select led_code,led_name from acc_ledger_master where led_grp_code in (26)";
    } else {
        $query = "select led_code,led_name from acc_ledger_master";
    }


    $result = mysql_query($query);
    $nbrows = mysql_num_rows($result);
    if ($nbrows > 0) {
        while ($rec = mysql_fetch_array($result)) {
            $arr[] = $rec;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nbrows . '","results":' . $jsonresult . '})';
    } else {
        echo '({"total":"0", "results":""})';
    }
}

//$query = "select led_code,led_name from acc_ledger_master where led_grp_code not in (20,21,22,23,24,25,26,90,91,92,93,94,95,96,102,182) ";
function getledbookNEWlook() {
    mysql_query("SET NAMES utf8");
    $reptype = $_POST['reptype'];
    if($reptype == 'A')
    {
    $query = "select led_code,led_name from acc_ledger_master order by led_name";
    }
    else if($reptype == 'S')
    {
    $query = "select led_code,led_name from acc_ledger_master order by led_name";
    }
    else if($reptype == 'L')
    {
    $query = "select led_code,led_name from acc_ledger_master where led_type = 'G'  order by led_name";
    }
    else if($reptype == 'G')
    {
    $query = "select grp_code as led_code,grp_name as led_name from acc_group_master order by grp_name";
    }

    $result = mysql_query($query);
    $nbrows = mysql_num_rows($result);
    if ($nbrows > 0) {
        while ($rec = mysql_fetch_array($result)) {
            $arr[] = $rec;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nbrows . '","results":' . $jsonresult . '})';
    } else {
        echo '({"total":"0", "results":""})';
    }
}
function getledbookledger() {
    mysql_query("SET NAMES utf8");
    $comp = $_POST['gincompcode'];
    $query = "select led_code,led_name from acc_ledger_master where led_grp_code not in (20,21,22,23,24,25,26,90,91,92,93,94,95,96,102,182) and led_status='Y'";
    $result = mysql_query($query);
    $nbrows = mysql_num_rows($result);
    if ($nbrows > 0) {
        while ($rec = mysql_fetch_array($result)) {
            $arr[] = $rec;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nbrows . '","results":' . $jsonresult . '})';
    } else {
        echo '({"total":"0", "results":""})';
    }
}

function getVoucherNo() {
    $Account = $_POST['Account'];
    $Finid = $_POST['finid'];
    $CompCode = $_POST['compcode'];
    $type = $_POST['type'];
	if ($type=="CT")
	{
    $query = "select accref_seqno,accref_vouno,led_prefix,mid(accref_vouno,3,12) as voucher
    from
        acc_ref     aref,
        acc_tran     atrn,
		acc_ledger_master 
    where
	atrn.acctran_led_code	= led_code and
        atrn.acctran_led_code     =    '$Account'        and
        aref.accref_seqno         =     atrn.acctran_accref_seqno and
        aref.accref_vou_type      in ('CT')             and
        aref.accref_comp_code     =    '$CompCode'         and
        aref.accref_finid         =     '$Finid'";
	}
	else
	{
    $query = "select accref_seqno,accref_vouno,led_prefix,mid(accref_vouno, length(led_prefix)+2 ,12) as voucher
    from
        acc_ref     aref,
        acc_tran     atrn,
		acc_ledger_master 
    where
	atrn.acctran_led_code	= led_code and
        atrn.acctran_led_code     =    '$Account'        and
        aref.accref_seqno         =     atrn.acctran_accref_seqno and
        aref.accref_vou_type      in ('BP','CP')             and
        aref.accref_comp_code     =    '$CompCode'         and
        aref.accref_finid         =     '$Finid'           and
        atrn.acctran_cramt         >     0  ";
	}
    $result = mysql_query($query);
    $nbrows = mysql_num_rows($result);
    if ($nbrows > 0) {
        while ($rec = mysql_fetch_array($result)) {
            $arr[] = $rec;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nbrows . '","results":' . $jsonresult . '})';
    } else {
        echo '({"total":"0", "results":""})';
    }
}

function getRVoucherNo() {
    $ledcode = $_POST['Account'];
    $Finid = $_POST['finid'];
    $CompCode = $_POST['compcode'];
    $flag = 'Y';
    $type = '0';

    $r = mysql_query("CALL acc_sp_trn_selacc_tran_vou_no_receipt('$ledcode','$CompCode','$Finid','$flag','$type')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getPaymentvouno() {
    $Account = $_POST['Account'];
    $CompCode = $_POST['compcode'];
    $Finid = $_POST['finid'];
    $flag = 'Y';
    $type = '0';
    $r = mysql_query("CALL acc_sp_rep_selacc_tran_vou_no_cover_details($Account,$CompCode,$Finid,'$flag','$type')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function gettypevouno() {
    $Acctype = $_POST['Acctype'];
//$Acctype='EX';
    $CompCode =  $_POST['compcode'];
    $Finid = $_POST['finid'];
    $r = mysql_query("CALL acc_sp_trn_selacc_tran_vou_no_journal_voucher($CompCode,$Finid,'N','$Acctype')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getVoucherLedgerDetails() {
    $Account = $_POST['Account'];
    $VoucherId = $_POST['VoucherId'];
    $VoucherNo = $_POST['VoucherNo'];
    $CompanyCode = $_POST['gincompcode'];
    //    $Account=23;
    //      $VoucherId=1223345;
//        $VoucherNo='SBICCP875';
    //$CompanyCode=1;
    mysql_query("SET NAMES utf8");
    $r = mysql_query("CALL acc_sp_rep_selleddetails_vouprint('$VoucherId','$VoucherNo','$Account','$CompanyCode')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getprintvouno() {
    $ledcode = $_POST['ledcode'];
    $prefix = $_POST['ledprefix'];
    $comp = $_POST['compcode'];
    $fin = $_POST['finid'];
    $query = "call acc_sp_rep_selvoucher_vouprint(" . $ledcode . ",'" . $prefix . "'," . $fin . "," . $comp . ")";
    $sql = $query;
    $arr = array();
    If (!$rs = mysql_query($sql)) {
        Echo '{success:false}';
    } else {
        $rs_count = mysql_query($query);
        $results = mysql_num_rows($rs_count);
        while ($obj = mysql_fetch_object($rs)) {
            $arr[] = $obj;
        }
        Echo '{success:true,results:' . $results . ',
            rows:' . json_encode($arr) . '}';
    }
}

function getSelGroupCustomer() {
    $company = 1;
    $GroupCode = $_POST['Groupcode'];
    $query = "select led_code,led_name from acc_ledger_master where led_grp_code ='$GroupCode' order by led_name";
    $result = mysql_query($query);

    $nbrows = mysql_num_rows($result);
    if ($nbrows > 0) {
        while ($rec = mysql_fetch_array($result)) {
            $arr[] = $rec;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nbrows . '","results":' . $jsonresult . '})';
    } else {
        echo '({"total":"0", "results":""})';
    }
}

function getsalescustomer() {
    mysql_query("SET NAMES utf8");
    $comp = $_POST['gincompcode'];
    $r = mysql_query("CALL accsalesspselcustomermaster($comp)");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getsalregledger() {
    mysql_query("SET NAMES utf8");
    $comp = $_POST['compcode'];
    $grp = $_POST['grpcode'];
    $r = mysql_query("CALL acc_sp_selledger_master_ledgrpcode($grp,$comp)");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getsalreggroup() {
    mysql_query("SET NAMES utf8");
    $comp = $_POST['compcode'];
    $r = mysql_query("CALL acc_sp_trn_selledger_master_trade($comp)");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getcommongroupnew() {
    $compcode = $_POST['gincompcode'];
//    $group = $_POST['group'];
//$compcode=1;
//$group='134,136,137,138,140';
    $res = mysql_query("select distinct grp_code,grp_name from acc_group_master where grp_code in (134,136,137,138,140,135,63,210,162) and grp_comp_code in ($compcode) and grp_name like '%debtors%' order by grp_name ");
    $nbrow = mysql_num_rows($res);
    while ($rec = mysql_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}


function getcommongroup() {
    $compcode = $_POST['gincompcode'];
//    $group = $_POST['group'];
//$compcode=1;
//$group='134,136,137,138,140';
    $res = mysql_query("select distinct grp_code,grp_name from acc_group_master where grp_comp_code in ($compcode) and grp_name like '%debtors%' order by grp_name ");
    $nbrow = mysql_num_rows($res);
    while ($rec = mysql_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getvoucherpreprint() {
    mysql_query("SET NAMES utf8");
    $accrefseqno = $_POST['accrefseqno'];
    $ledcode = $_POST['ledcode'];
    $ledprefix = $_POST['ledprefix'];
    $finid = $_POST['finid'];
    $compcode = $_POST['compcode'];
    $vouno = $_POST['vouno'];
    //	$comp=$_POST['compcode'];

    $query = "CALL acc_sp_rep_selvoucherdetails_voupreprint($accrefseqno,$ledcode,'" . $ledprefix . "',$finid,$compcode,'" . $vouno . "')";
    $result = mysql_query($query);
    $nbrows = mysql_num_rows($result);
    if ($nbrows > 0) {
        while ($rec = mysql_fetch_array($result)) {
            $arr[] = $rec;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nbrows . '","results":' . $jsonresult . '})';
    } else {
        echo '({"total":"0", "results":""})';
    }
}

function getgrpledger() {
    mysql_query("SET NAMES utf8");
    $comp = $_POST['comp'];
    $grpcode = $_POST['grpcode'];
    $query = "select led_code,led_name from acc_ledger_master where led_grp_code = '$grpcode'";
    $result = mysql_query($query);
    $nbrows = mysql_num_rows($result);
    if ($nbrows > 0) {
        while ($rec = mysql_fetch_array($result)) {
            $arr[] = $rec;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nbrows . '","results":' . $jsonresult . '})';
    } else {
        echo '({"total":"0", "results":""})';
    }
}
?>



