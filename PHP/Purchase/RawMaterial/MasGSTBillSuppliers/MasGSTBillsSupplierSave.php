<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

    $griddet = json_decode($_REQUEST['griddet'],true);
    $rowcnt = $_REQUEST['cnt'];
    $today = date("Y-m-d H:i:s");  
    $date1 = date('Y-m-d', strtotime($today. ' - 1 days'));



$data = '';

#Begin Transaction
mysql_query("BEGIN");



        for($i=0;$i<$rowcnt;$i++){
		$slno    = $i+1;

		$supcode = $griddet[$i]['cust_code'];
		$gst     = $griddet[$i]['cust_wp_gst_dnote_yn'];

		$query1 = "update massal_customer set cust_wp_gst_dnote_yn = '$gst' where cust_code = $supcode;";

//echo $query1;
		$result1=mysql_query($query1);   
  
            }

      if ($result1)
      {
          mysql_query("COMMIT");
          echo '({"success":"true","msg":"' . $data  . '"})';
      }
     else
     {
         mysql_query("ROLLBACK");
         echo '({"success":"false","msg":"' . $data  . '"})';

     }
?>
