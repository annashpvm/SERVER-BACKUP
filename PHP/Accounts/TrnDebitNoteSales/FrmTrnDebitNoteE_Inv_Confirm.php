<?php

require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");
session_start();



$finid    = $_REQUEST['finid'];
$compcode = $_REQUEST['compcode'];
$vouno    = $_REQUEST['vouno'];

#Begin Transaction
mysqli_begin_transaction($conn);

if ($vouno != '')
{

        $query1 = "update acc_dbcrnote_header set  E_inv_confirm = 'Y'  where dbcr_vouno = '$vouno' and dbcr_comp_code = '$compcode' and dbcr_finid = '$finid'";

//echo $query1;
        $result1 = mysqli_query($conn, $query1);
}
if ($result1) 
{
        mysqli_commit($conn);
    echo '({"success":"true","vouno":"' . $vouno . '"})';
} else {
    mysqli_rollback($conn);


    echo '({"success":"false","vouno":"' . $vouno . '"})';
}



?>
