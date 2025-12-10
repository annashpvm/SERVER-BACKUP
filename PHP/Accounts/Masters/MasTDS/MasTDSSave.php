<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();


 $savetype = $_POST['savetype'];
 $tdscode = $_POST['tdscode'];
 $ledcode = $_POST['ledcode'];

 $tdsname = strtoupper($_POST['tdsname']);
 $tdsdesc = strtoupper($_POST['tdsdesc']);
 $tdsper  = (float) $_POST['tdsper'];

if ($savetype === "Add")
{
	$query = "select ifnull(max(tds_code),0)+1 as tds_code from mas_acc_tds";
	$result = mysqli_query($conn, $query);
	$rec = mysqli_fetch_array($result);
	$tdscode = $rec['tds_code'];



	$qry = "select count(*) as cnt from mas_acc_tds where tds_name = '$tdsname'";
	$resgrp = mysqli_query($conn, $qry);
	$recgrp = mysqli_fetch_array($resgrp);
	$cnt=$recgrp['cnt'];

	if($cnt==0)
	{
	  $query1="insert into mas_acc_tds values('$tdscode','$ledcode','$tdsname',' $tdsdesc',' $tdsper')";
	  $result1 = mysqli_query($conn, $query1);
	}
	if ($result1 && $cnt==0) {
	    mysqli_begin_transaction($conn);
	    echo '({"success":"true","msg":"' . $tdsname . '"})';
	} 
	else if($cnt>0) {
	    mysqli_rollback($conn);


	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	} else {
	    mysqli_rollback($conn);


	    echo '({"success":"false","msg":"' . $tdsname . '"})';
	}
}
else
{

	  $query1="update mas_acc_tds set tds_ledcode = '$ledcode' , tds_name = '$tdsname' , tds_description = '$tdsdesc' ,tds_per =  '$tdsper'   where  tds_code = '$tdscode'";
	  $result1 = mysqli_query($conn, $query1);
	if ($result1) {
	    mysqli_begin_transaction($conn);
	    echo '({"success":"true","msg":"' . $tdsname . '"})';
	} 
        else {
	    mysqli_rollback($conn);


	    echo '({"success":"false","msg":"' . $tdsname . '"})';
	}

}
      


  
   
?>
