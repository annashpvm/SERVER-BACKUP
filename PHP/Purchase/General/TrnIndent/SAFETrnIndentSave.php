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

// ================= RUNNING NUMBER =================
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

// ================= PREPARE INSERT =================
$stmt = $conn->prepare("INSERT INTO trnpur_indent VALUES(
    ?,?,?,?,?,?,?,?,?,?,
    ?,?,?,?,?,?,?,?,?,?,
    ?,?,?,?,?,?,?,?,?,?,
    ?
)");

if (!$stmt) {
    mysqli_rollback($conn);
    echo '({"success":"false","msg":"Prepare Failed"})';
    exit;
}

// ================= LOOP INSERT =================
for ($i=0;$i<$rowcnt;$i++)
{
    $slno		= (int)$griddet[$i]['slno'];
    $itemcode	= (int)$griddet[$i]['itemcode'];
    $indtype	= $griddet[$i]['indtype'];
    $indqty		= (float)$griddet[$i]['qty'];

    $rate = ($indqty != 0) ? ($griddet[$i]['value']/$indqty) : 0;
    $value		= (float)$griddet[$i]['value'];

    $remarks    = str_replace("'","",$griddet[$i]['remarks']);
    $rawDate = $griddet[$i]['duedate'];


    if (!empty($rawDate)) {
        $ts = strtotime($rawDate);
    
        if ($ts) {
            $duedate = date('Y-m-d H:i:s', $ts);
        } else {
            $duedate = date('Y-m-d H:i:s'); // fallback
        }
    } else {
        $duedate = date('Y-m-d H:i:s'); // fallback
    }

    $sts = !empty($griddet[$i]['status']) ? $griddet[$i]['status'] : '';

    $equip      = (int)$griddet[$i]['equipcode'];
    $machine    = $griddet[$i]['machine'];
    $section    = (int)$griddet[$i]['sectioncode']; 

    $poqty      = (float)$griddet[$i]['ordqty']; 
    $recqty     = (float)$griddet[$i]['recqty']; 
    $issqty     = (float)$griddet[$i]['issqty'];

    $approval	= $griddet[$i]['approval'];
    if ($approval == 0) $approval = 1;

    $hodauth    = 'Y';
    $purauth    = $griddet[$i]['purauth'];

    $purpose    = str_replace("'","",$griddet[$i]['purpose']);
    $stock      = (float)$griddet[$i]['stock'];

    $StdLifeTime= $griddet[$i]['StdLifeTime'];
    $ActLifeTime= $griddet[$i]['ActLifeTime'];
    $Reason = str_replace("'","",$griddet[$i]['Reason']);

    $blank = ''; // cancel status

    // ================= BIND =================



    
    $stmt->bind_param(
        "sssssssssssssssssssssssssssssss",
        $compcode, $finid, $indno, $inddate, $indtype,
        $dept, $machine, $section, $equip,
        $slno, $itemcode, $indqty, $rate, $value,
        $poqty, $recqty, $issqty, $indqty,
        $duedate, $remarks, $approval, $sts,
        $blank, $preparedby, $hodauth, $purauth,
        $purpose, $stock, $StdLifeTime, $ActLifeTime, $Reason
    );



    if (!$stmt->execute()) {
        mysqli_rollback($conn);
        echo '({"success":"false","msg":"'.$stmt->error.'"})';
        exit;
    }
}

// ================= COMMIT =================
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