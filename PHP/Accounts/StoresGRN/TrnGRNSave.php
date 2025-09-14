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
    $today      = date("Y-m-d H:i:s");  

 mysql_query("BEGIN");

$userid = (int)$_POST['userid'];

$reason  = $_POST['reason'];


$cquery1 = "select ifnull(max(accvou_slno),0) + 1 as reccount  from acc_voucher_logs where accvou_seqno = '$ginaccrefseq';";
$cresult1 = mysql_query($cquery1);
$crec1 = mysql_fetch_array($cresult1);
$reccount = $crec1['reccount'];



$query1 = "delete from acc_tran  where acctran_accref_seqno = '$ginaccrefseq';";
$result1 = mysql_query($query1);

//echo $query1;
//echo "<br>";


$query2="call sppur_upd_minheader('$minhcompcode','$minhminno','$minhmindate','$minhfincode','$minhbillno','$minhbilldate' ,'$minhgrossvalue', '$minhroundoff','$roundneed','$minhvalue','$minhcarrier','$minhremarks','$minhcreditdays','$minhgeno','$minhgedate','$minhlrno','$minhlrdate','$tcsauto','$minhcgstpm','$minhsgstpm','$minhigstpm','$minhtottcs','$grnstatus','$ginaccrefseq','$minhtottransport', '$userid','$minhentdate','$minhtype');";

//echo $query2;
//echo "<br>";


    $result2=mysql_query($query2);

    $query3 = "delete from trnpur_min_trailer where mint_comp_code = '$compcode' and  mint_fin_code = '$finid' and mint_minno = '$minhminno';";
    $result3 = mysql_query($query3);


//echo $query3;
//echo "<br>";

$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++){

	$sno = $i + 1;
	$mintslno=$griddet[$i]['sno'];
	$mintpono=$griddet[$i]['pono'];
	$mintpodate=$griddet[$i]['podate'];
	$mintinvqty=$griddet[$i]['mintinvqty'];

	$mintrcvdqtybill =$griddet[$i]['mintrcvdqty'];
	$mintrcvdqty    =$griddet[$i]['mintstockqty'];


	$mintacceptqty=$griddet[$i]['mintacceptqty'];

//	$mintrejqty =  $griddet[$i]['mintinvqty'] - $griddet[$i]['mintrcvdqty'];
	$mintrejqty =$griddet[$i]['mintrejectqty'];


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

	$valuepm =(float)$griddet[$i]['valuepm'];

	$transportation=(float)$griddet[$i]['transportation'];


	$spec    =   substr(trim($griddet[$i]['itemspec']),0,148);


	$mintunit = (int)$griddet[$i]['unitcode'];

	$delrecord =$griddet[$i]['delrecord'];

//echo $mintrcvdqty;
//echo $oldgrnqty;

	 $query4= "insert into  trnpur_min_trailer values('$minhcompcode', '$minhfincode','$minhminno', '$minhmindate', '$minhsupcode','$mintpono', '$mintpodate', '$mintindno', '$mintindfincode','$mintslno', '$mintitemcode', '$mintinvqty', '$mintrcvdqty', '$mintrcvdqtybill','$mintacceptqty', '$mintrejqty', '$mintunitrate', '$mintcostrate', '$mintpfper','$mintothers' ,'$mintfreight' , '$mintdiscount', '$mintotherpm' , '$mintvalue','$mintqcstatus', '$mintcrstatus', '$mintdisamt', '$mintpfamt', '$mintcgstper', '$mintcgstamt', '$mintsgstper' , '$mintsgstamt' , '$mintigstper','$mintigstamt',   '$minttcsper', '$minttcsval','$mintrebate','$purgrpcode','$cgstled','$sgstled','$igstled',$insurance,$mintunit,'$spec','$transportation','$valuepm');";

//echo  $query4;
//echo "<br>";

	 $result4=mysql_query($query4); 
}


$query5 = "insert into acc_voucher_logs values ($ginaccrefseq,$reccount,'$today',$userid,'$reason');";
$result5 = mysql_query($query5);

//echo  $query5;
//echo "<br>";


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


            #Insert AccTran

            $query6 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$ledseq','$dbamt','$cramt','$totamt','$voutype','');";
            $result6 = mysql_query($query6);

//echo  $query6;	   
//echo "<br>";
	  }
        }



	$query7 = "update acc_trail set acctrail_inv_no  = '$minhbillno', acctrail_inv_date = '$minhbilldate'  where acctrail_accref_seqno = '$ginaccrefseq'";
        $result7 = mysql_query($query7);

//echo  $query7;	   
//echo "<br>";

        $query8 = "update acc_ref set accref_payref_no  = '$minhbillno', accref_payref_date = '$minhbilldate'   where accref_seqno ='$ginaccrefseq' and accref_comp_code='$compcode' and accref_finid ='$finid'";
        $result8 = mysql_query($query8);

//echo  $query8;	   
//echo "<br>";

        $query9 = "update acc_adjustments set ref_invno = '$minhbillno', ref_invdate = '$minhbilldate' where ref_compcode = '$compcode' and ref_finid = '$finid' and ref_adjseqno = '$ginaccrefseq' and ref_slno > 1";
        $result9 = mysql_query($query9);


//echo  $query9;	   
//echo "<br>";



   if ($result1 && $result2 &&  $result3 &&  $result4  && $result5  && $result6  && $result7  && $result8)
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
