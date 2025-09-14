<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();


 $savetype  = $_POST['savetype'];
 $mergename = strtoupper($_POST['mergename']);
 $mergecode = $_POST['mergecode'];
 $griddet   = json_decode($_REQUEST['griddet'],true);
 $rowcnt    = $_REQUEST['cnt'];

$cnt= 0;
if ($savetype === "Add")
{
	$query = "select ifnull(max(rep_merge_code),0)+1 as ledmergecode from acc_rep_ledger_merge";
	$result = mysql_query($query);
	$rec = mysql_fetch_array($result);
	$mergecode = $rec['ledmergecode'];

	$qry = "select count(*) as cnt from acc_rep_ledger_merge where rep_merge_name = '$mergename'";
	$resgrp = mysql_query($qry);
	$recgrp = mysql_fetch_array($resgrp);
	$cnt=$recgrp['cnt'];
        if ($cnt == 0) 
        {
		for($i=0;$i<$rowcnt;$i++){
		    $slno = $i+1;
		    $ledgercode = $griddet[$i]['led_code'];
		    $query1="insert into acc_rep_ledger_merge values($mergecode,'$mergename',$ledgercode)";
		    $result1 = mysql_query($query1);
		}     
         }  


}
else
{
	$query1="delete from acc_rep_ledger_merge where rep_merge_code = $mergecode";
        $result1 = mysql_query($query1);
  	for($i=0;$i<$rowcnt;$i++){
	    $slno = $i+1;
	    $ledgercode = $griddet[$i]['led_code'];
	    $query1="insert into acc_rep_ledger_merge values($mergecode,'$mergename',$ledgercode)";
	    $result1 = mysql_query($query1);
        }     
}
if ($savetype === "Add" && $cnt > 0) 
    {
    mysql_query("ROLLBACK");
    echo '({"success":"false","cnt":"' . $cnt . '"})';
    }  
else
if ($result1) {
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $mergename . '"})';
} 
else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $mergename . '"})';
}

  
   
?>
