<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

$servernameMain = "10.0.0.251";
$databaseMain   = "shvpmpayroll";

$username = "root";
$password = "P@ssw0rD";


global $conn;  
mysqli_begin_transaction($conn);

$fromDate = '2026-01-17 00:00:00';
$toDate   = '2026-01-17 23:59:59';

$fromAccess = "#" . date("Y-m-d H:i:s", strtotime($fromDate)) . "#";
$toAccess   = "#" . date("Y-m-d H:i:s", strtotime($toDate)) . "#";



try{
   $pdoMain = new PDO('mysql:host=10.0.0.251;dbname=shvpmpayroll','root','P@ssw0rD');

}catch(PDOException $error){

    echo $error->getmessage();
}
// Access DB path

$connStr = "Driver={Microsoft Access Driver (*.mdb)};Dbq=D:\\attendance\\att2000.mdb;";

// ODBC connection
$accessConn = odbc_connect($connStr, "", "");

if (!$accessConn) {
    die("Access DB connection failed : " . odbc_errormsg());
}



$sqlAccess = "SELECT * FROM checkinout WHERE checktime BETWEEN $fromAccess AND $toAccess";
$result = odbc_exec($accessConn, $sqlAccess);

if (!$result) {
    die("Access query failed");
}

$mysql->begin_transaction();

$inserted = 0;
$skipped  = 0;

while ($row = odbc_fetch_array($result)) {

    // Clean values
    $userid    = $mysql->real_escape_string(trim($row['USERID']));
    $checktime = $mysql->real_escape_string(trim($row['CHECKINOUT']));
    
    echo $checktime;
    // Convert Access date → MySQL DATETIME
    $checktime = date(
        "Y-m-d H:i:s",
        strtotime($row['checktime'])
    );

    // Skip empty records
    if ($userid == "" || $checktime == "") {
        $skipped++;
        continue;
    }


}

/* ---------- COMMIT ---------- */

$mysql->commit();

/* ---------- CLOSE CONNECTIONS ---------- */

odbc_close($accessConn);
$mysql->close();

/* ---------- RESULT ---------- */

echo "<h3>Attendance Import Completed</h3>";
echo "Inserted Records : $inserted <br>";
echo "Skipped Records  : $skipped <br>";

?>



if ( ($insertcount > 0 && $updatecount > 0 ) || $deletecount > 0  ) {
   mysqli_commit($conn); 

} else {
    mysqli_rollback($conn);


}


?>
