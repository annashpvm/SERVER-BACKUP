<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

     mysql_query("SET NAMES utf8");

    $task='';
    
    if ( isset($_POST['task'])){
        $task = $_POST['task']; 
    }

switch ($task) {
    case "Expbm":
        getExpbm();
        break;
    case "TdsLedgerget":
        getTdsLedgerget();
        break;
    case "DATECHECKING":
        getDATECHECKING();
        break;
    default:
        echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        break;
}

function JEncode($arr) {
    if (version_compare(PHP_VERSION, "5.2", "<")) {
        require_once("./JSON-.php");   //if php<5.2 need JSON class
        $json = new Services_JSON();  //instantiate new json object
        $data = $json->encode($arr);    //encode the data in json format
    } else {
        $data = json_encode($arr);    //encode the data in json format
    }
    return $data;
}
function getExpbm() {
    $finid=$_POST['finid'];
    $r = mysql_query("
select * from(
select 
    accref_vouno,
    CASE
        WHEN accref_comp_code = 1 THEN 'VM'
        WHEN accref_comp_code = 4 THEN 'SBM'
        WHEN accref_comp_code = 11 THEN 'AGRO'
    END as accref_comp_code,
    DATE_FORMAT(accref_voudate, '%d-%m-%Y') as accref_voudate,
    sum(acctran_dbamt) - sum(acctran_cramt) as Amount,
    accref_seqno
from
    acc_ref,
    acc_tran
where
    accref_seqno = acctran_accref_seqno and accref_finid = '$finid' and accref_vouno like 'EX%'  and accref_seqno >= '1409521'
group by accref_seqno , accref_vouno , accref_seqno
having sum(acctran_dbamt) <> sum(acctran_cramt)
)x
");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getTdsLedgerget() {
    $ledger=$_POST['ledger'];
    $r = mysql_query("select led_grp_code from acc_ledger_master where led_code='$ledger'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
?>






