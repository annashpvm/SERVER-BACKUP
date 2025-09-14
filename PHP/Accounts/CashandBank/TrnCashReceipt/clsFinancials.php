<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='cmbcashacct';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){

	case "VoucherClosing":
		getVoucherClosing();
		break;
	case "DiscountReceipt":
		getDiscountReceipt();
		break;
	case "VoucherNoDetailDate";
	getVoucherNoDetailDate();
	break;
        case "cmbcurrency":             // Give the entire list
            getCurrency();
            break;
	
	case "cmbacctnamenew":             // Give the entire list
            getcmbacctnamenew();
            break;
        case "cmbacctname":             // Give the entire list
            getAccountName();
            break;

        case "cmbpartynamepayabNEW":             // Give the entire list
            getcmbpartynamepayabNEW();
            break;
        case "cmbpartynamepayab":             // Give the entire list
            getcmbpartynamepayab();
            break;
        case "cmbpartyname":             // Give the entire list
            getPartyName();
            break;
        case "cmbvoucher":             // Give the entire list
            getVoucherNumber();
            break;
        case "getvouno":             // Give the entire list
            getVouNo();
            break;
        case "getCtvouno":             // Give the entire list
            getContraVouNo();
            break;
        case "cmbjouledger":             // Give the entire list
            getJournalLedger();
            break;
        case "getJournalvouno":             // Give the entire list
            getJournalVouNo();
            break;
        case "getpayadjbilldet":             // Give the entire list
            getPaymentBillsDetailtoAdjust();
            break;
        case "cmbreggroup":             // Give the entire list
            getRegionalGroupName();
            break;
        case "cmbbankacct":             // Give the entire list
            getHeadBankAccountName();
            break;
        case "cmbcashacct":             // Give the entire list
            getHeadCashAccountName();
            break;
        case "cmbregrefno":             // Give the entire list
            getRegionalReceiptNo();
            break;
        case "getrefnodet":             // Give the entire list
            getRegionalReceiptNoDetail();
            break;
        case "ReceiptBillsDetailtoAdjustRegion":             // Give the entire list
            getReceiptBillsDetailtoAdjustRegion();
            break;
        case "getrcptadjbilldet":             // Give the entire list
            getReceiptBillsDetailtoAdjust();
            break;
        case "getobadjbilldet":             // Give the entire list
            getOpeningBillsDetailtoAdjust();
            break;
        case "getrefnobilldet":             // Give the entire list
            getRegionalReceiptNoBillDetail();
            break;
        case "cmbrcptvoucher":             // Give the entire list
            getReceiptVoucherNumber();
            break;
        case "subgroup":             // Give the entire list
            getLedger();
            break;
        case "cmbgroup":             // Give the entire list
            getGroupMaster();
            break;
        case "cmbpgroup":             // Give the entire list
            getParentGroupMaster();
            break;
        case "getsubgroup":             // Give the entire list
            getSubGroups();
            break;
        case "getgrpwisetotamt":             // Give the entire list
            getGroupwiseTotalAmount();
            break;
        case "BANKNAME":
            getbankname();
            break;
        case "cmbSelGroup":              // Give the entire list
            getSelGroup();
            break;
        case "getgroupcode";
            GetMaxGroupCode();
            break;
        case "COUNTRY":
            getcountry();
            break;
        case "BankDetails":
            getbankmaster();
            break;
        case "cmbBillRealInv":
             getBillRealExportInvno();
            break;
        case "getexpoinvdet":
             getExportInvoiceDetailforRealisation();
            break;
        case "cmbfinyear":
             getFinancialYear();
            break;
        case "cmbreversevoucher":
             getReversalVoucher();
            break;

        case "getrevoudetpay":
             getReversalVoucherDetailpay();
            break;
        case "getrevoudet":
             getReversalVoucherDetail();
            break;
        case "getadjbilldet":
             getReversalVoucherAdjustedBillDetail();
            break;
        case "cmbadjvoucherpayment":
             getBillAdjustmentVoucherspay();
            break;
        case "cmbadjvoucher":
             getBillAdjustmentVouchers();
            break;

        case "getacctraildetpay":
             getBillAdjustmentVoucherDetailpay();
            break;
        case "getacctraildet":
             getBillAdjustmentVoucherDetail();
            break;
        case "getrecpayamt":
             getRecpayAmount();
            break;
        case "getbilladjbilldet":
             getBillAdjustmentAdjustedBillDetail();
            break;
        case "getunadjbilldetpaytrail":
             getBillAdjustmentUnAdjustedBillDetailpaytrail();
            break;
        case "getunadjbilldetpay":
             getBillAdjustmentUnAdjustedBillDetailpay();
            break;
        case "getunadjbilldet":
             getBillAdjustmentUnAdjustedBillDetail();
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
    
  function getVoucherClosing()
    {
	$partyname=$_POST['partyname'];
	$finid=$_POST['finid'];
	$r=mysql_query("call accpayadjclosing('$partyname','$finid')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

  function getDiscountReceipt()
    {
	$vouno=$_POST['vouno'];
	$seqno=$_POST['seqno'];
	$r=mysql_query("select 
    RecptSeqno,
    RecptInvNo,
    date_format(RecptInvDate, '%Y-%m-%d') as RecptInvDate,
    RecptInvAmount,
    RecptCreditNoteNo,
    RecptTotalAmt,
    RecptPendingAmt,
    RecptAdjusted,
    RecptCD,
    RecptBalance
from
    regionalreceipttrailer
where
    RecptSeqno ='$seqno'  and RecptInvNo='$vouno'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

  function getVoucherNoDetailDate()
    {
	$accseqno=$_POST['accrefseq'];
	$r=mysql_query("call acc_sp_trn_selacc_ref('$accseqno')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    function getCurrency()
    {
	$r=mysql_query("call general_sp_mas_selcurrencymaster();");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    
 function getcmbacctnamenew()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $r=mysql_query("select led_code, led_name from acc_ledger_master 
            where led_comp_code	= '$compcode' and led_status = 'Y' and led_duplicate = 'N'
            and led_grp_code not in (43,168,169,170,171,172,204)");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    function getAccountName()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
	$r=mysql_query("select led_code, led_name from acc_ledger_master 
            where led_comp_code	= '$compcode' and led_status = 'Y' and led_duplicate = 'N'
            and led_grp_code not in (43,168,169,170,171,172,204)");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    
    function getcmbpartynamepayabNEW()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        /*$r=mysql_query("SELECT 
	    distinct led_code, led_name
	FROM
	    acc_ledger_master,acc_group_master,acc_trail
	WHERE
	    led_comp_code = '$compcode'
	    and led_grp_code=grp_code
		AND led_status = 'Y'
		AND led_duplicate = 'N'
        and acctrail_led_code=led_code
        and acctrail_inv_value-acctrail_adj_value>0 and grp_code in (72,74,75,76,77,78,79,80,81,82,83,139,143,177,179,180,184,187,193,213,214,215,216,217,232)
		AND grp_name like 'CREDIT%' GROUP BY led_code");*/
        $r=mysql_query("SELECT 
	    distinct led_code, led_name
	FROM
	    acc_ledger_master,acc_group_master
	WHERE
	    led_comp_code = '$compcode'
	    and led_grp_code=grp_code
		AND led_status = 'Y'
		AND led_duplicate = 'N'
		and grp_name like 'CREDIT%' GROUP BY led_code");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

    function getcmbpartynamepayab()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        /*$r=mysql_query("SELECT 
	    led_code, led_name
	FROM
	    acc_ledger_master,acc_group_master
	WHERE
	    led_comp_code = '$compcode'
	    and led_grp_code=grp_code
		AND led_status = 'Y'
		AND led_duplicate = 'N'
		AND grp_name like 'CREDIT%' GROUP BY led_code");*/
        $r=mysql_query("SELECT 
	    led_code, led_name
	FROM
	    acc_ledger_master,acc_group_master
	WHERE
	    led_comp_code = '$compcode'
	    and led_grp_code=grp_code
		AND led_status = 'Y'
		AND led_duplicate = 'N'
		AND grp_name like 'CREDIT%' GROUP BY led_code");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    function getPartyName()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $r=mysql_query("select led_code, led_name from acc_ledger_master 
        where led_comp_code	= '$compcode' and  led_status = 'Y' and led_duplicate = 'N'
        and led_grp_code not in (43,168,169,170,171,172,204)");
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
        $compcode = $_POST['gincompcode'];
        $finid=$_POST['finid'];
        $voutype=$_POST['voutype'];
	$r=mysql_query("call acc_sp_trn_selvoucher_no('$finid','$compcode','$voutype');");
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
	//$r=mysql_query("CALL general_sp_mas_selcontrolmaster('ST','$finyear','IRN','STORES ISSUE RETURN NO','$compcode')");
        $r=mysql_query("select ifnull(max(convert(substring(accref_vouno,3),signed)),0) +1 as con_value from acc_ref where accref_vou_type = 'EX' and accref_finid = '$finyear' and accref_comp_code = '$compcode';");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    
    function getContraVouNo()
    {
	$finyear=$_POST['finyear'];
        $compcode=$_POST['compcode'];
	//$r=mysql_query("CALL general_sp_mas_selcontrolmaster('ST','$finyear','IRN','STORES ISSUE RETURN NO','$compcode')");
        $r=mysql_query("select ifnull(max(convert(substring(accref_vouno,3),signed)),0) +1 as con_value from acc_ref where accref_vou_type = 'CT' and accref_finid = '$finyear' and accref_comp_code = '$compcode';");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    
    function FindSubgroup($gcode){
        $grpcode = $gcode;
        $compcode=$_POST['gincompcode'];
        $pst_grpcode = $grpcode;
        $pst_grpcode1 = $grpcode;
        $cnt=1;
        do
        {
            $r=mysql_query("select grp_code,grp_name from acc_group_master where grp_parent_code in (".$pst_grpcode1.") and grp_comp_code = '$compcode';");
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
        }while ($cnt>0);
        return $pst_grpcode;
        
    }
    
    function getLedger(){
        $compcode=$_POST['gincompcode'];
        $pstgrpcode = FindSubgroup("10");
        $r=mysql_query("select led_code,led_name from acc_ledger_master where led_grp_code in (".$pstgrpcode.") and "
                . "led_comp_code='$compcode' and led_status='Y' and led_duplicate='N';");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
         
        
    }
    
    function getJournalLedger(){
        $compcode=$_POST['gincompcode'];
        $r=mysql_query("select led_code,led_name from acc_ledger_master where led_grp_code not in ('43') and "
                . "led_comp_code='$compcode' and led_status='Y' and led_duplicate='N';");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
         
        
    }
    
    function getJournalVouNo()
    {
	$finyear=$_POST['finyear'];
        $compcode=$_POST['compcode'];
	//$r=mysql_query("CALL general_sp_mas_selcontrolmaster('ST','$finyear','IRN','STORES ISSUE RETURN NO','$compcode')");
        $r=mysql_query("select ifnull(max(convert(substring(accref_vouno,3),signed)),0) +1 as con_value from acc_ref where accref_vou_type = 'JV' and accref_finid = '$finyear' and accref_comp_code = '$compcode';");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    
    function getPaymentBillsDetailtoAdjust()
    {
	$finid=$_POST['finid'];
        $compcode=$_POST['compcode'];
        $ledcode=$_POST['ledcode'];
	$r=mysql_query("CALL acc_sp_trn_selacc_payment_billdetails_new('$compcode','$finid','$ledcode')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    
    function getRegionalGroupName()
    {
        $compcode = $_POST['gincompcode'];
	$r=mysql_query("call acc_sp_selregiongroup('$compcode');");
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
        $r=mysql_query("select led_code, led_name from acc_ledger_master 
            where led_comp_code	= '$compcode' and led_grp_code in (20,90,21,22,23,24,25,91,92,93,94,95,96,102,182) and led_status ='Y' and led_duplicate='N'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    
    function getRegionalReceiptNo()
    {
        $compcode=$_POST['compcode'];
        $finid=$_POST['finid'];
        $grpcode=$_POST['grpcode'];
	$r=mysql_query("call acc_sp_selRegionalReceiptNo('$grpcode','$finid','$compcode');");
        //$r=mysql_query("select led_code, led_name from acc_ledger_master 
        //    where led_comp_code	= '$compcode' and led_grp_code in (20,90,21,22,23,24,25,91,92,93,94,95,96,102,182)");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    
    function getRegionalReceiptNoDetail()
    {
        $rcptseq=$_POST['rcptseq'];
	$r=mysql_query("call acc_sp_selRegionalReceiptDetail('$rcptseq');");
        //$r=mysql_query("select led_code, led_name from acc_ledger_master 
        //    where led_comp_code	= '$compcode' and led_grp_code in (20,90,21,22,23,24,25,91,92,93,94,95,96,102,182)");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
        function getReceiptBillsDetailtoAdjustRegion()
    {
	$finid=$_POST['finid'];
        $compcode=$_POST['compcode'];
        $ledcode=$_POST['ledcode'];
	$r=mysql_query("CALL acc_sp_trn_selacc_receipt_billdetails_newRegion('$compcode','$finid','$ledcode')");
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
	$r=mysql_query("CALL acc_sp_trn_selob_billdetails_balance('$compcode','$finid','$ledcode')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    
    function getRegionalReceiptNoBillDetail()
    {
        $rcptseq=$_POST['rcptseq'];
	$r=mysql_query("call acc_sp_selRegionalReceiptBillDetail('$rcptseq');");
        //$r=mysql_query("select led_code, led_name from acc_ledger_master 
        //    where led_comp_code	= '$compcode' and led_grp_code in (20,90,21,22,23,24,25,91,92,93,94,95,96,102,182)");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    
    function getReceiptVoucherNumber()
    {
        $compcode = $_POST['gincompcode'];
        $finid=$_POST['finid'];
        $voutype=$_POST['voutype'];
        $ledcode=$_POST['ledcode'];
	$r=mysql_query("call acc_sp_trn_selacc_ref_regrcptvouno('$compcode','$finid','$voutype','$ledcode');");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    
    function getGroupMaster()
    {
        $compcode = $_POST['gincompcode'];
        $grpparent=$_POST['grpparent'];
	$r=mysql_query("select grp_code, grp_name from acc_group_master where grp_comp_code = '$compcode' and grp_parent_code = '$grpparent';");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    
    function getGroupwiseTotalAmount($grpcode,$grpname){
        $compcode=$_POST['gincompcode'];
        $finid=$_POST['finid'];
        $pstgrpcode = FindSubgroup($grpcode);

        $r=mysql_query("select b.grp_code, b.grp_name, 'G' as acctype, sum(obdbamt) as totdbamt,sum(obcramt) as totcramt from 
            (select grp_code, grp_name, sum(curbal_obdbamt) as obdbamt,sum(curbal_obcramt) as obcramt 
            from acc_group_master, acc_ledger_master, acc_current_balance 
            where curbal_finid = '$finid' and led_code = curbal_led_code and grp_code = led_grp_code 
            and led_grp_code in (".$pstgrpcode.") and led_comp_code = grp_comp_code and grp_comp_code = '$compcode'
            group by grp_code
            union all
            select grp_code, grp_name, sum(acctran_dbamt) as obdbamt,sum(acctran_cramt) as obcramt 
            from acc_group_master, acc_ledger_master, acc_ref, acc_tran 
            where accref_seqno = acctran_accref_seqno and 
            accref_finid = '$finid' and accref_comp_code = '$compcode' and accref_vou_type not in ('OB','UB','BA') 
            and accref_voudate >= '2015-04-01' and accref_voudate <= '2016-03-31' 
            and acctran_led_code = led_code and led_grp_code = grp_code
            and led_grp_code in (".$pstgrpcode.") and led_grp_code not in ('$grpcode') and accref_comp_code = led_comp_code 
            and led_comp_code = grp_comp_code and grp_comp_code = '$compcode'
            group by grp_code) a, acc_group_master b
            where b.grp_code = '$grpcode' and grp_comp_code = 1");
	$nrow = mysql_num_rows($r);
        while($re = mysql_fetch_array($r))
        {
            if ($re['grp_code']==NULL){
                $arr[]=array("grp_code"=>$grpcode,"grp_name"=>$grpname,"totdbamt"=>0,"totcramt"=>0,"acctype"=>'G');
            }else{
                $arr[]= $re ;
            }
        }
	
        //$arr1 = array_push($arr1,$arr);
        return $arr;
		//$jsonresult = JEncode($arr);
		//echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
         
        
    }
    
    function getLedgerwiseTotalAmount($grpcode){
        $compcode=$_POST['gincompcode'];
        $finid=$_POST['finid'];
        $pstgrpcode = $grpcode;
        mysql_query("SET NAMES utf8");  
        $r=mysql_query("select grp_code , grp_name, 'L' as acctype, sum(obdbamt) as totdbamt, sum(obcramt) as totcramt from
            (select led_code as grp_code, led_name as grp_name, sum(curbal_obdbamt) as obdbamt,sum(curbal_obcramt) as obcramt 
            from acc_ledger_master, acc_current_balance 
            where curbal_finid = '$finid' and led_code = curbal_led_code 
            and led_grp_code in ('$pstgrpcode') and led_comp_code = '$compcode'
            group by led_code
            union all
            select led_code as grp_code, led_name as grp_name, sum(acctran_dbamt) as obdbamt,sum(acctran_cramt) as obcramt 
            from acc_ledger_master, acc_ref, acc_tran 
            where accref_seqno = acctran_accref_seqno and 
            accref_finid = '$finid' and accref_comp_code = '$compcode' and accref_vou_type not in ('OB','UB','BA') 
            and accref_voudate >= '2015-04-01' and accref_voudate <= '2016-03-31' 
            and acctran_led_code = led_code and led_grp_code in ('$pstgrpcode') and accref_comp_code = led_comp_code 
            and led_comp_code = '$compcode'
            group by led_code) a group by grp_name, grp_code;");
	$nrow = mysql_num_rows($r);
        while($re = mysql_fetch_array($r))
        {
            if ($re['grp_code']==NULL){
                $arr[]=array("grp_code"=>$re['grp_code'],"grp_name"=>$re['grp_name'],"totdbamt"=>0,"totcramt"=>0,"acctype"=>'L');
            }else{
                $arr[]= $re ;
            }
        }
	
        //$arr1 = array_push($arr1,$arr);
        return $arr;
		//$jsonresult = JEncode($arr);
		//echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
         
        
    }
    
    function getSubGroups()
    {
        $compcode = $_POST['gincompcode'];
        $grpparent= $_POST['grpparent'];
	$r=mysql_query("select grp_code, grp_name from acc_group_master where grp_comp_code = '$compcode' and grp_parent_code = '$grpparent';");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
            //$arr[] = $re;
            $arr= getGroupwiseTotalAmount($re['grp_code'],$re['grp_name']);
            $arr1=  array_merge($arr1,$arr);
            //$ledarr= getLedgerwiseTotalAmount($re['grp_code'],$re['grp_name']);
            //$arr1=  array_merge($arr1,$ledarr);
            //array_push($arr1,$arr);
        }
        $ledarr= getLedgerwiseTotalAmount($grpparent);
        if ($ledarr == NULL){
            
        }else{
            $arr1=  array_merge($arr1,$ledarr);
        }
        //$arr1=  array_merge($arr1,$ledarr);
		$jsonresult = JEncode($arr1);
		echo '({"total":"'.$nrow.'","results":'.JEncode($arr1).'})';
    }
    
    function getbankname()
    {
	$res=mysql_query("call acc_sp_mas_selbank_master()");
	$nbrow = mysql_num_rows($res);
	while($rec = mysql_fetch_array($res))
	{
	 $arr[]= $rec ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrow.'","results":'.$jsonresult.'})';
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
    
    function getcountry()
    {
	$res=mysql_query("CALL expo_sp_mas_selcountry_master");
	$nbrow = mysql_num_rows($res);
	while($rec = mysql_fetch_array($res))
	{
	 $arr[]= $rec ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrow.'","results":'.$jsonresult.'})';
    }

    function getbankmaster()
    {
	$bankseq=$_POST['ginbank'];
	$res=mysql_query("CALL acc_sp_selbank_master(".$bankseq.")");
	$nbrow = mysql_num_rows($res);
	while($rec = mysql_fetch_array($res))
	{
	 $arr[]= $rec ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrow.'","results":'.$jsonresult.'})';
    }

    function getHeadCashAccountName()
    {
        $compcode = $_POST['compcode'];
//        $r=mysql_query("select led_code, led_name from acc_ledger_master where led_comp_code = '$compcode' and led_grp_code = 26");
        $r=mysql_query("select led_code, led_name from acc_ledger_master led_comp_code = '$compcode' and led_grp_code = 126");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    
    function getBillRealExportInvno()
    {
        mysql_query("SET NAMES utf8");
        $ledcode = $_POST['ledcode'];
        $compcode = $_POST['compcode'];
        $r=mysql_query("call acc_sp_trn_selrealisedexportinvoiceno('$ledcode','$compcode');");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    
    function getExportInvoiceDetailforRealisation()
    {
        mysql_query("SET NAMES utf8");
        $cinvseqno = $_POST['cinvseqno'];
        $compcode = $_POST['compcode'];
        $flag = $_POST['flag'];
        $cinvno = $_POST['cinvno'];
	if($flag==="E"){
        $r=mysql_query("SELECT 
	    cinv_commission,
	    cinv_total_invamt,
	    cinv_date,
	    cinv_efc,
	    bank_refno
	FROM
	    kgdl.expo_cinv_header,
	    kgdl.expo_bank_details
	where
	    bank_cinv_seqno = cinv_seqno
		and cinv_seqno = '$cinvseqno'");
	}else if($flag==="F"){
        $r=mysql_query("
	SELECT 
	    cinvcommission as cinv_commission,
	    cinvtotalinvamt as cinv_total_invamt,
	    cinvdate as cinv_date,
	    cinvefc as cinv_efc,
	    bankrefno as bank_refno
	FROM
	    dfd.expofabcinvheader,
	    dfd.expofabbankdetails
	where
	    bankcinvseqno = cinvseqno
		and cinvseqno = '$cinvseqno'");
	}else if($flag==="M"){
        $r=mysql_query("
	SELECT 
	    cinvcommission as cinv_commission,
	    cinvtotalinvamt as cinv_total_invamt,
	    cinvdate as cinv_date,
	    cinvefc as cinv_efc,
	    bankrefno as bank_refno
	FROM
	    dfd.expohometexcinvheader,
	    dfd.expohometexbankdetails
	where
	    bankcinvseqno = cinvseqno
		and cinvseqno = '$cinvseqno'");
	}
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    
    function getFinancialYear()
    {
        $r=mysql_query("call acc_sp_mas_selfin_master();");
        
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    
    function getReversalVoucher()
    {
        $acctname = $_POST['acctname'];
        $partyname = $_POST['partyname'];
        $finid = $_POST['finid'];
        $voutype = $_POST['voutype'];

        if ($voutype=='P'){
            $r=mysql_query("call acc_sp_trn_selbp_voucherno('$acctname','$finid','$partyname');");
        }else if ($voutype=='R'){
            $r=mysql_query("call acc_sp_trn_selbr_voucherno('$acctname','$finid','$partyname');");
        }
        
        
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    
    function getReversalVoucherDetailpay()
    {
        $accrefseq = $_POST['accrefseq'];

        $r=mysql_query("call acc_sp_trn_selacc_tran_reversalentry('$accrefseq');");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    function getReversalVoucherDetail()
    {
        $accrefseq = $_POST['accrefseq'];

        $r=mysql_query("call acc_sp_trn_selacc_tran_reversalentry('$accrefseq');");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    
    function getReversalVoucherAdjustedBillDetail()
    {
        $accrefseq = $_POST['accrefseq'];
        $partyname = $_POST['partyname'];
        $voutype = $_POST['voutype'];

        if ($voutype=='P'){
            $r=mysql_query("call acc_sp_trn_seladjdocument('$accrefseq','$partyname');");
        }else if ($voutype=='R'){
            $r=mysql_query("call acc_sp_trn_selreceiptadjdocument('$accrefseq','$partyname');");
        }
        
        
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    
    function getBillAdjustmentVoucherspay()
    {
        $partyname = $_POST['partyname'];
        $voutype = $_POST['voutype'];
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
        if ($voutype=='P'){
            $r=mysql_query("select distinct
	    accref_seqno, concat(accref_vouno,'/',fin_year) as accref_vouno
	from
	    acc_ref,
	    acc_tran,
	    acc_trail,fin_master
	where
	    accref_seqno = acctran_accref_seqno
		and accref_seqno = acctrail_accref_seqno
		and acctran_accref_seqno = acctrail_accref_seqno
		and acctran_led_code = acctrail_led_code
		and accref_vou_type in ('BP')
		and acctran_led_code = '$partyname'
		and accref_comp_code = '$compcode'
		and accref_finid=fin_id

		and acctran_dbamt > 0
	group by accref_seqno , accref_vouno
	having sum(acctrail_inv_value) - sum(acctrail_adj_value) > 0");
        }else if ($voutype=='R'){
            $r=mysql_query("select distinct
	    accref_seqno, accref_vouno
	from
	    acc_ref,
	    acc_tran,
	    acc_trail
	where
	    accref_seqno = acctran_accref_seqno
		and accref_seqno = acctrail_accref_seqno
		and acctran_accref_seqno = acctrail_accref_seqno
		and acctran_led_code = acctrail_led_code
		and accref_vou_type in ('BR')
		and acctran_led_code = '$partyname'
		and accref_comp_code = '$compcode'
		and accref_finid = '$finid'
		and acctran_cramt > 0
	group by accref_seqno , accref_vouno
	having sum(acctrail_inv_value) - sum(acctrail_adj_value) > 0");
        }
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

        if ($voutype=='P'){
            $r=mysql_query("call acc_sp_trn_selbilladjustment_payment('$partyname','$compcode','$finid','$opdate','N');");
        }else if ($voutype=='R'){
            $r=mysql_query("call acc_sp_trn_selbilladjustment_receipt('$partyname','$compcode','$finid','$opdate','N');");
        }
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    
    function getBillAdjustmentVoucherDetailpay()
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
    
    function getRecpayAmount()
    {
        $ledcode = $_POST['ledcode'];
        $accrefseq = $_POST['accrefseq'];

        $r=mysql_query("call acc_sp_trn_selaccrecpaytran_amount('$ledcode','$accrefseq');");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    
    function getBillAdjustmentAdjustedBillDetail()
    {
        $ledcode = $_POST['ledcode'];
        $accrefseq = $_POST['accrefseq'];

        $r=mysql_query("call acc_sp_trn_selrecpay_tran('$accrefseq','$ledcode');");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    function getBillAdjustmentUnAdjustedBillDetailpaytrail()
    {
        $voutype = $_POST['voutype'];
        $compcode = $_POST['compcode'];
        $ledcode = $_POST['ledcode'];
	$flagsss=$_POST['flagsss'];
        if ($voutype=='R'){
            $r=mysql_query("call acc_sp_trn_selacc_receipt_billdetails('$compcode','11','$ledcode');");
        }else{
	    if($flagsss=="C"){	
            $r=mysql_query("select 
	    acc_ref.accref_seqno,
	    acc_ref.accref_vou_type,
	    acc_ref.accref_vouno,
	    date_format(acc_ref.accref_voudate, '%Y-%m-%d') as accref_voudate,
	    acc_ref.accref_comp_code,
	    acc_ref.accref_finid,
	    acc_trail.acctrail_inv_no,
	    date_format(acc_trail.acctrail_inv_date, '%Y-%m-%d') as acctrail_inv_date,
	    acc_trail.acctrail_inv_value,
	    acc_trail.acctrail_adj_value,
	    acc_tran.acctran_cramt,
	    acc_tran.acctran_totamt,
	    acc_tran.acctran_led_code
	from
	    acc_ref
		INNER JOIN
	    acc_tran ON acc_ref.accref_seqno = acc_tran.acctran_accref_seqno
		Inner JOIN
	    acc_trail ON acc_ref.accref_seqno = acc_trail.acctrail_accref_seqno
		AND acc_tran.acctran_led_code = acc_trail.acctrail_led_code
		AND acc_tran.acctran_accref_seqno = acc_trail.acctrail_accref_seqno
	where
	    acc_ref.accref_comp_code = '$compcode'
		AND acctran_cramt>0
		AND acc_tran.acctran_led_code = '$ledcode'
		and acc_trail.acctrail_inv_value-acc_trail.acctrail_adj_value > 0 order by accref_voudate desc");
		}else if($flagsss=="D"){	
            $r=mysql_query("select 
	    acc_ref.accref_seqno,
	    acc_ref.accref_vou_type,
	    acc_ref.accref_vouno,
	    date_format(acc_ref.accref_voudate, '%Y-%m-%d') as accref_voudate,
	    acc_ref.accref_comp_code,
	    acc_ref.accref_finid,
	    acc_trail.acctrail_inv_no,
	    date_format(acc_trail.acctrail_inv_date, '%Y-%m-%d') as acctrail_inv_date,
	    acc_trail.acctrail_inv_value,
	    acc_trail.acctrail_adj_value,
	    acc_tran.acctran_cramt,
	    acc_tran.acctran_totamt,
	    acc_tran.acctran_led_code
	from
	    acc_ref
		INNER JOIN
	    acc_tran ON acc_ref.accref_seqno = acc_tran.acctran_accref_seqno
		Inner JOIN
	    acc_trail ON acc_ref.accref_seqno = acc_trail.acctrail_accref_seqno
		AND acc_tran.acctran_led_code = acc_trail.acctrail_led_code
		AND acc_tran.acctran_accref_seqno = acc_trail.acctrail_accref_seqno
	where
	    acc_ref.accref_comp_code = '$compcode'
		AND acctran_dbamt>0
		AND acc_tran.acctran_led_code = '$ledcode'
		and acc_trail.acctrail_inv_value-acc_trail.acctrail_adj_value > 0 order by accref_voudate desc");
		}
        }
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    function getBillAdjustmentUnAdjustedBillDetailpay()
    {
        $finid = $_POST['finid'];
        $voutype = $_POST['voutype'];
        $compcode = $_POST['compcode'];
        $ledcode = $_POST['ledcode'];
        if ($voutype=='R'){
            $r=mysql_query("call acc_sp_trn_selacc_receipt_billdetails('$compcode','11','$ledcode');");
        }else{
            $r=mysql_query("select 
	    acc_ref.accref_seqno,
	    acc_ref.accref_vou_type,
	    acc_ref.accref_vouno,
	    date_format(acc_ref.accref_voudate, '%Y-%m-%d') as accref_voudate,
	    acc_ref.accref_comp_code,
	    acc_ref.accref_finid,
	    acc_trail.acctrail_inv_no,
	    date_format(acc_trail.acctrail_inv_date, '%Y-%m-%d') as acctrail_inv_date,
	    acc_trail.acctrail_inv_value,
	    acc_trail.acctrail_adj_value,
	    acc_tran.acctran_cramt,
	    acc_tran.acctran_totamt,
	    acc_tran.acctran_led_code
	from
	    acc_ref
		INNER JOIN
	    acc_tran ON acc_ref.accref_seqno = acc_tran.acctran_accref_seqno
		Inner JOIN
	    acc_trail ON acc_ref.accref_seqno = acc_trail.acctrail_accref_seqno
		AND acc_tran.acctran_led_code = acc_trail.acctrail_led_code
		AND acc_tran.acctran_accref_seqno = acc_trail.acctrail_accref_seqno
	where
	    acc_ref.accref_comp_code = '$compcode'
		AND acc_ref.accref_vou_type  in ('PU','ES' )
		AND acc_tran.acctran_led_code = '$ledcode'
		and acc_tran.acctran_cramt > 0
		and acc_trail.acctrail_inv_value-acc_trail.acctrail_adj_value > 0 order by accref_voudate");
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
        $compcode = $_POST['compcode'];
        $ledcode = $_POST['ledcode'];
        if ($voutype=='R'){
            $r=mysql_query("call acc_sp_trn_selacc_receipt_billdetails('$compcode','11','$ledcode');");
        }else{
            $r=mysql_query("call acc_sp_trn_selacc_payment_billdetails('$compcode','11','$ledcode');");
        }
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    
?>
