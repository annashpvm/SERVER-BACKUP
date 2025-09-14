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

$today = date("Y-m-d H:i:s");  
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

$addnl_amt = (float) $_POST['addnl_amt'];
$addnl_ledcode = (int) $_POST['addnl_ledcode'];

$grnyear = (int) $_POST['grnyear'];

$others = (float) $_POST['otherspm'];


$totothers = $addnl_amt + $others ;

if ($others > 0 && $addnl_ledcode == 0)
   $addnl_ledcode = 2019;
 



$voutype = 'DNG';

 mysql_query("BEGIN");




if ($savetype == "Add") {


 $query2 = "select ifnull(max(debh_no),0)+1 as retno from trnpur_grn_ret_header where debh_fin_code = $fincode  and debh_comp_code =$compcode";
 $result2= mysql_query($query2);
 $rec2 = mysql_fetch_array($result2);
 $rrno=$rec2['retno'];


    $query2 = "select ifnull(max(dbcr_no),0) + 1 as dbcr_no from acc_dbcrnote_header where dbcr_type = 'DNG' and dbcr_finid = '$finid' and dbcr_comp_code = '$compcode';";
	$result2 = mysql_query($query2);
	$rec2 = mysql_fetch_array($result2);
	$conval = $rec2['dbcr_no'];
        if ($conval < 10)
        {                                              
          $vno = "00".$conval;
        }                                      
        else
        {  
             if ($conval < 100) 
             {                                              
              $vno = "0".$conval;                   
             }
             else 
             {      
               $vno = $conval;  
             }
        } 

        $vouno=$voutype.'/' . $vno.'/'.$finsuffix;

//echo $vouno;
//echo "<br>";

	#Get Max DBCR Seqno from acc_dbcrnote_header

	$query3 = "select ifnull(max(dbcr_seqno),0) + 1 as con_value from acc_dbcrnote_header;";
	$result3 = mysql_query($query3);
	$rec3 = mysql_fetch_array($result3);
	$gindbcrseq = $rec3['con_value'];


	#Get Max AccRef Seqno from acc_ref
	$query1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
	$result1 = mysql_query($query1);
	$rec1 = mysql_fetch_array($result1);
	$ginaccrefseq = $rec1['con_value'];



 $query1  = "insert into  trnpur_grn_ret_header (
debh_comp_code, debh_fin_code, debh_no, debh_date, debh_supcode, debh_grnno, debh_grdate, debh_billno, debh_billdate, debh_taxable, debh_netamount, debh_roundoff, debh_ent_date,  debh_vouno, debh_remarks, debh_user,debh_accseqno, debh_additional,debh_addnl_ledcode,debh_grn_year) values(
$compcode, $fincode, $rrno, '$rrdate' , $supcode, '$grnno', '$grndate', '$billno', '$billdate', $taxable , $retamount, '$roundoff', '$entdate', '$vouno', '$remarks' , $user,$ginaccrefseq,$addnl_amt , $addnl_ledcode,$grnyear)";



//echo $query1;
//echo "<br>";
 $result1=mysql_query($query1);


#Insert AccDbcrNoteHeader
    $querya1 = "call acc_sp_insdbcrnoteheader('$gindbcrseq','$compcode','$finid','$voutype','$conval','$vouno','$rrdate','$supcode','$supcode','$drcrledger', '$retamount','$remarks','S' , '$output', '$ginaccrefseq','$hsncode','$user','0','Stores','0','','$today','$today');";


    $resulta1 = mysql_query($querya1);
   

//echo $querya1;
//echo "<br>";

#Insert AccDbcrNoteTrailer


$querya2 = "call acc_sp_insdbcrnotetrailer('$gindbcrseq','$billno','$billdate','$taxable' ,'$retamount','$igst_amount', '$cgst_amount','$sgst_amount','$igst_percentage','$cgst_percentage','$sgst_percentage','$igst_ledcode','$cgst_ledcode','$sgst_ledcode',0,0,0, $totothers  , $addnl_ledcode,'$roundoff',0,0,'$taxable')";
    $resulta2 = mysql_query($querya2);

//echo $querya2;
//echo "<br>";


}
else
{

	$query1 = "  select dbcr_seqno from acc_dbcrnote_header where dbcr_accseqno = '$ginaccrefseq'";
	$result1 = mysql_query($query1);
	$rec1 = mysql_fetch_array($result1);
	$gindbcrseq = $rec1['dbcr_seqno'];


	$query11 = "select debh_netamount from  trnpur_grn_ret_header where debh_comp_code = $compcode  and debh_fin_code = $fincode  and debh_no = $rrno";
	$result11 = mysql_query($query11);
	$rec11 = mysql_fetch_array($result11);
	$rramt = $rec11['debh_netamount'];


//echo $query11;
//echo "<br>";

//echo $rramt;
//echo "<br>";


$querya6  = "update acc_trail set acctrail_adj_value = acctrail_adj_value -  $rramt  where acctrail_accref_seqno = $grnaccseqno";
$resulta6 = mysql_query($querya6);



//echo $querya6;
//echo "<br>";

        $query4 = "delete from acc_adjustments  where ref_docseqno ='$ginaccrefseq' and ref_compcode='$compcode' and ref_finid ='$finid'";
        $result4 = mysql_query($query4);


 $query1  = "update trnpur_grn_ret_header set debh_date = '$rrdate' , debh_taxable = $taxable  , debh_netamount = $retamount, debh_roundoff = '$roundoff' , debh_remarks =  '$remarks' , debh_additional = $addnl_amt ,debh_addnl_ledcode = $addnl_ledcode  where debh_comp_code = $compcode and debh_fin_code = $fincode and  debh_no = $rrno";  

//echo $query1;
//echo "<br>";
 $result1=mysql_query($query1);


 $query2  = "update trnpur_grn_ret_trailer , maspur_item_trailer set item_avg_rate = ((item_stock * item_avg_rate)+ debt_item_value)/ (item_stock + debt_qty), item_stock = item_stock + debt_qty where debt_comp_code = item_comp_code and debt_fin_code = item_fin_code and debt_item_code = item_code and debt_comp_code =  $compcode  and debt_fin_code = $fincode and debt_no= $rrno";  

//echo $query2;
//echo "<br>";
 $result2=mysql_query($query2);

 $query3  = "update trnpur_grn_ret_trailer , trnpur_indent set ind_rec_qty = ind_rec_qty - debt_qty where debt_comp_code = ind_comp_code and debt_fin_code = debt_ind_fincode and debt_item_code = ind_item_code and
debt_ind_no = ind_no and debt_comp_code =  $compcode  and debt_fin_code = $fincode and debt_no= $rrno";  

//echo $query3;
//echo "<br>";
 $result3=mysql_query($query3);



 $query4  = "update trnpur_grn_ret_trailer , trnpur_purchase_trailer set  ptr_rec_qty = ptr_rec_qty - debt_qty where debt_comp_code = ptr_comp_code and debt_fin_code = ptr_fin_code and debt_item_code = ptr_item_code and debt_pono = ptr_pono and  debt_podate = ptr_podate and debt_comp_code =  $compcode  and debt_fin_code = $fincode and debt_no= $rrno";  

//echo $query4;
//echo "<br>";
 $result4=mysql_query($query4);

 $query5 = "update trnpur_grn_ret_trailer , trnpur_min_trailer set  mint_rej_qty = mint_rej_qty + debt_qty
where debt_comp_code = mint_comp_code and debt_fin_code = mint_fin_code  and debt_item_code = mint_item_code and
debt_pono = mint_pono and  debt_podate=  mint_podate and debt_fin_code = mint_ind_fin_code and debt_ind_no = mint_ind_no and debt_comp_code = $compcode  and debt_fin_code = $fincode  and debt_no= $rrno"; 

 $query5 = "update trnpur_grn_ret_header , trnpur_grn_ret_trailer , trnpur_min_trailer  set  mint_rej_qty = mint_rej_qty - debt_qty where debh_comp_code = debt_comp_code and debh_fin_code = mint_fin_code and debh_no = debt_no and
debt_comp_code = mint_comp_code  and debh_grn_year = mint_fin_code and debt_item_code = mint_item_code and debt_pono = mint_pono and debt_podate= mint_podate  and debt_ind_no = mint_ind_no and debt_comp_code = $compcode and debt_fin_code =  $fincode and debt_no= $rrno"; 


//echo $query5;
//echo "<br>";

$result5 = mysql_query($query5);

 $query6 = "delete from  trnpur_grn_ret_trailer  where debt_comp_code = $compcode  and debt_fin_code = $fincode and debt_no= $rrno"; 
//echo $query6;
//echo "<br>";
$result6 = mysql_query($query6);


        $querya10 = "update acc_dbcrnote_header set dbcr_date = '$rrdate' , dbcr_partycode = '$supcode',dbcr_partyledcode = '$supcode',dbcr_ledcode = '$drcrledger', dbcr_value = '$retamount', dbcr_narration =  '$remarks' , dbcr_party_type = 'S'  , dbcr_output = '$output' , dbcr_hsncode =  '$hsncode',dbcr_INR_Rate = '$inrrate' where dbcr_vouno = '$vouno'  and dbcr_comp_code = '$compcode' and dbcr_finid = '$finid' and dbcr_seqno = $gindbcrseq";
        $resulta10 = mysql_query($query10);

//echo $query10;
//echo "<br>";




        $query11 = "update acc_dbcrnote_trailer set dbcrt_inv_no = '$billno' , dbcrt_inv_date = '$billdate'  , dbcrt_grossvalue = '$taxable',dbcrt_value ='$retamount',dbcrt_igstvalue = '$igst_amount' ,dbcrt_cgstvalue = '$cgst_amount' ,dbcrt_sgstvalue = '$sgst_amount', dbcrt_igstper = '$igst_percentage', dbcrt_cgstper = '$cgst_percentage', dbcrt_sgstper = '$sgst_percentage', dbcrt_igstledcode ='$igst_ledcode' , dbcrt_cgstledcode =  '$cgst_ledcode' , dbcrt_sgstledcode =  '$sgst_ledcode' ,dbcrt_rounding = '$roundoff' ,dbcrt_otheramt = '$totothers',dbcrt_otherledcode ='$addnl_ledcode', dbcrt_taxable = '$taxable'  where dbcrt_seqno = '$gindbcrseq'";

       $resulta11 = mysql_query($query11);


//echo $query11;
//echo "<br>";



	$query1 = "delete from acc_trail  where acctrail_accref_seqno = '$ginaccrefseq'";
        $result1 = mysql_query($query1);

//echo $query1;
//echo "<br>";
	$query2 = "delete from acc_tran  where acctran_accref_seqno = '$ginaccrefseq'";
        $result2 = mysql_query($query2);

//echo $query2;
//echo "<br>";
	
        $query3 = "delete from acc_ref  where accref_seqno ='$ginaccrefseq' and accref_comp_code='$compcode' and accref_finid ='$finid'";
        $result3 = mysql_query($query3);




}




    


$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++){


	$sno = $i + 1;
	$mintslno= (int) $griddet[$i]['sno'];
	$mintpono= (int) $griddet[$i]['pono'];
	$mintpodate=$griddet[$i]['podate'];
	$mintitemcode =$griddet[$i]['mintitemcode'];
	$mintrejqty =  (float)$griddet[$i]['rejectedqty'];
	$mintunitrate= (float)$griddet[$i]['mintunitrate'];
	$mintvalue = (float)$griddet[$i]['rejectedvalue'];
	$mintdiscount  = (float)$griddet[$i]['mintdiscount'];
	$mintdisamt    = (float)$griddet[$i]['discamt'];
	$mintpfamt     = (float)$griddet[$i]['pfamt'];
	$mintfreight   = (float)$griddet[$i]['freight'];
	$mintothers    = (float)$griddet[$i]['others'] + (float)$griddet[$i]['otherpm'];

	$mintotherstax    = (float)$griddet[$i]['others'] ;

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


	$minttcsper      = (int)$griddet[$i]['tcsper'];
	$minttcsval      = (float)$griddet[$i]['tcsval'];
	$insurance       = (float)$griddet[$i]['insurance'];
	$minttaxable   = $mintvalue -$mintdisamt + $mintpfamt + $mintfreight + $mintotherstax + $insurance  ;

	$pfyesno       = $griddet[$i]['pfyesno'];
	$otheryesno    = $griddet[$i]['otheryesno'];
	$freightyesno  = $griddet[$i]['freightyesno'];
	$insyesno      = $griddet[$i]['insyesno'];




        if ($mintrejqty > 0)
        {
	 $query6= "insert into  trnpur_grn_ret_trailer values($compcode, $fincode, $rrno,  '$rrdate' , $mintpono, '$mintpodate',$mintindentno,$mintindfincode, $sno, $mintitemcode, $mintrejqty, $mintunitrate, $mintvalue, $mintdiscount, $mintdisamt, $mintpfamt, $mintfreight, $mintothers, $minttaxable, $mintcgstper, $mintcgstamt , $mintsgstper, $mintsgstamt , $mintigstper, $mintigstamt,$itemvalue,$purledcode,$cgstled,$sgstled,$igstled,$minttcsper,$minttcsval,$insurance,'$pfyesno', '$freightyesno', '$insyesno','$otheryesno')";

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

//echo $query12;
//echo "<br>";

          } 
          mysql_free_result($result);

	 $query13 = "update trnpur_indent set  ind_rec_qty = ind_rec_qty - $mintrejqty where ind_comp_code ='$compcode'  and ind_fin_code = '$mintindfincode' and ind_no = '$mintindentno' and ind_item_code = '$mintitemcode'";
//echo $query13;
//echo "<br>";
	 $result13 = mysql_query($query13);


	 $query14 = "update  trnpur_purchase_trailer set ptr_rec_qty = ptr_rec_qty - $mintrejqty where ptr_comp_code = '$compcode'  and ptr_fin_code = '$grnyear'   and ptr_pono = '$mintpono' and ptr_item_code = '$mintitemcode' and ptr_ind_fin_code = '$mintindfincode' and ptr_ind_no ='$mintindentno'"; 

//echo $query14;
//echo "<br>";
	 $result14 = mysql_query($query14);

	 $query15 = "update  trnpur_min_trailer set mint_rej_qty = mint_rej_qty + $mintrejqty where mint_comp_code = '$compcode'  and mint_fin_code = '$grnyear'   and mint_pono = '$mintpono' and mint_item_code = '$mintitemcode' and mint_ind_fin_code = '$grnyear' and mint_ind_no ='$mintindentno'"; 

//echo $query15;
//echo "<br>";
	 $result15 = mysql_query($query15);

    }

}  



if ($ginaccrefseq > 0) {


    $querya3 = "call acc_sp_trn_insacc_ref('$ginaccrefseq','$vouno','$compcode','$finid','$rrdate','$voutype', '$bankname','$paymode','$billno', '$billdate','$remarks');";
    $resulta3 = mysql_query($querya3);

//echo $querya3;
//echo "<br>";

//$cquerya3 = "insert into acc_voucher_logs values ($ginaccrefseq,$reccount,'$today',$usercode,'$reason')";
//$cresulta3 = mysql_query($cquerya3);


//echo $cquerya3;
//echo "<br>";

        $inscnt = 0;
        for($i=0;$i<$rowcntacc;$i++){
            $slno = $i+1;
            $ledseq = $griddetacc[$i]['ledcode'];
            $dbamt = (float) $griddetacc[$i]['debit'];
            $cramt = (float) $griddetacc[$i]['credit'];
            $totamt =   $dbamt +  $cramt; 
            $ledtype = $griddetacc[$i]['ledtype'];
            $description = $griddetacc[$i]['description'];
            if ($dbamt>0)
            {
              $amtmode = "D";
            }
            else
            {
              $amtmode = "C";
            }
            $adjamt=0;
            if($ledseq>0){
            #Insert AccTrail
               if ($ledtype != 'G')
               {
               $querya4 = "call acc_sp_trn_insacc_trail ('$ginaccrefseq','$slno','$vouno', '$rrdate', '$totamt' ,'$totamt' ,'$ledseq' ,'$amtmode','0','0')";
               $resulta4 = mysql_query($querya4);

//echo  $querya4;
//echo "<br>";


               }  


            #Insert AccTran

            $querya5 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$ledseq','$dbamt','$cramt','$totamt','$voutype','$description');";
            $resulta5 = mysql_query($querya5);

//echo  $querya5;	  
//echo "<br>"; 
            if(resulta4){
                $inscnt = $inscnt + 1;
            }

	  }
        }




}

$querya6  = "update acc_trail set acctrail_adj_value = acctrail_adj_value +  $retamount  where acctrail_accref_seqno = $grnaccseqno";
$resulta6 = mysql_query($querya6);

//echo  $querya6;	  
//echo "<br>"; 


       $query = "select ifnull(max(ref_slno),0) as refslno from acc_adjustments";
       $result = mysql_query($query);
       $rec = mysql_fetch_array($result);
       $ginrefslno = $rec['refslno'];

        $ginrefslno = $ginrefslno + 1;

	$querydate = "select datediff('$rrdate','$billdate') as daysin";
	$resultdate = mysql_query($querydate);
	$recdatenew = mysql_fetch_array($resultdate);
	$adjdays=$recdatenew['daysin'];


$query10 = "insert into acc_adjustments (ref_slno, ref_compcode, ref_finid, ref_docseqno, ref_docno, ref_docdate, ref_adjseqno, ref_adjvouno, ref_invno, ref_invdate, ref_adjamount, ref_adj_days, ref_adj_by, ref_adjusted_on,ref_paymt_terms,ref_ledcode,ref_adjvoutype) values ('$ginrefslno','$compcode','$finid','$ginaccrefseq','$vouno', '$rrdate', '$grnaccseqno','$grnno','$billno','$billdate','$retamount',$adjdays,'StrRet',curdate(),0,$supcode,'DNG' );";

$result10 = mysql_query($query10);

//echo  $query10;	  
//echo "<br>"; 


if ($savetype == "Add") {
   if ( $result1 && $result6 &&  $result12 &&  $result13 &&  $result15 &&  $resulta1 &&  $resulta2  &&  $resulta3  &&  $resulta4  &&  $resulta5 &&  $resulta6 &&  $result10) 
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
