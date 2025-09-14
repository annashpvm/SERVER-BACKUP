<?php

require($_SERVER["DOCUMENT_ROOT"]."/SHVPM/Mailwork/phpmailer/class.phpmailer.php");

$mailer = new PHPMailer();
$mailer->IsSMTP();
$mailer->Host = 'ssl://smtp.gmail.com:578';
$mailer->SMTPAuth = true;
$mailer->Username = 'annadurai.bv@gmail.com';  
$mailer->Password = 'anusuya1';  
$mailer->From = 'annadurai.bv@gmail.com';  
$mailer->FromName = 'Registration Success!';
$mailer->Body = 'hi';
$mailer->Subject = 'Welcome! Testing';
$mailer->AddAddress('it@sriharipapers.com'); 

if(!$mailer->Send())
{
   echo "<script>alert('Mail sent failed')</script>";
}
else
{
   echo "<script>alert('Success')</script>";
}
?>





