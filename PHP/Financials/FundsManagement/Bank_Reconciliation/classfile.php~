<?php
//$con = mysql_connect("192.168.3.7", "root", "mysql");
//mysql_select_db("kgdl");

require($_SERVER["DOCUMENT_ROOT"] . "/SHVPM/Financials/FundsManagement/Bank_Reconciliation/Conn.php");
mysql_query('SET NAMES utf8');
if (isset($_POST['task'])) {
    $task = $_POST['task'];
}
switch ($task) {

    case "LoginCheck":
        checklogin();
        break;
    case "selectcompany":
        companyselect();
        break;
    case "selectledger":
        ledgerselect();
        break;
    case "selectMonth":
        monthselect();
        break;
    case "selectbankmaster":
        bankmasterselect();
        break;
    case "selectledgername":
        ledgernameselect();
        break;
    case "selectcompanyname":
        companynameselect();
        break;
    case "selectbanktrailerone":
        banktraileroneselect();
        break;
    case "selectbanktrailertwo":
        banktrailertwoselect();
        break;
    case "selectbankstatement":
        bankstatementselect();
        break;

    case "selectbankbook":
        bankbookselect();
        break;

    case "selectparty":
        partyselect();
        break;
  case "selectclosingbalance":
        closingbalanceselect();
        break;

  case "inscalculation":
        getinscalculation();
        break;

    default:
        echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        break;
}

function JEncode($arr) {
    if (version_compare(PHP_VERSION, "5.2", "<")) {
        require_once("./JSON.php");   //if php<5.2 need JSON class
        $json = new Services_JSON();  //instantiate new json object
        $data = $json->encode($arr);    //encode the data in json format
    } else {
        $data = json_encode($arr);    //encode the data in json format
    }
    return $data;
}

function checklogin() {
    $user = $_POST['login'];
    $pass = $_POST['pass'];
    mysql_query('SET NAMES utf8');
    $r = mysql_query("select login_name,employee_roll_no,role_name from user_master where login_name='$user' and paswd='$pass'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function monthselect() {
    $r = mysql_query("select month_code,month_name from month_master order by month_code");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function companyselect() {
    $r = mysql_query("SELECT comp_code,comp_name FROM kgdl.acc_company_master where comp_code in (1,4,8,11);");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function ledgerselect() {
    $company = $_POST['company'];
    // $company = '1,4';
    $r = mysql_query("SELECT led_code,led_name from kgdl.acc_ledger_master
where  led_grp_code in (20,22,23,24,25,90,21,91,92,93,94,95,96,102,182)
and led_status='Y'
and led_duplicate='N' and led_comp_code in ($company);");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function bankmasterselect() {
    $r = mysql_query("call acc_sp_bankrecon_bankmaster_select() ;");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function ledgernameselect() {
    $legdercode = $_POST['ledgercode'];
    // $company = '1,4';
    $r = mysql_query("SELECT led_code,led_name from kgdl.acc_ledger_master
where  led_grp_code in (20,22,23,24,25,90,21,91,92,93,94,95,96,102,182)
and led_status='Y'
and led_duplicate='N' and led_code= '$legdercode');");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function companynameselect() {
    $companycode = $_POST['companycode'];
    // $company = '1,4';
    $r = mysql_query("SELECT comp_code,comp_name FROM kgdl.acc_company_master where comp_code ='$companycode';");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function banktraileroneselect() {
    $headerseq = $_POST['headerseq'];
    // $company = '1,4';
    $r = mysql_query("SELECT seqno,header_seqno,company_code,comp_name FROM bank_master_trailerone tw
left join kgdl.acc_company_master cm on cm.comp_code=tw.company_code where header_seqno='$headerseq';");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function banktrailertwoselect() {
    $headerseq = $_POST['headerseq'];
    // $company = '1,4';
    $r = mysql_query("SELECT seqno,header_seqno,ledger_code,led_name FROM bank_master_trailertwo tw
left join kgdl.acc_ledger_master lm on lm.led_code=tw.ledger_code where header_seqno='$headerseq';");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function bankstatementselect() {
    $bankcode = $_POST['bankcode'];
    $pdate = $_POST['pdate'];
    $todate = $_POST['todate'];
    $reconstatus = $_POST['reconstatus'];
    $clearedfrom = $_POST['cfromdate'];
    $clearedto = $_POST['ctodate'];
if($reconstatus==='check'){
    $r = mysql_query("call acc_sp_bankrecon_bankstatement_select('$bankcode','$pdate','$todate','$reconstatus'); ");
}
else
{
 $r = mysql_query("call acc_sp_bankrecon_bankstatement_select_include('$bankcode','$pdate','$todate','$reconstatus','$clearedfrom','$clearedto'); ");
}
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function bankbookselect() {
    $bankcode = $_POST['bankcode'];
    // $stmonth = $_POST['stmonth'];
    //  $styear = $_POST['styear'];
 
    $pdate = $_POST['pdate'];
    $todate = $_POST['todate'];
    $reconstatus = $_POST['reconstatus'];
    $clearedfrom = $_POST['cfromdate'];
    $clearedto = $_POST['ctodate'];
if($reconstatus==='check'){
    $r = mysql_query("call bankrecon_bankbook_select('$bankcode','$pdate','$todate','$reconstatus')");
}
else
{
 $r = mysql_query("call bankrecon_bankbook_select_include('$bankcode','$pdate','$todate','$reconstatus','$clearedfrom','$clearedto'); ");
}
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function bankstatementsave() {
    $bankcode = $_POST['bankcode'];
    $stmonth = $_POST['stmonth'];
    $styear = $_POST['styear'];

    $r = mysql_query(" ");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function bankbookselectsave() {
    $bankcode = $_POST['bankcode'];
    $stmonth = $_POST['stmonth'];
    $styear = $_POST['styear'];

    $r = mysql_query("");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function partyselect() {
    $vouno = $_POST['vouno'];

    $r = mysql_query("call bank_recon_partyshow('$vouno')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function closingbalanceselect() {
    $bcode = $_POST['bcode'];
    $rdate = $_POST['rdate'];
    $r = mysql_query("select * from bankrecon_closingbalance where bank_code='$bcode' and recon_date='$rdate' ;");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getinscalculation() {
    $tmonth = $_POST['tmonth'];
    $tyear = $_POST['tyear'];
    $bankcode = $_POST['bankcode'];
    $closingbal = $_POST['closingbal'];
    $r = mysql_query("call interest_calculation('$bankcode','$tyear','$tmonth','$closingbal')");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

?>
