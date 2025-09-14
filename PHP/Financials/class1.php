<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

mysql_query("SET NAMES utf8");

$task = 'VouNo';

if (isset($_POST['task'])) {
    $task = $_POST['task'];   // Get this from Ext
}
switch ($task) {
	
  /*  case "TrailBills2":
        getTrailBills2();
        break;
    case "TrailBills":
        getTrailBills();
        break;
    case "VouNoinv":
        getVouNoinv();
        break;
    case "VouNonew":
        getVouNonew();
        break;
    case "TranDetailsDifferencewith":
        getTranDetailsDifferencewith();
        break;
    case "TranDetailsDifference":
        getTranDetailsDifference();
        break;
    case "pbmvou":
        getpbmvou();
        break;
    case "Accountstatus":
        getAccountstatus();
        break;
    case "VouNoAdjnew":
        getVouNoAdjnew();
        break;
    case "VouNoAdjnewlevel":
        getVouNoAdjnewlevel();
        break;

    case "VouNoAdj":
        getVouNoAdj();
        break;
    case "AmountVariation":
        getAmountVariation();
        break;
    case "Tran":
        getTran();
        break;
    case "Trail":
        getTrail();
        break;*/
    case "VouNo":
        getVouNo();
        break;
    default:
        echo "{failure:true}"; 
        break;
}

function JEncode($arr) {
    if (version_compare(PHP_VERSION, "5.2", "<")) {
        require_once("./JSON-.php");   //if php<5.2 need JSON class
        $json = new Services_JSON();  //instantiate new json object
        $data = $json->encode($arr);    //encode the data in json format
    } else {
        $data = json_encode($arr);    //encode the data in json format
    }
    return $data;
}


   
/*function getTrailBills2()
{
    $seq=$_POST['seq'];	
    $r = "SELECT 
      accref_vouno as refpurchaseno,recpay_amount as refamount, DATE_FORMAT(recpay_ref_date,'%d-%m-%Y') as refpartyinvdate
FROM
    acc_recpay_tran,
    acc_ref
WHERE
    recpay_aaccref_seqno = accref_seqno
        AND recpay_oaccref_seqno = '$seq'";
    $m = mysql_query($r);
    $nrow = mysql_num_rows($m);
    while ($re = mysql_fetch_array($m)) {
        $arr[] = $re;
    }
    $jsonresult = json_encode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})'; 
}

function getTrailBills()
{
    $seq=$_POST['seq'];	
    $r = "SELECT 
        recpay_ref_no as refpurchaseno,recpay_amount as refamount, DATE_FORMAT(recpay_ref_date,'%d-%m-%Y') as refpartyinvdate
	FROM
	    acc_recpay_tran
	WHERE
	    recpay_aaccref_seqno = '$seq'";
    $m = mysql_query($r);
    $nrow = mysql_num_rows($m);
    while ($re = mysql_fetch_array($m)) {
        $arr[] = $re;
    }
    $jsonresult = json_encode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})'; 
}

function getVouNoinv()
{
    $finid=$_POST['finid'];
    $compcode=$_POST['comp'];
    $vouno=$_POST['vouno'];	
    $r = "select 
	acctrail_inv_no,acctrail_inv_date
from
    acc_ref,acc_trail
where
accref_seqno = acctrail_accref_seqno and 
accref_comp_code = '$compcode' and 
accref_finid = '$finid' and 
accref_vouno='$vouno'";
    $m = mysql_query($r);
    $nrow = mysql_num_rows($m);
    while ($re = mysql_fetch_array($m)) {
        $arr[] = $re;
    }
    $jsonresult = json_encode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})'; 
}

function getTranDetailsDifferencewith()
{
    $finid=$_POST['finid'];
    $compcode=$_POST['compcode'];
    if($compcode==1){
	$ledval=4338;
    }else if($compcode==4){
	$ledval=13621;
    }	
    $r = "select 
    *
from
    (select 
        accref_vouno,
            accref_seqno,
            sum(acctran_dbamt) - sum(acctran_cramt) as bal
    from
        acc_ref h, acc_tran t
    where
        accref_seqno = acctran_accref_seqno
            and accref_comp_code = '$compcode'
            and accref_vou_type = 'SD'
    group by accref_seqno
    having sum(acctran_dbamt) - sum(acctran_cramt) <> 0)X where accref_seqno in (select 
     accref_seqno
    from
        acc_ref h, acc_tran t
    where
        accref_seqno = acctran_accref_seqno
            and accref_comp_code = '$compcode'
            and accref_vou_type = 'SD' and acctran_led_code in ('$ledval')
    group by accref_seqno
    having sum(acctran_dbamt) - sum(acctran_cramt) <> 0) LIMIT 1";
    $m = mysql_query($r);
    $nrow = mysql_num_rows($m);
    while ($re = mysql_fetch_array($m)) {
        $arr[] = $re;
    }
    $jsonresult = json_encode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})'; 
}
function getTranDetailsDifference()
{
    $finid=$_POST['finid'];
    $compcode=$_POST['compcode'];
    if($compcode==1){
	$ledval=4338;
    }else if($compcode==4){
	$ledval=13621;
    }	
    $r = "select 
    *
from
    (select 
        accref_vouno,
            accref_seqno,
            sum(acctran_dbamt) - sum(acctran_cramt) as bal
    from
        acc_ref h, acc_tran t
    where
        accref_seqno = acctran_accref_seqno
            and accref_comp_code = '$compcode'
            and accref_vou_type = 'SD'
    group by accref_seqno
    having sum(acctran_dbamt) - sum(acctran_cramt) <> 0)X where accref_seqno not in (select 
     accref_seqno
    from
        acc_ref h, acc_tran t
    where
        accref_seqno = acctran_accref_seqno
            and accref_comp_code = '$compcode'
            and accref_vou_type = 'SD' and acctran_led_code in ('$ledval')
    group by accref_seqno
    having sum(acctran_dbamt) - sum(acctran_cramt) <> 0)";
    $m = mysql_query($r);
    $nrow = mysql_num_rows($m);
    while ($re = mysql_fetch_array($m)) {
        $arr[] = $re;
    }
    $jsonresult = json_encode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})'; 
}
function getpbmvou() {
    $finid=$_POST['finid'];
    $r = mysql_query("
select DISTINCT accref_vouno,accref_seqno from(
select 
    DISTINCT accref_vouno,accref_seqno
from
    acc_ref ref,
    acc_tran tn,
    acc_trail tr
where
    ref.accref_seqno = tn.acctran_accref_seqno and ref.accref_seqno = tr.acctrail_accref_seqno and 
accref_payref_date like '%0000%' and accref_finid='$finid'
union
select 
    DISTINCT accref_vouno,accref_seqno
from
    acc_ref ref,
    acc_tran tn,
    acc_trail tr
where
    ref.accref_seqno = tn.acctran_accref_seqno and ref.accref_seqno = tr.acctrail_accref_seqno and 
 accref_voudate like '%0000%' and accref_finid='$finid'
union
select 
    DISTINCT accref_vouno,accref_seqno
from
    acc_ref ref,
    acc_tran tn,
    acc_trail tr
where
    ref.accref_seqno = tn.acctran_accref_seqno and ref.accref_seqno = tr.acctrail_accref_seqno and 
acctrail_inv_date like '%0000%' and accref_finid='$finid'
union
select 
    DISTINCT accref_vouno,accref_seqno
from
    acc_ref ref,
    acc_tran tn,
    acc_trail tr
where
    ref.accref_seqno = tn.acctran_accref_seqno and ref.accref_seqno = tr.acctrail_accref_seqno and 
acctran_totamt=0 and accref_finid='$finid'

union
select 
    DISTINCT accref_vouno,accref_seqno
from
    acc_ref ref,
    acc_tran tn,
    acc_trail tr
where
    ref.accref_seqno = tn.acctran_accref_seqno and ref.accref_seqno = tr.acctrail_accref_seqno and 
acctrail_led_code=0 and accref_finid='$finid'
union
select 
    DISTINCT accref_vouno,accref_seqno
from
    acc_ref ref,
    acc_tran tn,
    acc_trail tr
where
    ref.accref_seqno = tn.acctran_accref_seqno and ref.accref_seqno = tr.acctrail_accref_seqno and 
acctran_led_code=0 and accref_finid='$finid'
union
select 
    DISTINCT accref_vouno,accref_seqno
from
    acc_ref ref,
    acc_tran tn,
    acc_trail tr
where
    ref.accref_seqno = tn.acctran_accref_seqno and ref.accref_seqno = tr.acctrail_accref_seqno and 
acctrail_inv_value=0 and accref_finid='$finid'
)y");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getAccountstatus() {
    $finid=$_POST['finid'];
    $compcode=$_POST['compcode'];
    $status=$_POST['status'];
    if($status=="S"){
    $r = mysql_query("select
    vendor_name as name, purinv_party_invno as invoiceno,purinv_account_flag as status
from
    kgdl.stores_purinv_header h,
    stores_vendor_master v
where
    h.purinv_accref_seqno = 0 and v.vendor_code = h.purinv_vendor_code  and h.purinv_finid = '$finid' and purinv_account_flag='N' and h.purinv_company_code = '$compcode' and  purinv_netvalue >0 order by vendor_name");
    }else if($status=="Y"){
    $r = mysql_query("select mill_name as name ,yarn_inv_mill_invoiceno as invoiceno,'N' as status  from yarn_invoice_header h,mill_master m where yarn_inv_millcode=m.mill_code and Yarn_Inv_accref_seqno=0 and yarn_inv_finid='$finid'");
    }else if($status=="K"){
    $r = mysql_query("select fab_supname as name,Partyinvno as invoiceno ,Accountflag as status from dfd.fibrepurinvheader h, dfd.fab_supplier_master v where v.fab_sup_code=h.SupplierCode and Companycode='4' and Finid='$finid' and Accrefseqno=0 AND Accountflag='S'
order by fab_supname");
    }else if($status=="M"){
    $r = mysql_query("select
    vendor_name as name, purinv_party_invno as invoiceno,purinv_account_flag as status
from
    kgdl.stores_purinv_header h,
    stores_vendor_master v
where
    h.purinv_accref_seqno = 0 and v.vendor_code = h.purinv_vendor_code  and h.purinv_finid = '$finid' and h.purinv_company_code = '6' AND purinv_account_flag='N' order by vendor_name");
    }else if($status=="W"){
    $r = mysql_query("select
    vendor_name as name, womin_billno as invoiceno,'N' as status
from
    kgdl.stores_womin_header h,
    stores_vendor_master v
where
    h.Womin_accref_seqno = 0 and v.vendor_code = h.womin_vendor_code  and Womin_finid='$finid'
		and Womin_company_code='$compcode'order by vendor_name");
    }else if($status=="C"){
    $r = mysql_query("select  par_name as name,pur_parinvno as invoiceno ,inv_h_acctag as status from purinv_header h,party_master p where h.g_parid=p.g_parid and inv_h_acctag='N' and g_finyear='2016-2017'");
    }else if($status=="F"){
    $r = mysql_query("select fab_supname as name,purinv_party_invno as invoiceno ,purinv_account_flag as status from dfd.fab_purinv_header h, dfd.fab_supplier_master v where v.fab_sup_code=h.purinv_vendor_code and purinv_company_code='4' and purinv_finid='$finid' and purinv_accref_seqno=0 
order by fab_supname");
    }else if($status=="A"){
    $r = mysql_query("select
    vendor_name as name, purinv_party_invno as invoiceno,purinv_account_flag as status
from
    kgdl.htstorespurinvheader h,
    stores_vendor_master v
where
    h.purinv_accref_seqno = 0 and v.vendor_code = h.purinv_vendor_code  and h.purinv_finid = '$finid' and h.purinv_company_code = '4' AND purinv_account_flag='N' order by vendor_name");
    }
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getVouNoAdjnewlevel() {
    $vouno=$_POST['vouno'];
    $r = mysql_query("select t.recpay_ref_no,Date_Format(t.recadjdate,'%Y-%m-%d') as recadjdate ,t.recpay_amount,r.accref_vouno from acc_recpay_tran t,acc_ref r where t.recpay_oaccref_seqno='$vouno' and r.accref_seqno=t.recpay_aaccref_seqno");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getVouNoAdjnew() {
    $vouno=$_POST['vouno'];
    $r = mysql_query("select t.recpay_ref_no,Date_Format(t.recpay_ref_date,'%Y-%m-%d') as recpay_ref_date ,t.recpay_amount,r.accref_vouno from acc_recpay_tran t,acc_ref r where t.recpay_aaccref_seqno='$vouno' and r.accref_seqno=t.recpay_oaccref_seqno");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getVouNoAdj() {
    $vouno=$_POST['vouno'];
    $r = mysql_query("select recpay_ref_no,Date_Format(recpay_ref_date,'%Y-%m-%d') as recpay_ref_date ,recpay_amount from acc_recpay_tran where recpay_aaccref_seqno='$vouno'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getAmountVariation() {
    $finid=$_POST['finid'];
    $compcode=$_POST['compcode'];
    $r = mysql_query("call accdiff('$finid')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getTran() {
    $seqno=$_POST['seqno'];
    $compcode=$_POST['compcode'];
    $r = mysql_query("select * from acc_tran t,acc_ledger_master led where acctran_accref_seqno='$seqno' and t.acctran_led_code=led.led_code and led.led_comp_code='$compcode'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getTrail() {
    $seqno=$_POST['seqno'];
    $compcode=$_POST['compcode'];	
    $r = mysql_query("select t.*,led.*,DATE_FORMAT(acctrail_inv_date,'%Y-%m-%d') as acctrail_inv_date1 from acc_trail t,acc_ledger_master led where acctrail_accref_seqno='$seqno' and t.acctrail_led_code=led.led_code and led.led_comp_code='$compcode'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}*/
function getVouNo() {
    //$comp=$_POST['comp'];
    //$finid=$_POST['finid'];
    //$vouno=$_POST['vouno'];
   /* $r = mysql_query("select a.*,DATE_FORMAT(accref_voudate,'%Y-%m-%d') as accref_voudate1,DATE_FORMAT(accref_payref_date,'%Y-%m-%d') as accref_payref_date1 from acc_ref  a where a.accref_comp_code=1 and a.accref_finid=1 and a.accref_vouno='BR476'");*/
    $r = mysql_query("select * from acc_ref  a where a.accref_comp_code=1 and a.accref_finid=21 and a.accref_vouno='BR476'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
/*function getVouNonew() {
    $comp=$_POST['comp'];
    $finid=$_POST['finid'];
    $vouno=$_POST['vouno'];
    $r = mysql_query("select a.*,DATE_FORMAT(accref_voudate,'%Y-%m-%d') as accref_voudate1,DATE_FORMAT(accref_payref_date,'%Y-%m-%d') as accref_payref_date1 from acc_ref  a where a.accref_comp_code='$comp' and a.accref_finid='$finid' and a.accref_vouno='$vouno'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}*/


?>
