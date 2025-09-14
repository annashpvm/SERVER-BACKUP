<?php

require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$griddet = json_decode($_REQUEST['griddet'],true);

$po_company_code = $_POST['po_company_code'];
$po_finid = $_POST['po_finid'];
$savetype 		= $_POST['savetype'];

$rowcnt 		= $_POST['cnt'];
$po_finid 		= $_POST['po_finid'];

$po_vendor_code 	= $_POST['po_vendor_code'];

$po_no   		= $_POST['po_no'];
$po_date 		= $_POST['po_date'];

$porefno         	= $_POST['porefno'];
$porefdate 		= $_POST['porefdate'];


$orderterms             = substr(trim($_POST['orderterms']),0,99);

$po_transport_mode 	= $_POST['po_transport_mode'];
$po_paymode 		= $_POST['po_paymode'];
$creditdays 		= $_POST['creditdays'];

$remarks 		= $_POST['remarks'];

$cgstper 		= (float)$_POST['cgstper'];
$sgstper 		= (float)$_POST['sgstper'];
$igstper 		= (float)$_POST['igstper'];

$itemval 		= (float)$_POST['itemval'];
$roundoff 		= (float)$_POST['poroundoff'];


$totval 		= $_POST['totval'];
$userid 		= (int)$_POST['userid'];
$entrydate 		= $_POST['entrydate'];
$wefdate 		= $_POST['wefdate'];

$handlingcgst		= (float)$_POST['handlingcgst'];
$handlingsgst		= (float)$_POST['handlingsgst'];

$handlingmt		= (float)$_POST['handlingmt'];
$gcvadb 		= $_POST['gcvadb'];
$gcvadb_tot 		= $_POST['gcvadb_tot'];
$gcvarb 		= $_POST['gcvarb'];
$gcvarb_tot 		= $_POST['gcvarb_tot'];


$moispercentage		= $_POST['moispercentage'];
$moistolarance 		= $_POST['moistolarance'];
$inh_mois 		= $_POST['inh_mois'];
$fixedcarbon 		= $_POST['fixedcarbon'];

$ash 			= $_POST['ash'];
$tcsp 			= (float)$_POST['tcsp'];
$sulpher 		= $_POST['sulpher'];
$volmatr 		= $_POST['volmatr'];
$fusize 		= $_POST['fusize'];
$vessal			= $_POST['vessal'];
$cessmt 		= (float)$_POST['cessmt'];
$po_seqno               = $_POST['po_seqno'];
$indpreparedby          = $_POST['indpreparedby'];

$purledger              = $_POST['purledger'];
$roundneed              = $_POST['roundneed'];




 mysql_query("BEGIN");
 if ($savetype == "Add")
 {

 $query1 = "select IFNULL(max(ordh_seqno),0)+1 as po_seqno from trnfu_order_header";
 $result1 = mysql_query($query1);
 $rec1 = mysql_fetch_array($result1);
 $po_seqno=$rec1['po_seqno'];

 $query2 = "select IFNULL(max(ordh_no),0)+1 as po_no from trnfu_order_header where ordh_fincode = '$po_finid' and ordh_compcode = '$po_company_code'";
 $result2= mysql_query($query2);
 $rec2 = mysql_fetch_array($result2);
 $po_no=$rec2['po_no'];

$query3 ="call spfu_ins_orderheader('$po_seqno','$po_company_code','$po_finid','$po_no','$po_date','$po_vendor_code','$porefno', '$porefdate','$orderterms','$po_transport_mode','$po_paymode','$creditdays', '$remarks','$cgstper','$sgstper','$igstper' ,'$cessmt','$handlingmt','$handlingcgst','$handlingsgst','$tcsp',  '$roundoff','$totval', 'O','N','0','$userid','$entrydate','$wefdate',  '$moispercentage','$moistolarance','$inh_mois','$volmatr','$fixedcarbon', '$sulpher','$gcvadb','$gcvadb_tot','$gcvarb','$gcvarb_tot','$ash','$vessal','$fusize' ,'$purledger','$roundneed')";

//echo $query3;           
//echo "<br>";

 $result3 = mysql_query($query3);
}
else
{
$query3 ="call spfu_update_order('$po_seqno','$po_company_code','$po_finid','$po_no','$po_date','$po_vendor_code','$porefno', '$porefdate','$orderterms','$po_transport_mode','$po_paymode','$creditdays', '$remarks','$cgstper','$sgstper','$igstper' ,'$cessmt','$handlingmt','$handlingcgst','$handlingsgst','$tcsp',  '$roundoff','$totval', 'N','N','0','$userid','$entrydate','$wefdate',  '$moispercentage','$moistolarance','$inh_mois','$volmatr','$fixedcarbon', '$sulpher','$gcvadb','$gcvadb_tot','$gcvarb','$gcvarb_tot','$ash','$vessal','$fusize','$purledger','$roundneed')";

 $result3 = mysql_query($query3);

// echo $query3;         
// echo "<br>";



}


 
// echo $query3;


$inscnt = 0;

for ($i=0;$i<$rowcnt;$i++)
{
	$sno = $i + 1;

	$areacode     = $griddet[$i]['areacode'];
	$po_item_code = $griddet[$i]['itemcode'];
	$po_ordqty    = $griddet[$i]['qty'];
	$po_itemrate  = $griddet[$i]['unitrate'];
	$val          = $griddet[$i]['totvalue'];
	$mois         = $griddet[$i]['mois'];
	$fines        = $griddet[$i]['fines'];
	$sand         = $griddet[$i]['sand'];


        $query4= "call spfu_ins_ordertrailer($po_seqno,$sno,$areacode ,$po_item_code,'$po_ordqty','0','0','$po_ordqty', '$po_itemrate','$val','$mois','$fines','$sand',0,'$wefdate')";
	$result4=mysql_query($query4); 

//echo $query4;           
//echo "<br>";

}




 if ($savetype == "Add") {
	if( $result3 && $result4 )
	{
            mysql_query("COMMIT");                        
            echo '({"success":"true","pono":"'.$po_no.'"})';
        }
        else
        {
            mysql_query("ROLLBACK");            
          
	    echo '({"success":"false","pono":"' . $po_no . '"})';
        }  
}
else {
        
	if($result3 && $result4 )
	{
            mysql_query("COMMIT");                        
            echo '({"success":"true","pono":"'.$po_no.'"})';
        }
        else
        {
            mysql_query("ROLLBACK");            
          
	    echo '({"success":"false","pono":"' . $po_no . '"})';
        }   
        
}

       
 
?>
