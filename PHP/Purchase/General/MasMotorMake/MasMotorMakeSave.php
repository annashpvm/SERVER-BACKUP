<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

 $makename=strtoupper($_POST['makename']);

$query = "select ifnull(max(mot_makecode),0)+1 as mot_makecode from mas_motor_make";
$result = mysql_query($query);
$rec = mysql_fetch_array($result);
$makeseq=$rec['mot_makecode'];

$qry = "select count(*) as cnt from mas_motor_make where mot_make = '$makename'";
$resmtr = mysql_query($qry);
$recmake = mysql_fetch_array($resmtr);
$cnt=$recmake['cnt'];

if($cnt==0)
{
  $query1="insert into mas_motor_make values('$makeseq','$makename',0)";
  $result1 = mysql_query($query1);
}

  if ($result1 && $cnt==0) {
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $makename . '"})';
} 
  else if ($cnt>0) {
    mysql_query("ROLLBACK");
    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
}else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $makename . '"})';
}
  
   
?>
