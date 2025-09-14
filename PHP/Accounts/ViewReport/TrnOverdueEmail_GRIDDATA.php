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



//$host = gethostbyaddr($_SERVER["REMOTE_ADDR"]);
//echo $host;




    $griddet = json_decode($_REQUEST['griddet'],true);
    $rowcnt = $_REQUEST['cnt'];
    

// Pear Mail Library
require_once "Mail.php";
require_once "Mail/mime.php";


$from = '<annadurai.bv@gmail.com>';
$BCc = '<b_v_annadurai@yahoo.co.in>';
//$BCc = '<it@sriharipapers.com>';
//$to = '<b_v_annadurai@yahoo.co.in>';
$to= 'it@sriharipapers.com';
$subject = 'OVER DUE INTIMATION MAIL';
$body = "Dear sir, \n\n The Following Bills are Overdue \n\n Please release the payments immediately \n\n\n  ";

$body = $body . "Customer Name         Bill Date      Bill Balance Amount \n\n\n";

//$smsnumber  = "9600415110";
//$smsnumber  = "6380815257";
        for($i=0;$i<$rowcnt;$i++){
            $ledname    = $griddet[$i]['grpname'];
            $dbamt      = (float)$griddet[$i]['debit'];
            $dbamt2     = str_pad($dbamt,12,"-", STR_PAD_LEFT);
     //       $body = $body .  $ledname . "            " .   $dbamt . "\n";
             $body = $body . str_pad($ledname,40," ", STR_PAD_LEFT) . $dbamt2  . "\n";
   //    $body = $body . $dbamt2 . "\n";

//printf("%-55s<br>",$ledname); 
        }

$headers = array(
    'From' => $from,
    'To' => $to,
    'BCC' => $BCc, 
    'Subject' => $subject
);

$file = 'd:\godown stock.pdf';
$file = '/SHVPM/UserLogin.php';
$mime = new Mail_mime(array('eol' => $crlf));

$smtp = Mail::factory('smtp', array(
        'host' => 'ssl://smtp.gmail.com',
        'port' => '465',
        'auth' => true,
        'username' => 'annadurai.bv@gmail.com',
        'password' => 'gtsgaviubordqjrq'
    ));

$mime->addAttachment($file, 'text/plain');



$mail = $smtp->send($to, $headers, $body);

if (PEAR::isError($mail)) {
    echo('<p>' . $mail->getMessage() . '</p>');
} else {
    echo('<p>Message successfully sent!</p>');
}


  
?>


