<?php

require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");




$finid = $_REQUEST['finid'];
$compcode = $_REQUEST['compcode'];

$gridDebit  = json_decode($_REQUEST['griddet_debit'], true);
$rowDebit   = $_REQUEST['cnt_debit'];

$gridCredit = json_decode($_REQUEST['griddet_credit'], true);
$rowCredit  = $_REQUEST['cnt_credit'];

$gridAdjust = json_decode($_REQUEST['griddet_adjust'], true);
$rowAdjust  = $_REQUEST['cnt_adjust'];

$ledcode = $_REQUEST['ledcode'];



mysql_query("BEGIN");


for ($i = 0; $i < $rowDebit; $i++) {
    $seqno     = (int)$gridDebit[$i]['accref_seqno'];
    $adjusted  = (float)$gridDebit[$i]['adjamt'];
    $invno     = $gridDebit[$i]['acctrail_inv_no'];

    $query1 = "call acc_sp_trn_updacc_trail_seq_no('$seqno','$invno','$adjusted','$ledcode')";
    $result1 = mysql_query($query1);

//echo $query1;
//echo "<br>";
}

for ($i = 0; $i < $rowCredit; $i++) {
    $seqno     = (int)$gridCredit[$i]['accref_seqno'];
    $adjusted  = (float)$gridCredit[$i]['adjamt'];
    $invno     = $gridCredit[$i]['acctrail_inv_no'];

    $query2 = "call acc_sp_trn_updacc_trail_seq_no('$seqno','$invno','$adjusted','$ledcode')";
    $result2 = mysql_query($query2);


//echo $query2;
//echo "<br>";
}






$inscnt = 0;
for ($i = 0; $i < $rowAdjust; $i++) {

    $mainseqno   = $gridAdjust[$i]['mainseqno'];
    $maindocno   = $gridAdjust[$i]['maindocno'];
    $mainseqno   = $gridAdjust[$i]['mainseqno'];
    $maindocdate = $gridAdjust[$i]['maindocdate'];
    $adjseqno    = $gridAdjust[$i]['adjseqno'];
    $adjdocno    = $gridAdjust[$i]['adjdocno'];
    $adjdocdate  = $gridAdjust[$i]['adjdocdate'];
    $adjamt      = $gridAdjust[$i]['adjamt'];
    $payterms    = $gridAdjust[$i]['payterms'];



    if ($adjamt > 0) {
	$query = "select ifnull(max(ref_slno),0) as refslno from acc_adjustments";
	$result = mysql_query($query);
	$rec = mysql_fetch_array($result);
	$ginrefslno = $rec['refslno'];

	$ginrefslno = $ginrefslno + 1;

	$querydate = "select datediff('$maindocdate','$adjdocdate') as daysin";
	$resultdate = mysql_query($querydate);
	$recdatenew = mysql_fetch_array($resultdate);
	$adjdays=$recdatenew['daysin'];



        $query3 = "insert into acc_adjustments (ref_slno, ref_compcode, ref_finid, ref_docseqno, ref_docno, ref_docdate, ref_adjseqno, ref_adjvouno, ref_invno, ref_invdate, ref_adjamount, ref_adj_days, ref_adj_by, ref_adjusted_on,ref_paymt_terms,ref_ledcode,ref_adjvoutype) values ('$ginrefslno','$compcode','$finid',
'$adjseqno','$adjdocno','$adjdocdate','$mainseqno','$maindocno', '$maindocno','$maindocdate', 
'$adjamt',$adjdays,'AUTO',curdate(),$payterms,'$ledcode','AU' );";

        $result3 = mysql_query($query3);


//echo $query3;
//echo "<br>";





    }
}


if ( $result1 && $result2 && $result3 ) {
    mysql_query("COMMIT");
    echo '({"success":"true","vouno":"' . $ginrefslno . '"})';
} else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","vouno":"' . $ginrefslno . '"})';
}
?>

