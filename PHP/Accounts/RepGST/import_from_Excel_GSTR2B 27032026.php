<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


$finyear = $_POST['finyear'] ?? '';

require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $rmon = $_POST['repmonth'];
    $ryr  = $_POST['repyear'];
    $finyear = $_POST['finyear'] ?? '';

    // 🔹 Calculate month days
    $mdays = cal_days_in_month(CAL_GREGORIAN, $rmon, $ryr);

    $rmonth = str_pad($rmon, 2, "0", STR_PAD_LEFT);

    $startdate = "$ryr-$rmonth-01";
    $enddate   = "$ryr-$rmonth-$mdays";

    try {
        $pdo = new PDO('mysql:host=10.0.0.251;dbname=shvpm','root','P@ssw0rD');
        $pdo = new PDO(
            'mysql:host=10.0.0.251;dbname=shvpm',
            'root',
            'P@ssw0rD',
            [
                PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true
            ]
        );  
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch(PDOException $e) {
        die($e->getMessage());
    }




    $sql = "DELETE FROM GSTR_2B_Excess WHERE gst_2b_month ='$rmon' AND gst_2b_year ='$ryr'";
    $result1 = mysqli_query($conn, $sql);


    
    if (!$result1) {
        die("DELETE ERROR: " . mysqli_error($conn));
    }    

    $sql = "CALL spacc_GSTR_2B($rmonth,$ryr,1,'$startdate','$enddate')";

    if (!mysqli_multi_query($conn, $sql)) {
        echo "SP FAILED"; // ❌ do NOT use mysqli_error here
        exit;
    }
    

    do {
        if ($result = mysqli_store_result($conn)) {
            mysqli_free_result($result);
        }
    } while (mysqli_more_results($conn) && mysqli_next_result($conn));





    $cnnt = 0;
    $skip = 6;
    $i = 0;

    if ($_FILES["file"]["size"] > 0) {

        $file = fopen($_FILES["file"]["tmp_name"], "r");

        while (($packData = fgetcsv($file, 10000, ",")) !== FALSE) {

            if (++$i <= $skip) continue;

            $GstNo = trim($packData[0]);
            $GstNo = strtoupper(trim($packData[0]));
            $party = strtoupper(trim(str_replace("'", "", $packData[1])));
            $invno = trim($packData[2]);


            $pattern = '/[\/\-]?' . preg_quote($finyear, '/') . '$/';
            $invno2 = preg_replace($pattern, '', $invno);
            
            // Step 2: remove everything except A-Z and 0-9
            $invno_clean = strtoupper(preg_replace('/[^A-Za-z0-9]/', '', $invno2));
            
            echo $invno . " => " . $invno_clean . "<br>";



//echo $invno2;
//echo "<br>";

//echo $invno_clean;
//echo "<br>";


            // 🔹 Date convert
            $dateParts = explode('/', $packData[4]);
            $newDate = date('Y-m-d', strtotime("$dateParts[1]/$dateParts[0]/$dateParts[2]"));

            $billvalue = (float)$packData[5];
            $taxvalue  = (float)$packData[8];
            $igst = (float)$packData[9];
            $cgst = (float)$packData[10];
            $sgst = (float)$packData[11];
            $cess = (float)$packData[12];




            $sql = "SELECT COUNT(*) 
            FROM GSTR_2B
            WHERE gst_2b_month = ?
            AND gst_2b_year = ?
            AND TRIM(cust_gstin) = ?
            AND UPPER(
                REPLACE(
                    REPLACE(
                        REPLACE(
                            REPLACE(
                                CASE 
                                    WHEN billno LIKE CONCAT('%', ?) 
                                    THEN RTRIM(LEFT(billno, LENGTH(billno) - LENGTH(?)))
                                    ELSE billno
                                END
                            , '/', '')
                        , '-', '')
                    , '.', '')
                , ' ', '')
            ) = ?";

$stmt = $pdo->prepare($sql);

$stmt->execute([
    (int)$rmon,        // month
    (int)$ryr,         // year
    $GstNo,            // gstin
    $finyear,          // for LIKE
    $finyear,          // for LENGTH
    $invno_clean       // final cleaned value
]);

$count = $stmt->fetchColumn();


//echo $count;
//echo "<br>";



            if ($count == 0) {

                // 🔹 Insert into excess
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
                        REGEXP_REPLACE(
                            billno,
                            '([/\\-]?)([0-9]{2}-[0-9]{2})$',  -- ✅ remove only 25-26
                            ''
                        ),
                      ' ', ''),
                    '.', ''),
                  '/', ''),
                '-', ''
            ) = ?
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
                {
                    $cnnt++;
                }
            }
        }
    }
/*    
    if ($cnnt > 0) {
        header("Location: upload.php?status=success&count=$cnnt&invfin=" . urlencode($finyear));
        exit;
    } else {
        header("Location: upload.php?status=fail&invfin=" . urlencode($finyear));
        exit;
    }

*/
if($cnnt>0){
    echo '<script type="text/javascript">
        alert("successfully uploaded");
        </script>';
}
}
?>