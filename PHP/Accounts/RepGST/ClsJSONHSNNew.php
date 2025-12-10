<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

	global $conn;
	$finid     = $_POST['fincode'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['fromdate'];
	$enddate   = $_POST['todate'];
	$filename  = $_POST['fname'];

        $sql="call spacc_rep_json_HSN_New($compcode,'$finid','$startdate','$enddate')";
		$result = mysqli_query($conn, $sql);

        if (!$result) {
            die("Query failed: " . mysqli_error($conn));
        }
        
        // Fetch only one JSON column (jsonnew)
        $row = mysqli_fetch_assoc($result);
        mysqli_next_result($conn); // clear connection for next query
        
        // Get raw JSON string
        $jsondata = $row['jsonnew'] ?? '';
        $jsondata = trim($jsondata);  
        $jsondata = trim($jsondata, "'"); // remove starting/ending single quotes if any
        

        $decoded = json_decode($jsondata, true);

        
/*
        if (json_last_error() !== JSON_ERROR_NONE) {
            die("Invalid JSON: " . json_last_error_msg() . "\nJSON: $jsondata");
        }
        
        $inner_json = $decoded_outer[0] ?? '';
        if (!$inner_json) {
            die("No inner JSON found.");
        }

        
        $decoded_inner = json_decode($inner_json, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    die("Invalid JSON (inner): " . json_last_error_msg());
}

*/
        $cleanJson = json_encode($decoded, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);


//echo $cleanJson;

//$file = $_SERVER["DOCUMENT_ROOT"].$filename;
$file = $_SERVER["DOCUMENT_ROOT"] . '/' . ltrim($filename, '/');
if (file_put_contents($file,$cleanJson))
{
    $str = file_get_contents($file);
    echo "File saved successfully: " . htmlspecialchars($filename);
}
else
    echo "Failed to write file.";
  
?>
