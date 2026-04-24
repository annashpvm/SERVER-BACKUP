<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$griddet = json_decode($_REQUEST['griddet'], true);
$rowcnt  = $_POST['cnt'];

$savetype   = $_POST['savetype'];
$compcode   = $_POST['compcode'];
$finid      = $_POST['finid'];
$indno      = $_POST['indno'];
$inddate    = date('Y-m-d H:i:s', strtotime($_POST['inddate']));
$dept       = $_POST['dept'];
$preparedby = $_POST['preparedby'];
$userid     = $_POST['userid'];

mysqli_begin_transaction($conn);

try {

    // ================= SAFE RUNNING NUMBER =================
    if ($savetype == "Add") {
        $check = $conn->prepare("SELECT lastno FROM trn_runningno WHERE compcode=? AND finid=? AND doctype='IND'");

        $check->bind_param("ii", $compcode, $finid);
        $check->execute();
        $res = $check->get_result();

        if ($res->num_rows == 0) {

            // 🔹 First time insert
            $insertRun = $conn->prepare("
                INSERT INTO trn_runningno (compcode, finid, doctype, lastno)
                VALUES (?, ?, 'IND', 1)
            ");

            $insertRun->bind_param("ii", $compcode, $finid);

            if (!$insertRun->execute()) {
                throw new Exception($insertRun->error);
            }

            $indno = 1;

        } else {

            // 🔹 Update running number
            $update = $conn->prepare("
                UPDATE trn_runningno
                SET lastno = LAST_INSERT_ID(lastno + 1)
                WHERE compcode=? AND finid=? AND doctype='IND'
            ");

            $update->bind_param("ii", $compcode, $finid);

            if (!$update->execute()) {
                throw new Exception($update->error);
            }

            // 🔹 Get new number
            $res = $conn->query("SELECT LAST_INSERT_ID() as indno");
            $row = $res->fetch_assoc();
            $indno = $row['indno'];
        }
    } 
    else {

        $stmtDel = $conn->prepare("DELETE FROM trnpur_indent 
                                  WHERE ind_fin_code=? AND ind_comp_code=? AND ind_no=?");
        $stmtDel->bind_param("iii", $finid, $compcode, $indno);
        $stmtDel->execute();
    }

    $stmt = $conn->prepare("
    INSERT INTO trnpur_indent (
        ind_comp_code, ind_fin_code, ind_no, ind_date, ind_type,
        ind_dept_code, ind_machine, ind_section, ind_equip,
        ind_slno, ind_item_code, ind_qty, ind_rate, ind_value,
        ind_po_qty, ind_rec_qty, ind_iss_qty, ind_bal_qty,
        ind_due_date, ind_remarks, ind_approval_status, ind_status,
        ind_cancel_status, ind_prepared_by, ind_hod_auth, ind_po_auth,
        ind_purpose, ind_stock, ind_std_lifetime, ind_act_lifetime, ind_reason  
    ) VALUES (
        ?,?,?,?,?,?,?,?,?,?,
        ?,?,?,?,?,?,?,?,?,?,
        ?,?,?,?,?,?,?,?,?,?,
        ?
    )
");

    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }

    // ================= LOOP INSERT =================
    for ($i = 0; $i < $rowcnt; $i++) {

        $rec = $griddet[$i];

        $slno     = (int)$rec['slno'];
        $itemcode = (int)$rec['itemcode'];
        $indtype  = $rec['indtype'];
        $indqty   = (float)$rec['qty'];
        $value    = (float)$rec['value'];

        $rate = ($indqty > 0) ? round($value / $indqty, 2) : 0;

        $remarks = $rec['remarks'];
        $purpose = $rec['purpose'];
        $Reason  = $rec['Reason'];

        $duedate = !empty($rec['duedate']) 
            ? date('Y-m-d H:i:s', strtotime($rec['duedate'])) 
            : date('Y-m-d H:i:s');

        $sts = $rec['status'] ?? '';

        $equip   = (int)$rec['equipcode'];
        $machine = $rec['machine'];
        $section = (int)$rec['sectioncode'];

        $poqty = (float)$rec['ordqty'];
        $recqty= (float)$rec['recqty'];
        $issqty= (float)$rec['issqty'];

        $approval = ($rec['approval'] == 0) ? 1 : $rec['approval'];

        $hodauth = 'Y';
        $purauth = $rec['purauth'];

        $stock = (float)$rec['stock'];
        $StdLifeTime = $rec['StdLifeTime'];
        $ActLifeTime = $rec['ActLifeTime'];

        $blank = '';

        // ================= BIND =================
        $stmt->bind_param(
            str_repeat("s", 31),
            $compcode, $finid, $indno, $inddate, $indtype,
            $dept, $machine, $section, $equip,
            $slno, $itemcode, $indqty, $rate, $value,
            $poqty, $recqty, $issqty, $indqty,
            $duedate, $remarks, $approval, $sts,
            $blank, $preparedby, $hodauth, $purauth,
            $purpose, $stock, $StdLifeTime, $ActLifeTime, $Reason
        );

        if (!$stmt->execute()) {
            
            throw new Exception($stmt->error);
        }
    }

    // ================= COMMIT =================
    mysqli_commit($conn);

    echo json_encode([
        "success" => true,
        "msg" => $indno
    ]);

} catch (Exception $e) {

    mysqli_rollback($conn);

    echo json_encode([
        "success" => false,
        "msg" => $e->getMessage()
    ]);
}
?>