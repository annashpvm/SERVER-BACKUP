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
            $party = strtoupper(trim(str_replace("'", "", $packData[1])));
            $invno = trim($packData[2]);

            // 🔥 Remove finyear ONLY at end
            $invno2 = preg_replace('/[\/\-\s]*' . preg_quote($finyear, '/') . '$/', '', $invno);
            $invno_clean = str_replace([' ', '.', '/', '-'], '', $invno2);

            // 🔹 Date convert
            $dateParts = explode('/', $packData[4]);
            $newDate = date('Y-m-d', strtotime("$dateParts[1]/$dateParts[0]/$dateParts[2]"));

            $billvalue = (float)$packData[5];
            $taxvalue  = (float)$packData[8];
            $igst = (float)$packData[9];
            $cgst = (float)$packData[10];
            $sgst = (float)$packData[11];
            $cess = (float)$packData[12];


//echo $invno2;
//echo "<br>";
//echo $invno_clean;
//echo "<br>";            



            // 🔹 Check in main table
$sql = "SELECT COUNT(*) FROM GSTR_2B 
        WHERE gst_2b_month=? 
        AND gst_2b_year=? 
        AND cust_gstin=? 
        AND REPLACE(
              REPLACE(
                REPLACE(
                  REPLACE(
                    SUBSTRING_INDEX(billno, '/', 1)
                  ,' ','')
                ,'.','')
              ,'/','')
            ,'-',''
        ) = ?";


//echo $sql;
//echo "<br>";  
$stmt = $pdo->prepare($sql);
$stmt->execute([$rmon, $ryr, $GstNo, $invno_clean]);
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
UPDATE GSTR_2B SET 
    gst_2b_invamt = ?, 
    gst_2b_taxable = ?, 
    gst_2b_cgstamt = ?,  
    gst_2b_sgstamt = ?, 
    gst_2b_igstamt = ?, 
    gst_2b_cessamt = ?
WHERE 
    gst_2b_month = ? 
    AND gst_2b_year = ?  
    AND cust_gstin = ?
    AND REPLACE(
        REPLACE(
            REPLACE(
                REPLACE(
                    SUBSTRING_INDEX(billno, '/', 1)   -- ✅ REMOVE /25-26
                ,' ',''),
            '.',''),
        '/',''),
    '-','') = ?
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

    // ✅ Final result
    if ($cnnt > 0) {
        echo "<script>alert('Successfully Uploaded ($cnnt records)'); window.history.back();</script>";
    } else {
        echo "<script>alert('No records processed'); window.history.back();</script>";
    }
}
?>