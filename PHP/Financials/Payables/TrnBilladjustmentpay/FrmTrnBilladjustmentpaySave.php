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

    if ($adjamt > 0 && $partyacct > 0) {
        $query1 = "call acc_sp_trn_insrecpay_tran('$ginrecpayseq','$accrefseqno','$invno','$invdate','$accrefseq','$adjamt','$dbcramt');";
        $result1 = mysql_query($query1);

        $queryref = "select ifnull(max(refseqno),0) + 1 as refseqno from acc_recpay_ref;";
        $resultref = mysql_query($queryref);
        $recref = mysql_fetch_array($resultref);
        $recrefseq = $recref['refseqno'];

        $queryrefchk = "select accref_vou_type,accref_vouno from acc_ref where accref_seqno='$accrefseqno'";
        $resultrefchk = mysql_query($queryrefchk);
        $recrefchk = mysql_fetch_array($resultrefchk);
        $accvoutype = $recrefchk['accref_vou_type'];
        $refvounumber = $recrefchk['accref_vouno'];

        $queryrefchkbal = "select sum(acctrail_adj_value) as adjvalueref from acc_trail where acctrail_accref_seqno='$accrefseqno'";
        $resultrefchkbal = mysql_query($queryrefchkbal);
        $recrefchkbal = mysql_fetch_array($resultrefchkbal);
        $balamtref = $recrefchkbal['adjvalueref'];

        $querydate = "select datediff(curdate(),'$invdate') as daysin";
        $resultdate = mysql_query($querydate);
        $recdatenew = mysql_fetch_array($resultdate);
        $refdays = $recdatenew['daysin'];

        $queryrefchkrecp = "select accref_vou_type,accref_vouno from acc_ref where accref_seqno='$accrefseq'";
        $resultrefchkrecp = mysql_query($queryrefchkrecp);
        $recrefchkrecp = mysql_fetch_array($resultrefchkrecp);
        $cvouno = $recrefchkrecp['accref_vouno'];

        $queryrefins = "insert into acc_recpay_ref values ('$recrefseq','$accrefseqno','$accrefseq','$adjamt',curdate(),'$balamtref','$accvoutype','$refvounumber','$cvouno','$finid','$compcode','$invno','$invdate','0','$refdays','PAYBILLADJUST')";
        $resultrefins = mysql_query($queryrefins);


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

$query7 = "update acc_ref set accref_narration='$narration' where accref_seqno='$accrefseq'";
$result7 = mysql_query($query7);

if ($inscnt > 0 && $result1 && $result6 && $result8) {
    mysql_query("COMMIT");
    echo '({"success":"true","vouno":"' . $ginrecpayseq . '"})';
} else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","vouno":"' . $ginrecpayseq . '"})';
}
?>

