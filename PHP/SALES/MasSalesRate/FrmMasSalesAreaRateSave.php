<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$savetype    = $_POST['savetype']; 
$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_POST['cnt'];

$areacode  = $_POST['areacode']; 
$apprno    = $_POST['apprno']; 
$apprdate  = $_POST['apprdate']; 
$wefdate   = $_POST['wefdate']; 
$finid     = $_POST['finid'];
$compcode  = $_POST['compcode'];  
$GSTper    = $_POST['GSTper'];  
 

$userid  = (int) $_POST['userid']; 
$priceterm = (int) $_POST['priceterm']; 


mysql_query("BEGIN");


if ($savetype == "Add") {

$query = "select ifnull(max(arearate_sno),0)+1 as apprno from  massal_areawise_rate where arearate_comp_code = '$compcode' and arearate_fincode='$finid'";
$result = mysql_query($query);
$rec = mysql_fetch_array($result);
$apprno=$rec['apprno'];
}
else
{


$query1= "delete from  massal_areawise_rate where arearate_comp_code = '$compcode' and arearate_fincode='$finid' and arearate_sno = $apprno";
$result1 = mysql_query($query1);



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
	$othshade    = (float) $griddet[$i]['othshade'];
	$sheet       = (float) $griddet[$i]['sheet'];

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

$query1="insert into massal_areawise_rate
(
arearate_comp_code, arearate_fincode, arearate_sno, arearate_appr_date, arearate_wef, arearate_area, arearate_vartype, arearate_gst_per, arearate_gsmfrom, arearate_gsmto, arearate_gsm_fr_rate, arearate_gsm_br_rate, arearate_bf14, arearate_bf16, arearate_bf18, arearate_bf20, arearate_bf22, arearate_bf24, arearate_bf26, arearate_bf28, arearate_bf30, arearate_bf32, arearate_bf14_bit, arearate_bf16_bit, arearate_bf18_bit, arearate_bf20_bit, arearate_bf22_bit, arearate_bf24_bit, arearate_bf26_bit, arearate_bf28_bit, arearate_bf30_bit, arearate_bf32_bit, 
arearate_gsmfrom2, arearate_gsmto2, arearate_extraamt2, arearate_gsmfrom3, arearate_gsmto3, arearate_extraamt3, arearate_gsmfrom4, arearate_gsmto4, arearate_extraamt4, arearate_othershades, arearate_sheet_extraamt,
 area_bf18gsm120, area_bf18gsm100, area_bf18gsm90, area_bf18gsm80, area_bf18gsm70, area_bf18gsm60, area_bf18gsm50, area_bf20gsm120, area_bf20gsm100, area_bf20gsm90, area_bf20gsm80, area_bf20gsm70, area_bf20gsm60, area_bf20gsm50, area_bf22gsm120, area_bf22gsm100, area_bf22gsm90, area_bf22gsm80, area_bf22gsm70, area_bf22gsm60, area_bf22gsm50, area_bf24gsm120, area_bf24gsm100, area_bf24gsm90, area_bf24gsm80, area_bf24gsm70, area_bf24gsm60, area_bf24gsm50, area_bf26gsm120, area_bf26gsm100, area_bf26gsm90, area_bf26gsm80, area_bf26gsm70, area_bf26gsm60, area_bf26gsm50, area_bf28gsm120, area_bf28gsm100, area_bf28gsm90, area_bf28gsm80, area_bf28gsm70, area_bf28gsm60, area_bf28gsm50, area_bf30gsm120, area_bf30gsm100, area_bf30gsm90, area_bf30gsm80, area_bf30gsm70, area_bf30gsm60, area_bf30gsm50, area_bf32gsm120, area_bf32gsm100, area_bf32gsm90, area_bf32gsm80, area_bf32gsm70, area_bf32gsm60, area_bf32gsm50, area_bf34gsm120, area_bf34gsm100, area_bf34gsm90, area_bf34gsm80, area_bf34gsm70, area_bf34gsm60, area_bf34gsm50, arearate_approved, arearate_close,arearate_entered,arearate_shade,arearate_price_terms
)
 values  ('$compcode','$finid','$apprno','$apprdate','$wefdate','$areacode','$prodcode',
'$GSTper','$gsmfrom','$gsmto','$gsmfrrate','$gsmbrrate',
'$fr14bf','$fr16bf','$fr18bf','$fr20bf','$fr22bf','$fr24bf','$fr26bf','$fr28bf','$fr30bf','$fr32bf',
'$br14bf','$br16bf','$br18bf','$br20bf','$br22bf','$br24bf','$br26bf','$br28bf','$br30bf','$br32bf',
'$ar1gsmfrom','$ar1gsmto','$ar1rate','$ar2gsmfrom','$ar2gsmto','$ar2rate',
'$ar3gsmfrom','$ar3gsmto','$ar3rate','$othshade','$sheet',
'$bf18_120','$bf18_100','$bf18_90','$bf18_80','$bf18_70','$bf18_60','$bf18_50',
'$bf20_120','$bf20_100','$bf20_90','$bf20_80','$bf20_70','$bf20_60','$bf20_50',
'$bf22_120','$bf22_100','$bf22_90','$bf22_80','$bf22_70','$bf22_60','$bf22_50',
'$bf24_120','$bf24_100','$bf24_90','$bf24_80','$bf24_70','$bf24_60','$bf24_50',
'$bf26_120','$bf26_100','$bf26_90','$bf26_80','$bf26_70','$bf26_60','$bf26_50',
'$bf28_120','$bf28_100','$bf28_90','$bf28_80','$bf28_70','$bf28_60','$bf28_50',
'$bf30_120','$bf30_100','$bf30_90','$bf30_80','$bf30_70','$bf30_60','$bf30_50',
'$bf32_120','$bf32_100','$bf32_90','$bf32_80','$bf32_70','$bf32_60','$bf32_50',
'$bf34_120','$bf34_100','$bf34_90','$bf34_80','$bf34_70','$bf34_60','$bf34_50','N','N',$userid,'$shade','$priceterm')"; 

//echo  $query1;
//echo "<br>";

$result1 = mysql_query($query1);
}


  if ($result1) {
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $apprno . '"})';
   } 
   else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $apprno . '"})';
   } 
  
   
?>
