<?php
$invfin = $_GET['invfin'] ?? '';

if (isset($_GET['status'])) {
    if ($_GET['status'] == 'success') {
        $count = $_GET['count'] ?? 0;
        echo "<script>alert('Successfully Uploaded ($count records)');</script>";
    } elseif ($_GET['status'] == 'fail') {
        echo "<script>alert('Upload Failed');</script>";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
<title>Upload GST Excel</title>
</head>

<body>

<h3 style="text-align:center;">UPLOAD GST EXCEL FILE</h3>

<form action="import_from_Excel_GSTR2B.php" method="post" enctype="multipart/form-data">

    <label>Month:</label>
    <input type="number" name="repmonth" min="1" max="12" required><br><br>

    <label>Year:</label>
    <input type="number" name="repyear" min="2026" max="2050" required><br><br>

    <label>Fin Year:</label>
    <input type="text" name="finyear"
           value="<?php echo htmlspecialchars($invfin); ?>"
           readonly><br><br>

    <label>Excel File:</label>
    <input type="file" name="file" accept=".xlsx,.xls" required><br><br>

    <button type="submit" name="Import">Upload</button>

</form>

</body>
</html>