<?php 

$servername   = "10.0.0.251";
$database = "shvpm";
$username = "root";
$password = "P@ssw0rD";

//// Create connection
//$conn = new mysqli($servername, $username, $password, $database);
//// Check connection
//if ($conn->connect_error) {
//   die("Connection failed: " . $conn->connect_error);
//}
//  echo "Connected successfully";
//$conn = mysql_connect($servername, $username, $password, $database);
//echo $conn;
mysql_connect($servername,$username,$password) or die("connect : failure" . mysql_error());
mysql_select_db($database)

?>





