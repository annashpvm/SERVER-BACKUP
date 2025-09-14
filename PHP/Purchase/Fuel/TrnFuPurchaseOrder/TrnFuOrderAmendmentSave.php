<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();


$amendgriddet    = json_decode($_REQUEST['amendgriddet'],true);
$amendrowcnt     = $_POST['amendcnt'];


$amdno           = $_REQUEST['amdno'];
$amddate         = $_REQUEST['amddate'];
$savetype        = $_POST['savetype'];     
$griddet         = json_decode($_REQUEST['griddet'],true);
$po_company_code = $_POST['po_company_code'];
$po_finid        = $_POST['po_finid'];
$rowcnt          = $_POST['cnt'];
$po_finid        = $_POST['po_finid'];
$po_date         = $_POST['po_date'];
$po_vendor_code  = $_POST['po_vendor_code'];
$po_terms         = $_REQUEST['po_terms'];
$po_transport_mode = $_POST['po_transport_mode'];
$po_paymode        = $_POST['po_paymode'];
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
$amendno           = $_POST['amendno'];
$porows            = $_POST['porows'];

mysql_query("BEGIN");


//Insert the PO tailer Tables
for ($i=0;$i<$rowcnt;$i++)
{

$slno         = $griddet[$i]['slno'];
$po_areacode  = $griddet[$i]['areacode'];
$po_item_code = $griddet[$i]['itemcode'];
$po_ordqty    =  (float)$griddet[$i]['qty'];
$po_itemrate  =  (float)$griddet[$i]['unitrate'];
$val          =  (float)$griddet[$i]['value'];
$mois         = (float)$griddet[$i]['mois'];
$fines        = (float)$griddet[$i]['fines'];
$sand         = (float)$griddet[$i]['sand'];
$oldnew       = $griddet[$i]['oldnew'];
$amend         = $griddet[$i]['amend'];

if ($oldnew  == 'N')
{
	  $porows = $porows + 1;
        $query4= "call spfu_ins_ordertrailer($po_seqno,$sno,$areacode ,$po_item_code,'$po_ordqty','0','0','$po_ordqty', '$po_itemrate','$val','$mois','$fines','$sand','$wefdate')";

 	 $result3 = mysql_query($query3);

//	echo $query3;
//	echo "<br>";
}

if ($amend  == 'Y')
{
	 $query3 = "update trnfu_order_trailer set ordt_status = 'A' where ordt_hdseqno = '$po_seqno' and ordt_seqno = $slno and ordt_item_code = $po_item_code";
 	 $result3 = mysql_query($query3);

//	echo $query3;
//	echo "<br>";
}


}







for ($i=0;$i<$amendrowcnt;$i++)
{
$porows = $porows + 1;

$po_areacode  = $amendgriddet[$i]['areacode'];
$po_item_code = $amendgriddet[$i]['itemcode'];
$po_ordqty    =  (float)$amendgriddet[$i]['qty'];
$po_itemrate  =  (float)$amendgriddet[$i]['rate'];
$val          =  (float)$amendgriddet[$i]['value'];
$mois         =  (float)$griddet[$i]['mois'];
$fines        =  (float)$griddet[$i]['fines'];
$sand         =  (float)$griddet[$i]['sand'];
$wefdate      =  $amendgriddet[$i]['wef'];

 $query3 = "call spfu_ins_ordertrailer('$po_seqno','$porows',$po_areacode,'$po_item_code','$po_ordqty','0',0,'$po_ordqty','$po_itemrate','$val','$mois','$fines','$sand',$amendno,'$wefdate')";


//	echo $query3;
//	echo "<br>";

 $result3 = mysql_query($query3);
}



if( $result3 )
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
