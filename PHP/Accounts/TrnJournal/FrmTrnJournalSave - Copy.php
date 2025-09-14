<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $flagtype = strtoupper($_REQUEST['flagtype']);
    $griddet = json_decode($_REQUEST['griddet'],true);
    $rowcnt = $_REQUEST['cnt'];
    
    $accrefseq = $_REQUEST['accrefseq'];
    $vouno = $_REQUEST['vouno'];
    $voudate = $_REQUEST['voudate'];
    $refno = $_REQUEST['refno'];
    $refdate = $_REQUEST['refdate'];
    $narration = $_REQUEST['narration'];
    $paytype = $_REQUEST['paytype'];
    $bankname = $_REQUEST['bankname'];
    $paymode = $_REQUEST['paymode'];
    $payno = $_REQUEST['payno'];
    $paydate = $_REQUEST['paydate'];

    $finid = $_REQUEST['finid'];
    $finyear = $_REQUEST['finyear'];
    $compcode = $_REQUEST['compcode'];
    $entrypoint = $_REQUEST['entrypoint'];

   $amtmode = "D";

        #Get Max AccRef Seqno from acc_ref
        $query1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
        $result1 = mysql_query($query1);
        $rec1 = mysql_fetch_array($result1);
        $ginaccrefseq=$rec1['con_value'];
       
        #Get Voucher Number
        $query2 = "select ifnull(max(convert(substring(accref_vouno,4),signed)),0) +1 as vou_no from acc_ref where accref_vou_type = 'GJV' and accref_finid = '$finid' and accref_comp_code = '$compcode';";
        $result2 = mysql_query($query2);
        $rec2 = mysql_fetch_array($result2);
        $conval=$rec2['vou_no'];
        $vouno=$paytype.$conval;

	    if($refno==''){
		$refno=$vouno;
	    }else{
	    	$refno = $_REQUEST['refno'];
	    }
        
        #Begin Transaction
        mysql_query("BEGIN");
        #Insert AccRef

        $querya2 = "call acc_sp_trn_insacc_ref('$ginaccrefseq','$vouno','$compcode','$finid','$voudate',
                'GJV','$bankname','$paymode','$refno','$refdate','$narration',0,0);";
        $resulta2 = mysql_query($querya2);
       
//echo  $querya2;
        $inscnt = 0;
        for($i=0;$i<$rowcnt;$i++){
            $slno = $i+1;
            $ledseq = $griddet[$i]['ledseq'];
            $dbamt = $griddet[$i]['dbamt'];
            $cramt = $griddet[$i]['cramt'];
            $totamt = $griddet[$i]['totamt'];
            $ledtype = $griddet[$i]['ledtype'];
            if ($dbamt>0)
            {
              $amtmode = "D";
            }
            else
            {
              $amtmode = "C";
            }
            $adjamt=0;
            if($ledseq>0){
            #Insert AccTrail

               $querya3 = "call acc_sp_trn_insacc_trail ('$ginaccrefseq','$slno','$vouno', '$voudate', '$totamt' ,'$adjamt' ,'$ledseq' ,'$amtmode')";
               $resulta3 = mysql_query($querya3);
//echo  $querya3;

            #Insert AccTran



            $querya4 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$ledseq','$dbamt','$cramt','$totamt','$paytype');";
            $resulta4 = mysql_query($querya4);

//echo  $querya4;	   
            if(resulta4){
                $inscnt = $inscnt + 1;
            }

	  }
        }
        

        if($resulta2 && ($inscnt == $rowcnt))

        {
            mysql_query("COMMIT");
            echo '({"success":"true","vouno":"'.$vouno.'"})';
            
        }
        else
        {
            mysql_query("ROLLBACK");
            
            echo '({"success":"false","vouno":"'.$vouno.'"})';
        }
  
?>
