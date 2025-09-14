<?php

require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");

$gridadjdet = json_decode($_REQUEST['gridadjdet'], true);
$rowcnt = $_REQUEST['adjcnt'];

$compcode     = $_REQUEST['compcode'];
$finid        = $_REQUEST['finid'];
$ref_docseqno = $_REQUEST['vouseqno'];
$vouno        = $_REQUEST['vouno'];
$accvoudate   = $_REQUEST['voudate'];
$ledcode      = $_REQUEST['ledgercode'];

                

mysql_query("BEGIN");


$query = "delete from acc_adjustments where ref_compcode = $compcode and ref_finid = $finid  and  ref_docseqno = $ref_docseqno";
$result1 = mysql_query($query);



//echo $query;
//echo "<br>";


for ($i = 0; $i < $rowcnt; $i++) {
    $adjvouno  = $gridadjdet[$i]['accref_vouno'];

    $oldadjamt = (float) $gridadjdet[$i]['ref_adjamount'] * -1; // for less old adjusted amount
    $accadjseqno = $gridadjdet[$i]['ref_adjseqno'];
    $invno = $gridadjdet[$i]['acctrail_inv_no'];

    $query2 = "call acc_sp_trn_updacc_trail_seq_no('$ref_docseqno','$vouno','$oldadjamt','$ledcode')";
    $result2 = mysql_query($query2);

//echo $query2;
//echo "<br>";
        $query3 = "call acc_sp_trn_updacc_trail_seq_no('$accadjseqno','$invno','$oldadjamt','$ledcode')";
        $result3 = mysql_query($query3);
//echo $query3;
//echo "<br>";

}

$inscnt = 0;
for ($i = 0; $i < $rowcnt; $i++) {



    $ginrefslno = $ginrefslno + 1;
    $adjvouno  = $gridadjdet[$i]['accref_vouno'];
    $invno = $gridadjdet[$i]['acctrail_inv_no'];
    $invdate = $gridadjdet[$i]['acctrail_inv_date'];

    $adjamt = (float) $gridadjdet[$i]['newadjusted'];

    $oldadjamt = (float) $gridadjdet[$i]['ref_adjamount'];


    $accadjseqno = $gridadjdet[$i]['ref_adjseqno'];


    $voutype = $gridadjdet[$i]['accref_vou_type'];
    $Year = $gridadjdet[$i]['Year'];

    $payterms    = (int)$gridadjdet[$i]['ref_paymt_terms'];

    $dbcramt = $gridadjdet[$i]['acctrail_inv_value'];




    if ($adjamt > 0) {

    $query = "select ifnull(max(ref_slno),0) as refslno from acc_adjustments";
    $result = mysql_query($query);
    $rec = mysql_fetch_array($result);
    $ginrefslno = $rec['refslno'];

      $ginrefslno = $ginrefslno + 1;

		$querydate = "select datediff('$accvoudate','$invdate') as daysin";
		$resultdate = mysql_query($querydate);
		$recdatenew = mysql_fetch_array($resultdate);
		$adjdays=$recdatenew['daysin'];



        $query1 = "insert into acc_adjustments (ref_slno, ref_compcode, ref_finid, ref_docseqno, ref_docno, ref_docdate, ref_adjseqno, ref_adjvouno, ref_invno, ref_invdate, ref_adjamount, ref_adj_days, ref_adj_by, ref_adjusted_on,ref_paymt_terms,ref_ledcode,ref_adjvoutype) values ('$ginrefslno','$compcode','$finid','$ref_docseqno','$vouno', '$accvoudate', '$accadjseqno','$adjvouno','$invno','$invdate','$adjamt',$adjdays,'BA',curdate(),$payterms,'$ledcode','$voutype' );";

        $result1 = mysql_query($query1);

//echo $query1;
//echo "<br>";


        $query2 = "call acc_sp_trn_updacc_trail_seq_no('$ref_docseqno','$vouno','$adjamt','$ledcode')";
        $result2 = mysql_query($query2);

//echo $query2;
//echo "<br>";
        $query3 = "call acc_sp_trn_updacc_trail_seq_no('$accadjseqno','$invno','$adjamt','$ledcode')";
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

