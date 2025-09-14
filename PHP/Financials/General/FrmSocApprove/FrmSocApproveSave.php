<?php
 require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_REQUEST['cnt'];

$compcode = $_REQUEST['compcode'];
$finid = $_REQUEST['finid'];
 
 for ($i=0;$i<$rowcnt;$i++){
 
 	$size_code = $griddet[$i]['size_code'];
	$socno = $griddet[$i]['socno'];
	$qc_dev = $griddet[$i]['qc_dev'];

 	$socupdqry = "update trnsal_order_trailer set ordt_qcdev_yn = '$qc_dev' , ordt_approved = 'Y'  where  ordt_fincode = $finid  and ordt_comp_code = $compcode   and ordt_var_code =  '$size_code'  and ordt_ackno = '$socno'";
 	$ressocupdqry = mysql_query($socupdqry);
 }


  
	if ($ressocupdqry ){
		mysql_query("COMMIT");                        
		echo '({"success":"true","socno":"' . $socno . '"})';
	}
	else {
	    mysql_query("ROLLBACK");            
	    echo '({"success":"false","socno":"' . $socno . '"})';
	} 
?>
