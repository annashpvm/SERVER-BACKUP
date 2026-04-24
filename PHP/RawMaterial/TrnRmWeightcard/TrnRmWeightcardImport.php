<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

$servernameMain = "10.0.0.251";
$databaseMain = "shvpm";

$servernameSub = "10.0.0.150";
$databaseSub = "shvpmb";

$username = "root";
$password = "P@ssw0rD";


$mainupd = 0;
$subupd = 0;
$delupd = 0;
session_start();

$dbMain = mysqli_connect($servernameMain, $username, $password, $databaseMain)
    or die("Main DB connect failure: " . mysqli_connect_error());

$dbSub = mysqli_connect($servernameSub, $username, $password, $databaseSub)
    or die("Sub DB connect failure: " . mysqli_connect_error());


    mysqli_set_charset($dbMain, "utf8");
    mysqli_set_charset($dbSub, "utf8");


    mysqli_begin_transaction($dbMain);
    mysqli_begin_transaction($dbSub);

    mysqli_select_db($dbMain, $databaseMain);


 //echo $dbMain;

if($dbSub)

mysqli_select_db($dbSub, $databaseSub);




 $compcode = $_POST['compcode'];									
 $finid = $_POST['finid'];








// $query1 = "select * from trn_weighbridge_entry where t_wb_compcode = 1 and  t_wb_date >= '2024-01-02' and t_wb_year >= 24 and  t_wb_net_weight > 0 and t_wb_ticketno >= 1 and t_wb_upd = 'N'";

 $query1 = "select * from trn_weighbridge_entry where t_wb_compcode = $compcode and  t_wb_date >= '2024-01-02' and t_wb_year >= 24 and  t_wb_net_weight > 0 and t_wb_ticketno >= 1 and t_wb_upd = 'N'  and t_wb_type != 'Z'";

 //echo $query1;
 //echo "<br>";
 $result1Main = mysqli_query($dbMain, $query1);



 while ($row = mysqli_fetch_assoc($result1Main)) {

    $mainupd = 1;

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



     $emptywt = 0;
     $loadwt  = 0;

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
    $result2Main  = mysqli_query($dbMain, $query2);






//echo $query2;
//echo "<br>";

 $query3 = "update trn_weighbridge_entry set t_wb_upd = 'Y' where t_wb_compcode =  '$compcode' and  t_wb_net_weight > 0 and t_wb_upd = 'N' and  t_wb_ticketno = $ticketno";
 $result3Main = mysqli_query($dbMain, $query3);

//echo $query3;
//echo "<br>";


  } 
  mysqli_free_result($result1Main);

// for updating testing
//star

if($dbSub)
{
 $query1 = "select * from trn_weighbridge_entry where t_wb_compcode =  '$compcode' and  t_wb_date >= '2024-01-02' and t_wb_year >= 24 and  t_wb_ticketno >= 1  and ((t_wb_net_weight > 0 and  t_wb_upd = 'N') or  t_wb_upd = 'C') and t_wb_type = 'Z' ";
 
// $query1 = "select * from trn_weighbridge_entry where t_wb_compcode =  '$compcode' and  t_wb_date >= '2024-01-02' and t_wb_year >= 24 and  t_wb_ticketno >= 1  and ((t_wb_net_weight > 0 and  t_wb_upd = 'N'))and t_wb_type = 'Z' ";
//$query1 = "select * from trn_weighbridge_entry where t_wb_date = '2025-11-04' and  t_wb_type = 'Z'";
 

//echo $query1;
//echo "<br>";

 $result1Sub = mysqli_query($dbMain, $query1);



 while ($row = mysqli_fetch_assoc($result1Sub)) {

    $subupd = 1;

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

//        echo "TEST";
        //echo "<br>";

      $query2 = "insert into trn_weight_card (wc_compcode, wc_fincode, wc_ticketno, wc_date,wc_first_time,wc_second_time, wc_area_code, wc_sup_code, wc_item, wc_vehicleno, wc_emptywt, wc_loadwt, wc_netwt, wc_supplier,wc_acceptedwt) VALUES ($compcode , $yr,$ticketno,'$wbdate','$first_wt_time', '$second_wt_time', 0,0,'$item' ,'$truck' , $emptywt, $loadwt ,$netwt ,'$party',$netwt)";
      $result2Sub = mysqli_query($dbSub, $query2);



//echo $query2;
//echo "<br>";

       $querySub = "insert into trn_weighbridge_entry values('$yr', '$compcode','$ticketno', '$wbtype' , '$wbdate' , '$truck', '$item' , '$party' , '$area' , '$t_wb_1st_loadtype', '$t_wb_1st_weight', '$t_wb_1st_time', '$t_wb_2nd_loadtype', '$t_wb_2nd_time', '$t_wb_2nd_weight', '$t_wb_net_weight', '$t_wb_upd' , '$t_wb_cancel_reason')";
       $result3Sub = mysqli_query($dbSub, $querySub);

//echo $querySub;
//echo "<br>";

      $querySub2 = "insert into trn_weighbridge_entryTOBEDELETED values('$yr', '$compcode','$ticketno', '$wbtype' , '$wbdate' , '$truck', '$item' , '$party' , '$area' , '$t_wb_1st_loadtype', '$t_wb_1st_weight', '$t_wb_1st_time', '$t_wb_2nd_loadtype', '$t_wb_2nd_time', '$t_wb_2nd_weight', '$t_wb_net_weight', '$t_wb_upd' , '$t_wb_cancel_reason')";
      $result4Sub = mysqli_query($dbMain , $querySub2);


//echo $querySub2;
//echo "<br>";

 $query5 = "update trn_weighbridge_entry set t_wb_upd = 'Y' where t_wb_compcode =  '$compcode' and  (t_wb_net_weight > 0 and  t_wb_upd = 'N')  and  t_wb_ticketno = $ticketno and t_wb_year = '$yr'";
 $result5Main = mysqli_query($dbMain, $query5);

//echo $query5;
//echo "<br>";


  } 
  mysqli_free_result($result1Sub);
}
//end




// $query4 = "select * from trn_weighbridge_entry where t_wb_compcode =  '$compcode' and  t_wb_date <= CURDATE() and t_wb_year >= 24 and  t_wb_net_weight > 0 and t_wb_ticketno >= 1  and t_wb_upd = 'Y'   and t_wb_type = 'Z' ";

 $query4 = "select * from trn_weighbridge_entry where t_wb_compcode = 1 and  t_wb_date >= '2024-01-02' and t_wb_year >= 24 and t_wb_ticketno >= 1 and ((t_wb_net_weight > 0 and t_wb_upd = 'Y') or t_wb_upd = 'C') and t_wb_type = 'Z'";

//echo $query4;
//echo "<br>";



 $result4 = mysqli_query( $dbMain,$query4);

 //$resDB = mysqli_query($dbMain, "SELECT DATABASE() AS db");
 //$rowDB = mysqli_fetch_assoc($resDB);
 
// echo "Connected DB: " . $rowDB['db'];
 //echo "<br>";
 


 if (!$result4) {
    die("Query4 Error: " . mysqli_error($dbMain));
}

//echo "Rows found: " . mysqli_num_rows($result4);
//echo "<br>";

 //echo "TEST-1";
 //echo "<br>";

 while ($row = mysqli_fetch_assoc($result4)) {


    echo "TEST-2";
    echo "<br>";    
    $yr             = $row['t_wb_year'];
    $compcode       = $row['t_wb_compcode'];
    $ticketno       = $row['t_wb_ticketno'];
    $wbdate         = $row['t_wb_date'];


//    echo "TEST";
    //echo "<br>";

//    $query5 = "select  count(*) as noofrec  from trn_weighbridge_entry where t_wb_compcode = $compcode and  t_wb_date = '$wbdate' and t_wb_year= $yr and ((t_wb_net_weight > 0 and  t_wb_upd = 'N') or t_wb_upd = 'C') and t_wb_ticketno = $ticketno and t_wb_type = 'Z' ";

    $query5 = "select  count(*) as noofrec  from trn_weighbridge_entry where t_wb_compcode = $compcode and  t_wb_date = '$wbdate' and t_wb_year= $yr and  t_wb_ticketno = $ticketno and t_wb_type = 'Z' ";

//echo $query5;
//echo "<br>";

    $result5 = mysqli_query($dbSub,$query5);
    $rec1    = mysqli_fetch_array($result5);
    $noofrec = $rec1['noofrec'];

  //  echo $noofrec;
//    echo "<br>";
        
    if ($noofrec > 0 ) {

//        $query6 = "DELETE FROM trn_weighbridge_entry  WHERE t_wb_compcode = '$compcode' AND t_wb_year = '$yr' AND  ((t_wb_net_weight > 0 AND  t_wb_upd = 'Y') OR t_wb_upd = 'C') AND t_wb_type = 'Z' AND  t_wb_ticketno = $ticketno"; 
        $query6 = "DELETE FROM trn_weighbridge_entry  WHERE t_wb_compcode = '$compcode' AND t_wb_year = '$yr' AND t_wb_type = 'Z' AND  t_wb_ticketno = $ticketno  AND DATE_ADD(t_wb_2nd_time, INTERVAL 10 MINUTE) < CURRENT_TIMESTAMP();"; 
        $result6 = mysqli_query($dbMain,$query6);

        $delupd = 1;
//echo $query6;
//echo "<br>";

    }          

    
 } 


//echo $mainupd;

//echo $subupd;

 if ($mainupd == 0 && $subupd == 1 )
 {
    if ($result2Sub  && $result3Sub && $result5Main ) {
    
        mysqli_commit($dbSub);
      //  echo '({"success":"true","wtno":"' . $ticketno . '"})';
    } else {
        mysqli_rollback($dbSub);
    
    
    //    echo '({"success":"false","wtno":"' . $ticketno . '"})';
    }
  
 }

 if ($mainupd == 1 && $subupd == 0 )
 {
    if ($result2Main  && $result3Main ) {
        
        mysqli_commit($dbMain);
    //  echo '({"success":"true","wtno":"' . $ticketno . '"})';
    } else {
        mysqli_rollback($dbMain);


    //    echo '({"success":"false","wtno":"' . $ticketno . '"})';
    }
}


 if ($mainupd == 1 && $subupd == 1 )
 {
    if ($result2Main  && $result3Main ) {
        
        mysqli_commit($dbMain);
    //  echo '({"success":"true","wtno":"' . $ticketno . '"})';
    } else {
        mysqli_rollback($dbMain);


    //    echo '({"success":"false","wtno":"' . $ticketno . '"})';
    }


    if ($result2Sub  && $result3Sub ) {
    
        mysqli_commit($dbSub);
      //  echo '({"success":"true","wtno":"' . $ticketno . '"})';
    } else {
        mysqli_rollback($dbSub);
    
    
    //    echo '({"success":"false","wtno":"' . $ticketno . '"})';
    }    
}



if ($delupd == 1 )
{



   if ($result6 ) {

       
       mysqli_commit($dbMain);
     //  echo '({"success":"true","wtno":"' . $ticketno . '"})';
   } else {

       mysqli_rollback($dbMain);
   
   
   //    echo '({"success":"false","wtno":"' . $ticketno . '"})';
   }
 
}

?>
