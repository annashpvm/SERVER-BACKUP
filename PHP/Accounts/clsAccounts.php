<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='LedgerNewEdit';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
     mysql_query("SET NAMES utf8");
    switch($task){
        case "CheckNoValidate":
        getCheckNoValidate();
        break;
        case "cmbpgroup":             // Give the entire list
            getParentGroupMaster();
        case "cmbSelGroup":              // Give the entire list
            getSelGroup();
            break;
        case "getgroupcode";
            GetMaxGroupCode();
            break;

        case "LedCodeLedger":
            getLedCodeLedger();
             break;
    case "GeneralLedger":
        getGeneralLedger();
        break;

    case "LedLedgerDetail":
        getLedgerDetail();
        break;

    case "findGroupName":
        getfindGroupName();
        break;

    case "Partyname":
        getPartyname();
        break;

    case "ControlDebitNo":
        getControlDebitNo();
        break;
    case "ControlDebitNo2":
        getControlDebitNo2();
        break;

    case "InvDetails2":
        getInvDetails2();
        break;
    case "cmbInvNo":
        getInvNo();
        break;
    case "Address":
        getAddress();
        break;


    case "cmbDnInvNo":
        getDebitInvNo();
        break;

    case "LedLedgerName":
        getLedLedgerName();
        break;

        case "loadledger_type_name":             // Give the entire list
            getledger_type_Name();
            break;


    case "LoadAllLedgerList":
        getAllLedgerList();
        break;

        case "cmbvoucher":             // Give the entire list
            getVoucherNumber();
            break;

        case "getvouno":             // Give the entire list
            getVouNo();
            break;


        case "LoadLastVouNo":             // Give the entire list
            getLastVouNo();
            break;
        case "cmbbankacct":             // Give the entire list
            getHeadBankAccountName();
            break;
        case "cmbcashacct":             // Give the entire list
            getHeadCashAccountName();
            break;

        case "getrcptadjbilldet":             // Give the entire list
            getReceiptBillsDetailtoAdjust();
            break;

        case "getobadjbilldet":             // Give the entire list
            getOpeningBillsDetailtoAdjust();
            break;

    case "VoucherType":
        getVoucherType();
        break;

		case "LoadVoucherDetails":
		getVoucherDetail();
		break;
    case "loadpayableparty":
        getloadpayableparty();
        break;

    case "CurBalance":
        getCurBalance();
        break;
    case "PaymentBilldetails":
        getPaymentBilldetails();
        break;
        case "getpayadjbilldet":             // Give the entire list
            getPaymentBillsDetailtoAdjust();
            break;

        case "cmbadjvoucher":
             getBillAdjustmentVouchers();
            break;

        case "getunadjbilldet":
             getBillAdjustmentUnAdjustedBillDetail();
            break;
        case "getacctraildet":
             getBillAdjustmentVoucherDetail();
            break;
    case "LedgerNewEdit":
        getLedgerNewEdit();
        break;

       case "Approvecheck":
        getApprovecheck();
        break;
    case "LedAgs":
        getLedAgs();
        break;
    case "LoadControlExpensesNo":
        getControlExpensesNo();
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

    function getParentGroupMaster()
    {
        $compcode = $_POST['compcode'];
        //$grpparent=$_POST['grpparent'];
	$r=mysql_query("call acc_sp_mas_selgroup_master('$compcode');");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    

    function getSelGroup()
    {
        mysql_query("SET NAMES utf8");  
        $CompCode = $_POST['compcode'];
        $Group = $_POST['gstGroup'];
	$r=mysql_query("select grp_code,grp_name from acc_group_master where grp_comp_code = 1 and grp_name like '".$Group."'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    

    
    function GetMaxGroupCode()
    {
        $CompCode = $_POST['compcode'];
        $r=mysql_query("select ifnull(max(grp_code),0)+1 as con_value from acc_group_master where grp_comp_code = '$CompCode'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    
function getLedCodeLedger(){
    $r = mysql_query("select concat('L',ifnull(max(cust_code),0)+1) as cust_code from massal_customer");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}


function getgeneralLedger(){
    $r = mysql_query("select * from massal_customer where cust_type = 'G' order by cust_name");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}


function getLedgerDetail(){
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

  
function getfindGroupName(){
    $ledcode=$_POST['ledcode'];

//    $r = mysql_query("call acc_sp_mas_selgroup_master('$compcode')");

    $r = mysql_query("select * from massal_customer a,acc_group_master b where cust_acc_group = grp_code and cust_type = 'G' and cust_code = '$ledcode'");
    $r = mysql_query("select * from massal_customer a,acc_group_master b where cust_acc_group = grp_code and cust_code = '$ledcode'");

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

    if($bill==true){
    $r = mysql_query("select cust_code, cust_name from massal_customer where cust_type <> 'G' order by cust_name");
    }else{
          if($bill==false){
      $r = mysql_query("select cust_code, cust_name from massal_customer order by cust_name");
          }
    }




    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}


    
    function getControlDebitNo() {
        $ginfinid= $_POST['ginfinid'];
        $gincompcode=$_POST['gincompcode'];
//        $r = mysql_query("select concat('DN',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
//            where  accref_comp_code ='$gincompcode' and accref_finid = '$ginfinid' and accref_vouno like 'DN%'");
$r = mysql_query("select concat('DNG',ifnull(max(dbcr_no),0) + 1) as accref_vouno from acc_dbcrnote_header where dbcr_type = 'DNG' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");

        $nrow = mysql_num_rows($r);
        while ($re = mysql_fetch_array($r)) {
            $arr[] = $re;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
    }

    function getControlDebitNo2() {
        $ginfinid= $_POST['ginfinid'];
        $gincompcode=$_POST['gincompcode'];
//        $r = mysql_query("select concat('DN',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref
//            where  accref_comp_code ='$gincompcode' and accref_finid = '$ginfinid' and accref_vouno like 'DN%'");
$r = mysql_query("select concat('DNN',ifnull(max(dbcr_no),0) + 1) as accref_vouno from acc_dbcrnote_header where dbcr_type = 'DNN' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");

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
  acctrail_inv_value,  
  acctrail_inv_value-acctrail_adj_value as balanceamt,  
  acctrail_adj_value,
  acctrail_crdays,accref_vouno       
 from  acc_trail,  
  acc_tran,  
  acc_ref  
 where  acc_ref.accref_seqno   =  acc_tran.acctran_accref_seqno and  
  acc_tran.acctran_accref_seqno  =  acc_trail.acctrail_accref_seqno and   
  acc_tran.acctran_led_code = acc_trail.acctrail_led_code and  
  acc_trail.acctrail_accref_seqno =  acc_ref.accref_seqno and   
  acc_ref.accref_comp_code  =  '$compcode' and  
  acc_ref.accref_finid   =  '$finyear' and  
  acc_ref.accref_vou_type in ('GSI','DNG','DNN') and  
  acc_tran.acctran_led_code  = '$ledgercode'  and  
  acc_trail.acctrail_accref_seqno =   '$invoiceno'");

    $r = mysql_query("select    
  acctrail_accref_seqno,  
  acctrail_inv_no,  
  accref_vou_type,  
  acctrail_inv_date,  
  acctrail_inv_value,  
  acctrail_inv_value-acctrail_adj_value as balanceamt,  
  acctrail_adj_value,
  acctrail_crdays,accref_vouno       
 from  acc_trail,  
  acc_tran,  
  acc_ref  
 where  acc_ref.accref_seqno   =  acc_tran.acctran_accref_seqno and  
  acc_tran.acctran_accref_seqno  =  acc_trail.acctrail_accref_seqno and   
  acc_tran.acctran_led_code = acc_trail.acctrail_led_code and  
  acc_trail.acctrail_accref_seqno =  acc_ref.accref_seqno and   
  acc_ref.accref_comp_code  =  '$compcode' and  
  acc_ref.accref_finid   <=  '$finyear' and  
  acc_ref.accref_vou_type in ('GSI','DNG','DNN','SDN') and  
  acc_tran.acctran_led_code  = '$ledgercode'  and  
  acc_trail.acctrail_accref_seqno =   '$invoiceno'");


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

function getAddress() {
    $ledcode=$_POST['ledcode'];
    $r = mysql_query("select
		cust_name,
		led_addr1,
		concat(led_addr2,
		led_city) as led_addr2
	from
		massal_customer
	where
		cust_code	=	'$ledcode'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}


    function getledger_type_Name()
    {
        mysql_query("SET NAMES utf8");
        $ledcode = $_POST['ledcode'];

             $r=mysql_query("select cust_code, cust_name,cust_type  from massal_customer where cust_code = $ledcode");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
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



    function getAllLedgerList()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select cust_code, cust_name,cust_type from massal_customer order by cust_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


    function getVoucherNumber()
    {
        $compcode = $_POST['compcode'];
        $finid=$_POST['finid'];
        $voutype=$_POST['voutype'];
	$r=mysql_query("call acc_sp_trn_selvoucher_no('$finid','$compcode','$voutype')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

    
    function getVouNo()
    {
	$finyear=$_POST['finyear'];
        $compcode=$_POST['compcode'];
        $r=mysql_query("select ifnull(max(convert(substring(accref_vouno,4),signed)),0) +1 as con_value from acc_ref where accref_vou_type = 'EXP' and accref_finid = '$finyear' and accref_comp_code = '$compcode';");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

    
    function getLastVouNo()
    {
	$finyear  =$_POST['finyear'];	
        $compcode =$_POST['compcode'];
        $voutype  =$_POST['voutype'];
        $r=mysql_query("select ifnull(max(convert(substring(accref_vouno,5),signed)),0) +1 as con_value from acc_ref where accref_vou_type = '$voutype' and accref_finid = '$finyear' and accref_comp_code = '$compcode';");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


    
    function getHeadBankAccountName()
    {
        $compcode = $_POST['compcode'];
        $finid=$_POST['finid'];
        

        $r=mysql_query("select cust_code, cust_name from massal_customer where cust_acc_group = 28 and cust_name like '%BANK%'");            
        $r=mysql_query("select cust_code, cust_name from massal_customer where cust_acc_group = 28 or cust_name like 'CITY UNION%' or cust_name like 'CUB LOAN%' or cust_name like 'CUB MACHIN%'  order by cust_name ");            

        $r=mysql_query("select cust_code, cust_name from massal_customer where cust_acc_group in (28,42)  order by cust_name ");  


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

    function getHeadCashAccountName()
    {
        $compcode = $_POST['compcode'];
        $finid    = $_POST['finid'];
        $r=mysql_query("select cust_code, cust_name from massal_customer where  cust_code = 2139 order by cust_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

    function getReceiptBillsDetailtoAdjust()
    {
	$finid=$_POST['finid'];
        $compcode=$_POST['compcode'];
        $ledcode=$_POST['ledcode'];
	$r=mysql_query("CALL acc_sp_trn_selacc_receipt_billdetails_new('$compcode','$finid','$ledcode')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
  

    
    function getOpeningBillsDetailtoAdjust()
    {
	$finid=$_POST['finid'];
        $compcode=$_POST['compcode'];
        $ledcode=$_POST['ledcode'];
	$r=mysql_query("CALL acc_sp_pendingBills('$compcode','$finid','$ledcode')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
      

    
    function getVoucherType(){
        $r=mysql_query("select distinct accref_vou_type as vchtype from acc_ref order by accref_vou_type");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
         
        
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

 function getVoucherDetail()

    {
  	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
       	$vouno    = $_POST['vouno'];

        mysql_query("SET NAMES utf8");
//        $r=mysql_query("select dbcr_vouno from acc_dbcrnote_header where dbcr_type = 'DNG' and dbcr_finid = '$fincode' and dbcr_comp_code = '$compcode' order by dbcr_vouno  desc");

$r=mysql_query("select * from acc_ref ref left join acc_tran tran on  tran.acctran_accref_seqno = ref.accref_seqno   left join massal_customer mas on  tran.acctran_led_code = mas.cust_code  where accref_vouno = '$vouno' and  accref_comp_code = $compcode and accref_finid = $fincode");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
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
        $r=mysql_query("select grp_code as partyid, grp_name as partyname from acc_group_master where grp_parent_code = 51 order by grp_name");
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
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

    function getPaymentBillsDetailtoAdjust()
    {
	$finid=$_POST['finid'];
        $compcode=$_POST['compcode'];
        $ledcode=$_POST['ledcode'];
//	$r=mysql_query("CALL acc_sp_trn_selacc_payment_billdetails_new('$compcode','$finid','$ledcode')");
	$r=mysql_query("CALL acc_sp_trn_selacc_payment_billdetails('$compcode','$finid','$ledcode')");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

    function getBillAdjustmentVouchers()
    {
        $partyname = $_POST['partyname'];
        $voutype = $_POST['voutype'];
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
        $opdate = "2001-08-31";
/*
        if ($voutype=='P'){
            $r=mysql_query("call acc_sp_trn_selbilladjustment_payment('$partyname','$compcode','$finid','$opdate','N');");
        }else if ($voutype=='R'){
            $r=mysql_query("call acc_sp_trn_selbilladjustment_receipt('$partyname','$compcode','$finid','$opdate','N');");
        }
*/
        if ($voutype=='P'){
            $r=mysql_query("call acc_sp_trn_selbilladjustment_payment('$partyname','$compcode')");
        }else if ($voutype=='R'){
            $r=mysql_query("call acc_sp_trn_selbilladjustment_receipt('$partyname','$compcode')");
        }
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    
    function getBillAdjustmentUnAdjustedBillDetail()
    {
        $voutype = $_POST['voutype'];
        $finid = $_POST['finid'];
        $compcode = $_POST['compcode'];

        $ledcode = $_POST['ledcode'];
        if ($voutype=='R'){
            $r=mysql_query("call acc_sp_trn_selacc_receipt_billdetails('$compcode','$finid','$ledcode');");

     //       $qry = "call acc_sp_trn_selacc_receipt_billdetails('$compcode','$finid','$ledcode')";

        }else{
            $r=mysql_query("call acc_sp_trn_selacc_payment_billdetails('$compcode','$finid','$ledcode');");
        }

//echo $qry;

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

    function getBillAdjustmentVoucherDetail()
    {
        $ledcode = $_POST['ledcode'];
        $accrefseq = $_POST['accrefseq'];

        $r=mysql_query("call acc_sp_trn_selaccref_acctrail_invvalue('$ledcode','$accrefseq');");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 
function getLedgerNewEdit() {
   $ledname=$_POST['ledname'];
   $compcode=$_POST['compcode'];
    
    $r = mysql_query("select cust_name,cust_code from massal_customer where cust_name like '$ledname'");



    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
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


    $r = mysql_query("SELECT COUNT(*) AS cnt FROM accounts_approve WHERE  approveseq = '$seqaccref'");


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
    /*$r = mysql_query("select cust_name,cust_code from massal_customer where led_comp_code='$compcode' and cust_name = '$ledname' and led_status<>'N'");*/
    
     $r = mysql_query("select cust_name,cust_code from massal_customer where  cust_name = '$ledname'");

    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}


    
    function getControlExpensesNo() {
        $ginfinid    = $_POST['fincode'];
        $gincompcode = $_POST['compcode'];

$r = mysql_query("select (ifnull(max(eh_expno),0) + 1) con_value  from acc_expenses_header where eh_compcode = $gincompcode and eh_fincode =  $ginfinid   ");

        $nrow = mysql_num_rows($r);
        while ($re = mysql_fetch_array($r)) {
            $arr[] = $re;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
    }
?>
