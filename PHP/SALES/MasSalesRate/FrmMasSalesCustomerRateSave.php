<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$savetype    = $_POST['savetype']; 
$custcode    = $_POST['custcode']; 
$vartypecode = $_POST['vartypecode'];  
$ratetype    = $_POST['ratetype'];  

$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_POST['cnt'];

$bf12        = 0;  
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
$gsmfrom5    = (int) $_POST['gsmfrom5'];  
$gsmto5      = (int) $_POST['gsmto5'];  

$rate2_examt =  (float)  $_POST['rate2_examt'];  
$rate3_examt =  (float) $_POST['rate3_examt'];    
$rate4_examt =  (float) $_POST['rate4_examt']; 		
$rate5_examt =  (float) $_POST['rate4_examt']; 	

$othershades = $_POST['othershades']; 


$GSTper      =  (float)$_POST['GSTper'];  

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

$userid    = (int) $_POST['userid']; 

$priceterm = (int) $_POST['priceterm']; 
$PTGD = (int) $_POST['PTGD']; 

$bf12bit      = 0;
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

$query = "select ifnull(max(rate_code),0)+1 as apprseq from  massal_rate where rate_comp_code = '$compcode' and rate_fincode='$finid'";
$result = mysql_query($query);
$rec = mysql_fetch_array($result);
$apprseq=$rec['apprseq'];
}
else
{

$apprseq = $apprno;
$query1= "delete from  massal_rate where rate_comp_code = '$compcode' and rate_fincode='$finid' and rate_code = $apprseq";
$result1 = mysql_query($query1);


//echo  $query1;
//echo "<br>";

}

$inscnt = 0;


for ($i=0;$i<$rowcnt;$i++)
{

	$prodcode    = (int) $griddet[$i]['prodcode'];  
  	$shade       = $griddet[$i]['shade'];
	$gsmfrom     = (int) $griddet[$i]['gsmfrom'];   
	$gsmto       = (int) $griddet[$i]['gsmto'];

	$gsmfrrate   = (float) $griddet[$i]['gsmfrrate'];
	$gsmbrrate   = (float) $griddet[$i]['gsmbrrate'];

	$fr12bf      = (float) $griddet[$i]['fr12bf'];
	$fr14bf      = (float) $griddet[$i]['fr14bf'];
	$fr16bf      = (float) $griddet[$i]['fr16bf'];
	$fr18bf      = (float) $griddet[$i]['fr18bf'];
	$fr20bf      = (float) $griddet[$i]['fr20bf'];
	$fr22bf      = (float) $griddet[$i]['fr22bf'];
	$fr24bf      = (float) $griddet[$i]['fr24bf'];
	$fr26bf      = (float) $griddet[$i]['fr26bf'];
	$fr28bf      = (float) $griddet[$i]['fr28bf'];
	$fr28bf      = (float) $griddet[$i]['fr28bf'];
	$fr30bf      = (float) $griddet[$i]['fr30bf'];
	$fr32bf      = 0;

	$br12bf      = (float) $griddet[$i]['br12bf'];	
	$br14bf      = (float) $griddet[$i]['br14bf'];
	$br16bf      = (float) $griddet[$i]['br16bf'];
	$br18bf      = (float) $griddet[$i]['br18bf'];
	$br20bf      = (float) $griddet[$i]['br20bf'];
	$br22bf      = (float) $griddet[$i]['br22bf'];
	$br24bf      = (float) $griddet[$i]['br24bf'];
	$br26bf      = (float) $griddet[$i]['br26bf'];
	$br28bf      = (float) $griddet[$i]['br28bf'];
	$br28bf      = (float) $griddet[$i]['br28bf'];
	$br30bf      = (float) $griddet[$i]['br30bf'];
	$br32bf      = 0;

	$ar1gsmfrom  = (int) $griddet[$i]['ar1gsmfrom'];
	$ar1gsmto    = (int) $griddet[$i]['ar1gsmto'];
	$ar1rate     = (float) $griddet[$i]['ar1rate'];

	$ar2gsmfrom  = (int) $griddet[$i]['ar2gsmfrom'];
	$ar2gsmto    = (int) $griddet[$i]['ar2gsmto'];
	$ar2rate     = (float) $griddet[$i]['ar2rate'];

	$ar3gsmfrom  = (int) $griddet[$i]['ar3gsmfrom'];
	$ar3gsmto    = (int) $griddet[$i]['ar3gsmto'];
	$ar3rate     = (float) $griddet[$i]['ar3rate'];

	$ar4gsmfrom  = (int) $griddet[$i]['ar4gsmfrom'];
	$ar4gsmto    = (int) $griddet[$i]['ar4gsmto'];
	$ar4rate     = (float) $griddet[$i]['ar4rate'];


	$othshade    = (float) $griddet[$i]['othshade'];
	$sheet      = (float) $griddet[$i]['sheet'];

	$bf18_120    = (float) $griddet[$i]['bf18_120'];
	$bf18_100    = (float) $griddet[$i]['bf18_100'];
	$bf18_90     = (float) $griddet[$i]['bf18_90'];
	$bf18_80     = (float) $griddet[$i]['bf18_80'];
	$bf18_70     = (float) $griddet[$i]['bf18_70'];
	$bf18_60     = (float) $griddet[$i]['bf18_60'];
	$bf18_50     = (float) $griddet[$i]['bf18_50'];


	$bf20_120    = (float) $griddet[$i]['bf20_120'];
	$bf20_100    = (float) $griddet[$i]['bf20_100'];
	$bf20_90     = (float) $griddet[$i]['bf20_90'];
	$bf20_80     = (float) $griddet[$i]['bf20_80'];
	$bf20_70     = (float) $griddet[$i]['bf20_70'];
	$bf20_60     = (float) $griddet[$i]['bf20_60'];
	$bf20_50     = (float) $griddet[$i]['bf20_50'];


	$bf22_120    = (float) $griddet[$i]['bf22_120'];
	$bf22_100    = (float) $griddet[$i]['bf22_100'];
	$bf22_90     = (float) $griddet[$i]['bf22_90'];
	$bf22_80     = (float) $griddet[$i]['bf22_80'];
	$bf22_70     = (float) $griddet[$i]['bf22_70'];
	$bf22_60     = (float) $griddet[$i]['bf22_60'];
	$bf22_50     = (float) $griddet[$i]['bf22_50'];

	$bf24_120    = (float) $griddet[$i]['bf24_120'];
	$bf24_100    = (float) $griddet[$i]['bf24_100'];
	$bf24_90     = (float) $griddet[$i]['bf24_90'];
	$bf24_80     = (float) $griddet[$i]['bf24_80'];
	$bf24_70     = (float) $griddet[$i]['bf24_70'];
	$bf24_60     = (float) $griddet[$i]['bf24_60'];
	$bf24_50     = (float) $griddet[$i]['bf24_50'];


	$bf26_120    = (float) $griddet[$i]['bf26_120'];
	$bf26_100    = (float) $griddet[$i]['bf26_100'];
	$bf26_90     = (float) $griddet[$i]['bf26_90'];
	$bf26_80     = (float) $griddet[$i]['bf26_80'];
	$bf26_70     = (float) $griddet[$i]['bf26_70'];
	$bf26_60     = (float) $griddet[$i]['bf26_60'];
	$bf26_50     = (float) $griddet[$i]['bf26_50'];

	$bf28_120    = (float) $griddet[$i]['bf28_120'];
	$bf28_100    = (float) $griddet[$i]['bf28_100'];
	$bf28_90     = (float) $griddet[$i]['bf28_90'];
	$bf28_80     = (float) $griddet[$i]['bf28_80'];
	$bf28_70     = (float) $griddet[$i]['bf28_70'];
	$bf28_60     = (float) $griddet[$i]['bf28_60'];
	$bf28_50     = (float) $griddet[$i]['bf28_50'];


	$bf30_120    = (float) $griddet[$i]['bf30_120'];
	$bf30_100    = (float) $griddet[$i]['bf30_100'];
	$bf30_90     = (float) $griddet[$i]['bf30_90'];
	$bf30_80     = (float) $griddet[$i]['bf30_80'];
	$bf30_70     = (float) $griddet[$i]['bf30_70'];
	$bf30_60     = (float) $griddet[$i]['bf30_60'];
	$bf30_50     = (float) $griddet[$i]['bf30_50'];

	$bf32_120    = (float) $griddet[$i]['bf32_120'];
	$bf32_100    = (float) $griddet[$i]['bf32_100'];
	$bf32_90     = (float) $griddet[$i]['bf32_90'];
	$bf32_80     = (float) $griddet[$i]['bf32_80'];
	$bf32_70     = (float) $griddet[$i]['bf32_70'];
	$bf32_60     = (float) $griddet[$i]['bf32_60'];
	$bf32_50     = (float) $griddet[$i]['bf32_50'];

	$bf34_120    = (float) $griddet[$i]['bf34_120'];
	$bf34_100    = (float) $griddet[$i]['bf34_100'];
	$bf34_90     = (float) $griddet[$i]['bf34_90'];
	$bf34_80     = (float) $griddet[$i]['bf34_80'];
	$bf34_70     = (float) $griddet[$i]['bf34_70'];
	$bf34_60     = (float) $griddet[$i]['bf34_60'];
	$bf34_50     = (float) $griddet[$i]['bf34_50'];

$query2="insert into massal_rate
(
rate_comp_code, rate_fincode, rate_code,  rate_appr_date, rate_wef, rate_cust, rate_vartype, rate_bf14, rate_bf16, rate_bf18, rate_bf20, rate_bf22, rate_bf24, rate_bf26, rate_bf28, rate_bf30, rate_bf32, rate_rate, rate_bitreel,  rate_gsmfrom, rate_gsmto, rate2_gsmfrom, rate2_gsmto, rate2_extraamt, rate3_gsmfrom, rate3_gsmto, rate3_extraamt, rate4_gsmfrom, rate4_gsmto, rate4_extraamt,rate5_gsmfrom, rate5_gsmto, rate5_extraamt,
 rate_othershades, rate_sheet_extraamt, rate_bf14_bit, rate_bf16_bit, rate_bf18_bit, rate_bf20_bit, rate_bf22_bit, rate_bf24_bit, rate_bf26_bit, rate_bf28_bit, rate_bf30_bit, rate_bf32_bit,  rate_bf18gsm120, rate_bf18gsm100, rate_bf18gsm90, rate_bf18gsm80, rate_bf18gsm70, rate_bf18gsm60, rate_bf18gsm50, rate_bf20gsm120, rate_bf20gsm100, rate_bf20gsm90, rate_bf20gsm80, rate_bf20gsm70, rate_bf20gsm60, rate_bf20gsm50, rate_bf22gsm120, rate_bf22gsm100, rate_bf22gsm90, rate_bf22gsm80, rate_bf22gsm70, rate_bf22gsm60, rate_bf22gsm50, rate_bf24gsm120, rate_bf24gsm100, rate_bf24gsm90, rate_bf24gsm80, rate_bf24gsm70, rate_bf24gsm60, rate_bf24gsm50, rate_bf26gsm120, rate_bf26gsm100, rate_bf26gsm90, rate_bf26gsm80, rate_bf26gsm70, rate_bf26gsm60, rate_bf26gsm50, rate_bf28gsm120, rate_bf28gsm100, rate_bf28gsm90, rate_bf28gsm80, rate_bf28gsm70, rate_bf28gsm60, rate_bf28gsm50, rate_bf30gsm120, rate_bf30gsm100, rate_bf30gsm90, rate_bf30gsm80, rate_bf30gsm70, rate_bf30gsm60, rate_bf30gsm50, rate_bf32gsm120, rate_bf32gsm100, rate_bf32gsm90, rate_bf32gsm80, rate_bf32gsm70, rate_bf32gsm60, rate_bf32gsm50, rate_bf34gsm120, rate_bf34gsm100, rate_bf34gsm90, rate_bf34gsm80, rate_bf34gsm70, rate_bf34gsm60, rate_bf34gsm50 ,rate_cashdisc_per,	
rate_cashdisc_days,rate_payterm_30days_cdamt, rate_payterm_60days_cdamt1, rate_payterm_60days_cdamt2, rate_gst_per,  rate_approved, rate_close ,rate_entered,rate_shade,rate_price_terms,rate_grace_days,rate_bf12,rate_bf12_bit
)
 values  ('$compcode','$finid','$apprno','$apprdate','$wefdate','$custcode','$prodcode',
'$fr14bf','$fr16bf','$fr18bf','$fr20bf','$fr22bf','$fr24bf','$fr26bf','$fr28bf','$fr30bf','$fr32bf',
'$gsmfrrate','$gsmbrrate','$gsmfrom','$gsmto',
'$ar1gsmfrom','$ar1gsmto','$ar1rate','$ar2gsmfrom','$ar2gsmto','$ar2rate',
'$ar3gsmfrom','$ar3gsmto','$ar3rate','$ar4gsmfrom','$ar4gsmto','$ar4rate',
'$othshade','$sheet','$br14bf','$br16bf','$br18bf','$br20bf','$br22bf','$br24bf','$br26bf','$br28bf','$br30bf','$br32bf',
'$bf18_120','$bf18_100','$bf18_90','$bf18_80','$bf18_70','$bf18_60','$bf18_50',
'$bf20_120','$bf20_100','$bf20_90','$bf20_80','$bf20_70','$bf20_60','$bf20_50',
'$bf22_120','$bf22_100','$bf22_90','$bf22_80','$bf22_70','$bf22_60','$bf22_50',
'$bf24_120','$bf24_100','$bf24_90','$bf24_80','$bf24_70','$bf24_60','$bf24_50',
'$bf26_120','$bf26_100','$bf26_90','$bf26_80','$bf26_70','$bf26_60','$bf26_50',
'$bf28_120','$bf28_100','$bf28_90','$bf28_80','$bf28_70','$bf28_60','$bf28_50',
'$bf30_120','$bf30_100','$bf30_90','$bf30_80','$bf30_70','$bf30_60','$bf30_50',
'$bf32_120','$bf32_100','$bf32_90','$bf32_80','$bf32_70','$bf32_60','$bf32_50',
'$bf34_120','$bf34_100','$bf34_90','$bf34_80','$bf34_70','$bf34_60','$bf34_50',
'$cashdiscper', '$cashdiscdays',$cdamt1,$cdamt2,$cdamt3,'$GSTper',
 'N','N',$userid,'$shade','$priceterm','$PTGD',$fr12bf ,$br12bf)"; 



//echo  $query1;
//echo "<br>";
$result2 = mysql_query($query2);
}


if ($savetype == "Add") {

     if ( $result2) {
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
}  
else
{

     if ($result1 && $result2) {
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
}  
   
?>
