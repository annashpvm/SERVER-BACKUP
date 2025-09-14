<?
 session_start();
?>
<?php

        mysql_connect("192.168.3.130","root","mysql") or die("Connect : Failure" . mysql_error());
        mysql_select_db("kgdl");
        $reasonname=$_POST['reasonname'];
        $query =mysql_query("select IFNULL(max(reason_code),0) + 1 as reason_code from reason_master");
        $reasonCode =mysql_fetch_array($query);
        $reasonSeqno=$reasonCode['reason_code'];
        $query1 = "INSERT INTO reason_master(reason_code,reason_name)     VALUES
        (
        $reasonSeqno,
        '$reasonname'
        )";
$result = mysql_query($query1);

      if ((!$result))
      {
             json_encode(array('success' => false));

      }

     else
      {
            // Echo '{success:true,results:1,
            // rows:[{"Region":"1"}]}';
           json_encode(array('success' => true));
     }


?>
