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

                

mysql_query("BEGIN");




//echo $query;
//echo "<br>";


for ($i = 0; $i < $rowcnt; $i++) {

    $documentseqno = 0;    
    $slno     = (int) $gridadjdet[$i]['ref_slno'];
    $docseqno = (int) $gridadjdet[$i]['ref_docseqno'];
    $adjseqno = (int) $gridadjdet[$i]['ref_adjseqno'];

    $oldamt = (float) $gridadjdet[$i]['ref_adjamount'];
    $newamt = (float) $gridadjdet[$i]['newadjusted'];


    $adjvouno =  $gridadjdet[$i]['ref_adjvouno'];
    $adjvoudate =  $gridadjdet[$i]['ref_adjvoudate'];


    $vouno =  $gridadjdet[$i]['ref_docno'];
    $voudate =  $gridadjdet[$i]['ref_docdate'];

    $invno = $gridadjdet[$i]['acctrail_inv_no'];
    $invdate = $gridadjdet[$i]['acctrail_inv_date'];

    $mdrcr = $gridadjdet[$i]['mdrcr'];
    $adrcr = $gridadjdet[$i]['adrcr'];

/*
    if ($vouseqno  ==  $docseqno)
       $documentseqno = $adjseqno;
    else
       $documentseqno = $docseqno;
*/

    $oldadjamt = (float) $gridadjdet[$i]['ref_adjamount'] * -1; // for less old adjusted amount

    $adjvouno  = $gridadjdet[$i]['accref_vouno'];
    
    $accadjseqno = $gridadjdet[$i]['ref_adjseqno'];
    //$invno = $gridadjdet[$i]['acctrail_inv_no'];

//    if  ($newamt > 0)     
    //{
         $query = "delete from acc_adjustments where ref_compcode = $compcode and ref_finid = $finid  and  ref_slno = $slno";
         $result1 = mysql_query($query);

         //echo $query;
         //echo "<br>";

    //    $query2 = "call acc_sp_trn_updacc_trail_seq_no('$docseqno','$vouno','$oldadjamt','$ledcode')";
        $query2 = "call acc_sp_trn_updacc_trail_seq_no_New('$docseqno','$vouno','$oldadjamt','$ledcode','$mdrcr')";

        $result2 = mysql_query($query2);

//echo $query2;
//echo "<br>";

//$query2 = "call acc_sp_trn_updacc_trail_seq_no('$vouseqno','$invno','$oldadjamt','$ledcode')";
//$result2 = mysql_query($query2);

//echo $query2;
//echo "<br>";

 //       $query3 = "call acc_sp_trn_updacc_trail_seq_no('$adjseqno','$invno','$oldadjamt','$ledcode')";
        //echo "<br>";
        $query3 = "call acc_sp_trn_updacc_trail_seq_no_New('$adjseqno','$invno','$oldadjamt','$ledcode','$adrcr')";
        $result3 = mysql_query($query3);
//echo $query3;
//echo "<br>";

    //}
}
$inscnt = 0;
for ($i = 0; $i < $rowcnt; $i++) {



    $ginrefslno = $ginrefslno + 1;
//    $adjvouno  = $gridadjdet[$i]['accref_vouno'];
    $invno = $gridadjdet[$i]['acctrail_inv_no'];
    $invdate = $gridadjdet[$i]['acctrail_inv_date'];

    $adjamt = (float) $gridadjdet[$i]['newadjusted'];

    $oldadjamt = (float) $gridadjdet[$i]['ref_adjamount'];


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

    $query = "select ifnull(max(ref_slno),0) as refslno from acc_adjustments";
    $result = mysql_query($query);
    $rec = mysql_fetch_array($result);
    $ginrefslno = $rec['refslno'];

      $ginrefslno = $ginrefslno + 1;

		$querydate = "select datediff('$accvoudate','$invdate') as daysin";
		$resultdate = mysql_query($querydate);
		$recdatenew = mysql_fetch_array($resultdate);
		$adjdays=$recdatenew['daysin'];



        $query1 = "insert into acc_adjustments (ref_slno, ref_compcode, ref_finid, ref_docseqno, ref_docno, ref_docdate, ref_adjseqno, ref_adjvouno, ref_invno, ref_invdate, ref_adjamount, ref_adj_days, ref_adj_by, ref_adjusted_on,ref_paymt_terms,ref_ledcode,ref_adjvoutype,ref_adjvoudate) values ('$ginrefslno','$compcode','$finid','$ref_docseqno','$vouno', '$accvoudate', '$accadjseqno','$adjvouno','$invno','$invdate','$adjamt',$adjdays,'BA',curdate(),$payterms,'$ledcode','$voutype' ,'$adjvoudate');";

        $result1 = mysql_query($query1);

        // $query2 = "call acc_sp_trn_updacc_trail_seq_no('$docseqno','$vouno','$adjamt','$ledcode')";
        $query2 = "call acc_sp_trn_updacc_trail_seq_no_New('$docseqno','$vouno','$adjamt','$ledcode','$mdrcr')";
        $result2 = mysql_query($query2);

//echo $query2;
//echo "<br>";

//echo $query2;
//echo "<br>";
//        $query3 = "call acc_sp_trn_updacc_trail_seq_no('$adjseqno','$invno','$adjamt','$ledcode')";
        $query3 = "call acc_sp_trn_updacc_trail_seq_no_New('$adjseqno','$invno','$adjamt','$ledcode','$adrcr')";
        $result3 = mysql_query($query3);
//echo $query3;
//echo "<br>";        

//echo $query1;
//echo "<br>";

/*
        $query2 = "call acc_sp_trn_updacc_trail_seq_no('$accadjseqno','$vouno','$adjamt','$ledcode')";
        $result2 = mysql_query($query2);

        $query2 = "call acc_sp_trn_updacc_trail_seq_no('$accadjseqno','$invno','$adjamt','$ledcode')";
        $result2 = mysql_query($query2);
//echo $query2;
//echo "<br>";
        $query3 = "call acc_sp_trn_updacc_trail_seq_no('$ref_docseqno','$invno','$adjamt','$ledcode')";
        $result3 = mysql_query($query3);
//echo $query3;
//echo "<br>";

*/

   }

}


if ( $result1 && $result2 && $result3 ) {
    mysql_query("COMMIT");
    echo '({"success":"true","vouno":"' . $ginrefslno . '"})';
} else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","vouno":"' . $ginrefslno . '"})';
}
?>

