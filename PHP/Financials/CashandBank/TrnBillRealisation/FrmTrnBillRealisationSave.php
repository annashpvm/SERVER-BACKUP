<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

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
    $narration = $_REQUEST['narration'];
    $paytype = $_REQUEST['paytype'];
    $paymode = $_REQUEST['paymode'];
    $payno = $_REQUEST['payno'];
    $paydate = $_REQUEST['paydate'];
    $headacct = $_REQUEST['headacct'];
    $rcptamt = $_REQUEST['rcptamt'];
    $totadjamt = $_REQUEST['totadjamt'];
    $exptype = $_REQUEST['exptype'];
    $finid = $_REQUEST['finid'];
    $finyear = $_REQUEST['finyear'];
    $compcode = $_REQUEST['compcode'];
    
        #Get Max AccRef Seqno from acc_ref
        $query1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
        $result1 = mysql_query($query1);
        $rec1 = mysql_fetch_array($result1);
        $ginaccrefseq=$rec1['con_value'];
        
        #Get Ledger Prefix for Head Account
        $query2 = "select led_prefix from acc_ledger_master where led_code = '$headacct' and led_comp_code = '$compcode';";
        $result2 = mysql_query($query2);
        $rec2 = mysql_fetch_array($result2);
        $ledprefix=$rec2['led_prefix'];
        
        #Get Current Balance Rec Seqno for Head Account
        $query3 = "select curbal_rec_seqno from acc_current_balance where curbal_led_code = '$headacct' and curbal_finid = '$finid';";
        $result3 = mysql_query($query3);
        $rec3 = mysql_fetch_array($result3);
        $recseqno=$rec3['curbal_rec_seqno'];
               
        $vouno=$ledprefix."R".$recseqno;
        
        #Begin Transaction
        mysql_query("BEGIN");
        #Insert AccRef
        $querya2 = "call acc_sp_trn_insacc_ref(".$ginaccrefseq.",'".$vouno."',".$compcode.",".$finid.",'".$voudate."','BR','".$bankname."','"
            .$paymode."','".$payno."','".$paydate."','".$narration."',0,0);";
        $resulta2 = mysql_query($querya2);
        
        $inscnt = 0;
        for($i=0;$i<$rowcnt;$i++){
            $slno = $i+1;
            $ledseq = $griddet[$i]['ledseq'];
            $dbamt = $griddet[$i]['dbamt'];
            $cramt = $griddet[$i]['cramt'];
            $totamt = $griddet[$i]['totamt'];
            $curseq = $griddet[$i]['curseq'];
            $amount = $griddet[$i]['amount'];
            $exgrate = $griddet[$i]['exgrate'];

            #Insert AccTrail (Not required)

            #Insert AccTran
            $querya4 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$ledseq','$dbamt','$cramt','$totamt','$curseq','$amount','$exgrate','','$paytype');";
            $resulta4 = mysql_query($querya4);
            if($resulta4){
                $inscnt = $inscnt + 1;
            }
        }
        $slno=$slno+1;
        if ($refno!=''){
            #Insert AccTrail for Head Account
            $querya8 = "call acc_sp_trn_insacc_trail('$ginaccrefseq','$slno','$refno','$refdate','$rcptamt','$totadjamt','$headacct');";
            $resulta8 = mysql_query($querya8);
        }
        
        #Insert AccTran for Head Account
        $querya9 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$headacct','$rcptamt','0','$rcptamt','$curseq','$amount','$exgrate','','$paytype');";
        $resulta9 = mysql_query($querya9);
        $recseqno += 1;
        #Update Currenct Balance Rec Seqno for Head Account
        $querya10 = "call acc_sp_trn_updcurbal_recpay_seqno('REC','$recseqno','$headacct','$finid');";
        $resulta10 = mysql_query($querya10);
        
        #Insert Expo Realisation Detail
        for($i=0;$i<$arowcnt;$i++){
            $rslno = $i+1;
            $invseq = $gridadjdet[$i]['invseq'];
            $realusd = $gridadjdet[$i]['realusd'];
            $exrate = $gridadjdet[$i]['exrate'];
            $amount = $gridadjdet[$i]['amount'];
            $valuedt = $gridadjdet[$i]['valuedt'];
            $invno = $gridadjdet[$i]['invno'];

            if($exptype=='E'){
                #Insert Expo Realisation Detail
                $querya5 = "call expo_sp_trn_insrealiseddetails('$rslno','$invseq','$voudate','$finid','$realusd','$exrate','$ginaccrefseq','$valuedt');";
            }else if($exptype=='F'){
                #Insert Expo Realisation Detail
                $querya5 = "call expo_sp_trn_dfdinsrealiseddetails('$rslno','$invseq','$voudate','$finid','$realusd','$exrate','$ginaccrefseq','$valuedt');";
            }else if($exptype=='M'){
                #Insert Expo Realisation Detail
                $querya5 = "call expo_sp_trn_HomeTexinsrealiseddetails('$rslno','$invseq','$voudate','$finid','$realusd','$exrate','$ginaccrefseq','$valuedt');";
            }
            $resulta5 = mysql_query($querya5);

            #Update Adjamt in Acc Trail
            $querya7 = "call acc_sp_trn_updrealiseddetails('$invno','$amount');";
            $resulta7 = mysql_query($querya7);
        }
        
        if($resulta2 && ($rowcnt == $inscnt) && $resulta9 && $resulta5)
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
