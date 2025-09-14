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


$from = '<annadurai.bv@gmail.com>';
$BCc = '<b_v_annadurai@yahoo.co.in>';
$to= 'it@sriharipapers.com';


$subject = 'OVER DUE INTIMATION MAIL';


echo $mailmessage;

$headers = array(
    'From' => $from,
    'To' => $to,
//    'BCC' => $BCc, 
    'Subject' => $subject
);


$mime = new Mail_mime(array('eol' => $crlf));

$smtp = Mail::factory('smtp', array(
        'host' => 'ssl://smtp.gmail.com',
        'port' => '465',
        'auth' => true,
        'username' => 'annadurai.bv@gmail.com',
        'password' => 'gtsgaviubordqjrq'
    ));



$mail = $smtp->send($to, $headers,$mailmessage);

if (PEAR::isError($mail)) {
    echo('<p>' . $mail->getMessage() . '</p>');
} else {
    echo('<p>Message successfully sent!</p>');
}


  
?>


