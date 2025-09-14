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

    $usercode = $_POST['usercode'];
    $vouno = $_POST['vouno'];

    $today = date("Y-m-d H:i:s");  

    mysql_query("BEGIN");

            $queryins= "insert into acc_correction_ref select * from acc_ref where accref_seqno='$accref_seqno'";
            $resultins= mysql_query($queryins);

//echo  $queryins;
            $queryins2= "insert into acc_correction_tran select acctran_accref_seqno, acctran_serialno, acctran_led_code, acctran_dbamt, acctran_cramt, acctran_totamt, acctran_paytype , now() cdate from acc_tran where acctran_accref_seqno='$accref_seqno'";
            $resultins2= mysql_query($queryins2);




//echo  $queryins2;
            $queryins3= "insert into acc_correction_trail select * from acc_trail where acctrail_accref_seqno='$accref_seqno'";
            $resultins3= mysql_query($queryins3);

//echo  $queryins3;
	    $queryDel2="delete from acc_trail where acctrail_accref_seqno='$accref_seqno'";
//echo  $queryDel2;
	    $resultDel2= mysql_query($queryDel2);
	    
	    $queryDel1="delete from acc_tran where acctran_accref_seqno='$accref_seqno'";
	    $resultDel1= mysql_query($queryDel1);
//echo  $queryDel1;	    
	    $queryDel="delete from acc_ref where accref_seqno='$accref_seqno'";
//echo  $queryDel;	
	    $resultDel= mysql_query($queryDel);

	$cquery1 = "select ifnull(max(accvou_slno),0) + 1 as reccount  from acc_voucher_logs where accvou_seqno = '$accref_seqno';";
	$cresult1 = mysql_query($cquery1);
	$crec1 = mysql_fetch_array($cresult1);
	$reccount = $crec1['reccount'];

        $cquerya3 = "insert into acc_voucher_logs values ($accref_seqno,$reccount,'$today',$usercode,'MODIFIED IN ACCOUNTS EDIT ENTRY')";
        $cresulta3 = mysql_query($cquerya3);	    
//echo $cquerya3;
	 
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

//            $queryip= "insert into accountscorrectionip values('$accref_seqno','$ip','$accref_vouno','$accref_comp_code','$accref_finid','$boxuser',NOW(),'$Approve','$Request')";
//            $resultip= mysql_query($queryip);

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
                                accref_narration
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
                                '$accref_narration'
                        )";
//echo  $query;
            $result= mysql_query($query);
        }

        for($j=0;$j<$trancnt;$j++){
            $slnotran=$j+1;

            $old_led_code =$tran[$j]['old_led_code'];
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
            $acctran_narration=$tran[$j]['acctran_narration'];

            $query1= "call acc_sp_trn_insacc_tran('$accref_seqno','$slnotran','$acctran_led_code','$acctran_dbamt','$acctran_cramt','$acctran_totamt','$acctran_paytype','$acctran_narration')";
//echo  $query1;
            $result1= mysql_query($query1);




            $querystr = "update trnpur_min_trailer set mint_purgroup = $acctran_led_code where mint_comp_code = $accref_comp_code and mint_fin_code = $accref_finid and mint_minno = '$vouno' and mint_purgroup =  $old_led_code";

//echo  $query1;
            $resultstr= mysql_query($querystr);
	
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
            $acctrail_amtmode=$trail[$m]['acctrail_amtmode'];
            $acctrail_crdays= (int) $trail[$m]['acctrail_crdays'];
            $acctrail_gracedays= (int) $trail[$m]['acctrail_gracedays'];

	    $query2= "call acc_sp_trn_insacc_trail('$accref_seqno','$slnotrail','$acctrail_inv_no','$acctrail_inv_date','$acctrail_inv_value','$acctrail_adj_value','$acctrail_led_code','$acctrail_amtmode',$acctrail_crdays,$acctrail_gracedays)";
//echo  $query2;
	    $result2= mysql_query($query2);
	    if($result2){
	        $trailchk=$trailchk+1;
	    }

        }

//            if(($trailchk==$trailcnt) && $result && $result1 && $result2 && $resultins && $resultins2 && $resultins3)

      if ($trailcnt > 0)
      { 
            if($result  && $result1 && $result2   )

            {
                mysql_query("COMMIT");
                echo '({"success":"true","msg":"'.$accref_vouno.'"})';
	       
            }else{
                mysql_query("ROLLBACK");
              echo '({"success":"false","msg":"'.$error1.'"})';
              // echo '({"success":"false","msg":"'.$ip.'"})';
	    }
      }
      else
      { 
            if($result  && $result1)

            {
                mysql_query("COMMIT");
                echo '({"success":"true","msg":"'.$accref_vouno.'"})';
	       
            }else{
                mysql_query("ROLLBACK");
              echo '({"success":"false","msg":"'.$error1.'"})';
              // echo '({"success":"false","msg":"'.$ip.'"})';
	    }
      }


?>

