<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");


session_start();

$griddet  = json_decode($_REQUEST['griddet'],true);
$savetype = $_POST['savetype'];           
$rowcnt   = $_POST['cnt'];
$repcode  = $_POST['repcode'];           
$repmonth = $_POST['repmonth'];           
$repyear  = $_POST['repyear'];           


for ($i=0;$i<$rowcnt;$i++)
{
	$custcode  = (int)$griddet[$i]['cust_code'];
	$grade     = $griddet[$i]['cust_grade'];
	$crdays    = (int)$griddet[$i]['cust_cr_days'];
	$target    = (float)$griddet[$i]['cust_desp_target'];
	$visits    = (int)$griddet[$i]['cust_noof_visits'];
	$payperf   = (float)$griddet[$i]['cust_payperf'];

        $query1   =  "call spsal_Target_Update('$custcode','$grade','$target','$crdays','$payperf' ,'$visits','$repmonth','$repyear');";

//	$query1= "update massal_customer set cust_cr_days = $crdays ,cust_desp_target = $target , cust_noof_visits = $visits ,cust_payperf = '$payperf' where cust_code = '$custcode'";

	$result1=mysql_query($query1);            
}


if ($result1) {

   mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $maadvno . '"})';
	
}else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $maadvno . '"})';
}
  
   
?>
