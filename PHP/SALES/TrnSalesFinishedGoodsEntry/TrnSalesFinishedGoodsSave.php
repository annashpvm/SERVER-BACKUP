<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();


$griddet = json_decode($_REQUEST['griddet'],true);
$savetype = $_POST['savetype'];                 
$finid = $_POST['finid'];
$compcode = $_POST['compcode'];                     
$rowcnt = $_POST['cnt'];
$entryno = $_POST['entryno'];
$entrydate = $_POST['entrydate'];




mysql_query("BEGIN");

if ($savetype == "Add") 
  {
   $query1 = "select ifnull(max(stk_ent_no),0)+1 as sentno from trnsal_finish_stock where stk_finyear= $finid and stk_comp_code= $compcode";
   $result1= mysql_query($query1);

   $rec2 = mysql_fetch_array($result1);
   $entryno=$rec2['sentno'];
  }

else
{
    $query1 = "delete from trnsal_finish_stock where stk_ent_no = '$entryno' and stk_destag <> 'T' and stk_deltag <> 'T' and stk_comp_code = $compcode 
and stk_finyear =  $finid ";
    $result1=mysql_query($query1);            
}
//$inscnt = 5;
for ($i=0;$i<$rowcnt;$i++)
{
$sno = $i + 1;
$itemcode = $griddet[$i]['itemcode'];
$number   = $griddet[$i]['number'];
$weight   = (float)$griddet[$i]['weight'];
$destag   = $griddet[$i]['destag'];
$sono     = (int)$griddet[$i]['sono'];
$yymm     = (int)$griddet[$i]['yymm'];
$rollno   = (int)$griddet[$i]['rollno'];

//$unit     = $griddet[$i]['unit'];
$unit     = 1;

//$query2= "insert into trnsal_finish_stock VALUES ('$compcode','$finid','$entryno','$entrydate','$itemcode','$number','$weight',
//0,0,'',0,0,'','',0,'0','')";

$query2= "insert into trnsal_finish_stock  (stk_comp_code,stk_finyear,stk_ent_no,stk_ent_date,stk_var_code,stk_sr_no,stk_wt,stk_sono,stk_yymm,stk_rollno,stk_source) VALUES ('$compcode','$finid','$entryno','$entrydate','$itemcode','$number','$weight',$sono,$yymm,$rollno,'R')";
$result2=mysql_query($query2);            
  
}

 


if ($result1 && $result2) {
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $entryno . '"})';
} 
	
else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $entryno . '"})';
}
  
   
?>
