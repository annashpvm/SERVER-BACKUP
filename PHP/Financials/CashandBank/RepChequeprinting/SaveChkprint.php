<?php
 require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

        $accseqno =$_POST['accseqno'];

        $query="call acc_sp_rep_updaccref_chequestatus('$accseqno')";
        $result = mysqli_query($conn, $query);

   if ($result)
    {
        Echo '{success:true}';
    }
      else
    {
        Echo '{failure:true}';
    }
?>
