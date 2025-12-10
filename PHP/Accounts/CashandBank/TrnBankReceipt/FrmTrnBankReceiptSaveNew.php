<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $flagtype = $_REQUEST['flagtype'];
    $griddet = json_decode($_REQUEST['griddet'],true);
    $gridadjdet = json_decode($_REQUEST['gridadjdet'],true);
    $gridcreditnote = json_decode($_REQUEST['gridcreditnote'],true);

    $rowcnt = $_REQUEST['cnt'];
    $arowcnt = $_REQUEST['adjcnt'];
    $creditnotecnt = $_REQUEST['creditnotecnt'];

    $ref_docseqno = $_REQUEST['accrefseq'];
    $crnoteseqno = (int)$_REQUEST['crnoteseqno'];
    $ref_docseqno2= (int)$_REQUEST['crnoteseqno'];
    $vouno = $_REQUEST['vouno'];
    $voudate = $_REQUEST['voudate'];


    $bankname   = $_REQUEST['bankname'];
    $refno      = $_REQUEST['refno'];
    $refdate    = $_REQUEST['refdate'];
    $narration  = $_REQUEST['narration'];
    $paytype    = $_REQUEST['paytype'];
    $paymode    = $_REQUEST['paymode'];
    $payno      = $_REQUEST['payno'];
    $paydate    = $_REQUEST['paydate'];
    $headacct   = $_REQUEST['headacct'];
    $rcptamt    = $_REQUEST['rcptamt'];
    $totadjamt  = $_REQUEST['totadjamt'];
    $finid      = $_REQUEST['finid'];
    $finyear    = $_REQUEST['finyear'];
    $compcode   = $_REQUEST['compcode'];
    $usercode   = $_POST['usercode'];
    $reason     = strtoupper($_POST['reason']);
    $reccount   = 1;
    $today      = date("Y-m-d H:i:s");  
    $generateCN = $_POST['generateCN'];
    $CNRemarks = $_POST['CNRemarks'];
    $adjinvno   = '';

    $adjinvnoref  = '';

    $hsninvno   = '';


    $cgstledcode = $_POST['cgstledcode'];
    $sgstledcode = $_POST['sgstledcode'];
    $igstledcode = $_POST['igstledcode'];


    $salledcode  = $_POST['salledcode'];
    $ledgercode  = $_POST['ledgercode'];
    $partycode   = $_POST['partycode'];
    $CreditValue = (float) $_POST['CreditValue'];
    $rounding    = (float) $_POST['roff'];
    $qty         = (float) $_POST['qty'];

    $finsuffix   = $_POST['finsuffix'];

    $vouno2 = $_POST['cnvouno'];;
    $itemname  = substr(trim($_POST['itemname']),0,38);


    $billnolist  = substr(trim($_POST['billnolist']),0,28);
    $narration=str_replace("'","",$narration);
    $CNRemarks=str_replace("'","",$CNRemarks);

    mysqli_query($conn, "BEGIN");
    if ($flagtype == "Add")
    {
    
        $cquery1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
        $cresult1 = mysqli_query($conn, $cquery1);
        $crec1 = mysqli_fetch_array($cresult1);
        $ref_docseqno=$crec1['con_value'];

        #Get Voucher Number
        $query2 = "select ifnull(max(convert(substring(accref_vouno,5),signed)),0) +1 as vou_no from acc_ref where accref_vou_type = 'BKR' and accref_finid = '$finid' and accref_comp_code = '$compcode';";

        $result2 = mysqli_query($conn, $query2);
        $rec2 = mysqli_fetch_array($result2);
        $conval= $rec2['vou_no'];
        $conval2= $rec2['vou_no'];

        $convalseqno = "00" . $conval2;
//echo  $convalseqno;
//echo "<br>";
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

        $vouno='BKR/'.$vno.'/'.$finsuffix;

  } 
  else
  {

//for BANK RECEIPT ADJUSTMENTS
	 $query11 = "select * from acc_adjustments where ref_compcode =  $compcode and ref_docseqno = '$ref_docseqno'";
	 $result11 = mysqli_query($conn, $query11);



//echo $query11;
//echo "<br>";


	 while ($row = mysqli_fetch_assoc($result11)) {

	    $iadjseqno = $row['ref_adjseqno'];
	    $iadjamt   = $row['ref_adjamount'];

	    if ( $iadjamt > 0)
	    { 
	    $query12 = "update acc_trail  set acctrail_adj_value = acctrail_adj_value - $iadjamt where acctrail_accref_seqno = '$iadjseqno'";
	    $result12 = mysqli_query($conn, $query12);
//        echo $query12;
            }
          } 
          mysqli_free_result($result11);


//for CREDIT NOTE ADJUSTMENTS

         if ($crnoteseqno > 0)
         {  
	 $query11 = "select * from acc_adjustments where ref_compcode =  $compcode and ref_docseqno = '$crnoteseqno'";
	 $result11 = mysqli_query($conn, $query11);



//echo $query11;
//echo "<br>";


	 while ($row = mysqli_fetch_assoc($result11)) {

	    $iadjseqno = $row['ref_adjseqno'];
	    $iadjamt   = $row['ref_adjamount'];

	    if ( $iadjamt > 0)
	    { 
	    $query12 = "update acc_trail  set acctrail_adj_value = acctrail_adj_value - $iadjamt where acctrail_accref_seqno = '$iadjseqno'";
	    $result12 = mysqli_query($conn, $query12);
//        echo $query12;
            }
          } 
          mysqli_free_result($result11);
          }


	$cquery1 = "select ifnull(max(accvou_slno),0) + 1 as reccount  from acc_voucher_logs where accvou_seqno = '$ref_docseqno';";
	$cresult1 = mysqli_query($conn, $cquery1);
	$crec1 = mysqli_fetch_array($cresult1);
	$reccount = $crec1['reccount'];






//	$query1 = "update acc_trail , acc_adjustments  set acctrail_adj_value = acctrail_adj_value - ref_adjamount where acctrail_accref_seqno = ref_docseqno and ref_adjseqno =  '$ref_docseqno'";
//        $result1 = mysqli_query($conn, $query1);


// FOR CREDIT NOTE
         if ($crnoteseqno > 0)
         {  

	$query1 = "delete from acc_trail  where acctrail_accref_seqno = '$crnoteseqno'";
        $result1 = mysqli_query($conn, $query1);

//echo $query1;
//echo "<br>";


	$query2 = "delete from acc_tran  where acctran_accref_seqno = '$crnoteseqno'";
        $result2 = mysqli_query($conn, $query2);

//echo $query2;
//echo "<br>";

	
        $query3 = "delete from acc_ref  where accref_seqno ='$crnoteseqno' and accref_comp_code='$compcode' and accref_finid ='$finid'";
        $result3 = mysqli_query($conn, $query3);


//echo $query3;
//echo "<br>";


        $query4 = "delete from acc_adjustments  where ref_docseqno ='$crnoteseqno' and ref_compcode='$compcode' and ref_finid ='$finid'";
        $result4 = mysqli_query($conn, $query4);
        } 
//echo $query4;
//echo "<br>";
// FOR BANK RECEIPT   
	$query1 = "delete from acc_trail  where acctrail_accref_seqno = '$ref_docseqno'";
        $result1 = mysqli_query($conn, $query1);

//echo $query1;
//echo "<br>";


	$query2 = "delete from acc_tran  where acctran_accref_seqno = '$ref_docseqno'";
        $result2 = mysqli_query($conn, $query2);

//echo $query2;
//echo "<br>";

	
        $query3 = "delete from acc_ref  where accref_seqno ='$ref_docseqno' and accref_comp_code='$compcode' and accref_finid ='$finid'";
        $result3 = mysqli_query($conn, $query3);


//echo $query3;
//echo "<br>";


        $query4 = "delete from acc_adjustments  where ref_docseqno ='$ref_docseqno' and ref_compcode='$compcode' and ref_finid ='$finid'";
        $result4 = mysqli_query($conn, $query4);

//echo $query4;
//echo "<br>";
}

        

 $cquerya2 = "call acc_sp_trn_insacc_ref(".$ref_docseqno.",'".$vouno."',".$compcode.",".$finid.",'".$voudate."','BKR','".$bankname."','".$paymode."','$refno','$refdate','".$narration."');";
 $resulta2 = mysqli_query($conn, $cquerya2);
 //    echo ($cquerya2);


//echo $cquerya2;
//echo "<br>";



$cquerya3 = "insert into acc_voucher_logs values ($ref_docseqno,$reccount,'$today',$usercode,'$reason')";
$cresulta3 = mysqli_query($conn, $cquerya3);

//echo $querya3;
//echo "<br>";



$inscnt = 0;
for($i=0;$i<$rowcnt;$i++){
    $slno = $i+1;
    $ledseq = $griddet[$i]['ledseq'];
    $dbamt = $griddet[$i]['dbamt'];
    $cramt = $griddet[$i]['cramt'];
    $totamt = $griddet[$i]['totamt'];
    $ledtype = $griddet[$i]['ledtype'];

    if ($slno==1 && $paytype=="BB"){

        $adjamt = $totadjamt;
    }else{
        $adjamt=0;
    }
    $ledtype = $griddet[$i]['ledtype'];
    if ($dbamt>0)
    {
      $amtmode = "D";
    }
    else
    {
      $amtmode = "C";
    }

   if ($ledtype != 'G')
   {
       $querya3 = "call acc_sp_trn_insacc_trail('$ref_docseqno','$slno','$vouno','$voudate','$cramt','$adjamt','$ledseq','$amtmode','0','0');";
       $resulta3 = mysqli_query($conn, $querya3);


//echo $querya3;
//echo "<br>";


    }


//            echo ($querya3);
 //   } 

    $querya4 = "call acc_sp_trn_insacc_tran('$ref_docseqno','$slno','$ledseq','0','$cramt','$cramt','BKR','');";
    $resulta4 = mysqli_query($conn, $querya4);


//echo $querya4;
//echo "<br>";




//        echo ($querya4);
    if( $resulta4){
        $inscnt = $inscnt + 1;
    }
}
$slno=$slno+1;

$querya9 = "call acc_sp_trn_insacc_tran('$ref_docseqno','$slno','$headacct','$rcptamt','0','$rcptamt','BKR','');";
$resulta9 = mysqli_query($conn, $querya9);
//      echo ($querya9);
$crcptno += 1;


//echo $querya9;
//echo "<br>";


$ledseqno = $griddet[0]['ledseq'];




$adjinvno = '';

$adjinvnoref = '';

for($i=0;$i<$arowcnt;$i++){

    $accadjseqno = $gridadjdet[$i]['accrefseqno'];
    $invno       = $gridadjdet[$i]['invno'];
    $invdate     = $gridadjdet[$i]['invdate'];
    $adjamt      = (float) $gridadjdet[$i]['adjamt'];
    $adjvouno    = $gridadjdet[$i]['accrefvouno'];
    $payterms    = (int)$gridadjdet[$i]['payterms'] ;
    $grdays      = (int)$gridadjdet[$i]['grdays'] ;
    $voutype     = $gridadjdet[$i]['voutype'];
    $cdamount    = (float) $gridadjdet[$i]['cdamount'];
    $invwt       = (float) $gridadjdet[$i]['invwt'];



    $totadjamt = $adjamt + $cdamount;


    if ($cdamount > 0)
    {
       if ($adjinvno == '')
       { 
          $adjinvno = $invno; 
          $hsninvno = $invno; 
       }
       else
      {  
          $adjinvno = $adjinvno +','+ $invno; 
      }  
//      $adjinvnoref = $invno; 

      $adjinvnoref = $adjinvno; 

      $adjinvdate = $invdate; 

    }   


//echo $adjamt;
//echo $paytype;

    if($adjamt>0 && $paytype !== 'AD'){


       $query = "select ifnull(max(ref_slno),0) as refslno from acc_adjustments";
       $result = mysqli_query($conn, $query);
       $rec = mysqli_fetch_array($result);
       $ginrefslno = $rec['refslno'];

        $ginrefslno = $ginrefslno + 1;

	$querydate = "select datediff('$voudate','$invdate') as daysin";
	$resultdate = mysqli_query($conn, $querydate);
	$recdatenew = mysqli_fetch_array($resultdate);
	$adjdays=$recdatenew['daysin'];


$query10 = "insert into acc_adjustments (ref_slno, ref_compcode, ref_finid, ref_docseqno, ref_docno, ref_docdate, ref_adjseqno, ref_adjvouno, ref_invno, ref_invdate, ref_adjamount, ref_adj_days, ref_adj_by, ref_adjusted_on,ref_paymt_terms,ref_ledcode,ref_adjvoutype,ref_gracedays,ref_adjvoudate,ref_adjvoutype_db_cr) values ('$ginrefslno','$compcode','$finid','$ref_docseqno','$vouno', '$voudate', '$accadjseqno','$adjvouno','$invno','$invdate','$adjamt',$adjdays,'BR',curdate(),$payterms,$ledseq,'$voutype',$grdays,'$invdate','D');";

$result10 = mysqli_query($conn, $query10);

//echo $query10;
//echo "<br>";	



        $query3 = "call acc_sp_trn_updacc_trail_seq_no('$accadjseqno','$invno','$totadjamt','$ledseqno')";
        $result3 = mysqli_query($conn, $query3);

//echo $query3;
//echo "<br>";
    }
}

if ($generateCN == "YES")
{
    if ($flagtype == "Add")
    {
    
        $cquery1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
        $cresult1 = mysqli_query($conn, $cquery1);
        $crec1 = mysqli_fetch_array($cresult1);
        $ref_docseqno2=$crec1['con_value'];

        #Get Voucher Number

        $query2 = "select ifnull(max(convert(substring(accref_vouno,5),signed)),0) +1 as vou_no from acc_ref where accref_vou_type = 'CNG' and accref_finid = '$finid' and accref_comp_code = '$compcode';";
  
        $result2 = mysqli_query($conn, $query2);
        $rec2 = mysqli_fetch_array($result2);
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
        $vouno2="CNG-".$vno ;

        $query3 = "select ifnull(max(dbcr_seqno),0) + 1 as con_value from acc_dbcrnote_header;";
        $result3 = mysqli_query($conn, $query3);
        $rec3 = mysqli_fetch_array($result3);
        $gindbcrseq = $rec3['con_value'];
      }  
      else
      {
	$query3 = "select dbcr_seqno as con_value  from acc_dbcrnote_header where dbcr_comp_code = '$compcode' and  dbcr_finid = '$finid' and dbcr_vouno = '$vouno2';";
	$result3 = mysqli_query($conn, $query3);
	$rec3 = mysqli_fetch_array($result3);
	$gindbcrseq = $rec3['con_value'];

	$query3 = "select dbcr_no as con_value  from acc_dbcrnote_header where dbcr_comp_code = '$compcode' and  dbcr_finid = '$finid' and dbcr_vouno = '$vouno2';";
	$result3 = mysqli_query($conn, $query3);
	$rec3 = mysqli_fetch_array($result3);
	$conval2 = $rec3['con_value'];

	$dquery1 = "delete from acc_dbcrnote_trailer where dbcrt_seqno = $gindbcrseq;";
	$dresult1= mysqli_query($conn, $dquery1);

	$dquery2 = "delete from acc_dbcrnote_trailer_invoice where dbcrt_seqno = $gindbcrseq;";
	$dresult2= mysqli_query($conn, $dquery2);

	$dquery3 = "delete from acc_dbcrnote_header where dbcr_comp_code = '$compcode' and  dbcr_finid = '$finid' and dbcr_vouno = '$vouno2';";
	$dresult3 = mysqli_query($conn, $dquery3);


         if ($crnoteseqno == 0)
         {  
        $cquery1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
        $cresult1 = mysqli_query($conn, $cquery1);
        $crec1 = mysqli_fetch_array($cresult1);
        $ref_docseqno2=$crec1['con_value'];

        #Get Voucher Number

        $query2 = "select ifnull(max(convert(substring(accref_vouno,5),signed)),0) +1 as vou_no from acc_ref where accref_vou_type = 'CNG' and accref_finid = '$finid' and accref_comp_code = '$compcode';";
  
      $result2 = mysqli_query($conn, $query2);
        $rec2 = mysqli_fetch_array($result2);
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
        $vouno2="CNG-".$vno ;

	$query3 = "select ifnull(max(dbcr_seqno),0) + 1 as con_value from acc_dbcrnote_header;";
	$result3 = mysqli_query($conn, $query3);
	$rec3 = mysqli_fetch_array($result3);
	$gindbcrseq = $rec3['con_value'];

         }     


      }          



if ($ref_docseqno2 > 0) {


//    $querya2 = "call acc_sp_trn_insacc_ref('$ref_docseqno2','$vouno2','$compcode','$finid','$voudate','CNG', '','$paymode','$adjinvnoref', '$adjinvdate','$CNRemarks');";


    $querya2 = "call acc_sp_trn_insacc_ref('$ref_docseqno2','$vouno2','$compcode','$finid','$voudate','CNG', '','$paymode','$billnolist', '$adjinvdate','$CNRemarks');";
    $resulta2CN = mysqli_query($conn, $querya2);


// echo $querya2;
// echo "<br>";

$cquerya3 = "insert into acc_voucher_logs values ($ref_docseqno2,$reccount,'$today',$usercode,'$reason')";
$cresulta3 = mysqli_query($conn, $cquerya3);


//echo $cquerya3;
// echo "<br>";
        $inscnt = 0;
        for($i=0;$i<$creditnotecnt;$i++){
            $slno = $i+1;
            $ledseq = $gridcreditnote[$i]['ledcode'];
            $dbamt = (float) $gridcreditnote[$i]['debit'];
            $cramt = (float) $gridcreditnote[$i]['credit'];
            $totamt =   $dbamt +  $cramt; 
            $ledtype = $gridcreditnote[$i]['ledtype'];
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
               $querya3 = "call acc_sp_trn_insacc_trail ('$ref_docseqno2','$slno','$vouno2', '$voudate', '$totamt' ,'$totamt' ,'$ledseq' ,'$amtmode','0','0')";
               $resulta3CN = mysqli_query($conn, $querya3);
//echo  $querya3;
//echo "<br>";

               }  


            #Insert AccTran

            $querya4 = "call acc_sp_trn_insacc_tran('$ref_docseqno2','$slno','$ledseq','$dbamt','$cramt','$totamt','CNG','');";
            $resulta4CN = mysqli_query($conn, $querya4);

//echo  $querya4;	 
// echo "<br>";  
            if(resulta4){
                $inscnt = $inscnt + 1;
            }

	  }
        }


// FOR UPDATING CREDIT NOTE HEADER AND TRAILER
        $inv_taxable  = 0;
        $inv_adjamt   = 0;
        $inv_cdamount = 0;
        $inv_cgstval  = 0;
        $inv_sgstval  = 0;
        $inv_igstval  = 0;
        $inv_cgstper  = 0;
        $inv_sgstper  = 0;
        $inv_igstper  = 0;
        $inv_invno    = '';
        $inv_invdate  = '';        
        $inv_invdate2  = ''; 

	for($i=0;$i<$arowcnt;$i++){

	    $accadjseqno = $gridadjdet[$i]['accrefseqno'];
	    $invno       = $gridadjdet[$i]['invno'];
	    $invdate     = $gridadjdet[$i]['invdate'];
	    $invdate2    = $gridadjdet[$i]['invdate2'];
	    $adjamt      = (float) $gridadjdet[$i]['adjamt'];
	    $adjvouno    = $gridadjdet[$i]['accrefvouno'];
	    $payterms    = (int)$gridadjdet[$i]['payterms'];
	    $voutype     = $gridadjdet[$i]['voutype'];
	    $cdamount    = (float) $gridadjdet[$i]['cdamount'];
	    $taxable     = (float) $gridadjdet[$i]['cdvalue'];
	    $cgstval     = (float) $gridadjdet[$i]['cgstamount'];
	    $sgstval     = (float) $gridadjdet[$i]['sgstamount'];
	    $igstval     = (float) $gridadjdet[$i]['igstamount'];
	    $cgstper     = (float) $gridadjdet[$i]['cgstper'];
	    $sgstper     = (float) $gridadjdet[$i]['sgstper'];
	    $igstper     = (float) $gridadjdet[$i]['igstper'];

	    if ($cdamount > 0)
	    {

		$inv_taxable  = $inv_taxable  + $taxable;
		$inv_adjamt   = $inv_adjamt   + $adjamt;
		$inv_cdamount = $inv_cdamount + $cdamount;
		$inv_cgstval  = $inv_cgstval  + $cgstval;
		$inv_sgstval  = $inv_sgstval  + $sgstval;
		$inv_igstval  = $inv_igstval  + $igstval;
		$inv_cgstper  = $cgstper;
		$inv_sgstper  = $sgstper;
		$inv_igstper  = $igstper;
                $inv_invdate  = $invdate ; 
                if (trim($inv_invno) == '')
                    $inv_invno    = $invno . ' Dt.' . $invdate2;
                else
                    $inv_invno    = $inv_invno . ' , '  .  $invno . ' Dt.' . $invdate2;


//echo  $inv_invno;	 
//echo "<br>";


            }
        }
              



         $countchk = 0;
	for($i=0;$i<$arowcnt;$i++){

	    $accadjseqno = $gridadjdet[$i]['accrefseqno'];
	    $invno       = $gridadjdet[$i]['invno'];
	    $invdate     = $gridadjdet[$i]['invdate'];
	    $adjamt      = (float) $gridadjdet[$i]['adjamt'];
	    $adjvouno    = $gridadjdet[$i]['accrefvouno'];
	    $payterms    = (int)$gridadjdet[$i]['payterms'];
	    $voutype     = $gridadjdet[$i]['voutype'];
	    $cdamount    = (float) $gridadjdet[$i]['cdamount'];
	    $taxable     = (float) $gridadjdet[$i]['cdvalue'];
	    $cgstval     = (float) $gridadjdet[$i]['cgstamount'];
	    $sgstval     = (float) $gridadjdet[$i]['sgstamount'];
	    $igstval     = (float) $gridadjdet[$i]['igstamount'];
	    $cgstper     = (float) $gridadjdet[$i]['cgstper'];
	    $sgstper     = (float) $gridadjdet[$i]['sgstper'];
	    $igstper     = (float) $gridadjdet[$i]['igstper'];
	    $invwt       = (float) $gridadjdet[$i]['invwt'];

	    if ($cdamount > 0)
	    {

            if ($countchk == 0)
            {
		#Get HSN CODE
//Modified on 05/04/2025 for HSN code - removed  fincode checking
//		$query2 = " select max(invt_hsncode) as hsncode from trnsal_invoice_header,trnsal_invoice_trailer where 	invh_comp_code =invt_compcode and invh_fincode = invt_fincode and invh_seqno = invt_seqno and  invh_fincode ='$finid' and invh_comp_code= '$compcode' and invh_invrefno = '$invno';";

		$query2 = " select max(invt_hsncode) as hsncode from trnsal_invoice_header,trnsal_invoice_trailer where 	invh_comp_code =invt_compcode and invh_fincode = invt_fincode and invh_seqno = invt_seqno and invh_comp_code= '$compcode' and invh_invrefno = '$invno';";
		$result2 = mysqli_query($conn, $query2);
		$rec2 = mysqli_fetch_array($result2);
		$hsncode=$rec2['hsncode'];




		$querya6 = "call acc_sp_insdbcrnoteheader('$gindbcrseq','$compcode','$finid','CNG','$conval2','$vouno2','$voudate','$partycode','$ledgercode','$salledcode', '$CreditValue','$CNRemarks','C','N', '$ref_docseqno2','$hsncode','$usercode','$qty','CASH DISC','0','$itemname','$today','$today');";
		$resulta6 = mysqli_query($conn, $querya6);


//echo  $querya6;	 
//echo "<br>";

		$querya7 = "call acc_sp_insdbcrnotetrailer ('$gindbcrseq', '$inv_invno', '$inv_invdate', '$inv_taxable' , '$inv_cdamount', '$inv_igstval', '$inv_cgstval', '$inv_sgstval','$inv_igstper','$inv_cgstper', '$inv_sgstper','$igstledcode',  '$cgstledcode', '$sgstledcode',0,0,0,0,0,'$rounding',0,0,$inv_taxable)";
		$resulta7 = mysqli_query($conn, $querya7);

//echo  $querya7;	 
//echo "<br>";
                $countchk = $countchk + 1;

              }

		$querya8 = "call acc_sp_insdbcrnotetrailer_invoice('$gindbcrseq','$invno','$invdate','$taxable' ,'$cdamount','$igstval', '$cgstval','$sgstval','$igstper','$cgstper','$sgstper','$igstledcode','$cgstledcode','$sgstledcode',0,0,0,0,0,'$rounding',0,0,$taxable ,  $invwt)";
		$resulta8 = mysqli_query($conn, $querya8);


       $query = "select ifnull(max(ref_slno),0) as refslno from acc_adjustments";
       $result = mysqli_query($conn, $query);
       $rec = mysqli_fetch_array($result);
       $ginrefslno = $rec['refslno'];

        $ginrefslno = $ginrefslno + 1;

	$querydate = "select datediff('$voudate','$invdate') as daysin";
	$resultdate = mysqli_query($conn, $querydate);
	$recdatenew = mysqli_fetch_array($resultdate);
	$adjdays=$recdatenew['daysin'];


$query10 = "insert into acc_adjustments (ref_slno, ref_compcode, ref_finid, ref_docseqno, ref_docno, ref_docdate, ref_adjseqno, ref_adjvouno, ref_invno, ref_invdate, ref_adjamount, ref_adj_days, ref_adj_by, ref_adjusted_on,ref_paymt_terms,ref_ledcode,ref_adjvoutype,ref_adjvoudate) values ('$ginrefslno','$compcode','$finid','$ref_docseqno2','$vouno2', '$voudate', '$accadjseqno','$adjvouno','$invno','$invdate','$cdamount',$adjdays,'CN',curdate(),$payterms,$ledgercode,'$voutype' ,'$invdate');";

$result10 = mysqli_query($conn, $query10);

$query11 = "update acc_ref  set accref_link_seqno = $ref_docseqno2 where  accref_comp_code = $compcode and accref_finid = $finid and  accref_seqno = $ref_docseqno";
$result11 = mysqli_query($conn, $query11);

$query12 = "update acc_ref  set accref_link_seqno = $ref_docseqno where  accref_comp_code = $compcode and accref_finid = $finid and  accref_seqno = $ref_docseqno2";
$result12 = mysqli_query($conn, $query12);


	    }   
        }  



}

//  } 

}


if ( $CreditValue  > 0) {
      $vouno = $vouno.' And Credit Note Number '.$vouno2;
      if($resulta2 &&  $resulta3 && $resulta4 && $resulta9 && $result10 && $resulta2CN && $resulta3CN && $resulta4CN  && $resulta6 && $resulta7 && $resulta8 && $result10)
      {
        mysqli_begin_transaction($conn);
        echo '({"success":"true","vouno":"'.$vouno.'"})'; 
      }
      else
      {
        mysqli_rollback($conn);


        echo '({"success":"false","vouno":"'.$vouno.'"})';
      }
}
else
{
    if( $resulta2 && $resulta4 && $resulta9 )
    {
      mysqli_begin_transaction($conn);
      echo '({"success":"true","vouno":"'.$vouno.'"})'; 
    }
    else
    {
      mysqli_rollback($conn);


      echo '({"success":"false","vouno":"'.$vouno.'"})';
    }  

}


  
?>
