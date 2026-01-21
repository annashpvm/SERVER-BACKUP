<?php

require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");
session_start();



$finid       = $_REQUEST['finid'];
$compcode    = $_REQUEST['compcode'];
$vouno       = $_REQUEST['vouno'];
$accseqno    = $_REQUEST['accseqno'];
$dncrseqno   = $_REQUEST['dncrseqno'];
$newcnno     = $_REQUEST['newcnno'];

$cnno = substr($_REQUEST['newcnno'], 4, 4);


#Begin Transaction
mysqli_begin_transaction($conn);

if ($newcnno != '')
{

        $query1 = "update acc_dbcrnote_header set  dbcr_no = '$cnno' , dbcr_vouno = '$newcnno'  , invh_invrefno = '$newcnno' where dbcr_vouno = '$vouno' and dbcr_comp_code = '$compcode' and dbcr_finid = '$finid'";
        $result1 = mysqli_query($conn, $query1);

        $query2 = "update acc_ref set accref_vouno = '$newcnno'  where accref_seqno ='$accseqno' and accref_comp_code='$compcode' and accref_finid ='$finid' and accref_vouno = '$vouno'";
        $result2 = mysqli_query($conn, $query2);


        $query3 = "update acc_adjustments set ref_docno = '$newcnno' where ref_docseqno  = '$accseqno'   and ref_compcode = '$compcode' and ref_finid = '$finid' and ref_docno = '$vouno'";
        $result3 = mysqli_query($conn, $query3);
//echo $query1;
//echo "<br>";
//echo $query2;
//echo "<br>";
//echo $query3;

}
if ($result1  && $result2) 
{
  mysqli_commit($conn);
    echo '({"success":"true","vouno":"' . $vouno . '"})';
} else {
    mysqli_rollback($conn);


    echo '({"success":"false","vouno":"' . $vouno . '"})';
}


?>
