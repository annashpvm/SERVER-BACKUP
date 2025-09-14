<?php

require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_REQUEST['cnt'];

$griddetacc = json_decode($_REQUEST['griddetacc'],true);
$rowcntacc = $_REQUEST['cntacc'];



$compcode = $_REQUEST['compcode'];
$finid    = $_REQUEST['finid'];
$gstFlaggrn = $_REQUEST['gstFlaggrn'];

$rech_seqno = $_REQUEST['seqno'];
$rech_no    = strtoupper($_REQUEST['edgrnno']);

$newbillno   = strtoupper($_REQUEST['newbillno']);
$NewBillDt   =  $_REQUEST['NewBillDt'];

$ginaccrefseq = (int)$_POST['accseqno'];



        $query1 = "update trnrm_receipt_header set rech_billno = '$newbillno' , rech_billdate = '$NewBillDt'  where rech_compcode = $compcode and rech_fincode = $finid  and rech_no = '$rech_no'";
        $result1=mysql_query($query1);

//echo $query1;
//echo "<br>";




//ACCOUNTS
        $query2 = "update acc_ref set accref_payref_no = '$newbillno'  , accref_payref_date = '$NewBillDt'   where accref_seqno ='$ginaccrefseq' and accref_comp_code='$compcode' and accref_finid ='$finid' and accref_vouno = '$rech_no'";
        $result2 = mysql_query($query2);
//echo $query2;
//echo "<br>";	

        $query3 = "update acc_trail set acctrail_inv_no = '$newbillno'  , acctrail_inv_date = '$NewBillDt'   where acctrail_accref_seqno ='$ginaccrefseq'";
        $result3 = mysql_query($query3);
//echo $query3;
//echo "<br>";	




	if($result1 && $result2 && $result3 )
	{
			mysql_query("COMMIT");                        
			echo '({"success":"true","GRNNo":"' . $rech_no . '"})';

		    
	}
	else
	{
	    mysql_query("ROLLBACK");            
	    echo '({"success":"false","GRNNo":"' . $rech_no . '"})';
	}   

        
 
?>
