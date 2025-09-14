
<?php

require($_SERVER["DOCUMENT_ROOT"] . "/DPM/Financials/CashandBank/Bank_Reconciliation/Conn.php");
$action = $_POST['action'];
$bank_name = $_POST['bank'];
$branch_name = $_POST['branch'];
$acc_no = $_POST['accno'];
$as_on_month = $_POST['monthh'];
$as_on_year = $_POST['yearr'];
$bank_bal = $_POST['bankclosingbal'];
$kgdl_bal = $_POST['kgdlclosingbal'];

$active_status = $_POST['status'];
$hseqno = $_POST['idd'];
$userid = $_POST['userid'];

$query = "select ifnull(max(bank_code),0)+1  as bankcode from bank_master";
$res = mysql_query($query);
$rec = mysql_fetch_array($res);
$bankcode = $rec['bankcode'];

$companydetails = json_decode($_REQUEST['companydetails'], true);
$comprowcnt = $_REQUEST['companycnt'];
$compintcnt = 0;

$ledgerdetails = json_decode($_REQUEST['ledgerdetails'], true);
$ledgerrowcnt = $_REQUEST['ledgercnt'];
$ledgerintcnt = 0;




mysql_query("BEGIN");


if ($action == "Add") {
    $query1 = "call acc_sp_bankrecon_bankmaster_insert('$bankcode','$bank_name','$branch_name','$acc_no','$as_on_month','$as_on_year','$bank_bal','$kgdl_bal','$active_status','$userid');";
    $result1 = mysql_query($query1);

    for ($i = 0; $i < $comprowcnt; $i++) {

        $queryseq = "select ifnull(max(seqno),0)+1  as seq from bank_master_trailerone";
        $ress = mysql_query($queryseq);
        $rec2 = mysql_fetch_array($ress);
        $seqno2 = $rec2['seq'];

        $compcode = $companydetails[$i]['comp_code'];
        $query2 = "insert into bank_master_trailerone(seqno,header_seqno,company_code,active_status,created_by,created_date) values('$seqno2','$bankcode','$compcode','Y','$userid',now())";
        $result2 = mysql_query($query2);
    }


    for ($i = 0; $i < $ledgerrowcnt; $i++) {

        $queryseq = "select ifnull(max(seqno),0)+1  as seq from bank_master_trailertwo";
        $ress = mysql_query($queryseq);
        $rec2 = mysql_fetch_array($ress);
        $seqno2 = $rec2['seq'];

        $ledcode = $ledgerdetails[$i]['led_code'];
        $query2 = "insert into bank_master_trailertwo(seqno,header_seqno,ledger_code,active_status,created_by,created_date) values('$seqno2','$bankcode','$ledcode','Y','$userid',now())";
        $result2 = mysql_query($query2);
    }
} else if ($action == "Edit") {

    $query1 = "call acc_sp_bankrecon_bankmaster_update('$hseqno','$bank_name','$branch_name','$acc_no','$as_on_month','$as_on_year','$bank_bal','$kgdl_bal','$active_status','$userid');";
    $result1 = mysql_query($query1);

    $querydel1 = "delete from bank_master_trailerone where header_seqno='$hseqno';";
    $resultdel1 = mysql_query($querydel1);

    $querydel2 = "delete from bank_master_trailertwo where header_seqno='$hseqno';";
    $resultdel2 = mysql_query($querydel2);

    for ($i = 0; $i < $comprowcnt; $i++) {

        $queryseq = "select ifnull(max(seqno),0)+1  as seq from bank_master_trailerone";
        $ress = mysql_query($queryseq);
        $rec2 = mysql_fetch_array($ress);
        $seqno2 = $rec2['seq'];

        $compcode = $companydetails[$i]['company_code'];
        $query2 = "insert into bank_master_trailerone(seqno,header_seqno,company_code,active_status,created_by,created_date) values('$seqno2','$hseqno','$compcode','Y','$userid',now())";
        $result2 = mysql_query($query2);
    }


    for ($i = 0; $i < $ledgerrowcnt; $i++) {

        $queryseq = "select ifnull(max(seqno),0)+1  as seq from bank_master_trailertwo";
        $ress = mysql_query($queryseq);
        $rec2 = mysql_fetch_array($ress);
        $seqno2 = $rec2['seq'];

        $ledcode = $ledgerdetails[$i]['ledger_code'];
        $query2 = "insert into bank_master_trailertwo(seqno,header_seqno,ledger_code,active_status,created_by,created_date) values('$seqno2','$hseqno','$ledcode','Y','$userid',now())";
        $result2 = mysql_query($query2);
    }
}

if ($result1) {
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $num . '"})';
} else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $num . '"})';
}
?>


