<?php

require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");
session_start();

$savetype = ($_REQUEST['flagtype']);

$griddet = json_decode($_REQUEST['griddet'], true);
$rowcnt = $_REQUEST['cnt'];

$griddet2 = json_decode($_REQUEST['griddet2'], true);
$rowcnt2 = $_REQUEST['cnt2'];


$ginaccrefseq = $_REQUEST['accrefseq'];
$vouno = $_REQUEST['vouno'];
$voudate = $_REQUEST['voudate'];
$refno = $_REQUEST['refno'];
$refdate = $_REQUEST['refdate'];




$narration = ($_REQUEST['narration']);
$voutype = $_REQUEST['voutype'];
$bankname = '';
$paymode = '';
$payno ='';
$paydate = $_REQUEST['refdate'];
//$party = $_REQUEST['party'];

$partyledcode = $_REQUEST['partyledcode'];

$party = $_REQUEST['party'];

$drcrledger = (int) $_REQUEST['drcrledger'];
$taxable = (float) $_REQUEST['taxable'];
$debitvalue = $_REQUEST['totalamount'];

$billmode = $_REQUEST['billmode'];
$reason = $_REQUEST['reason'];
$totalamount = $_REQUEST['totalamount'];

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

$others = (float)$_REQUEST['others'];


if ($cgstval ==0)
   $cgstledcode = 0;

if ($sgstval ==0)
   $sgstledcode = 0;

if ($igstval ==0)
   $igstledcode = 0;



$gstper = $_REQUEST['gstper'];
$gltype = $_REQUEST['gltype'];
$invno = $_REQUEST['refno'];
$invdate = $_REQUEST['refdate'];
$gindbcrseq = $_REQUEST['dnseqno'];
$docseqno = $_REQUEST['docseqno'];
// $dnseqno = $_REQUEST['dnseqno'];

$rounding = (float) $_REQUEST['rounding'];
$roundoff = $_REQUEST['roundoff'];


$usercode = $_POST['usercode'];
$reason   = strtoupper($_POST['reason']);

$remarks  = strtoupper($_POST['remarks']);


$ratetype = strtoupper($_POST['ratetype']);


$reccount = 1;
$today = date("Y-m-d H:i:s");  


#Begin Transaction
mysql_query("BEGIN");

        for($i=0;$i<$rowcnt2;$i++){
            $qty = (float) $griddet2[$i]['qty'];
            $rate = (float) $griddet2[$i]['rate'];
            $value = (float) $griddet2[$i]['value'];

            if ($qty > 0)
                $hsncode  =   $griddet2[$i]['hsn'];

        }       



if ($savetype == 'Edit')
{


        $query4 = "delete from  str_debit_note where pur_compcode = '$compcode' and pur_finid = '$finid' and pur_vouno = '$vouno' and pur_seqno = $docseqno";
        $resulta4 = mysql_query($query4);


//echo $query4;
//echo "<br>";


        $query4 = "update tmpacc_dbcrnote_header set dbcr_date = '$voudate' , dbcr_partycode = '$party',dbcr_partyledcode = '$partyledcode',dbcr_ledcode = '$drcrledger', dbcr_value = '$debitvalue', dbcr_narration =  '$narration' , dbcr_party_type = '$gltype'  , dbcr_output = '$output' , dbcr_hsncode =  '$hsncode'  where dbcr_vouno = '$vouno'  and dbcr_comp_code = '$compcode' and dbcr_finid = '$finid' and dbcr_seqno = $gindbcrseq";
        $resulta6 = mysql_query($query4);

//echo $query4;
//echo "<br>";

        $query5 = "update tmpacc_dbcrnote_trailer set dbcrt_inv_no = '$invno' , dbcrt_inv_date = '$invdate'  , dbcrt_grossvalue = '$taxable',dbcrt_value ='$debitvalue',dbcrt_igstvalue = '$igstval' ,dbcrt_cgstvalue = '$cgstval' ,dbcrt_sgstvalue = '$sgstval', dbcrt_igstper = '$igstper', dbcrt_cgstper = '$cgstper', dbcrt_sgstper = '$sgstper', dbcrt_igstledcode ='$igstledcode' , dbcrt_cgstledcode =  '$cgstledcode' , dbcrt_sgstledcode =  '$sgstledcode' ,dbcrt_rounding = '$rounding' ,dbcrt_otheramt = '$others'  where dbcrt_seqno = '$gindbcrseq'";

       $resulta7 = mysql_query($query5);
//echo $query5;
//echo "<br>";


}
else
{


	#Get Voucher Number



	$query1 = "select ifnull(max(pur_seqno),0) + 1 as pur_seqno from str_debit_note where pur_compcode = '$compcode' and pur_finid = '$finid';";
	$result1 = mysql_query($query1);
	$rec1 = mysql_fetch_array($result1);
	$docseqno = $rec1['pur_seqno'];

	$query2 = "select ifnull(max(dbcr_no),0) + 1 as dbcr_no from tmpacc_dbcrnote_header where dbcr_type = '$voutype' and dbcr_finid = '$finid' and dbcr_comp_code = '$compcode';";

//echo $query2;

	$result2 = mysql_query($query2);
	$rec2 = mysql_fetch_array($result2);
	$conval = $rec2['dbcr_no'];

        $lastno = substr('000'. $conval,-4);
    	$vouno = $voutype .' '. $lastno;


	#Get Max DBCR Seqno from tmpacc_dbcrnote_header

	$query3 = "select ifnull(max(dbcr_seqno),0) + 1 as con_value from tmpacc_dbcrnote_header;";
	$result3 = mysql_query($query3);
	$rec3 = mysql_fetch_array($result3);
	$gindbcrseq = $rec3['con_value'];


#Insert AccDbcrNoteHeader
    $querya6 = "call tmpacc_sp_insdbcrnoteheader('$gindbcrseq','$compcode','$finid','$voutype','$conval','$vouno','$voudate','$party','$partyledcode','$drcrledger', '$debitvalue','$narration','S' , '$output', '$ginaccrefseq','$hsncode','$usercode','0','Stores');";
    $resulta6 = mysql_query($querya6);
   

//echo $querya6;


#Insert AccDbcrNoteTrailer


$querya7 = "call tmpacc_sp_insdbcrnotetrailer('$gindbcrseq','$invno','$invdate','$taxable' ,'$debitvalue','$igstval', '$cgstval','$sgstval','$igstper','$cgstper','$sgstper','$igstledcode','$cgstledcode','$sgstledcode',0,0,0,$others ,0,
'$rounding',0,0,'$taxable')";
    $resulta7 = mysql_query($querya7);

//echo $querya7;


}

        $inscnt = 1;
        for($i=0;$i<$rowcnt2;$i++){
            $slno = $i+1;
            $description = strtoupper(trim($griddet2[$i]['description']));


            $description=str_replace("'","",$description);

            $hsn =   $griddet2[$i]['hsn'];
            $uom =   $griddet2[$i]['uom'];
            $qty = (float) $griddet2[$i]['qty'];
            $rate = (float) $griddet2[$i]['rate'];
            $value = (float) $griddet2[$i]['value'];

            if ($value > 0)
            {
		   $querya1 = "insert into str_debit_note values ('$docseqno', '$compcode', '$finid','$voutype','$vouno', '$voudate', '$party', '$partyledcode','$refno', '$refdate', '$inscnt' , '$description', '$hsn',  '$rate' , '$qty', '$uom',  $value, '$taxable', '$drcrledger', '$cgstper', '$cgstval', '$cgstledcode', '$sgstper' , '$sgstval','$sgstledcode', '$igstper', '$igstval', '$igstledcode', '$rounding', '$roundoff', '$totalamount','$ginaccrefseq',$gindbcrseq,'$remarks','$output','$ratetype','$others')";
		   $resulta1 = mysql_query($querya1);
		   $inscnt =    $inscnt  + 1;

//echo $querya1;
//echo "<br>";

            }    

         }  








	if ($resulta1 && $resulta6 && $resulta7) 
	{
	  mysql_query("COMMIT");
	    echo '({"success":"true","vouno":"' . $vouno . '"})';
	} else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","vouno":"' . $vouno . '"})';
	}

?>
