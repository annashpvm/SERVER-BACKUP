<?php

    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$username=$_POST['username'];
$pd=$_POST['password'];
/*
$query = mysql_query("select userid,userpwd,userrole from usersmaster where username='$username'");

if(mysql_num_rows($query) > 0) {
    $arr = mysql_fetch_array($query);
	$_SESSION["user"] = $arr['userrole'];
    if(strcmp($arr['userpwd'], $pd) == 0) {
        echo "success";
	//echo $_SESSION["user"];
        exit();
    } else {
        echo "Password is not match";
        exit();
    }
} else {
    echo "Username is not found";
    exit();

*/

$query = mysql_query("select usr_code,usr_pwd,usr_type from mas_users where usr_name='$username'");

if(mysql_num_rows($query) > 0) {
    $arr = mysql_fetch_array($query);
	$_SESSION["user"] = $arr['usr_type'];
    if(strcmp($arr['usr_pwd'], $pd) == 0) {
        echo "success";
	//echo $_SESSION["user"];
        exit();
    } else {
        echo "Password is not match";
        exit();
    }
} else {
    echo "Username is not found";
    exit();
}
?>
