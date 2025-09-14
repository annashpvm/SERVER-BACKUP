<?php

require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");

$flagtype = strtoupper($_REQUEST['flagtype']);
$griddet = json_decode($_REQUEST['griddet'], true);
$rowcnt = $_REQUEST['cnt'];
$voudate = $_REQUEST['voudate'];
$refno = $_REQUEST['refno'];
$refdate = $_REQUEST['refdate'];
$narration = $_REQUEST['narration'];
$finid = $_REQUEST['finid'];
$finyear = $_REQUEST['finyear'];
$compcode = $_REQUEST['compcode'];
$taxtype = $_REQUEST['taxtype'];
$taxval = $_REQUEST['taxval'];
$taxvalnewcal = $_REQUEST['taxval'];
$per = $_REQUEST['per'];
$exqty = $_REQUEST['exqty'];
$extype = $_REQUEST['extype'];
$ExTypeMtr = $_REQUEST['ExTypeMtr'];
$Nature = $_REQUEST['Nature'];
$cgstledcode = $_REQUEST['cgst'];
$sgstledcode = $_REQUEST['sgst'];
$igstledcode = $_REQUEST['igst'];
$entrypoint = $_REQUEST['entrypoint'];
$amtmode = "D";
$tdssection = $_REQUEST['tdssection'];


if ($taxtype == "CS") {
    $taxval = floor(($_REQUEST['taxval'] / 2) * 100) / 100;
} else if ($taxtype == "I") {
    $taxval = $_REQUEST['taxval'];
}

for ($p = 0; $p < $rowcnt; $p++) {
    $dbamtnew = $dbamtnew + $griddet[$p]['dbamt'];
    $cramtnew = $cramtnew + $griddet[$p]['cramt'];
}

$dbamtnew = $dbamtnew + $taxvalnewcal;

$querynewdel = "delete from expense_temp_vm";
$resultnewdel = mysql_query($querynewdel);

$querynew = "insert into expense_temp_vm values('$dbamtnew','$cramtnew')";
$resultnew = mysql_query($querynew);

if ($refdate > 0 && $finid > 0 && $compcode > 0) {
    $query1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
    $result1 = mysql_query($query1);
    $rec1 = mysql_fetch_array($result1);
    $ginaccrefseq = $rec1['con_value'];

    $query2 = "select ifnull(max(convert(substring(accref_vouno,3),signed)),0) +1 as vou_no from acc_ref where accref_vou_type = 'EX' and accref_finid = '$finid' and accref_comp_code = '$compcode';";
    $result2 = mysql_query($query2);
    $rec2 = mysql_fetch_array($result2);
    $ginvouno = $rec2['vou_no'];
    $vouno = "EX" . $ginvouno;

    mysql_query("BEGIN");

    $querya2 = "call acc_sp_trn_insacc_ref('$ginaccrefseq','$vouno','$compcode','$finid','$voudate','EX','','','$refno','$refdate','$narration',0,0,'$entrypoint');";
    $resulta2 = mysql_query($querya2);

	if($ExTypeMtr=='METER'){
		$newmtr=$_REQUEST['exqty'];
		$newkgs=0;	
	}else if($ExTypeMtr=='KGS'){
		$newmtr=0;
		$newkgs=$_REQUEST['exqty'];
	}

	if($exqty>0){
        $queryex = "insert into acc_expense_details values ('$ginaccrefseq','$exqty','$extype','$newmtr','$newkgs','$Nature')";
        $resultex = mysql_query($queryex);
   	}

    $inscnt = 0;
    $countrec = 0; 
    for ($i = 0; $i < $rowcnt; $i++) {
        $slno = $i + 1;
        $ledseq = $griddet[$i]['ledseq'];
        $dbamt = $griddet[$i]['dbamt'];
        $cramt = $griddet[$i]['cramt'];
        $totamt = $griddet[$i]['totamt'];
        $curseq = $griddet[$i]['curseq'];
        $amount = $griddet[$i]['amount'];
        $exgrate = $griddet[$i]['exgrate'];
        $hsn = $griddet[$i]['hsn'];
        $pertdsnew = $griddet[$i]['tdsper'];
        $tdsvaluenew = $griddet[$i]['tdsval'];
        $ledtype = $griddet[$i]['ledtype'];
        $total1  = $griddet[$i]['total1'];
            if ($dbamt>0)
            {
              $amtmode = "D";
            }
            else
            {
              $amtmode = "C";
            }
        if ($ledseq > 0) {

         //   if ($ledtype <> "G" && $total1 > 0 ) { // Updated 21-Oct-2021
//               $querya3 = "call acc_sp_trn_insacc_trail('$ginaccrefseq','$slno','$refno','$refdate','$totamt','0','$ledseq','$amtmode');";
               $querya3 = "call acc_sp_trn_insacc_trail('$ginaccrefseq','$slno','$refno','$refdate','$total1','0','$ledseq','$amtmode');";

               $resulta3 = mysql_query($querya3);
           // }

            $querya4 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$ledseq','$dbamt','$cramt','$totamt','$curseq','','$exgrate','$hsn','EX');";
            $resulta4 = mysql_query($querya4);

            $querytds = "select led_grp_code from acc_ledger_master where led_code='$ledseq'";
            $resulttds = mysql_query($querytds);
            $rectds = mysql_fetch_array($resulttds);
            $tedled = $rectds['led_grp_code'];

            $querytdsmax = "select ifnull(max(id),0) + 1 as id from acc_tds";
            $resulttdsmax = mysql_query($querytdsmax);
            $rectdsmax = mysql_fetch_array($resulttdsmax);
            $tedledmax = $rectdsmax['id'];

            if ($tedled == 65 && $pertdsnew > 0) {
                $querytdsins = "insert into acc_tds values('$tedledmax','$ginaccrefseq','$pertdsnew','$tdsvaluenew','$ledseq',curdate(),'$cramt','$finid','$compcode','$vouno','$tdssection')";
                $resulttdsins = mysql_query($querytdsins);
            }

            if ($resulta3 & $resulta4) {
                $inscnt = $inscnt + 1;
            }
        }
    }

    $countrec = $rowcnt+1;

    if ($taxval > 0) {
            if ($taxtype == "CS") {
                $querya5 = "call acc_sp_trn_insacc_tran('$ginaccrefseq',$countrec,'$cgstledcode','$taxval','0','$taxval','','$amount','','','EX');";
                $resulta5 = mysql_query($querya5);
                $countrec =    $countrec + 1;
                $querya6 = "call acc_sp_trn_insacc_tran('$ginaccrefseq',$countrec,'$sgstledcode','$taxval','0','$taxval','','$amount','','','EX');";
                $resulta6 = mysql_query($querya6);
            } else if ($taxtype == "I") {
                $querya5 = "call acc_sp_trn_insacc_tran('$ginaccrefseq',$countrec,'$igstledcode','$taxval','0','$taxval','','$amount','','','EX');";
                $resulta5 = mysql_query($querya5);
            }
        }

}

if ($resulta2 && ($rowcnt == $inscnt)) {
    mysql_query("COMMIT");
    echo '({"success":"true","vouno":"' . $vouno . '"})';
} else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","vouno":"' . $dbamtnewval . $cramtnew . '"})';
}
?>
