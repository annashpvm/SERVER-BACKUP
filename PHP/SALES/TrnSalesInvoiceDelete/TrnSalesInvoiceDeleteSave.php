<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$savetype     = $_POST['savetype'];
$invhcompcode = $_POST['invhcompcode'];
$invhfincode  = $_POST['invhfincode'];
$gsttype      = $_POST['gsttype'];
$invhrefno    = $_POST['invhrefno'];
$invhno       = $_POST['invhno'];
$invhseqno    = $_POST['invhseqno'];
$invhdate     = $_POST['invhdate'];
$invhslipno   = $_POST['invhslipno'];
$invhslipdt   = $_POST['invhslipdt'];
$accseqno     = $_POST['accseqno'];


mysqli_query($conn, "BEGIN");


$query1   = "delete from acc_trail where acctrail_accref_seqno = '$accseqno'";


$result11  = mysqli_query($conn, $query1);


$query2   = "delete from acc_tran where acctran_accref_seqno = '$accseqno'";

$result12  = mysqli_query($conn, $query2);

$query3   = "delete from acc_ref where accref_seqno = '$accseqno'";

$result13  = mysqli_query($conn, $query3);


$query4   = "update trnsal_packslip_header set pckh_invno = 0, pckh_invdt = NULL ,pckh_invstat = ''  where pckh_comp_code = '$invhcompcode' and pckh_fincode = '$invhfincode'  and pckh_no in (select invh_slipno from trnsal_invoice_header where invh_comp_code =  '$invhcompcode' and invh_fincode = '$invhfincode'  and invh_invrefno = '$invhrefno')";


$result4  = mysqli_query($conn, $query4);   

$query5 = "delete from trnsal_invoice_header where invh_comp_code  = '$invhcompcode' and invh_fincode  = '$invhfincode'  and invh_invrefno = '$invhrefno'";
$result5  = mysqli_query($conn, $query5);



$query6 = "delete from trnsal_invoice_trailer where invt_compcode  = '$invhcompcode' and invt_fincode  = '$invhfincode'   and invt_seqno = '$invhseqno'";
$result6  = mysqli_query($conn, $query6);





if ($result11 && $result12 && $result13 && $result4 && $result5 && $result6)

{
    mysqli_begin_transaction($conn);
    echo '({"success":"true","msg":"' . $invhrefno . '"})';
} 
	
else {
    mysqli_rollback($conn);


    echo '({"success":"false","msg":"' . $invhrefno . '"})';
}
  
   
?>
