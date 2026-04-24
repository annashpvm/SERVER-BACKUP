<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

// ✅ GET PARAMS
$level        = $_REQUEST['level'] ?? 'GROUP';
$mgrpcode     = $_REQUEST['mgrpcode'] ?? 0;
$subgrp       = $_REQUEST['subgrp'] ?? 0;
$subgrp2      = $_REQUEST['subgrp2'] ?? 0;

$finid        = $_REQUEST['finid'];
$compcode     = $_REQUEST['compcode'];
$startdate    = $_REQUEST['startdate'];
$enddate      = $_REQUEST['enddate'];
$finfirstdate = $_REQUEST['finfirstdate'];

// ✅ DECIDE QUERY
if ($level == 'GROUP') {

    $sql = "CALL accspreptrialbalanceclosing_View_Maingroup(
        $finid, $compcode, '$startdate', '$enddate', '$finfirstdate')";
        
    //echo $sql;

} elseif ($level == 'SUBMAIN') {

    $sql = "CALL accspreptrialbalanceclosing_View_SubMaingroup(
        $finid, $compcode, '$startdate', '$enddate', '$mgrpcode', '$finfirstdate'
    )";

} elseif ($level == 'SUB') {

    $sql = "CALL accspreptrialbalanceclosing_View_Subgroup(
        $finid, $compcode, '$startdate', '$enddate', '$subgrp', '$finfirstdate'
    )";

} else {

    $sql = "CALL accspreptrialbalanceclosing_View_Subgroup_levelend(
        $finid,
        $compcode,
        '$startdate',
        '$enddate',
        $subgrp2,            -- ✅ NO quotes (INT)
        '$finfirstdate',
        $mgrpcode            -- ✅ NO quotes
    )";

}
$result = mysqli_query($conn, $sql);

if (!$result) {
    die("SQL Error: " . mysqli_error($conn));
}

$data = [];

// ✅ FETCH USING NUMERIC INDEX (IMPORTANT)
while ($row = mysqli_fetch_row($result)) {

    if ($level == 'GROUP') {

        $data[] = [
            "text"      => $row[1],
            "debit"     => (float)$row[4],
            "credit"    => (float)$row[5],
            "closing"   => (float)$row[6],

            "level"     => 'SUBMAIN',
            "mgrpcode"  => (int)$row[0],

            "subgrp"    => 0,
            "subgrp2"   => 0,

            "leaf"      => false
        ];

    } elseif ($level == 'SUBMAIN') {

        $data[] = [
            "text"      => $row[2],
            "debit"     => (float)$row[5],
            "credit"    => (float)$row[6],
            "closing" => (float)$row[7],

            "level"     => 'SUB',

            "mgrpcode"  => (int)$mgrpcode,
            "subgrp"    => (int)$row[1],

            "subgrp2"   => 0,
            "leaf"      => false
        ];

    } elseif ($level == 'SUB') {

        // 🔥 THIS WAS YOUR ISSUE

        $data[] = [
            "text"      => $row[1],   // grp_name
            "debit"     => (float)$row[4],
            "credit"    => (float)$row[5],
            "closing" => (float)$row[6],
            "level"     => 'END',
    
            "mgrpcode"  => (int)$mgrpcode,
            "subgrp"    => (int)$subgrp,
    
            // 🔥 THIS LINE WAS MISSING / WRONG
            "subgrp2"   => (int)$row[0],   // ✅ VERY IMPORTANT
    
            "leaf"      => false
        ];
    } else {

        // FINAL LEDGER LEVEL

        $data[] = [
            "text"      => $row[2],   // ✅ cust_name
            "debit"     => (float)$row[5],
            "credit"    => (float)$row[6],
            "closing" => (float)$row[7],
            "leaf"      => true
        ];
    }
}

// VERY IMPORTANT for multiple SP calls
mysqli_next_result($conn);

// ✅ OUTPUT
// OUTPUT
echo json_encode(array(
    "children" => $data
));
?>