<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

$seqno=$_REQUEST['accseqno'];

mysql_query("BEGIN");
 
$query1 =  "select acctrail_accref_seqno,max(acctrail_serialno)+1 as acctrail_serialno, acctrail_inv_no,acctrail_inv_date,acctrail_inv_value,0 as acctrail_adj_value,acctrail_led_code from acc_trail where acctrail_accref_seqno='$seqno'";
$result1 = mysql_query($query1);
$rec1 = mysql_fetch_array($result1);
$acctrailaccrefseqno=$rec1['acctrail_accref_seqno'];
$acctrailserialno=$rec1['acctrail_serialno'];
$acctrailinvno=$rec1['acctrail_inv_no'];
$acctrailinvdate=$rec1['acctrail_inv_date'];
$acctrailinvvalue=$rec1['acctrail_inv_value'];
$acctrailledcode=$rec1['acctrail_led_code'];


$query = "insert into acc_trail values('$acctrailaccrefseqno', '$acctrailserialno', '$acctrailinvno', '$acctrailinvdate',  '$acctrailinvvalue',0, '$acctrailledcode','D' , 0,0 )";
$result = mysql_query($query);

if ($result) {
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $acctrailaccrefseqno . '"})';
} else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $acctrailaccrefseqno . '"})';
}
?>

