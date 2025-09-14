<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$savetype    = $_POST['savetype']; 
$custcode    = $_POST['custcode']; 
$vartypecode = $_POST['vartypecode'];  
$ratetype    = $_POST['ratetype'];  

$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_POST['cnt'];

$bf14        = 0;  
$bf16        = 0;    
$bf18        = 0; 		
$bf20        = 0; 
$bf22        = 0;  
$bf24        = 0; 
$bf26        = 0; 
$bf28        = 0;		
$bf30        = 0;
$bf32        = 0;
$rate        = (float) $_POST['rate'];;
$bitreelrate = (float) $_POST['bitreelrate'];
 

$gsmfrom1    = (int) $_POST['gsmfrom1'];  
$gsmto1      = (int) $_POST['gsmto1'];    
$gsmfrom2    = (int) $_POST['gsmfrom2'];  
$gsmto2      = (int) $_POST['gsmto2'];  
$gsmfrom3    = (int) $_POST['gsmfrom3'];  
$gsmto3      = (int) $_POST['gsmto3'];  
$gsmfrom4    = (int) $_POST['gsmfrom4'];  
$gsmto4      = (int) $_POST['gsmto4'];  

$rate2_examt =  (float)  $_POST['rate2_examt'];  
$rate3_examt =  (float) $_POST['rate3_examt'];    
$rate4_examt =  (float) $_POST['rate4_examt']; 		

$othershades = $_POST['othershades']; 
$GSTper      =  (float)$_POST['GSTper'];  
$creditdays  = (int) $_POST['creditdays']; 
$cashdiscdays= (int) $_POST['cashdiscdays']; 
$cashdiscper =  (float)$_POST['cashdiscper']; 		

$apprno      = $_POST['apprno']; 
$apprdate    = $_POST['apprdate']; 
$wefdate    = $_POST['wefdate']; 
$finid       = $_POST['finid'];
$compcode    = $_POST['compcode'];  
                    
$cdamt1    = (float) $_POST['cdamt1'];  
$cdamt2    = (float) $_POST['cdamt2'];  
$cdamt3    = (float) $_POST['cdamt3'];  

$userid  = (int) $_POST['userid']; 

$bf14bit      = 0;
$bf16bit      = 0;    
$bf18bit      = 0;		
$bf20bit      = 0;
$bf22bit      = 0; 
$bf24bit      = 0;
$bf26bit      = 0;
$bf28bit      = 0;		
$bf30bit      = 0;
$bf32bit      = 0;


mysql_query("BEGIN");


if ($savetype == "Add") {

$query = "select ifnull(max(rate_code),0)+1 as itemseq from  massal_rate where rate_comp_code = '$compcode' and rate_fincode='$finid'";
$result = mysql_query($query);
$rec = mysql_fetch_array($result);
$itemseq=$rec['itemseq'];
}
else
{

$itemseq = $apprno;
$query1= "delete from  massal_rate where rate_comp_code = '$compcode' and rate_fincode='$finid' and rate_code = $itemseq";
$result1 = mysql_query($query1);



}

$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++)
{
       if ($griddet[$i]['reel'] == 'Full')
       {
		$bf14        = (float) $griddet[$i]['bf14'];  
		$bf16        = (float) $griddet[$i]['bf16'];   
		$bf18        = (float) $griddet[$i]['bf18'];
		$bf20        = (float) $griddet[$i]['bf20'];
		$bf22        = (float) $griddet[$i]['bf22'];
		$bf24        = (float) $griddet[$i]['bf24'];
		$bf26        = (float) $griddet[$i]['bf26'];
		$bf28        = (float) $griddet[$i]['bf28'];
		$bf30        = (float) $griddet[$i]['bf30'];
       }
       else
      {
		$bf14bit        = (float) $griddet[$i]['bf14'];  
		$bf16bit        = (float) $griddet[$i]['bf16'];   
		$bf18bit        = (float) $griddet[$i]['bf18'];
		$bf20bit        = (float) $griddet[$i]['bf20'];
		$bf22bit        = (float) $griddet[$i]['bf22'];
		$bf24bit        = (float) $griddet[$i]['bf24'];
		$bf26bit        = (float) $griddet[$i]['bf26'];
		$bf28bit        = (float) $griddet[$i]['bf28'];
		$bf30bit        = (float) $griddet[$i]['bf30'];
       } 
}

$query1="insert into massal_rate values  ('$compcode','$finid','$itemseq','$ratetype','$apprdate','$wefdate','$custcode','$vartypecode','$bf14', '$bf16','$bf18','$bf20','$bf22','$bf24','$bf26','$bf28','$bf30','$bf32','$rate','$bitreelrate', '$gsmfrom1','$gsmto1','$gsmfrom2','$gsmto2', '$rate2_examt','$gsmfrom3','$gsmto3','$rate3_examt', '$gsmfrom4','$gsmto4','$rate4_examt','$othershades','500',$bf14bit,$bf16bit,$bf18bit,$bf20bit,$bf22bit,$bf24bit,$bf26bit,$bf28bit,$bf30bit,$bf32bit,
0,0,0,0,0,0,0,
0,0,0,0,0,0,0,
0,0,0,0,0,0,0,
0,0,0,0,0,0,0,
0,0,0,0,0,0,0,
0,0,0,0,0,0,0,
0,0,0,0,0,0,0,
0,0,0,0,0,0,0,
0,0,0,0,0,0,0,
'$creditdays','$cashdiscper', '$cashdiscdays',$cdamt1,$cdamt2,$cdamt3,'$GSTper',
'Y','N',$userid,0)"; 

//echo  $query1;

$result1 = mysql_query($query1);



  if ($result1) {
   mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $varsubgrp . '"})';
} 
  else if ($cnt>0) {
    mysql_query("ROLLBACK");
    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
}else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $varsubgrp . '"})';
}
  
   
?>
