<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_REQUEST['cnt'];

$edgriddet = json_decode($_REQUEST['edgriddet'],true);
$edrowcnt = $_REQUEST['edcnt'];
$edgriddegr = json_decode($_REQUEST['edgriddegr'],true);
$eddegrcnt = $_REQUEST['eddegrcnt'];

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

$itemval = $_REQUEST['itemval'];

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
$vouno= $_REQUEST['vouno'];
$acctflag= $_REQUEST['acctflag'];
$accdate= $_REQUEST['accdate'];
$status= $_REQUEST['status'];
$usrcode= $_REQUEST['usrcode'];
$entrydate= $_REQUEST['entrydate'];


$receiptdt = $_POST['receiptdt'];
$supledcode = $_POST['supledcode'];
$billnoh = $_POST['billnoh'];
$billdt = $_POST['billdt'];
$billvalueh = $_POST['billvalueh'];

$chklotno = $_POST['chklotno'];
$itemval2 = $_POST['itemval2'];
$billqtyt = $_POST['billqtyt'];
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

$rech_seqnonew;


/*
if($gstFlaggrn === "Add"){
$pononew=$ordseqno;
}
else if($gstFlaggrn === "Edit" ){ 
$pononew=$edpono;
$rech_seqno=$edgrnno;
	 $queryjk = "select rech_no from trnfu_receipt_header where rech_fincode = '$finid' and rech_compcode='$compcode' and rech_seqno = '$edgrnno' ";
	 $resultjk= mysql_query($queryjk);
	 $recjk = mysql_fetch_array($resultjk);
	 $chkgrn=$recjk['rech_no']; }
if($gstFlaggrn === "Confirm" ){ 
$pononew=$edpono;
$rech_seqno=$edgrnno;
	 $queryjk = "select rech_no from trnfu_receipt_header where rech_fincode = '$finid' and rech_compcode='$compcode' and rech_seqno = '$edgrnno' ";
	 $resultjk= mysql_query($queryjk);
	 $recjk = mysql_fetch_array($resultjk);
	 $chkgrn=$recjk['rech_no']; }	
*/


if ($gstFlaggrn === "Add") {

	 $query1 = "select IFNULL(max(rech_seqno),0)+1 as rech_seqno from trnfu_receipt_header";
	 $result1 = mysql_query($query1);
	 $rec1 = mysql_fetch_array($result1);
	 $rech_seqno=$rec1['rech_seqno'];
/*
	 $query2 = "select IFNULL(max(rech_no),0)+1 as rech_no from trnfu_receipt_header where rech_fincode = '$finid' and rech_compcode='$compcode'";
	 $result2= mysql_query($query2);
	 $rec2 = mysql_fetch_array($result2);
	 $rech_no=$rec2['rech_no'];
*/
	 mysql_query("BEGIN");
	// if ($rech_seqno > 0 && $rech_no > 0 && $finid > 0 && $compcode > 0)
	  // { 

$query3="call spfu_ins_receipt_header ('$rech_seqno','$compcode','$finid','$rech_no','$grndate','$supcode','$ordseqno','$crdays','$areacode','$frtype','$itemval','$cgstper','$cgstamt', '$sgstper','$sgstamt','$igstper','$igstamt','$handlingmt','$handlingcgst','$handlingsgst','$handlingcgstamt','$handlingsgstamt','$tcsper','$tcsamt','$cessmt','$cessamt','$freight', '$othrchrg','$roundoff','$totamt','$billno','$billdate','$partybillval','$geno','$gedate','$wtslipno','$lorryno','$usrcode','$entrydate', '$roundneed')";
	 $result3=mysql_query($query3);
//echo $query3;

}
else if ($gstFlaggrn === "Edit") {
 mysql_query("BEGIN");
	// p_rect_compcode int, p_rect_fincode int, p_rect_hdseqno int, p_rect_ordhdseqno int)



	 $query10= "call spfu_del_receipt_trailer ('$compcode','$finid','$rech_seqno','$ordseqno')";
	$result10=mysql_query($query10);
//echo $query10;
	 $query11= "call spfu_upd_receipt_header('$rech_seqno','$grndate','$crdays','$areacode','$itemval','$cgstper','$cgstamt','$sgstper','$sgstamt','$igstper','$igstamt', '$handlingmt','$handlingcgst','$handlingsgst','$handlingcgstamt','$handlingsgstamt','$tcsper','$tcsamt','$cessmt','$cessamt','$freight','$othrchrg','$roundoff', '$totamt','$billno','$billdate','$partybillval','$geno','$gedate','$wtslipno','$lorryno','$roundneed')";
//echo $query11;
	$result11=mysql_query($query11);

}
if($gstFlaggrn === "Add" || $gstFlaggrn === "Edit"){
	for ($i=0;$i<$rowcnt;$i++)
	{

	$sno = $i + 1;
	//$po_serialno = $griddet[$i]['slno'];
	$itemcode = $griddet[$i]['itemcode'];
	$itemname = $griddet[$i]['itemname'];
	$ordqty   = $griddet[$i]['ordqty'];
	$billqty = $griddet[$i]['billqty'];
	$millqty = $griddet[$i]['millqty'];
	$moisper = (float)$griddet[$i]['moisper'];
	$moisqty = (float)$griddet[$i]['moisqty'];

	$rejper = (float)$griddet[$i]['rejper'];
	$rejqty = (float)$griddet[$i]['rejqty'];

	$tareqty = (float)$griddet[$i]['tarqty'];
	$othdedqty =(float)$griddet[$i]['othdedqty'];
	$totdedqty =(float)$griddet[$i]['totdedqty'];

	$grnqty = $griddet[$i]['grnqty'];
	$itemrate = $griddet[$i]['itemrate'];

	$itemvalue = $griddet[$i]['itemvalue'];
	$lotno = $griddet[$i]['lotno'];
	$remarks = $griddet[$i]['remarks'];
	$lotcode = $griddet[$i]['lotcode'];
	$billno = $griddet[$i]['billno'];

	$billdate = $griddet[$i]['billdate'];

	$gcv = (float)$griddet[$i]['gcv'];
	$opttlitem = $griddet[$i]['opttlitem'];

	$billvalue = (float)$griddet[$i]['billvalue'];
	$costval = (float)$griddet[$i]['costval'];
	$costrate =(float)$griddet[$i]['costrate'];
	$grpcode      = $griddet[$i]['grpcode'];


	$query4= "call spfu_ins_receipt_trailer('$rech_seqno','$sno','$itemcode','$lotcode','$billqty','$millqty','$itemrate','$tareqty','$moisper','$moisqty','$othdedqty','$rejper','$rejqty','$totdedqty','$grnqty','$itemvalue',
'$costrate','$costval','$remarks','$gcv' , $grpcode)";
	 $result4=mysql_query($query4);

//echo $query4;
	     
	/* $query10= "call spfu_upd_orderreceiptdets ('$pononew','$itemcode',('$degradeqty'+'$grnqty'),0)";
	$result10=mysql_query($query10);*/

	 $query7= "call spfu_insupd_stockdetails ('$compcode','$lotcode','$itemcode','$grnqty')";
	$result7=mysql_query($query7);
//echo $query7;
	 $query8= "call spfu_upd_itemtrailer_avgrate ('$compcode','$finid','$itemcode','$grnqty','$costrate',1)";
	$result8=mysql_query($query8);
//echo $query8;
	 $query9= "call spfu_upd_orderreceiptdets ('$ordseqno','$itemcode','$grnqty',0)";
	$result9=mysql_query($query9);






//echo $query9;

	}    


/*
	for ($i=0;$i<$frecnt;$i++)
	{

	$sno = $i + 1;
	$freval=$gridfre[$i]['freval'];
	 $query5= "Update trnfu_receipt_trailer Set rect_freightvalue='$freval' Where rect_hdseqno='$rech_seqno' AND rect_seqno='$sno'"; $result5=mysql_query($query5);
	}
*/
	}


if ($gstFlaggrn === "Confirm"){

			 mysql_query("BEGIN");
			 if ($chkdel == 0) {
			$accqry3 = " delete from trnfu_receipt_handling where rech_compcode = '$compcode' and rech_fincode = '$finid' and rech_lotno = '$chklotno'   and rech_grnno = '$chkgrn' ";
			}
			$accupd3 = mysql_query($accqry3);
			$gst =0;
			$gst = ($itemval2 * $cgstph / 100) + ($itemval2 * $sgstph / 100) + ($itemval2 * $igstph / 100);
					
			if ($itemval2 > 0){
				$purvalue = ($itemval2 + $gst + $tcsamth + ($billqtyt * $cessmth));

				$accqry4 = "insert into trnfu_receipt_handling values ('$compcode','$finid','$chklotno','$chkgrn' ,'$receiptdt','P','$supledcode','$purvalue','N','','','$receiptdt','','0','0','0','0','0','0','$billnoh','$billdt','$billvalueh','0','$lorrynot','$grnqtyt','N','','$receiptdt','0')";
				
				$accupd4 = mysql_query($accqry4);
			}
			
			if ($frtval > 0){

				$accqry5 = "insert into trnfu_receipt_handling values ('$compcode','$finid','$chklotno','$chkgrn' ,'$receiptdt','F','$frtsupledcode','$frtval','N','','','$receiptdt','','0','0','0','0','0','0','$billnoh','$billdt','0','0','$lorrynot','$grnqtyt','N','','$receiptdt','0')";
				
				$accupd5 = mysql_query($accqry5);
				

			}
			if (($billqtyt * $handlingmt) > 0){

				$accqry6 = "insert into trnfu_receipt_handling values ('$compcode','$finid','$chklotno','$chkgrn' ,'$receiptdt','H','$handlingledcode',($billqtyt * $handlingmt),'N','','','$receiptdt','','0','0','0','0','0','0','$billnoh','$billdt','0','0','$lorrynot','$grnqtyt','N','','$receiptdt','0')";
				
				$accupd6 = mysql_query($accqry6);
				

			}	

		

			if ($unloadexpt > 0){
				$resjk= mysql_query("Select * from maspur_supplier_master where sup_code = '$unloadledcode'");
				$recjk = mysql_fetch_array($resjk);
				$unloadlCode=$recjk['sup_led_code'];	

				$accqry7 = "insert into trnfu_receipt_handling values ('$compcode','$finid','$chklotno','$chkgrn' ,'$receiptdt','U','$unloadlCode',$unloadexpt,'N','','','$receiptdt','','0','0','0','0','0','0','$billnoh','$billdt','0','0','$lorrynot','$grnqtyt','N','','$receiptdt','0')";
				
				$accupd7 = mysql_query($accqry7);

			}			

}	
	

  

if ($gstFlaggrn === "Add") {    
	if($result3 && $result4  )
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
	if( $result10 && $result11 && $result4  && $result7 && $result8 && $result9)
	{
		mysql_query("COMMIT");                        
		echo '({"success":"true","GRNNo":"'. $rech_no . '"})';

		    
	}
	else
	{
	    mysql_query("ROLLBACK");            
	    echo '({"success":"false","GRNNo":"' . $rech_no . '"})';
	} 
} 
if ($gstFlaggrn === "Confirm") {   
	if( $accupd4  )
	{
	
		$cfmacc = mysql_query("Update trnfu_receipt_header Set rech_acctflag='Y' Where rech_fincode = '$finid' and rech_compcode='$compcode' and rech_seqno = '$rech_seqno' ");
		if ($cfmacc) {
		mysql_query("COMMIT");                        
		echo '({"success":"true","GRNNo":"'. $rech_no . '"})';
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
	    echo '({"success":"false","GRNNo":"' . $rech_no . '"})';
	} 
} 
       
 
?>
