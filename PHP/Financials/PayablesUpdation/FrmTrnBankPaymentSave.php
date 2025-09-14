<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $flagtype = strtoupper($_REQUEST['flagtype']);
    $griddet = json_decode($_REQUEST['griddet'],true);
    $gridadjdet = json_decode($_REQUEST['gridadjdet'],true);
    $rowcnt = $_REQUEST['cnt'];
    $arowcnt = $_REQUEST['adjcnt'];
    $accrefseq = $_REQUEST['accrefseq'];
    $vouno = $_REQUEST['vouno'];
    $narration = $_REQUEST['narration'];
    $voudate = $_REQUEST['voudate'];
    $refno = $_REQUEST['refno'];
    $refdate = $_REQUEST['refdate'];
    $user= $_REQUEST['user'];
    $paytype = $_REQUEST['paytype'];
    $bankname = $_REQUEST['bankname'];
    $paymode = $_REQUEST['paymode'];
    $payno = $_REQUEST['payno'];
    $paydate = $_REQUEST['paydate'];
    $headacct = $_REQUEST['headacct'];
    $rcptamt = $_REQUEST['rcptamt'];
    $totadjamt = $_REQUEST['totadjamt'];
    $finid = $_REQUEST['finid'];
    $finyear = $_REQUEST['finyear'];
    $compcode = $_REQUEST['compcode'];
    
	if ($paytype=="BB"){
            $narration = $_REQUEST['narration'];
        }else if ($paytype=="AD" && $user!==""){
            $narration = $narration.'-'.'Requested By'.'-'.$user;
        }else{
            $narration = $_REQUEST['narration'];
        }

        #Get Max AccRef Seqno from acc_ref
        $query1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
        $result1 = mysql_query($query1);
        $rec1 = mysql_fetch_array($result1);
        $ginaccrefseq=$rec1['con_value'];
       
        #Get Ledger Prefix for Head Account
        $query2 = "select led_prefix from acc_ledger_master where led_code = '$headacct' and led_comp_code = '$compcode'";
        $result2 = mysql_query($query2);
        $rec2 = mysql_fetch_array($result2);
        $ledprefix=$rec2['led_prefix'];
        
        #Get Current Balance Rec Seqno for Head Account
        $query3 = "select curbal_pay_seqno from acc_current_balance where curbal_led_code = '$headacct' and curbal_finid = '$finid'";
        $result3 = mysql_query($query3);
        $rec3 = mysql_fetch_array($result3);
        $recseqno=$rec3['curbal_pay_seqno'];
             
        $vouno=$ledprefix."P".$recseqno;
         
         
        #Get Max RecPay Seqno from acc_recpay_tran
        $query4 = "select ifnull(max(recpay_seqno),0) + 1 as con_value from acc_recpay_tran;";
        $result4 = mysql_query($query4);
        $rec4 = mysql_fetch_array($result4);
        $ginrecpayseq=$rec4['con_value'];
        
	if($refdate>0&&$paydate>0){
        #Begin Transaction
        mysql_query("BEGIN");
        #Insert AccRef
        $querya2 = "call acc_sp_trn_insacc_ref('$ginaccrefseq','$vouno','$compcode','$finid','$voudate',
                'BP','$bankname','$paymode','$payno','$paydate','$narration',0,0);";
        $resulta2 = mysql_query($querya2);
        
        $inscnt = 0;
        for($i=0;$i<$rowcnt;$i++){
            $slno = $i+1;
            $ledseq = $griddet[$i]['acctran_led_code'];
            $dbamt = $griddet[$i]['Debit'];
            $cramt = $griddet[$i]['Credit'];
            $totamt = $griddet[$i]['totamt'];
            $curseq = $griddet[$i]['acctran_cur_code'];
            $amount = $griddet[$i]['CurAmt'];
            $exgrate = $griddet[$i]['ExRate'];
            $tdsper = $griddet[$i]['tdsper'];
            $tdsvalue = $griddet[$i]['tdsvalue'];

            if ($slno==1 && $paytype=="BB"){
                $adjamt = $totadjamt;
            }else{
                $adjamt=0;
            }
            #Insert AccTrail
            $querya3 = "call acc_sp_trn_insacc_trail('$ginaccrefseq','$slno','$refno','$refdate','$totamt','$adjamt','$ledseq');";
            $resulta3 = mysql_query($querya3);
            #Insert AccTran
            $querya4 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$ledseq','$dbamt','$cramt','$totamt','1','$amount','$exgrate','','$paytype');";
            $resulta4 = mysql_query($querya4);

		$querytds = "select led_grp_code from acc_ledger_master where led_code='$ledseq'";
		$resulttds = mysql_query($querytds);
		$rectds = mysql_fetch_array($resulttds);
		$tedled=$rectds['led_grp_code'];

		$querytdsmax = "select ifnull(max(id),0) + 1 as id from acc_tds";
		$resulttdsmax = mysql_query($querytdsmax);
		$rectdsmax = mysql_fetch_array($resulttdsmax);
		$tedledmax=$rectdsmax['id'];

    		$tdsvaluenew=($tdsvalue*$tdsper)/100;
	
		if($tedled==65 && $ledseq>0 && $tdsper>0){
	    	 $querytdsins = "insert into acc_tds values('$tedledmax','$ginaccrefseq','$tdsper','$tdsvalue','$ledseq',curdate(),'$tdsvaluenew','$finid','$compcode','$vouno')";
            	 $resulttdsins = mysql_query($querytdsins);
		}

            if($resulta3 & $resulta4){
                $inscnt = $inscnt + 1;
            }
        }
        $slno=$slno+1;
        if ($paytype=="BB"){
            $adjamt = $totadjamt;
        }else{
            $adjamt=0;
        }
        #Insert AccTrail for Head Account
        $querya8 = "call acc_sp_trn_insacc_trail('$ginaccrefseq','$slno','$refno','$refdate','$rcptamt','$adjamt','$headacct');";
        $resulta8 = mysql_query($querya8);
        #Insert AccTran for Head Account
        $querya9 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$headacct','0','$rcptamt','$rcptamt','1','$amount','$exgrate','','$paytype');";
        $resulta9 = mysql_query($querya9);
        $recseqno += 1;
        #Update Currenct Balance Rec Seqno for Head Account
        $querya10 = "update acc_current_balance set curbal_pay_seqno = '$recseqno' where curbal_led_code = '$headacct' and curbal_finid = '$finid'";
        $resulta10 = mysql_query($querya10);
        
        #Insert RecPay Tran
        for($i=0;$i<$arowcnt;$i++){
            $oaccrefseq = $gridadjdet[$i]['Billseqno'];
            $oaccvouno = $gridadjdet[$i]['InvNo'];
            $oaccvoudt = $gridadjdet[$i]['Date'];
            $recpayamt = $gridadjdet[$i]['Adjusted'];
            $dbcramt = $gridadjdet[$i]['DNCN'];
            $ovoutype = $gridadjdet[$i]['Type'];
            
            if($recpayamt>0){
                #Insert RecPayTran
                $querya5 = "call acc_sp_trn_insrecpay_tran('$ginrecpayseq','$oaccrefseq','$oaccvouno','$oaccvoudt','$ginaccrefseq','$recpayamt','$dbcramt');";
                $resulta5 = mysql_query($querya5);
                $ginrecpayseq = $ginrecpayseq + 1;

		$queryref = "select ifnull(max(refseqno),0) + 1 as refseqno from acc_recpay_ref;";
		$resultref = mysql_query($queryref);
		$recref = mysql_fetch_array($resultref);
		$recrefseq=$recref['refseqno'];

		$queryrefchk = "select accref_vou_type,accref_vouno from acc_ref where accref_seqno='$oaccrefseq'";
		$resultrefchk = mysql_query($queryrefchk);
		$recrefchk = mysql_fetch_array($resultrefchk);
		$accvoutype=$recrefchk['accref_vou_type'];
		$refvounumber=$recrefchk['accref_vouno'];

		$queryrefchkbal = "select sum(acctrail_adj_value) as adjvalueref from acc_trail where acctrail_accref_seqno='$oaccrefseq'";
		$resultrefchkbal = mysql_query($queryrefchkbal);
		$recrefchkbal = mysql_fetch_array($resultrefchkbal);
		$balamtref=$recrefchkbal['adjvalueref'];

		$querydate = "select datediff(curdate(),'$oaccvoudt') as daysin";
		$resultdate = mysql_query($querydate);
		$recdatenew = mysql_fetch_array($resultdate);
		$refdays=$recdatenew['daysin'];

		$queryrefins = "insert into acc_recpay_ref values ('$recrefseq','$oaccrefseq','$ginaccrefseq','$recpayamt',curdate(),'$balamtref','$accvoutype','$refvounumber','$vouno','$finid','$compcode','$oaccvouno','$oaccvoudt','$dbcramt','$refdays','PAYMENT')";
                $resultrefins = mysql_query($queryrefins);

                #Update Adjamt in Acc Trail
                if($ovoutype=='OB'){
                    $querya7 = "call acc_sp_trn_updob_billdetails_adjvalue('$oaccrefseq','$recpayamt');";
                    $resulta7 = mysql_query($querya7);
                }else{
                    $ledseqno = $griddet[0]['acctran_led_code'];
                    $querya6 = "call acc_sp_trn_updacc_trail_seq_no('$oaccrefseq','$oaccvouno','$recpayamt','$ledseqno');";
                    $resulta6 = mysql_query($querya6);
                }
            }
        }
        }else
        {
            mysql_query("ROLLBACK");
            echo '({"success":"false","vouno":"'.$vouno.'"})';
        }

        if($resulta2 && ($inscnt == $rowcnt) && $resulta8 && $resulta9 && $resulta10)
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
