<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();

$griddet      = json_decode($_REQUEST['griddet'],true);
$rowcnt       = $_REQUEST['cnt'];
$savetype     = $_POST['savetype'];
$rethcompcode = $_POST['rethcompcode'];
$rethfincode = $_POST['rethfincode'];
$rethno      = $_POST['rethno'];
$rethdate    = $_POST['rethdate'];
$rethcust    = $_POST['rethcust'];
$rethnoofreels = $_POST['rethnoofreels'];
$rethtotwt   = $_POST['rethtotwt'];
$rethtaxtag  = $_POST['rethtaxtag'];
$rethinsper  = $_POST['rethinsper'];
$rethinsamt  = $_POST['rethinsamt'];
$rethfrieght = (float)$_POST['rethfrieght'];
$rethroff    = $_POST['rethroff'];
$rethamt     = $_POST['rethamt'];
$rethinvno   = $_POST['rethinvno'];
$rethinvdate = $_POST['rethinvdate'];
$rethvouno   = $_POST['rethvouno'];
$rethvouyear = $_POST['rethvouyear'];
$rethcgstper = $_POST['rethcgstper'];
$rethcgstamt = $_POST['rethcgstamt'];
$rethsgstper = $_POST['rethsgstper'];
$rethsgstamt = $_POST['rethsgstamt'];
$rethigstper = $_POST['rethigstper'];
$rethigstamt = $_POST['rethigstamt'];
$rethslipno  = $_POST['rethslipno'];
$rethtaxable = $_POST['rethtaxable'];



$narration   = "Sales Return";

$salesLedCode = 0;
$cgstLedCode  = 0;
$sgtLedCode   = 0;
$igstLedCode  = 0;

mysqli_set_charset($conn, "utf8");




mysqli_query($conn, "BEGIN");



#Find Customer Ledger code

$query103      = "select led_code from acc_ledger_master where led_custcode = $rethcust and led_type = 'C'";

$result103     = mysqli_query($conn, $query103);
$rec103        = mysqli_fetch_array($result103);
$cust_ledger   = $rec103['led_code'];


#Find Insurance Ledger code
$query102    	= "select lnk_ledcode from acc_link_ledger where lnk_system = 'sales' and lnk_name = 'insurance'";
$result102   	= mysqli_query($conn, $query102);
$rec102      	= mysqli_fetch_array($result102);
$ins_ledger	= $rec102['lnk_ledcode'];

#Find Freight Ledger code

    $query102  	= "select lnk_ledcode from acc_link_ledger where lnk_system = 'sales' and lnk_name = 'TNfreight'";
$result102   	= mysqli_query($conn, $query102);
$rec102      	= mysqli_fetch_array($result102);
$frt_ledger	= $rec102['lnk_ledcode'];

#Find Rounindoff  Ledger code
$query102    	= "select lnk_ledcode from acc_link_ledger where lnk_system = 'sales' and lnk_name = 'roundoff'";
$result102   	= mysqli_query($conn, $query102);
$rec102      	= mysqli_fetch_array($result102);
$round_ledger	= $rec102['lnk_ledcode'];

#Find TCS  Ledger code
$query102    	= "select lnk_ledcode from acc_link_ledger where lnk_system = 'sales' and lnk_name = 'TCS'";
$result102   	= mysqli_query($conn, $query102);
$rec102      	= mysqli_fetch_array($result102);
$TCSledger	= $rec102['lnk_ledcode'];


#Find Sales / GST ledgers
$query102    	= "select * from massal_tax where tax_code ='$rethtaxtag'";
$result102   	= mysqli_query($conn, $query102);
$rec102      	= mysqli_fetch_array($result102);
$salesLedCode   = $rec102['tax_sal_led_code'];
$cgstLedCode    = $rec102['tax_cgst_ledcode'];
$sgstLedCode    = $rec102['tax_sgst_ledcode'];
$igstLedCode    = $rec102['tax_igst_ledcode'];


$voutype ='GSR';






    $query1 = "select accref_seqno from acc_ref  where accref_comp_code = $rethcompcode and accref_finid =  $rethfincode  and accref_vouno = '$rethvouno'";
    $result1= mysqli_query($conn, $query1);
    $rec2 = mysqli_fetch_array($result1);
    $ginaccrefseq =$rec2['accref_seqno'];



	$query5= "delete from acc_trail where  acctrail_accref_seqno =$ginaccrefseq";
	$result5=mysqli_query($conn, $query5);   
		 
	$query6= "delete from acc_tran  where  acctran_accref_seqno  =$ginaccrefseq";
	$result6=mysqli_query($conn, $query6);   

	$query7= "delete from acc_ref  where  accref_seqno  =$ginaccrefseq";
	$result7=mysqli_query($conn, $query7);   





#Insert AccTran


if ($rethamt > 0)
{
$querya1 = "call acc_sp_trn_insacc_ref('$ginaccrefseq','$rethvouno','$rethcompcode','$rethfincode','$rethdate','$voutype','-','-','$rethinvno','$rethinvdate','$narration',1,1)";
$resulta1 = mysqli_query($conn, $querya1);
}

#Insert AccTrail
$seqno =  1;
if ($rethamt > 0)
{
$querya2 = "call acc_sp_trn_insacc_trail('$ginaccrefseq','$seqno','$rethvouno','$rethdate','$rethamt','0','$cust_ledger','C');";
$resulta2 = mysqli_query($conn, $querya2);
}



$salesvalue = $rethtaxable;

$seqno    =  1;	
if ($rethamt > 0)
{
$querya4  = "call acc_sp_trn_insacc_tran('$ginaccrefseq',$seqno,'$cust_ledger',0,'$rethamt','$rethamt',1,0,0,'','$voutype');";
$resulta4 = mysqli_query($conn, $querya4);
}
$seqno    = $seqno + 1;	




if ($salesvalue > 0)
{
    $querya10  = "call acc_sp_trn_insacc_tran('$ginaccrefseq',$seqno,'$salesLedCode','$salesvalue',0,'$salesvalue',1,0,0,'','$voutype');";
    $resulta10 = mysqli_query($conn, $querya10);
    $seqno    = $seqno + 1;	

}

if ($rethfrieght > 0)
{
    $querya5  = "call acc_sp_trn_insacc_tran('$ginaccrefseq',$seqno,'$frt_ledger','$rethfrieght',0,'$rethfrieght',1,0,0,'','$voutype');";
    $resulta5 = mysqli_query($conn, $querya5);
    $seqno    = $seqno + 1;	

}




if ($rethinsamt > 0)
{
    $querya5  = "call acc_sp_trn_insacc_tran('$ginaccrefseq',$seqno,'$ins_ledger','$rethinsamt',0,'$rethinsamt',1,0,0,'','$voutype');";
    $resulta5 = mysqli_query($conn, $querya5);
    $seqno    = $seqno + 1;	

}

if ($rethigstamt > 0)
{
    $querya7  = "call acc_sp_trn_insacc_tran('$ginaccrefseq',$seqno,'$igstLedCode','$rethigstamt',0,'$rethigstamt',1,0,0,'','$voutype');";
    $resulta7 = mysqli_query($conn, $querya7);
    $seqno    = $seqno + 1;	

}
if ($rethcgstamt > 0)
{
    $querya8  = "call acc_sp_trn_insacc_tran('$ginaccrefseq',$seqno,'$cgstLedCode','$rethcgstamt',0,'$rethcgstamt',1,0,0,'','$voutype');";
    $resulta8 = mysqli_query($conn, $querya8);
    $seqno    = $seqno + 1;	

}

if ($rethsgstamt > 0)
{
    $querya9  = "call acc_sp_trn_insacc_tran('$ginaccrefseq',$seqno,'$sgstLedCode','$rethsgstamt',0,'$rethsgstamt',1,0,0,'','$voutype');";
    $resulta9 = mysqli_query($conn, $querya9);
    $seqno    = $seqno + 1;	

}
/*
if ($invhtcsamt > 0)
{
    $querya9  = "call acc_sp_trn_insacc_tran('$ginaccrefseq',$seqno,'$TCSledger',0,'$invhtcsamt','$invhtcsamt',1,0,0,'','$voutype');";
    $resulta9 = mysqli_query($conn, $querya9);
    $seqno    = $seqno + 1;	

}
*/

if ($rethroff > 0)
{
    $querya10  = "call acc_sp_trn_insacc_tran('$ginaccrefseq',$seqno,'$round_ledger','$rethroff','0','$rethroff',1,0,0,'','$voutype');";
    $resulta10 = mysqli_query($conn, $querya10);
    $seqno     = $seqno + 1;	

}


if ($rethroff < 0)
{
    $rethroff = $rethroff * -1;
    $querya10  = "call acc_sp_trn_insacc_tran('$ginaccrefseq',$seqno,'$round_ledger',0,'$rethroff','$rethroff',1,0,0,'','$voutype');";
    $resulta10 = mysqli_query($conn, $querya10);
    $seqno     = $seqno + 1;	

}


	if( $result1 && $result5 && $result6 && $result7 && $resulta4 && $resulta10 )
	{
		mysqli_begin_transaction($conn);                        
		echo '({"success":"true","retno":"'. $rethno . '"})';

		    
	}
	else
	{
	    mysqli_rollback($conn);

            
	    echo '({"success":"false","retno":"' . $rethno . '"})';
	} 
  
   
?>
