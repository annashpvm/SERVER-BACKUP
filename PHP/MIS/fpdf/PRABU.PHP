<?php
$sql = mysql_query("select * from ledgers , datamain, datatrans where accref_seqno = acctran_accref_seqno and  accref_comp_code = 1
and accref_finid =23 and accref_voudate between '2023-12-01' and '2023-12-31' and  acctran_led_code = led_code
 and acctran_accref_seqno in
(select accref_seqno from datamain, datatrans where accref_seqno = acctran_accref_seqno and  accref_comp_code = 1
and accref_finid =23 and accref_voudate between '2023-12-01' and '2023-12-31' and acctran_led_code = 1756)");

class PDF1 extends PDF_MySQL_Table {
        function AddPage($orientation, $format) {
        //Start a new page
        if($this->state==0)
            $this->Open();
        $family=$this->FontFamily;
        $style=$this->FontStyle.($this->underline ? 'U' : '');
        $size=$this->FontSizePt;
        $lw=$this->LineWidth;
        $dc=$this->DrawColor;
        $fc=$this->FillColor;
        $tc=$this->TextColor;
        $cf=$this->ColorFlag;
        if($this->page>0) {
            //Page footer
            $this->InFooter=true;
            $this->Footer();
            $this->InFooter=false;
            //Close page
            $this->_endpage();
        }
        //Start new page
        $this->_beginpage($orientation,$format);
        //Set line cap style to square
        $this->_out('2 J');
        //Set line width
        $this->LineWidth=$lw;
        $this->_out(sprintf('%.2F w',$lw*$this->k));
        //Set font
        if($family)
            $this->SetFont($family,$style,$size);
        //Set colors
        $this->DrawColor=$dc;
        if($dc!='0 G')
            $this->_out($dc);
        $this->FillColor=$fc;
        if($fc!='0 g')
            $this->_out($fc);
        $this->TextColor=$tc;
        $this->ColorFlag=$cf;
        //Page header
        $this->InHeader=true;
        $this->Header();
        $this->InHeader=false;
        //Restore line width
        if($this->LineWidth!=$lw) {
            $this->LineWidth=$lw;
            $this->_out(sprintf('%.2F w',$lw*$this->k));
        }
        //Restore font
        if($family)
            $this->SetFont($family,$style,$size);
        //Restore colors
        if($this->DrawColor!=$dc) {
            $this->DrawColor=$dc;
            $this->_out($dc);
        }
        if($this->FillColor!=$fc) {
            $this->FillColor=$fc;
            $this->_out($fc);
        }
        $this->TextColor=$tc;
        $this->ColorFlag=$cf;
    }

function Header() {

  global $frmdate,$todate;
$this->SetFont('Times','','8');
$this->Text(235,8,'Print Date :-');
$this->Text(250,8,date('d-m-Y',time()));
$this->Text(265,8,date('h:i:s',time()));

$this->SetY(10);
$columnstit = array();

// header col
 
$col = array();
$col[] = array('text' => 'Ledger Detailed Report', 'width' => '200', 'height' => '5', 'align' => 'C', 'font_name' => 'Arial', 'font_size' =>'15', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.0', 'linearea' => '');
$columnstit[] = $col;
$col = array();
$col[] = array('text' => ' ', 'width' => '200', 'height' => '3', 'align' => 'C', 'font_name' => 'Arial', 'font_size' =>'15', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.0', 'linearea' => '');
$columnstit[] = $col;

$col = array();
$col[] = array('text' => 'Date From :- '.date('d-m-Y',strtotime($frmdate)), 'width' => '100', 'height' => '5', 'align' => 'R', 'font_name' => 'Arial', 'font_size' =>'12', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.0', 'linearea' => '');
        $col[] = array('text' => 'To :- '.date('d-m-Y',strtotime($todate)), 'width' => '100', 'height' => '5', 'align' => 'L', 'font_name' => 'Arial', 'font_size' =>'12', 'font_style' => '', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.0', 'linearea' => '');
$columnstit[] = $col;
$col = array();

 
$this->AlterTable(2,$columnstit);
parent::Header();
}

function Footer()
{

    parent::Footer();
}



    var $B;
    var $I;
    var $U;
    var $HREF;
    var $fontList;
    var $issetfont;
    var $issetcolor;

    function PDF($orientation='L', $unit='mm', $format='A4') {
        //Call parent constructor
        $this->FPDF($orientation,$unit,$format);
        //Initialization
        $this->B=0;
        $this->I=0;
        $this->U=0;
        $this->HREF='';

        $this->tableborder=0;
        $this->tdbegin=false;
        $this->tdwidth=0;
        $this->tdheight=0;
        $this->tdalign="L";
        $this->tdbgcolor=false;

        $this->oldx=0;
        $this->oldy=0;

        $this->fontlist=array("arial","times","courier","helvetica","symbol");
        $this->issetfont=false;
        $this->issetcolor=false;
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

    function CheckPageBreak($h)
    {
        //If the height h would cause an overflow, add a new page immediately
        if($this->GetY()+$h>$this->PageBreakTrigger)
            $this->AddPage('L','A3');
    }


}






 

$pdf=new PDF1();
$pdf->AliasNbPages();

$pdf->AddPage('L','A3');


$pdf->SetY(25);

$ledqry = mysql_query("select * from ledgers where led_code = $ledcode");
$ledarr = mysql_fetch_array($ledqry);

$ledname =$ledarr['led_name'];


 

$columns = array();

 

    $col = array();
    $col[] = array('text' =>'Ledger Name : '.$ledname, 'width' => '185', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '15', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $columns[] = $col;
   
    $col = array();
    $col[] = array('text' =>' ' , 'width' => '185', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '15', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $columns[] = $col;
 
 $col = array();
$col[] = array('text' => 'Date', 'width' => '25', 'height' => '5', 'align' => 'C', 'font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0','drawcolor' => '0,0,0', 'linewidth' => '0.0', 'linearea' => 'LTBR');
$col[] = array('text' => 'Particulars', 'width' => '50', 'height' => '5', 'align' => 'C', 'font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0','drawcolor' => '0,0,0', 'linewidth' => '0.0', 'linearea' => 'LTBR');
$col[] = array('text' => 'Voucher Type', 'width' => '25', 'height' => '5', 'align' => 'C', 'font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.0', 'linearea' => 'LTBR');
$col[] = array('text' => 'Voucher No.', 'width' => '30', 'height' => '5', 'align' => 'C', 'font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0','drawcolor' =>'0,0,0', 'linewidth' => '0.0', 'linearea' => 'LTBR');
$col[] = array('text' => 'GSTIN/UIN', 'width' => '25', 'height' => '5', 'align' => 'C', 'font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.0', 'linearea' => 'LTBR');
$col[] = array('text' => 'Quantity', 'width' => '25', 'height' => '5', 'align' => 'C', 'font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.0', 'linearea' => 'LTBR');
$col[] = array('text' => 'Alt. Units', 'width' => '25', 'height' => '5', 'align' => 'C', 'font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.0', 'linearea' => 'LTBR');
$col[] = array('text' => 'Rate', 'width' => '25', 'height' => '5', 'align' => 'C', 'font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.0', 'linearea' => 'LTBR');
$col[] = array('text' => 'Gross Total', 'width' => '35', 'height' => '5', 'align' => 'C', 'font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.0', 'linearea' => 'LTBR');




$titsql = mysql_query(" select distinct led_name,led_code from ledgers , datamain, datatrans where accref_seqno = acctran_accref_seqno and  accref_comp_code = 1
and accref_finid =23 and accref_voudate between '2023-12-01' and '2023-12-31' and  acctran_led_code = led_code
 and acctran_accref_seqno in
(select accref_seqno from datamain, datatrans where accref_seqno = acctran_accref_seqno and  accref_comp_code = 1
and accref_finid =23 and accref_voudate between '2023-12-01' and '2023-12-31' and acctran_led_code = 1756)  ");

for($z=0;$z<mysql_num_rows($titsql);$z++)
{

   $led_name = mysql_result($titsql, $z, 'led_name');
   
   

$col[] = array('text' => $led_name , 'width' => '50', 'height' => '5', 'align' => 'C', 'font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.0', 'linearea' => 'LTBR');

}
$columns[] = $col;
 
for($i=0;$i<mysql_num_rows($sql);$i++)
{
 $refseq = mysql_result($sql, $i, 'accref_seqno');
 $vouno = mysql_result($sql, $i, 'accref_vouno');
 $voudate = mysql_result($sql, $i, 'accref_voudate');
 $vendor = 'PRIME COAL';
 $voutype  = 'PURCHASE';
 $gst = '';
 $qty= mysql_result($sql, $i, '');
 $altunit='';
 $rate= mysql_result($sql, $i, '');
 $grstot= mysql_result($sql, $i, '');
 
 
 
 
 
 if($refseq != $refseqchk)
 {
  $col = array();
$col[] = array('text' => date('d-m-Y',strtotime($voudate)) , 'width' => '25', 'height' => '5', 'align' => 'C', 'font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0','drawcolor' => '0,0,0', 'linewidth' => '0.0', 'linearea' => 'LTBR');
$col[] = array('text' => $vendor, 'width' => '50', 'height' => '5', 'align' => 'L', 'font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0','drawcolor' => '0,0,0', 'linewidth' => '0.0', 'linearea' => 'LTBR');
$col[] = array('text' => $voutype, 'width' => '25', 'height' => '5', 'align' => 'C', 'font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.0', 'linearea' => 'LTBR');
$col[] = array('text' => $vouno, 'width' => '30', 'height' => '5', 'align' => 'C', 'font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0','drawcolor' =>'0,0,0', 'linewidth' => '0.0', 'linearea' => 'LTBR');
$col[] = array('text' => $gst, 'width' => '25', 'height' => '5', 'align' => 'C', 'font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.0', 'linearea' => 'LTBR');
$col[] = array('text' => $qty, 'width' => '25', 'height' => '5', 'align' => 'C', 'font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.0', 'linearea' => 'LTBR');
$col[] = array('text' => $altunit, 'width' => '25', 'height' => '5', 'align' => 'C', 'font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.0', 'linearea' => 'LTBR');
$col[] = array('text' =>$rate, 'width' => '25', 'height' => '5', 'align' => 'C', 'font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.0', 'linearea' => 'LTBR');
$col[] = array('text' => $grstot, 'width' => '35', 'height' => '5', 'align' => 'C', 'font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.0', 'linearea' => 'LTBR');

for($z=0;$z<mysql_num_rows($titsql);$z++)
{

 $led_code = mysql_result($titsql, $z, 'led_code');
 
 for($k=$i;$k<mysql_num_rows($sql);$k++)
{
 $krefseq = mysql_result($sql, $k, 'accref_seqno');
 $kled_code = mysql_result($sql, $k, 'led_code');
 
 if($krefseq == $krefseq && $kled_code == $led_code)
 {
  $trdbamt = mysql_result($sql, $k, 'acctran_dbamt');
  break;
 }
 
 
 
 }
 
$col[] = array('text' =>$trdbamt , 'width' => '50', 'height' => '5', 'align' => 'C', 'font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' => '255,255,255', 'textcolor' => '0,0,0', 'drawcolor' => '0,0,0', 'linewidth' => '0.0', 'linearea' => 'LTBR');

}

 $columns[] = $col;
 }
 
 $refseqchk = mysql_result($sql, $i, 'accref_seqno');

}


$pdf->AlterTable(2,$columns);


$pdf->Output();

?>
