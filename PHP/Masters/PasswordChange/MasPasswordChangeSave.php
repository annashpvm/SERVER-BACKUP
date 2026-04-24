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
mysqli_begin_transaction($conn);


      $query  = "update userMaster set usr_pw = '$password'  where usr_code = $usercode";
      $result = mysqli_query($conn, $query);

      if (($result ))
      {
          mysqli_commit($conn);
          echo '({"success":"true","msg":"' . $username . '"})';
      }
     else
     {
         mysqli_rollback($conn);


         echo '({"success":"false","msg":"' . $username . '"})';

     }
?>
