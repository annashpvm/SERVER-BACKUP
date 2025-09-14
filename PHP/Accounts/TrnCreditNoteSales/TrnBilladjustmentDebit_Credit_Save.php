<?php

require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");




$finid = $_REQUEST['finid'];
$compcode = $_REQUEST['compcode'];

$gridDebit  = json_decode($_REQUEST['griddet_debit'], true);
$rowDebit   = $_REQUEST['cnt_debit'];

$gridCredit = json_decode($_REQUEST['griddet_credit'], true);
$rowCredit  = $_REQUEST['cnt_credit'];

$gridAdjust = json_decode($_REQUEST['griddet_adjust'], true);
$rowAdjust  = $_REQUEST['cnt_adjust'];


$gridCreditNote = json_decode($_REQUEST['griddet_CreditNote'], true);
$rowCreditNote  = $_REQUEST['cnt_creditnote'];

$gridInvoice = json_decode($_REQUEST['griddet_invoice'], true);
$rowInvoice  = $_REQUEST['cnt_inv'];



$ledcode = $_REQUEST['ledcode'];
$vouno   = $_REQUEST['cnvouno'];
$voudate = $_REQUEST['cndate'];
$CNRemarks = $_REQUEST['CNRemarks'];
$usercode   = $_POST['usercode'];

$adjustmentdate  = $_POST['adjdate'];


$cdvalue   = (float) $_POST['cdvalue'];
$cdcgst    = (float) $_POST['cdcgst'];
$cdsgst    = (float) $_POST['cdsgst'];
$cdamount  = (float) $_POST['cdamount'];

$cdround   = (float) $_POST['cdround'];
$cdqty     = (float) $_POST['cdqty'];


    $reccount   = 1;
    $today      = date("Y-m-d H:i:s");  

$reason = '';

mysql_query("BEGIN");


for ($i = 0; $i < $rowDebit; $i++) {
    $seqno     = (int)$gridDebit[$i]['accref_seqno'];
    $adjusted  = (float)$gridDebit[$i]['adjamt'] + (float)$gridDebit[$i]['cdamt1'];
    $invno     = $gridDebit[$i]['acctrail_inv_no'];
    if ($adjusted  > 0) 
    { 
       $query1 = "call acc_sp_trn_updacc_trail_seq_no('$seqno','$invno','$adjusted','$ledcode')";
       $result1 = mysql_query($query1);
    }

//echo $query1;
//echo "<br>";
}

for ($i = 0; $i < $rowCredit; $i++) {
    $seqno     = (int)$gridCredit[$i]['accref_seqno'];
    $adjusted  = (float)$gridCredit[$i]['adjamt'];
    $invno     = $gridCredit[$i]['acctrail_inv_no'];
    if ($adjusted  > 0)
    {      
       $query2 = "call acc_sp_trn_updacc_trail_seq_no('$seqno','$invno','$adjusted','$ledcode')";
       $result2 = mysql_query($query2);
    }


//echo $query2;
//echo "<br>";
}








//for getting invoices



      $invqty = 0;

      $invnolist = '';



      for($i=0;$i<$rowInvoice;$i++){
          $invno   = $gridInvoice[$i]['invdocno'];
          $invdate = $gridInvoice[$i]['invdocdate'];

          $cdvalue1 =  (float)$gridInvoice[$i]['cdvalue'];

          if ($cdvalue1 > 0)
             $invqty  = $invqty + $gridInvoice[$i]['invqty'];


          if ($i == 0)
          {     
		$query2 = " select max(invt_hsncode) as hsncode from trnsal_invoice_header,trnsal_invoice_trailer where 	invh_comp_code =invt_compcode and invh_fincode = invt_fincode and invh_seqno = invt_seqno and invh_comp_code= '$compcode' and invh_invrefno = '$invno';";
		$result2 = mysql_query($query2);
		$rec2 = mysql_fetch_array($result2);
	   	$hsncode=$rec2['hsncode'];
                $newDate = date("d-m-Y", strtotime($invdate));
                if ($gridInvoice[$i]['cdamount'] > 0)
                {    
//                    $invnolist =  substr($invno,0,6) ;
                    $invnolist =  $invno ;
                    $invoicedate =  $invdate;
                }

           }
           else
           {

                $newDate = date("d-m-Y", strtotime($invdate));
                $newno   = substr($invno,3,4) ;
                $newno   = str_replace("/","",$newno);
                if ($gridInvoice[$i]['cdamount'] > 0)
                {
                   $invnolist = $invnolist . ','. $newno ;
                   $invoicedate =  $invdate;
                }
           }           
        }


    $invnolist2  = substr(trim($invnolist),0,28);
    $invnolist3  = substr(trim($invnolist),0,198);





// for updating Credit Note

        $cquery1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
        $cresult1 = mysql_query($cquery1);
        $crec1 = mysql_fetch_array($cresult1);
        $ref_docseqno =$crec1['con_value'];

        #Get Voucher Number

        $query2 = "select ifnull(max(convert(substring(accref_vouno,5),signed)),0) +1 as vou_no from acc_ref where accref_vou_type = 'CNG' and accref_finid = '$finid' and accref_comp_code = '$compcode';";
  
        $result2 = mysql_query($query2);
        $rec2 = mysql_fetch_array($result2);
        $conval2=$rec2['vou_no'];
        if ($conval2 < 10)
        {                                              
          $vno = "00".$conval2;
        }                                      
        else
        {  
             if ($conval2 < 100) 
             {                                              
              $vno = "0".$conval2;                   
             }
             else 
             {      
               $vno = $conval2;  
             }
        } 
        $vouno = "CNG-".$vno ;


	$query3 = "select ifnull(max(dbcr_seqno),0) + 1 as con_value from acc_dbcrnote_header;";
	$result3 = mysql_query($query3);
	$rec3 = mysql_fetch_array($result3);
	$gindbcrseq = $rec3['con_value'];





//    $querya2 = "call acc_sp_trn_insacc_ref('$ref_docseqno','$vouno','$compcode','$finid','$voudate','CNG', '','$paymode','$adjinvnoref', '$adjinvdate','$CNRemarks');";

    $querya2 = "call acc_sp_trn_insacc_ref('$ref_docseqno','$vouno','$compcode','$finid','$voudate','CNG', '','','$invnolist2', '$invoicedate','$CNRemarks');";


    $resulta2 = mysql_query($querya2);

// echo $querya2;
// echo "<br>";

$cquerya3 = "insert into acc_voucher_logs values ($ref_docseqno,$reccount,'$today',$usercode,'$reason')";
$cresulta3 = mysql_query($cquerya3);



//echo $cquerya3;
// echo "<br>";
        $inscnt = 0;
        for($i=0;$i<$rowCreditNote;$i++){
            $slno = $i+1;
            $ledseq = $gridCreditNote[$i]['ledcode'];
            $dbamt = (float) $gridCreditNote[$i]['debit'];
            $cramt = (float) $gridCreditNote[$i]['credit'];
            $totamt =   $dbamt +  $cramt; 
            $ledtype = $gridCreditNote[$i]['ledtype'];
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
               $querya3 = "call acc_sp_trn_insacc_trail ('$ref_docseqno','$slno','$vouno', '$voudate', '$totamt' ,'$totamt' ,'$ledseq' ,'$amtmode','0','0')";
               $resulta3 = mysql_query($querya3);
//echo  $querya3;
//echo "<br>";

               }  


            #Insert AccTran

            $querya4 = "call acc_sp_trn_insacc_tran('$ref_docseqno','$slno','$ledseq','$dbamt','$cramt','$totamt','CNG','');";
            $resulta4 = mysql_query($querya4);

//echo  $querya4;	 
//echo "<br>";  
            if(resulta4){
                $inscnt = $inscnt + 1;
            }

	  }
        }





// FOR UPDATING CREDIT NOTE HEADER AND TRAILER


		$querya6 = "call acc_sp_insdbcrnoteheader('$gindbcrseq','$compcode','$finid','CNG','$conval2','$vouno','$voudate','$ledcode','$ledcode','1741', '$cdamount','$CNRemarks', 'C','N', '$ref_docseqno','$hsncode','$usercode','$invqty','CASH DISC','0','KRAFT PAPER','$today','$today');";
		$resulta6 = mysql_query($querya6);


//echo  $querya6;	 
//echo "<br>";

		$querya7 = "call acc_sp_insdbcrnotetrailer ('$gindbcrseq', '$invnolist3', '$invdate', '$cdvalue' , '$cdamount', '0', '$cdcgst', '$cdsgst','0','6', '6','1646',  '1644', '1645',0,0,0,0,0,'$cdround',0,0,$cdvalue)";
		$resulta7 = mysql_query($querya7);

//echo  $querya7;	 
//echo "<br>";






      for($i=0;$i<$rowInvoice;$i++){
          $invno   =  $gridInvoice[$i]['invdocno'];
          $invdate =  $gridInvoice[$i]['invdocdate'];

          $invvalue =  (float)$gridInvoice[$i]['acctrail_inv_value'];
          $pending  =  (float)$gridInvoice[$i]['pendingamt'];
          $invadjust =  (float)$gridInvoice[$i]['adjusted'];
          $invbal   =  (float)$gridInvoice[$i]['invbalance'];

          $cdvalue1 =  (float)$gridInvoice[$i]['cdvalue'];
          $cdcgst1  =  (float)$gridInvoice[$i]['cgst'];
          $cdsgst1  =  (float)$gridInvoice[$i]['sgst'];
          $cdamt1   =  (float)$gridInvoice[$i]['cdamount'];
          $invqty  =  (float)$gridInvoice[$i]['invqty'];        
          if($cdvalue1 > 0)
              $cdqty  =  (float)$gridInvoice[$i]['invqty'];
          else
              $cdqty  =  0;



          if ( $gridInvoice[$i]['invbalance'] ==  0)
          {
  $querya8 = "call acc_sp_insdbcrnotetrailer_invoice('$gindbcrseq','$invno','$invdate','$cdvalue1' ,'$cdamount','0', '$cdcgst1','$cdsgst1','0','6','6','1646','1644','1645',0,0,0,0,0,'$cdround',0,0,$cdvalue1 ,  $invqty)";
		$resulta8 = mysql_query($querya8);   

//echo  $querya8;	 
//echo "<br>";      
       }

    $querya9 = "insert into acc_dbcrnote_sales_purchase (cn_compcode, cn_fincode, cn_adjust_date, cn_vouno, cn_voudate, cn_invno, cn_invdate, cn_invamt, cn_pendingamt, cn_adjusted, cn_balance, cn_qty, cd_value, cd_cgst, cd_sgst, cd_round, cd_amount) values ('$compcode','$finid','$adjustmentdate','$vouno','$voudate','$invno','$invdate', '$invvalue', '$pending','$invadjust','$invbal','$cdqty','$cdvalue1','$cdcgst1','$cdsgst1','$cdround','$cdamt1')";

		$resulta9 = mysql_query($querya9);   


//echo  $querya9;	 
//echo "<br>";   

      }   




$inscnt = 0;
for ($i = 0; $i < $rowAdjust; $i++) {

    $mainseqno   = $gridAdjust[$i]['mainseqno'];
    $maindocno   = $gridAdjust[$i]['maindocno'];
    $mainseqno   = $gridAdjust[$i]['mainseqno'];
    $maindocdate = $gridAdjust[$i]['maindocdate'];
    $adjseqno    = $gridAdjust[$i]['adjseqno'];
    $adjvouno    = $gridAdjust[$i]['adjvouno'];
    $adjvoudate  = $gridAdjust[$i]['adjvoudate'];

    $adjinvno    = $gridAdjust[$i]['adjinvno'];
    $adjinvdate  = $gridAdjust[$i]['adjinvdate'];


    $adjamt      = $gridAdjust[$i]['adjamt'];
    $payterms    = $gridAdjust[$i]['payterms'];



    if ($adjamt > 0) {
	$query = "select ifnull(max(ref_slno),0) as refslno from acc_adjustments";
	$result = mysql_query($query);
	$rec = mysql_fetch_array($result);
	$ginrefslno = $rec['refslno'];

	$ginrefslno = $ginrefslno + 1;

	$querydate = "select datediff('$maindocdate','$adjvoudate') as daysin";
	$resultdate = mysql_query($querydate);
	$recdatenew = mysql_fetch_array($resultdate);
	$adjdays=$recdatenew['daysin'];



        $query3 = "insert into acc_adjustments (ref_slno, ref_compcode, ref_finid, ref_docseqno, ref_docno, ref_docdate, ref_adjseqno, ref_adjvouno, ref_invno, ref_invdate, ref_adjamount, ref_adj_days, ref_adj_by, ref_adjusted_on,ref_paymt_terms,ref_ledcode,ref_adjvoutype) values ('$ginrefslno','$compcode','$finid',
'$mainseqno','$maindocno','$maindocdate','$adjseqno','$adjvouno', '$adjinvno','$adjvoudate', 
'$adjamt',$adjdays,'AUTO',curdate(),$payterms,'$ledcode','AU' );";

        $result3 = mysql_query($query3);


//echo $query3;
//echo "<br>";


        $query4 = "insert into acc_dbcrnote_trailer_Credit_Note_Adjustments (dbcn_seqno, dbcn_adj_seqno) values ('$gindbcrseq', '$ginrefslno');";

        $result4 = mysql_query($query4);


    }




}


// For Credit Note Adjustments
      for($i=0;$i<$rowInvoice;$i++){


          $invseqno   =  $gridInvoice[$i]['invseqno'];
          $invno   =  $gridInvoice[$i]['invdocno'];
          $invdate =  $gridInvoice[$i]['invdocdate'];
          $invqty  =  (float)$gridInvoice[$i]['invqty'];

          $invvalue =  (float)$gridInvoice[$i]['acctrail_inv_value'];
          $pending  =  (float)$gridInvoice[$i]['pendingamt'];
          $invadjust =  (float)$gridInvoice[$i]['adjusted'];
          $invbal   =  (float)$gridInvoice[$i]['invbalance'];

          $cdvalue1 =  (float)$gridInvoice[$i]['cdvalue'];
          $cdcgst1  =  (float)$gridInvoice[$i]['cgst'];
          $cdsgst1  =  (float)$gridInvoice[$i]['sgst'];
          $cdamount1 =  (float)$gridInvoice[$i]['cdamount'];

          if ( $gridInvoice[$i]['cdamount'] >  0)
          {


		$query = "select ifnull(max(ref_slno),0) as refslno from acc_adjustments";
		$result = mysql_query($query);
		$rec = mysql_fetch_array($result);
		$ginrefslno = $rec['refslno'];

		$ginrefslno = $ginrefslno + 1;

		$querydate = "select datediff('$invdate','$voudate') as daysin";
		$resultdate = mysql_query($querydate);
		$recdatenew = mysql_fetch_array($resultdate);
		$adjdays=$recdatenew['daysin'];



		$query3 = "insert into acc_adjustments (ref_slno, ref_compcode, ref_finid, ref_docseqno, ref_docno, ref_docdate, ref_adjseqno, ref_adjvouno, ref_invno, ref_invdate, ref_adjamount, ref_adj_days, ref_adj_by, ref_adjusted_on,ref_paymt_terms,ref_ledcode,ref_adjvoutype) values ('$ginrefslno','$compcode','$finid',
	'$invseqno','$invno','$invdate','$ref_docseqno','$vouno', '$vouno','$voudate', 
	'$cdamount1',$adjdays,'AUTO',curdate(),$payterms,'$ledcode','AU' );";

		$result3 = mysql_query($query3);

//echo  $querya9;	 
//echo "<br>";   

          }  
     }

if ( $result1 && $result2 && $result3 &&  $result4 && $resulta2 && $resulta3 && $resulta4 && $resulta6 && $resulta7 && $resulta8 && $resulta9 ) {
    mysql_query("COMMIT");
    echo '({"success":"true","vouno":"' . $vouno . '"})';
} else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","vouno":"' . $vouno . '"})';
}
?>

