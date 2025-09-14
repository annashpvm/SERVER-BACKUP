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
$minhcarrier= $_POST['minhcarrier'];


$minhremarks   = substr(trim($_POST['minhremarks']),0,299);
$minhentdate= $_POST['minhentdate'];

$minhvouno= $_POST['minhvouno'];
$minhvouyear= $_POST['minhvouyear'];
$minhvoutype= $_POST['minhvoutype'];

$minhcreditdays= $_POST['minhcreditdays'];

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
    


 mysql_query("BEGIN");





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
	$mintrcvdqty=$griddet[$i]['mintrcvdqty'];
	$mintacceptqty=$griddet[$i]['mintacceptqty'];

	$mintrejqty =  $griddet[$i]['mintinvqty'] - $griddet[$i]['mintrcvdqty'];
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







	 $query11 = "select * from maspur_item_trailer where item_comp_code ='$minhcompcode'  and item_fin_code = '$minhfincode' and item_code = '$mintitemcode'";
	 $result11 = mysql_query($query11);
	 while ($row = mysql_fetch_assoc($result11)) {

	    $totstock = $row['item_stock'] - $oldgrnqty ;
	    $totvalue = ($row['item_stock'] * $row['item_avg_rate']) - $oldgrnval;



            $avgrate  = 0;
	    if ( $totvalue > 0 &&  $totstock > 0)
               $avgrate  = $totvalue / $totstock;
      


//	    if ( $totvalue >= 0 &&  $totstock >= 0)
//	    { 
	    $query12 = "update maspur_item_trailer set  item_avg_rate = $avgrate , item_stock = $totstock , item_lpur_date =  '$minhmindate' where item_comp_code ='$minhcompcode'  and item_fin_code = '$minhfincode' and item_code = '$mintitemcode'";
	    $result12 = mysql_query($query12);
//       echo $query12;
//echo "<br>";
 //           }
          } 
          mysql_free_result($result);



	 $query13 = "update trnpur_indent set  ind_rec_qty = ind_rec_qty - $oldgrnqty  where ind_comp_code ='$minhcompcode'  and ind_fin_code = '$minhfincode' and ind_no = '$mintindno' and ind_item_code = '$mintitemcode'";
//        echo $query13;
	 $result13 = mysql_query($query13);


	 $query14 = "update  trnpur_purchase_trailer set ptr_rec_qty = ptr_rec_qty -  $oldgrnqty  where ptr_comp_code = '$minhcompcode'  and ptr_fin_code = '$minhfincode'   and ptr_pono = '$mintpono' and ptr_item_code = '$mintitemcode' and ptr_ind_fin_code = '$mintindfincode' and ptr_ind_no ='$mintindno'"; 
//         echo $query14;
	 $result14 = mysql_query($query14);


}  

    $query1 = "delete from trnpur_min_trailer where mint_comp_code = '$compcode' and  mint_fin_code = '$finid' and mint_minno = '$minhminno' ";
    $result1 = mysql_query($query1);


    $query2 = "delete from trnpur_min_header where minh_comp_code = '$compcode' and  minh_fin_code = '$finid' and minh_minno = '$minhminno' ";
    $result2 = mysql_query($query2);



   if ($result1 && $result2 && $resulta1  && $resulta2  && $resulta3)
   {
            mysql_query("COMMIT");                        
            echo '({"success":"true","minno":"'.$minhminno.'"})';
   }
   else
   {
            mysql_query("ROLLBACK");            
            echo '({"success":"false","minno":"'.$minhminno.'"})';
   }   



        

       
 
?>
