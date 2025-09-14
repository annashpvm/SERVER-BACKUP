<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$savetype = $_POST['savetype'];   
$griddet = json_decode($_POST['griddet'],true);            
$rowcnt = $_POST['cnt'];

$compcode = $_POST['compcode'];
$finid = $_POST['fincode'];


$receiptno= $_POST['receiptno'];
$receiptdate = $_POST['receiptdate'];

$cutter = $_POST['cutter'];

$seqno   = $_POST['seqno'];

$dcno   = $_POST['dcno'];
$dcdate = $_POST['dcdate'];


mysql_query("BEGIN");


if ($savetype === "Add") {

   $query1 = "select IFNULL(max(dcrr_no),0)+1 as receiptno from trn_delivery_challan_reel_receipt where dcrr_fincode = $finid and dcrr_comp_code='$compcode'";
   $result1= mysql_query($query1);

   $rec2 = mysql_fetch_array($result1);
   $receiptno=$rec2['receiptno'];


  }


else if ($savetype === "Edit")
  {



	$query1= "update trn_delivery_challan_reellist ,  trn_delivery_challan_reel_receipt set dc_process = 'N' where  dcrr_seqno = dc_seqno  and dccr_mainreelno = dc_sr_no and  dcrr_comp_code = '$compcode' and dcrr_fincode = '$finid'  and dcrr_no = $receiptno and dccr_upd = 'N'";
	$result11=mysql_query($query1);  

//echo $query1; 
//echo "<br>";
	$query2= "delete from trn_delivery_challan_reel_receipt where dcrr_comp_code = '$compcode' and dcrr_fincode = '$finid' and dcrr_no = $receiptno and dccr_upd = 'N'";
	$result12=mysql_query($query2);  

//echo $query2; 
//echo "<br>";
 } 


$reccount =0;




for($i=0;$i<$rowcnt;$i++)
{
	$dcsizecode = $griddet[$i]['dcsizecode'];
	$mainreelno  = $griddet[$i]['mainreelno'];
	$sono       = $griddet[$i]['sono'];
	$sizecode   = $griddet[$i]['sizecode'];
	$newreelno  = $griddet[$i]['newreelno'];
	$newwt      = (float) $griddet[$i]['newwt'];
	$Update     = $griddet[$i]['update'];


        if ($Update == "N")
        {    
		$reccount = $reccount +1;
		$query2= "insert into trn_delivery_challan_reel_receipt values ('$compcode','$finid','$receiptno', '$receiptdate' ,'$cutter', '$seqno ','$dcno','$dcdate', '$dcsizecode','$mainreelno','$sono','$sizecode',
	'$newreelno','$newwt','N')";
		$result2=mysql_query($query2);  


		$query3= "update trn_delivery_challan_sizewise set dcs_receipt =  dcs_receipt + $newwt  where dcs_seqno = $seqno and dcs_size ='$dcsizecode'";
		$result3=mysql_query($query3);  

 		$query4= "update trn_delivery_challan_reellist set dc_process = 'Y' where dc_seqno = $seqno and dc_sr_no ='$mainreelno'";
		$result4=mysql_query($query4);  

//	echo $query2;
//echo "<br>";
      
        } 
//echo $query3;
}



if ($savetype === "Add") {

	if ($result2 && $result3 && $result4 ) 
	{ 
	   mysql_query("COMMIT");
	    echo '({"success":"true","receiptno":"' . $receiptno . '"})';
	} 
		
	else {
	   mysql_query("ROLLBACK");
	    echo '({"success":"false","receiptno":"' . $receiptno . '"})';
	}
 }
 else
{
       if ($rowcnt == 0)
       {     

	if ( $result11 && $result12) 
	{ 
	   mysql_query("COMMIT");
	    echo '({"success":"true","receiptno":"' . $receiptno . '"})';
	} 
		
	else {
	   mysql_query("ROLLBACK");
	    echo '({"success":"false","receiptno":"' . $receiptno . '"})';
	}
       }
       {     

	if ($result2 && $result3 && $result4 && $result11 && $result12) 
	{ 
	   mysql_query("COMMIT");
	    echo '({"success":"true","receiptno":"' . $receiptno . '"})';
	} 
		
	else {
	   mysql_query("ROLLBACK");
	    echo '({"success":"false","receiptno":"' . $receiptno . '"})';
	}
       }
  
 }
  
?>
