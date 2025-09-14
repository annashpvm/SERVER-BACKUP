<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='';
      
    if ( isset($_POST['task'])){
    $task = $_POST['task'];   // Get this from Ext
    }
    switch($task){
        case "LedgerDetails2":
            getLedgerDetails2();
            break;
        case "LedgerNameDetails":
            getLedgerNameDetails();
            break;
        case "ledgercurrency":
            getledgercurrency();
            break;
        case "cmbcurrency":             // Give the entire list
            getCurrency();
            break;
        case "cmbacctname":             // Give the entire list
            getAccountName();
            break;
        case "cmbvoucher":             // Give the entire list
            getVoucherNumber();
            break;
        case "getExno":             // Give the entire list
            getVouNo();
            break;
        case "cmbjouledger":             // Give the entire list
            getJournalLedger();
            break;
        case "getJournalvouno":             // Give the entire list
            getJournalNo();
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
    
           function getLedgerDetails2()
    {
               $led=$_POST['led'];
	$r=mysql_query("select led_code,led_name from acc_ledger_master where  led_code ='$led'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
           function getLedgerNameDetails()
    {
               $led=$_POST['led'];
	$r=mysql_query("call hrsploadledgersdetails('$led')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
       function getledgercurrency()
    {
	$r=mysql_query("call hrsploadledgers()");
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
        $compcode=$_POST['gincompcode'];
	//$r=mysql_query("call acc_sp_mas_selledger_master('$compcode');");
        $r=mysql_query("call acc_sp_mas_selledger_master('$compcode')");
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
         mysql_query("SET NAMES utf8"); 
	$finid=$_POST['ginfinid'];
        $companycode=$_POST['gincompcode'];
	//$r=mysql_query("CALL general_sp_mas_selcontrolmaster('ST','$finyear','IRN','STORES ISSUE RETURN NO','$compcode')");
        $r=mysql_query("select concat('EX',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  	from acc_ref where accref_comp_code = '$companycode' and accref_finid = '$finid' and accref_vouno like 'EX%'");
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
                $arr[]= $re ;
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
        $compcode = $_POST['gincompcode'];
        $r=mysql_query("select led_code,led_name from acc_ledger_master where  led_comp_code ='$compcode'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';         
        
    }
    
      function getJournalNo()
    {
        $finid=$_POST['ginfinid'];
        $companycode=$_POST['gincompcode'];
        $r=mysql_query("select concat('JV',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as accref_vouno  from acc_ref where
                  accref_comp_code = '$companycode' and accref_finid = '$finid' and accref_vouno like 'JV%'");
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
    
?>


