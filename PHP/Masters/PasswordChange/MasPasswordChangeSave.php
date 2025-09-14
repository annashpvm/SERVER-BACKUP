<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();


 $usercode    = $_REQUEST['usercode'];
 $username    = $_POST['username'];
 $password    = $_POST['password'];
 $usercode    = $_POST['usercode'];
 $reccount    = 1;
 $today       = date("Y-m-d H:i:s");  




#Begin Transaction
mysql_query("BEGIN");


      $query  = "update userMaster set usr_pw = '$password'  where usr_code = $usercode";
      $result = mysql_query($query);

      if (($result ))
      {
          mysql_query("COMMIT");
          echo '({"success":"true","msg":"' . $username . '"})';
      }
     else
     {
         mysql_query("ROLLBACK");
         echo '({"success":"false","msg":"' . $username . '"})';

     }
?>
