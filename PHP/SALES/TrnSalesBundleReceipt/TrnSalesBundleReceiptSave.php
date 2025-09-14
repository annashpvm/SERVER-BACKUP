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

$truck=   strtoupper(trim($_POST['truck']));
mysql_query("BEGIN");


if ($savetype === "Add") {

   $query1 = "select IFNULL(max(br_no),0)+1 as receiptno from trnsal_bundle_receipt where br_fincode = $finid and br_comp_code='$compcode'";
   $result1= mysql_query($query1);

   $rec2 = mysql_fetch_array($result1);
   $receiptno=$rec2['receiptno'];


  }


else if ($savetype === "Edit")
  {

//	$query5= "update trnsal_bundle_receipt a, trn_delivery_challan_sizewise b set dcs_receipt = dcs_receipt - br_bundwt where br_comp_code = $compcode  and br_fincode = $finid and dcs_seqno = br_dcno and br_originalsize =  dcs_size  and br_dcno = $seqno  and  br_upd = 'N'";

	$query5= "update  trn_delivery_challan_sizewise b ,(select br_dcno, br_originalsize , sum(br_bundwt) dcwt from  trnsal_bundle_receipt where br_comp_code = $compcode and br_fincode = $finid and  br_dcno =  $seqno and br_upd = 'N'  group by br_dcno,br_originalsize)  a set dcs_receipt = dcs_receipt - dcwt where dcs_seqno = br_dcno and br_originalsize = dcs_size and dcs_seqno = $seqno ";

	$result5=mysql_query($query5);   



//echo $query5; 
//echo "<br>";

	$query6= "delete from trnsal_bundle_receipt where br_comp_code =  $compcode and br_fincode = $finid and br_dcno  = $seqno and br_upd = 'N'";
	$result6=mysql_query($query6);   

//echo $query6; 
 } 


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



        if ($Update == "N")
        {    
		$reccount = $reccount +1;
		$query2= "insert into trnsal_bundle_receipt values ('$compcode','$finid','$receiptno','$receiptdate','$cutter','$DcNo ','$DcDate','$party','$sono','$sodt','$ReelSize',
	'$Size','$Sheets','$Reams','$BundleNo','$Weight','N')";
		$result2=mysql_query($query2);   

//echo $query2;
//echo "<br>";

		$query3= "update trn_delivery_challan_sizewise set dcs_receipt =  dcs_receipt + $Weight  where dcs_seqno = $DcNo and dcs_size ='$ReelSize'";
		$result3=mysql_query($query3);        
        } 
//echo $query3;
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
	if ( $result5 && $result6) 
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
	if ($result2 && $result3  &&   $result5 && $result6) 
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
