<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

ob_clean();
ob_start();

// require_once '../../SimpleXLSXGen.php';
require_once 'SimpleXLSXGen.php';
$columns   = json_decode($_POST['columns'], true);
$data      = json_decode($_POST['data'], true);
$fname     = $_POST['fname'];

$millname  = $_POST['millname'] ?? '';
$heading   = $_POST['heading'] ?? '';
$fromdate  = $_POST['fromdate'] ?? '';
$todate    = $_POST['todate'] ?? '';

$rows = [];

/* ===============================
   TITLE ROWS
=============================== */

$rows[] = [$millname];
$rows[] = [$heading];
$rows[] = ["From: $fromdate    To: $todate"];
$rows[] = []; // blank row

/* ===============================
   COLUMN HEADERS
=============================== */

$headerRow = [];

foreach ($columns as $col) {
    $headerRow[] = $col['header'];
}

$rows[] = $headerRow;

/* ===============================
   DATA ROWS
=============================== */

foreach ($data as $row) {

    $r = [];

    foreach ($columns as $col) {

        $val = isset($row[$col['dataIndex']])
                ? $row[$col['dataIndex']]
                : '';

        // suppress zero for amount columns
        if (!empty($col['isAmount']) && floatval($val) == 0) {
            $r[] = '';
        } else {
            $r[] = $val;
        }
    }

    $rows[] = $r;
}

/* ===============================
   GENERATE XLSX
=============================== */

// IMPORTANT: use full namespace
$xlsx = \Shuchkin\SimpleXLSXGen::fromArray($rows);

$xlsx->downloadAs("$fname.xlsx");

exit;
?>