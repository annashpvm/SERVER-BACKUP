<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $flagtype = strtoupper($_REQUEST['flagtype']);
    $griddet = json_decode($_REQUEST['griddet'],true);
    $gridadjdet = json_decode($_REQUEST['gridadjdet'],true);
    $gridtrandet = json_decode($_REQUEST['gridtrandet'],true);
    $rowcnt = $_REQUEST['cnt'];
    $arowcnt = $_REQUEST['adjcnt'];
    $trowcnt = $_REQUEST['trancnt'];
    $accrefseq = $_REQUEST['accrefseq'];
    $vouno = $_REQUEST['vouno'];
    $voudate = $_REQUEST['voudate'];
    $narration = $_REQUEST['narration'];
    $paytype = $_REQUEST['paytype'];
    $bankname = $_REQUEST['bankname'];
    $headacct = $_REQUEST['headacct'];
    $rcptamt = $_REQUEST['rcptamt'];
    $hdaccdbamt = $_REQUEST['hdaccdbamt'];
    $hdacccramt = $_REQUEST['hdacccramt'];
    $comptype = $_REQUEST['comptype'];
    $intamt = $_REQUEST['intamt'];
    $duedate = $_REQUEST['duedate'];
    $finid = $_REQUEST['finid'];
    $finyear = $_REQUEST['finyear'];
    $compcode = $_REQUEST['compcode'];
    
        $query1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
        $result1 = mysql_query($query1);
        $rec1 = mysql_fetch_array($result1);
        $ginaccrefseq=$rec1['con_value'];
       
        #Get Ledger Prefix for Head Account
        $query2 = "select led_prefix from kgdl.acc_ledger_master where led_code = '$headacct' and led_comp_code = '$compcode'";
        $result2 = mysql_query($query2);
        $rec2 = mysql_fetch_array($result2);
        $ledprefix=$rec2['led_prefix'];
        
        #Get Current Balance Rec Seqno for Head Account
        $query3 = "select curbal_pay_seqno from kgdl.acc_current_balance where curbal_led_code = '$headacct' and curbal_finid = '$finid'";
        $result3 = mysql_query($query3);
        $rec3 = mysql_fetch_array($result3);
        $recseqno=$rec3['curbal_pay_seqno'];
             
        $vouno=$ledprefix."P".$recseqno;
        
        #Get Max Bankinterest Seqno
        $query5 = "select ifnull(max(BnkIntSeqno),0) + 1 as con_value from acc_bankinterest_detail;";
        $result5 = mysql_query($query5);
        $rec5 = mysql_fetch_array($result5);
        $ginbnkintseq=$rec5['con_value'];
        
        #Begin Transaction
        mysql_query("BEGIN");
        #Insert AccRef
        $querya2 = "call acc_sp_trn_insacc_ref('$ginaccrefseq','$vouno','$compcode','$finid','$voudate',
                'BP','','','','$voudate','$narration',0,0);";
        $resulta2 = mysql_query($querya2);
        
        $inscnt = 0;
        for($i=0;$i<$rowcnt;$i++){
            $slno = $i+1;
            $ledseq = $griddet[$i]['lecode'];
            $dbamt = $griddet[$i]['Debit'];
            $cramt = $griddet[$i]['Credit'];
            $totamt = $griddet[$i]['totamt'];
            $curseq = $griddet[$i]['curcode'];
            $amount = $griddet[$i]['CurAmt'];
            $exgrate = $griddet[$i]['ExRate'];

            #Insert AccTrail
            #Insert AccTran
            $querya4 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$ledseq','$dbamt','$cramt','$totamt','$curseq','$amount','$exgrate','','$paytype');";
            $resulta4 = mysql_query($querya4);
            if($resulta4){
                $inscnt = $inscnt + 1;
            }
        }
        
        $adjamt=0;
        $slno=$slno+1;
        #Insert AccTran for Head Account
        $querya9 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$headacct','$hdaccdbamt','$hdacccramt','$rcptamt','$curseq','$amount','$exgrate','','$paytype');";
        $resulta9 = mysql_query($querya9);
        $recseqno += 1;
        #Update Currenct Balance Rec Seqno for Head Account
        $querya10 = "update acc_current_balance set curbal_pay_seqno = '$recseqno' where curbal_led_code = '$headacct' and curbal_finid = '$finid'";
        $resulta10 = mysql_query($querya10);
        
        #Update Expo Bank Document Submission Detail
        for($i=0;$i<$arowcnt;$i++){
            $cinvseq = $gridadjdet[$i]['cinvseq'];
            $Bankref = $gridadjdet[$i]['Bankref'];
            $ExRate = $gridadjdet[$i]['ExRate'];
            $texgrate = $gridadjdet[$i]['ExRate'];
            $tamount = $gridadjdet[$i]['NetAmt'];
            if($ExRate>0){
                #Update
                if ($comptype=='K'){
                    $querya5 = "call expo_sp_trn_updbankdetails_billdiscount('$cinvseq','$Bankref','$voudate','$ExRate','$ginaccrefseq','$compcode');";
                }else if ($comptype=='F'){
                    $querya5 = "call expo_sp_trn_updfabbankdetails_billdiscount('$cinvseq','$Bankref','$voudate','$ExRate','$ginaccrefseq','$compcode');";
                }else if ($comptype=='M'){
                    $querya5 = "call expo_sp_trn_updhometexbankdetails_billdiscount('$cinvseq','$Bankref','$voudate','$ExRate','$ginaccrefseq','$compcode');";
                }
                $resulta5 = mysql_query($querya5);
            }
        }
        
        #Update SE Voucher with Bill Discounting Detail
        for($i=0;$i<$trowcnt;$i++){
            $accseq = $gridtrandet[$i]['acctran_accref_seqno'];
            $accslno = $gridtrandet[$i]['acctran_serialno'];
            $dbamount = $gridtrandet[$i]['acctran_dbamt'];
            $cramount = $gridtrandet[$i]['acctran_cramt'];
            
            if($dbamount>0){
                #Update
                $querya6 = "call acc_sp_trn_updacctran_bill_disc('$accseq','$accslno','$tamount','0','$tamount','$texgrate','BD');";
                $resulta6 = mysql_query($querya6);
            } 
            if($cramount>0){
                #Update
                $querya11 = "call acc_sp_trn_updacctran_bill_disc('$accseq','$accslno','0','$tamount','$tamount','$texgrate','BD');";
                $resulta11 = mysql_query($querya11);
            }
        }
        
        #Insert Acc Bank Interest
        $querya7 = "call acc_sp_trn_insacc_bankinterest_detail('$ginbnkintseq','$ginaccrefseq','$headacct','$intamt','$duedate');";
        $resulta7 = mysql_query($querya7);
        
        if($resulta2 && ($inscnt == $rowcnt) && $resulta9)
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

