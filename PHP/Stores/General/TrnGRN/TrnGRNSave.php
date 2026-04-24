<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$dntype = 'DNG';

$griddet      = json_decode($_REQUEST['griddet'],true);
$rowcnt       = $_POST['cnt'];

$griddetacc = json_decode($_REQUEST['griddetacc'],true);
$rowcntacc = $_REQUEST['cntacc'];

$griddetaccDN = json_decode($_REQUEST['griddetaccdn'],true);
$rowcntaccDN = $_REQUEST['cntaccdn'];

$savetype     = $_POST['savetype'];
$clrdocno     = $_POST['clrdocno'];

$grnflag      = $_POST['grnflag'];
$minhcompcode = $_POST['minhcompcode'];
$minhfincode  = $_POST['minhfincode'];

$compcode     = $_POST['minhcompcode'];
$finid        = $_POST['minhfincode'];


$minhminno    = $_POST['minhminno'];
$minhmindate  = $_POST['minhmindate'];

$minhtype     = $_POST['minhtype'];
$minhsupcode  = $_POST['minhsupcode'];
$minhbillno= $_POST['minhbillno'];
$minhbilldate= $_POST['minhbilldate'];
$minhgrossvalue= $_POST['minhgrossvalue'];
$minhroundoff= (float) $_POST['minhroundoff'];
$minhvalue= $_POST['minhvalue'];
$minhpaid= $_POST['minhpaid'];
$minhacctstatus= $_POST['minhacctstatus'];

$minhcarrier =  trim(strtoupper($_POST['minhcarrier']));

$minhremarks   = substr(trim($_POST['minhremarks']),0,299);
$minhentdate= $_POST['minhentdate'];

$minhvouno= $_POST['minhvouno'];
$minhvouyear= $_POST['minhvouyear'];
$minhvoutype= $_POST['minhvoutype'];
$vouno = $_POST['vouno'];

$minhcreditdays= (int) $_POST['minhcreditdays'];

$minhgeno= $_POST['minhgeno'];
$minhgedate= $_POST['minhgedate'];
$minhlrno= $_POST['minhlrno'];
$minhlrdate= $_POST['minhlrdate'];
$minhaccupd= $_POST['minhaccupd'];
//$cancelflag= $_POST['cancelflag'];
//$minhseqno = $_POST['minhseqno'];

$roundneed = $_POST['roundneed'];

$ginaccrefseq = (int)$_POST['accseqno'];
$ginaccrefseqDN = (int)$_POST['dnaccseqno'];
$gindbcrseq       = (int)$_POST['dnseqno'];


$voutype = 'PGS';
$finsuffix  = $_REQUEST['finsuffix'];

$tcsauto = $_POST['tcsauto'];
$gstauto = $_POST['gstauto'];

$minhcgstpm= (float) $_POST['minhcgstpm'];
$minhsgstpm= (float) $_POST['minhsgstpm'];
$minhigstpm= (float) $_POST['minhigstpm'];

$minhtottcs = (float) $_POST['minhtottcs'];

$minhtottransport = (float) $_POST['minhtottransport'];

$minhFrtAmt  = (float) $_POST['minhFrtAmt'];
$minhCGSTPer = (float) $_POST['minhCGSTPer'];
$minhSGSTPer = (float) $_POST['minhSGSTPer'];
$minhIGSTPer = (float) $_POST['minhIGSTPer'];
$minhCGSTAmt = (float) $_POST['minhCGSTAmt'];
$minhSGSTAmt = (float) $_POST['minhSGSTAmt'];
$minhIGSTAmt = (float) $_POST['minhIGSTAmt'];


$frtledcode     = (int) $_POST['frtledcode'];
$frtCGSTledcode = (int) $_POST['frtCGSTledcode'];
$frtSGSTledcode = (int) $_POST['frtSGSTledcode'];
$frtIGSTledcode = (int) $_POST['frtIGSTledcode'];


$minhdnno      = $_POST['minhdnno'];
$minhdndate    = $_POST['minhdndate'];

$minhdntaxable = (float) $_POST['minhdntaxable'];
$minhdncgst    = (float) $_POST['minhdncgst'];
$minhdnsgst    = (float) $_POST['minhdnsgst'];
$minhdnigst    = (float) $_POST['minhdnigst'];

$minhdnamount  = $minhdntaxable + $minhdncgst + $minhdnsgst  + $minhdnigst; 

$grnstatus = $_POST['grnstatus'];


$dnremarks   = substr(trim($_POST['dnremarks']),0,299);

$purledger = (int)$_POST['purledger'];


$usercode = (int)$_POST['userid'];
$today = date("Y-m-d H:i:s"); 

mysqli_begin_transaction($conn);

if ($savetype == "Add") {

	$query1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
	$result1 = mysqli_query($conn, $query1);
	$rec1 = mysqli_fetch_array($result1);
	$ginaccrefseq=$rec1['con_value'];

	//echo  $ginaccrefseq;
	//echo  "<br>";


        if ($grnstatus == 'P')
           $ginaccrefseq = 0;
/*
 $query2 = "select IFNULL(max(minh_minno),0)+1 as minhminno from trnpur_min_header where minh_purtype = '$minhvoutype' and minh_fin_code = $minhfincode  and minh_comp_code=$minhcompcode";
 $result2= mysqli_query($conn, $query2);
 $rec2 = mysqli_fetch_array($result2);
 $minhminno=$rec2['minhminno'];

*/


       

     $query1 = "select count(*) as nos from trnpur_min_header where minh_fin_code = $minhfincode  and minh_comp_code=$minhcompcode and minh_minno = '$minhminno'";


//echo $query1;
//echo "<br>";

     $result1 = mysqli_query($conn, $query1);
     $rec1 = mysqli_fetch_array($result1);
     $cnt =$rec1['nos'];


	 

 $query3= "insert into  trnpur_min_header values(
'$minhcompcode','$minhfincode','$minhtype', '$minhminno' ,'$minhmindate', '$minhsupcode', '$minhbillno', '$minhbilldate', '$minhgrossvalue', '$minhroundoff','$roundneed', '$minhvalue', '$minhcarrier','$minhremarks', '$minhentdate','$minhcreditdays', '$minhgeno', '$minhgedate', '$minhlrno', '$minhlrdate', '$minhvouno', 'Y', '$ginaccrefseq' ,'$minhmindate','$tcsauto','$minhcgstpm','$minhsgstpm','$minhigstpm','$minhtottcs','$minhtottransport','$grnstatus', '$usercode',0,'$minhentdate','$minhFrtAmt','$minhCGSTPer','$minhSGSTPer','$minhIGSTPer','$minhCGSTAmt','$minhSGSTAmt','$minhIGSTAmt','$frtledcode',	 '$frtCGSTledcode',	 '$frtSGSTledcode' ,	 '$frtIGSTledcode','$minhdnno','$minhdndate', '$minhdntaxable' , '$minhdncgst','$minhdnsgst','$minhdnigst','$minhdnamount')";

//echo  $query3;
//echo  "<br>";

 $result3=mysqli_query($conn, $query3);




}
else
{

    if ($grnstatus == "C" && $ginaccrefseqDN > 0 )
    { 
     	$querya1 = "delete from acc_trail  where acctrail_accref_seqno = '$ginaccrefseqDN'";
        $resulta1dn = mysqli_query($conn, $querya1);

//echo $querya1;
//echo "<br>";
	    $querya2 = "delete from acc_tran  where acctran_accref_seqno = '$ginaccrefseqDN'";
        $resulta2dn = mysqli_query($conn, $querya2);
//echo $querya2;
//echo "<br>";	
        $querya3 = "delete from acc_ref  where accref_seqno ='$ginaccrefseqDN' and accref_comp_code='$compcode' and accref_finid ='$finid'";
        $resulta3dn = mysqli_query($conn, $querya3);

//echo $querya3;
//echo "<br>";
      }

	  if ($grnstatus == "C" && $ginaccrefseq > 0 )
	  { 

	  $querya1 = "delete from acc_trail  where acctrail_accref_seqno = '$ginaccrefseq'";
      $resulta1 = mysqli_query($conn, $querya1);
  
  //echo $querya1;
  //echo "<br>";
	  $querya2 = "delete from acc_tran  where acctran_accref_seqno = '$ginaccrefseq'";
	  $resulta2 = mysqli_query($conn, $querya2);
  //echo $querya2;
  //echo "<br>";	
	  $querya3 = "delete from acc_ref  where accref_seqno ='$ginaccrefseq' and accref_comp_code='$compcode' and accref_finid ='$finid'";
	  $resulta3 = mysqli_query($conn, $querya3);
  
  //echo $querya3;
  //echo "<br>";
		}
  
    if ($grnstatus == "C" && $ginaccrefseq == 0 )
    { 
	$query1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
	$result1 = mysqli_query($conn, $query1);
	$rec1 = mysqli_fetch_array($result1);
	$ginaccrefseq=$rec1['con_value'];
    }

    $query2="call sppur_upd_minheader('$minhcompcode','$minhminno','$minhmindate','$minhfincode','$minhbillno','$minhbilldate' ,'$minhgrossvalue', '$minhroundoff','$roundneed','$minhvalue','$minhcarrier','$minhremarks','$minhcreditdays','$minhgeno','$minhgedate','$minhlrno','$minhlrdate','$tcsauto','$minhcgstpm','$minhsgstpm','$minhigstpm','$minhtottcs','$grnstatus','$ginaccrefseq','$minhtottransport', '$usercode','$minhentdate','$minhtype','$minhFrtAmt','$minhCGSTPer','$minhSGSTPer','$minhIGSTPer','$minhCGSTAmt','$minhSGSTAmt','$minhIGSTAmt', '$frtledcode',	 '$frtCGSTledcode',	 '$frtSGSTledcode' ,	 '$frtIGSTledcode' , '$minhdntaxable' , '$minhdncgst','$minhdnsgst','$minhdnigst','$minhdnamount','$minhsupcode')";

//echo $query2;
//echo "<br>";


    $result2=mysqli_query($conn, $query2);

	

    $query3 = "delete from trnpur_min_trailer where mint_comp_code = '$compcode' and  mint_fin_code = '$finid' and mint_minno = '$minhminno' ";
    $result3 = mysqli_query($conn, $query3);

	
	$queryac4 = "delete from acc_adjustments  where ref_adjseqno ='$ginaccrefseq' and ref_compcode='$compcode' and ref_finid ='$finid'";
	$resultac4 = mysqli_query($conn, $queryac4);
	$queryac4 = "delete from acc_adjustments  where ref_adjseqno ='$ginaccrefseqDN' and ref_compcode='$compcode' and ref_finid ='$finid'";
	$resultac4 = mysqli_query($conn, $queryac4);

}



    


$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++){

	//$itemname=$griddet[$i]['itemname'];
	//$uom=$griddet[$i]['uom'];
	//$balqty=$griddet[$i]['balqty'];


	$sno = $i + 1;
	$mintslno=$griddet[$i]['sno'];
	$mintpono=$griddet[$i]['pono'];
	$mintpodate=$griddet[$i]['podate'];
	$mintinvqty=$griddet[$i]['mintinvqty'];

	$mintrcvdqtybill =$griddet[$i]['mintrcvdqty'];
	$mintrcvdqty    =$griddet[$i]['mintstockqty'];


	$mintacceptqty=$griddet[$i]['mintacceptqty'];

//	$mintrejqty =  $griddet[$i]['mintinvqty'] - $griddet[$i]['mintrcvdqty'];
	$mintrejqty = 0;

	$mintunitrate=$griddet[$i]['mintunitrate'];
	$mintcostrate = round($griddet[$i]['mintvalue']/$griddet[$i]['mintrcvdqty'],5); 
	$mintdiscount= (float)$griddet[$i]['mintdiscount'];
	$mintdisamt = (float)$griddet[$i]['mintdisamt'];
	$mintpfper  = (float)$griddet[$i]['mintpfper'];

	$mintpfamt  = (float)$griddet[$i]['mintpfamt'];
	$mintothers = (float)$griddet[$i]['mintothers'];

	$mintcgstper= (float)$griddet[$i]['mintcgstper'];
	$mintsgstper       = (float)$griddet[$i]['mintsgstper'];
	$mintigstper       = (float)$griddet[$i]['mintigstper'];
	$mintsgstamt       = (float)$griddet[$i]['mintsgstamt'];
	$mintcgstamt       = (float)$griddet[$i]['mintcgstamt'];
	$mintigstamt       = (float)$griddet[$i]['mintigstamt'];

	$mintfreight       = (float)$griddet[$i]['mintfreight'];
	$mintvalue         = (float)$griddet[$i]['mintvalue'];
	$mintrebate        = (float)$griddet[$i]['mintrebate'];
	$rebate2          = (float)$griddet[$i]['rebate2'];
	$mintotherpm      = (float)$griddet[$i]['mintotherpm'];

	$mintcrstatus= substr($griddet[$i]['mintcrstatus'],0,1);

	$cgstled=$griddet[$i]['cgstled'];
	$sgstled=$griddet[$i]['sgstled'];
	$igstled=$griddet[$i]['igstled'];
	$mintitemcode =$griddet[$i]['mintitemcode'];
	$mintgrpcode =$griddet[$i]['mintgrpcode'];
	$ledcode=$griddet[$i]['ledcode'];
	$mintindno = (int)$griddet[$i]['mintindentno'];
	$mintindfincode =$griddet[$i]['mintfincode'];
	$stock=$griddet[$i]['stock'];
	$tot=$griddet[$i]['tot'];
	$totqty=$griddet[$i]['totqty'];
	$itc=$griddet[$i]['itc'];
	$oldgrnqty=(float)$griddet[$i]['oldgrnqty'];
	$oldgrnval=(float)$griddet[$i]['oldgrnval'];
	$minttcsper=(float)$griddet[$i]['minttcsper'];
	$minttcsval=(float)$griddet[$i]['minttcsval'];
	$purgrpcode=(float)$griddet[$i]['purgrpcode'];
	$insurance=(float)$griddet[$i]['insurance'];

	$valuepm =(float)$griddet[$i]['valuepm'];

	$transportation=(float)$griddet[$i]['transportation'];


	$spec    =   substr(trim($griddet[$i]['itemspec']),0,148);


	$mintunit = (int)$griddet[$i]['unitcode'];

	$billrate =(float)$griddet[$i]['billrate'];
	$povalue =(float)$griddet[$i]['povalue'];

	$delrecord =$griddet[$i]['delrecord'];

	$mintqcstatus = 'N';

	$dncgstper       = (float)$griddet[$i]['mintcgstper'];
	$dnsgstper       = (float)$griddet[$i]['mintsgstper'];
	$dnigstper       = (float)$griddet[$i]['mintigstper'];

	$dncgstledcode     = (int)$griddet[$i]['cgstled'];
	$dnsgstledcode     = (int)$griddet[$i]['sgstled'];
	$dnigstledcode     = (int)$griddet[$i]['igstled'];

//echo $mintrcvdqty;
//echo $oldgrnqty;


         if ($delrecord == "N")
         {
	 $query4= "insert into  trnpur_min_trailer values('$minhcompcode', '$minhfincode','$minhminno', '$minhmindate', '$minhsupcode','$mintpono', '$mintpodate', '$mintindno', '$mintindfincode','$mintslno', '$mintitemcode', '$mintinvqty', '$mintrcvdqty', '$mintrcvdqtybill','$mintacceptqty', '$mintrejqty', '$mintunitrate', '$mintcostrate', '$mintpfper','$mintothers' ,'$mintfreight' , '$mintdiscount', '$mintotherpm' , '$mintvalue','$mintqcstatus', '$mintcrstatus', '$mintdisamt', '$mintpfamt', '$mintcgstper', '$mintcgstamt', '$mintsgstper' , '$mintsgstamt' , '$mintigstper','$mintigstamt',   '$minttcsper', '$minttcsval','$mintrebate','$purgrpcode','$cgstled','$sgstled','$igstled',$insurance,$mintunit,'$spec','$transportation','$valuepm','$rebate2','$billrate','$povalue' )";

//echo   $query4;
//echo  "<br>";

	 $result4=mysqli_query($conn, $query4); 
         }




	 $query11 = "select * from maspur_item_trailer where item_comp_code ='$minhcompcode'  and item_fin_code = '$minhfincode' and item_code = '$mintitemcode'";
	 $result11 = mysqli_query($conn, $query11);
	 while ($row = mysqli_fetch_assoc($result11)) {

            if ($delrecord == "N")
            {
	        $totstock = $row['item_stock']+ $mintrcvdqty - $oldgrnqty ;
	        $totvalue = ($row['item_stock'] * $row['item_avg_rate']) + $mintvalue - $oldgrnval;
            }
            else
            {
	        $totstock = $row['item_stock']  - $oldgrnqty ;
	        $totvalue = ($row['item_stock'] * $row['item_avg_rate']) - $oldgrnval;
            }


 	    if ( $totvalue > 0 &&  $totstock > 0)
	    { 
	    $avgrate  = $totvalue / $totstock;

		$query12 = "update maspur_item_trailer set  item_stockvalue = item_stockvalue -  $oldgrnval +  $mintvalue  , item_stock = $totstock , item_lpur_date =  '$minhmindate' where item_comp_code ='$minhcompcode'  and item_fin_code = '$minhfincode' and item_code = '$mintitemcode'";
	    $result12 = mysqli_query($conn, $query12);

	
//        echo $query12;
//        echo "<br>";	

		$query12 = "update maspur_item_trailer set   item_avg_rate =  CASE  WHEN item_stock > 0 and item_stockvalue > 0 THEN ROUND(item_stockvalue / item_stock, 5)  ELSE 0  END   where item_comp_code ='$minhcompcode'  and item_fin_code = '$minhfincode' and item_code = '$mintitemcode'";
	    $result12 = mysqli_query($conn, $query12);

//		echo $query12;
//        echo "<br>";	


  ///     echo $query12;
            }
          } 
          mysqli_free_result($result);

         if ($delrecord == "N")
         {   

	 $query13 = "update trnpur_indent set  ind_rec_qty = ind_rec_qty + $mintrcvdqty - $oldgrnqty  where ind_comp_code ='$minhcompcode'  and ind_fin_code = '$minhfincode' 	 and ind_no = '$mintindno' and ind_item_code = '$mintitemcode'";

//        echo $query13;
//        echo "<br>";
	 $result13 = mysqli_query($conn, $query13);


	 $query14 = "update  trnpur_purchase_trailer set ptr_rec_qty = ptr_rec_qty + $mintrcvdqty -  $oldgrnqty  where ptr_comp_code = '$minhcompcode'  and ptr_fin_code = '$minhfincode'   and ptr_pono = '$mintpono' and ptr_item_code = '$mintitemcode' and ptr_ind_fin_code = '$mintindfincode' and ptr_ind_no ='$mintindno'"; 
//        echo $query14;
//        echo "<br>";
	 $result14 = mysqli_query($conn, $query14);
         }     
         else
         {   

	 $query13 = "update trnpur_indent set  ind_rec_qty = ind_rec_qty  - $oldgrnqty  where ind_comp_code ='$minhcompcode'  and ind_fin_code = '$minhfincode' 	 and ind_no = '$mintindno' and ind_item_code = '$mintitemcode'";

//        echo $query13;
//        echo "<br>";
	 $result13 = mysqli_query($conn, $query13);


	 $query14 = "update  trnpur_purchase_trailer set ptr_rec_qty = ptr_rec_qty -  $oldgrnqty  where ptr_comp_code = '$minhcompcode'  and ptr_fin_code = '$minhfincode'   and ptr_pono = '$mintpono' and ptr_item_code = '$mintitemcode' and ptr_ind_fin_code = '$mintindfincode' and ptr_ind_no ='$mintindno'"; 
//        echo $query14;
//        echo "<br>";
	 $result14 = mysqli_query($conn, $query14);
         }  


}  



if ($ginaccrefseq > 0 && $grnstatus == "C") {


    $querya1 = "call acc_sp_trn_insacc_ref('$ginaccrefseq','$minhminno','$compcode','$finid','$minhmindate','$voutype', '','','$minhbillno', '$minhbilldate','$minhremarks');";
    $resulta1 = mysqli_query($conn, $querya1);

//echo  $querya1;
//echo  "<br>";

$cquerya3 = "insert into acc_voucher_logs values ($ginaccrefseq,$reccount,'$today',$usercode,'$reason')";
$cresulta3 = mysqli_query($conn, $cquerya3);


//echo $cquerya3;




        $inscnt = 0;
        for($i=0;$i<$rowcntacc;$i++){

            $slno = $i+1;
            $ledseq = $griddetacc[$i]['ledcode'];
            $dbamt = (float) $griddetacc[$i]['debit'];
            $cramt = (float) $griddetacc[$i]['credit'];
            $totamt =   $dbamt +  $cramt; 
            $ledtype = $griddetacc[$i]['ledtype'];
            if ($dbamt>0)
            {
              $amtmode = "D";
            }
            else
            {
              $amtmode = "C";
            }
			if ($minhdnamount > 0)
               $adjamt=$minhdnamount;
            else
			$adjamt=0;						
            if($ledseq>0){
            #Insert AccTrail
               if ($ledtype != 'G')
               {
               $querya2 = "call acc_sp_trn_insacc_trail ('$ginaccrefseq','$slno','$minhbillno', '$minhbilldate', '$totamt' ,'$adjamt' ,'$ledseq' ,'$amtmode','$minhcreditdays','0')";
               $resulta2 = mysqli_query($conn, $querya2);
//echo   $querya2;
//echo  "<br>";

               }  


            #Insert AccTran

            $querya3 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$ledseq','$dbamt','$cramt','$totamt','$voutype','');";
            $resulta3 = mysqli_query($conn, $querya3);

//echo   $querya3;	   
//echo  "<br>";
            if($resulta3){
                $inscnt = $inscnt + 1;
            }

	  }
        }
}



if ($minhdnamount > 0 && $grnstatus == "C") 
{
	if ($savetype === "Add")
	{
	$DNquery1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
	$DNresult1 = mysqli_query($conn, $DNquery1);
	$rec1 = mysqli_fetch_array($DNresult1);
	$ginaccrefseqDN=$rec1['con_value'];

//echo  $ginaccrefseqDN;
//echo  "<br>";


	#Get Voucher Number
	$query2 = "select ifnull(max(dbcr_no),0) + 1 as dbcr_no from acc_dbcrnote_header where dbcr_type = '$dntype' and dbcr_finid = '$finid' and dbcr_comp_code = '$compcode';";
	$result2 = mysqli_query($conn, $query2);
	$rec2 = mysqli_fetch_array($result2);
	$conval = $rec2['dbcr_no'];


		if ($conval < 10)
		{                                              
		$vno = "00".$conval;
		}                                      
		else
		{  
			if ($conval < 100) 
			{                                              
			$vno = "0".$conval;                   
			}
			else 
			{      
				$vno = $conval;  
			}
		} 
		$vouno=$dntype.'/' . $vno.'/'.$finsuffix;
 



	#Get Max DBCR Seqno from acc_dbcrnote_header

		$query3 = "select ifnull(max(dbcr_seqno),0) + 1 as con_value from acc_dbcrnote_header;";
		$result3 = mysqli_query($conn, $query3);
		$rec3 = mysqli_fetch_array($result3);
		$gindbcrseq = $rec3['con_value'];

		$DNquery7 = "call acc_sp_insdbcrnoteheader('$gindbcrseq','$compcode','$finid','$dntype','$conval','$vouno','$minhdndate','$minhsupcode','$minhsupcode','$purledger', '$minhdnamount','$dnremarks','S' , 'N', '$ginaccrefseqDN','','$usercode','0','PS','0','','$today','$today');";
		$DNresult7 = mysqli_query($conn, $DNquery7);
//echo  $DNquery7;
//echo  "<br>";

		
		$DNquery8 = "call acc_sp_insdbcrnotetrailer('$gindbcrseq','$minhbillno','$minhbilldate','$minhdntaxable' ,'$minhdnamount','$minhdnigst', '$minhdncgst','$minhdnsgst','$dnigstper','$dncgstper','$dnsgstper','$dnigstledcode','$dncgstledcode','$dnsgstledcode',0, 0,0,0 ,0,0,'0',0,'$minhdntaxable')";
		$DNresult8 = mysqli_query($conn, $DNquery8);	 

	}

		if ($ginaccrefseqDN > 0)
		{
				$DNquery1 = "call acc_sp_trn_insacc_ref('$ginaccrefseqDN','$vouno','$compcode','$finid','$minhdndate','DNG', '','','$minhbillno', '$minhbilldate','$dnremarks');";
				$DNresult1 = mysqli_query($conn, $DNquery1);
	//echo  $DNquery1;
	//echo  "<br>";

				$DNquery2  = "insert into acc_voucher_logs values ($ginaccrefseqDN,$reccount,'$today',$usercode,'$reason')";
				$DNresult2 = mysqli_query($conn, $DNquery2);
			 
					 $inscnt = 0;
					 for($i=0;$i<$rowcntaccDN;$i++){
						 $slno    = $i+1;
						 $ledseq  = $griddetaccDN[$i]['ledcode'];
						 $dbamt   = (float) $griddetaccDN[$i]['debit'];
						 $cramt   = (float) $griddetaccDN[$i]['credit'];
						 $totamt2  = $dbamt +  $cramt; 
						 $ledtype = $griddetaccDN[$i]['ledtype'];
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
							if ($ledtype != 'G')
							{
							$DNquery5 = "call acc_sp_trn_insacc_trail ('$ginaccrefseqDN','$slno','$minhbillno', '$minhbilldate', '$minhdnamount' ,'$minhdnamount' ,'$ledseq' ,'$amtmode','$minhcreditdays','0')";
							$DNresult5 = mysqli_query($conn, $DNquery5);
			 
							//echo  $DNquery5;
							//echo  "<br>";
                     		}    
							$DNquery6 = "call acc_sp_trn_insacc_tran('$ginaccrefseqDN','$slno','$ledseq','$dbamt','$cramt','$totamt2','$dntype','');";
							$DNresult6 = mysqli_query($conn, $DNquery6);
							//echo  $DNquery6;
							//echo  "<br>";
			 
				       }
					 }		
					 


			//echo  $DNquery8;
			//echo  "<br>";
		 
		 

		}  
		if ($savetype !=  "Add")
		{

		
			$DNquery7 = "update acc_dbcrnote_header set dbcr_date = '$minhdndate' , dbcr_partycode = '$minhsupcode',dbcr_partyledcode = '$minhsupcode',dbcr_ledcode = '$purledger', dbcr_value = '$minhdnamount', dbcr_narration =  '$dnremarks' , dbcr_item = '$itemname'  ,dbcr_modifydate = '$today'   where dbcr_vouno = '$vouno'  and dbcr_comp_code = '$compcode' and dbcr_finid = '$finid' and  dbcr_seqno = '$gindbcrseq' ";
			$DNresult7 = mysqli_query($conn, $DNquery7);

//				echo  $DNquery7;
				//echo  "<br>";

			$DNquery8 = "update acc_dbcrnote_trailer set dbcrt_inv_no = '$minhbillno' , dbcrt_inv_date = '$minhbilldate'  , dbcrt_grossvalue = '$minhdntaxable',dbcrt_value ='$minhdnamount',dbcrt_igstvalue = '$minhdnigst' ,dbcrt_cgstvalue = '$minhdncgst' ,dbcrt_sgstvalue = '$minhdnigst', dbcrt_igstper = '$dnigstper', dbcrt_cgstper = '$dncgstper', dbcrt_sgstper = '$dnsgstper', dbcrt_igstledcode ='$dnigstledcode' , dbcrt_cgstledcode =  '$dncgstledcode' , dbcrt_sgstledcode =  '$dnsgstledcode' , dbcrt_taxable = '$minhdntaxable'   where dbcrt_seqno = '$gindbcrseq' ";
			$DNresult8 = mysqli_query($conn, $DNquery8);

//			echo  $DNquery8;
//			echo  "<br>";


		}

}


if ($grnstatus == "C")
{ 


	$invcount = 0;
	$refcount = 0;
	$trancount = 0;
	$trailcount = 0;

	$query = "SELECT  (SELECT COUNT(*) FROM trnpur_min_header WHERE minh_acc_seqno = '$ginaccrefseq') AS invcount,
	(SELECT COUNT(*) FROM acc_ref WHERE accref_seqno = '$ginaccrefseq' and accref_vouno = '$minhminno') AS refcount,
	(SELECT COUNT(*) FROM acc_tran WHERE acctran_accref_seqno = '$ginaccrefseq') AS trancount,
	(SELECT COUNT(*) FROM acc_trail WHERE acctrail_accref_seqno = '$ginaccrefseq') AS trailcount";

	$result = mysqli_query($conn, $query);

	$row = mysqli_fetch_assoc($result);

	$invcount   = intval($row['invcount']);
	$refcount   = intval($row['refcount']);
	$trancount  = intval($row['trancount']);
	$trailcount = intval($row['trailcount']);


	if ($savetype == "Add") {

		if ($minhdnamount > 0)
		{

			$vno = $minhminno . " and Debit Note Voucher No. " .$vouno;

			if (  $DNresult1 && $DNresult6 && $DNresult7 && $DNresult8 && $result3 && $result4 &&  $result13 &&  $result14  && $resulta1  && $resulta2  && $resulta3  && $cnt == 0)
			{
					mysqli_commit($conn);                       
					echo '({"success":"true","minno":"'.$vno.'"})';
			}
			else
			{

		
					if ($cnt == 1)
						$minhminno = 0;
					mysqli_rollback($conn);

					
					echo '({"success":"false","minno":"'.$minhminno.'"})';
			}   
		} 
		else
		{
			if ( $result3 && $result4 &&  $result13 &&  $result14  && $resulta1  && $resulta2  && $resulta3  && $cnt == 0  && $invcount > 0 && $refcount >0 && $trancount > 0 &&  $trailcount > 0)
			{
					mysqli_commit($conn);                       
					echo '({"success":"true","minno":"'.$minhminno.'"})';
			}
			else
			{
					if ($cnt == 1)
						$minhminno = 0;
		          		mysqli_rollback($conn);
				
					echo '({"success":"false","minno":"'.$minhminno.'"})';
			}   
		} 

	}
	else {

		if ($minhdnamount > 0)
		{
			
			$vno = $minhminno . " and Debit Note Voucher No. " .$vouno;
			if ( $DNresult6 && $DNresult7 && $DNresult8 &&  $result2 &&  $result4  && $resulta1  && $resulta2  && $resulta3 && $resulta1dn  && $resulta2dn  && $resulta3dn)
			{
				mysqli_commit($conn);                     
					echo '({"success":"true","minno":"'.$vno.'"})';
			}
			else
			{
					mysqli_rollback($conn);					
					echo '({"success":"false","minno":"'.$minhminno.'"})';
			}   
		}
        else
		{
			if ($result2 &&  $result4  && $resulta1  && $resulta2  && $resulta3  && $invcount > 0 && $refcount >0 && $trancount > 0 &&  $trailcount > 0)
			{
				mysqli_commit($conn);                     
					echo '({"success":"true","minno":"'.$minhminno.'"})';
			}
			else
			{
					mysqli_rollback($conn);

					
					echo '({"success":"false","minno":"'.$minhminno.'"})';
			}  
		}
		

	}
}
else
{ 
	if ($savetype == "Add") {
	   if ( $result3 && $result4 &&  $result13 &&  $result14  && $cnt == 0)
	//   if ($result3)
	   {
		mysqli_commit($conn);                     
		    echo '({"success":"true","minno":"'.$minhminno.'"})';
	   }
	   else
	   {
		    if ($cnt == 1)
		        $minhminno = 0;
		    mysqli_rollback($conn);

            
		    echo '({"success":"false","minno":"'.$minhminno.'"})';
	   }   
	}
	else {
	   if ($result2 &&  $result4 )
	   {
	        mysqli_commit($conn);                      
		    echo '({"success":"true","minno":"'.$minhminno.'"})';
	   }
	   else
	   {
		    mysqli_rollback($conn);

            
		    echo '({"success":"false","minno":"'.$minhminno.'"})';
	   }   
	}
}
        

       
 
?>
