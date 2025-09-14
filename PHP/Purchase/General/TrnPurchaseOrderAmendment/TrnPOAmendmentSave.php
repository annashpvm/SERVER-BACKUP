<?php
       require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
	session_start();

	$griddet = json_decode($_REQUEST['griddet'],true);
	$rowcnt = $_POST['cnt'];
	$savetype       = $_POST['savetype'];

	$phdamendno    = $_POST['phdamendno'];
	$phdamenddate  = $_POST['phdamenddate'];



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

	$phdnewsupplier   =  (int) $_POST['phdnewsupplier'];

    if ($phdsupcode  != $phdnewsupplier &&  $phdnewsupplier > 0 )
         $phdsupcode  = $phdnewsupplier;
        
    mysql_query("BEGIN");



 $query1   ="select ifnull(max(amd_no),0)+1 as amendno from   trnpur_amendment_header where amd_comp_code = '$phdcompcode' and amd_fin_code = '$phdfincode'" ;

 $result1 = mysql_query($query1);
 $rec1 = mysql_fetch_array($result1);
 $amendno=$rec1['amendno'];




$query2 = "call sppur_ins_order_amendment ('$phdcompcode','$phdfincode','$pono','$amendno','$phdamenddate')";
$result2=mysql_query($query2);


//echo $query2;
//echo "<br>";


$today  = date("Y-m-d H:i:s");  

 
//    $query3= "insert into trnpur_purchase_header values('$phdcompcode','$pono','$phdfincode','$phdpodate','$phdsupcode','$phdcreditdays','$phdtransport','$phdpayterms','$phddelypoint','$phddelysch','$phdsplinstruction','$phdadvance','$phdroundoff','$phdtotal','$phdamndstatus','$phdcancelstatus','$phdcancelreason','$phdbank','$phdtol','$phdentdate','$phdpartyrefno','$phdpartyrefdate','$preparedby','$phdduedate','$phdfreight')";

     $query3= "insert into trnpur_purchase_header (phd_comp_code, phd_pono, phd_fin_code, phd_podate, phd_dept, phd_sup_code, phd_credit_days, phd_transport, phd_pay_terms, phd_dely_point, phd_other_ref, phd_spl_instruction, phd_advance, phd_roundoff, phd_total, phd_amnd_status, phd_cancel_status, phd_cancel_reason, phd_tol, phd_ent_date, phd_party_refno, phd_party_refdate, phd_prepared_by, phd_deliverydate, phd_freight, phd_round_needed, phd_amend_no, phd_amend_date) values('$phdcompcode','$pono','$phdfincode','$phdpodate', $phddept, '$phdsupcode','$phdcreditdays' ,'$phdtransport' ,'$phdpayterms','$phddelypoint','$otherrefer','$phdsplinstruction','$phdadvance', '$phdroundoff','$phdtotal','$phdamndstatus','$phdcancelstatus','$phdcancelreason','$phdtol','$phdentdate','$phdpartyrefno','$phdpartyrefdate','$preparedby','$phddeliverydate',
'$phdfreight','$roundneed', $amendno,'$today')";


    $result3=mysql_query($query3);


//echo $query3;
//echo "<br>";



for ($i=0;$i<$rowcnt;$i++)
{
  $ptritem_code  = $griddet[$i]['itemcode'];
  $ptrslno       = $i+1;
  $ptrunit_rate  = (float) $griddet[$i]['unitrate'];
  $ptrord_qty    = (float) $griddet[$i]['ordqty'];
  $oldord_qty    =  (float) $griddet[$i]['oldordqty'];
  $ptrrec_qty    =  (float) $griddet[$i]['recdqty'];




  $ptrdiscount   =  (float)$griddet[$i]['discper'];
  $ptrpf_per     = (float) $griddet[$i]['pfper'];
  $ptrfreight_amt = (float) $griddet[$i]['freight'];
  $ptroth_amt     = (float)$griddet[$i]['othervalue'];
  $ptrremarks      = $griddet[$i]['remarks'];
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
  $purgrpcode       = (int)$griddet[$i]['purgrpcode'];
  $rebate           = (float)$griddet[$i]['rebate'];

  $ptrremarks       = str_replace("'","",$ptrremarks);

 $ptruom        = (int) $griddet[$i]['uomcode']; 

// $query4= "insert into trnpur_purchase_trailer values('$phdcompcode', '$phdfincode','$pono' ,'$phdpodate' ,'$ptritem_code' ,'$ptrslno' ,'$ptrind_fin_code','$ptrind_no', '$ptrunit_rate' ,'$ptrord_qty' , '$ptrrec_qty','$ptrdiscount' ,'$ptrpf_per' ,'$ptrfreight_amt' ,'$ptroth_amt' , '$ptrdisval' ,'$ptrpfval','$ptrcgst_per' ,  '$ptrcgst_amt' ,'$ptrsgst_per' ,  '$ptrsgst_amt' ,  '$ptrigst_per' ,  '$ptrigst_amt' , '$ptritcs_per' , '$ptritcs_amt','$ptrfrt2','$rebate' ,'$ptrremarks' ,'','','$purgrpcode')"; 



 $query4= "insert into trnpur_purchase_trailer values(
'$phdcompcode', '$phdfincode','$pono' ,'$phdpodate' ,'$ptritem_code' ,'$ptrslno' ,'$ptrind_fin_code','$ptrind_no', '$ptrunit_rate' ,'$ptrord_qty' , '$ptrrec_qty','$ptrdiscount' ,'$ptrpf_per' ,'$ptrfreight_amt' ,'$ptroth_amt' , '$ptrdisval' ,'$ptrpfval','$ptrcgst_per' ,  '$ptrcgst_amt' ,'$ptrsgst_per' ,  '$ptrsgst_amt' ,  '$ptrigst_per' ,  '$ptrigst_amt' , '$ptritcs_per' , '$ptritcs_amt','$ptrfrt2','$rebate' ,'$ptrremarks' ,'','','$purgrpcode', '$ptruom' )"; 

$result4=mysql_query($query4);            

//echo $query4;
//echo "<br>";


 $query5 = "update trnpur_indent set ind_po_qty =  ind_po_qty +$ptrord_qty where ind_no = '$ptrind_no' and ind_item_code = '$ptritem_code' and ind_comp_code = '$phdcompcode' and ind_fin_code  ='$ptrind_fin_code'";                                                                     
 $result5=mysql_query($query5); 

//echo $query5;
//echo "<br>";  
}
 





        
if($result2 && $result3 && $result4 && $result5)

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
