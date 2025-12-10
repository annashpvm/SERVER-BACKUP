<?php

require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");

$gridadjdet = json_decode($_REQUEST['gridadjdet'], true);
$rowcnt = $_REQUEST['adjcnt'];

$compcode     = $_REQUEST['compcode'];
$finid        = $_REQUEST['finid'];
$vouseqno     = $_REQUEST['vouseqno'];
$vouno        = $_REQUEST['vouno'];
$accvoudate   = $_REQUEST['voudate'];
$ledcode      = $_REQUEST['ledgercode'];

$vouinvno     = $_REQUEST['vouinvno'];
$vouamount    = (float) $_REQUEST['vouamount'];
$vouadjamount = (float) $_REQUEST['vouadjamount'];
$voudrcr      = $_REQUEST['voudrcr'];

$oldadjamt   = $vouamount * -1;


$adjcheck = 0;

mysqli_begin_transaction($conn);


//$query1 = "call acc_sp_trn_updacc_trail_seq_no_New('$vouseqno','$vouinvno','$oldadjamt','$ledcode','$voudrcr')";
//$result1 = mysqli_query($conn, $query1);


//$query2 = "call acc_sp_trn_updacc_trail_seq_no_New('$vouseqno','$vouinvno','$vouadjamount','$ledcode','$voudrcr')";
//$result2 = mysqli_query($conn, $query2);


//echo $query1;
//echo "<br>";

//echo $query2;
//echo "<br>";


for ($i = 0; $i < $rowcnt; $i++) {
 
    $slno     = (int) $gridadjdet[$i]['ref_slno'];
    
    $adjseqno = (int) $gridadjdet[$i]['ref_adjseqno'];
    $docseqno = (int) $gridadjdet[$i]['ref_docseqno'];
    
    
    $adrcr = $gridadjdet[$i]['adrcr'];
    $invno = $gridadjdet[$i]['acctrail_inv_no'];
//    $oldadjamt = (float) $gridadjdet[$i]['ref_adjamount'] *-1;
    $oldadjamt = (float) $gridadjdet[$i]['ref_adjamount'] ;
    $query1 = "delete from acc_adjustments where ref_compcode = $compcode and ref_finid = $finid  and  ref_slno = $slno";
    $result1 = mysqli_query($conn, $query1);

    //$query2 = "call acc_sp_trn_updacc_trail_seq_no_New('$adjseqno','$invno','$oldadjamt','$ledcode','$adrcr')";
    $query2 = "update acc_trail set	acctrail_adj_value	=	acctrail_adj_value -  $oldadjamt where	acctrail_accref_seqno = $adjseqno and acctrail_led_code	= $ledcode and acctrail_amtmode	=	'$adrcr'";
    $result2 = mysqli_query($conn, $query2);    

    //echo $query2;     
    //echo "<br>";
    
//    $query3 = "call acc_sp_trn_updacc_trail_seq_no_New('$vouseqno','$vouinvno','$oldadjamt','$ledcode','$voudrcr')";

    $query3 = "update acc_trail set	acctrail_adj_value	=	acctrail_adj_value -  $oldadjamt where	acctrail_accref_seqno = $vouseqno and acctrail_led_code	= $ledcode and acctrail_amtmode	=	'$voudrcr'";

    $result3 = mysqli_query($conn, $query3);    

    //echo $query3;     
    //echo "<br>";
       
}

$inscnt = 0;
for ($i = 0; $i < $rowcnt; $i++) {



//    $ginrefslno = $ginrefslno + 1;
//    $adjvouno  = $gridadjdet[$i]['accref_vouno'];
    $invno = $gridadjdet[$i]['acctrail_inv_no'];
    $invdate = $gridadjdet[$i]['acctrail_inv_date'];

    $adjamt = (float) $gridadjdet[$i]['newadjusted'];

    $oldadjamt = (float) $gridadjdet[$i]['ref_adjamount'] *-1;


    $accadjseqno = $gridadjdet[$i]['ref_adjseqno'];


    $voutype = $gridadjdet[$i]['accref_vou_type'];
    $Year = $gridadjdet[$i]['Year'];

    $payterms    = (int)$gridadjdet[$i]['ref_paymt_terms'];

    $dbcramt = $gridadjdet[$i]['acctrail_inv_value'];


    $ref_docseqno = $gridadjdet[$i]['ref_docseqno'];

    $adjvouno =  $gridadjdet[$i]['ref_adjvouno'];
    $adjvoudate =  $gridadjdet[$i]['ref_adjvoudate'];

    $vouno =  $gridadjdet[$i]['ref_docno'];
    $voudate =  $gridadjdet[$i]['ref_docdate'];

    $docseqno = (int) $gridadjdet[$i]['ref_docseqno'];
    $adjseqno = (int) $gridadjdet[$i]['ref_adjseqno'];
    
    $mdrcr = $gridadjdet[$i]['mdrcr'];
    $adrcr = $gridadjdet[$i]['adrcr'];


    if ($adjamt > 0) {

        $adjcheck += 1;

        $query = "select ifnull(max(ref_slno),0) as refslno from acc_adjustments";
        $result = mysqli_query($conn, $query);
        $rec = mysqli_fetch_array($result);
        $ginrefslno = $rec['refslno'];

        $ginrefslno = $ginrefslno + 1;

		$querydate = "select datediff('$accvoudate','$invdate') as daysin";
		$resultdate = mysqli_query($conn, $querydate);
		$recdatenew = mysqli_fetch_array($resultdate);
		$adjdays=$recdatenew['daysin'];



        $query5 = "insert into acc_adjustments (ref_slno, ref_compcode, ref_finid, ref_docseqno, ref_docno, ref_docdate, ref_adjseqno, ref_adjvouno, ref_invno, ref_invdate, ref_adjamount, ref_adj_days, ref_adj_by, ref_adjusted_on,ref_paymt_terms,ref_ledcode,ref_adjvoutype,ref_adjvoudate,ref_adjvoutype_db_cr) values ('$ginrefslno','$compcode','$finid','$ref_docseqno','$vouno', '$accvoudate', '$accadjseqno','$adjvouno','$invno','$invdate','$adjamt',$adjdays,'BA',curdate(),$payterms,'$ledcode','$voutype' ,'$adjvoudate','$adrcr');";
        $result5 = mysqli_query($conn, $query5);


        $query6 = "call acc_sp_trn_updacc_trail_seq_no_New('$adjseqno','$invno','$adjamt','$ledcode','$adrcr')";
        $result6 = mysqli_query($conn, $query6);


        $query7 = "call acc_sp_trn_updacc_trail_seq_no_New('$vouseqno','$vouinvno','$adjamt','$ledcode','$voudrcr')";
        $result7 = mysqli_query($conn, $query7);            

        //echo $query6;
        //echo "<br>";      


   }

}


if ($adjcheck == 0)
{
    if ( $result1 && $result2 && $result3 ) {
        mysqli_commit($conn);
        echo '({"success":"true","vouno":"' . $ginrefslno . '"})';
    } else {
        mysqli_rollback($conn);


        echo '({"success":"false","vouno":"' . $ginrefslno . '"})';
    }
}
else
{
    if ( $result1 && $result2 && $result3 && $result5 && $result6 && $result7 ) {
        mysqli_commit($conn);
        echo '({"success":"true","vouno":"' . $ginrefslno . '"})';
    } else {
        mysqli_rollback($conn);


        echo '({"success":"false","vouno":"' . $ginrefslno . '"})';
    }
}

?>

