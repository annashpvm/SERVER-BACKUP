<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$griddet = json_decode($_REQUEST['griddet'],true);

$rowcnt = $_POST['cnt'];
$savetype= $_POST['savetype'];

$woghcompcode =  $_POST['woghcompcode'];
$woghfincode =  $_POST['woghfincode'];
$woghno = $_POST['woghno'];
$woghdate = $_POST['woghdate'];
$woghdept = $_POST['woghdept'];
$woghsupcode = $_POST['woghsupcode'];
$woghbillno = $_POST['woghbillno'];
$woghbilldate = $_POST['woghbilldate'];

$woghwono = $_POST['woghwono'];
$woghwodate = $_POST['woghwodate'];
$woghwocode = $_POST['woghwocode'];

$woghvalue = $_POST['woghvalue'];
$woghdiscount = $_POST['woghdiscount'];
$woghotheramt = $_POST['woghotheramt'];
$woghlessamt  = $_POST['woghlessamt'];
$woghcgstamt = $_POST['woghcgstamt'];
$woghsgstamt = $_POST['woghsgstamt'];
$woghigstamt = $_POST['woghigstamt'];
$woghfrtamt1 = $_POST['woghfrtamt1'];
$woghfrtamt2 = $_POST['woghfrtamt2'];
$woghtotalamount = $_POST['woghtotalamount'];
$woghpriceterms = $_POST['woghpriceterms'];
$woghcreditdays = $_POST['woghcreditdays'];
$woghpayterms  = $_POST['woghpayterms'];
$woghcarrier = $_POST['woghcarrier'];
$woghremarks = $_POST['woghremarks'];
$woghdnno = $_POST['woghdnno'];
$woghdndate = $_POST['woghdndate'];
$woghfrt1party  = $_POST['woghfrt1party'];
$woghfrt2party  = $_POST['woghfrt2party'];
$woghtruck = $_POST['woghtruck'];
$woghgateeno = $_POST['woghgateeno'];
$woghgateedate = $_POST['woghgateedate'];
$woghaccupd = $_POST['woghaccupd'];
$woghaccvouno = $_POST['woghaccvouno'];
$woghaccvoudate = $_POST['woghaccvoudate'];
$cancelflag = $_POST['cancelflag'];



 mysql_query("BEGIN");

if ($savetype == "Add") {

     $query2 = "select IFNULL(max(wogh_no),0)+1 as wogh_no from trnpur_wogrn_header where wogh_fin_code = $woghfincode and wogh_comp_code=$woghcompcode";
     $result2= mysql_query($query2);
     $rec2 = mysql_fetch_array($result2);
     $woghno=$rec2['wogh_no'];


     $query3= "insert into  trnpur_wogrn_header values('$woghcompcode', '$woghfincode', '$woghno',  '$woghdate', '$woghdept','$woghsupcode', '$woghbillno',         '$woghbilldate','$woghwono','$woghwodate','$woghwocode', '$woghvalue',  '$woghdiscount', '$woghotheramt', '$woghlessamt','$woghcgstamt',  '$woghsgstamt',  '$woghigstamt','$woghfrtamt1', '$woghfrtamt2', '$woghtotalamount', '$woghpriceterms', '$woghcreditdays', '$woghpayterms', '$woghcarrier', '$woghremarks', '$woghdnno', '$woghdndate', '$woghfrt1party', '$woghfrt2party', '$woghtruck', '$woghgateeno', '$woghgateedate','$woghaccupd', '$woghaccvouno', '$woghaccvoudate', 0,'$cancelflag')";
 $result3=mysql_query($query3);
}
else
{

 $query2 = "delete from trnpur_wogrn_trailer where wogt_fin_code = $woghfincode and wogt_comp_code=$woghcompcode and wogt_no = $woghno";
 $result2= mysql_query($query2);


 $query3= "update trnpur_wogrn_header set  wogh_billno = '$woghbillno', wogh_billdate = '$woghbilldate' , wogh_value = '$woghvalue', wogh_discount = '$woghdiscount', wogh_other_amt='$woghotheramt', wogh_less_amt = '$woghlessamt', wogh_cgst_amt = '$woghcgstamt',  wogh_sgst_amt ='$woghsgstamt',  wogh_igst_amt = '$woghigstamt',wogh_frtamt1  = '$woghfrtamt1', wogh_frtamt2 = '$woghfrtamt2',wogh_totalamount= '$woghtotalamount', wogh_price_terms ='$woghpriceterms', wogh_credit_days='$woghcreditdays', wogh_pay_terms = '$woghpayterms', wogh_carrier = '$woghcarrier', wogh_remarks = '$woghremarks', wogh_dnno = '$woghdnno', wogh_dndate = '$woghdndate',wogh_frt1party =  '$woghfrt1party',wogh_frt2party= '$woghfrt2party',woh_truck = '$woghtruck', wogh_gate_eno = '$woghgateeno', wogh_gate_edate = '$woghgateedate' where  wogh_fin_code = $woghfincode and wogh_comp_code = $woghcompcode and wogh_no = '$woghno'";

//$query3= "update trnpur_wogrn_header set  wogh_billno = '$woghbillno' where  wogh_fin_code = $woghfincode and wogh_comp_code = $woghcompcode and wogh_no = '$woghno'";

 $result3=mysql_query($query3);
}


$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++)
{
$sno = $i + 1;
$wogtslno     = $griddet[$i]['sno'];
$wogtitemcode = $griddet[$i]['itemcode'];
$wogtunit     = $griddet[$i]['unit'];
$wogtrate     = $griddet[$i]['rate'];
$wogtqty      = $griddet[$i]['qty'];
$wogtvalue    = $griddet[$i]['val1'];
$wogtdis_per  = $griddet[$i]['dis'];
$wogtdis_amt  = $griddet[$i]['disval'];
$wogtother_amt = $griddet[$i]['otherval'];
$wogtcgst_per  = $griddet[$i]['cgst'];
$wogtcgst_amt  = $griddet[$i]['cgstval'];
$wogtsgst_per  = $griddet[$i]['sgst'];
$wogtsgst_amt  = $griddet[$i]['sgstval'];
$wogtigst_per  = $griddet[$i]['igst'];
$wogtigst_amt  = $griddet[$i]['igstval'];
$wogtamount    = $griddet[$i]['itemvalue'];
$wogthsn       = $griddet[$i]['hsn'];

$cancelflag = 0;


 $query4= "insert into  trnpur_wogrn_trailer values('$woghcompcode', '$woghfincode','$woghno','$wogtslno','$wogtitemcode','$wogtunit','$wogtrate','$wogtqty',
'$wogtvalue','$wogtdis_per','$wogtdis_amt','$wogtother_amt','$wogtcgst_per','$wogtcgst_amt','$wogtsgst_per','$wogtsgst_amt','$wogtigst_per',
'$wogtigst_amt','$wogtamount','$wogthsn','$cancelflag')";


 $result4=mysql_query($query4);  

}




if($result3 && $result4 )
{
            mysql_query("COMMIT");                        
            echo '({"success":"true","wogrn":"'.$woghno.'"})';
        }
        else
        {
            mysql_query("ROLLBACK");            
            echo '({"success":"false","wogrn":"'.$woghno.'"})';
        }   
        

       
 
?>
