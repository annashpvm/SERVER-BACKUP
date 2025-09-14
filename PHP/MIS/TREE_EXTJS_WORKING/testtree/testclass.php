<?php

mysql_query("SET NAMES utf8");
require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");

//$result = mysql_query("select yarn_cust_name,yarn_cust_address1,yarn_cust_address2,yarn_gstno,yarn_cust_comp_code from yarn_customer_master limit 20")or die(mysql_error());

$result = mysql_query("select cust_ref,cust_add1,cust_add2,cust_add3,cust_gstin from massal_customer limit 20")or die(mysql_error());

$data = array();

while ($row = mysql_fetch_object($result)) {
    $data [] = $row;
}

echo json_encode($data);
?>
