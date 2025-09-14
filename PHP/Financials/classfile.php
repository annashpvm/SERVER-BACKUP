<?php
  require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");

$task = '';

if (isset($_POST['task'])) {
    $task = $_POST['task'];
}
switch ($task) {

    case "GetLedger":
        getledgerdetail();
        break;
    case "GetLedgerAllDetail":
        getalldetails();
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

function getledgerdetail() {
    $compcode=$_POST['compcode'];
    $r = "select  l.led_code as led_code,l.led_name as led_name from acc_ledger_master l,tdsledgermaster t
where l.led_code=t.tds_led_code and  t.tds_led_compcode='$compcode'";
    $m = mysql_query($r);
    $nrow = mysql_num_rows($m);
    while ($re = mysql_fetch_array($m)) {
        $arr[] = $re;
    }
    $jsonresult = json_encode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

function getalldetails()
{
    $ledger=$_POST['ledger'];
    $fromdate=$_POST['fdate'];
    $todate=$_POST['tdate'];
    $finid=$_POST['finid'];
    $compcode=$_POST['compcode'];
    $r = "call acc_sp_tdsselectcustomer('$fromdate','$todate','$ledger','$finid','$compcode')";
    $m = mysql_query($r);
    $nrow = mysql_num_rows($m);
    while ($re = mysql_fetch_array($m)) {
        $arr[] = $re;
    }
    $jsonresult = json_encode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})'; 
}

?>





