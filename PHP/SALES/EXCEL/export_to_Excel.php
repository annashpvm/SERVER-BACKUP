<?php
// (A) CONNECT TO DATABASE - CHANGE SETTINGS TO YOUR OWN!


$dbHost = "10.0.0.251";
$dbName = "shvpm";
$dbChar = "utf8";
$dbUser = "root";
$dbPass = "P@ssw0rD";
try {
  $pdo = new PDO(
    "mysql:host=$dbHost;dbname=$dbName;charset=$dbChar",
    $dbUser, $dbPass, [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_NAMED
    ]
  );
} catch (Exception $ex) { exit($ex->getMessage()); }


// (B) HTTP CSV HEADERS
header("Content-Type: application/octet-stream");
header("Content-Transfer-Encoding: Binary");
header("Content-disposition: attachment; filename=\"export.csv\"");




// (C) GET USERS FROM DATABASE + DIRECT OUTPUT
$stmt = $pdo->prepare("SELECT * FROM `massal_customer`");
$stmt->execute();
echo implode(",", ['cust Code', 'Customer Name Name', 'Cust Add1' , 'Pin Code']);
echo "\r\n";
while ($row = $stmt->fetch()) {

//Mehod1
  echo implode(",", [$row["cust_code"], $row["cust_ref"], $row["cust_add1"], $row["cust_zip"]]);
  //echo implode(,[$row["cust_code"], $row["cust_ref"], $row["cust_add1"], $row["cust_zip"]]);

  echo "\r\n";

}

echo "OK";

?>

<html>
<body>

<form action="upload.php" method="post" enctype="multipart/form-data">
  Select image to upload:
  <input type="file" name="fileToUpload" id="fileToUpload">
  <input type="submit" value="Upload Image" name="submit">
</form>

</body>
</html>
