<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    global $conn;

	$finid     = $_POST['fincode'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['fromdate'];
	$enddate   = $_POST['todate'];

	$filename  = $_POST['fname'];


	
    $sql="call spacc_rep_json_DOCSUMMARY($compcode,'$finid','$startdate','$enddate')";

    $result = mysqli_query($conn, $sql);
    if (!$result) {
        die("Query failed: " . mysqli_error($conn));
    }
    

    mysqli_next_result($conn); // clear connection for next query
        
    
    $row = mysqli_fetch_assoc($result);
    // Get raw JSON string
    $jsondata = $row['jsonnew'] ?? '';
    $jsondata = trim($jsondata);  
    $jsondata = trim($jsondata, "'"); // remove starting/ending single quotes if any
    
    $jsondata = stripslashes($jsondata); // remove escaped quotes if any

    $decoded = json_decode($jsondata, true);


    if (json_last_error() !== JSON_ERROR_NONE) {
        die("Invalid JSON: " . json_last_error_msg() . "\nJSON: $jsondata");
    }
    
    // If JSON is nested inside an array, get first element
    $inner_json = $decoded[0] ?? $decoded; // fallback to decoded itself
    $decoded_inner = is_string($inner_json) ? json_decode($inner_json, true) : $inner_json;
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        die("Invalid inner JSON: " . json_last_error_msg());
    }
    
    // Save to file
    $cleanJson = json_encode($decoded_inner, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    $file = $_SERVER["DOCUMENT_ROOT"] . '/' . ltrim($filename, '/');
    
    if (file_put_contents($file, $cleanJson)) {
        echo "File saved successfully: " . htmlspecialchars($filename);
    } else {
        echo "Failed to write file.";
    }

    
?>




