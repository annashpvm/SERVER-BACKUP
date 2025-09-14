<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();

$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_POST['cnt'];
$savetype      = $_POST['savetype'];
$pono          = $_POST['phdpono'];
$phdcompcode   = $_POST['phdcompcode'];
$phddept       = $_POST['phddept'];
$phdpodate     = $_POST['phdpodate'];
$phdfincode    = $_POST['phdfincode'];
$phdsupcode    = $_POST['phdsupcode'];
$phdcreditdays =  (float) $_POST['phdcreditdays'];
$phdtransport  = $_REQUEST['phdtransport'];
$phdpayterms   = substr(trim($_POST['phdpayterms']),0,39);



$phdinsterms   = $_POST['phdinsterms'];
$phddelypoint   = substr(trim($_POST['phddelypoint']),0,39);


$otherrefer    = $_POST['otherrefer'];
$otherrefer   = substr(trim($_POST['otherrefer']),0,39);

$phdfrtterms   = $_POST['phdfrtterms'];
$phdsplinstruction    = $_POST['phdsplinstruction'];
$phdadvance    =   (float) $_POST['phdadvance'];
$phdroundoff      =  (float)   $_POST['phdroundoff'];
$phdtotal         =  $_POST['phdtotal'];
$phdamndstatus    =  $_POST['phdamndstatus'];
$phdcancelstatus  =  $_POST['phdcancelstatus'];
$phdcancelreason  =  $_POST['phdcancelreason'];
$phdrefno         =  $_POST['phdrefno'];
$phdvaldays       =   (float)  $_POST['phdvaldays'];
$phdbank          =  $_POST['phdbank'];
$phdtol           =  (float) $_POST['phdtol'];
$phdentdate       =  $_POST['phdentdate'];
$phdpartyrefno    =  $_POST['phdpartyrefno'];
$phdpartyrefdate  =  $_POST['phdpartyrefdate'];
$phdpaymentinfo   =  $_POST['phdpaymentinfo'];
$phditeminfo      =  $_POST['phditeminfo'];

$preparedby       =  (int) $_POST['preparedby'];

$phddeliverydate  =  $_POST['phddeliverydate'];
$phdfreight       =  $_POST['phdfreight'];

$roundneed        =  $_POST['roundneed'];



 mysql_query("BEGIN");

$cnt =0;

if ($savetype == "Add") {


//     $query1 = "select ifnull(max(phd_pono),0)+1 as phd_pono from trnpur_purchase_header where phd_comp_code = $phdcompcode and phd_fin_code = $phdfincode";

     $query1 = "select ifnull(max(cast(phd_pono as unsigned)),0)+1 as phd_pono from trnpur_purchase_header where phd_comp_code = $phdcompcode and phd_fin_code = $phdfincode";

     $result1 = mysql_query($query1);
     $rec1 = mysql_fetch_array($result1);
     $pono=$rec1['phd_pono'];

/*
     $query1 = "select count(*) as nos from trnpur_purchase_header where phd_comp_code = $phdcompcode and phd_fin_code = $phdfincode and phd_pono = '$pono'";

//echo $query1;
//echo "<br>";

     $result1 = mysql_query($query1);
     $rec1 = mysql_fetch_array($result1);
     $cnt =$rec1['nos'];

//echo $cnt;
//echo "<br>";
*/

     $query3= "insert into trnpur_purchase_header 
(phd_comp_code, phd_pono, phd_fin_code, phd_podate, phd_dept, phd_sup_code, phd_credit_days, phd_transport, phd_pay_terms, phd_dely_point, phd_other_ref, phd_spl_instruction, phd_advance, phd_roundoff, phd_total, phd_amnd_status, phd_cancel_status, phd_cancel_reason, phd_tol, phd_ent_date, phd_party_refno, phd_party_refdate, phd_prepared_by, phd_deliverydate, phd_freight, phd_round_needed, phd_amend_no, phd_amend_date)
values('$phdcompcode','$pono','$phdfincode','$phdpodate', $phddept, '$phdsupcode','$phdcreditdays' ,'$phdtransport' ,'$phdpayterms','$phddelypoint','$otherrefer','$phdsplinstruction','$phdadvance', '$phdroundoff','$phdtotal','$phdamndstatus','$phdcancelstatus','$phdcancelreason','$phdtol','$phdentdate','$phdpartyrefno','$phdpartyrefdate','$preparedby','$phddeliverydate',
'$phdfreight','$roundneed',0,'$phdpodate')";
     $result3=mysql_query($query3);

//echo $query3;
//echo "<br>";
}


else
{

     $query3= "update trnpur_purchase_header set phd_sup_code = '$phdsupcode', phd_podate = '$phdpodate',phd_credit_days = '$phdcreditdays', phd_transport = '$phdtransport', phd_pay_terms = '$phdpayterms',phd_dely_point = '$phddelypoint', phd_other_ref = '$otherrefer', phd_spl_instruction = '$phdsplinstruction', phd_advance = '$phdadvance', phd_roundoff = '$phdroundoff', phd_total = '$phdtotal', phd_tol = '$phdtol' , phd_party_refno = '$phdpartyrefno', phd_party_refdate = '$phdpartyrefdate' , phd_prepared_by  = '$preparedby' , phd_deliverydate = '$phddeliverydate' , phd_freight = '$phdfreight' , phd_round_needed = '$roundneed' , phd_dept = '$phddept'  where  phd_comp_code = '$phdcompcode' and  phd_pono = '$pono' and  phd_fin_code = '$phdfincode'";

     $result3=mysql_query($query3);

//echo $query3;
//echo "<br>";


$query4= "update trnpur_indent,trnpur_purchase_trailer set  ind_po_qty =  ind_po_qty - ptr_ord_qty where ind_comp_code =ptr_comp_code and ind_fin_code = ptr_fin_code and  ptr_ind_no = ind_no and  ptr_ind_fin_code = ind_fin_code and  ptr_item_code = ind_item_code and ptr_comp_code = '$phdcompcode' and ptr_fin_code = '$phdfincode' and ptr_pono =  '$pono'";

     $result4 = mysql_query($query4);


    $query5= "delete from trnpur_purchase_trailer where ptr_comp_code = '$phdcompcode' and ptr_fin_code = '$phdfincode' and ptr_pono =  '$pono'";
    $result5 = mysql_query($query5);


}

for ($i=0;$i<$rowcnt;$i++)
{
  $ptritem_code  = (int) $griddet[$i]['itemcode'];
  $ptrslno       = $i+1;
  $ptrunit_rate  = $griddet[$i]['unitrate'];
  $ptrord_qty    = $griddet[$i]['ordqty'];
  $ptrrec_qty    = '0';



  $ptrdiscount   =  (float)$griddet[$i]['discper'];
  $ptrpf_per     = (float) $griddet[$i]['pfper'];
  $ptrfreight_amt = (float) $griddet[$i]['freight'];
  $ptroth_amt     = (float)$griddet[$i]['othervalue'];
  $ptrremarks      = $griddet[$i]['remarks'];
  $ptrref_no        = (int) $griddet[$i]['indentno']; 
  $ptrref_date      = $griddet[$i]['inddate'] ;
  $ptrind_fin_code  = (int) $griddet[$i]['indentyear'];
  $ptrind_no        = (int) $griddet[$i]['indentno']; 

  $ptruom        = (int) $griddet[$i]['uomcode']; 

  $ptrclose_status  = '';

  $ptrdisval        = (float)$griddet[$i]['discvalue'];
  $ptrpfval         = (float)$griddet[$i]['pfvalue'];

  $ptrcgst_per      = (float)$griddet[$i]['cgstper'];
  $ptrcgst_amt      = (float)$griddet[$i]['cgstvalue'];
  $ptrsgst_per      = (float)$griddet[$i]['sgstper'];
  $ptrsgst_amt      = (float)$griddet[$i]['sgstvalue'];
  $ptrigst_per      = (float)$griddet[$i]['igstper'];
  $ptrigst_amt      = (float)$griddet[$i]['igstvalue'];
  $ptritcs_per      = (float)$griddet[$i]['tcsper'];
  $ptritcs_amt      = (float)$griddet[$i]['tcsvalue'];
  $ptrfrt2          = (float)$griddet[$i]['freight2'];
  $purgrpcode       = (int)$griddet[$i]['purgrpcode'];
  $rebate           = (float)$griddet[$i]['rebate'];

  $ptrremarks       = str_replace("'","",$ptrremarks);
  
  $ptrremarks       = strtoupper(substr(trim($ptrremarks),0,498));
  


 $query4= "insert into trnpur_purchase_trailer values(
'$phdcompcode', '$phdfincode','$pono' ,'$phdpodate' ,'$ptritem_code' ,'$ptrslno' ,'$ptrind_fin_code','$ptrind_no', '$ptrunit_rate' ,'$ptrord_qty' , '$ptrrec_qty','$ptrdiscount' ,'$ptrpf_per' ,'$ptrfreight_amt' ,'$ptroth_amt' , '$ptrdisval' ,'$ptrpfval','$ptrcgst_per' ,  '$ptrcgst_amt' ,'$ptrsgst_per' ,  '$ptrsgst_amt' ,  '$ptrigst_per' ,  '$ptrigst_amt' , '$ptritcs_per' , '$ptritcs_amt','$ptrfrt2','$rebate' ,'$ptrremarks' ,'','','$purgrpcode' , '$ptruom' )"; 

$result4=mysql_query($query4);            

//echo $query4;
//echo "<br>";

 $query5 = "update trnpur_indent set ind_po_qty =  ind_po_qty + $ptrord_qty where ind_no = '$ptrind_no' and ind_item_code = '$ptritem_code' and ind_comp_code = '$phdcompcode' and ind_fin_code = '$ptrind_fin_code'";                                                                     
 $result5=mysql_query($query5);   

//echo $query5;
//echo "<br>";

}
        
if($result3 && $result4 && $result5 )

       {
            mysql_query("COMMIT");                        
            echo '({"success":"true","pono":"'.$pono.'"})';
        }
        else
        {
 //           if ($cnt == 1)
//                $pono = 0;
            mysql_query("ROLLBACK");            
	    echo '({"success":"false","pono":"' . $pono . '"})';
        }   
       
     
 
?>
