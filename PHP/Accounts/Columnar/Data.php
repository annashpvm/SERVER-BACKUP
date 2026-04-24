<?php
require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");
header('Content-Type: application/json; charset=utf-8');

mysqli_select_db($conn, 'anna'); // 🔥 ensure correct DB

$search = intval($_REQUEST['search'] ?? 0);
$fromdate = $_REQUEST['fromdate'] ?? '2026-01-01';
$todate = $_REQUEST['todate'] ?? '2026-01-31';

$millcode = intval($_REQUEST['millcode'] ?? 0);
$fincode = intval($_REQUEST['fincode'] ?? 0);


mysqli_query(
    $conn,
    "CALL spacc_column($millcode ,$fincode,'$fromdate','$todate',$search)"
);

/* clear results */
while (mysqli_more_results($conn)) {
    mysqli_next_result($conn);
}

/* test visibility */
$res = mysqli_query($conn, "SELECT COUNT(*) cnt FROM ledgercolumnar");
$row = mysqli_fetch_assoc($res);

if ($row['cnt'] == 0) {
    echo json_encode([
        'success' => false,
        'error'   => 'ledgercolumnar is EMPTY for PHP',
        'hint'    => 'DB mismatch / temp table / cleared table'
    ]);
    exit;
}

/* fetch data */
$data = [];
$res = mysqli_query($conn, "SELECT * FROM ledgercolumnar");
while ($r = mysqli_fetch_assoc($res)) {
    $data[] = $r;
}

echo json_encode([
    'success' => true,
    'rows'    => count($data),
    'data'    => $data
]);
exit;