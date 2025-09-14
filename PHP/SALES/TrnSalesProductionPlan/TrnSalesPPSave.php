<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");


session_start();

$griddet = json_decode($_REQUEST['griddet'],true);
$deckgriddet = json_decode($_REQUEST['deckgriddet'],true);
$sizegriddet = json_decode($_REQUEST['sizegriddet'],true);
$vartygriddet = json_decode($_REQUEST['vartygriddet'],true);
                                       

$savetype    = $_POST['savetype'];           
$rowcnt      = $_POST['cnt'];
$deckrowcnt  = $_POST['deckcnt'];
$sizerowcnt  = $_POST['sizecnt'];


$vartyrowcnt  = $_POST['vartycnt'];
$mafincode   = $_POST['mafincode'];
$macompcode  = $_POST['macompcode'];   
$maamendno   = $_POST['maamendno'];
$maamenddate = $_POST['maamenddate'];   
$maadvno     = $_POST['maadvno'];
$maadvdate   = $_POST['maadvdate'];   
$mamachine   = $_POST['mamachine'];
$tol         = $_POST['tol'];
$remarksl    = $_POST['remarksl'];
$remarks2    = $_POST['remarks2'];
$remarks3    = $_POST['remarks3'];
$remarks4    = $_POST['remarks4'];
$remarks5    = $_POST['remarks5'];


if ($savetype == "Add") {

	$query1 = "select ifnull(max(pp_advno),0)+1 as advno from trn_prodplan_header where pp_comp_code = '$macompcode' and pp_fincode = '$mafincode' ";
	$result1= mysql_query($query1);
	$rec2 = mysql_fetch_array($result1);
	$maadvno=$rec2['advno'];
	if ($maadvno==1) {
	   $maadvno = $mafincode.$mamachine."001";
	}
}
else
{
        $query1 =  "delete from trn_prodplan_header where pp_comp_code = '$macompcode' and pp_fincode = '$mafincode'   and  pp_advno = $maadvno";
        $result1=mysql_query($query1);   

        $query2 =  "delete from trn_prodplan_trailer where ppt_comp_code = '$macompcode' and ppt_fincode = '$mafincode'  and ppt_advno = $maadvno";
        $result2=mysql_query($query2);   

        $query3 =  "delete from trn_prodplan_trailer_sizewise where ppt_comp_code = '$macompcode' and ppt_fincode = '$mafincode'   and ppt_advno = $maadvno";
        $result3=mysql_query($query3);   

        $query4 =  "delete from trn_prodplan_trailer_varietywise where pih_comp_code = '$macompcode' and pih_fincode = '$mafincode'   and pih_ppno = $maadvno";
        $result4=mysql_query($query4);   

        $query5 =  "delete from trn_prodplan_trailer_remarks where ppr_comp_code = '$macompcode' and ppr_fincode = '$mafincode'   and ppr_advno = $maadvno";
        $result4=mysql_query($query4);   
}


for ($i=0;$i<$rowcnt;$i++)
{
$masno       = $griddet[$i]['sno'];
$mavarname   = $griddet[$i]['varname'];
$mavarcode   = $griddet[$i]['varcode'];
$magsm       = $griddet[$i]['gsm'];
$masize      = $griddet[$i]['size'];
$masizecode  = $griddet[$i]['itemcode'];
$maqty       = $griddet[$i]['qty'];
$macustomer  = $griddet[$i]['customer'];
$maparty     = $griddet[$i]['custcode'];
$mapriority  = $griddet[$i]['priority'];
$maorder_ref = $griddet[$i]['ordno'];
$maordtype   = $griddet[$i]['type'];
$madespdate  = $griddet[$i]['despdate'];
$maclose     = $griddet[$i]['close'];
 

$query1= "insert into trn_prodplan_header values('$macompcode','$mafincode','$maamendno','$maamenddate','$maadvno','$maadvdate','$masno','$maparty','$mavarcode'
,'$masizecode','$maordtype','$maqty','$mapriority','N','','$maorder_ref','0','0','0','0','0','$madespdate')";

$result1=mysql_query($query1);            
}



for ($i=0;$i<$deckrowcnt;$i++)
{
	$matslno       = $deckgriddet[$i]['sno'];
	$matvarcode    = $deckgriddet[$i]['varcode'];
	$matdeckle     = $deckgriddet[$i]['deckle'];
	$matdecklesize = $deckgriddet[$i]['decksize'];
	$matsize1      = (float)$deckgriddet[$i]['size1'];
	$matsize2      = (float)$deckgriddet[$i]['size2'];
	$matsize3      = (float)$deckgriddet[$i]['size3'];
	$matsize4      = (float)$deckgriddet[$i]['size4'];
	$matsize5      = (float)$deckgriddet[$i]['size5'];
	$matsize6      = (float)$deckgriddet[$i]['size6'];
	$matsize7      = (float)$deckgriddet[$i]['size7'];
	$matsize8      = (float)$deckgriddet[$i]['size8'];
	$matsize9      = (float)$deckgriddet[$i]['size9'];
	$matsize10     = (float)$deckgriddet[$i]['size10'];
	$matqty        = $deckgriddet[$i]['qty'];


	$query2= "insert into trn_prodplan_trailer values('$macompcode','$mafincode','$maamendno','$maamenddate','$maadvno','$maadvdate','$matslno', '$matvarcode','$matsize1', '$matsize2','$matsize3','$matsize4','$matsize5','$matsize6','$matsize7','$matsize8','$matsize9','$matsize10', '$matqty','$matdeckle','$matdecklesize')";  

	$query2= "insert into trn_prodplan_trailer values('$macompcode','$mafincode','$maamendno','$maamenddate','$maadvno','$maadvdate','$matslno', '$matvarcode','$matsize1', '$matsize2','$matsize3','$matsize4','$matsize5','$matsize6','$matsize7','$matsize8','$matsize9','$matsize10', '$matqty','$matdeckle','$matdecklesize')";  

	$result2=mysql_query($query2);            
}


for ($i=0;$i<$sizerowcnt;$i++)
{
$matslno    = $sizegriddet[$i]['sno'];
$matvarcode = $sizegriddet[$i]['varcode'];
$matsize    =  $sizegriddet[$i]['size'];
$matqty = $sizegriddet[$i]['qty'];

$query3= "insert into trn_prodplan_trailer_sizewise  values('$macompcode','$mafincode','$maamendno','$maamenddate','$maadvno','$maadvdate','$matvarcode','$matsize', '$matqty','N','0','0','0','0','0')";  
$result3=mysql_query($query3);            
}
 

for ($i=0;$i<$vartyrowcnt;$i++)
{
$matslno    = $vartygriddet[$i]['sno'];
$matvarcode = $vartygriddet[$i]['varcode'];
$matqty     = $vartygriddet[$i]['qty'];

$query4= "insert into trn_prodplan_trailer_varietywise values('$macompcode','$mafincode','$maamendno','$maamenddate','$maadvno','$maadvdate','$matvarcode', '$matqty','0','0','0','0','0','0','N','N','$tol')";  
$result4=mysql_query($query4);            
}
 

$query5= "insert into trn_prodplan_trailer_remarks values('$macompcode','$mafincode','$maadvno','$remarks1','$remarks2', '$remarks3','$remarks4','$remarks5')";  
$result5=mysql_query($query5);  


if ($result1  && $result2  && $result3  && $result4 ) {

   mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $maadvno . '"})';
	
}else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $maadvno . '"})';
}
  
   
?>
