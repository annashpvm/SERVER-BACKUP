<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

     mysql_query("SET NAMES utf8");

    $task='';
    
    if ( isset($_POST['task'])){
        $task = $_POST['task']; 
    }

switch ($task) {

       case "Approvecheck":
        getApprovecheck();
        break;
        case "ExportBillDetailsDateDetails":
        getExportBillDetailsDateDetails();
        break;
        case "TerryPurchaseDdbcrNote":
        getTerryPurchaseDdbcrNote();
        break;
    case "TerryPurchaseVouDateDetails":
        getTerryPurchaseVouDateDetails();
        break;
    case "TerryPurchaseMinTrailerDetails":
        getTerryPurchaseMinTrailerDetails();
        break;
    case "TerryPurchaseMinTrailer":
        getTerryPurchaseMinTrailer();
        break;
    case "TerryPurchaseMinHeader":
        getTerryPurchaseMinHeader();
        break;
    case "TerryPurchaseMinseqno":
        getTerryPurchaseMinseqno();
        break;
    case "TerryPurchase":
        getTerryPurchase();
        break;
    case "FibrePurchaseDdbcrNote":
        getFibrePurchaseDdbcrNote();
        break;
    case "FibrePurchaseVouDateDetails":
        getFibrePurchaseVouDateDetails();
        break;
    case "FibrePurchaseMinTrailerDetails":
        getFibrePurchaseMinTrailerDetails();
        break;
    case "FibrePurchaseMinTrailer":
        getFibrePurchaseMinTrailer();
        break;
    case "FibrePurchaseMinHeader":
        getFibrePurchaseMinHeader();
        break;
    case "FibrePurchaseMinseqno":
        getFibrePurchaseMinseqno();
        break;
    case "FibrePurchase":
        getFibrePurchase();
        break;
    case "LedAgs":
        getLedAgs();
        break;
    case "LedgerNewEdit":
        getLedgerNewEdit();
        break;
    case "MaxdateMadeups":
        getMaxdateMadeups();
        break;
    case "DbcrnoteMadeups":
        getDbcrnoteMadeups();
        break;
    case "MinlenMadeups":
        getMinlenMadeups();
        break;
    case "StoreDetailsMinTrailDataStoreMadeups123":
        getStoreDetailsMinTrailDataStoreMadeups123();
        break;
    case "StoreDetailsMinTrailMadeups":
        getStoreDetailsMinTrailMadeups();
        break;
    case "StorePurchaseDetailsMinMadups":
        getStorePurchaseDetailsMinMadups();
        break;
    case "StorePurchaseMinMadeups":
        getStorePurchaseMinMadeups();
        break;
    case "StorePurchaseMadups":
        getStorePurchaseMadups();
        break;
    case "Temp":
        getTemp();
        break;
    case "GroupAgs":
        getGroupAgs();
        break;
    case "AdjustDetails2":
        getAdjustDetails2();
        break;
    case "BankDetails2":
        getBankDetails2();
        break;
    case "WorkOrderMaxDate":
        getWorkOrderMaxDate();
        break;
    case "DbcrnoteWorkOrder":
        getDbcrnoteWorkOrder();
        break;
    case "WorkorderDetailsRec":
        getWorkorderDetailsRec();
        break;
    case "WorkorderDetailstrail":
        getWorkorderDetailstrail();
        break;
    case "WorkorderSeqno":
        getWorkorderSeqno();
        break;
    case "WorkorderMinHeader":
        getWorkorderMinHeader();
        break;
    case "partyledgeravailbal":
        getpartyledgeravailbal();
        break;
    case "cottondbcr":
        getcottondbcr();
        break;
    case "CottonTrailere":
        getCottonTrailere();
        break;
    case "Dbcrnote1":
        getDbcrnote1();
        break;
    case "YarnPurchaseTrail":
        getYarnPurchaseTrail();
        break;
    case "YarnPurchase":
        getYarnPurchase();
        break;
    case "Dbcrnote":
        getDbcrnote();
        break;
    case "Maxdate2":
        getMaxdate2();
        break;
    case "Maxdate":
        getMaxdate();
        break;
    case "Minlen2":
        getMinlen2();
        break;
    case "Minlen":
        getMinlen();
        break;
    case "Purchaseparty":
        getPurchaseparty();
        break;
    case "VocherDetailsTrail":
        getVocherDetailsTrail();
        break;
    case "VocherDetails":
        getVocherDetails();
        break;
    case "PurchseSeqno":
        getPurchseSeqno();
        break;
    case "SeqnoRef":
        getSeqnoRef();
        break;
    case "InvDate":
        getInvDate();
        break;
    case "BankDetails":
        getBankDetails();
        break;
    case "Invoicechk":
        getInvoicechk();
        break;
    case "CurrentBal":
        getCurrentBal();
        break;
    case "LedgerDetail":
        getLedgerDetail();
        break;
    case "AdjustDetails":
        getAdjustDetails();
        break;
    case "ExportBillDetails":
        getExportBillDetails();
        break;
    case "AccbankDetails":
        getAccbankDetails();
        break;
    case "AccDetails":
        getAccDetails();
        break;
    case "cmbHeadAccount":
        getHeadAccount();
        break;
    case "Findsubgroup":
        getFindsubgroup();
        break;
    case "cmbVocNo":
        getVocNo();
        break;
    case "AccountPartyName":
        getAccountPartyName();
        break;
    case "Dbcrvalue":
        getDbcrvalue();
        break;
    case "StorePurchaseDetailsr":
        getStorePurchaseDetailsr();
        break;
    case "StoreDetailsMinTrailr":
        getStoreDetailsMinTrailr();
        break;
    case "StoreDetailsMinTrail":
        getStoreDetailsMinTrail();
        break;
    case "StoreDetailsMinTrail123":
        getStoreDetailsMinTrail123();
        break;
    case "StorePurchaseDetails":
        getStorePurchaseDetails();
        break;
    case "StorePurchaseMin":
        getStorePurchaseMin();
        break;
    case "StorePurchase":
        getStorePurchase();
        break;
    case "Suppname":
        getSuppname();
        break;
    case "cmbGroup":
        getGroup();
        break;
    case "partyledger":
        getpartyledger();
        break;
    case "InvoiceNo":
        getInvoiceNo();
        break;
    case "VendorNameMill":
        getVendorNameMill();
        break;
    case "cmbMonth":
        getMonth();
        break;
    case "VendorDefault":
        getVendorDefault();
        break;
    case "PurchaseNo":
        getPurchaseNo();
        break;
    case "VendorName":
        getVendorName();
        break;
    case "cmbMillName":
        getMillName();
        break;
    case "cmbReason":
        getReason();
        break;
    case "Partyname":
        getPartyname();
        break;
    case "Address":
        getAddress();
        break;
    case "cmbInvNo":
        getInvNo();
        break;
    case "InvDetails2":
        getInvDetails2();
        break;
    case "InvDetails":
        getInvDetails();
        break;
    case "cmbCurrency":
        getCurrency();
        break;
    case "ControlCreditNo":
        getControlCreditNo();
        break;
    case "cmbpartyname":             // Give the entire list
        getLedgerName();
        break;
    case "ControlDebitNo":
        getControlDebitNo();
        break;
    case "cmbDnInvNo":
        getDebitInvNo();
        break;
    case "LoadLedgerlist":
        getLedgerlist();
        break;

    default:
        echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
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

function getApprovecheck() {
    $seqaccref=$_POST['seqaccref'];
    $r = mysql_query("SELECT 
	    COUNT(*) AS cnt
	FROM
	    accounts_approve
	WHERE
	    approveseq = '$seqaccref'
		AND DATE_FORMAT(appdate, '%Y-%m-%d') = CURDATE()");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getTerryPurchaseDdbcrNote() {
    $invno=$_POST['invno'];
    $ledcode=$_POST['ledcode'];
    $finid=$_POST['finid'];
    $compcode=$_POST['compcode'];
    $r = mysql_query("call acc_sp_trn_selpurinv_fabdbcrnote('$invno','$ledcode','$finid','$compcode','T')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getTerryPurchaseVouDateDetails() {
   $minseqno=$_POST['minseqno'];
    $r = mysql_query("select DATE_FORMAT(max(mindate),'%Y-%m-%d') As max_mindate From dfd.hometexminheader where FIND_IN_SET(minseqno,'$minseqno')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getTerryPurchaseMinHeader() {
   $minseqno=$_POST['minseqno'];
    $r = mysql_query("select
              h.*,
              fabsupname
             from  dfd.hometexminheader h,
              dfd.hometexsuppliermaster v
             where   FIND_IN_SET(minseqno,'$minseqno') and
              minvendorcode =  fabsupcode ");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getTerryPurchaseMinTrailerDetails() {
   $minseqno=$_POST['minseqno'];
    $r = mysql_query("select minfreightacctflag,sum(minsstval) as sstval,sum(minscval) as scval,
                sum(minexcisedutyval) as exciseduty,sum(minfreightval) as freight,sum(mincharity) as charity,
                sum(minhandpack) as handpack,sum(minforward) as forwardcharg,sum(minaed) as aedval,sum(minbed) as bedval,
                sum(mineducess) as educess,sum(mininsurance) as insurance,sum(minothercharges1) as other1,
                sum(minothercharges2) as other2,sum(mindiscountval) As discount,sum(mincess) as cess,mindiscountreason  From dfd.hometexminheader
                where FIND_IN_SET(minseqno,'$minseqno')  group by minfreightacctflag,mindiscountreason");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getTerryPurchaseMinTrailer() {
   $minseqno=$_POST['minseqno'];
    $r = mysql_query(" select
  t.*,
  i.itemname as prod_code,
  'Pcs' as unit_name
 from  dfd.hometexmintrailer t,
  dfd.hometexsortmaster i
 where FIND_IN_SET(t.minseqno,'$minseqno')   and
  minitemcode  = itemseqno  ");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getTerryPurchaseMinseqno() {
   $invno=$_POST['invno'];
    $r = mysql_query("select
          distinct purinvminseqno
         from  dfd.hometexpurinvtrailer
         where  purinvseqno = '$invno'
         order by purinvminseqno");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getFibrePurchaseDdbcrNote() {
    $invno=$_POST['invno'];
    $ledcode=$_POST['ledcode'];
    $finid=$_POST['finid'];
    $compcode=$_POST['compcode'];
    $r = mysql_query("call acc_sp_trn_selpurinv_fabdbcrnote('$invno','$ledcode','$finid','$compcode','F')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getFibrePurchaseVouDateDetails() {
   $minseqno=$_POST['minseqno'];
    $r = mysql_query("select DATE_FORMAT(max(Date),'%Y-%m-%d') As max_mindate From dfd.fibreminheader where FIND_IN_SET(Seqno,'$minseqno')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getFibrePurchaseMinHeader() {
   $minseqno=$_POST['minseqno'];
    $r = mysql_query("call fibre_sp_trn_selminheaderdetails ('$minseqno','MIN')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getFibrePurchaseMinTrailerDetails() {
   $minseqno=$_POST['minseqno'];
    $r = mysql_query("select Freightacctflag,sum(Sstval) as sstval,sum(Scval) as scval,
                sum(Excisedutyval) as exciseduty,sum(Freightval) as freight,sum(Charity) as charity,
                sum(Handpack) as handpack,sum(Forward) as forwardcharg,sum(Aed) as aedval,sum(Bed) as bedval,
                sum(Educess) as educess,sum(Insurance) as insurance,sum(Othercharges1) as other1,
                sum(Othercharges2) as other2,sum(Discountval) As discount,sum(Cess) as cess,Discountreason ,
                sum(VAT) as VAT,sum(CST) as CST From dfd.fibreminheader
                where  FIND_IN_SET(Seqno,'$minseqno') group by Freightacctflag,Discountreason");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getFibrePurchaseMinTrailer() {
   $minseqno=$_POST['minseqno'];
    $r = mysql_query("call fibre_sp_trn_selmintrailerdetails('$minseqno','MIN')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getFibrePurchaseMinseqno() {
   $invno=$_POST['invno'];
    $r = mysql_query("call acc_sp_trn_selpurinvminseqno_fibre('$invno')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getLedAgs() {
   $ledname=$_POST['ledname'];
   $compcode=$_POST['compcode'];
    /*$r = mysql_query("select led_name,led_code from acc_ledger_master where led_comp_code='$compcode' and led_name = '$ledname' and led_status<>'N'");*/
    
     $r = mysql_query("select led_name,led_code from acc_ledger_master where  led_name = '$ledname' and led_status<>'N'");
   // $r = mysql_query("select led_name,led_code from acc_ledger_master ");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getExportBillDetailsDateDetails() {
   $accinv=$_POST['accinv'];
   $flag=$_POST['flag'];
    if($flag=="K"){	
    $r = mysql_query("select 
    pack_no,DATE_FORMAT(bl_date,'%d-%m-%Y') as bl_date,cinv_premium_days,DATE_FORMAT(DATE_ADD(bl_date, INTERVAL +cinv_premium_days DAY),'%d-%m-%Y') as datenew
from
    expo_billofladding,
    expo_pack_header,
    expo_cinv_header
where
    bl_inv_seqno = pack_seqno
        and bl_inv_seqno = cinv_pack_seqno
		and pack_no='$accinv'");
    }else if($flag=="F"){	
    $r = mysql_query("select 
    packno,DATE_FORMAT(bldate,'%d-%m-%Y') as bl_date,cinvpremiumdays AS cinv_premium_days,DATE_FORMAT(DATE_ADD(bldate, INTERVAL +cinvpremiumdays DAY),'%d-%m-%Y') as datenew
from
    dfd.expofabbillofladding,
    dfd.expofabpackheader,
    dfd.expofabcinvheader
where
    Blinvseqno = packseqno
        and Blinvseqno = cinvpackseqno
		and packno='$accinv'");
    }else if($flag=="M"){	
    $r = mysql_query("select 
    invno as packno,DATE_FORMAT(bldate,'%d-%m-%Y') as bl_date,cinvpremiumdays,DATE_FORMAT(DATE_ADD(bldate, INTERVAL +cinvpremiumdays DAY),'%d-%m-%Y') as datenew
from
    dfd.expohometexbillofladding,
    dfd.expohometexpreshipheader,
    dfd.expohometexcinvheader
where
    Blinvseqno = invseqno
        and Blinvseqno = cinvinvseqno
		and invno='$accinv'");
    }	
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getLedgerNewEdit() {
   $ledname=$_POST['ledname'];
   $compcode=$_POST['compcode'];
  /*  $r = mysql_query("select led_name,led_code from acc_ledger_master where led_comp_code='$compcode' and led_name like '$ledname' and led_status<>'N'");*/
    
    $r = mysql_query("select led_name,led_code from acc_ledger_master where led_name like '$ledname' and led_status<>'N'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getMaxdateMadeups() {
   $minseqno=$_POST['minno'];
    $r = mysql_query("select max(min_date) As max_mindate From htstoresminheader where  FIND_IN_SET(min_seqno,'$minseqno')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getDbcrnoteMadeups() {
   $Invno=$_POST['Invno'];
   $ledcode=$_POST['ledcode'];
   $finid=$_POST['finid'];
   $compcode=$_POST['compcode'];
    $r = mysql_query("call acc_sp_trn_selpurinv_dbcrnote('$Invno','$ledcode','$finid','$compcode','S')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getMinlenMadeups() {
   $minseqno=$_POST['minseqno'];
    $r = mysql_query("select
    min_freight_acctflag,
    sum(min_tngstval) as tngst,
    sum(min_cstval) as cst,
    sum(min_excisedutyval) as exciseduty,
    sum(min_freightval) as freight,
    sum(min_othercharges1) as other1,
    sum(min_othercharges2) as other2,
    sum(min_discountval) As discount,
    sum(min_addexciseduty_val) As AddExduty_val
From
    htstoresminheader
where
    FIND_IN_SET(min_seqno, '$minseqno')
group by min_freight_acctflag");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getStoreDetailsMinTrailDataStoreMadeups123() {
   $minseqno=$_POST['minseqno'];
    $r = mysql_query("call stores_sp_trn_selmadeupsmintrailerdetailsnew3('$minseqno','MIN')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getStoreDetailsMinTrailMadeups() {
   $minseqno=$_POST['minseqno'];
    $r = mysql_query("call stores_sp_trn_selmadeupsmintrailerdetailsnew2('$minseqno','MIN')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getStorePurchaseDetailsMinMadups() {
   $minseqno=$_POST['minseqno'];
    $r = mysql_query("call stores_sp_trn_selmadeupsminheaderdetails('$minseqno','MIN')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getStorePurchaseMinMadeups() {
   $invseqno=$_POST['invseqno'];
    $r = mysql_query("call acc_sp_trn_selmadeupspurinvminseqno('$invseqno')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getGroupAgs() {
   $name=$_POST['name'];
   $compcode=$_POST['compcode'];
    $r = mysql_query("select
        led_code, led_name
    from
        acc_ledger_master
    where
        led_comp_code = '$compcode'
        and led_name='$name' and led_status='Y'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getStorePurchaseMadups() {
   $invno=$_POST['invno'];
    $r = mysql_query("call acc_sp_trn_selmadeupspurinvheader('$invno')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getWorkOrderMaxDate() {
   $minno=$_POST['minno'];
    $r = mysql_query("select DATE_FORMAT(max(Womin_date),'%Y-%m-%d') As Womin_date From stores_womin_header where FIND_IN_SET(Womin_seqno,'$minno') ");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getTemp() {
    mysql_query("SET NAMES utf8");
    $flag=$_POST['flag'];
    if($flag=="S"){
    $r = mysql_query("select itemname,ValueDef,sum(Value) as Value,
    sum(DebitAmtt) as DebitAmtt from kgdl.tempstore
    group by ValueDef;");
    }else if($flag=="Y"){
     $r = mysql_query("select itemname,ValueDef,sum(Value) as Value,
    sum(DebitAmtt) as DebitAmtt from kgdl.tempyarn
    group by ValueDef");
    }else if($flag=="IY"){
     $r = mysql_query("select itemname,ValueDef,sum(Value) as Value,
    sum(DebitAmtt) as DebitAmtt from kgdl.tempimportyarn
    group by ValueDef");
    }else if($flag=="CT"){
     $r = mysql_query("select itemname,ValueDef,sum(Value) as Value,
    sum(DebitAmtt) as DebitAmtt from kgdl.tempcotton
    group by ValueDef;");
    }else if($flag=="M"){
     $r = mysql_query("select itemname,ValueDef,sum(Value) as Value,
    sum(DebitAmtt) as DebitAmtt from kgdl.tempifdstore
    group by ValueDef;");
    }else if($flag=="W"){
     $r = mysql_query("select itemname,ValueDef,sum(Value) as Value,
    sum(DebitAmtt) as DebitAmtt from kgdl.tempworkoder
    group by ValueDef;");
    }else if($flag=="IM"){
     $r = mysql_query("select itemname,ValueDef,sum(Value) as Value,
    sum(DebitAmtt) as DebitAmtt from kgdl.tempworkorderifd
    group by ValueDef;");
    }else if($flag=="A"){
     $r = mysql_query("select itemname,ValueDef,sum(Value) as Value,
    sum(DebitAmtt) as DebitAmtt from kgdl.tempmadeups
    group by ValueDef;");
    }else if($flag=="K"){
     $r = mysql_query("select itemname,ValueDef,sum(Value) as Value,
    sum(DebitAmtt) as DebitAmtt from kgdl.tempfibre
    group by ValueDef;");
    }else if($flag=="T"){
     $r = mysql_query("select itemname,ValueDef,sum(Value) as Value,
    sum(DebitAmtt) as DebitAmtt from kgdl.tempaccterry
    group by ValueDef;");
    }
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getDbcrnoteWorkOrder() {
   $Invno=$_POST['Invno'];
   $ledcode=$_POST['ledcode'];
   $finid=$_POST['finid'];
   $compcode=$_POST['compcode'];
    $r = mysql_query("call acc_sp_trn_selpurinv_dbcrnote_new('$Invno','$ledcode','$finid','$compcode','S')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getWorkorderDetailsRec() {
    $seqno=$_POST['seqno'];
    $r = mysql_query("select Womin_freight_acctflag,sum(Womin_tngstval) as tngst,sum(Womin_cstval) as cst,
            sum(Womin_excisedutyval) as exciseduty,sum(Womin_freightval) as freight,sum(Womin_othercharges1) as other1,
            sum(Womin_othercharges2) as other2,sum(Womin_discountval) As discount,sum(Womin_addexciseduty_val) As AddExduty_val  From stores_womin_header
            where FIND_IN_SET(Womin_seqno,'$seqno') group by Womin_freight_acctflag");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getWorkorderDetailstrail() {
    $wominseqno=$_POST['wominseqno'];
    $r = mysql_query("call stores_sp_trn_womintrailerdetails('$wominseqno','WOM')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getWorkorderSeqno() {
    $seqno=$_POST['seqno'];
    $r = mysql_query("CALL acc_sp_trn_selminseqno('$seqno')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getWorkorderMinHeader() {
    $seqno=$_POST['seqno'];
    $r = mysql_query("select h.*,DATE_FORMAT(Womin_billdate,'%Y-%m-%d') as date1 from kgdl.stores_womin_header h
	where 	h.Womin_seqno	='$seqno'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getpartyledgeravailbal() {
    $ledcode=$_POST['ledcode'];
    $compcode=$_POST['compcode'];
     mysql_query("SET NAMES utf8");
    $r = mysql_query("call acc_sp_mas_selledger('$compcode','$ledcode')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getcottondbcr() {
    $Invno=$_POST['Invno'];
    $ledcode=$_POST['ledcode'];
    $finid=$_POST['finid'];
    $compcode=$_POST['compcode'];
    $r = mysql_query("call acc_sp_trn_selpurinv_dbcrnote('$Invno','$ledcode','$finid','$compcode','C')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getCottonTrailere() {
   $invseqno=$_POST['invseqno'];
    $finid=$_POST['finid'];
    $millname=$_POST['millname'];
    $r = mysql_query("call acc_sp_trn_selcottonpurinvtrailer('$invseqno','$millname','$finid')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getDbcrnote1() {
   $Invno=$_POST['Invno'];
   $ledcode=$_POST['ledcode'];
   $finid=$_POST['finid'];
   $compcode=$_POST['compcode'];
    $r = mysql_query("call acc_sp_trn_selpurinv_dbcrnote('$Invno','$ledcode','$finid','$compcode','Y')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getYarnPurchaseTrail() {
    $invno=$_POST['invno'];
    $ledcode=$_POST['ledcode'];
    $finid=$_POST['finid'];
    $r = mysql_query("call acc_sp_trn_selyarnpurinvtrailer_new('$invno','$ledcode','$finid')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getTerryPurchase() {
    $invno=$_POST['invno'];
    $r = mysql_query("select * from dfd.hometexpurinvheader
        where  purinvseqno = '$invno'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getFibrePurchase() {
    $invno=$_POST['invno'];
    $r = mysql_query("call acc_sp_trn_selfibrepurinvheader('$invno')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getYarnPurchase() {
    $invno=$_POST['invno'];
    $ledcode=$_POST['ledcode'];
    $finid=$_POST['finid'];
    $r = mysql_query("call acc_sp_trn_selyarnpurinvheader_new('$invno','$ledcode','$finid')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getDbcrnote() {
   $Invno=$_POST['Invno'];
   $ledcode=$_POST['ledcode'];
   $finid=$_POST['finid'];
   $compcode=$_POST['compcode'];
   $flag=$_POST['flag'];
   if($flag=="S"){
    $r = mysql_query("call acc_sp_trn_selpurinv_dbcrnote('$Invno','$ledcode','$finid','$compcode','S')");
   } else{
    $r = mysql_query("call acc_sp_trn_selpurinv_dbcrnote('$Invno','$ledcode','$finid','$compcode','$flag')");
   }
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getMaxdate2() {
    $minno=$_POST['minno'];
    $r = mysql_query("select max(repmin_date) As max_mindate From stores_repairmin_header where repmin_seqno in('$minno')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getMaxdate() {
    $minno=$_POST['minno'];
    $r = mysql_query("select max(min_date) As max_mindate From stores_min_header where  min_seqno in ('$minno')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getMinlen2() {
    $minno=$_POST['minno'];
    $r = mysql_query("select repmin_freight_acctflag as min_freight_acctflag,sum(repmin_tngstval) as tngst,
                  sum(repmin_cstval) as cst,sum(repmin_excisedutyval) as exciseduty,sum(repmin_freightval) as freight,
                  sum(repmin_othercharges1) as other1,sum(repmin_othercharges2) as other2,sum(repmin_discountval) As discount,0 As AddExduty_val
                  From stores_repairmin_header where repmin_seqno in (  Trim('$minno')  ) group by repmin_freight_acctflag");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getMinlen() {
    $minno=$_POST['minno'];
   $flag=$_POST['flag'];
    if($flag=="S"){
    $r = mysql_query("select min_freight_acctflag,sum(min_tngstval) as tngst,sum(min_cstval) as cst,
               sum(min_excisedutyval) as exciseduty,sum(min_freightval) as freight,sum(min_othercharges1) as other1,
               sum(min_othercharges2) as other2,sum(min_discountval) As discount,sum(min_addexciseduty_val) As AddExduty_val ,sum(min_clearing) as min_clearing, sum(min_licence) as min_licence From stores_min_header
               where  FIND_IN_SET(min_seqno,'$minno') group by min_freight_acctflag");
    }
    else if($flag=="F"){
    $r = mysql_query("select min_freight_acctflag,sum(min_sstval) as sstval,sum(min_scval) as scval,
                sum(min_excisedutyval) as exciseduty,sum(min_freightval) as freight,sum(min_charity) as charity,
                sum(min_handpack) as handpack,sum(min_forward) as forwardcharg,sum(min_aed) as aedval,sum(min_bed) as bedval,
                sum(min_educess) as educess,sum(min_insurance) as insurance,sum(min_othercharges1) as other1,sum(min_vatval) vatval,
                sum(min_othercharges2) as other2,sum(min_discountval) As discount,sum(min_cess) as cess,min_discount_reason  From dfd.fab_min_header
                where  FIND_IN_SET(min_seqno,'$minno') group by min_freight_acctflag,min_discount_reason");
    }else if($flag=="B"){
    $r = mysql_query("select min_freight_acctflag,sum(min_tngstval) as tngst,sum(min_cstval) as cst,
           sum(min_excisedutyval) as exciseduty,sum(min_freightval) as freight,sum(min_othercharges1) as other1,
           sum(min_othercharges2) as other2,sum(min_discountval) As discount,sum(min_addexciseduty_val) As AddExduty_val  From stores_min_header
           where  FIND_IN_SET(min_seqno,'$minno') group by min_freight_acctflag");
    }
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getPurchaseparty() {
    $compcode=$_POST['compcode'];
    $acctrailledcode=$_POST['acctrailledcode'];
    $prefix=$_POST['prefix'];
        if($prefix=='S'){
    $r = mysql_query("call acc_sp_trn_selpurchasepartyvendorcode('S','$acctrailledcode','$compcode')");
    }
     if($prefix=='Y'){
     $r = mysql_query("call acc_sp_trn_selpurchasepartyvendorcode('Y','$acctrailledcode','$compcode')");
    }
    if($prefix=='CT'){
    $r = mysql_query("call acc_sp_trn_selpurchasepartyvendorcode('C','$acctrailledcode','$compcode')");
    }
    if($prefix=='F'){
    $r = mysql_query("call acc_sp_trn_selpurchasepartyvendorcode('F','$acctrailledcode','$compcode')");
    }
      if($prefix=='M'){
    $r = mysql_query("call acc_sp_trn_selpurchasepartyvendorcode('S','$acctrailledcode','$compcode')");
    }
     if($prefix=='Z'){
    $r = mysql_query("call acc_sp_trn_selpurchasepartyvendorcode('Z','$acctrailledcode','$compcode')");
    }
        if($prefix=='T'){
    $r = mysql_query("call acc_sp_trn_selpurchasepartyvendorcode('T','$acctrailledcode','$compcode')");
    }
      if($prefix=='K'){
    $r = mysql_query("call acc_sp_trn_selpurchasepartyvendorcode('K','$acctrailledcode','$compcode')");
    }
      if($prefix=='D'){
     $r = mysql_query("call acc_sp_trn_selpurchasepartyvendorcode('D','$acctrailledcode','$compcode')");
    }
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getVocherDetailsTrail() {
    $accrefseqno=$_POST['accrefseqno'];
    $r = mysql_query("call acc_sp_trn_selacc_trail('$accrefseqno')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getSeqnoRef() {
     mysql_query("SET NAMES utf8");
    $cinvseqno=$_POST['cinvseqno'];
    $r = mysql_query("call acc_sp_trn_selacc_tran_seq_no('$cinvseqno')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getPurchseSeqno() {
    $gincompany=$_POST['gincompany'];
    $fin_id=$_POST['ginfinid'];
    $r = mysql_query("select ifnull(max(accref_seqno),0)+1 as accref_seqno from acc_ref
        where  accref_comp_code ='$gincompany' and accref_finid = '$fin_id'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getVocherDetails() {
    $accrefseqno=$_POST['accrefseqno'];
    $r = mysql_query("call acc_sp_trn_selacc_ref('$accrefseqno')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getBankDetails2() {
     mysql_query("SET NAMES utf8");
    $cinvseqno=$_POST['cinvseqno'];
    $type=$_POST['type'];
    if($type=="K"){
    $r = mysql_query("call expo_sp_trn_selbank_details('$cinvseqno','1')");
    }else if($type=="F"){
    $r = mysql_query("call expo_sp_trn_selFabbank_details('$cinvseqno','4')");
    }else if($type=="M"){
    $r = mysql_query("call expo_sp_trn_selHomeTexbank_details('$cinvseqno','4')");
    }
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getBankDetails() {
    mysql_query("SET NAMES utf8");
    $cinvseqno=$_POST['cinvseqno'];
    $gincompany=$_POST['gincompany'];
    $type=$_POST['type'];
    if($type=="K"){
    $r = mysql_query("call expo_sp_trn_SelBankDetails('$cinvseqno','1')");
    }else if($type=="F"){
    $r = mysql_query("call expo_sp_trn_SelFabBankDetails('$cinvseqno','4')");
    }else if($type=="M"){
    $r = mysql_query("call expo_sp_trn_SelHomeTexBankDetails('$cinvseqno','4')");
    }
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getInvDate() {
     mysql_query("SET NAMES utf8");
    $cinvseqno=$_POST['cinvseqno'];
    $date=$_POST['date'];
    $type=$_POST['type'];
    $r = mysql_query("call acc_sp_trn_selacc_trail_invno_date('$cinvseqno','$date')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getInvoicechk() {
    $Type=$_POST['Type'];
    $bankcinv_seqno=$_POST['bankcinv_seqno'];
    $compcode=$_POST['gincompany'];
   if($Type=="K"){
    if($compcode=="1"){
    $r = mysql_query("select
		*
	from
		expo_bank_details
	where
		bank_cinv_seqno='$bankcinv_seqno'");
    }
   }
     if($Type=="F"){
    if($compcode=="4"){
     $r = mysql_query("select
		*
	from
		dfd.expofabbankdetails
	where
		BankCinvSeqno = '$bankcinv_seqno'");
    }
    }
       if($Type=="A"){
    if($compcode=="4"){
     $r = mysql_query("	select
		*
	from
		dfd.expohometexbankdetails
	where
		BankCinvSeqno = '$bankcinv_seqno'");
    }
    }
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getCurrentBal() {
    $led_code=$_POST['led_code'];
    $fin_id=$_POST['ginfinid'];
    $r = mysql_query("select 	* from 	acc_current_balance
	where 	curbal_led_code = '$led_code' and
		curbal_finid 		= '$fin_id'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getLedgerDetail() {
    $ledgercode=$_POST['ledgercode'];
    $compcode=$_POST['gincompany'];
    $r = mysql_query("select * from kgdl.acc_ledger_master
	where 	led_code 	= '$ledgercode' and
		led_comp_code 	= '$compcode' and led_status='Y'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getAdjustDetails2() {
    $inv=$_POST['inv'];
    $date=$_POST['date'];
    $type=$_POST['type'];
if($type=="K"){
    $r = mysql_query("call expo_sp_trn_selcinv_header_invno_date('$inv','$date','1')");
}
else if($type=="F"){
    $r = mysql_query("call expo_sp_trn_selfabcinv_header_invno_date('$inv','$date','4')");
}
else if($type=="M"){
    $r = mysql_query("call expo_sp_trn_selHomeTexcinv_header_invno_date('$inv','$date','4')");
}
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getAdjustDetails() {
    $ledcode=$_POST['ledcode'];
    $type=$_POST['type'];
    $seqno=$_POST['seqno'];
     $compcode=$_POST['compcode'];	
if($compcode==1  && $type=='K'){
    $r = mysql_query("select accref_seqno, accref_vouno, acctrail_inv_no, acctrail_inv_date, acctran_cur_amt, cinv_seqno, cinv_efc, cinv_no
from
    acc_ref a_ref,
    acc_tran a_tran,
    acc_trail a_trail,
    acc_ledger_master a_led,
	expo_cinv_header cinv
where
    a_ref.accref_vou_type in ('SE')
        and a_ref.accref_seqno = a_tran.acctran_accref_seqno
        and a_ref.accref_seqno = a_trail.acctrail_accref_seqno
        and a_tran.acctran_accref_seqno = a_trail.acctrail_accref_seqno
        and a_ref.accref_seqno = cinv.cinv_accref_seqno
        and a_tran.acctran_led_code = a_trail.acctrail_led_code
        and a_tran.acctran_led_code = a_led.led_code
        and a_ref.accref_comp_code = a_led.led_comp_code
        and a_tran.acctran_dbamt > 0
        and (a_ref.accref_vou_type <> ('BD')
        or a_ref.accref_vou_type is null)
        and a_trail.acctrail_adj_value <= 0
        and a_tran.acctran_led_code = '$ledcode'
        and a_ref.accref_comp_code = '1'
        and a_trail.acctrail_accref_seqno in ('$seqno')");
}
else if($compcode==1 && $type=='F')
{
$r = mysql_query("select 
    accref_seqno,
    accref_vouno,
    acctrail_inv_no,
    acctrail_inv_date,
    acctran_cur_amt,
    CinvSeqno as cinv_seqno,
    CinvEfc as cinv_efc,
    CinvNo as cinv_no
from
    kgdl.acc_ref a_ref,
    kgdl.acc_tran a_tran,
    kgdl.acc_trail a_trail,
    kgdl.acc_ledger_master a_led,
    dfd.expofabcinvheader cinv
where
    a_ref.accref_vou_type in ('SB') and a_ref.accref_seqno = a_tran.acctran_accref_seqno and a_ref.accref_seqno = a_trail.acctrail_accref_seqno and a_tran.acctran_accref_seqno = a_trail.acctrail_accref_seqno and a_ref.accref_seqno = cinv.CinvAccrefSeqno and a_tran.acctran_led_code = a_trail.acctrail_led_code and a_tran.acctran_led_code = a_led.led_code and a_ref.accref_comp_code = a_led.led_comp_code and a_tran.acctran_dbamt > 0 and (a_ref.accref_vou_type <> ('BD') or a_ref.accref_vou_type is null) and a_trail.acctrail_adj_value <= 0 and a_tran.acctran_led_code = '$ledcode' and a_ref.accref_comp_code = '1' and a_trail.acctrail_accref_seqno in ('$seqno')");
}


else if($compcode==4){
    if($type=='F'){	
    $r = mysql_query("select 
    accref_seqno,
    accref_vouno,
    acctrail_inv_no,
    acctrail_inv_date,
    acctran_cur_amt,
    CinvSeqno as cinv_seqno,
    CinvEfc as cinv_efc,
    CinvNo as cinv_no
from
    kgdl.acc_ref a_ref,
    kgdl.acc_tran a_tran,
    kgdl.acc_trail a_trail,
    kgdl.acc_ledger_master a_led,
    dfd.expofabcinvheader cinv
where
    a_ref.accref_vou_type in ('SB') and a_ref.accref_seqno = a_tran.acctran_accref_seqno and a_ref.accref_seqno = a_trail.acctrail_accref_seqno and a_tran.acctran_accref_seqno = a_trail.acctrail_accref_seqno and a_ref.accref_seqno = cinv.CinvAccrefSeqno and a_tran.acctran_led_code = a_trail.acctrail_led_code and a_tran.acctran_led_code = a_led.led_code and a_ref.accref_comp_code = a_led.led_comp_code and a_tran.acctran_dbamt > 0 and (a_ref.accref_vou_type <> ('BD') or a_ref.accref_vou_type is null) and a_trail.acctrail_adj_value <= 0 and a_tran.acctran_led_code = '$ledcode' and a_ref.accref_comp_code = '4' and a_trail.acctrail_accref_seqno in ('$seqno')");
  }else if($type=='M'){	
    $r = mysql_query("select 
    accref_seqno,
    accref_vouno,
    acctrail_inv_no,
    acctrail_inv_date,
    acctran_cur_amt,
    CinvSeqno as cinv_seqno,
    CinvEfc as cinv_efc,
    CinvNo as cinv_no
from
    kgdl.acc_ref a_ref,
    kgdl.acc_tran a_tran,
    kgdl.acc_trail a_trail,
    kgdl.acc_ledger_master a_led,
    hometexdfd.expohometexcinvheader cinv
where
    a_ref.accref_vou_type in ('SB') and a_ref.accref_seqno = a_tran.acctran_accref_seqno and a_ref.accref_seqno = a_trail.acctrail_accref_seqno and a_tran.acctran_accref_seqno = a_trail.acctrail_accref_seqno and a_ref.accref_seqno = cinv.CinvAccrefSeqno and a_tran.acctran_led_code = a_trail.acctrail_led_code and a_tran.acctran_led_code = a_led.led_code and a_ref.accref_comp_code = a_led.led_comp_code and a_tran.acctran_dbamt > 0 and (a_ref.accref_vou_type <> ('BD') or a_ref.accref_vou_type is null) and a_trail.acctrail_adj_value <= 0 and a_tran.acctran_led_code = '$ledcode' and a_ref.accref_comp_code = '4' and a_trail.acctrail_accref_seqno in ('$seqno')");
  }
}
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}


function getExportBillDetails() {
    $acctranled_code=$_POST['acctranled_code'];
    $accrefcomp_code=$_POST['compcode'];
if($accrefcomp_code==1){
    $r = mysql_query("select
			a_trail.acctrail_accref_seqno,
			a_trail.acctrail_inv_no
		from 	acc_ref a_ref,
			acc_tran a_tran,
			acc_trail a_trail,
			kgdl.acc_ledger_master a_led
		where 	a_ref.accref_vou_type in ('SE','SB') and
			a_ref.accref_seqno		= 	a_tran.acctran_accref_seqno and
			a_ref.accref_seqno		=	a_trail.acctrail_accref_seqno and
			a_tran.acctran_accref_seqno	=	a_trail.acctrail_accref_seqno and
			a_tran.acctran_led_code		=	a_trail.acctrail_led_code and
			a_tran.acctran_led_code		=	a_led.led_code and
			a_ref.accref_comp_code		=	a_led.led_comp_code and
			a_ref.accref_bank_name		<>	'CANCEL' and
			a_tran.acctran_dbamt 		>0	and
			a_tran.acctran_paytype 		not in ('BD','BR') and
			a_trail.acctrail_adj_value 	<=0 	and
			a_tran.acctran_led_code		=	'$acctranled_code' and
			a_ref.accref_comp_code		=	'$accrefcomp_code' and
			a_trail.acctrail_led_code	=	'$acctranled_code';");
}else if($accrefcomp_code==4){
    $r = mysql_query("select
			a_trail.acctrail_accref_seqno,
			a_trail.acctrail_inv_no
		from 	acc_ref a_ref,
			acc_tran a_tran,
			acc_trail a_trail,
			kgdl.acc_ledger_master a_led
		where 	a_ref.accref_vou_type in ('SB') and
			a_ref.accref_seqno		= 	a_tran.acctran_accref_seqno and
			a_ref.accref_seqno		=	a_trail.acctrail_accref_seqno and
			a_tran.acctran_accref_seqno	=	a_trail.acctrail_accref_seqno and
			a_tran.acctran_led_code		=	a_trail.acctrail_led_code and
			a_tran.acctran_led_code		=	a_led.led_code and
			a_ref.accref_comp_code		=	a_led.led_comp_code and
			a_ref.accref_bank_name		<>	'CANCEL' and
			a_tran.acctran_dbamt 		>0	and
			a_tran.acctran_paytype 		not in ('BD','BR') and
			a_trail.acctrail_adj_value 	<=0 	and
			a_tran.acctran_led_code		=	'$acctranled_code' and
			a_ref.accref_comp_code		=	'$accrefcomp_code' and
       			a_trail.acctrail_led_code	=	'$acctranled_code';");
}
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}


function getAccbankDetails() {
    $bank_discnt_vouno=$_POST['bank_discnt_vouno'];
    $comp_code=$_POST['gincompany'];
    $r = mysql_query("call expo_sp_trn_bankdetails_dis_vouno('$bank_discnt_vouno','$comp_code')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}


function getAccDetails() {
    $accrefseqno=$_POST['accrefseqno'];
    $accledcode=$_POST['accledcode'];
    $accrefcomp_code=$_POST['gincompany'];
    $accreffinid=$_POST['ginfinid'];
    $r = mysql_query("call acc_sp_trn_selacc_tran_vou_no('$accledcode','$accrefcomp_code','$accreffinid','N','BP','$accrefseqno')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getHeadAccount() {
    $comp_code=$_POST['gincompany'];
    $r = mysql_query("select
    led_code, led_name
from
    acc_ledger_master
where
    led_comp_code = '$comp_code'
        and led_grp_code in (20,21,22,23,24,25,90,91,92,93,94,95,96,102,182) and led_status='Y'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getFindsubgroup() {
    $compcode=$_POST['gincompany'];
    $r = mysql_query("select grp_code,grp_name from acc_group_master where
                                grp_parent_code in (20,90)
                                      and grp_comp_code = '$compcode'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}


function getVocNo() {
    $acctranled_code=$_POST['acctranled_code'];
    $compcode=$_POST['gincompany'];
    $finid=$_POST['ginfinid'];
    $r = mysql_query("call acc_sp_trn_selacc_tran_vou_no('$acctranled_code','$compcode','$finid','Y','A','0')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getAccountPartyName() {
mysql_query("SET NAMES utf8"); 
    $compcode=$_POST['gincompany'];
    $r = mysql_query("select
                            led_code, led_name
                        from
                            acc_ledger_master
                        where
                            led_comp_code = '$compcode'
                                and led_grp_code not in (43,168,169,170,171,172,204)
                                and led_status = 'Y'
                                and led_duplicate = 'N'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getDbcrvalue() {
    $invno=$_POST['invno'];
    $ledcode=$_POST['ledcode'];
    $finid=$_POST['ginfinid'];
    $compcode=$_POST['gincompany'];
    $prefix=$_POST['prefix'];
    $r = mysql_query("select
    dbcr_no, dbcr_type, dbcr_value as dbcr_value,a.dbcr_seqno
from
    acc_dbcrnote_header a,
    acc_dbcrnote_trailer b
where
    b.dbcr_inv_no = '$invno'
        and a.dbcr_seqno = b.dbcr_seqno
        and a.dbcr_inv_ledcode = '$ledcode'
        and a.dbcr_finid = '$finid'
        and a.dbcr_comp_code = '$compcode'");
    
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getStoreDetailsMinTrail() {
    $minseqno=$_POST['minseqno'];
    $flag=$_POST['flag'];
    if($flag=="S"){
    $r = mysql_query("call stores_sp_trn_selmintrailerdetails('$minseqno','MIN')");
    }else  if($flag=="F"){
    $r = mysql_query("call fabric_sp_trn_selmintrailerdetails('$minseqno','MIN')");
    }else if($flag=="B"){
    $r = mysql_query("call stores_sp_trn_selmintrailerdetails('$minseqno','MIN')");
    }
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getStoreDetailsMinTrail123() {
    $minseqno=$_POST['minseqno'];
    $flag=$_POST['flag'];
    if($flag=="S"){
    $r = mysql_query("call stores_sp_trn_selmintrailerdetailsnew('$minseqno','MIN')");
    }else  if($flag=="F"){
    $r = mysql_query("call fabric_sp_trn_selmintrailerdetails('$minseqno','MIN')");
    }else if($flag=="B"){
    $r = mysql_query("call stores_sp_trn_selmintrailerdetails('$minseqno','MIN')");
    }
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getStoreDetailsMinTrailr() {
    $minseqno=$_POST['minseqno'];
    $r = mysql_query("select
			t.*
		from
			kgdl.stores_womin_trailer t
		where t.Womin_seqno	=	'$minseqno'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getStorePurchaseDetails() {
    $minseqno=$_POST['minseqno'];
    $flag=$_POST['flag'];
    if($flag=="S"){
    $r = mysql_query("call stores_sp_trn_selminheaderdetails('$minseqno','MIN')");
    }else  if($flag=="F"){
    $r = mysql_query("select
		h.*,
		fab_supname
	from 	dfd.fab_min_header h,
		dfd.fab_supplier_master v
	where 	min_seqno	=	'$minseqno' and
		min_vendor_code = 	fab_sup_code");
    }else if($flag=="B"){
    $r = mysql_query("call stores_sp_trn_selminheaderdetails('$minseqno','MIN')");
    }
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getStorePurchaseDetailsr() {
    $minseqno=$_POST['minseqno'];
    $r = mysql_query("select
			h.*,
			vendor_name
		from 	kgdl.stores_repairmin_header h,
			kgdl.stores_vendor_master v
		where 	repmin_seqno	=	'$minseqno' and
			repmin_vendor_code 	= 	vendor_code;");

    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getStorePurchaseMin() {
    $invseqno=$_POST['invseqno'];
    $flag=$_POST['flag'];
    if($flag=="S"){
    $r = mysql_query("CALL acc_sp_trn_selpurinvminseqno('$invseqno')");
    }else if($flag=="F"){
        $r = mysql_query("CALL acc_sp_trn_selpurinvminseqno_fabric('$invseqno')");
    }else if($flag=="B"){
       $r = mysql_query("CALL acc_sp_trn_selpurinvminseqno('$invseqno')");
    }
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getStorePurchase() {
    $invseqno=$_POST['invseqno'];
    $flag=$_POST['flag'];
    $finid=$_POST['finid'];
    $ledcode=$_POST['ledcode'];
    $millname=$_POST['millname'];
    if($flag=="S"){
    $r = mysql_query("call acc_sp_trn_selstorespurinvheader('$invseqno')");
    }else if($flag=="CT"){
        $r = mysql_query("call acc_sp_trn_selcottonpurinvheader('$invseqno','$ledcode','$finid','$millname')");
    }else if($flag=="F"){
        $r = mysql_query("call acc_sp_trn_selfabricpurinvheader('$invseqno')");
    }else if($flag=="B"){
        $r = mysql_query("call acc_sp_trn_selfabricpurinvheader('$invseqno')");
    }
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getSuppname() {
    $ledgercode=$_POST['ledgercode'];
    $compcode=$_POST['gincompany'];
    $r = mysql_query("select * from kgdl.acc_ledger_master
	where 	led_code 	= '$ledgercode' and 
		led_comp_code 	= '$compcode' and led_status='Y'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}


function getGroup() {
    $comp_code=$_POST['compcode'];
    mysql_query("SET NAMES utf8");
     $r = mysql_query("select
    led_code, led_name
from
    acc_ledger_master where led_comp_code='$comp_code' and led_grp_code in (
8,84,85,86,87,88,89,104,105,106,107,108,109,110,111,112,113,114,115,117,118,119,120,121,122,144,145,146,
154,157,160,163,164,165,166,173,174,175,188,192,195,196,197,198,200,202,203,205,206,207,218,237,30) and led_status='Y'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getpartyledger() {
    mysql_query("SET NAMES utf8");  
    $compcode=$_POST['gincompany'];
    $prefix=$_POST['prefix'];
    $vendorcode=$_POST['vendorcode'];
    if($prefix=='S'){
    $r = mysql_query("CALL acc_sp_trn_selpurchasepartyledcode('S','$vendorcode','$compcode')");
    }if($prefix=='A'){
    $r = mysql_query("CALL acc_sp_trn_selpurchasepartyledcode('S','$vendorcode','$compcode')");
    }
     if($prefix=='Y'){
    $r = mysql_query("CALL acc_sp_trn_selpurchasepartyledcode('Y','$vendorcode','$compcode')");
    }
     if($prefix=='IY'){
    $r = mysql_query("CALL acc_sp_trn_selpurchasepartyledcode('Y','$vendorcode','$compcode')");
    }
    if($prefix=='CT'){
     $r = mysql_query("CALL acc_sp_trn_selpurchasepartyledcode('C','$vendorcode','$compcode')");
    }
    if($prefix=='F'){
    $r = mysql_query("CALL acc_sp_trn_selpurchasepartyledcode('F','$vendorcode','$compcode')");
    }
      if($prefix=='B'){
    $r = mysql_query("CALL acc_sp_trn_selpurchasepartyledcode('B','$vendorcode','$compcode')");
    }
      if($prefix=='M'){
    $r = mysql_query("CALL acc_sp_trn_selpurchasepartyledcode('M','$vendorcode','$compcode')");
    }
    if($prefix=='IM'){
    $r = mysql_query("CALL acc_sp_trn_selpurchasepartyledcode('M','$vendorcode','$compcode')");
    }
      if($prefix=='W'){
     $r = mysql_query("CALL acc_sp_trn_selpurchasepartyledcode('W','$vendorcode','$compcode')");
    }
     if($prefix=='Z'){
     $r = mysql_query("CALL acc_sp_trn_selpurchasepartyledcode('X','$vendorcode','$compcode')");
    }
        if($prefix=='T'){
    $r = mysql_query("CALL acc_sp_trn_selpurchasepartyledcode('T','$vendorcode','$compcode')");
    }
      if($prefix=='K'){
    $r = mysql_query("CALL acc_sp_trn_selpurchasepartyledcode('K','$vendorcode','$compcode')");
    }
      if($prefix=='D'){
     $r = mysql_query("CALL acc_sp_trn_selpurchasepartyledcode('D','$vendorcode','$compcode')");
    }
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getInvoiceNo() {
    $companycode=$_POST['companycode'];
    $finid=$_POST['finid'];
    $finyear=$_POST['finyear'];	
    $prefix=$_POST['prefix'];
    $prefix1=$_POST['prefix1'];
    $vendorcode=$_POST['vendorcode'];
    $millname=$_POST['millname'];
    $month=$_POST['month'];
    if($prefix=='S'){
    $r = mysql_query("call acc_sp_trn_selpartypurchaseinvoice('S','$vendorcode','$finid','$companycode')");
    }else
     if($prefix=='A'){
    $r = mysql_query(" call acc_sp_trn_selpartypurchaseinvoice('A','$vendorcode','$finid','$companycode')");
    }else
    if($prefix=='Y'){
    $r = mysql_query("call acc_sp_trn_selpartypurchaseinvoice('N','$vendorcode','$finid','$companycode')");
    }else
    if($prefix=='IY'){
    $r = mysql_query("call acc_sp_trn_selpartypurchaseinvoice('N','$vendorcode','$finid','$companycode')");
    }else
    if($prefix=='CT'){
    $r = mysql_query("call acc_sp_trn_selcottonpartypurinvoice('$vendorcode','$millname','$month','$finyear')");
    }else
      if($prefix=='F'){
    $r = mysql_query("call acc_sp_trn_selpartypurchaseinvoice('F','$vendorcode','$finid','$companycode')");
    }else
      if($prefix=='B'){
    $r = mysql_query("call acc_sp_trn_selpartypurchaseinvoice('B','$vendorcode','$finid','$companycode')");
    }else
      if($prefix=='M'){
    $r = mysql_query("call acc_sp_trn_selpartypurchaseinvoice('M','$vendorcode','$finid','$companycode')");
    }else
      if($prefix=='IM'){
    $r = mysql_query("call acc_sp_trn_selpartypurchaseinvoice('M','$vendorcode','$finid','$companycode')");
    }else
      if($prefix=='W'){
    $r = mysql_query("call acc_sp_trn_selpartypurchaseinvoice('W','$vendorcode','$finid','$companycode') ");
    }else
     if($prefix=='Z'){
    $r = mysql_query("call acc_sp_trn_selpartypurchaseinvoice('Z','$vendorcode','$finid','$companycode')");
    }else
       if($prefix1=='X'){
    $r = mysql_query("call acc_sp_trn_selpartypurchaseinvoice('X','$vendorcode','$finid','$companycode')");
    }else
        if($prefix=='T'){
    $r = mysql_query("call acc_sp_trn_selpartypurchaseinvoice('T','$vendorcode','$finid','4')");
    }else
      if($prefix=='K'){
    $r = mysql_query("call acc_sp_trn_selpartypurchaseinvoice('K','$vendorcode','$finid','$companycode')");
    }else
      if($prefix=='D'){
    $r = mysql_query("call acc_sp_trn_selpartypurchaseinvoice('D','$vendorcode','$finid','$companycode')");
    }
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getVendorNameMill() {
    $r = mysql_query("select g_parid as vendor_code,par_name as vendor_name from party_master");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getMonth() {
    $r = mysql_query("call general_sp_mas_selmonth()");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getPurchaseNo() {
    $compcode=$_POST['gincompany'];
    $Finyear=$_POST['ginfinid'];
    $prefix=$_POST['prefix'];
    if($prefix=='S'||$prefix=='A'){
    $r = mysql_query("select concat('PS',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
        where  accref_comp_code ='$compcode' and accref_finid = '$Finyear' and accref_vouno like 'PS%'");
    }
      if($prefix=='Y'){
  $r = mysql_query("select concat('PY',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
        where  accref_comp_code ='$compcode' and accref_finid = '$Finyear' and accref_vouno like 'PY%'");
    }
     if($prefix=='IY'){
  $r = mysql_query("select concat('PY',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
        where  accref_comp_code ='$compcode' and accref_finid = '$Finyear' and accref_vouno like 'PY%'");
    }
     if($prefix=='CT'){
  $r = mysql_query("select concat('PC',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
        where  accref_comp_code ='$compcode' and accref_finid = '$Finyear' and accref_vouno like 'PC%'");
    }
      if($prefix=='F'){
 $r = mysql_query("select concat('PF',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
        where  accref_comp_code ='4' and accref_finid = '$Finyear' and accref_vouno like 'PF%'");
    }
      if($prefix=='B'){
   $r = mysql_query("select concat('PB',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
        where  accref_comp_code ='$compcode' and accref_finid = '$Finyear' and accref_vouno like 'PB%'");
    }
      if($prefix=='M'){
   $r = mysql_query("select concat('PM',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
        where  accref_comp_code ='$compcode' and accref_finid = '$Finyear' and accref_vouno like 'PM%'");
    }
     if($prefix=='IM'){
   $r = mysql_query("select concat('EC',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
        where  accref_comp_code ='$compcode' and accref_finid = '$Finyear' and accref_vouno like 'EC%'");
    }
       if($prefix=='W'){
  $r = mysql_query("select concat('ES',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
        where  accref_comp_code ='$compcode' and accref_finid = '$Finyear' and accref_vouno like 'ES%'");
    }
       if($prefix=='T'){
  $r = mysql_query("select concat('PT',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
        where  accref_comp_code ='$compcode' and accref_finid = '$Finyear' and accref_vouno like 'PT%'");
    }
      if($prefix=='C'){
  $r = mysql_query("select concat('CY',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
        where  accref_comp_code ='$compcode' and accref_finid = '$Finyear' and accref_vouno like 'CY%'");
    }
     if($prefix=='D'){
   $r = mysql_query("select concat('TG',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
        where  accref_comp_code ='$compcode' and accref_finid = '$Finyear' and accref_vouno like 'TG%'");
    }if($prefix=='K'){
   $r = mysql_query("select concat('PK',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
        where  accref_comp_code ='$compcode' and accref_finid = '$Finyear' and accref_vouno like 'PK%'");
    }
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getVendorName() {
    $comp_code=$_POST['gincompany'];
    $prefix=$_POST['prefix'];
    mysql_query("SET NAMES utf8");
    if($prefix=='S'){
    $r = mysql_query("call acc_sp_trn_selpurchasepartymaster('S','$comp_code')");
    }else if($prefix=='Y'){
    $r = mysql_query("call acc_sp_trn_selpurchasepartymaster('Y','$comp_code')");
    }else if($prefix=='IY'){
    $r = mysql_query("call acc_sp_trn_selpurchasepartymaster('Y','$comp_code')");
    }else if($prefix=='A'){
    $r = mysql_query("call acc_sp_trn_selpurchasepartymaster('S','4')");
    }else if($prefix=='CT'){
    $r = mysql_query("call acc_sp_trn_selpurchasepartymaster_cotton('$comp_code')");
    }else if($prefix=='F'){
    $r = mysql_query("call acc_sp_trn_selpurchasepartymaster('F','$comp_code')");
    }else if($prefix=='B'){
    $r = mysql_query("call acc_sp_trn_selpurchasepartymaster('B','$comp_code')");
    }else if($prefix=='M'){
    $r = mysql_query("call acc_sp_trn_selpurchasepartymaster('M','$comp_code')");
    }else if($prefix=='IM'){
    $r = mysql_query("call acc_sp_trn_selpurchasepartymaster('M','$comp_code')");
    }else if($prefix=='W'){
    $r = mysql_query("call acc_sp_trn_selpurchasepartymaster('S','$comp_code')");
    }else if($prefix=='T'){
    $r = mysql_query("call acc_sp_trn_selpurchasepartymaster('T','4')");
    } else  if($prefix=='K'){
    $r = mysql_query("call acc_sp_trn_selpurchasepartymaster('K','$comp_code')");
    }else if($prefix=='C'){
    $r = mysql_query("call acc_sp_trn_selpurchasepartymaster('C','$comp_code')");
    }else if($prefix=='D'){
    $r = mysql_query("call acc_sp_trn_selpurchasepartymaster('D','$comp_code')");
    }else if($prefix=='PP'){
    $r = mysql_query("call acc_sp_trn_selpurchasepartymaster('S','$comp_code')");
    }
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getMillName() {
    $r = mysql_query("CALL acc_sp_mas_selcotonmillmaster()");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getReason() {
    $r = mysql_query("call acc_sp_mas_selreason()");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getPartyname() {
    mysql_query("SET NAMES utf8"); 
    $compcode=$_POST['gincompany'];
    $finyear=$_POST['ginfinid'];
    $bill=$_POST['bill'];
/*
    if($bill==true){
    $r = mysql_query("select * from acc_ledger_master
	where 	led_comp_code = '1' and
		led_status='Y' and
		led_duplicate = 'N'");
    }else{
          if($bill==false){
      $r = mysql_query("call acc_sp_mas_selledgergrpdetails('$compcode','$finyear')");
          }
    }

*/



    if($bill==true){
    $r = mysql_query("select led_code, led_name from acc_ledger_master where led_type <> 'G' order by led_name");
    }else{
          if($bill==false){
      $r = mysql_query("select led_code, led_name from acc_ledger_master order by led_name");
          }
    }




    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}


function getAddress() {
    $ledcode=$_POST['ledcode'];
    $r = mysql_query("select
		led_name,
		led_addr1,
		concat(led_addr2,
		led_city) as led_addr2
	from
		acc_ledger_master
	where
		led_code	=	'$ledcode'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getInvNo() {
    $finyear=$_POST['ginfinid'];
    $compcode=$_POST['gincompany'];
    $ledgername=$_POST['ledgername'];
    $r = mysql_query("CALL acc_sp_trn_selinvoiceno('$ledgername','$compcode','$finyear');");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getCurrency() {
    $r = mysql_query("call general_sp_mas_selcurrencymaster()");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getInvDetails2() {
    $finyear=$_POST['finid'];
    $invoiceno=$_POST['invoiceno'];
    $ledgercode=$_POST['ledgercode'];
    $compcode=$_POST['compcode'];
    $r = mysql_query("select    
  acctrail_accref_seqno,  
  acctrail_inv_no,  
  accref_vou_type,  
  acctrail_inv_date,  
  acctrail_inv_value-acctrail_adj_value as acctrail_inv_value,  
  acctrail_adj_value   
 from  acc_trail,  
  acc_tran,  
  acc_ref  
 where  acc_ref.accref_seqno   =  acc_tran.acctran_accref_seqno and  
  acc_tran.acctran_accref_seqno  =  acc_trail.acctrail_accref_seqno and   
  acc_tran.acctran_led_code = acc_trail.acctrail_led_code and  
  acc_trail.acctrail_accref_seqno =  acc_ref.accref_seqno and   
  acc_ref.accref_comp_code  =  '$compcode' and  
  acc_ref.accref_finid   =  '$finyear' and  
  acc_ref.accref_vou_type in ('PU','EX','ES','EC') and  
  acc_tran.acctran_led_code  = '$ledgercode'  and  
  acc_trail.acctrail_accref_seqno =   '$invoiceno'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getInvDetails() {
    $Finid=$_POST['ginfinid'];
    $CinvSeqno=$_POST['CinvSeqno'];
    $CompCode=$_POST['gincompany'];
    if($CompCode==1){
    $r = mysql_query("select cinv_seqno, cinv_no, cinv_date, commdet_agent_code, commdet_cinv_seqno, commdet_percent, commdet_amount, expe_freight_rs,
	expe_freight_usd, expe_insurance, sb_exch_rate, cinv_total_invamt, cinv_commission, cinv_discount, cust_name as AgentName
	from expo_cinv_header left outer join
	expo_expenses on cinv_pack_seqno = expe_pack_seqno inner join
	expo_commission_details on commdet_cinv_seqno = cinv_seqno inner join
	expo_shipping_bill on cinv_sb_seqno = sb_seqno inner join
	expo_customer_master on commdet_agent_code = cust_seqno
	where cinv_finid = '$Finid' and cinv_seqno = '$CinvSeqno'");
    }
    else
    {
       $r = mysql_query("select CinvSeqno as cinv_seqno, CinvNo as cinv_no, CinvDate as cinv_date, CommdetAgentCode as commdet_agent_code,
	CommdetCinvSeqno as commdet_cinv_seqno, CommdetPercent as commdet_percent, CommdetAmount as commdet_amount,
	ExpeFreightRs as expe_freight_rs, ExpeFreightUsd as expe_freight_usd, ExpeInsurance as expe_insurance,
	SbExchRate as sb_exch_rate, CinvTotalInvamt as cinv_total_invamt, CinvCommission as cinv_commission,
	CinvDiscount as cinv_discount, CustName as AgentName
	from dfd.expofabcommissiondetails inner join
	dfd.expofabcinvheader on CommdetCinvSeqno = CinvSeqno left outer join
	dfd.expofabexpenses on CinvPackSeqno = ExpePackSeqno inner join
	dfd.expofabshippingbill on CinvSbSeqno = SbSeqno inner join
	dfd.expofabcustomermaster on CommdetAgentCode = CustSeqno
	where CinvFinid in ('$Finid') and CinvSeqno ='$CinvSeqno'");
    }
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getControlCreditNo() {
    $ginfinid= $_POST['ginfinid'];
    $gincompcode=$_POST['gincompcode'];
   // $r = mysql_query("select concat('CN',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
//where  accref_comp_code ='$gincompcode' and accref_finid = '$ginfinid' and accref_vouno like 'CN%'");
    $r = mysql_query("SELECT 
    CONCAT('CN', IFNULL(MAX(dbcr_no), 0) + 1) AS accref_vouno
FROM
    acc_dbcrnote_header
WHERE
    dbcr_type = 'CN'
        AND dbcr_finid = '$ginfinid'
        AND dbcr_comp_code = '$gincompcode';");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

    function getLedgerName()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $ledname = $_POST['ledname'];
        
	//$r=mysql_query("call acc_sp_mas_selledger_master('$compcode');");
        $r=mysql_query("select led_code, led_name from acc_ledger_master 
        where led_comp_code	= '$compcode' and led_name like '$ledname' and led_status = 'Y' and led_duplicate = 'N'
        and led_grp_code not in (43,168,169,170,171,172,204)");
        
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    
    function getControlDebitNo() {
        $ginfinid= $_POST['ginfinid'];
        $gincompcode=$_POST['gincompcode'];
//        $r = mysql_query("select concat('DN',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
//            where  accref_comp_code ='$gincompcode' and accref_finid = '$ginfinid' and accref_vouno like 'DN%'");
$r = mysql_query("select concat('DN',ifnull(max(dbcr_no),0) + 1) as accref_vouno from acc_dbcrnote_header where dbcr_type = 'DN' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");

        $nrow = mysql_num_rows($r);
        while ($re = mysql_fetch_array($r)) {
            $arr[] = $re;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
    }
    
    function getDebitInvNo() {
        $finyear=$_POST['ginfinid'];
        $compcode=$_POST['gincompany'];
        $ledgercode=$_POST['ledgercode'];
        $r = mysql_query("CALL acc_sp_trn_selacc_debit_billdetails('$compcode','$finyear','$ledgercode');");
        $nrow = mysql_num_rows($r);
        while ($re = mysql_fetch_array($r)) {
            $arr[] = $re;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
    }

    function getLedgerlist() {
        $r=mysql_query("select led_code, led_name from acc_ledger_master where led_type	= 'G' order by led_name");

        $nrow = mysql_num_rows($r);
        while ($re = mysql_fetch_array($r)) {
            $arr[] = $re;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
    }

?>






