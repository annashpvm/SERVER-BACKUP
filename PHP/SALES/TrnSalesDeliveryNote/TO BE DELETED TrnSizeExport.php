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


// masprd_type
 $queryMain1 = "select * from masprd_type";
 $stmt = $pdoMain->query($queryMain1);
 while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    $vargrp_type_code     = $row['vargrp_type_code'];
    $vargrp_type_name     = $row['vargrp_type_name'];
    $vargrp_type_short_code = $row['vargrp_type_short_code'];
    $vargrp_type_hsncode  = $row['vargrp_type_hsncode'];
    $tn_sales_ledcode     = $row['tn_sales_ledcode'];
    $os_sales_ledcode     = $row['os_sales_ledcode'];
    $sez_sales_ledcode    = $row['sez_sales_ledcode'];

    $querySub1 = "select count(*) as noofrec  from masprd_type  where vargrp_type_code = $vargrp_type_code";
    $count = $pdoSub->query($querySub1)->fetchColumn();

     if ($count == 0) 
     {
          $insert = $pdoSub->prepare("insert into masprd_type (vargrp_type_code, vargrp_type_name, vargrp_type_short_code, vargrp_type_hsncode, tn_sales_ledcode, os_sales_ledcode, sez_sales_ledcode) values ('$vargrp_type_code', '$vargrp_type_name', '$vargrp_type_short_code', '$vargrp_type_hsncode', '$tn_sales_ledcode', '$os_sales_ledcode', '$sez_sales_ledcode')");

          $insert->bindParam(); 
	  $insert->execute();
	  if ($insert->execute()) {
		$insertcount=$insertcount+1;
	  }
    }  

}



// masprd_type
 $queryMain1 = "select * from masprd_variety";
 $stmt = $pdoMain->query($queryMain1);
 while($row = $stmt->fetch(PDO::FETCH_ASSOC)){


    $var_groupcode = $row['var_groupcode'];
    $var_desc      = $row['var_desc'];
    $var_typecode  = $row['var_typecode'];
    $var_bf        = $row['var_bf'];
    $var_gsm       = $row['var_gsm'];


    $querySub1 = "select count(*) as noofrec  from masprd_variety  where var_groupcode = $var_groupcode";
    $count = $pdoSub->query($querySub1)->fetchColumn();

     if ($count == 0) 
     {
          $insert = $pdoSub->prepare("insert into masprd_variety (var_groupcode, var_desc, var_typecode, var_bf, var_gsm ) values ('$var_groupcode', '$var_desc', '$var_typecode', '$var_bf', '$var_gsm')");

          $insert->bindParam(); 
	  $insert->execute();
	  if ($insert->execute()) {
		$insertcount=$insertcount+1;
	  }
    }  

}

// massal_variety
 $queryMain1 = "select * from massal_variety";
 $stmt = $pdoMain->query($queryMain1);
 while($row = $stmt->fetch(PDO::FETCH_ASSOC)){

    $var_code    = $row['var_code'];
    $var_name    = $row['var_name'];
    $var_grpcode = $row['var_grpcode'];
    $var_unit    = $row['var_unit'];
    $var_size1   = $row['var_size1'];
    $var_size2   = $row['var_size2'];
    $var_reams   = $row['var_reams'];
    $var_sheets  = $row['var_sheets'];
    $var_tariffno = $row['var_tariffno'];
    $var_shade    = $row['var_shade'];
    $var_inchcm   = $row['var_inchcm'];

    $querySub1 = "select count(*) as noofrec  from massal_variety  where var_code = $var_code";
    $count = $pdoSub->query($querySub1)->fetchColumn();

     if ($count == 0) 
     {
          $insert = $pdoSub->prepare("insert into massal_variety (var_code, var_name, var_grpcode, var_unit, var_size1, var_size2, var_reams, var_sheets, var_tariffno, var_shade, var_inchcm ) values ('$var_code', '$var_name', '$var_grpcode', '$var_unit', '$var_size1 ', '$var_size2', '$var_reams', '$var_sheets', '$var_tariffno', '$var_shade', '$var_inchcm')");

          $insert->bindParam(); 
	  $insert->execute();
	  if ($insert->execute()) {
		$insertcount=$insertcount+1;
	  }
    }  

}



// massal_repr
 $queryMain1 = "select * from massal_repr";
 $stmt = $pdoMain->query($queryMain1);
 while($row = $stmt->fetch(PDO::FETCH_ASSOC)){


    $repr_code   = $row['repr_code'];
    $repr_name   = $row['repr_name'];
    $repr_mobile = $row['repr_mobile'];
    $repr_addr1  = $row['repr_addr1'];
    $repr_addr2  = $row['repr_addr2'];
    $repr_addr3  = $row['repr_addr3'];
    $repr_pincode = $row['repr_pincode'];
    $repr_active  = $row['repr_active'];

	
    $querySub1 = "select count(*) as noofrec  from massal_repr  where repr_code = $repr_code";
    $count = $pdoSub->query($querySub1)->fetchColumn();

     if ($count == 0) 
     {
          $insert = $pdoSub->prepare("insert into massal_repr (repr_code, repr_name, repr_mobile, repr_addr1, repr_addr2, repr_addr3, repr_pincode, repr_accgrp, repr_active ) values ($repr_code', '$repr_name', '$repr_mobile', '$repr_addr1', '$repr_addr2', '$repr_addr3', '$repr_pincode', '$repr_accgrp', '$repr_active')");

          $insert->bindParam(); 
	  $insert->execute();
	  if ($insert->execute()) {
		$insertcount=$insertcount+1;
	  }
    }  

}





if ( $insertcount > 0  ) {
    mysql_query("COMMIT");

} else {
    mysql_query("ROLLBACK");
}


?>
