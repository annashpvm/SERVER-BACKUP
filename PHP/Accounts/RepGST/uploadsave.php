<?php

include 'db.php';
$mnt=$_POST['repmonth'];
$yr=$_POST['repyear'];

echo $mnt.$yr;

if (isset($_POST["Import"])) {


    echo $filename = $_FILES["file"]["tmp_name"];


    if ($_FILES["file"]["size"] > 0) {

        $file = fopen($filename, "r");
        while (($excelData = fgetcsv($file, 10000, ",")) !== FALSE) {

            $dataquery = "";
            $datapass = mysqli_query($conn, $dataquery);
            $row = mysqli_fetch_array($datapass);
            $enqid = $row['enqid'];

            $sql = ")";
            $result = mysqli_query($conn, $sql);
            if (!$result) {
                echo "<script type=\"text/javascript\">
							alert(\"Invalid File:Please Upload CSV File.\");
							window.location = \"upload.php\"
						</script>";
            }
        }
        fclose($file);
        echo "<script type=\"text/javascript\">
						alert(\"CSV File has been successfully Imported.\");
						window.location = \"upload.php\"
					</script>";
        mysqli_close($conn);
    }
}
?>		 
