<?php

require($_SERVER["DOCUMENT_ROOT"] . "/DPM/Financials/CashandBank/Bank_Reconciliation/Conn.php");
mysql_query('SET NAMES utf8');
$useridd = $_POST['userid'];


mysql_query("BEGIN");

$query = "select ifnull(max(seqno),0)+1  as seq from maintenance.mms_maintenance_planMaster";
$res = mysql_query($query);
$rec = mysql_fetch_array($res);
$seqno = $rec['seq'];


$kgdlbankbookdetails = json_decode($_REQUEST['kgdlbankbookdetails'], true);
$rowcnt = $_REQUEST['kgdlbankbookcnt'];
$intcnt = 0;

for ($i = 0; $i < $rowcnt; $i++) {
    $seqno = $kgdlbankbookdetails[$i]['accref_seqno'];
    $reconstatus = $kgdlbankbookdetails[$i]['Flag'];
    $cleareddate = $kgdlbankbookdetails[$i]['cleared_date'];
    $bankstmtseq = $kgdlbankbookdetails[$i]['bankstatement_seqno'];
    $diffamount = $kgdlbankbookdetails[$i]['difference_amount'];

    $query = "INSERT IGNORE INTO accref_bankrecon(accref_seqno,created_by,created_date) VALUES ('$seqno','$useridd',now())";

    $result = mysql_query($query);
    
    $queryy = "update accref_bankrecon
  set
  recon_status='$reconstatus',
  cleared_date='$cleareddate',
  bankstatement_seqno='$bankstmtseq',
  difference_amount='$diffamount',
  modified_by='$useridd',
  modified_date=now()
  where
  accref_seqno='$seqno'
  ";
    $resultt = mysql_query($queryy);
    if ($resultt) {
        $intcnt = $intcnt + 1;
    }
}



$bankstatementdetails = json_decode($_REQUEST['bankstatementdetails'], true);
$rowcnt2 = $_REQUEST['bankstatement'];
$intcnt2 = 0;
for ($i = 0; $i < $rowcnt2; $i++) {

    $seqno = $bankstatementdetails[$i]['seqno'];
    $reconstatus = $bankstatementdetails[$i]['Flag'];
    $kgdkbankbookseq = $bankstatementdetails[$i]['kgdlbankbookseqno'];

    $queryy2 = "update bank_statement
  set
  recon_status='$reconstatus', 
  kgdlbankbookseqno='$kgdkbankbookseq',
  modified_by='$useridd',
  modified_date=now()
  where
  seqno='$seqno'
  ";
    $resultt2 = mysql_query($queryy2);
    if ($resultt2) {
        $intcnt2 = $intcnt2 + 1;
    }
}



if ($resultt || $resultt2) {
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $num . '"})';
} else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $num . '"})';
}
