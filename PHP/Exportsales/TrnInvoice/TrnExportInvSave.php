<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConndpm.php");
session_start();

$griddet = json_decode($_REQUEST['griddet'],true);
$finid = 20;
$compcode = 1;                      
$rowcnt = $_POST['cnt'];
$dtpEntry = $_POST['dtpEntry'];
$sentno = $_POST['sentno'];



$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++)
{
$sno = $i + 1;
$itemcode = $griddet[$i]['itemcode'];
$number   = $griddet[$i]['number'];
$weight   = $griddet[$i]['weight'];
$destag   = $griddet[$i]['destag'];
$hsncode  = $griddet[$i]['hsncode'];
     
$query1= "insert into trnsal_finish_stock values('$compcode','$finid','$sentno','$dtpEntry' ,'$itemcode' ,1,'$number','$weight',0,'$dtpEntry')";
$result1=mysql_query($query1);            
  
}

 


if ($result1) {
   mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $sentno . '"})';
} 
	
}else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $sentno . '"})';
}
  
   
?>
