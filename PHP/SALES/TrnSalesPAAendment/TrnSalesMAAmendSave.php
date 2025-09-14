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




/*
	$query1 = "select ifnull(max(ma_advno),0)+1 as advno from trn_ma_header where ma_comp_code = '$macompcode' and ma_fincode = '$mafincode'   and ma_machine = '$mamachine'";
	$result1= mysql_query($query1);
	$rec2 = mysql_fetch_array($result1);
	$maadvno=$rec2['advno'];
	if ($maadvno==1) {
	   $maadvno = $mafincode.$mamachine."001";
	}
*/

    $query1 =  "insert into trn_ma_header_amend   select * from  trn_ma_header where ma_Comp_code = '$macompcode' and ma_fincode='$mafincode' and ma_advno = $maadvno and ma_amendno = $maamendno-1 ";
        $result1=mysql_query($query1);   
    
    $query2 =  "insert into trn_ma_trailer_amend  select * from trn_ma_trailer where mat_comp_code = '$macompcode' and mat_fincode= '$mafincode'  and mat_advno = $maadvno  and mat_amendno = $maamendno-1 ";
   $result2=mysql_query($query2);   

    $query3 =  "insert into trn_ma_trailer_sizewise_amend  select * from trn_ma_trailer_sizewise where mat_comp_code = '$macompcode' and mat_fincode= '$mafincode'  and mat_advno = $maadvno  and mat_amendno = $maamendno-1 ";
       $result3=mysql_query($query3);  

    $query4 = "insert into trn_ma_trailer_varietywise_amend  select * from trn_ma_trailer_varietywise where pih_comp_code = '$macompcode' and pih_fincode= '$mafincode'  and pih_mano = $maadvno  and pih_amendno = $maamendno-1 ";
  $result4=mysql_query($query4);  



        $query1 =  "delete from trn_ma_header where ma_comp_code = '$macompcode' and ma_fincode = '$mafincode'   and ma_machine = $mamachine and ma_advno = $maadvno";
        $result1=mysql_query($query1);   

        $query2 =  "delete from trn_ma_trailer where mat_comp_code = '$macompcode' and mat_fincode = '$mafincode'  and mat_advno = $maadvno";
        $result2=mysql_query($query2);   

        $query3 =  "delete from trn_ma_trailer_sizewise where mat_comp_code = '$macompcode' and mat_fincode = '$mafincode'   and mat_advno = $maadvno";
        $result3=mysql_query($query3);   

        $query4 =  "delete from trn_ma_trailer_varietywise where pih_comp_code = '$macompcode' and pih_fincode = '$mafincode'   and pih_mano = $maadvno";
        $result4=mysql_query($query4);   



for ($i=0;$i<$rowcnt;$i++)
{
$masno       = $griddet[$i]['sno'];
$mavarname   = $griddet[$i]['varname'];
$mavarcode   = $griddet[$i]['varcode'];
$magsm       = $griddet[$i]['gsm'];
$masize      = $griddet[$i]['size'];
$masizecode  = $griddet[$i]['itemcode'];
$maqty       = $griddet[$i]['qty'];
$mareamwt    = $griddet[$i]['reamwt'];
$mareams     = $griddet[$i]['reams'];
$masheets    = $griddet[$i]['sheets'];
$macustomer  = $griddet[$i]['customer'];
$maparty     = $griddet[$i]['custcode'];
$mapriority  = $griddet[$i]['priority'];
$maorder_ref = $griddet[$i]['ordno'];
$maordtype   = $griddet[$i]['type'];
$madespdate  = $griddet[$i]['despdate'];
$maclose     = $griddet[$i]['close'];


$query1= "insert into trn_ma_header values('$macompcode','$mafincode','$maamendno','$maamenddate','$maadvno','$maadvdate','$masno','$maparty','$mavarcode'
,'$masizecode','$maordtype','$maqty','$masheets','$mareamwt','$mareams','$mapriority','$mamachine','N','','$maorder_ref','0','0','0','0','0','0','0','0',
'0','0','0','0','0','0','$madespdate','0')";

$result1=mysql_query($query1);            
}


for ($i=0;$i<$deckrowcnt;$i++)
{
$matslno = $deckgriddet[$i]['sno'];
$matvarcode = $deckgriddet[$i]['varcode'];
$matdeckle  =  $deckgriddet[$i]['deckle'];
$matdecklesize = $deckgriddet[$i]['decksize'];
$matsize1  = $deckgriddet[$i]['size1'];
$matsize2  = $deckgriddet[$i]['size2'];
$matsize3  = $deckgriddet[$i]['size3'];
$matsize4  = $deckgriddet[$i]['size4'];
$matsize5  = $deckgriddet[$i]['size5'];
$matsize6  = $deckgriddet[$i]['size6'];
$matsize7  = $deckgriddet[$i]['size7'];
$matsize8  = $deckgriddet[$i]['size8'];
$matsize9  = $deckgriddet[$i]['size9'];
$matsize10 = $deckgriddet[$i]['size10'];
$matsize11 = $deckgriddet[$i]['size11'];
$matsize12 = $deckgriddet[$i]['size12'];
$matsize13 = $deckgriddet[$i]['size13'];
$matsize14 = $deckgriddet[$i]['size14'];
$matqty    = $deckgriddet[$i]['qty'];


$query2= "insert into trn_ma_trailer values('$macompcode','$mafincode','$maamendno','$maamenddate','$maadvno','$maadvdate','$matslno','$matvarcode','$matsize1', '$matsize2','$matsize3','$matsize4','$matsize5','$matsize6','$matsize7','$matsize8','$matsize9','$matsize10','$matsize11','$matsize12','$matsize13','$matsize14',0,0,0,'$matqty','$matdeckle','$matdecklesize',0)";  
$result2=mysql_query($query2);            
}


for ($i=0;$i<$sizerowcnt;$i++)
{
$matslno    = $sizegriddet[$i]['sno'];
$matvarcode = $sizegriddet[$i]['varcode'];
$matsize    =  $sizegriddet[$i]['size'];
$matqty = $sizegriddet[$i]['qty'];

$query3= "insert into trn_ma_trailer_sizewise  values('$macompcode','$mafincode','$maamendno','$maamenddate','$maadvno','$maadvdate','$matvarcode','$matsize', '$matqty','N','$mamachine','0','0','0','0','0','0','0','0','0','0',0,0,0,'0',0)";  
$result3=mysql_query($query3);            
}
 

for ($i=0;$i<$vartyrowcnt;$i++)
{
$matslno    = $vartygriddet[$i]['sno'];
$matvarcode = $vartygriddet[$i]['varcode'];
$matqty     = $vartygriddet[$i]['qty'];

$query4= "insert into trn_ma_trailer_varietywise values('$macompcode','$mafincode','$mamachine','$maamendno','$maamenddate','$maadvno','$maadvdate','$matvarcode', '$matqty','0','0','0','0','0','0','0','0','0','0',0,0,0,'0','N','N','$tol',0)";  
$result4=mysql_query($query4);            
}
 


if ($result1 && $result2 && $result3 && $result4) {

   mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $maadvno . '"})';
	
}else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $maadvno . '"})';
}
  
   
?>
