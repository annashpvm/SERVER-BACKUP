<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

$seqno=$_REQUEST['accseqno'];

mysql_query("BEGIN");
 
$query1 =  "select acctran_accref_seqno,max(acctran_serialno)+1 as acctran_serialno,acctran_cur_code,acctran_led_code,acctran_paytype,acctran_cur_amt,acctran_pass_no from acc_tran where acctran_accref_seqno='$seqno'";
$result1 = mysql_query($query1);
$rec1 = mysql_fetch_array($result1);
$acctranaccrefseqno=$rec1['acctran_accref_seqno'];
$acctran_cur_code=$rec1['acctran_cur_code'];
$acctranserialno=$rec1['acctran_serialno'];
$type=$rec1['acctran_paytype'];
$acctranledcode=$rec1['acctran_led_code'];
$acctran_pass_no=$rec1['acctran_pass_no'];
$acctran_cur_amt=$rec1['acctran_cur_amt'];
$acctran_exch_rate=$rec1['acctran_exch_rate'];

$query = "INSERT into acc_tran values('$acctranaccrefseqno', '$acctranserialno', '$acctranledcode', '0.00', '0.00', '0.00', '$acctran_cur_code', '$acctran_cur_amt', '$acctran_exch_rate', '$acctran_pass_no', '$type')";
$result = mysql_query($query);

if ($result) {
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $acctrailaccrefseqno . '"})';
} else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $acctrailaccrefseqno . '"})';
}
?>

