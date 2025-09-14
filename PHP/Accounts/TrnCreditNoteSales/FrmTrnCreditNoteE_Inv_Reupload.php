<?php

require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");
session_start();



$finid    = $_REQUEST['finid'];
$compcode = $_REQUEST['compcode'];
$vouno    = $_REQUEST['vouno'];

#Begin Transaction
mysql_query("BEGIN");

if ($vouno != '')
{


$query1= "update acc_dbcrnote_header set U_ReUpload = 'Y' where ((U_TCSStatus = 'E'  or U_EWBStatus = 'E') or (U_TCSStatus = 'S' and E_inv_confirm = 'Y' and  U_EWBStatus = ''))  and dbcr_vouno = '$vouno'  and dbcr_finid = '$finid'  and dbcr_comp_code = '$compcode'";

//echo $query1;
        $result1 = mysql_query($query1);
}
if ($result1) 
{
  mysql_query("COMMIT");
    echo '({"success":"true","vouno":"' . $vouno . '"})';
} else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","vouno":"' . $vouno . '"})';
}



?>
