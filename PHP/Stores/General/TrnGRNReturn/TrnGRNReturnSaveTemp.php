<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$griddet  = json_decode($_REQUEST['griddet'],true);
$griddetacc  = json_decode($_REQUEST['griddet2'],true);

$savetype = $_POST['savetype'];
$rowcnt   = $_POST['cnt'];
$rowcntacc= $_POST['cnt2'];

$grnflag  = $_POST['grnflag'];

$compcode = $_POST['compcode'];
$fincode  = $_POST['fincode'];
$finid    = $_POST['fincode'];

$rrno     = $_POST['rrno'];
$rrdate   = $_POST['rrdate'];

$grnno    = $_POST['grnno'];
$grndate  = $_POST['grndate'];

$supcode  = $_POST['supcode'];

$billno   = $_POST['billno'];
$billdate = $_POST['billdate'];


$taxable  = $_POST['taxable'];
$roundoff = (float) $_POST['roundoff'];
$retamount=   $_POST['retamount'];

$acctstatus= $_POST['acctstatus'];
$truck     = $_POST['truck'];
$remarks= $_POST['remarks'];
$entdate= $_POST['entdate'];

$vouno  = $_POST['vouno'];
$user   = $_POST['user'];

$finsuffix   = $_POST['finsuffix'];

$ginaccrefseq = $_POST['accseqno'];


$grnaccseqno = $_POST['grnaccseqno'];


$drcrledger = $_POST['purchasegroup'];

$cgst_ledcode = (int) $_POST['cgst_ledcode'];
$sgst_ledcode = (int) $_POST['sgst_ledcode'];
$igst_ledcode = (int) $_POST['igst_ledcode'];

$cgst_amount = (float) $_POST['cgst_amount'];
$sgst_amount = (float) $_POST['sgst_amount'];
$igst_amount = (float) $_POST['igst_amount'];

$cgst_percentage = (float) $_POST['cgst_percentage'];
$sgst_percentage = (float) $_POST['sgst_percentage'];
$igst_percentage = (float) $_POST['igst_percentage'];

$others = 0;

$addnl_amt = (float) $_POST['addnl_amt'];
$addnl_ledcode = (int) $_POST['addnl_ledcode'];



$voutype = 'DNG';

 mysql_query("BEGIN");




if ($savetype == "Add") {


 $query2 = "select ifnull(max(debh_no),0)+1 as retno from trnpur_grn_ret_header where debh_fin_code = $fincode  and debh_comp_code =$compcode";
 $result2= mysql_query($query2);
 $rec2 = mysql_fetch_array($result2);
 $rrno=$rec2['retno'];



 $query1  = "insert into  trnpur_grn_ret_header (
debh_comp_code, debh_fin_code, debh_no, debh_date, debh_supcode, debh_grnno, debh_grdate, debh_billno, debh_billdate, debh_taxable, debh_netamount, debh_roundoff, debh_ent_date,  debh_vouno, debh_remarks, debh_user,debh_accseqno , debh_additional,debh_addnl_ledcode) values(
$compcode, $fincode, $rrno, '$rrdate' , $supcode, '$grnno', '$grndate', '$billno', '$billdate', $taxable , $retamount, '$roundoff', '$entdate', '$vouno', '$remarks' , $user,$ginaccrefseq,$addnl_amt , $addnl_ledcode)";




//echo $query1;
//echo "<br>";
 $result1=mysql_query($query1);


}
else
{

 $query1  = "update trnpur_grn_ret_header set debh_date = '$rrdate' , debh_taxable = $taxable  , debh_netamount = $retamount, debh_roundoff = '$roundoff' , debh_remarks =  '$remarks' where debh_comp_code = $compcode and debh_fin_code = $fincode and  debh_no = $rrno";  

//echo $query1;
//echo "<br>";
 $result1=mysql_query($query1);


 $query2  = "update trnpur_grn_ret_trailer , maspur_item_trailer set item_avg_rate = ((item_stock * item_avg_rate)+ debt_item_value)/ (item_stock + debt_qty), item_stock = item_stock + debt_qty where debt_comp_code = item_comp_code and debt_fin_code = item_fin_code and debt_item_code = item_code and debt_comp_code =  $compcode  and debt_fin_code = $fincode and debt_no= $rrno";  

//echo $query2;
//echo "<br>";
 $result2=mysql_query($query2);

 $query3  = "update trnpur_grn_ret_trailer , trnpur_indent set ind_rec_qty = ind_rec_qty + debt_qty where debt_comp_code = ind_comp_code and debt_fin_code = ind_fin_code and debt_item_code = ind_item_code and
debt_ind_no = ind_no and debt_comp_code =  $compcode  and debt_fin_code = $fincode and debt_no= $rrno";  

//echo $query3;
//echo "<br>";
 $result3=mysql_query($query3);



 $query4  = "update trnpur_grn_ret_trailer , trnpur_purchase_trailer set  ptr_rec_qty = ptr_rec_qty + debt_qty where debt_comp_code = ptr_comp_code and debt_fin_code = ptr_fin_code and debt_item_code = ptr_item_code and debt_pono = ptr_pono and  debt_podate = ptr_podate and debt_comp_code =  $compcode  and debt_fin_code = $fincode and debt_no= $rrno";  

//echo $query4;
//echo "<br>";
 $result4=mysql_query($query4);

 $query5 = "update trnpur_grn_ret_trailer , trnpur_min_trailer set  mint_rej_qty = mint_rej_qty - debt_qty
where debt_comp_code = mint_comp_code and debt_fin_code = mint_fin_code  and debt_item_code = mint_item_code and
debt_pono = mint_pono and  debt_podate=  mint_podate and debt_fin_code = mint_ind_fin_code and debt_ind_no = mint_ind_no and debt_comp_code = $compcode  and debt_fin_code = $fincode and debt_no= $rrno"; 
//echo $query5;
//echo "<br>";
$result5 = mysql_query($query5);

 $query6 = "delete from  trnpur_grn_ret_trailer  where debt_comp_code = $compcode  and debt_fin_code = $fincode and debt_no= $rrno"; 
//echo $query6;
//echo "<br>";
$result6 = mysql_query($query6);








}




    


$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++){


	$sno = $i + 1;
	$mintslno=$griddet[$i]['sno'];
	$mintpono=$griddet[$i]['pono'];
	$mintpodate=$griddet[$i]['podate'];
	$mintitemcode =$griddet[$i]['mintitemcode'];
	$mintrejqty =  (float)$griddet[$i]['rejectedqty'];
	$mintunitrate= (float)$griddet[$i]['mintunitrate'];
	$mintvalue = (float)$griddet[$i]['rejectedvalue'];
	$mintdiscount  = (float)$griddet[$i]['mintdiscount'];
	$mintdisamt    = (float)$griddet[$i]['discamt'];
	$mintpfamt     = (float)$griddet[$i]['pfamt'];
	$mintfreight   = (float)$griddet[$i]['freight'];
	$mintothers    = (float)$griddet[$i]['others'];
	$minttaxable   = $mintvalue -$mintdisamt + $mintpfamt + $mintfreight + $mintothers  ;
	$mintcgstper   = (float)$griddet[$i]['mintcgstper'];
	$mintsgstper   = (float)$griddet[$i]['mintsgstper'];
	$mintigstper   = (float)$griddet[$i]['mintigstper'];
	$mintsgstamt   = (float)$griddet[$i]['sgstamt'];
	$mintcgstamt   = (float)$griddet[$i]['cgstamt'];
	$mintigstamt   = (float)$griddet[$i]['igstamt'];
	$itemvalue     = (float)$griddet[$i]['itemvalue'];
	$purledcode    = (float)$griddet[$i]['purgrpcode'];
	$cgstled       = (int)$griddet[$i]['cgstled'];
	$sgstled       = (int)$griddet[$i]['sgstled'];
	$igstled       = (int)$griddet[$i]['igstled'];

	$mintindentno  = (int)$griddet[$i]['mintindentno'];
	$mintindfincode   = (int)$griddet[$i]['mintfincode'];


	$minttcsper      = (int)$griddet[$i]['minttcsper'];
	$minttcsval      = (int)$griddet[$i]['minttcsval'];
	$insurance       = (int)$griddet[$i]['insurance'];


        if ($mintrejqty > 0)
        {
	 $query6= "insert into  trnpur_grn_ret_trailer values($compcode, $fincode, $rrno,  '$rrdate' , $mintpono, '$mintpodate',$mintindentno,$mintindfincode, $sno, $mintitemcode, $mintrejqty, $mintunitrate, $mintvalue, $mintdiscount, $mintdisamt, $mintpfamt, $mintfreight, $mintothers, $minttaxable, $mintcgstper, $mintcgstamt , $mintsgstper, $mintsgstamt , $mintigstper, $mintigstamt,$itemvalue,$purledcode,$cgstled,$sgstled,$igstled,$minttcsper,$minttcsval,$insurance)";

//echo  $query6;
//echo "<br>";

	 $result6=mysql_query($query6); 



	 $query11 = "select * from maspur_item_trailer where item_comp_code ='$compcode'  and item_fin_code = '$fincode' and item_code = '$mintitemcode'";
	 $result11 = mysql_query($query11);


//echo $query11;
//echo "<br>";


	 while ($row = mysql_fetch_assoc($result11)) {

//	    $totstock = $row['item_stock']+ $mintrcvdqty - $oldgrnqty ;
//	    $totvalue = ($row['item_stock'] * $row['item_avg_rate']) + $mintvalue - $oldgrnval;

	    $totvalue = ($row['item_stock'] * $row['item_avg_rate']) - $itemvalue;
	    $totstock = $row['item_stock'] - $mintrejqty;

            $avgrate  = 0;
	    if ( $totvalue > 0 &&  $totstock > 0)
	    { 
               $avgrate  = $totvalue / $totstock;
            }


	    $query12 = "update maspur_item_trailer set  item_avg_rate = $avgrate , item_stock = $totstock  where item_comp_code ='$compcode'  and item_fin_code = '$fincode' and item_code = '$mintitemcode'";
	    $result12 = mysql_query($query12);
          } 
          mysql_free_result($result);

	 $query13 = "update trnpur_indent set  ind_rec_qty = ind_rec_qty - $mintrejqty where ind_comp_code ='$compcode'  and ind_fin_code = '$mintindfincode' and ind_no = '$mintindentno' and ind_item_code = '$mintitemcode'";
//echo $query13;
//echo "<br>";
	 $result13 = mysql_query($query13);


	 $query14 = "update  trnpur_purchase_trailer set ptr_rec_qty = ptr_rec_qty - $mintrejqty where ptr_comp_code = '$compcode'  and ptr_fin_code = '$fincode'   and ptr_pono = '$mintpono' and ptr_item_code = '$mintitemcode' and ptr_ind_fin_code = '$mintindfincode' and ptr_ind_no ='$mintindentno'"; 
//echo $query14;
//echo "<br>";
	 $result14 = mysql_query($query14);

	 $query15 = "update  trnpur_min_trailer set mint_rej_qty = mint_rej_qty + $mintrejqty where mint_comp_code = '$compcode'  and mint_fin_code = '$fincode'   and mint_pono = '$mintpono' and mint_item_code = '$mintitemcode' and mint_ind_fin_code = '$mintindfincode' and mint_ind_no ='$mintindentno'"; 
//echo $query15;
//echo "<br>";
	 $result15 = mysql_query($query15);
}  
}


if ($savetype == "Add") {
   if ( $result1 && $result6 &&  $result12 &&  $result13 &&  $result15 ) 
   {

            mysql_query("COMMIT");                        
            echo '({"success":"true","returnno":"'.$rrno.'"})';
   }
   else
   {  

            mysql_query("ROLLBACK");            
            echo '({"success":"false","returnno":"'.$rrno.'"})';
   }   
}
else {
   if ($result1 && $result2 &&  $result3 &&  $result4 &&  $result5 && $result6 &&  $result12 &&  $result13 &&  $result15)
   {
            mysql_query("COMMIT");                        
            echo '({"success":"true","returnno":"'.$rrno.'"})';
   }
   else
   {
            mysql_query("ROLLBACK");            
            echo '({"success":"false","returnno":"'.$rrno.'"})';
   }   
}
 
?>
