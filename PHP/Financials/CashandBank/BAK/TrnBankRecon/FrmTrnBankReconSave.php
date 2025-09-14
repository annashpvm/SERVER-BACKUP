<?php

require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");

$griddet = json_decode($_REQUEST['griddet'], true);
$rowcnt = $_REQUEST['cnt'];

mysql_query("BEGIN");

for ($i = 0; $i < $rowcnt; $i++) {
    $checkno = $griddet[$i]['checkno'];
    $checkamt = $griddet[$i]['checkamt'];
    $ledger = $griddet[$i]['ledger'];
    $vouno = $griddet[$i]['vouno'];
    $voudate = $griddet[$i]['voudate'];
    $Flag = $griddet[$i]['Flag'];
    $seqno = $griddet[$i]['seqno'];

    if($Flag=='Selected'){	
    $querya3 = "insert into bankrecon values('$checkno','$checkamt','$ledger','$voudate','$vouno','$seqno')";
    $resulta3 = mysql_query($querya3);
    }	
}

if ($resulta3) {
    mysql_query("COMMIT");
    echo '({"success":"true"})';
} else {
    mysql_query("ROLLBACK");
    echo '({"success":"false"})';
}
?>
