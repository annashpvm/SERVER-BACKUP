<?php

mysql_connect("192.168.3.7", "root", "mysql") or die("Connect : Failure" . mysql_error());

mysql_select_db("kgdl");
mysql_query('SET NAMES utf8');
?>
