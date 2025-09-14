<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_REQUEST['cnt'];

$edgriddegr = json_decode($_REQUEST['edgriddegr'],true);
$eddegrcnt  = $_REQUEST['eddegrcnt'];

$compcode = $_REQUEST['compcode'];
$finid    = $_REQUEST['finid'];
$gstFlaggrn = $_REQUEST['gstFlaggrn'];

$rech_seqno = $_REQUEST['seqno'];
$rech_no    = $_REQUEST['edgrnno'];

$edpono     = $_REQUEST['edpono'];
$supcode    = $_REQUEST['supcode'];
$ordseqno   = $_REQUEST['ordseqno'];
$grndate    = $_REQUEST['grndate'];
$wtcardno   = $_REQUEST['wtcardno'];
$areacode   = $_REQUEST['areacode'];
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
$servchrg   = (float)$_REQUEST['servchrg'];
$freight    = (float)$_REQUEST['freight'];
$otheramt    = (float)$_REQUEST['otheramt'];

$roundoff= (float)$_REQUEST['roundoff'];
$totamt= (float)$_REQUEST['totamt'];
$billno= $_REQUEST['billno'];
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
$gateentryno= $_REQUEST['gateentryno'];
$gatedate= $_REQUEST['gatedate'];


$receiptdt = $_POST['receiptdt'];
$supledcode = $_POST['supledcode'];
$billnoh = $_POST['billnoh'];
$billdt = $_POST['billdt'];
$billvalueh = $_POST['billvalueh'];
$tcsamth = (float)$_POST['tcsamth'];
$cessmth =(float) $_POST['cessmth'];
$handlingmt = (float)$_POST['handlingmt'];
$cgstph = (float)$_POST['cgstph'];
$sgstph = (float)$_POST['sgstph'];
$igstph = (float)$_POST['igstph'];
$chkgrnh = $_POST['chkgrnh'];
$frtsupledcode = $_POST['frtsupledcode'];
$handlingledcode = $_POST['handlingledcode'];
$chklotno = $_POST['chklotno'];
$itemval2 = (float)$_POST['itemval2'];
$billqtyt = $_POST['billqtyt'];
$lorrynot = $_POST['lorrynot'];
$grnqtyt = (float)$_POST['grnqtyt'];
$frtval = (float)$_POST['frtval'];
$purvalue = (float)$_POST['purvalue'];
$PQTY = (float)$_POST['PQTY'];
$GQTY = (float)$_POST['GQTY'];
$chkdel = $_POST['chkdel'];

$crdays = (int)$_POST['crdays'];

$roundneed = $_POST['roundneed'];
$qcinsno   = (int)$_POST['qcinsno'];
$purledger = (int)$_POST['purledger'];

$rech_seqnonew;



/*
if($gstFlaggrn === "Add"){
$pononew=$ordseqno;
}
else 
{ 
$pononew=$edpono;
$rech_seqno=$edgrnno;
	 $queryjk = "select rech_no from trnrm_receipt_header where rech_fincode = '$finid' and rech_compcode='$compcode' and rech_seqno = '$edgrnno' ";
	 $resultjk= mysql_query($queryjk);
	 $recjk = mysql_fetch_array($resultjk);
	 $chkgrn=$recjk['rech_no'];
 }

*/


if ($gstFlaggrn === "Add") {

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
 
	 $query3= "call sprm_ins_receipt_header('$rech_seqno','$compcode','$finid','$rech_no','$supcode','$ordseqno','$crdays','$grndate','$wtcardno','$areacode' ,'$truck', '$frtype', '$itemval','$sgstper','$sgstamt','$cgstper','$cgstamt','$igstper','$igstamt','$tcsper','$tcsamt', '$freight', '$otheramt','$roundoff','$totamt','$billno', '$billdate' ,'$billval','$usrcode','$entrydate','$gateentryno','$gatedate',0, '$roundneed', '$qcinsno','$purledger' )";

//echo $query3;
//echo "<br>";

	 $result3=mysql_query($query3);


	$query2= "update trn_qc_rm_inspection set qc_rm_grn_status = 'Y',qc_rm_grnno = '$rech_no' where qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' and qc_rm_entryno = '$qcinsno'";
	 $result2=mysql_query($query2);


}
else
{

      $query11= "call sprm_del_receipt_trailer ('$compcode','$finid','$rech_seqno','$edpono')";
      $result11=mysql_query($query11);

//echo $query11;

      $query14= "call sprm_upd_receipt_header('$rech_seqno','$grndate','$wtcardno','$areacode' ,'$crdays','$truck','$frtype', '$itemval','$sgstper', '$sgstamt','$cgstper','$cgstamt','$igstper','$igstamt','$tcsper','$tcsamt','$freight', '$otheramt','$roundoff','$totamt','$billno','$billdate', '$billval','$gateentryno','$gatedate','$roundneed',,'$purledger' )";
	$result14=mysql_query($query14);
//echo $query14;

}



	for ($i=0;$i<$rowcnt;$i++)
	{
	 				
	$sno = $i + 1;


	$ticketno   = $griddet[$i]['ticketno'];
	$itemcode   = $griddet[$i]['itemcode'];
	$billqty    = (float)$griddet[$i]['billwt'];
	$millqty    = (float)$griddet[$i]['ticketwt'];
	$itemrate   = (float)$griddet[$i]['itemrate'];
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


	 $query4= "insert into trnrm_receipt_trailer values('$rech_seqno','$sno','$itemcode',$ticketno,'$billqty','$millqty',
'$moismatrialqty','$moisforqty','$moisper','$moisqty',$lifelessper,'$lifelessqty',$rejectper,'$rejqty','$totdedqty', '$degradeqty', upper('$remarks') ,'$packtype','$grnqty','$itemrate', '$itemvalue','$costrate','$costvalue','')";
	 $result4=mysql_query($query4);
//  echo $query4;
//echo "<br>";


	$query5= "update trn_weight_card set wt_grn_process = 'Y' where wc_compcode = '$compcode' and wc_fincode = '$finid'  and wc_ticketno = $ticketno";
	 $result5=mysql_query($query5);


	 $query6= "call sprm_upd_itemtrailer_avgrate ('$compcode','$finid','$itemcode','$grnqty','$costrate',1)";
         $result6=mysql_query($query6);
//  echo $query6;
//echo "<br>";
	 $query7= "call sprm_upd_orderreceiptdets ('$ordseqno','$itemcode',('$degradeqty'+'$grnqty'),0)";
	$result7=mysql_query($query7);
//   echo $query7;
//echo "<br>";
	}    


if ($gstFlaggrn === "Add") {    
	if($result3 && $result4 && $result5 &&  $result6 && $result7 )
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
	if( $result11 && $result14 &&  $result4  &&$result6 && $result7     )
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
if ($gstFlaggrn === "Confirm") {   
	if( $accupd4  )
	{
		$cfmacc = mysql_query("Update trnrm_receipt_header Set rech_acctflag='Y' Where rech_fincode = '$finid' and rech_compcode='$compcode' and rech_seqno = '$rech_seqno' ");
		if ($cfmacc) {
		mysql_query("COMMIT");                        
		echo '({"success":"true","GRNNo":"'. $rech_no  . '"})';
		}
		
		else
		{
	    		mysql_query("ROLLBACK");            
	    		echo '({"success":"false","GRNNo":"' . $rech_no . '"})';
		} 

		    
	}
	else
	{
	    mysql_query("ROLLBACK");            
	    echo '({"success":"false","GRNNo":"' . $rech_no  . '"})';
	} 
} 

       
 
?>
