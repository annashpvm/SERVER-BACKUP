<?php

    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$username=$_POST['username']; 
$_SESSION["modflag"]=$_POST['flag'];

//$query = mysql_query("select userid,userpwd,userrole from usersmaster where userid='$username'");

//$query=mysql_query("select usr_code as userid,usr_name as username,usr_type as userrole from mas_users  where usr_code = '$username'");

$query=mysql_query("select usr_code as userid,usr_name as username,usr_type as userrole from userMaster  where usr_code = '$username'");

if(mysql_num_rows($query) > 0) 
{
	$arr = mysql_fetch_array($query);
	$_SESSION["user"] = $arr['userrole'];
        echo "success";
}
?>
