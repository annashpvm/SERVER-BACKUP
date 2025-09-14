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
$billno= $_REQUEST['billno'];
$billdate= $_REQUEST['billdate'];
$billval= $_REQUEST['billval'];

$partybillval= (float)$_REQUEST['billval'];


$status= $_REQUEST['status'];
$usrcode= (int) $_REQUEST['usrcode'];
$entrydate= $_REQUEST['entrydate'];


$receiptdt = $_POST['receiptdt'];
$supledcode = $_POST['supledcode'];
$billno = $_POST['billno'];
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

$voutype = 'PLW';

 mysql_query("BEGIN");


#Get Max AccRef Seqno from acc_ref
$query1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
$result1 = mysql_query($query1);
$rec1 = mysql_fetch_array($result1);
$ginaccrefseq=$rec1['con_value'];


  $query1  = "update trnrm_receipt_header set rech_vouno = '$vouno', rech_accdate = '$voudate' , rech_acctflag = 'Y',rech_acc_seqno = '$ginaccrefseq' where rech_seqno = '$rech_seqno'  and rech_acctflag='N' and rech_compcode = $compcode and rech_fincode = $finid";   

//echo $query1;
//echo "<br>";
$result1=mysql_query($query1);

if ($ginaccrefseq > 0) {


    $query7 = "call acc_sp_trn_insacc_ref('$ginaccrefseq','$vouno','$compcode','$finid','$voudate','$voutype', '','','$billno', '$billdate','$narration');";
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
               $query5 = "call acc_sp_trn_insacc_trail ('$ginaccrefseq','$slno','$billno', '$billdate', '$totamt' ,'$adjamt' ,'$ledseq' ,'$amtmode','0')";
               $result5 = mysql_query($query5);

//echo $query5;
//echo "<br>";

               }  


            #Insert AccTran

            $query6 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$ledseq','$dbamt','$cramt','$totamt','$voutype');";
            $result6 = mysql_query($query6);

//echo $query6;
//echo "<br>";

	  }
        }
}


$vno = $rech_no . " and  Accounts Voucher No. " .$vouno;


if( $result1 && $result5   && $result6   && $result7 )
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
