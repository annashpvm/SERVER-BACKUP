<?php
include "qrlib.php";
$text = (isset($_GET["param"])?$_GET["param"]:"0");
// create a QR Code with this text and display it
QRcode::png($text);
?>
