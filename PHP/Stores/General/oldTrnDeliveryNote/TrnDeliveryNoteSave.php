<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_POST['cnt'];
$genhcompcode = $_POST['genhcompcode'];
$genhfincode = $_POST['genhfincode'];
$genhno = $_POST['genhno'];
$genhdate = $_POST['genhdate'];
$genhparty = $_POST['genhparty'];
$genhtag = $_POST['genhtag'];
$genhtype = $_POST['genhtype'];
$genhdept = $_POST['genhdept'];
$genhretype = $_POST['genhretype'];
$genhtotqty = $_POST['genhtotqty'];
$genhtotval = $_POST['genhtotval'];
$genhcarrier = $_POST['genhcarrier'];
$genhfreight = $_POST['genhfreight'];
$genhdays = $_POST['genhdays'];
$genhremarks = $_POST['genhremarks'];
$genhrefno = $_POST['genhrefno'];
$genhrefdate = $_POST['genhrefdate'];
$genhfrtamt = $_POST['genhfrtamt'];
$genhvalue = $_POST['genhvalue'];
$genhdiscount = $_POST['genhdiscount'];
$genhsertaxper = $_POST['genhsertaxper'];
$genhsertaxamt = $_POST['genhsertaxamt'];
$genheduper = $_POST['genheduper'];
$genheduamt = $_POST['genheduamt'];
$genhsheper = $_POST['genhsheper'];
$genhsheamt = $_POST['genhsheamt'];
$genhtransunitrate = $_POST['genhtransunitrate'];
$genhtransamt = $_POST['genhtransamt'];
$genhotheramt = $_POST['genhotheramt'];
$genhlabouramt = $_POST['genhlabouramt'];
$genhcgstper = $_POST['genhcgstper'];
$genhcgstamt = $_POST['genhcgstamt'];
$genhsgstper = $_POST['genhsgstper'];
$genhsgstamt = $_POST['genhsgstamt'];
$genhigstper = $_POST['genhigstper'];
$genhigstamt = $_POST['genhigstamt'];
$genhlessamt = $_POST['genhlessamt'];
$genhbillno = $_POST['genhbillno'];
$genhbilldate = $_POST['genhbilldate'];
$genhgateeno = $_POST['genhgateeno'];
$genhgateedate = $_POST['genhgateedate'];
$genhtruckno = $_POST['genhtruckno'];
$genhaccupd = $_POST['genhaccupd'];
$genhaccvouno = $_POST['genhaccvouno'];
$genhaccvoudate = $_POST['genhaccvoudate'];
$cancelflag = 0;

 $query2 = "select IFNULL(max(genh_no),0)+1 as genh_no from trnpur_general_header where genh_fincode = $genhfincode and genh_comp_code=$genhcompcode";
 $result2= mysql_query($query2);
 $rec2 = mysql_fetch_array($result2);
 $genhno=$rec2['genh_no'];

 mysql_query("BEGIN");

 $query3= "insert into  trnpur_general_header values('$genhcompcode','$genhfincode','$genhno','$genhdate','$genhparty','$genhtag','$genhtype',
'$genhdept','$genhretype','$genhtotqty','$genhtotval','$genhcarrier','$genhfreight','$genhdays','$genhremarks','$genhrefno','$genhrefdate',
'$genhfrtamt','$genhvalue','$genhdiscount','$genhsertaxper','$genhsertaxamt','$genheduper','$genheduamt','$genhsheper','$genhsheamt','$genhtransunitrate',
'$genhtransamt','$genhotheramt','$genhlabouramt','$genhcgstper','$genhcgstamt','$genhsgstper','$genhsgstamt','$genhigstper','$genhigstamt','$genhlessamt',
'$genhbillno','$genhbilldate','$genhgateeno','$genhgateedate','$genhtruckno','$genhaccupd','$genhaccvouno','$genhaccvoudate','$cancelflag')";
 $result3=mysql_query($query3);

$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++)
{
$sno = $i + 1;


$gentitemcode = $griddet[$i]['itemcode'];
$gentissqty   = $griddet[$i]['qty'];
$gentpurpose  = $griddet[$i]['purpose'];

 $query4= "insert into  trnpur_general_trailer values('$genhcompcode','$genhfincode','$genhno','$genhdate','$genhtag','$genhtype','$genhrefno',
'$gentrefdate','$gentitemcode','0','$gentissqty','0','0','0','$gentpurpose','$genhdept','0',
'0','$sno','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','','$cancelflag')";
 $result4=mysql_query($query4);  

}

if($result3 && $result4)
{
            mysql_query("COMMIT");                        
            echo '({"success":"true","dnno":"'.$genhno.'"})';
        }
        else
        {
            mysql_query("ROLLBACK");            
            echo '({"success":"false","dnno":"'.$genhno.'"})';
        }   
        

       
 
?>
