<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $flagtype = $_REQUEST['flagtype'];

    $griddet = json_decode($_REQUEST['griddet'],true);
    $rowcnt = $_REQUEST['cnt'];

    $debitgriddet = json_decode($_REQUEST['debitgriddet'],true);
    $debitcnt = $_REQUEST['debitcnt'];


    $credigriddet = json_decode($_REQUEST['credigriddet'],true);
    $creditcnt = $_REQUEST['creditcnt'];
 

    $adjgriddet = json_decode($_REQUEST['adjgriddet'],true);
    $adjcnt = $_REQUEST['adjcnt'];

    $ginaccrefseq = $_REQUEST['accrefseq'];
    $vouno = $_REQUEST['vouno'];
    $voudate = $_REQUEST['voudate'];
    $refno = $_REQUEST['refno'];
    $refdate = $_REQUEST['refdate'];
    $narration = $_REQUEST['narration'];
    $paytype = $_REQUEST['paytype'];
    $bankname = $_REQUEST['bankname'];
    $paymode = $_REQUEST['paymode'];
    $payno = $_REQUEST['payno'];
    $paydate = $_REQUEST['paydate'];

    $finid = $_REQUEST['finid'];
    $finyear = $_REQUEST['finyear'];
    $compcode = $_REQUEST['compcode'];
    $entrypoint = $_REQUEST['entrypoint'];

    $usercode = $_POST['usercode'];
    $reason   = strtoupper($_POST['reason']);

    $reccount = 1;
    $today = date("Y-m-d H:i:s");  

   $amtmode = "D";

 $narration=str_replace("'","",$narration);

   #Begin Transaction
   mysqli_begin_transaction($conn);

   if ($flagtype == "Add")
   {
        #Get Max AccRef Seqno from acc_ref
        $query1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
        $result1 = mysqli_query($conn, $query1);
        $rec1 = mysqli_fetch_array($result1);
        $ginaccrefseq=$rec1['con_value'];
       
        #Get Voucher Number
        $query2 = "select ifnull(max(convert(substring(accref_vouno,5),signed)),0) +1 as vou_no from acc_ref where accref_vou_type = 'GJV' and accref_finid = '$finid' and accref_comp_code = '$compcode';";
        $result2 = mysqli_query($conn, $query2);
        $rec2 = mysqli_fetch_array($result2);
        $conval=$rec2['vou_no'];
   //     $vouno=$paytype.'-'.$conval;

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
        $vouno='GJV-'.$vno;
//	    if($refno==''){
//		$refno=$vouno;
//	    }else{
//	    	$refno = $_REQUEST['refno'];
//	    }






     }    
     else
     {

	$cquery1 = "select ifnull(max(accvou_slno),0) + 1 as reccount  from acc_voucher_logs where accvou_seqno = '$ginaccrefseq';";
	$cresult1 = mysqli_query($conn, $cquery1);
	$crec1 = mysqli_fetch_array($cresult1);
	$reccount = $crec1['reccount'];



	$dquery1 = "delete from acc_trail  where acctrail_accref_seqno = '$ginaccrefseq'";
        $dresult1 = mysqli_query($conn, $dquery1);

//echo $dquery1;
//echo "<br>";	

	$dquery2 = "delete from acc_tran  where acctran_accref_seqno = '$ginaccrefseq'";
        $dresult2 = mysqli_query($conn, $dquery2);
	

//echo $dquery2;
//echo "<br>";	
        
        
        $dquery3 = "delete from acc_ref  where accref_seqno ='$ginaccrefseq' and accref_comp_code='$compcode' and accref_finid ='$finid'";
        $dresult3 = mysqli_query($conn, $dquery3);

//echo $dquery3;
//echo "<br>";

        $dquery4 = "update acc_trail , acc_adjustments  set acctrail_adj_value = acctrail_adj_value - ref_adjamount  where acctrail_accref_seqno = ref_docseqno and ref_docseqno  = '$ginaccrefseq'";
        $dresult4 = mysqli_query($conn, $dquery4);


//echo $dquery4;
//echo "<br>";	

        $dquery5 = "update acc_trail , acc_adjustments  set acctrail_adj_value = acctrail_adj_value - ref_adjamount  where acctrail_accref_seqno = ref_adjseqno and ref_docseqno  = '$ginaccrefseq'";
        $dresult5 = mysqli_query($conn, $dquery5);


//echo $dquery5;
//echo "<br>";	


        $dquery6 = "delete from acc_adjustments  where ref_docseqno ='$ginaccrefseq' and ref_compcode='$compcode' and ref_finid ='$finid'";
        $dresult6 = mysqli_query($conn, $dquery6);

//echo $dquery6;
//echo "<br>";
   


     } 
        #Insert AccRef


        $querya2 = "call acc_sp_trn_insacc_ref('$ginaccrefseq','$vouno','$compcode','$finid','$voudate',
                'GJV','$bankname','$paymode','$refno','$refdate','$narration');";

        $resulta2 = mysqli_query($conn, $querya2);


//echo  $querya2;
//echo "<br>";

        $cquerya3 = "insert into acc_voucher_logs values ($ginaccrefseq,$reccount,'$today',$usercode,'$reason')";
        $cresulta3 = mysqli_query($conn, $cquerya3);




       
//echo  $querya2;
        $inscnt = 0;
        for($i=0;$i<$rowcnt;$i++){
            $slno = $i+1;
            $ledseq = $griddet[$i]['ledseq'];
            $dbamt = $griddet[$i]['dbamt'];
            $cramt = $griddet[$i]['cramt'];
            $totamt = $griddet[$i]['totamt'];
            $ledtype = $griddet[$i]['ledtype'];
            $description = strtoupper($griddet[$i]['narration']);
            $ledrefno = $griddet[$i]['refno'];
            $ledrefdate = $griddet[$i]['refdate'];
            $newvouno   = '';
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
                if ($ledrefno == '')
                { 
                        $newvouno   = strtoupper(substr(trim($vouno),0,29));
                //         $newvouno = $vouno;
                        $newvouDT = $voudate;
                }       
                else
                { 
                //       $newvouno = $refno;
                        $newvouno   = strtoupper(substr(trim($ledrefno),0,29));
                        $newvouDT = $ledrefdate;
                }    
		  $querya3 = "call acc_sp_trn_insacc_trail ('$ginaccrefseq','$slno','$newvouno', '$newvouDT', '$totamt' ,'$adjamt' ,'$ledseq' ,'$amtmode','0','0')";
		  $resulta3 = mysqli_query($conn, $querya3);

//echo  $querya3;
//echo "<br>";


               }
            #Insert AccTran



            $querya4 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$ledseq','$dbamt','$cramt','$totamt','$paytype','$description');";
            $resulta4 = mysqli_query($conn, $querya4);

//echo  $querya4;	   
//echo "<br>";
            if($resulta4){
                $inscnt = $inscnt + 1;
            }

	  }
        }


 $dc = 'D';

// for  Adjustments
        for($i=0;$i<$adjcnt;$i++){

	    $adjvouno    = $adjgriddet[$i]['accrefvouno'];
            $adjvoudate  = $adjgriddet[$i]['accrefvoudate'];
	    $invno       = $adjgriddet[$i]['invno'];
	    $invdate     = $adjgriddet[$i]['invdate'];
	    $adjamt      = (float)$adjgriddet[$i]['adjamt'];
	    $accadjseqno = $adjgriddet[$i]['accrefseqno'];
	    $payterms    = $adjgriddet[$i]['payterms'];
            $voutype     = $adjgriddet[$i]['voutype'];
            $ledgercode  = $adjgriddet[$i]['ledcode'];
            $drcr        = $adjgriddet[$i]['drcr'];

            if ($drcr == "D")
               $dc = 'C';
            else
               $dc = 'D';

            if ($adjamt > 0) 
            {   
	    $query = "select ifnull(max(ref_slno),0) as refslno from acc_adjustments";
	    $result = mysqli_query($conn, $query);
	    $rec = mysqli_fetch_array($result);
	    $ginrefslno = $rec['refslno'];
            $ginrefslno = $ginrefslno + 1;

	    $querydate = "select datediff('$voudate','$invdate') as daysin";
            $resultdate = mysqli_query($conn, $querydate);
	    $recdatenew = mysqli_fetch_array($resultdate);
	    $adjdays=$recdatenew['daysin'];

	    $adjquery1 = "insert into acc_adjustments (ref_slno, ref_compcode, ref_finid, ref_docseqno, ref_docno, ref_docdate, ref_adjseqno, ref_adjvouno, ref_invno, ref_invdate, ref_adjamount, ref_adj_days, ref_adj_by, ref_adjusted_on,ref_paymt_terms,ref_ledcode,ref_adjvoutype,ref_adjvoudate,ref_adjvoutype_db_cr) values ('$ginrefslno','$compcode','$finid','$ginaccrefseq','$vouno', '$voudate', '$accadjseqno','$adjvouno','$invno','$invdate','$adjamt',$adjdays,'GJV',curdate(),$payterms,'$ledgercode','$voutype' ,'$adjvoudate','$drcr');";



//echo  $adjquery1;
//echo "<br>";

            $adjresult1 = mysqli_query($conn, $adjquery1);

	    $adjquery2 = "call acc_sp_trn_updacc_trail_seq_no('$accadjseqno','$invno','$adjamt','$ledgercode')";
	    $adjresult2 = mysqli_query($conn, $adjquery2);

//echo  $adjquery2;
//echo "<br>";


        $adjquery3 = "update acc_trail set	acctrail_adj_value = acctrail_adj_value + $adjamt where acctrail_accref_seqno = '$ginaccrefseq' and acctrail_inv_no = '$newvouno' and  acctrail_led_code = '$ledgercode' and acctrail_amtmode = '$dc' ";
        $adjresult3 = mysqli_query($conn, $adjquery3);

//echo  $adjquery3;
//echo "<br>";

            }
    }

   


   if ($flagtype == "Add")
   {
        if ($adjcnt > 0)
        {
                if( $adjresult1 && $adjresult2 && $adjresult3 && $resulta2  && $resulta4  && ($inscnt == $rowcnt))

                {
                 mysqli_commit($conn);
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
                if($resulta2  && $resulta4 && ($inscnt == $rowcnt))

                {
                mysqli_commit($conn);
                echo '({"success":"true","vouno":"'.$vouno.'"})';
                
                }
                else
                {
                mysqli_rollback($conn);          
                echo '({"success":"false","vouno":"'.$vouno.'"})';
                }
        }

    }
    else  // Edit option
    {
        if ($adjcnt > 0)
        {

                if( $adjresult1 && $adjresult2 && $adjresult3 &&  $resulta2  && $resulta4 && $dresult1 && $dresult2 && $dresult3)
                {
                mysqli_commit($conn);
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

                                
                if( $resulta2  && $resulta4 && $dresult1 && $dresult2  && $dresult3)
                {
                mysqli_commit($conn);
                echo '({"success":"true","vouno":"'.$vouno.'"})';
                
                }
                else
                {
                mysqli_rollback($conn);            
                echo '({"success":"false","vouno":"'.$vouno.'"})';
                }
        }        
    }
  
?>
