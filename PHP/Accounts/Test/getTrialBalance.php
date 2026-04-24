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

$mgrpcode = $_POST['mgrpcode'] ?? 0;
$subgrp   = $_POST['subgrp'] ?? 0;
$subgrp2  = $_POST['subgrp2'] ?? 0;

// ==========================
// CALL STORED PROCEDURE
// ==========================

if ($level == 'GROUP') {

    $sql = "CALL accspreptrialbalanceclosing_View_Maingroup(
        $finid, $compcode, '$startdate', '$enddate','$finfirstdate'
    )";

} elseif ($level == 'SUBMAIN') {

    $sql = "CALL accspreptrialbalanceclosing_View_SubMaingroup(
        $finid, $compcode, '$startdate', '$enddate','$mgrpcode','$finfirstdate'
    )";

} elseif ($level == 'SUBGROUP') {

    $sql = "CALL accspreptrialbalanceclosing_View_Subgroup(
        $finid, $compcode, '$startdate', '$enddate','$subgrp','$finfirstdate'
    )";

} elseif ($level == 'LEDGER') {

    $sql = "CALL accspreptrialbalanceclosing_View_Subgroup_levelend(
        $finid, $compcode, '$startdate', '$enddate','$subgrp2','$finfirstdate',$mgrpcode
    )";
}

// ==========================
// EXECUTE QUERY
// ==========================
$result = mysqli_query($conn, $sql);

$data = array();

// ==========================
// MAP DATA BASED ON LEVEL
// ==========================
while ($row = mysqli_fetch_assoc($result)) {

    if ($level == 'GROUP') {

        $code = $row['maingrp'];
        $name = $row['grp_name'];

    } elseif ($level == 'SUBMAIN') {

        $code = $row['subgrp'];
        $name = $row['grp_name'];

    } elseif ($level == 'SUBGROUP') {

        $code = $row['subgrp2'];
        $name = $row['grp_name'];

    } elseif ($level == 'LEDGER') {

        $code = $row['acctran_led_code'];
        $name = $row['cust_name'];
    }

    $data[] = array(
        "code"   => $code,
        "name"   => $name,
        "debit"  => (float)$row['debit'],
        "credit" => (float)$row['credit']
    );
}

// ==========================
// RETURN JSON
// ==========================
echo json_encode(array(
    "success" => true,
    "data"    => $data
));
?>