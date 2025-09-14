<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$savetype = $_POST['savetype'];
$griddet = json_decode($_REQUEST['griddet'],true);

$rowcnt = $_POST['cnt'];

$po_seqno    = $_POST['poseqno'];
$ordhcompcode    = $_POST['compcode'];
$ordhfincode     = $_POST['finid'];
$ordhno          = $_POST['pono'];
$ordhdate        = $_POST['podate'];
$ordhrefno       = $_POST['refno'];
$ordhrefdate     = $_POST['refdate'];
$ordhsup_code    = $_POST['party'];
$ordhagent       = $_POST['agent'];
$bankacno       = $_POST['bankacno'];
$bankname       = $_POST['bankname'];
$bankcode       = $_POST['bankcode'];
$branchcode       = $_POST['branchcode'];
$swiftcode       = $_POST['swiftcode'];
$bankadd1       = $_POST['bankadd1'];
$bankadd2       = $_POST['bankadd2'];
$bankadd3       = $_POST['bankadd3'];
$payterms       = $_POST['payterms'];
$delyterms       = $_POST['delyterms'];
$country       = $_POST['country'];
$loadingport= $_POST['loadingport'];
$discharport = $_POST['discharport'];
$shipdetails    = $_POST['shipdetails'];
$delremarks   = $_POST['delremarks'];


$ordh_wt_per_container = $_POST['ordh_wt_per_container'];
$ordh_qty_diff         = $_POST['ordh_qty_diff'];
$ordh_shipping_line    = $_POST['ordh_shipping_line'];
$ordh_free_days        = $_POST['ordh_free_days'];
$ordh_moisture         = $_POST['ordh_moisture'];
$ordh_material         = $_POST['ordh_material'];
$ordh_local_charges     = $_POST['ordh_local_charges'];



$ordhlcdays   = 0;
$ordhnagodays   = 0;
$ordhcreditdays   = 0;


if ($savetype === "Add")
{

	 $query1 = "select IFNULL(max(ordh_seqno),0)+1 as po_seqno from trnirm_order_header";
	 $result1 = mysql_query($query1);
	 $rec1 = mysql_fetch_array($result1);
	 $po_seqno=$rec1['po_seqno'];

	 $query2 = "select IFNULL(max(ordh_no),0)+1 as po_no from trnirm_order_header where ordh_fincode = '$ordhfincode' and ordh_compcode='$ordhcompcode'";
	 $result2= mysql_query($query2);
	 $rec2   = mysql_fetch_array($result2);
	 $ordhno = $rec2['po_no'];

          mysql_query("BEGIN");



 $query3= "call  spirm_ins_orderheader( '$po_seqno','$ordhcompcode','$ordhfincode','$ordhno','$ordhdate','$ordhrefno','$ordhrefdate', '$ordhsup_code','$ordhagent','$payterms','$delyterms','$shipdetails','$country','$loadingport','$discharport','$ordhlcdays' , '$ordhnagodays','$ordhcreditdays','$delremarks','$bankacno','$bankname','$bankcode' ,'$branchcode','$swiftcode','$bankadd1','$bankadd2','$bankadd3',
'$ordh_wt_per_container','$ordh_qty_diff','$ordh_shipping_line','$ordh_free_days','$ordh_moisture','$ordh_material' ,'$ordh_local_charges')

)";
 $result3=mysql_query($query3);

//echo  $query3;
}

else
{

 $query3= "call  spirm_upd_orderheader( '$po_seqno','$ordhcompcode','$ordhfincode','$ordhno','$ordhdate','$ordhrefno','$ordhrefdate', '$ordhsup_code','$ordhagent','$payterms','$delyterms','$shipdetails','$country','$loadingport','$discharport','$ordhlcdays' , '$ordhnagodays','$ordhcreditdays','$delremarks','$bankacno','$bankname','$bankcode' ,'$branchcode','$swiftcode','$bankadd1','$bankadd2','$bankadd3',
'$ordh_wt_per_container','$ordh_qty_diff','$ordh_shipping_line','$ordh_free_days','$ordh_moisture','$ordh_material' ,'$ordh_local_charges')";
 $result3=mysql_query($query3);

//  echo  $query3;

  $query4= "delete from trnirm_order_trailer where ordt_hdseqno = '$po_seqno'";
  $result4=mysql_query($query4);
}



for ($i=0;$i<$rowcnt;$i++)
{
$sno = $i + 1;



$po_item_code = $griddet[$i]['itemcode'];
$po_ordqty    = $griddet[$i]['qty'];
$po_itemrate  = $griddet[$i]['rate'];
$val          = $griddet[$i]['value'];
$moisper      = 0;
$tareper      = 0;
$outthrow     = 0;
$prohibitive  = 0;

 $query4= "call spirm_ins_ordertrailer('$po_seqno','$sno','$po_item_code','$po_ordqty','0',0,'$po_ordqty',0,'$po_itemrate','$val','$moisper','$tareper','$outthrow','$prohibitive')";
 $result4=mysql_query($query4);            
  
//echo  $query4;
}



if( $result3 && $result4 )
{
            mysql_query("COMMIT");                        
            echo '({"success":"true","pono":"'.$ordhno.'"})';
        }
        else
        {
            mysql_query("ROLLBACK");            
          
	    echo '({"success":"false","pono":"' .$ordhno. '"})';
        }   
        

   
?>
