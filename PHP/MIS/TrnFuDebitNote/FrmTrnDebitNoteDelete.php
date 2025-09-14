<?php

require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");
session_start();

$savetype = ($_REQUEST['savetype']);
$griddet = json_decode($_REQUEST['griddet'], true);
$rowcnt = $_REQUEST['cnt'];
$ginaccrefseq = $_REQUEST['accrefseq'];
$vouno = $_REQUEST['vouno'];
$voudate = $_REQUEST['voudate'];

$compcode = $_REQUEST['compcode'];
$finid   = $_REQUEST['finid'];




#Begin Transaction

mysql_query("BEGIN");



	$query1 = "select dbcr_seqno from tmpacc_dbcrnote_header where dbcr_vouno = '$vouno' and dbcr_comp_code = $compcode and dbcr_finid = $finid";
	$result1 = mysql_query($query1);
	$rec1 = mysql_fetch_array($result1);
	$seqNo = $rec1['dbcr_seqno'];



	$query1 = "delete from tmpacc_dbcrnote_trailer where dbcrt_seqno in (select dbcr_seqno from tmpacc_dbcrnote_header where dbcr_vouno = '$vouno' and dbcr_comp_code = $compcode and dbcr_finid = $finid);";
	$result1 = mysql_query($query1);


//echo $query1 ;
//echo "<br>";

	$query2 = "delete from tmpacc_dbcrnote_header where dbcr_vouno = '$vouno' and dbcr_comp_code = $compcode and dbcr_finid = $finid and dbcr_seqno = $seqNo;";
	$result2 = mysql_query($query2);

//echo $query2 ;
//echo "<br>";
	$query3 = "update trn_qc_fuel_inspection set qc_fuel_dn_raised = 'N' , qc_fuel_debitnote_no ='' where qc_fuel_debitnote_no = '$vouno' and qc_fuel_compcode = $compcode  and qc_fuel_fincode = $finid;";

	$result3 = mysql_query($query3);

//echo $query3 ;
//echo "<br>";
	if ( $result1 && $result2  && $result3) 
	{
	  mysql_query("COMMIT");
	    echo '({"success":"true","vouno":"' . $vouno . '"})';
	} else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","vouno":"' . $vouno . '"})';
	}


?>
