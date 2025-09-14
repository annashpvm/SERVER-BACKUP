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

$seqno   = $_POST['seqno'];

$dcno   = $_POST['dcno'];
$dcdate = $_POST['dcdate'];
$ordno = $_POST['ordno'];
$orddate = $_POST['orddate'];
$sono = $_POST['sono'];
$sodt = $_POST['sodt'];
$cutter = $_POST['cutter'];
$party = $_POST['party'];



mysql_query("BEGIN");



$reccount =0;
for($i=0;$i<$rowcnt;$i++)
{
	$dcsizecode = $griddet[$i]['dcsizecode'];
	$mainreelno  = $griddet[$i]['mainreelno'];
	$sono       = $griddet[$i]['sono'];
	$sizecode   = $griddet[$i]['sizecode'];
	$newreelno  = $griddet[$i]['newreelno'];
	$Weight      = (float) $griddet[$i]['newwt'];

	$Update   = $griddet[$i]['Update'];

if ($Update != 'Y')
{ 
$query2= "insert into trnsal_finish_stock 
 (stk_comp_code,stk_finyear,stk_ent_no,stk_ent_date,stk_var_code,stk_sr_no, stk_wt,stk_sono,stk_yymm, stk_rollno,stk_source) VALUES ('$compcode','$finid','1000','$receiptdate','$sizecode','$newreelno','$Weight',$sono,0,0,'C')";
	$result2=mysql_query($query2);   

//echo $query2;

	$query3= "update trn_delivery_challan_reel_receipt set dccr_upd = 'Y'  where dcrr_comp_code = $compcode and dcrr_fincode ='$finid' and dcrr_no ='$receiptno'and dccr_newreelno ='$newreelno' ";
	$result3=mysql_query($query3);        

//echo $query3;
}
}




if ($savetype === "Add") {

	if ($result2 && $result3 ) 
	{ 
	   mysql_query("COMMIT");
	    echo '({"success":"true","dcno":"' . $receiptno . '"})';
	} 
		
	else {
	   mysql_query("ROLLBACK");
	    echo '({"success":"false","dcno":"' . $receiptno . '"})';
	}
 
 }
else
{

     if ($reccount == 0)
     { 
	if ( $result2 && $result3) 
	{ 
	   mysql_query("COMMIT");
	    echo '({"success":"true","dcno":"' . $receiptno . '"})';
	} 
		
	else {
	   mysql_query("ROLLBACK");
	    echo '({"success":"false","dcno":"' . $receiptno . '"})';
	}
      }
      else
       { 
	if ($result2 && $result3  && $result4  &&  $result5 && $result6 && $result7) 
	{ 
	   mysql_query("COMMIT");
	    echo '({"success":"true","dcno":"' . $receiptno . '"})';
	} 
		
	else {
	   mysql_query("ROLLBACK");
	    echo '({"success":"false","dcno":"' . $receiptno . '"})';
	}
      } 
 
 }


  
?>
