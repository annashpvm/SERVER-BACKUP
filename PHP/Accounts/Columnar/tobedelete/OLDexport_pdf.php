<?php
error_reporting(0); // 🔴 IMPORTANT: stop notices breaking JSON
ini_set('display_errors', 0);

header('Content-Type: application/json');

require_once __DIR__ . '/tcpdf/tcpdf.php';

/* ===============================
   READ & VALIDATE INPUT
   =============================== */
$columns = isset($_POST['columns']) ? json_decode($_POST['columns'], true) : [];
$data    = isset($_POST['data']) ? json_decode($_POST['data'], true) : [];

if (!$columns || !$data) {
    echo json_encode([
        'success' => false,
        'msg' => 'No data received'
    ]);
    exit;
}

/* ===============================
   CREATE PDF
   =============================== */
$pdf = new TCPDF('L', 'mm', 'A4', true, 'UTF-8', false);
$pdf->SetCreator('ExtJS');
$pdf->SetAuthor('System');
$pdf->SetTitle('Invoice Details');
$pdf->SetMargins(10, 10, 10);
$pdf->AddPage();
$pdf->SetFont('helvetica', '', 9);

/* ===============================
   BUILD TABLE
   =============================== */
$html = '<table border="1" cellpadding="4"><tr>';

foreach ($columns as $col) {
    $html .= '<th><b>' . htmlspecialchars($col['header']) . '</b></th>';
}
$html .= '</tr>';

foreach ($data as $row) {
    $html .= '<tr>';
    foreach ($columns as $col) {
        $val = isset($row[$col['dataIndex']]) ? $row[$col['dataIndex']] : '';
        $html .= '<td>' . htmlspecialchars($val) . '</td>';
    }
    $html .= '</tr>';
}

$html .= '</table>';

$pdf->writeHTML($html, true, false, true, false, '');

/* ===============================
   SAVE FILE
   =============================== */
$dir = __DIR__ . '/exports';
if (!is_dir($dir)) {
    mkdir($dir, 0777, true);
}

$filename = 'invoice_' . date('Ymd_His') . '.pdf';
$filepath = $dir . '/' . $filename;

$pdf->Output($filepath, 'F');

/* ===============================
   RETURN JSON
   =============================== */
echo json_encode([
    'success' => true,
    'file' => 'exports/' . $filename
]);
exit;