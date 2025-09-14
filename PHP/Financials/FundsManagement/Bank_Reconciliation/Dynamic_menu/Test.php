<?php

require($_SERVER["DOCUMENT_ROOT"]."/HRD/Conn.php");
$action = $_POST['action'];
$idd = $_POST['id'];
$name = $_POST['name'];
$sname = $_POST['sname'];
$cadretype=$_POST['cadretype'];
$status = $_POST['status'];
$userid = $_POST['userid'];
mysql_query("BEGIN");

if ($action == "Add") {
    $query1 = ("call hr_sp_cadreMaster_insert('$name','$sname','$cadretype','Y','$userid', curdate() )" );
    $result1 = mysql_query($query1);
}

if ($action == "Edit") {
    $r = ( " call hr_sp_cadreMaster_update('$idd','$name','$sname','$cadretype','$status','$userid',curdate() ) ");
    $result = mysql_query($r);
}

if ($result1 || $result) {
    mysql_query("COMMIT");
} else {
    mysql_query("ROLLBACK");
}
?>