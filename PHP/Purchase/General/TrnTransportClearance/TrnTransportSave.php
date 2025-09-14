<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();
$griddet = json_decode($_POST['griddet'],true);
$finid =$_POST['finid'];
$rowcnt = $_POST['cnt'];
$compcode =$_POST['compcode'];
$transdate =$_POST['transdate'];
$grnparty =$_POST['partyname'];
$item =$_POST['itemname'];
$qty = $_POST['qty'];
$unit = $_POST['unit'];
$area = $_POST['area'];
$savetype = $_POST['savetype'];
$clrno = $_POST['docno'];

 if ($savetype == "Add") 
 {
    $query2 = "select IFNULL(max(t_clr_no),0)+1 as clrno from trnpur_trans_clearance where t_clr_finyear = $finid and t_clr_company='$compcode'";
    $result2= mysql_query($query2);
    $rec2 = mysql_fetch_array($result2);
    $clrno=$rec2['clrno'];
 }
 else
 {
    $query2 = "delete from trnpur_trans_clearance where t_clr_finyear = $finid and t_clr_company='$compcode' and t_clr_no = $clrno ";
    $result2= mysql_query($query2);

 } 

 mysql_query("BEGIN");

 //if ($clrno > 0  && $finid > 0 && $compcode>0)
 //{ 
 
//$rowcnt = 2;
for($i=0;$i<$rowcnt;$i++)
{

$sno       = $griddet[$i]['slno'];
$transcode = $griddet[$i]['transcode'];
$lrno      = $griddet[$i]['lrno'];
$lrdate    = $griddet[$i]['lrdate'];
$lrfreight = $griddet[$i]['lrfreight'];
$demurrage = $griddet[$i]['demurrage'];
$coolie    = $griddet[$i]['loading'];
$others    = $griddet[$i]['others'];
$itcyn     = $griddet[$i]['revtax'];
$cgst      = $griddet[$i]['cgst'];
$sgst      = $griddet[$i]['sgst'];
$igst      = $griddet[$i]['igst'];
$paymade   = $griddet[$i]['paymade'];
$freight = 0;
 $query4= "insert into trnpur_trans_clearance values('$compcode','$finid','$clrno','$transdate','$grnparty','$item','$qty','$unit','$sno','$transcode','$area','$lrno','$lrdate','$lrfreight','$freight','$demurrage','$coolie','$others','0','0','N','$itcyn','$cgst','$sgst','$igst','$paymade','',0,0)";
 $result4=mysql_query($query4);            
  
}

//} 
        
if($result4)
{
  mysql_query("COMMIT");                        
  echo '({"success":"true","docno":"'.$clrno.'"})';
}
else
       {
echo '({"success":"false","docno":"'.$clrno.'"})';
	   


            mysql_query("ROLLBACK");            
            
        }   
        

       
 
?>
