	<?php
session_start();

require("dbConn.php");


require_once('mysql_table.php');



class PDF1 extends PDF_MySQL_Table
{
  function Header() {

    $this->Image('muruga.png',10,6,10);
    // Arial bold 15

$this->SetFont('Times','','10');
$this->Text(110,8,'Print Date :-');
$this->Text(130,8,date('d-m-Y',time()));
$this->Text(150,8,date('h:i:s',time()));


    $this->SetFont('Arial','B',15);
    // Move to the right
    $this->Cell(80);
    // Title
    $this->Cell(30,10,'SRI HARI VENKATESWARA PAPER MILLS PVT LTD',0,0,'C');
    // Line break
    $this->Ln(20);

    $heading= 'Ledger Details from :';

$this->SetY(20);
$columnstit = array();
$repheader = array();
$col = array();
$col2 = array();
$col[] = array('text' => $heading , 'width' => '200', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' =>'12', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.0', 'linearea' => '');
$columnstit[] = $col;
$col = array();
$this->AlterTable(2,$columnstit);


$col2[] = array('text' =>'Code', 'width' => '10', 'height' => '5', 'align' => 'C','font_name' => 'Times','font_size' => '11', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LTBR');

$col2[] = array('text' =>'Shade', 'width' => '50', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LTBR');

$col2[] = array('text' =>'Rate', 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LTBR');

$repheader[] = $col2;
$col2 = array();
$this->AlterTable(4,$repheader);



  }
  function Footer() {
    // Position at 1.5 cm from bottom
    $this->SetY(-15);
    // Arial italic 8
    $this->SetFont('Arial','I',8);
    // Page number
    $this->Cell(0,10,'Page '.$this->PageNo().'/{nb}',0,0,'C');
  }

    function SetStyle($tag, $enable)
    {
        //Modify style and select corresponding font
        $this->$tag+=($enable ? 1 : -1);
        $style='';
        foreach(array('B','I','U') as $s)
        {
            if($this->$s>0)
                $style.=$s;
        }
        $this->SetFont('',$style);
    }


    function PutLink($URL, $txt)
    {
        //Put a hyperlink
        $this->SetTextColor(0,0,255);
        $this->SetStyle('U',true);
        $this->Write(5,$txt,$URL);
        $this->SetStyle('U',false);
        $this->SetTextColor(0);
    }


}



$pdf=new PDF1();

$pdf->AliasNbPages();
$pdf->AddPage('P','A4');


$pdf->SetFont('Times','',12);

$pdf->Text(65,10,'');
$pdf->SetFont('Times','',9);

$count6 = "select Code,Name,Price from Products ORDER BY Code";

$sqlcnt6 = mysql_query($count6);

while($row3 = mysql_fetch_assoc($sqlcnt6))
{
   

    $desc6= $row3['Code'];
    $per5 = $row3['Name'];
    $Price = $row3['Price'];

$col = array();

$col[] = array('text' =>$desc6, 'width' => '10', 'height' => '5', 'align' => 'C','font_name' => 'Times','font_size' => '11', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LTBR');

$col[] = array('text' =>$per5, 'width' => '50', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LTBR');

$col[] = array('text' =>$Price, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LTBR');

$columns[] = $col;

}

mysql_close();

$pdf->AlterTable(4,$columns);

$pdf->PutLink('www.google.com','CLICK');
ob_end_clean();
$pdf->Output();
?>

