<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_REQUEST['cnt'];
$gridfre = json_decode($_REQUEST['gridfre'],true);
$frecnt = $_REQUEST['frecnt'];

$griddegr = json_decode($_REQUEST['griddegr'],true);
$degrcnt = $_REQUEST['degrcnt'];

$edgriddet = json_decode($_REQUEST['edgriddet'],true);
$edrowcnt = $_REQUEST['edcnt'];
$edgriddegr = json_decode($_REQUEST['edgriddegr'],true);
$eddegrcnt = $_REQUEST['eddegrcnt'];

$compcode = $_REQUEST['compcode'];
$finid = $_REQUEST['finid'];
$gstFlaggrn = $_REQUEST['gstFlaggrn'];
$edgrnno = $_REQUEST['edgrnno'];
$edpono = $_REQUEST['edpono'];
$supcode = $_REQUEST['supcode'];
$ordseqno = $_REQUEST['ordseqno'];
$agentcode = $_REQUEST['agentcode'];
$grndate = $_REQUEST['grndate'];
$wtcardno = $_REQUEST['wtcardno'];
$areacode = $_REQUEST['areacode'];
$frtype = $_REQUEST['freighttype'];
$itemval = $_REQUEST['itemval'];
$sgstper = $_REQUEST['sgstper'];
$sgstamt = $_REQUEST['sgstamt'];
$cgstper = $_REQUEST['cgstper'];
$cgstamt = $_REQUEST['cgstamt'];
$igstper = $_REQUEST['igstper'];
$igstamt = $_REQUEST['igstamt'];
$tcsper = $_REQUEST['tcsper'];
$tcsamt= $_REQUEST['tcsamt'];
$servchrg= $_REQUEST['servchrg'];
$freight= (float)$_REQUEST['freight'];
$roundoff= (float)$_REQUEST['roundoff'];
$totamt= (float)$_REQUEST['totamt'];
$billno= $_REQUEST['billno'];
$billdate= $_REQUEST['billdate'];
$billval= $_REQUEST['billval'];
$frparty= $_REQUEST['frparty'];
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
$tcsamth = $_POST['tcsamth'];
$cessmth = $_POST['cessmth'];
$handlingmt = $_POST['handlingmt'];
$cgstph = $_POST['cgstph'];
$sgstph = $_POST['sgstph'];
$igstph = $_POST['igstph'];
$chkgrnh = $_POST['chkgrnh'];
$frtsupledcode = $_POST['frtsupledcode'];
$handlingledcode = $_POST['handlingledcode'];
$chklotno = $_POST['chklotno'];
$itemval2 = $_POST['itemval2'];
$billqtyt = $_POST['billqtyt'];
$lorrynot = $_POST['lorrynot'];
$grnqtyt = $_POST['grnqtyt'];
$frtval = $_POST['frtval'];
$purvalue = $_POST['purvalue'];
$PQTY = $_POST['PQTY'];
$GQTY = $_POST['GQTY'];
$chkdel = $_POST['chkdel'];

$rech_seqnonew;

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

if ($gstFlaggrn === "Add") {

	 $query1 = "select IFNULL(max(rech_seqno),0)+1 as rech_seqno from trnrm_receipt_header";
	 $result1 = mysql_query($query1);
	 $rec1 = mysql_fetch_array($result1);
	 $rech_seqno=$rec1['rech_seqno'];

	 $query2 = "select IFNULL(max(rech_no),0)+1 as rech_no from trnrm_receipt_header where rech_fincode = '$finid' and rech_compcode='$compcode'";
	 $result2= mysql_query($query2);
	 $rec2 = mysql_fetch_array($result2);
	 $rech_no=$rec2['rech_no'];

	 mysql_query("BEGIN");
 
	 $query3= "call sprm_ins_receipt_header('$rech_seqno','$compcode','$finid','$rech_no','$supcode','$ordseqno','$grndate','$wtcardno','$areacode','$frtype','$itemval',  '$sgstper','$sgstamt','$cgstper','$cgstamt','$igstper','$igstamt','$tcsper','$tcsamt','$freight','$roundoff','$totamt','$billno',  '$billdate','$billval',	'$usrcode','$entrydate','$gateentryno','$gatedate',0)";

//echo $query3;

	 $result3=mysql_query($query3);
}
else if ($gstFlaggrn === "Edit") {
 mysql_query("BEGIN");
	$query11= "call sprm_del_receipt_trailer ('$compcode','$finid','$edgrnno','$edpono')";
	$result11=mysql_query($query11);
        if($edrowcnt >0) {
	for ($i=0;$i<$edrowcnt;$i++)
	{

	$sno = $i + 1;

	$itemcode = $edgriddet[$i]['itemcode'];
	$lotno = $edgriddet[$i]['lotno'];
	$billqty = $edgriddet[$i]['billqty'];
	$millqty = $edgriddet[$i]['millqty'];
	$itemrate=$edgriddet[$i]['itemrate'];
	$tareqty = $edgriddet[$i]['tarqty'];
	$moisper = $edgriddet[$i]['moisper'];
	$moisqty= $edgriddet[$i]['moisqty'];
	$lifelessqty=$edgriddet[$i]['llqty'];
	$rejqty=$edgriddet[$i]['rejqty'];

	$totdedqty=$edgriddet[$i]['totded'];
	$degradeqty=$edgriddet[$i]['degrqty'];
	$grnqty=$edgriddet[$i]['grnqty'];
	$grnbags=$edgriddet[$i]['bags'];
	$rateded=$edgriddet[$i]['rateded'];
	$partyitem=$edgriddet[$i]['partyitem'];

	$frvalue=$edgriddet[$i]['frvalue'];
	$itemvalue=$edgriddet[$i]['itemvalue'];
	$costrate=$edgriddet[$i]['costrate'];
	$costvalue=$edgriddet[$i]['costvalue'];
	$recsts=$edgriddet[$i]['recsts'];
	$remarks=$edgriddet[$i]['remarks'];
	$lotcode=$edgriddet[$i]['lotcode'];
	$pregrnqty =$edgriddet[$i]['pregrnqty'];

	//$query12= "call sprm_editupd_stockdetails ('$compcode','$lotcode','$itemcode','$pregrnqty','$pregrnqty','$grnbags')";
	//$result12=mysql_query($query12);
	}
        }
        if ($eddegrcnt > 0)
        {
	for ($j=0;$j<$eddegrcnt;$j++)
	{
	$sno = $sno + 1;
	$degritemcode = $edgriddegr[$j]['degritemcode'];
	$degritemname = $edgriddegr[$j]['degritemname'];
	$drdegrqty = $edgriddegr[$j]['drdegrqty'];
	$degrtoitemcode = $edgriddegr[$j]['degrtoitemcode'];
	$degrtoitemname=$edgriddegr[$j]['degrtoitemname'];
	$degrgrnqty = $edgriddegr[$j]['degrgrnqty'];
	$degritemrate = $edgriddegr[$j]['degritemrate'];
	$degritemvalue= $edgriddegr[$j]['degritemvalue'];
	$degrlotno=$edgriddegr[$j]['degrlotno'];
	$degrremarks=$edgriddegr[$j]['remarks'];
	$degrlotcode = $edgriddegr[$j]['degrlotcode'];
	$degrbags = $edgriddegr[$j]['degrbags'];

	// $query13= "call sprm_editupd_stockdetails ('$compcode','$degrlotcode','$degrtoitemcode','$degrgrnqty','$degrgrnqty','$degrbags')";
	//$result13=mysql_query($query13);
	}
        }
	 $query14= "call sprm_upd_receipt_header ('$edgrnno','$grndate','$wtcardno','$areacode','$frtype','$fradvance','$itemval','$tcsper','$tcsamt','$sgstper','$sgstamt','$cgstper','$cgstamt','$igstper','$igstamt','0','$servchrg','$freight','$roundoff','$totamt','$billno',
	'$billdate','$billval','$frparty','$frvouno','$usrcode','$entrydate','0','$gateentryno',
	'$gatedate')";
	$result14=mysql_query($query14);

}

	for ($i=0;$i<$rowcnt;$i++)
	{
	 /*                           	slno:RowCnt,
					itemcode:cmbitem.getValue(),
		                    	itemname:cmbitem.getRawValue(),
				    	ordqty:txtpendqty.getRawValue(),
				    	billqty:txtbillqty.getRawValue(),
					millqty:txtmillqty.getRawValue(),
					moisper:txtmoisper.getRawValue(),
					moisqty:txtmoisqty.getRawValue(),
					tarqty:txttareqty.getRawValue(),
					llqty:txtlifelessqty.getRawValue(),
					rejqty:txtrejqty.getRawValue(),
					degrqty:txtdegradeqty.getRawValue(),
					totded:txtdedqty.getRawValue(),
					grnqty:txtgrnqty.getRawValue(),
					itemrate:txtrate.getRawValue(),
					rateded:txtrateded.getRawValue(),
					itemvalue:txtitemval.getRawValue(),
					lotno:cmblot.getRawValue(),
					remarks:txtRemarks.getValue(),
					lotcode: cmblot.getValue(),
					bags:txtnoofbags.getRawValue(),
					pregrnqty:txtgrnqty.getRawValue()*/
	$sno = $i + 1;
	//$po_serialno = $griddet[$i]['slno'];
	$itemcode = $griddet[$i]['itemcode'];
	$lotno = $griddet[$i]['lotno'];
	$billqty = $griddet[$i]['billqty'];
	$millqty = $griddet[$i]['millqty'];
	$itemrate=$griddet[$i]['itemrate'];
	$tareqty = $griddet[$i]['tarqty'];
	$moisper = $griddet[$i]['moisper'];
	$moisqty= $griddet[$i]['moisqty'];
	$lifelessqty=$griddet[$i]['llqty'];
	$rejqty=$griddet[$i]['rejqty'];

	$totdedqty=$griddet[$i]['totded'];
	$degradeqty=$griddet[$i]['degrqty'];
	$grnqty=$griddet[$i]['grnqty'];
	$grnbags=$griddet[$i]['bags'];
	$rateded=$griddet[$i]['rateded'];
	$partyitem=$griddet[$i]['partyitem'];

	$frvalue=$griddet[$i]['frvalue'];
	$itemvalue=$griddet[$i]['itemvalue'];
	$costrate=$griddet[$i]['costrate'];
	$costvalue=$griddet[$i]['costval'];
	$recsts=$griddet[$i]['recsts'];
	$remarks=$griddet[$i]['remarks'];
	$lotcode=$griddet[$i]['lotcode'];

	/*rect_hdseqno, rect_seqno, rect_item_code, rect_lotno, rect_billqty, rect_millqty, rect_itemrate, rect_tareqty, rect_moisper, rect_moisqty, rect_lifelessqty, rect_rejqty, rect_totdedqty, rect_degqty, rect_grnqty, rect_grnbags, rect_rateded, rect_partyitemcode, rect_edper, rect_edamount, rect_censtatus, rect_freightvalue, rect_itemvalue, rect_costrate, rect_costvalue, rect_status, rect_remarks, rect_educessper, rect_educessamount, cancelflag*/
	     
	 $query4= "insert into trnrm_receipt_trailer values('$rech_seqno','$sno','$itemcode','$lotcode','$billqty','$millqty','$itemrate','$tareqty','$moisper','$moisqty','$lifelessqty','$rejqty',
	'$totdedqty','$degradeqty','$grnqty','$grnbags','$rateded','$itemcode','0','0','','','$itemvalue','$costrate',
'$costvalue','',upper('$remarks'),'0','0','0')";
	 $result4=mysql_query($query4);

	 $query5= "call sprm_insupd_stockdetails ('$compcode','$lotcode','$itemcode','$grnqty','$grnqty','$grnbags')";
	$result5=mysql_query($query5);

	 $query6= "call sprm_upd_itemtrailer_avgrate ('$compcode','$finid','$itemcode','$grnqty','$grnbags','$costrate',1)";
	$result6=mysql_query($query6);

	 $query7= "call sprm_upd_orderreceiptdets ('$pononew','$itemcode',('$degradeqty'+'$grnqty'),0)";
	$result7=mysql_query($query7);

	}    




	for ($i=0;$i<$frecnt;$i++)
	{

	$sno = $i + 1;
	$frvalue=$gridfre[$i]['frvalue'];
	 $query15= "Update trnrm_receipt_trailer Set rect_freightvalue='$frvalue' Where rect_hdseqno='$rech_seqno' AND rect_seqno='$sno'"; $result15=mysql_query($query15);
	}
	if ($degrcnt > 0)
	{

		for ($j=0;$j<$degrcnt;$j++)
		{
		$sno = $sno + 1;
		$degritemcode = $griddegr[$j]['degritemcode'];
		$degritemname = $griddegr[$j]['degritemname'];
		$drdegrqty = $griddegr[$j]['drdegrqty'];
		$degrtoitemcode = $griddegr[$j]['degrtoitemcode'];
		$degrtoitemname=$griddegr[$j]['degrtoitemname'];
		$degrgrnqty = $griddegr[$j]['degrgrnqty'];
		$degritemrate = $griddegr[$j]['degritemrate'];
		$degritemvalue= $griddegr[$j]['degritemvalue'];
		$degrlotno=$griddegr[$j]['degrlotno'];
		$degrremarks=$griddegr[$j]['remarks'];
		$degrlotcode = $griddegr[$j]['degrlotcode'];
		$degrbags = $griddegr[$j]['degrbags'];
		$costrate=$griddegr[$j]['costrate'];
		$costvalue=$griddegr[$j]['costval'];


		$query8 ="insert into trnrm_receipt_trailer values('$rech_seqno','$sno','$degrtoitemcode','$degrlotcode','0','0','$degritemrate','0','0','0','0','0','0','0','$drdegrqty',
'$degrbags','0','$degritemcode','0','0','N','0','$degritemvalue','$degritemrate','$degritemvalue','','$degrremarks','0','0','0')";
		 $result8=mysql_query($query8);

	 $query9= "call sprm_insupd_stockdetails ('$compcode','$lotcode','$degrtoitemcode','$degrgrnqty','$degrgrnqty','$degrbags')";
	$result9=mysql_query($query9);

	 $query10= "call sprm_upd_itemtrailer_avgrate ('$compcode','$finid','$degrtoitemcode','$degrgrnqty','$degrbags','$costrate',1)";
	$result10=mysql_query($query10);


		}
	}


//}        


if ($gstFlaggrn === "Confirm"){

			 mysql_query("BEGIN");
			 //if ($chkdel == 0) {
			$accqry3 = " delete from trnrm_receipt_handling where rech_compcode = '$compcode' and rech_fincode = '$finid' and rech_lotno = '$chklotno'   and rech_grnno = '$chkgrn' ";
			//}
			$accupd3 = mysql_query($accqry3);
			
			
			$accqry4 = "insert into trnrm_receipt_handling values ('$compcode','$finid','$chklotno','$chkgrn' ,'$receiptdt','P','$supledcode','$purvalue','N','','','$receiptdt',
			'','0','0','0','0','$tcsamth','$billnoh','$billdt','$billvalueh','$PQTY','$lorrynot','$GQTY','N','','$receiptdt','0')";
				
				$accupd4 = mysql_query($accqry4);
			
}	
  

if ($gstFlaggrn === "Add") {    
	if($result3 && $result4 && $result5 && $result6 && $result7 && $result15  )
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
	if( $result11 && $result14 &&  $result4 && $result5 &&$result6 && $result7  && $result15     )
	{
		mysql_query("COMMIT");                        
		echo '({"success":"true","GRNNo":"'. $chkgrn . '"})';

		    
	}
	else
	{
	    mysql_query("ROLLBACK");            
	    echo '({"success":"false","GRNNo":"' . $chkgrn . '"})';
	} 
} 
if ($gstFlaggrn === "Confirm") {   
	if( $accupd4  )
	{
		$cfmacc = mysql_query("Update trnrm_receipt_header Set rech_acctflag='Y' Where rech_fincode = '$finid' and rech_compcode='$compcode' and rech_seqno = '$edgrnno' ");
		if ($cfmacc) {
		mysql_query("COMMIT");                        
		echo '({"success":"true","GRNNo":"'. $chkgrn . '"})';
		}
		
		else
		{
	    		mysql_query("ROLLBACK");            
	    		echo '({"success":"false","GRNNo":"' . $chkgrn . '"})';
		} 

		    
	}
	else
	{
	    mysql_query("ROLLBACK");            
	    echo '({"success":"false","GRNNo":"' . $chkgrn . '"})';
	} 
} 

       
 
?>
