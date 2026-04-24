<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

require_once "Mail.php";
require_once "Mail/mime.php";

// 🔽 INPUTS
$mailmessage = $_REQUEST['mailmessage'];
$to          = $_REQUEST['idemail'];

// 🔽 FOR TESTING (optional)
// $to = "it@sriharipapers.com";

// 🔽 PARAMETERS FROM EXTJS
$ledcode  = $_REQUEST['ledcode'];
$compcode = $_REQUEST['compcode'];
$finid    = $_REQUEST['finid'];
$fromdate = $_REQUEST['fromdate'];
$todate   = $_REQUEST['todate'];
$ledname  = $_REQUEST['ledname'];
$ledtype  = $_REQUEST['ledtype'];
$withNarration = $_REQUEST['withNarration'];
$withBillAdjustment = $_REQUEST['withBillAdjustment'];

$emailpdf = 'N';   

$params = "&ledcode=$ledcode"
        . "&compcode=$compcode"
        . "&finid=$finid"
        . "&fromdate=$fromdate"
        . "&todate=$todate"
        . "&ledname=" . urlencode($ledname)
        . "&ledtype=$ledtype"
        . "&withNarration=$withNarration"
        . "&withBillAdjustment=$withBillAdjustment"
        . "&EMailpdf=$emailpdf";
        
// ✅ BIRT URL (IMPORTANT: use RUN)
//$birtUrl = "http://10.0.0.251:8080/birt/run?__report=Accounts/AccRepLedgerWithAdjustments.rptdesign&__format=pdf" . $params;
//$birtUrl = "http://10.0.0.251:8080/birt/run?__report=Accounts/AccRepLedgerWithAdjustments.rptdesign&__format=pdf&" . $params;
$birtUrl = "http://10.0.0.251:8080/birt/run?__report=Accounts/AccRepLedgerWithAdjustments.rptdesign&__format=pdf&__pageoverflow=fitToPage" . $params;
// ✅ CURL TO FETCH PDF
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $birtUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

// behave like browser
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "User-Agent: Mozilla/5.0",
    "Accept: application/pdf"
));

// cookies (important if session-based)
curl_setopt($ch, CURLOPT_COOKIEJAR, "cookie.txt");
curl_setopt($ch, CURLOPT_COOKIEFILE, "cookie.txt");

$pdfContent = curl_exec($ch);

if (curl_errno($ch)) {
    die("Curl Error: " . curl_error($ch));
}

curl_close($ch);

// ✅ VALIDATE PDF
if (substr($pdfContent, 0, 4) != '%PDF') {
    echo "BIRT did not return PDF:<br>";
    echo htmlspecialchars($pdfContent);
    exit;
}

// ✅ SAVE TEMP FILE
$fileName = "Ledger_" . time() . ".pdf";
$filePath = sys_get_temp_dir() . "/" . $fileName;

//file_put_contents($filePath, $pdfContent);

// ✅ EMAIL SETTINGS
$from = '<finance@sriharipapers.com>';
$subject = 'Ledger Report';

$headers = array(
    'From' => $from,
    'To' => $to,
    'Subject' => $subject
);

// ✅ MIME (VERY IMPORTANT SECTION)
$mime = new Mail_mime();

// plain + html body
$mime->setTXTBody("Please find attached Ledger Report");
$mime->setHTMLBody($mailmessage);

// 🔴 CRITICAL: BASE64 ATTACHMENT


$mime->addAttachment(
    $pdfContent,                 // 🔴 DIRECT DATA (NOT FILE PATH)
    'application/pdf',
    $fileName,
    false,
    'base64'
);

// 🔴 CRITICAL: PROPER ENCODING
$body = $mime->get(array(
    'text_encoding' => '7bit',
    'text_charset'  => 'UTF-8',
    'html_charset'  => 'UTF-8',
    'head_charset'  => 'UTF-8'
));

$headers = $mime->headers($headers);

// ✅ SMTP (UNCHANGED)
$smtp = Mail::factory('smtp', array(
    'host' => 'ssl://smtp.gmail.com',
    'port' => '465',
    'auth' => true,
    'username' => 'finance@sriharipapers.com',
    'password' => 'molh jlrp pzbe liym'
));

// ✅ SEND MAIL
$mail = $smtp->send($to, $headers, $body);

if (PEAR::isError($mail)) {
    echo 'Mail Error: ' . $mail->getMessage();
} else {
    echo 'Ledger Email Sent Successfully!';
}

// ✅ DELETE TEMP FILE
unlink($filePath);

?>