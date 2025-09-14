<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$savetype    = $_POST['savetype']; 
$areacode    = $_POST['areacode']; 
$vartypecode = $_POST['vartypecode'];  
$ratetype    = $_POST['sotype']; 


$apprno      = $_POST['apprno']; 
$apprdate    = $_POST['apprdate']; 
$wefdate    = $_POST['wefdate']; 
$finid       = $_POST['finid'];
$compcode    = $_POST['compcode'];

 

$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_POST['cnt'];
$GSTper      =  (float)$_POST['GSTper']; 
$othershades = $_POST['othershades']; 
 
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

$query = "select ifnull(max(arearate_sno),0)+1 as itemseq from  massal_areawise_rate where arearate_comp_code = '$compcode' and arearate_fincode='$finid'";
$result = mysql_query($query);
$rec = mysql_fetch_array($result);
$itemseq=$rec['itemseq'];


}
else
{

$itemseq = $apprno;
$query1= "delete from  massal_areawise_rate where arearate_comp_code = '$compcode' and arearate_fincode='$finid' and arearate_sno = $itemseq";
$result1 = mysql_query($query1);



}

$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++)
{
       if ($griddet[$i]['bf'] == '18')
       {

		$bf18gsm120  = (float) $griddet[$i]['gsm120'];  
		$bf18gsm100  = (float) $griddet[$i]['gsm100'];   
		$bf18gsm90   = (float) $griddet[$i]['gsm90'];
		$bf18gsm80   = (float) $griddet[$i]['gsm80'];
		$bf18gsm70   = (float) $griddet[$i]['gsm70'];
		$bf18gsm60   = (float) $griddet[$i]['gsm60'];
		$bf18gsm50   = (float) $griddet[$i]['gsm50'];
       }
       else if ($griddet[$i]['bf'] == '20')
       {
		$bf20gsm120  = (float) $griddet[$i]['gsm120'];  
		$bf20gsm100  = (float) $griddet[$i]['gsm100'];   
		$bf20gsm90   = (float) $griddet[$i]['gsm90'];
		$bf20gsm80   = (float) $griddet[$i]['gsm80'];
		$bf20gsm70   = (float) $griddet[$i]['gsm70'];
		$bf20gsm60   = (float) $griddet[$i]['gsm60'];
		$bf20gsm50   = (float) $griddet[$i]['gsm50'];
       } 
       else if ($griddet[$i]['bf'] == '22')
       {
		$bf22gsm120  = (float) $griddet[$i]['gsm120'];  
		$bf22gsm100  = (float) $griddet[$i]['gsm100'];   
		$bf22gsm90   = (float) $griddet[$i]['gsm90'];
		$bf22gsm80   = (float) $griddet[$i]['gsm80'];
		$bf22gsm70   = (float) $griddet[$i]['gsm70'];
		$bf22gsm60   = (float) $griddet[$i]['gsm60'];
		$bf22gsm50   = (float) $griddet[$i]['gsm50'];
       } 
       else if ($griddet[$i]['bf'] == '24')
       {
		$bf24gsm120  = (float) $griddet[$i]['gsm120'];  
		$bf24gsm100  = (float) $griddet[$i]['gsm100'];   
		$bf24gsm90   = (float) $griddet[$i]['gsm90'];
		$bf24gsm80   = (float) $griddet[$i]['gsm80'];
		$bf24gsm70   = (float) $griddet[$i]['gsm70'];
		$bf24gsm60   = (float) $griddet[$i]['gsm60'];
		$bf24gsm50   = (float) $griddet[$i]['gsm50'];
       } 
       else if ($griddet[$i]['bf'] == '26')
       {
		$bf26gsm120  = (float) $griddet[$i]['gsm120'];  
		$bf26gsm100  = (float) $griddet[$i]['gsm100'];   
		$bf26gsm90   = (float) $griddet[$i]['gsm90'];
		$bf26gsm80   = (float) $griddet[$i]['gsm80'];
		$bf26gsm70   = (float) $griddet[$i]['gsm70'];
		$bf26gsm60   = (float) $griddet[$i]['gsm60'];
		$bf26gsm50   = (float) $griddet[$i]['gsm50'];
       } 
       else if ($griddet[$i]['bf'] == '28')
       {
		$bf28gsm120  = (float) $griddet[$i]['gsm120'];  
		$bf28gsm100  = (float) $griddet[$i]['gsm100'];   
		$bf28gsm90   = (float) $griddet[$i]['gsm90'];
		$bf28gsm80   = (float) $griddet[$i]['gsm80'];
		$bf28gsm70   = (float) $griddet[$i]['gsm70'];
		$bf28gsm60   = (float) $griddet[$i]['gsm60'];
		$bf28gsm50   = (float) $griddet[$i]['gsm50'];
       } 
       else if ($griddet[$i]['bf'] == '30')
       {
		$bf30gsm120  = (float) $griddet[$i]['gsm120'];  
		$bf30gsm100  = (float) $griddet[$i]['gsm100'];   
		$bf30gsm90   = (float) $griddet[$i]['gsm90'];
		$bf30gsm80   = (float) $griddet[$i]['gsm80'];
		$bf30gsm70   = (float) $griddet[$i]['gsm70'];
		$bf30gsm60   = (float) $griddet[$i]['gsm60'];
		$bf30gsm50   = (float) $griddet[$i]['gsm50'];
       } 

       else if ($griddet[$i]['bf'] == '32')
       {
		$bf32gsm120  = (float) $griddet[$i]['gsm120'];  
		$bf32gsm100  = (float) $griddet[$i]['gsm100'];   
		$bf32gsm90   = (float) $griddet[$i]['gsm90'];
		$bf32gsm80   = (float) $griddet[$i]['gsm80'];
		$bf32gsm70   = (float) $griddet[$i]['gsm70'];
		$bf32gsm60   = (float) $griddet[$i]['gsm60'];
		$bf32gsm50   = (float) $griddet[$i]['gsm50'];
       } 
       else if ($griddet[$i]['bf'] == '34')
       {
		$bf34gsm120  = (float) $griddet[$i]['gsm120'];  
		$bf34gsm100  = (float) $griddet[$i]['gsm100'];   
		$bf34gsm90   = (float) $griddet[$i]['gsm90'];
		$bf34gsm80   = (float) $griddet[$i]['gsm80'];
		$bf34gsm70   = (float) $griddet[$i]['gsm70'];
		$bf34gsm60   = (float) $griddet[$i]['gsm60'];
		$bf34gsm50   = (float) $griddet[$i]['gsm50'];
       } 




}




$query1="insert into massal_areawise_rate
(

arearate_comp_code, arearate_fincode, arearate_sno, arearate_type, arearate_appr_date, arearate_wef, arearate_area, arearate_vartype, 
area_bf18gsm120, area_bf18gsm100, area_bf18gsm90, area_bf18gsm80, area_bf18gsm70, area_bf18gsm60, area_bf18gsm50, area_bf20gsm120, area_bf20gsm100, area_bf20gsm90, area_bf20gsm80, area_bf20gsm70, area_bf20gsm60, area_bf20gsm50, area_bf22gsm120, area_bf22gsm100, area_bf22gsm90, area_bf22gsm80, area_bf22gsm70, area_bf22gsm60, area_bf22gsm50, area_bf24gsm120, area_bf24gsm100, area_bf24gsm90, area_bf24gsm80, area_bf24gsm70, area_bf24gsm60, area_bf24gsm50, area_bf26gsm120, area_bf26gsm100, area_bf26gsm90, area_bf26gsm80, area_bf26gsm70, area_bf26gsm60, area_bf26gsm50, area_bf28gsm120, area_bf28gsm100, area_bf28gsm90, area_bf28gsm80, area_bf28gsm70, area_bf28gsm60, area_bf28gsm50, area_bf30gsm120, area_bf30gsm100, area_bf30gsm90, area_bf30gsm80, area_bf30gsm70, area_bf30gsm60, area_bf30gsm50, area_bf32gsm120, area_bf32gsm100, area_bf32gsm90, area_bf32gsm80, area_bf32gsm70, area_bf32gsm60, area_bf32gsm50, area_bf34gsm120, area_bf34gsm100, area_bf34gsm90, area_bf34gsm80, area_bf34gsm70, area_bf34gsm60, area_bf34gsm50,arearate_gst_per,arearate_othershades , arearate_approved, arearate_close
)
 values  ('$compcode','$finid','$itemseq','$ratetype','$apprdate','$wefdate','$areacode','$vartypecode',
$bf18gsm120,$bf18gsm100,$bf18gsm90,$bf18gsm80,$bf18gsm70,$bf18gsm60,$bf18gsm50,
$bf20gsm120,$bf20gsm100,$bf20gsm90,$bf20gsm80,$bf20gsm70,$bf20gsm60,$bf20gsm50,
$bf22gsm120,$bf22gsm100,$bf22gsm90,$bf22gsm80,$bf22gsm70,$bf22gsm60,$bf22gsm50,
$bf24gsm120,$bf24gsm100,$bf24gsm90,$bf24gsm80,$bf24gsm70,$bf24gsm60,$bf24gsm50,
$bf26gsm120,$bf26gsm100,$bf26gsm90,$bf26gsm80,$bf26gsm70,$bf26gsm60,$bf26gsm50,
$bf28gsm120,$bf28gsm100,$bf28gsm90,$bf28gsm80,$bf28gsm70,$bf28gsm60,$bf28gsm50,
$bf30gsm120,$bf30gsm100,$bf30gsm90,$bf30gsm80,$bf30gsm70,$bf30gsm60,$bf30gsm50,
$bf32gsm120,$bf32gsm100,$bf32gsm90,$bf32gsm80,$bf32gsm70,$bf32gsm60,$bf32gsm50,
$bf34gsm120,$bf34gsm100,$bf34gsm90,$bf34gsm80,$bf34gsm70,$bf34gsm60,$bf34gsm50,
$GSTper ,'$othershades','Y','N')"; 

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
