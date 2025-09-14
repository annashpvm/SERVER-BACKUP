<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();
$griddet = json_decode($_POST['griddet'],true);
$rowcnt = $_POST['cnt'];
$snhcompcode = $_POST['snhcompcode'];
$snhfincode = $_POST['snhfincode'];
$snhdate = $_POST['snhdate'];
$snhcustcode = $_POST['snhcustcode'];
$snhpaymode = $_POST['snhpaymode'];
$snhtransport = $_POST['snhtransport'];
$snhvehno = $_POST['snhvehno'];
$snhremarks = $_POST['snhremarks'];
$ourref = $_POST['ourref'];
$partyref = $_POST['partyref'];

 $query2 = "select IFNULL(max(os_docno),0)+1 as os_snh_no from trnpur_other_sales where os_fincode = $snhfincode and os_compcode='$snhcompcode'";
 $result2= mysql_query($query2);
 $rec2 = mysql_fetch_array($result2);
 $snhno=$rec2['os_snh_no'];

 mysql_query("BEGIN");

$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++)
{
$sno = $i + 1;
$sntsno = $griddet[$i]['sntsno'];
$sntitemcode = $griddet[$i]['itemcode'];
$sntqty = $griddet[$i]['qty'];
$sntrate = $griddet[$i]['unitrate'];
$sntvalue = $griddet[$i]['amount'];
$sntothers = $griddet[$i]['others'];
$taxable = $griddet[$i]['taxablevalue'];
$sntcgstper = $griddet[$i]['cgstper'];
$sntcgstamt = $griddet[$i]['cgstval'];
$sntsgstper = $griddet[$i]['sgstper'];
$$sntsgstamt = $griddet[$i]['sgstval'];
$sntigstper = $griddet[$i]['igstper'];
$sntigstamt = $griddet[$i]['igstval'];
$snttotamt = $griddet[$i]['totamt'];
$editqty = $griddet[$i]['editcode'];

$query4= "insert into trnpur_other_sales values('$snhcompcode','$snhfincode','$snhno','$snhdate','$snhcustcode','$sntitemcode','$sntrate','$sntqty','$sntvalue','$sntothers','$taxable',
'$sntcgstper','$sntcgstamt','$sntsgstper','$sntsgstamt','$sntigstper','$sntigstamt','$snttotamt','$snhpaymode','$snhtransport','$snhvehno','$snhremarks','$ourref','$partyref','N','','')";
 $result4=mysql_query($query4);            
  
}


        
if($result4)
{
  mysql_query("COMMIT");                        
  echo '({"success":"true","saleno":"'.$snhno.'"})';
}
else
       {
echo '({"success":"false","saleno":"'.$snhno.'"})';
	   


            mysql_query("ROLLBACK");            
            
        }   
        

       
 
?>
