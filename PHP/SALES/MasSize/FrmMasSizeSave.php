<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$savetype   = $_POST['savetype'];
$vunit      = (int) $_POST['vunit'];
$length     = (float) $_POST['length'];
$breadth     = (float) $_POST['breadth'];
$sizecode   = $_POST['sizecode'];
$vargrpcode = $_POST['vargrpcode'];
$hsn        = $_POST['hsncode'];
$sizetype   = $_POST['sizetype'];
$shade      = $_POST['shade'];
$itemseq    = $_POST['seqno'];
$reams      = (int)$_POST['reams'];
$sheets     = (int) $_POST['sheets'];

$gsm=0;

if ($savetype == "New")
{
	$query = "select ifnull(max(var_code),0)+1 as itemseq from massal_variety";
	$result = mysql_query($query);
	$rec = mysql_fetch_array($result);
	$itemseq=$rec['itemseq'];


	$qry = "select count(*) as cnt from massal_variety where var_name = '$sizecode'";
	$resag = mysql_query($qry);
	$recvar = mysql_fetch_array($resag);
	$cnt=$recvar['cnt'];

	if($cnt==0)
	{
	$query1="insert into massal_variety values($itemseq,'$sizecode','$vargrpcode', '$vunit','$length','$breadth','$reams','$sheets', '$hsn' ,'$shade' ,'$sizetype')";
	  $result1 = mysql_query($query1);
	}
}
else
{
   $cnt = 0;
   $query1="update massal_variety set var_size1 = '$length',var_size2 = '$breadth',  var_name = '$sizecode' , var_shade = '$shade' ,  var_inchcm = '$sizetype' , var_tariffno = '$hsn'  where var_code = '$itemseq'";
   $result1 = mysql_query($query1);
}


  if ($result1 && $cnt==0) {
   mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $sizecode . '"})';
} 
  else if ($cnt>0) {
    mysql_query("ROLLBACK");
    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
}else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $sizecode . '"})';
}
  
   
?>
