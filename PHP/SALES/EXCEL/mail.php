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


$to = 'it@sriharipapers@gmail.com';
$cc = 'b_v_annadurai@yahoo.co.in';
$BCc = 'annadurai.bv@gmail.com';
$from = 'annadurai.bv@gmail.com';
$NO=1;
$DATA1='d';
$DATA2=22562;
$customer='TEST';
$QTY=1500;

$subject = 'SMS Details';
//	$body = 'Sir, <br><br> Below . <br>  date.<br> Pls .<br><br> No.-'.$NO.'<br>'.'Style: '.$DATA1.'<br>'.'Customer: '.$customer.'<br>'.'Number: '.$DATA2.'<br>'.'QTY : '.$QTY.'<br>'.'<br> Regards, <br>  LTD ,<br> This is an automatically generated – please do not reply .'; 

$body = 'SMS Details';


//$host = "gmail.com";
//$port = "25";
$host = "ssl://smtp.gmail.com";
$port = "465";


$user = "annadurai.bv@gmail.com";
$pass = "gtsgaviubordqjrq";


 if ($subject <> '') {
    if ($cc == "") {
        $headers = array("From" => $from, "To" => $to, 'BCc' => $BCc, "Subject" => $subject, 'MIME-Version' => 1,
            'Content-type' => 'text/html;charset=iso-8859-1');
        $recipients = $to . "," . $BCc;
        $smtp = Mail::factory("smtp", array("host" => $host, "port" => $port, "auth" => false, "username" => $user, "password" => $pass));
        $mail = $smtp->send($recipients, $headers, $body);
    } else {
        $headers = array("From" => $from, "To" => $to, 'Cc' => $cc, 'BCc' => $BCc, "Subject" => $subject, 'MIME-Version' => 1,
            'Content-type' => 'text/html;charset=iso-8859-1');
        $recipients = $to . ", " . $cc . ", " . $BCc;
        $smtp = Mail::factory("smtp", array("host" => $host, "port" => $port, "auth" => false, "username" => $user, "password" => $pass));
        $mail = $smtp->send($recipients, $headers, $body);


    }
}



if (PEAR::isError($mail)) {
    echo '({"success":"false"})';
} else {
    echo '({"success":"true"})';
}



require_once('Mail.php');
require_once('Mail/mime.php');

$from = 'Sender <annadurai.bv@gmail.com>';
$to = 'Receiver <b_v_annadurai@yahoo.co.in>';
$subject = 'Sent from PHP on my machine';

$text = 'This is a message I sent from <a href="http://www.php.net/">PHP</a> '
      . 'using the PEAR Mail package and SMTP through Gmail. Enjoy!';

$message = new Mail_mime();
$message->setTXTBody(strip_tags($text)); // for plain-text
$message->setHTMLBody($text);
$body = $message->get();

$host = 'smtp.gmail.com';
$port = 587; //According to Google you need to use 465 or 587
$username = 'annadurai.bv@gmail.com';
$password = 'anusuya1';

$headers = array('From' => $from,
    'To' => $to,
    'Subject' => $subject);

$smtp = Mail::factory('smtp',
    array(
        'host' => $host,
        'port' => $port,
        'auth' => false,
        'username' => $username,
        'password' => $password));

$mail = $smtp->send($to, $headers, $body);

if (PEAR::isError($mail)) {
    echo $mail->getMessage();
} else {
    echo "Message sent successfully!";
}

echo "\n"



*/


// Pear Mail Library
require_once "Mail.php";
require_once "Mail/mime.php";


$from = '<annadurai.bv@gmail.com>';
$BCc = '<b_v_annadurai@yahoo.co.in>';
//$to = '<b_v_annadurai@yahoo.co.in>';
$to= 'it@sriharipapers.com';
$subject = ' HELLO   This test message from PHP';
//$body = "HELLO Hi,\n\nHow are you? \n\n THIS IS TEST MESSAGE FROM PHP ";
$NO=1;
$DATA1='d';
$DATA2=22562;
$customer='TEST';
$QTY=1500;

$body = 'Sir, <br><br> Below . <br>  date.<br> Pls .<br><br> No.-'.$NO.'<br>'.'Style: '.$DATA1.'<br>'.'Customer: '.$customer.'<br>'.'Number: '.$DATA2.'<br>'.'QTY : '.$QTY.'<br>'.'<br> Regards, <br> SHVPM ,<br> This is an automatically generated – please do not reply .'; 


$file = 'c:/users/Oran/Downloads/RepPurIndent.pdf';

      
$headers = array(
    'From' => $from,
    'To' => $to,
    'BCC' => $BCc, 
    'Subject' => $subject
);

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
