<?php
// Clear previous output
ob_clean();
ob_start();

$columns = json_decode($_POST['columns'], true);
$data    = json_decode($_POST['data'], true);
$fname   = $_POST['fname']; 

// Force Excel Download
header("Content-Type: application/vnd.ms-excel");
header("Content-Disposition: attachment; filename=\"$fname.xls\"");
header("Pragma: no-cache");
header("Expires: 0");

// Build HTML Table
echo "<table border='1'>";
echo "<tr>";

foreach ($columns as $col) {
    echo "<th style='background-color:#cccccc'>" . $col['header'] . "</th>";
}
echo "</tr>";

foreach ($data as $row) {
    echo "<tr>";
    foreach ($columns as $col) {
        $val = isset($row[$col['dataIndex']]) ? $row[$col['dataIndex']] : '';
        $align = (!empty($col['isAmount'])) ? "right" : "left";
        echo "<td align='$align'>" . htmlspecialchars($val) . "</td>";
    }
    echo "</tr>";
}

echo "</table>";

ob_end_flush();
exit;
?>