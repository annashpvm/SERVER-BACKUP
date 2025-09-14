<?php
// (A) CONNECT TO DATABASE - CHANGE SETTINGS TO YOUR OWN!
$dbHost = "localhost";
$dbName = "test";
$dbChar = "utf8";
$dbUser = "root";
$dbPass = "";
try {
  $pdo = new PDO(
    "mysql:host=$dbHost;dbname=$dbName;charset=$dbChar",
    $dbUser, $dbPass, [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_NAMED
    ]
  );
} catch (Exception $ex) { exit($ex->getMessage()); }

// (B) CREATE EMPTY CSV FILE ON SERVER
$csvFile = "export.csv";
$handle = fopen($csvFile, "w");
if ($handle === false) { exit("Error creating $csvFile"); }

// (C) GET USERS FROM DATABASE + WRITE TO FILE
$stmt = $pdo->prepare("SELECT * FROM `users`");
$stmt->execute();
while ($row = $stmt->fetch()) {
  // print_r($row);
  fputcsv($handle, [$row["user_id"], $row["user_email"], $row["user_name"]]);
}
fclose($handle);
echo "DONE!";
