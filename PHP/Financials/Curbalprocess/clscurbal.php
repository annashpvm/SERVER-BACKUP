<?php
mysql_connect("192.168.3.7", "root", "mysql") or die("Connect : Failure" . mysql_error());
mysql_select_db("kgdl");

mysql_query("SET NAMES utf8");

$task = 'Temp';

if (isset($_POST['task'])) {
    $task = $_POST['task'];
}

switch ($task) {
    
    case "cmbledcode":
        getledcode();
        break;
    default:
        echo "{failure:true}";
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


function getledcode() {
    mysql_query("SET NAMES utf8");
    $r = mysql_query("select
			*
		from 	acc_current_balance
		where	curbal_finid= 23");
    $nrow = mysql_num_rows($r);
    while ($re = mysql_fetch_array($r)) {
        $arr[] = $re;
    }
    $jsonresult = JEncode($arr);
    echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
}

?>
