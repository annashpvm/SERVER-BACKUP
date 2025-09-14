<?php
require('fpdf/fpdf.php');

$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial','B',16);
$pdf->Cell(40,10,'Hello World!',0,1);
$pdf->Ln();
$pdf->Cell(60,10,'Powered by FPDF.',0,1,'C');
//$pdf->Output('D', $_SERVER["DOCUMENT_ROOT"].'/SHVPM/Report/'.'report.pdf');
$pdf->Output('D', 'report.pdf');
?>
