<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

$servernameMain = "10.0.0.251";
$databaseMain   = "shvpm";

$servernameSub = "10.0.0.150";
$databasesub = "shvpmb";

$username = "root";
$password = "P@ssw0rD";

mysql_query("BEGIN");

try{
   $pdoMain = new PDO('mysql:host=10.0.0.251;dbname=shvpm','root','P@ssw0rD');

}catch(PDOException $error){

    echo $error->getmessage();
}

try{
   $pdoSub = new PDO('mysql:host=10.0.0.150;dbname=shvpmb','root','P@ssw0rD');

}catch(PDOException $error){

    echo $error->getmessage();
}




 $compcode = $_POST['compcode'];									
 $finid    = $_POST['finid'];


$insertcount = 0;
$updatecount = 0;
$deletecount = 0;

 $queryMain1 = "select * from trn_delivery_note  where dn_comp_code = $compcode and dn_fincode = $finid  and dn_date < CURDATE() and dn_update = 'N'";

// $queryMain1 = "select * from trn_delivery_note  where dn_comp_code = $compcode and dn_fincode = $finid  and dn_date < CURDATE() - INTERVAL 1 DAY and dn_update = 'N'";

 $stmt = $pdoMain->query($queryMain1);
 while($row = $stmt->fetch(PDO::FETCH_ASSOC)){

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
     $count = $pdoSub->query($querySub1)->fetchColumn();

     if ($count == 0) 
     {
          $insert = $pdoSub->prepare("insert into trn_delivery_note (dn_comp_code, dn_fincode, dn_no, dn_date, dn_custcode, dn_truck, dn_sono, dn_sodate, dn_size, dn_sr_no, dn_wt,dn_srno_fincode, dn_rate, dn_freight, dn_vehicle_by, dn_tax, dn_pono, dn_podate,dn_update) VALUES ( '$dn_comp_code','$dn_fincode','$dn_no','$dn_date','$dn_custcode','$dn_truck','$dn_sono', '$dn_sodate','$dn_size', '$dn_sr_no', '$dn_wt','$dn_srno_fincode','$dn_rate','$dn_freight', '$dn_vehicle_by','$dn_tax', '$dn_pono','$dn_podate','Y')");

          $insert->bindParam(); 
	  $insert->execute();
	  if ($insert->execute()) {
		$insertcount=$insertcount+1;
	  }

          $insert = $pdoMain->prepare("insert into TOBEDELETEDtrn_delivery_note (dn_comp_code, dn_fincode, dn_no, dn_date, dn_custcode, dn_truck, dn_sono, dn_sodate, dn_size, dn_sr_no, dn_wt,dn_srno_fincode, dn_rate, dn_freight, dn_vehicle_by, dn_tax, dn_pono, dn_podate,dn_update) VALUES ( '$dn_comp_code','$dn_fincode','$dn_no','$dn_date','$dn_custcode','$dn_truck','$dn_sono', '$dn_sodate','$dn_size', '$dn_sr_no', '$dn_wt','$dn_srno_fincode','$dn_rate','$dn_freight', '$dn_vehicle_by','$dn_tax', '$dn_pono','$dn_podate','Y')");

          $insert->bindParam(); 
	  $insert->execute();
	  if ($insert->execute()) {
		$insertcount=$insertcount+1;
	  }

    $queryMain2 = "update trn_delivery_note set dn_update = 'Y' where dn_comp_code = '$compcode' and dn_fincode = '$finid'  and dn_no = '$dn_no' and dn_custcode = '$dn_custcode' and dn_size = '$dn_size' and dn_date = '$dn_date' and dn_sr_no =  '$dn_sr_no'";

          $update = $pdoMain->prepare($queryMain2);
          $update->bindParam(); 
	  if ($update->execute()) {
	     $updatecount=$updatecount+1;
	  }


    }  

}


// for deleting records from Main 

 $queryMain1 = "select * from trn_delivery_note  where dn_comp_code = $compcode and dn_fincode = $finid";
 $stmt = $pdoMain->query($queryMain1);
 while($row = $stmt->fetch(PDO::FETCH_ASSOC)){

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
     $count = $pdoSub->query($querySub1)->fetchColumn();

     if ($count > 0) 
     {


    $queryMain2 = "delete from trn_delivery_note where dn_comp_code = '$compcode' and dn_fincode = '$finid'  and dn_no = '$dn_no' and dn_custcode = '$dn_custcode' and dn_size = '$dn_size' and dn_date = '$dn_date' and dn_sr_no =  '$dn_sr_no'";

          $delete = $pdoMain->prepare($queryMain2);
          $delete->bindParam(); 
	  if ($delete->execute()) {
	     $deletecount=$deletecount+1;
	  }

      }

}



if ( ($insertcount > 0 && $updatecount > 0 ) || $deletecount > 0  ) {
    mysql_query("COMMIT");

} else {
    mysql_query("ROLLBACK");
}


?>
