<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();
$griddet = json_decode($_POST['griddet'],true);
$rowcnt = $_POST['cnt'];
$snhseqno = $_POST['snhseqno'];
$snhcompcode = $_POST['snhcompcode'];
$snhfincode = $_POST['snhfincode'];
$snhno = $_POST['snhno'];
$snhdate = $_POST['snhdate'];
$snhcustcode = $_POST['snhcustcode'];
$snhtotamt = $_POST['snhtotamt'];
$snhcgst = $_POST['snhcgst'];
$snhsgst = $_POST['snhsgst'];
$snhigst = $_POST['snhigst'];
$snhins = $_POST['snhins'];
$snhfrieght = $_POST['snhfrieght'];
$snhoth = $_POST['snhoth'];
$snhroff = $_POST['snhroff'];
$snhnetamt = $_POST['snhnetamt'];
$snhpaymode = $_POST['snhpaymode'];
$snhtransport = $_POST['snhtransport'];
$snhvehno = $_POST['snhvehno'];
$snhremarks = $_POST['snhremarks'];
$snhvouno = $_POST['snhvouno'];
$snhusrcode = $_POST['snhusrcode'];
$cancelflag  = $_POST['cancelflag'];


 $query1 = "select IFNULL(max(snh_seqno),0)+1 as snhseqno from trnpur_salenote_header";
 $result1 = mysql_query($query1);
 $rec1 = mysql_fetch_array($result1);
 $snhseqno=$rec1['snhseqno'];

 $query2 = "select IFNULL(max(snh_no),0)+1 as snh_no from trnpur_salenote_header where snh_fincode = $snhfincode and snh_compcode='$snhcompcode'";
 $result2= mysql_query($query2);
 $rec2 = mysql_fetch_array($result2);
 $snhno=$rec2['snh_no'];

 mysql_query("BEGIN");


 $query3= "insert into trnpur_salenote_header values('$snhseqno','$snhcompcode','$snhfincode','$snhno','$snhdate','$snhcustcode','$snhtotamt','$snhcgst',
'$snhsgst','$snhigst','$snhins','$snhfrieght','$snhoth','$snhroff','$snhnetamt','$snhpaymode','$snhtransport','$snhvehno','$snhremarks',
'$snhvouno','$snhusrcode','$cancelflag')";
 $result3=mysql_query($query3);

$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++)
{
$sno = $i + 1;
$sntsno = $griddet[$i]['sntsno'];
$sntitemcode = $griddet[$i]['itemcode'];
$sntuom = $griddet[$i]['uomcode'];
$sntqty = $griddet[$i]['qty'];
$sntrate = $griddet[$i]['unitrate'];
$sntvalue = $griddet[$i]['sntvalue'];
$sntcgstper = $griddet[$i]['cgstper'];
$sntcgstamt = $griddet[$i]['cgstval'];
$sntsgstper = $griddet[$i]['sgstper'];
$$sntsgstamt = $griddet[$i]['sgstval'];
$sntigstper = $griddet[$i]['igstper'];
$sntigstamt = $griddet[$i]['igstval'];
$sntfrieght = $griddet[$i]['freight'];
$sntinsper = $griddet[$i]['insval'];
$sntinsamt = $griddet[$i]['insval'];
$sntothers = $griddet[$i]['others'];
$snttotamt = $griddet[$i]['totamt'];
$sntpurledcode = $griddet[$i]['purled'];
$sntcgstledcode = $griddet[$i]['cgstled'];
$sntsgstledcode = $griddet[$i]['sgstled'];
$sntigstledcode = $griddet[$i]['igstled'];
$sntfreightledcode = $griddet[$i]['freightled'];
$sntinsledcode = $griddet[$i]['insledcode'];
$sntexpledcode = '0'
$cancelflag  = 'Y'



 $query4= "insert into trnpur_salenote_trailer values('$snhseqno','$sno','$sntitemcode','$sntuom','$sntqty','$sntrate','$sntvalue',
'$sntcgstper','$sntcgstamt','$sntsgstper','$$sntsgstamt','$sntigstper','$sntigstamt','$sntfrieght','$sntinsper','$sntinsamt','$sntothers',
'$snttotamt','$sntpurledcode','$sntcgstledcode','$sntsgstledcode','$sntigstledcode','$sntfreightledcode','$sntinsledcode','$sntexpledcode','$cancelflag')";
 $result4=mysql_query($query4);            
  
}


        
if($result3 && $result4)
{
  mysql_query("COMMIT");                        
  echo '({"success":"true","saleno":"'.$snhno.'"})';
}
else
       {
echo '({"success":"false","saleno":"'.$salh_no.'"})';
	   


            mysql_query("ROLLBACK");            
            
        }   
        

       
 
?>
