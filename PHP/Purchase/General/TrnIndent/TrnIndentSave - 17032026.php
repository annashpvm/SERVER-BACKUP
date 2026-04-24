<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_POST['cnt'];

$savetype   = $_POST['savetype'];
$compcode   = $_POST['compcode'];
$finid	    = $_POST['finid'];
$indno      = $_POST['indno'];
$inddate    = date('Y-m-d H:i:s', strtotime($_POST['inddate']));
$entdate    = $_POST['entdate'];
$indtype    = $_POST['indtype'];
$dept	    = $_POST['dept'];
$preparedby = $_POST['preparedby'];
$approvedby = $_POST['approvedby'];
$userid     = $_POST['userid'];

mysqli_begin_transaction($conn);

if ($savetype == "Add") {

    $query = "SELECT lastno
              FROM trn_runningno
              WHERE compcode='$compcode'
              AND finid='$finid'
              AND doctype='IND'
              FOR UPDATE";

    $result = mysqli_query($conn,$query);
    $row = mysqli_fetch_assoc($result);

    if ($row) {
        $indno = $row['lastno'] + 1;

        $update = "UPDATE trn_runningno
                   SET lastno='$indno'
                   WHERE compcode='$compcode'
                   AND finid='$finid'
                   AND doctype='IND'";

        $result2 = mysqli_query($conn,$update);

    } else {
        $indno = 1;

        $insertRun = "INSERT INTO trn_runningno (compcode, finid, doctype, lastno)
                      VALUES ('$compcode','$finid','IND','$indno')";

        $result2 = mysqli_query($conn,$insertRun);
    }

} else {

    $query = "DELETE FROM trnpur_indent 
              WHERE ind_fin_code='$finid' 
              AND ind_comp_code='$compcode' 
              AND ind_no = $indno";

    $result = mysqli_query($conn, $query);
}

// ================= LOOP INSERT =================
for ($i=0;$i<$rowcnt;$i++)
{
    $slno		= $griddet[$i]['slno'];
    $itemcode	= $griddet[$i]['itemcode'];
    $indtype	= $griddet[$i]['indtype'];
    $indqty		= $griddet[$i]['qty'];

    $rate = ($indqty != 0) ? ($griddet[$i]['value']/$indqty) : 0;
    $value		= $griddet[$i]['value'];

    $remarks    = str_replace("'","",$griddet[$i]['remarks']);
    $duedate    = date('Y-m-d H:i:s', strtotime($griddet[$i]['duedate']));

    $appsts     = '1';
    $sts        = $griddet[$i]['status'];

    $equip      = $griddet[$i]['equipcode'];
    $machine    = $griddet[$i]['machine'];
    $section    = $griddet[$i]['sectioncode']; 

    $poqty      = $griddet[$i]['ordqty']; 
    $recqty     = $griddet[$i]['recqty']; 
    $issqty     = $griddet[$i]['issqty'];

    $hodauth    = 'Y';
    $purauth    = $griddet[$i]['purauth'];

    $approval	= $griddet[$i]['approval'];
    if ($approval == 0) $approval = 1;

    $purpose    = str_replace("'","",$griddet[$i]['purpose']);
    $stock      = (float)$griddet[$i]['stock'];

    $StdLifeTime= $griddet[$i]['StdLifeTime'];
    $ActLifeTime= $griddet[$i]['ActLifeTime'];
    $Reason     = str_replace("'","",$griddet[$i]['Reason']);

    // ================= INSERT =================
    $query1= "INSERT INTO trnpur_indent VALUES(
        '$compcode','$finid','$indno','$inddate','$indtype','$dept',
        '$machine','$section','$equip','$slno','$itemcode','$indqty',
        '$rate','$value','$poqty','$recqty','$issqty','$indqty',
        '$duedate','$remarks','$approval','$sts','',
        '$preparedby','$hodauth','$purauth','$purpose',
        '$stock','$StdLifeTime','$ActLifeTime','$Reason'
    )";

    $result1 = mysqli_query($conn, $query1);

    if (!$result1) {
        mysqli_rollback($conn);
        echo '({"success":"false","msg":"Insert Failed - '.mysqli_error($conn).'"})';
        exit;
    }
}

// ================= FINAL COMMIT =================
if ($savetype == "Add") {

    if($result2) {
        mysqli_commit($conn);
        echo '({"success":"true","msg":"' . $indno . '"})';
    } else {
        mysqli_rollback($conn);
        echo '({"success":"false","msg":"Running No Failed"})';
    }

} else {

    mysqli_commit($conn);
    echo '({"success":"true","msg":"' . $indno . '"})';
}
?>