<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

$servernameMain = "10.0.0.251";
$databaseMain   = "shvpm";

$servernameSub = "10.0.0.150";
$databasesub = "shvpmb";

$username = "root";
$password = "P@ssw0rD";

mysql_query("BEGIN");

$dbMain  =  mysql_connect($servernameMain,$username,$password) or die("connect : failure" . mysql_error());
$dbSub   =  mysql_connect($servernameSub,$username,$password); // or die("connect : failure" . mysql_error());
$dbMain2 =  mysql_connect($servernameMain,$username,$password);

mysql_select_db($databaseMain,$dbMain);


if($dbSub)
mysql_select_db($databasesub,$dbSub);

/*
if($dbMain)
   echo "Server 1 Connection is ok";
else
   echo "Server 1 Connection failure";
if($dbSub)
   echo "Server 2 Connection is ok";
else
   echo "Server 2 Connection  is failure";

if($dbMain2)
   echo "Server 1- Connection-2 is ok";
else
   echo "Server 1- Connection-2 failure";
*/
session_start();


 $compcode = 90; //$_POST['compcode'];									
 $finid    = $_POST['finid'];



 $insertcount = 0;


 $queryMain1 = "select * from trn_delivery_note  where dn_comp_code = $compcode and dn_fincode = $finid  and dn_date < CURDATE() and dn_update = 'N'";
 $resultMain1 = mysql_query($queryMain1,$dbMain);





 while ($row = mysql_fetch_assoc($resultMain1)) {

    $dn_comp_code = $row['dn_comp_code'];
    $dn_fincode   = $row['dn_fincode'];
    $dn_no        = $row['dn_no'];
    $dn_date      = $row['dn_date'];

    $dn_custcode  = $row['dn_custcode'];
    $dn_truck     = $row['dn_truck'];
    $dn_sono      = $row['dn_sono'];
    $dn_sodate    = $row['dn_sodate'];
    $dn_size      = $row['dn_size'];
    $dn_sr_no     = $row['dn_sr_no'];
    $dn_wt        = $row['dn_wt'];
    $dn_srno_fincode = $row['dn_srno_fincode'];
    $dn_rate      = $row['dn_rate'];
    $dn_freight   = $row['dn_freight'];
    $dn_vehicle_by   = $row['dn_vehicle_by'];
    $dn_tax       = $row['dn_tax'];
    $dn_pono      = $row['dn_pono'];
    $dn_podate    = $row['dn_podate'];

    $querySub1 = "select count(*) as noofrec  from trn_delivery_note  where dn_comp_code = $compcode and dn_fincode = $finid  and dn_no = $dn_no  and dn_custcode = $dn_custcode and dn_size = $dn_size and dn_sr_no =  $dn_sr_no";
    $resultSub1 = mysql_query($querySub1,$dbSub);
    $rec1    = mysql_fetch_array($resultSub1);
    $noofrec = $rec1['noofrec'];

    if ($noofrec == 0 ) {
	    $querySub2 = "insert into trn_delivery_note (dn_comp_code, dn_fincode, dn_no, dn_date, dn_custcode, dn_truck, dn_sono, dn_sodate, dn_size, dn_sr_no, dn_wt,dn_srno_fincode, dn_rate, dn_freight, dn_vehicle_by, dn_tax, dn_pono, dn_podate,dn_update) VALUES ( '$dn_comp_code','$dn_fincode','$dn_no','$dn_date','$dn_custcode','$dn_truck','$dn_sono', '$dn_sodate','$dn_size', '$dn_sr_no', '$dn_wt','$dn_srno_fincode','$dn_rate','$dn_freight', '$dn_vehicle_by','$dn_tax', '$dn_pono','$dn_podate','Y')";

	    $resultSub2 = mysql_query($querySub2,$dbSub);


//echo $querySub2;
//echo "<br>";


   // $queryMain2 = "update trn_delivery_note set dn_update = 'Y' where dn_comp_code = '$compcode' and dn_fincode = '$finid'  and dn_no = '$dn_no' and dn_custcode = '$dn_custcode' and dn_size = '$dn_size' and dn_date = '$dn_date' and dn_sr_no =  '$dn_sr_no'";

$queryMain2 = "call spsal_upd_dn ($compcode,$finid,$dn_no,$dn_custcode , $dn_size , '$dn_date','$dn_sr_no')";

//echo $queryMain2;
//echo "<br>";

    $resultMain2 = mysql_query($queryMain2,$dbMain2);



//echo $queryMain2;
//echo "<br>";

    $insertcount = $insertcount + 1;
   
    }



  } 
  mysql_free_result($resultMain1);

  mysql_close($dbMain);
  mysql_close($dbSub);



if ($resultSub2 && $resultMain2 && $insertcount > 0 ) {



    mysql_query("COMMIT");

} else {
    mysql_query("ROLLBACK");

}
  

?>
