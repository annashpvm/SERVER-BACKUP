<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();

$griddet      = json_decode($_POST['griddet'],true);
$rowcnt       = $_POST['cnt'];

$griddetacc   = json_decode($_POST['griddetacc'],true);
$cntacc       = $_POST['cntacc'];



$savetype     = $_POST['savetype'];

$snhinvno     = $_POST['snhinvno'];
$snhdocno     = $_POST['snhdocno'];
$snhsaltype   = $_POST['snhsaltype'];

$snhcompcode  = $_POST['snhcompcode'];
$snhfincode   = $_POST['snhfincode'];
$snhdate      = $_POST['snhdate'];
$snhcustcode  = $_POST['snhcustcode'];
$snhpaymode   = $_POST['snhpaymode'];
$snhtransport = $_POST['snhtransport'];
$snhvehno     = $_POST['snhvehno'];
$snhremarks   = $_POST['snhremarks'];
$ourref       = $_POST['ourref'];
$partyref     = $_POST['partyref'];
$invhvouno    = $_POST['acvouno'];
$seqno        = $_POST['seqno'];
$invhtime     = $_POST['invhtime'];
  
$snhvehno     = str_replace(" ","",$snhvehno);

$ewaybillno   = $_POST['ewaybillno'];

$ginaccrefseq = (int)$_POST['accseqno'];


$deliveryadd1=  strtoupper($_POST['deliveryadd1']);
$deliveryadd2=  strtoupper($_POST['deliveryadd2']);
$deliveryadd3=  strtoupper($_POST['deliveryadd3']);
$deliverycity=  strtoupper($_POST['deliverycity']);
$deliverypin=   strtoupper($_POST['deliverypin']);
$deliverygst=   strtoupper($_POST['deliverygst']);



mysql_query("BEGIN");

if ($savetype == "Add") {
   $query2    = "select ifnull(max(os_seqno),0)+1 as seqno from trn_other_sales where  os_fincode = '$snhfincode' and os_compcode = '$snhcompcode'";
   $result2   = mysql_query($query2);
   $rec2      = mysql_fetch_array($result2);
   $seqno     = $rec2['seqno'];
   $invhvouno = 'OSI'.trim((String)$seqno);

   #Get Max AccRef Seqno from acc_ref
   $query1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
   $result1 = mysql_query($query1);
   $rec1 = mysql_fetch_array($result1);
   $ginaccrefseq=$rec1['con_value'];

}
else
{

	$querya1 = "delete from acc_trail  where acctrail_accref_seqno = '$ginaccrefseq'";
        $resulta1 = mysql_query($querya1);

//echo $querya1;
//echo "<br>";
	$querya2 = "delete from acc_tran  where acctran_accref_seqno = '$ginaccrefseq'";
        $resulta2 = mysql_query($querya2);
//echo $querya2;
//echo "<br>";	
        $querya3 = "delete from acc_ref  where accref_seqno ='$ginaccrefseq' and accref_comp_code='$snhcompcode' and accref_finid ='$snhfincode'";
        $resulta3 = mysql_query($querya3);

//echo $querya3;
//echo "<br>";


   $query2  = "delete from trn_other_sales where os_fincode = '$snhfincode' and os_compcode='$snhcompcode' and os_invno = '$snhinvno'";
   $result2 = mysql_query($query2);

//echo $query2;
//echo "<br>";

}

   #Insert AccRef
   $querya1 = "call acc_sp_trn_insacc_ref('$ginaccrefseq','$snhinvno','$snhcompcode','$snhfincode', '$snhdate','OSI','--', '$paymode','$snhinvno', '$snhdate','$snhremarks');";

   $resulta1 = mysql_query($querya1);

//echo $querya1;
//echo "<br>";

   for($i=0;$i<$cntacc;$i++){

            $slno    = $i+1;
            $ledseq  = $griddetacc[$i]['ledcode'];
            $dbamt   = (float) $griddetacc[$i]['debit'];
            $cramt   = (float) $griddetacc[$i]['credit'];
            $total1  = (float)$griddetacc[$i]['total1'];
            $totamt  = $dbamt + $cramt;	

            if ($dbamt>0)
            {
              $amtmode = "D";
            }
            else
            {
              $amtmode = "C";
            }
 
            $adjamt=0;

            $ledtype = $griddetacc[$i]['ledtype'];

            #Insert AccTrail
            if ($ledtype == "P") { 


               $querya3 = "call acc_sp_trn_insacc_trail('$ginaccrefseq','$slno','$snhinvno','$snhdate','$totamt','$adjamt','$ledseq','$amtmode',0,0 );";
               $resulta3 = mysql_query($querya3);


//echo $querya3;
//echo "<br>";	


            } 
            #Insert AccTran

            $querya2 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$ledseq','$dbamt','$cramt','$totamt','$voutype','');";
            $resulta2 = mysql_query($querya2);



//echo $querya2;
//echo "<br>";	

        }

$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++)
{
$sno = $i + 1;
$sntitemcode = $griddet[$i]['itemcode'];
$sntqty      = $griddet[$i]['qty'];
$sntrate     = $griddet[$i]['unitrate'];
$sntvalue    = $griddet[$i]['amount'];
$sntothers   = (float)$griddet[$i]['others'];
$taxable     = (float)$griddet[$i]['taxablevalue'];
$sntcgstper  = (float)$griddet[$i]['cgstper'];
$sntcgstamt  = (float)$griddet[$i]['cgstval'];
$sntsgstper  = (float)$griddet[$i]['sgstper'];
$sntsgstamt  = (float)$griddet[$i]['sgstval'];
$sntigstper  = (float)$griddet[$i]['igstper'];
$sntigstamt  = (float)$griddet[$i]['igstval'];
$snttotamt   = (float)$griddet[$i]['totamt'];
$editqty     = (float)$griddet[$i]['editcode'];
$rounding    = (float)$griddet[$i]['rounding'];
$tcsper    = (float)$griddet[$i]['tcsper'];
$tcsamt    = (float)$griddet[$i]['tcsamt'];


//$query4    = "insert into trn_other_sales values('$snhcompcode','$snhfincode','$seqno','$snhdocno','$snhsaltype','$snhinvno','$snhdate','$snhcustcode','$sntitemcode','$sntrate','$sntqty','$sntvalue','$sntothers','$taxable','$sntcgstper','$sntcgstamt','$sntsgstper','$sntsgstamt','$sntigstper','$sntigstamt','$rounding','$snttotamt','$snhpaymode','$snhtransport','$snhvehno','$snhremarks','$ourref','$partyref','N','$invhvouno','$snhdate',0,'N')";

$query4    = "insert into trn_other_sales (os_compcode, os_fincode, os_seqno, os_docno, os_state_type, os_invno, os_date, os_custcode, os_item, os_rate, os_qty, os_value, os_others, os_taxable, os_cgstper, os_cgst, os_sgstper, os_sgst, os_igstper, os_igst, os_rounding, os_netamt, os_paymode, os_transport, os_vehno, os_remarks, os_ourref, os_partyref, os_accupd, os_acvou_no, os_acvou_date, os_acc_seqno, os_invtime,os_cancel,invh_invrefno,invh_ewaybillno,os_tcsper,os_tcsamt,
os_delivery_addr1, os_delivery_addr2, os_delivery_addr3, os_delivery_city, os_delivery_pin, os_delivery_gst
)
 values('$snhcompcode','$snhfincode','$seqno','$snhdocno','$snhsaltype','$snhinvno',
'$snhdate','$snhcustcode','$sntitemcode','$sntrate','$sntqty','$sntvalue','$sntothers','$taxable','$sntcgstper','$sntcgstamt','$sntsgstper',
'$sntsgstamt','$sntigstper','$sntigstamt','$rounding','$snttotamt','$snhpaymode','$snhtransport','$snhvehno','$snhremarks',
'$ourref','$partyref','Y','$invhvouno','$snhdate','$ginaccrefseq','$invhtime','N','$snhinvno','$ewaybillno','$tcsper','$tcsamt',
'$deliveryadd1','$deliveryadd2','$deliveryadd3','$deliverycity','$deliverypin','$deliverygst')";




 $result4=mysql_query($query4); 




//echo $query4;        
//echo "<br>";  
}
        
   if ( $result4 && $resulta1  && $resulta2)
   {
            mysql_query("COMMIT");                        
            echo '({"success":"true","saleno":"'.$snhinvno.'"})';
   }
   else
   {
            mysql_query("ROLLBACK");            
            echo '({"success":"false","saleno":"'.$snhinvno.'"})';
   }  
       
 
?>
