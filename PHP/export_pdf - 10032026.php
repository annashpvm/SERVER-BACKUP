<?php
//require_once('../../tcpdf/tcpdf.php');// st 
ini_set('memory_limit','512M');
error_reporting(E_ALL);
ini_set('display_errors',1);
require_once('tcpdf/tcpdf.php');
/* ================================
   RECEIVE DATA FROM EXTJS
================================ */

$columns   = json_decode($_POST['columns'], true);
$data      = json_decode($_POST['data'], true);
$paper     = $_POST['paper'] ?? 'A4';

$millname  = $_POST['millname'] ?? '';
$heading   = $_POST['heading'] ?? '';
$fromdate  = $_POST['fromdate'] ?? '';
$todate    = $_POST['todate'] ?? '';

/* ================================
   CUSTOM PDF CLASS
================================ */

class MYPDF extends TCPDF {

    public $millname;
    public $heading;
    public $fromdate;
    public $todate;

    // HEADER (REPEATS EVERY PAGE)
    public function Header() {

        $this->SetFont('helvetica', 'B', 13);
        $this->Cell(0, 6, $this->millname, 0, 1, 'C');
    
        $this->SetFont('helvetica', 'B', 11);
        $this->Cell(0, 6, $this->heading, 0, 1, 'C');
    
        $this->SetFont('helvetica', '', 11);
        $this->Cell(0, 4, "From: {$this->fromdate}   To: {$this->todate}", 0, 1, 'C');
    
        $this->Ln(1); // small spacing only
    }
    // FOOTER
    public function Footer() {
        $this->SetY(-15);
        $this->SetFont('helvetica', '', 9);
        $this->Cell(0, 10,
            'Page '.$this->getAliasNumPage().' of '.$this->getAliasNbPages(),
            0, 0, 'R'
        );
    }
}

/* ================================
   CREATE PDF OBJECT
================================ */

// $pdf = new MYPDF('L', 'mm', $paper, true, 'UTF-8', false);
$pageWidth  = 1000;   // increase width
$pageHeight = 297;   // normal height

$pdf = new MYPDF('L','mm',array($pageWidth,$pageHeight),true,'UTF-8',false);

$pdf->millname = $millname;
$pdf->heading  = $heading;
$pdf->fromdate = $fromdate;
$pdf->todate   = $todate;

$pdf->SetMargins(10, 24, 10);   // IMPORTANT (space for header)
$pdf->SetHeaderMargin(5);
$pdf->SetFooterMargin(10);
$pdf->SetAutoPageBreak(TRUE, 15);

$pdf->AddPage();
$pdf->SetFont('helvetica', '', );

/* ================================
   BUILD TABLE
================================ */

$html = '<table border="1" cellpadding="4" width="100%">';

/* ---- THEAD (REPEATS EVERY PAGE) ---- */
$html .= '<thead>
<tr style="background-color:#eeeeee;font-weight:bold;">';

foreach ($columns as $col) {
    $html .= '<th align="center">'.$col['header'].'</th>';
}

$html .= '</tr>
</thead>
<tbody>';

/* ---- DATA ROWS ---- */
foreach ($data as $row) {

    $isGrand = (isset($row[$columns[0]['dataIndex']]) &&
                $row[$columns[0]['dataIndex']] == 'GRAND TOTAL');

    if ($isGrand) {
        $html .= '<tr style="font-weight:bold;background-color:#f2f2f2;">';
    } else {
        $html .= '<tr>';
    }

    foreach ($columns as $col) {

        $value = $row[$col['dataIndex']] ?? '';

        $align = ($col['align'] == 'right') ? 'right' :
                 (($col['align'] == 'center') ? 'center' : 'left');

        $html .= '<td align="'.$align.'">'.$value.'</td>';
    }

    $html .= '</tr>';
}

$html .= '</tbody></table>';

/* ================================
   PRINT TABLE
================================ */

$pdf->writeHTML($html, true, false, true, false, '');

$pdf->Output('columnar_report.pdf', 'I');
exit;