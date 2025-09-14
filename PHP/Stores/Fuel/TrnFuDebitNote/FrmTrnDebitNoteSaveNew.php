<?php

require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");
session_start();

$savetype = ($_REQUEST['savetype']);
$griddet = json_decode($_REQUEST['griddet'], true);
$rowcnt = $_REQUEST['cnt'];
$ginaccrefseq = $_REQUEST['accrefseq'];
$vouno = $_REQUEST['vouno'];
$voudate = $_REQUEST['voudate'];
$refno = $_REQUEST['refno'];
$refdate = $_REQUEST['refdate'];
$narration  = substr(trim($_POST['narration']),0,300);
$voutype = $_REQUEST['voutype'];
$bankname = $_REQUEST['bankname'];
$paymode = $_REQUEST['paymode'];
$payno = $_REQUEST['payno'];
$paydate = $_REQUEST['paydate'];
$party = $_REQUEST['party'];
$partyledcode = $_REQUEST['party'];



$drcrledger = (int) $_REQUEST['drcrledger'];
$taxable = (float) $_REQUEST['taxable'];
$debitvalue = $_REQUEST['debitvalue'];

$billmode = $_REQUEST['billmode'];
$reason = $_REQUEST['reason'];
$taxtype = $_REQUEST['taxtype'];

$cgstper = (float)$_REQUEST['cgstper'];
$sgstper = (float)$_REQUEST['sgstper'];
$igstper = (float)$_REQUEST['igstper'];
$cgstval = (float)$_REQUEST['cgstval'];
$sgstval = (float)$_REQUEST['sgstval'];
$igstval = (float)$_REQUEST['igstval'];

$TCSVAL = $_REQUEST['TCSVAL'];
$finid = $_REQUEST['finid'];
$finyear = $_REQUEST['finyear'];
$compcode = $_REQUEST['compcode'];
$output = $_REQUEST['output'];
$tdsper = $_REQUEST['tdsper'];
$tdsvalue = $_REQUEST['tdsvalue'];
$tdsvaluenew = ($tdsvalue * $tdsper) / 100;

$cgstledcode = (int)$_REQUEST['cgst'];
$sgstledcode = (int)$_REQUEST['sgst'];
$igstledcode = (int)$_REQUEST['igst'];

$usercode = $_POST['usercode'];
$reason   = strtoupper($_POST['reason']);

$reccount = 1;
$today = date("Y-m-d H:i:s");  

$hsncode = $_POST['hsncode'];  

$finsuffix   = $_POST['finsuffix'];



if ($cgstval ==0)
   $cgstledcode = 0;

if ($sgstval ==0)
   $sgstledcode = 0;

if ($igstval ==0)
   $igstledcode = 0;



$gstper = $_REQUEST['gstper'];
$gltype = $_REQUEST['gltype'];

$invno   = strtoupper($_REQUEST['invno']);
$invdate = $_REQUEST['invdate'];
$invqty  = (float)$_REQUEST['invqty'];
$invamt  = (float)$_REQUEST['invamt'];



$gindbcrseq = $_REQUEST['dncrseqno'];
$conval = $_REQUEST['conval'];
$rounding = (float) $_REQUEST['rounding'];

$DNtaxable = (float) $_REQUEST['taxable'] + $rounding;


$qtydiff        = (float)$_REQUEST['qtydiff'];
$qtydiffrate    = (float)$_REQUEST['qtydiffrate'];
$qtydiffvalue   = (float)$_REQUEST['qtydiffvalue'];
$qtydiffremarks = $_REQUEST['qtydiffremarks'];

$moisdnyn       = $_REQUEST['moisdnyn'];
$moisrate       = (float)$_REQUEST['moisrate'];
$moisvalue      = (float)$_REQUEST['moisvalue'];
$moisremarks    = $_REQUEST['moisremarks'];

$finesdnyn      = $_REQUEST['finesdnyn'];
$finesrate      = (float)$_REQUEST['finesrate'];
$finesvalue     = (float)$_REQUEST['finesvalue'];
$finesremarks   = $_REQUEST['finesremarks'];

$sanddnyn       = $_REQUEST['finesdnyn'];
$sandrate       = (float)$_REQUEST['sandrate'];
$sandvalue      = (float)$_REQUEST['sandvalue'];
$sandremarks    = $_REQUEST['sandremarks'];

$othdedqty      = (float)$_REQUEST['othdedqty'];
$othdedrate     = (float)$_REQUEST['othdedrate'];
$othdedvalue    = (float)$_REQUEST['othdedvalue'];
$othdedremarks  = $_REQUEST['othdedremarks'];

$totaldedqty    = (float)$_REQUEST['totaldedqty'];

if ($totaldedqty >0)
   $dnqty          = (float)$_REQUEST['totaldedqty']/1000;
else
   $dnqty          = 0;

$roundneed      = $_REQUEST['roundneed'];
$qcentryno      = (int)$_REQUEST['qcentryno'];

$itemname  = substr(trim($_POST['itemname']),0,38);

$roundingNEW = 0;

#Begin Transaction
mysql_query("BEGIN");



if ($savetype == 'Add')
{
	#Get Max AccRef Seqno from acc_ref
	$query1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
	$result1 = mysql_query($query1);
	$rec1 = mysql_fetch_array($result1);
	$ginaccrefseq = $rec1['con_value'];

	#Get Voucher Number
	$query2 = "select ifnull(max(dbcr_no),0) + 1 as dbcr_no from acc_dbcrnote_header where dbcr_type = '$voutype' and dbcr_finid = '$finid' and dbcr_comp_code = '$compcode';";
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

        $vouno=$voutype.'/' . $vno.'/'.$finsuffix;
//        $lastno = substr('00'. $conval,-4);
//    	$vouno = $voutype.'/' . $lastno.'/'.$finsuffix;




	#Get Max DBCR Seqno from acc_dbcrnote_header

	$query3 = "select ifnull(max(dbcr_seqno),0) + 1 as con_value from acc_dbcrnote_header;";
	$result3 = mysql_query($query3);
	$rec3 = mysql_fetch_array($result3);
	$gindbcrseq = $rec3['con_value'];


//	$roundoff = round($totalval) - $totalval;
}
else
{


	$cquery1 = "select ifnull(max(accvou_slno),0) + 1 as reccount  from acc_voucher_logs where accvou_seqno = '$ginaccrefseq';";
	$cresult1 = mysql_query($cquery1);
	$crec1 = mysql_fetch_array($cresult1);
	$reccount = $crec1['reccount'];




	$query1 = "delete from acc_trail  where acctrail_accref_seqno = '$ginaccrefseq'";
        $result1 = mysql_query($query1);

	$query2 = "delete from acc_tran  where acctran_accref_seqno = '$ginaccrefseq'";
        $result2 = mysql_query($query2);
	
        $query3 = "delete from acc_ref  where accref_seqno ='$ginaccrefseq' and accref_comp_code='$compcode' and accref_finid ='$finid'";
        $result3 = mysql_query($query3);



        $query4 = "update acc_dbcrnote_header set dbcr_date = '$voudate' , dbcr_partycode = '$party',dbcr_partyledcode = '$partyledcode',dbcr_ledcode = '$drcrledger', dbcr_value = '$debitvalue', dbcr_narration =  '$narration' , dbcr_party_type = '$gltype'  , dbcr_output = '$output' , dbcr_item = '$itemname'  ,dbcr_modifydate = '$today'   where dbcr_vouno = '$vouno'  and dbcr_comp_code = '$compcode' and dbcr_finid = '$finid' and  dbcr_seqno = '$gindbcrseq' ";
        $result4 = mysql_query($query4);

//echo $query4;
        $query5 = "update acc_dbcrnote_trailer set dbcrt_inv_no = '$invno' , dbcrt_inv_date = '$invdate'  , dbcrt_grossvalue = '$DNtaxable',dbcrt_value ='$debitvalue',dbcrt_igstvalue = '$igstval' ,dbcrt_cgstvalue = '$cgstval' ,dbcrt_sgstvalue = '$sgstval', dbcrt_igstper = '$igstper', dbcrt_cgstper = '$cgstper', dbcrt_sgstper = '$sgstper', dbcrt_igstledcode ='$igstledcode' , dbcrt_cgstledcode =  '$cgstledcode' , dbcrt_sgstledcode =  '$sgstledcode' ,dbcrt_rounding = '$roundingNEW' , dbcrt_taxable = '$DNtaxable'   where dbcrt_seqno = '$gindbcrseq'";

       $result5 = mysql_query($query5);
//echo $query5;

}

#Insert AccRef


 
if ($ginaccrefseq > 0) {


    $querya2 = "call acc_sp_trn_insacc_ref('$ginaccrefseq','$vouno','$compcode','$finid','$voudate','$voutype', '$bankname','$paymode','$invno', '$invdate','$narration');";
    $resulta2 = mysql_query($querya2);



//echo $querya2;
//echo "<br>";

$cquerya3 = "insert into acc_voucher_logs values ($ginaccrefseq,$reccount,'$today',$usercode,'$reason')";
$cresulta3 = mysql_query($cquerya3);


//echo $cquerya3;

        $inscnt = 0;
        for($i=0;$i<$rowcnt;$i++){
            $slno = $i+1;
            $ledseq = $griddet[$i]['ledcode'];
            $dbamt = (float) $griddet[$i]['debit'];
            $cramt = (float) $griddet[$i]['credit'];
            $totamt =   $dbamt +  $cramt; 
            $ledtype = $griddet[$i]['ledtype'];
            $description = $griddet[$i]['description'];
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
               $querya3 = "call acc_sp_trn_insacc_trail ('$ginaccrefseq','$slno','$vouno', '$voudate', '$totamt' ,'$adjamt' ,'$ledseq' ,'$amtmode','0','0')";
               $resulta3 = mysql_query($querya3);
//echo  $querya3;
//echo "<br>";
               }  


            #Insert AccTran

            $querya4 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$ledseq','$dbamt','$cramt','$totamt','$voutype','$description');";
            $resulta4 = mysql_query($querya4);

//echo  $querya4;	   
//echo "<br>";
            if(resulta4){
                $inscnt = $inscnt + 1;
            }

	  }
        }
}


if ($savetype == 'Add')
{

#Insert AccDbcrNoteHeader
    $querya6 = "call acc_sp_insdbcrnoteheader('$gindbcrseq','$compcode','$finid','$voutype','$conval','$vouno','$voudate','$party','$partyledcode','$drcrledger', '$debitvalue','$narration','S' , '$output', '$ginaccrefseq','$hsncode','$usercode','$dnqty','Fuel','0','$itemname','$today','$today');";
    $resulta6 = mysql_query($querya6);
   

//echo $querya6;
//echo "<br>";


#Insert AccDbcrNoteTrailer


$querya7 = "call acc_sp_insdbcrnotetrailer('$gindbcrseq','$invno','$invdate','$DNtaxable' ,'$debitvalue','$igstval', '$cgstval','$sgstval','$igstper','$cgstper','$sgstper','$igstledcode','$cgstledcode','$sgstledcode',0,0,0,0,0,'$roundingNEW',0,0,'$DNtaxable')";
    $resulta7 = mysql_query($querya7);

//echo $querya7;
//echo "<br>";
}


 $query2 = "update trn_qc_fuel_inspection set 
 qc_fuel_qtydiff_qty = $qtydiff, qc_fuel_qtydiff_rate = $qtydiffrate , qc_fuel_qtydiff_value =$qtydiffvalue, qc_fuel_qtydiff_remarks = '$qtydiffremarks' , qc_fuel_mois_dn_yn = '$moisdnyn', qc_fuel_mois_rate = $moisrate,  qc_fuel_mois_value =$moisvalue, qc_fuel_mois_remarks = '$moisremarks', qc_fuel_fines_dn_yn = '$finesdnyn',qc_fuel_fines_rate = $finesrate,qc_fuel_fines_value = $finesvalue,qc_fuel_fines_remarks = '$finesremarks', qc_fuel_sand_dn_yn = '$sanddnyn',qc_fuel_sand_rate = $sandrate ,qc_fuel_sand_value = $sandvalue ,  qc_fuel_sand_remarks = '$sandremarks', qc_fuel_othded_qty = $othdedqty, qc_fuel_othded_rate =$othdedrate, qc_fuel_othded_value = $othdedvalue,qc_fuel_otherded_remarks = '$othdedremarks', qc_fuel_total_ded_qty = $totaldedqty,   qc_fuel_tot_taxable = $taxable, qc_fuel_cgst_per =$cgstper, qc_fuel_sgst_per = $sgstper, qc_fuel_igst_per = $igstper, qc_fuel_cgst_value = $cgstval, qc_fuel_sgst_value = $sgstval,   qc_fuel_igst_value = $igstval, qc_fuel_round_need = '$roundneed', qc_fuel_rounding = $rounding, qc_fuel_debitamount =$debitvalue, qc_fuel_pur_ledger = $drcrledger ,qc_fuel_debitnote_no = '$vouno',qc_fuel_debitnote_date = '$voudate' ,qc_fuel_dn_raised  = 'Y' , qc_fuel_billno = '$invno' , qc_fuel_billdate = '$invdate' , qc_fuel_billqty = $invqty , qc_fuel_billvalue = $invamt  where qc_fuel_compcode = '$compcode' and qc_fuel_fincode = '$finid' and  qc_fuel_entryno = $qcentryno ";

//echo $query2;
//echo "<br>";
$result2=mysql_query($query2);


if ($savetype == 'Add')
{
	if ( $resulta2  && $resulta4 && $resulta6 && $resulta7  && $result2) 
	{
	  mysql_query("COMMIT");
	    echo '({"success":"true","vouno":"' . $vouno . '"})';
	} else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","vouno":"' . $vouno . '"})';
	}
}
else
{
	if ($result2 && $result4 && $result5) 
	{
	  mysql_query("COMMIT");
	    echo '({"success":"true","vouno":"' . $vouno . '"})';
	} else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","vouno":"' . $vouno . '"})';
	}
}


?>
