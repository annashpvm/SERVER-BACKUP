<?php

require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");
session_start();



$finid       = $_REQUEST['finid'];
$compcode    = $_REQUEST['compcode'];
$vouno       = $_REQUEST['vouno'];
$accseqno    = $_REQUEST['accseqno'];
$dncrseqno   = $_REQUEST['dncrseqno'];
$narration   = strtoupper($_REQUEST['narration']);

#Begin Transaction
mysql_query("BEGIN");

if ($vouno != '')
{

        $query1 = "update acc_dbcrnote_header set  dbcr_narration = '$narration '  where dbcr_vouno = '$vouno' and dbcr_comp_code = '$compcode' and dbcr_finid = '$finid'";
        $result1 = mysql_query($query1);

        $query2 = "update acc_ref set  accref_narration = '$narration '  where accref_vouno = '$vouno' and accref_comp_code = '$compcode' and accref_finid = '$finid' and accref_seqno = '$accseqno'";
        $result2 = mysql_query($query2);

}
if ($result1 && $result2) 
{
  mysql_query("COMMIT");
    echo '({"success":"true","vouno":"' . $vouno . '"})';
} else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","vouno":"' . $vouno . '"})';
}



?>
