<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

$servernameMain = "10.0.0.251";
$databaseMain = "shvpm";

$servernameSub = "10.0.0.150";
$databasesub = "shvpmb";

$username = "root";
$password = "P@ssw0rD";


$dbMain =  mysql_connect($servernameMain,$username,$password) or die("connect : failure" . mysql_error());
$dbSub  =  mysql_connect($servernameSub,$username,$password); // or die("connect : failure" . mysql_error());

mysql_select_db($databaseMain,$dbMain);

//echo $dbsub;

if($dbSub)
mysql_select_db($databasesub,$dbSub);

session_start();


 $compcode = $_POST['compcode'];									
 $finid = $_POST['finid'];








// $query1 = "select * from trn_weighbridge_entry where t_wb_compcode = 1 and  t_wb_date >= '2024-01-02' and t_wb_year >= 24 and  t_wb_net_weight > 0 and t_wb_ticketno >= 1 and t_wb_upd = 'N'";

 $query1 = "select * from trn_weighbridge_entry where t_wb_compcode = $compcode and  t_wb_date >= '2024-01-02' and t_wb_year >= 24 and  t_wb_net_weight > 0 and t_wb_ticketno >= 1 and t_wb_upd = 'N'  and t_wb_type != 'Z'";


 $result1 = mysql_query($query1,$dbMain);



 while ($row = mysql_fetch_assoc($result1)) {



    $yr             = $row['t_wb_year'];
    $compcode       = $row['t_wb_compcode'];
    $ticketno       = $row['t_wb_ticketno'];
    $wbtype         = $row['t_wb_type'];
    $wbdate         = $row['t_wb_date'];
    $truck          = $row['t_wb_vehicle'];
    $party          = substr(trim($row['t_wb_party']),0,48);
    $party          = trim(strtoupper(str_replace("'", "", $party)));


    $first_wt_time  = $row['t_wb_1st_time'];
    $second_wt_time = $row['t_wb_2nd_time'];
    $item           = $row['t_wb_item'];

  
    $area           = '';
    $t_wb_1st_loadtype = $row['t_wb_1st_loadtype'];
    $t_wb_1st_weight = $row['t_wb_1st_weight'];
    $t_wb_1st_time = $row['t_wb_1st_time'];

    $t_wb_2nd_loadtype = $row['t_wb_2nd_loadtype'];
    $t_wb_2nd_weight = $row['t_wb_2nd_weight'];
    $t_wb_2nd_time = $row['t_wb_2nd_time'];



    $t_wb_net_weight = $row['t_wb_net_weight'];



    $t_wb_upd        = $row['t_wb_upd'];
    $t_wb_cancel_reason = $row['t_wb_cancel_reason'];



    if ($t_wb_upd == "C")
     $t_wb_2nd_time = $row['t_wb_1st_time'];





    $wbdate   = $row['t_wb_date'];


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
    $result2 = mysql_query($query2,$dbMain);






//echo $query2;
//echo "<br>";

 $query3 = "update trn_weighbridge_entry set t_wb_upd = 'Y' where t_wb_compcode = 1 and  t_wb_net_weight > 0 and t_wb_upd = 'N' and  t_wb_ticketno = $ticketno";

 $result3 = mysql_query($query3,$dbMain);

//echo $query3;
//echo "<br>";


  } 
  mysql_free_result($result11);

// for updating testing
//star

if($dbSub)
{
 $query1 = "select * from trn_weighbridge_entry where t_wb_compcode = 1 and  t_wb_date >= '2024-01-02' and t_wb_year >= 24 and  t_wb_ticketno >= 1  and ((t_wb_net_weight > 0 and  t_wb_upd = 'N') or  t_wb_upd = 'C')and t_wb_type = 'Z' ";



//echo $query1;
//echo "<br>";

 $result1 = mysql_query($query1,$dbMain);



 while ($row = mysql_fetch_assoc($result1)) {



    $yr             = $row['t_wb_year'];
    $compcode       = $row['t_wb_compcode'];
    $ticketno       = $row['t_wb_ticketno'];
    $wbtype         = $row['t_wb_type'];
    $wbdate         = $row['t_wb_date'];
    $truck          = $row['t_wb_vehicle'];
    $party          = substr(trim($row['t_wb_party']),0,48);
    $party          = trim(strtoupper(str_replace("'", "", $party)));


    $first_wt_time  = $row['t_wb_1st_time'];
    $second_wt_time = $row['t_wb_2nd_time'];
    $item           = $row['t_wb_item'];

  
    $area           = '';
    $t_wb_1st_loadtype = $row['t_wb_1st_loadtype'];
    $t_wb_1st_weight = (float) $row['t_wb_1st_weight'];
    $t_wb_1st_time = $row['t_wb_1st_time'];

    $t_wb_2nd_loadtype = $row['t_wb_2nd_loadtype'];
    $t_wb_2nd_weight = (float) $row['t_wb_2nd_weight'];
    $t_wb_2nd_time = $row['t_wb_2nd_time'];



    $t_wb_net_weight = (float) $row['t_wb_net_weight'];

    $t_wb_upd        = $row['t_wb_upd'];
    $t_wb_cancel_reason = $row['t_wb_cancel_reason'];



    if ($t_wb_upd == "C")
     $t_wb_2nd_time = $row['t_wb_1st_time'];





    $wbdate   = $row['t_wb_date'];


    $netwt    =  (float) $row['t_wb_net_weight'];

    if  ($row['t_wb_1st_loadtype']  ==  'L')
        $loadwt   =  (float) $row['t_wb_1st_weight'];
    else
        $emptywt   =  (float) $row['t_wb_1st_weight'];

    if  ($row['t_wb_2nd_loadtype']  ==  'L')
        $loadwt   =  (float) $row['t_wb_2nd_weight'];
    else
        $emptywt   =  (float) $row['t_wb_2nd_weight'];



    $query2 = "insert into trn_weight_card (wc_compcode, wc_fincode, wc_ticketno, wc_date,wc_first_time,wc_second_time, wc_area_code, wc_sup_code, wc_item, wc_vehicleno, wc_emptywt, wc_loadwt, wc_netwt, wc_supplier,wc_acceptedwt) VALUES ($compcode , $yr,$ticketno,'$wbdate','$first_wt_time', '$second_wt_time', 0,0,'$item' ,'$truck' , $emptywt, $loadwt ,$netwt ,'$party',$netwt)";

      $result2 = mysql_query($query2,$dbSub);


//echo $query2;
//echo "<br>";
       $querySub = "insert into trn_weighbridge_entry values('$yr', '$compcode','$ticketno', '$wbtype' , '$wbdate' , '$truck', '$item' , '$party' , '$area' , '$t_wb_1st_loadtype', '$t_wb_1st_weight', '$t_wb_1st_time', '$t_wb_2nd_loadtype', '$t_wb_2nd_time', '$t_wb_2nd_weight', '$t_wb_net_weight', '$t_wb_upd' , '$t_wb_cancel_reason')";


         $resultSub = mysql_query($querySub,$dbSub);


//echo $querySub;
//echo "<br>";

       $querySub2 = "insert into trn_weighbridge_entryTOBEDELETED values('$yr', '$compcode','$ticketno', '$wbtype' , '$wbdate' , '$truck', '$item' , '$party' , '$area' , '$t_wb_1st_loadtype', '$t_wb_1st_weight', '$t_wb_1st_time', '$t_wb_2nd_loadtype', '$t_wb_2nd_time', '$t_wb_2nd_weight', '$t_wb_net_weight', '$t_wb_upd' , '$t_wb_cancel_reason')";


       $resultSub = mysql_query($querySub2,$dbMain);



//echo $querySub;
//echo "<br>";



//echo $query2;
//echo "<br>";

 $query3 = "update trn_weighbridge_entry set t_wb_upd = 'Y' where t_wb_compcode = 1 and  t_wb_net_weight > 0 and t_wb_upd = 'N' and  t_wb_ticketno = $ticketno";

 $result3 = mysql_query($query3,$dbMain);

// $query3 = "delete from trn_weighbridge_entry  where t_wb_compcode = '$compcode' and t_wb_year = '$yr' and  t_wb_net_weight > 0 and t_wb_upd = 'Y' and t_wb_type = 'Z' and  t_wb_ticketno = $ticketno";


// $result3 = mysql_query($query3,$dbMain);

//echo $query3;
//echo "<br>";


  } 
  mysql_free_result($result11);
}
//end




 $query4 = "select * from trn_weighbridge_entry where t_wb_compcode = 1 and  t_wb_date < CURDATE() and t_wb_year >= 24 and  t_wb_net_weight > 0 and t_wb_ticketno >= 1  and t_wb_upd = 'Y'   and t_wb_type = 'Z' ";

// $query4 = "select * from trn_weighbridge_entry where t_wb_compcode = 1 and  t_wb_date >= '2024-01-02' and t_wb_year >= 24 and t_wb_ticketno >= 1 and ((t_wb_net_weight > 0 and t_wb_upd = 'N') or t_wb_upd = 'C') and t_wb_type = 'Z'";

//echo $query4;
///echo "<br>";



 $result4 = mysql_query($query4,$dbMain);
 while ($row = mysql_fetch_assoc($result4)) {
    $yr             = $row['t_wb_year'];
    $compcode       = $row['t_wb_compcode'];
    $ticketno       = $row['t_wb_ticketno'];
    $wbdate         = $row['t_wb_date'];

    $query5 = "select  count(*) as noofrec  from trn_weighbridge_entry where t_wb_compcode = $compcode and  t_wb_date = '$wbdate' and t_wb_year= $yr and ((t_wb_net_weight > 0 and  t_wb_upd = 'N') or t_wb_upd = 'C') and t_wb_ticketno = $ticketno and t_wb_type = 'Z' ";

    $query5 = "select  count(*) as noofrec  from trn_weighbridge_entry where t_wb_compcode = $compcode and  t_wb_date = '$wbdate' and t_wb_year= $yr and t_wb_net_weight > 0 and  t_wb_upd = 'Y'  and t_wb_ticketno = $ticketno and t_wb_type = 'Z' ";

//echo $query5;
//echo "<br>";

    $result5 = mysql_query($query5,$dbSub);
    $rec1    = mysql_fetch_array($result5);
    $noofrec = $rec1['noofrec'];

    if ($noofrec > 0 ) {

 $query6 = "delete from trn_weighbridge_entry  where t_wb_compcode = '$compcode' and t_wb_year = '$yr' and  t_wb_net_weight > 0 and  t_wb_upd = 'Y' and t_wb_type = 'Z' and  t_wb_ticketno = $ticketno";
 $result6 = mysql_query($query6,$dbMain);


//echo $query6;
//echo "<br>";


    }          

 } 




if ($result2 && $result3 ) {
    mysql_query("COMMIT");
  //  echo '({"success":"true","wtno":"' . $ticketno . '"})';
} else {
    mysql_query("ROLLBACK");
//    echo '({"success":"false","wtno":"' . $ticketno . '"})';
}
  

?>
