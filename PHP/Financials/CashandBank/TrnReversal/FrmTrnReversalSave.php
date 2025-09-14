<?php
    require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");
    session_start();

    $flagtype = strtoupper($_REQUEST['flagtype']);
    $griddet = json_decode($_REQUEST['griddet'],true);
    $gridadjdet = json_decode($_REQUEST['gridadjdet'],true);
    $rowcnt = $_REQUEST['cnt'];
    $arowcnt = $_REQUEST['adjcnt'];
    $accrefseq = $_REQUEST['accrefseq'];
    $vouno = $_REQUEST['vouno'];
    $voudate = $_REQUEST['voudate'];
    $bankname = $_REQUEST['bankname'];
    $refno = $_REQUEST['refno'];
    $refdate = $_REQUEST['refdate'];
    $narration = $_REQUEST['narration'].'-(REVERSAL)';
    $paytype = $_REQUEST['paytype'];
    $paymode = $_REQUEST['paymode'];
    $payno = $_REQUEST['payno'];
    $headacct = $_REQUEST['headacct'];
    $partyacct = $_REQUEST['partyacct'];
    $finid = $_REQUEST['finid'];
    $finyear = $_REQUEST['finyear'];
    $compcode = $_REQUEST['compcode'];
    $entrypoint = $_REQUEST['entrypoint'];

        #Get Max AccRef Seqno from acc_ref
        $query1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
        $result1 = mysql_query($query1);
        $rec1 = mysql_fetch_array($result1);
        $ginaccrefseq=$rec1['con_value'];
        
        #Get Ledger Prefix for Head Account
        $query2 = "select led_prefix from acc_ledger_master where led_code = '$headacct'";
        $result2 = mysql_query($query2);
        $rec2 = mysql_fetch_array($result2);
        $ledprefix=$rec2['led_prefix'];
        
        #Get Current Balance Rec Seqno for Head Account
        if ($paytype=="R"){
            $query3 = "select curbal_pay_seqno from acc_current_balance where curbal_comp_code =  $compcode and curbal_led_code = '$headacct' and curbal_finid = '$finid';";
            $result3 = mysql_query($query3);
            $rec3 = mysql_fetch_array($result3);
            $payseqno=$rec3['curbal_pay_seqno'];

            $vouno=$ledprefix."P".$payseqno;
            $voutype="BP";
        }else if ($paytype=="P"){
            $query3 = "select curbal_rec_seqno from acc_current_balance where curbal_comp_code =  $compcode and curbal_led_code = '$headacct' and curbal_finid = '$finid';";
            $result3 = mysql_query($query3);
            $rec3 = mysql_fetch_array($result3);
            $recseqno=$rec3['curbal_rec_seqno'];

            $vouno=$ledprefix."R".$recseqno;
            $voutype="BR";
        }
        
        #Get Max RecPay Seqno from acc_recpay_tran
        $query4 = "select ifnull(max(recpay_seqno),0) + 1 as con_value from acc_recpay_tran;";
        $result4 = mysql_query($query4);
        $rec4 = mysql_fetch_array($result4);
        $ginrecpayseq=$rec4['con_value'];
        
        #Begin Transaction
        mysql_query("BEGIN");
        #Insert AccRef
        $querya2 = "call acc_sp_trn_insacc_ref('$ginaccrefseq','$vouno','$compcode','$finid','$voudate','$voutype','$bankname',
        '$paymode','$payno',curdate(),'$narration',0,1,'$entrypoint');";
        $resulta2 = mysql_query($querya2);
        $pay1 = "D";
        $inscnt = 0;
        for($i=0;$i<$rowcnt;$i++){
            $slno = $i+1;
            $ledseq = $griddet[$i]['acctran_led_code'];
            $dbamt = $griddet[$i]['acctran_dbamt'];
            $cramt = $griddet[$i]['acctran_cramt'];
            $totamt = $griddet[$i]['acctran_totamt'];
            if ($dbamt > 0)
            {
               $pay1 = "D"; }
            else 
            {
               $pay1 = "C"; 
            }
          
              

            #Insert AccTrail
            $querya3 = "call acc_sp_trn_insacc_trail('$ginaccrefseq','$slno','$refno','$voudate','$totamt','$totamt','$ledseq','$pay1');";
            $resulta3 = mysql_query($querya3);
            #Insert AccTran
            $querya4 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$ledseq','$cramt','$dbamt','$totamt',1,0,0,'','CA');";
            $resulta4 = mysql_query($querya4);
            if($resulta3){
                $inscnt = $inscnt + 1;
            }
        }
        if ($paytype=="R"){
            $payseqno += 1;
            #Update Currenct Balance Rec Seqno for Head Account
            $querya5 = "call acc_sp_trn_updcurbal_recpay_seqno('PAY','$payseqno','$headacct','$finid');";
            $resulta5 = mysql_query($querya5);
        }else if ($paytype=="P"){
            $recseqno += 1;
            #Update Currenct Balance Rec Seqno for Head Account
            $querya5 = "call acc_sp_trn_updcurbal_recpay_seqno('REC','$recseqno','$headacct','$finid');";
            $resulta5 = mysql_query($querya5);
        }
        
        
        #Insert RecPay Tran
        for($i=0;$i<$arowcnt;$i++){
            $adjamt = $gridadjdet[$i]['adjamt'];
            $accrefseqno = $gridadjdet[$i]['accrefseqno'];
            
            #Update Acc Trail for adjudted amount
            $querya6 = "update acc_trail set acctrail_adj_value = acctrail_adj_value - '$adjamt' where acctrail_accref_seqno = '$accrefseqno' and acctrail_led_code = '$partyacct';";
            $resulta6 = mysql_query($querya6);
            
            $querya7 = "update acc_recpay_tran set recpay_amount=0 where recpay_aaccref_seqno='$accrefseq' and recpay_oaccref_seqno='$accrefseqno'";
            $resulta7 = mysql_query($querya7);

            $queryaREF = "update acc_recpay_ref set refamount=0 where refbankseqno = '$accrefseq' and refinvseqno = '$accrefseqno';";
            $resultaref = mysql_query($queryaREF);
        }
        
        #Update Acc Trail for Reversed Voucher
        $querya8 = "update acc_trail set acctrail_adj_value = acctrail_inv_value where acctrail_accref_seqno = '$accrefseq';";
        $resulta8 = mysql_query($querya8);
        
        $recpayamt = $griddet[0]['acctran_totamt'];
        #Insert RecPayTran
        $querya9 = "call acc_sp_trn_insrecpay_tran('$ginrecpayseq','$ginaccrefseq','$vouno','$voudate','$accrefseq','$recpayamt',0);";
        $resulta9 = mysql_query($querya9);

		$queryref = "select ifnull(max(refseqno),0) + 1 as refseqno from acc_recpay_ref;";
		$resultref = mysql_query($queryref);
		$recref = mysql_fetch_array($resultref);
		$recrefseq=$recref['refseqno'];

		$queryrefchk = "select accref_vou_type,accref_vouno from acc_ref where accref_seqno='$ginaccrefseq'";
		$resultrefchk = mysql_query($queryrefchk);
		$recrefchk = mysql_fetch_array($resultrefchk);
		$accvoutype=$recrefchk['accref_vou_type'];
		$refvounumber=$recrefchk['accref_vouno'];

		$queryrefchkbal = "select sum(acctrail_adj_value) as adjvalueref from acc_trail where acctrail_accref_seqno='$ginaccrefseq'";
		$resultrefchkbal = mysql_query($queryrefchkbal);
		$recrefchkbal = mysql_fetch_array($resultrefchkbal);
		$balamtref=$recrefchkbal['adjvalueref'];

		$querydate = "select datediff(curdate(),'$voudate') as daysin";
		$resultdate = mysql_query($querydate);
		$recdatenew = mysql_fetch_array($resultdate);
		$refdays=$recdatenew['daysin'];

		$queryrefchkrecp = "select accref_vou_type,accref_vouno from acc_ref where accref_seqno='$accrefseq'";
		$resultrefchkrecp = mysql_query($queryrefchkrecp);
		$recrefchkrecp = mysql_fetch_array($resultrefchkrecp);
		$cvouno=$recrefchkrecp['accref_vouno'];

		$queryrefins = "insert into acc_recpay_ref values ('$recrefseq','$ginaccrefseq','$accrefseq','$recpayamt',curdate(),'$balamtref','$accvoutype','$refvounumber','$cvouno','$finid','$compcode','$vouno','$voudate','0','$refdays','CHECK REVERSAL')";
                $resultrefins = mysql_query($queryrefins);
        
        $querya10 = "update acc_ref set accref_reverse_status = 1 where accref_seqno = '$accrefseq';";
        $resulta10 = mysql_query($querya10);
        
        $querya15 = "update acc_ref set accref_payref_no='' where accref_seqno = '$accrefseq';";
        $resulta15 = mysql_query($querya15);

        if($resulta2 && ($rowcnt == $inscnt) && $resulta9 && $resultrefins && $resulta15)
        {
            mysql_query("COMMIT");
            echo '({"success":"true","vouno":"'.$vouno.'"})';
        }
        else
        {
            mysql_query("ROLLBACK");
            echo '({"success":"false","vouno":"'.$vouno.'"})';
        }
  
?>
