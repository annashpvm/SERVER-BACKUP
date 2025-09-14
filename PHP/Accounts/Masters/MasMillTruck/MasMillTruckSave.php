

<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();


 $savetype = $_POST['savetype'];
 $truck_no   =strtoupper($_POST['truckno']);
 $truck_code = $_POST['truckcode'];


$truck_no = str_replace(" ","",$truck_no);
$truck_no = str_replace("  ","",$truck_no);
$truck_no = str_replace("   ","",$truck_no);
$truck_no = str_replace("-","",$truck_no);



if ($savetype === "Add")
{
	$query = "select ifnull(max(truck_code),0)+1 as truck_code from mas_mill_truck";
	$result = mysql_query($query);
	$rec = mysql_fetch_array($result);
	$truck_code = $rec['truck_code'];

	$qry = "select count(*) as cnt from mas_mill_truck where truck_no = '$truck_no'";
	$resgrp = mysql_query($qry);
	$recgrp = mysql_fetch_array($resgrp);
	$cnt=$recgrp['cnt'];

	if($cnt==0)
	{
	  $query1="insert into mas_mill_truck values('$truck_code','$truck_no')";
	  $result1 = mysql_query($query1);
	}
	if ($result1 && $cnt==0) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $truck_no . '"})';
	} 
	else if($cnt>0) {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	} else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $truck_no . '"})';
	}
}
else
{
	  $query1="update mas_mill_truck  set truck_no = upper('$truck_no') where  truck_code = '$truck_code'";
	  $result1 = mysql_query($query1);
	if ($result1) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $truck_no . '"})';
	} 
        else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $truck_no . '"})';
	}

}
      


  
   
?>
