<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();
$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_POST['cnt'];
$savetype     = $_POST['savetype'];
$wohcompcode = $_POST['wohcompcode'];
$wohfincode = $_POST['wohfincode'];
$wohno   = $_POST['wohno'];
$wohdate = $_POST['wohdate'];
$wohdept = $_POST['wohdept'];
$wohtype = $_POST['wohtype'];
$wohsupcode = $_POST['wohsupcode'];
$wohref = $_POST['wohref'];
$wohrefdate = $_POST['wohrefdate'];
$wohwocode = $_POST['wohwocode'];
$wohvalue = (float) $_POST['wohvalue'];
$wohlabourtype = $_POST['wohlabourtype'];
$wohlabouramt = (float)$_POST['wohlabouramt'];
$wohdiscount = (float)$_POST['wohdiscount'];
$wohdiscsttype = $_POST['wohdiscsttype'];
$wohsertax = (float) $_POST['wohsertax'];
$wohsertaxamt = (float)$_POST['wohsertaxamt'];

$woheduper = (float)$_POST['woheduper'];
$woheduamt = (float)$_POST['woheduamt'];
$wohsheper = (float)$_POST['wohsheper'];
$wohsheamt = (float)$_POST['wohsheamt'];
$wohtransrate = (float)$_POST['wohtransrate'];
$wohtransamt = (float)$_POST['wohtransamt'];
$wohotheramt = (float)$_POST['wohotheramt'];
$wohamount = (float)$_POST['wohamount'];
$wohlessamt = (float)$_POST['wohlessamt'];
$wohcgstper = (float)$_POST['wohcgstper'];
$wohcgstamt = (float)$_POST['wohcgstamt'];
$wohsgstper = (float)$_POST['wohsgstper'];
$wohsgstamt = (float)$_POST['wohsgstamt'];
$wohigstper = (float)$_POST['wohigstper'];
$wohigstamt = (float)$_POST['wohigstamt'];
$wohlabcgstper = (float)$_POST['wohlabcgstper'];
$wohlabcgstamt = (float)$_POST['wohlabcgstamt'];
$wohlabsgstper = (float)$_POST['wohlabsgstper'];
$wohlabsgstamt = (float)$_POST['wohlabsgstamt'];
$wohlabigstper = (float)$_POST['wohlabigstper'];
$wohlabigstamt = (float)$_POST['wohlabigstamt'];
$wohpriceterms = $_POST['wohpriceterms'];
$wohpayterms   = $_POST['wohpayterms'];
$wohcreditdays = (int)$_POST['wohcreditdays'];
$wohremarks    = $_POST['wohremarks'];
$wohdcneeded   = $_POST['wohdcneeded'];
$wohstartdate  = $_POST['wohstartdate'];
$wohenddate    = $_POST['wohenddate'];
$wohfrtamt1    = (float)$_POST['wohfrtamt1'];
$wohfrtamt2    = (float)$_POST['wohfrtamt2'];
$wohfrtparty1  = $_POST['wohfrtparty1'];
$wohfrtparty2  = $_POST['wohfrtparty2'];
$cancelflag = $_POST['cancelflag'];
 
 mysql_query("BEGIN");
if ($savetype == "Add") {
 $query1 = "select IFNULL(max(woh_no),0)+1 as woh_no from trnpur_workorder_header where woh_fin_code = $wohfincode and woh_comp_code=$wohcompcode";
 $result1 = mysql_query($query1);
 $rec1 = mysql_fetch_array($result1);
 $wohno=$rec1['woh_no'];


 $query = "select IFNULL(max(woh_seqno),0)+1 as woh_seqno from trnpur_workorder_header";
 $result = mysql_query($query);
 $rec = mysql_fetch_array($result);
 $wohseqno=$rec['woh_seqno'];


 $query3= "insert into trnpur_workorder_header values('$wohcompcode','$wohfincode','$wohno','$wohseqno','$wohdate','$wohdept','$wohtype','$wohsupcode','$wohref','$wohrefdate','$wohwocode',
'$wohvalue','$wohlabourtype','$wohlabouramt','$wohdiscount','$wohdiscsttype','$wohsertax','$wohsertaxamt','$woheduper','$woheduamt','$wohsheper',
'$wohsheamt','$wohtransrate','$wohtransamt','$wohotheramt','$wohlessamt','$wohamount','$wohcgstper','$wohcgstamt','$wohsgstper','$wohsgstamt',
'$wohigstper','$wohigstamt','$wohlabcgstper','$wohlabcgstamt','$wohlabsgstper','$wohlabsgstamt','$wohlabigstper','$wohlabigstamt','$wohpriceterms',
'$wohpayterms','$wohcreditdays','$wohremarks','$wohfrtamt1','$wohfrtamt2','$wohfrtparty1','$wohfrtparty2','$wohdcneeded','$wohstartdate','$wohenddate','$cancelflag')";
 $result3=mysql_query($query3);

echo $query3;

}
else
{

 $query = "select * from trnpur_workorder_header  where woh_fin_code = $wohfincode and woh_comp_code= $wohcompcode and woh_no =  $wohno ";
 $result = mysql_query($query);
 $rec = mysql_fetch_array($result);
 $wohseqno=$rec['woh_seqno'];

 $query = "delete from trnpur_workorder_trailer  where wot_hdseqno =  $wohseqno";
 $result = mysql_query($query);

/*
 $query3 = "update trnpur_workorder_header set woh_dept = $wohdepte',
,woh_less_amt = $wohlessamt,woh_amount = $wohamountt,woh_price_terms = $wohpriceterms,woh_pay_terms =$wohpayterms,woh_credit_days = $wohcreditdays,woh_remarks  = $wohdcneede ,woh_startdate ='$wohstartdate',woh_enddate   = '$wohenddate' where woh_fin_code = $wohfincode and woh_comp_code= $wohcompcode and woh_no =  $wohno";
*/
//

 $query3 = "update trnpur_workorder_header set woh_dept = $wohdept,woh_sup_code = $wohsupcode,woh_ref = '$wohref',woh_refdate = '$wohrefdate' , woh_wocode = $wohwocode,woh_value =$wohvalue,woh_discount  = $wohdiscount,woh_other_amt =$wohotheramt ,woh_disc_st_type = '$wohdiscsttype',woh_less_amt = '$wohlessamt',
woh_amount = '$wohamount' ,woh_price_terms = '$wohpriceterms',woh_pay_terms ='$wohpayterms',woh_credit_days = $wohcreditdays,woh_remarks  = '$wohremarks',
woh_frt_amt1 = '$wohfrtamt1', woh_frt_amt2 = '$wohfrtamt2', woh_frt_party1 = '$wohfrtparty1',woh_frt_party2 = '$wohfrtparty2',
woh_startdate ='$wohstartdate',woh_enddate   = '$wohenddate' where woh_fin_code = $wohfincode and woh_comp_code= $wohcompcode and woh_no =  $wohno";


 $result3 = mysql_query($query3);

}

 

for ($i=0;$i<$rowcnt;$i++)
{


 
$wotslno=  $griddet[$i]['slno']; // $rowcnt;
$wotitemcode= $griddet[$i]['itemcode'];
$wotunit= $griddet[$i]['uom'];
$wotrate= $griddet[$i]['rate'];
$wotqty = $griddet[$i]['woqty'];
$wotdcraised= '';
$wotrecd= '0.00';
$wotvalue = (float)$griddet[$i]['val'];
$wotdisper= (float)$griddet[$i]['discountper'];
$wotdisamt= (float)$griddet[$i]['discountval'];
$wotedper= '0.00';
$wotedamt= '0.00';
$wotecessper= '0.00';
$wotecessamt= '0.00';
$wotshecessper= '0.00';
$wotshecessamt= '0.00';
$wotvatper= '0.00';
$wotcstper= '0.00';
$wottaxamt= '0.00';
$wototheramt= (float)$griddet[$i]['otherval'];
$wotcenvat= 'N';
$wotvat= 'N';
$wotcgstper= (float)$griddet[$i]['cgstper'];
$wotcgstamt= (float)$griddet[$i]['cgstval'];
$wotsgstper= (float)$griddet[$i]['sgstper'];
$wotsgstamt= (float)$griddet[$i]['sgstval'];
$wotigstper= (float)$griddet[$i]['igstper'];
$wotigstamt= (float)$griddet[$i]['igstval'];
$wotamount=  (float)$griddet[$i]['totalamount'];
$cancelflag='0.00';



$query4= "insert into trnpur_workorder_trailer values('$wohseqno','$wotslno','$wotitemcode','$wotunit','$wotrate','$wotqty' ,'$wotdcraised',
'$wotrecd','$wotvalue','$wotdisper','$wotdisamt','$wotedper','$wotedamt','$wotecessper','$wotecessamt','$wotshecessper','$wotshecessamt',
'$wotvatper','$wotcstper','$wottaxamt','$wototheramt','$wotcenvat','$wotvat','$wotcgstper','$wotcgstamt','$wotsgstper','$wotsgstamt','$wotigstper',
'$wotigstamt','$wotamount','$cancelflag')";

$result4=mysql_query($query4);            
echo $query4;  
}


      
if($result3 && $result4 )
{
            mysql_query("COMMIT");                        
            echo '({"success":"true","wono":"'.$wohno.'"})';
        }
        else
        {
            mysql_query("ROLLBACK");            
          
	    echo '({"success":"false","wono":"' . $wohno . '"})';
        }   
        

       
 
?>
