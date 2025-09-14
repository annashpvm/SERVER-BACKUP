<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$griddet      = json_decode($_REQUEST['griddetinv2'],true);
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
$invhpartyordno = substr($_POST['invhpartyordno'],0,49);
$invhpartyorddt = $_POST['invhpartyorddt'];
$invhourordno   = $_POST['invhourordno'];
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




$voutype ='GS';


if ($savetype == "Add") {




#Get Max AccRef Seqno from acc_ref
$query1  = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref";
$result1 = mysql_query($query1);
$rec1    = mysql_fetch_array($result1);
$ginaccrefseq = $rec1['con_value'];





    $query1 = "select ifnull(max(invh_seqno),0)+1 as invh_seqno from trnsal_invoice_header where invh_fincode = $invhfincode and invh_comp_code= $invhcompcode";
    $result1= mysql_query($query1);
    $rec2 = mysql_fetch_array($result1);
    $invhseqno=$rec2['invh_seqno'];

    $invhvouno = 'GS'+trim($invhseqno);

 $query2= "insert into trnsal_invoice_header values(
'$invhcompcode','$invhfincode','$invhseqno','$invhno','$gsttype','$invhrefno','$invhdate','$invhtime','$invhtimeremove','$invhpartyordno',
'$invhpartyorddt','$invhourordno','$invhourorddt','$invhparty','$invhcrddays','$invhtaxtag','$invhinsper','$invhinsamt','$invhfrtrate',
'$invhfrtamt','$invhroff','$invhnetamt','$invhnoofreels','$invhtotwt','$invhslipno','$invhslipdt','$invhvehino','$invhlrno','$invhlrdate',
'$invhvouno','$invhvouyear','$invhtaxableamt','$invhothers','$invhsgstper','$invhsgstamt','$invhcgstper','$invhcgstamt','$invhigstper',
'$invhigstamt','$invhtcsper','$invhtcsamt','$invhdelivery_add1','$invhdelivery_add2','$invhdelivery_add3','$invhdelivery_city','$invhdelivery_pin',
'$invhdelivery_gst','$invhstatecode','$invhewaybillno','$invhinstruction','$ginaccrefseq')";

$result2=mysql_query($query2);   


}


$inscnt = 0;
$rowcnt = $_POST['cnt'];
for ($i=0;$i<$rowcnt;$i++)
	{
	$sno = $i + 1;

//	$invtcompcode = $_POST['invhcompcode'];
//	$invtfincode  = $_POST['invhfincode'];
//	$invtno= $_POST['invhno'];

	$invtitem   = $griddet[$i]['varcode'];
	$invtvar    = $griddet[$i]['sizecode'];
	$invthsncode= $griddet[$i]['hsncode'];
	$invtwt     = $griddet[$i]['weight'];
	$invtnos    = $griddet[$i]['nos'];
	$invturate  = $griddet[$i]['rate'];
	$invtamt    = $griddet[$i]['amount'];
	$invtvalue  = $griddet[$i]['value'];
	$invttaxable= $griddet[$i]['taxval'];
	$invtlosspmt= (float) $griddet[$i]['losspmt'];
	$invtqcdevyn= $griddet[$i]['qcdev'];
	$cancelflag = 0;
	     
	$query3= "insert into trnsal_invoice_trailer values('$invhcompcode','$invhfincode','$invhseqno','$invtitem','$invtvar','$invthsncode','$invtwt','$invtnos','$invturate','$invtamt', 
'$invtvalue','$invttaxable','$invtlosspmt','$invtqcdevyn')";
	$result3=mysql_query($query3);          



        $query4 = "call spsal_inv_order_update($invhcompcode,$invhfincode ,'$sonolist' ,$invtvar);"; 
	$result4=mysql_query($query4);         

}


if ($result2 && $result4  )

{
   mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $invhrefno . '"})';
} 
	
else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $invhrefno . '"})';
}
  
   
?>
