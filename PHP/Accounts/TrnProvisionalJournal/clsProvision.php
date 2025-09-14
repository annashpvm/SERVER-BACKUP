<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
    session_start();

//    $_SESSION['gincompcode'] =$_POST['compcode'];
//    $_SESSION['ginfinid']    = $_POST['finid'];
//    $_SESSION['gstfinyear']  = "2014-2015";




    $task='cmbacctname';



/*
    if ( isset($_POST['finid'])){
        $_SESSION['ginfinid'] = $_POST['finid']; // Get this from Ext
    }else{
        $_SESSION['ginfinid'] = 25;
    }
    
    if ( isset($_POST['finyear'])){
        $_SESSION['gstfinyear'] = $_POST['finyear']; // Get this from Ext
    }else{
        $_SESSION['gstfinyear'] = "2018-2019";
    }
    
    if ( isset($_POST['compcode'])){
        $_SESSION['gincompcode'] = $_POST['compcode']; // Get this from Ext
    }else{
        $_SESSION['gincompcode'] = 1;
   }

 */

    
    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }

    //$grpcode='100';
    //$pst_grpcode1 = 100;

mysql_query("SET NAMES utf8");
    switch($task){
	case "VoucherNoDetailDate";
	getVoucherNoDetailDate();
	break;
        case "cmbcurrency":             // Give the entire list
            getCurrency();
            break;
        case "cmbacctname":             // Give the entire list
            getAccountName();
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
        case "getrevoudet":
             getReversalVoucherDetail();
            break;
        case "getadjbilldet":
             getReversalVoucherAdjustedBillDetail();
            break;
        case "cmbadjvoucher":
             getBillAdjustmentVouchers();
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
    
    function getAccountName()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];


        $r=mysql_query("select cust_code, cust_name from acc_ledger_master");
 
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
        $ledname = $_POST['ledname'];
	//$r=mysql_query("call acc_sp_mas_selledger_master('$compcode');");
        $r=mysql_query("select cust_code, cust_name from massal_customer 
        where led_comp_code	= '$compcode' and cust_name like '$ledname' and led_status = 'Y' and led_duplicate = 'N'
        and cust_acc_group not in (43,168,169,170,171,172,204)");
        
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
        $compcode = $_SESSION['gincompcode'];
        $finid=$_POST['finid'];
        $voutype=$_POST['voutype'];
	$r=mysql_query("call acc_sp_trn_selvoucher_no('$finid','$compcode','$voutype');");
        //$r=mysql_query("select cust_code, cust_name from massal_customer 
        //    where led_comp_code	= 1 and led_status = 'Y' and led_duplicate = 'N'
        //    and cust_code <= 30600 order by cust_code");
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
        $r=mysql_query("select ifnull(max(convert(substring(accref_vouno,4),signed)),0) +1 as con_value from acc_ref where accref_vou_type = 'EX' and accref_finid = '$finyear' and accref_comp_code = '$compcode';");
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
        $r=mysql_query("select ifnull(max(convert(substring(accref_vouno,4),signed)),0) +1 as con_value from acc_ref where accref_vou_type = 'CT' and accref_finid = '$finyear' and accref_comp_code = '$compcode';");
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
        $compcode=$_SESSION['gincompcode'];
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
            //$pst_grpcode = $pst_grpcode.",".$pst_grpcode1;
        }while ($cnt>0);
        return $pst_grpcode;
        
    }
    
    function getLedger(){
        $compcode=$_SESSION['gincompcode'];
        //$grpcode=$_POST['grpcode'];
        $pstgrpcode = FindSubgroup("10");
        $r=mysql_query("select cust_code,cust_name from massal_customer where cust_acc_group in (".$pstgrpcode.") and "
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
        $compcode=$_SESSION['gincompcode'];
        $r=mysql_query("select cust_code,cust_name from massal_customer where cust_acc_group not in ('43') and "
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
	$finyear=$_POST['finid'];
        $compcode=$_POST['compcode'];
	//$r=mysql_query("CALL general_sp_mas_selcontrolmaster('ST','$finyear','IRN','STORES ISSUE RETURN NO','$compcode')");
        $r=mysql_query("select ifnull(max(convert(substring(accref_vouno,4),signed)),0) +1 as con_value from accrefprovision where  accref_finid = '$finyear' and accref_comp_code = '$compcode';");
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
        $compcode = $_SESSION['gincompcode'];
	$r=mysql_query("call acc_sp_selregiongroup('$compcode');");
        /*$r=mysql_query("select cust_code, cust_name from massal_customer 
            where led_comp_code	= 1 and led_status = 'Y' and led_duplicate = 'N'
            and cust_code <= 30600 order by cust_code");*/
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
	//$r=mysql_query("call acc_sp_mas_selledger_master('$compcode');");
        $r=mysql_query("select cust_code, cust_name from massal_customer 
            where led_comp_code	= '$compcode' and cust_acc_group in (20,90,21,22,23,24,25,91,92,93,94,95,96,102,182) and led_status ='Y' and led_duplicate='N'");
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
        //$r=mysql_query("select cust_code, cust_name from massal_customer 
        //    where led_comp_code	= '$compcode' and cust_acc_group in (20,90,21,22,23,24,25,91,92,93,94,95,96,102,182)");
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
        //$r=mysql_query("select cust_code, cust_name from massal_customer 
        //    where led_comp_code	= '$compcode' and cust_acc_group in (20,90,21,22,23,24,25,91,92,93,94,95,96,102,182)");
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
        //$r=mysql_query("select cust_code, cust_name from massal_customer 
        //    where led_comp_code	= '$compcode' and cust_acc_group in (20,90,21,22,23,24,25,91,92,93,94,95,96,102,182)");
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
        $compcode = $_SESSION['gincompcode'];
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
        $compcode = $_SESSION['gincompcode'];
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
        $compcode=1;//$_SESSION['gincompcode'];
        $finid=23;//$_POST['finid'];
        //$grpcode=$_POST['grpcode'];
        $pstgrpcode = FindSubgroup($grpcode);

        $r=mysql_query("select b.grp_code, b.grp_name, 'G' as acctype, sum(obdbamt) as totdbamt,sum(obcramt) as totcramt from 
            (select grp_code, grp_name, sum(curbal_obdbamt) as obdbamt,sum(curbal_obcramt) as obcramt 
            from acc_group_master, acc_ledger_master, acc_current_balance 
            where curbal_finid = '$finid' and cust_code = curbal_cust_code and grp_code = cust_acc_group 
            and cust_acc_group in (".$pstgrpcode.") and led_comp_code = grp_comp_code and grp_comp_code = '$compcode'
            group by grp_code
            union all
            select grp_code, grp_name, sum(acctran_dbamt) as obdbamt,sum(acctran_cramt) as obcramt 
            from acc_group_master, acc_ledger_master, acc_ref, acc_tran 
            where accref_seqno = acctran_accref_seqno and 
            accref_finid = '$finid' and accref_comp_code = '$compcode' and accref_vou_type not in ('OB','UB','BA') 
            and accref_voudate >= '2015-04-01' and accref_voudate <= '2016-03-31' 
            and acctran_cust_code = cust_code and cust_acc_group = grp_code
            and cust_acc_group in (".$pstgrpcode.") and cust_acc_group not in ('$grpcode') and accref_comp_code = led_comp_code 
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
        $compcode=1;//$_SESSION['gincompcode'];
        $finid=22;//$_POST['finid'];
        //$grpcode=$_POST['grpcode'];
        $pstgrpcode = $grpcode;
        mysql_query("SET NAMES utf8");  
        $r=mysql_query("select grp_code , grp_name, 'L' as acctype, sum(obdbamt) as totdbamt, sum(obcramt) as totcramt from
            (select cust_code as grp_code, cust_name as grp_name, sum(curbal_obdbamt) as obdbamt,sum(curbal_obcramt) as obcramt 
            from acc_ledger_master, acc_current_balance 
            where curbal_finid = '$finid' and cust_code = curbal_cust_code 
            and cust_acc_group in ('$pstgrpcode') and led_comp_code = '$compcode'
            group by cust_code
            union all
            select cust_code as grp_code, cust_name as grp_name, sum(acctran_dbamt) as obdbamt,sum(acctran_cramt) as obcramt 
            from acc_ledger_master, acc_ref, acc_tran 
            where accref_seqno = acctran_accref_seqno and 
            accref_finid = '$finid' and accref_comp_code = '$compcode' and accref_vou_type not in ('OB','UB','BA') 
            and accref_voudate >= '2015-04-01' and accref_voudate <= '2016-03-31' 
            and acctran_cust_code = cust_code and cust_acc_group in ('$pstgrpcode') and accref_comp_code = led_comp_code 
            and led_comp_code = '$compcode'
            group by cust_code) a group by grp_name, grp_code;");
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
        $compcode = 1;//$_SESSION['gincompcode'];
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
	//$r=mysql_query("call acc_sp_mas_selledger_master('$compcode');");
        $r=mysql_query("select cust_code, cust_name from massal_customer 
            where led_comp_code	= '$compcode' and cust_acc_group = 26");
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

        $r=mysql_query("call acc_sp_trn_selrealisedexportinvoiceno(".$ledcode.",".$compcode.");");
        
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

        $r=mysql_query("call acc_sp_trn_selexpoinvdetailforrealisation(".$cinvseqno.",".$compcode.");");
        
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
