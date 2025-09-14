<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();


 $compcode = $_POST['compcode'];									
 $finid = $_POST['finid'];

 $query1 = "select * from trn_weighbridge_entry where t_wb_compcode = 1 and  t_wb_net_weight > 0 and t_wb_upd = 'N'";

 if ($compcode == 1) 
 $query1 = "select * from trn_weighbridge_entry where t_wb_compcode = 1 and  t_wb_date >= '2024-01-02' and t_wb_year >= 24 and  t_wb_net_weight > 0 and t_wb_ticketno >= 1 and t_wb_upd = 'N'";
else
 $query1 = "select * from trn_weighbridge_entry where t_wb_compcode = 90 and  t_wb_date >= '2024-01-02' and  t_wb_net_weight > 0 and t_wb_ticketno >= 1 and t_wb_upd = 'N'";


 $result1 = mysql_query($query1);


 while ($row = mysql_fetch_assoc($result1)) {

    $yr       = $row['t_wb_year'];
    $ticketno = $row['t_wb_ticketno'];
    $wbdate   = $row['t_wb_date'];
    $first_wt_time = $row['t_wb_1st_time'];
    $second_wt_time   = $row['t_wb_2nd_time'];
    $item = $row['t_wb_item'];

    $party   = substr(trim($row['t_wb_party']),0,48);

    $party = trim(strtoupper(str_replace("'", "", $party)));


    $wbdate   = $row['t_wb_date'];
    $truck    = $row['t_wb_vehicle'];

    $netwt    = $row['t_wb_net_weight'];

    if  ($row['t_wb_1st_loadtype']  ==  'L')
        $loadwt   = $row['t_wb_1st_weight'];
    else
        $emptywt   = $row['t_wb_1st_weight'];

    if  ($row['t_wb_2nd_loadtype']  ==  'L')
        $loadwt   = $row['t_wb_2nd_weight'];
    else
        $emptywt   = $row['t_wb_2nd_weight'];



    $query2 = "insert into trn_weight_card (wc_compcode, wc_fincode, wc_ticketno, wc_date,wc_first_time,wc_second_time, wc_area_code, wc_sup_code, wc_item, wc_vehicleno, wc_emptywt, wc_loadwt, wc_netwt, wc_supplier,wc_acceptedwt) VALUES ($compcode , $yr,$ticketno,'$wbdate','$first_wt_time', '$second_wt_time', 0,0,'$item' ,'$truck' , $emptywt, $loadwt ,$netwt ,'$party',$netwt)";



    $result2 = mysql_query($query2);


//echo $query2;
//echo "<br>";

 $query3 = "update trn_weighbridge_entry set t_wb_upd = 'Y' where t_wb_compcode = 1 and  t_wb_net_weight > 0 and t_wb_upd = 'N' and  t_wb_ticketno = $ticketno";

 $result3 = mysql_query($query3);

//echo $query3;
//echo "<br>";


  } 
  mysql_free_result($result11);





if ($result2 && $result3 ) {
    mysql_query("COMMIT");
  //  echo '({"success":"true","wtno":"' . $ticketno . '"})';
} else {
    mysql_query("ROLLBACK");
//    echo '({"success":"false","wtno":"' . $ticketno . '"})';
}
  

?>
