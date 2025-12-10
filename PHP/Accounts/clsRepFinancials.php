<?php
require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");

$task = '';

if (isset($_POST['task'])) {
    $task = $_POST['task'];
}

mysqli_set_charset($conn, "utf8");
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

function JEncode($arr){
    $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
    return $data;
}


function getVouNoClickDetailsNew() {
    global $conn;
    $compcode = $_POST['fcompcode'];
    $finid = $_POST['ffinid'];
    $vouno = $_POST['vouno'];
    $sql ="call acc_sp_rep_selaccountref('$compcode','$finid','$vouno')";
    $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getVouNoClickDetails() {
    global $conn;
    $compcode = $_POST['fcompcode'];
    $finid = $_POST['ffinid'];
    $vouno = $_POST['vouno'];
    $sql ="call acc_sp_rep_selaccountref('$compcode','$finid','$vouno')";
    $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getVouNoClickLoad() {
    global $conn;
    $compcode = $_POST['fcompcode'];
    $finid = $_POST['ffinid'];
    $vouno = $_POST['vouno'];
    $sql ="select
		acctran_dbamt,
		acctran_cramt,
		acctran_led_code,
		accref_vouno,
		DATE_FORMAT(accref_voudate,'%d-%m-%Y') as accref_voudate,
		accref_paymode,
		accref_payref_no,
		DATE_FORMAT(accref_payref_date,'%d-%m-%Y') as accref_payref_date,
                cust_name,accref_narration,cust_type
	 from
		acc_ref arf,
		acc_tran atn,
        massal_customer led
	where
		arf.accref_vouno 	= 	'$vouno' and
		arf.accref_comp_code 	= 	'$compcode' and atn.acctran_led_code=led.cust_code and
		arf.accref_finid 	= 	'$finid' and
		atn.acctran_accref_seqno = 	arf.accref_seqno";
        $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getLedgerSel() {
    global $conn;
    $compcode = $_POST['fcompcode'];
    $acctranledcode = $_POST['acctranledcode'];
    $sql ="CALL acc_sp_mas_selledger('$compcode','$acctranledcode')";
    $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getLedgerCodeDr() {
    global $conn;
    $compcode = $_POST['fcompcode'];
    $finid = $_POST['ffinid'];
    $vouno = $_POST['vouno'];
    $ledcode = $_POST['ledcode'];
    $sql ="call acc_sp_rep_selledgercodedbamnt('$compcode','$finid','$vouno','$ledcode')";
    $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getLedgerCodeCr() {
    global $conn;
    $compcode = $_POST['fcompcode'];
    $finid = $_POST['ffinid'];
    $vouno = $_POST['vouno'];
    $ledcode = $_POST['ledcode'];
    $sql ="call acc_sp_rep_selledgercodecramnt('$compcode','$finid','$vouno','$ledcode')";
    $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getAccInvNo() {
    global $conn;
    $compcode = $_POST['fcompcode'];
    $finid = $_POST['ffinid'];
    $vouno = $_POST['vouno'];
    $sql ="call acc_sp_rep_selaccounttrail('$compcode','$finid','$vouno')";
    $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getLedgerClickLoad2() {
    global $conn;
    $compcode = $_POST['fcompcode'];
    $finid = $_POST['ffinid'];
    $ledcod = $_POST['ledcod'];
    $sql ="call acc_sp_rep_selaccrefdetails('$compcode','$finid','$ledcod')";
    $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getLedgerClickLoad() {
    global $conn;
    $compcode = $_POST['fcompcode'];
    $finid = $_POST['ffinid'];
    $ledname = $_POST['ledname'];

     $sql ="select * from acc_current_balance 
	where 	curbal_finid 	= 	'$finid' and 
		curbal_comp_code = '$compcode' and
		curbal_led_code in 
		( 
			select 
				cust_code 
			from 	massal_customer 
			where 	
				cust_code ='$ledname'
		)";		
		
		
        $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getGridgstcheck() {
    global $conn;
    $compcode = $_POST['fcompcode'];
    $finid = $_POST['finid'];
    $ledcode = $_POST['ledcode'];
    $frmdate = $_POST['frmdate'];
    $todate = $_POST['todate'];
    $sql ="call salesledgerwiseallmonthgstpur('$frmdate','$todate','$compcode','$ledcode','$finid');";
    $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getGridgstcheck2() {
    global $conn;

    $compcode = $_POST['fcompcode'];

    $finid = $_POST['finid'];
    $frmdate = $_POST['frmdate'];
    $todate = $_POST['todate'];
    $sql ="call acc_sp_rep_seldenimsalesregister_gstnew('$frmdate','$todate','$compcode','G','$finid');";
    $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
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
    $sql ="select
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
    acctran_paytype,acctrail_inv_no,cust_name
from acc_ref arf inner join acc_tran atn on arf.accref_seqno = atn.acctran_accref_seqno
left outer join acc_trail tr on arf.accref_seqno=tr.acctrail_accref_seqno
inner join massal_customer led on atn.acctran_led_code=led.cust_code 
where
    arf.accref_comp_code = '$compcode' and arf.accref_finid = '$finid' and
    arf.accref_vou_type not in ('OB' , 'UB', 'BA', 'PP', 'PR', 'PT') and
    MONTH(arf.accref_voudate) = '$month' and
    atn.acctran_led_code = '$ledcode' 
 order by accref_voudate,accref_vouno";
 $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getledgerNameNEWpurchase() {
    global $conn;
    $compcode=$_POST['fcompcode'];
    $finid=$_POST['finid'];
    $name=$_POST['name'];
    $sql ="select 
    cust_code,cust_name
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
        and led_status='Y' ORDER BY cust_name";
        $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getledgerNameNEWgst() {
    global $conn;
    $compcode=$_POST['fcompcode'];
    $sql ="select cust_name,cust_code from massal_customer 
	where  cust_code in ('33141',
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
'36438') ORDER BY cust_name";
$r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getledgerNameNEW() {
    global $conn;
    $compcode=$_POST['fcompcode'];
    $finid=$_POST['finid'];
    $name=$_POST['name'];
 
	
	$sql ="select distinct cust_name,led_code from massal_customer ,acc_current_balance
	where 	curbal_comp_code='$compcode' and curbal_led_code = cust_code ORDER BY cust_name";
	
    $r = mysqli_query($conn, $sql);
	
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getledgerName() {
    global $conn;
    $compcode=$_POST['fcompcode'];
    $name=$_POST['name'];
    $sql ="select cust_name,cust_code from kgdl.massal_customer 
	where led_status='Y' ORDER BY cust_name";
    $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getUser() {
    global $conn;
    $IP = "10.0.2.15";
    $LocalAddress = "N";
    $sql ="CALL generalspseluseripaddress('" . $IP . "','" . $LocalAddress . "')";
    $nbrow = mysqli_num_rows($res);
    while ($rec = mysqli_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getFinyear() {
    global $conn;
    $sql ="CALL general_sp_mas_finmaster()";
    $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getComp() {
    global $conn;
    $sql ="CALL general_sp_mas_selcompany1()";
    $res = mysqli_query($conn, $sql);
    $nbrow = mysqli_num_rows($res);
    while ($rec = mysqli_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getrecagedetail() {
    global $conn;
    $flag = $_POST['flag'];
    $sql ="CALL acc_sp_rep_selreceiptageingdetails_new1()";
    $res = mysqli_query($conn, $sql);
    $nbrow = mysqli_num_rows($res);
    while ($rec = mysqli_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getgroup() {
    global $conn;
    $compcode = $_POST['gincompcode'];
    $sql ="select distinct grp_code,grp_name from acc_group_master where grp_comp_code in ($compcode) order by grp_name ";
    $res = mysqli_query($conn, $sql);
    $nbrow = mysqli_num_rows($res);
    while ($rec = mysqli_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getvendor() {
    global $conn;
    $compcode = $_POST['gincompcode'];
    $type=$_POST['prefix'];
global $conn;
	if ($type=="F")
	{
        $sql ="select fab_sup_code as vendor_code,fab_supname as vendor_name from dfd.fab_supplier_master where fab_sup_compcode = '4'";
	}
	else
	{
         $sql ="CALL stores_sp_mas_selvendor_master('$compcode')";
	}
    $res = mysqli_query($conn, $sql);
    $nbrow = mysqli_num_rows($res);
    while ($rec = mysqli_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getaccname() {
    global $conn;
    $comp = $_POST['compcode'];
    $sql ="select * from massal_customer where led_grp_code =26";
    $res = mysqli_query($conn, $sql);
    $nbrow = mysqli_num_rows($res);
    while ($rec = mysqli_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getchqaccname() {
    global $conn;
    $comp = $_POST['compcode'];
    //$sql ="select cust_code,cust_name from acc_ledger_master";
    $sql ="select cust_code, cust_name from massal_customer where led_grp_code = 26 and cust_name like '%BANK%' order by cust_code";
    $res = mysqli_query($conn, $sql);
    while ($rec = mysqli_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getbankaccname() {
    global $conn;
    $comp = $_POST['comp'];
    $sql ="select * from massal_customer where led_grp_code in (26)";
    $res = mysqli_query($conn, $sql);
    $nbrow = mysqli_num_rows($res);
    while ($rec = mysqli_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getreceiptledger() {
    global $conn;
    $comp = $_POST['compcode'];
    $sql ="select * from massal_customer where led_grp_code in (20,21,22,23,24,25,26,91,92,93,94,95,96,102,182)";
    $res = mysqli_query($conn, $sql);
    $nbrow = mysqli_num_rows($res);
    while ($rec = mysqli_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getgrpname() {
    global $conn;
    $sql ="CALL acc_sp_mas_selgroup_master(1)";
    $res = mysqli_query($conn, $sql);
    $nbrow = mysqli_num_rows($res);
    while ($rec = mysqli_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getledname() {
    global $conn;
    $sql ="CALL acc_sp_mas_selledger_master(1)";
    $res = mysqli_query($conn, $sql);
    $nbrow = mysqli_num_rows($res);
    while ($rec = mysqli_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getcurrency() {
    global $conn;
    $sql ="CALL general_sp_mas_selcurrencymaster";
    $res = mysqli_query($conn, $sql);
    $nbrow = mysqli_num_rows($res);
    while ($rec = mysqli_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getbankname() {
    global $conn;
    $sql ="CALL acc_sp_mas_selbank_master";
    $res = mysqli_query($conn, $sql);
    $nbrow = mysqli_num_rows($res);
    while ($rec = mysqli_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getcountry() {
    global $conn;
    $sql ="CALL expo_sp_mas_selcountry_master";
    $res = mysqli_query($conn, $sql);
    $nbrow = mysqli_num_rows($res);
    while ($rec = mysqli_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getexpoagent() {

    global $conn;
    $sql ="CALL expo_sp_mas_selcustomer_master('CU%');";
    $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getbankmaster() {
    global $conn;
    $bankseq = $_POST['ginbank'];
    $sql ="CALL acc_sp_selbank_master(" . $bankseq . ")";
    $res = mysqli_query($conn, $sql);
    $nbrow = mysqli_num_rows($res);
    while ($rec = mysqli_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getleddet() {
    global $conn;
    $comp = "1";
    $ledname = $_POST['gstled'];
    $sql ="CALL acc_sp_mas_selledgername_match(" . $comp . "," . $ledname . ")";
    $res = mysqli_query($conn, $sql);
    $nbrow = mysqli_num_rows($res);
    while ($rec = mysqli_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getvouno() {
    global $conn;
    $sql ="CALL general_sp_mas_selcontrolmaster('AC','2013-2014','EXV','EXPENCE VOUCHER NO',1)";
    $res = mysqli_query($conn, $sql);
    $nbrow = mysqli_num_rows($res);
    while ($rec = mysqli_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getvoudet() {
    global $conn;
    $vouseq = $_POST['ginvou'];
    $sql ="CALL acc_sp_trn_selacc_ref(" . $vouseq . ")";
    $res = mysqli_query($conn, $sql);
    $nbrow = mysqli_num_rows($res);
    while ($rec = mysqli_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getoutgrp() {
    global $conn;
    $sql ="select grp_code,grp_name from acc_group_master where grp_comp_code in (1) and grp_code in (134,136,137,138,140)";
    $res = mysqli_query($conn, $sql);
    $nbrow = mysqli_num_rows($res);
    while ($rec = mysqli_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getrecageinggrp() {
    global $conn;
    $compcode = $_POST['gincompcode'];
    $sql ="select grp_code,grp_name from acc_group_master where grp_comp_code in ($compcode) and grp_code in (44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,133,134,135,136,137,138,140,141,148,150,151,152,153,181,183,185,191,210,211,212,220)";
    $res = mysqli_query($conn, $sql);
    $nbrow = mysqli_num_rows($res);
    while ($rec = mysqli_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getcdgroup() {
    global $conn;
    $sql ="select grp_code,grp_name from acc_group_master where grp_comp_code=1 and grp_name like 'trade%'";
    $res = mysqli_query($conn, $sql);
    $nbrow = mysqli_num_rows($res);
    while ($rec = mysqli_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function gettradegroup() {
    global $conn;
    $sql ="select grp_code,grp_name from acc_group_master where grp_comp_code=1 and grp_name like 'trade%' or (grp_code=4 or grp_parent_code=4)  ";
    $res = mysqli_query($conn, $sql);
    $nbrow = mysqli_num_rows($res);
    while ($rec = mysqli_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getreggroup() {
    global $conn;
    $comp = 1;
    $sql ="CALL acc_sp_selregiongroup(" . $comp . ")";
    $res = mysqli_query($conn, $sql);
    $nbrow = mysqli_num_rows($res);
    while ($rec = mysqli_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getregaccname() {
    global $conn;
    $sql ="select cust_code,cust_name from massal_customer  ";
    $res = mysqli_query($conn, $sql);
    $nbrow = mysqli_num_rows($res);
    while ($rec = mysqli_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getregrefno() {
    global $conn;
    $comp = 1;
    $fin = 23;
    $grp = $_POST['gingrp'];
//	$grp=134;
    $sql ="CALL acc_sp_selregionalreceiptno(" . $grp . "," . $fin . "," . $comp . ")";
    $res = mysqli_query($conn, $sql);
    $nbrow = mysqli_num_rows($res);
    while ($rec = mysqli_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getregrefdet() {
    global $conn;
    $refno = $_POST['ginrefno'];
    $sql ="CALL acc_sp_selregionalreceiptdetail(" . $refno . ")";
    $res = mysqli_query($conn, $sql);
    $nbrow = mysqli_num_rows($res);
    while ($rec = mysqli_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getledcode() {
    global $conn;
    $sql ="CALL general_sp_mas_selcontrolmaster('AC','GENERAL','LMS','ACC_LEDGER_MASTER',1)";
    $res = mysqli_query($conn, $sql);
    $nbrow = mysqli_num_rows($res);
    while ($rec = mysqli_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getoutled() {
//	$comp=1;
global $conn;
    $comp = $_POST['comp'];
    $grp = $_POST['grpcode'];
    $dt = $_POST['dt'];
    $ds = $_POST['ds'];
    global $conn;
    $sql ="CALL acc_sp_rep_selreceiptledgerabovegivendays('$comp','$grp','$dt','$ds')";
//    $sql ="select cust_code,cust_name from massal_customer where led_grp_code = $grp and led_comp_code = $comp";
    $res = mysqli_query($conn, $sql);
    $nbrow = mysqli_num_rows($res);
    while ($rec = mysqli_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getcustomer() {
    global $conn;
    $sql = "CALL sales_sp_mas_selcustomermaster();";
    $r = mysqli_query($conn, $sql);
    $nbrows = mysqli_num_rows($result);
    if ($nbrows > 0) {
        while ($rec = mysqli_fetch_array($result)) {
            $arr[] = $rec;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nbrows . '","results":' . $jsonresult . '})';
    } else {
        echo '({"total":"0", "results":""})';
    }

    //$res=mysql_query("CALL sales_sp_mas_selcustomermaster();";
    // $nbrow = mysqli_num_rows($res);
    //while($rec = mysqli_fetch_array($res))
    //{
    // $arr[]= $rec ;
    //}
    //	$jsonresult = JEncode($arr);
    //	echo '({"total":"'.$nbrow.'","results":'.$jsonresult.'})';
}

function getMonthname() {
    global $conn;
    $query = "select month_code, month_name from month_master order by month_order_code;";
    $result = mysqli_query($conn, $query);
    $nbrows = mysqli_num_rows($result);
    if ($nbrows > 0) {
        while ($rec = mysqli_fetch_array($result)) {
            $arr[] = $rec;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nbrows . '","results":' . $jsonresult . '})';
    } else {
        echo '({"total":"0", "results":""})';
    }
}

function getPrefixledcode() {
    global $conn;

    $compcode = $_POST['gincompany'];
    $Accname = $_POST['Accname'];
    $sql ="CALL acc_sp_mas_selledger_master_prefix('$Accname','$compcode')";
    $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getchqvouno() {
    global $conn;

    $ledcode = $_POST['ledcode'];
    $prefix = $_POST['ledprefix'];
    $comp = $_POST['compcode'];
    $fin = $_POST['finid'];
    $sql ="CALL acc_sp_rep_selvoucher_chequeprint('$ledcode','$prefix','$fin','$comp')";
    $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getchqledname() {
    global $conn;

    $ledcode = $_POST['ledname'];
    $vouno = $_POST['vouno'];
    $comp = $_POST['compcode'];
//    $sql ="select cust_code,cust_name from acc_tran,massal_customer where acctran_accref_seqno = $vouno and acctran_cust_code <> $ledcode and cust_code = acctran_led_code and led_comp_code = $comp";
    $sql ="select cust_code,cust_name from acc_tran,massal_customer where
acctran_accref_seqno = $vouno and acctran_cust_code <> $ledcode and cust_code = acctran_led_code";
$r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getchqamount() {
    global $conn;

    $ledcode = $_POST['ledname'];
    $vouno = $_POST['vouno'];
    $sql ="select acctran_totamt from acc_tran where
acctran_accref_seqno = $vouno and acctran_led_code = $ledcode";
    $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getBank() {
    global $conn;
    $compcode = $_POST['compcode'];
    $gstopt = $_POST['gstopt'];

    if ($gstopt == "R") {
        $query = "select cust_code,cust_name,led_prefix from massal_customer where led_grp_code in (26)";
    } else if ($gstopt == "P") {
        $query = "select cust_code,cust_name from massal_customer where led_grp_code in (26)";
    } else {
        $query = "select cust_code,cust_name from acc_ledger_master";
    }


    $result = mysqli_query($conn, $query);
    $nbrows = mysqli_num_rows($result);
    if ($nbrows > 0) {
        while ($rec = mysqli_fetch_array($result)) {
            $arr[] = $rec;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nbrows . '","results":' . $jsonresult . '})';
    } else {
        echo '({"total":"0", "results":""})';
    }
}

//$query = "select led_code,cust_name from massal_customer where led_grp_code not in (20,21,22,23,24,25,26,90,91,92,93,94,95,96,102,182) ";
function getledbookNEWlook() {
    global $conn;
    $reptype = $_POST['reptype'];
    if($reptype == 'A')
    {
    $query = "select led_code,cust_name from massal_customer order by cust_name";
    }
    else if($reptype == 'S')
    {
    $query = "select led_code,cust_name from massal_customer order by cust_name";
    }
    else if($reptype == 'L')
    {
    $query = "select led_code,cust_name from massal_customer where led_type = 'G'  order by cust_name";
    }
    else if($reptype == 'G')
    {
    $query = "select grp_code as led_code,grp_name as cust_name from acc_group_master order by grp_name";
    }

    $result = mysqli_query($conn, $query);
    $nbrows = mysqli_num_rows($result);
    if ($nbrows > 0) {
        while ($rec = mysqli_fetch_array($result)) {
            $arr[] = $rec;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nbrows . '","results":' . $jsonresult . '})';
    } else {
        echo '({"total":"0", "results":""})';
    }
}
function getledbookledger() {
    global $conn;
    $comp = $_POST['gincompcode'];
    $query = "select led_code,cust_name from massal_customer where led_grp_code not in (20,21,22,23,24,25,26,90,91,92,93,94,95,96,102,182) and led_status='Y'";
    $result = mysqli_query($conn, $query);
    $nbrows = mysqli_num_rows($result);
    if ($nbrows > 0) {
        while ($rec = mysqli_fetch_array($result)) {
            $arr[] = $rec;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nbrows . '","results":' . $jsonresult . '})';
    } else {
        echo '({"total":"0", "results":""})';
    }
}

function getVoucherNo() {
    global $conn;

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
		massal_customer 
    where
	atrn.acctran_led_code	= cust_code and
        atrn.acctran_cust_code     =    '$Account'        and
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
		massal_customer 
    where
	atrn.acctran_cust_code	= cust_code and
        atrn.acctran_led_code     =    '$Account'        and
        aref.accref_seqno         =     atrn.acctran_accref_seqno and
        aref.accref_vou_type      in ('BP','CP')             and
        aref.accref_comp_code     =    '$CompCode'         and
        aref.accref_finid         =     '$Finid'           and
        atrn.acctran_cramt         >     0  ";
	}
    $result = mysqli_query($conn, $query);
    $nbrows = mysqli_num_rows($result);
    if ($nbrows > 0) {
        while ($rec = mysqli_fetch_array($result)) {
            $arr[] = $rec;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nbrows . '","results":' . $jsonresult . '})';
    } else {
        echo '({"total":"0", "results":""})';
    }
}

function getRVoucherNo() {
    global $conn;

    $ledcode = $_POST['Account'];
    $Finid = $_POST['finid'];
    $CompCode = $_POST['compcode'];
    $flag = 'Y';
    $type = '0';

    $sql ="CALL acc_sp_trn_selacc_tran_vou_no_receipt('$ledcode','$CompCode','$Finid','$flag','$type')";
    $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getPaymentvouno() {
    global $conn;

    $Account = $_POST['Account'];
    $CompCode = $_POST['compcode'];
    $Finid = $_POST['finid'];
    $flag = 'Y';
    $type = '0';
    $sql ="CALL acc_sp_rep_selacc_tran_vou_no_cover_details($Account,$CompCode,$Finid,'$flag','$type')";
    $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function gettypevouno() {
    global $conn;

    $Acctype = $_POST['Acctype'];
//$Acctype='EX';
    $CompCode =  $_POST['compcode'];
    $Finid = $_POST['finid'];
    $sql ="CALL acc_sp_trn_selacc_tran_vou_no_journal_voucher($CompCode,$Finid,'N','$Acctype')";
    $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getVoucherLedgerDetails() {
    global $conn;

    $Account = $_POST['Account'];
    $VoucherId = $_POST['VoucherId'];
    $VoucherNo = $_POST['VoucherNo'];
    $CompanyCode = $_POST['gincompcode'];
    //    $Account=23;
    //      $VoucherId=1223345;
//        $VoucherNo='SBICCP875';
    //$CompanyCode=1;
    global $conn;
    $sql ="CALL acc_sp_rep_selleddetails_vouprint('$VoucherId','$VoucherNo','$Account','$CompanyCode')";
    $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getprintvouno() {
    global $conn;

    $ledcode = $_POST['ledcode'];
    $prefix = $_POST['ledprefix'];
    $comp = $_POST['compcode'];
    $fin = $_POST['finid'];
    $query = "call acc_sp_rep_selvoucher_vouprint(" . $ledcode . ",'" . $prefix . "'," . $fin . "," . $comp . ")";
    $sql = $query;
    $arr = array();
    If (!$rs = mysqli_query($conn, $sql)) {
        Echo '{success:false}';
    } else {
        $rs_count = mysqli_query($conn, $query);
        $results = mysqli_num_rows($rs_count);
        while ($obj = mysql_fetch_object($rs)) {
            $arr[] = $obj;
        }
        Echo '{success:true,results:' . $results . ',
            rows:' . json_encode($arr) . '}';
    }
}

function getSelGroupCustomer() {
    global $conn;

    $company = 1;
    $GroupCode = $_POST['Groupcode'];
    $query = "select cust_code,cust_name from massal_customer where led_grp_code ='$GroupCode' order by cust_name";
    $result = mysqli_query($conn, $query);

    $nbrows = mysqli_num_rows($result);
    if ($nbrows > 0) {
        while ($rec = mysqli_fetch_array($result)) {
            $arr[] = $rec;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nbrows . '","results":' . $jsonresult . '})';
    } else {
        echo '({"total":"0", "results":""})';
    }
}

function getsalescustomer() {
    global $conn;

    global $conn;
    $comp = $_POST['gincompcode'];
    $sql ="CALL accsalesspselcustomermaster($comp)";
    $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getsalregledger() {

    global $conn;
    $comp = $_POST['compcode'];
    $grp = $_POST['grpcode'];
    $sql ="CALL acc_sp_selledger_master_ledgrpcode($grp,$comp)";
    $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getsalreggroup() {
    global $conn;
    $comp = $_POST['compcode'];
    $sql ="CALL acc_sp_trn_selledger_master_trade($comp)";
    $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
    while ($re = mysqli_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getcommongroupnew() {
    global $conn;

    $compcode = $_POST['gincompcode'];
//    $group = $_POST['group'];
//$compcode=1;
//$group='134,136,137,138,140';
    $sql ="select distinct grp_code,grp_name from acc_group_master where grp_code in (134,136,137,138,140,135,63,210,162) and grp_comp_code in ($compcode) and grp_name like '%debtors%' order by grp_name ";
    $r = mysqli_query($conn, $res);
    $nbrow = mysqli_num_rows($res);
    while ($rec = mysqli_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}


function getcommongroup() {
    global $conn;

    $compcode = $_POST['gincompcode'];
//    $group = $_POST['group'];
//$compcode=1;
//$group='134,136,137,138,140';
    $sql ="select distinct grp_code,grp_name from acc_group_master where grp_comp_code in ($compcode) and grp_name like '%debtors%' order by grp_name ";
    $res = mysqli_query($conn, $sql);
    $nbrow = mysqli_num_rows($res);
    while ($rec = mysqli_fetch_array($res)) {
        $arr[] = $rec;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nbrow . '","results":' . $jsonresult . '})';
}

function getvoucherpreprint() {
    global $conn;
    $accrefseqno = $_POST['accrefseqno'];
    $ledcode = $_POST['ledcode'];
    $ledprefix = $_POST['ledprefix'];
    $finid = $_POST['finid'];
    $compcode = $_POST['compcode'];
    $vouno = $_POST['vouno'];
    //	$comp=$_POST['compcode'];

    $query = "CALL acc_sp_rep_selvoucherdetails_voupreprint($accrefseqno,$ledcode,'" . $ledprefix . "',$finid,$compcode,'" . $vouno . "')";
    $result = mysqli_query($conn, $query);
    $nbrows = mysqli_num_rows($result);
    if ($nbrows > 0) {
        while ($rec = mysqli_fetch_array($result)) {
            $arr[] = $rec;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nbrows . '","results":' . $jsonresult . '})';
    } else {
        echo '({"total":"0", "results":""})';
    }
}

function getgrpledger() {
    global $conn;
    $comp = $_POST['comp'];
    $grpcode = $_POST['grpcode'];
    $query = "select cust_code,cust_name from massal_customer where led_grp_code = '$grpcode'";
    $result = mysqli_query($conn, $query);
    $nbrows = mysqli_num_rows($result);
    if ($nbrows > 0) {
        while ($rec = mysqli_fetch_array($result)) {
            $arr[] = $rec;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nbrows . '","results":' . $jsonresult . '})';
    } else {
        echo '({"total":"0", "results":""})';
    }
}
?>



