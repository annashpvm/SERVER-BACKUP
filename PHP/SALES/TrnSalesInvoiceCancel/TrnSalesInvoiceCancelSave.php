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


mysql_query("BEGIN");


$query1   = "delete from acc_trail where acctrail_accref_seqno = '$accseqno'";
$result11  = mysql_query($query1);

$query2   = "delete from acc_tran where acctran_accref_seqno = '$accseqno'";
$result12  = mysql_query($query2);

$query3   = "delete from acc_ref where accref_seqno = '$accseqno'";
$result13  = mysql_query($query3);


$query4   = "update trnsal_packslip_header set pckh_invno = 0, pckh_invdt = NULL ,pckh_invstat = ''  where pckh_comp_code = '$invhcompcode' and pckh_fincode = '$invhfincode'  and pckh_no in (select invh_slipno from trnsal_invoice_header where invh_comp_code =  '$invhcompcode' and invh_fincode = '$invhfincode'  and invh_invrefno = '$invhrefno')";
$result4  = mysql_query($query4);   

$query5= "update trnsal_invoice_header set invh_party_ordno = '',invh_our_ordno = '',invh_party = '2601',invh_crd_days = '0',invh_taxtag = '0',invh_insper = '0',invh_insamt = '0' ,invh_frt_rate = '0',invh_frt_amt = '0',invh_roff = '0' ,invh_netamt = '0',invh_noofreels = '0',invh_totwt = '0',invh_vehi_no ='',invh_lrno  = '0',invh_taxableamt = '0' ,invh_others = '0',invh_sgst_per = '0',invh_sgst_amt = '0',invh_cgst_per = '0',invh_cgst_amt = '0', invh_igst_per = '0',invh_igst_amt ='0' ,invh_delivery_add1 = '',invh_delivery_add2 = '',invh_delivery_add3 = '',invh_delivery_city = '',invh_delivery_pin  = '',invh_delivery_gst  = '0',invh_instruction =  '' , invh_acc_refno = 0 where invh_invrefno = '$invhrefno'  and invh_fincode = '$invhfincode'  and invh_comp_code = '$invhcompcode'";

$result5  = mysql_query($query5);

$query6 = "update trnsal_invoice_trailer set  invt_wt = 0, invt_nos = 0, invt_urate =0 , invt_amt =0 , invt_value = 0, invt_taxable = 0  where invt_compcode  = '$invhcompcode' and invt_fincode  = '$invhfincode'   and invt_seqno = '$invhseqno'";
$result6  = mysql_query($query6);





if ($result11 && $result12 && $result13 && $result4 && $result5 && $result6)

{
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $invhrefno . '"})';
} 
	
else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $invhrefno . '"})';
}
  
   
?>
