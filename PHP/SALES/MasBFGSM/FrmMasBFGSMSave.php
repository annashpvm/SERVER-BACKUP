<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$grpname = trim(strtoupper($_POST['grpname']));
$grpcode = $_POST['grpcode'];
$gsm     = $_POST['gsm'];
$bf      = $_POST['bf'];

 	     
$query = "select ifnull(max(var_groupcode),0)+1 as itemseq from masprd_variety";
$result = mysqli_query($conn, $query);
$rec = mysqli_fetch_array($result);
$itemseq=$rec['itemseq'];

$qry = "select count(*) as cnt from masprd_variety where trim(var_desc) = '$grpname'";
$resag = mysqli_query($conn, $qry);
$recvar = mysqli_fetch_array($resag);
$cnt=$recvar['cnt'];

mysqli_begin_transaction($conn);
if($cnt==0)
{
  $query1="insert into masprd_variety values('$itemseq','$grpname','$grpcode','$bf','$gsm',0,0,0,0)";

  $result1 = mysqli_query($conn, $query1);
  if ($result1 && $cnt==0) {
    mysqli_commit($conn);
    echo '({"success":"true","msg":"' . $grpname . '"})';
} 
}
  else if ($cnt > 0) {
    mysqli_rollback($conn);


    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
}else {
    mysqli_rollback($conn);


    echo '({"success":"false","msg":"' . $grpname . '"})';
}
 
   
?>
