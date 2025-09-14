<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_REQUEST['cnt'];


$griddetacc = json_decode($_REQUEST['griddetacc'],true);
$rowcntacc = $_REQUEST['cntacc'];


$griddetaccDN = json_decode($_REQUEST['griddetaccDN'],true);
$rowcntaccDN = $_REQUEST['cntaccDN'];

$narration = $_REQUEST['remarks'];

$gstFlaggrn = $_REQUEST['gstFlaggrn'];
$compcode = $_REQUEST['compcode'];
$finid = $_REQUEST['finid'];
$rech_no = $_REQUEST['grnno'];
$grnno = $_REQUEST['grnno'];
$grndate = $_REQUEST['grndate'];
$rech_seqno= $_REQUEST['seqno'];
$ticketno = $_REQUEST['ticketno'];
$ticketdate = $_REQUEST['ticketdate'];
$lorryno = $_POST['lorryno'];
$areacode = $_REQUEST['areacode'];
$geno = (int)$_POST['geno'];
$gedate =$_POST['gedate'];
$supcode = $_REQUEST['party'];
$ordseqno =  (int) $_REQUEST['ordseqno'];
$billno=  strtoupper($_REQUEST['billno']);

$billno   = substr(trim($billno),0,29);
$billqty = (float) $_POST['billqty'];
$billdate= $_REQUEST['billdate'];
$billvalue= $_REQUEST['billvalue'];
$qcentno = (int)$_POST['qcentno'];

$itemcode = (int)$_POST['itemcode'];
$purcode = (int)$_POST['purledcode'];
$dnpurcode = (int)$_POST['dnpurledcode'];

$millqty= (float)$_REQUEST['millqty'];

$grnamount = $_REQUEST['totamt'];

$grnvalue = $_REQUEST['itemvalue'];
$grnqty= (float)$_REQUEST['grnqty'];
$usrcode= (int) $_REQUEST['usrcode'];
$entrydate= date("Y-m-d H:i:s"); 


$sgstper = (float)$_REQUEST['sgstper'];
$sgstamt = (float)$_REQUEST['sgstamt'];
$cgstper = (float)$_REQUEST['cgstper'];
$cgstamt = (float)$_REQUEST['cgstamt'];
$igstper = (float)$_REQUEST['igstper'];
$igstamt =(float) $_REQUEST['igstamt'];
$handlingmt= (float)$_REQUEST['handlingmt'];
$handlingcgst= (float)$_REQUEST['handlingcgst'];
$handlingsgst= (float)$_REQUEST['handlingsgst'];

$handlingcgstamt= (float)$_REQUEST['handlingcgstamt'];
$handlingsgstamt= (float)$_REQUEST['handlingsgstamt'];


$cessmt= (float)$_REQUEST['cessmt'];
$cessamt= (float)$_REQUEST['cessamt'];

$tcsper = (float)$_REQUEST['tcsper'];
$tcsamt = (float)$_REQUEST['tcsamt'];

$othrchrg= (float)$_REQUEST['othrchrg'];
$freight= (float)$_REQUEST['freight'];
$roundoff= (float)$_REQUEST['roundoff'];


$payterms= (int)$_REQUEST['payterms'];


$cgstpm= (float)$_REQUEST['cgstpm'];
$sgstpm= (float)$_REQUEST['sgstpm'];
$igstpm= (float)$_REQUEST['igstpm'];

$roundneed= $_REQUEST['roundneed'];
$dncgst = (float)$_POST['dncgst'];
$dnsgst = (float)$_POST['dnsgst'];
$dnigst = (float)$_POST['dnigst'];
$dntaxable = (float)$_POST['dntaxable'];
$dnigst = (float)$_POST['dnigst'];
$debitnoteamount = (float)$_POST['debitnoteamount'];
$dnqty = (float)$_POST['dnqty'];


$degvalue = (float)$_POST['degvalue'];
$degdebitvalue = (float)$_POST['degdebitvalue'];

$dntype = $_POST['dntype'];
$usercode = $_POST['usrcode'];

$cgstledcode = (int)$_POST['cgstledcode'];
$sgstledcode = (int)$_POST['sgstledcode'];
$igstledcode = (int)$_POST['igstledcode'];

$finsuffix   = $_POST['finsuffix'];
$today = date("Y-m-d H:i:s"); 

if ($dntype == "DNN")
{
    $dnigstper = 0;
    $dncgstper = 0;
    $dnsgstper = 0;
}
else
{
    $dnigstper = (float) $igstper;
    $dncgstper = (float) $cgstper;
    $dnsgstper = (float) $sgstper;
}


$ratefinesrate = (float)$_POST['ratefinesrate'];


$hsncode   = $_POST['hsncode'];

$ginaccrefseq     = (int)$_POST['accseqno'];
$ginaccrefseqDN   = (int)$_POST['dnaccseqno'];
$gindbcrseq       = (int)$_POST['dnseqno'];

$qtydiff =(float)$_POST['qtydiff'];

$vouno            = $_POST['vouno'];

$voutype = "PFU";

$grnstatus     = $_REQUEST['grnstatus'];

$DNdate    = $_REQUEST['DNdate'];



 mysql_query("BEGIN");

$sno = 1;
if ($gstFlaggrn === "Add") {

	 $query1 = "select IFNULL(max(rech_seqno),0)+1 as rech_seqno from trnfu_receipt_header";
	 $result1 = mysql_query($query1);
	 $rec1 = mysql_fetch_array($result1);
	 $rech_seqno=$rec1['rech_seqno'];


	 $query2 = "select count(*) as nos from trnfu_receipt_header where rech_fincode = '$finid' and rech_compcode='$compcode' and rech_no = '$rech_no'";
	 $result2= mysql_query($query2);
	 $rec2 = mysql_fetch_array($result2);
	 $nos=$rec2['nos'];

#Get Max AccRef Seqno from acc_ref
$query1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
$result1 = mysql_query($query1);
$rec1 = mysql_fetch_array($result1);
$ginaccrefseq=$rec1['con_value'];

//		 mysql_query("BEGIN");



	$query2  ="call spfu_ins_receipt_header_New ('$rech_seqno', '$compcode', '$finid', '$rech_no', '$grndate','$supcode', '$qcentno','$ordseqno','$ticketno','$ticketdate', '$lorryno', '$payterms', '$areacode','$grnvalue','$cgstper','$cgstamt','$sgstper', '$sgstamt','$igstper', '$igstamt', '$handlingmt','$handlingcgst','$handlingsgst', '$handlingcgstamt', '$handlingsgstamt', '$tcsper', '$tcsamt', '$cessmt','$cessamt','$freight', '$cgstpm' ,'$sgstpm' ,'$igstpm' ,'$othrchrg', '$roundoff', '$grnamount','$roundneed', $purcode, 'Y',$ginaccrefseq,'$grndate', '$billno','$billdate','$grnamount','$geno','$gedate', '$usrcode', '$entrydate' , '$dnpurcode','$grnstatus')";


//echo $query2;
//echo "<br>";

	 $result2=mysql_query($query2);

	$query3= "update trn_weight_card set wt_grn_process = 'Y' where wc_compcode = '$compcode' and wc_fincode = '$finid' and  wc_date = '$ticketdate' and wc_ticketno = $ticketno";

//echo $query3;
//echo "<br>";

	 $result3=mysql_query($query3);


}
else if ($gstFlaggrn === "Edit") {


	$query2  ="call spfu_upd_receipt_header_new ('$rech_seqno', '$compcode', '$finid', '$rech_no', '$grndate','$supcode', '$qcentno','$ordseqno','$ticketno','$ticketdate', '$lorryno', '$payterms', '$areacode','$grnvalue','$cgstper','$cgstamt','$sgstper', '$sgstamt','$igstper', '$igstamt', '$handlingmt','$handlingcgst','$handlingsgst', '$handlingcgstamt', '$handlingsgstamt', '$tcsper', '$tcsamt', '$cessmt','$cessamt','$freight', '$cgstpm' ,'$sgstpm' ,'$igstpm' ,'$othrchrg', '$roundoff', '$grnamount','$roundneed', $purcode, 'Y',$ginaccrefseq,'$grndate', '$billno','$billdate','$grnamount','$geno','$gedate', '$usrcode', '$entrydate', '$dnpurcode','$grnstatus')";

	 $result2=mysql_query($query2);

//echo $query2;
//echo "<br>";

	$sno = 1;

	$query3 = "update trnfu_receipt_trailer, masfu_item_trailer set itmt_clqty = itmt_clqty -  rect_grnqty ,itmt_clvalue = itmt_clvalue - rect_costvalue  where itmt_compcode= '$compcode' and itmt_fincode = '$finid' and  rect_item_code = itmt_hdcode and rect_hdseqno = $rech_seqno;";
        $result3=mysql_query($query3);

//echo $query3;
//echo "<br>";

	$query4 = "update trnfu_receipt_trailer, masfu_item_trailer set itmt_avgrate = case when itmt_clvalue > 0 and itmt_clqty > 0 then itmt_clvalue / itmt_clqty else 0 end  where itmt_compcode= '$compcode' and itmt_fincode = '$finid' and  rect_item_code = itmt_hdcode and rect_hdseqno = $rech_seqno;";
        $result4=mysql_query($query4);

//echo $query4;
//echo "<br>";

	$queryfu  = "delete from trnfu_receipt_trailer where rect_hdseqno= $rech_seqno;";
        $resultfu = mysql_query($queryfu);
//echo $queryfu;
//echo "<br>";
	$queryac1  = "delete from acc_trail where  acctrail_accref_seqno =$ginaccrefseq";
	$resultac1 = mysql_query($queryac1);   

//echo $queryac1;
//echo "<br>";		 
	$queryac2  = "delete from acc_tran  where  acctran_accref_seqno  =$ginaccrefseq";
	$resultac2 = mysql_query($queryac2);   

//echo $queryac2;
//echo "<br>";
	$queryac3  = "delete from acc_ref  where  accref_seqno  =$ginaccrefseq";
	$resultac3 = mysql_query($queryac3);  

//echo $queryac3;
//echo "<br>";
        $queryac4 = "delete from acc_adjustments  where ref_docseqno ='$ginaccrefseq' and ref_compcode='$compcode' and ref_finid ='$finid'";
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
	$itemcode    = $griddet[$i]['itemcode'];
	$itemname    = $griddet[$i]['itemname'];
	$billqty     = (float) $griddet[$i]['billqty'];
	$billrate     = (float) $griddet[$i]['billrate'];
	$billitemvalue     = (float) $griddet[$i]['billitemvalue'];

	$ticketwt     = (float)$griddet[$i]['ticketwt'];
	$fixedMois   = (float)$griddet[$i]['fixedMois'];
	$actualMois  = (float)$griddet[$i]['actualMois'];
	$ExMoisper   = (float)$griddet[$i]['ExMoisper'];
	$moisqty     = (float)$griddet[$i]['moisqty'];
	$fixedfines  = (float)$griddet[$i]['fixedfines'];
	$actualfines = (float)$griddet[$i]['actualfines'];
	$Exfines     = (float)$griddet[$i]['Exfines'];
	$finesqty    = (float)$griddet[$i]['finesqty'];
	$fixedsand   = (float)$griddet[$i]['fixedsand'];
	$actualsand  = (float)$griddet[$i]['actualsand'];
	$Exsand      = (float)$griddet[$i]['Exsand'];
	$sandqty     = (float)$griddet[$i]['sandqty'];
	$totothdedqty = (float)$griddet[$i]['totothdedqty'];
	$totdedqty    = (float)$griddet[$i]['totdedqty'];
	$partygrnqty  = (float)$griddet[$i]['partygrnqty'];
	$millgrnqty   = (float)$griddet[$i]['millgrnqty'];

	$grnqty   = (float)$griddet[$i]['grnqty'];


	$itemrate     = (float)$griddet[$i]['itemrate'];
	$itemvalue    = (float)$griddet[$i]['itemvalue'];
	$remarks      = $griddet[$i]['remarks'];

	$dnvalue      = (float)$griddet[$i]['dnvalue'];

	$moisvalue    = (float)$griddet[$i]['moisvalue'];

	$finesrate    = (float)$griddet[$i]['finesrate'];
	$finesvalue   = (float)$griddet[$i]['finesvalue'];
	$sandvalue    = (float)$griddet[$i]['sandvalue'];
	$othdedvalue  = (float)$griddet[$i]['othdedvalue'];
	$othdedqty    = (float)$griddet[$i]['othdedqty'];




	$degitem      = (int) $griddet[$i]['degitem'];
	$degrate      = (float) $griddet[$i]['degrate'];
	$degqty       = (float) $griddet[$i]['degqty'];


	$moisremarks      = $griddet[$i]['remarksmois'];
	$finesremarks     = $griddet[$i]['remarksfines'];
	$sandremarks      = $griddet[$i]['remarkssand'];
	$othdedremarks    = $griddet[$i]['remarksotherded'];

        $dnqty           = (float)$griddet[$i]['totdedqty'];

	$costvalue  = (float)$griddet[$i]['costval'];
	$costrate    = (float)$griddet[$i]['costrate'];


        $qtydiffremarks    = '';
        if ($qtydiff >0)
           $qtydiffremarks = 'Qty Difference ';

//        $costvalue = $itemrate * $grnqty   ; // - $moisvalue - $sandvalue - $finesvalue - $othdedvalue;
//        $costrate  = $itemrate;

	$myDateTime = DateTime::createFromFormat('Y-m-d', $billdate);
	$dnbilldate = $myDateTime->format('d-m-Y');


        $dnremarks  = "BEING DEBITED TO YOUR ACCOUNT FOR THE BILL NO " . $billno . " Dt " . $dnbilldate . " " .  $remarks;  

        $dnremarks   = substr(trim($dnremarks),0,498);



	$query11 = "call spfu_ins_receipt_trailer_New('$rech_seqno','$sno','$itemcode','$billqty',$billrate ,$billitemvalue, 
 '$ticketwt','$fixedMois' ,'$actualMois' ,'$ExMoisper', '$moisqty','$fixedsand' ,'$actualsand' ,'$Exsand','$sandqty', '$fixedfines' ,'$actualfines','$Exfines' ,'$finesqty' ,'$finesrate' ,'$othdedqty' ,'$totdedqty' ,'$dntaxable' ,
'$itemrate','$grnqty','$itemvalue','$costrate' ,  '$costvalue' , '$remarks' , '$degitem',  '$degqty',  '$degrate', '$degvalue', '$degdebitvalue')";

//echo $query11;
//echo "<br>";

	 $result11 =mysql_query($query11);
	     

	 $query12= "call spfu_upd_itemtrailer_avgrate ('$compcode','$finid','$itemcode','$grnqty','$costvalue',1)";
     	$result12 =mysql_query($query12);
//echo $query12;
//echo "<br>";


if ($ginaccrefseq > 0) {


    $query7 = "call acc_sp_trn_insacc_ref('$ginaccrefseq','$rech_no','$compcode','$finid','$grndate','$voutype', '','','$billno', '$billdate','$narration');";
    $result7 = mysql_query($query7);

//echo $query7;
//echo "<br>";

   $query41 = "insert into acc_voucher_logs values ($ginaccrefseq,$reccount,'$today',$usercode,'$reason')";
   $result41 = mysql_query($query41);

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
               $query5 = "call acc_sp_trn_insacc_trail ('$ginaccrefseq','$slno','$billno', '$billdate', '$totamt' ,'$debitnoteamount' ,'$ledseq' ,'$amtmode','$payterms','0')";
               $result5 = mysql_query($query5);

//echo $query5;
//echo "<br>";

               }  


            #Insert AccTran

            $query6 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$ledseq','$dbamt','$cramt','$totamt','$voutype','');";
            $result6 = mysql_query($query6);
//echo $query6;
//echo "<br>";

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



        $DNquery1 = "call acc_sp_trn_insacc_ref('$ginaccrefseqDN','$vouno','$compcode','$finid','$DNdate','$dntype', '','','$billno', '$billdate','$dnremarks');";
        $DNresult1 = mysql_query($DNquery1);

//echo $DNquery1;
//echo "<br>";

   $DNquery2  = "insert into acc_voucher_logs values ($ginaccrefseqDN,$reccount,'$today',$usercode,'$reason')";
   $DNresult2 = mysql_query($DNquery2);

        $inscnt = 0;
        for($i=0;$i<$rowcntaccDN;$i++){
            $slno    = $i+1;
            $ledseq  = $griddetaccDN[$i]['ledcode'];
            $dbamt   = (float) $griddetaccDN[$i]['debit'];
            $cramt   = (float) $griddetaccDN[$i]['credit'];
            $totamt  = $dbamt +  $cramt; 
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
               $DNquery5 = "call acc_sp_trn_insacc_trail ('$ginaccrefseqDN','$slno','$billno', '$billdate', '$debitnoteamount' ,'$debitnoteamount' ,'$ledseq' ,'$amtmode','$payterms','0')";
               $DNresult5 = mysql_query($DNquery5);

//echo $DNquery5;
//echo "<br>";

               }  


            #Insert AccTran

            $DNquery6 = "call acc_sp_trn_insacc_tran('$ginaccrefseqDN','$slno','$ledseq','$dbamt','$cramt','$totamt','$dntype','');";
            $DNresult6 = mysql_query($DNquery6);

//echo $DNquery6;
//echo "<br>";

	  }
        }







       if ($gstFlaggrn === "Add")
       {

    $DNquery7 = "call acc_sp_insdbcrnoteheader('$gindbcrseq','$compcode','$finid','$dntype','$conval','$vouno','$DNdate','$supcode','$supcode','$purcode', '$debitnoteamount','$dnremarks','S' , '$output', '$ginaccrefseqDN','$hsncode','$usercode','$dnqty','Fuel','0','','$today','$today');";
    $DNresult7 = mysql_query($DNquery7);
   
//echo $DNquery7;
//echo "<br>";


#Insert AccDbcrNoteTrailer


$DNquery8 = "call acc_sp_insdbcrnotetrailer('$gindbcrseq','$billno','$billdate','$dntaxable' ,'$debitnoteamount','$dnigst', '$dncgst','$dnsgst','$dnigstper','$dncgstper','$dnsgstper','$igstledcode','$cgstledcode','$sgstledcode',0,0,0,0,0,'0',0,0,'$dntaxable')";

$DNresult8 = mysql_query($DNquery8);



    }
    else
    {


        $DNquery7 = "update acc_dbcrnote_header set dbcr_date = '$DNdate' , dbcr_partycode = '$supcode',dbcr_partyledcode = '$supcode',dbcr_ledcode = '$purcode', dbcr_value = '$debitnoteamount', dbcr_narration =  '$dnremarks' , dbcr_item = '$itemname'  ,dbcr_modifydate = '$today'   where dbcr_vouno = '$vouno'  and dbcr_comp_code = '$compcode' and dbcr_finid = '$finid' and  dbcr_seqno = '$gindbcrseq' ";
        $DNresult7 = mysql_query($DNquery7);

//echo $DNquery7;
//echo "<br>";

        $DNquery8 = "update acc_dbcrnote_trailer set dbcrt_inv_no = '$billno' , dbcrt_inv_date = '$billdate'  , dbcrt_grossvalue = '$dntaxable',dbcrt_value ='$debitnoteamount',dbcrt_igstvalue = '$dnigst' ,dbcrt_cgstvalue = '$dncgst' ,dbcrt_sgstvalue = '$dnsgst', dbcrt_igstper = '$dnigstper', dbcrt_cgstper = '$dncgstper', dbcrt_sgstper = '$dnsgstper', dbcrt_igstledcode ='$igstledcode' , dbcrt_cgstledcode =  '$cgstledcode' , dbcrt_sgstledcode =  '$sgstledcode' , dbcrt_taxable = '$dntaxable'   where dbcrt_seqno = '$gindbcrseq'";

       $DNresult8 = mysql_query($DNquery8);


//echo $DNquery8;
//echo "<br>";





    }    

//echo $DNquery8;
//echo "<br>";






       $query = "select ifnull(max(ref_slno),0) as refslno from acc_adjustments";
       $result = mysql_query($query);
       $rec = mysql_fetch_array($result);
       $ginrefslno = $rec['refslno'];

        $ginrefslno = $ginrefslno + 1;

	$querydate = "select datediff('$grndate','$billdate') as daysin";
	$resultdate = mysql_query($querydate);
	$recdatenew = mysql_fetch_array($resultdate);
	$adjdays=$recdatenew['daysin'];


$DNquery9 = "insert into acc_adjustments (ref_slno, ref_compcode, ref_finid, ref_docseqno, ref_docno, ref_docdate, ref_adjseqno, ref_adjvouno, ref_invno, ref_invdate, ref_adjamount, ref_adj_days, ref_adj_by, ref_adjusted_on,ref_paymt_terms,ref_ledcode,ref_adjvoutype) values ('$ginrefslno','$compcode','$finid','$ginaccrefseqDN','$vouno','$grndate', '$ginaccrefseq', '$rech_no','$billno','$billdate','$debitnoteamount',$adjdays,'DN',curdate(),$payterms,$supcode,'$dntype' );";

$DNresult9 = mysql_query($DNquery9);

//echo $DNquery9;
//echo "<br>";



$query11 = "update acc_ref  set accref_link_seqno = $ginaccrefseqDN where  accref_comp_code = $compcode and accref_finid = $finid and  accref_seqno = $ginaccrefseq";
$result11 = mysql_query($query11);

$query12 = "update acc_ref  set accref_link_seqno = $ginaccrefseq where  accref_comp_code = $compcode and accref_finid = $finid and  accref_seqno = $ginaccrefseqDN";
$result12 = mysql_query($query12);



}
else
{
       $vouno ='';
}

  $DNquery10 = "update trnfu_receipt_header set rech_dnno ='$vouno',rech_dndate  = '$DNdate' ,rech_dnseqno =  $gindbcrseq, rech_dnaccseqno = $ginaccrefseqDN , rech_dn_cgst = '$dncgst' ,rech_dn_sgst = '$dnsgst',rech_dn_igst = '$dnigst',rech_dn_value = '$dntaxable' ,rech_debitnote_amount = '$debitnoteamount' , rech_grn_status = '$grnstatus'  where rech_compcode = '$compcode' and rech_fincode = '$finid' and rech_seqno = $rech_seqno";

//echo $DNquery10;
//echo "<br>";
$DNresult10=mysql_query($DNquery10);



$qtydiffvalue =  $qtydiff * $itemrate;
$rounding = 0;



 $QCquery1 = "update trn_qc_fuel_inspection set 
 qc_fuel_qtydiff_qty = $qtydiff*1000, qc_fuel_qtydiff_rate = $itemrate , qc_fuel_qtydiff_value =$qtydiffvalue,   qc_fuel_mois_rate = $itemrate,  qc_fuel_mois_value = $moisvalue , qc_fuel_fines_rate = $ratefinesrate,qc_fuel_fines_value = $finesvalue,qc_fuel_sand_rate = $itemrate ,qc_fuel_sand_value = $sandvalue, qc_fuel_othded_qty = $othdedqty * 1000, qc_fuel_othded_rate =$itemrate, qc_fuel_othded_value = $othdedvalue, qc_fuel_total_ded_qty = $totdedqty * 1000, qc_fuel_tot_ded_qty = $totdedqty * 1000,  qc_fuel_tot_taxable = $dntaxable, qc_fuel_cgst_per =$cgstper, qc_fuel_sgst_per = $sgstper, qc_fuel_igst_per = $igstper, qc_fuel_cgst_value = $dncgst, qc_fuel_sgst_value = $dnsgst,   qc_fuel_igst_value = $dnigst, qc_fuel_rounding = $rounding, qc_fuel_debitamount =$debitnoteamount, qc_fuel_pur_ledger = $purcode ,qc_fuel_debitnote_no = '$vouno',qc_fuel_debitnote_date = '$DNdate' ,qc_fuel_dn_raised  = 'Y' , qc_fuel_billno = '$billno' , qc_fuel_billdate = '$billdate' ,  qc_fuel_billvalue = $grnamount, qc_fuel_mois_remarks = '$moisremarks', qc_fuel_sand_remarks = '$sandremarks',qc_fuel_fines_remarks = '$finesremarks',qc_fuel_otherded_remarks = '$othdedremarks' , qc_fuel_qtydiff_remarks = '$qtydiffremarks'  where qc_fuel_compcode = '$compcode' and qc_fuel_fincode = '$finid' and  qc_fuel_entryno = $qcentno ";

//echo $QCquery1;
//echo "<br>";

$QCresult1 = mysql_query($QCquery1);
}   


 


 $vno = $grnno; // . " and Accounts Voucher No. " .$vouno;




if ($gstFlaggrn === "Add") {

	if ($debitnoteamount > 0)
	{

		 $vno = $grnno . " and Debit Note Voucher No. " .$vouno;

		if( $result2  && $result3   && $result5   && $result6   && $result7 && $DNresult1 && $DNresult5 && $DNresult6 && $DNresult7 && $DNresult8 && $DNresult9  && $DNresult10  && $QCresult1 && $result11  && $result12)
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



		if( $result1 && $result2  && $result3   && $result5   && $result6   && $result7 && $QCresult1  && $result11  && $result12) 
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

		if( $result4 && $result2  && $result3   && $result5   && $result6   && $result7 && $DNresult1 && $DNresult5 && $DNresult6 && $DNresult7 && $DNresult8 && $DNresult9  && $DNresult10  && $QCresult1 && $resultfu && $resultac1 && $resultac2 && $resultac3 && $resultac4  && $result11  && $result12)
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




		if($result2  && $result3   && $result5   && $result6   && $result7 && $QCresult1 && $resultfu && $resultac1 && $resultac2 && $resultac3 && $resultac4  && $result11  && $result12)
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
