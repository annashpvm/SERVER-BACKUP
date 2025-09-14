<?php

require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");

$griddet = json_decode($_REQUEST['griddet'], true);
$rowcnt = $_POST['cnt'];
$finid = $_POST['finid'];
$compcode = $_POST['compcode'];
$fromdate = $_POST['fromdate'];
$todate = $_POST['todate'];
$ledgerid = $_POST['ledgerid'];
$ledgername = $_POST['ledgername'];
$section = $_POST['section'];

$query10 = "select ifnull(max(tds_seqno),0) + 1 as tds_seqno from acc_tds_header";
$result10 = mysql_query($query10);
$recseq = mysql_fetch_array($result10);
$seqno = $recseq['tds_seqno'];

mysql_query('BEGIN');

$query1 = "call acc_sp_tdsheader_insert ('$seqno','$fromdate','$todate','$finid','$compcode','$ledgerid','$ledgername','$section',now());";
$result1 = mysql_query($query1);

$inscnt = 0;

for ($i = 0; $i < $rowcnt; $i++) {
    $vouno = $griddet[$i]['accref_vouno'];
    $voutype = $griddet[$i]['accref_vou_type'];
    $voudate = $griddet[$i]['accref_voudate'];
    $ledcode = $griddet[$i]['led_code'];
    $ledname = $griddet[$i]['led_name'];
    $tdspercent = $griddet[$i]['tds_percent'];
    $gross = $griddet[$i]['grossamt'];
    $amount = $griddet[$i]['amt'];
    $narration = $griddet[$i]['accref_narration'];

    $query2 = "call acc_sp_tdstrailer_insert('$seqno','$ledgerid','$vouno','$voutype','$voudate','$ledcode','$ledname','$tdspercent','$gross','$amount','$narration');";
    $result2 = mysql_query($query2);

            if ($result2) {
                $inscnt = $inscnt + 1;
            }
}

if ($result1 && ($rowcnt == $inscnt)) {
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $seqno . '"})';
} else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $seqno . '"})';
}
?>
                     
