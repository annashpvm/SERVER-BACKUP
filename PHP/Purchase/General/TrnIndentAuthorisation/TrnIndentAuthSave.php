<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt  = $_POST['cnt'];

$ind_comp_code = $_POST['ind_comp_code'];

for ($i=0;$i<$rowcnt;$i++)
{
     $sno = $i + 1;
     $ind_fin_code  = $griddet[$i]['ind_fin_code'];
     $Indent        = $griddet[$i]['Indent'];
     $ind_item_code = $griddet[$i]['ind_item_code'];
     $flagtype      = $griddet[$i]['ApproveYN'];
     if($flagtype == 'Y')
     {
	$query1="call sppur_indent_authorization('$ind_comp_code','$ind_fin_code','$Indent','$ind_item_code')";
        $result1 = mysql_query($query1);
     }
}
 
  if ($result1) 
{
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $Indent . '"})';
} 
else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $Indent . '"})';
}
  
   
?>
