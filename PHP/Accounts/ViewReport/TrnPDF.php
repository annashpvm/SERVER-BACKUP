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






?>


