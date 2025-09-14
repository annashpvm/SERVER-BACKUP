<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();

$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_POST['cnt'];
$savetype       = $_POST['savetype'];
$phdpono       = $_POST['phdpono'];
$phdcompcode   = $_POST['phdcompcode'];
$phdpodate     = $_POST['phdpodate'];
$phdfincode    = $_POST['phdfincode'];
$phdfrom       = $_POST['phdfrom'];
$phdsupcode    = $_POST['phdsupcode'];
$phdcreditdays = $_POST['phdcreditdays'];
$phdtransport  = $_REQUEST['phdtransport'];
$phdpayterms   = $_POST['phdpayterms'];
$phdinsterms   = $_POST['phdinsterms'];
$phddelypoint  = $_POST['phddelypoint'];
$phddelysch    = $_POST['phddelysch'];
$phdfrtterms   = $_POST['phdfrtterms'];
$phdremarks    = $_POST['phdremarks'];
$phdadvance    = $_POST['phdadvance'];
$phdroundoff      =  $_POST['phdroundoff'];
$phdtotal         =  $_POST['phdtotal'];
$phdamndstatus    =  $_POST['phdamndstatus'];
$phdcancelstatus  =  $_POST['phdcancelstatus'];
$phdcancelreason  =  $_POST['phdcancelreason'];
$phdrefno         =  $_POST['phdrefno'];
$phdvaldays       =  $_POST['phdvaldays'];
$phdbank          =  $_POST['phdbank'];
$phdtol           =  $_POST['phdtol'];
$phdentdate       =  $_POST['phdentdate'];
$phdpartyrefno    =  $_POST['phdpartyrefno'];
$phdpartyrefdate  =  $_POST['phdpartyrefdate'];
$phdpaymentinfo   =  $_POST['phdpaymentinfo'];
$phditeminfo      =  $_POST['phditeminfo'];

$cancelflag       =  $_POST['cancelflag'];



 $query1 = "select ifnull(max(phd_pono),0)+1 as phd_pono from trnpur_purchase_header where phd_comp_code = $phdcompcode and phd_fin_code = $phdfincode";
 $result1 = mysql_query($query1);
 $rec1 = mysql_fetch_array($result1);
 $pono=$rec1['phd_pono'];



 mysql_query("BEGIN");
 
 //if ($po_seqno > 0  && $po_company_code > 0)
 //{ 

// $query3= "insert into trnpur_purchase_header values('$phdcompcode','$pono','$phdpodate','$phdfincode','$phdfrom','$phdsupcode','$phdcreditdays','$phdtransport','$phdpayterms','$phdinsterms','$phddelypoint','$phddelysch','$phdfrtterms','$phdremarks','$phdadvance','$phdadv1','$phdadv2','$phdadv3','$phdadv4','$phdpaydate1','$phdpaydate2','$phdpaydate3','$phdpaydate4','$phdredamt','$phdredate','$phdbankguarantee','$phdroundoff','$phdtotal','$phdamndstatus','$phdcancelstatus','$phdcancelreason','$phdrefno','$phdvaldays','$phdbank','$phdtol','$phde1sale','$phdentdate','$phdpartyrefno','$phdpartyrefdate','$phdpaymentinfo','$phditeminfo','$phdurgent','$cancelflag')";


 $query3= "insert into trnpur_purchase_header values('$phdcompcode','$pono','$phdfincode','$phdpodate','$phdsupcode','$phdcreditdays','$phdtransport','$phdpayterms','$phdinsterms','$phddelypoint','
$phddelysch','$phdfrtterms','$phdremarks','$phdadvance','$phdroundoff','$phdtotal','$phdamndstatus','$phdcancelstatus','$phdcancelreason','$phdbank','$phdtol','$phdentdate','$phdpartyrefno','$phdpartyrefdate','$phdpaymentinfo')";



 $result3=mysql_query($query3);



for ($i=0;$i<$rowcnt;$i++)
{
  $ptritem_code  = $griddet[$i]['itemcode'];
  $ptrslno       = $i+1;
  $ptrunit_rate  = $griddet[$i]['unitrate'];
  $ptrord_qty    = $griddet[$i]['ordqty'];
  $ptrrec_qty    = '0';



  $ptrdiscount   =  (float)$griddet[$i]['discper'];
  $ptrpf_per     = (float) $griddet[$i]['pfper'];
  $ptrfreight_amt = (float) $griddet[$i]['freight'];
  $ptroth_amt     = (float)$griddet[$i]['othervalue'];
  $ptrreason      = $griddet[$i]['remarks'];
  $ptrref_no        = $griddet[$i]['indentno']; 
  $ptrref_date      = $griddet[$i]['inddate'] ;
  $ptrind_fin_code  = $griddet[$i]['indentyear'];
  $ptrind_no        =$griddet[$i]['indentno']; 

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


 $query4= "insert into trnpur_purchase_trailer values(
'$phdcompcode', '$phdfincode','$pono' ,'$phdpodate' ,'$ptritem_code' ,'$ptrslno' ,'$ptrind_fin_code','$ptrind_no', '$ptrunit_rate' ,'$ptrord_qty' , '$ptrrec_qty','$ptrdiscount' ,'$ptrpf_per' ,'$ptrfreight_amt' ,'$ptroth_amt' , '$ptrdisval' ,'$ptrpfval','$ptrcgst_per' ,  '$ptrcgst_amt' ,'$ptrsgst_per' ,  '$ptrsgst_amt' ,  '$ptrigst_per' ,  '$ptrigst_amt' , '$ptritcs_per' , '$ptritcs_amt','$ptrfrt2' ,'$ptrreason' ,'N','N')"; 

$result4=mysql_query($query4);            

//echo $query4;

 $query5 = "update trnpur_indent set ind_po_qty =  ind_po_qty + $ptrord_qty where ind_no = '$ptrind_no' and ind_item_code = '$ptritem_code' and ind_comp_code = '$phdcompcode' and ind_fin_code = '$ptrind_fin_code'";                                                                     
 $result5=mysql_query($query5);   
}
 





        
if($result3 && $result4 && $result5)
       {
            mysql_query("COMMIT");                        
            echo '({"success":"true","pono":"'.$pono.'"})';
        }
        else
        {
            mysql_query("ROLLBACK");            
          
	    echo '({"success":"false","pono":"' . $pono . '"})';
        }   
        

       
 
?>
