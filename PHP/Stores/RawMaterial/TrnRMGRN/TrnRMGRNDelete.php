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
$rech_no    = $_REQUEST['edgrnno'];

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

$ginaccrefseq = (int)$_POST['accseqno'];

$narration =  $_POST['remarks'];

$rech_seqnonew;

$voutype = 'PWP';

$paymodetype ='';



// QC 
	$query1= "update trn_qc_rm_inspection set qc_rm_grn_status = 'N',qc_rm_grnno = '' , qc_rm_dn_raised = 'N', qc_rm_debitnote_no = '' where qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' and qc_rm_entryno = '$qcinsno'";

        $result1=mysql_query($query1);

//echo $query1;
//echo "<br>";

//GRN


        $query2= "delete from trnrm_receipt_trailer where rect_hdseqno = '$rech_seqno'";
        $result2=mysql_query($query2);
//echo $query2;
//echo "<br>";

        $query3= "delete from trnrm_receipt_header where rech_compcode = $compcode and rech_fincode = $finid  and rech_seqno = '$rech_seqno'";
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


	for ($i=0;$i<$rowcnt;$i++)
	{
	 				
	$sno = $i + 1;


	$ticketno   = $griddet[$i]['ticketno'];
	$itemcode   = $griddet[$i]['itemcode'];
	$billqty    = (float)$griddet[$i]['billwt'];
	$millqty    = (float)$griddet[$i]['ticketwt'];
	$itemrate   = (float)$griddet[$i]['itemrate'];
	$millboard  = (float)$griddet[$i]['millboard'];
	$moismatrialqty  =(float)$griddet[$i]['moismatrialqty'];
	$moisforqty = (float)$griddet[$i]['moisforqty'];
	$moisper    = (float)$griddet[$i]['moisper'];
	$moisqty    = (float)$griddet[$i]['moisqty'];
	$lifelessper= (float)$griddet[$i]['lifelessper'];
	$lifelessqty= (float)$griddet[$i]['lifelessqty'];
	$rejectper  = (float)$griddet[$i]['rejectper'];
	$rejqty     = (float)$griddet[$i]['rejectqty'];
	$degradeqty = (float)$griddet[$i]['degradeqty'];

	$grnqty     = (float)$griddet[$i]['grnqty'] * -1;

	$itemvalue  = (float)$griddet[$i]['itemvalue'];
	$costrate   = (float)$griddet[$i]['costrate'];
	$costvalue  = (float)$griddet[$i]['costvalue'];
	$packtype   = $griddet[$i]['packtype'];
	$remarks    = substr(trim($griddet[$i]['remarks']),0,99);

        $totdedqty = $moisqty + $lifelessqty + $rejqty   + $degradeqty;



	$query5= "update trn_weight_card set wt_grn_process = 'N' where wc_compcode = '$compcode' and wc_fincode = '$finid'  and wc_ticketno = $ticketno";
	 $result5=mysql_query($query5);


	 $query6= "call sprm_upd_itemtrailer_avgrate ('$compcode','$finid','$itemcode','$grnqty','$costrate',1)";
         $result6=mysql_query($query6);

//echo $query6;
//echo "<br>";

	}    




	if($result1 && $result2 && $result3 &&  $result5  &&  $resulta1 &&  $resulta2 &&  $resulta3 )
	{
			mysql_query("COMMIT");                        
			echo '({"success":"true","GRNNo":"' . $rech_no . '"})';

		    
	}
	else
	{
	    mysql_query("ROLLBACK");            
	    echo '({"success":"false","GRNNo":"' . $rech_no . '"})';
	}   

        
 
?>
