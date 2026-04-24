<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

mysqli_begin_transaction($conn);

try {

    $griddet = json_decode($_POST['griddet'], true);
    $rowcnt  = (int)$_POST['cnt'];
    $compcode = (int)$compcode;
    $finid    = (int)$finid;
    $finid      = $_POST['finid'];
    $indno      = (int)$_POST['indno'];
    $inddate    = $_POST['inddate'];
    $dept       = $_POST['dept'];
    $preparedby = $_POST['preparedby'];
    $userid     = $_POST['userid'];

    $doctype = 'IND';

    /* ===============================
       RUNNING NUMBER LOGIC
    =============================== */
    if ($savetype == "Add") {

        $stmt = $conn->prepare("
            SELECT lastno 
            FROM trn_runningno 
            WHERE compcode=? AND finid=? AND doctype=?
            FOR UPDATE
        ");
        $stmt->bind_param("iis", $compcode, $finid, $doctype);
        $stmt->execute();
        $res = $stmt->get_result();

        if ($res->num_rows == 0) {

            // 👉 New Financial Year Entry
            $stmtInsert = $conn->prepare("
                INSERT INTO trn_runningno (compcode, finid, doctype, lastno)
                VALUES (?, ?, ?, 0)
            ");
            $stmtInsert->bind_param("sss", $compcode, $finid, $doctype);

            if (!$stmtInsert->execute()) {
                throw new Exception("Failed to create running number");
            }

            $indno = 1;

        } else {

            $row = $res->fetch_assoc();
            $indno = (int)$row['lastno'] + 1;
        }

        // 👉 Update running number
        $stmtUpdate = $conn->prepare("
            UPDATE trn_runningno 
            SET lastno=? 
            WHERE compcode=? AND finid=? AND doctype=?
        ");
        $stmtUpdate->bind_param("iiis", $indno, $compcode, $finid, $doctype);

        if (!$stmtUpdate->execute()) {
            throw new Exception("Failed to update running number");
        }

    } else {

        /* ===============================
           DELETE OLD RECORDS (EDIT MODE)
        =============================== */
        $stmtDel = $conn->prepare("
            DELETE FROM trnpur_indent 
            WHERE ind_fin_code=? AND ind_comp_code=? AND ind_no=?
        ");
        $stmtDel->bind_param("iii", $finid, $compcode, $indno);

        if (!$stmtDel->execute()) {
            throw new Exception("Delete failed");
        }
    }

    /* ===============================
       INSERT PREPARE
    =============================== */
    $stmtIns = $conn->prepare("
        INSERT INTO trnpur_indent (
            ind_comp_code, ind_fin_code, ind_no, ind_date, ind_type,
            ind_dept, ind_machine, ind_section, ind_equip,
            ind_slno, ind_itemcode, ind_qty, ind_rate, ind_value,
            ind_poqty, ind_recqty, ind_issqty, ind_balqty,
            ind_duedate, ind_remarks, ind_approval, ind_status,
            ind_dummy, ind_preparedby, ind_hodauth, ind_purauth,
            ind_purpose, ind_stock, ind_std_life, ind_act_life, ind_reason
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    ");

    $dummy = ''; // required column

    for ($i = 0; $i < $rowcnt; $i++) {

        $row = $griddet[$i];

        $slno      = (int)$row['slno'];
        $itemcode  = $row['itemcode'];
        $grid_type = $row['indtype'];
        $qty       = (float)$row['qty'];
        $value     = (float)$row['value'];
        $rate      = ($qty != 0) ? ($value / $qty) : 0;

        $remarks   = $row['remarks'];
        $duedate   = $row['duedate'];
        $approval  = ($row['approval'] == 0) ? 1 : $row['approval'];
        $status    = $row['status'];

        $equip     = $row['equipcode'];
        $machine   = $row['machine'];
        $section   = $row['sectioncode'];

        $poqty     = (float)$row['ordqty'];
        $recqty    = (float)$row['recqty'];
        $issqty    = (float)$row['issqty'];

        $purpose   = $row['purpose'];
        $stock     = (float)$row['stock'];
        $stdlife   = $row['StdLifeTime'];
        $actlife   = $row['ActLifeTime'];
        $reason    = $row['Reason'];

        $hodauth   = 'Y';
        $purauth   = $row['purauth'];

        $balqty    = $qty;

        $stmtIns->bind_param(
            "iiissisiiiddddddddsissssssds ss",
            $compcode, $finid, $indno, $inddate, $grid_type,
            $dept, $machine, $section, $equip,
            $slno, $itemcode, $qty, $rate, $value,
            $poqty, $recqty, $issqty, $balqty,
            $duedate, $remarks, $approval, $status,
            $dummy, $preparedby, $hodauth, $purauth,
            $purpose, $stock, $stdlife, $actlife, $reason
        );
        if (!$stmtIns->execute()) {
            throw new Exception("Insert failed at row " . ($i + 1));
        }
    }

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