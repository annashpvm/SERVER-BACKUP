<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

mysql_query("SET NAMES utf8");

$task = 'VouNo';

if (isset($_POST['task'])) {
    $task = $_POST['task'];   // Get this from Ext
}
switch ($task) {

    case "CheckNoValidate":
        getCheckNoValidate();
        break;
    case "Available":
        getAvailable();
        break;
    case "TempYarnSales":
        getTempYarnSales();
        break;
    case "InvoiceNumberGet":
        getInvoiceNumberGet();
        break;
    case "GroupAgsYarnSales":
        getGroupAgsYarnSales();
        break;
    case "YarnSalesGroup":
        getYarnSalesGroup();
        break;
    case "Groupcodechk":
        getGroupcodechk();
        break;
    case "VoucherNoDetailsGrid":
       getVoucherNoDetailsGrid();
        break;
    case "VoucherNoDetails":
        getVoucherNoDetails();
        break;
    case "PartyCreditorName":
        getPartyCreditorName();
        break;
    case "CurBalance1":
        getCurBalance1();
        break;
    case "LedLedgerDetail":
        getLedLedgerDetail();
        break;
    case "LedLedgerName":
        getLedLedgerName();
        break;
    case "LedCodeLedger":
        getLedCodeLedger();
        break;
    case "GroupName":
        getGroupName();
        break;
    case "findGroupName":
        getfindGroupName();
        break;

    case "Billreceiptbalance":
        getBillreceiptbalance();
        break;
    case "Billdetailsbalance":
        getBilldetailsbalance();
        break;
    case "DnDetails":
        getDnDetails();
        break;
    case "DnInvoiceNo":
        getDnInvoiceNo();
        break;
    case "ReasonDn":
        getReasonDn();
        break;
    case "PartyNameDn":
        getPartyNameDn();
        break;
    case "DnNo":
        getDnNo();
        break;
    case "Flexledgercode":
        getFlexledgercode();
        break;
    case "InvFlexDetails3":
        getInvFlexDetails3();
        break;
    case "InvFlexDetails2":
        getInvFlexDetails2();
        break;
    case "InvFlexDetails":
        getInvFlexDetails();
        break;
    case "VouNarration":
        getVouNarration();
        break;
    case "IndNoDetails":
        getIndNoDetails();
        break;
    case "CustomerLedcodeLedger":
        getCustomerLedcodeLedger();
        break;
    case "CustomerLedcode":
        getCustomerLedcode();
        break;
    case "VocNumChk":
        getVocNumChk();
        break;
    case "CustomerDetailsLoad":
        getCustomerDetailsLoad();
        break;
    case "CustomerNameYarn":
        getCustomerNameYarn();
        break;
    case "CurBalance":
        getCurBalance();
        break;
    case "PaymentBilldetails":
        getPaymentBilldetails();
        break;
    case "RecPaytransac":
        getRecPaytransac();
        break;
    case "AccountRefTrail":
        getAccountRefTrail();
        break;
    case "AccRefSeqno":
        getAccRefSeqno();
        break;
    case "AccRef":
        getAccRef();
        break;
    case "VocnoBank":
        getVocnoBank();
        break;
    case "Prefixledcode":
        getPrefixledcode();
        break;
    case "BankPayAccount":
        getBankPayAccount();
        break;
    case "RecPayTran":
        getRecPayTran();
        break;
    case "RecPay":
        getRecPay();
        break;
    case "cmbVocNo":
        getVocherNo();
        break;
    case "ledPrefix":
        getledPrefix();
        break;
    case "RefdetailsRefseq":
        getRefdetailsRefseq();
        break;
    case "RefdetailsRefseqtrail":
        getRefdetailsRefseqtrail();
        break;
    case "Refdetails":
        getRefdetails();
        break;
    case "cmbReceipttype":
        getReceipttype();
        break;
    case "cmbBankName":
        getBankName();
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
    case "Vocnumber":
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
    case "getcurfinyear":
        getCurrentFinyearDetail();
        break;
    case "subgroup":
        FindSubgroup("43");
        break;
    case "cmbcottledger":
        getcotledger();
        break;
    case "GeneralLedger":
        getGeneralLedger();
        break;
    case "GeneralLedger2":
        getGeneralLedger2();
        break;
    case "loaddrcrledgers":
        getdrcrledgers();
        break;

    case "loadtrailseqno":
        gettrailseqno();
        break;

    case "loadtrailseqnodetail":
        gettrailseqnodetail();
        break;
    case "VoucherType":
        getVoucherType();
        break;
        
    case "loadparty":
        getloadparty();
        break; 
       
    case "loadpayableparty":
        getloadpayableparty();
        break; 
        
        
    case "loadcompany":
        getloadcompany();
        break;
    case "loadledgername":
        getloadledgername();
        break;
    case "loadledgergroupname":
        getloadledgergroupname();
        break;
   /* case "VouNo":
        getVouNo();
        break;*/
   
        

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


  function getCheckNoValidate(){
        $chkno=$_POST['chkno'];
        $headled=$_POST['headled'];
        $r=mysql_query("select 
	    count(*) as cnt
	from
	    acc_ref,acc_tran
	where
	accref_seqno = acctran_accref_seqno and 
	acctran_led_code='$headled' AND accref_payref_no='$chkno' and  accref_payref_no<>''");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
         
        
    }
    
    function getVoucherType(){
        $r=mysql_query("select distinct accref_vou_type as vchtype from acc_ref");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
         
        
    }
        function getloadledgername(){
        $r=mysql_query("select led_code,led_name from acc_ledger_master where led_type in('C','D')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
         
        
    }
    
     function getloadledgergroupname(){
        $repoption=$_POST['repoption'];
        if($repoption=="G")
        {
        $r=mysql_query("select grp_code as led_code,grp_name as led_name from acc_group_master");
        }
        else
        {
        $r=mysql_query("select led_code as led_code,led_name as led_name from acc_ledger_master where led_type in('C','D')");
        }
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
         
        
    }
    
    function getloadparty() 
    {
    $partytype=$_POST['partytype'];

    if ($partytype=="A")
   {
    $r = mysql_query("select cust_code as partyid,  cust_ref as partyname from vew_sal_agent 
union 
select cust_code as partyid,  cust_ref as partyname from massal_customer");
   }
    else if ($partytype=='P')
    {
    $r = mysql_query("select cust_code as partyid,  cust_ref as partyname from massal_customer order by cust_ref");
    }
    else if ($partytype=='G')
    {
    $r = mysql_query("select cust_code as partyid,  cust_ref as partyname from vew_sal_agent order by cust_ref");
    }
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
    function getloadpayableparty() 
    {
    $partytype=$_POST['partytype'];

    if ($partytype=="A")
   {
    $r = mysql_query("select sup_code as partyid,sup_refname as partyname from maspur_supplier_master 
union
select sup_grp_code as partyid,sup_grp_name as partyname from maspur_supplier_group");
   }
    else if ($partytype=='P')
    {
    $r = mysql_query("select sup_code as partyid,sup_refname as partyname from maspur_supplier_master order by sup_refname ");
    }
    else if ($partytype=='G')
    {
    $r = mysql_query("select sup_grp_code as partyid,sup_grp_name as partyname from maspur_supplier_group order by sup_grp_name");
    }
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
    
    function getloadcompany(){
        $r=mysql_query("select company_code,company_id from mas_company");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
         
        
    }
    
    

  function getcotledger(){
        $compcode=$_POST['compcode'];
        $r=mysql_query("select led_code,led_name from acc_ledger_master where led_comp_code='$compcode' and led_status='Y' and led_duplicate='N';");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
         
        
    }

function getGroupAgsYarnSales(){
    $name=$_POST['name'];
    $compcode=$_POST['compcode'];
if ($compcode=='1') {
    $r = mysql_query("select
		led_code,
		led_name
	from 	acc_ledger_master
	where led_name='$name'	 and
		led_comp_code 	= 	'$compcode'  	and led_code in (24984,9702,1490,24839) and  
		led_status ='Y' and
		led_duplicate = 'N'");}
	else
	{
    $r = mysql_query("select
		led_code,
		led_name
	from 	acc_ledger_master
	where led_name='$name'	 and
		led_comp_code 	= 	'$compcode'  	and led_code in (24984,9702,1490,24839) and  
		led_status ='Y' and
		led_duplicate = 'N'");
	}
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getYarnSalesGroup(){
    $compcode=$_POST['compcode'];
    mysql_query("SET NAMES utf8");
if ($compcode=='1') {
    $r = mysql_query("select
		led_code,
		led_name
	from 	acc_ledger_master
	where 	
		led_comp_code 	= 	'$compcode' 	and led_code in (24984,9702,1490,24839) and 
		led_status ='Y' and
		led_duplicate = 'N'
	group by led_name, led_code");}
	else
	{
	    $r = mysql_query("select
		led_code,
		led_name
	from 	acc_ledger_master
	where 	
		led_comp_code 	= 	'$compcode' 	and  led_code in (24984,9702,1490,24839) and 
		led_status ='Y' and
		led_duplicate = 'N'
	group by led_name, led_code");	
	}
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getVoucherNoDetails(){
   $compcode=$_POST['compcode'];
   $finid=$_POST['finid'];
   $salestype=$_POST['salestype'];
   if($compcode==1){	
   if($salestype=="GY"){
    $r = mysql_query("select concat('SY',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
        where  accref_comp_code ='$compcode' and accref_finid = '$finid' and accref_vouno like 'SY%'");
   }else if($salestype=="TY"){
    $r = mysql_query("select concat('TY',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
        where  accref_comp_code ='$compcode' and accref_finid = '$finid' and accref_vouno like 'TY%'");
   }else if($salestype=="RY"){
    $r = mysql_query("select concat('SY',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
        where  accref_comp_code ='$compcode' and accref_finid = '$finid' and accref_vouno like 'SY%'");
   }else if($salestype=="WY"){
    $r = mysql_query("select concat('WY',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
        where  accref_comp_code ='$compcode' and accref_finid = '$finid' and accref_vouno like 'WY%'");
   }
   }else if($compcode==4){	
   if($salestype=="HS"){
    $r = mysql_query("select concat('HS',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
        where  accref_comp_code ='$compcode' and accref_finid = '$finid' and accref_vouno like 'HS%'");
   }else if($salestype=="TS"){
    $r = mysql_query("select concat('TS',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
        where  accref_comp_code ='$compcode' and accref_finid = '$finid' and accref_vouno like 'TS%'");
   } else if($salestype=="HR"){
    $r = mysql_query("select concat('HS',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
        where  accref_comp_code ='$compcode' and accref_finid = '$finid' and accref_vouno like 'HS%'");
   }else if($salestype=="HW"){
    $r = mysql_query("select concat('HW',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
        where  accref_comp_code ='$compcode' and accref_finid = '$finid' and accref_vouno like 'HW%'");
   }
   }	
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getPartyCreditorName(){
    mysql_query("SET NAMES utf8");
   $compcode=$_POST['compcode'];
    $r = mysql_query("call acc_sp_mas_selledger_master('$compcode')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getCurBalance1(){
    $finid=$_POST['finid'];
    $accname=$_POST['accname'];
    $r = mysql_query("call acc_sp_mas_selcurrent_balance('$accname','$finid');");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getAvailable(){
    $Ginfinid=$_POST['Ginfinid'];
    $compcode=$_POST['compcode'];
    if($compcode==1){
    $r = mysql_query("select concat('WY',yarn_waste_sales_no,'/',fin_year) as invno,yarn_cust_name from yarn_waste_sales_header,yarn_customer_master,fin_master where yarn_waste_sales_finid='$Ginfinid' and yarn_waste_sales_accref_seqno=0 and yarn_waste_sales_cust_code=yarn_cust_code and yarn_waste_sales_finid=fin_id
union
select concat('RY',yarn_rewind_sales_no,'/',fin_year) as invno,yarn_cust_name from yarn_rewind_sales_header,yarn_customer_master,fin_master where yarn_rewind_sales_finid='$Ginfinid' and yarn_rewind_sales_accref_seqno=0 and yarn_rewind_sales_cust_code=yarn_cust_code and yarn_rewind_sales_finid=fin_id
union
select concat('SY',yarn_sales_no,'/',fin_year) as invno,yarn_cust_name from yarn_sales_header,yarn_customer_master,fin_master where yarn_sales_finid='$Ginfinid' and yarn_sales_accref_seqno=0 and yarn_sales_cust_code=yarn_cust_code and yarn_sales_finid=fin_id and flag='S'
union
select concat('TY',yarn_sales_no,'/',fin_year) as invno,yarn_cust_name from yarn_sales_header,yarn_customer_master,fin_master where yarn_sales_finid='$Ginfinid' and yarn_sales_accref_seqno=0 and yarn_sales_cust_code=yarn_cust_code and yarn_sales_finid=fin_id and flag='T'");
    }else if($compcode==4){
    $r = mysql_query("select 
    concat('HW', yarn_waste_sales_no, '/', fin_year) as invno,
    yarn_cust_name
from
    hometexkgdl.yarn_waste_sales_header,
    hometexkgdl.yarn_customer_master,
    kgdl.fin_master
where
    yarn_waste_sales_finid = '$Ginfinid'
        and yarn_waste_sales_accref_seqno = 0
        and yarn_waste_sales_cust_code = yarn_cust_code
        and yarn_waste_sales_finid = fin_id 
union select 
    concat('HR',
            yarn_rewind_sales_no,
            '/',
            fin_year) as invno,
    yarn_cust_name
from
    hometexkgdl.yarn_rewind_sales_header,
    hometexkgdl.yarn_customer_master,
    kgdl.fin_master
where
    yarn_rewind_sales_finid = '$Ginfinid'
        and yarn_rewind_sales_accref_seqno = 0
        and yarn_rewind_sales_cust_code = yarn_cust_code
        and yarn_rewind_sales_finid = fin_id 
union select 
    concat('HS', yarn_sales_no, '/', fin_year) as invno,
    yarn_cust_name
from
    hometexkgdl.yarn_sales_header,
    hometexkgdl.yarn_customer_master,
    kgdl.fin_master
where
    yarn_sales_finid = '$Ginfinid'
        and yarn_sales_accref_seqno = 0
        and yarn_sales_cust_code = yarn_cust_code
        and yarn_sales_finid = fin_id and flag='S'
union select 
    concat('TS', yarn_sales_no, '/', fin_year) as invno,
    yarn_cust_name
from
    hometexkgdl.yarn_sales_header,
    hometexkgdl.yarn_customer_master,
    kgdl.fin_master
where
    yarn_sales_finid = '$Ginfinid'
        and yarn_sales_accref_seqno = 0
        and yarn_sales_cust_code = yarn_cust_code
        and yarn_sales_finid = fin_id and flag='T'");
    }
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getGroupcodechk(){
    $accname=$_POST['accname'];
    $compcode=$_POST['compcode'];
    $r = mysql_query("call acc_sp_trn_SelGrpCode_new('$accname','$compcode')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getVoucherNoDetailsGrid(){
    $invno=$_POST['invno'];
    $finid=$_POST['finid'];
    $date=$_POST['date'];
    $salestype=$_POST['salestype'];
    $compcode=$_POST['compcode'];
if($compcode==1){
if($salestype=="GY"){
    $r = mysql_query("select
    yc_m.count_prefix,
    sum(ys_t.Yarn_Sales_Noofbags) as no_of_bags,
    sum(ys_t.Yarn_Sales_Weight) as wt,
    sum(ys_t.Yarn_Sales_Value) As prdt_val
from
    kgdl.yarn_sales_trailer ys_t,
    kgdl.yarn_sales_header ys_h,
    kgdl.yarn_inward_trailer yi_t,
    kgdl.yarn_count_master yc_m
where
    ys_t.Yarn_Sales_Seqno = ys_h.Yarn_Sales_Seqno and ys_t.Yarn_Sales_Inward_Seqno = yi_t.Yarn_Inward_Seqno and ys_t.Yarn_Sales_Inward_Serialno = yi_t.Yarn_Inward_Serialno and yi_t.Yarn_Inward_Count_Code = yc_m.count_code and ys_h.yarn_sales_no = '$invno' and ys_h.Yarn_Sales_finid = '$finid' and ys_h.yarn_sales_date = ' $date ' and ys_t.Yarn_Sales_Return_Weight = 0 and flag='S'
group by yc_m.count_prefix");
}else if($salestype=="TY"){
    $r = mysql_query("select
    yc_m.count_prefix,
    sum(ys_t.Yarn_Sales_Noofbags) as no_of_bags,
    sum(ys_t.Yarn_Sales_Weight) as wt,
    sum(ys_t.Yarn_Sales_Value) As prdt_val
from
    kgdl.yarn_sales_trailer ys_t,
    kgdl.yarn_sales_header ys_h,
    kgdl.yarn_inward_trailer yi_t,
    kgdl.yarn_count_master yc_m
where
    ys_t.Yarn_Sales_Seqno = ys_h.Yarn_Sales_Seqno and ys_t.Yarn_Sales_Inward_Seqno = yi_t.Yarn_Inward_Seqno and ys_t.Yarn_Sales_Inward_Serialno = yi_t.Yarn_Inward_Serialno and yi_t.Yarn_Inward_Count_Code = yc_m.count_code and ys_h.yarn_sales_no = '$invno' and ys_h.Yarn_Sales_finid = '$finid' and ys_h.yarn_sales_date = ' $date ' and ys_t.Yarn_Sales_Return_Weight = 0 and flag='T'
group by yc_m.count_prefix");
}else if($salestype=="WY"){
	$r =mysql_query(" select
    yc_m.count_prefix,
    sum(ys_t.Yarn_waste_Sales_Noofbags) as no_of_bags,
    sum(ys_t.Yarn_waste_Sales_Weight) as wt,
    sum(ys_t.Yarn_waste_Sales_Value) As prdt_val
from
    kgdl.yarn_waste_sales_trailer ys_t,
    kgdl.yarn_waste_sales_header ys_h,
    kgdl.yarn_count_master yc_m
where
    ys_t.Yarn_waste_Sales_Seqno = ys_h.Yarn_waste_Sales_Seqno and ys_t.Yarn_waste_sales_Count_Code = yc_m.count_code and ys_h.yarn_waste_sales_no = '$invno' and ys_h.Yarn_waste_Sales_finid = '$finid' and ys_h.yarn_waste_sales_date = ' $date '
group by yc_m.count_prefix");
}else if($salestype=="RY"){
$r =mysql_query("select
    yc_m.count_prefix,
    sum(ys_t.Yarn_rewind_Sales_Noofbags) as no_of_bags,
    sum(ys_t.Yarn_rewind_Sales_Weight) as wt,
    sum(ys_t.Yarn_rewind_Sales_Value) As prdt_val
from
    kgdl.yarn_rewind_sales_trailer ys_t,
    kgdl.yarn_rewind_sales_header ys_h,
    kgdl.yarn_count_master yc_m
where
    ys_t.Yarn_rewind_Sales_Seqno = ys_h.Yarn_rewind_Sales_Seqno and ys_t.Yarn_rewind_sales_Count_Code = yc_m.count_code and ys_h.yarn_rewind_sales_no = '$invno' and ys_h.Yarn_rewind_Sales_finid = '$finid' and ys_h.yarn_rewind_sales_date = ' $date '
group by yc_m.count_prefix");
}
}else if($compcode==4){
if($salestype=="HS"){
    $r = mysql_query("select
    yc_m.count_prefix,
    sum(ys_t.Yarn_Sales_Noofbags) as no_of_bags,
    sum(ys_t.Yarn_Sales_Weight) as wt,
    sum(ys_t.Yarn_Sales_Value) As prdt_val
from
    hometexkgdl.yarn_sales_trailer ys_t,
    hometexkgdl.yarn_sales_header ys_h,
    hometexkgdl.yarn_inward_trailer yi_t,
    hometexkgdl.yarn_count_master yc_m
where
    ys_t.Yarn_Sales_Seqno = ys_h.Yarn_Sales_Seqno and ys_t.Yarn_Sales_Inward_Seqno = yi_t.Yarn_Inward_Seqno and ys_t.Yarn_Sales_Inward_Serialno = yi_t.Yarn_Inward_Serialno and yi_t.Yarn_Inward_Count_Code = yc_m.count_code and ys_h.yarn_sales_no = '$invno' and ys_h.Yarn_Sales_finid = '$finid' and ys_h.yarn_sales_date = ' $date ' and ys_t.Yarn_Sales_Return_Weight = 0 and flag='S'
group by yc_m.count_prefix");
}else if($salestype=="TS"){
    $r = mysql_query("select
    yc_m.count_prefix,
    sum(ys_t.Yarn_Sales_Noofbags) as no_of_bags,
    sum(ys_t.Yarn_Sales_Weight) as wt,
    sum(ys_t.Yarn_Sales_Value) As prdt_val
from
    hometexkgdl.yarn_sales_trailer ys_t,
    hometexkgdl.yarn_sales_header ys_h,
    hometexkgdl.yarn_inward_trailer yi_t,
    hometexkgdl.yarn_count_master yc_m
where
    ys_t.Yarn_Sales_Seqno = ys_h.Yarn_Sales_Seqno and ys_t.Yarn_Sales_Inward_Seqno = yi_t.Yarn_Inward_Seqno and ys_t.Yarn_Sales_Inward_Serialno = yi_t.Yarn_Inward_Serialno and yi_t.Yarn_Inward_Count_Code = yc_m.count_code and ys_h.yarn_sales_no = '$invno' and ys_h.Yarn_Sales_finid = '$finid' and ys_h.yarn_sales_date = ' $date ' and ys_t.Yarn_Sales_Return_Weight = 0 and flag='T'
group by yc_m.count_prefix");
}else if($salestype=="HW"){
	$r =mysql_query(" select
    yc_m.count_prefix,
    sum(ys_t.Yarn_waste_Sales_Noofbags) as no_of_bags,
    sum(ys_t.Yarn_waste_Sales_Weight) as wt,
    sum(ys_t.Yarn_waste_Sales_Value) As prdt_val
from
    hometexkgdl.yarn_waste_sales_trailer ys_t,
    hometexkgdl.yarn_waste_sales_header ys_h,
    hometexkgdl.yarn_count_master yc_m
where
    ys_t.Yarn_waste_Sales_Seqno = ys_h.Yarn_waste_Sales_Seqno and ys_t.Yarn_waste_sales_Count_Code = yc_m.count_code and ys_h.yarn_waste_sales_no = '$invno' and ys_h.Yarn_waste_Sales_finid = '$finid' and ys_h.yarn_waste_sales_date = ' $date '
group by yc_m.count_prefix");
}else if($salestype=="HR"){
$r =mysql_query("select
    yc_m.count_prefix,
    sum(ys_t.Yarn_rewind_Sales_Noofbags) as no_of_bags,
    sum(ys_t.Yarn_rewind_Sales_Weight) as wt,
    sum(ys_t.Yarn_rewind_Sales_Value) As prdt_val
from
    hometexkgdl.yarn_rewind_sales_trailer ys_t,
    hometexkgdl.yarn_rewind_sales_header ys_h,
    hometexkgdl.yarn_count_master yc_m
where
    ys_t.Yarn_rewind_Sales_Seqno = ys_h.Yarn_rewind_Sales_Seqno and ys_t.Yarn_rewind_sales_Count_Code = yc_m.count_code and ys_h.yarn_rewind_sales_no = '$invno' and ys_h.Yarn_rewind_Sales_finid = '$finid' and ys_h.yarn_rewind_sales_date = ' $date '
group by yc_m.count_prefix");
}
}
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getLedLedgerDetail(){
    $compcode=$_POST['compcode'];
    $ledname=$_POST['ledname'];
    $r = mysql_query("call acc_sp_mas_selledgercode('$compcode','$ledname');");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getGroupName(){
    $compcode=$_POST['compcode'];

//    $r = mysql_query("call acc_sp_mas_selgroup_master('$compcode')");

    $r = mysql_query("select *  from acc_group_master");

    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getfindGroupName(){
    $ledcode=$_POST['ledcode'];

//    $r = mysql_query("call acc_sp_mas_selgroup_master('$compcode')");

    $r = mysql_query("select * from acc_ledger_master a,acc_group_master b where led_grp_code = grp_code and led_type = 'G' and led_code = '$ledcode'");

    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}


function getLedCodeLedger(){
    $r = mysql_query("select concat('L',ifnull(max(led_code),0)+1) as led_code from acc_ledger_master");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getgeneralLedger(){
    $r = mysql_query("select * from acc_ledger_master where led_type = 'G'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getgeneralLedger2(){
    $r = mysql_query("select * from acc_ledger_master where led_type = 'G' and led_grp_code = 0");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getTempYarnSales(){
    $compcode=$_POST['compcode'];
    if($compcode==1){
    $r = mysql_query("select itemname,ValueDef,sum(Value) as Value,
    sum(DebitAmtt) as DebitAmtt from kgdl.tempyarnsales
    group by ValueDef;");
    }else if($compcode==4){
    $r = mysql_query("select itemname,ValueDef,sum(Value) as Value,
    sum(DebitAmtt) as DebitAmtt from kgdl.tempyarnsalessbm
    group by ValueDef;");
    }
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getBillreceiptbalance(){
    $compcode=$_POST['compcode'];
    $finid=$_POST['finid'];
    $ledcode=$_POST['ledcode'];
    $r = mysql_query("call acc_sp_trn_selacc_receipt_billdetails_new('$compcode','$finid','$ledcode')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getLedLedgerName(){
    mysql_query("SET NAMES utf8");  
    $compcode=$_POST['compcode'];
    $ledname=$_POST['ledname'];
        if ($ledname == '%'){
            $ledname = '';
        };
    $r = mysql_query("call acc_sp_mas_selledgername_match('$compcode','$ledname')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}


function getBilldetailsbalance(){
    $compcode=$_POST['compcode'];
    $finid=$_POST['finid'];
    $ledcode=$_POST['ledcode'];
    $r = mysql_query("call acc_sp_trn_selob_billdetails_balance('$compcode','$finid','$ledcode')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getDnDetails(){
    $compcode=$_POST['compcode'];
    $ginfinid=$_POST['ginfinid'];
    $Partycode=$_POST['Partycode'];
    $Invno=$_POST['Invno'];
    $r = mysql_query("call acc_sp_trn_selacc_debit_billdetails_seq_no('$compcode','$ginfinid','$Partycode','$Invno')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getDnInvoiceNo(){
    $compcode=$_POST['compcode'];
    $ginfinid=$_POST['ginfinid'];
    $Partycode=$_POST['Partycode'];
    $r = mysql_query("call acc_sp_trn_selacc_debit_billdetails('$compcode','$ginfinid','$Partycode')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getReasonDn(){
    $r = mysql_query("CALL acc_sp_mas_selreason()");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getPartyNameDn(){
    mysql_query("SET NAMES utf8");
   $compcode=$_POST['compcode'];
    $r = mysql_query("call acc_sp_mas_selledger_master('$compcode')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getDnNo(){
  $compcode=$_POST['compcode'];
  $ginfinid=$_POST['ginfinid'];
    $r = mysql_query("select concat('DN',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
where  accref_comp_code ='$compcode' and accref_finid = '$ginfinid' and accref_vouno like 'DN%'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getFlexledgercode(){
    $ledcode=$_POST['ledcode'];
    $compcode=$_POST['compcode'];
    $r = mysql_query("select * from acc_ledger_master where led_code = '$ledcode' ");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getInvFlexDetails3(){
  $invno=$_POST['invno'];
  $ginfinid=$_POST['ginfinid'];
  $sub=$_POST['subtype'];
  $compcode=$_POST['compcode'];
  if($compcode==1){
  if($sub=="GY"){
    $r = mysql_query("select
    ifnull(max(Yarn_Sales_Bed_Per), 0) 'bed_percentage',
    ifnull(max(Yarn_Sales_Aed_Per), 0) 'aed_percentage',
    ifnull(max(Yarn_Sales_Tngst_per), 0) 'tngst_percentage',
    ifnull(max(Yarn_Sales_Surcharge_Per), 0) 'surcharge_percentage',
    ifnull(max(Yarn_Sales_Cess_per), 0) 'cess_percentage',
    ifnull(max(Yarn_Sales_Cst_per), 0) 'cst_percentage',
    ifnull(max(cgst), 0) 'cgst',
    ifnull(max(igst), 0) 'igst',
    ifnull(max(sgst), 0) 'sgst',	
    ifnull(max(cgstper), 0) 'cgstper',
    ifnull(max(igstper), 0) 'igstper',
    ifnull(max(sgstper), 0) 'sgstper',
    0 as 'Education_cess_per',
    0 as 'educationcess_value',
    ifnull(max(Yarn_Sales_Round_Off), 0) 'round_off',
    0 as tds_percentage,
    ifnull(sum(Yarn_Sales_Value), 0) 'product_value'
from
    yarn_sales_header ysh,
    yarn_sales_trailer yst
Where
    ysh.Yarn_Sales_Seqno = yst.Yarn_Sales_Seqno and Yarn_Sales_No = '$invno' and Yarn_Sales_finid = '$ginfinid' and Yarn_Sales_Return_Weight = 0 AND flag='S'
");
  }else if($sub=="TY"){
    $r = mysql_query("select
    ifnull(max(Yarn_Sales_Bed_Per), 0) 'bed_percentage',
    ifnull(max(Yarn_Sales_Aed_Per), 0) 'aed_percentage',
    ifnull(max(Yarn_Sales_Tngst_per), 0) 'tngst_percentage',
    ifnull(max(Yarn_Sales_Surcharge_Per), 0) 'surcharge_percentage',
    ifnull(max(Yarn_Sales_Cess_per), 0) 'cess_percentage',
    ifnull(max(Yarn_Sales_Cst_per), 0) 'cst_percentage',
    ifnull(max(cgst), 0) 'cgst',
    ifnull(max(igst), 0) 'igst',
    ifnull(max(sgst), 0) 'sgst',	
    ifnull(max(cgstper), 0) 'cgstper',
    ifnull(max(igstper), 0) 'igstper',
    ifnull(max(sgstper), 0) 'sgstper',
    0 as 'Education_cess_per',
    0 as 'educationcess_value',
    ifnull(max(Yarn_Sales_Round_Off), 0) 'round_off',
    0 as tds_percentage,
    ifnull(sum(Yarn_Sales_Value), 0) 'product_value'
from
    yarn_sales_header ysh,
    yarn_sales_trailer yst
Where
    ysh.Yarn_Sales_Seqno = yst.Yarn_Sales_Seqno and Yarn_Sales_No = '$invno' and Yarn_Sales_finid = '$ginfinid' and Yarn_Sales_Return_Weight = 0 and flag='T'
");
  }else if($sub=="RY"){
    $r = mysql_query("select
    ifnull(max(Yarn_Rewind_Sales_Bed_Per), 0) 'bed_percentage',
    ifnull(max(Yarn_Rewind_Sales_Aed_Per), 0) 'aed_percentage',
    ifnull(max(Yarn_rewind_Sales_Tngst_per), 0) 'tngst_percentage',
    ifnull(max(Yarn_Rewind_Sales_Surcharge_Per), 0) 'surcharge_percentage',
    ifnull(max(Yarn_Rewind_Sales_Cess_per), 0) 'cess_percentage',
    ifnull(max(Yarn_Rewind_Sales_Cst_per), 0) 'cst_percentage',
    0 as 'Education_cess_per',
    0 as 'educationcess_value',
    ifnull(max(cgst), 0) 'cgst',
    ifnull(max(igst), 0) 'igst',
    ifnull(max(sgst), 0) 'sgst',	
    ifnull(max(cgstper), 0) 'cgstper',
    ifnull(max(igstper), 0) 'igstper',
    ifnull(max(sgstper), 0) 'sgstper',
    ifnull(max(Yarn_Rewind_Sales_Round_Off), 0) 'round_off',
    0 as tds_percentage,
    ifnull(sum(Yarn_rewind_Sales_Value), 0) 'product_value'
from
    yarn_rewind_sales_header ysh,
    yarn_rewind_sales_trailer yst
Where
    ysh.Yarn_rewind_Sales_Seqno = yst.Yarn_rewind_Sales_Seqno and Yarn_rewind_Sales_No = '$invno' and Yarn_Rewind_Sales_finid = '$ginfinid'");
  }else if($sub=="WY"){
    $r = mysql_query("select
    ifnull(max(Yarn_waste_Sales_Bed_Per), 0) 'bed_percentage',
    ifnull(max(Yarn_waste_Sales_Aed_Per), 0) 'aed_percentage',
    ifnull(max(Yarn_waste_Sales_Tngst_per), 0) 'tngst_percentage',
    ifnull(max(Yarn_waste_Sales_Surcharge_Per), 0) 'surcharge_percentage',
    ifnull(max(Yarn_waste_Sales_Cess_per), 0) 'cess_percentage',
    ifnull(max(Yarn_waste_Sales_Cst_per), 0) 'cst_percentage',ifnull(max(tcs), 0) 'tcs',
    ifnull(max(Yarn_Waste_Sales_Educationcess_Per),
            0) 'Education_cess_per',
    ifnull(max(Yarn_Waste_Sales_Educationcess_value),
            0) 'educationcess_value',
    ifnull(max(cgst), 0) 'cgst',
    ifnull(max(igst), 0) 'igst',
    ifnull(max(sgst), 0) 'sgst',	
    ifnull(max(cgstper), 0) 'cgstper',
    ifnull(max(igstper), 0) 'igstper',
    ifnull(max(sgstper), 0) 'sgstper',
    ifnull(max(Yarn_waste_Sales_Round_Off), 0) 'round_off',
    ifnull(max(Yarn_Waste_Sales_Tds_Percentage), 0) 'tds_percentage',
    ifnull(sum(Yarn_waste_Sales_Value), 0) 'product_value'
from
    yarn_waste_sales_header ysh,
    yarn_waste_sales_trailer yst
Where
    ysh.Yarn_waste_Sales_Seqno = yst.Yarn_waste_Sales_Seqno and Yarn_waste_Sales_No = '$invno' and Yarn_waste_Sales_finid = '$ginfinid'");
  }
} else if($compcode==4){
  if($sub=="HS"){
    $r = mysql_query("select
    ifnull(max(Yarn_Sales_Bed_Per), 0) 'bed_percentage',
    ifnull(max(Yarn_Sales_Aed_Per), 0) 'aed_percentage',
    ifnull(max(Yarn_Sales_Tngst_per), 0) 'tngst_percentage',
    ifnull(max(Yarn_Sales_Surcharge_Per), 0) 'surcharge_percentage',
    ifnull(max(Yarn_Sales_Cess_per), 0) 'cess_percentage',
    ifnull(max(Yarn_Sales_Cst_per), 0) 'cst_percentage',
    ifnull(max(cgst), 0) 'cgst',
    ifnull(max(igst), 0) 'igst',
    ifnull(max(sgst), 0) 'sgst',	
    ifnull(max(cgstper), 0) 'cgstper',
    ifnull(max(igstper), 0) 'igstper',
    ifnull(max(sgstper), 0) 'sgstper',
    0 as 'Education_cess_per',
    0 as 'educationcess_value',
    ifnull(max(Yarn_Sales_Round_Off), 0) 'round_off',
    0 as tds_percentage,
    ifnull(sum(Yarn_Sales_Value), 0) 'product_value'
from
    hometexkgdl.yarn_sales_header ysh,
    hometexkgdl.yarn_sales_trailer yst
Where
    ysh.Yarn_Sales_Seqno = yst.Yarn_Sales_Seqno and Yarn_Sales_No = '$invno' and Yarn_Sales_finid = '$ginfinid' and Yarn_Sales_Return_Weight = 0 AND flag='S'
");
  }else  if($sub=="TS"){
    $r = mysql_query("select
    ifnull(max(Yarn_Sales_Bed_Per), 0) 'bed_percentage',
    ifnull(max(Yarn_Sales_Aed_Per), 0) 'aed_percentage',
    ifnull(max(Yarn_Sales_Tngst_per), 0) 'tngst_percentage',
    ifnull(max(Yarn_Sales_Surcharge_Per), 0) 'surcharge_percentage',
    ifnull(max(Yarn_Sales_Cess_per), 0) 'cess_percentage',
    ifnull(max(Yarn_Sales_Cst_per), 0) 'cst_percentage',
    ifnull(max(cgst), 0) 'cgst',
    ifnull(max(igst), 0) 'igst',
    ifnull(max(sgst), 0) 'sgst',	
    ifnull(max(cgstper), 0) 'cgstper',
    ifnull(max(igstper), 0) 'igstper',
    ifnull(max(sgstper), 0) 'sgstper',
    0 as 'Education_cess_per',
    0 as 'educationcess_value',
    ifnull(max(Yarn_Sales_Round_Off), 0) 'round_off',
    0 as tds_percentage,
    ifnull(sum(Yarn_Sales_Value), 0) 'product_value'
from
    hometexkgdl.yarn_sales_header ysh,
    hometexkgdl.yarn_sales_trailer yst
Where
    ysh.Yarn_Sales_Seqno = yst.Yarn_Sales_Seqno and Yarn_Sales_No = '$invno' and Yarn_Sales_finid = '$ginfinid' and Yarn_Sales_Return_Weight = 0 AND flag='T'
");
  }else if($sub=="HR"){
    $r = mysql_query("select
    ifnull(max(Yarn_Rewind_Sales_Bed_Per), 0) 'bed_percentage',
    ifnull(max(Yarn_Rewind_Sales_Aed_Per), 0) 'aed_percentage',
    ifnull(max(Yarn_rewind_Sales_Tngst_per), 0) 'tngst_percentage',
    ifnull(max(Yarn_Rewind_Sales_Surcharge_Per), 0) 'surcharge_percentage',
    ifnull(max(Yarn_Rewind_Sales_Cess_per), 0) 'cess_percentage',
    ifnull(max(Yarn_Rewind_Sales_Cst_per), 0) 'cst_percentage',
    0 as 'Education_cess_per',
    0 as 'educationcess_value',
    ifnull(max(cgst), 0) 'cgst',
    ifnull(max(igst), 0) 'igst',
    ifnull(max(sgst), 0) 'sgst',	
    ifnull(max(cgstper), 0) 'cgstper',
    ifnull(max(igstper), 0) 'igstper',
    ifnull(max(sgstper), 0) 'sgstper',
    ifnull(max(Yarn_Rewind_Sales_Round_Off), 0) 'round_off',
    0 as tds_percentage,
    ifnull(sum(Yarn_rewind_Sales_Value), 0) 'product_value'
from
    hometexkgdl.yarn_rewind_sales_header ysh,
    hometexkgdl.yarn_rewind_sales_trailer yst
Where
    ysh.Yarn_rewind_Sales_Seqno = yst.Yarn_rewind_Sales_Seqno and Yarn_rewind_Sales_No = '$invno' and Yarn_Rewind_Sales_finid = '$ginfinid'");
  }else if($sub=="HW"){
    $r = mysql_query("select
    ifnull(max(Yarn_waste_Sales_Bed_Per), 0) 'bed_percentage',
    ifnull(max(Yarn_waste_Sales_Aed_Per), 0) 'aed_percentage',
    ifnull(max(Yarn_waste_Sales_Tngst_per), 0) 'tngst_percentage',
    ifnull(max(Yarn_waste_Sales_Surcharge_Per), 0) 'surcharge_percentage',
    ifnull(max(Yarn_waste_Sales_Cess_per), 0) 'cess_percentage',
    ifnull(max(Yarn_waste_Sales_Cst_per), 0) 'cst_percentage',ifnull(max(tcs), 0) 'tcs',
    ifnull(max(Yarn_Waste_Sales_Educationcess_Per),
            0) 'Education_cess_per',
    ifnull(max(Yarn_Waste_Sales_Educationcess_value),
            0) 'educationcess_value',
    ifnull(max(cgst), 0) 'cgst',
    ifnull(max(igst), 0) 'igst',
    ifnull(max(sgst), 0) 'sgst',	
    ifnull(max(cgstper), 0) 'cgstper',
    ifnull(max(igstper), 0) 'igstper',
    ifnull(max(sgstper), 0) 'sgstper',
    ifnull(max(Yarn_waste_Sales_Round_Off), 0) 'round_off',
    ifnull(max(Yarn_Waste_Sales_Tds_Percentage), 0) 'tds_percentage',
    ifnull(sum(Yarn_waste_Sales_Value), 0) 'product_value'
from
    hometexkgdl.yarn_waste_sales_header ysh,
    hometexkgdl.yarn_waste_sales_trailer yst
Where
    ysh.Yarn_waste_Sales_Seqno = yst.Yarn_waste_Sales_Seqno and Yarn_waste_Sales_No = '$invno' and Yarn_waste_Sales_finid = '$ginfinid'");
  }
}
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getInvFlexDetails2(){
  $invno=$_POST['invno'];
  $ginfinid=$_POST['ginfind'];
  $custcode=$_POST['custcode'];
    $r = mysql_query("select *,0 as  tds_percentage ,0 as Education_cess_per, 0 as educationcess_value,'GY' as sale_type from yarn_sales_header
                     Where yarn_sales_no = '$invno'and yarn_sales_finid =  '$ginfinid'
                     and Yarn_Sales_Cust_Code = '$custcode'
                     Union
                     select *,0 as tds_percentage,0 as Education_cess_per, 0 as educationcess_value,'RY' as sale_type from yarn_rewind_sales_header
                     where yarn_rewind_sales_no =  '$invno'
                     and yarn_rewind_sales_finid =  '$ginfinid'
                     and Yarn_rewind_Sales_Cust_Code = '$custcode'
                     Union
                     select Yarn_Waste_Sales_Seqno,Yarn_Waste_Sales_Compcode,Yarn_Waste_Sales_finid,
                     Yarn_Waste_Sales_No,Yarn_Waste_Sales_Date,Yarn_Waste_Sales_Cust_Code,Yarn_Waste_Sales_Tngst_per,
                     Yarn_Waste_Sales_Cst_per, Yarn_Waste_Sales_Cess_per,Yarn_Waste_Sales_Round_Off,Yarn_Waste_Sales_Grand_Total,
                     Yarn_Waste_Sales_Vehicle_No,Yarn_Waste_Sales_Gatepass_No,Yarn_Waste_Sales_Gatepass_Date,Yarn_Waste_Sales_Remarks1,
                     Yarn_Waste_Sales_Remarks2, Yarn_Waste_Sales_Remarks3,Yarn_Waste_Sales_Remarks4,
                     Yarn_Waste_Sales_Bed_Per,Yarn_Waste_Sales_Aed_Per,Yarn_Waste_Sales_Surcharge_Per,
                     Yarn_Waste_Sales_Accref_Seqno, Yarn_Waste_Sales_Tds_Percentage,Yarn_Waste_Sales_Educationcess_Per,Yarn_Waste_Sales_Educationcess_value,'WY' as sale_type
                     From yarn_waste_sales_header Where
                     yarn_waste_sales_no =  '$invno'
                     and yarn_waste_sales_finid =  '$ginfinid'
                     and Yarn_waste_Sales_Cust_Code =  '$custcode'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getInvFlexDetails(){
  $invdate=$_POST['invdate'];
  $invno=$_POST['invno'];
  $ginfind=$_POST['ginfind'];
    $r = mysql_query("select yc_m.count_prefix,sum(ys_t.Yarn_Sales_Noofbags) as no_of_bags,
                    sum(ys_t.Yarn_Sales_Weight) as wt, sum(ys_t.Yarn_Sales_Value) As prdt_val
                    from kgdl.yarn_sales_trailer ys_t, kgdl.yarn_sales_header ys_h,
                    kgdl.yarn_inward_trailer yi_t, kgdl.yarn_count_master yc_m
                    where ys_t.Yarn_Sales_Seqno = ys_h.Yarn_Sales_Seqno and ys_t.Yarn_Sales_Inward_Seqno = yi_t.Yarn_Inward_Seqno and ys_t.Yarn_Sales_Inward_Serialno = yi_t.Yarn_Inward_Serialno and
                    yi_t.Yarn_Inward_Count_Code = yc_m.count_code and ys_h.yarn_sales_no= '$invno' and
                    ys_h.Yarn_Sales_finid= '$ginfind' and ys_h.yarn_sales_date='$invdate' and ys_t.Yarn_Sales_Return_Weight = 0
                    group by  yc_m.count_prefix
                    Union
                    select yc_m.count_prefix,sum(ys_t.Yarn_rewind_Sales_Noofbags) as no_of_bags,
                    sum(ys_t.Yarn_rewind_Sales_Weight) as wt, sum(ys_t.Yarn_rewind_Sales_Value) As prdt_val
                    from kgdl.yarn_rewind_sales_trailer ys_t, kgdl.yarn_rewind_sales_header ys_h,
                    kgdl.yarn_count_master yc_m  where ys_t.Yarn_rewind_Sales_Seqno = ys_h.Yarn_rewind_Sales_Seqno and
                    ys_t.Yarn_rewind_sales_Count_Code = yc_m.count_code and ys_h.yarn_rewind_sales_no= '$invno' and
                    ys_h.Yarn_rewind_Sales_finid= '$ginfind' and ys_h.yarn_rewind_sales_date='$invdate'
                    group by  yc_m.count_prefix
                    Union
                    select yc_m.count_prefix,sum(ys_t.Yarn_waste_Sales_Noofbags) as no_of_bags,
                    sum(ys_t.Yarn_waste_Sales_Weight) as wt, sum(ys_t.Yarn_waste_Sales_Value) As prdt_val
                    from kgdl.yarn_waste_sales_trailer ys_t, kgdl.yarn_waste_sales_header ys_h,
                    kgdl.yarn_count_master yc_m where ys_t.Yarn_waste_Sales_Seqno = ys_h.Yarn_waste_Sales_Seqno and
                    ys_t.Yarn_waste_sales_Count_Code = yc_m.count_code and ys_h.yarn_waste_sales_no= '$invno' and
                    ys_h.Yarn_waste_Sales_finid= '$ginfind'  and ys_h.yarn_waste_sales_date='$invdate'
                    group by  yc_m.count_prefix");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getVouNarration(){
  $Vouno=$_POST['Vouno'];
  $ginfinid=$_POST['ginfinid'];
  $compcode=$_POST['compcode'];
    $r = mysql_query("select *  from acc_tran a, acc_ref b
                    where a.acctran_accref_seqno = b.accref_seqno and
                    b.accref_vouno = '$Vouno' and
                    b.accref_comp_code = '$compcode' And b.accref_finid ='$ginfinid'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getIndNoDetails(){
    $invno=$_POST['invno'];
    $ginfinid=$_POST['ginfinid'];
    $custcode=$_POST['custcode'];
    $salestype=$_POST['salestype'];
    $compcode=$_POST['compcode'];
    if($compcode==1){
    if($salestype=="GY"){
    $r = mysql_query("select DATE_FORMAT(Yarn_Sales_Date,'%Y-%m-%d') as Yarn_Sales_Date ,Yarn_Sales_Grand_Total from  kgdl.yarn_sales_header where yarn_sales_no='$invno' and yarn_sales_finid='$ginfinid' and   Yarn_Sales_Cust_Code='$custcode'");
    }else if($salestype=="TY"){
    $r = mysql_query("select DATE_FORMAT(Yarn_Sales_Date,'%Y-%m-%d') as Yarn_Sales_Date ,Yarn_Sales_Grand_Total from  kgdl.yarn_sales_header where yarn_sales_no='$invno' and yarn_sales_finid='$ginfinid' and   Yarn_Sales_Cust_Code='$custcode'");
    }else if($salestype=="RY"){
     $r = mysql_query("select DATE_FORMAT(Yarn_Rewind_Sales_Date,'%Y-%m-%d') as Yarn_Rewind_Sales_Date ,Yarn_Rewind_Sales_Grand_Total from  kgdl.yarn_rewind_sales_header where yarn_rewind_sales_no= '$invno' and yarn_rewind_sales_finid='$ginfinid' and
                  Yarn_rewind_Sales_Cust_Code='$custcode'");
    }else if($salestype=="WY"){
     $r = mysql_query("select  DATE_FORMAT(Yarn_Waste_Sales_Date,'%Y-%m-%d') as Yarn_Waste_Sales_Date ,Yarn_Waste_Sales_Grand_Total from  kgdl.yarn_waste_sales_header where yarn_waste_sales_no='$invno' and yarn_waste_sales_finid='$ginfinid' and
                   Yarn_waste_Sales_Cust_Code='$custcode'");
    }
}else if($compcode==4){
    if($salestype=="HS"){
    $r = mysql_query("select DATE_FORMAT(Yarn_Sales_Date,'%Y-%m-%d') as Yarn_Sales_Date ,Yarn_Sales_Grand_Total from  hometexkgdl.yarn_sales_header where yarn_sales_no='$invno' and yarn_sales_finid='$ginfinid' and   Yarn_Sales_Cust_Code='$custcode'");
    }else if($salestype=="HR"){
     $r = mysql_query("select DATE_FORMAT(Yarn_Rewind_Sales_Date,'%Y-%m-%d') as Yarn_Rewind_Sales_Date ,Yarn_Rewind_Sales_Grand_Total from  hometexkgdl.yarn_rewind_sales_header where yarn_rewind_sales_no= '$invno' and yarn_rewind_sales_finid='$ginfinid' and
                  Yarn_rewind_Sales_Cust_Code='$custcode'");
    }else if($salestype=="HW"){
     $r = mysql_query("select  DATE_FORMAT(Yarn_Waste_Sales_Date,'%Y-%m-%d') as Yarn_Waste_Sales_Date ,Yarn_Waste_Sales_Grand_Total from  hometexkgdl.yarn_waste_sales_header where yarn_waste_sales_no='$invno' and yarn_waste_sales_finid='$ginfinid' and
                   Yarn_waste_Sales_Cust_Code='$custcode'");
    }else if($salestype=="TS"){
    $r = mysql_query("select DATE_FORMAT(Yarn_Sales_Date,'%Y-%m-%d') as Yarn_Sales_Date ,Yarn_Sales_Grand_Total from  hometexkgdl.yarn_sales_header where yarn_sales_no='$invno' and yarn_sales_finid='$ginfinid' and   Yarn_Sales_Cust_Code='$custcode'");
    }
}
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getCustomerLedcodeLedger(){
    $ledcode=$_POST['ledcode'];
    $compcode=$_POST['compcode'];
    $r = mysql_query("select * from acc_ledger_master where led_code = '$ledcode' ");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getCustomerLedcode(){
    $custname=$_POST['custname'];
    $compcode=$_POST['compcode'];
    if($compcode==1){
    $r = mysql_query("select yanr_cust_led_code  from kgdl.yarn_customer_master where yarn_cust_code='$custname'");
    }else if($compcode==4){
    $r = mysql_query("select yanr_cust_led_code  from hometexkgdl.yarn_customer_master where yarn_cust_code='$custname'");
    }
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getVocNumChk(){
    $invno=$_POST['invno'];
    $gincompcode=$_POST['gincompcode'];
    $ginfinid=$_POST['ginfinid'];
    $r = mysql_query("select a.accref_vouno,b.acctrail_inv_no from acc_ref a, acc_trail b
            where a.accref_seqno = b.acctrail_accref_seqno and
            b.acctrail_inv_no = '$invno' and
            a.accref_comp_code = '$gincompcode' And a.accref_finid = '$ginfinid'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getCustomerDetailsLoad(){
    $custname=$_POST['custname'];
    $ginfinid=$_POST['ginfinid'];
   $compcode=$_POST['compcode'];
    if($compcode==1){
    $r = mysql_query("select yarn_sales_no,fin_year,CONCAT('HOY',yarn_sales_no,'/',fin_year,'/','GY')  as no ,'GY'  as sale_type,CONCAT('HOY',yarn_sales_no,'/',fin_year)  as invno  from
                kgdl.yarn_sales_header,kgdl.fin_master Where
                fin_id = Yarn_Sales_finid and Yarn_Sales_Cust_Code = '$custname' and
                Yarn_Sales_finid= '$ginfinid' and Yarn_Sales_Accref_Seqno = 0 and flag='S'
		union
select yarn_sales_no,fin_year,CONCAT('HTY',yarn_sales_no,'/',fin_year,'/','TY')  as no ,'TY'  as sale_type,CONCAT('HTY',yarn_sales_no,'/',fin_year)  as invno  from
                kgdl.yarn_sales_header,kgdl.fin_master Where
                fin_id = Yarn_Sales_finid and Yarn_Sales_Cust_Code = '$custname' and
                Yarn_Sales_finid= '$ginfinid' and Yarn_Sales_Accref_Seqno = 0 and flag='T'
                Union
                select yarn_rewind_sales_no, fin_year, CONCAT('HOY',yarn_rewind_sales_no,'/',fin_year,'/','RY') as no,'RY' as sale_type,CONCAT('HOY',yarn_rewind_sales_no,'/',fin_year)  as invno  From
                kgdl.yarn_rewind_sales_header yrsh, kgdl.fin_master Where
                fin_id = yarn_rewind_sales_finid and yarn_rewind_sales_cust_code = '$custname'
                and yarn_rewind_sales_finid = '$ginfinid' and yarn_rewind_sales_accref_seqno = 0
                Union
                select yarn_waste_sales_no,fin_year,  CONCAT('HOY',yarn_waste_sales_no,'/',fin_year,'/','WY') as no,'WY' as sale_type,CONCAT('HOY',yarn_waste_sales_no,'/',fin_year)  as invno   from
                yarn_waste_sales_header ywsh, kgdl.fin_master Where
                fin_id = yarn_waste_sales_finid and yarn_waste_sales_cust_code = '$custname'
                and yarn_waste_sales_finid = '$ginfinid' and yarn_waste_sales_accref_seqno = 0");
    }else if($compcode==4){
    $r = mysql_query("select 
    yarn_sales_no,
    fin_year,
    CONCAT('HSY',
            yarn_sales_no,
            '/',
            fin_year,
            '/',
            'HS') as no,
    'HS' as sale_type,
    CONCAT('HSY', yarn_sales_no, '/', fin_year) as invno
from
    hometexkgdl.yarn_sales_header,
    kgdl.fin_master
Where
    fin_id = Yarn_Sales_finid
        and Yarn_Sales_Cust_Code = '$custname'
        and Yarn_Sales_finid = '$ginfinid'
        and Yarn_Sales_Accref_Seqno = 0 and flag='S' 
union
select 
    yarn_sales_no,
    fin_year,
    CONCAT('KTY',
            yarn_sales_no,
            '/',
            fin_year,
            '/',
            'TS') as no,
    'HS' as sale_type,
    CONCAT('KTY', yarn_sales_no, '/', fin_year) as invno
from
    hometexkgdl.yarn_sales_header,
    kgdl.fin_master
Where
    fin_id = Yarn_Sales_finid
        and Yarn_Sales_Cust_Code = '$custname'
        and Yarn_Sales_finid = '$ginfinid'
        and Yarn_Sales_Accref_Seqno = 0 and flag='T' 
Union select 
    yarn_rewind_sales_no,
    fin_year,
    CONCAT('HSY',
            yarn_rewind_sales_no,
            '/',
            fin_year,
            '/',
            'HR') as no,
    'HR' as sale_type,
    CONCAT('HSY',
            yarn_rewind_sales_no,
            '/',
            fin_year) as invno
From
    hometexkgdl.yarn_rewind_sales_header yrsh,
    kgdl.fin_master
Where
    fin_id = yarn_rewind_sales_finid
        and yarn_rewind_sales_cust_code = '$custname'
        and yarn_rewind_sales_finid = '$ginfinid'
        and yarn_rewind_sales_accref_seqno = 0 
Union select 
    yarn_waste_sales_no,
    fin_year,
    CONCAT('HSY',
            yarn_waste_sales_no,
            '/',
            fin_year,
            '/',
            'HW') as no,
    'HW' as sale_type,
    CONCAT('HSY',
            yarn_waste_sales_no,
            '/',
            fin_year) as invno
from
    hometexkgdl.yarn_waste_sales_header ywsh,
    kgdl.fin_master
Where
    fin_id = yarn_waste_sales_finid
        and yarn_waste_sales_cust_code = '$custname'
        and yarn_waste_sales_finid = '$ginfinid'
        and yarn_waste_sales_accref_seqno = 0");
    }
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getCustomerNameYarn() {
   $compcode=$_POST['compcode'];
   $finid=$_POST['finid'];
    if($compcode==1){
    $r = mysql_query("select  distinct yarn_cust_code, yarn_cust_name from (
select 
	 yarn_cust_code, yarn_cust_name
from
    kgdl.yarn_sales_header,yarn_customer_master
Where
	yarn_cust_code=yarn_sales_cust_code and yarn_sales_finid='$finid' and
    Yarn_Sales_Accref_Seqno = 0 
Union select 
       yarn_cust_code, yarn_cust_name
From
    kgdl.yarn_rewind_sales_header,yarn_customer_master
Where
	yarn_cust_code=yarn_rewind_sales_cust_code and yarn_rewind_sales_finid='$finid' and
    yarn_rewind_sales_accref_seqno = 0 
Union select 
       yarn_cust_code, yarn_cust_name
from
    yarn_waste_sales_header,yarn_customer_master
Where
	yarn_cust_code=yarn_waste_sales_cust_code and yarn_waste_sales_finid='$finid' and
    yarn_waste_sales_accref_seqno = 0)x");
    }else if($compcode==4){
    $r = mysql_query("select  distinct yarn_cust_code, yarn_cust_name from (
select 
	 yarn_cust_code, yarn_cust_name
from
    hometexkgdl.yarn_sales_header,hometexkgdl.yarn_customer_master
Where
	yarn_cust_code=yarn_sales_cust_code and yarn_sales_finid='$finid' and
    Yarn_Sales_Accref_Seqno = 0 
Union select 
       yarn_cust_code, yarn_cust_name
From
    hometexkgdl.yarn_rewind_sales_header,hometexkgdl.yarn_customer_master
Where
	yarn_cust_code=yarn_rewind_sales_cust_code and yarn_rewind_sales_finid='$finid' and
    yarn_rewind_sales_accref_seqno = 0 
Union select 
       yarn_cust_code, yarn_cust_name
from
    hometexkgdl.yarn_waste_sales_header,hometexkgdl.yarn_customer_master
Where
	yarn_cust_code=yarn_waste_sales_cust_code and yarn_waste_sales_finid='$finid' and
    yarn_waste_sales_accref_seqno = 0)x");
    }
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getCurBalance() {
        $accname=$_POST['accname'];
        $compcode=$_POST['gincompany'];
        $finid=$_POST['ginfinid'];
        $r = mysql_query("call acc_sp_trn_selcurbalance_paymentled('$compcode','$finid','$accname')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getPaymentBilldetails() {
        $accname=$_POST['accname'];
        $compcode=$_POST['gincompany'];
	$finid = $_POST['finid'];
        $r = mysql_query("CALL acc_sp_trn_selacc_payment_billdetails('$compcode','$finid','$accname')");
/*
	if($compcode==1){
        $r = mysql_query("CALL acc_sp_trn_selacc_payment_billdetails('1','21','$accname')");
	}else if($compcode==4&&$accname==24261){
	$r = mysql_query("CALL acc_sp_trn_selacc_payment_billdetails('4','26','$accname')");
	}else if($compcode==4&&$accname!==24261){
	$r = mysql_query("CALL acc_sp_trn_selacc_payment_billdetails('4','19','$accname')");
	}else if($compcode==11){
	$r = mysql_query("CALL acc_sp_trn_selacc_payment_billdetails('11','24','$accname')");
	}else if($compcode==8){
	$r = mysql_query("CALL acc_sp_trn_selacc_payment_billdetails('8','25','$accname')");
	}
*/
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}



function getInvoiceNumberGet() {
    $finid=$_POST['ginfinid'];
    $invno=$_POST['invno'];
    $custcode=$_POST['custcode'];
        $compcode=$_POST['gincompcode'];
	if($compcode==1){
    $r = mysql_query("select yarn_sales_no,fin_year,CONCAT('HOY',yarn_sales_no,'/',fin_year,'/','GY')  as no ,'GY'  as sale_type,CONCAT('HOY',yarn_sales_no,'/',fin_year)  as invno  from
                kgdl.yarn_sales_header,kgdl.fin_master Where
                fin_id = Yarn_Sales_finid and Yarn_Sales_Cust_Code = '$custcode' and
                Yarn_Sales_finid= '$finid' and Yarn_Sales_Accref_Seqno = 0 and CONCAT('HOY',yarn_sales_no,'/',fin_year,'/','GY')='$invno' and flag='S'
		union
		select yarn_sales_no,fin_year,CONCAT('HTY',yarn_sales_no,'/',fin_year,'/','TY')  as no ,'TY'  as sale_type,CONCAT('HTY',yarn_sales_no,'/',fin_year)  as invno  from
                kgdl.yarn_sales_header,kgdl.fin_master Where
                fin_id = Yarn_Sales_finid and Yarn_Sales_Cust_Code = '$custcode' and
                Yarn_Sales_finid= '$finid' and Yarn_Sales_Accref_Seqno = 0 and CONCAT('HTY',yarn_sales_no,'/',fin_year,'/','TY')='$invno' and flag='T'
                Union
                select yarn_rewind_sales_no, fin_year, CONCAT('HOY',yarn_rewind_sales_no,'/',fin_year,'/','RY') as no,'RY' as sale_type,CONCAT('HOY',yarn_rewind_sales_no,'/',fin_year)  as invno  From
                kgdl.yarn_rewind_sales_header yrsh, kgdl.fin_master Where
                fin_id = yarn_rewind_sales_finid and yarn_rewind_sales_cust_code = '$custcode'
                and yarn_rewind_sales_finid = '$finid' and yarn_rewind_sales_accref_seqno = 0 and CONCAT('HOY',yarn_rewind_sales_no,'/',fin_year,'/','RY')='$invno'
                Union
                select yarn_waste_sales_no,fin_year,  CONCAT('HOY',yarn_waste_sales_no,'/',fin_year,'/','WY') as no,'WY' as sale_type,CONCAT('HOY',yarn_waste_sales_no,'/',fin_year)  as invno   from
                yarn_waste_sales_header ywsh, kgdl.fin_master Where
                fin_id = yarn_waste_sales_finid and yarn_waste_sales_cust_code = '$custcode'
                and yarn_waste_sales_finid = '$finid' and yarn_waste_sales_accref_seqno = 0 and CONCAT('HOY',yarn_waste_sales_no,'/',fin_year,'/','WY')='$invno'");
}else if($compcode==4){
    $r = mysql_query("select yarn_sales_no,fin_year,CONCAT('HSY',yarn_sales_no,'/',fin_year,'/','HS')  as no ,'HS'  as sale_type,CONCAT('HSY',yarn_sales_no,'/',fin_year)  as invno  from
                hometexkgdl.yarn_sales_header,kgdl.fin_master Where
                fin_id = Yarn_Sales_finid and Yarn_Sales_Cust_Code = '$custcode' and
                Yarn_Sales_finid= '$finid' and Yarn_Sales_Accref_Seqno = 0 and CONCAT('HSY',yarn_sales_no,'/',fin_year,'/','HS')='$invno' AND flag='S'
		union
		select yarn_sales_no,fin_year,CONCAT('KTY',yarn_sales_no,'/',fin_year,'/','TS')  as no ,'TS'  as sale_type,CONCAT('KTY',yarn_sales_no,'/',fin_year)  as invno  from
                hometexkgdl.yarn_sales_header,kgdl.fin_master Where
                fin_id = Yarn_Sales_finid and Yarn_Sales_Cust_Code = '$custcode' and
                Yarn_Sales_finid= '$finid' and Yarn_Sales_Accref_Seqno = 0 and CONCAT('KTY',yarn_sales_no,'/',fin_year,'/','TS')='$invno' AND flag='T'
                Union
                select yarn_rewind_sales_no, fin_year, CONCAT('HSY',yarn_rewind_sales_no,'/',fin_year,'/','HR') as no,'HR' as sale_type,CONCAT('HSY',yarn_rewind_sales_no,'/',fin_year)  as invno  From
                hometexkgdl.yarn_rewind_sales_header yrsh, kgdl.fin_master Where
                fin_id = yarn_rewind_sales_finid and yarn_rewind_sales_cust_code = '$custcode'
                and yarn_rewind_sales_finid = '$finid' and yarn_rewind_sales_accref_seqno = 0 and CONCAT('HOY',yarn_rewind_sales_no,'/',fin_year,'/','HR')='$invno'
                Union
                select yarn_waste_sales_no,fin_year,  CONCAT('HSY',yarn_waste_sales_no,'/',fin_year,'/','HW') as no,'HW' as sale_type,CONCAT('HSY',yarn_waste_sales_no,'/',fin_year)  as invno   from
                hometexkgdl.yarn_waste_sales_header ywsh, kgdl.fin_master Where
                fin_id = yarn_waste_sales_finid and yarn_waste_sales_cust_code = '$custcode'
                and yarn_waste_sales_finid = '$finid' and yarn_waste_sales_accref_seqno = 0 and CONCAT('HSY',yarn_waste_sales_no,'/',fin_year,'/','HW')='$invno'");
}
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getRecPaytransac() {
        $vocno=$_POST['vocno'];
        $ledcode=$_POST['ledcode'];
        $r = mysql_query("CALL acc_sp_trn_selrecpay_tran('$vocno','$ledcode');");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getAccountRefTrail() {
        $vocno=$_POST['vocno'];
        $r = mysql_query("CALL acc_sp_trn_selacc_trail('$vocno');");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getAccRefSeqno() {
        $vocno=$_POST['vocno'];
        $r = mysql_query("CALL acc_sp_trn_selacc_tran_seq_no('$vocno');");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getAccRef() {
        $vocno=$_POST['vocno'];
        $r = mysql_query("CALL acc_sp_trn_selacc_ref('$vocno');");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}


function getVocnoBank() {
    $compcode=$_POST['gincompany'];
    $finid=$_POST['ginfinid'];
    $PaymentType=$_POST['PaymentType'];
     if($PaymentType=="BANK PAYMENTS"){
        $r = mysql_query("CALL acc_sp_trn_selacc_ref_vouno('$compcode','$finid','BP','P%');");
     }
      else if($PaymentType=="CASH PAYMENTS"){
        $r = mysql_query("CALL acc_sp_trn_selacc_ref_vouno('$compcode','$finid','CP','P%');");
     }
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}


function getPrefixledcode() {
    $compcode=$_POST['gincompany'];
    $Accname=$_POST['Accname'];
    $r = mysql_query("CALL acc_sp_mas_selledger_master_prefix('$Accname','$compcode')");   
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getBankPayAccount() {
mysql_query("SET NAMES utf8");
     $compcode=$_POST['compcode'];
     $PaymentType=$_POST['PaymentType'];

    $r=mysql_query("select led_code, led_name from acc_ledger_master where led_grp_code = 26 and led_name like '%BANK%'");    
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getRecPayTran() {
       $accrefseqno=$_POST['accrefseqno'];
    $r = mysql_query("select
		a.*,b.recpay_amount,
		b.recpay_dncn_amount
	from 	acc_ob_billdetails a,acc_recpay_tran b
	where 	a.ob_seqno 		= 	b.recpay_oaccref_seqno and
		b.recpay_aaccref_seqno 	= 	'$accrefseqno'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getRecPay() {
       $accrefseqno=$_POST['accrefseqno'];
       $ledcode=$_POST['ledcode'];
    $r = mysql_query("select 	distinct acc_recpay_tran.*,
		acc_tran.acctran_led_code,
		acc_tran.acctran_dbamt,
		acc_tran.acctran_cramt,
		acc_tran.acctran_totamt,
		acc_ref.accref_vou_type,
		acc_ref.accref_vouno,
		acc_trail.acctrail_inv_value,
		acc_trail.acctrail_adj_value,
		accref_seqno
	from 	acc_ref,
		acc_tran,
		acc_trail,
		acc_recpay_tran
	where 	acc_ref.accref_seqno 		= 	acc_tran.acctran_accref_seqno and
		acc_tran.acctran_accref_seqno 	= 	acc_recpay_tran.recpay_oaccref_seqno and
		acc_ref.accref_seqno 			= 	acc_trail.acctrail_accref_seqno and
		acc_tran.acctran_accref_seqno	=	acc_trail.acctrail_accref_seqno and
		acc_tran.acctran_led_code		=	acc_trail.acctrail_led_code and
		acc_trail.acctrail_inv_no 		= 	acc_recpay_tran.recpay_ref_no and
		acc_recpay_tran.recpay_aaccref_seqno 	= 	'$accrefseqno' and
		acc_tran.acctran_led_code 		= 	'$ledcode'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getVocherNo() {
    $compcode=$_POST['gincompany'];
    $finid=$_POST['ginfinid'];
    $typere=$_POST['typere'];
     if($typere=="BANK RECEIPTS"){
    $r = mysql_query("select
		accref_seqno,
		accref_vouno
	from 	acc_ref
	where 	accref_vou_type = 	'BR' and
		accref_comp_code 	= 	'$compcode' and
		accref_finid 		= 	'$finid' and
		accref_vouno like 'R%'");
     }
     else if($typere=="CASH RECEIPTS"){
             $r = mysql_query("select
		accref_seqno,
		accref_vouno
	from 	acc_ref
	where 	accref_vou_type = 	'CR' and
		accref_comp_code 	= 	'$compcode' and
		accref_finid 		= 	'$finid' and
		accref_vouno like 'R%'");
      }
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}


function getledPrefix() {
   $compcode=$_POST['gincompany'];
    $ledcode=$_POST['ledcode'];
    $r = mysql_query("select
		led_prefix
	from
		kgdl.acc_ledger_master
	where
		led_code 		= '$ledcode' and
		led_comp_code 	= '$compcode'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getRefdetailsRefseqtrail() {
    $acctrailaccref_seqno=$_POST['acctrailaccref_seqno'];
    $r = mysql_query("select * from acc_trail
	where 	acctrail_accref_seqno = '$acctrailaccref_seqno'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getRefdetailsRefseq() {
    $acctranaccref_seqno=$_POST['acctranaccref_seqno'];
    $r = mysql_query("select
		acc_tran.*,
		kgdl.acc_ledger_master.led_name
	from 	acc_ref,acc_tran,kgdl.acc_ledger_master
	where	accref_seqno		=	acctran_accref_seqno and
		acctran_accref_seqno 	= 	'$acctranaccref_seqno'  and
             	acctran_led_code 	= 	kgdl.acc_ledger_master.led_code and
		accref_comp_code	=	kgdl.acc_ledger_master.led_comp_code
	order by  acctran_serialno");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getRefdetails() {
    $accrefseqno=$_POST['accrefseqno'];
    $r = mysql_query("select * from acc_ref
	where  accref_seqno	=	'$accrefseqno'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getReceipttype() {
    $compcode=$_POST['compcode'];
    $typerecep=$_POST['typerecep'];
    if($typerecep=='BANK RECEIPTS'){
    $r = mysql_query("select
                led_code, led_name
            from
                acc_ledger_master
            where
                led_grp_code  in  (20,22,23,24,25,90,21,91,92,93,94,95,96,102,182)
                    and led_comp_code = '1' and led_status ='Y' and led_duplicate='N'");
    }   
else if($typerecep=='CASH RECEIPTS'){
     $r = mysql_query("select
                led_code, led_name
            from
                acc_ledger_master
            where
                led_comp_code = '$compcode'
                and led_grp_code in ('26')");
    
    }   
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getBankName(){
	mysql_query("SET NAMES utf8");
    $compcode=$_POST['gincompany'];
    $r = mysql_query("select
    led_code, led_name
from
    acc_ledger_master
where
    led_prefix like '%CC%'
        and led_comp_code = '$compcode'
union select
    led_code, led_name
from
    acc_ledger_master
where
    led_grp_code = 95 and led_comp_code = '$compcode'");
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
		led_comp_code 	= '$compcode' and led_status ='Y'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getAdjustDetails() {
    $ledcode=$_POST['ledcode'];
    $compcode=$_POST['gincompany'];
    $seqno=$_POST['seqno'];
if($compcode==1){
    $r = mysql_query("select
    a_trail . *, a_tran . *, a_ref . *
from
    acc_ref a_ref,
    acc_tran a_tran,
    acc_trail a_trail,
    acc_ledger_master a_led
where
    a_ref.accref_vou_type in ('SE')
        and a_ref.accref_seqno = a_tran.acctran_accref_seqno
        and a_ref.accref_seqno = a_trail.acctrail_accref_seqno
        and a_tran.acctran_accref_seqno = a_trail.acctrail_accref_seqno
        and a_tran.acctran_led_code = a_trail.acctrail_led_code
        and a_tran.acctran_led_code = a_led.led_code
        and a_ref.accref_comp_code = a_led.led_comp_code
        and a_tran.acctran_dbamt > 0
        and (a_ref.accref_vou_type <> ('BD')
        or a_ref.accref_vou_type is null)
        and a_trail.acctrail_adj_value <= 0
        and a_tran.acctran_led_code = '$ledcode'
        and a_ref.accref_comp_code = '$compcode'
        and a_trail.acctrail_accref_seqno in ('$seqno')");
}
if($compcode==4){
    $r = mysql_query("select
    a_trail . *, a_tran . *, a_ref . *
from
    acc_ref a_ref,
    acc_tran a_tran,
    acc_trail a_trail,
    acc_ledger_master a_led
where
    a_ref.accref_vou_type in ('SB')
        and a_ref.accref_seqno = a_tran.acctran_accref_seqno
        and a_ref.accref_seqno = a_trail.acctrail_accref_seqno
        and a_tran.acctran_accref_seqno = a_trail.acctrail_accref_seqno
        and a_tran.acctran_led_code = a_trail.acctrail_led_code
        and a_tran.acctran_led_code = a_led.led_code
        and a_ref.accref_comp_code = a_led.led_comp_code
        and a_tran.acctran_dbamt > 0
        and (a_ref.accref_vou_type <> ('BD')
        or a_ref.accref_vou_type is null)
        and a_trail.acctrail_adj_value <= 0
        and a_tran.acctran_led_code = '$ledcode'
        and a_ref.accref_comp_code = '$compcode'
        and a_trail.acctrail_accref_seqno in ('$seqno')");
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
    $accrefcomp_code=$_POST['gincompany'];
if($accrefcomp_code==1){
    $r = mysql_query("select
			a_trail.acctrail_accref_seqno,
			a_trail.acctrail_inv_no
		from 	acc_ref a_ref,
			acc_tran a_tran,
			acc_trail a_trail,
				kgdl.acc_ledger_master a_led
		where 	a_ref.accref_vou_type in ('SE') and
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
if($accrefcomp_code==4){
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
if($comp_code==1){
    $r = mysql_query("select
			bk.*,
			cn.*
		from    expo_cinv_header cn,
			expo_bank_details bk
		where  	cn.cinv_seqno 			= 	bk.bank_cinv_seqno and
			bk.bank_discnt_accref_seqno 	= 	'$bank_discnt_vouno';");
}
if($comp_code==4){
    $r = mysql_query("select
			bk.*,
			cn.*
		from    dfd.expofabcinvheader cn,
			dfd.expofabbankdetails bk
		where  	cn.CinvSeqno 			= 	bk.BankCinvSeqno and
			bk.BankDiscntAccrefSeqno 	= 	'$bank_discnt_vouno';");
}
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}


function getAccDetails() {
    $accrefseqno=$_POST['accrefseqno'];
    $accrefcomp_code=$_POST['gincompany'];
    $accreffinid=$_POST['ginfinid'];
    $r = mysql_query("select
			accref_seqno,
			accref_vouno,
			a_ref.*,
			a_tran.*
		from 	acc_ref a_ref,
				acc_tran a_tran,
				kgdl.acc_ledger_master a_led
		where 	a_ref.accref_vou_type 	=	'BP' and
			a_ref.accref_seqno			= 	a_tran.acctran_accref_seqno and
			a_ref.accref_comp_code		=	a_led.led_comp_code and
			a_ref.accref_comp_code		=	'$accrefcomp_code' and
			a_ref.accref_finid		=	'$accreffinid' and
			a_ref.accref_seqno		=	'$accrefseqno' and
			a_ref.accref_vouno like CONCAT(a_led.led_prefix , 'P%')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getHeadAccount() {
    $pst_grpcode1=$_POST['pst_grpcode1'];
    $compcode=$_POST['gincompany'];
    $r = mysql_query("select
    led_code, led_name
from
    acc_ledger_master
where
    led_comp_code = '1'
        and led_grp_code in ('22','23','24','25','91','92','93','94','95','96','102') and led_status ='Y' ");
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
    $r = mysql_query("select
            accref_seqno,
            accref_vouno
        from     acc_ref a_ref,
            acc_tran a_tran,
                kgdl.acc_ledger_master a_led
        where     a_ref.accref_vou_type in ('BP','CP') and
            a_ref.accref_seqno    =     a_tran.acctran_accref_seqno and
            a_tran.acctran_led_code    =    a_led.led_code and
            a_ref.accref_comp_code    =    a_led.led_comp_code and
            a_tran.acctran_led_code    =    '$acctranled_code' and
            a_ref.accref_comp_code    =    '$compcode' and
            a_ref.accref_finid    =    '$finid' and
            a_ref.accref_vouno like CONCAT(a_led.led_prefix,'P%');");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function FindSubgroup($gcode){
    $grpcode = $gcode;
    $compcode=$_POST['gincompcode'];
    $pst_grpcode = $grpcode;
    $pst_grpcode1 = $grpcode;
    $cnt=1;
    do
    {
        $r=mysql_query("select grp_code,grp_name from acc_group_master where grp_parent_code in (".$pst_grpcode1.") and grp_comp_code = ".$compcode.";");
        $nrow = mysql_num_rows($r);
        $cnt=$nrow;
        $pst_grpcode1 = "";
        while($re = mysql_fetch_array($r))
        {
            $pst_grpcode1 = $pst_grpcode1.",".$re['grp_code'];
        }
        $pst_grpcode1 = substr($pst_grpcode1, 1);
        if ($pst_grpcode1!=""){
            $pst_grpcode = $pst_grpcode.",".$pst_grpcode1;
        }
        //$pst_grpcode = $pst_grpcode.",".$pst_grpcode1;
    }while ($cnt>0);
    return $pst_grpcode;

}
    
function getAccountPartyName() {
  mysql_query("SET NAMES utf8");  
    $compcode=$_POST['compcode'];
    $grpcode=$_POST['grpcode'];
    $pstgrpcode = FindSubgroup($grpcode);//43,168,169,170,171,172,204
    $r = mysql_query("select led_code,led_name from acc_ledger_master where led_comp_code = ".$compcode." and led_grp_code not in (43,168,169,170,171,172,204) and led_status='Y' and led_duplicate='N'");


    $r = mysql_query("select led_code,led_name from acc_ledger_master where led_grp_code not in (126)");



    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
    //echo '({"total":"' . $pstgrpcode . '","results":' . $jsonresult . '})';
}

function getDbcrvalue() {
    $invno=$_POST['invno'];
    $ledcode=$_POST['ledcode'];
    $finid=$_POST['ginfinid'];
    $compcode=$_POST['gincompany'];
    $prefix=$_POST['prefix'];
    if($prefix=='F'){
    $r = mysql_query("select
            dbcr_no, dbcr_type, sum(dbcr_value) as dbcr_value
        from
            acc_dbcrnote_header a,
            acc_dbcrnote_trailer b
        where
            b.dbcr_inv_no = '$invno'
                and a.dbcr_seqno = b.dbcr_seqno
                and a.dbcr_inv_ledcode = '$ledcode'
                and a.dbcr_finid = '$finid'
                and a.dbcr_comp_code = '$compcode'
        group by dbcr_no , dbcr_type;");
    }else{
        $r = mysql_query("select
    dbcr_no, dbcr_type, dbcr_value as dbcr_value
from
    acc_dbcrnote_header a,
    acc_dbcrnote_trailer b
where
    b.dbcr_inv_no = '$invno'
        and a.dbcr_seqno = b.dbcr_seqno
        and a.dbcr_inv_ledcode = '$ledcode'
        and a.dbcr_finid = '$finid'
        and a.dbcr_comp_code = '$compcode'");
    }
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getStoreDetailsMinTrail() {
    $minseqno=$_POST['minseqno'];
    $r = mysql_query("select
			t.*,
			i.item_name,
			u.unit_prefix,
			sg.itemsubgroup_name
		from
			kgdl.stores_min_trailer t,
			kgdl.stores_item_master i,
			kgdl.unit_master u,
			kgdl.stores_itemsubgroup_master sg
		where	t.min_seqno		=	'$minseqno' and
			min_item_code		=	item_code and
			item_unit_id 		= 	unit_id and
			sg.itemsubgroup_code 	= 	i.item_subgroup_code;");
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
    $r = mysql_query("select
			h.*,
			vendor_name
		from 	kgdl.stores_min_header h,
			kgdl.stores_vendor_master v
		where 	min_seqno	=	'$minseqno' and
			min_vendor_code = 	vendor_code;");
 
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
    $r = mysql_query("select
		distinct purinv_min_seqno
	from 	kgdl.stores_purinv_trailer
	where 	purinv_seqno	=	'$invseqno'
	order by purinv_min_seqno");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getStorePurchase() {
    $invseqno=$_POST['invseqno'];
    $r = mysql_query("select
       *
      from
		kgdl.stores_purinv_header
	where
          purinv_seqno	=	'$invseqno'");
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
		led_comp_code 	= '$compcode'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}


function getGroup() {
    $comp_code=$_POST['gincompany'];
  if($comp_code==6){
    $r = mysql_query("select
    led_code , led_name
from
    acc_ledger_master
where
    led_comp_code = '$comp_code'
        and led_grp_code in ('117')");
}else{
     $r = mysql_query("select
    led_code, led_name
from
    acc_ledger_master
where
    led_comp_code = '$comp_code'
        and led_grp_code in (117,105,106,157)");
}
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getpartyledger() {
    $compcode=$_POST['gincompany'];
    $prefix=$_POST['prefix'];
    $vendorcode=$_POST['vendorcode'];
    if($prefix=='S'){
    $r = mysql_query("select
		vendor_code,
		vendor_name,
		vendor_led_code 'led_code'
	from 	stores_vendor_master
	where 	vendor_code 		= 	'$vendorcode' 	and
		vendor_company_code 	=	'$compcode' 	and
		Vendor_Active		=	'Y';");
    }
     if($prefix=='Y'){
    $r = mysql_query("select mill_code as vendor_code, mill_name as vendor_name,mill_led_code 'led_code'
	from mill_master where
	mill_code = '$vendorcode'   and
	mill_active = 'Y';");
    }
    if($prefix=='C'){
    $r = mysql_query("select
		lnk_lnkcode  as vendor_code
	from 	link_trailer
	where 	lnk_millcode 	= 	'$vendorcode'; ");
    }
    if($prefix=='F'){
    $r = mysql_query("select
		fab_sup_code as vendor_code,
		fab_supname as vendor_name,
		fab_sup_led_code 'led_code'
	from 	dfd.fab_supplier_master
	where 	fab_sup_code 		= 	'$vendorcode' 	and
		fab_status		=	'Y';");
    }
      if($prefix=='B'){
    $r = mysql_query("select
		led_code  as vendor_code
	from 	kgdl.stores_link_master
	where 	vendor_code 	= 	'$vendorcode' 	and
		Led_comp_code	=	'$compCode';	");
    }
      if($prefix=='M'){
    $r = mysql_query("select
		vendor_code,
		vendor_name,
		vendor_led_code 'led_code'
	from 	stores_vendor_master
	where 	vendor_code 		= 	'$vendorcode' 	and
		vendor_company_code 	=	6	and
		Vendor_Active		=	'Y';");
    }
      if($prefix=='W'){
    $r = mysql_query("select
		vendor_code,
		vendor_name,
		vendor_led_code 'led_code'
	from 	stores_vendor_master
	where 	vendor_code 		= 	'$vendorcode' 	and
		vendor_company_code 	=	'$compcode'	    and
		Vendor_Active		=	'Y'; ");
    }
     if($prefix=='Z'){
    $r = mysql_query("select
		vendor_code,
		vendor_name,
		vendor_led_code 'led_code'
	from 	stores_vendor_master
	where 	vendor_code 		= 	'$vendorcode' 	and
		vendor_company_code 	=	6	    and
		Vendor_Active		=	'Y'");
    }
        if($prefix=='T'){
    $r = mysql_query("select
		fabsupcode as vendor_code,
		fabsupname as vendor_name,
		fabsupledcode 'led_code'
	from 	dfd.hometexsuppliermaster
	where 	fabsupcode 		= 	'$vendorcode' 	and
		fabstatus		=	'Y';");
    }
      if($prefix=='K'){
    $r = mysql_query("select
		fab_sup_code as vendor_code,
		fab_supname as vendor_name,
		fab_sup_led_code 'led_code'
	from 	dfd.fab_supplier_master
	where 	fab_sup_code 		= 	'$vendorcode' 	and
		fab_status		=	'Y';");
    }
      if($prefix=='D'){
    $r = mysql_query("select
		cust_seq_no as vendor_code,
		cust_name as vendor_name,
		cust_led_code 'led_code'
	from 	kgdl.trigger_sales_customer_master
	where 	cust_seq_no 		= 	'$vendorcode' 	and
		cust_active		=	'Y';");
    }
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getInvoiceNo() {
    $companycode=$_POST['gincompany'];
    $finid=$_POST['ginfinid'];
    $prefix=$_POST['prefix'];
    $vendorcode=$_POST['vendorcode'];
    if($prefix=='S'){
    $r = mysql_query("select
		purinv_seqno,
		purinv_party_invno
	from 	kgdl.stores_purinv_header
	where 	purinv_account_flag	in('N','P','D') and
		purinv_accref_seqno 	= 	0 and
		purinv_vendor_code 		= 	'$vendorcode' and
		purinv_company_code 	= 	'$companycode' and
		purinv_finid 		= 	'$finid'
order by purinv_party_invno;");
    }
     if($prefix=='A'){
    $r = mysql_query(" select
		purinv_seqno,
		purinv_party_invno
	from 	kgdl.htstorespurinvheader
	where 	purinv_account_flag	in('N','P','D') and
		purinv_accref_seqno 	= 	0 and
		purinv_vendor_code 		= 	'$vendorcode' and
		purinv_company_code 	= 	'$companycode' and
		purinv_finid 			= 	'$finid'
	order by purinv_party_invno;");
    }
    if($prefix=='N'){
    $r = mysql_query("select
		Yarn_Inv_seqno AS purinv_seqno,
		Yarn_Inv_mill_Invoiceno  as purinv_party_invno
	from 	kgdl.yarn_invoice_header
	where 	Yarn_Inv_accref_seqno 	=	0 and
		Yarn_Inv_millcode 	=	'$vendorcode' and
		Yarn_Inv_finid		=	'$finid'
	order by Yarn_Inv_No;");
    }
    if($prefix=='F'){
    $r = mysql_query("select
		purinv_seqno,
		purinv_party_invno
	from 	dfd.fab_purinv_header
	where 	purinv_account_flag	<>	'Y' and
		purinv_accref_seqno 	= 	0 and
		purinv_vendor_code 	= 	'$vendorcode' and
		purinv_company_code 	= 	'$companycode' and
		purinv_finid 		= 	'$finid'
	order by purinv_party_invno;");
    }
      if($prefix=='B'){
    $r = mysql_query("select
		purinv_seqno,
		purinv_party_invno
	from 	kgdl.stores_purinv_header
	where 	purinv_account_flag	<>	'Y' and
		purinv_accref_seqno 	= 	0 and
		purinv_vendor_code 	= 	'$vendorcode' and
		purinv_company_code 	= 	7 and
		purinv_finid 		= 	'$finid'
	order by purinv_party_invno;");
    }
      if($prefix=='M'){
    $r = mysql_query("select
		a.purinv_seqno,
		a.purinv_party_invno
	from 	kgdl.stores_purinv_header a,
            kgdl.stores_min_header  b
	where 	a.purinv_account_flag	in('N','P','D') and
		a.purinv_accref_seqno 	= 	0 and
        a.purinv_seqno=b.min_purinv_seqno and
        b.min_grossvalue >0 and
		a.purinv_vendor_code 	= 	'$vendorcode' and
		a.purinv_company_code 	= 	6 and
		a.purinv_finid 		= 	'$finid'
	order by a.purinv_party_invno;");
    }
      if($prefix=='W'){
    $r = mysql_query(" select
     distinct Womin_seqno AS purinv_seqno,
     Womin_billno AS purinv_party_invno
   from
      kgdl.stores_womin_header
  where
    Womin_accref_seqno  =  0               and
    Womin_vendor_code   =  '$vendorcode'    and
    Womin_company_code  =  '$companycode'   and
    Womin_finid         =  '$finid'          and
    Womin_status        <> 'K';  ");
    }
     if($prefix=='Z'){
    $r = mysql_query(" select
     distinct Womin_seqno AS purinv_seqno,
     Womin_billno AS purinv_party_invno
   from
      kgdl.htstoreswominheader
  where
    Womin_accref_seqno  =  0               and
    Womin_vendor_code   =  '$vendorcode'    and
    Womin_company_code  =  '$companycode'   and
    Womin_finid         =  '$finid'          and
    Womin_status        <> 'K'
order by Womin_billno;");
    }
       if($prefix=='X'){
    $r = mysql_query("select
    distinct Womin_seqno AS purinv_seqno,
     Womin_billno AS purinv_party_invno
   from
      kgdl.stores_womin_header
  where
    Womin_accref_seqno  =  0               and
    Womin_vendor_code   =  '$vendorcode'    and
    Womin_company_code  =  6               and
    Womin_finid         =  '$finid'          and
    Womin_status        <>'K'
order by Womin_billno;");
    }
        if($prefix=='T'){
    $r = mysql_query("select
		purinvseqno as purinv_seqno,
		purinvpartyinvno as purinv_party_invno
	from 	dfd.hometexpurinvheader
	where 	purinvaccountflag	<>	'Y' and
		purinvaccrefseqno 	= 	0 and
		purinvvendorcode 	= 	'$vendorcode' and
		purinvcompanycode 	= 	'$companycode' and
		purinvfinid 		= 	'$finid'
	order by purinvpartyinvno;");
    }
      if($prefix=='K'){
    $r = mysql_query("select
		Seqno AS purinv_seqno,
		Partyinvno AS purinv_party_invno
	from 	dfd.fibrepurinvheader
	where
        Accountflag	<>	'Y' and
		Accrefseqno 	= 	0 and
		SupplierCode 	= 	'$$vendorcode' and
		Companycode 	= 	'$$companycode' and
		Finid 		= 	'$finid'
	order by Partyinvno;");
    }
      if($prefix=='D'){
    $r = mysql_query("select
		inv_seqno AS purinv_seqno,
		inv_no AS purinv_party_invno
	from 	kgdl.sales_inv_header
	where
		inv_cust_seq_no 	= 	7307 and
		inv_finid 		= 	'$finid' and
        inv_partytransfer_type='P'
	order by inv_no;");
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
    $Finyear=$_POST['ginfinyear'];
    $prefix=$_POST['prefix'];
    if($prefix=='S'||$prefix=='A'){
    $r = mysql_query("select
					concat('PS',con_value) as con_value
				from 	control_master
				where 	con_module 	= 	'AC' and
					con_finyear 	= 	'$Finyear' and
					con_prefix	= 	'PS' and
					con_desc		=	'PURCHASE STORES' and con_company_code='$compcode'");
    }
      if($prefix=='Y'){
  $r = mysql_query("select
					concat('PY',con_value) as con_value
				from 	control_master
				where 	con_module 	= 	'AC' and
					con_finyear 	= 	'$Finyear' and
					con_prefix	= 	'PY' and
					con_desc		=	'PURCHASE YARN' and con_company_code='$compcode'");
    }
     if($prefix=='C'){
  $r = mysql_query("select
					concat('PC',con_value) as con_value
				from 	control_master
				where 	con_module 	= 	'AC' and
					con_finyear 	= 	'$Finyear' and
					con_prefix	= 	'PC' and
					con_desc		=	'PURCHASE COTTON' and con_company_code='$compcode'");
    }
      if($prefix=='F'){
 $r = mysql_query("select
					concat('PF',con_value) as con_value
				from 	control_master
				where 	con_module 	= 	'AC' and
					con_finyear 	= 	'$Finyear' and
					con_prefix	= 	'PF' and
					con_desc		=	'PURCHASE FABRIC' and con_company_code='$compcode'");
    }
      if($prefix=='B'){
   $r = mysql_query("select
					concat('PB',con_value) as con_value
				from 	control_master
				where 	con_module 	= 	'AC' and
					con_finyear 	= 	'$Finyear' and
					con_prefix	= 	'PB' and
					con_desc		=	'PURCHASE BONDEDWH' and con_company_code='$compcode'");
    }
      if($prefix=='M'){
   $r = mysql_query("select
					concat('PM',con_value) as con_value
				from 	control_master
				where 	con_module 	= 	'AC' and
					con_finyear 	= 	'$Finyear' and
					con_prefix	= 	'PM' and
					con_desc		=	'PURCHASE IFDMCH' and con_company_code='$compcode'");
    }
       if($prefix=='W'){
  $r = mysql_query("select
					concat('ES',con_value) as con_value
				from 	control_master
				where 	con_module 	= 	'AC' and
					con_finyear 	= 	'$Finyear' and
					con_prefix	= 	'ES' and
					con_desc		=	'LABOUR CHARGES' and con_company_code='$compcode'");
    }
     if($prefix=='X'){
  $r = mysql_query("select
					concat('ES',con_value) as con_value
				from 	control_master
				where 	con_module 	= 	'AC' and
					con_finyear 	= 	'$Finyear' and
					con_prefix	= 	'ES' and
					con_desc		=	'LABOUR CHARGESIFD' and con_company_code='$compcode'");
    }
       if($prefix=='T'){
  $r = mysql_query("select
					concat('PT',con_value) as con_value
				from 	control_master
				where 	con_module 	= 	'AC' and
					con_finyear 	= 	'$Finyear' and
					con_prefix	= 	'PT' and
					con_desc		=	'PURCHASE TERRY' and con_company_code='$compcode'");
    }
      if($prefix=='C'){
  $r = mysql_query("select
					concat('CY',con_value) as con_value
				from 	control_master
				where 	con_module 	= 	'AC' and
					con_finyear 	= 	'$Finyear' and
					con_prefix	= 	'CY' and
					con_desc		=	'CONVERSION YARN FIBRE' and con_company_code='$compcode'");
    }
     if($prefix=='D'){
   $r = mysql_query("select
					concat('TG',con_value) as con_value
				from 	control_master
				where 	con_module 	= 	'AC' and
					con_finyear 	= 	'$Finyear' and
					con_prefix	= 	'TG' and
					con_desc		=	'PURCHASE FABRIC TRIGGER' and con_company_code='$compcode'");
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
    if($prefix=='S'){
    $r = mysql_query("select vendor_code,vendor_name from kgdl.stores_vendor_master
		where vendor_company_code = '$comp_code'	and vendor_active='Y'
		order by vendor_name;");
    }
      if($prefix=='Y'){
    $r = mysql_query("select
			mill_code as vendor_code,
			mill_name as vendor_name
		from 	kgdl.mill_master
		order by mill_name;");
    }
     if($prefix=='CT'){
    $r = mysql_query("select g_parid as vendor_code ,par_name as vendor_name from party_master
	order by par_name");
    }
      if($prefix=='N'){
    $r = mysql_query("select
			mill_code as vendor_code,
			mill_name as vendor_name
		from 	kgdl.mill_master
		order by mill_name;");
    }
      if($prefix=='F'){
    $r = mysql_query("select
			fab_sup_code as vendor_code,
			fab_supname as vendor_name
		from 	dfd.fab_supplier_master
		where	fab_status='Y';");
    }
      if($prefix=='B'){
    $r = mysql_query("select vendor_code,vendor_name from kgdl.stores_vendor_master
		where vendor_company_code =7 and vendor_active='Y'
		order by vendor_name;");
    }
      if($prefix=='M'){
    $r = mysql_query("select vendor_code,vendor_name from kgdl.stores_vendor_master
		where vendor_company_code=6 and vendor_active='Y'
		order by vendor_name;");
    }
       if($prefix=='T'){
    $r = mysql_query("select
			fabsupcode as vendor_code,
			fabsupname as vendor_name
		from 	dfd.hometexsuppliermaster
		where	fabstatus='Y';");
    }
       if($prefix=='K'){
    $r = mysql_query("select
			fab_sup_code as vendor_code,
			fab_supname as vendor_name
		from 	dfd.fab_supplier_master
		where	fab_status='Y';");
    }
      if($prefix=='C'){
    $r = mysql_query("select
			vendorcode as vendor_code,
			vendorname as vendor_name
		from 	dfd.vendormaster
		where	Vendorstatus='Y';");
    }
     if($prefix=='D'){
    $r = mysql_query("select
			cust_seq_no as vendor_code,
			 cust_name as vendor_name
		from 	kgdl.trigger_sales_customer_master
		where	cust_active='Y' and
                cust_seq_no=7373;");
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
    $compcode=$_POST['gincompany'];
    $finyear=$_POST['ginfinid'];
    $bill=$_POST['bill'];
    if($bill==true){
    $r = mysql_query("select * from kgdl.acc_ledger_master
	where 	led_comp_code = '$compcode' and
		led_status='Y' and
		led_duplicate = 'N'");
    }else{
          if($bill==false){
      $r = mysql_query("call acc_sp_mas_selledgergrpdetails('$compcode','$finyear')");
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
    $r = mysql_query("select
		x.accref_seqno,
		x.acctrail_inv_no,
		x.acctrail_inv_date,
		x.acctran_totamt
	from (
		select * from acc_tran atrn,acc_trail atrl, acc_ref acrf
	 	where 	acrf.accref_comp_code 	= 	'$compcode' and
			acrf.accref_finid 		in ('$finyear') and
			atrl.acctrail_accref_seqno 	= 	atrn.acctran_accref_seqno and
			acrf.accref_seqno 		= 	atrl.acctrail_accref_seqno) x,
		(
		select
			led_code as ledgercode,
			led_comp_code as compcode
		from 	kgdl.acc_ledger_master
 		where 	led_name like '$ledgername') y
	where 	x.accref_vou_type in ('SE','SD','SL','SW','SY') and
		x.acctran_dbamt 	> 	0 and
		x.acctran_totamt 	> 	x.acctrail_adj_value and
		x.acctrail_inv_no not in
		(
			select
				atrl.acctrail_inv_no
			from 	acc_tran atrn,
				acc_trail atrl,
				acc_ref acrf
			where 	acrf.accref_comp_code 	= 	'$compcode' and
				acrf.accref_finid 		in ('$finyear')and
				acrf.accref_vou_type 		= 	'CN' and
				atrn.acctran_led_code 		= 	y.ledgercode and
				atrl.acctrail_accref_seqno 	= 	atrn.acctran_accref_seqno and
				acrf.accref_seqno 		= 	atrl.acctrail_accref_seqno
			) and
      		x.acctran_led_code 		= 	y.ledgercode	and
		x.accref_comp_code 		= 	y.compcode");
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
    $finyear=$_POST['ginfinid'];
    $invoiceno=$_POST['invoiceno'];
    $ledgercode=$_POST['ledgercode'];
    $compcode=$_POST['gincompany'];
    $r = mysql_query("select
		atrl.acctrail_inv_date,
		atrn.acctran_totamt
	from 	acc_tran atrn,
		acc_trail atrl,
		acc_ref acrf
	where 	acrf.accref_comp_code 	= 	'1' and
		acrf.accref_finid 		in ('22') and
		atrl.acctrail_inv_no 		= 	'$invoiceno' and
		atrn.acctran_led_code 		= 	'$ledgercode' and
		atrl.acctrail_accref_seqno 	= 	atrn.acctran_accref_seqno and
		acrf.accref_seqno 		= 	atrl.acctrail_accref_seqno");
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
    $ginfinyear=$_POST['ginfinyear'];
    $r = mysql_query("select
					con_value
				from 	control_master
				where 	con_module 	= 	'AC' and
					con_finyear 	= 	'$ginfinyear' and
					con_prefix	= 	'CN' and
					con_desc		=	'ACC_CREDIT_NOTE'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getCurrentFinyearDetail() {
    $today = date("d-m-Y"); 
    //$today = "01-04-2016"; 
    $month = date("m",strtotime($today));
    if ($month > 3){
        $finyear = substr($today, 6,4)."-".(substr($today, 6,4)+1);
    }else{
        $finyear = (substr($today, 6,4)-1)."-".substr($today, 6,4);
    }
    $r = mysql_query("select * from fin_master where fin_year = '$finyear'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
    //echo 'date:'.$today.','.$finyear.',month:'.$month;
}

function getdrcrledgers() {
    $r = mysql_query("select led_code, led_name from  acc_ledger_master where led_type <> 'G'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';

    }  


function getdtrailseqno() {
    $ledcode=$_POST['ledcode'];

    $r = mysql_query("select acctrail_accref_seqno from acc_trail where acctrail_led_code = '$ledcode'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';

    }  


function gettrailseqno() {
    $ledcode=$_POST['ledcode'];
    $outtype =$_POST['outtype'];

    if ($outtype == "P")
    {$r = mysql_query("select acctrail_accref_seqno from acc_trail where acctrail_led_code = '$ledcode' and acctrail_inv_value > acctrail_adj_value");}
    else
    {
    $r = mysql_query("select acctrail_accref_seqno from acc_trail where acctrail_led_code = '$ledcode'");}

    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';

    }  

function gettrailseqnodetail() {
    $ledcode =$_POST['ledcode'];
    $seqno   =$_POST['seqno'];

 
    $r = mysql_query("select * from acc_trail where acctrail_led_code = '$ledcode' and acctrail_accref_seqno = '$seqno'");

  
  $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';

    }  
    
    
 /*       function getloadparty() {
    $partytype=$_POST['partytype'];
    
    if($partytype == 'A')
    {
    $r = mysql_query("select cust_led_code as partyid,  concat('PR','-',cust_ref) as partyname from vew_sal_agent
union 
select cust_led_code as partyid,  concat('CU','-',cust_ref) as partyname from massal_customer");
    }
    else if($partytype == 'PR')
    {
    $r = mysql_query("select cust_led_code as partyid,  concat('CU','-',cust_ref) as partyname from massal_customer");
    }
    else if($partytype == 'AG')
    {
    $r = mysql_query("select cust_led_code as partyid,  concat('PR','-',cust_ref) as partyname from vew_sal_agent");
    }
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}*/
    
  /*  function getVouNo() {
    $comp=$_POST['comp'];
    $finid=$_POST['finid'];
    $vouno=$_POST['vouno'];
    $r = mysql_query("select a.*,DATE_FORMAT(accref_voudate,'%Y-%m-%d') as accref_voudate1,DATE_FORMAT(accref_payref_date,'%Y-%m-%d') as accref_payref_date1 from acc_ref a where a.accref_comp_code= $comp and a.accref_finid= $finid and a.accref_vouno='$vouno'");


    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}*/



?>
