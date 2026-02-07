<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

header('Content-Type: application/json');
error_reporting(0);

$tableName = 'trnsal_invoice_header';

$query = "SELECT * FROM $tableName WHERE invh_date >= '2026-02-03'";
$result = mysqli_query($conn, $query);

/* 👉 fetch column types from INFORMATION_SCHEMA */
$typeQuery = "
    SELECT COLUMN_NAME, DATA_TYPE
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME   = '$tableName'
";

$typeResult = mysqli_query($conn, $typeQuery);

$decimalCols = array();
while ($r = mysqli_fetch_assoc($typeResult)) {
    if (in_array($r['DATA_TYPE'], array('decimal','float','double'))) {
        $decimalCols[] = $r['COLUMN_NAME'];
    }
}

$data     = array();
$columns  = array();
$totals   = array();
$firstRow = true;

while ($row = mysqli_fetch_assoc($result)) {

    if ($firstRow) {
        foreach ($row as $key => $val) {

            $col = array(
                "header"    => strtoupper(str_replace("_"," ",$key)),
                "dataIndex" => $key,
                "width"     => 120
            );

            if (in_array($key, $decimalCols)) {
                $col['align'] = 'right';
                $col['isAmount'] = true;
                $totals[$key] = 0;
            }

            $columns[] = $col;
        }
        $firstRow = false;
    }

    /* ➕ auto-total ONLY decimal / float columns */
    foreach ($decimalCols as $dcol) {
        if (isset($row[$dcol])) {
            $totals[$dcol] += (float)$row[$dcol];
        }
    }

    $data[] = $row;
}

echo json_encode(array(
    "success"     => true,
    "columns"     => $columns,
    "data"        => $data,
    "totals"      => $totals,
    "decimalCols" => $decimalCols
));
exit;
