<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $tree_array = [];
    $nodearray = [];
    mysql_query("SET NAMES utf8");  
    $yarn_type_code = $_REQUEST['yarn_type_code'];
    $sql = "select cust_ref,cust_add1,cust_add2,cust_add3,cust_gstin from massal_customer limit 20";
    $result = mysql_query($sql);
    $nbrows1 = mysql_num_rows($result);    
    while($data = mysql_fetch_object($result)) {
        $tree_array = array("id"=>$data->cust_ref,"text"=>$data->cust_add1);
        array_push($nodearray,$tree_array);
    }
    echo json_encode($nodearray);
?>
