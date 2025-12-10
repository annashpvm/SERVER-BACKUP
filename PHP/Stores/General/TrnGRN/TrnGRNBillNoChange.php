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



        $query1 = "update trnpur_min_header set minh_bill_no = '$newbillno' , minh_bill_date = '$NewBillDt'  where minh_comp_code = $compcode and minh_fin_code = $finid  and minh_minno = '$rech_no'";
        $result1=mysqli_query($conn, $query1);

//echo $query1;
//echo "<br>";




//ACCOUNTS
        $query2 = "update acc_ref set accref_payref_no = '$newbillno'  , accref_payref_date = '$NewBillDt'   where accref_seqno ='$ginaccrefseq' and accref_comp_code='$compcode' and accref_finid ='$finid' and accref_vouno = '$rech_no'";
        $result2 = mysqli_query($conn, $query2);
//echo $query2;
//echo "<br>";	

        $query3 = "update acc_trail set acctrail_inv_no = '$newbillno'  , acctrail_inv_date = '$NewBillDt'   where acctrail_accref_seqno ='$ginaccrefseq'";
        $result3 = mysqli_query($conn, $query3);
//echo $query3;
//echo "<br>";	




	if($result1 && $result2 && $result3 )
	{
			mysqli_begin_transaction($conn);                        
			echo '({"success":"true","GRNNo":"' . $rech_no . '"})';

		    
	}
	else
	{
	    mysqli_rollback($conn);

            
	    echo '({"success":"false","GRNNo":"' . $rech_no . '"})';
	}   

        
 
?>
