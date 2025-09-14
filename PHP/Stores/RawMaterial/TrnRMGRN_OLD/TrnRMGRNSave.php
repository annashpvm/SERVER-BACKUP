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
$tcsroundneed =  $_POST['tcsroundneed'];
$gstauto =  $_POST['gstauto'];

$rech_seqnonew;

$voutype = 'PWP';

$paymodetype ='';
if ($gstFlaggrn === "Add") {

	$query1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
	$result1 = mysql_query($query1);
	$rec1 = mysql_fetch_array($result1);
	$ginaccrefseq=$rec1['con_value'];



	 $query1 = "select IFNULL(max(rech_seqno),0)+1 as rech_seqno from trnrm_receipt_header";
	 $result1 = mysql_query($query1);
	 $rec1 = mysql_fetch_array($result1);
	 $rech_seqno=$rec1['rech_seqno'];
/*
	 $query2 = "select IFNULL(max(rech_no),0)+1 as rech_no from trnrm_receipt_header where rech_fincode = '$finid' and rech_compcode='$compcode'";
	 $result2= mysql_query($query2);
	 $rec2 = mysql_fetch_array($result2);
	 $rech_no=$rec2['rech_no'];
*/
	 mysql_query("BEGIN");
 
	 $query3= "call sprm_ins_receipt_header('$rech_seqno','$compcode','$finid','$rech_no','$supcode','$ordseqno','$crdays','$grndate','$areacode' ,'$truck', '$frtype', '$itemval','$sgstper','$sgstamt','$cgstper','$cgstamt','$igstper','$igstamt','$tcsper','$tcsamt', '$freight', '$otheramt','$roundoff','$totamt','$billno', '$billdate' ,'$billval','$usrcode','$entrydate','$gateentryno','$gatedate','$ginaccrefseq', '$roundneed', '$qcinsno','$purledger','L','','$tcsroundneed','$gstauto','0','0')";

//echo $query3;
//echo "<br>";

	 $result3=mysql_query($query3);

	$query2= "update trn_qc_rm_inspection set qc_rm_grn_status = 'Y',qc_rm_grnno = '$rech_no' where qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' and qc_rm_entryno = '$qcinsno'";

	 $result2=mysql_query($query2);





}
else
{



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



  //    $query11= "call sprm_del_receipt_trailer ('$compcode','$finid','$rech_seqno','$edpono')";
      $query11= "delete from trnrm_receipt_trailer where rect_hdseqno = '$rech_seqno'";


      $result11=mysql_query($query11);

//echo $query11;
//echo "<br>";

      $query14= "call sprm_upd_receipt_header('$rech_seqno','$grndate','$areacode' ,'$crdays','$truck','$frtype', '$itemval','$sgstper', '$sgstamt','$cgstper','$cgstamt','$igstper','$igstamt','$tcsper','$tcsamt','$freight', '$otheramt','$roundoff','$totamt','$billno','$billdate', '$billval','$gateentryno','$gatedate','$roundneed','$purledger','$paymodetype','$tcsroundneed','$gstauto','0','0'  )";
	$result14=mysql_query($query14);

//echo $query14;
//echo "<br>";

}






	for ($i=0;$i<$rowcnt;$i++)
	{
	 				
	$sno = $i + 1;

	$itemtype   = $griddet[$i]['itemtype'];
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
	$grnqty     = (float)$griddet[$i]['grnqty'];
	$itemvalue  = (float)$griddet[$i]['itemvalue'];
	$costrate   = (float)$griddet[$i]['costrate'];
	$costvalue  = (float)$griddet[$i]['costvalue'];
	$packtype   = $griddet[$i]['packtype'];
	$remarks    = substr(trim($griddet[$i]['remarks']),0,99);

        $totdedqty = $moisqty + $lifelessqty + $rejqty   + $degradeqty;


	 $query4= "insert into trnrm_receipt_trailer values('$rech_seqno','$sno','$itemcode',$ticketno,'$billqty',0,0,'$millqty','$millboard','$moismatrialqty','$moisforqty','$moisper','$moisqty',$lifelessper,'$lifelessqty',$rejectper,'$rejqty','$totdedqty', '$degradeqty', upper('$remarks') ,'$packtype','$grnqty','$itemrate','$itemvalue','$costrate','$costvalue','$itemtype')";

	 $result4=mysql_query($query4);


 // echo $query4;
  //echo "<br>";


	$query5= "update trn_weight_card set wt_grn_process = 'Y' where wc_compcode = '$compcode' and wc_fincode = '$finid'  and wc_ticketno = $ticketno";
	 $result5=mysql_query($query5);

//echo $query5;
//echo "<br>";

	 $query6= "call sprm_upd_itemtrailer_avgrate ('$compcode','$finid','$itemcode','$grnqty','$costrate',1)";
         $result6=mysql_query($query6);

//echo $query6;
//echo "<br>";


	if ($ordseqno > 0)
	{

	 $query7 = "update  trnrm_order_trailer set ordt_rec_qty = ordt_rec_qty + $grnqty where ordt_item_code =  $itemcode  and  ordt_hdseqno = $ordseqno and ordt_areacode in (select area_code from mas_area where area_grpcode = $areagrpcode)";
	 $result7= mysql_query($query7);

	//echo $query7;
	//echo "<br>";
	}    
}

if ($ginaccrefseq > 0) {


    $querya1 = "call acc_sp_trn_insacc_ref('$ginaccrefseq','$rech_no','$compcode','$finid','$grndate','$voutype', '$bankname','$paymode','$billno', '$billdate','$narration');";
    $resulta1 = mysql_query($querya1);

//echo $querya1;
//echo "<br>";

$cquerya3 = "insert into acc_voucher_logs values ($ginaccrefseq,$reccount,'$today',$usercode,'$reason')";
$cresulta3 = mysql_query($cquerya3);


//echo $cquerya3;


$griddetacc = json_decode($_REQUEST['griddetacc'],true);
$rowcntacc = $_REQUEST['cntacc'];


        $inscnt = 0;
        for($i=0;$i<$rowcntacc;$i++){
            $slno = $i+1;
            $ledseq = $griddetacc[$i]['ledcode'];
            $dbamt = (float) $griddetacc[$i]['debit'];
            $cramt = (float) $griddetacc[$i]['credit'];
            $totamt =   $dbamt +  $cramt; 
            $ledtype = $griddetacc[$i]['ledtype'];
            if ($dbamt>0)
            {
              $amtmode = "D";
            }
            else
            {
              $amtmode = "C";
            }
            $adjamt=0;
            if($ledseq>0){
            #Insert AccTrail
               if ($ledtype != 'G')
               {
               $querya2 = "call acc_sp_trn_insacc_trail ('$ginaccrefseq','$slno','$billno', '$billdate', '$totamt' ,'$adjamt' ,'$ledseq' ,'$amtmode','$crdays','0')";
               $resulta2 = mysql_query($querya2);
//echo  $querya2;
//echo "<br>";

               }  


            #Insert AccTran

            $querya3 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$ledseq','$dbamt','$cramt','$totamt','$voutype','');";
            $resulta3 = mysql_query($querya3);

//echo  $querya3;	   
//echo "<br>";
            if(resulta3){
                $inscnt = $inscnt + 1;
            }

	  }
        }
}


if ($gstFlaggrn === "Add") {    
	if($result3 && $result4 && $result5 &&  $result6  &&  $resulta1 &&  $resulta2 &&  $resulta3 )
	{
			mysql_query("COMMIT");                        
			echo '({"success":"true","GRNNo":"' . $rech_no . '"})';

		    
	}
	else
	{
	    mysql_query("ROLLBACK");            
	    echo '({"success":"false","GRNNo":"' . $rech_no . '"})';
	}   
}
if ($gstFlaggrn === "Edit") {   
	if( $result11 && $result14 &&  $result4   &&  $resulta1 &&  $resulta2 &&  $resulta3  )
	{
		mysql_query("COMMIT");                        
		echo '({"success":"true","GRNNo":"'. $rech_no  . '"})';

		    
	}
	else
	{
	    mysql_query("ROLLBACK");            
	    echo '({"success":"false","GRNNo":"' . $rech_no  . '"})';
	} 
} 
       
 
?>
