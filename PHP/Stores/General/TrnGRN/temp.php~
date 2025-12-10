<?php
    mysql_connect("192.168.11.15","root","Mysql123","Success") or die("Connect : Failure" . mysql_error());

    mysql_select_db("dpm");

session_start();

$query  = "select * from trnpur_indent";
$result = mysql_query($query);
while ($row = mysql_fetch_assoc($result)) {

     echo $row['ind_item_code'];
     echo $row['ind_date'];

}

mysql_free_result($result);
?>
