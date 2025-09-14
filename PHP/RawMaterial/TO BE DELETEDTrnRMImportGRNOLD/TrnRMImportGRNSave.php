<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_REQUEST['cnt'];

$griddegr = json_decode($_REQUEST['griddegr'],true);
$degrcnt = $_REQUEST['degrcnt'];

$edgriddet = json_decode($_REQUEST['edgriddet'],true);
$edrowcnt = $_REQUEST['edcnt'];

$edgriddegr = json_decode($_REQUEST['edgriddegr'],true);
$eddegrcnt = $_REQUEST['eddegrcnt'];

$compcode = $_REQUEST['compcode'];
$finid = $_REQUEST['finid'];
$gstFlaggrn = $_REQUEST['gstFlaggrn'];
$rech_no = $_REQUEST['edgrnno'];

$edpono = $_REQUEST['edpono'];

$poseqno = $_REQUEST['poseqno'];

$supcode = $_REQUEST['supcode'];
$ordseqno = $_REQUEST['ordseqno'];

$invseqno = $_REQUEST['invseqno'];
$agent = $_REQUEST['agent'];

$grndate = $_REQUEST['grndate'];
$wtcardno = $_REQUEST['wtcardno'];
$areacode = $_REQUEST['areacode'];
$truck    = $_REQUEST['truck'];
$truck    = $_REQUEST['truck'];
$frtype = $_REQUEST['freighttype'];
$itemval = (float) $_REQUEST['itemval'];
$sgstper = (float) $_REQUEST['sgstper'];
$sgstamt = (float) $_REQUEST['sgstamt'];
$cgstper = (float) $_REQUEST['cgstper'];
$cgstamt = (float) $_REQUEST['cgstamt'];
$igstper = (float) $_REQUEST['igstper'];
$igstamt = (float) $_REQUEST['igstamt'];
$tcsper =  (float) $_REQUEST['tcsper'];
$tcsamt=  (float) $_REQUEST['tcsamt'];
$servchrg= (float) $_REQUEST['servchrg'];
$freight= (float)$_REQUEST['freight'];
$otheramt= (float)$_REQUEST['otheramt'];

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
$purvalue = (float) $_POST['purvalue'];
$PQTY = $_POST['PQTY'];
$GQTY = $_POST['GQTY'];
$chkdel = $_POST['chkdel'];

$rech_seqno=  $_POST['grnseqno'];

$rech_seqnonew;



$custduty  =0;
$clearing  =0;


/*
if($gstFlaggrn === "Add"){
$poseqno=$ordseqno;
}
else 
{ 
$poseqno=$edpono;
$rech_seqno=$edgrnno;


	 $queryjk = "select rech_no from trnirm_receipt_header where rech_fincode = '$finid' and rech_compcode='$compcode' and rech_seqno = '$edgrnno' ";
	 $resultjk= mysql_query($queryjk);
	 $recjk = mysql_fetch_array($resultjk);
	 $chkgrn=$recjk['rech_no'];
 }
*/



if ($gstFlaggrn === "Add") {

	 $query1 = "select IFNULL(max(rech_seqno),0)+1 as rech_seqno from trnirm_receipt_header";
	 $result1 = mysql_query($query1);
	 $rec1 = mysql_fetch_array($result1);
	 $rech_seqno=$rec1['rech_seqno'];
/*
	 $query2 = "select IFNULL(max(rech_no),0)+1 as rech_no from trnirm_receipt_header where rech_fincode = '$finid' and rech_compcode='$compcode'";
	 $result2= mysql_query($query2);
	 $rec2 = mysql_fetch_array($result2);
	 $rech_no=$rec2['rech_no'];
*/
	 mysql_query("BEGIN");
 
	 $query3= "call spirm_ins_receipt_header('$rech_seqno','$compcode','$finid','$rech_no','$supcode','$ordseqno', '$invseqno','$agent','$grndate','$wtcardno','$areacode','$truck','$itemval', '$freight','$roundoff', '$totamt', '$billno',  '$billdate','$billval','$custduty','$clearing','$usrcode','$entrydate','$cgstamt','$sgstamt','$igstamt','$gateentryno','$gatedate')";


//echo $query3;

	 $result3=mysql_query($query3);
}
else
{

      $query12= "call spirm_del_port_qty ('$compcode','$finid','$rech_seqno','$poseqno' ,'$invseqno' )";
      $result12=mysql_query($query12);

      $query12= "call spirm_del_receipt_qty ('$compcode','$finid','$rech_seqno','$poseqno' ,'$invseqno' )";
      $result12=mysql_query($query12);
//echo $query12;
      $query11= "call spirm_del_receipt_trailer ('$compcode','$finid','$rech_seqno','$poseqno')";
      $result11=mysql_query($query11);

//echo $query11;

	 $query14= "call spirm_upd_receipt_header('$rech_seqno','$grndate','$wtcardno','$areacode','$truck','$frtype','$itemval','$sgstper','$sgstamt', '$cgstper','$cgstamt','$igstper','$igstamt','$tcsper','$tcsamt','$freight','$otheramt','$roundoff','$totamt','$billno',	'$billdate', '$billval','$gateentryno','$gatedate')";
	$result14=mysql_query($query14);
//echo $query14;

}



	for ($i=0;$i<$rowcnt;$i++)
	{
	 				
	$sno = $i + 1;
	//$po_serialno = $griddet[$i]['slno'];
	$itemcode = $griddet[$i]['itemcode'];
	$lotno = $griddet[$i]['lotno'];
	$billqty = (float)$griddet[$i]['portqty'];
	$millqty = (float)$griddet[$i]['millqty'];
	$itemrate= (float)$griddet[$i]['itemrate'];
	$exrate  = (float)$griddet[$i]['exrate'];
	$tareqty = (float)$griddet[$i]['tarqty'];
	$moisper = (float)$griddet[$i]['moisper'];
	$moisqty= (float)$griddet[$i]['moisqty'];
	$outper = (float)$griddet[$i]['outper'];
	$outqty= (float)$griddet[$i]['outqty'];
	$lifelessqty=(float)$griddet[$i]['llqty'];
	$rejqty=(float)$griddet[$i]['rejqty'];

	$totdedqty=(float)$griddet[$i]['totded'];
	$degradeqty=(float)$griddet[$i]['degrqty'];
	$grnqty=(float)$griddet[$i]['grnqty'];
//	$partyitem=$griddet[$i]['partyitem'];

//	$frvalue=(float)$griddet[$i]['frvalue'];
	$itemvalue=$griddet[$i]['itemvalue'];
	$costrate= (float)$griddet[$i]['costrate'];
	$costvalue=(float)$griddet[$i]['costval'];
//	$recsts=$griddet[$i]['recsts'];
	$remarks=$griddet[$i]['remarks'];
	$lotcode=$griddet[$i]['lotcode'];

	 $query4= "insert into trnirm_receipt_trailer values('$rech_seqno','$sno','$itemcode','$lotcode','$billqty','$millqty','$itemrate','$exrate','$tareqty',
'$moisper','$moisqty',  '$outper' , '$outqty' , '$lifelessqty','$rejqty','$totdedqty','$degradeqty','$grnqty', '$itemcode','$itemvalue','$costrate','$costvalue','$custduty','$clearing','',upper('$remarks'),0,0,0)";


	 $result4=mysql_query($query4);
// echo $query4;
	 $query5= "call sprm_insupd_stockdetails ('$compcode','$lotcode','$itemcode','$grnqty'	)";
	$result5=mysql_query($query5);
//  echo $query5;
	 $query6= "call sprm_upd_itemtrailer_avgrate ('$compcode','$finid','$itemcode','$grnqty','$costrate',1)";
         $result6=mysql_query($query6);
//  echo $query6;
	 $query7= "call spirm_upd_receipt_qty ('$poseqno','$itemcode',('$degradeqty'+'$grnqty'),'$billqty','$millqty', '$invseqno')";
	$result7=mysql_query($query7);
// echo $query7;
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
		$costrate=$griddegr[$j]['costrate'];
		$costvalue=$griddegr[$j]['costval'];


		$query8 ="insert into trnirm_receipt_trailer values('$rech_seqno','$sno','$degrtoitemcode','$degrlotcode','0','0','$degritemrate','0','0','0','0','0','0','0','$drdegrqty',
'$degritemcode','$degritemvalue','$degritemrate','$degritemvalue','','$degrremarks')";
		 $result8=mysql_query($query8);

	 $query9= "call sprm_insupd_stockdetails ('$compcode','$degrlotcode','$degrtoitemcode','$degrgrnqty')";
	$result9=mysql_query($query9);
 //  echo $query9;
	 $query10= "call sprm_upd_itemtrailer_avgrate ('$compcode','$finid','$degrtoitemcode','$degrgrnqty','$costrate',1)";
	$result10=mysql_query($query10);
  // echo $query10;

		}
	}


if ($gstFlaggrn === "Add") {    
	if($result3 && $result4 && $result5 && $result6 && $result7 )
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
	if( $result11 && $result14 &&  $result4  &&$result6  ) // && $result7     )
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
		$cfmacc = mysql_query("Update trnirm_receipt_header set rech_acctflag='Y' Where rech_fincode = '$finid' and rech_compcode='$compcode' and rech_seqno = '$rech_seqno' ");
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
