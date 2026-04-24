<?php
require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");
header('Content-Type: application/json; charset=utf-8');

mysqli_select_db($conn, 'anna'); // 🔥 ensure correct DB

$search = intval($_REQUEST['search'] ?? 0);

mysqli_query(
    $conn,
    "CALL anna(1,25,'2026-01-01','2026-01-31',$search)"
);

/* clear results */
while (mysqli_more_results($conn)) {
    mysqli_next_result($conn);
}

/* test visibility */
$res = mysqli_query($conn, "SELECT COUNT(*) cnt FROM annacolumnar");
$row = mysqli_fetch_assoc($res);

if ($row['cnt'] == 0) {
    echo json_encode([
        'success' => false,
        'error'   => 'annacolumnar is EMPTY for PHP',
        'hint'    => 'DB mismatch / temp table / cleared table'
    ]);
    exit;
}

/* fetch data */
$data = [];
$res = mysqli_query($conn, "SELECT * FROM annacolumnar");
while ($r = mysqli_fetch_assoc($res)) {
    $data[] = $r;
}

echo json_encode([
    'success' => true,
    'rows'    => count($data),
    'data'    => $data
]);
exit;