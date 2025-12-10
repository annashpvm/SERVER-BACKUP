<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();


 $savetype  = $_POST['savetype'];

 $grpcode = $_POST['grpcode'];
 $grpname = $_POST['grpname'];

 $griddet   = json_decode($_REQUEST['griddet'],true);
 $rowcnt    = $_REQUEST['cnt'];

$cnt= 0;
if ($savetype === "Add")
{
	$query = "select ifnull(max(itc_code),0)+1 as itccode from acc_gstitc_group";
	$result = mysqli_query($conn, $query);
	$rec = mysqli_fetch_array($result);
	$itccode = $rec['itccode'];

	$qry = "select count(*) as cnt from acc_gstitc_group where itc_grpcode = '$grpcode'";
	$resgrp = mysqli_query($conn, $qry);
	$recgrp = mysqli_fetch_array($resgrp);
	$cnt=$recgrp['cnt'];
        if ($cnt == 0) 
        {
		for($i=0;$i<$rowcnt;$i++){
		    $slno = $i+1;
		    $ledgercode = $griddet[$i]['led_code'];
		    $query1="insert into acc_gstitc_group values($itccode,'$grpcode',$ledgercode)";
//echo $query1;
		    $result1 = mysqli_query($conn, $query1);
		}     
         }  


}
else
{
	$query1="delete from acc_gstitc_group where itc_grpcode = $grpcode";
        $result1 = mysqli_query($conn, $query1);
  	for($i=0;$i<$rowcnt;$i++){
	    $slno = $i+1;
	    $ledgercode = $griddet[$i]['led_code'];
	    $query1="insert into acc_gstitc_group values($itccode,'$grpcode',$ledgercode)";
	    $result1 = mysqli_query($conn, $query1);
        }     
}
if ($savetype === "Add" && $cnt > 0) 
    {
    mysqli_rollback($conn);


    echo '({"success":"false","cnt":"' . $cnt . '"})';
    }  
else
if ($result1) {
    mysqli_begin_transaction($conn);
    echo '({"success":"true","msg":"' . $grpname . '"})';
} 
else {
    mysqli_rollback($conn);


    echo '({"success":"false","msg":"' . $grpname . '"})';
}

  
   
?>
