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

$qcentryno = $_REQUEST['qcentno'];



$compcode = $_REQUEST['compcode'];
$finid = $_REQUEST['finid'];
$gstFlaggrn = $_REQUEST['gstFlaggrn'];
$rech_no = $_REQUEST['edgrnno'];
$grnno = $_REQUEST['grnno'];
$rech_seqno= $_REQUEST['seqno'];

$edpono = $_REQUEST['edpono'];
$supcode = $_REQUEST['supcode'];
$ordseqno = $_REQUEST['ordseqno'];
$agentcode = $_REQUEST['agentcode'];
$grndate = $_REQUEST['grndate'];

$areacode = $_REQUEST['areacode'];
$frtype = $_REQUEST['freighttype'];

$itemvalue = $_REQUEST['itemvalue'];

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
$tcsamt= (float)$_REQUEST['tcsamt'];

$othrchrg= (float)$_REQUEST['othrchrg'];
$freight= (float)$_REQUEST['freight'];
$roundoff= (float)$_REQUEST['roundoff'];
$totamt= $_REQUEST['totamt'];
$billno= strtoupper($_REQUEST['billno']);
$billdate= $_REQUEST['billdate'];
$billval= $_REQUEST['billval'];

$partybillval= (float)$_REQUEST['billval'];


$status= $_REQUEST['status'];
$usrcode= (int) $_REQUEST['usrcode'];
$entrydate= $_REQUEST['entrydate'];


$receiptdt = $_POST['receiptdt'];
$supledcode = $_POST['supledcode'];


$billvalue =  (float)$_POST['billvalue'];

$chklotno = $_POST['chklotno'];
$itemval2 = $_POST['itemval2'];
$billqty = (float) $_POST['billqty'];
$lorrynot = $_POST['lorrynot'];
$grnqtyt = $_POST['grnqtyt'];
$frtval = $_POST['frtval'];
$chkdel = $_POST['chkdel'];


$geno = (int)$_POST['geno'];
$gedate =$_POST['gedate'];
$lorryno = $_POST['lorryno'];
$wtslipno = (int)$_POST['wtslipno'];

$payterms = (int)$_POST['crdays'];

$roundneed = $_POST['roundneed'];
$itemcode = $_POST['itemcode'];
$millqty= (float)$_REQUEST['millqty'];
$moisper= (float)$_REQUEST['moisper'];
$moisqty = (float)$_REQUEST['moisqty'];
$sandper= (float)$_REQUEST['sandper'];
$sandqty= (float)$_REQUEST['sandqty'];
$finesper= (float)$_REQUEST['finesper'];
$finesqty= (float)$_REQUEST['finesqty'];
$totdedqty= (float)$_REQUEST['totdedqty'];
$grnqty= (float)$_REQUEST['grnqty'];
$itemrate= (float)$_REQUEST['rate'];


$gcv = (int)$_POST['gcv'];
$lotcode = (int)$_POST['lotcode'];
$qcentno = (int)$_POST['qcentno'];
$purledcode = (int)$_POST['purledcode'];
$costrate = 0;
$costval = 0;

$othdedqty = 0;
$rech_seqnonew;

$vouno   = $_POST['vouno'];
$voudate = $_POST['voudate'];
$voudate = $_REQUEST['grndate'];



$voutype = 'PFU';


$dntype = $_REQUEST['dntype'];
$finsuffix   = $_POST['finsuffix'];
$party   = $_POST['party'];

$dncgst = (float)$_POST['dncgst'];
$dnsgst = (float)$_POST['dnsgst'];
$dnigst = (float)$_POST['dnigst'];
$dntaxable = (float)$_POST['dntaxable'];
$dnigst = (float)$_POST['dnigst'];
$debitnoteamount = (float)$_POST['debitnoteamount'];
$dnqty = (float)$_POST['dnqty'];

$qtydiff = (float)$_POST['qtydiff'];


$cgstledcode = (int)$_POST['cgstledcode'];
$sgstledcode = (int)$_POST['sgstledcode'];
$igstledcode = (int)$_POST['igstledcode'];

    $usercode = $_POST['usrcode'];


    $reason   = strtoupper($_POST['reason']);

    $reccount = 1;
    $today = date("Y-m-d H:i:s"); 




 mysql_query("BEGIN");


#Get Max AccRef Seqno from acc_ref
$query1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
$result1 = mysql_query($query1);
$rec1 = mysql_fetch_array($result1);
$ginaccrefseq=$rec1['con_value'];




 $query1  = "call spfu_upd_receipt_header_second('$rech_seqno','$grndate','$payterms','$itemvalue','$cgstper','$cgstamt','$sgstper','$sgstamt','$igstper','$igstamt', '$handlingmt','$handlingcgst','$handlingsgst','$handlingcgstamt','$handlingsgstamt','$tcsper','$tcsamt','$cessmt','$cessamt','$freight','$othrchrg','$roundoff', '$totamt','$billno','$billdate','$partybillval','$roundneed','$rech_no','$voudate','$ginaccrefseq',$qcentno)";

echo $query1;
echo "<br>";

$result1=mysql_query($query1);


	$query3 = "update trnfu_receipt_trailer, masfu_item_trailer set itmt_clqty = itmt_clqty -  rect_grnqty ,itmt_clvalue = itmt_clvalue - rect_itemvalue  where itmt_compcode= '$compcode' and itmt_fincode = '$finid' and  rect_item_code = itmt_hdcode and rect_hdseqno = $rech_seqno;";
        $result3=mysql_query($query3);

echo $query3;
echo "<br>";

	$query4 = "update trnfu_receipt_trailer, masfu_item_trailer set itmt_avgrate = case when itmt_clvalue > 0 and itmt_clqty > 0 then itmt_clvalue / itmt_clqty else 0 end  where itmt_compcode= '$compcode' and itmt_fincode = '$finid' and  rect_item_code = itmt_hdcode and rect_hdseqno = $rech_seqno;";
        $result4=mysql_query($query4);



for ($i=0;$i<$rowcnt;$i++)
{

	$sno = $i + 1;
	$itemcode    = $griddet[$i]['itemcode'];
	$itemname    = $griddet[$i]['itemname'];
	$billqty     = (float) $griddet[$i]['billqty'];
	$millqty     = (float)$griddet[$i]['millqty'];
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
	$itemrate     = (float)$griddet[$i]['itemrate'];
	$itemvalue    = (float)$griddet[$i]['itemvalue'];
	$remarks      = $griddet[$i]['remarks'];
	$costval      = (float)$griddet[$i]['costval'];
	$costrate     = (float)$griddet[$i]['costrate'];
	$dnvalue      = (float)$griddet[$i]['dnvalue'];

	$moisvalue    = (float)$griddet[$i]['moisvalue'];

	$finesrate    = (float)$griddet[$i]['finesrate'];
	$finesvalue   = (float)$griddet[$i]['finesvalue'];
	$sandvalue    = (float)$griddet[$i]['sandvalue'];
	$othdedvalue  = (float)$griddet[$i]['othdedvalue'];
	$othdedqty    = (float)$griddet[$i]['othdedqty'];


	$moisremarks      = $griddet[$i]['remarksmois'];
	$finesremarks     = $griddet[$i]['remarksfines'];
	$sandremarks      = $griddet[$i]['remarkssand'];
	$othdedremarks    = $griddet[$i]['remarksotherded'];

        $dnqty           = (float)$griddet[$i]['totdedqty'];

        $qtydiffremarks    = '';




	$myDateTime = DateTime::createFromFormat('Y-m-d', $billdate);
	$dnbilldate = $myDateTime->format('d-m-Y');


        $dnremarks  = "BEING DEBITED TO YOUR ACCOUNT FOR THE BILL NO " . $billno . " Dt " . $dnbilldate . " " .  $remarks;  

        $dnremarks   = substr(trim($dnremarks),0,498);

	//$tonfreight=$gridfre[$i]['tonfreight'];


	$query2= "update trnfu_receipt_trailer set   rect_billqty = $billqty , rect_millqty = $millqty, rect_mois_fixed = $fixedMois , rect_mois_actual =$actualMois, rect_moisper=$ExMoisper, rect_moisqty = $moisqty, rect_sand_fixed = $fixedsand , rect_sand_actual = $actualsand , rect_sandper = $Exsand, rect_sandqty = $sandqty , rect_fines_fixed = $fixedfines, rect_fines_actual = $actualfines, rect_finesper =$Exfines , rect_finesqty = $finesqty, rect_othdedqty = $totothdedqty, rect_totdedqty = $totdedqty, rect_itemrate =$itemrate, rect_grnqty = $partygrnqty, rect_itemvalue = $itemvalue, rect_costrate = $costrate , rect_costvalue = $costval, rect_remarks = '$remarks'  , rect_debitnote_value = $dnvalue where rect_hdseqno = '$rech_seqno' and rect_seqno = $sno";
        $result2=mysql_query($query2);
	     
echo $query2;
echo "<br>";

$final_cost_value = $costval- $dnvalue;


        $query3= "call spfu_upd_itemtrailer_avgrate ('$compcode','$finid','$itemcode','$millgrnqty', '$final_cost_value',1)";
	$result3=mysql_query($query3);
//echo $query3;
//echo "<br>";
}    


if ($ginaccrefseq > 0) {


    $query7 = "call acc_sp_trn_insacc_ref('$ginaccrefseq','$grnno','$compcode','$finid','$grndate','$voutype', '','','$billno', '$billdate','$narration');";
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




        $DNquery1 = "call acc_sp_trn_insacc_ref('$ginaccrefseqDN','$vouno','$compcode','$finid','$grndate','$dntype', '','','$billno', '$billdate','$dnremarks');";
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

    $DNquery7 = "call acc_sp_insdbcrnoteheader('$gindbcrseq','$compcode','$finid','$dntype','$conval','$vouno','$voudate','$party','$party','$purledcode', '$debitnoteamount','$dnremarks','S' , '$output', '$ginaccrefseqDN','$hsncode','$usercode','$dnqty','Fuel','0','','$today','$today');";
    $DNresult7 = mysql_query($DNquery7);
   


//echo $DNquery7;
//echo "<br>";


#Insert AccDbcrNoteTrailer


$DNquery8 = "call acc_sp_insdbcrnotetrailer('$gindbcrseq','$billno','$billdate','$dntaxable' ,'$debitnoteamount','$dnigst', '$dncgst','$dnsgst','$igstper','$cgstper','$sgstper','$igstledcode','$cgstledcode','$sgstledcode',0,0,0,0,0,'0',0,0,'$dntaxable')";

$DNresult8 = mysql_query($DNquery8);

//echo $DNquery8;
//echo "<br>";


  $DNquery10 = "update trnfu_receipt_header set rech_dnno ='$vouno',rech_dndate  = '$voudate' ,rech_dnseqno =  $gindbcrseq,rech_dnaccseqno = $ginaccrefseqDN  where rech_compcode = '$compcode' and rech_fincode = '$finid' and rech_seqno = $rech_seqno";

//echo $DNquery10;
//echo "<br>";
$DNresult10=mysql_query($DNquery10);




       $query = "select ifnull(max(ref_slno),0) as refslno from acc_adjustments";
       $result = mysql_query($query);
       $rec = mysql_fetch_array($result);
       $ginrefslno = $rec['refslno'];

        $ginrefslno = $ginrefslno + 1;

	$querydate = "select datediff('$voudate','$billdate') as daysin";
	$resultdate = mysql_query($querydate);
	$recdatenew = mysql_fetch_array($resultdate);
	$adjdays=$recdatenew['daysin'];


$DNquery9 = "insert into acc_adjustments (ref_slno, ref_compcode, ref_finid, ref_docseqno, ref_docno, ref_docdate, ref_adjseqno, ref_adjvouno, ref_invno, ref_invdate, ref_adjamount, ref_adj_days, ref_adj_by, ref_adjusted_on,ref_paymt_terms,ref_ledcode,ref_adjvoutype) values ('$ginrefslno','$compcode','$finid','$ginaccrefseqDN','$vouno', '$voudate', '$ginaccrefseq', '$grnno','$billno','$billdate','$debitnoteamount',$adjdays,'DN',curdate(),$payterms,$party,'$dntype' );";

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

$qtydiffvalue =  $qtydiff * $itemrate;
$rounding = 0;



 $QCquery1 = "update trn_qc_fuel_inspection set 
 qc_fuel_qtydiff_qty = $qtydiff, qc_fuel_qtydiff_rate = $itemrate , qc_fuel_qtydiff_value =$qtydiffvalue,   qc_fuel_mois_rate = $itemrate,  qc_fuel_mois_value = $moisvalue , qc_fuel_fines_rate = $finesrate,qc_fuel_fines_value = $finesvalue,qc_fuel_sand_rate = $itemrate ,qc_fuel_sand_value = $sandvalue, qc_fuel_othded_qty = $othdedqty * 1000, qc_fuel_othded_rate =$itemrate, qc_fuel_othded_value = $othdedvalue, qc_fuel_total_ded_qty = $totdedqty * 1000,   qc_fuel_tot_taxable = $dntaxable, qc_fuel_cgst_per =$cgstper, qc_fuel_sgst_per = $sgstper, qc_fuel_igst_per = $igstper, qc_fuel_cgst_value = $dncgst, qc_fuel_sgst_value = $dnsgst,   qc_fuel_igst_value = $dnigst, qc_fuel_rounding = $rounding, qc_fuel_debitamount =$debitnoteamount, qc_fuel_pur_ledger = $purledcode ,qc_fuel_debitnote_no = '$vouno',qc_fuel_debitnote_date = '$voudate' ,qc_fuel_dn_raised  = 'Y' , qc_fuel_billno = '$billno' , qc_fuel_billdate = '$billdate' , qc_fuel_billqty = $billqty , qc_fuel_billvalue = $billval, qc_fuel_mois_remarks = '$moisremarks', qc_fuel_sand_remarks = '$sandremarks',qc_fuel_fines_remarks = '$finesremarks',qc_fuel_otherded_remarks = '$othdedremarks' , qc_fuel_qtydiff_remarks = '$qtydiffremarks'  where qc_fuel_compcode = '$compcode' and qc_fuel_fincode = '$finid' and  qc_fuel_entryno = $qcentryno ";

//echo $QCquery1;
//echo "<br>";

$QCresult1 = mysql_query($QCquery1);





//echo $debitnoteamount;
//echo "<br>";



 $vno = $grnno; // . " and Accounts Voucher No. " .$vouno;

if ($debitnoteamount > 0)
{

         $vno = $grnno . " and Debit Note Voucher No. " .$vouno;

	if( $result1 && $result2  && $result3   && $result5   && $result6   && $result7 && $DNresult1 && $DNresult5 && $DNresult6 && $DNresult7 && $DNresult8 && $DNresult9  && $DNresult10  && $QCresult1 )
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
	if( $result1 && $result2  && $result3   && $result5   && $result6   && $result7 && $QCresult1)
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
    
 
?>
