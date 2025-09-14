<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();

$finyear = $_POST['finyear'];
$finid   = substr($finyear,2,2);

//echo $finyear;
//echo "<br>";
//echo $finid;
//echo "<br>";

 mysql_query("BEGIN");
 

	$query1  = "insert into mas_finyear values ('$finid','$finyear','0')";
	$result1 = mysql_query($query1);

	$query2  = "insert into control_details  values (1,'$finid','Delivery Note',1)";
	$result2 = mysql_query($query2);

	$query3  = "insert into control_details  values (90,'$finid','Delivery Note',1)";
	$result3 = mysql_query($query3);

//echo $query1;
//echo "<br>";



mysql_query("COMMIT");           

       
 
?>
