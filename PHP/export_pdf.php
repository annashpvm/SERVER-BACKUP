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
        $this->SetFont('helvetica', '', 8);
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
$pageWidth  = 600;   // increase width
$pageHeight = 297;   // normal height

//$pdf = new MYPDF('L','mm',array($pageWidth,$pageHeight),true,'UTF-8',false);
//$pdf = new MYPDF('L','mm','A4',true,'UTF-8',false);
if ($paper == 'Other')
    $pdf = new MYPDF('L','mm',array($pageWidth,$pageHeight),true,'UTF-8',false);
else
    $pdf = new MYPDF('L','mm',$paper,true,'UTF-8',false);
$pdf->millname = $millname;
$pdf->heading  = $heading;
$pdf->fromdate = $fromdate;
$pdf->todate   = $todate;

$pdf->setImageScale(1.25);


$pdf->SetMargins(10, 24, 10);   // IMPORTANT (space for header)
$pdf->SetHeaderMargin(5);
$pdf->SetFooterMargin(10);
$pdf->SetAutoPageBreak(TRUE, 15);

$pdf->AddPage();
$pdf->setCellPadding(2);
$pdf->setCellHeightRatio(1.1);
$pdf->SetFont('helvetica', '',9 );

/* ================================
   BUILD TABLE
================================ */

/* ================================
   BUILD TABLE
================================ */

$colCount = count($columns);

/* Wider column for Ledger Name */
$ledgerWidth = 140;

/* Remaining width calculation */
$totalWidth = 100;   // percentage based
$otherWidth = ($totalWidth - $ledgerWidth) / ($colCount - 1);

$html = '<table border="1" cellpadding="4" width="100%">';
/* ---- THEAD ---- */
$html .= '<thead>
<tr style="background-color:#eeeeee;font-weight:bold;">';

foreach ($columns as $col) {

    if (strtolower($col['header']) == 'ledger name') {
        $html .= '<th width="200" align="center">'.$col['header'].'</th>';
    } else {
        $html .= '<th align="center">'.$col['header'].'</th>';
    }

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
    
        if (strtolower($col['header']) == 'ledger name') {
            $html .= '<td width="200" align="'.$align.'">'.$value.'</td>';
        } else {
            $html .= '<td align="'.$align.'">'.$value.'</td>';
        }
    
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