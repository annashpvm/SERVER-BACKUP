<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $flagtype = strtoupper($_REQUEST['flagtype']);
    $griddet = json_decode($_REQUEST['griddet'],true);
    $gridadjdet = json_decode($_REQUEST['gridadjdet'],true);
    $rowcnt = $_REQUEST['cnt'];
    $arowcnt = $_REQUEST['adjcnt'];
    $accrefseq = $_REQUEST['accrefseq'];
    $vouno = $_REQUEST['vouno'];
    $voudate = $_REQUEST['voudate'];
    $bankname = $_REQUEST['bankname'];
    $refno = $_REQUEST['refno'];
    $refdate = $_REQUEST['refdate'];
    $narration = $_REQUEST['narration'];
    $paytype = $_REQUEST['paytype'];
    $paymode = $_REQUEST['paymode'];
    $payno = $_REQUEST['payno'];
    $paydate = $_REQUEST['paydate'];
    $headacct = $_REQUEST['headacct'];
    $rcptamt = $_REQUEST['rcptamt'];
    $totadjamt = $_REQUEST['totadjamt'];
    $finid = $_REQUEST['finid'];
    $finyear = $_REQUEST['finyear'];
    $compcode = $_REQUEST['compcode'];

$entrypoint = $_REQUEST['entrypoint'];


    
        $cquery1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
        $cresult1 = mysql_query($cquery1);
        $crec1 = mysql_fetch_array($cresult1);
        $caccrefseq=$crec1['con_value'];
        
        $cquery2 = "select led_prefix from acc_ledger_master where led_code = '$headacct' and led_comp_code = '$compcode';";
        $cquery2 = "select led_prefix from acc_ledger_master, acc_current_balance where led_code = '$headacct' and curbal_comp_code = '$compcode' and curbal_led_code = led_code  and curbal_finid = '$finid'";
        $cquery2 = "select led_prefix from acc_ledger_master where led_code = '$headacct'";

        $cresult2 = mysql_query($cquery2);
        $crec2 = mysql_fetch_array($cresult2);
        $cledprefix=$crec2['led_prefix'];
        
        $cquery3 = "select curbal_rec_seqno from acc_current_balance where curbal_led_code = '$headacct' and curbal_finid = '$finid'  and curbal_comp_code = '$compcode';";
        $cresult3 = mysql_query($cquery3);
        $crec3 = mysql_fetch_array($cresult3);
        $crcptno = $crec3['curbal_rec_seqno'];
        
        $cvouno=$cledprefix."BR".$crcptno;

        $query4 = "select ifnull(max(recpay_seqno),0) + 1 as con_value from acc_recpay_tran;";
        $result4 = mysql_query($query4);
        $rec4 = mysql_fetch_array($result4);
        $ginrecpayseq=$rec4['con_value'];
        
        mysql_query("BEGIN");

        $cquerya2 = "call acc_sp_trn_insacc_ref(".$caccrefseq.",'".$cvouno."',".$compcode.",".$finid.",'".$voudate."','BR','".$bankname."','"
            .$paymode."','".$payno."','".$paydate."','".$narration."',0,0,'$entrypoint');";
        $cresulta2 = mysql_query($cquerya2);
      //  echo ($cquerya2);
        $inscnt = 0;
        for($i=0;$i<$rowcnt;$i++){
            $slno = $i+1;
            $ledseq = $griddet[$i]['ledseq'];
            $dbamt = $griddet[$i]['dbamt'];
            $cramt = $griddet[$i]['cramt'];
            $totamt = $griddet[$i]['totamt'];
            $curseq = $griddet[$i]['curseq'];
            $amount = $griddet[$i]['amount'];
            $exgrate = $griddet[$i]['exgrate'];
            if ($slno==1 && $paytype=="BB"){
                $adjamt = $totadjamt;
            }else{
                $adjamt=0;
            }
            $ledtype = $griddet[$i]['ledtype'];
            if ($dbamt>0)
            {
              $amtmode = "D";
            }
            else
            {
              $amtmode = "C";
            }
           // if ($ledtype <> "G") { // Updated 21-Oct-2021
//               $querya3 = "call acc_sp_trn_insacc_trail('$caccrefseq','$slno','$refno','$refdate','$totamt','$adjamt','$ledseq','$amtmode');";
               $querya3 = "call acc_sp_trn_insacc_trail('$caccrefseq','$slno','$cvouno','$voudate','$totamt','$adjamt','$ledseq','$amtmode');";
               $resulta3 = mysql_query($querya3);
           //    echo ($querya3);
         //   } 

            $querya4 = "call acc_sp_trn_insacc_tran('$caccrefseq','$slno','$ledseq','$dbamt','$cramt','$totamt','$curseq','$amount','$exgrate','','$paytype');";
            $resulta4 = mysql_query($querya4);
          //  echo ($querya4);
            if($resulta3 && $resulta4){
                $inscnt = $inscnt + 1;
            }
        }
        $slno=$slno+1;
/*
        if ($ledtype <> "G") { 
           $querya8 = "call acc_sp_trn_insacc_trail('$caccrefseq','$slno','$refno','$refdate','$rcptamt','$totadjamt','$headacct');";
           $resulta8 = mysql_query($querya8);
        }
*/
        $querya9 = "call acc_sp_trn_insacc_tran('$caccrefseq','$slno','$headacct','$rcptamt','0','$rcptamt','$curseq','$amount','$exgrate','','$paytype');";
        $resulta9 = mysql_query($querya9);
     //   echo ($querya9);
        $crcptno += 1;

        $querya10 = "call acc_sp_trn_updcurbal_recpay_seqno('REC','$crcptno','$headacct','$finid','$compcode');";
        $resulta10 = mysql_query($querya10);
      //  echo ($querya10);
      //  echo ($rowcnt);
        for($i=0;$i<$arowcnt;$i++){
            $oaccrefseq = $gridadjdet[$i]['accrefseqno'];
            $oaccvouno = $gridadjdet[$i]['invno'];
            $oaccvoudt = $gridadjdet[$i]['invdate'];
            $recpayamt = $gridadjdet[$i]['adjamt'];
            $dbcramt = $gridadjdet[$i]['dbcramt'];
            $ovoutype = $gridadjdet[$i]['voutype'];
	    $remark= $gridadjdet[$i]['Narrate'];	

            if($recpayamt>0 && $ovoutype!=='AD'){

                $querya5 = "call acc_sp_trn_insrecpay_tran('$ginrecpayseq','$oaccrefseq','$oaccvouno','$oaccvoudt','$caccrefseq','$recpayamt','$dbcramt');";

                $resulta5 = mysql_query($querya5);
//echo ($querya5);
		$queryref = "select ifnull(max(refseqno),0) + 1 as refseqno from acc_recpay_ref;";
		$resultref = mysql_query($queryref);
		$recref = mysql_fetch_array($resultref);
		$recrefseq=$recref['refseqno'];

		$queryrefchk = "select accref_vou_type,accref_vouno from acc_ref where accref_seqno='$oaccrefseq'";
		$resultrefchk = mysql_query($queryrefchk);
		$recrefchk = mysql_fetch_array($resultrefchk);
		$accvoutype=$recrefchk['accref_vou_type'];
		$refvounumber=$recrefchk['accref_vouno'];

		$queryrefchkbal = "select sum(acctrail_adj_value) as adjvalueref from acc_trail where acctrail_accref_seqno='$oaccrefseq'";
		$resultrefchkbal = mysql_query($queryrefchkbal);
		$recrefchkbal = mysql_fetch_array($resultrefchkbal);
		$balamtref=$recrefchkbal['adjvalueref'];

		$querydate = "select datediff(curdate(),'$oaccvoudt') as daysin";
		$resultdate = mysql_query($querydate);
		$recdatenew = mysql_fetch_array($resultdate);
		$refdays=$recdatenew['daysin'];

		$queryrefins = "insert into acc_recpay_ref values ('$recrefseq','$oaccrefseq','$caccrefseq','$recpayamt',curdate(),'$balamtref','$accvoutype','$refvounumber','$cvouno','$finid','$compcode','$oaccvouno','$oaccvoudt','$dbcramt','$refdays','RECEIPT')";
                $resultrefins = mysql_query($queryrefins);
	       // echo ($queryrefins);
                if($remark!==""){
		$queryremark ="insert into acc_recpay_tranremark
				(
					recpay_seqno,
					recpay_oaccref_seqno,
					recpay_ref_no,
					recpay_ref_date,
					recpay_aaccref_seqno,
					recpay_amount,
					recpay_dncn_amount,
					remark
				)
				values
				(
					'$ginrecpayseq',
					'$oaccrefseq',
					'$oaccvouno',
					'$oaccvoudt',
					'$caccrefseq',
					'$recpayamt',
					'$dbcramt',
					'$remark'
				)";
		$queryremarkres = mysql_query($queryremark);
		}
		
                $ginrecpayseq = $ginrecpayseq + 1;

                if($ovoutype=='OB'){
                    $querya7 = "call acc_sp_trn_updob_billdetails_adjvalue('$oaccrefseq','$recpayamt');";
                    $resulta7 = mysql_query($querya7);
                }else{
                    $ledseqno = $griddet[0]['ledseq'];
                    $querya6 = "call acc_sp_trn_updacc_trail_seq_no('$oaccrefseq','$oaccvouno','$recpayamt','$ledseqno');";
                    $resulta6 = mysql_query($querya6);
                }
            }
        }
        
//        if($cresulta2 && ($inscnt==$rowcnt) && $resulta8 && $resulta9 && $resulta10)
//      if($cresulta2 && ($inscnt==$rowcnt) && $resulta9 && $resulta10)
      if($cresulta2 && $resulta9 && $resulta10)
        {
            mysql_query("COMMIT");
            echo '({"success":"true","vouno":"'.$cvouno.'"})';
        }
        else
        {
            mysql_query("ROLLBACK");
            echo '({"success":"false","vouno":"'.$cvouno.'"})';
        }
  
?>
