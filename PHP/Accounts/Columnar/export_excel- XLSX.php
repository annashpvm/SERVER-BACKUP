<?php
require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

$columns = json_decode($_POST['columns'], true);
$data = json_decode($_POST['data'], true);
$fname = $_POST['fname'];

$spreadsheet = new Spreadsheet();
$sheet = $spreadsheet->getActiveSheet();

$colIndex = 1;

/* Header Row */
foreach ($columns as $col) {
    $sheet->setCellValueByColumnAndRow($colIndex, 1, $col['header']);
    $colIndex++;
}

/* Data Rows */
$rowIndex = 2;
foreach ($data as $row) {

    $colIndex = 1;

    foreach ($columns as $col) {

        $value = isset($row[$col['dataIndex']]) ? $row[$col['dataIndex']] : '';

        $sheet->setCellValueByColumnAndRow($colIndex, $rowIndex, $value);

        $colIndex++;
    }

    $rowIndex++;
}

/* Auto size columns */
foreach (range('A', $sheet->getHighestColumn()) as $col) {
    $sheet->getColumnDimension($col)->setAutoSize(true);
}

/* Download */
header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment; filename="'.$fname.'.xlsx"');
header('Cache-Control: max-age=0');

$writer = new Xlsx($spreadsheet);
$writer->save('php://output');
exit;