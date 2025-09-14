<?php
include "/phpqrcode/qrlib.php";
$text = (isset($_GET["text"])?$_GET["text"]:"0");
// create a QR Code with this text and display it
QRcode::png($text) ;
?>