<?php
require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");
session_start();

$username = $_POST['username'] ?? '';
$_SESSION["modflag"] = $_POST['flag'] ?? '';

// Use the existing MySQLi connection ($conn) from dbConn.php
// Make sure $conn is properly initialized there using mysqli_connect()

$sql = "SELECT usr_code AS userid, usr_name AS username, usr_type AS userrole 
        FROM userMaster 
        WHERE usr_code = ?";

$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "s", $username);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if (mysqli_num_rows($result) > 0) {
    $arr = mysqli_fetch_assoc($result);
    $_SESSION["user"] = $arr['userrole'];
    echo "success";
} else {
    echo "failed";
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>
