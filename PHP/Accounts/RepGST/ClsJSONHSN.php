<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

$finid     = $_POST['fincode'];
$compcode  = $_POST['compcode'];
$startdate = $_POST['fromdate'];
$enddate   = $_POST['todate'];
$filename  = $_POST['fname'];   

$sql = "CALL spacc_rep_json_HSN($compcode,'$finid','$startdate','$enddate')";
echo $sql . "<br>";

$result = mysqli_query($conn, $sql);

if (!$result) {
    die("Query Failed: " . mysqli_error($conn));
}

/* ---------------------------
   FETCH THE JSON RESULT
---------------------------- */
$row = mysqli_fetch_assoc($result);

if (!$row) {
    die("No data returned from procedure");
}

$jsondata = $row['jsonnew'];   // <-- Correct
echo "RAW: $jsondata<br>";

/* -------------------------------------------------------
   Clean JSON (usually not needed if procedure returns JSON)
-------------------------------------------------------- */
$jsondata = trim($jsondata);
$jsondata = trim($jsondata, "'");
$jsondata = stripslashes($jsondata);

echo "CLEANED: $jsondata<br>";

/* ---------------------------
   DECODE JSON
---------------------------- */
$decoded = json_decode($jsondata, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    die("Invalid JSON: " . json_last_error_msg() . "<br>JSON: $jsondata");
}

/* ---------------------------
   PRETTY PRINT JSON
---------------------------- */
$cleanJson = json_encode($decoded, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

/* ---------------------------
   SAVE TO FILE
---------------------------- */

$file = $_SERVER["DOCUMENT_ROOT"] . '/' . ltrim($filename, '/');

if (file_put_contents($file, $cleanJson)) {
    echo "File saved successfully: " . htmlspecialchars($filename);
} else {
    echo "Failed to write file.";
}

// clear connection for next call
mysqli_next_result($conn);
?>
