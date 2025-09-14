<?php
require($_SERVER["DOCUMENT_ROOT"]."/shvpm/dbConn.php");
require($_SERVER["DOCUMENT_ROOT"]."/shvpm/Financials/CashandBank/mysql_table.php");

class PDF1 extends PDF_MySQL_Table {

    function Header() {
        global $fdate, $tdate;
        $this->SetFont('Arial', '', 11);
	$this->SetTextColor(153,0,153);
        $this->Text(73, 10, 'KG DENIM ');
        $this->SetFont('Arial', '', 8);
	$this->SetTextColor(20,0,10);
        $this->Text(165, 8, 'Date :');
        $this->Text(185, 8, date('d-m-Y ', time()));
        $this->Text(15, 16, 'From  :  ' . date('d-m-Y', strtotime($date)));
        $this->SetY(20);
        $columnstitle = array();

        $col = array();
        $col[] = array('text' => 'Voucher', 'width' => '50', 'height' => '6', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '9', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.0', 'linearea' => 'TB');
        $col[] = array('text' => 'Date', 'width' => '50', 'height' => '6', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '9', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.0', 'linearea' => 'TB');
 $col[] = array('text' => 'Party', 'width' => '50', 'height' => '6', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '9', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.0', 'linearea' => 'TB');
 $col[] = array('text' => 'Amt', 'width' => '50', 'height' => '6', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '9', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.0', 'linearea' => 'TB');

        $this->WriteTable($columnstitle);
        parent::Header();
    }

    function Footer() {
        parent::Footer();
    }

    var $B;
    var $I;
    var $U;
    var $HREF;
    var $fontList;
    var $issetfont;
    var $issetcolor;

    function PDF($orientation = 'P', $unit = 'mm', $format = 'A3') {
        $this->FPDF($orientation, $unit, $format);
        $this->B = 0;
        $this->I = 0;
        $this->U = 0;
        $this->HREF = '';

        $this->tableborder = 0;
        $this->tdbegin = false;
        $this->tdwidth = 0;
        $this->tdheight = 0;
        $this->tdalign = "L";
        $this->tdbgcolor = false;

        $this->oldx = 0;
        $this->oldy = 0;

        $this->fontlist = array("arial", "times", "courier", "helvetica", "symbol");
        $this->issetfont = false;
        $this->issetcolor = false;
    }

}

$pdf = new PDF1();
$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->SetY(30);

$columns = array();

$result = mysql_query("select 
  accref_vouno,DATE_FORMAT(accref_voudate,'%d-%m-%Y') AS accref_voudate,led_name,acctran_cramt
from
    acc_ref ref,acc_tran tn,acc_trail tr,acc_ledger_master led
where
    ref.accref_seqno=tn.acctran_accref_seqno and ref.accref_seqno=tr.acctrail_accref_seqno and led.led_code= tn.acctran_led_code and accref_vou_type = 'CR' and accref_finid IN (23) and accref_comp_code IN (1) and tn.acctran_led_code not in(69) and tr.acctrail_led_code not in(69)
ORDER BY ref.accref_voudate");

for ($i = 0; $i < mysql_num_rows($result); $i++) {
    $accrefvouno = mysql_result($result, $i, 'accref_vouno');
    $accrefvoudate = mysql_result($result, $i, 'accref_voudate'); 
    $led = mysql_result($result, $i, 'led_name'); 
    $acctrancramt = mysql_result($result, $i, 'acctran_cramt'); 	

$col = array();

if ($accrefvouno != $accrefvouno1) {
$col[] = array('text' => $accrefvouno, 'width' => '50', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '9', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '255,20,147', 'drawcolor' => '0,0,0', 'linewidth' => '0.0', 'linearea' => '');
$col[] = array('text' => $accrefvoudate, 'width' => '50', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '9', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '75,0,130', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => '');
$col[] = array('text' => '', 'width' => '50', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '9', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '34,139,34', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => '');
$col[] = array('text' => '', 'width' => '50', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '9', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '255,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => '');
$columns[] = $col;  
}
    
$col = array();
$col[] = array('text' => '', 'width' => '50', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '9', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.0', 'linearea' => '');
$col[] = array('text' => '', 'width' => '50', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '9', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => '');
$col[] = array('text' => $led, 'width' => '50', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '9', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.4', 'linearea' => '');
$col[] = array('text' => $acctrancramt, 'width' => '50', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' => '9', 'font_style' => '',
$columns[] = $col;   

 $accrefvouno1 = mysql_result($result, $i, 'accref_vouno');
}
$col = array();
$pdf->WriteTable($columns);
$pdf->Output();
?>
