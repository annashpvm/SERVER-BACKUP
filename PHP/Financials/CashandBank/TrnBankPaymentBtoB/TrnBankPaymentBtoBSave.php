<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

	$griddet = json_decode($_REQUEST['griddet'],true);
	$rowcnt = $_REQUEST['cnt'];
	$finid = $_REQUEST['finid'];
	$compcode = $_REQUEST['compcode'];
	$voudate = $_REQUEST['voudate'];
	$headacct = $_REQUEST['headacct'];
	$headacct2 = $_REQUEST['headacct2'];
	$Debit = $_REQUEST['Debit'];
	$charges = $_REQUEST['charges'];
	$refno = $_REQUEST['refno'];
	$refdate = $_REQUEST['refdate'];
	$paytype = $_REQUEST['paytype'];
	$bankname = $_REQUEST['bankname'];
	$paymode = $_REQUEST['paymode'];
	$payno = $_REQUEST['payno'];
	$paydate = $_REQUEST['paydate'];
	$narration = $_REQUEST['narration'];
	$frmbank = $_REQUEST['frmbank'];
	$tobank = $_REQUEST['tobank'];
	$DebitNew=0;

        if($charges>0){
	  $DebitNew=$charges+$Debit;
	}else{
	  $DebitNew=$Debit;
	}
	
	if($compcode==1){
	  $contraledger='7';
	  $contracharges='1404';
	}else if($compcode==4){
	  $contraledger='36345';
	  $contracharges='12670';
	}else if($compcode==8){
	  $contraledger='36346';
	  $contracharges='28322';
	}else if($compcode==11){
	  $contraledger='36347';
	}

	if($compcode>0 && $finid>0 && $headacct>0 && $headacct2>0 && $Debit>0){

        $query1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
        $result1 = mysqli_query($conn, $query1);
        $rec1 = mysqli_fetch_array($result1);
        $ginaccrefseq=$rec1['con_value'];
       
        $query2 = "select led_prefix from acc_ledger_master where led_code = '$headacct' and led_comp_code = '$compcode'";
        $result2 = mysqli_query($conn, $query2);
        $rec2 = mysqli_fetch_array($result2);
        $ledprefix=$rec2['led_prefix'];
        
        $query3 = "select curbal_pay_seqno from acc_current_balance where curbal_led_code = '$headacct' and curbal_finid = '$finid'";
        $result3 = mysqli_query($conn, $query3);
        $rec3 = mysqli_fetch_array($result3);
        $recseqnoP=$rec3['curbal_pay_seqno'];
        
        $pvouno=$ledprefix."P".$recseqnoP;

        $query2R = "select led_prefix from acc_ledger_master where led_code = '$headacct2' and led_comp_code = '$compcode'";
        $result2R = mysqli_query($conn, $query2R);
        $rec2R = mysqli_fetch_array($result2R);
        $ledprefixR=$rec2R['led_prefix'];

        $queryR3 = "select curbal_rec_seqno from acc_current_balance where curbal_led_code = '$headacct2' and curbal_finid = '$finid';";
        $resultR3 = mysqli_query($conn, $queryR3);
        $crecR3 = mysqli_fetch_array($resultR3);
        $recseqnoR = $crecR3['curbal_rec_seqno'];

        $rvouno=$ledprefixR."R".$recseqnoR;

	$narrationnewconr=$narration.'- (RECEIPT VOUCHER : '.$rvouno.')';
	$narrationnewconp=$narration.'- (PAYMENT VOUCHER : '.$pvouno.')';

        mysqli_query($conn, "BEGIN");

        $query4 = "call acc_sp_trn_insacc_ref('$ginaccrefseq','$pvouno','$compcode','$finid','$voudate',
                'BP','$bankname','$paymode','$payno','$paydate','$narrationnewconr',0,0);";
        $result4 = mysqli_query($conn, $query4);

        $query5 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','1','$headacct','0','$DebitNew','$DebitNew','1','0','0','','CQ');";
        $result5 = mysqli_query($conn, $query5);

        $query6 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','2','$contraledger','$Debit','0','$Debit','1','0','0','','CQ');";
        $result6 = mysqli_query($conn, $query6);

        if($charges>0){
            $query10 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','3','$contracharges','$charges','0','$charges','1','0','0','','CQ');";
            $result10 = mysqli_query($conn, $query10);
	}

        $query7 = "call acc_sp_trn_insacc_trail('$ginaccrefseq','1','$refno','$refdate','$DebitNew','0','$headacct');";
        $result7 = mysqli_query($conn, $query7);

        $query8 = "call acc_sp_trn_insacc_trail('$ginaccrefseq','2','$refno','$refdate','$Debit','0','$contraledger');";
        $result8 = mysqli_query($conn, $query8);

        if($charges>0){
           $query11 = "call acc_sp_trn_insacc_trail('$ginaccrefseq','3','$refno','$refdate','$charges','0','$contracharges');";
           $result11 = mysqli_query($conn, $query11);
	}

	$recseqnoP=$recseqnoP+1;
        $query9 = "update acc_current_balance set curbal_pay_seqno = '$recseqnoP' where curbal_led_code = '$headacct' and curbal_finid = '$finid'";
        $result9 = mysqli_query($conn, $query9);

        $query1R = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
        $result1R = mysqli_query($conn, $query1R);
        $rec1R = mysqli_fetch_array($result1R);
        $ginaccrefseqR=$rec1R['con_value'];

        $queryR4 = "call acc_sp_trn_insacc_ref('$ginaccrefseqR','$rvouno','$compcode','$finid','$voudate',
                'BR','$bankname','$paymode','$payno','$paydate','$narrationnewconp',0,0);";
        $resultR4 = mysqli_query($conn, $queryR4);

        $queryR5 = "call acc_sp_trn_insacc_tran('$ginaccrefseqR','1','$contraledger','0','$Debit','$Debit','1','0','0','','CQ');";
        $resultR5 = mysqli_query($conn, $queryR5);

        $queryR6 = "call acc_sp_trn_insacc_tran('$ginaccrefseqR','2','$headacct2','$Debit','0','$Debit','1','0','0','','CQ');";
        $resultR6 = mysqli_query($conn, $queryR6);

        $queryR7 = "call acc_sp_trn_insacc_trail('$ginaccrefseqR','1','$refno','$refdate','$Debit','0','$contraledger');";
        $resultR7 = mysqli_query($conn, $queryR7);

        $queryR8 = "call acc_sp_trn_insacc_trail('$ginaccrefseqR','2','$refno','$refdate','$Debit','0','$headacct2');";
        $resultR8 = mysqli_query($conn, $queryR8);

	$recseqnoR=$recseqnoR+1;
        $queryR9 = "update acc_current_balance set curbal_rec_seqno = '$recseqnoR' where curbal_led_code = '$headacct2' and curbal_finid = '$finid'";
        $resultR9 = mysqli_query($conn, $queryR9);

        $vouconcat='Payment Voucher No : '.$pvouno. '- Receipt Voucher No : '.$rvouno;

	$narrationref=$narration.$vouconcat;

        $querycharge = "insert into acc_bank_transfer_entry values ('$headacct','$headacct2','$Debit','$charges','$frmbank','$tobank','$ginaccrefseq','$ginaccrefseqR','$pvouno','$rvouno','$narrationref')";
        $resultcharge = mysqli_query($conn, $querycharge);

	}

        if($result4 && $result5 && $result6 && $result7 && $result8 && $result9 && $resultR4 && $resultR5 && $resultR6 && $resultR7 && $resultR8 && $resultR9 && $resultcharge)
        {
            mysqli_begin_transaction($conn);
            echo '({"success":"true","vouno":"'.$vouconcat.'"})';
        }
        else
        {
            mysqli_rollback($conn);


            echo '({"success":"false","vouno":"'.$vouconcat.'"})';
        }
?>
