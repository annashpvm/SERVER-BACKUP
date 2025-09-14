<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$savetype = $_POST['savetype'];

$griddet  = json_decode($_REQUEST['griddet'],true);
$rowcnt   = $_POST['cnt'];

$griddet2  = json_decode($_REQUEST['griddet2'],true);
$rowcnt2   = $_POST['cnt2'];


$grnflag  = $_POST['grnflag'];

$compcode = $_POST['compcode'];
$finid    = $_POST['fincode'];

$rrno     = $_POST['rrno'];
$rrdate   = $_POST['rrdate'];

$grnno    = $_POST['grnno'];
$grndate  = $_POST['grndate'];

$supcode  = $_POST['supcode'];
$supledcode = $_POST['supledcode'];


$billno   = $_POST['billno'];
$billdate = $_POST['billdate'];


$taxable  = $_POST['taxable'];
$roundoff = (float) $_POST['roundoff'];
$retamount=   $_POST['retamount'];

$acctstatus= $_POST['acctstatus'];
$truck     = $_POST['truck'];
$remarks= $_POST['remarks'];
$entdate= $_POST['entdate'];

$vouno  = $_POST['vouno'];
$voudate  = $_POST['voudate'];

$user   = $_POST['user'];

$hsncode = $_POST['hsncode'];
$purledcode = $_POST['purledcode'];


$cgstval =  $_POST['cgstval'];
$sgstval =  $_POST['sgstval'];
$igstval =  $_POST['igstval'];
$freight =  $_POST['freight'];
$othval  =  $_POST['othval'];

$rounding  =  $_POST['rounding'];

$voutype = 'DNG';

mysql_query("BEGIN");



for($i=0;$i<$rowcnt;$i++){

    $cgstper =  (float) $griddet[$i]['mintcgstper'];
    $sgstper =  (float) $griddet[$i]['mintsgstper'];
    $igstper =  (float) $griddet[$i]['mintigstper'];

    $cgstledcode =  (int) $griddet[$i]['cgstled'];
    $sgstledcode =  (int) $griddet[$i]['sgstled'];
    $igstledcode =  (int) $griddet[$i]['igstled'];

}



	$query1 = "select ifnull(max(dbcr_no),0) + 1 as dbcr_no from acc_dbcrnote_header where dbcr_type = '$voutype' and dbcr_finid = '$finid' and dbcr_comp_code = '$compcode';";

	$result1 = mysql_query($query1);
	$rec1 = mysql_fetch_array($result1);
	$conval = $rec1['dbcr_no'];

        $lastno = substr('000'. $conval,-4);
    	$vouno = $voutype .' '. $lastno;


	#Get Max DBCR Seqno from acc_dbcrnote_header

	$query2 = "select ifnull(max(dbcr_seqno),0) + 1 as con_value from acc_dbcrnote_header;";
	$result2 = mysql_query($query2);
	$rec2 = mysql_fetch_array($result2);
	$gindbcrseq = $rec2['con_value'];



	#Get Max AccRef Seqno from acc_ref
	$query3 = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
	$result3 = mysql_query($query3);
	$rec3 = mysql_fetch_array($result3);
	$ginaccrefseq = $rec3['con_value'];


#Insert AccDbcrNoteHeader
    $querya1 = "call acc_sp_insdbcrnoteheader('$gindbcrseq','$compcode','$finid','$voutype','$conval','$vouno','$voudate','$supcode','$supledcode','$purledcode', '$retamount','$remarks','S' , 'N', '$ginaccrefseq','$hsncode');";
    $resulta1 = mysql_query($querya1);
   

//echo $querya1;
//echo "<br>";


#Insert AccDbcrNoteTrailer


$querya2 = "call acc_sp_insdbcrnotetrailer('$gindbcrseq','$billno','$billdate','$taxable' ,'$retamount','$igstval', '$cgstval','$sgstval','$igstper','$cgstper','$sgstper','$igstledcode','$cgstledcode','$sgstledcode',0,0,0,$othval ,0,
'$rounding',0,0,'$taxable')";
$resulta2 = mysql_query($querya2);

//echo $querya2;
//echo "<br>";

#Insert AccRef


 
if ($ginaccrefseq > 0) {


    $query3 = "call acc_sp_trn_insacc_ref('$ginaccrefseq','$vouno','$compcode','$finid','$voudate','$voutype', '','','$billno', '$billdate','$remarks');";
    $result3 = mysql_query($query3);

//echo $querya2;

   $query4 = "insert into acc_voucher_logs values ($ginaccrefseq,$reccount,'$today',$usercode,'')";
   $result4 = mysql_query($query4);




        $inscnt = 0;
        for($i=0;$i<$rowcnt2;$i++){
            $slno = $i+1;
            $ledseq = $griddet2[$i]['ledcode'];
            $dbamt = (float) $griddet2[$i]['debit'];
            $cramt = (float) $griddet2[$i]['credit'];
            $totamt =   $dbamt +  $cramt; 
            $ledtype = $griddet2[$i]['ledtype'];
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
               $query5 = "call acc_sp_trn_insacc_trail ('$ginaccrefseq','$slno','$billno', '$billdate', '$totamt' ,'$adjamt' ,'$ledseq' ,'$amtmode','0','0')";
               $result5 = mysql_query($query5);
//echo  $querya3;

               }  


            #Insert AccTran

            $query6 = "call acc_sp_trn_insacc_tran('$ginaccrefseq','$slno','$ledseq','$dbamt','$cramt','$totamt','$voutype');";
            $result6 = mysql_query($query6);


	  }
        }
}

$query7 = "update trnpur_grn_ret_header set debh_vouno = '$vouno',debh_accupd = 'Y' where debh_comp_code = $compcode and debh_fin_code = $finid and debh_no = '$rrno' ";
$result7 = mysql_query($query7);

//echo $query7;
//echo "<br>";




if ( $resulta1 && $resulta2 && $result3 && $result5 && $result6  && $result7)  
{
  mysql_query("COMMIT");
    echo '({"success":"true","vouno":"' . $vouno . '"})';
} else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","vouno":"' . $vouno . '"})';
}

?>
