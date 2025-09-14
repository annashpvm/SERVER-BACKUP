
<?php

require($_SERVER["DOCUMENT_ROOT"] . "/DPM/Financials/CashandBank/Bank_Reconciliation/Conn.php");

$bank = $_POST['bcode'];

$rdate = $_POST['rdate'];
$bank_bal_db = $_POST['db_bankstatementbal'];
$bank_bal_cr = $_POST['cr_bankstatementbal'];
$kgdl_bal_db = $_POST['db_bankbookbal'];
$kgdl_bal_cr = $_POST['cr_bankbookbal'];

mysql_query("BEGIN");

 $query = "delete from  bankrecon_closingbalance where bank_code= '$bank' and recon_date='$rdate' ";
    $result = mysql_query($query);

    $query1 = "insert into bankrecon_closingbalance(bank_code,recon_date, db_closingbal_bankbook,cr_closingbal_bankbook,db_closingbal_bankstatement,cr_closingbal_bankstatement,creadted_by,created_date) values('$bank','$rdate','$kgdl_bal_db','$kgdl_bal_cr','$bank_bal_db','$bank_bal_cr',7055,now())";
    $result1 = mysql_query($query1);

   

if ($result1) {
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $num . '"})';
} else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $num . '"})';
}
?>


