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


mysqli_begin_transaction($conn);


	$query1 = "select dbcr_seqno from acc_dbcrnote_header where dbcr_vouno = '$vouno' and dbcr_comp_code = $compcode and dbcr_finid = $finid";
	$result1 = mysqli_query($conn, $query1);
	$rec1 = mysqli_fetch_array($result1);
	$seqNo = $rec1['dbcr_seqno'];



	$query1 = "delete from acc_dbcrnote_trailer where dbcrt_seqno in (select dbcr_seqno from tmpacc_dbcrnote_header where dbcr_vouno = '$vouno' and dbcr_comp_code = $compcode and dbcr_finid = $finid);";
	$result1 = mysqli_query($conn, $query1);


//echo $query1 ;
//echo "<br>";

	$query2 = "delete from acc_dbcrnote_header where dbcr_vouno = '$vouno' and dbcr_comp_code = $compcode and dbcr_finid = $finid and dbcr_seqno = $seqNo;";
	$result2 = mysqli_query($conn, $query2);

//echo $query2 ;
//echo "<br>";
	$query3 = "update trn_qc_rm_inspection set qc_rm_dn_raised = 'N' , qc_rm_debitnote_no ='' where qc_rm_debitnote_no = '$vouno' and qc_rm_compcode = $compcode  and qc_rm_fincode = $finid;";

	$result3 = mysqli_query($conn, $query3);



	$querya1 = "delete from acc_trail  where acctrail_accref_seqno = '$ginaccrefseq'";
	$resulta1 = mysqli_query($conn, $querya1);


    $querya2 = "delete from acc_tran  where acctran_accref_seqno = '$ginaccrefseq'";
	$resulta2 = mysqli_query($conn, $querya2);

//echo $query2;
//echo "<br>";


	$querya3 = "delete from acc_ref  where accref_seqno ='$ginaccrefseq' and accref_comp_code='$compcode' and accref_finid ='$finid'";
	$resulta3 = mysqli_query($conn, $querya3);


//echo $query3 ;
//echo "<br>";
	if ( $result1 && $result2 && $result3 && $resulta1 && $resulta2 && $resulta3) 
	{
		mysqli_commit($conn);
	    echo '({"success":"true","vouno":"' . $vouno . '"})';
	} else {
	    mysqli_rollback($conn);


	    echo '({"success":"false","vouno":"' . $vouno . '"})';
		mysqli_rollback($conn);
	}


?>
