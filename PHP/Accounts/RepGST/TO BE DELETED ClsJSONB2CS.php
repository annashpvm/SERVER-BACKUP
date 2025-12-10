<?php
require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");
global $conn;

ini_set('display_errors', 1);
error_reporting(E_ALL);

// ----------- INPUTS ----------- //
$finid     = $_POST['fincode'];
$compcode  = $_POST['compcode'];
$startdate = $_POST['fromdate'];
$enddate   = $_POST['todate'];
$filename  = $_POST['fname'];

$filepath = $_SERVER["DOCUMENT_ROOT"] . '/' . ltrim($filename, '/');


// ----------- RUN STORED PROCEDURE ----------- //
$sql = "CALL spacc_rep_json_B2CS($compcode, '$finid', '$startdate', '$enddate')";


echo $sql;
echo "<br>";

if (!mysqli_query($conn, $sql)) {
    die("SQL Error: " . mysqli_error($conn));
}

$jsondata = "";

// IMPORTANT: fetch all result sets until jsonnew is found
do {
    if ($result = mysqli_store_result($conn)) {

        while ($row = mysqli_fetch_assoc($result)) {
            echo $row['jsonnew'];
            echo "<br>";
            if (isset($row['jsonnew'])) {
                $jsondata = $row['jsonnew'];
            }
        }

        mysqli_free_result($result);
    }
} while (mysqli_more_results($conn) && mysqli_next_result($conn));


echo $jsondata;
echo "<br>";

// ----------- VALIDATE RAW JSON ----------- //
if (trim($jsondata) === "" || $jsondata === null) {
    die("Error: Stored procedure returned EMPTY JSON.");
}

// ----------- CLEAN JSON ----------- //
// Remove outer single quotes returned by MySQL
$jsondata = trim($jsondata, "'");

// Convert escaped quotes \" to real quotes "
$jsondata = stripcslashes($jsondata);

// ----------- DECODE ----------- //
$decoded = json_decode($jsondata, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    die("Invalid JSON: " . json_last_error_msg() . "<br>RAW JSON: [$jsondata]");
}

// ----------- PRETTY JSON ----------- //
$cleanJson = json_encode($decoded, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

// ----------- SAVE FILE ----------- //
if (file_put_contents($filepath, $cleanJson)) {
    echo "File saved successfully: " . htmlspecialchars($filename);
} else {
    echo "Failed to write file.";
}

?>
