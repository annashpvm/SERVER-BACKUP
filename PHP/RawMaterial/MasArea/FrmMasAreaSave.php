<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

 $loadingArea= strtoupper($_POST['loadingArea']);

$query = "select ifnull(max(area_code),0)+1 as areaseq from mas_area";
$result = mysql_query($query);
$rec = mysql_fetch_array($result);
$areaseq=$rec['areaseq'];

$qry = "select count(*) as cnt from mas_area where area_name = '$loadingArea'";
$res = mysql_query($qry);
$reclot = mysql_fetch_array($res);
$cnt=$reclot['cnt'];

if($cnt==0)
{
  $query1="insert into mas_area values('$areaseq','$loadingArea','1')";
  $result1 = mysql_query($query1);
echo $query1;

}

  if ($result1 && $cnt==0) {
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $loadingArea . '"})';
} 
  else if ($cnt>0) {
    mysql_query("ROLLBACK");
    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
}else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $loadingArea . '"})';
}
  
   
?>
