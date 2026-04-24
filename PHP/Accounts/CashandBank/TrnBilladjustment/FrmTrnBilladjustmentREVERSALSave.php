<?php

require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");

$griddet = json_decode($_REQUEST['griddet'], true);
$cnt     = $_REQUEST['cnt'];

$gridadjdet = json_decode($_REQUEST['gridadjdet'], true);
$rowcnt     = $_REQUEST['adjcnt'];


$compcode     = $_REQUEST['compcode'];
$finid        = $_REQUEST['finid'];
$vouseqno     = $_REQUEST['vouseqno'];
$vouno        = $_REQUEST['vouno'];
$accvoudate   = $_REQUEST['voudate'];
$ledcode      = $_REQUEST['ledgercode'];

$voudrcr      = $_REQUEST['voudrcr'];

$oldadjamt   = $vouamount * -1;


$adjcheck = 0;

mysqli_begin_transaction($conn);

// for Main Voucher 
for ($i = 0; $i < $cnt; $i++) {
 
    $vouseqno  = (int) $griddet[$i]['accref_seqno'];
    $drcr      = $griddet[$i]['acctrail_amtmode'];
    $queryMain = "update acc_trail set	acctrail_adj_value	=	0 where	acctrail_accref_seqno = $vouseqno and acctrail_led_code	= $ledcode and acctrail_amtmode	=	'$drcr'";
    $resultMain = mysqli_query($conn, $queryMain);    

//   echo $queryMain;     
//   echo "<br>";       
}




for ($i = 0; $i < $rowcnt; $i++) {
 
    $slno     = (int) $gridadjdet[$i]['ref_slno'];
    
    $adjseqno = (int) $gridadjdet[$i]['ref_adjseqno'];
   
    $adrcr = $gridadjdet[$i]['adrcr'];
    
    
    $oldadjamt = (float) $gridadjdet[$i]['ref_adjamount'] ;
    
    $queryDel = "delete from acc_adjustments where ref_compcode = $compcode and ref_finid = $finid  and  ref_slno = $slno";
    $resultDel = mysqli_query($conn, $queryDel);


    $queryAdj = "update acc_trail set	acctrail_adj_value	=	acctrail_adj_value -  $oldadjamt where	acctrail_accref_seqno = $adjseqno and acctrail_led_code	= $ledcode and acctrail_amtmode	=	'$adrcr'";
    $resultAdj = mysqli_query($conn, $queryAdj);    

//   echo $queryAdj;     
//   echo "<br>";
    
       
}



    if ( $resultMain && $resultDel && $resultAdj ) {
        mysqli_commit($conn);
        echo '({"success":"true","vouno":"' . $ginrefslno . '"})';
    } else {
        mysqli_rollback($conn);


        echo '({"success":"false","vouno":"' . $ginrefslno . '"})';
    }


?>

