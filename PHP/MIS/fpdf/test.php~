<?php
require('fpdf.php');
require("dbConn.php");


class PDF extends FPDF
{
// Page header
function Header()
{
    // Logo
    $this->Image('logo.jpg',10,6,30);
    // Arial bold 15
    $this->SetFont('Arial','B',15);
    // Move to the right
    $this->Cell(80);
    // Title
    $this->Cell(30,10,'Title',1,0,'C');
    // Line break
    $this->Ln(20);
}

// Page footer
function Footer()
{
    // Position at 1.5 cm from bottom
    $this->SetY(-15);
    // Arial italic 8
    $this->SetFont('Arial','I',8);
    // Page number
    $this->Cell(0,10,'Page '.$this->PageNo().'/{nb}',0,0,'C');
}
}

// Instanciation of inherited class

$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->SetFont('Times','',12);


$count2 = "select rowid,documentreference,curdate() as serverdate from propertdetailsheader a,propertydocuments b
where a.detailid=b.detailid and a.enqno='2'";



/*

$sqlcnt2 = mysql_query($count2);

while ($row = mysql_fetch_assoc($sqlcnt2)) {
  $pdf->Cell(0,10,$row[1],0,1);

//echo $row['documentreference'];
//echo "<br>";
}
*/
$pdf->Output();
?>
