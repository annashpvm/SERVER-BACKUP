<?php

require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_REQUEST['cnt'];

$griddetacc = json_decode($_REQUEST['griddetacc'],true);
$rowcntacc = $_REQUEST['cntacc'];



$compcode = $_REQUEST['compcode'];
$finid    = $_REQUEST['finid'];
$gstFlaggrn = $_REQUEST['gstFlaggrn'];

$rech_seqno = $_REQUEST['seqno'];
$rech_no    = strtoupper($_REQUEST['edgrnno']);
$ginaccrefseq = (int)$_POST['accseqno'];
$qcinsno    = (int)$_POST['qcinsno'];
$newsupcode = (int)$_POST['newsupcode'];
$oldsupcode = (int)$_POST['oldsupcode'];


mysqli_begin_transaction($conn);   

$query1  = "update trnrm_receipt_header set rech_sup_code = '$newsupcode'  where rech_compcode = $compcode and rech_fincode = $finid  and rech_seqno = '$rech_seqno' and rech_no = '$rech_no'";
$result1 = mysqli_query($conn, $query1);

//echo $query1;
//echo "<br>";

//ACCOUNTS
$query2  = "update acc_tran set acctran_led_code = '$newsupcode'  where acctran_accref_seqno ='$ginaccrefseq' and acctran_led_code='$oldsupcode'";
$result2 = mysqli_query($conn, $query2);
//echo $query2;
//echo "<br>";	

$query3  = "update acc_trail set acctrail_led_code = '$newsupcode'  where acctrail_accref_seqno ='$ginaccrefseq' and acctrail_led_code='$oldsupcode'";
$result3 = mysqli_query($conn, $query3);
//echo $query3;
//echo "<br>";	

//QC
$query4  = "update trn_qc_rm_inspection  set qc_rm_supcode = '$newsupcode' where qc_rm_grnno = '$rech_no' and qc_rm_fincode = '$finid' and qc_rm_compcode = '$compcode'";
$result4 = mysqli_query($conn, $query4);

//echo $query4;
//echo "<br>";

$query5  = "update acc_adjustments set ref_ledcode = '$newsupcode' where ref_ledcode = '$oldsupcode' and ref_finid = '$finid' and ref_compcode = '$compcode' and  (ref_docseqno = $dnaccseqno or ref_adjseqno =  $dnaccseqno  or  ref_docseqno = $ginaccrefseq or ref_adjseqno =  $ginaccrefseq )";
$result5 = mysqli_query($conn, $query5);

//echo $query5;
//echo "<br>";





	if($result1 && $result2 && $result3 && $result4 )
	{
		    mysqli_commit($conn);                        
			echo '({"success":"true","GRNNo":"' . $rech_no . '"})';

		    
	}
	else
	{
	    mysqli_rollback($conn);

            
	    echo '({"success":"false","GRNNo":"' . $rech_no . '"})';
	}   
 
?>
