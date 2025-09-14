<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_REQUEST['cnt'];

$griddetacc = json_decode($_REQUEST['griddetacc'],true);
$rowcntacc = $_REQUEST['cntacc'];

$narration = $_REQUEST['remarks'];


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

$billdate = $_POST['billdate'];
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

$crdays = (int)$_POST['crdays'];

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
$purcode = (int)$_POST['purcode'];
$costrate = 0;
$costval = 0;

$othdedqty = 0;
$rech_seqnonew;

$vouno   = $_POST['vouno'];
$voudate = $_POST['voudate'];
$voudate = $_REQUEST['grndate'];

$voutype = 'PFU';


    $usercode = $_POST['usercode'];
    $reason   = strtoupper($_POST['reason']);

    $reccount = 1;
    $today = date("Y-m-d H:i:s"); 


 mysql_query("BEGIN");


#Get Max AccRef Seqno from acc_ref
$query1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
$result1 = mysql_query($query1);
$rec1 = mysql_fetch_array($result1);
$ginaccrefseq=$rec1['con_value'];




 $query1  = "call spfu_upd_receipt_header_second('$rech_seqno','$grndate','$crdays','$itemvalue','$cgstper','$cgstamt','$sgstper','$sgstamt','$igstper','$igstamt', '$handlingmt','$handlingcgst','$handlingsgst','$handlingcgstamt','$handlingsgstamt','$tcsper','$tcsamt','$cessmt','$cessamt','$freight','$othrchrg','$roundoff', '$totamt','$billno','$billdate','$partybillval','$roundneed','$vouno','$voudate','$ginaccrefseq',$qcentno)";

//echo $query1;
//echo "<br>";

$result1=mysql_query($query1);


	$query3 = "update trnfu_receipt_trailer, masfu_item_trailer set itmt_clqty = itmt_clqty -  rect_grnqty ,itmt_clvalue = itmt_clvalue - rect_itemvalue  where itmt_compcode= '$compcode' and itmt_fincode = '$finid' and  rect_item_code = itmt_hdcode and rect_hdseqno = $rech_seqno;";
        $result3=mysql_query($query3);

//echo $query3;
//echo "<br>";

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


	//$tonfreight=$gridfre[$i]['tonfreight'];


	$query2= "update trnfu_receipt_trailer set   rect_billqty = $billqty , rect_millqty = $millqty, rect_mois_fixed = $fixedMois , rect_mois_actual =$actualMois, rect_moisper=$ExMoisper, rect_moisqty = $moisqty, rect_sand_fixed = $fixedsand , rect_sand_actual = $actualsand , rect_sandper = $Exsand, rect_sandqty = $sandqty , rect_fines_fixed = $fixedfines, rect_fines_actual = $actualfines, rect_finesper =$Exfines , rect_finesqty = $finesqty, rect_othdedqty = $totothdedqty, rect_totdedqty = $totdedqty, rect_itemrate =$itemrate, rect_grnqty = $partygrnqty, rect_itemvalue = $itemvalue, rect_costrate = $costrate , rect_costvalue = $costval, rect_remarks = '$remarks'  , rect_debitnote_value = $dnvalue where rect_hdseqno = '$rech_seqno' and rect_seqno = $sno";
        $result2=mysql_query($query2);
	     
//echo $query2;
//echo "<br>";

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

   $query4 = "insert into acc_voucher_logs values ($ginaccrefseq,$reccount,'$today',$usercode,'$reason')";
   $result4 = mysql_query($query4);

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
               $query5 = "call acc_sp_trn_insacc_trail ('$ginaccrefseq','$slno','$billno', '$billdate', '$totamt' ,'$adjamt' ,'$ledseq' ,'$amtmode','$crdays','0')";
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


 $vno = $grnno; // . " and Accounts Voucher No. " .$vouno;


if( $result1 && $result2  && $result3   && $result5   && $result6   && $result7 )
{
	mysql_query("COMMIT");                        
	echo '({"success":"true","GRNNo":"'. $vno . '"})';
    
}
else
{
    mysql_query("ROLLBACK");            
    echo '({"success":"false","GRNNo":"' . $vno . '"})';
} 

    
 
?>
