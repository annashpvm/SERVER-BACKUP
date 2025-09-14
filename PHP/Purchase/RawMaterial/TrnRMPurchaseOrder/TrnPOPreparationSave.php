<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$savetype        = $_POST['savetype'];     
$griddet         = json_decode($_REQUEST['griddet'],true);
$po_company_code = $_POST['po_company_code'];
$po_finid        = $_POST['po_finid'];
$rowcnt          = $_POST['cnt'];
$po_finid        = $_POST['po_finid'];
$po_date         = $_POST['po_date'];
$po_vendor_code  = $_POST['po_vendor_code'];
$po_terms        = $_REQUEST['po_terms'];
$po_transport_mode = $_POST['po_transport_mode'];
$po_paymode        = $_POST['po_paymode'];
$po_refno          = $_POST['po_refno'];
$po_refdate        = $_POST['po_refdate'];
$po_preparedby     = $_POST['po_preparedby'];


$creditdays        = $_POST['creditdays'];
$po_payterm        = $_POST['po_payterm'];
$tcsper            = (float)$_POST['tcsper'];
$cgstper           = $_POST['cgstper'];
$sgstper           = $_POST['sgstper'];
$igstper           = $_POST['igstper'];
$itemval           = $_POST['itemval'];
$roundoff          = $_POST['roundoff'];
$totval            = $_POST['totval'];
$wefdate           = $_POST['wefdate'];
$userid            = $_POST['userid'];
$po_seqno          = $_POST['poseqno'];
$po_no             = $_POST['pono'];
$potax             = $_POST['potax'];

mysql_query("BEGIN");

if ($savetype == "Add") {
	 $query1 = "select IFNULL(max(ordh_seqno),0)+1 as po_seqno from trnrm_order_header";
	 $result1 = mysql_query($query1);
	 $rec1 = mysql_fetch_array($result1);
	 $po_seqno=$rec1['po_seqno'];

	 $query2 = "select IFNULL(max(ordh_no),0)+1 as po_no from trnrm_order_header where ordh_fincode = '$po_finid' and ordh_compcode='$po_company_code'";
	 $result2= mysql_query($query2);
	 $rec2 = mysql_fetch_array($result2);
	 $po_no=$rec2['po_no'];


	 $query3 = "call  sprm_ins_orderheader('$po_seqno','$po_company_code','$po_finid','$po_no','$po_vendor_code','$po_date','$po_transport_mode',	'$po_paymode','$creditdays',
'$po_terms','$tcsper','$cgstper','$sgstper','$igstper','$totval','$roundoff','$totval','','$userid',CURDATE(), '$po_refno','$po_refdate','$po_preparedby',$potax,'$wefdate')";

//echo $query3;

	 $result3=mysql_query($query3);
}
else
{

	 $query3 = "update trnrm_order_header set  ordh_sup_code = '$po_vendor_code' , ordh_carriagetype = '$po_transport_mode' , ordh_terms = '$po_terms', ordh_paymode = '$po_paymode' , ordh_creditdays = '$creditdays',ordh_tcsper  = '$tcsper' , ordh_cgstper = '$cgstper' , ordh_sgstper = '$sgstper' , ordh_igstper = '$igstper' , ordh_itemvalue = '$totval', ordh_roundingoff = '$roundoff', ordh_totalvalue = '$totval' ,  ordh_refno = '$po_refno' ,ordh_refdate = '$po_refdate' ,ordh_preparedby =  '$po_preparedby' , ordh_wef = '$wefdate' where ordh_compcode  = '$po_company_code' and ordh_fincode = '$po_finid' and  ordh_seqno =  '$po_seqno'";

	 $result3=mysql_query($query3);

//echo $query3;
	 $query4 = "delete from trnrm_order_trailer where ordt_hdseqno =  '$po_seqno'";
	 $result4=mysql_query($query4);

}

for ($i=0;$i<$rowcnt;$i++)
{
$sno = $i + 1;
$po_areacode  = $griddet[$i]['areacode'];
$po_item_code = $griddet[$i]['itemcode'];
$po_ordqty    = $griddet[$i]['qty'];
$po_itemrate  = $griddet[$i]['unitrate'];
$val          = $griddet[$i]['value'];
$moisper      = (float)$griddet[$i]['moisture'];

if ($po_ordqty >0)
{
	 $query4 = "call sprm_ins_ordertrailer('$po_seqno','$sno',$po_areacode,'$po_item_code','$po_ordqty','0',0,'$po_ordqty','$po_itemrate','$val','$moisper','',0,NULL,'$wefdate')";
	 $result4=mysql_query($query4);    

//	echo $query4;
}       
 }



     
if( $result3 && $result4 )
{
            mysql_query("COMMIT");                        
            echo '({"success":"true","pono":"'.$po_no.'"})';
        }
        else
        {
            mysql_query("ROLLBACK");            
          
	    echo '({"success":"false","pono":"' .$po_no. '"})';
        }   
        

       
 
?>
