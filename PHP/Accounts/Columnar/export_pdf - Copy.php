<?php
//require_once('/SHVPM/tcpdf/tcpdf.php'); // adju
require_once('../../tcpdf/tcpdf.php');// st path if needed

$millname = $_POST['millname'];
$heading  = $_POST['heading'];
$fromdate = $_POST['fromdate'];
$todate   = $_POST['todate'];


$columns = json_decode($_POST['columns'], true);
$data = json_decode($_POST['data'], true);
$fname = $_POST['fname'];
$paper = isset($_POST['paper']) ? $_POST['paper'] : 'A4';
$pdf = new TCPDF('L', 'mm', '$paper', true, 'UTF-8', false);

$pdf->SetCreator('SHVPM');
$pdf->SetAuthor('SHVPM');
$pdf->SetTitle('Columnar Report');
$pdf->SetFont('helvetica', '', 8);
$pdf->SetMargins(10, 10, 10);
$pdf->AddPage();


$pdf->SetFont('helvetica', 'B', 12);

// Mill Name
$pdf->Cell(0, 8, $millname, 0, 1, 'C');

// Report Heading
$pdf->Cell(0, 8, $heading, 0, 1, 'C');

// Date Range
$pdf->SetFont('helvetica', '', 10);
$pdf->Cell(0, 6, "From: $fromdate  To: $todate", 0, 1, 'C');

$pdf->Ln(5);


/* Build HTML Table */
$html = '<table border="1" cellpadding="4">';

/* Header Row */
$html .= '<tr style="background-color:#cccccc;">';

//foreach ($columns as $col) {
    //$html .= '<th><b>' . $col['header'] . '</b></th>';
//}

foreach ($columns as $col) {

    $width = 5; // default width (mm)

    if (strtoupper($col['dataIndex']) == 'CUST_REF') {
        $width = 20;  // 👈 increase width here
    }

    $html .= '<th width="'.$width.'%"><b>'.$col['header'].'</b></th>';
}
$html .= '</tr>';

/* Data Rows */
foreach ($data as $row) {

    $isGrandTotal = false;
    if (isset($row[$columns[0]['dataIndex']]) &&
        $row[$columns[0]['dataIndex']] == 'GRAND TOTAL') {
        $isGrandTotal = true;
    }

    $html .= '<tr>';

    foreach ($columns as $col) {
        $width = 5;

if (strtoupper($col['dataIndex']) == 'CUST_REF') {
    $width = 20;
}


        $val = isset($row[$col['dataIndex']]) ? $row[$col['dataIndex']] : '';

        $align = !empty($col['isAmount']) ? 'right' : 'left';

        if ($isGrandTotal) {
            $html .= '<td align="'.$align.'"><b>'.$val.'</b></td>';
        } else {
            $html .= '<td width="'.$width.'%" align="'.$align.'">'.$val.'</td>';
        }
    }

    $html .= '</tr>';
}

$html .= '</table>';

$pdf->writeHTML($html, true, false, true, false, '');

$pdf->Output($fname.'.pdf', 'D');
exit;