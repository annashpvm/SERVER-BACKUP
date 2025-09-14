<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$taxname        = $_POST['taxname'];
$taxshortname   = $_POST['taxshortname'];
$taxsalled_code = (int)$_POST['taxsalled_code'];
$taxsgst_ledcode= (int)$_POST['taxsgst_ledcode'];
$taxcgst_ledcode= (int)$_POST['taxcgst_ledcode'];
$taxigst_ledcode= (int)$_POST['taxigst_ledcode'];
$taxsgst        = (float)$_POST['taxsgst'];
$taxcgst        = (float)$_POST['taxcgst'];
$taxigst        = (float)$_POST['taxigst'];
$taxtype        = (int)$_POST['taxtype'];


$query  = "select ifnull(max(tax_code),0)+1 as taxseq from massal_tax";
$result = mysql_query($query);
$rec    = mysql_fetch_array($result);
$taxseq = $rec['taxseq'];


$qry = "select count(*) as cnt from massal_tax where tax_name = '$taxname'";
$res  = mysql_query($qry);
$recvar = mysql_fetch_array($res);
$cnt=$recvar['cnt'];

if($cnt==0)
{
  $query1="insert into massal_tax values($taxseq,upper('$taxname'),upper('$taxshortname'),'$taxsalled_code','$taxsgst_ledcode','$taxcgst_ledcode', '$taxigst_ledcode','$taxsgst','$taxcgst','$taxigst','$taxtype')"; 


  $result1 = mysql_query($query1);
}

  if ($result1 && $cnt==0) {
   mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $taxname . '"})';
} 
  else if ($cnt>0) {
    mysql_query("ROLLBACK");
    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
}else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $taxname . '"})';
}
 
   
?>
