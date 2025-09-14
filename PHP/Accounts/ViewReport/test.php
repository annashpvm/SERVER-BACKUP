<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$mailmessage = $_REQUEST['mailmessage'];
echo $mailmessage;


$file = $_SERVER["DOCUMENT_ROOT"].'/SHVPM/Report/'."test.pdf";

if (file_put_contents($file,$mailmessage))
{
    $str = file_get_contents($file);
    echo  print_r($str, true) ;
}
else
    echo("Failed");

    
?>


