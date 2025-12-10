<?php
require('fpdf.php');

function indMoney_format($amt)
{
   setlocale(LC_MONETARY, 'en_IN');
   return  money_format('%!i',$amt);
}
function indNumber_format($amt)
{
   setlocale(LC_MONETARY, 'en_IN');
   $tamt =  indMoney_format($amt,0);
    $indnumber = explode(".",$tamt);
    return $indnumber[0];
}
function indformat($amt)
{
$amt1=$amt;
          $dd=  preg_replace("/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/i", "$1,", $amt1);
            return $dd;
}

$words = array('0'=> '' ,'1'=> 'One' ,'2'=> 'Two' ,'3' => 'Three','4' => 'Four','5' => 'Five','6' => 'Six','7' => 'Seven','8' => 'Eight','9' => 'Nine','10' => 'Ten','11' => 'Eleven','12' => 'Twelve','13' => 'Thirteen','14' => 'Fouteen','15' => 'Fifteen','16' => 'Sixteen','17' => 'Seventeen','18' => 'Eighteen','19' => 'Nineteen','20' => 'Twenty','30' => 'Thirty','40' => 'Fourty','50' => 'Fifty','60' => 'Sixty','70' => 'Seventy','80' => 'Eighty','90' => 'Ninty','100' => 'Hundred &','1000' => 'Thousand','100000' => 'Lakh','10000000' => 'Crore');

class PDF_MySQL_Table extends FPDF
{
var $ProcessingTable = false;
var $aCols = array();
var $TableX;
var $HeaderColor;
var $RowColors;
var $ColorIndex;


function titledocs()
{
    $this->SetTitle('Shankar');
}

function Header()
{
	//Print the table header if necessary
	if($this->ProcessingTable)
	//	$this->TableHeader();
        $this->Text($x, $y,'sdfs');
}

function TableHeader()
{
	$this->SetFont('Arial','B',6);
	$this->SetX($this->TableX);
	$fill=!empty($this->HeaderColor);
	if($fill)
		$this->SetFillColor($this->HeaderColor[0],$this->HeaderColor[1],$this->HeaderColor[2]);
	foreach($this->aCols as $col)
		$this->Cell($col['w'],5,$col['c'],1,0,'C',$fill);
	$this->Ln();
}

function Row($data)
{
	$this->SetX($this->TableX);
	$ci=$this->ColorIndex;
	$fill=!empty($this->RowColors[$ci]);
	if($fill)
		$this->SetFillColor($this->RowColors[$ci][0],$this->RowColors[$ci][1],$this->RowColors[$ci][2]);
	foreach($this->aCols as $col)
		$this->Cell($col['w'],5,$data[$col['f']],1,0,$col['a'],$fill);
	$this->Ln();
	$this->ColorIndex=1-$ci;
}

function CalcWidths($width,$align)
{
	//Compute the widths of the columns
	$TableWidth=0;
	foreach($this->aCols as $i=>$col)
	{
		$w=$col['w'];
		if($w == -1)
                        $w=$width/count($this->aCols);
        	elseif(substr($w,-1)=='%')
        		$w=$w/100*$width;
		$this->aCols[$i]['w']=$w;
		$TableWidth+=$w;
	}
	//Compute the abscissa of the table
	if($align == 'C')
		$this->TableX=max(($this->w-$TableWidth)/2,0);
	elseif($align == 'R')
		$this->TableX=max($this->w-$this->rMargin-$TableWidth,0);
	else
		$this->TableX=$this->lMargin;
}

function AddCol($field=-1,$width=-1,$caption='',$align='L')
{
	//Add a column to the table
	if($field==-1)
		$field=count($this->aCols);
	$this->aCols[]=array('f'=>$field,'c'=>$caption,'w'=>$width,'a'=>$align);
}

function Table($query,$prop=array())
{
	//Issue query
	$res=mysql_query($query) or die('Error: '.mysql_error()."<BR>Query: $query");
	//Add all columns if none was specified
	if(count($this->aCols)==0)
	{
		$nb=mysql_num_fields($res);
		for($i=0;$i<$nb;$i++)
			$this->AddCol();
	}
	//Retrieve column names when not specified
	foreach($this->aCols as $i=>$col)
	{
		if($col['c']=='')
		{
			if(is_string($col['f']))
				$this->aCols[$i]['c']=ucfirst($col['f']);
			else
				$this->aCols[$i]['c']=ucfirst(mysql_field_name($res,$col['f']));
		}
	}
	//Handle properties
	if(!isset($prop['width']))
		$prop['width']=0;
	if($prop['width']==0)
		$prop['width']=$this->w-$this->lMargin-$this->rMargin;
	if(!isset($prop['align']))
		$prop['align']='C';
	if(!isset($prop['padding']))
		$prop['padding']=$this->cMargin;
	$cMargin=$this->cMargin;
	$this->cMargin=$prop['padding'];
	if(!isset($prop['HeaderColor']))
		$prop['HeaderColor']=array();
	$this->HeaderColor=$prop['HeaderColor'];
	if(!isset($prop['color1']))
		$prop['color1']=array();
	if(!isset($prop['color2']))
		$prop['color2']=array();
	$this->RowColors=array($prop['color1'],$prop['color2']);
	//Compute column widths
	$this->CalcWidths($prop['width'],$prop['align']);
	//Print header
	$this->TableHeader();
	//Print rows
	$this->SetFont('Arial','',6);
	$this->ColorIndex=0;
	$this->ProcessingTable=true;
	while($row=mysql_fetch_array($res))
		$this->Row($row);
	$this->ProcessingTable=false;
	$this->cMargin=$cMargin;
	$this->aCols=array();
}
//Page footer
function Footer()
{
    //Position at 1.5 cm from bottom
    $this->SetY(-15);
    //Arial italic 8
    $this->SetFont('Arial','I',8);
    //Page number
    $this->Cell(0,10,'Page '.$this->PageNo().'/{nb}',0,0,'C');
}

/********
 *
 */

   // Margins
   var $left = 10;
   var $right = 10;
   var $top = 10;
   var $bottom = 10;

   function WithinPageTable($r,$tcolums,$col)
   {
     //   require($_SERVER["DOCUMENT_ROOT"]."/server/dbConfig.php");

       $rowcnt = 0;

      // go through all colums
      for ($i = 0; $i < sizeof($tcolums); $i++)
      {
         $current_col = $tcolums[$i];
         $height = 0;
         $rowcnt += 1;

         //$rf = sizeof($current_col);

         //$qry = mysql_query("insert into test11 values($rf)");

         // get max height of current col
         $nb=0;

         for($b = 0; $b < sizeof($current_col); $b++)
         {
            // set style
            $this->SetFont($current_col[$b]['font_name'], $current_col[$b]['font_style'], $current_col[$b]['font_size']);
            $color = explode(",", $current_col[$b]['fillcolor']);
            $this->SetFillColor($color[0], $color[1], $color[2]);
            $color = explode(",", $current_col[$b]['textcolor']);
            $this->SetTextColor($color[0], $color[1], $color[2]);
            $color = explode(",", $current_col[$b]['drawcolor']);
            $this->SetDrawColor($color[0], $color[1], $color[2]);
            $this->SetLineWidth($current_col[$b]['linewidth']);

            $nb = max($nb, $this->NbLines($current_col[$b]['width'], $current_col[$b]['text']));
            $height = $current_col[$b]['height'];
         }
         $h = $height * $nb;

         // Issue a page break first if needed
        //  $this->CheckPageBreak($h);

         $this->SetX($r); // Here assigned X co-oridinate point .Begining of the table
         
         // Draw the cells of the row
         for($b = 0; $b < sizeof($current_col); $b++)
         {
            $w = $current_col[$b]['width'];
            $a = $current_col[$b]['align'];

            // Save the current position
            $x = $this->GetX();
            $y = $this->GetY();

            // set style
            $this -> SetFont($current_col[$b]['font_name'], $current_col[$b]['font_style'], $current_col[$b]['font_size']);
            $color = explode(",", $current_col[$b]['fillcolor']);
            $this -> SetFillColor($color[0], $color[1], $color[2]);
            $color = explode(",", $current_col[$b]['textcolor']);
            $this -> SetTextColor($color[0], $color[1], $color[2]);
            $color = explode(",", $current_col[$b]['drawcolor']);
            $this -> SetDrawColor($color[0], $color[1], $color[2]);
            $this -> SetLineWidth($current_col[$b]['linewidth']);

            $color = explode(",", $current_col[$b]['fillcolor']);
            $this->SetDrawColor($color[0], $color[1], $color[2]);


            // Draw Cell Background
            $this -> Rect($x, $y, $w, $h, 'FD');

            $color = explode(",", $current_col[$b]['drawcolor']);
            $this->SetDrawColor($color[0], $color[1], $color[2]);

            // Draw Cell Border
            if (substr_count($current_col[$b]['linearea'], "T") > 0)
            {
               $this->Line($x, $y, $x+$w, $y);
            }

            if (substr_count($current_col[$b]['linearea'], "B") > 0)
            {
               $this -> Line($x, $y+$h, $x+$w, $y+$h);
            }

            if (substr_count($current_col[$b]['linearea'], "L") > 0)
            {
               $this->Line($x, $y, $x, $y+$h);
            }

            if (substr_count($current_col[$b]['linearea'], "R") > 0)
            {
               $this->Line($x+$w, $y, $x+$w, $y+$h);
            }
             

            $ff = $current_col[$b]['image'] ;
            
            if ($current_col[$b]['image'] != '')
            {
                //Put Image on document
                $this->Image('mahalakshmi.jpg',17,$y,25,10);
            }
   
                $this->MultiCell($w, $current_col[$b]['height'], $current_col[$b]['text'], 0, $a, 0);

            // Put the position to the right of the cell
            $this->SetXY($x+$w, $y);
         }

         // Go to the next line
         $this->Ln($h);

         if ($rowcnt == ( $col * 3 ))
         {
            $this->AddPage($this->CurOrientation);
            $rowcnt = 0;
         }
      }
   }



    function no_to_words($no)

    { global $words;

    if($no == 0)

    return ' ';

    else { $novalue='';$highno=$no;$remainno=0;$value=100;$value1=1000;

    while($no>=100) {

    if(($value <= $no) &&($no < $value1)) {

    $novalue=$words["$value"];

    $highno = (int)($no/$value);

    $remainno = $no % $value;

    break;

    }

    $value= $value1;

    $value1 = $value * 100;

    }

    if(array_key_exists("$highno",$words))

    return $words["$highno"]." ".$novalue." ".no_to_words($remainno);

    else
    {
        $unit=$highno%10;

        $ten =(int)($highno/10)*10;

        return $words["$ten"]." ".$words["$unit"]." ".$novalue." ".no_to_words($remainno);
    }

  }
  }

  function AlterTable($r,$tcolums)
  {
      // go through all columns
      for ($i = 0; $i < sizeof($tcolums); $i++)
      {
         $current_col = $tcolums[$i];
         $height = 0;

         // get max height of current col
         $nb=0;
         for($b = 0; $b < sizeof($current_col); $b++)
         {
            // set style
            $this->SetFont($current_col[$b]['font_name'], $current_col[$b]['font_style'], $current_col[$b]['font_size']);
            $color = explode(",", $current_col[$b]['fillcolor']);
            $this->SetFillColor($color[0], $color[1], $color[2]);
            $color = explode(",", $current_col[$b]['textcolor']);
            $this->SetTextColor($color[0], $color[1], $color[2]);
            $color = explode(",", $current_col[$b]['drawcolor']);
            $this->SetDrawColor($color[0], $color[1], $color[2]);
            $this->SetLineWidth($current_col[$b]['linewidth']);

            $nb = max($nb, $this->NbLines($current_col[$b]['width'], $current_col[$b]['text']));
            $height = $current_col[$b]['height'];
         }
         $h=$height*$nb;


         // Issue a page break first if needed
         $this->CheckPageBreak($h);
         $this->SetX($r);

         // Draw the cells of the row
         for($b = 0; $b < sizeof($current_col); $b++)
         {
            $w = $current_col[$b]['width'];
            $a = $current_col[$b]['align'];

            // Save the current position
            $x=$this->GetX();
            $y=$this->GetY();

            // set style
            $this -> SetFont($current_col[$b]['font_name'], $current_col[$b]['font_style'], $current_col[$b]['font_size']);
            $color = explode(",", $current_col[$b]['fillcolor']);
            $this -> SetFillColor($color[0], $color[1], $color[2]);
            $color = explode(",", $current_col[$b]['textcolor']);
            $this -> SetTextColor($color[0], $color[1], $color[2]);
            $color = explode(",", $current_col[$b]['drawcolor']);
            $this -> SetDrawColor($color[0], $color[1], $color[2]);
            $this -> SetLineWidth($current_col[$b]['linewidth']);

            $color = explode(",", $current_col[$b]['fillcolor']);
            $this->SetDrawColor($color[0], $color[1], $color[2]);

            // Draw Cell Background
            $this->Rect($x, $y, $w, $h, 'FD');

            $color = explode(",", $current_col[$b]['drawcolor']);
            $this->SetDrawColor($color[0], $color[1], $color[2]);

            // Draw Cell Border
            if (substr_count($current_col[$b]['linearea'], "T") > 0)
            {
               $this->Line($x, $y, $x+$w, $y);
            }

            if (substr_count($current_col[$b]['linearea'], "B") > 0)
            {
               $this->Line($x, $y+$h, $x+$w, $y+$h);
            }

            if (substr_count($current_col[$b]['linearea'], "L") > 0)
            {
               $this->Line($x, $y, $x, $y+$h);
            }

            if (substr_count($current_col[$b]['linearea'], "R") > 0)
            {
               $this->Line($x+$w, $y, $x+$w, $y+$h);
            }


            // Print the text
            $this->MultiCell($w, $current_col[$b]['height'], $current_col[$b]['text'], 0, $a, 0);

            // Put the position to the right of the cell
            $this->SetXY($x+$w, $y);
         }
         // Go to the next line
         $this->Ln($h);
      }
   }

   // Create Table
   function WriteTable($tcolums)
   {
      // go through all colums
      for ($i = 0; $i < sizeof($tcolums); $i++)
      {
         $current_col = $tcolums[$i];
         $height = 0;

         //get max height of current col
         $nb=0;
         for($b = 0; $b < sizeof($current_col); $b++)
         {
            // set style
            $this->SetFont($current_col[$b]['font_name'], $current_col[$b]['font_style'], $current_col[$b]['font_size']);
            $color = explode(",", $current_col[$b]['fillcolor']);
            $this->SetFillColor($color[0], $color[1], $color[2]);
            $color = explode(",", $current_col[$b]['textcolor']);
            $this->SetTextColor($color[0], $color[1], $color[2]);
            $color = explode(",", $current_col[$b]['drawcolor']);
            $this->SetDrawColor($color[0], $color[1], $color[2]);
            $this->SetLineWidth($current_col[$b]['linewidth']);

            $nb = max($nb, $this->NbLines($current_col[$b]['width'], $current_col[$b]['text']));
            $height = $current_col[$b]['height'];
         }
         $h = $height*$nb;


         // Issue a page break first if needed
         $this->CheckPageBreak($h);

         // Draw the cells of the row
         for($b = 0; $b < sizeof($current_col); $b++)
         {
            $w = $current_col[$b]['width'];
            $a = $current_col[$b]['align'];

            // Save the current position
            $x = $this->GetX();
            $y = $this->GetY();

            // set style
            $this->SetFont($current_col[$b]['font_name'], $current_col[$b]['font_style'], $current_col[$b]['font_size']);
            $color = explode(",", $current_col[$b]['fillcolor']);
            $this->SetFillColor($color[0], $color[1], $color[2]);
            $color = explode(",", $current_col[$b]['textcolor']);
            $this->SetTextColor($color[0], $color[1], $color[2]);
            $color = explode(",", $current_col[$b]['drawcolor']);
            $this->SetDrawColor($color[0], $color[1], $color[2]);
            $this->SetLineWidth($current_col[$b]['linewidth']);

            $color = explode(",", $current_col[$b]['fillcolor']);
            $this->SetDrawColor($color[0], $color[1], $color[2]);


            // Draw Cell Background
            $this->Rect($x, $y, $w, $h, 'FD');

            $color = explode(",", $current_col[$b]['drawcolor']);
            $this->SetDrawColor($color[0], $color[1], $color[2]);

            // Draw Cell Border
            if (substr_count($current_col[$b]['linearea'], "T") > 0)
            {
               $this->Line($x, $y, $x+$w, $y);
            }

            if (substr_count($current_col[$b]['linearea'], "B") > 0)
            {
               $this->Line($x, $y+$h, $x+$w, $y+$h);
            }

            if (substr_count($current_col[$b]['linearea'], "L") > 0)
            {
               $this->Line($x, $y, $x, $y+$h);
            }

            if (substr_count($current_col[$b]['linearea'], "R") > 0)
            {
               $this->Line($x+$w, $y, $x+$w, $y+$h);
            }

            // Print the text
            $this->MultiCell($w, $current_col[$b]['height'], $current_col[$b]['text'], 0, $a, 0);

            // Put the position to the right of the cell
            $this->SetXY($x+$w, $y);
         }

         // Go to the next line
         $this->Ln($h);
      }
   }


   // If the height h would cause an overflow, add a new page immediately
   function CheckPageBreak($h)
   {
      if($this->GetY()+$h > $this->PageBreakTrigger)
         $this->AddPage($this->CurOrientation,$this->CurPageFormat );

   }


   // Computes the number of lines a MultiCell of width w will take

   function NbLines($w, $txt)
   {
      $cw=&$this->CurrentFont['cw'];
      if($w==0)
         $w=$this->w-$this->rMargin-$this->x;
      $wmax=($w-2*$this->cMargin)*1000/$this->FontSize;
      $s=str_replace("\r", '', $txt);
      $nb=strlen($s);
      if($nb>0 and $s[$nb-1]=="\n")
         $nb--;
      $sep=-1;
      $i=0;
      $j=0;
      $l=0;
      $nl=1;
      while($i<$nb)
      {
         $c=$s[$i];
         if($c=="\n")
         {
            $i++;
            $sep=-1;
            $j=$i;
            $l=0;
            $nl++;
            continue;
         }
         if($c==' ')
            $sep=$i;
         $l+=$cw[$c];
         if($l>$wmax)
         {
            if($sep==-1)
            {
               if($i==$j)
                  $i++;
            }
            else
               $i=$sep+1;
            $sep=-1;
            $j=$i;
            $l=0;
            $nl++;
         }
         else
            $i++;
      }
      return $nl;
   }
}
?>
