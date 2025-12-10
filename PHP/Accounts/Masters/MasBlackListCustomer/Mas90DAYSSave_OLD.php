<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

    $griddet = json_decode($_REQUEST['griddet'],true);
    $rowcnt = $_REQUEST['cnt'];
    $today = date("Y-m-d H:i:s");  
    $date1 = date('Y-m-d', strtotime($today. ' - 1 days'));


 //   $nDays = 1;
//    $date = strtotime($today . '- '.$nDays.' days');
//echo $date;
  //  $date1 = date_format($date,'Y-m-d');
//    echo date('Y-m-d', $date);

//echo $date1;

$data = '';

#Begin Transaction
mysqli_query($conn, "BEGIN");

//$query1 = "delete from overdue_custlist  where c_code >0";
//$result1 = mysqli_query($conn, $query1);


        for($i=0;$i<$rowcnt;$i++){
            $slno    = $i+1;
            $ccode   = $griddet[$i]['c_code'];
            $cname   = $griddet[$i]['c_name'];
            $soallow = $griddet[$i]['c_SO_allow'];

            if($ccode>0){

		 $query1 = " select count(*) as norecs from overdue_custlist where c_code ='$ccode'";
		 $result1= mysqli_query($conn, $query1);
		 $rec2 = mysqli_fetch_array($result1);
		 $recfound =$rec2['norecs'];

                 if($recfound == 0){  
                    $query2  = "insert into overdue_custlist values ('$ccode','$cname','$date1','N')";
                    $result2 = mysqli_query($conn, $query2);
                 }
                 
                 if($recfound > 0 && $soallow == "Y"  ){  
                    $query2  = "delete from overdue_custlist  where c_code = '$ccode'";
                    $result2 = mysqli_query($conn, $query2);
                 }
  
            }
      }       

      if ($result2)
      {
          mysqli_begin_transaction($conn);
          echo '({"success":"true","msg":"' . $data  . '"})';
      }
     else
     {
         mysqli_rollback($conn);


         echo '({"success":"false","msg":"' . $data  . '"})';

     }
?>
