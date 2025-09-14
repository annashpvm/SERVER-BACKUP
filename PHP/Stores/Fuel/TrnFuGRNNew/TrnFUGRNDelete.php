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
$grnno      = $_REQUEST['grnno'];

$ginaccrefseq = (int)$_POST['accseqno'];
$dnaccseqno = (int)$_POST['dnaccseqno'];
$dnseqno    = (int)$_POST['dnseqno'];
$ticketno   = (int)$_POST['ticketno'];
$qcinsno    = (int)$_POST['qcinsno'];




$edpono     = $_REQUEST['edpono'];
$supcode    = $_REQUEST['supcode'];
$ordseqno   = $_REQUEST['ordseqno'];
$grndate    = $_REQUEST['grndate'];







$areacode   = $_REQUEST['areacode'];
$areagrpcode   = $_REQUEST['areagrpcode'];


$truck      = $_REQUEST['truck'];
$frtype     = $_REQUEST['freighttype'];
$itemval    = (float)$_REQUEST['itemval'];
$sgstper    = (float)$_REQUEST['sgstper'];
$sgstamt    = (float)$_REQUEST['sgstamt'];
$cgstper    = (float)$_REQUEST['cgstper'];
$cgstamt    = (float)$_REQUEST['cgstamt'];
$igstper    = (float)$_REQUEST['igstper'];
$igstamt    = (float)$_REQUEST['igstamt'];
$tcsper     = (float)$_REQUEST['tcsper'];
$tcsamt     = (float)$_REQUEST['tcsamt'];
//$servchrg   = (float)$_REQUEST['servchrg'];
$freight    = (float)$_REQUEST['freight'];
$otheramt    = (float)$_REQUEST['otheramt'];

$roundoff= (float)$_REQUEST['roundoff'];
$totamt= (float)$_REQUEST['totamt'];
$billno=  $_REQUEST['billno'];

$billno  = strtoupper(trim($_POST['billno']));

$billdate= $_REQUEST['billdate'];
$billval= (float)$_REQUEST['billval'];
//$frparty= $_REQUEST['frparty'];
$frvouno= $_REQUEST['frvouno'];
$vouno= $_REQUEST['vouno'];
$acctflag= $_REQUEST['acctflag'];
$accdate= $_REQUEST['accdate'];
$status= $_REQUEST['status'];
$usrcode= $_REQUEST['usrcode'];
$entrydate= $_REQUEST['entrydate'];
$gateentryno= (int) $_REQUEST['gateentryno'];
$gatedate= $_REQUEST['gatedate'];


$crdays = (int)$_POST['crdays'];

$roundneed = $_POST['roundneed'];
$qcinsno   = (int)$_POST['qcinsno'];
$purledger = (int)$_POST['purledger'];



$narration =  $_POST['remarks'];

$rech_seqnonew;

$voutype = 'PWP';

$paymodetype ='';



// QC 
	$query1= "update trn_qc_fuel_inspection set qc_fuel_grn_status = 'N',qc_fuel_grnno = '' , qc_fuel_dn_raised = 'N', qc_fuel_debitnote_no = '' where qc_fuel_compcode = '$compcode' and qc_fuel_fincode = '$finid' and qc_fuel_entryno = '$qcinsno'";

       $result1=mysql_query($query1);

//echo $query1;
//echo "<br>";

//GRN



	$query3 = "update trnfu_receipt_trailer, masfu_item_trailer set itmt_clqty = itmt_clqty -  rect_grnqty ,itmt_clvalue = itmt_clvalue - rect_costvalue  where itmt_compcode= '$compcode' and itmt_fincode = '$finid' and  rect_item_code = itmt_hdcode and rect_hdseqno = $rech_seqno;";
        $result3=mysql_query($query3);

//echo $query3;
//echo "<br>";

	$query4 = "update trnfu_receipt_trailer, masfu_item_trailer set itmt_avgrate = case when itmt_clvalue > 0 and itmt_clqty > 0 then itmt_clvalue / itmt_clqty else 0 end  where itmt_compcode= '$compcode' and itmt_fincode = '$finid' and  rect_item_code = itmt_hdcode and rect_hdseqno = $rech_seqno;";
        $result4=mysql_query($query4);



        $query2= "delete from trnfu_receipt_trailer where rect_hdseqno = '$rech_seqno'";
        $result2=mysql_query($query2);
//echo $query2;
//echo "<br>";

        $query3= "delete from trnfu_receipt_header where rech_compcode = $compcode and rech_fincode = $finid  and rech_seqno = '$rech_seqno'";
       $result3=mysql_query($query3);

//echo $query3;
//echo "<br>";

//ACCOUNTS
	$querya1 = "delete from acc_trail  where acctrail_accref_seqno = '$ginaccrefseq'";
        $resulta1 = mysql_query($querya1);
//echo $querya1;
//echo "<br>";
	$querya2 = "delete from acc_tran  where acctran_accref_seqno = '$ginaccrefseq'";
        $resulta2 = mysql_query($querya2);
//echo $querya2;
//echo "<br>";	
        $querya3 = "delete from acc_ref  where accref_seqno ='$ginaccrefseq' and accref_comp_code='$compcode' and accref_finid ='$finid'";
        $resulta3 = mysql_query($querya3);
//echo $querya3;
//echo "<br>";	



	$query5= "update trn_weight_card set wt_grn_process = 'N' where wc_compcode = '$compcode' and wc_fincode = '$finid'  and wc_ticketno = $ticketno";
	 $result5=mysql_query($query5);

//echo $query5;
//echo "<br>";	



    
	if($result1 && $result2 && $result3 &&  $result5  &&  $resulta1 &&  $resulta2 &&  $resulta3 )
	{
			mysql_query("COMMIT");                        
			echo '({"success":"true","GRNNo":"' . $grnno . '"})';

		    
	}
	else
	{
	    mysql_query("ROLLBACK");            
	    echo '({"success":"false","GRNNo":"' . $grnno . '"})';
	}   

        
 
?>
