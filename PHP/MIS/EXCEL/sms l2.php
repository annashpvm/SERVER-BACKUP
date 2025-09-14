// <?php
// the message
//$msg = "First line of text\nSecond line of text";

// use wordwrap() if lines are longer than 70 characters
//$msg = wordwrap($msg,70);

// send email
//mail("annadurai.bv@gmail.com","My subject",$msg);
//?> 

 <! --
<html>

   <head>
      <title>Sending HTML email using PHP</title>
   </head>
   
   <body>
      
      <?php
         $to = "annadurai.bv@gmail.com";
         $subject = "This is subject";
         
         $message = "<b>This is HTML message.</b>";
         $message .= "<h1>This is headline.</h1>";
         
         $header = "From:annadurai.bv@gmail.com \r\n";
         $header .= "Cc:afgh@somedomain.com \r\n";
         $header .= "MIME-Version: 1.0\r\n";
         $header .= "Content-type: text/html\r\n";
         
         $retval = mail ($to,$subject,$message,$header);
         
         if( $retval == true ) {
            echo "Message sent successfully...";
         }else {
            echo "Message could not be sent...";
         }
      ?>

<?php

// Authentication key
$authKey = "eNqHwfla5GAiTcOMPtWZmpgY10oXDVrBEFx4U79j2nhCzv6L3bRThucYS1dgCE8A5OfL0rF3tUjH6s79";

// Also add muliple mobile numbers, separated by comma
$phoneNumber = $_POST['8072592813'];

// route4 sender id should be 6 characters long.
$senderId = "ANNADURAI";

// Your message to send
$message = urlencode($_POST['THIS IS TEST MESSAGE SEND FROM TEST API']);

// POST parameters
$fields = array(
    "sender_id" => $senderId,
    "message" => $message,
    "language" => "english",
    "route" => "p",
    "numbers" => $phoneNumber,
);

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "www.google.com",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_SSL_VERIFYHOST => 0,
  CURLOPT_SSL_VERIFYPEER => 0,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => json_encode($fields),
  CURLOPT_HTTPHEADER => array(
    "authorization: ".$authKey,
    "accept: */*",
    "cache-control: no-cache",
    "content-type: application/json"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
?>    
 </html>


-->



