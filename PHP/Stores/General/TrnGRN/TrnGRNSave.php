<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$griddet      = json_decode($_REQUEST['griddet'],true);
$rowcnt       = $_POST['cnt'];


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

$voutype = 'PGS';


$tcsauto = $_POST['tcsauto'];
$gstauto = $_POST['gstauto'];

$minhcgstpm= (float) $_POST['minhcgstpm'];
$minhsgstpm= (float) $_POST['minhsgstpm'];
$minhigstpm= (float) $_POST['minhigstpm'];

$minhtottcs = (float) $_POST['minhtottcs'];

$minhtottransport = (float) $_POST['minhtottransport'];


$grnstatus = $_POST['grnstatus'];


 mysql_query("BEGIN");

$userid = (int)$_POST['userid'];


if ($savetype == "Add") {

	$query1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
	$result1 = mysql_query($query1);
	$rec1 = mysql_fetch_array($result1);
	$ginaccrefseq=$rec1['con_value'];


        if ($grnstatus == 'P')
           $ginaccrefseq = 0;
/*
 $query2 = "select IFNULL(max(minh_minno),0)+1 as minhminno from trnpur_min_header where minh_purtype = '$minhvoutype' and minh_fin_code = $minhfincode  and minh_comp_code=$minhcompcode";
 $result2= mysql_query($query2);
 $rec2 = mysql_fetch_array($result2);
 $minhminno=$rec2['minhminno'];

*/


       

     $query1 = "select count(*) as nos from trnpur_min_header where minh_fin_code = $minhfincode  and minh_comp_code=$minhcompcode and minh_minno = '$minhminno'";


//echo $query1;
//echo "<br>";

     $result1 = mysql_query($query1);
     $rec1 = mysql_fetch_array($result1);
     $cnt =$rec1['nos'];




 $query3= "insert into  trnpur_min_header values(
'$minhcompcode','$minhfincode','$minhtype', '$minhminno' ,'$minhmindate', '$minhsupcode', '$minhbillno', '$minhbilldate', '$minhgrossvalue', '$minhroundoff','$roundneed', '$minhvalue', '$minhcarrier','$minhremarks', '$minhentdate','$minhcreditdays', '$minhgeno', '$minhgedate', '$minhlrno', '$minhlrdate', '$minhvouno', 'Y', '$ginaccrefseq' ,'$minhmindate','$tcsauto','$minhcgstpm','$minhsgstpm','$minhigstpm','$minhtottcs','$minhtottransport','$grnstatus', '$userid',0,'$minhentdate')";





//echo $query3;
//echo "<br>";

 $result3=mysql_query($query3);

}
else
{

    if ($grnstatus == "C" && $ginaccrefseq > 0 )
    { 
	$querya1 = "delete from acc_trail  where acctrail_accref_seqno = '$ginaccrefseq'";
        $resulta1 = mysql_query($querya1);

//echo $querya1;
//echo "<br>";
	$querya2 = "delete from acc_tran  where acctran_accref_seqno = '$ginaccrefseq'";
        $resulta2 = mysql_query($querya2);
//echo $querya2;
//echo "<br>";	
        $querya3 = "delete from acc_ref  where accref_seqno ='$ginaccrefseq' and accref_comp_code='$compcode' and accref_finid ='$finid'";
        $resulta3 = mysql_query($querya3);

//echo $querya3;
//echo "<br>";
      }


    if ($grnstatus == "C" && $ginaccrefseq == 0 )
    { 
	$query1 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
	$result1 = mysql_query($query1);
	$rec1 = mysql_fetch_array($result1);
	$ginaccrefseq=$rec1['con_value'];
    }

    $query2="call sppur_upd_minheader('$minhcompcode','$minhminno','$minhmindate','$minhfincode','$minhbillno','$minhbilldate' ,'$minhgrossvalue', '$minhroundoff','$roundneed','$minhvalue','$minhcarrier','$minhremarks','$minhcreditdays','$minhgeno','$minhgedate','$minhlrno','$minhlrdate','$tcsauto','$minhcgstpm','$minhsgstpm','$minhigstpm','$minhtottcs','$grnstatus','$ginaccrefseq','$minhtottransport', '$userid','$minhentdate','$minhtype' )";

//echo $query2;
//echo "<br>";


    $result2=mysql_query($query2);

    $query3 = "delete from trnpur_min_trailer where mint_comp_code = '$compcode' and  mint_fin_code = '$finid' and mint_minno = '$minhminno' ";
    $result3 = mysql_query($query3);

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

	$delrecord =$griddet[$i]['delrecord'];

//echo $mintrcvdqty;
//echo $oldgrnqty;


         if ($delrecord == "N")
         {
	 $query4= "insert into  trnpur_min_trailer values('$minhcompcode', '$minhfincode','$minhminno', '$minhmindate', '$minhsupcode','$mintpono', '$mintpodate', '$mintindno', '$mintindfincode','$mintslno', '$mintitemcode', '$mintinvqty', '$mintrcvdqty', '$mintrcvdqtybill','$mintacceptqty', '$mintrejqty', '$mintunitrate', '$mintcostrate', '$mintpfper','$mintothers' ,'$mintfreight' , '$mintdiscount', '$mintotherpm' , '$mintvalue','$mintqcstatus', '$mintcrstatus', '$mintdisamt', '$mintpfamt', '$mintcgstper', '$mintcgstamt', '$mintsgstper' , '$mintsgstamt' , '$mintigstper','$mintigstamt',   '$minttcsper', '$minttcsval','$mintrebate','$purgrpcode','$cgstled','$sgstled','$igstled',$insurance,$mintunit,'$spec','$transportation','$valuepm','$rebate2')";

//echo  $query4;
//echo "<br>";

	 $result4=mysql_query($query4); 
         }




	 $query11 = "select * from maspur_item_trailer where item_comp_code ='$minhcompcode'  and item_fin_code = '$minhfincode' and item_code = '$mintitemcode'";
	 $result11 = mysql_query($query11);
	 while ($row = mysql_fetch_assoc($result11)) {

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
	    $query12 = "update maspur_item_trailer set  item_avg_rate = $avgrate , item_stock = $totstock , item_lpur_date =  '$minhmindate' where item_comp_code ='$minhcompcode'  and item_fin_code = '$minhfincode' and item_code = '$mintitemcode'";
	    $result12 = mysql_query($query12);
  ///     echo $query12;
            }
          } 
          mysql_free_result($result);

         if ($delrecord == "N")
         {   

	 $query13 = "update trnpur_indent set  ind_rec_qty = ind_rec_qty + $mintrcvdqty - $oldgrnqty  where ind_comp_code ='$minhcompcode'  and ind_fin_code = '$minhfincode' 	 and ind_no = '$mintindno' and ind_item_code = '$mintitemcode'";

//        echo $query13;
//        echo "<br>";
	 $result13 = mysql_query($query13);


	 $query14 = "update  trnpur_purchase_trailer set ptr_rec_qty = ptr_rec_qty + $mintrcvdqty -  $oldgrnqty  where ptr_comp_code = '$minhcompcode'  and ptr_fin_code = '$minhfincode'   and ptr_pono = '$mintpono' and ptr_item_code = '$mintitemcode' and ptr_ind_fin_code = '$mintindfincode' and ptr_ind_no ='$mintindno'"; 
//        echo $query14;
//        echo "<br>";
	 $result14 = mysql_query($query14);
         }     
         else
         {   

	 $query13 = "update trnpur_indent set  ind_rec_qty = ind_rec_qty  - $oldgrnqty  where ind_comp_code ='$minhcompcode'  and ind_fin_code = '$minhfincode' 	 and ind_no = '$mintindno' and ind_item_code = '$mintitemcode'";

//        echo $query13;
//        echo "<br>";
	 $result13 = mysql_query($query13);


	 $query14 = "update  trnpur_purchase_trailer set ptr_rec_qty = ptr_rec_qty -  $oldgrnqty  where ptr_comp_code = '$minhcompcode'  and ptr_fin_code = '$minhfincode'   and ptr_pono = '$mintpono' and ptr_item_code = '$mintitemcode' and ptr_ind_fin_code = '$mintindfincode' and ptr_ind_no ='$mintindno'"; 
//        echo $query14;
//        echo "<br>";
	 $result14 = mysql_query($query14);
         }  


}  



if ($ginaccrefseq > 0 && $grnstatus == "C") {


    $querya1 = "call acc_sp_trn_insacc_ref('$ginaccrefseq','$minhminno','$compcode','$finid','$minhmindate','$voutype', '','','$minhbillno', '$minhbilldate','$minhremarks');";
    $resulta1 = mysql_query($querya1);

//echo $querya1;
//echo "<br>";

$cquerya3 = "insert into acc_voucher_logs values ($ginaccrefseq,$reccount,'$today',$usercode,'$reason')";
$cresulta3 = mysql_query($cquerya3);


//echo $cquerya3;


$griddetacc = json_decode($_REQUEST['griddetacc'],true);
$rowcntacc = $_REQUEST['cntacc'];


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
            $adjamt=0;
            if($ledseq>0){
            #Insert AccTrail
               if ($ledtype != 'G')
               {
               $querya2 = "call acc_sp_trn_insacc_trail ('$ginaccrefseq','$slno','$minhbillno', '$minhbilldate', '$totamt' ,'$adjamt' ,'$ledseq' ,'$amtmode','$minhcreditdays','0')";
               $resulta2 = mysql_query($querya2);
//echo  $querya2;
//echo "<br>";

               }  


            #Insert AccTran

            $querya3 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$ledseq','$dbamt','$cramt','$totamt','$voutype','');";
            $resulta3 = mysql_query($querya3);

//echo  $querya3;	   
//echo "<br>";
            if(resulta3){
                $inscnt = $inscnt + 1;
            }

	  }
        }
}

if ($grnstatus == "C")
{ 
	if ($savetype == "Add") {
	   if ( $result3 && $result4 &&  $result13 &&  $result14  && $resulta1  && $resulta2  && $resulta3  && $cnt == 0)
	//   if ($result3)
	   {
		    mysql_query("COMMIT");                        
		    echo '({"success":"true","minno":"'.$minhminno.'"})';
	   }
	   else
	   {
		    if ($cnt == 1)
		        $minhminno = 0;
		    mysql_query("ROLLBACK");            
		    echo '({"success":"false","minno":"'.$minhminno.'"})';
	   }   
	}
	else {
	   if ($result2 &&  $result4  && $resulta1  && $resulta2  && $resulta3)
	   {
		    mysql_query("COMMIT");                        
		    echo '({"success":"true","minno":"'.$minhminno.'"})';
	   }
	   else
	   {
		    mysql_query("ROLLBACK");            
		    echo '({"success":"false","minno":"'.$minhminno.'"})';
	   }   
	}
}
else
{ 
	if ($savetype == "Add") {
	   if ( $result3 && $result4 &&  $result13 &&  $result14  && $cnt == 0)
	//   if ($result3)
	   {
		    mysql_query("COMMIT");                        
		    echo '({"success":"true","minno":"'.$minhminno.'"})';
	   }
	   else
	   {
		    if ($cnt == 1)
		        $minhminno = 0;
		    mysql_query("ROLLBACK");            
		    echo '({"success":"false","minno":"'.$minhminno.'"})';
	   }   
	}
	else {
	   if ($result2 &&  $result4 )
	   {
		    mysql_query("COMMIT");                        
		    echo '({"success":"true","minno":"'.$minhminno.'"})';
	   }
	   else
	   {
		    mysql_query("ROLLBACK");            
		    echo '({"success":"false","minno":"'.$minhminno.'"})';
	   }   
	}
}
        

       
 
?>
