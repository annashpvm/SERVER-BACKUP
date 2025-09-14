<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();




/*

install
sudo apt-get install php5.6-xml
sudo apt-get install php-pear
sudo pear install mail
sudo pear install Net_SMTP
sudo pear install Auth_SASL
sudo pear install mail_mime


require_once "Mail.php";
require_once "Mail/mime.php";

*/





    

// Pear Mail Library
require_once "Mail.php";
require_once "Mail/mime.php";

$mailmessage = $_REQUEST['mailmessage'];
$to          = $_REQUEST['idemail'];

$from = '<finance@sriharipapers.com>';
//$to= 'accounts@sriharipapers.com';


$subject = 'OVER DUE INTIMATION MAIL';

echo $mailmessage;


$mime = new Mail_mime();
$mime->setHTMLBody($mailmessage);
$body = $mime->get();
$headers = $mime->headers($headers);

//echo $body;

/*

//require('fpdf.php'); 

require('/SHVPM/Accounts/ViewReport/fpdf.php');   
// Instantiate and use the FPDF class  
$pdf = new FPDF(); 
  
//Add a new page 
$pdf->AddPage(); 
  
// Set the font for the text 
$pdf->SetFont('Arial', 'B', 18); 
  
// Prints a cell with given text  
$pdf->Cell(60,20,'Hello GeeksforGeeks!'); 
  
// return the generated output 
$pdf->Output(); 
  
*/
$file = $_SERVER["DOCUMENT_ROOT"].'/SHVPM/Report/'."test.pdf";

if (file_put_contents($file,base64_decode($subject)))
{
    $str = file_get_contents($file);
    echo  print_r($str, true) ;
}
else
    echo("Failed");

    
?>


