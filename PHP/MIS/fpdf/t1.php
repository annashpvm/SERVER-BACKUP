<?php
session_start();
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
require_once('mysql_table.php');

class PDF1 extends PDF_MySQL_Table
{
}

$pdf = new PDF1();
$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->SetFont('Times','',12);

/* Header text */
$pdf->SetFont('Times','B',11);
$pdf->Text(70,5,'SRI HARI VENKATESWARA PAPER MILLS PVT LTD');
$pdf->Text(80,10,'SIVAKASI');
$pdf->Text(68,15,'TEST PDF');

$pdf->SetFont('Times','',9);
$pdf->Text(150,8,'Print Date :');
$pdf->Text(170,8,date('d-m-Y'));
$pdf->Text(188,8,date('H:i:s'));

$pdf->SetY(20);

/* Initialize columns array */
$columns = array();

/* Query */
$sql = "SELECT cust_code, cust_ref, cust_add1 FROM massal_customer ORDER BY cust_code";
$result = mysqli_query($conn, $sql);

while ($row = mysqli_fetch_assoc($result)) {

    $col = array();

    $col[] = array(
        'text' => $row['cust_code'],
        'width' => '10',
        'height' => '5',
        'align' => 'C',
        'font_name' => 'Times',
        'font_size' => '11',
        'font_style' => 'B',
        'linearea' => 'LTBR'
    );

    $col[] = array(
        'text' => $row['cust_ref'],
        'width' => '50',
        'height' => '5',
        'align' => 'L',
        'font_name' => 'Times',
        'font_size' => '9',
        'linearea' => 'LTBR'
    );

    $col[] = array(
        'text' => $row['cust_add1'],
        'width' => '100',
        'height' => '5',
        'align' => 'L',
        'font_name' => 'Times',
        'font_size' => '9',
        'linearea' => 'LTBR'
    );

    $columns[] = $col;
}

/* Close DB */
mysqli_close($conn);

/* Render table */
$pdf->AlterTable(3, $columns);

/* Clean output buffer safely */
if (ob_get_length()) {
    ob_end_clean();
}

$pdf->Output();
?>