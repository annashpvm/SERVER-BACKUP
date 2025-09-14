<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

     mysql_query("SET NAMES utf8");

     $task='ledgerName';
   
    if ( isset($_POST['task'])){
        $task = $_POST['task']; 
    }

switch ($task) {
    case "CurBalance":
	getCurBalance();
	break;
    case "Stock":
	getStock();
	break;	
    case "MonthLoad":
        getMonthLoad();
        break;
    case "ledgerName":
        getledgerName();
        break;
    default:
        echo "{failure:true}"; 
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

function getCurBalance() {
    $finid=$_POST['finid'];
    $ledcode=$_POST['ledcode'];		
    $r = mysql_query("select 	* from 	acc_current_balance 
	where 	curbal_led_code = '$ledcode' and 
		curbal_finid 		= '$finid'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getStock() {
    $companycode=$_POST['compcode'];
    $finid=$_POST['finid'];
    $ledcode=$_POST['ledcode'];		
    $r = mysql_query("select 
    a.accstk_opening,
    m.month_name,
    m.month_code,
    m.month_order_code
from
    acc_stock a,
    month_master m
where
    a.accstk_month = m.month_code and a.accstk_led_code = '$ledcode' and a.accstk_fin_id = '$finid' and a.accstk_comp_code = '$companycode' order by month_order_code");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getMonthLoad() {
    $r = mysql_query("select *,'' as open,'' as close from Closingmonth  order by month_order_code");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
function getledgerName() {
    $companycode=$_POST['compcode'];
    $r = mysql_query("select * from acc_ledger_master where led_grp_code in (168,169,170,171,172,204) and led_comp_code='$companycode'");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}
?>






