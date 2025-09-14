<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

 $lotremarks=strtoupper($_POST['lotremarks']);
 $lotno=$_POST['lotno'];

$query = "select ifnull(max(lot_code),0)+1 as lotseq from mas_lot";
$result = mysql_query($query);
$rec = mysql_fetch_array($result);
$lotseq=$rec['lotseq'];

$qry = "select count(*) as cnt from mas_lot where lot_refno = '$lotno'";
$res = mysql_query($qry);
$reclot = mysql_fetch_array($res);
$cnt=$reclot['cnt'];

if($cnt==0)
{
  $query1="insert into mas_lot values('$lotseq','$lotno','$lotremarks')";
  $result1 = mysql_query($query1);
}

  if ($result1 && $cnt==0) {
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $lotno . '"})';
} 
  else if ($cnt>0) {
    mysql_query("ROLLBACK");
    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
}else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $lotno . '"})';
}
  
   
?>
