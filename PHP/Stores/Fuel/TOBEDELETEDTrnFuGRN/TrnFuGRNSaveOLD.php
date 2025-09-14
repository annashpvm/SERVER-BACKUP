<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();


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
$vouno= $_REQUEST['vouno'];
$acctflag= $_REQUEST['acctflag'];
$accdate= $_REQUEST['accdate'];
$status= $_REQUEST['status'];
$usrcode= (int) $_REQUEST['usrcode'];
$entrydate= $_REQUEST['entrydate'];


$receiptdt = $_POST['receiptdt'];
$supledcode = $_POST['supledcode'];
$billnoh = $_POST['billnoh'];
$billdt = $_POST['billdt'];
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





if ($gstFlaggrn === "Add") {

	 $query1 = "select IFNULL(max(rech_seqno),0)+1 as rech_seqno from trnfu_receipt_header";
	 $result1 = mysql_query($query1);
	 $rec1 = mysql_fetch_array($result1);
	 $rech_seqno=$rec1['rech_seqno'];
 mysql_query("BEGIN");


$query3="call spfu_ins_receipt_header ('$rech_seqno','$compcode','$finid','$rech_no','$grndate','$supcode','$qcentno','$ordseqno','$crdays','$areacode','$itemvalue','$cgstper','$cgstamt', '$sgstper','$sgstamt','$igstper','$igstamt','$handlingmt','$handlingcgst','$handlingsgst','$handlingcgstamt','$handlingsgstamt',
'$tcsper','$tcsamt','$cessmt','$cessamt','$freight','$othrchrg','$roundoff','$totamt','$billno','$billdate','$billvalue','$geno',
'$gedate','$wtslipno','$lorryno','$usrcode','$entrydate', '$roundneed')";
	 $result3=mysql_query($query3);
echo $query3;

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

$sno = 1;
$query4= "call spfu_ins_receipt_trailer('$rech_seqno','$sno','$itemcode','$lotcode','$billqty','$millqty','$moisper','$moisqty', 
'$sandper','$sandqty','$finesper','$finesqty','$othdedqty','$totdedqty','$gcv' ,
'$itemrate','$grnqty','$itemvalue','$costrate','$costval','$remarks', $purcode)";
	 $result4=mysql_query($query4);

echo $query4;
	     


	 $query7= "call spfu_insupd_stockdetails ('$compcode','$lotcode','$itemcode','$grnqty')";
	$result7=mysql_query($query7);
//echo $query7;
	 $query8= "call spfu_upd_itemtrailer_avgrate ('$compcode','$finid','$itemcode','$grnqty','$costrate',1)";
	$result8=mysql_query($query8);
//echo $query8;
	 $query9= "call spfu_upd_orderreceiptdets ('$ordseqno','$itemcode','$grnqty',0)";
	$result9=mysql_query($query9);






//echo $query9;
  






  

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
