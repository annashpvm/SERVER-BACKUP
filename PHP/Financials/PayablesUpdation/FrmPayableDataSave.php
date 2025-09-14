<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    session_start();
   
    $griddet  = json_decode($_REQUEST['griddet'],true);
    $rowcnt   = $_REQUEST['cnt'];

    $griddetdn  = json_decode($_REQUEST['griddetdn'],true);
    $rowcntdn   = $_REQUEST['cntdn'];

    $compcode  = $_REQUEST['compcode'];
    $finyear   = $_REQUEST['finyear'];
    $voutype   = $_REQUEST['voutype'];
    $voutypedn = $_REQUEST['voutypedn'];
    $vouno     = $_REQUEST['vouno'];
    $voudate   = $_REQUEST['voudate'];

    $grnno    = $_REQUEST['grnno'];
    $grndate  = $_REQUEST['voudate'];

    $paymode  = $_REQUEST['paymode'];
    $refno    = $_REQUEST['refno'];
    $refdate  = $_REQUEST['refdate'];
    $grnamount = $_REQUEST['grnamount'];
    $debitamount = $_REQUEST['debitamount'];
    $narration   = $_REQUEST['narration'];

    $vno   = $_REQUEST['vouno'];

    $tdssection = $_REQUEST['tdssection'];
    $tdsper     = $_REQUEST['tdsper'];
    $tdsfor     = $_REQUEST['tdsfor'];
    $tdsamt     = $_REQUEST['tdsamt'];
    
$partyledcodeh = $_POST['partyledcodeh'];
$dnremarks = $_POST['dnremarks'];    


$dnamt = $_POST['dnamt'];

$dncgst = $_POST['dncgst'];
$dnsgst = $_POST['dnsgst'];
$dnigst = $_POST['dnigst'];
$dncess = $_POST['dncess'];
$dntcs  = $_POST['dntcs'];

$dncgstp = $_POST['dncgstp'];
$dnsgstp = $_POST['dnsgstp'];
$dnigstp = $_POST['dnigstp'];

$dncgstcode = $_POST['dncgstcode'];
$dnsgstcode = $_POST['dnsgstcode'];
$dnigstcode = $_POST['dnigstcode'];
$dnqty = $_POST['dnqty'];


   
        #Get Max AccRef Seqno from acc_ref
        $query1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
        $result1 = mysql_query($query1);
        $rec1 = mysql_fetch_array($result1);
        $ginaccrefseq=$rec1['con_value'];
       
         
         
        
if($grnamount > 0 ){
        #Begin Transaction
        mysql_query("BEGIN");

if($voutype != "PS"){
    $query2 = "select ifnull(max(convert(substring(accref_vouno,3),signed)),0) +1 as vou_no from acc_ref where accref_vou_type = '$voutype' and accref_finid = '$finyear' and accref_comp_code = '$compcode'";
    $result2 = mysql_query($query2);
    $rec2 = mysql_fetch_array($result2);
    $ginvouno = $rec2['vou_no'];
    $vouno = $voutype . $ginvouno;

}

        #Insert AccRef
        $querya2 = "call acc_sp_trn_insacc_ref('$ginaccrefseq','$vouno','$compcode','$finyear','$voudate',
                '$voutype','--','$paymode','$refno','$refdate','$narration',0,0,'M')";
        $resulta2 = mysql_query($querya2);
        $amtmode = "D";
        
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

               if ($voutype  == "WG") {
                   $querya3 = "call acc_sp_trn_insacc_trail('$ginaccrefseq','$slno','$billno','$billdt','$total1','$adjamt','$ledseq','$amtmode');";
	       }
               else {
                  $querya3 = "call acc_sp_trn_insacc_trail('$ginaccrefseq','$slno','$billno','$billdt','$totamt','$adjamt','$ledseq','$amtmode');";
                }  
               $resulta3 = mysql_query($querya3);
            } 
            #Insert AccTran
            $querya4 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$ledseq','$dbamt','$cramt','$totamt','1','$amount','$exgrate','','$voutype');";
            $resulta4 = mysql_query($querya4);
        }

       if  ($voutype == "PS") 
       {  
        $querya5 =  "update trnpur_min_header set  minh_acc_seqno = '$ginaccrefseq', minh_accupd = 'Y'  where minh_fin_code= $finyear and minh_comp_code= $compcode and minh_vou_no =  '$vouno'";
        $resulta5 = mysql_query($querya5);
       }
       if  ($voutype == "PF") 
       {  
        $querya5 =  "update  trnfu_receipt_header set rech_acc_seqno = '$ginaccrefseq'  , rech_vouno =  '$vouno' , rech_accdate =  '$voudate'   where rech_fincode= $finyear and rech_compcode = $compcode and rech_no  =  '$grnno'";
        $resulta5 = mysql_query($querya5);

        $querya5 =  "update  trnfu_receipt_handling  set  rech_accupd = 'Y' , rech_pfvouno =  '$vouno' , rech_pcvoudate =  '$voudate' where rech_fincode= $finyear and rech_compcode = $compcode and rech_grnno  =  '$grnno'";
        $resulta5 = mysql_query($querya5);
       }
       if  ($voutype == "PR") 
       {  

        $querya5 =  "update  trnrm_receipt_header set rech_acc_seqno = '$ginaccrefseq'  , rech_vouno =  '$vouno' , rech_accdate =  '$voudate'   where rech_fincode= $finyear and rech_compcode = $compcode and rech_no  =  '$grnno'";
        $resulta5 = mysql_query($querya5);

        $querya5 =  "update  trnrm_receipt_handling  set  rech_accupd = 'Y' , rech_prvouno =  '$vouno' , rech_pwvoudate =  '$voudate' where rech_fincode= $finyear and rech_compcode = $compcode and rech_grnno  =  '$grnno' and rech_ledtype = 'P'";
        $resulta5 = mysql_query($querya5);
       }

       if  ($voutype == "OS") 
       {  

         $querya5 = "update trnpur_other_sales set os_acc_seqno = '$ginaccrefseq'  ,  os_accupd = 'Y',os_acvou_no = '$vouno' ,os_acvou_date = '$voudate' where os_compcode = $compcode  and os_fincode  = $finyear and os_docno =  '$grnno' ";
        $resulta5 = mysql_query($querya5);
       }

       if  ($voutype == "WG") 
       {  

         $querya5 = "update trnpur_wogrn_header set wogh_acc_seqno = '$ginaccrefseq', wogh_accupd= 'Y',wogh_acc_vouno = '$vouno' ,wogh_acc_voudate = '$voudate' where wogh_comp_code = $compcode  and wogh_fin_code = $finyear and wogh_no =  '$grnno' ";
        $resulta5 = mysql_query($querya5);

           if ($tdsamt > 0) {
		    $querytds = "select led_grp_code from acc_ledger_master where led_code='$ledseq'";
		    $resulttds = mysql_query($querytds);
		    $rectds = mysql_fetch_array($resulttds);
		    $tedled = $rectds['led_grp_code'];

		    $querytdsmax = "select ifnull(max(id),0) + 1 as id from acc_tds";
		    $resulttdsmax = mysql_query($querytdsmax);
		    $rectdsmax = mysql_fetch_array($resulttdsmax);
		    $tedledmax = $rectdsmax['id'];
		    if ($tedled == 65 && $tdsper > 0) {
		        $querytdsins = "insert into acc_tds values('$tedledmax','$ginaccrefseq','$tdsper','$tdsfor','$ledseq','$voudate', '$tdsamt','$finyear','$compcode','$vouno','$tdssection')";
		        $resulttdsins = mysql_query($querytdsins);
            }
           }    
       }
	
       if  ($voutype == "FS") 
       {  
         $querya5 = "update trnfu_salenote_header set salh_acc_seqno = '$ginaccrefseq', salh_vouno =  '$vouno'  where salh_compcode = $compcode  and salh_fincode = $finyear and salh_no =  '$grnno' ";
        $resulta5 = mysql_query($querya5);
       }

}



if($debitamount >0 ){
        #Get Max AccRef Seqno from acc_ref
        $query1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
        $result1 = mysql_query($query1);
        $rec1 = mysql_fetch_array($result1);
        $ginaccrefseq=$rec1['con_value'];
       
    $query2 = "select ifnull(max(convert(substring(accref_vouno,3),signed)),0) +1 as vou_no from acc_ref where accref_vou_type = 'DN' and accref_finid = '$finyear' and accref_comp_code = '$compcode'";
    $result2 = mysql_query($query2);
    $rec2 = mysql_fetch_array($result2);
    $ginvouno = $rec2['vou_no'];
    $vounodn = "DN" . $ginvouno;

    $vno   = $vouno . " and Debit Note Voucher " .  $vounodn;
    
#Get Max DBCR Seqno from acc_dbcrnote_header

$dnqry = "select ifnull(max(dbcr_seqno),0) + 1 as con_value from acc_dbcrnote_header;";
$dnres = mysql_query($dnqry);
$recdn = mysql_fetch_array($dnres);
$gindbcrseq = $recdn['con_value'];
    
        $dninsqry = "call acc_sp_insdbcrnoteheader('$gindbcrseq','$ginvouno','DN','$compcode','$finyear','$voudate',
                '$partyledcodeh','0','$dnremarks','$dnremarks','$voutype','O','N');";
        #Insert AccDbcrNoteTrailer	
 
$dntot = $dnamt - ($dncgst + $dnsgst + $dnigst + $dncess + $dntcs);
	
		if ($dntcs > 0 ) {
			    $dntrailqry = "call 			acc_sp_insdbcrnotetrailernew('$gindbcrseq','1','$grnno','$grndate','$dntot','$compcode','$dnamt','$dnqty','$dnigst','$dncgst','$dnsgst',
			    '$dncgstp','$dnsgstp','$dnigstp','$dncgstcode','$dnsgstcode','$dnigstcode','$dntcs','','1286')";
			    $resdntrailqry = mysql_query($dntrailqry);	

		}
		else {

			    $dntrailqry = "call acc_sp_insdbcrnotetrailernew('$gindbcrseq','1','$grnno','$grndate','$dntot','$compcode','$dnamt','$dnqty','$dnigst','$dncgst','$dnsgst',
		    '$dncgstp','$dnsgstp','$dnigstp','$dncgstcode','$dnsgstcode','$dnigstcode','0','0','0')";
		    $resdntrailqry = mysql_query($dntrailqry);
		    }
            
                            
    $resdninsqry = mysql_query($dninsqry);


        #Insert AccRef
        $querya2 = "call acc_sp_trn_insacc_ref('$ginaccrefseq','$vounodn','$compcode','$finyear','$voudate','$voutypedn','--', '$paymode','$refno','$refdate','$narration',0,0,'M')";
        $resulta2 = mysql_query($querya2);
        
        $inscnt = 0;
        for($i=0;$i<$rowcntdn;$i++){

            $slno = $i+1;
            $ledseq = $griddetdn[$i]['ledcode'];
            $dbamt  = $griddetdn[$i]['debit'];
            $cramt  = $griddetdn[$i]['credit'];
            $totamt = (float)$griddetdn[$i]['debit']+ (float)$griddetdn[$i]['credit'];	
            $curseq = 0; //$griddet[$i]['acctran_cur_code'];
            $amount = 0;
            $exgrate = 0;
            $adjamt  = 0;
	    $billno  = $griddetdn[$i]['billno'];
            $billdt  = $griddetdn[$i]['billdt'];
            $ledtype = $griddetdn[$i]['ledtype'];

            if ($dbamt>0)
            {
              $amtmode = "D";
            }
            else
            {
              $amtmode = "C";
            }
 

            #Insert AccTrail
            if ($ledtype == "P") { 
//               $querya3 = "call acc_sp_trn_insacc_trail('$ginaccrefseq','$slno','$refno','$refdate','$totamt','$adjamt','$ledseq');";
               $querya3 = "call acc_sp_trn_insacc_trail('$ginaccrefseq','$slno','$billno','$billdt','$totamt','$adjamt','$ledseq',' $amtmode');";

               $resulta3 = mysql_query($querya3);
            } 
            #Insert AccTran
            $querya4 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$ledseq','$dbamt','$cramt','$totamt','1','$amount','$exgrate','','$voutypedn');";
            $resulta4 = mysql_query($querya4);
            


            
        }

       if  ($voutype == "PF") 
       {  

        $querya5 =  "update  trnfu_receipt_handling  set rech_dnvouno =  '$vounodn' ,rech_pcvoudate =  '$voudate' where rech_fincode= $finyear and rech_compcode = $compcode and rech_grnno  =  '$grnno'";
        $resulta5 = mysql_query($querya5);
       }
	if  ($voutype == "PR") 
       {  

        $querya5 =  "update  trnrm_receipt_handling  set rech_dnvouno =  '$vounodn' ,rech_pwvoudate =  '$voudate' where rech_fincode= $finyear and rech_compcode = $compcode and rech_grnno  =  '$grnno'";
        $resulta5 = mysql_query($querya5);
        
        
       }       
	
}



        if($resulta2 && $resulta3  && $resulta4 )// && $resulta5 )
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
