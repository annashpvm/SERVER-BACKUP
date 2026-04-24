<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();

$finyear = $_POST['finyear'];
$finid   = substr($finyear,2,2);

//echo $finyear;
//echo "<br>";
//echo $finid;
//echo "<br>";

 
    mysqli_begin_transaction($conn);     

	$query1  = "insert into mas_finyear values ('$finid','$finyear','0')";
	$result1 = mysqli_query($conn, $query1);

	$query2  = "insert into control_details  values (1,'$finid','Delivery Note',1)";
	$result2 = mysqli_query($conn, $query2);

	$query3  = "insert into control_details  values (90,'$finid','Delivery Note',1)";
	$result3 = mysqli_query($conn, $query3);

	$query4  = "insert into trn_runningno  values (1,'$finid','IND',1)";
	$result4 = mysqli_query($conn, $query4);

	$query5  = "insert into trn_runningno  values (90,'$finid','IND',1)";
	$result5 = mysqli_query($conn, $query5);


//shvpmtrn_weighbridge_entry	
//echo $query1;
//echo "<br>";

	if ($result1 && $result2 && $result3) {
		mysqli_commit($conn);
	} 
	 else {
	    mysqli_rollback($conn);

	}

      

       
 
?>
