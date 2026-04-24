<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

// PEAR Mail Library
require_once "Mail.php";
require_once "Mail/mime.php";

$mailmessage = $_REQUEST['mailmessage'];
$to          = $_REQUEST['idemail'];

$to = "it@sriharipapers.com";


// 🔽 BIRT PARAMETERS FROM EXTJS
$ledcode  = $_REQUEST['ledcode'];
$compcode = $_REQUEST['compcode'];
$finid    = $_REQUEST['finid'];
$fromdate = $_REQUEST['fromdate'];
$todate   = $_REQUEST['todate'];
$ledname  = $_REQUEST['ledname'];
$ledtype  = $_REQUEST['ledtype'];
$withNarration = $_REQUEST['withNarration'];
$withBillAdjustment = $_REQUEST['withBillAdjustment'];

// 🔽 BIRT RUN URL (IMPORTANT: use run, not frameset)
$birtUrl = "http://10.0.0.251:8080/birt/run?__report=Accounts/AccRepLedgerWithAdjustments.rptdesign"
    . "&__format=pdf"
    . "&ledcode=$ledcode"
    . "&compcode=$compcode"
    . "&finid=$finid"
    . "&fromdate=$fromdate"
    . "&todate=$todate"
    . "&ledname=" . urlencode($ledname)
    . "&ledtype=$ledtype"
    . "&withNarration=$withNarration"
    . "&withBillAdjustment=$withBillAdjustment";

// 🔽 GET PDF FROM BIRT
$pdfContent = file_get_contents($birtUrl);

if ($pdfContent === FALSE) {
    die("Error generating PDF from BIRT");
}

// 🔽 SAVE TEMP FILE
$fileName = "Ledger_" . time() . ".pdf";
$filePath = sys_get_temp_dir() . "/" . $fileName;

file_put_contents($filePath, $pdfContent);

// 🔽 EMAIL SETTINGS (YOUR EXISTING)
$from = '<accounts@sriharipapers.com>';
$subject = 'Ledger Report';

$headers = array(
    'From' => $from,
    'To' => $to,
    'Subject' => $subject
);

// 🔽 MIME
$mime = new Mail_mime();
$mime->setHTMLBody($mailmessage);

// 🔽 ATTACH PDF
$mime->addAttachment($filePath, 'application/pdf', $fileName, false);

$body = $mime->get();
$headers = $mime->headers($headers);

// 🔽 SMTP (UNCHANGED)
$smtp = Mail::factory('smtp', array(
    'host' => 'ssl://smtp.gmail.com',
    'port' => '465',
    'auth' => true,
    'username' => 'accounts@sriharipapers.com',
    'password' => 'gfed hecz vbdf ttby'
));

// 🔽 SEND MAIL
$mail = $smtp->send($to, $headers, $body);

if (PEAR::isError($mail)) {
    echo('<p>' . $mail->getMessage() . '</p>');
} else {
    echo('<p>Ledger Email Sent Successfully!</p>');
}

// 🔽 CLEANUP TEMP FILE
unlink($filePath);

?>