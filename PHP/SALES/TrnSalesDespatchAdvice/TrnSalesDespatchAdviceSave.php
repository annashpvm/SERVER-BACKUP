<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$griddet  = json_decode($_REQUEST['griddet'],true);

$savetype = $_POST['savetype'];     
$dano     = $_POST['dano'];     
$finid    = $_POST['finid'];
$compcode = $_POST['compcode'];                      
$dadate   = $_POST['dadate'];
$rowcnt   = $_POST['cnt'];
//$compcode = $_POST['compcode'];
//$finid = $_POST['finid'];

if ($savetype == "Add") {
 $query2 = "select IFNULL(max(da_no),0)+1 as da_no from trnsal_desp_advice where da_fincode = $finid and da_comp_code='$compcode'";
 $result2= mysql_query($query2);
 $rec2 = mysql_fetch_array($result2);
 $dano=$rec2['da_no'];
}
else
{
   $query2 = "delete from trnsal_desp_advice where da_no = $dano  and da_fincode  = $finid and da_comp_code = $compcode";
   $result2=mysql_query($query2); 
}

$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++)
{
$sno = $i + 1;
$customer = $griddet[$i]['customer'];
$orderno  = $griddet[$i]['orderno'];
$orddate  = $griddet[$i]['orddate'];
$itemname = $griddet[$i]['itemname'];
$ordqty   = $griddet[$i]['ordqty'];
$pendqty  = $griddet[$i]['pendqty'];
$advqty   = $griddet[$i]['advqty'];
$despqty  = $griddet[$i]['despqty'];
$despdate = $griddet[$i]['despdate'];
$unitrate = $griddet[$i]['unitrate'];
$remarks  = $griddet[$i]['remarks'];
$custcode = $griddet[$i]['custcode'];
$itemcode = $griddet[$i]['itemcode'];
$oldqty   = (float)$griddet[$i]['oldqty'];

$query1= "insert into trnsal_desp_advice values('$compcode','$finid','$dano','$dadate' ,'$custcode' ,'$orderno','$orddate','$itemcode','$advqty','0','$unitrate','$remarks','$despdate',null,1,'','','','$sno',0,0)";

$result1=mysql_query($query1);        
    
//$query3= "update trnsal_order_trailer set ordt_adv_qty = ordt_adv_qty + $advqty - $oldqty ,ordt_adv_tag = 'T' where ordt_comp_code = '$compcode'  and ordt_fincode ='$finid' and ordt_sono  = $orderno and ordt_var_code = '$itemcode'";

//$result3=mysql_query($query3);        

  
}

 
if ($savetype == "Add") {
	if ($result1 ) {
	   mysql_query("COMMIT");
	    echo '({"success":"true","dano":"' . $dano . '"})';
	} 
	
	else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","dano":"' . $dano . '"})';
	}
}
else
{
	if ($result1  && $result2  ) {
	   mysql_query("COMMIT");
	    echo '({"success":"true","dano":"' . $dano . '"})';
	} 
	
	else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","dano":"' . $dano . '"})';
	}
}
  
   
?>
