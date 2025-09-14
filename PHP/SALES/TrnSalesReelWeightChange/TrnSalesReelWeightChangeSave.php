<?php

 require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();

$compcode   = $_POST['compcode'];
$finid      = $_POST['fincode'];
$entno      = $_POST['entno'];
$entdate    = $_POST['entdate'];

$reelno     = $_POST['reelno'];
$reelyear   = $_POST['reelyear'];
$oldwt      = (float) $_POST['oldwt'];
$newwt      = (float) $_POST['newwt'];
$oldsono    = (int) $_POST['oldsono'];
$newsono    = (int) $_POST['newsono'];
$oldsize    = (int) $_POST['oldsize'];
$newsize    = (int) $_POST['newsize'];

$oldRollNo  = (int) $_POST['oldRollNo'];
$newRollNo  = (int) $_POST['newRollNo'];
$newreelno  = (float) $_POST['newreelno'];
$reasontype = $_POST['reasontype'];

$reason     = $_POST['reason'];
$reason     = substr(strtoupper($_POST['reason']),0,59);

if ($newwt == 0)
{$newwt = $oldwt;}


if ($newsono == 0)
{$newsono = $oldsono;}

if ($newsize == 0)
{$newsize = $oldsize;}

if ($newRollNo == 0)
{$newRollNo = $oldRollNo;}



mysql_query("BEGIN");


   $query1 = "select IFNULL(max(ent_no),0)+1 as entno from trnsal_reelweight_change where  comp_code ='$compcode' and fin_code ='$finid'";
   $result1= mysql_query($query1);
   $rec1 = mysql_fetch_array($result1);
   $docno=$rec1['entno'];



   $query2  = "insert into trnsal_reelweight_change values('$compcode','$finid','$entno','$entdate', '$reelno','$oldwt', '$newwt', '$oldsono', '$newsono' ,'$oldsize' , '$newsize','$oldRollNo', '$newRollNo', '$newreelno', '$reason' ,'$reasontype')";
   $result2 = mysql_query($query2);   

//echo $query2;  

   $query3  = "update trnsal_finish_stock set stk_sono = '$newsono' , stk_var_code = '$newsize', stk_wt = '$newwt' where  stk_comp_code =  '$compcode' and  stk_sr_no ='$reelno' and stk_destag = ''"; 

//echo $query3;

   $result3 = mysql_query($query3);  


   $query4  = "update trnsal_order_trailer set ordt_qty  = ordt_qty  - ($oldwt/1000) , ordt_fin_wt  = ordt_fin_wt  - ($oldwt/1000) where ordt_comp_code = '$compcode'  and ordt_sono =  $oldsono and ordt_var_code = $oldsize"; 

//echo $query4;
   $result4 = mysql_query($query4); 

   $query5  = "update trnsal_order_trailer set ordt_qty  = ordt_qty  + ($newwt/1000) ,  ordt_fin_wt  = ordt_fin_wt  + ($newwt/1000)   where ordt_comp_code = '$compcode'  and ordt_sono =  $newsono and ordt_var_code = $newsize"; 

//echo $query5;
   $result5 = mysql_query($query5); 



if ($newreelno > 0)
{
   $query3  = "update trnsal_finish_stock set stk_rollno = '$newRollNo' , stk_sr_no = '$newreelno'  where  stk_comp_code =  '$compcode' and  stk_sr_no ='$reelno' and stk_destag = ''"; 
   $result3 = mysql_query($query3);  
} 


	if($result2 && $result3)
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
