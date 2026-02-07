<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

header('Content-Type: application/json');
error_reporting(0);

$query1 = "
    SELECT
        invh_invrefno,
        invh_date,
        invh_totwt / 1000 AS invwt,
        invh_taxableamt,
        invh_netamt
    FROM trnsal_invoice_header
    WHERE invh_date >= '2026-02-03'
";

$result1 = mysqli_query($conn, $query1);

$data = array();
$columns = array();

$totals = array(
    "invwt"           => 0,
    "invh_taxableamt" => 0,
    "invh_netamt"     => 0
);

$firstRow = true;

while ($row = mysqli_fetch_assoc($result1)) {

    if ($firstRow) {
        foreach ($row as $key => $val) {

            $col = array(
                "header"    => strtoupper(str_replace("_", " ", $key)),
                "dataIndex" => $key,
                "width"     => 120
            );

            // numeric columns
            if (in_array($key, array('invwt','invh_taxableamt','invh_netamt'))) {
                $col['align'] = 'right';
                $col['isAmount'] = true;
            }

            $columns[] = $col;
        }
        $firstRow = false;
    }

    // totals
    $totals['invwt']           += (float)$row['invwt'];
    $totals['invh_taxableamt'] += (float)$row['invh_taxableamt'];
    $totals['invh_netamt']     += (float)$row['invh_netamt'];

    $data[] = $row;
}

echo json_encode(array(
    "success" => true,
    "columns" => $columns,
    "data"    => $data,
    "totals"  => $totals
));
exit;
