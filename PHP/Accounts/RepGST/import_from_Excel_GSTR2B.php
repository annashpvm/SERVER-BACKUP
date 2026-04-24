<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once __DIR__ . '/SimpleXLSX.php';

use Shuchkin\SimpleXLSX;  // 🔥 ADD THIS

require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $rmon = $_POST['repmonth'];
    $ryr  = $_POST['repyear'];
    $finyear = $_POST['finyear'] ?? '';

    $mdays = cal_days_in_month(CAL_GREGORIAN, $rmon, $ryr);
    $rmonth = str_pad($rmon, 2, "0", STR_PAD_LEFT);

    $startdate = "$ryr-$rmonth-01";
    $enddate   = "$ryr-$rmonth-$mdays";

    try {
        $pdo = new PDO(
            'mysql:host=10.0.0.251;dbname=shvpm',
            'root',
            'P@ssw0rD',
            [PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true]
        );
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // 🔥 FIX COLLATION ERROR
        $pdo->exec("SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci");

    } catch(PDOException $e) {
        die($e->getMessage());
    }

    // 🔹 Clear excess
    mysqli_query($conn, "DELETE FROM GSTR_2B_Excess WHERE gst_2b_month ='$rmon' AND gst_2b_year ='$ryr'");

    // 🔹 Run SP
    $sql = "CALL spacc_GSTR_2B($rmonth,$ryr,1,'$startdate','$enddate')";
    mysqli_multi_query($conn, $sql);

    do {
        if ($result = mysqli_store_result($conn)) {
            mysqli_free_result($result);
        }
    } while (mysqli_more_results($conn) && mysqli_next_result($conn));

    $cnnt = 0;
    $skip = 6;

    if ($_FILES["file"]["size"] > 0) {

        if ($xlsx = SimpleXLSX::parse($_FILES['file']['tmp_name'])) {

            $rows = $xlsx->rows();

            foreach ($rows as $i => $packData) {

                if ($i < $skip) continue;

                // 🔥 Fix offset errors
                $packData = array_pad($packData, 20, '');

                // 🔥 Skip empty rows
                if (empty(array_filter($packData))) continue;

                $GstNo = strtoupper(trim($packData[0] ?? ''));
                $party = strtoupper(trim(str_replace("'", "", $packData[1] ?? '')));
                $invno = trim($packData[2] ?? '');

                if ($GstNo == '' && $invno == '') continue;

                // 🔹 Invoice cleaning
                $invno2 = preg_replace('/([\/\-\s]?)([0-9]{2}-[0-9]{2})$/', '', $invno);
                $invno_clean = preg_replace('/[^A-Za-z0-9]/', '', $invno2);

                // 🔹 Date handling
                $newDate = null;
                if (!empty($packData[4])) {
                    if (is_numeric($packData[4])) {
                        $newDate = date('Y-m-d', ($packData[4] - 25569) * 86400);
                    } else {
                        $dateParts = explode('/', $packData[4]);
                        if (count($dateParts) == 3) {
                            $newDate = date('Y-m-d', strtotime("$dateParts[1]/$dateParts[0]/$dateParts[2]"));
                        }
                    }
                }

                $billvalue = (float)($packData[5] ?? 0);
                $taxvalue  = (float)($packData[8] ?? 0);
                $igst = (float)($packData[9] ?? 0);
                $cgst = (float)($packData[10] ?? 0);
                $sgst = (float)($packData[11] ?? 0);
                $cess = (float)($packData[12] ?? 0);

                // 🔹 Check existing
                $sql = "SELECT COUNT(*) 
                        FROM GSTR_2B 
                        WHERE CAST(gst_2b_month AS UNSIGNED) = ? 
                        AND CAST(gst_2b_year AS UNSIGNED) = ? 
                        AND TRIM(cust_gstin) = ? 
                        AND REPLACE(
                            REPLACE(
                                REPLACE(
                                    REPLACE(
                                        REGEXP_REPLACE(billno,'([/\\-]?)([0-9]{2}-[0-9]{2})$',''),
                                    ' ', ''),
                                '.', ''),
                            '/', ''),
                        '-', '') = ?";

                $stmt = $pdo->prepare($sql);
                $stmt->execute([$rmon, $ryr, $GstNo, $invno_clean]);
                $count = $stmt->fetchColumn();

                if ($count == 0) {

                    $insert = $pdo->prepare("INSERT INTO GSTR_2B_Excess
                    (gst_2b_month,gst_2b_year,cust_ref,cust_gstin,billno,billdate,
                    gst_2b_invamt,gst_2b_taxable,gst_2b_cgstamt,gst_2b_sgstamt,
                    gst_2b_igstamt,gst_2b_cessamt)
                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");

                    if ($insert->execute([
                        $rmon,$ryr,$party,$GstNo,$invno,$newDate,
                        $billvalue,$taxvalue,$cgst,$sgst,$igst,$cess
                    ])) {
                        $cnnt++;
                    }

                } else {

                    $update = $pdo->prepare("
                    UPDATE GSTR_2B 
                    SET 
                        gst_2b_invamt = ?, 
                        gst_2b_taxable = ?, 
                        gst_2b_cgstamt = ?,  
                        gst_2b_sgstamt = ?, 
                        gst_2b_igstamt = ?, 
                        gst_2b_cessamt = ?
                    WHERE CAST(gst_2b_month AS UNSIGNED) = ? 
                    AND CAST(gst_2b_year AS UNSIGNED) = ? 
                    AND TRIM(cust_gstin) = ? 
                    AND REPLACE(
                        REPLACE(
                            REPLACE(
                                REPLACE(
                                    REGEXP_REPLACE(billno,'([/\\-]?)([0-9]{2}-[0-9]{2})$',''),
                                ' ', ''),
                            '.', ''),
                        '/', ''),
                    '-', '') = ?
                    ");

                    $update->execute([
                        $billvalue,
                        $taxvalue,
                        $cgst,
                        $sgst,
                        $igst,
                        $cess,
                        $rmon,
                        $ryr,
                        $GstNo,
                        $invno_clean
                    ]);

                    $cnnt++;
                }
            }

        } else {
            echo SimpleXLSX::parseError();
            exit;
        }
    }

    if ($cnnt > 0) {
        header("Location: upload_EXCELfile.php?status=success&count=$cnnt&invfin=" . urlencode($finyear));
    } else {
        header("Location: upload_EXCELfile.php?status=fail&invfin=" . urlencode($finyear));
    }
    exit;
}
?>