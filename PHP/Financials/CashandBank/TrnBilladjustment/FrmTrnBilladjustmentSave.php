<?php

require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");

$gridadjdet = json_decode($_REQUEST['gridadjdet'], true);
$rowcnt = $_REQUEST['adjcnt'];
$accrefseq = $_REQUEST['accrefseq'];
$partyacct = $_REQUEST['partyacct'];
$totadjamt = $_REQUEST['totadjamt'];
$finid = $_REQUEST['finid'];
$compcode = $_REQUEST['compcode'];
$accvoudate = $_REQUEST['accvoudate'];
$narration = $_REQUEST['narration'];
$vouno = $_REQUEST['vouno'];
$voucherno = substr($vouno, 0, 2);

if ($voucherno == "OP") {
    $vouchertype = "OB";
} else {
    $vouchertype = "BP";
}

mysql_query("BEGIN");

$inscnt = 0;
for ($i = 0; $i < $rowcnt; $i++) {
    $query = "select ifnull(max(recpay_seqno),0) as recpay_seqno from acc_recpay_tran";
    $result = mysql_query($query);
    $rec = mysql_fetch_array($result);
    $ginrecpayseq = $rec['recpay_seqno'];

    $ginrecpayseq = $ginrecpayseq + 1;
    $invno = $gridadjdet[$i]['invno'];
    $invdate = $gridadjdet[$i]['invdate'];
    $invnonew = $gridadjdet[$i]['invno'];
    $adjamt = $gridadjdet[$i]['adjamt'];
    $accrefseqno = $gridadjdet[$i]['accrefseqno'];
    $recpayamt = $gridadjdet[$i]['recpayamt'];
    $voutype = $gridadjdet[$i]['voutype'];
    $Year = $gridadjdet[$i]['Year'];

    if ($gridadjdet[$i]['dbcramt'] > 0) {
        $dbcramt = $gridadjdet[$i]['dbcramt'];
    } else {
        $dbcramt = 0;
    }

    if ($adjamt > 0) {
        $query1 = "call acc_sp_trn_insrecpay_tran('$ginrecpayseq','$accrefseqno','$invno','$invdate','$accrefseq','$adjamt','$dbcramt');";
        $result1 = mysql_query($query1);

		$queryref = "select ifnull(max(refseqno),0) + 1 as refseqno from acc_recpay_ref;";
		$resultref = mysql_query($queryref);
		$recref = mysql_fetch_array($resultref);
		$recrefseq=$recref['refseqno'];

		$queryrefchk = "select accref_vou_type,accref_vouno from acc_ref where accref_seqno='$accrefseqno'";
		$resultrefchk = mysql_query($queryrefchk);
		$recrefchk = mysql_fetch_array($resultrefchk);
		$accvoutype=$recrefchk['accref_vou_type'];
		$refvounumber=$recrefchk['accref_vouno'];

		$queryrefchkbal = "select sum(acctrail_adj_value) as adjvalueref from acc_trail where acctrail_accref_seqno='$accrefseqno'";
		$resultrefchkbal = mysql_query($queryrefchkbal);
		$recrefchkbal = mysql_fetch_array($resultrefchkbal);
		$balamtref=$recrefchkbal['adjvalueref'];

		$querydate = "select datediff(curdate(),'$oaccvoudt') as daysin";
		$resultdate = mysql_query($querydate);
		$recdatenew = mysql_fetch_array($resultdate);
		$refdays=$recdatenew['daysin'];

		$queryrefchkrecp = "select accref_vou_type,accref_vouno from acc_ref where accref_seqno='$accrefseq'";
		$resultrefchkrecp = mysql_query($queryrefchkrecp);
		$recrefchkrecp = mysql_fetch_array($resultrefchkrecp);
		$cvouno=$recrefchkrecp['accref_vouno'];

		$queryrefins = "insert into acc_recpay_ref values ('$recrefseq','$accrefseqno','$accrefseq','$adjamt',curdate(),'$balamtref','$accvoutype','$refvounumber','$cvouno','$finid','$compcode','$invno','$invdate','0','$refdays','BILLADJUST')";
                $resultrefins = mysql_query($queryrefins);

        if ($voutype == "SE") {
            $invnonewcon = $invnonew . '/' . $Year;

            $query2 = "select cinv_seqno,cinv_pack_seqno,cinv_total_invamt from expo_cinv_header where cinv_no ='$invnonewcon'";
            $result2 = mysql_query($query2);
            $rec1 = mysql_fetch_array($result2);
            $cinvseqno = $rec1['cinv_seqno'];
            $cinvpackseqno = $rec1['cinv_pack_seqno'];
            $cinvtotalinvamt = $rec1['cinv_total_invamt'];

            $query3 = "select max(real_no) as slno from expo_realised_details where real_cinv_seqno ='$cinvseqno'";
            $result3 = mysql_query($query3);
            $rec2 = mysql_fetch_array($result3);
            $slno = $rec2['slno'];

            if ($slno == "") {
                $pin_realno = 1;
            } else {
                $pin_realno = $slno + 1;
            }

            $query4 = "select sb_exch_rate from expo_shipping_bill where sb_inv_seqno='$cinvpackseqno'";
            $result4 = mysql_query($query4);
            $rec3 = mysql_fetch_array($result4);
            $sbexchrate = $rec3['sb_exch_rate'];

            if ($sbexchrate == "" || $sbexchrate == 0) {
                $sbexchrate = $rec3['sb_exch_rate'];
            } else {
                $sbexchrate = 48;
            }
            $query5 = "call expo_sp_trn_insrealiseddetails(
                                '$pin_realno',
                                '$cinvseqno',
                                '$accvoudate',
                                '$finid',
                                '$cinvtotalinvamt',
                                '$sbexchrate',
                                '$accrefseq',
                                '$accvoudate');";
            $result5 = mysql_query($query5);
        }

        $query8 = "call acc_sp_trn_updacc_trail_seq_no('$accrefseqno','$invno','$adjamt','$partyacct')";
        $result8 = mysql_query($query8);

        $query6 = "update  acc_trail
                                set acctrail_adj_value=acctrail_adj_value + '$adjamt'
                                where acctrail_accref_seqno='$accrefseq' and
                                          acctrail_led_code='$partyacct'";
        $result6 = mysql_query($query6);

        if ($result1 && $result8 && $result6) {
            $inscnt = $inscnt + 1;
        }
    }
}

$query7 = "update  acc_ref set accref_narration='$narration' where accref_seqno='$accrefseq'";
$result7 = mysql_query($query7);

if ($inscnt > 0 && $result1 && $result6 && $result8) {
    mysql_query("COMMIT");
    echo '({"success":"true","vouno":"' . $ginrecpayseq . '"})';
} else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","vouno":"' . $ginrecpayseq . '"})';
}
?>

