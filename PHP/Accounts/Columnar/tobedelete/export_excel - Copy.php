<?php
// Clear any previous output to avoid corrupting the file
ob_clean();

$columns = json_decode($_POST['columns'], true);
$data = json_decode($_POST['data'], true);
$fname = $_POST['fname']; 

echo $fname;
echo "<br>";

// 1. Build the HTML Table
$html = "<table border='1'><tr>";
foreach ($columns as $col) {
    $html .= "<th style='background-color:#cccccc'>" . $col['header'] . "</th>";
}
$html .= "</tr>";

foreach ($data as $row) {
    $html .= "<tr>";
    foreach ($columns as $col) {
        $val = isset($row[$col['dataIndex']]) ? $row[$col['dataIndex']] : '';
        $align = ($col['isAmount']) ? "align='right'" : "align='left'";
        $html .= "<td $align>" . htmlspecialchars($val) . "</td>";
    }
    $html .= "</tr>";
}
$html .= "</table>";

echo $html;
echo "<br>";


echo $fname;
echo "<br>";

// 2. Save the file to the server
// Ensure the directory SHVPM/Report exists and has write permissions!
if(file_put_contents($fname, $html)) {
    echo json_encode(array("success" => true));
} else {
    echo json_encode(array("success" => false, "message" => "Permission denied on server"));
}
?>