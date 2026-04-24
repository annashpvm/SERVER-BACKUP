<?php
ini_set('memory_limit','512M');
error_reporting(E_ALL);
ini_set('display_errors',1);

require_once('tcpdf/tcpdf.php');

/* ================================
   RECEIVE DATA FROM EXTJS
================================ */

$columns   = json_decode($_POST['columns'], true);
$data      = json_decode($_POST['data'], true);

if(isset($_POST['paper'])){
    $paper = strtoupper($_POST['paper']);
}elseif(isset($_GET['paper'])){
    $paper = strtoupper($_GET['paper']);
}else{
    $paper = 'A4';
}



if(!in_array($paper, ['A4','LEGAL','A3'])){
    $paper = 'A4';
}



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

    public function Header() {

        $this->SetFont('helvetica','B',13);
        $this->Cell(0,6,$this->millname,0,1,'C');

        $this->SetFont('helvetica','B',11);
        $this->Cell(0,6,$this->heading,0,1,'C');

        $this->SetFont('helvetica','',10);
        $this->Cell(0,5,"From: {$this->fromdate}   To: {$this->todate}",0,1,'C');

        $this->Ln(2);
    }

    public function Footer() {
        $this->SetY(-15);
        $this->SetFont('helvetica','',9);
        $this->Cell(
            0,
            10,
            'Page '.$this->getAliasNumPage().' of '.$this->getAliasNbPages(),
            0,
            0,
            'R'
        );
    }
}

/* ================================
   CREATE PDF
================================ */

//$pdf = new MYPDF('L','mm',$paper,true,'UTF-8',false);

if($paper == 'A3'){   // wide A3

    $pageWidth  =1200;   // mm
    $pageHeight = 297;
    $pdf = new MYPDF('L','mm',array($pageWidth,$pageHeight),true,'UTF-8',false);
}
else{
    $pdf = new MYPDF('L','mm',$paper,true,'UTF-8',false);
}

$pdf->millname = $millname;
$pdf->heading  = $heading;
$pdf->fromdate = $fromdate;
$pdf->todate   = $todate;

$pdf->SetMargins(10,24,10);
$pdf->SetHeaderMargin(5);
$pdf->SetFooterMargin(10);
$pdf->SetAutoPageBreak(TRUE,15);

$pdf->AddPage();

/* Smaller font for wide reports */
if($paper == 'A3'){
    $pdf->SetFont('helvetica','',7);
}else{
    $pdf->SetFont('helvetica','',9);
}

$pdf->setCellPadding(1);

/* ================================
   COLUMN WIDTH CALCULATION
================================ */

$pageWidth = $pdf->getPageWidth() - 20; // minus margins
$colCount  = count($columns);
$colWidth  = $pageWidth / $colCount;

/* ================================
   PRINT TABLE HEADER
================================ */

$pdf->SetFont('helvetica','B',9);

foreach ($columns as $col) {

    $align = 'L';
    if(isset($col['align'])){
        if($col['align']=='right') $align='R';
        if($col['align']=='center') $align='C';
    }

    $pdf->Cell(
        $colWidth,
        7,
        $col['header'],
        1,
        0,
        $align,
        true
    );
}

$pdf->Ln();

/* ================================
   PRINT DATA ROWS
================================ */

$pdf->SetFont('helvetica','',9);

foreach ($data as $row) {

    $isGrand = false;

    if(isset($row[$columns[0]['dataIndex']]) &&
       $row[$columns[0]['dataIndex']] == 'GRAND TOTAL'){
        $isGrand = true;
        $pdf->SetFont('helvetica','B',9);
    }

    foreach ($columns as $col) {

        $value = $row[$col['dataIndex']] ?? '';

        $align = 'L';
        if(isset($col['align'])){
            if($col['align']=='right') $align='R';
            if($col['align']=='center') $align='C';
        }

        $pdf->Cell(
            $colWidth,
            6,
            $value,
            1,
            0,
            $align
        );
    }

    $pdf->Ln();

    if($isGrand){
        $pdf->SetFont('helvetica','',9);
    }
}

/* ================================
   OUTPUT PDF
================================ */

$pdf->Output('columnar_report.pdf','I');
exit;