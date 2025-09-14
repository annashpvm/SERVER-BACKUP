<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    session_start();
 		
    $compcode  =  $_POST['compcode'];
    $finid     =  $_POST['finid'];
    $nextfinid =  $_POST['nextfinid'];
    $startdate =  $_POST['startdate'];
    $enddate   =  $_POST['enddate'];


    mysql_query("BEGIN");

    $query1= "select * from masfu_item_header order by itmh_code";
    $result11=mysql_query($query1);

//echo $query1;
    while ($row = mysql_fetch_assoc($result11)) {

           $itemcode  = $row['itmh_code'];
//echo $itemcode;

           $query2   = mysql_query("select count(*) recfound from masfu_item_trailer where itmt_compcode= 1
and itmt_fincode = $nextfinid  and itmt_hdcode =  $itemcode");
           $findrow  = mysql_fetch_row($query2);
           if ($findrow[0]  == 0)
           {
		$query1="insert into masfu_item_trailer values($itemcode,1, $nextfinid, 0, 0, 0, 0, 0);";
		$result1=mysql_query($query1);       

           } 
      

           $query2   = mysql_query("select count(*) recfound from masfu_item_trailer where itmt_compcode= 90
and itmt_fincode = $nextfinid  and itmt_hdcode =  $itemcode");
           $findrow  = mysql_fetch_row($query2);
           if ($findrow[0]  == 0)
           {
		$query1="insert into masfu_item_trailer values($itemcode,90, $nextfinid, 0, 0, 0, 0, 0);";
		$result1=mysql_query($query1);       

            } 

       
    } 

// opening details updation




     if ($result11)
     {
          mysql_query("COMMIT");
          echo '({"success":"true","msg":"' . $compcode . '"})';
     }
     else
     {
         mysql_query("ROLLBACK");
         echo '({"success":"false","msg":"' . $compcode . '"})';
     }
  //   while ($row = mysql_fetch_assoc($result11)) 
//           $itemcode  = $row['item_code'];
  //         $itemcompcode  = $row['item_comp_code'];


 
?>
