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

//echo $to;
//echo "<br>";

$from = '<finance@sriharipapers.com>';


//$to= 'it@sriharipapers.com';


$subject = 'OVER DUE INTIMATION MAIL';


echo $mailmessage;

$headers = array(
    'From' => $from,
    'To' => $to,
//    'BCC' => $BCc, 
    'Subject' => $subject
);


$mime = new Mail_mime();
$mime->setHTMLBody($mailmessage);
$body = $mime->get();
$headers = $mime->headers($headers);


$smtp = Mail::factory('smtp', array(
        'host' => 'ssl://smtp.gmail.com',
        'port' => '465',
        'auth' => true,
        'username' => 'finance@sriharipapers.com',
        'password' => 'molh jlrp pzbe liym'
    ));






$mail = $smtp->send($to, $headers,$body);

if (PEAR::isError($mail)) {
    echo('<p>' . $mail->getMessage() . '</p>');
} else {
    echo('<p>Message successfully sent!</p>');
}
fclose($mail);

  
?>


