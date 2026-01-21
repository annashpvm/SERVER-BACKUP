<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$savetype = $_POST['savetype'];   
$griddet = json_decode($_POST['griddet'],true);            
$rowcnt = $_POST['cnt'];

$compcode = $_POST['compcode'];
$finid = $_POST['fincode'];
$receiptno = $_POST['receiptno'];
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

$truck=   strtoupper(trim($_POST['truck']));

mysqli_begin_transaction($conn);


$query1 = "update trnsal_bundle_receipt , trnsal_finish_stock set br_upd = 'N' where br_sr_no = stk_sr_no and br_comp_code = stk_comp_code and br_fincode = stk_finyear and br_comp_code = $compcode  and br_fincode = $finid  and br_no = $receiptno  and stk_destag = ''";


//echo $query1;
//echo "<br>";

$result1 = mysqli_query($conn, $query1);

$reccount =0;




for($i=0;$i<$rowcnt;$i++)
{
	$ReelSize = $griddet[$i]['ReelSize'];
	$Size     = $griddet[$i]['Size'];
	$Sheets   = $griddet[$i]['Sheets'];
	$Reams    = $griddet[$i]['Reams'];
	$BundleNo = $griddet[$i]['BundleNo'];
	$Weight   = $griddet[$i]['Weight'];
	$Update   = $griddet[$i]['Update'];
	$DcNo     = $griddet[$i]['DcNo'];
	$DcDate   = $griddet[$i]['DcDate'];

 	$query2= "delete from trnsal_finish_stock where stk_source = 'C'  and stk_destag = '' and stk_comp_code = $compcode   and stk_finyear = $finid   and stk_sr_no = $BundleNo";

//	 echo $query2;
//	 echo "<br>";
	 $result2 = mysqli_query($conn, $query2);
	} 



	if ($result1 && $result2 ) 
	{ 
		mysqli_commit($conn);
	    echo '({"success":"true","dcno":"' . $receiptno . '"})';
	} 
		
	else {
	    mysqli_rollback($conn);
	    echo '({"success":"false","dcno":"' . $receiptno . '"})';
	}
 

  
?>
