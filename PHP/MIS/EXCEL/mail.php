<?php
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


$from = '<annadurai.bv@gmail.com>';
$BCc = '<b_v_annadurai@yahoo.co.in>';
//$to = '<b_v_annadurai@yahoo.co.in>';
$to= 'it@sriharipapers.com';
$subject = ' HELLO   This test message from PHP';
$body = "HELLO Hi,\n\nHow are you? \n\n THIS IS TEST MESSAGE FROM PHP ";
$NO=1;
$DATA1='d';
$DATA2=22562;
$customer='TEST';
$QTY=1500;

//$body = 'Sir, <br><br> Below . <br>   date.<br> Pls . <br><br> No.-'.$NO.'<br>'.'Style: '.$DATA1.'<br>'.'Customer: '.$customer.'<br>'.'Number: '.$DATA2.'<br>'.'QTY : '.$QTY.'<br>'.'<br> Regards, <br> SHVPM ,<br> This is an automatically generated – please do not reply .'; 


//$file = 'd:/QualitywiseOrderStatus.pdf';

      
$headers = array(
    'From' => $from,
    'To' => $to,
    'BCC' => $BCc, 
    'Subject' => $subject
);

/*
$mime = new Mail_mime();

if ($mime->addAttachment($file,'application/pdf')){
    echo "attached successfully! </br>";
} else {
    echo "Nope, failed to attache!! </br>";
}
*/


$smtp = Mail::factory('smtp', array(
        'host' => 'ssl://smtp.gmail.com',
        'port' => '465',
        'auth' => true,
        'username' => 'annadurai.bv@gmail.com',
        'password' => 'gtsgaviubordqjrq'
    ));


//$smtp->addAttachment($file, 'text/plain');

$mail = $smtp->send($to, $headers, $body);

if (PEAR::isError($mail)) {
    echo('<p>' . $mail->getMessage() . '</p>');
} else {
    echo('<p>Message successfully sent!</p>');
}



?>
