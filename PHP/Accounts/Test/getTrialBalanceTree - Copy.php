
<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

$sql = "call accspreptrialbalanceclosing_View_Maingroup(25 ,1, '2025-04-01', '2026-03-31','2025-04-01')";
$result = mysqli_query($conn, $sql);

if (!$result) {
    die("SQL Error: " . mysqli_error($conn));
}

$data = array();

while ($row = mysqli_fetch_assoc($result)) {

    // DEBUG (REMOVE AFTER TEST)
    // print_r($row); exit;

    $data[] = array(
        "text"   => $row['grp_name'],   // make sure column exists
        "debit"  => (float)$row['debit'],
        "credit" => (float)$row['credit'],
        "leaf"   => false
    );
}

// VERY IMPORTANT FOR SP
mysqli_next_result($conn);

// OUTPUT
echo json_encode(array(
    "children" => $data
));
?>