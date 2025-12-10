	<?php
session_start();

require("dbConn.php");


require_once('mysql_table.php');



class PDF1 extends PDF_MySQL_Table
{
/*
function Header()
{

$this->AlterTable(4,$columns);
$this->SetY(15);
 	parent::Header();
}
function Footer()
{
         parent::Footer();
}
*/
}



$pdf=new PDF1();
$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->SetFont('Times','',12);

$pdf->Text(65,10,'');
$pdf->SetFont('Times','',9);
$pdf->Text(150,8,'Print Date :');
$pdf->Text(170,8,date('d-m-Y'));
$pdf->Text(188,8,date('h:i:s',time()));
$pdf->SetFont('Times','B',11);
$pdf->Text(70,5,'SRI HARI VENKATESWARA PAPER MILLS PVT LTD ');
$pdf->Text(80,10,'SIVAKASI');
$pdf->Text(68,15,'TEST PDF ');


$pdf->SetY(20);

$count6 = "select * from massal_customer ORDER BY cust_code";

$sqlcnt6 = mysql_query($count6);

while($row3 = mysql_fetch_assoc($sqlcnt6))
{
   

    $desc6= $row3['cust_code'];
    $per5 = $row3['cust_ref'];
    $Price = $row3['cust_add1'];

$col = array();

$col[] = array('text' =>$desc6, 'width' => '10', 'height' => '5', 'align' => 'C','font_name' => 'Times','font_size' => '11', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LTBR');

$col[] = array('text' =>$per5, 'width' => '50', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LTBR');

$col[] = array('text' =>$Price, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LTBR');

$columns[] = $col;

}

mysql_close();

$pdf->AlterTable(4,$columns);
ob_end_clean();
$pdf->Output();
?>

