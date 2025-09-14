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

$cutter = $_POST['cutter'];
$party = $_POST['party'];

$originalsize= $_POST['originalsize'];
$finishedsize= $_POST['finishedsize'];


mysql_query("BEGIN");



$reccount =0;
for($i=0;$i<$rowcnt;$i++)
{
	$Size     = $griddet[$i]['Size'];
	$Sheets   = $griddet[$i]['Sheets'];
	$Reams    = $griddet[$i]['Reams'];
	$BundleNo = $griddet[$i]['BundleNo'];
	$Weight   = $griddet[$i]['Weight'];
	$Update   = $griddet[$i]['Update'];

if ($Update != 'Y')
{ 
$query2= "insert into trnsal_finish_stock 
 (stk_comp_code,stk_finyear,stk_ent_no,stk_ent_date,stk_var_code,stk_sr_no,stk_wt,stk_sono , stk_yymm, stk_rollno,stk_source) VALUES ('$compcode','$finid','1000','$receiptdate','$Size','$BundleNo','$Weight',$sono,0,0,'C')";
	$result2=mysql_query($query2);   

//echo $query2;

	$query3= "update trnsal_bundle_receipt set br_upd = 'Y'  where br_comp_code = $compcode and br_fincode ='$finid' and br_no ='$receiptno'and br_sr_no ='$BundleNo' ";
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
