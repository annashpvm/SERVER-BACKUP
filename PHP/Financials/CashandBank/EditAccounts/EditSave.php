<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $ref = json_decode($_REQUEST['ref'],true);
    $refcnt = $_REQUEST['refcnt'];
    $tran = json_decode($_REQUEST['tran'],true);
    $trancnt = $_REQUEST['trancnt'];
    $trail = json_decode($_REQUEST['trail'],true);
    $trailcnt = $_REQUEST['trailcnt'];
    $accref_seqno=$_REQUEST['accref_seqno'];
    $accref_comp_code=$_REQUEST['accref_comp_code'];
    $accref_finid=$_REQUEST['accref_finid'];
    $ip=$_SERVER['REMOTE_ADDR'];
    //$ip='123';
    $boxuser=$_REQUEST['pass'];
    $Approve=$_REQUEST['Approve'];	
    $Request=$_REQUEST['Request'];

    mysql_query("BEGIN");

            $queryins= "insert into acc_trigger_ref select * from acc_ref where accref_seqno='$accref_seqno'";
            $resultins= mysql_query($queryins);

            $queryins2= "insert into acc_trigger_tran select * from acc_tran where acctran_accref_seqno='$accref_seqno'";
            $resultins2= mysql_query($queryins2);

            $queryins3= "insert into acc_trigger_trail select * from acc_trail where acctrail_accref_seqno='$accref_seqno'";
            $resultins3= mysql_query($queryins3);


	    $queryDel2="delete from acc_trail where acctrail_accref_seqno='$accref_seqno'";
	    $resultDel2= mysql_query($queryDel2);
	    
	    $queryDel1="delete from acc_tran where acctran_accref_seqno='$accref_seqno'";
	    $resultDel1= mysql_query($queryDel1);
	    
	    $queryDel="delete from acc_ref where accref_seqno='$accref_seqno'";
	    $resultDel= mysql_query($queryDel);

	    

	 
        for($i=0;$i<$refcnt;$i++){
            $accref_vouno=$ref[$i]['accref_vouno'];
            $accref_voudate=$ref[$i]['accref_voudate'];
            $accref_narration=$ref[$i]['accref_narration'];
            $accref_vou_type=$ref[$i]['accref_vou_type'];
            $accref_paymode=$ref[$i]['accref_paymode'];
            $accref_payref_no=$ref[$i]['accref_payref_no'];
            $accref_payref_date=$ref[$i]['accref_payref_date'];
            $accref_chq_status=$ref[$i]['accref_chq_status'];
            $accref_reverse_status=$ref[$i]['accref_reverse_status'];
            $accref_bank_name=$ref[$i]['accref_bank_name'];

            $queryip= "insert into accountscorrectionip values('$accref_seqno','$ip','$accref_vouno','$accref_comp_code','$accref_finid','$boxuser',NOW(),'$Approve','$Request')";
            $resultip= mysql_query($queryip);

             $query= "insert into acc_ref
                        (
                                accref_seqno,
                                accref_vouno,
                                accref_comp_code,
                                accref_finid,
                                accref_voudate,
                                accref_vou_type,
                                accref_bank_name,
                                accref_paymode,
                                accref_payref_no,
                                accref_payref_date,
                                accref_narration,
                                accref_chq_status,
                                accref_reverse_status,
                                accref_entrypoint
                        )
                        values
                        (
                                '$accref_seqno',
                                '$accref_vouno',
                                '$accref_comp_code',
                                '$accref_finid',
                                '$accref_voudate',
                                '$accref_vou_type',
                                '-',
                                '$accref_paymode',
                                '$accref_payref_no',
                                '$accref_payref_date',
                                '$accref_narration',
                                '$accref_chq_status',
                                '$accref_reverse_status',
                                'M'
                        )";
            $result= mysql_query($query);
        }

        for($j=0;$j<$trancnt;$j++){
            $slnotran=$j+1;
            $acctran_led_code=$tran[$j]['acctran_led_code'];
            $acctrserialno=$tran[$j]['acctran_serialno'];
            $acctran_dbamt=$tran[$j]['acctran_dbamt'];
            $acctran_cramt=$tran[$j]['acctran_cramt'];
            $acctran_totamt=$tran[$j]['acctran_totamt'];
            $acctran_cur_code=$tran[$j]['acctran_cur_code'];
            $acctran_cur_amt=$tran[$j]['acctran_cur_amt'];
            $acctran_exch_rate=$tran[$j]['acctran_exch_rate'];
            $acctran_pass_no=$tran[$j]['acctran_pass_no'];
            $acctran_paytype=$tran[$j]['acctran_paytype'];

            $query1= "call acc_sp_trn_insacc_tran('$accref_seqno','$slnotran','$acctran_led_code','$acctran_dbamt','$acctran_cramt','$acctran_totamt','$acctran_cur_code','$acctran_cur_amt','$acctran_exch_rate','$acctran_pass_no','$acctran_paytype')";
            $result1= mysql_query($query1);
	
        }

         $trailchk=0;
         for($m=0;$m<$trailcnt;$m++){
            $slnotrail=$m+1;
            $acctrail_inv_no=$trail[$m]['acctrail_inv_no'];
            $acctrailserialno=$trail[$m]['acctrail_serialno'];
            $acctrail_inv_date=$trail[$m]['acctrail_inv_date'];
            $acctrail_inv_value=$trail[$m]['acctrail_inv_value'];
            $acctrail_adj_value=$trail[$m]['acctrail_adj_value'];
            $acctrail_led_code=$trail[$m]['acctrail_led_code'];

            $query2= "call acc_sp_trn_insacc_trail('$accref_seqno','$slnotrail','$acctrail_inv_no','$acctrail_inv_date','$acctrail_inv_value','$acctrail_adj_value','$acctrail_led_code','B')";
            $result2= mysql_query($query2);

            if($result2){
                $trailchk=$trailchk+1;
            }
        }

            if(($trailchk==$trailcnt) && $result && $result1 && $result2 && $resultins && $resultins2 && $resultins3)
           // if($resultins && $resultins2 && $resultins3 && $result)
            {
                mysql_query("COMMIT");
                echo '({"success":"true","msg":"'.$accref_vouno.'"})';
	       
            }else{
                mysql_query("ROLLBACK");
              echo '({"success":"false","msg":"'.$error1.'"})';
              // echo '({"success":"false","msg":"'.$ip.'"})';
	    }
?>

