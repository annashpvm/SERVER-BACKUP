<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

 $lotremarks=strtoupper($_POST['lotremarks']);
 $lotno=$_POST['lotno'];

$query = "select ifnull(max(lot_code),0)+1 as lotseq from mas_lot";
$result = mysqli_query($conn, $query);
$rec = mysqli_fetch_array($result);
$lotseq=$rec['lotseq'];

$qry = "select count(*) as cnt from mas_lot where lot_refno = '$lotno'";
$res = mysqli_query($conn, $qry);
$reclot = mysqli_fetch_array($res);
$cnt=$reclot['cnt'];

if($cnt==0)
{
  $query1="insert into mas_lot values('$lotseq','$lotno','$lotremarks')";
  $result1 = mysqli_query($conn, $query1);
}

  if ($result1 && $cnt==0) {
    mysqli_begin_transaction($conn);
    echo '({"success":"true","msg":"' . $lotno . '"})';
} 
  else if ($cnt>0) {
    mysqli_rollback($conn);


    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
}else {
    mysqli_rollback($conn);


    echo '({"success":"false","msg":"' . $lotno . '"})';
}
  
   
?>
