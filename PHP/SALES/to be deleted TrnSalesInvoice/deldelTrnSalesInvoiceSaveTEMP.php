<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();


$savetype     = $_POST['savetype'];
$invhcompcode = $_POST['invhcompcode'];
$invhfincode  = $_POST['invhfincode'];
$gsttype      = $_POST['gsttype'];
$invhrefno    = $_POST['invhrefno'];
$invhno       = $_POST['invhno'];
$invhseqno    = $_POST['invhseqno'];
$invhdate     = $_POST['invhdate'];
$invhtime     = $_POST['invhtime'];
$invhtimeremove = $_POST['invhtimeremove'];
//$invhpartyordno = $_POST['invhpartyordno'];
$invhpartyordno = $_POST['invhpartyordno'];
$invhpartyorddt = $_POST['invhpartyorddt'];
$invhourordno   = substr($_POST['invhourordno'],0,49);
$invhourorddt   = $_POST['invhourorddt'];
$invhparty      = $_POST['invhparty'];
$invhcrddays    = $_POST['invhcrddays'];
$invhtaxtag     = $_POST['invhtaxtag'];
$invhinsper     = $_POST['invhinsper'];
$invhinsamt     = $_POST['invhinsamt'];
$invhfrtrate    = $_POST['invhfrtrate'];
$invhfrtamt     = $_POST['invhfrtamt'];
$invhroff       = $_POST['invhroff'];
$invhnetamt     = $_POST['invhnetamt'];
$invhnoofreels  = $_POST['invhnoofreels'];
$invhtotwt      = $_POST['invhtotwt'];
$invhslipno     = $_POST['invhslipno'];
$invhslipdt     = $_POST['invhslipdt'];
$invhvehino     = strtoupper($_POST['invhvehino']);
$invhlrno       = $_POST['invhlrno'];
$invhlrdate     = $_POST['invhlrdate'];
$invhvouno      = $_POST['invhvouno'];
$invhvouyear    = $_POST['invhvouyear'];
$invhtaxableamt = $_POST['invhtaxableamt'];
$invhothers     = $_POST['invhothers'];
$invhsgstper    = $_POST['invhsgstper'];
$invhsgstamt    = $_POST['invhsgstamt'];
$invhcgstper    = $_POST['invhcgstper'];
$invhcgstamt    = $_POST['invhcgstamt'];
$invhigstper    = $_POST['invhigstper'];
$invhigstamt    = $_POST['invhigstamt'];
$invhtcsper     = $_POST['invhtcsper'];
$invhtcsamt     = $_POST['invhtcsamt'];
//$invhfrttype  = $_POST['invhfrttype'];
$cancelflag     = $_POST['cancelflag'];
$invhdelivery_add1 = $_POST['invhdelivery_add1'];
$invhdelivery_add2 = $_POST['invhdelivery_add2'];
$invhdelivery_add3 = $_POST['invhdelivery_add3'];
$invhdelivery_city = $_POST['invhdelivery_city'];
$invhdelivery_pin  = $_POST['invhdelivery_pin'];
$invhstatecode     = $_POST['invhstatecode']; 
$invhdelivery_gst  = $_POST['invhdelivery_gst'];
$invhinstruction   = $_POST['invhinstruction'];
$invh_sal_ledcode  = $_POST['invh_sal_ledcode'];
$invh_cgst_ledcode = $_POST['invh_cgst_ledcode'];
$invh_sgst_ledcode = $_POST['invh_sgst_ledcode'];
$invh_igst_ledcode = $_POST['invh_igst_ledcode'];
$narration         = $_POST['invh_description'];
$invhewaybillno    = $_POST['invhewaybillno'];
$sonolist          = $_POST['sonolist'];





//$invhvouyear  = date('Y',$invhdate)


mysql_query("BEGIN");



#Find Customer Ledger code

$query103      = "select led_code from acc_ledger_master where led_custcode = $invhparty and led_type = 'C'";

$result103     = mysql_query($query103);
$rec103        = mysql_fetch_array($result103);
$cust_ledger = $rec103['led_code'];


#Find Insurance Ledger code
$query102    	= "select lnk_ledcode from acc_link_ledger where lnk_system = 'sales' and lnk_name = 'insurance'";
$result102   	= mysql_query($query102);
$rec102      	= mysql_fetch_array($result102);
$ins_ledger	= $rec102['lnk_ledcode'];


#Find Freight Ledger code
if  ($gsttype == "TN")
    $query102  	= "select lnk_ledcode from acc_link_ledger where lnk_system = 'sales' and lnk_name = 'TNfreight'";
else
    $query102  	= "select lnk_ledcode from acc_link_ledger where lnk_system = 'sales' and lnk_name = 'OSfreight'";

$result102   	= mysql_query($query102);
$rec102      	= mysql_fetch_array($result102);
$frt_ledger	= $rec102['lnk_ledcode'];

#Find Rounindoff  Ledger code
$query102    	= "select lnk_ledcode from acc_link_ledger where lnk_system = 'sales' and lnk_name = 'roundoff'";
$result102   	= mysql_query($query102);
$rec102      	= mysql_fetch_array($result102);
$round_ledger	= $rec102['lnk_ledcode'];




$voutype ='GSI';


if ($savetype == "Add") {


}

else
{

    
    $query1 = "select accref_seqno from acc_ref  where accref_comp_code = $invhcompcode and accref_finid =  $invhfincode  and accref_vouno = '$invhvouno'";
    $result1= mysql_query($query1);
    $rec2 = mysql_fetch_array($result1);
    $ginaccrefseq =$rec2['accref_seqno'];


$query3= "delete from acc_trail where  acctrail_accref_seqno =$ginaccrefseq";
$result3=mysql_query($query3);   
         
$query4= "delete from acc_tran  where  acctran_accref_seqno  =$ginaccrefseq";
$result4=mysql_query($query4);   

$query5= "delete from acc_ref  where  accref_seqno  =$ginaccrefseq";
$result5=mysql_query($query5);   


}







//Accounts Updation --- Start
#Insert AccRef

$querya1 = "call acc_sp_trn_insacc_ref('$ginaccrefseq','$invhvouno','$invhcompcode','$invhfincode','$invhdate','$voutype','-','-','$invhrefno','$invhdate','$narration',1,1)";
$resulta1 = mysql_query($querya1);


#Insert AccTrail
$seqno =  1;
$querya2 = "call acc_sp_trn_insacc_trail('$ginaccrefseq','$seqno','$invhrefno','$invhdate','$invhnetamt','0','$cust_ledger','D');";
$resulta2 = mysql_query($querya2);




#Insert AccTran

//$salesvalue = round($invhtaxableamt - $invhinsamt - $invhfrtamt,0);
$salesvalue = $invhtaxableamt - $invhinsamt - $invhfrtamt;

$seqno    =  1;	
$querya4  = "call acc_sp_trn_insacc_tran('$ginaccrefseq',$seqno,'$cust_ledger','$invhnetamt',0,'$invhnetamt',1,0,0,'','$voutype');";
$resulta4 = mysql_query($querya4);
$seqno    = $seqno + 1;	

if ($salesvalue > 0)
{
    $querya10  = "call acc_sp_trn_insacc_tran('$ginaccrefseq',$seqno,'$invh_sal_ledcode',0,'$salesvalue','$salesvalue',1,0,0,'','$voutype');";
    $resulta10 = mysql_query($querya10);
    $seqno    = $seqno + 1;	

}


if ($invhfrtamt > 0)
{
    $querya5  = "call acc_sp_trn_insacc_tran('$ginaccrefseq',$seqno,'$frt_ledger',0,'$invhfrtamt','$invhfrtamt',1,0,0,'','$voutype');";
    $resulta5 = mysql_query($querya5);
    $seqno    = $seqno + 1;	

}


if ($invhinsamt > 0)
{
    $querya5  = "call acc_sp_trn_insacc_tran('$ginaccrefseq',$seqno,'$ins_ledger',0,'$invhinsamt','$invhinsamt',1,0,0,'','$voutype');";
    $resulta5 = mysql_query($querya5);
    $seqno    = $seqno + 1;	

}


if ($invhigstamt > 0)
{
    $querya7  = "call acc_sp_trn_insacc_tran('$ginaccrefseq',$seqno,'$invh_igst_ledcode',0,'$invhigstamt','$invhigstamt',1,0,0,'','$voutype');";
    $resulta7 = mysql_query($querya7);
    $seqno    = $seqno + 1;	

}
if ($invhcgstamt > 0)
{
    $querya8  = "call acc_sp_trn_insacc_tran('$ginaccrefseq',$seqno,'$invh_cgst_ledcode',0,'$invhcgstamt','$invhcgstamt',1,0,0,'','$voutype');";
    $resulta8 = mysql_query($querya8);
    $seqno    = $seqno + 1;	

}

if ($invhsgstamt > 0)
{
    $querya9  = "call acc_sp_trn_insacc_tran('$ginaccrefseq',$seqno,'$invh_sgst_ledcode',0,'$invhsgstamt','$invhsgstamt',1,0,0,'','$voutype');";
    $resulta9 = mysql_query($querya9);
    $seqno    = $seqno + 1;	

}

if ($invhroff > 0)

{
    $querya10  = "call acc_sp_trn_insacc_tran('$ginaccrefseq',$seqno,'$round_ledger',0,'$invhroff','$invhroff',1,0,0,'','$voutype');";
    $resulta10 = mysql_query($querya10);
    $seqno     = $seqno + 1;	

}
if ($invhroff < 0)
{
    $invhroff = $invhroff * -1;
    $querya10  = "call acc_sp_trn_insacc_tran('$ginaccrefseq',$seqno,'$round_ledger','$invhroff','0','$invhroff',1,0,0,'','$voutype');";
    $resulta10 = mysql_query($querya10);
    $seqno     = $seqno + 1;	

}


//Accounts Updation --- End



//if ($result102  && $result103  && $result104 && $resulta1  && $resulta2  && $resulta3  && $resulta4  && $resulta5  && $resulta6  && $resulta7  && $resulta8  && $resulta9  && $resulta10 )

if ($result102  && $result103  && $result3  && $result4 && $result5  && $querya1  && $querya2)

//if ($result1)
{
   mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $invhrefno . '"})';
} 
	
else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $invhrefno . '"})';
}
  
   
?>
