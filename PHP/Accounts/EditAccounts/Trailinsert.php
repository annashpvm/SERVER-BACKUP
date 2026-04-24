<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

$seqno = mysqli_real_escape_string($conn, $_REQUEST['accseqno']);

mysqli_begin_transaction($conn);

$query1 = "SELECT acctrail_accref_seqno,
                  MAX(acctrail_serialno)+1 AS acctrail_serialno
           FROM acc_trail
           WHERE acctrail_accref_seqno='$seqno'";

$result1 = mysqli_query($conn, $query1);
$rec1 = mysqli_fetch_array($result1);

if (!$rec1) {
    echo "No records found";
    exit;
}

$acctrailaccrefseqno = $rec1['acctrail_accref_seqno'];
$acctrailserialno    = $rec1['acctrail_serialno'];


$query = "INSERT INTO acc_trail 
          (acctrail_accref_seqno, acctrail_serialno, acctrail_inv_no, acctrail_inv_date, acctrail_inv_value, acctrail_adj_value, acctrail_led_code, acctrail_amtmode, acctrail_crdays, acctrail_gracedays)
          VALUES ('$acctrailaccrefseqno', '$acctrailserialno', '',  '1900-01-01', 0, 0, 0, '', 0, 0)";

$result = mysqli_query($conn, $query);


if ($result) {
    mysqli_commit($conn);
    echo '({"success":"true","msg":"' . $acctrailaccrefseqno . '"})';
} else {
    mysqli_rollback($conn);
    echo '({"success":"false","msg":"' . $acctrailaccrefseqno . '"})';
}
?>