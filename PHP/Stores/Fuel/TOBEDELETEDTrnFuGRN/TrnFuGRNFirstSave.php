<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_REQUEST['cnt'];

$gstFlaggrn = $_REQUEST['gstFlaggrn'];
$compcode = $_REQUEST['compcode'];
$finid = $_REQUEST['finid'];
$rech_no = $_REQUEST['grnno'];
$grndate = $_REQUEST['grndate'];
$rech_seqno= $_REQUEST['seqno'];
$ticketno = $_REQUEST['ticketno'];
$ticketdate = $_REQUEST['ticketdate'];
$lorryno = $_POST['lorryno'];
$areacode = $_REQUEST['areacode'];
$geno = (int)$_POST['geno'];
$gedate =$_POST['gedate'];
$supcode = $_REQUEST['supcode'];
$ordseqno = $_REQUEST['ordseqno'];
$billno= $_REQUEST['billno'];
$billqty = (float) $_POST['billqty'];
$billdate= $_REQUEST['billdate'];
$billvalue= $_REQUEST['billvalue'];
$lotcode = (int)$_POST['lotcode'];

$itemcode = (int)$_POST['itemcode'];
$purcode = (int)$_POST['purcode'];
$millqty= (float)$_REQUEST['millqty'];

$grnamount = $_REQUEST['totamt'];

$grnvalue = $_REQUEST['grnvalue'];
$grnqty= (float)$_REQUEST['grnqty'];
$usrcode= (int) $_REQUEST['usrcode'];
$entrydate= date("Y-m-d H:i:s"); 


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
$tcsamt = (float)$_REQUEST['tcsamt'];

$othrchrg= (float)$_REQUEST['othrchrg'];
$freight= (float)$_REQUEST['freight'];
$roundoff= (float)$_REQUEST['roundoff'];
$roundoffNeed = $_REQUEST['roundoffNeed'];

$payterms= (int)$_REQUEST['payterms'];

 mysql_query("BEGIN");

$sno = 1;
if ($gstFlaggrn === "Add") {

	 $query1 = "select IFNULL(max(rech_seqno),0)+1 as rech_seqno from trnfu_receipt_header";
	 $result1 = mysql_query($query1);
	 $rec1 = mysql_fetch_array($result1);
	 $rech_seqno=$rec1['rech_seqno'];


	 $query2 = "select count(*) as nos from trnfu_receipt_header where rech_fincode = '$finid' and rech_compcode='$compcode' and rech_no = '$rech_no'";
	 $result2= mysql_query($query2);
	 $rec2 = mysql_fetch_array($result2);
	 $nos=$rec2['nos'];


	 mysql_query("BEGIN");

	$query2  ="call spfu_ins_receipt_header ('$rech_seqno','$compcode','$finid','$rech_no','$grndate','$supcode',
	'$ordseqno','$payterms','$areacode','$grnvalue','$billno','$billdate','$billvalue','$geno','$gedate','$ticketno',
	'$ticketdate','$lorryno','$usrcode','$entrydate',$purcode)";

	$query2  ="call spfu_ins_receipt_header ('$rech_seqno', '$compcode', '$finid', '$rech_no', '$grndate','$supcode',   '$ordseqno','$payterms','$areacode','$grnvalue','$cgstper','$cgstamt','$sgstper', '$sgstamt','$igstper', '$igstamt','$handlingmt','$handlingcgst','$handlingsgst', '$handlingcgstamt', '$handlingsgstamt', '$tcsper', '$tcsamt', '$cessmt','$cessamt','$freight','$othrchrg', '$roundoff', '$grnamount','$billno','$billdate','$billvalue','$geno','$gedate', '$ticketno', '$ticketdate', '$lorryno','$usrcode', '$entrydate',$purcode, '$roundoffNeed' )";


//echo $query2;
//echo "<br>";

	 $result2=mysql_query($query2);

	$query3= "update trn_weight_card set wt_grn_process = 'Y' where wc_compcode = '$compcode' and wc_fincode = '$finid' and  wc_date = '$ticketdate' and wc_ticketno = $ticketno";

//echo $query3;
//echo "<br>";

	 $result3=mysql_query($query3);


}
else if ($gstFlaggrn === "Edit") {


	  $query2= "call spfu_upd_receipt_header_first ('$rech_seqno','$grndate','$payterms','$areacode','$grnvalue',$purcode,'$cgstper','$cgstamt','$sgstper', '$sgstamt','$igstper','$igstamt','$handlingmt','$handlingcgst', '$handlingsgst', '$handlingcgstamt', '$handlingsgstamt', '$tcsper', '$tcsamt', '$cessmt','$cessamt','$freight','$othrchrg', '$roundoff', '$grnamount', '$billno','$billdate','$billvalue','$geno','$gedate', '$usrcode','$roundoffNeed')";
//echo $query2;
//echo "<br>";
		$result2=mysql_query($query2);

	$sno = 1;

	$query3 = "update trnfu_receipt_trailer, masfu_item_trailer set itmt_clqty = itmt_clqty -  rect_grnqty ,itmt_clvalue = itmt_clvalue - rect_itemvalue  where itmt_compcode= '$compcode' and itmt_fincode = '$finid' and  rect_item_code = itmt_hdcode and rect_hdseqno = $rech_seqno;";
        $result3=mysql_query($query3);

//echo $query3;
//echo "<br>";

	$query4 = "update trnfu_receipt_trailer, masfu_item_trailer set itmt_avgrate = case when itmt_clvalue > 0 and itmt_clqty > 0 then itmt_clvalue / itmt_clqty else 0 end  where itmt_compcode= '$compcode' and itmt_fincode = '$finid' and  rect_item_code = itmt_hdcode and rect_hdseqno = $rech_seqno;";
        $result4=mysql_query($query4);


	$query5 = "delete from trnfu_receipt_trailer where rect_hdseqno= $rech_seqno;";
        $result3=mysql_query($query5);

//echo $query3;
//echo "<br>";

}



for ($i=0;$i<$rowcnt;$i++)
{


	$sno = $i + 1;
	$itemcode    = $griddet[$i]['itemcode'];
	$itemname    = $griddet[$i]['itemname'];
	$millqty     = (float)$griddet[$i]['millqty'];
	$grnqty       = (float)$griddet[$i]['grnqty'];
	$itemrate     = (float)$griddet[$i]['itemrate'];
	$itemvalue    = (float)$griddet[$i]['itemvalue'];

	$costrate    = (float)$griddet[$i]['itemvalue'];

	$query3= "call spfu_ins_receipt_trailer('$rech_seqno','$sno','$itemcode','$billqty','$millqty',
	'$itemrate','$grnqty','$itemvalue')";
//echo $query3;
//echo "<br>";
	 $result3=mysql_query($query3);
	     

	 $query4= "call spfu_upd_itemtrailer_avgrate ('$compcode','$finid','$itemcode','$grnqty','$costrate',1)";
     	$result4=mysql_query($query4);
//echo $query4;
//echo "<br>";

}   


  






  

if ($gstFlaggrn === "Add") {    
	if($result2 && $result3 && $nos == 0 )
	{
			mysql_query("COMMIT");                        
			echo '({"success":"true","GRNNo":"' . $rech_no . '"})';

		    
	}
	else
	{
            if ($cnt == 1)
                $rech_no = 0;
	    mysql_query("ROLLBACK");            
	    echo '({"success":"false","GRNNo":"' . $rech_no . '"})';
	}   
}
if ($gstFlaggrn === "Edit") {   
	if( $result2 && $result3 )
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
