<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConndpm.php");

session_start();
$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_REQUEST['cnt'];

$min_company_code = $_REQUEST['min_company_code'];
$min_company_code = $_REQUEST['min_finid'];
$min_date = $_REQUEST['min_date'];
$po_duedate = $_REQUEST['po_duedate'];
$po_vendor_code = $_REQUEST['po_vendor_code'];
$po_quotation_no = $_REQUEST['po_quotation_no'];
$po_quotation_compno = $_REQUEST['po_quotation_compno'];
$po_follower_id = $_REQUEST['po_follower_id'];
$po_currency_code = $_REQUEST['po_currency'];
$po_exciseval = $_REQUEST['po_exciseval'];
$po_sedval = $_REQUEST['po_sedval'];
$po_tngstval = $_REQUEST['po_tngstval'];
$po_cstval = $_REQUEST['po_cstval'];
$po_othersval = $_REQUEST['po_othersval'];
$po_discount = $_REQUEST['po_discount'];
$po_grossvalue = $_REQUEST['po_grossvalue'];
$po_netvalue = $_REQUEST['po_netvalue'];
$po_delivery_days = $_REQUEST['po_delivery_days'];
$po_delivery_place = $_REQUEST['po_delivery_place'];
$po_payterm = $_REQUEST['po_payterm'];
$po_transport_mode = $_REQUEST['po_transport_mode'];
$po_modvat = $_REQUEST['po_modvat'];
$po_insurance= $_REQUEST['po_insurance'];
$po_incidentcharge_flag= $_REQUEST['po_incidentcharge_flag'];
$po_guarantee= $_REQUEST['po_guarantee'];
$po_freight_flag= $_REQUEST['po_freight_flag'];
$po_remarks= $_REQUEST['po_remarks'];
$po_excise_per= $_REQUEST['po_excise_per'];
$po_sed_per= $_REQUEST['po_sed_per'];
$po_tngst_per= $_REQUEST['po_tngst_per'];
$po_cst_per= $_REQUEST['po_cst_per'];
$po_others_per= $_REQUEST['po_others_per'];
$po_discount_per= $_REQUEST['po_discount_per'];
$po_logo_code= $_REQUEST['po_logo_code'];
$po_handling= $_REQUEST['po_handling'];
$po_fright= $_REQUEST['po_fright'];
$potype= $_REQUEST['potype'];


$po_igstvalue= $_REQUEST['po_igst_value'];
$po_sgstvalue= $_REQUEST['po_sgst_value'];
$po_cgstvalue= $_REQUEST['po_cgst_value'];

 $query1 = "select IFNULL(max(po_seqno),0)+1 as po_seqno from hometexstorespoheader";
 $result1 = mysql_query($query1);
 $rec1 = mysql_fetch_array($result1);
 $po_seqno=$rec1['po_seqno'];

 $query2 = "select IFNULL(max(po_no),0)+1 as po_no from hometexstorespoheader where po_finid = '$po_finid' and po_company_code='$po_company_code'";
 $result2= mysql_query($query2);
 $rec2 = mysql_fetch_array($result2);
 $po_no=$rec2['po_no'];

 mysql_query("BEGIN");
 
 if ($po_seqno > 0 && $po_no > 0 && $po_finid > 0 && $po_company_code > 0)
 { 
 $query3= "call stores_sp_trn_inspo_headergst('$po_seqno','$po_no','$po_company_code',
                            '$po_finid','$po_date','$po_duedate','$po_vendor_code',
                            '0','$po_quotation_no','$po_quotation_compno','$po_follower_id',
                            '$po_currency_code','$po_exciseval','$po_sedval',
                            '$po_tngstval','$po_cstval','$po_othersval','$po_discount',
                            '$po_grossvalue','$po_netvalue','$po_delivery_days',
                            '$po_delivery_place','$po_payterm','$po_transport_mode',
                            '$po_modvat','$po_insurance','$po_incidentcharge_flag',
                            '$po_guarantee','$po_freight_flag','$po_remarks',
                            '$po_excise_per','$po_sed_per','$po_tngst_per',
                            '$po_cst_per','$po_others_per','$po_discount_per',
                            '$po_logo_code','$po_handling','$po_fright',
                            '$po_igstvalue','$po_sgstvalue','$po_cgstvalue')";
 $result3=mysql_query($query3);

$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++){
$sno = $i + 1;
//$po_serialno = $griddet[$i]['slno'];
$po_storeind_seqno = $griddet[$i]['indseqno'];
$po_dept_code = $griddet[$i]['deptcode'];
$po_item_code = $griddet[$i]['itemseq'];
$po_item_remarks = $griddet[$i]['itemremarks'];
$po_taxtype=$griddet[$i]['taxtype'];
$po_ordqty = $griddet[$i]['reqqty'];
$po_itemrate = $griddet[$i]['unitrate'];
$po_qoseqno= $griddet[$i]['qoseqno'];
$po_currency=$griddet[$i]['currency'];
$po_exrate=$griddet[$i]['exrate'];

$po_igstper=$griddet[$i]['igstper'];
$po_igstval=$griddet[$i]['igstvalue'];
$po_sgstper=$griddet[$i]['sgstper'];
$po_sgstval=$griddet[$i]['sgstvalue'];
$po_cgstper=$griddet[$i]['cgstper'];
$po_cgstval=$griddet[$i]['cgstvalue'];

$po_disper=$griddet[$i]['discper'];
$po_disval=$griddet[$i]['discvalue'];
$po_disflag=$griddet[$i]['disflag'];
$poseqno=$griddet[$i]['poseqno'];

     
 $query4= "call stores_sp_trn_inspo_trailergst('$po_seqno','$sno','$poseqno',
                            '0','0','$po_dept_code','$po_item_code','$po_item_remarks',
                            '$po_taxtype','$po_ordqty','0','$po_itemrate','0','0','0',
                            '0','P','$po_qoseqno','$po_currency','$po_exrate',
                            '$po_igstper','$po_igstval','$po_sgstper','$po_sgstval',
                            '$po_cgstper','$po_cgstval','$po_disper','$po_disval','$po_disflag','$potype')";
 $result4=mysql_query($query4);            
  
   if ($result4){
    $inscnt = $inscnt + 1;
    }
    
if($result3 && $result4)
{
            mysql_query("COMMIT");                        
            echo '({"success":"true","pono":"'.$po_no.'"})';
        }
        else
        {
            mysql_query("ROLLBACK");            
            echo '({"success":"false","pono":"'.$po_no.'"})';
        }   
        

       
 
?>
