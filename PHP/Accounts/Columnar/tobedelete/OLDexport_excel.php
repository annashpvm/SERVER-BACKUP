<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

$comp = $_GET['comp'];
$fin  = $_GET['fin'];
$from = $_GET['from'];
$to   = $_GET['to'];
$led  = $_GET['led'];

mysqli_query($conn,"call anna (1,25,'2026-01-01','2026-01-31',1674)");
$result = mysqli_query($conn,"SELECT * FROM annacolumnar");

$spreadsheet = new Spreadsheet();
$sheet = $spreadsheet->getActiveSheet();

/* Header */
$col = 1;
$fields = mysqli_fetch_fields($result);
foreach ($fields as $field) {
    $sheet->setCellValueByColumnAndRow($col++, 1, strtoupper(str_replace('_',' ',$field->name)));
}

/* Data */
$rowNo = 2;
mysqli_data_seek($result, 0);
while ($row = mysqli_fetch_assoc($result)) {
    $col = 1;
    foreach ($row as $val) {
        $sheet->setCellValueByColumnAndRow($col++, $rowNo, $val);
    }
    $rowNo++;
}

header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="Invoice_Report.xlsx"');

$writer = new Xlsx($spreadsheet);
$writer->save("php://output");
exit;