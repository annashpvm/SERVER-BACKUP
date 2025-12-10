<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

 $loadingArea= strtoupper($_POST['loadingArea']);

$query = "select ifnull(max(area_code),0)+1 as areaseq from mas_area";
$result = mysqli_query($conn, $query);
$rec = mysqli_fetch_array($result);
$areaseq=$rec['areaseq'];

$qry = "select count(*) as cnt from mas_area where area_name = '$loadingArea'";
$res = mysqli_query($conn, $qry);
$reclot = mysqli_fetch_array($res);
$cnt=$reclot['cnt'];

if($cnt==0)
{
  $query1="insert into mas_area values('$areaseq','$loadingArea','1',0)";
  $result1 = mysqli_query($conn, $query1);
//echo $query1;

}

  if ($result1 && $cnt==0) {
    mysqli_begin_transaction($conn);
    echo '({"success":"true","msg":"' . $loadingArea . '"})';
} 
  else if ($cnt>0) {
    mysqli_rollback($conn);


    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
}else {
    mysqli_rollback($conn);


    echo '({"success":"false","msg":"' . $loadingArea . '"})';
}
  
   
?>
