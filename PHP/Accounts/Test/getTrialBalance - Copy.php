<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

// ==========================
// GET PARAMETERS
// ==========================
$level        = $_POST['level'] ?? 'GROUP';
$finid        = $_POST['finid'] ?? 0;
$compcode     = $_POST['compcode'] ?? 0;
$startdate    = $_POST['startdate'] ?? '';
$enddate      = $_POST['enddate'] ?? '';
$finfirstdate = $_POST['finfirstdate'] ?? '';

$grp_code     = $_POST['grp_code'] ?? 0;
$subgrp_code  = $_POST['subgrp_code'] ?? 0;

// ==========================
// DEBUG (optional)
// ==========================
// echo json_encode($_POST); exit;

// ==========================
// CALL STORED PROCEDURE
// ==========================

if ($level == 'GROUP') {
    $sql = "call accspreptrialbalanceclosing_View_Maingroup($finid ,$compcode, '$startdate', '$enddate','$finfirstdate')";     
    echo $sql;       

} elseif ($level == 'SUBGROUP') {

    $sql = "CALL sp_trial_balance_subgroup(
                '$compcode',
                '$finid',
                '$startdate',
                '$enddate',
                '$finfirstdate',
                '$grp_code'
            )";

} elseif ($level == 'LEDGER') {

    $sql = "CALL sp_trial_balance_ledger(
                '$compcode',
                '$finid',
                '$startdate',
                '$enddate',
                '$finfirstdate',
                '$subgrp_code'
            )";
}

// ==========================
// EXECUTE QUERY
// ==========================

//echo $sql;
$result = mysqli_query($conn, $sql);

$data = array();

while ($row = mysqli_fetch_assoc($result)) {

    $data[] = array(
        "code"   => $row['maingrp'],        // 👈 map
        "name"   => $row['grp_name'],       // 👈 map
        "debit"  => (float)$row['debit'],   // 👈 current debit
        "credit" => (float)$row['credit']   // 👈 current credit
    );
}

// ==========================
// RETURN JSON
// ==========================
echo json_encode(array(
    "success" => true,
    "data"    => $data
));