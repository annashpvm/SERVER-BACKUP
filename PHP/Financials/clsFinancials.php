<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='cmbfinyear';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
mysqli_set_charset($conn, "utf8");
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
        case "loadlastvouno":             // Give the entire list
            getlastvouno();
            break;
        case "loadledger_type_name":             // Give the entire list
            getledger_type_Name();
            break;

        default:
            echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
            break;
    }


    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
  function getVoucherClosing()
    {
	$partyname=$_POST['partyname'];
	$finid=$_POST['finid'];
	$sql = "call accpayadjclosing('$partyname','$finid')";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

  function getDiscountReceipt()
    {
	$vouno=$_POST['vouno'];
	$seqno=$_POST['seqno'];
	$sql = "select 
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
    RecptSeqno ='$seqno'  and RecptInvNo='$vouno'";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

  function getVoucherNoDetailDate()
    {
	$accseqno=$_POST['accrefseq'];
	$sql = "call acc_sp_trn_selacc_ref('$accseqno')";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    function getCurrency()
    {
	$sql = "call general_sp_mas_selcurrencymaster();";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    
 function getcmbacctnamenew()
    {
        global $conn;
        $compcode = $_POST['compcode'];
        $sql = "select led_code, led_name from acc_ledger_master 
            where led_comp_code	= '$compcode' and led_status = 'Y' and led_duplicate = 'N'
            and led_grp_code not in (43,168,169,170,171,172,204)";



        $sql = "select led_code, led_name from acc_ledger_master";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    function getAccountName()
    {
        global $conn;
        $compcode = $_POST['compcode'];
	/*$sql = "select led_code, led_name from acc_ledger_master 
            where led_comp_code	= '$compcode' and led_status = 'Y' and led_duplicate = 'N'
            and led_grp_code not in (43,168,169,170,171,172,204)";*/

             $sql = "select led_code, led_name from acc_ledger_master, acc_current_balance 
            where curbal_comp_code = 90 and curbal_finid = 21 and curbal_led_code = led_code and  led_status = 'Y' and led_duplicate = 'N'";

             $sql = "select led_code, led_name,led_type from acc_ledger_master";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    

    function getledger_type_Name()
    {
        global $conn;
        $ledcode = $_POST['ledcode'];

             $sql = "select led_code, led_name,led_type from acc_ledger_master where led_code = $ledcode";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

    function getcmbpartynamepayabNEW()
    {
        global $conn;
        $compcode = $_POST['compcode'];
        /*$sql = "SELECT 
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
		AND grp_name like 'CREDIT%' GROUP BY led_code";*/

        $sql = "SELECT 
	    distinct led_code, led_name
	FROM
	    acc_ledger_master,acc_group_master
	WHERE
	    led_comp_code = '$compcode'
	    and led_grp_code=grp_code
		AND led_status = 'Y'
		AND led_duplicate = 'N'
		and grp_name like 'CREDIT%' GROUP BY led_code";


        $sql = "SELECT distinct led_code, led_name FROM  acc_ledger_master WHERE led_type = 'C'";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

    function getcmbpartynamepayab()
    {
        global $conn;
        $compcode = $_POST['compcode'];
        /*$sql = "SELECT 
	    led_code, led_name
	FROM
	    acc_ledger_master,acc_group_master
	WHERE
	    led_comp_code = '$compcode'
	    and led_grp_code=grp_code
		AND led_status = 'Y'
		AND led_duplicate = 'N'
		AND grp_name like 'CREDIT%' GROUP BY led_code";*/
        $sql = "SELECT 
	    led_code, led_name
	FROM
	    acc_ledger_master,acc_group_master
	WHERE
	    led_comp_code = '$compcode'
	    and led_grp_code=grp_code
		AND led_status = 'Y'
		AND led_duplicate = 'N'
		AND grp_name like 'CREDIT%' GROUP BY led_code";


        $sql = "SELECT distinct led_code, led_name FROM  acc_ledger_master WHERE led_type = 'C'";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    function getPartyName()
    {
        global $conn;
        $compcode = $_POST['compcode'];
        $sql = "select led_code, led_name from acc_ledger_master 
        where led_comp_code	= '$compcode' and  led_status = 'Y' and led_duplicate = 'N'
        and led_grp_code not in (43,168,169,170,171,172,204)";

        $sql = "SELECT led_code, led_name FROM  acc_ledger_master";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    
    function getVoucherNumber()
    {
        $compcode = $_POST['gincompcode'];
        $finid=$_POST['finid'];
        $voutype=$_POST['voutype'];
	$sql = "call acc_sp_trn_selvoucher_no('$finid','$compcode','$voutype')";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    
    function getVouNo()
    {
	$finyear=$_POST['finyear'];
        $compcode=$_POST['compcode'];
	//$sql = "CALL general_sp_mas_selcontrolmaster('ST','$finyear','IRN','STORES ISSUE RETURN NO','$compcode')";
        $sql = "select ifnull(max(convert(substring(accref_vouno,3),signed)),0) +1 as con_value from acc_ref where accref_vou_type = 'EX' and accref_finid = '$finyear' and accref_comp_code = '$compcode';";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    
    function getContraVouNo()
    {
	$finyear=$_POST['finyear'];
        $compcode=$_POST['compcode'];
	//$sql = "CALL general_sp_mas_selcontrolmaster('ST','$finyear','IRN','STORES ISSUE RETURN NO','$compcode')";
        $sql = "select ifnull(max(convert(substring(accref_vouno,3),signed)),0) +1 as con_value from acc_ref where accref_vou_type = 'CT' and accref_finid = '$finyear' and accref_comp_code = '$compcode';";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    
    function FindSubgroup($gcode){
        $grpcode = $gcode;
        $compcode=$_POST['gincompcode'];
        $pst_grpcode = $grpcode;
        $pst_grpcode1 = $grpcode;
        $cnt=1;
        do
        {
            $sql = "select grp_code,grp_name from acc_group_master where grp_parent_code in (".$pst_grpcode1.") and grp_comp_code = '$compcode';";
            $nrow = mysqli_num_rows($r);
            $cnt=$nrow;
            $pst_grpcode1 = "";
            while($re = mysqli_fetch_array($r))
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
        $pstgrpcode = FindSubgroup("10";
        $sql = "select led_code,led_name from acc_ledger_master where led_grp_code in (".$pstgrpcode.") and "
                . "led_comp_code='$compcode' and led_status='Y' and led_duplicate='N';";

        $sql = "select led_code,led_name from acc_ledger_master";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
         
        
    }
    
    function getJournalLedger(){
        $compcode=$_POST['gincompcode'];
        $sql = "select led_code,led_name from acc_ledger_master where led_grp_code not in ('43') and "
                . "led_comp_code='$compcode' and led_status='Y' and led_duplicate='N';";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
         
        
    }
    
    function getJournalVouNo()
    {
	$finyear=$_POST['finyear'];
        $compcode=$_POST['compcode'];
	//$sql = "CALL general_sp_mas_selcontrolmaster('ST','$finyear','IRN','STORES ISSUE RETURN NO','$compcode')";
        $sql = "select ifnull(max(convert(substring(accref_vouno,3),signed)),0) +1 as con_value from acc_ref where accref_vou_type = 'JV' and accref_finid = '$finyear' and accref_comp_code = '$compcode';";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

    function getlastvouno()
    {
	$finyear =$_POST['finyear'];
        $compcode=$_POST['compcode'];
        $voutype =$_POST['voutype'];
        $sql = "select ifnull(max(convert(substring(accref_vouno,3),signed)),0) +1 as con_value from acc_ref where accref_vou_type = '$voutype' and accref_finid = '$finyear' and accref_comp_code = '$compcode';";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

    
    function getPaymentBillsDetailtoAdjust()
    {
	$finid=$_POST['finid'];
        $compcode=$_POST['compcode'];
        $ledcode=$_POST['ledcode'];
	$sql = "CALL acc_sp_trn_selacc_payment_billdetails_new('$compcode','$finid','$ledcode')";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    
    function getRegionalGroupName()
    {
        $compcode = $_POST['gincompcode'];
	$sql = "call acc_sp_selregiongroup('$compcode');";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    
    function getHeadBankAccountName()
    {
        $compcode = $_POST['compcode'];
        $finid=$_POST['finid'];
        /*$sql = "select led_code, led_name from acc_ledger_master 
            where led_comp_code	= '$compcode' and led_grp_code in (20,90,21,22,23,24,25,91,92,93,94,95,96,102,182) and led_status ='Y' and led_duplicate='N'";*/
//        $sql = "select led_code, led_name from acc_ledger_master, acc_current_balance where led_grp_code = 126 and curbal_comp_code = 90 and curbal_led_code = led_code  and curbal_finid = 21 and led_status ='Y' and led_duplicate='N'";            

        $sql = "select led_code, led_name from acc_ledger_master where led_grp_code = 26 and led_name like '%BANK%'";            

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    
    function getRegionalReceiptNo()
    {
        $compcode=$_POST['compcode'];
        $finid=$_POST['finid'];
        $grpcode=$_POST['grpcode'];
	$sql = "call acc_sp_selRegionalReceiptNo('$grpcode','$finid','$compcode');";
        //$sql = "select led_code, led_name from acc_ledger_master 
        //    where led_comp_code	= '$compcode' and led_grp_code in (20,90,21,22,23,24,25,91,92,93,94,95,96,102,182)";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    
    function getRegionalReceiptNoDetail()
    {
        $rcptseq=$_POST['rcptseq'];
	$sql = "call acc_sp_selRegionalReceiptDetail('$rcptseq');";
        //$sql = "select led_code, led_name from acc_ledger_master 
        //    where led_comp_code	= '$compcode' and led_grp_code in (20,90,21,22,23,24,25,91,92,93,94,95,96,102,182)";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
        function getReceiptBillsDetailtoAdjustRegion()
    {
	$finid=$_POST['finid'];
        $compcode=$_POST['compcode'];
        $ledcode=$_POST['ledcode'];
	$sql = "CALL acc_sp_trn_selacc_receipt_billdetails_newRegion('$compcode','$finid','$ledcode')";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

    function getReceiptBillsDetailtoAdjust()
    {
	$finid=$_POST['finid'];
        $compcode=$_POST['compcode'];
        $ledcode=$_POST['ledcode'];
	$sql = "CALL acc_sp_trn_selacc_receipt_billdetails_new('$compcode','$finid','$ledcode')";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    
    function getOpeningBillsDetailtoAdjust()
    {
	$finid=$_POST['finid'];
        $compcode=$_POST['compcode'];
        $ledcode=$_POST['ledcode'];
	$sql = "CALL acc_sp_trn_selob_billdetails_balance('$compcode','$finid','$ledcode')";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    
    function getRegionalReceiptNoBillDetail()
    {
        $rcptseq=$_POST['rcptseq'];
	$sql = "call acc_sp_selRegionalReceiptBillDetail('$rcptseq');";
        //$sql = "select led_code, led_name from acc_ledger_master 
        //    where led_comp_code	= '$compcode' and led_grp_code in (20,90,21,22,23,24,25,91,92,93,94,95,96,102,182)";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    
    function getReceiptVoucherNumber()
    {
        $compcode = $_POST['gincompcode'];
        $finid=$_POST['finid'];
        $voutype=$_POST['voutype'];
        $ledcode=$_POST['ledcode'];
	$sql = "call acc_sp_trn_selacc_ref_regrcptvouno('$compcode','$finid','$voutype','$ledcode');";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    
    function getGroupMaster()
    {
        $compcode = $_POST['gincompcode'];
        $grpparent=$_POST['grpparent'];
	$sql = "select grp_code, grp_name from acc_group_master where grp_comp_code = '$compcode' and grp_parent_code = '$grpparent';";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    
    function getGroupwiseTotalAmount($grpcode,$grpname){
        $compcode=$_POST['gincompcode'];
        $finid=$_POST['finid'];
        $pstgrpcode = FindSubgroup($grpcode);

        $sql = "select b.grp_code, b.grp_name, 'G' as acctype, sum(obdbamt) as totdbamt,sum(obcramt) as totcramt from 
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
            where b.grp_code = '$grpcode' and grp_comp_code = 1";
	$nrow = mysqli_num_rows($r);
        while($re = mysqli_fetch_array($r))
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
        global $conn;  
        $sql = "select grp_code , grp_name, 'L' as acctype, sum(obdbamt) as totdbamt, sum(obcramt) as totcramt from
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
            group by led_code) a group by grp_name, grp_code;";
	$nrow = mysqli_num_rows($r);
        while($re = mysqli_fetch_array($r))
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
	$sql = "select grp_code, grp_name from acc_group_master where grp_comp_code = '$compcode' and grp_parent_code = '$grpparent';";
	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
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
	$res=mysql_query("call acc_sp_mas_selbank_master()";
	$nbrow = mysqli_num_rows($res);
	while($rec = mysqli_fetch_array($res))
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
	$sql = "call acc_sp_mas_selgroup_master('$compcode');";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    
    function getSelGroup()
    {
        global $conn;  
        $CompCode = $_POST['compcode'];
        $Group = $_POST['gstGroup'];
	$sql = "select grp_code,grp_name from acc_group_master where grp_comp_code = 1 and grp_name like '".$Group."'";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    
    function GetMaxGroupCode()
    {
        $CompCode = $_POST['compcode'];
        $sql = "select ifnull(max(grp_code),0)+1 as con_value from acc_group_master where grp_comp_code = '$CompCode'";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    
    function getcountry()
    {
	$res=mysql_query("CALL expo_sp_mas_selcountry_master";
	$nbrow = mysqli_num_rows($res);
	while($rec = mysqli_fetch_array($res))
	{
	 $arr[]= $rec ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrow.'","results":'.$jsonresult.'})';
    }

    function getbankmaster()
    {
	$bankseq=$_POST['ginbank'];
	$res=mysql_query("CALL acc_sp_selbank_master(".$bankseq.")";
	$nbrow = mysqli_num_rows($res);
	while($rec = mysqli_fetch_array($res))
	{
	 $arr[]= $rec ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrow.'","results":'.$jsonresult.'})';
    }

    function getHeadCashAccountName()
    {
        $compcode = $_POST['compcode'];
        $finid    = $_POST['finid'];
        $entrypoint = $_POST['entrypoint'];
//        $user     = "Accounts-HO";

//        $sql = "select led_code, led_name from acc_ledger_master where led_comp_code = '$compcode' and led_grp_code = 26";
//        $sql = "select led_code, led_name from acc_ledger_master where led_comp_code = '$compcode' and led_grp_code = 126";

//        $sql = "select led_code, led_name from acc_ledger_master, acc_current_balance where led_grp_code = 126 and curbal_comp_code = '$compcode' and curbal_led_code = led_code  and curbal_finid = '$finid'";
      
//         $sql = "select led_code, led_name from acc_ledger_master where led_comp_code = '$compcode' and led_grp_code = 126";
// $sql = "select led_code, led_name from acc_ledger_master where led_name like '%CASH%' and led_grp_code = 26 order by led_name";

 if ($entrypoint === "H") 
 {
     $sql = "select led_code, led_name from acc_ledger_master where led_code = 1899 order by led_name";
 }
 else
 {
     $sql = "select led_code, led_name from acc_ledger_master where  led_code = 149 order by led_name";
 }
 
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    
    function getBillRealExportInvno()
    {
        global $conn;
        $ledcode = $_POST['ledcode'];
        $compcode = $_POST['compcode'];
        $sql = "call acc_sp_trn_selrealisedexportinvoiceno('$ledcode','$compcode');";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    
    function getExportInvoiceDetailforRealisation()
    {
        global $conn;
        $cinvseqno = $_POST['cinvseqno'];
        $compcode = $_POST['compcode'];
        $flag = $_POST['flag'];
        $cinvno = $_POST['cinvno'];
	if($flag==="E"){
        $sql = "SELECT 
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
		and cinv_seqno = '$cinvseqno'";
	}else if($flag==="F"){
        $sql = "	SELECT 
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
		and cinvseqno = '$cinvseqno'";
	}else if($flag==="M"){
        $sql = "	SELECT 
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
		and cinvseqno = '$cinvseqno'";
	}
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    
    function getFinancialYear()
    {
/*        $sql = "call acc_sp_mas_selfin_master();";
        $sql = "select * from mas_finyear order by fin_code desc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);

*/
        $sql = "select * from mas_finyear order by fin_code desc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);



    }
    
    function getReversalVoucher()
    {
        $acctname = $_POST['acctname'];
        $partyname = $_POST['partyname'];
        $finid = $_POST['finid'];
        $voutype = $_POST['voutype'];

        if ($voutype=='P'){
            $sql = "call acc_sp_trn_selbp_voucherno('$acctname','$finid','$partyname');";
        }else if ($voutype=='R'){
            $sql = "call acc_sp_trn_selbr_voucherno('$acctname','$finid','$partyname');";
        }
        
        
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    
    function getReversalVoucherDetailpay()
    {
        $accrefseq = $_POST['accrefseq'];

        $sql = "call acc_sp_trn_selacc_tran_reversalentry('$accrefseq');";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    function getReversalVoucherDetail()
    {
        $accrefseq = $_POST['accrefseq'];

        $sql = "call acc_sp_trn_selacc_tran_reversalentry('$accrefseq');";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    
    function getReversalVoucherAdjustedBillDetail()
    {
        $accrefseq = $_POST['accrefseq'];
        $partyname = $_POST['partyname'];
        $voutype = $_POST['voutype'];

        if ($voutype=='P'){
            $sql = "call acc_sp_trn_seladjdocument('$accrefseq','$partyname');";
        }else if ($voutype=='R'){
            $sql = "call acc_sp_trn_selreceiptadjdocument('$accrefseq','$partyname');";
        }
        
        
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    
    function getBillAdjustmentVoucherspay()
    {
        $partyname = $_POST['partyname'];
        $voutype = $_POST['voutype'];
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
        if ($voutype=='P'){
            $sql = "select distinct
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
	having sum(acctrail_inv_value) - sum(acctrail_adj_value) > 0";
        }else if ($voutype=='R'){
            $sql = "select distinct
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
	having sum(acctrail_inv_value) - sum(acctrail_adj_value) > 0";
        }
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

    function getBillAdjustmentVouchers()
    {
        $partyname = $_POST['partyname'];
        $voutype = $_POST['voutype'];
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
        $opdate = "2001-08-31";

        if ($voutype=='P'){
            $sql = "call acc_sp_trn_selbilladjustment_payment('$partyname','$compcode','$finid','$opdate','N');";
        }else if ($voutype=='R'){
            $sql = "call acc_sp_trn_selbilladjustment_receipt('$partyname','$compcode','$finid','$opdate','N');";
        }
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    
    function getBillAdjustmentVoucherDetailpay()
    {
        $ledcode = $_POST['ledcode'];
        $accrefseq = $_POST['accrefseq'];

        $sql = "call acc_sp_trn_selaccref_acctrail_invvalue('$ledcode','$accrefseq');";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    function getBillAdjustmentVoucherDetail()
    {
        $ledcode = $_POST['ledcode'];
        $accrefseq = $_POST['accrefseq'];

        $sql = "call acc_sp_trn_selaccref_acctrail_invvalue('$ledcode','$accrefseq');";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    
    function getRecpayAmount()
    {
        $ledcode = $_POST['ledcode'];
        $accrefseq = $_POST['accrefseq'];

        $sql = "call acc_sp_trn_selaccrecpaytran_amount('$ledcode','$accrefseq');";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    
    function getBillAdjustmentAdjustedBillDetail()
    {
        $ledcode = $_POST['ledcode'];
        $accrefseq = $_POST['accrefseq'];

        $sql = "call acc_sp_trn_selrecpay_tran('$accrefseq','$ledcode');";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    function getBillAdjustmentUnAdjustedBillDetailpaytrail()
    {
        $voutype = $_POST['voutype'];
        $compcode = $_POST['compcode'];
        $ledcode = $_POST['ledcode'];
	$flagsss=$_POST['flagsss'];
        if ($voutype=='R'){
            $sql = "call acc_sp_trn_selacc_receipt_billdetails('$compcode','11','$ledcode');";
        }else{
	    if($flagsss=="C"){	
            $sql = "select 
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
		and acc_trail.acctrail_inv_value-acc_trail.acctrail_adj_value > 0 order by accref_voudate desc";
		}else if($flagsss=="D"){	
            $sql = "select 
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
		and acc_trail.acctrail_inv_value-acc_trail.acctrail_adj_value > 0 order by accref_voudate desc";
		}
        }
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    function getBillAdjustmentUnAdjustedBillDetailpay()
    {
        $finid = $_POST['finid'];
        $voutype = $_POST['voutype'];
        $compcode = $_POST['compcode'];
        $ledcode = $_POST['ledcode'];
        if ($voutype=='R'){
            $sql = "call acc_sp_trn_selacc_receipt_billdetails('$compcode','11','$ledcode');";
        }else{
            $sql = "select 
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
		and acc_trail.acctrail_inv_value-acc_trail.acctrail_adj_value > 0 order by accref_voudate";
        }
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    function getBillAdjustmentUnAdjustedBillDetail()
    {
        $voutype = $_POST['voutype'];
        $compcode = $_POST['compcode'];
        $ledcode = $_POST['ledcode'];
        if ($voutype=='R'){
            $sql = "call acc_sp_trn_selacc_receipt_billdetails('$compcode','11','$ledcode');";
        }else{
            $sql = "call acc_sp_trn_selacc_payment_billdetails('$compcode','11','$ledcode');";
        }
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    
?>
