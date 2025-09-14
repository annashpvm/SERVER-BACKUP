<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='';
    
    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }

    switch($task){
        case "cmbcurrency":             // Give the entire list
            getCurrency();
            break;
        case "cmbacctname":             // Give the entire list
            getAccountName();
            break;
        case "cmbvoucher":             // Give the entire list
            getVoucherNumber();
            break;
        case "getvouno":             // Give the entire list
            getVouNo();
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
        case "getsubgroup":             // Give the entire list
            getSubGroups();
            break;
        case "getgrpwisetotamt":             // Give the entire list
            getGroupwiseTotalAmount();
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
        $compcode = $_POST['gincompcode'];
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
    
    function getVoucherNumber()
    {
        $compcode = $_POST['gincompcode'];
        $finid=$_POST['finid'];
        $voutype=$_POST['voutype'];
	$r=mysql_query("call acc_sp_trn_selvoucher_no('$finid','$compcode','$voutype');");
        //$r=mysql_query("select led_code, led_name from acc_ledger_master 
        //    where led_comp_code	= 1 and led_status = 'Y' and led_duplicate = 'N'
        //    and led_code <= 30600 order by led_code");
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
        $compcode=$_POST['gincompcode'];
	//$r=mysql_query("CALL general_sp_mas_selcontrolmaster('ST','$finyear','IRN','STORES ISSUE RETURN NO','$compcode')");
        $r=mysql_query("select con_value from control_master where con_module='AC' and con_finyear='$finyear' and con_prefix='EXV' and con_desc='EXPENCE VOUCHER NO' and con_company_code='$compcode';");
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
            //$pst_grpcode = $pst_grpcode.",".$pst_grpcode1;
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
	mysql_query("SET NAMES utf8");
        $compcode=$_POST['gincompcode'];
        $r=mysql_query("select led_code,led_name from acc_ledger_master where led_grp_code not in ('43') and 
                led_comp_code='$compcode' and led_status='Y' and led_duplicate='N';");
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
        $compcode=$_POST['gincompcode'];
	//$r=mysql_query("CALL general_sp_mas_selcontrolmaster('ST','$finyear','IRN','STORES ISSUE RETURN NO','$compcode')");
        $r=mysql_query("select con_value from control_master where con_module='AC' and con_finyear='$finyear' and con_prefix='AJV' and con_desc='ACC_JOURNAL_VOUCHER_NO' and con_company_code='$compcode';");
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
        $compcode=$_POST['gincompcode'];
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
        /*$r=mysql_query("select led_code, led_name from acc_ledger_master 
            where led_comp_code	= 1 and led_status = 'Y' and led_duplicate = 'N'
            and led_code <= 30600 order by led_code");*/
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
        $compcode = $_POST['gincompcode'];
	//$r=mysql_query("call acc_sp_mas_selledger_master('$compcode');");
        $r=mysql_query("select led_code, led_name from acc_ledger_master 
            where led_comp_code	= '$compcode' and led_grp_code in (20,90,21,22,23,24,25,91,92,93,94,95,96,102,182)");
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
        $compcode = $_POST['gincompcode'];
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
    
    function getReceiptBillsDetailtoAdjust()
    {
	$finid=$_POST['finid'];
        $compcode=$_POST['gincompcode'];
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
        $compcode=$_POST['gincompcode'];
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


echo $pstgrpcode;

        $r=mysql_query("select b.grp_code, b.grp_name, 'G' as acctype, sum(obdbamt) as totdbamt,sum(obcramt) as totcramt from 
            (select grp_code, grp_name, sum(curbal_obdbamt) as obdbamt,sum(curbal_obcramt) as obcramt 
            from acc_group_master, acc_ledger_master, acc_current_balance 
            where curbal_finid = '$finid' and led_code = curbal_led_code and grp_code = led_grp_code 
            and led_grp_code in (".$pstgrpcode.") and led_comp_code = grp_comp_code and grp_comp_code = '$compcode' group by grp_code
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
    
?>
