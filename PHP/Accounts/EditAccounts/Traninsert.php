<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

$seqno=$_REQUEST['accseqno'];

mysql_query("BEGIN");
 
$query1 =  "select acctran_accref_seqno,max(acctran_serialno)+1 as acctran_serialno,acctran_paytype from acc_tran where acctran_accref_seqno='$seqno' group  by acctran_accref_seqno,acctran_paytype";
//echo $query1;
$result1 = mysql_query($query1);
$rec1 = mysql_fetch_array($result1);
$acctranaccrefseqno=$rec1['acctran_accref_seqno'];
$acctranserialno=$rec1['acctran_serialno'];
$type=$rec1['acctran_paytype'];

$acctranledcode=0;

$query = "INSERT into acc_tran values('$acctranaccrefseqno', '$acctranserialno', '$acctranledcode', '0.00', '0.00', '0.00', '$type','')";
//echo $query;

$result = mysql_query($query);

if ($result) {
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $acctranaccrefseqno . '"})';
       //echo '({"success":"true"})';
} else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $acctranaccrefseqno . '"})';
}
?>

