<?php

$dataGETIPTEST = '10.0.0.251';
$accessname ='root';
$oldpass = 'P@ssw0rD';
$dbreq = 'shvpm';

define('DB_HOST',$dataGETIPTEST);
define('DB_USER',$accessname);
define('DB_PASS',$oldpass);
define('DB_NAME',$dbreq);

try
{
$pdo = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME,DB_USER, DB_PASS,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
}
catch (PDOException $e)
{
exit("Error: " . $e->getMessage());
}
?>



