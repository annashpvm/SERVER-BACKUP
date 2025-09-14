<?php
 require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

        $accseqno =$_POST['accseqno'];

        $query="call acc_sp_rep_updaccref_chequestatus('$accseqno')";
        $result = mysql_query($query);

   if ($result)
    {
        Echo '{success:true}';
    }
      else
    {
        Echo '{failure:true}';
    }
?>
