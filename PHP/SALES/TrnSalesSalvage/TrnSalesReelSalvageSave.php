<?php

 require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();

$griddet     = json_decode($_REQUEST['griddet'],true);
$rowcnt      = $_POST['cnt'];
$compcode    = $_POST['compcode'];     
$fincode     = $_POST['fincode'];    
$entno       = $_POST['entno'];
$entdate     = $_POST['entdate'];

$oldsizecode = $_POST['oldsizecode'];
$oldsono     = $_POST['oldsono'];
$mainreelno  = $_POST['oldreelno'];
$oldwt       = $_POST['oldwt'];
$oldrollno   = (int)$_POST['oldrollno'];
$oldyymm     = (int)$_POST['oldyymm'];


mysql_query("BEGIN");

   $query1 = "select IFNULL(max(ent_no),0)+1 as entno from trnsal_salvage where  comp_code ='$compcode' and fin_code ='$finid'";
   $result1= mysql_query($query1);
   $rec1 = mysql_fetch_array($result1);
   $docno=$rec1['entno'];



$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++)
{
	$sno = $i + 1;
	$variery    = $griddet[$i]['variery'];
	$size       = $griddet[$i]['size'];
	$newsizecode= $griddet[$i]['sizecode'];
	$newsono    = $griddet[$i]['sono'];
	$newreelno  = $griddet[$i]['newreelno'];
	$newwt      = $griddet[$i]['newwt'];

        $query1 = "insert into trnsal_salvage values('$compcode','$fincode','$entno','$entdate','$mainreelno', '$oldwt','$oldsono','$oldsizecode ','$newreelno','$newwt','$newsono','$newsizecode')";
	$result1=mysql_query($query1);            




	$query2= "insert into trnsal_finish_stock  (stk_comp_code,stk_finyear,stk_ent_no,stk_ent_date,stk_var_code,stk_sr_no,stk_wt,stk_sono,stk_source,stk_yymm,stk_rollno,stk_shift) VALUES ('$compcode','$fincode','100','$entdate','$newsizecode','$newreelno','$newwt',$newsono,'S',$oldyymm,$oldrollno,'A')";
	$result2=mysql_query($query2);


  
}


$query3  = "update trnsal_finish_stock set stk_destag = 'S' ,stk_slipno = '$entno' , stk_desdt = '$entdate'  where  stk_comp_code =  '$compcode' and  stk_sr_no ='$mainreelno' and stk_destag = '' and stk_finyear >=21"; 
$result3 = mysql_query($query3);    

//echo $query3;

if($result1 && $result2 && $result3)
{
  mysql_query("COMMIT");                        
  echo '({"success":"true","entno":"'.$entno.'"})';
}
else
{
	echo '({"success":"false","entno":"'.$entno.'"})';
	mysql_query("ROLLBACK");            
	    
} 

       
 
?>
