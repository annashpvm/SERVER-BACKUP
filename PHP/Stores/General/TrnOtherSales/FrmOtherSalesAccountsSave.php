<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    session_start();

    $griddet  = json_decode($_REQUEST['griddet'],true);
    $rowcnt   = $_REQUEST['cnt'];


    $compcode  = $_REQUEST['compcode'];
    $finyear   = $_REQUEST['finyear'];
    $voutype   = $_REQUEST['voutype'];
    $voutypedn = $_REQUEST['voutypedn'];
    $vouno     = $_REQUEST['vouno'];
    $voudate   = $_REQUEST['voudate'];

    $grnno    = $_REQUEST['grnno'];
    $grndate  = $_REQUEST['voudate'];

    $paymode  = 'OS'; 

    $refno    = $_REQUEST['refno'];
    $refdate  = $_REQUEST['refdate'];
    $grnamount = $_REQUEST['grnamount'];
    $debitamount = $_REQUEST['debitamount'];
    $narration   = $_REQUEST['narration'];

    $vno   = $_REQUEST['vouno'];



   mysql_query("BEGIN");

        #Get Max AccRef Seqno from acc_ref
        $query1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
        $result1 = mysql_query($query1);
        $rec1 = mysql_fetch_array($result1);
        $ginaccrefseq=$rec1['con_value'];


        #Insert AccRef
        $querya2 = "call acc_sp_trn_insacc_ref('$ginaccrefseq','$refno','$compcode','$finyear','$voudate','$voutype','--', '$paymode','$refno', '$refdate','$narration');";

        $resulta2 = mysql_query($querya2);

//echo $querya2;
//echo "<br>";	

        
        $inscnt = 0;
        for($i=0;$i<$rowcnt;$i++){

            $slno    = $i+1;
            $ledseq  = $griddet[$i]['ledcode'];
            $dbamt   = $griddet[$i]['debit'];
            $cramt   = $griddet[$i]['credit'];
            $total1  = (float)$griddet[$i]['total1'];
            $totamt  = (float)$griddet[$i]['debit']+ (float)$griddet[$i]['credit'];	
            $curseq  = 0; //$griddet[$i]['acctran_cur_code'];
            $amount  = 0;
            $exgrate = 0;
            if ($dbamt>0)
            {
              $amtmode = "D";
            }
            else
            {
              $amtmode = "C";
            }
 
            $adjamt=0;
	    $billno = $griddet[$i]['billno'];
            $billdt = $griddet[$i]['billdt'];
            $ledtype = $griddet[$i]['ledtype'];

            #Insert AccTrail
            if ($ledtype == "P") { 


               $querya3 = "call acc_sp_trn_insacc_trail('$ginaccrefseq','$slno','$billno','$billdt','$totamt','$adjamt','$ledseq','$amtmode',0,0 );";
               $resulta3 = mysql_query($querya3);


//echo $querya3;
//echo "<br>";	


            } 
            #Insert AccTran

            $querya4 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$ledseq','$dbamt','$cramt','$totamt','$voutype','');";
            $resulta4 = mysql_query($querya4);



//echo $querya4;
//echo "<br>";	

        }

         $querya5 = "update trn_other_sales set os_acc_seqno = '$ginaccrefseq'  ,  os_accupd = 'Y' where os_compcode = $compcode  and os_fincode  = $finyear and os_invno =  '$refno' ";
        $resulta5 = mysql_query($querya5);

 

//echo $querya5;
//echo "<br>";	

        if($resulta2 && $resulta3 && $resulta4 && $resulta5  )
        {
            mysql_query("COMMIT");
            echo '({"success":"true","vno":"'.$vno.'"})';
        }
        else
        {
            mysql_query("ROLLBACK");
            echo '({"success":"false","vno":"'.$vno.'"})';
        }
?>
