<?php
session_start();
require("dbConn.php");
require_once('mysql_table.php');

$enqid=2;
$serverdate=date('Y-m-d');

class PDF1 extends PDF_MySQL_Table
{
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
}

function getIndianCurrency(float $number)
{
    $decimal = round($number - ($no = floor($number)), 2) * 100;
    $hundred = null;
    $digits_length = strlen($no);
    $i = 0;
    $str = array();
    $words = array(0 => '', 1 => 'One', 2 => 'Two',
        3 => 'Three', 4 => 'Four', 5 => 'Five', 6 => 'Six',
        7 => 'Seven', 8 => 'Eight', 9 => 'Nine',
        10 => 'Ten', 11 => 'Eleven', 12 => 'Twelve',
        13 => 'Thirteen', 14 => 'Fourteen', 15 => 'Fifteen',
        16 => 'Sixteen', 17 => 'Seventeen', 18 => 'Eighteen',
        19 => 'Nineteen', 20 => 'Twenty', 30 => 'Thirty',
        40 => 'Forty', 50 => 'Fifty', 60 => 'Sixty',
        70 => 'Seventy', 80 => 'Eighty', 90 => 'Ninety');
    $digits = array('', 'Hundred','Thousand','Lakh', 'Crore');
    while( $i < $digits_length ) {
        $divider = ($i == 2) ? 10 : 100;
        $number = floor($no % $divider);
        $no = floor($no / $divider);
        $i += $divider == 10 ? 1 : 2;
        if ($number) {
            $plural = (($counter = count($str)) && $number > 9) ? 's' : null;
            $hundred = ($counter == 1 && $str[0]) ? ' and ' : null;
            $str [] = ($number < 21) ? $words[$number].' '. $digits[$counter]. $plural.' '.$hundred:$words[floor($number / 10) * 10].' '.$words[$number % 10]. ' '.$digits[$counter].$plural.' '.$hundred;
        } else $str[] = null;
    }
    $Rupees = implode('', array_reverse($str));
    $paise = ($decimal > 0) ? "." . ($words[$decimal / 10] . " " . $words[$decimal % 10]) . ' Paise' : '';
    return ($Rupees ? $Rupees . 'Rupees ' : '') . $paise;
}


$pdf=new PDF1();
$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->SetFont('Times','',12);

$pdf->Text(65,10,'');
$pdf->SetFont('Times','',9);
$pdf->Text(165,8,'Print Date :');
$pdf->Text(178,8,date('d-m-Y'));
$pdf->Text(192,8,date('h:i:s',time()));
$pdf->SetFont('Times','',11);
$pdf->Text(70,5,'Details: '.$txttodate);
$pdf->Text(70,20,$txtgrpname);

$pdf->SetY(15);


$columns = array();

$count2 = "select rowid,documentreference,curdate() as serverdate from propertdetailsheader a,propertydocuments b
where a.detailid=b.detailid and a.enqno='$enqid'";

$sqlcnt2 = mysql_query($conn,$count2);


while ($row = mysql_fetch_assoc($sqlcnt2)) {
switch($row[0]){
case 4:
$doc1=$row[1];
break;
case 5:
$doc2=$row[1];
break;
case 6:
$doc3=$row[1];
break;
case 7:
$doc4=$row[1];
break;
case 8:
$doc5=$row[1];
break;
case 9:
$doc6=$row[1];
break;

default:
break;
}
}

$count = "select a.*,b.*,curdate() as serverdate,c.declaration from propertdetailsheader a,propertydocuments b,tblvaluerdeclaration c
where a.detailid=b.detailid and a.enqno='$enqid' and a.valuerid=c.valuerid ";

$sqlcnt = mysql_query($conn,$count);

$row = mysql_fetch_assoc($sqlcnt);

$declaration=$row['declaration'];

$count11 = "select a.*,b.*,curdate() as serverdate,c.declaration,declaration1,declaration2,declaration3 from propertdetailsheader a,propertydocuments b,tblvaluerdeclarationnew c
where a.detailid=b.detailid and a.enqno='$enqid' and a.valuerid=c.valuerid ";

$sqlcnt11 = mysql_query($conn,$count11);

$row11 = mysql_fetch_assoc($sqlcnt11);

$declaration11=$row11['declaration'];
$declarationnew1=$row11['declaration1'];
$declarationnew2=$row11['declaration2'];
$declarationnew3=$row11['declaration3'];

$valuationpurpose=$row['valuationpurpose'];
$insdate1=date_create($row['insdate']);
$insdate=date_format($insdate1,'d-m-Y');
$valdate1=date_create($row['valdate']);
$valdate=date_format($valdate1,'d-m-Y');

$serverdate1=date_create($row['serverdate']);
$serverdate=date_format($serverdate1,'d-m-Y');

$ownername=$row['ownername'];

$addline1=$row['address'];
$addline2=$row['addline2'];
$addline3=$row['addline3'];
$city=$row['city'];
$state=$row['state']; 
$phoneno =$row['phoneno'];
$PropDescription =$row['PropDescription'];

$prolocation =$row['prolocation'];
$plot_serveyno=$row['plot_serveyno'];
$doorno =$row['doorno'];
$tsno_village=$row['tsno_village'];
$ward_taluka=$row['ward_taluka'];
$mandal_district=$row['mandal_district'];     
 

$map_plan_issdate1=date_create($row['map_plan_issdate']);
$map_plan_issdate=date_format($map_plan_issdate1,'d-m-Y');

$map_plan_issby=$row['map_plan_issby'];
$map_plan_comments=$row['map_plan_comments'];
$postaddress=$row['postaddress'];
$city_town=$row['city_town'];
$dist_corp_mun=$row['dist_corp_mun'];

if($row['areatype']=='R'){
$areatyper='Yes';
}
else {
$areatyper='No';
}

if($row['areatype']=='C'){
$areatypec='Yes';
}
else {
$areatypec='No';
}

if($row['areatype']=='I'){
$areatypeI='Yes';
}
else {
$areatypeI='No';
}

if($row['areatype']=='A'){
$areatypem='Yes';
}
else {
$areatypem='No';
}


if($row['areatype']=='R')
$areatypenew='Residential Area ';
else if($row['areatype']=='C')
$areatypenew='Commercial Area ';
else if($row['areatype']=='I')
$areatypenew='Industrial Area ';
else
$areatypenew='Mixed';



if($row['arenature']=='H')
$arenature='High ';
else if($row['arenature']=='M')
$arenature='Middle  ';
else if($row['arenature']=='P')
$arenature='Poor ';
  

if($row['locationtype']=='C')
$locationtype='Corporation ';
else if($row['locationtype']=='M')
$locationtype='Municipality  ';
else if($row['locationtype']=='V')
$locationtype='Village Panjayat  ';
else if($row['locationtype']=='G')
$locationtype='Greater Corporation  ';
else if($row['locationtype']=='T')
$locationtype='Town Panjayat  ';

if($row['areacategory']=='U')
$areacategory='Urban ';
else if($row['areacategory']=='S')
$areacategory='Semi Urban ';
else if($row['areacategory']=='R')
$areacategory='RURAL ';

$lattitude=$row['lattitude'];
$longitude=$row['longitude'];

$lattilong=$lattitude.','.$longitude;
$extlandpf=$row['land_extent']."+"."PF"." + ".$row['undividentshare'];
$extland=$row['land_extent'];
$net_property_value=$row['net_property_value'];

$tssfno =$tsno_village."+".$SF_no."+".$doorno;
$doorscn=$doorno."+".$street_address."+".$postaddress;
$block=$row['block']; 
$SF_no=$row['SF_no']; 
$street_address=$row['street_address']; 
$buildser=$row['buildser'];
$adopcomrate=$row['adopcomrate'];
$landdev=$row['landdev'];
$depbuilrate=$row['depbuilrate'];
$agebuild=$row['agebuild'];
$lifebuild=$row['remlife'];
$depper=$row['depper'];
$depvalue=$row['depvalue'];


$totcomrate=$row['totcomrate'];
$net_property_value=$row['net_property_value'];
$realize_value=$row['realize_value'];
$forced_value=$row['forced_value'];

$fairwords=getIndianCurrency($net_property_value * 100000);

$col[] = array('text' =>'VALUATION REPORT (IN RESPECT OF Apartment)', 'width' => '200', 'height' => '5', 'align' => 'C','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');

$columns[] = $col;



$col = array();
$col[] = array('text' =>'I .', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');

$col[] = array('text' =>'GENERAL', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'', 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;



 $col = array();
$col[] = array('text' =>'1', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');

$col[] = array('text' =>'Purpose for which the valuation is made', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$valuationpurpose, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'2', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRT');

$col[] = array('text' =>'a) Date of inspection', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRT');
$col[] = array('text' =>$insdate, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRT');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');

$col[] = array('text' =>'b) Date on which the valuation is made', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>$valdate, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');

$col[] = array('text' =>'c) Date of Report', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>$serverdate, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'3', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');

$col[] = array('text' =>'List of documents produced for perusal', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'', 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;

$count3 = "select documentname,documentreference,curdate() as serverdate from propertdetailsheader a,propertydocuments b
where a.detailid=b.detailid and a.enqno='$enqid'";

$sqlcnt3 = mysql_query($conn,$count3);

while($row1 = mysql_fetch_assoc($sqlcnt3))
{
   

    $docname = $row1['documentname'];
    $docref = $row1['documentreference'];
    
$col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');

$col[] = array('text' =>$docname, 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>$docref, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$columns[] = $col;
} 



 /*$col = array();
$col[] = array('text' =>'3', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');

$col[] = array('text' =>'i)                 Photo copy of Sale deed No. ', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$doc1, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'ii)               Photo copy of Sale Agreement dt.', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$doc2, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');

$col[] = array('text' =>'iii)             Photo copy of Building Approval Plan', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$doc3, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');

$col[] = array('text' =>'iv)              Photo copy of Property Tax Receipt ', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$doc4, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
*/



 $col = array();
$col[] = array('text' =>'4', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
   
$col[] = array('text' =>'Name of the owner(s) and his / their address (es) With Phone no. (details of share of each owner in case of joint ownership)', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$addline1, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'5', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
   
$col[] = array('text' =>'Brief description of the property', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$PropDescription, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;


 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');

$col[] = array('text' =>'Location of property', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>$prolocation, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');

$col[] = array('text' =>'Plot No. / Survey No.', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>$plot_serveyno, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$columns[] = $col;


 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');

$col[] = array('text' =>'Door No.', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>$doorno, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');

$col[] = array('text' =>'T. S. No. / Village', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>$tsno_village, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'6', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');

$col[] = array('text' =>'Ward / Taluka', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$ward_taluka, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');

$col[] = array('text' =>'Mandal / District', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$mandal_district, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');

$col[] = array('text' =>'Date of issue and validity of layout of Approved map / plan', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$map_plan_issdate, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;


 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');

$col[] = array('text' =>'Approved map / plan issuing authority', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$map_plan_issby, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');

$col[] = array('text' =>'Whether genuineness or authenticity of approved map / plan is verified  Any other comments by our empanelled valuers on authentic of approved plan', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$map_plan_comments, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;

 
$col = array();
$col[] = array('text' =>'7', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');

$col[] = array('text' =>'Postal address of the property', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$postaddress, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');

$col[] = array('text' =>'City / Town', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>$city_town, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');

$col[] = array('text' =>'Residential Area', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>$areatyper, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'8', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRT');

$col[] = array('text' =>'Commercial Area', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRT');
$col[] = array('text' =>$areatypec, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRT');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>'Industrial Area', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>$areatypeI, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$columns[] = $col;


 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');

$col[] = array('text' =>'Mixed', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>$areatypem, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$columns[] = $col;



 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');

$col[] = array('text' =>'Classification of the area', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>$areacategory, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'9', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRT');

$col[] = array('text' =>'i) High / Middle / Poor', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRT');
$col[] = array('text' =>$arenature, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRT');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');

$col[] = array('text' =>'ii) Urban / Semi Urban / Rural', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>$locationtype, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$columns[] = $col;


    $col = array();
$col[] = array('text' =>'10', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Coming under Corporation limit / Village
Panchayat / Municipality', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');

$col[] = array('text' =>$dist_corp_mun, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
                       

    $col = array();
$col[] = array('text' =>'11', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');

$col[] = array('text' =>'Whether covered under any State / Central Govt. enactments (e.g. Urban Land Ceiling Act) or notified under agency area / scheduled area / cantonment area', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$label36, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;




$col = array();
$col[] = array('text' =>'12', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Boundaries of the property', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'', 'width' => '50', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;

$count7="select SetNo,side,Deed_boundary,Plan_boundary,Actual_boundary,boundarytype from propertyboundarydetails  WHERE EnqNo ='$enqid' and side in ('North','South','East','West')";

$sqlcnt7 = mysql_query($conn,$count7);  

while($row7 = mysql_fetch_assoc($sqlcnt7))
{ 
    $SetNo = $row7['SetNo'];
    $side = $row7['side'];
    $Deed_boundary = $row7['Deed_boundary'];
    $Plan_boundary = $row7['Plan_boundary'];
    $Actual_boundary = $row7['Actual_boundary'];
    $boundarytype = $row7['boundarytype'];


	if($SetNo!=$SetNochk)
	{
     $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Schedule - '.$SetNo, 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'', 'width' => '50', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;

$col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');

$col[] = array('text' =>'Boundaries', 'width' => '20', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Sales Deed', 'width' => '20', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');

$col[] = array('text' =>'Plan', 'width' => '30', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Actual', 'width' => '30', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'', 'width' => '20', 'height' => '5', 'align' => 'R','font_name' => 'Times','font_size' => '8.5', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
	}
	$SetNochk=$row7['SetNo'];

    
    $col = array();
    $col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    
    $col[] = array('text' =>$side.'-'.$boundarytype, 'width' => '20', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>$Deed_boundary, 'width' => '20', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    
    $col[] = array('text' =>$Plan_boundary, 'width' => '30', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>$Actual_boundary, 'width' => '30', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>'', 'width' => '20', 'height' => '5', 'align' => 'R','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $columns[] = $col;
} 

$col = array();
$col[] = array('text' =>'11', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Dimension of the property', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'', 'width' => '50', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;


$count8="select SetNo,side,Deed_Dimension,Plan_Dimension,Actual_Dimension,dimensiontype from propertyboundarydetails  WHERE EnqNo ='$enqid'";

$sqlcnt8 = mysql_query($conn,$count8);  

while($row8 = mysql_fetch_assoc($sqlcnt8))
{ 
    $SetNo1 = $row8['SetNo'];
    $side = $row8['side'];
    $Deed_Dimension = $row8['Deed_Dimension'];
    $Plan_Dimension = $row8['Plan_Dimension'];
    $Actual_Dimension = $row8['Actual_Dimension'];
    $dimensiontype= $row8['dimensiontype'];
 
	if($SetNo1!=$SetNochk1)
	{

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Schedule - '.$SetNo1.'-'.$dimensiontype, 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'', 'width' => '50', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');


$columns[] = $col;

$col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');

$col[] = array('text' =>'Boundaries', 'width' => '20', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Sales Deed', 'width' => '20', 'height' => '5', 'align' => 'R','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');

$col[] = array('text' =>'Plan', 'width' => '30', 'height' => '5', 'align' => 'R','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Actual', 'width' => '30', 'height' => '5', 'align' => 'R','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'', 'width' => '20', 'height' => '5', 'align' => 'R','font_name' => 'Times','font_size' => '8.5', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
}
$SetNochk1 = $row8['SetNo'];

    
    $col = array();
    $col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    
    $col[] = array('text' =>$side, 'width' => '20', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>$Deed_Dimension, 'width' => '20', 'height' => '5', 'align' => 'R','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    
    $col[] = array('text' =>$Plan_Dimension, 'width' => '30', 'height' => '5', 'align' => 'R','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>$Actual_Dimension, 'width' => '30', 'height' => '5', 'align' => 'R','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>'', 'width' => '20', 'height' => '5', 'align' => 'R','font_name' => 'Times','font_size' => '8.5', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $columns[] = $col;
} 
$col = array();
$col[] = array('text' =>'', 'width' => '130', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'T');

$columns[] = $col;



 $col = array();
$col[] = array('text' =>'14', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Extent of the site', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$extlandpf, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 
$pdetails123 = "SELECT * FROM apartmentdetail7 where enqid='$enqid'";
$querypdetails123 = mysql_query($conn,$pdetails123);
$detailsproper123 = mysql_fetch_assoc($querypdetails123);
$floorcon=$detailsproper123['floorcon'];
$doorno=$detailsproper123['doorno'];
$occupaidarea=$detailsproper123['occupaidarea'];
$plintharea=$detailsproper123['plintharea'];
$carpetarea=$detailsproper123['carpetarea'];
$classofcommunity=$detailsproper123['classofcommunity'];
$monthrent=$detailsproper123['monthrent'];
$undivededarea=$detailsproper123['undivededarea'];

 $col = array();
$col[] = array('text' =>'15', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Latitude, Longitude & Co-ordinates of flat', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$lattilong, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'16', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Extent of the site considered for valuation (least of 13 A & 13 B)', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$extland, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 
 $col = array();
$col[] = array('text' =>'17', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Whether occupied by the owner / tenant?
If occupied by tenant, since how long? Rent received per month.', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$occupaidarea, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 
$col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'', 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;



 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'APARTMENT BUILDING ', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$label85, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 
$col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'', 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'1', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Nature of the Apartment ', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$label85, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'2', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Location ', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$label86, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 
 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'T. S. No. / S.F. No./ Door No ', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$tssfno, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Block No.', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$block, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Ward No.', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$ward_taluka, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Village/ Municipality / Corporation', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$locationtype, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Door No., Street or Road (Pin Code)', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$doorscn, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 

 $col = array();
$col[] = array('text' =>'3', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Description of the locality Residential / Commercial / Mixed', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$areatypenew, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;


$pdetails1 = "SELECT * FROM apartmentdetail1 where enqid='$enqid'";
$querypdetails1 = mysql_query($conn,$pdetails1);
$detailsproper1 = mysql_fetch_assoc($querypdetails1);
$noofdewling=$detailsproper1['noofdewling'];
$nooffloor=$detailsproper1['nooffloor'];

$pdetails = "SELECT * FROM apartmentdetail6 where enqid='$enqid'";
$querypdetails = mysql_query($conn,$pdetails);
$detailsproper = mysql_fetch_assoc($querypdetails);
$yearofcon=$detailsproper['yearofcon'];
$struct=$detailsproper['struct'];
$appearance=$detailsproper['appearance'];
$qualityofcon=$detailsproper['qualityofcon'];
$mainbuilding=$detailsproper['mainbuilding'];


 $col = array();
$col[] = array('text' =>'4', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Year of Construction', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$yearofcon, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 

 $col = array();
$col[] = array('text' =>'5', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Number of Floors ', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$nooffloor, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'6', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Type of Structure', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$struct, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'7', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');

$col[] = array('text' =>'Number of Dwelling units in the building ', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$noofdewling, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 



 $col = array();
$col[] = array('text' =>'8', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');

$col[] = array('text' =>'Quality of Construction', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$qualityofcon, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;



 $col = array();
$col[] = array('text' =>'9', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Appearance of the Building', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$appearance, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 

 $col = array();
$col[] = array('text' =>'10', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');

$col[] = array('text' =>'Maintenance of the Building', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$mainbuilding, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;



 $col = array();
$col[] = array('text' =>'11', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');

$col[] = array('text' =>'Facilities Available ', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$label100, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;


$pdetails12 = "SELECT * FROM apartmentdetail5 where enqid='$enqid'";
$querypdetails12 = mysql_query($conn,$pdetails12);
$detailsproper12 = mysql_fetch_assoc($querypdetails12);
$Liftflag=$detailsproper12['liftcom'];
$Waterflag=$detailsproper12['protectwater'];
$seweage=$detailsproper12['seweage'];
$undersewerage=$detailsproper12['undersewerage'];
$portablewater=$detailsproper12['portablewater'];
$drainage=$detailsproper12['drainage'];
$reservecal=$detailsproper12['reservecal'];
$compoundwallflag=$detailsproper12['commwall'];
$pavermentbuild=$detailsproper12['pavermentbuild'];

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');

$col[] = array('text' =>'Lift', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>$Liftflag, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>'Protected Water Supply', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>$Waterflag, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$columns[] = $col;
 

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');

$col[] = array('text' =>'Underground Sewerage', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>$undersewerage, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>'Car Parking - Open/ Covered', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>$reservecal, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$columns[] = $col;
 
 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>'Is Compound wall existing?', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>$compoundwallflag, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>'Is pavement laid around the Building', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>$pavermentbuild, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$columns[] = $col;
 
$col = array();
$col[] = array('text' =>'III', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Flat', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'', 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;



 $col = array();
$col[] = array('text' =>'1', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'The floor on which the flat is situated', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$floorcon, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'2', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Door No. of the flat', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$doorno, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'3', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Specifications of the flat', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$label163, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 

$doors=$detailsproper['doors'];
$windows=$detailsproper['windows'];
$roof=$detailsproper['roof'];
$floooring=$detailsproper['floooring'];
$finishing=$detailsproper['finishing'];
$fittings=$detailsproper['fittings'];

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Roof', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRT');
$col[] = array('text' =>$roof, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRT');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>'Flooring', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>$floooring, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>'Doors', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>$doors, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$columns[] = $col;
 

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>'Windows', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>$windows, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$columns[] = $col;
 
 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>'Fittings', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>$fittings, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$columns[] = $col;
 

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>'Finishing', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>$finishing, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$columns[] = $col;


$housetax=$detailsproper123['housetax'];
$taxpaid=$detailsproper123['taxpaid'];
$taxamt=$detailsproper123['taxamt'];
 

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>'House Tax', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>$housetax, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$columns[] =$col;


 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>'Assessment No.', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>$housetax, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$columns[] = $col;


 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>'Tax paid in the name of', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$col[] = array('text' =>$taxpaid, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LR');
$columns[] = $col;
 
 $col = array();
$col[] = array('text' =>'4', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Tax amount', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$taxamt, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 

$electserve=$detailsproper123['electserve'];
$metercard=$detailsproper123['metercard'];

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Electricity Service Connection no.', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$electserve, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'5', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Meter Card is in the name of', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$metercard, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 

 $col = array();
$col[] = array('text' =>'6', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'How is the maintenance of the flat?', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$label176, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 

 $col = array();
$col[] = array('text' =>'7', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Sale Deed executed in the name of', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$label177, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 

 $col = array();
$col[] = array('text' =>'8', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'What is the undivided area of land as per Sale Deed?', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$undivededarea, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 

 $col = array();
$col[] = array('text' =>'9', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'What is the plinth area of the flat?', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$plintharea, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'10', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'What is the floor space index (app.)', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$label180, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 

 $col = array();
$col[] = array('text' =>'11', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'What is the Carpet Area of the flat? ', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$carpetarea, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'12', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Is it Posh/ I class / Medium / Ordinary?', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$classofcommunity, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 

 $col = array();
$col[] = array('text' =>'13', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Is it being used for Residential or Commercial purpose?', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$areatypenew, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 

 $col = array();
$col[] = array('text' =>'14', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Is it Owner-occupied or let out?', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$occupaidarea, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 

 $col = array();
$col[] = array('text' =>'15', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'If rented, what is the monthly rent?', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$monthrent, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 

$pdetails125 = "SELECT * FROM apartmentdetail8 where enqid='$enqid'";
$querypdetails125 = mysql_query($conn,$pdetails125);
$detailsproper125 = mysql_fetch_assoc($querypdetails125);
$markett=$detailsproper125['markett'];
$posstivefact=$detailsproper125['posstivefact'];
$negativefact=$detailsproper125['negativefact'];

 $col = array();
$col[] = array('text' =>'IV', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'MARKETABILITY', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'', 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 
 $col = array();
$col[] = array('text' =>'1', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'How is the marketability?', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$markett, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 
 $col = array();
$col[] = array('text' =>'2', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'What are the factors favoring for an extra Potential Value?', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$posstivefact, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 
 
 $col = array();
$col[] = array('text' =>'3', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Any negative factors are observed which affect the market value in general?', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$negativefact, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;



 $col = array();
$col[] = array('text' =>'V', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Rate', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'', 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 

 $col = array();
$col[] = array('text' =>'1', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'After analyzing the comparable sale instances, what is the composite rate for a similar flat with same specifications in the adjoining locality? - (Along with details /reference of at-least two latest deals / transactions with respect to adjacent properties in the areas)', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$adopcomrate, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 
 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Assuming it is a new construction, what is the adopted basic composite rate of the flat under valuation after comparing with the specifications and other factors with the flat under comparison (give details).', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$label195, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'2', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Break - up for the rate', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$label196, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;

  $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Building + Services + Amenities', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$buildser, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Land + Development  + Gated Community', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$landdev, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 
 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>' Guideline rate obtained from the Registrars office for land (an evidence thereof to be enclosed)', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$label200, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'VI', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'COMPOSITE RATE ADOPTED AFTER DEPRECIATION', 'width' => '170', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;


 $col = array();
$col[] = array('text' =>'a.', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Depreciated building rate', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$depbuilrate, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 
 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Replacement cost of flat with Services {V(3)I }', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$label203, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Age of the building', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$agebuild, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;


 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Life of the building estimated', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$lifebuild, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 
 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Depreciation percentage assuming the salvage value as 10 Percentage ', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$depper, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Depreciated Rate of the building', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$depvalue, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 
 $col = array();
$col[] = array('text' =>'b.', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Total composite rate arrived for valuation', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$label208, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Depreciated building rate VI (a)', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$depbuilrate, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Rate for Land & other V (3)ii', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$landdev, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
 

 $col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>'Total Composite Rate', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$col[] = array('text' =>$totcomrate, 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;

 $col = array();
$col[] = array('text' =>'', 'width' => '180', 'height' => '25', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
$columns[] = $col;

    $col = array();
  
    $col[] = array('text' =>'Details of Valuation', 'width' => '140', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    
    $columns[] = $col;


$col = array();
   
    $col[] = array('text' =>'Description', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>'Qty', 'width' => '20', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>'Rate per unit(Rs)', 'width' => '20', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    
    $col[] = array('text' =>'Estimated Value Rs. in Lakhs', 'width' => '30', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    
    $columns[] = $col;

    

$count5="select particulars,totalunits,rateperunit,EstValueperLakhs from tblamenitiesvaluation where enqno='$enqid' and (totalunits > 0 or rateperunit > 0 or EstValueperLakhs >0)  order by amenitiesid";

$sqlcnt5 = mysql_query($conn,$count5);  

while($row5 = mysql_fetch_assoc($sqlcnt5))
{ 
    $particulars = $row5['particulars'];
    $totalunits = $row5['totalunits'];
    $rateperunit = $row5['rateperunit'];
    $EstValueperLakhs = $row5['EstValueperLakhs'];
    
    $col = array();
    $col[] = array('text' =>$particulars, 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>$totalunits, 'width' => '20', 'height' => '5', 'align' => 'R','font_name' => 'Times','font_size' => '8.5', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>$rateperunit, 'width' => '20', 'height' => '5', 'align' => 'R','font_name' => 'Times','font_size' => '8.5', 'font_style' =>'', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    
    $col[] = array('text' =>$EstValueperLakhs, 'width' => '30', 'height' => '5', 'align' => 'R','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    
    $columns[] = $col;
} 

$count6="select sum(EstValueperLakhs) as EstValue from tblamenitiesvaluation where enqno='$enqid' ";

$sqlcnt6 = mysql_query($conn,$count6);  

while($row6 = mysql_fetch_assoc($sqlcnt6))
{ 
    $EstValue = $row6['EstValue'];
   
    
    $col = array();
    $col[] = array('text' =>'Total', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>'', 'width' => '20', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>'', 'width' => '20', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    
    $col[] = array('text' =>$EstValue, 'width' => '30', 'height' => '5', 'align' => 'R','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    
    $columns[] = $col;
} 

    $col = array();
    $col[] = array('text' =>'Total', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>'', 'width' => '20', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>'', 'width' => '20', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    
    $col[] = array('text' =>$EstValue, 'width' => '30', 'height' => '5', 'align' => 'R','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    
    $columns[] = $col;


$col = array();
    $col[] = array('text' =>'FAIR MARKET VALUE', 'width' => '120', 'height' => '5', 'align' => 'R','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    
    $col[] = array('text' =>$net_property_value, 'width' => '20', 'height' => '5', 'align' => 'R','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
   
    $columns[] = $col;

$col = array();
    
    $col[] = array('text' =>'REALIZABLE  VALUE', 'width' => '120', 'height' => '5', 'align' => 'R','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    
    $col[] = array('text' =>$realize_value, 'width' => '20', 'height' => '5', 'align' => 'R','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
   
    $columns[] = $col;

$col = array();
    
    $col[] = array('text' =>'FORCED  VALUE', 'width' => '120', 'height' => '5', 'align' => 'R','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    
    $col[] = array('text' =>$forced_value, 'width' => '20', 'height' => '5', 'align' => 'R','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    
    $columns[] = $col;

$col = array();
    
   
    
    $col[] = array('text' =>$fairwords, 'width' => '140', 'height' => '5', 'align' => 'R','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    
    $columns[] = $col;


	$col = array();  
    $col[] = array('text' =>'', 'width' => '140', 'height' => '15', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'T');
        $columns[] = $col;




/***start***/




	$col = array();  
 
    $col[] = array('text' =>'As a result of my appraisal and analysis, it is my considered opinion that the Net Realizable Value of the above property in the prevailing condition with aforesaid specifications is Rs. 0000 Lakhs (Rupees Only)', 'width' => '180', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
        $columns[] = $col;






$col = array();  

$col[] = array('text' =>'', 'width' => '30', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'Place', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');

$col[] = array('text' =>'', 'width' => '30', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'Signature', 'width' => '50', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
        $columns[] = $col;



	$col = array();  
$col[] = array('text' =>'', 'width' => '30', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'Date', 'width' => '50', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'', 'width' => '25', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
 $col[] = array('text' =>' (Name of the Branch Manager with office Seal) ', 'width' => '140', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
        $columns[] = $col;



$col = array();  

$col[] = array('text' =>'The undersigned has inspected the property detailed in the Valuation Report dated --- on----. We are satisfied that the fair and reasonable market value of the property is Rs. --- ( Rs. 	 only).
', 'width' => '180', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    
        $columns[] = $col;



$col = array();  
$col[] = array('text' =>'', 'width' => '30', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
   
        $columns[] = $col;


$col = array();  

$col[] = array('text' =>'', 'width' => '30', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'Place', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');

$col[] = array('text' =>'', 'width' => '30', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'Signature', 'width' => '50', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
        $columns[] = $col;



	$col = array();  
$col[] = array('text' =>'', 'width' => '30', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'Date', 'width' => '50', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'', 'width' => '25', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
 $col[] = array('text' =>' (Name of the Branch Manager with office Seal) ', 'width' => '140', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
        $columns[] = $col;


$col = array();  

$col[] = array('text' =>'', 'width' => '20', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
$col[] = array('text' =>'Encl:', 'width' => '30', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;



$col = array();  
$col[] = array('text' =>'', 'width' => '30', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
$col[] = array('text' =>'1. Declaration-cum-undertaking from the valuer (Annexure-IV)', 'width' => '150', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;

$col = array();  
$col[] = array('text' =>'', 'width' => '30', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
$col[] = array('text' =>'2. Model code of conduct for valuer (Annexure V)', 'width' => '150', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;



$col = array();  
$col[] = array('text' =>'', 'width' => '30', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
$col[] = array('text' =>'3. Photo copy of Sale deed No.', 'width' => '150', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;




$col = array();  
$col[] = array('text' =>'', 'width' => '30', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
$col[] = array('text' =>'4. Photo copy of Sale Agreement dt. ', 'width' => '150', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;



$col = array();  
$col[] = array('text' =>'', 'width' => '30', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
$col[] = array('text' =>'5. Photo copy of Building Approval Plan ', 'width' => '150', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;


$col = array();  
$col[] = array('text' =>'', 'width' => '30', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
$col[] = array('text' =>'6. Photo copy of Property Tax Receipt ', 'width' => '150', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;



$col = array();  
$col[] = array('text' =>'', 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
   
        $columns[] = $col;



	$col = array();  
$col[] = array('text' =>'ANY OTHER DETAILS :', 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
   
        $columns[] = $col;

$col = array();  
$col[] = array('text' =>'', 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
   
        $columns[] = $col;


	$col = array();  
$col[] = array('text' =>'1) Bases of Value (IBA Hand book -2011)', 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;

	
$col = array(); 
    $col[] = array('text' =>'', 'width' => '5', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');

    $col[] = array('text' =>'Market Value', 'width' => '50', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;



$col = array(); 
    $col[] = array('text' =>'', 'width' => '15', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');

    $col[] = array('text' =>'Market value is the estimated amount for which a property should exchange on the valuation date between a willing buyer and a willing seller in an arm’s length transaction, after proper marketing and where the parties had each acted knowledgeably, prudently and without compulsion. ', 'width' => '180', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;

	$col = array();  
$col[] = array('text' =>'', 'width' => '30', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
   
        $columns[] = $col;

$col = array(); 
    $col[] = array('text' =>'', 'width' => '5', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');

    $col[] = array('text' =>'Orderly Liquidation value (Realizable Value)', 'width' => '50', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;




$col = array(); 
    $col[] = array('text' =>'', 'width' => '15', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');

    $col[] = array('text' =>'is the estimated gross amount expressed in terms of money that could be typically realized from a liquidation sale, given a reasonable period of time a purchaser(s) with the seller being compelled to sell on an as is where is basis as of a specific date. ', 'width' => '180', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;



	$col = array();  
$col[] = array('text' =>'', 'width' => '30', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
   
        $columns[] = $col;




$col = array();  
$col[] = array('text' =>'2) Approaches & Methods :', 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;

	
$col = array(); 
    $col[] = array('text' =>'', 'width' => '5', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');

    $col[] = array('text' =>'In the valuation of specified tangible assets, three different approaches may be employed to determine fair value: ', 'width' => '180', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;



$col = array(); 
    $col[] = array('text' =>'', 'width' => '5', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');

    $col[] = array('text' =>'i) The Market Approach ii)The Income Approach iii)The Cost Approach', 'width' => '180', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;




$col = array(); 
    $col[] = array('text' =>'', 'width' => '5', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');

    $col[] = array('text' =>'i)  While each of these approaches are initially considered in the valuation of an asset, the nature and characteristics of a subject asset and the availability of data will indicate which approach, or approaches is most applicable. ', 'width' => '180', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;



	$col = array();  
$col[] = array('text' =>'', 'width' => '30', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
   
        $columns[] = $col;





$col = array();  
$col[] = array('text' =>'3)  Selection of Approaches & Methods :', 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;

	
$col = array(); 
    $col[] = array('text' =>'', 'width' => '5', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');

    $col[] = array('text' =>'In this case the following points considered are while selecting the best approach(es) or method(s) of valuation ', 'width' => '180', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;




$col = array(); 
    $col[] = array('text' =>'', 'width' => '5', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');

    $col[] = array('text' =>'1. Basis and premise of value. ', 'width' => '180', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;





$col = array(); 
    $col[] = array('text' =>'', 'width' => '5', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');

    $col[] = array('text' =>'2. The appropriateness of each method in view of the nature of the asset. Availability of sale/ Quoted rate of land in the vicinity. ', 'width' => '180', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;




$col = array(); 
    $col[] = array('text' =>'', 'width' => '5', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');

    $col[] = array('text' =>'3. The availability of reliable information required to apply for the method. ', 'width' => '180', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;

$col = array(); 
    $col[] = array('text' =>'', 'width' => '5', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');

    $col[] = array('text' =>'4. Perspectives of market participants. ', 'width' => '180', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;


$col = array(); 
    $col[] = array('text' =>'', 'width' => '5', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');

    $col[] = array('text' =>'5. Market Approach with adhoc technique is chosen for composite rate.', 'width' => '180', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;



$col = array(); 
    $col[] = array('text' =>'', 'width' => '5', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;



$col = array(); 

    $col[] = array('text' =>'4)  Comparison sales ', 'width' => '180', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;



$col = array(); 
    $col[] = array('text' =>'', 'width' => '5', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;



$col = array(); 
 
    $col[] = array('text' =>' (Annexure-IV) '.'                 '.' DECLARATION- CUM- UNDERTAKING', 'width' => '150', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
  $columns[] = $col;


$col = array(); 
 
    $col[] = array('text' =>'', 'width' => '150', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
  $columns[] = $col;


$col = array(); 
 
    $col[] = array('text' =>'I, M.Adaikkalavan son of Muthuveerappan do hereby solemnly affirm and state that:', 'width' => '150', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
  $columns[] = $col;





$count1sbi = "select * from sbi_apt where sbiid=1 ";

$sqlcntsbi = mysql_query($conn,$count1sbi);

$rowsb = mysql_fetch_assoc($sqlcntsbi);

$sbidesc=$rowsb['sbidesc'];

$col = array(); 

    $col[] = array('text' =>$sbidesc, 'width' => '180', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;






$col = array(); 

    $col[] = array('text' =>'', 'width' => '180', 'height' => '10', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;

$col = array(); 
    $col[] = array('text' =>'Further, I hereby provide the following information.', 'width' => '180', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;


    $col = array();
    
    $col[] = array('text' =>'SI No', 'width' => '15', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>'Particulars', 'width' => '80', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>'Valuer comment', 'width' => '80', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
           $columns[] = $col;





 $col = array();
    
    $col[] = array('text' =>'1', 'width' => '15', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>'Background information asset of the being valued;', 'width' => '80', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>'In Page No 1', 'width' => '80', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
           $columns[] = $col;



 $col = array();
    
    $col[] = array('text' =>'2', 'width' => '15', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>'Purpose of valuation and appointing authority', 'width' => '80', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>'The valuer  Adaikkalavan.M is a registered valuer under companies act for the asset class land and building (IBBI/RV/02/2018/10168) and Emplaned valuer of   State Bank Of India Vide Appointment letter dated 03.06.2020 (Ref : LHO/CCO/CPM/13)
', 'width' => '80', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
           $columns[] = $col;



 $col = array();
    
    $col[] = array('text' =>'3', 'width' => '15', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>'identity of the valuer and any other experts involved	in the valuation;
', 'width' => '80', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>'  SBI, Branch Manager ------- Branch, Coimbatore via  oral appointment for the purpose of  supporting secures lending decision by bank (Flat Purchase)
', 'width' => '80', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
           $columns[] = $col;



 $col = array();
    
    $col[] = array('text' =>'4', 'width' => '15', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>'disclosure of valuer interest or
conflict, if any;
', 'width' => '80', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>' Hereby Valuer declare that he do not have any conflict of interest while performing valuation of the subject property, and benefit from the valuation process only through receiving a fixed pre-agreed fee, fee received by the valuer for valuation procedure is not related to the valuation results.
', 'width' => '80', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
           $columns[] = $col;

 $col = array();
    
    $col[] = array('text' =>'5', 'width' => '15', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>'date of appointment, valuation
date and date of report;

', 'width' => '80', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>' Oral appointment on 
Date of Valuation      
Date of report            

', 'width' => '80', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
           $columns[] = $col;


 $col = array();
    
    $col[] = array('text' =>'6', 'width' => '15', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>'inspections and/or investigations
undertaken;


', 'width' => '80', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>' Physical measurement of apartment

', 'width' => '80', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
           $columns[] = $col;
 $col = array();

    $col[] = array('text' =>'7', 'width' => '15', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>'Nature and sources of the information used or relied upon;


', 'width' => '80', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>' 1) Photo copy of Sale deed No. 
2) Photo copy of Sale Agreement dt. 
3) Photo copy of Building Approval Plan
4) Photo copy of Property Tax Receipt 

', 'width' => '80', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
           $columns[] = $col;

 $col = array();

    $col[] = array('text' =>'8', 'width' => '15', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>'procedures adopted in carrying out the valuation and valuation standards followed;

', 'width' => '80', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>'Market Approach by adhoc comparison technique. The valuation report has been prepared in accordance with the format of State Bank Of India RE/HL/PD/105 and in compliance with IVS.

', 'width' => '80', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
           $columns[] = $col;



$col = array();

    $col[] = array('text' =>'9', 'width' => '15', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>'restrictions on use of the report,
if any;
', 'width' => '80', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>'The publication of the valuation report in whole or part or any reference here to or to the valuation figures contained herein or to the name of this valuer without the written approval of the valuer is prohibited.

', 'width' => '80', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
           $columns[] = $col;



$col = array();

    $col[] = array('text' =>'10', 'width' => '15', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>'major factors that were taken into	account during	the valuation;
', 'width' => '80', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>'Location, size of the plot and classification of land, Building speciation, age, Base soil, facing direction, Road width, Approval.

', 'width' => '80', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
           $columns[] = $col;



$col = array();

    $col[] = array('text' =>'11', 'width' => '15', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>'major factors that were not taken into account during the valuation;
', 'width' => '80', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>' Latent defects

', 'width' => '80', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
           $columns[] = $col;


$col = array();

    $col[] = array('text' =>'12', 'width' => '15', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>'
Caveats, limitations and disclaimers to the extent they explain or elucidate the limitations faced by valuer, which shall not be for the purpose of limiting his responsibility for the valuation report.

', 'width' => '80', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>' 

', 'width' => '80', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
           $columns[] = $col;



$col = array();

    $col[] = array('text' =>'', 'width' => '15', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>'
(1) That there are no unusual or unreasonable restrictions or expenses affecting the property.
(2) That any legal or other statutory rights do not affect the property and its value.
(3) This valuation report is based on the information provided to me by the barrower.
(4) We have assumed that these specified tangible assets are managed and maintained competently.
(5) We have at places, wherever required, assumed or considered all information collated from Website survey and market research, for this valuation exercise. 
(6) Value varies with the purpose and date. 
(7) The Character of plot and building are Vasthu in nature.
(8) This type of property is generally available in the vicinity, there will be number of  willing buyers in market
(9) All Estimates of Value are presented as the valuer’s considered opinion based on information Obtained during the investigation and do not represent an offer to buy or sell.                                                      
(10) This report must be used in its entirety. Reliance on any portion of the report independent of others may lead the reader to erroneous conclusions regarding the property values. No portion of the report stands alone without approval from the author.
(11) All information presented in this report is true and accurate to the best of the valuer’s Knowledge and belief. 
(12) There is no other intended users other than the mentioned bank branch.
(13) The Currency of valuation is INR
(14) Two Copies of Valuation report by hard Copy is provided.
(15) Asking rate in the market is basic of composite rate.


', 'width' => '160', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    
           $columns[] = $col;


$col = array();

    $col[] = array('text' =>'', 'width' => '5', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    
              $columns[] = $col;


$col = array();  

$col[] = array('text' =>'', 'width' => '30', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'Place', 'width' => '70', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');

$col[] = array('text' =>'', 'width' => '30', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'Signature', 'width' => '50', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
        $columns[] = $col;



	$col = array();  
$col[] = array('text' =>'', 'width' => '30', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'Date', 'width' => '50', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'', 'width' => '25', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
 $col[] = array('text' =>' (Name and Official Seal of the Approved Valuer) ', 'width' => '140', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
        $columns[] = $col;

$col = array();

    $col[] = array('text' =>'', 'width' => '15', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    
              $columns[] = $col;



$col = array(); 

    $col[] = array('text' =>'(Annexure V)', 'width' => '50', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');

    $col[] = array('text' =>' MODEL CODE OF CONDUCT FOR VALUERS', 'width' => '140', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;




$count1sbi = "select * from sbi_apt where sbiid=3 ";

$sqlcntsbi = mysql_query($conn,$count1sbi);

$rowsb = mysql_fetch_assoc($sqlcntsbi);


$sbidesc=$rowsb['sbidesc'];

$col = array(); 
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'Integrity and Fairness:', 'width' => '170', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;




$col = array(); 

    $col[] = array('text' =>'1. A valuer shall, in the conduct of his/its business, follow high standards of integrity and fairness in all his/its dealings with his/its clients and other valuers.
2. A valuer shall maintain integrity by being honest, straightforward, and forthright in all professional relationships.
3. A valuer shall endeavor to ensure that he/it provides true and adequate information and shall not misrepresent any facts or situations.
4. A valuer shall refrain from being involved in any action that would bring disrepute to the profession.
5. A valuer shall keep public interest foremost while delivering his services.
', 'width' => '180', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9.5', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;


$col = array(); 
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'Professional Competence and Due Care :', 'width' => '170', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;


$col = array(); 

    $col[] = array('text' =>'6. A valuer shall render at all times high standards of service, exercise due diligence, ensure proper care and exercise independent professional judgment.
7. A valuer shall carry out professional services in accordance with the relevant technical and professional standards that may be specified from time to time
8. A valuer shall continuously maintain professional knowledge and skill to provide competent professional service based on up-to-date developments in practice, prevailing regulations/guidelines and techniques.
9. In the preparation of a valuation report, the valuer shall not disclaim liability for his/its expertise or deny his/its duty of care, except to the extent that the assumptions are based on statements of fact provided by the company or its auditors or consultants or information available in public domain and not generated by the valuer.
10. A valuer shall not carry out any instruction of the client insofar as they are incompatible with the requirements of integrity, objectivity and independence.
11. A valuer shall clearly state to his client the services that he would be competent to provide and the services for which he would be relying on other valuers or professionals or for which the client can have a separate arrangement with other valuers.
', 'width' => '180', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9.5', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;



$col = array(); 
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'Independence and Disclosure of Interest  :', 'width' => '170', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;

$col = array(); 

    $col[] = array('text' =>'12. A valuer shall act with objectivity in his/its professional dealings by ensuring that his/its decisions are made without the presence of any bias, conflict of interest, coercion, or undue influence of any party, whether directly connected to the valuation assignment or not.
13. A valuer shall not take up an assignment if he/it or any of his/its relatives or associates is not independent in terms of association to the company.
14. A valuer shall maintain complete independence in his/its professional relationships and shall conduct the valuation independent of external influences.
15. A valuer shall wherever necessary disclose to the clients, possible sources of conflicts of duties and interests, while providing unbiased services.
16. A valuer shall not deal in securities of any subject company after any time when he/it first becomes aware of the possibility of his/its association with the valuation, and in accordance with the Securities and Exchange Board of India (Prohibition of Insider Trading) Regulations, 2015 or till the time the valuation report becomes public, whichever is earlier.
17. A valuer shall not indulge in “mandate snatching” or offering “convenience valuations” in order to cater to a company or client’s needs.
18. As an independent valuer, the valuer shall not charge success fee (Success fees may be defined as a compensation / incentive paid to any third party for successful closure of transaction. In this case, approval of credit proposals).
19. In any fairness opinion or independent expert opinion submitted by a valuer, if there has been a prior engagement in an unconnected transaction, the valuer shall declare the association with the company during the last five years.

', 'width' => '180', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9.5', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;


$col = array(); 
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'Confidentiality  :', 'width' => '170', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;



$col = array(); 

    $col[] = array('text' =>'20. A valuer shall not use or divulge to other clients or any other party any confidential information about the subject company, which has come to his/its knowledge without proper and specific authority or unless there is a legal or professional right or duty to disclose.

', 'width' => '180', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9.5', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;



$col = array(); 
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'Information Management   :', 'width' => '170', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;


$col = array(); 

    $col[] = array('text' =>'21. A valuer shall ensure that he/ it maintains written contemporaneous records for any decision taken, the reasons for taking the decision, and the information and evidence in support of such decision. This shall be maintained so as to sufficiently
enable a reasonable person to take a view on the appropriateness of his/its decisions and actions.
22. A valuer shall appear, co-operate and be available for inspections and investigations carried out by the authority, any person authorized by the authority, the registered valuers organization with which he/it is registered or any other statutory regulatory body.
23. A valuer shall provide all information and records as may be required by the authority, the Tribunal, Appellate Tribunal, the registered valuers organization with which he/it is registered, or any other statutory regulatory body.
24. A valuer while respecting the confidentiality of information acquired during the course of performing professional services, shall maintain proper working papers for a period of three years or such longer period as required in its contract for a specific valuation, for production before a regulatory authority or for a peer review. In the event of a pending case before the Tribunal or Appellate Tribunal, the record shall be maintained till the disposal of the case.

', 'width' => '180', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9.5', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;

$col = array(); 
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'Gifts and hospitality:  :', 'width' => '170', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;

$col = array(); 

    $col[] = array('text' =>'25. A valuer or his/its relative shall not accept gifts or hospitality which undermines or affects his independence as a valuer.
Explanation.─ For the purposes of this code the term ‘relative’ shall have the same meaning as defined in clause (77) of Section 2 of the Companies Act, 2013 (18 of 2013).
26. A valuer shall not offer gifts or hospitality or a financial or any other advantage to a public servant or any other person with a view to obtain or retain work for himself/ itself, or to obtain or retain an advantage in the conduct of profession for himself/ itself.
', 'width' => '180', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9.5', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;


$col = array(); 
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'Remuneration and Costs.', 'width' => '170', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;


$col = array(); 

    $col[] = array('text' =>'27. A valuer shall provide services for remuneration which is charged in a transparent manner, is a reasonable reflection of the work necessarily and properly undertaken, and is not inconsistent with the applicable rules.
28. A valuer shall not accept any fees or charges other than those which are disclosed in a written contract with the person to whom he would be rendering service.

', 'width' => '180', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9.5', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;


$col = array(); 
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'Occupation, employability and restrictions.', 'width' => '170', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;

$col = array(); 

    $col[] = array('text' =>'29. A valuer shall refrain from accepting too many assignments, if he/it is unlikely to be able to devote adequate time to each of his/ its assignments.
30. A valuer shall not conduct business which in the opinion of the authority or the registered valuer organization discredits the profession.
', 'width' => '180', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9.5', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;


$col = array(); 
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'Miscellaneous', 'width' => '170', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;


$col = array(); 

    $col[] = array('text' =>'31. A valuer shall refrain from undertaking to review the work of another valuer of the same client except under written orders from the bank or housing finance institutions and with knowledge of the concerned valuer.
32. A valuer shall follow this code as amended or revised from time to time',
'width' => '180', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 
'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
           $columns[] = $col;





$col = array();

    $col[] = array('text' =>'', 'width' => '15', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    
              $columns[] = $col;



$col = array();
$col[] = array('text' =>'', 'width' => '20', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'Place : Coimbatore ', 'width' => '40', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'Signature
', 'width' => '150', 'height' => '5', 'align' => 'C','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
              $columns[] = $col;



$col = array();
$col[] = array('text' =>'', 'width' => '20', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'Date :  ', 'width' => '40', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'(Name of the Approved Valuer and seal / Office Firm / Company)
', 'width' => '150', 'height' => '5', 'align' => 'C','font_name' => 'Times','font_size' => '10', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
              $columns[] = $col;



$col = array();
$col[] = array('text' =>'', 'width' => '20', 'height' => '15', 'align' => 'L','font_name' => 'Times','font_size' => '12', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');

              $columns[] = $col;


$col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '15', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'Name of the Applicant 			: ', 'width' => '100', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '12', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'
', 'width' => '100', 'height' => '5', 'align' => 'C','font_name' => 'Times','font_size' => '15', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
              $columns[] = $col;

$col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '10', 'align' => 'L','font_name' => 'Times','font_size' => '15', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
              $columns[] = $col;

$col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '15', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'Name of the Bank / Branch : ', 'width' => '90', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '12', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'State Bank of India/ --------Branch, Coimbatore.
', 'width' => '90', 'height' => '5', 'align' => 'C','font_name' => 'Times','font_size' => '12', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
              $columns[] = $col;

$col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '10', 'align' => 'L','font_name' => 'Times','font_size' => '15', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
              $columns[] = $col;
$col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '15', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'Address of the Property : ', 'width' => '90', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '12', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'
', 'width' => '90', 'height' => '5', 'align' => 'C','font_name' => 'Times','font_size' => '12', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
              $columns[] = $col;
$col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '10', 'align' => 'L','font_name' => 'Times','font_size' => '15', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
              $columns[] = $col;
$col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '15', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'Date of Inspection : ', 'width' => '90', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '12', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'
', 'width' => '90', 'height' => '5', 'align' => 'C','font_name' => 'Times','font_size' => '12', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewid

th' => '0.0','linearea' => '');
              $columns[] = $col;

$col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '10', 'align' => 'L','font_name' => 'Times','font_size' => '15', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
              $columns[] = $col;
$col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '15', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'Fair Market Value of the property : ', 'width' => '90', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '12', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'Rs. ------ Lakhs 
', 'width' => '90', 'height' => '5', 'align' => 'C','font_name' => 'Times','font_size' => '12', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
              $columns[] = $col;

$col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '10', 'align' => 'L','font_name' => 'Times','font_size' => '15', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
              $columns[] = $col;
$col = array();
$col[] = array('text' =>'', 'width' => '10', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '15', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'Realizable value of the property :   ', 'width' => '90', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '12', 'font_style' => '', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
    $col[] = array('text' =>'Rs. ------ Lakhs 
', 'width' => '90', 'height' => '5', 'align' => 'C','font_name' => 'Times','font_size' => '12', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
              $columns[] = $col;


/*





    $countrate = "select count(*) as cntrate,enqno from tblanaysisrate where enqno='$enqid'";

$sqlcntrate = mysql_query($conn,$countrate);

$rowrate = mysql_fetch_assoc($sqlcntrate);

$cntrate=$rowrate['cntrate'];

    $col = array();
    
    $col[] = array('text' =>'Attributes', 'width' => '60', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>'Subject', 'width' => '15', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
   
    $col[] = array('text' =>'CompP1', 'width' => '15', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
  
    if ($cntrate==2 || $cntrate==3 || $cntrate==4 || $cntrate==5 || $cntrate==6 || $cntrate==7 || $cntrate==8 )
{

    $col[] = array('text' =>'CompP2', 'width' => '15', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
     }
    if ($cntrate==3 || $cntrate==4 || $cntrate==5 || $cntrate==6 || $cntrate==7 || $cntrate==8 )
{
$col[] = array('text' =>'CompP3', 'width' => '15', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    }
    if ($cntrate==4 || $cntrate==5 || $cntrate==6 || $cntrate==7 || $cntrate==8 )
{
 $col[] = array('text' =>'CompP4', 'width' => '15', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
   }
    if ($cntrate==5 || $cntrate==6 || $cntrate==7 || $cntrate==8 )
{
  $col[] = array('text' =>'CompP5', 'width' => '15', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
   }
    if ($cntrate==6 || $cntrate==7 || $cntrate==8 )
{
  $col[] = array('text' =>'CompP6', 'width' => '15', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
   }
    if ($cntrate==7 || $cntrate==8 )
{
  $col[] = array('text' =>'CompP7', 'width' => '15', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => 'B', 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
   }
    if ($cntrate==8 )
{
  $col[] = array('text' =>'CompP8', 'width' => '15', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'211,211,211', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
 }   
   
    $columns[] = $col;
*/


/*
$count4="select attributeid,sum(idsubject) as idsubject,sum(idcomp1) as idcomp1,sum(idcomp2) as idcomp2,
sum(idcomp3) as idcomp3,sum(idcomp4) as idcomp4,sum(idcomp5) as idcomp5,sum(idcomp6) as idcomp6,
sum(idcomp7) as idcomp7,sum(idcomp8) as idcomp8,attributes,max(cntrate) as cntrate
from
(
select seqno as attributeid,0 as idsubject,0 as idcomp1,0 as idcomp2,0 as idcomp3,
0 as idcomp4,0 as idcomp5,0 as idcomp6,0 as idcomp7,0 as idcomp8,b.attributes ,0 as cntrate
from tblmasattributes b
union
select attributeid,idsubject,idcomp1,idcomp2,idcomp3,idcomp4,idcomp5,idcomp6,idcomp7,idcomp8,b.attributes ,cntrate
from tblanalysisattribute a ,tblmasattributes b ,(select count(*) as cntrate,enqno from tblanaysisrate where enqno='$enqid' ) c
WHERE a.attributeid=b.seqno and a.enqno=c.enqno and
a.enqno ='$enqid' order by attributeid asc
)a group by attributeid,attributes having (sum(idcomp1)>0 or sum(idcomp2)>0 or sum(idcomp3)>0 or sum(idcomp4)>0 or sum(idcomp5)>0 or 
sum(idcomp6)>0 or sum(idcomp7)>0 or sum(idcomp8)>0)";

$sqlcnt4 = mysql_query($conn,$count4);  

while($row4 = mysql_fetch_assoc($sqlcnt4))
{ 
    $attributes = $row4['attributes'];
    $idsubject = $row4['idsubject'];
    $idcomp1 = $row4['idcomp1'];
    $idcomp2 = $row4['idcomp2'];
    $idcomp3 = $row4['idcomp3'];
    $idcomp4 = $row4['idcomp4'];
    $idcomp5 = $row4['idcomp5'];
    $idcomp6 = $row4['idcomp6'];
    $idcomp7 = $row4['idcomp7'];
    $idcomp8 = $row4['idcomp8'];
  //  $cntrate = $row4['cntrate'];

    $col = array();
    
    $col[] = array('text' =>$attributes, 'width' => '60', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '8.5', 'font_style' => 'B', 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    $col[] = array('text' =>$idsubject, 'width' => '15', 'height' => '5', 'align' => 'R','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');

    $col[] = array('text' =>$idcomp1, 'width' => '15', 'height' => '5', 'align' => 'R','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
    if ($cntrate==2 || $cntrate==3 || $cntrate==4 || $cntrate==5 || $cntrate==6 || $cntrate==7 || $cntrate==8 )
{
    $col[] = array('text' =>$idcomp2, 'width' => '15', 'height' => '5', 'align' => 'R','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
}
	if ($cntrate==3 || $cntrate==4 || $cntrate==5 || $cntrate==6 || $cntrate==7 || $cntrate==8 )
{

    $col[] = array('text' =>$idcomp3, 'width' => '15', 'height' => '5', 'align' => 'R','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
} 
if ($cntrate==4 || $cntrate==5 || $cntrate==6 || $cntrate==7 || $cntrate==8 )
{

   $col[] = array('text' =>$idcomp4, 'width' => '15', 'height' => '5', 'align' => 'R','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
}   
if ($cntrate==5 || $cntrate==6 || $cntrate==7 || $cntrate==8 )
{
 
$col[] = array('text' =>$idcomp5, 'width' => '15', 'height' => '5', 'align' => 'R','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
}
if ($cntrate==6 || $cntrate==7 || $cntrate==8 )
{
    $col[] = array('text' =>$idcomp6, 'width' => '15', 'height' => '5', 'align' => 'R','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
}
if ( $cntrate==7 || $cntrate==8 )
{
    $col[] = array('text' =>$idcomp7, 'width' => '15', 'height' => '5', 'align' => 'R','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
}
if ( $cntrate==8 )
{
    $col[] = array('text' =>$idcomp8, 'width' => '15', 'height' => '5', 'align' => 'R','font_name' => 'Times','font_size' => '8.5', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
}    
   
    $columns[] = $col;
} 


$col = array();
$col[] = array('text' =>'', 'width' => '180', 'height' => '150', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => '');
$columns[] = $col;

$col = array();
$col[] = array('text' =>$declarationnew1, 'width' => '180', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;



$col = array();
$col[] = array('text' =>$declaration, 'width' => '180', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
*/


$count9="select  seqno,name,image, phototype,photodesc,concat('http://localhost/TESTPDF/images/',name) as name1 from tblphotoupload where enqno = '$enqid'";

$sqlcnt9 = mysql_query($conn,$count9);  

$image_height = 40;
$image_width = 40;


while($row9 = mysql_fetch_assoc($sqlcnt9))
{ 		
    $image= $row9['image'];
    $name= $row9['name'];
    $phototype= $row9['phototype'];
    $photodesc= $row9['photodesc'];


    $img=$row9['name1'];




/*$col = array();
$col[] = array('text' =>$pdf->Image($img,10,6,30), 'width' => '180', 'height' => '5', 'align' => 'L','font_name' => 'Times','font_size' => '9', 'font_style' => $fontb, 'fillcolor' =>'255,255,255', 'textcolor' => '0,0,0', 'drawcolor' =>'0,0,0', 'linewidth' => '0.0','linearea' => 'LRTB');
$columns[] = $col;
*/

}



$pdf->AlterTable(10,$columns);


ob_end_clean();

mysql_close($conn);
$pdf->Output();
?>

