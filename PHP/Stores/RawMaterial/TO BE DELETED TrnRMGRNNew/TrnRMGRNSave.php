<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_REQUEST['cnt'];

$griddetacc = json_decode($_REQUEST['griddetacc'],true);
$rowcntacc = $_REQUEST['cntacc'];

$griddetaccDN = json_decode($_REQUEST['griddetaccDN'],true);
$rowcntaccDN = $_REQUEST['cntaccDN'];

$compcode = $_REQUEST['compcode'];
$finid    = $_REQUEST['finid'];
$gstFlaggrn = $_REQUEST['gstFlaggrn'];

$rech_seqno = $_REQUEST['seqno'];
$rech_no    = $_REQUEST['edgrnno'];
$grnno      = $_REQUEST['edgrnno'];
$edpono     = $_REQUEST['edpono'];
$supcode    = $_REQUEST['supcode'];
$ordseqno   = $_REQUEST['ordseqno'];
$grndate    = $_REQUEST['grndate'];

$DNdate    = $_REQUEST['DNdate'];

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
$otheramt   = (float)$_REQUEST['otheramt'];


$dntaxable  = (float)$_REQUEST['dntaxable'];

$dncgst     = (float)$_REQUEST['dncgst'];
$dnsgst     = (float)$_REQUEST['dnsgst'];
$dnigst     = (float)$_REQUEST['dnigst'];

$dntcs      = (float)$_REQUEST['dntcs'];
$tcsledger  = (int)$_POST['tcsledger'];



$dnother    = (float)$_REQUEST['dnother'];
$dnotherledcode   = (float)$_REQUEST['dnotherledcode'];
$debitnoteamount   = (float)$_REQUEST['dnamount'];
$dnqty   = (float)$_REQUEST['dnqty'];






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

$ginaccrefseq     = (int)$_POST['accseqno'];
$ginaccrefseqDN   = (int)$_POST['dnaccseqno'];
$gindbcrseq       = (int)$_POST['dnseqno'];

$narration =  $_POST['remarks'];

$dnremarks   = substr(trim($_POST['dnremarks']),0,495);

$tcsroundneed =  $_POST['tcsroundneed'];
$gstauto =  $_POST['gstauto'];
$dntype  =  $_POST['dntype'];

$payterms = (int)$_POST['payterms'];
$hsncode    = $_REQUEST['hsncode'];
$itemname   = $_REQUEST['itemname'];
$finsuffix  = $_REQUEST['finsuffix'];


$cgstledcode = (int)$_POST['cgstledcode'];
$sgstledcode = (int)$_POST['sgstledcode'];
$igstledcode = (int)$_POST['igstledcode'];


$dncgstledcode = (int)$_POST['dncgstledcode'];
$dnsgstledcode = (int)$_POST['dnsgstledcode'];
$dnigstledcode = (int)$_POST['dnigstledcode'];


$shortageqty     = (float)$_REQUEST['shortageqty'];
$shortagevalue   = (float)$_REQUEST['shortagevalue'];
$ratediffvalue   = (float)$_REQUEST['ratediffvalue'];


$rech_seqnonew;

$voutype = 'PWP';
$today = date("Y-m-d H:i:s"); 


$grnstatus     = $_REQUEST['grnstatus'];


if ($dntype  == 'DNN')
{
$sgstper    = 0;
$cgstper    = 0;
$igstper    = 0;
}


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
 
	 $query3= "call sprm_ins_receipt_header('$rech_seqno','$compcode','$finid','$rech_no','$supcode','$ordseqno','$crdays','$grndate','$areacode' ,'$truck', '$frtype', '$itemval','$sgstper','$sgstamt','$cgstper','$cgstamt','$igstper','$igstamt','$tcsper','$tcsamt', '$freight', '$otheramt','$roundoff','$totamt','$billno','$billdate' ,'$totamt','$usrcode','$entrydate','$gateentryno','$gatedate','$ginaccrefseq', '$roundneed', '$qcinsno','$purledger','L','','$tcsroundneed','$gstauto' ,'$dnother', '$dnotherledcode','$grnstatus')";

//echo $query3;
//echo "<br>";

	 $result3=mysql_query($query3);

/*
	$query2= "update trn_qc_rm_inspection set qc_rm_grn_status = 'Y',qc_rm_grnno = '$rech_no' where qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' and qc_rm_entryno = '$qcinsno'";

	 $result2 =mysql_query($query2);

*/



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


      $queryStock1= "update  trnrm_receipt_trailer , masrm_item_trailer  set itmt_clqty = itmt_clqty - rect_grnqty ,  itmt_clvalue = itmt_clvalue - rect_itemvalue   where itmt_compcode = '$compcode'  and itmt_fincode = '$finid' and itmt_hdcode = rect_item_code and rect_hdseqno = '$rech_seqno'";
      $resultStock1=mysql_query($queryStock1);



      $queryStock2= "update  trnrm_receipt_trailer , masrm_item_trailer  set itmt_avgrate = case when itmt_clvalue > 0 and  itmt_clqty then itmt_clvalue / itmt_clqty  else 0 end  where itmt_compcode = '$compcode'  and itmt_fincode = '$finid' and itmt_hdcode = rect_item_code and rect_hdseqno = '$rech_seqno'";
     $resultStock2=mysql_query($queryStock2);


      $query11= "delete from trnrm_receipt_trailer where rect_hdseqno = '$rech_seqno'";


      $result11=mysql_query($query11);

//echo $query11;
//echo "<br>";

      $query14= "call sprm_upd_receipt_header('$rech_seqno','$grndate','$areacode' ,'$crdays','$truck','$frtype', '$itemval','$sgstper', '$sgstamt','$cgstper','$cgstamt','$igstper','$igstamt','$tcsper','$tcsamt','$freight', '$otheramt','$roundoff','$totamt','$billno','$billdate', '$totamt','$gateentryno','$gatedate','$roundneed','$purledger','$paymodetype','$tcsroundneed','$gstauto' ,'$dnother', '$dnotherledcode' ,'$grnstatus' )";
	$result14=mysql_query($query14);

//echo $query14;
//echo "<br>";


        $queryac4 = "delete from acc_adjustments  where ref_adjseqno ='$ginaccrefseq' and ref_compcode='$compcode' and ref_finid ='$finid'";
        $resultac4 = mysql_query($queryac4);
//echo $queryac4;
//echo "<br>"; 

        if ($ginaccrefseqDN > 0)
        {

		$queryac5  = "delete from acc_trail where  acctrail_accref_seqno =$ginaccrefseqDN";
		$resultac5 = mysql_query($queryac5);   
//echo $queryac5;
//echo "<br>"; 			 
		$queryac6  = "delete from acc_tran  where  acctran_accref_seqno  =$ginaccrefseqDN";
		$resultac6 = mysql_query($queryac6);   
//echo $queryac6;
//echo "<br>"; 
		$queryac7  = "delete from acc_ref  where  accref_seqno  =$ginaccrefseqDN";
		$resultac7 = mysql_query($queryac7);   
//echo $queryac7;
//echo "<br>"; 

        }  

}






	for ($i=0;$i<$rowcnt;$i++)
	{
	 				
	$sno = $i + 1;


	$itemtype   = $griddet[$i]['itemtype'];
	$ticketno   = $griddet[$i]['ticketno'];
	$itemcode   = $griddet[$i]['itemcode'];
	$billqty    = (float)$griddet[$i]['billwt'];
	$billrate   = (float)$griddet[$i]['billrate'];
	$billvalue  = (float)$griddet[$i]['billvalue'];
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

	$actmois    = (float)$griddet[$i]['actmois'];
	$moistol    = (float)$griddet[$i]['moistol'];
	$moistol    = (float)$griddet[$i]['moistol'];
	$shortqty   = (float)$griddet[$i]['shortqty'];


	$packtype   = $griddet[$i]['packtype'];
	$remarks    = substr(trim($griddet[$i]['remarks']),0,299);

        $totdedqty = $moisqty + $lifelessqty + $rejqty   + $degradeqty;


        $billqty2 = $billqty * 1000;
        $degradeqty2 = $degradeqty * 1000;



	 $query4= "insert into trnrm_receipt_trailer values('$rech_seqno','$sno','$itemcode',$ticketno,'$billqty','$billrate','$billvalue' ,'$millqty','$millboard','$moismatrialqty','$moisforqty','$moisper','$moisqty',$lifelessper,'$lifelessqty',$rejectper,'$rejqty','$totdedqty', '$degradeqty', upper('$remarks') ,'$packtype','$grnqty','$itemrate','$itemvalue','$costrate','$costvalue','$itemtype','$actmois','$moistol','$shortqty')";

	 $result4=mysql_query($query4);


//  echo $query4;
//  echo "<br>";


 $queryQC2 = "update trn_qc_rm_inspection set qc_rm_billqty = $billqty2   where qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' and  qc_rm_entryno = '$qcinsno' and qc_rm_itemcode = '$itemcode' and qc_rm_degradeqty = $degradeqty2";

//echo $queryQC2;
//echo "<br>";

$resultQC2 = mysql_query($queryQC2);

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

$cquerya4 = "insert into acc_voucher_logs values ($ginaccrefseq,$reccount,'$today',$usrcode,'$reason')";
$cresulta4 = mysql_query($cquerya4);


//echo $cquerya3;


$griddetacc = json_decode($_REQUEST['griddetacc'],true);
$rowcntacc = $_REQUEST['cntacc'];


        $inscnt = 0;
        for($i=0;$i<$rowcntacc;$i++){
            $slno = $i+1;
            $ledseq = $griddetacc[$i]['ledcode'];
            $dbamt = (float) $griddetacc[$i]['debit'];
            $cramt = (float) $griddetacc[$i]['credit'];
            $totamt2 =   $dbamt +  $cramt; 
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
//Modified on 18/02/2025
//               $querya2 = "call acc_sp_trn_insacc_trail ('$ginaccrefseq','$slno','$billno', '$billdate', '$totamt2' ,'$debitnoteamount' ,'$ledseq' ,'$amtmode','$crdays','0')";

               $querya2 = "call acc_sp_trn_insacc_trail ('$ginaccrefseq','$slno','$billno', '$billdate', '$totamt2' ,'0' ,'$ledseq' ,'$amtmode','$crdays','0')";


               $resulta2 = mysql_query($querya2);
//echo  $querya2;
//echo "<br>";

               }  


            #Insert AccTran

            $querya3 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$ledseq','$dbamt','$cramt','$totamt2','$voutype','');";
            $resulta3 = mysql_query($querya3);

//echo  $querya3;	   
//echo "<br>";
            if(resulta3){
                $inscnt = $inscnt + 1;
            }

	  }
        }
}


if ($debitnoteamount > 0)
{	

       if ($gstFlaggrn === "Add")
       {
	$DNquery1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
	$DNresult1 = mysql_query($DNquery1);
	$rec1 = mysql_fetch_array($DNresult1);
	$ginaccrefseqDN=$rec1['con_value'];


	#Get Voucher Number
	$query2 = "select ifnull(max(dbcr_no),0) + 1 as dbcr_no from acc_dbcrnote_header where dbcr_type = '$dntype' and dbcr_finid = '$finid' and dbcr_comp_code = '$compcode';";
	$result2 = mysql_query($query2);
	$rec2 = mysql_fetch_array($result2);
	$conval = $rec2['dbcr_no'];


        if ($conval < 10)
        {                                              
          $vno = "00".$conval;
        }                                      
        else
        {  
             if ($conval < 100) 
             {                                              
              $vno = "0".$conval;                   
             }
             else 
             {      
               $vno = $conval;  
             }
        } 
        $vouno=$dntype.'/' . $vno.'/'.$finsuffix;




	#Get Max DBCR Seqno from acc_dbcrnote_header

	$query3 = "select ifnull(max(dbcr_seqno),0) + 1 as con_value from acc_dbcrnote_header;";
	$result3 = mysql_query($query3);
	$rec3 = mysql_fetch_array($result3);
	$gindbcrseq = $rec3['con_value'];
        }    


if ($ginaccrefseqDN > 0)
{
        $DNquery1 = "call acc_sp_trn_insacc_ref('$ginaccrefseqDN','$vouno','$compcode','$finid','$DNdate','$dntype', '','','$billno', '$billdate','$dnremarks');";
        $DNresult1 = mysql_query($DNquery1);

//echo $DNquery1;
//echo "<br>";
}
   $DNquery2  = "insert into acc_voucher_logs values ($ginaccrefseqDN,$reccount,'$today',$usrcode,'$reason')";
   $DNresult2 = mysql_query($DNquery2);

        $inscnt = 0;
        for($i=0;$i<$rowcntaccDN;$i++){
            $slno    = $i+1;
            $ledseq  = $griddetaccDN[$i]['ledcode'];
            $dbamt   = (float) $griddetaccDN[$i]['debit'];
            $cramt   = (float) $griddetaccDN[$i]['credit'];
            $totamt2  = $dbamt +  $cramt; 
            $ledtype = $griddetaccDN[$i]['ledtype'];
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
//               $DNquery5 = "call acc_sp_trn_insacc_trail ('$ginaccrefseqDN','$slno','$billno', '$billdate', '$debitnoteamount' ,'$debitnoteamount' ,'$ledseq' ,'$amtmode','$crdays','0')";
//Modified on 18/02/2025

		if ($ginaccrefseqDN > 0)
		{
               $DNquery5 = "call acc_sp_trn_insacc_trail ('$ginaccrefseqDN','$slno','$billno', '$billdate', '$debitnoteamount' ,'0' ,'$ledseq' ,'$amtmode','$crdays','0')";
               $DNresult5 = mysql_query($DNquery5);

//echo $DNquery5;
//echo "<br>";
                }    

               }  


            #Insert AccTran

	   if ($ginaccrefseqDN > 0)
		{
            $DNquery6 = "call acc_sp_trn_insacc_tran('$ginaccrefseqDN','$slno','$ledseq','$dbamt','$cramt','$totamt2','$dntype','');";
            $DNresult6 = mysql_query($DNquery6);

//echo $DNquery6;
//echo "<br>";
            }
	  }
        }


       if ($gstFlaggrn === "Add")
       {

    $DNquery7 = "call acc_sp_insdbcrnoteheader('$gindbcrseq','$compcode','$finid','$dntype','$conval','$vouno','$DNdate','$supcode','$supcode','$purledger', '$debitnoteamount','$dnremarks','S' , '$output', '$ginaccrefseqDN','$hsncode','$usrcode','$dnqty','RM','0','$itemname','$today','$today');";
    $DNresult7 = mysql_query($DNquery7);
   
//echo $DNquery7;
//echo "<br>";


#Insert AccDbcrNoteTrailer

if ($dntype == "DNG")
	$DNquery8 = "call acc_sp_insdbcrnotetrailer('$gindbcrseq','$billno','$billdate','$dntaxable' ,'$debitnoteamount','$dnigst', '$dncgst','$dnsgst','$igstper','$cgstper','$sgstper','$dnigstledcode','$dncgstledcode','$dnsgstledcode',$dntcs, $tcsper,$tcsledger,$dnother ,$dnotherledcode,0,'0',0,'$dntaxable')";
else
	$DNquery8 = "call acc_sp_insdbcrnotetrailer('$gindbcrseq','$billno','$billdate','$debitnoteamount' ,'$debitnoteamount','0', '0','0','$igstper','$cgstper','$sgstper','$dnigstledcode','$dncgstledcode','$dnsgstledcode',$dntcs, $tcsper,$tcsledger,$dnother ,$dnotherledcode,0,'0',0,'$debitnoteamount')";

$DNresult8 = mysql_query($DNquery8);

//echo $DNquery8;
//echo "<br>";

    }
    else
    {


if ($dntype == "DNG")

        $DNquery7 = "update acc_dbcrnote_header set dbcr_date = '$DNdate' , dbcr_partycode = '$supcode',dbcr_partyledcode = '$supcode',dbcr_ledcode = '$purledger', dbcr_value = '$debitnoteamount', dbcr_narration =  '$dnremarks' , dbcr_item = '$itemname'  ,dbcr_modifydate = '$today'   where dbcr_vouno = '$vouno'  and dbcr_comp_code = '$compcode' and dbcr_finid = '$finid' and  dbcr_seqno = '$gindbcrseq' ";
else
        $DNquery7 = "update acc_dbcrnote_header set dbcr_date = '$DNdate' , dbcr_partycode = '$supcode',dbcr_partyledcode = '$supcode',dbcr_ledcode = '2652', dbcr_value = '$debitnoteamount', dbcr_narration =  '$dnremarks' , dbcr_item = '$itemname'  ,dbcr_modifydate = '$today'   where dbcr_vouno = '$vouno'  and dbcr_comp_code = '$compcode' and dbcr_finid = '$finid' and  dbcr_seqno = '$gindbcrseq' ";

        $DNresult7 = mysql_query($DNquery7);

//echo $DNquery7;
//echo "<br>";
if ($dntype == "DNG")

        $DNquery8 = "update acc_dbcrnote_trailer set dbcrt_inv_no = '$billno' , dbcrt_inv_date = '$billdate'  , dbcrt_grossvalue = '$dntaxable',dbcrt_value ='$debitnoteamount',dbcrt_igstvalue = '$dnigst' ,dbcrt_cgstvalue = '$dncgst' ,dbcrt_sgstvalue = '$dnsgst', dbcrt_igstper = '$igstper', dbcrt_cgstper = '$cgstper', dbcrt_sgstper = '$sgstper', dbcrt_igstledcode ='$dnigstledcode' , dbcrt_cgstledcode =  '$dncgstledcode' , dbcrt_sgstledcode =  '$dnsgstledcode' , dbcrt_taxable = '$dntaxable' , dbcrt_otheramt = '$dnother' , dbcrt_otherledcode = '$dnotherledcode' , dbcrt_tcsvalue = '$dntcs' where dbcrt_seqno = '$gindbcrseq'";
else
        $DNquery8 = "update acc_dbcrnote_trailer set dbcrt_inv_no = '$billno' , dbcrt_inv_date = '$billdate'  , dbcrt_grossvalue = '$debitnoteamount',dbcrt_value ='$debitnoteamount',dbcrt_igstvalue = '0' ,dbcrt_cgstvalue = '0' ,dbcrt_sgstvalue = '0', dbcrt_igstper = '$igstper', dbcrt_cgstper = '$cgstper', dbcrt_sgstper = '$sgstper', dbcrt_igstledcode ='$dnigstledcode' , dbcrt_cgstledcode =  '$dncgstledcode' , dbcrt_sgstledcode =  '$dnsgstledcode' , dbcrt_taxable = '$debitnoteamount' , dbcrt_otheramt = '$dnother' , dbcrt_otherledcode = '$dnotherledcode' , dbcrt_tcsvalue = '$dntcs' where dbcrt_seqno = '$gindbcrseq'";

       $DNresult8 = mysql_query($DNquery8);


//echo $DNquery8;
//echo "<br>";





    }    



  $DNquery10 = "update trnrm_receipt_header set rech_dnno ='$vouno',rech_dndate  = '$DNdate' ,rech_dnseqno =  $gindbcrseq, rech_dnaccseqno = $ginaccrefseqDN , rech_dn_cgst = '$dncgst' ,rech_dn_sgst = '$dnsgst',rech_dn_igst = '$dnigst',rech_dn_value = '$dntaxable' ,rech_debitnote_amount = '$debitnoteamount' , rech_dn_other_charges = '$dnother' , rech_dn_other_ledger = '$dnotherledcode' , rech_grn_status = '$grnstatus'   where rech_compcode = '$compcode' and rech_fincode = '$finid' and rech_seqno = $rech_seqno";

//echo $DNquery10;
//echo "<br>";
$DNresult10=mysql_query($DNquery10);




       $query = "select ifnull(max(ref_slno),0) as refslno from acc_adjustments";
       $result = mysql_query($query);
       $rec = mysql_fetch_array($result);
       $ginrefslno = $rec['refslno'];

        $ginrefslno = $ginrefslno + 1;

	$querydate = "select datediff('$grndate','$billdate') as daysin";
	$resultdate = mysql_query($querydate);
	$recdatenew = mysql_fetch_array($resultdate);
	$adjdays=$recdatenew['daysin'];

	if ($ginaccrefseqDN > 0)
	{
$DNquery9 = "insert into acc_adjustments (ref_slno, ref_compcode, ref_finid, ref_docseqno, ref_docno, ref_docdate, ref_adjseqno, ref_adjvouno, ref_invno, ref_invdate, ref_adjamount, ref_adj_days, ref_adj_by, ref_adjusted_on,ref_paymt_terms,ref_ledcode,ref_adjvoutype) values ('$ginrefslno','$compcode','$finid','$ginaccrefseqDN','$vouno','$grndate', '$ginaccrefseq', '$rech_no','$billno','$billdate','$debitnoteamount',$adjdays,'DN',curdate(),$payterms,$supcode,'$dntype' );";

$DNresult9 = mysql_query($DNquery9);

//echo $DNquery9;
//echo "<br>";
         }    


$query11 = "update acc_ref  set accref_link_seqno = $ginaccrefseqDN where  accref_comp_code = $compcode and accref_finid = $finid and  accref_seqno = $ginaccrefseq";
$result11 = mysql_query($query11);

$query12 = "update acc_ref  set accref_link_seqno = $ginaccrefseq where  accref_comp_code = $compcode and accref_finid = $finid and  accref_seqno = $ginaccrefseqDN";
$result12 = mysql_query($query12);



}
else
{
       $vouno ='';
}



/*


 $queryQC1 = "update trn_qc_rm_inspection set  qc_rm_grn_status = 'Y',qc_rm_grnno = '$rech_no',qc_rm_cgst_per =$cgstper, qc_rm_sgst_per = $sgstper, qc_rm_igst_per = $igstper, qc_rm_cgst_value = $dncgst, qc_rm_sgst_value = $dnsgst,   qc_rm_igst_value = $dnigst,  qc_rm_debitamount =$debitnoteamount, qc_rm_pur_ledger = $purledger , qc_rm_debitnote_no = '$vouno',qc_rm_debitnote_date = '$DNdate' ,qc_rm_dn_raised  = 'Y' , qc_rm_billno = '$billno' , qc_rm_billdate = '$billdate' , qc_rm_billvalue = $totamt ,  qc_rm_tcs_per = $tcsper, qc_rm_tcs_amount = $dntcs  where qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' and  qc_rm_entryno = '$qcinsno'";

*/

 $queryQC1 = "update trn_qc_rm_inspection set  qc_rm_grn_status = 'Y',qc_rm_grnno = '$rech_no',qc_rm_cgst_per =$cgstper, qc_rm_sgst_per = $sgstper, qc_rm_igst_per = $igstper, qc_rm_cgst_value = $dncgst, qc_rm_sgst_value = $dnsgst,   qc_rm_igst_value = $dnigst,  qc_rm_debitamount =$debitnoteamount, qc_rm_pur_ledger = $purledger , qc_rm_debitnote_no = '$vouno',qc_rm_debitnote_date = '$DNdate' ,qc_rm_dn_raised  = 'Y' , qc_rm_billno = '$billno' , qc_rm_billdate = '$billdate' , qc_rm_billvalue = $totamt ,  qc_rm_tcs_per = $tcsper, qc_rm_tcs_amount = $dntcs  where qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' and  qc_rm_entryno = '$qcinsno'";

//echo $queryQC1;
//echo "<br>";

$resultQC1 = mysql_query($queryQC1);



 $queryQC5 = "update trn_qc_rm_inspection set qc_rm_ratediff =  $ratediffvalue,  qc_rm_valuediff =  $shortagevalue  ,qc_rm_shortage = qc_rm_shortage + $shortageqty where qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' and  qc_rm_entryno = '$qcinsno' and qc_rm_slno = 1 ";

//echo $queryQC1;
//echo "<br>";

$resultQC5 = mysql_query($queryQC5);




if ($dntaxable > 0)
{
 $queryQC3 = "select $dntaxable-sum(qc_rm_taxable)-sum(qc_rm_ratediff)   difftaxable from trn_qc_rm_inspection where qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' and qc_rm_entryno = '$qcinsno'";

//echo $queryQC3;
//echo "<br>";

	$resultQC3 = mysql_query($queryQC3);
	$rec4      = mysql_fetch_array($resultQC3);
	$valuediff = $rec4['difftaxable'];

//echo $valuediff;
//echo "<br>";
       if ($valuediff < 0)
          $valuediff = 0;

	
 $queryQC4 = "update trn_qc_rm_inspection set qc_rm_other_deductions = '$valuediff'  where qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' and qc_rm_entryno = '$qcinsno' ";
	$resultQC4 = mysql_query($queryQC4);

}


/*
 $queryQC2 = "update trn_qc_rm_inspection set qc_rm_grn_status = 'Y',qc_rm_grnno = '$rech_no',
 qc_rm_debitnote_no = '$vouno',qc_rm_debitnote_date = '$grndate' ,qc_rm_dn_raised  = 'Y' , qc_rm_billno = '$billno' , qc_rm_billdate = '$billdate' , qc_rm_billvalue = $billval , qc_rm_dn_raised ='Y' , qc_rm_remarks = '$dnremarks' where qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' and  qc_rm_entryno = '$qcinsno' ";

 
//echo $queryQC2;
//echo "<br>";

$resultQC2 = mysql_query($queryQC2);
*/
 $vno = $grnno; // . " and Accounts Voucher No. " .$vouno;




if ($gstFlaggrn === "Add") {

	if ($debitnoteamount > 0)
	{

		 $vno = $grnno . " and Debit Note Voucher No. " .$vouno;


		if( $result4  && $result3  && $result5   && $result6 && $DNresult1 && $DNresult5 && $DNresult6 && $DNresult7  && $DNresult8 && $DNresult9  && $DNresult10  && $result11  && $result12 & $resulta1 && $resulta2 && $resulta3 &&  $resultQC1  )

		{
			mysql_query("COMMIT");                        
			echo '({"success":"true","GRNNo":"'. $vno . '"})';
		    
		}
		else
		{
		    mysql_query("ROLLBACK");            
		    echo '({"success":"false","GRNNo":"' . $vno . '"})';
		} 
	}
	else
	{



		if( $result3   && $result4   && $result6 && $resultQC1 && $resulta1 && $resulta2 && $resulta3  ) 
		{
			mysql_query("COMMIT");                        
			echo '({"success":"true","GRNNo":"'. $vno . '"})';
		    
		}
		else
		{
		    mysql_query("ROLLBACK");            
		    echo '({"success":"false","GRNNo":"' . $vno . '"})';
		} 
	}
	    
}       
else
{


if ($debitnoteamount > 0)
	{

		 $vno = $grnno . " and Debit Note Voucher No. " .$vouno;
//echo $vno;
//echo "<br>";

		if( $result4 && $DNresult1 && $DNresult5 && $DNresult6 && $DNresult7 && $DNresult8 && $DNresult9  && $DNresult10 && $resultac5 && $resultac6 && $resultac7   && $result11  && $result12  && $resultQC1 && $resultStock1  && $resultStock2 )


//		if( $result4 && $DNresult1 && $DNresult5 && $DNresult6 && $DNresult7 && $DNresult8 && $DNresult9  && $DNresult10 )
		{
			mysql_query("COMMIT");                        
			echo '({"success":"true","GRNNo":"'. $vno . '"})';
		    
		}
		else
		{
		    mysql_query("ROLLBACK");            
		    echo '({"success":"false","GRNNo":"' . $vno . '"})';
		} 
	}
	else
	{

		if( $result4 &&  $resulta1 && $resulta2 && $resulta3  && $resultQC1  && $resultStock1  && $resultStock2 )
		{
			mysql_query("COMMIT");                        
			echo '({"success":"true","GRNNo":"'. $vno . '"})';
		    
		}
		else
		{
		    mysql_query("ROLLBACK");            
		    echo '({"success":"false","GRNNo":"' . $vno . '"})';
		} 
	}
}    
 
?>
